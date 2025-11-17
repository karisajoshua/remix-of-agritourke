import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Pencil, Trash2, Upload, Copy, Plus } from 'lucide-react';
import { toast } from 'sonner';
import AdminLayout from '@/components/AdminLayout';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import GalleryUploadDialog from '@/components/admin/GalleryUploadDialog';
import GalleryEditDialog from '@/components/admin/GalleryEditDialog';

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description: string;
  category: string;
}

export default function AdminGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [editImage, setEditImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setImages(data || []);
    } catch (error: any) {
      toast.error("Failed to load gallery images");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const { error } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', deleteId);

      if (error) throw error;

      toast.success('Image deleted successfully');
      fetchImages();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete image');
    } finally {
      setDeleteId(null);
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('Image URL copied to clipboard');
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-agri-green"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-agri-dark">Gallery Management</h2>
            <p className="text-muted-foreground mt-2">Manage your gallery images</p>
          </div>
          <Button className="gap-2" onClick={() => setUploadOpen(true)}>
            <Plus className="h-4 w-4" />
            Upload Images
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {images.map((image) => (
            <Card key={image.id} className="border-none shadow-sm group relative">
              <CardContent className="p-0">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.title || "Gallery image"}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setEditImage(image)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setDeleteId(image.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {image.title && (
                  <div className="p-2">
                    <p className="text-sm font-medium truncate">{image.title}</p>
                    {image.category && (
                      <p className="text-xs text-muted-foreground">{image.category}</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {images.length === 0 && (
          <Card className="border-none shadow-sm">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground">No images found. Upload your first image to get started.</p>
            </CardContent>
          </Card>
        )}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the image.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <GalleryUploadDialog
        open={uploadOpen}
        onOpenChange={setUploadOpen}
        onSaved={fetchImages}
      />

      <GalleryEditDialog
        open={!!editImage}
        onOpenChange={(open) => !open && setEditImage(null)}
        image={editImage}
        onSaved={fetchImages}
      />
    </AdminLayout>
  );
}
