import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export interface BlogPostRecord {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  date: string; // ISO string
  image: string;
  author: string;
  content?: string;
}

interface BlogPostFormProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  initial?: BlogPostRecord | null;
  onSaved?: () => void;
}

export default function BlogPostForm({ open, onOpenChange, initial, onSaved }: BlogPostFormProps) {
  const [form, setForm] = useState<BlogPostRecord>({
    title: "",
    slug: "",
    excerpt: "",
    category: "",
    date: new Date().toISOString().slice(0, 10),
    image: "",
    author: "",
    content: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initial) {
      setForm({
        id: initial.id,
        title: initial.title || "",
        slug: initial.slug || "",
        excerpt: initial.excerpt || "",
        category: initial.category || "",
        date: (initial.date || new Date().toISOString().slice(0, 10)).toString(),
        image: initial.image || "",
        author: initial.author || "",
        content: initial.content || "",
      });
    } else {
      setForm({ title: "", slug: "", excerpt: "", category: "", date: new Date().toISOString().slice(0,10), image: "", author: "", content: "" });
    }
  }, [initial, open]);

  const handleChange = (key: keyof BlogPostRecord, value: string) => {
    setForm((p) => ({ ...p, [key]: value } as BlogPostRecord));
  };

  const handleSubmit = async () => {
    try {
      setSaving(true);
      if (form.id) {
        const { error } = await supabase.from("blog_posts").update({
          title: form.title,
          slug: form.slug,
          excerpt: form.excerpt,
          category: form.category,
          date: form.date,
          image: form.image,
          author: form.author,
          content: form.content,
        }).eq("id", form.id);
        if (error) throw error;
        toast.success("Post updated");
      } else {
        const { error } = await supabase.from("blog_posts").insert({
          title: form.title,
          slug: form.slug,
          excerpt: form.excerpt,
          category: form.category,
          date: form.date,
          image: form.image,
          author: form.author,
          content: form.content,
        });
        if (error) throw error;
        toast.success("Post created");
      }
      onOpenChange(false);
      onSaved?.();
    } catch (e) {
      toast.error("Failed to save post");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{form.id ? "Edit Post" : "Add New Post"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={form.title} onChange={(e) => handleChange("title", e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" value={form.slug} onChange={(e) => handleChange("slug", e.target.value)} placeholder="post-slug" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" value={form.date} onChange={(e) => handleChange("date", e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Input id="category" value={form.category} onChange={(e) => handleChange("category", e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="author">Author</Label>
              <Input id="author" value={form.author} onChange={(e) => handleChange("author", e.target.value)} />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="image">Image URL</Label>
            <Input id="image" value={form.image} onChange={(e) => handleChange("image", e.target.value)} placeholder="https://..." />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea id="excerpt" value={form.excerpt} onChange={(e) => handleChange("excerpt", e.target.value)} rows={3} />
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
