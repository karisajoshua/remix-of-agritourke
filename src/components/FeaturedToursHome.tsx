import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, Users, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TourDetailModal from './TourDetailModal';
import { supabase } from '@/integrations/supabase/client';

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
  full_description: string;
  itinerary: { day: number; title: string; details: string }[];
  includes: string[];
  external_links: { label: string; url: string }[];
}

const FeaturedToursHome = () => {
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const navigate = useNavigate();

  const { data: featuredTours = [], isLoading } = useQuery({
    queryKey: ['featured-tours'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tours')
        .select('*')
        .eq('featured', true)
        .limit(3);
      
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
        featured: tour.featured || false,
        full_description: tour.full_description || '',
        itinerary: Array.isArray(tour.itinerary) ? tour.itinerary as { day: number; title: string; details: string }[] : [],
        includes: Array.isArray(tour.includes) ? tour.includes as string[] : [],
        external_links: Array.isArray(tour.external_links) ? tour.external_links as { label: string; url: string }[] : []
      })) as Tour[];
    }
  });

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

  if (featuredTours.length === 0) {
    return null;
  }

  return (
    <section id="tours" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-agri-dark mb-6">
            Featured Tours & Experiences
          </h2>
          <p className="text-xl text-gray-600 font-inter max-w-4xl mx-auto leading-relaxed">
            Discover our most popular <a href="https://nationalaglawcenter.org/overview/agritourism/" target="_blank" rel="noopener noreferrer" className="text-agri-green hover:text-agri-green/80 underline">agritourism adventures</a> that blend nature, culture, 
            and learning into unforgettable journeys.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredTours.map((tour) => (
            <div
              key={tour.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ring-2 ring-agri-yellow"
            >
              <div className="relative">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 bg-agri-yellow text-agri-dark px-3 py-1 rounded-full text-sm font-inter font-semibold">
                  Featured
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-poppins font-bold text-agri-dark mb-3">
                  {tour.title}
                </h3>
                <p className="text-gray-600 font-inter mb-4 leading-relaxed line-clamp-3">
                  {tour.description.replace(/<[^>]*>/g, '')}
                </p>

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

                <Button 
                  onClick={() => setSelectedTour(tour)}
                  className="w-full bg-agri-teal hover:bg-agri-teal/90 text-white font-inter font-semibold group"
                >
                  Explore Tour
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            onClick={() => navigate('/tours')}
            className="bg-agri-green hover:bg-agri-green/90 text-white font-inter font-semibold px-8"
          >
            View All Tours
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {selectedTour && (
        <TourDetailModal
          tour={{
            ...selectedTour,
            fullDescription: selectedTour.full_description,
            externalLinks: selectedTour.external_links.map(link => ({ title: link.label, url: link.url })),
            itinerary: selectedTour.itinerary.map(item => item.details)
          }}
          isOpen={!!selectedTour}
          onClose={() => setSelectedTour(null)}
        />
      )}
    </section>
  );
};

export default FeaturedToursHome;
