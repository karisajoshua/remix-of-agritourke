import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, Users, ArrowRight, Tag } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import TourDetailModal from '@/components/TourDetailModal';
import QuoteRequestDialog from '@/components/QuoteRequestDialog';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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
  price_starting_from: number | null;
}

const Tours = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState(searchParams.get('category') || 'All');
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [quoteTour, setQuoteTour] = useState<{ id: string; title: string } | null>(null);

  const filters = ['All', 'Farm Tours', 'Safari & Wildlife', 'Cultural & Urban', 'Regional Experiences', 'Educational Tours'];

  const { data: tours = [], isLoading, error } = useQuery({
    queryKey: ['tours'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tours')
        .select('*')
        .order('featured', { ascending: false });
      
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
        external_links: Array.isArray(tour.external_links) ? tour.external_links as { label: string; url: string }[] : [],
        price_starting_from: tour.price_starting_from ?? null,
      })) as Tour[];
    }
  });

  useEffect(() => {
    const category = searchParams.get('category');
    if (category && filters.includes(category)) {
      setActiveFilter(category);
    }
  }, [searchParams]);

  useEffect(() => {
    if (error) {
      toast.error('Failed to load tours');
    }
  }, [error]);

  const filteredTours = activeFilter === 'All'
    ? tours 
    : tours.filter(tour => tour.category === activeFilter);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE').format(price);
  };

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
                <BreadcrumbPage>Tours</BreadcrumbPage>
              </BreadcrumbItem>
              {activeFilter !== 'All' && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{activeFilter}</BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      
      {/* Hero & Tours Section */}
      <section className="py-16 bg-agri-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-poppins font-bold text-agri-dark mb-6">
              All Tours & Itineraries
            </h1>
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
                onClick={() => {
                  setActiveFilter(filter);
                  if (filter === 'All') {
                    setSearchParams({});
                  } else {
                    setSearchParams({ category: filter });
                  }
                }}
                className={`px-6 py-3 rounded-full font-inter font-medium transition-all duration-200 ${
                  activeFilter === filter
                    ? 'bg-agri-green text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Tours Grid */}
          {filteredTours.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 font-inter">No tours found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTours.map((tour) => (
                <div
                  key={tour.id}
                  className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                    tour.featured ? 'ring-2 ring-agri-yellow' : ''
                  }`}
                >
                  <div className="relative">
                    <img
                      src={tour.image}
                      alt={tour.title}
                      className="w-full h-48 object-cover"
                    />
                    {tour.featured && (
                      <div className="absolute top-4 left-4 bg-agri-yellow text-agri-dark px-3 py-1 rounded-full text-sm font-inter font-semibold">
                        Featured
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-poppins font-bold text-agri-dark mb-3">
                      {tour.title}
                    </h3>
                    <p className="text-gray-600 font-inter mb-4 leading-relaxed line-clamp-3">
                      {tour.description.replace(/<[^>]*>/g, '')}
                    </p>

                    <div className="space-y-2 mb-4">
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

                    {/* Price */}
                    {tour.price_starting_from && (
                      <div className="flex items-center gap-2 mb-4 bg-agri-green/5 px-3 py-2 rounded-lg">
                        <Tag className="h-4 w-4 text-agri-green" />
                        <span className="text-sm font-inter font-semibold text-agri-green">
                          Starting from KES {formatPrice(tour.price_starting_from)}
                        </span>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button 
                        onClick={() => setSelectedTour(tour)}
                        className="flex-1 bg-agri-teal hover:bg-agri-teal/90 text-white font-inter font-semibold group"
                      >
                        Explore
                        <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setQuoteTour({ id: tour.id, title: tour.title })}
                        className="flex-1 border-agri-green text-agri-green hover:bg-agri-green hover:text-white font-inter font-semibold"
                      >
                        Get Quote
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />

      {selectedTour && (
        <TourDetailModal
          tour={{
            ...selectedTour,
            fullDescription: selectedTour.full_description,
            externalLinks: selectedTour.external_links.map(link => ({ title: link.label, url: link.url })),
            itinerary: selectedTour.itinerary.map(item => item.details),
            priceStartingFrom: selectedTour.price_starting_from,
          }}
          isOpen={!!selectedTour}
          onClose={() => setSelectedTour(null)}
          onRequestQuote={() => {
            setQuoteTour({ id: selectedTour.id, title: selectedTour.title });
          }}
        />
      )}

      {quoteTour && (
        <QuoteRequestDialog
          open={!!quoteTour}
          onOpenChange={(open) => !open && setQuoteTour(null)}
          tourId={quoteTour.id}
          tourTitle={quoteTour.title}
        />
      )}
    </div>
  );
};

export default Tours;
