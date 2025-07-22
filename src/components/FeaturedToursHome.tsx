
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, Users, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TourDetailModal from './TourDetailModal';

const FeaturedToursHome = () => {
  const [selectedTour, setSelectedTour] = useState(null);
  const navigate = useNavigate();

  const featuredTours = [
    {
      id: 3,
      title: "🐘 Agricultural Wildlife Safari",
      duration: "9 days",
      location: "Southern Kenya",
      participants: "6-12 people",
      image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/2025%20agri%20expo/Farm%20Expo%20tours.webp",
      description: "Combine traditional safari experiences with visits to sustainable farming communities.",
      category: "Safari & Wildlife",
      featured: true,
      fullDescription: "The ultimate Kenya experience combining wildlife viewing with agricultural learning. Visit national parks for game drives while also exploring how local communities practice sustainable farming alongside wildlife conservation.",
      itinerary: [
        "Day 1-2: Nairobi arrival and orientation",
        "Day 3-4: Maasai Mara game drives",
        "Day 5: Community farming visit",
        "Day 6-7: Amboseli National Park",
        "Day 8: Agricultural cooperative visit",
        "Day 9: Departure"
      ],
      includes: ["Safari vehicle", "Park fees", "Accommodation", "All meals", "Professional guide", "Community visits"]
    },
    {
      id: 5,
      title: "☕ Coffee Estate Tour",
      duration: "2 days",
      location: "Central Kenya",
      participants: "4-18 people",
      image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/2025%20agri%20expo/Coffee%20Expo.webp",
      description: "Follow the journey of coffee from cherry to cup at a scenic highland estate.",
      category: "Farm Tours",
      featured: true,
      fullDescription: "Experience Kenya's world-renowned coffee culture in the scenic Central Highlands. Learn about coffee cultivation, processing, and roasting while enjoying fresh mountain air and beautiful landscapes.",
      itinerary: [
        "Day 1: Coffee plantation tour",
        "Day 1: Cherry picking experience",
        "Day 2: Processing and roasting",
        "Day 2: Cupping and tasting session"
      ],
      includes: ["Accommodation", "Meals", "Coffee processing experience", "Take-home coffee"]
    },
    {
      id: 8,
      title: "🏔️ Rift Valley Farm Experience",
      duration: "5 days",
      location: "Rift Valley",
      participants: "4-16 people",
      image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/2025%20agri%20expo/Farm%20Machinery.webp",
      description: "Explore the agricultural diversity in Kenya's fertile Rift Valley.",
      category: "Regional Experiences",
      featured: true,
      fullDescription: "Journey through Kenya's most fertile agricultural region, the Rift Valley. Experience diverse farming systems from large-scale mechanized farms to traditional smallholder agriculture.",
      itinerary: [
        "Day 1: Arrival and orientation",
        "Day 2: Large-scale farming visit",
        "Day 3: Smallholder farmer community",
        "Day 4: Agricultural research center",
        "Day 5: Market visit and departure"
      ],
      includes: ["Accommodation", "All meals", "Transportation", "Farm visits", "Research center tour"]
    }
  ];

  return (
    <section id="tours" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-agri-dark mb-6">
            Featured Tours & Experiences
          </h2>
          <p className="text-xl text-gray-600 font-inter max-w-4xl mx-auto leading-relaxed">
            Discover our most popular agritourism adventures that blend nature, culture, 
            and learning into unforgettable journeys.
          </p>
        </div>

        {/* Featured Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredTours.map((tour) => (
            <div
              key={tour.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ring-2 ring-agri-yellow"
            >
              {/* Tour Image */}
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

              {/* Tour Content */}
              <div className="p-6">
                <h3 className="text-xl font-poppins font-bold text-agri-dark mb-3">
                  {tour.title}
                </h3>
                <p className="text-gray-600 font-inter mb-4 leading-relaxed">
                  {tour.description}
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

        {/* View All Tours Button */}
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

      {/* Tour Detail Modal */}
      {selectedTour && (
        <TourDetailModal
          tour={selectedTour}
          isOpen={!!selectedTour}
          onClose={() => setSelectedTour(null)}
        />
      )}
    </section>
  );
};

export default FeaturedToursHome;
