
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
      title: "🐘 9-Day Mixed Farming Safari",
      duration: "9 days", 
      location: "Central Kenya",
      participants: "4-70 people",
      image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Fair%20view/Intro-2.webp",
      description: "Embrace the Calm Within. A comprehensive journey through Kenya's diverse agricultural landscape, from Mount Kenya to Thompson Falls.",
      category: "Safari & Wildlife",
      featured: true,
      fullDescription: "A 9-day comprehensive agricultural safari that takes you through Kenya's most fertile regions. Experience diverse farming systems from flower and wheat farms near Mount Kenya to dairy farms in Nyahururu, combined with wildlife viewing at Sweetwaters Game Reserve and Solio Ranch.",
      itinerary: [
        "Day 1: Nairobi to Nanyuki - Cross the Equator, Mount Kenya views",
        "Day 2: Flower & wheat farms, Sweetwaters Game Reserve",
        "Day 3: Nyahururu - Dairy tour & Thompson Falls",
        "Day 4: Maize farming & cattle milking experience", 
        "Day 5: Nyeri - Wildlife at Solio Ranch",
        "Day 6: Coffee farm tour & Baden Powell Memorial",
        "Day 7: Tea farm harvesting experience",
        "Day 8: Orphanage & community visit",
        "Day 9: Return to Nairobi via plantations"
      ],
      includes: ["All accommodation", "All meals", "Transportation", "Farm visits", "Game drives", "Professional guide", "Community visits"]
    },
    {
      id: 5,
      title: "☕ Coffee & Dairy Tour",
      duration: "1 day",
      location: "Central Kenya Highlands",
      participants: "2-150 people",
      image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Fair%20view/coffee%20and%20dairy%20tour.webp",
      description: "Make Every Sip an Adventure. Ready for your next farm vacation? Let's dive into nature, heritage, and a cup of fresh, farm-grown coffee.",
      category: "Farm Tours",
      featured: true,
      fullDescription: "We'll pick you up from your hotel in Nairobi at 8:00 AM. Just 8 kilometers away lies a 54-acre paradise—lush with coffee plants, rich in history, and surrounded by serene natural beauty. Our destination? Paradise Lost—a beautifully managed estate that offers more than just a farm tour.",
      itinerary: [
        "8:00 AM: Hotel pickup in Nairobi",
        "Paradise Lost estate arrival",
        "Nature walks and birdwatching",
        "Horse and camel riding",
        "Maasai ostrich feeding",
        "Coffee berry picking experience",
        "Processing and production line tour",
        "Brand your own coffee with Kenyan label",
        "Dairy farm experience - milking session",
        "Return to Nairobi with fresh coffee"
      ],
      includes: ["Hotel pickup", "Estate activities", "Coffee processing experience", "Dairy farm visit", "Take-home coffee", "All activities"]
    },
    {
      id: 8,
      title: "🏔️ Ngong Adrenaline Rush",
      duration: "1 day",
      location: "Ngong Hills",
      participants: "4-80 people",
      image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/Ngong%20adrenaline.webp",
      description: "We Turn Moments Into Memories. Nestled in the breathtaking Rift Valley, Ngong Hills are among Kenya's most exhilarating adventure destinations.",
      category: "Regional Experiences",
      featured: true,
      fullDescription: "Meet at International House parking lot (CBD) at 8:00 AM, and after a quick meet-and-greet, we'll hit the road by 8:30 AM. Our journey takes us past Maasai villages and through scenic terrain, with a short stop for teambuilding exercises to shake off the chill of the highlands.",
      itinerary: [
        "8:00 AM: Meet at International House CBD",
        "8:30 AM: Departure past Maasai villages",
        "10:30 AM: Kompass Hotel arrival",
        "Ziplining across hilltops",
        "Archery challenges",
        "Mountain hiking and photography",
        "Teambuilding and group games",
        "Nature walk through untouched landscape",
        "2:30 PM: Nyama Choma lunch at Riverside Restaurant",
        "4:30 PM: Return to Nairobi"
      ],
      includes: ["Transportation", "Adventure activities", "Teambuilding", "Nyama Choma lunch", "Mountain access"]
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
            and learning into unforgettable journeys. Our tours are developed following <a href="https://sarep.ucdavis.edu/sustainable-ag/agritourism" target="_blank" rel="noopener noreferrer" className="text-agri-green hover:text-agri-dark underline">UC Davis agritourism research</a> and sustainable tourism best practices recommended by <a href="https://www.unwto.org/" target="_blank" rel="noopener noreferrer" className="text-agri-green hover:text-agri-dark underline">UNWTO</a>.
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
