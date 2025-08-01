import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useContentProtection } from '@/hooks/useContentProtection';

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Enable content protection
  useContentProtection();

  const filters = ['All', '2025 Agri Expo', 'Trade Expo 2023', 'Coffee Farm Safari', 'GR13 Summit 2023', 'Mbuzi Farm'];

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
    'Trade Expo 2023': [
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
    ],
    'Coffee Farm Safari': [
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Fair%20view/Age.webp',
        title: 'Agricultural Heritage',
        description: 'Timeless farming traditions passed down through generations'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Fair%20view/Bean%20hands.webp',
        title: 'Bean Harvest',
        description: 'Fresh beans carefully selected by skilled hands'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Fair%20view/Berries%20in%20a%20Bucket.webp',
        title: 'Berry Collection',
        description: 'Fresh berries gathered in traditional buckets'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Fair%20view/Berry%20Picking.webp',
        title: 'Berry Picking Experience',
        description: 'Hands-on berry picking adventure in the fields'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Fair%20view/Claims.webp',
        title: 'Land Claims',
        description: 'Historical agricultural land management'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Fair%20view/coffee%20and%20dairy%20tour.webp',
        title: 'Coffee & Dairy Tour',
        description: 'Combined coffee and dairy farming experience'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Fair%20view/Coffee%20array.webp',
        title: 'Coffee Array',
        description: 'Diverse coffee varieties displayed beautifully'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Fair%20view/Coffee%20beans.webp',
        title: 'Premium Coffee Beans',
        description: 'High-quality coffee beans from highland farms'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Fair%20view/Coffee%20brewer.webp',
        title: 'Coffee Brewing',
        description: 'Traditional coffee brewing methods'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Fair%20view/Coffee%20sorting.webp',
        title: 'Coffee Sorting',
        description: 'Skilled coffee bean sorting process'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Fair%20view/Coffee.webp',
        title: 'Coffee Culture',
        description: 'Rich coffee culture and traditions'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Fair%20view/Conference.webp',
        title: 'Agricultural Conference',
        description: 'Educational conferences and knowledge sharing'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Fair%20view/Exclamation.webp',
        title: 'Exciting Discoveries',
        description: 'Amazing agricultural innovations and discoveries'
      }
    ],
    'GR13 Summit 2023': [
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/GR13%20summit%202013/Agri%20&%20Aqua%20Discussions.webp',
        title: 'Agricultural & Aqua Discussions',
        description: 'Strategic discussions on agriculture and aquaculture development'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/GR13%20summit%202013/Cross%20Discussions.webp',
        title: 'Cross-Sector Discussions',
        description: 'Collaborative discussions across different agricultural sectors'
      }
    ],
    'Mbuzi Farm': [
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/IMG_6869.webp',
        title: 'Farm Landscapes',
        description: 'Beautiful rural landscapes and farming environments'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/IMG_6873.webp',
        title: 'Goat Farming',
        description: 'Sustainable goat farming practices'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/IMG_6876.webp',
        title: 'Farm Activities',
        description: 'Daily farm activities and operations'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/IMG_6880.webp',
        title: 'Rural Life',
        description: 'Authentic rural life experiences'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/IMG_6886.webp',
        title: 'Farm Equipment',
        description: 'Traditional and modern farm equipment'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/IMG_6888.webp',
        title: 'Agricultural Learning',
        description: 'Hands-on agricultural learning experiences'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/IMG_6890.webp',
        title: 'Farm Tours',
        description: 'Guided farm tours and educational walks'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/IMG_6892.webp',
        title: 'Livestock Management',
        description: 'Professional livestock management practices'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/IMG_6894.webp',
        title: 'Farm Sustainability',
        description: 'Sustainable farming and environmental practices'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/IMG_6896.webp',
        title: 'Rural Adventures',
        description: 'Adventurous rural experiences'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/IMG_6901.webp',
        title: 'Farm Community',
        description: 'Strong farming community bonds'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/IMG_6905.webp',
        title: 'Agricultural Innovation',
        description: 'Innovative farming techniques and methods'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/IMG_6907.webp',
        title: 'Farm Production',
        description: 'Productive farming systems and outputs'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/IMG_6909.webp',
        title: 'Rural Tourism',
        description: 'Engaging rural tourism experiences'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/IMG_6911.webp',
        title: 'Farm Heritage',
        description: 'Rich agricultural heritage and traditions'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/IMG_6917.webp',
        title: 'Farm Education',
        description: 'Educational farm programs and workshops'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/IMG_6923.webp',
        title: 'Goat Interactions',
        description: 'Interactive goat farming experiences'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/IMG_6925.webp',
        title: 'Farm Hospitality',
        description: 'Warm farm hospitality and welcomes'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/IMG_6927.webp',
        title: 'Agricultural Diversity',
        description: 'Diverse agricultural activities and crops'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/IMG_6929.webp',
        title: 'Farm Experiences',
        description: 'Memorable farm experiences and activities'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/IMG_6935.webp',
        title: 'Organic Farming',
        description: 'Organic farming practices and methods'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/IMG_6936.webp',
        title: 'Farm Life',
        description: 'Daily farm life and routines'
      },
      {
        url: 'https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/IMG_6937.webp',
        title: 'Agricultural Success',
        description: 'Successful agricultural ventures and achievements'
      }
    ]
  };

  const getAllImages = () => {
    const result = [];
    
    // Safely access each category and only add if it exists
    if (galleryImages['2025 Agri Expo']) {
      result.push(...galleryImages['2025 Agri Expo'].map(img => ({ ...img, category: '2025 Agri Expo' })));
    }
    if (galleryImages['Trade Expo 2023']) {
      result.push(...galleryImages['Trade Expo 2023'].map(img => ({ ...img, category: 'Trade Expo 2023' })));
    }
    if (galleryImages['Coffee Farm Safari']) {
      result.push(...galleryImages['Coffee Farm Safari'].map(img => ({ ...img, category: 'Coffee Farm Safari' })));
    }
    if (galleryImages['GR13 Summit 2023']) {
      result.push(...galleryImages['GR13 Summit 2023'].map(img => ({ ...img, category: 'GR13 Summit 2023' })));
    }
    if (galleryImages['Mbuzi Farm']) {
      result.push(...galleryImages['Mbuzi Farm'].map(img => ({ ...img, category: 'Mbuzi Farm' })));
    }
    
    return result;
  };

  const getFilteredImages = () => {
    if (activeFilter === 'All') {
      return getAllImages();
    }
    const categoryImages = galleryImages[activeFilter as keyof typeof galleryImages];
    return categoryImages ? categoryImages.map(img => ({ ...img, category: activeFilter })) : [];
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

          {/* Enhanced Protected Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredImages.map((image, index) => {
              const isLarge = index % 7 === 0;
              const isMedium = index % 5 === 0 && !isLarge;
              const gridClass = isLarge 
                ? 'sm:col-span-2 sm:row-span-2' 
                : isMedium 
                ? 'sm:col-span-2' 
                : 'col-span-1';
              
              return (
                <div
                  key={index}
                  className={`group relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer image-protected ${gridClass}`}
                  onClick={() => setSelectedImage(image.url)}
                >
                  <div className="aspect-square overflow-hidden relative">
                    <img
                      src={image.url}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      draggable="false"
                      onContextMenu={(e) => e.preventDefault()}
                      style={{ pointerEvents: 'none' }}
                    />
                    {/* Invisible overlay for extra protection */}
                    <div className="absolute inset-0 bg-transparent z-10" />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 z-20"></div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                    <h3 className="font-poppins font-semibold text-sm mb-1">{image.title}</h3>
                    <p className="font-inter text-xs text-gray-200">{image.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Category Description */}
          {activeFilter !== 'All' && (
            <div className="mt-12 text-center">
              <div className="max-w-3xl mx-auto">
                {activeFilter === 'Coffee Farm Safari' && (
                  <p className="text-gray-600 font-inter leading-relaxed">
                    Coffee Farm Safari showcases the authentic agricultural experiences that connect visitors with Kenya's rich coffee farming heritage. From coffee processing to berry picking, these images capture the essence of hands-on farm life and sustainable coffee production practices.
                  </p>
                )}
                {activeFilter === 'GR13 Summit 2023' && (
                  <p className="text-gray-600 font-inter leading-relaxed">
                    The GR13 Summit 2023 brought together agricultural leaders and innovators to discuss the future of farming in Kenya. These images capture the collaborative spirit and knowledge sharing that drives agricultural advancement.
                  </p>
                )}
                {activeFilter === 'Trade Expo 2023' && (
                  <p className="text-gray-600 font-inter leading-relaxed">
                    The Trade Expo 2023 showcased Kenya's agricultural innovations and traditional craftsmanship. These images highlight the vibrant trade relationships and cultural exchanges that strengthen our agricultural community.
                  </p>
                )}
                {activeFilter === 'Mbuzi Farm' && (
                  <p className="text-gray-600 font-inter leading-relaxed">
                    Mbuzi Farm represents the heart of rural Kenya's agricultural community. These images showcase goat farming, sustainable practices, and the warm hospitality that makes agritourism such a meaningful experience.
                  </p>
                )}
                {activeFilter === '2025 Agri Expo' && (
                  <p className="text-gray-600 font-inter leading-relaxed">
                    The 2025 Agri Expo represents the latest in agricultural innovation and technology. These images showcase modern farming techniques, organic practices, and the future of sustainable agriculture in Kenya.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Protected Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90" 
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-7xl max-h-[90vh] mx-4 image-protected">
            <img
              src={selectedImage}
              alt=""
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
              style={{ pointerEvents: 'none' }}
            />
            {/* Invisible overlay for lightbox protection */}
            <div className="absolute inset-0 bg-transparent z-10" />
            <Button
              variant="outline"
              size="icon"
              className="absolute top-4 right-4 bg-white/90 hover:bg-white z-20"
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
