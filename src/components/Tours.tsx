
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, Users, ArrowRight } from 'lucide-react';

const Tours = () => {
  const [activeFilter, setActiveFilter] = useState('All');

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
      featured: false
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
      featured: false
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
      featured: true
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
      featured: false
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
      featured: true
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
      featured: false
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
      featured: false
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
      featured: true
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
      featured: false
    }
  ];

  const filteredTours = activeFilter === 'All' 
    ? tours 
    : tours.filter(tour => tour.category === activeFilter);

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
                <Button className="w-full bg-agri-teal hover:bg-agri-teal/90 text-white font-inter font-semibold group">
                  Explore Tour
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            variant="outline" 
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
