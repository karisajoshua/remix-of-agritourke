import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface GalleryImage {
  id: string;
  url: string;
  title?: string;
  description?: string;
  category?: string;
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
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (image) {
      setTitle(image.title || "");
      setDescription(image.description || "");
      setCategory(image.category || "");
    } else {
      setTitle("");
      setDescription("");
      setCategory("");
    }
  }, [image, open]);

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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Image Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          {image && (
            <img src={image.url} alt="Preview" className="w-full h-48 object-cover rounded" />
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
              rows={3}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-category">Category</Label>
            <Input
              id="edit-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Farm Tours"
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
