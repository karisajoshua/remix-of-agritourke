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
      toast.error("Please select at least one image");
      return;
    }
    
    const files = Array.from(fileRef.current.files);

    try {
      setUploading(true);
      let successCount = 0;
      let failCount = 0;

      for (const file of files) {
        try {
          const ext = file.name.split('.').pop();
          const path = `${crypto.randomUUID()}.${ext}`;

          const { error: uploadError } = await supabase.storage.from('gallery-images').upload(path, file);
          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage.from('gallery-images').getPublicUrl(path);

          const { error: insertError } = await supabase.from('gallery_images').insert({
            url: publicUrl,
            title: title.trim() || null,
            description: description.trim() || null,
            category: category.trim() || null,
          });
          if (insertError) throw insertError;
          successCount++;
        } catch {
          failCount++;
        }
      }

      if (successCount > 0) {
        toast.success(`${successCount} image${successCount > 1 ? 's' : ''} uploaded`);
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label>Images (select multiple)</Label>
            <Input ref={fileRef} type="file" accept="image/*" multiple />
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
