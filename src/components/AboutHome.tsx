
import { Users, Award, Heart, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const AboutHome = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Users,
      title: "Community Focused",
      description: "Building bridges between travelers and local farming communities"
    },
    {
      icon: Award,
      title: "7+ Years Experience",
      description: "Proven track record of delivering authentic agritourism experiences"
    },
    {
      icon: Heart,
      title: "Authentic Experiences",
      description: "Genuine connections with Kenya's agricultural heritage and culture"
    },
    {
      icon: Leaf,
      title: "Sustainable Tourism",
      description: "Every journey supports environmental conservation and local economies"
    }
  ];

  return (
    <section id="about" className="py-20 bg-agri-grey">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-agri-dark mb-6">
            Cultivate. Innovate. Elevate.
          </h2>
          <p className="text-xl text-gray-600 font-inter max-w-4xl mx-auto leading-relaxed">
            For 7+ years, we've built bridges between travelers and farmers through authentic, 
            hands-on agritourism. Each trip supports communities, preserves tradition, 
            and shares Kenya's story with the world.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <img
              src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=600&h=400&fit=crop"
              alt="Colorful flowers in a Kenyan farm"
              className="rounded-lg shadow-2xl w-full h-96 object-cover"
            />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <h3 className="text-3xl font-poppins font-bold text-agri-dark mb-6">
              Our Story
            </h3>
            <p className="text-lg text-gray-600 font-inter mb-6 leading-relaxed">
              Agritourism Adventures was born from a passion for Kenya's rich agricultural 
              heritage and a vision to create meaningful connections between visitors and 
              local communities.
            </p>
            <p className="text-lg text-gray-600 font-inter mb-6 leading-relaxed">
              We believe that travel should be transformative – not just for the traveler, 
              but for the communities they visit. Through our carefully curated experiences, 
              we showcase the innovation, dedication, and wisdom of Kenya's farmers.
            </p>
            <div className="flex items-center text-agri-green font-inter font-semibold mb-6">
              <Heart className="h-5 w-5 mr-2" />
              Travel with Purpose
            </div>
            <Button 
              onClick={() => navigate('/about')}
              className="bg-agri-teal hover:bg-agri-teal/90 text-white font-inter font-semibold"
            >
              Learn More About Us
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
            >
              <div className="w-16 h-16 bg-agri-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="h-8 w-8 text-agri-green" />
              </div>
              <h4 className="text-xl font-poppins font-semibold text-agri-dark mb-3">
                {feature.title}
              </h4>
              <p className="text-gray-600 font-inter leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutHome;
