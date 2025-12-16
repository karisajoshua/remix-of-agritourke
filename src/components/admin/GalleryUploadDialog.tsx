import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { compressImage } from "@/lib/imageCompression";
import { Plus, Trash2 } from "lucide-react";

interface GalleryUploadDialogProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onSaved?: () => void;
}

export default function GalleryUploadDialog({ open, onOpenChange, onSaved }: GalleryUploadDialogProps) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [visible, setVisible] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  useEffect(() => {
    if (open) {
      setTitle("");
      setDescription("");
      setCategory("");
      setVisible(true);
      setShowNewCategory(false);
      setNewCategoryName("");
      if (fileRef.current) fileRef.current.value = "";
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

    // Check if category already exists
    if (categories.includes(trimmedName)) {
      setCategory(trimmedName);
      setShowNewCategory(false);
      setNewCategoryName("");
      return;
    }

    // Add new category to database
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

  const handleDeleteCategory = async (categoryToDelete: string) => {
    if (!confirm(`Delete category "${categoryToDelete}"? Images in this category will remain but become uncategorized.`)) {
      return;
    }

    // Remove category from images first
    await supabase
      .from('gallery_images')
      .update({ category: null })
      .eq('category', categoryToDelete);

    // Delete the category
    const { error } = await supabase
      .from('gallery_categories')
      .delete()
      .eq('name', categoryToDelete);

    if (error) {
      toast.error("Failed to delete category");
      return;
    }

    setCategories(categories.filter(c => c !== categoryToDelete));
    if (category === categoryToDelete) {
      setCategory("");
    }
    toast.success(`Category "${categoryToDelete}" deleted`);
  };

  const upload = async () => {
    if (!fileRef.current || !fileRef.current.files || fileRef.current.files.length === 0) {
      toast.error("Please select at least one image");
      return;
    }
    
    const files = Array.from(fileRef.current.files);

    try {
      setUploading(true);
      let successCount = 0;
      let failCount = 0;
      let totalOriginalSize = 0;
      let totalCompressedSize = 0;

      for (const file of files) {
        try {
          totalOriginalSize += file.size;
          
          // Compress image before upload
          const compressedFile = await compressImage(file);
          totalCompressedSize += compressedFile.size;
          
          const ext = compressedFile.name.split('.').pop() || 'jpg';
          const path = `${crypto.randomUUID()}.${ext}`;

          const { error: uploadError } = await supabase.storage.from('gallery-images').upload(path, compressedFile);
          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage.from('gallery-images').getPublicUrl(path);

          const { error: insertError } = await supabase.from('gallery_images').insert({
            url: publicUrl,
            title: title.trim() || null,
            description: description.trim() || null,
            category: category.trim() || null,
            visible: visible,
          });
          if (insertError) throw insertError;
          successCount++;
        } catch {
          failCount++;
        }
      }

      if (successCount > 0) {
        const savedPercent = Math.round((1 - totalCompressedSize / totalOriginalSize) * 100);
        toast.success(`${successCount} image${successCount > 1 ? 's' : ''} uploaded${savedPercent > 5 ? ` (${savedPercent}% smaller)` : ''}`);
      }
      if (failCount > 0) {
        toast.error(`${failCount} upload${failCount > 1 ? 's' : ''} failed`);
      }

      onOpenChange(false);
      onSaved?.();
    } catch (e) {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label>Images (select multiple)</Label>
            <Input ref={fileRef} type="file" accept="image/*" multiple />
            <p className="text-xs text-muted-foreground">Images will be automatically compressed</p>
          </div>
          <div className="grid gap-2">
            <Label>Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Image title" />
          </div>
          <div className="grid gap-2">
            <Label>Description</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} placeholder="Image description" />
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
                    <div key={cat} className="flex items-center justify-between pr-2">
                      <SelectItem value={cat} className="flex-1">{cat}</SelectItem>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDeleteCategory(cat);
                        }}
                        className="p-1 text-destructive hover:bg-destructive/10 rounded ml-2"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
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
            <Label htmlFor="visible-toggle">Show on Website</Label>
            <Switch 
              id="visible-toggle"
              checked={visible} 
              onCheckedChange={setVisible}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={upload} disabled={uploading}>{uploading ? 'Uploading...' : 'Upload'}</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
