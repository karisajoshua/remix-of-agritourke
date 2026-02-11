import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { slugify } from "@/lib/slugify";
import { calculateReadTime } from "@/lib/readTime";

const blogSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens"),
  excerpt: z.string().max(500).optional(),
  category: z.string().max(100).optional(),
  date: z.string().min(1, "Date is required"),
  author: z.string().max(100).optional(),
  image: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  content: z.string().min(1, "Content is required"),
});

type BlogFormData = z.infer<typeof blogSchema>;

export interface BlogPostRecord {
  id?: string;
  title: string;
  slug: string;
  excerpt?: string;
  category?: string;
  date: string;
  author?: string;
  image?: string;
  content: string;
  read_time?: string;
}

interface BlogPostFormProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  initial?: BlogPostRecord | null;
  onSaved?: () => void;
}

export default function BlogPostForm({ open, onOpenChange, initial, onSaved }: BlogPostFormProps) {
  
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
      author: "",
      image: "",
      content: "",
    },
  });

  useEffect(() => {
    if (initial) {
      reset({
        title: initial.title || "",
        slug: initial.slug || "",
        excerpt: initial.excerpt || "",
        category: initial.category || "",
        date: initial.date || new Date().toISOString().split("T")[0],
        author: initial.author || "",
        image: initial.image || "",
        content: initial.content || "",
      });
    } else {
      reset({
        title: "",
        slug: "",
        excerpt: "",
        category: "",
        date: new Date().toISOString().split("T")[0],
        author: "",
        image: "",
        content: "",
      });
    }
  }, [initial, open, reset]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setValue("title", title);
    if (!initial) {
      setValue("slug", slugify(title));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // Removed - using URL input instead
  };

  const checkSlugExists = async (slug: string, currentId?: string): Promise<boolean> => {
    const query = supabase
      .from("blog_posts")
      .select("id")
      .eq("slug", slug);
    
    if (currentId) {
      query.neq("id", currentId);
    }

    const { data } = await query;
    return (data?.length || 0) > 0;
  };

  const onSubmit = async (data: BlogFormData) => {
    try {
      setSaving(true);

      const slugExists = await checkSlugExists(data.slug, initial?.id);
      if (slugExists) {
        toast.error("A post with this slug already exists");
        setSaving(false);
        return;
      }

      const readTime = calculateReadTime(data.content);

      const payload = {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt || null,
        category: data.category || null,
        date: data.date,
        author: data.author || null,
        image: data.image || null,
        content: data.content,
        read_time: readTime,
      };

      if (initial?.id) {
        const { error } = await supabase
          .from("blog_posts")
          .update(payload)
          .eq("id", initial.id);
        if (error) throw error;
        toast.success("Blog post updated");
      } else {
        const { error } = await supabase
          .from("blog_posts")
          .insert(payload);
        if (error) throw error;
        toast.success("Blog post created");
      }
      onOpenChange(false);
      onSaved?.();
    } catch (e) {
      toast.error("Failed to save blog post");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initial?.id ? "Edit Blog Post" : "Add New Blog Post"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="title">Title *</Label>
            <Input id="title" {...register("title")} onChange={handleTitleChange} />
            {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="slug">Slug *</Label>
            <Input id="slug" {...register("slug")} placeholder="url-friendly-title" />
            {errors.slug && <p className="text-sm text-red-500">{errors.slug.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Input id="category" {...register("category")} placeholder="e.g., Coffee Farming" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">Date *</Label>
              <Input id="date" type="date" {...register("date")} />
              {errors.date && <p className="text-sm text-red-500">{errors.date.message}</p>}
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="author">Author</Label>
            <Input id="author" {...register("author")} placeholder="e.g., Agritourism Team" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="image">Featured Image URL</Label>
            <Input id="image" {...register("image")} placeholder="https://example.com/image.jpg" type="url" />
            {watch("image") && (
              <img src={watch("image")} alt="Preview" className="w-full h-40 object-cover rounded" />
            )}
            {errors.image && <p className="text-sm text-red-500">{errors.image.message}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea id="excerpt" {...register("excerpt")} rows={2} placeholder="Brief summary (max 500 chars)" />
          </div>

          <div className="grid gap-2">
            <Label>Content *</Label>
            <RichTextEditor
              value={watch("content")}
              onChange={(html) => setValue("content", html, { shouldValidate: true })}
            />
            {errors.content && <p className="text-sm text-red-500">{errors.content.message}</p>}
            <p className="text-xs text-muted-foreground">Read time will be calculated automatically</p>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Post"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
