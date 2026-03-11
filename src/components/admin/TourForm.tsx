import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { X, Plus } from "lucide-react";

const tourSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  category: z.string().max(100).optional(),
  duration: z.string().max(50).optional(),
  location: z.string().max(100).optional(),
  participants: z.string().max(50).optional(),
  description: z.string().max(500).optional(),
  full_description: z.string().optional(),
  featured: z.boolean(),
  image: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  price_starting_from: z.union([z.number().int().positive(), z.nan(), z.literal(0)]).optional().nullable(),
});

type TourFormData = z.infer<typeof tourSchema>;

export interface TourRecord {
  id?: string;
  title: string;
  category?: string;
  duration?: string;
  location?: string;
  participants?: string;
  description?: string;
  full_description?: string;
  image?: string;
  featured?: boolean;
  includes?: string[];
  itinerary?: Array<{ day: number; title?: string; details: string }>;
  external_links?: Array<{ label: string; url: string }>;
  price_starting_from?: number | null;
}

interface TourFormProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  initial?: TourRecord | null;
  onSaved?: () => void;
}

export default function TourForm({ open, onOpenChange, initial, onSaved }: TourFormProps) {
  
  const [saving, setSaving] = useState(false);
  const [includes, setIncludes] = useState<string[]>([]);
  const [newInclude, setNewInclude] = useState("");
  const [itinerary, setItinerary] = useState<Array<{ day: number; title?: string; details: string }>>([]);
  const [externalLinks, setExternalLinks] = useState<Array<{ label: string; url: string }>>([]);

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<TourFormData>({
    resolver: zodResolver(tourSchema),
    defaultValues: {
      title: "",
      category: "",
      duration: "",
      location: "",
      participants: "",
      description: "",
      full_description: "",
      featured: false,
      image: "",
      price_starting_from: null,
    },
  });

  useEffect(() => {
    if (initial) {
      reset({
        title: initial.title || "",
        category: initial.category || "",
        duration: initial.duration || "",
        location: initial.location || "",
        participants: initial.participants || "",
        description: initial.description || "",
        full_description: initial.full_description || "",
        featured: initial.featured ?? false,
        image: initial.image || "",
      });
      setIncludes(initial.includes || []);
      setItinerary(initial.itinerary || []);
      setExternalLinks(initial.external_links || []);
    } else {
      reset({
        title: "",
        category: "",
        duration: "",
        location: "",
        participants: "",
        description: "",
        full_description: "",
        featured: false,
        image: "",
      });
      setIncludes([]);
      setItinerary([]);
      setExternalLinks([]);
    }
  }, [initial, open, reset]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // Removed - using URL input instead
  };

  const addInclude = () => {
    if (newInclude.trim() && newInclude.length <= 100) {
      setIncludes([...includes, newInclude.trim()]);
      setNewInclude("");
    }
  };

  const removeInclude = (index: number) => {
    setIncludes(includes.filter((_, i) => i !== index));
  };

  const addItineraryItem = () => {
    setItinerary([...itinerary, { day: itinerary.length + 1, title: "", details: "" }]);
  };

  const updateItineraryItem = (index: number, field: "day" | "title" | "details", value: string | number) => {
    const updated = [...itinerary];
    updated[index] = { ...updated[index], [field]: value };
    setItinerary(updated);
  };

  const removeItineraryItem = (index: number) => {
    setItinerary(itinerary.filter((_, i) => i !== index));
  };

  const addExternalLink = () => {
    setExternalLinks([...externalLinks, { label: "", url: "" }]);
  };

  const updateExternalLink = (index: number, field: "label" | "url", value: string) => {
    const updated = [...externalLinks];
    updated[index] = { ...updated[index], [field]: value };
    setExternalLinks(updated);
  };

  const removeExternalLink = (index: number) => {
    setExternalLinks(externalLinks.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: TourFormData) => {
    try {
      setSaving(true);
      const payload = {
        title: data.title,
        category: data.category || null,
        duration: data.duration || null,
        location: data.location || null,
        participants: data.participants || null,
        description: data.description || null,
        full_description: data.full_description || null,
        image: data.image || null,
        featured: data.featured,
        includes: includes.length > 0 ? includes : null,
        itinerary: itinerary.length > 0 ? itinerary : null,
        external_links: externalLinks.filter(l => l.label && l.url).length > 0 
          ? externalLinks.filter(l => l.label && l.url) 
          : null,
      };

      if (initial?.id) {
        const { error } = await supabase
          .from("tours")
          .update(payload)
          .eq("id", initial.id);
        if (error) throw error;
        toast.success("Tour updated");
      } else {
        const { error } = await supabase
          .from("tours")
          .insert(payload);
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
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initial?.id ? "Edit Tour" : "Add New Tour"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="title">Title *</Label>
            <Input id="title" {...register("title")} />
            {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Input id="category" {...register("category")} placeholder="e.g., Coffee Farm" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="duration">Duration</Label>
              <Input id="duration" {...register("duration")} placeholder="e.g., 3 days" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" {...register("location")} placeholder="e.g., Kiambu" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="participants">Participants</Label>
              <Input id="participants" {...register("participants")} placeholder="e.g., 2-15 people" />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Short Description</Label>
            <Textarea id="description" {...register("description")} rows={2} placeholder="Brief tour summary (max 500 chars)" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="full_description">Full Description</Label>
            <Textarea id="full_description" {...register("full_description")} rows={4} placeholder="Detailed tour description" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="image">Tour Image URL</Label>
            <Input id="image" {...register("image")} placeholder="https://example.com/image.jpg" type="url" />
            {watch("image") && (
              <img src={watch("image")} alt="Preview" className="w-full h-40 object-cover rounded" />
            )}
            {errors.image && <p className="text-sm text-red-500">{errors.image.message}</p>}
          </div>

          <div className="flex items-center gap-2">
            <Switch id="featured" checked={watch("featured")} onCheckedChange={(checked) => setValue("featured", checked)} />
            <Label htmlFor="featured">Featured Tour</Label>
          </div>

          <div className="grid gap-2">
            <Label>What's Included</Label>
            <div className="flex gap-2">
              <Input 
                value={newInclude} 
                onChange={(e) => setNewInclude(e.target.value)}
                placeholder="Add item (max 100 chars)"
                maxLength={100}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addInclude())}
              />
              <Button type="button" onClick={addInclude} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {includes.map((item, i) => (
                <div key={i} className="flex items-center gap-1 bg-secondary px-2 py-1 rounded text-sm">
                  {item}
                  <button type="button" onClick={() => removeInclude(i)}>
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Itinerary</Label>
            <Button type="button" onClick={addItineraryItem} size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-2" /> Add Day
            </Button>
            <div className="space-y-3 mt-2">
              {itinerary.map((item, i) => (
                <div key={i} className="border p-3 rounded space-y-2">
                  <div className="flex justify-between items-center">
                    <Input 
                      type="number" 
                      value={item.day} 
                      onChange={(e) => updateItineraryItem(i, "day", parseInt(e.target.value))}
                      className="w-20"
                      min={1}
                    />
                    <button type="button" onClick={() => removeItineraryItem(i)}>
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <Input 
                    placeholder="Title (optional)" 
                    value={item.title || ""} 
                    onChange={(e) => updateItineraryItem(i, "title", e.target.value)}
                  />
                  <Textarea 
                    placeholder="Day details *" 
                    value={item.details} 
                    onChange={(e) => updateItineraryItem(i, "details", e.target.value)}
                    rows={2}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-2">
            <Label>External Links</Label>
            <Button type="button" onClick={addExternalLink} size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-2" /> Add Link
            </Button>
            <div className="space-y-2 mt-2">
              {externalLinks.map((link, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <Input 
                    placeholder="Label" 
                    value={link.label} 
                    onChange={(e) => updateExternalLink(i, "label", e.target.value)}
                  />
                  <Input 
                    placeholder="URL" 
                    value={link.url} 
                    onChange={(e) => updateExternalLink(i, "url", e.target.value)}
                  />
                  <button type="button" onClick={() => removeExternalLink(i)}>
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Tour"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
