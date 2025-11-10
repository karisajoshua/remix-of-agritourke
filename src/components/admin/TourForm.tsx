import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export interface TourRecord {
  id?: string;
  title: string;
  category: string;
  duration: string;
  location: string;
  image: string;
  featured?: boolean;
}

interface TourFormProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  initial?: TourRecord | null;
  onSaved?: () => void;
}

export default function TourForm({ open, onOpenChange, initial, onSaved }: TourFormProps) {
  const [form, setForm] = useState<TourRecord>({
    title: "",
    category: "",
    duration: "",
    location: "",
    image: "",
    featured: false,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initial) {
      setForm({
        id: initial.id,
        title: initial.title || "",
        category: initial.category || "",
        duration: initial.duration || "",
        location: initial.location || "",
        image: initial.image || "",
        featured: initial.featured ?? false,
      });
    } else {
      setForm({ title: "", category: "", duration: "", location: "", image: "", featured: false });
    }
  }, [initial, open]);

  const handleChange = (key: keyof TourRecord, value: string | boolean) => {
    setForm((p) => ({ ...p, [key]: value } as TourRecord));
  };

  const handleSubmit = async () => {
    try {
      setSaving(true);
      if (form.id) {
        const { error } = await supabase.from("tours").update({
          title: form.title,
          category: form.category,
          duration: form.duration,
          location: form.location,
          image: form.image,
          featured: form.featured,
        }).eq("id", form.id);
        if (error) throw error;
        toast.success("Tour updated");
      } else {
        const { error } = await supabase.from("tours").insert({
          title: form.title,
          category: form.category,
          duration: form.duration,
          location: form.location,
          image: form.image,
          featured: form.featured ?? false,
        });
        if (error) throw error;
        toast.success("Tour created");
      }
      onOpenChange(false);
      onSaved?.();
    } catch (e) {
      toast.error("Failed to save tour");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{form.id ? "Edit Tour" : "Add New Tour"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={form.title} onChange={(e) => handleChange("title", e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Input id="category" value={form.category} onChange={(e) => handleChange("category", e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="duration">Duration</Label>
              <Input id="duration" value={form.duration} onChange={(e) => handleChange("duration", e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" value={form.location} onChange={(e) => handleChange("location", e.target.value)} />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="image">Image URL</Label>
            <Input id="image" value={form.image} onChange={(e) => handleChange("image", e.target.value)} placeholder="https://..." />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={handleSubmit} disabled={saving}>{saving ? "Saving..." : "Save"}</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
