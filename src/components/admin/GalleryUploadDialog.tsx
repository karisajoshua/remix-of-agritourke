import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

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
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (open) {
      setTitle("");
      setDescription("");
      setCategory("");
      if (fileRef.current) fileRef.current.value = "";
    }
  }, [open]);

  const upload = async () => {
    if (!fileRef.current || !fileRef.current.files || fileRef.current.files.length === 0) {
      toast.error("Please choose an image");
      return;
    }
    const file = fileRef.current.files[0];

    try {
      setUploading(true);
      const ext = file.name.split('.').pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: uploadError } = await supabase.storage.from('gallery-images').upload(path, file, {
        cacheControl: '3600', upsert: false
      });
      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage.from('gallery-images').getPublicUrl(path);
      const url = publicUrlData.publicUrl;

      const { error: insertError } = await supabase.from('gallery_images').insert({
        url,
        title,
        description,
        category,
      });
      if (insertError) throw insertError;

      toast.success('Image uploaded');
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label>Image</Label>
            <Input ref={fileRef} type="file" accept="image/*" />
          </div>
          <div className="grid gap-2">
            <Label>Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>Description</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
          </div>
          <div className="grid gap-2">
            <Label>Category</Label>
            <Input value={category} onChange={(e) => setCategory(e.target.value)} />
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
