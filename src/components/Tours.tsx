import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, Users, ArrowRight, Tag } from 'lucide-react';
import { useContentProtection } from '@/hooks/useContentProtection';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

interface Tour {
  id: string;
  title: string;
  duration: string;
  location: string;
  participants: string;
  image: string;
  description: string;
  category: string;
  featured: boolean;
  price_starting_from: number | null;
}

const Tours = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const navigate = useNavigate();
  useContentProtection();

  const filters = ['All', 'Farm Tours', 'Safari & Wildlife', 'Cultural & Urban', 'Regional Experiences'];

  const { data: tours = [], isLoading } = useQuery({
    queryKey: ['tours-home'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tours')
        .select('id, title, duration, location, participants, image, description, category, featured, price_starting_from')
        .order('featured', { ascending: false })
        .limit(9);
      
      if (error) throw error;
      
      return (data || []).map(tour => ({
        id: tour.id,
        title: tour.title,
        duration: tour.duration || '',
        location: tour.location || '',
        participants: tour.participants || '',
        image: tour.image || '',
        description: tour.description || '',
        category: tour.category || '',
        featured: tour.featured || false
      })) as Tour[];
    }
  });

  const filteredTours = activeFilter === 'All' 
    ? tours 
    : tours.filter(tour => tour.category === activeFilter);

  if (isLoading) {
    return (
      <section id="tours" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-agri-green"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="tours" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-agri-dark mb-6">
            Tours & Itineraries
          </h2>
          <p className="text-xl text-gray-600 font-inter max-w-4xl mx-auto leading-relaxed">
            From dairy farms to matatu rides, flower tours to adrenaline safaris—our trips 
            blend nature, culture, and learning into unforgettable journeys.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 rounded-full font-inter font-medium transition-all duration-200 ${
                activeFilter === filter
                  ? 'bg-agri-green text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Tours Grid */}
        {filteredTours.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 font-inter">No tours available. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTours.map((tour) => (
              <div
                key={tour.id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 image-protected ${
                  tour.featured ? 'ring-2 ring-agri-yellow' : ''
                }`}
              >
                {/* Tour Image */}
                <div className="relative">
                  <img
                    src={tour.image}
                    alt=""
                    className="w-full h-48 object-cover"
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                    style={{ pointerEvents: 'none' }}
                  />
                  <div className="absolute inset-0 bg-transparent z-10" />
                  {tour.featured && (
                    <div className="absolute top-4 left-4 bg-agri-yellow text-agri-dark px-3 py-1 rounded-full text-sm font-inter font-semibold z-20">
                      Featured
                    </div>
                  )}
                </div>

                {/* Tour Content */}
                <div className="p-6">
                  <h3 className="text-xl font-poppins font-bold text-agri-dark mb-3">
                    {tour.title}
                  </h3>
                  <p className="text-gray-600 font-inter mb-4 leading-relaxed line-clamp-2">
                    {tour.description.replace(/<[^>]*>/g, '')}
                  </p>

                  {/* Tour Details */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-gray-500 font-inter">
                      <Clock className="h-4 w-4 mr-2 text-agri-green" />
                      {tour.duration}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 font-inter">
                      <MapPin className="h-4 w-4 mr-2 text-agri-green" />
                      {tour.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 font-inter">
                      <Users className="h-4 w-4 mr-2 text-agri-green" />
                      {tour.participants}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button 
                    onClick={() => navigate('/tours')}
                    className="w-full bg-agri-teal hover:bg-agri-teal/90 text-white font-inter font-semibold group"
                  >
                    Explore Tour
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            variant="outline" 
            onClick={() => navigate('/tours')}
            className="border-agri-green text-agri-green hover:bg-agri-green hover:text-white font-inter font-semibold px-8"
          >
            View All Tours
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Tours;
