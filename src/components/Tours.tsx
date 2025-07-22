
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, Users, ArrowRight } from 'lucide-react';

const Tours = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Farm Tours', 'Wildlife', 'Cultural', 'Family-Friendly'];

  const tours = [
    {
      id: 1,
      title: "🌹 Flower Farm Tour",
      duration: "Half Day",
      location: "Naivasha",
      participants: "2-15 people",
      price: "$45",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=300&fit=crop",
      description: "Explore colorful flower farms and learn about Kenya's blooming export industry.",
      category: "Farm Tours",
      featured: true
    },
    {
      id: 2,
      title: "🐄 Dairy Safari Experience",
      duration: "Full Day",
      location: "Central Kenya",
      participants: "4-20 people",
      price: "$85",
      image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=400&h=300&fit=crop",
      description: "From milking cows to cheese making, discover Kenya's dairy farming traditions.",
      category: "Farm Tours",
      featured: false
    },
    {
      id: 3,
      title: "🐘 Agricultural Wildlife Safari",
      duration: "9 Days",
      location: "Multiple Locations",
      participants: "6-12 people",
      price: "$1,200",
      image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=400&h=300&fit=crop",
      description: "Combine wildlife viewing with agricultural experiences across Kenya.",
      category: "Wildlife",
      featured: true
    },
    {
      id: 4,
      title: "🚌 Matatu Culture Tour",
      duration: "Half Day",
      location: "Nairobi",
      participants: "3-10 people",
      price: "$35",
      image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=400&h=300&fit=crop",
      description: "Experience authentic Kenyan urban culture through local transportation.",
      category: "Cultural",
      featured: false
    },
    {
      id: 5,
      title: "🏡 Community Homestay",
      duration: "3-7 Days",
      location: "Rural Kenya",
      participants: "2-6 people",
      price: "$120/night",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop",
      description: "Live with local families and experience authentic rural Kenyan life.",
      category: "Cultural",
      featured: true
    },
    {
      id: 6,
      title: "🎓 Educational STEM Tour",
      duration: "Full Day",
      location: "Various Farms",
      participants: "10-30 students",
      price: "$55",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=300&fit=crop",
      description: "Hands-on learning experiences combining agriculture, science, and technology.",
      category: "Family-Friendly",
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
