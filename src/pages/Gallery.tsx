
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filters = ['All', '2025 Agri Expo', 'Trade Expo 2013'];

  const galleryImages = {
    '2025 Agri Expo': [
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/2025%20agri%20expo/Coffee%20Expo.webp',
        title: 'Coffee Expo Display',
        description: 'Premium coffee showcase at the agricultural expo'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/2025%20agri%20expo/Expo%20Billboard.webp',
        title: 'Expo Billboard',
        description: 'Main entrance billboard welcoming visitors'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/2025%20agri%20expo/Expo%20Visitors.webp',
        title: 'Expo Visitors',
        description: 'Engaged visitors exploring agricultural innovations'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/2025%20agri%20expo/Farm%20Expo%20tours.webp',
        title: 'Farm Expo Tours',
        description: 'Guided tours showcasing modern farming techniques'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/2025%20agri%20expo/Farm%20Machinery.webp',
        title: 'Farm Machinery',
        description: 'Latest agricultural equipment and technology'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/2025%20agri%20expo/Farm%20Stand%20Visits.webp',
        title: 'Farm Stand Visits',
        description: 'Local farmers showcasing their produce'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/2025%20agri%20expo/Giant%20Flemming%20Rabbits.webp',
        title: 'Giant Flemming Rabbits',
        description: 'Impressive livestock breeding showcase'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/2025%20agri%20expo/Industrial%20Tourism.webp',
        title: 'Industrial Tourism',
        description: 'Modern industrial agricultural practices'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/2025%20agri%20expo/On-ground%20learning.webp',
        title: 'On-ground Learning',
        description: 'Hands-on educational experiences'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/2025%20agri%20expo/Organic%20Farm%20Spices.webp',
        title: 'Organic Farm Spices',
        description: 'Premium organic spice collection'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/2025%20agri%20expo/Organic%20Fruit%20Jars.webp',
        title: 'Organic Fruit Jars',
        description: 'Preserved organic fruit products'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/2025%20agri%20expo/Organic%20Seed%20Farming.webp',
        title: 'Organic Seed Farming',
        description: 'Sustainable seed production methods'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/2025%20agri%20expo/Organic%20Seeds.webp',
        title: 'Organic Seeds',
        description: 'High-quality organic seed varieties'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/2025%20agri%20expo/Seed%20Bank.webp',
        title: 'Seed Bank',
        description: 'Preservation of indigenous seed varieties'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/2025%20agri%20expo/Seed%20Ploughs.webp',
        title: 'Seed Ploughs',
        description: 'Modern ploughing equipment demonstration'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/2025%20agri%20expo/SME%20Spice%20Stand.webp',
        title: 'SME Spice Stand',
        description: 'Small business spice vendors'
      }
    ],
    'Trade Expo 2013': [
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Trade%20expo%202013/Bracelets.webp',
        title: 'Handcrafted Bracelets',
        description: 'Traditional Kenyan craftsmanship on display'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Trade%20expo%202013/Busy%20Crowd.webp',
        title: 'Busy Crowd',
        description: 'Enthusiastic visitors exploring the expo'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Trade%20expo%202013/Corridor.webp',
        title: 'Expo Corridor',
        description: 'Main walkway connecting exhibition halls'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Trade%20expo%202013/Entrance.webp',
        title: 'Expo Entrance',
        description: 'Grand entrance to the trade exposition'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Trade%20expo%202013/Feeding%20Troughs.webp',
        title: 'Feeding Troughs',
        description: 'Agricultural equipment for livestock'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Trade%20expo%202013/Friendly%20People.webp',
        title: 'Friendly People',
        description: 'Warm Kenyan hospitality at the expo'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Trade%20expo%202013/Friendly%20Poses.webp',
        title: 'Friendly Poses',
        description: 'Happy visitors enjoying their experience'
      }
    ]
  };

  const getAllImages = () => {
    return [
      ...galleryImages['2025 Agri Expo'].map(img => ({ ...img, category: '2025 Agri Expo' })),
      ...galleryImages['Trade Expo 2013'].map(img => ({ ...img, category: 'Trade Expo 2013' }))
    ];
  };

  const getFilteredImages = () => {
    if (activeFilter === 'All') {
      return getAllImages();
    }
    return galleryImages[activeFilter as keyof typeof galleryImages]?.map(img => ({ ...img, category: activeFilter })) || [];
  };

  const filteredImages = getFilteredImages();

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-agri-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-poppins font-bold text-agri-dark mb-6">
              Photo Gallery
            </h1>
            <p className="text-xl text-gray-600 font-inter max-w-3xl mx-auto">
              Explore our journey through Kenya's agricultural exhibitions and experiences. 
              Witness the innovation, community, and sustainable practices that define our agritourism adventures.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {filters.map((filter) => (
              <Button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                variant={activeFilter === filter ? "default" : "outline"}
                className={`font-inter font-medium ${
                  activeFilter === filter
                    ? 'bg-agri-green hover:bg-agri-green/90 text-white'
                    : 'border-agri-green text-agri-green hover:bg-agri-green hover:text-white'
                }`}
              >
                {filter}
              </Button>
            ))}
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedImage(image.url)}
              >
                <div className="aspect-w-16 aspect-h-12 overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-poppins font-semibold text-sm mb-1">{image.title}</h3>
                  <p className="font-inter text-xs text-gray-200">{image.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-7xl max-h-[90vh] mx-4">
            <img
              src={selectedImage}
              alt="Gallery image"
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <Button
              variant="outline"
              size="icon"
              className="absolute top-4 right-4 bg-white/90 hover:bg-white"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;
