
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, Users, ArrowRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import TourDetailModal from '@/components/TourDetailModal';

const Tours = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedTour, setSelectedTour] = useState(null);

  const filters = ['All', 'Farm Tours', 'Safari & Wildlife', 'Cultural & Urban', 'Regional Experiences'];

  const tours = [
    {
      id: 1,
      title: "🌹 Flower Farm Tour",
      duration: "1-2 days",
      location: "Central Kenya",
      participants: "2-15 people",
      price: "$85",
      image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/2025%20agri%20expo/Organic%20Farm%20Spices.webp",
      description: "Experience the vibrant colors and fragrances of Kenya's renowned flower farms.",
      category: "Farm Tours",
      featured: false,
      fullDescription: "Immerse yourself in the colorful world of Kenya's flower industry. Visit state-of-the-art greenhouses, learn about sustainable growing practices, and witness the journey from seed to bloom. This tour includes hands-on activities like flower picking and arrangement workshops.",
      itinerary: [
        "Day 1: Arrival and farm orientation",
        "Day 1: Greenhouse tours and flower picking",
        "Day 2: Flower arrangement workshop",
        "Day 2: Visit to local flower market"
      ],
      includes: ["Transportation", "Guided tours", "Flower arrangement materials", "Light refreshments"]
    },
    {
      id: 2,
      title: "🍵 Tea Plantation Safari",
      duration: "3 days",
      location: "Western Kenya",
      participants: "4-20 people",
      price: "$275",
      image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/2025%20agri%20expo/Organic%20Seed%20Farming.webp",
      description: "Explore the lush highlands and learn about tea production from leaf to cup.",
      category: "Farm Tours",
      featured: false,
      fullDescription: "Journey through Kenya's scenic tea country in the highlands of Western Kenya. Experience the complete tea production process, from plucking fresh leaves to the final cup. Stay in comfortable accommodations with stunning views of rolling tea estates.",
      itinerary: [
        "Day 1: Arrival and tea estate tour",
        "Day 1: Tea plucking experience",
        "Day 2: Tea processing factory visit",
        "Day 2: Tea tasting and blending workshop",
        "Day 3: Cultural visit to local community"
      ],
      includes: ["Accommodation", "All meals", "Transportation", "Tea tasting sessions", "Cultural activities"]
    },
    {
      id: 3,
      title: "🐘 Agricultural Wildlife Safari",
      duration: "9 days",
      location: "Southern Kenya",
      participants: "6-12 people",
      price: "$1,200",
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
      id: 4,
      title: "🐄 Dairy Farm Experience",
      duration: "1 day",
      location: "Central Kenya",
      participants: "3-25 people",
      price: "$65",
      image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/2025%20agri%20expo/On-ground%20learning.webp",
      description: "Learn about modern dairy farming techniques and taste fresh dairy products.",
      category: "Farm Tours",
      featured: false,
      fullDescription: "Spend a day at a modern dairy farm learning about cattle management, milking processes, and dairy product manufacturing. Perfect for families and educational groups.",
      itinerary: [
        "Morning: Farm arrival and orientation",
        "Mid-morning: Cattle feeding experience",
        "Afternoon: Milking demonstration",
        "Late afternoon: Dairy processing tour"
      ],
      includes: ["Transportation", "Farm tour", "Fresh dairy tasting", "Light lunch"]
    },
    {
      id: 5,
      title: "☕ Coffee Estate Tour",
      duration: "2 days",
      location: "Central Kenya",
      participants: "4-18 people",
      price: "$180",
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
      id: 6,
      title: "🚌 Matatu Urban Farm Tour",
      duration: "1 day",
      location: "Nairobi",
      participants: "5-15 people",
      price: "$55",
      image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/2025%20agri%20expo/Industrial%20Tourism.webp",
      description: "Explore urban farming initiatives while traveling in Kenya's iconic matatu minibuses.",
      category: "Cultural & Urban",
      featured: false,
      fullDescription: "A unique urban adventure combining Kenya's vibrant matatu culture with innovative city farming. Visit rooftop gardens, vertical farms, and community gardens while experiencing authentic Nairobi transport.",
      itinerary: [
        "Morning: Matatu ride to urban farms",
        "Mid-morning: Vertical farming visit",
        "Afternoon: Community garden tour",
        "Late afternoon: Local market visit"
      ],
      includes: ["Matatu transport", "Farm visits", "Local guide", "Market experience"]
    },
    {
      id: 7,
      title: "🌊 Coastal Agricultural Tour",
      duration: "4 days",
      location: "Coastal Kenya",
      participants: "6-20 people",
      price: "$450",
      image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/2025%20agri%20expo/Organic%20Fruit%20Jars.webp",
      description: "Discover unique farming practices along Kenya's beautiful coastline.",
      category: "Regional Experiences",
      featured: false,
      fullDescription: "Explore the unique agricultural practices of Kenya's coastal region, including coconut farming, spice cultivation, and innovative irrigation techniques adapted to the coastal climate.",
      itinerary: [
        "Day 1: Arrival and coconut farm visit",
        "Day 2: Spice plantation tour",
        "Day 3: Irrigation systems and salt farming",
        "Day 4: Coastal community visit"
      ],
      includes: ["Accommodation", "Meals", "Transportation", "Farm visits", "Cultural activities"]
    },
    {
      id: 8,
      title: "🏔️ Rift Valley Farm Experience",
      duration: "5 days",
      location: "Rift Valley",
      participants: "4-16 people",
      price: "$520",
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
    },
    {
      id: 9,
      title: "🌾 Eastern Kenya Agri-Safari",
      duration: "3 days",
      location: "Eastern Kenya",
      participants: "5-18 people",
      price: "$295",
      image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/2025%20agri%20expo/Seed%20Bank.webp",
      description: "Discover the unique farming practices in Kenya's eastern regions.",
      category: "Regional Experiences",
      featured: false,
      fullDescription: "Explore the semi-arid farming systems of Eastern Kenya, learning about drought-resistant crops, water conservation, and innovative farming techniques adapted to challenging climatic conditions.",
      itinerary: [
        "Day 1: Drought-resistant crop farms",
        "Day 2: Water conservation projects",
        "Day 3: Seed bank and research visit"
      ],
      includes: ["Transportation", "Accommodation", "Meals", "Farm visits", "Research facility tour"]
    }
  ];

  const filteredTours = activeFilter === 'All' 
    ? tours 
    : tours.filter(tour => tour.category === activeFilter);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="pt-20 pb-20 bg-white">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTours.map((tour) => (
              <div
                key={tour.id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                  tour.featured ? 'ring-2 ring-agri-yellow' : ''
                }`}
              >
                {/* Tour Image */}
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
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-agri-dark font-inter font-bold">
                    {tour.price}
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
        </div>
      </section>

      <Footer />

      {/* Tour Detail Modal */}
      {selectedTour && (
        <TourDetailModal
          tour={selectedTour}
          isOpen={!!selectedTour}
          onClose={() => setSelectedTour(null)}
        />
      )}
    </div>
  );
};

export default Tours;
