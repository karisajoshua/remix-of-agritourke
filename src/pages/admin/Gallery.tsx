import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Pencil, Trash2, Copy, Plus, Download, Eye, EyeOff } from 'lucide-react';
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
  visible: boolean;
}

export default function AdminGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [editImage, setEditImage] = useState<GalleryImage | null>(null);
  const [importing, setImporting] = useState(false);
  const [filter, setFilter] = useState<'all' | 'visible' | 'hidden'>('all');

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

  const toggleVisibility = async (image: GalleryImage) => {
    try {
      const { error } = await supabase
        .from('gallery_images')
        .update({ visible: !image.visible })
        .eq('id', image.id);

      if (error) throw error;

      setImages(images.map(img => 
        img.id === image.id ? { ...img, visible: !img.visible } : img
      ));
      
      toast.success(image.visible ? 'Image hidden from website' : 'Image visible on website');
    } catch (error) {
      toast.error('Failed to update visibility');
    }
  };

  const filteredImages = images.filter(img => {
    if (filter === 'visible') return img.visible;
    if (filter === 'hidden') return !img.visible;
    return true;
  });

  const importAllGalleryImages = async () => {
    setImporting(true);
    try {
      // First seed the categories
      const categories = ['2025 Agri Expo', 'Trade Expo 2023', 'Coffee Farm Safari', 'GR13 Summit 2023', 'Mbuzi Farm'];
      
      for (const cat of categories) {
        await supabase.from('gallery_categories').upsert({ name: cat }, { onConflict: 'name' });
      }

      // All gallery images from the frontend
      const allImages = [
        // 2025 Agri Expo
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/2025%20agri%20expo/Coffee%20Expo.webp', title: 'Coffee Expo Display', description: 'Premium coffee showcase at the agricultural expo', category: '2025 Agri Expo', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/2025%20agri%20expo/Expo%20Billboard.webp', title: 'Expo Billboard', description: 'Main entrance billboard welcoming visitors', category: '2025 Agri Expo', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/2025%20agri%20expo/Expo%20Visitors.webp', title: 'Expo Visitors', description: 'Engaged visitors exploring agricultural innovations', category: '2025 Agri Expo', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/2025%20agri%20expo/Farm%20Expo%20tours.webp', title: 'Farm Expo Tours', description: 'Guided tours showcasing modern farming techniques', category: '2025 Agri Expo', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/2025%20agri%20expo/Farm%20Machinery.webp', title: 'Farm Machinery', description: 'Latest agricultural equipment and technology', category: '2025 Agri Expo', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/2025%20agri%20expo/Farm%20Stand%20Visits.webp', title: 'Farm Stand Visits', description: 'Local farmers showcasing their produce', category: '2025 Agri Expo', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/2025%20agri%20expo/Giant%20Flemming%20Rabbits.webp', title: 'Giant Flemming Rabbits', description: 'Impressive livestock breeding showcase', category: '2025 Agri Expo', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/2025%20agri%20expo/Industrial%20Tourism.webp', title: 'Industrial Tourism', description: 'Modern industrial agricultural practices', category: '2025 Agri Expo', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/2025%20agri%20expo/On-ground%20learning.webp', title: 'On-ground Learning', description: 'Hands-on educational experiences', category: '2025 Agri Expo', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/2025%20agri%20expo/Organic%20Farm%20Spices.webp', title: 'Organic Farm Spices', description: 'Premium organic spice collection', category: '2025 Agri Expo', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/2025%20agri%20expo/Organic%20Fruit%20Jars.webp', title: 'Organic Fruit Jars', description: 'Preserved organic fruit products', category: '2025 Agri Expo', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/2025%20agri%20expo/Organic%20Seed%20Farming.webp', title: 'Organic Seed Farming', description: 'Sustainable seed production methods', category: '2025 Agri Expo', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/2025%20agri%20expo/Organic%20Seeds.webp', title: 'Organic Seeds', description: 'High-quality organic seed varieties', category: '2025 Agri Expo', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/2025%20agri%20expo/Seed%20Bank.webp', title: 'Seed Bank', description: 'Preservation of indigenous seed varieties', category: '2025 Agri Expo', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/2025%20agri%20expo/Seed%20Ploughs.webp', title: 'Seed Ploughs', description: 'Modern ploughing equipment demonstration', category: '2025 Agri Expo', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/2025%20agri%20expo/SME%20Spice%20Stand.webp', title: 'SME Spice Stand', description: 'Small business spice vendors', category: '2025 Agri Expo', visible: true },
        
        // Trade Expo 2023
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Trade%20expo%202013/Bracelets.webp', title: 'Handcrafted Bracelets', description: 'Traditional Kenyan craftsmanship on display', category: 'Trade Expo 2023', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Trade%20expo%202013/Busy%20Crowd.webp', title: 'Busy Crowd', description: 'Enthusiastic visitors exploring the expo', category: 'Trade Expo 2023', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Trade%20expo%202013/Corridor.webp', title: 'Expo Corridor', description: 'Main walkway connecting exhibition halls', category: 'Trade Expo 2023', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Trade%20expo%202013/Entrance.webp', title: 'Expo Entrance', description: 'Grand entrance to the trade exposition', category: 'Trade Expo 2023', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Trade%20expo%202013/Feeding%20Troughs.webp', title: 'Feeding Troughs', description: 'Agricultural equipment for livestock', category: 'Trade Expo 2023', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Trade%20expo%202013/Friendly%20People.webp', title: 'Friendly People', description: 'Warm Kenyan hospitality at the expo', category: 'Trade Expo 2023', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Trade%20expo%202013/Friendly%20Poses.webp', title: 'Friendly Poses', description: 'Happy visitors enjoying their experience', category: 'Trade Expo 2023', visible: true },
        
        // Coffee Farm Safari
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Fair%20view/Age.webp', title: 'Agricultural Heritage', description: 'Timeless farming traditions passed down through generations', category: 'Coffee Farm Safari', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Fair%20view/Bean%20hands.webp', title: 'Bean Harvest', description: 'Fresh beans carefully selected by skilled hands', category: 'Coffee Farm Safari', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Fair%20view/Berries%20in%20a%20Bucket.webp', title: 'Berry Collection', description: 'Fresh berries gathered in traditional buckets', category: 'Coffee Farm Safari', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Fair%20view/Berry%20Picking.webp', title: 'Berry Picking Experience', description: 'Hands-on berry picking adventure in the fields', category: 'Coffee Farm Safari', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Fair%20view/Claims.webp', title: 'Land Claims', description: 'Historical agricultural land management', category: 'Coffee Farm Safari', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Fair%20view/coffee%20and%20dairy%20tour.webp', title: 'Coffee & Dairy Tour', description: 'Combined coffee and dairy farming experience', category: 'Coffee Farm Safari', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Fair%20view/Coffee%20array.webp', title: 'Coffee Array', description: 'Diverse coffee varieties displayed beautifully', category: 'Coffee Farm Safari', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Fair%20view/Coffee%20beans.webp', title: 'Premium Coffee Beans', description: 'High-quality coffee beans from highland farms', category: 'Coffee Farm Safari', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Fair%20view/Coffee%20brewer.webp', title: 'Coffee Brewing', description: 'Traditional coffee brewing methods', category: 'Coffee Farm Safari', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Fair%20view/Coffee%20sorting.webp', title: 'Coffee Sorting', description: 'Skilled coffee bean sorting process', category: 'Coffee Farm Safari', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Fair%20view/Coffee.webp', title: 'Coffee Culture', description: 'Rich coffee culture and traditions', category: 'Coffee Farm Safari', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Fair%20view/Conference.webp', title: 'Agricultural Conference', description: 'Educational conferences and knowledge sharing', category: 'Coffee Farm Safari', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Fair%20view/Exclamation.webp', title: 'Exciting Discoveries', description: 'Amazing agricultural innovations and discoveries', category: 'Coffee Farm Safari', visible: true },
        
        // GR13 Summit 2023
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/GR13%20summit%202013/Agri%20&%20Aqua%20Discussions.webp', title: 'Agricultural & Aqua Discussions', description: 'Strategic discussions on agriculture and aquaculture development', category: 'GR13 Summit 2023', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/GR13%20summit%202013/Cross%20Discussions.webp', title: 'Cross-Sector Discussions', description: 'Collaborative discussions across different agricultural sectors', category: 'GR13 Summit 2023', visible: true },
        
        // Mbuzi Farm
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/IMG_6869.webp', title: 'Farm Landscapes', description: 'Beautiful rural landscapes and farming environments', category: 'Mbuzi Farm', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/IMG_6873.webp', title: 'Goat Farming', description: 'Sustainable goat farming practices', category: 'Mbuzi Farm', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/IMG_6876.webp', title: 'Farm Activities', description: 'Daily farm activities and operations', category: 'Mbuzi Farm', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/IMG_6880.webp', title: 'Rural Life', description: 'Authentic rural life experiences', category: 'Mbuzi Farm', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/IMG_6886.webp', title: 'Farm Equipment', description: 'Traditional and modern farm equipment', category: 'Mbuzi Farm', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/IMG_6888.webp', title: 'Agricultural Learning', description: 'Hands-on agricultural learning experiences', category: 'Mbuzi Farm', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/IMG_6890.webp', title: 'Farm Tours', description: 'Guided farm tours and educational walks', category: 'Mbuzi Farm', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/IMG_6892.webp', title: 'Livestock Management', description: 'Professional livestock management practices', category: 'Mbuzi Farm', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/IMG_6894.webp', title: 'Farm Sustainability', description: 'Sustainable farming and environmental practices', category: 'Mbuzi Farm', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/IMG_6896.webp', title: 'Rural Adventures', description: 'Adventurous rural experiences', category: 'Mbuzi Farm', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/IMG_6901.webp', title: 'Farm Community', description: 'Strong farming community bonds', category: 'Mbuzi Farm', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/IMG_6905.webp', title: 'Agricultural Innovation', description: 'Innovative farming techniques and methods', category: 'Mbuzi Farm', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/IMG_6907.webp', title: 'Farm Production', description: 'Productive farming systems and outputs', category: 'Mbuzi Farm', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/IMG_6909.webp', title: 'Rural Tourism', description: 'Engaging rural tourism experiences', category: 'Mbuzi Farm', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/IMG_6911.webp', title: 'Farm Heritage', description: 'Rich agricultural heritage and traditions', category: 'Mbuzi Farm', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/IMG_6917.webp', title: 'Farm Education', description: 'Educational farm programs and workshops', category: 'Mbuzi Farm', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/IMG_6923.webp', title: 'Goat Interactions', description: 'Interactive goat farming experiences', category: 'Mbuzi Farm', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/IMG_6925.webp', title: 'Farm Hospitality', description: 'Warm farm hospitality and welcomes', category: 'Mbuzi Farm', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/IMG_6927.webp', title: 'Agricultural Diversity', description: 'Diverse agricultural activities and crops', category: 'Mbuzi Farm', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/IMG_6929.webp', title: 'Farm Experiences', description: 'Memorable farm experiences and activities', category: 'Mbuzi Farm', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/IMG_6935.webp', title: 'Organic Farming', description: 'Organic farming practices and methods', category: 'Mbuzi Farm', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/IMG_6936.webp', title: 'Farm Life', description: 'Daily farm life and routines', category: 'Mbuzi Farm', visible: true },
        { url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/IMG_6937.webp', title: 'Agricultural Success', description: 'Successful agricultural ventures and achievements', category: 'Mbuzi Farm', visible: true }
      ];

      // Insert in batches to avoid timeout
      const batchSize = 20;
      for (let i = 0; i < allImages.length; i += batchSize) {
        const batch = allImages.slice(i, i + batchSize);
        const { error } = await supabase.from('gallery_images').insert(batch);
        if (error) {
          console.error('Batch insert error:', error);
        }
      }

      toast.success(`Imported ${allImages.length} gallery images successfully!`);
      fetchImages();
    } catch (error) {
      console.error('Import error:', error);
      toast.error('Failed to import gallery images');
    } finally {
      setImporting(false);
    }
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

  const visibleCount = images.filter(img => img.visible).length;
  const hiddenCount = images.filter(img => !img.visible).length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h2 className="text-3xl font-bold text-agri-dark">Gallery Management</h2>
            <p className="text-muted-foreground mt-2">
              {images.length} images ({visibleCount} visible, {hiddenCount} hidden)
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" className="gap-2" onClick={importAllGalleryImages} disabled={importing}>
              <Download className="h-4 w-4" />
              {importing ? "Importing..." : "Import All Images"}
            </Button>
            <Button className="gap-2" onClick={() => setUploadOpen(true)}>
              <Plus className="h-4 w-4" />
              Upload Images
            </Button>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All ({images.length})
          </Button>
          <Button
            variant={filter === 'visible' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('visible')}
          >
            <Eye className="h-4 w-4 mr-1" /> Visible ({visibleCount})
          </Button>
          <Button
            variant={filter === 'hidden' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('hidden')}
          >
            <EyeOff className="h-4 w-4 mr-1" /> Hidden ({hiddenCount})
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {filteredImages.map((image) => (
            <Card 
              key={image.id} 
              className={`border-none shadow-sm group relative ${!image.visible ? 'opacity-60' : ''}`}
            >
              <CardContent className="p-0">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.title || "Gallery image"}
                    className="w-full h-full object-cover"
                  />
                  {/* Visibility badge */}
                  <div className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-medium ${
                    image.visible 
                      ? 'bg-green-500/90 text-white' 
                      : 'bg-gray-500/90 text-white'
                  }`}>
                    {image.visible ? 'Visible' : 'Hidden'}
                  </div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => toggleVisibility(image)}
                      title={image.visible ? 'Hide from website' : 'Show on website'}
                    >
                      {image.visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleCopyUrl(image.url)}
                      title="Copy URL"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setEditImage(image)}
                      title="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setDeleteId(image.id)}
                      title="Delete"
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

        {filteredImages.length === 0 && images.length > 0 && (
          <Card className="border-none shadow-sm">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground">No {filter} images found.</p>
            </CardContent>
          </Card>
        )}

        {images.length === 0 && (
          <Card className="border-none shadow-sm">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground mb-4">No images found. Import gallery images to get started.</p>
              <Button onClick={importAllGalleryImages} disabled={importing}>
                <Download className="h-4 w-4 mr-2" />
                {importing ? "Importing..." : "Import All Images"}
              </Button>
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
