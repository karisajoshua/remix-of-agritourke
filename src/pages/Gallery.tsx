import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useContentProtection } from '@/hooks/useContentProtection';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description: string;
  category: string;
}

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  
  useContentProtection();

  // Only fetch visible images for the frontend
  const { data: images = [], isLoading } = useQuery({
    queryKey: ['gallery-images-visible'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .eq('visible', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as GalleryImage[];
    }
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['gallery-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gallery_categories')
        .select('name')
        .order('name');
      
      if (error) throw error;
      return data.map(c => c.name);
    }
  });

  // Build filters from database categories
  const filters = ['All', ...categories];

  const filteredImages = activeFilter === 'All'
    ? images
    : images.filter(img => img.category === activeFilter);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-20 flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-agri-green"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Breadcrumb */}
      <div className="pt-20 pb-4 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Gallery</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      
      {/* Hero Section */}
      <section className="relative py-16 bg-agri-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-poppins font-bold text-agri-dark mb-6">
              Our Gallery
            </h1>
            <p className="text-xl text-gray-600 font-inter max-w-4xl mx-auto leading-relaxed">
              Explore our visual journey through Kenya's agricultural landscapes, events, and experiences.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {filters.map((filter) => (
              <Button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                variant={activeFilter === filter ? "default" : "outline"}
                className={activeFilter === filter 
                  ? "bg-agri-green hover:bg-agri-green/90 text-white" 
                  : "border-agri-green text-agri-green hover:bg-agri-green hover:text-white"
                }
              >
                {filter}
              </Button>
            ))}
          </div>

          {/* Masonry Gallery Grid */}
          {filteredImages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 font-inter">No images found in this category.</p>
            </div>
          ) : (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className="break-inside-avoid mb-4 group cursor-pointer overflow-hidden rounded-lg"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="relative">
                    <img
                      src={image.url}
                      alt={image.title || 'Gallery image'}
                      className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                      draggable="false"
                      onContextMenu={(e) => e.preventDefault()}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end">
                      <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h3 className="font-semibold text-sm">{image.title}</h3>
                        {image.category && (
                          <p className="text-xs text-white/80">{image.category}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Category Description */}
          {activeFilter !== 'All' && (
            <div className="mt-12 text-center">
              <p className="text-gray-600 font-inter">
                Showing {filteredImages.length} images from {activeFilter}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-8 w-8" />
          </button>
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.url}
              alt={selectedImage.title || "Gallery image"}
              className="max-w-full max-h-[80vh] object-contain mx-auto"
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
            />
            {(selectedImage.title || selectedImage.description) && (
              <div className="mt-4 text-center text-white">
                {selectedImage.title && (
                  <h3 className="text-xl font-semibold">{selectedImage.title}</h3>
                )}
                {selectedImage.description && (
                  <p className="text-gray-300 mt-2">{selectedImage.description}</p>
                )}
                {selectedImage.category && (
                  <p className="text-gray-400 text-sm mt-1">{selectedImage.category}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;
