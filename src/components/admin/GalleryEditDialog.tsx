import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Plus } from "lucide-react";

interface GalleryImage {
  id: string;
  url: string;
  title?: string;
  description?: string;
  category?: string;
  visible?: boolean;
}

interface GalleryEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  image: GalleryImage | null;
  onSaved?: () => void;
}

export default function GalleryEditDialog({ open, onOpenChange, image, onSaved }: GalleryEditDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [visible, setVisible] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  useEffect(() => {
    if (image) {
      setTitle(image.title || "");
      setDescription(image.description || "");
      setCategory(image.category || "");
      setVisible(image.visible !== false);
      setShowNewCategory(false);
      setNewCategoryName("");
    } else {
      setTitle("");
      setDescription("");
      setCategory("");
      setVisible(true);
      setShowNewCategory(false);
      setNewCategoryName("");
    }
  }, [image, open]);

  useEffect(() => {
    if (open) {
      fetchCategories();
    }
  }, [open]);

  const fetchCategories = async () => {
    const { data } = await supabase
      .from('gallery_categories')
      .select('name')
      .order('name');
    if (data) {
      setCategories(data.map(c => c.name));
    }
  };

  const handleCategoryChange = (value: string) => {
    if (value === "__new__") {
      setShowNewCategory(true);
      setCategory("");
    } else {
      setShowNewCategory(false);
      setCategory(value);
    }
  };

  const handleAddNewCategory = async () => {
    const trimmedName = newCategoryName.trim();
    if (!trimmedName) {
      toast.error("Please enter a category name");
      return;
    }

    if (categories.includes(trimmedName)) {
      setCategory(trimmedName);
      setShowNewCategory(false);
      setNewCategoryName("");
      return;
    }

    const { error } = await supabase
      .from('gallery_categories')
      .insert({ name: trimmedName });

    if (error) {
      toast.error("Failed to create category");
      return;
    }

    setCategories([...categories, trimmedName].sort());
    setCategory(trimmedName);
    setShowNewCategory(false);
    setNewCategoryName("");
    toast.success(`Category "${trimmedName}" created`);
  };

  const handleSave = async () => {
    if (!image) return;

    try {
      setSaving(true);
      const { error } = await supabase
        .from("gallery_images")
        .update({
          title: title.trim() || null,
          description: description.trim() || null,
          category: category.trim() || null,
          visible: visible,
        })
        .eq("id", image.id);

      if (error) throw error;

      toast.success("Image updated");
      onOpenChange(false);
      onSaved?.();
    } catch (error) {
      toast.error("Failed to update image");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Image Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          {image && (
            <img src={image.url} alt="Preview" className="w-full h-40 object-cover rounded" />
          )}
          <div className="grid gap-2">
            <Label htmlFor="edit-title">Title</Label>
            <Input
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Image title"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Image description"
              rows={2}
            />
          </div>
          <div className="grid gap-2">
            <Label>Category</Label>
            {!showNewCategory ? (
              <Select value={category} onValueChange={handleCategoryChange}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                  <SelectItem value="__new__" className="text-agri-green font-medium">
                    <span className="flex items-center gap-1">
                      <Plus className="h-3 w-3" /> Add New Category
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <div className="flex gap-2">
                <Input 
                  value={newCategoryName} 
                  onChange={(e) => setNewCategoryName(e.target.value)} 
                  placeholder="New category name"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddNewCategory()}
                />
                <Button type="button" size="sm" onClick={handleAddNewCategory}>Add</Button>
                <Button type="button" size="sm" variant="outline" onClick={() => setShowNewCategory(false)}>Cancel</Button>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="visible-edit-toggle">Show on Website</Label>
            <Switch 
              id="visible-edit-toggle"
              checked={visible} 
              onCheckedChange={setVisible}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
