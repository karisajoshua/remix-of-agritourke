
import { CheckCircle, Mountain, GraduationCap, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const FeaturedServicesHome = () => {
  const navigate = useNavigate();

  const featuredServices = [
    {
      icon: Mountain,
      title: "9-Day Agricultural Wildlife Safari",
      description: "Ultimate adventure combining wildlife viewing with farm experiences",
      features: ["Wildlife game drives", "Farm visits", "Cultural interactions"]
    },
    {
      icon: GraduationCap,
      title: "Educational & STEM Student Tours",
      description: "Learning-focused experiences for students and educational groups",
      features: ["Hands-on learning", "Science applications", "Group activities"]
    },
    {
      icon: Users,
      title: "Community-Based Homestays",
      description: "Live with local families and experience authentic rural life",
      features: ["Family accommodation", "Local cuisine", "Cultural activities"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-agri-grey">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-agri-dark mb-6">
            Our Featured Services
          </h2>
          <p className="text-xl text-gray-600 font-inter max-w-3xl mx-auto leading-relaxed">
            From educational tours to authentic homestays, we offer diverse experiences 
            that connect you with Kenya's agricultural heritage. Our services align with <a href="https://www.gstcouncil.org/" target="_blank" rel="noopener noreferrer" className="text-agri-green hover:text-agri-dark underline">Global Sustainable Tourism Council</a> criteria for responsible tourism practices.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {featuredServices.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-agri-green/10 rounded-lg flex items-center justify-center mb-6">
                <service.icon className="h-8 w-8 text-agri-green" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-poppins font-bold text-agri-dark mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 font-inter mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-600 font-inter">
                    <CheckCircle className="h-4 w-4 text-agri-green mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Additional Context */}
        <div className="text-center mb-8">
          <p className="text-lg text-gray-600 font-inter max-w-4xl mx-auto leading-relaxed">
            Our educational programs are designed following <a href="https://sarep.ucdavis.edu/sustainable-ag/agritourism" target="_blank" rel="noopener noreferrer" className="text-agri-green hover:text-agri-dark underline">UC Davis sustainable agriculture research</a> principles, while our community-based experiences adhere to guidelines from <a href="https://www.communitybasedtourism.eu/" target="_blank" rel="noopener noreferrer" className="text-agri-green hover:text-agri-dark underline">Community Based Tourism EU</a> for authentic cultural immersion.
          </p>
        </div>

        {/* View All Services Button */}
        <div className="text-center">
          <Button 
            size="lg" 
            onClick={() => navigate('/services')}
            className="bg-agri-green hover:bg-agri-green/90 text-white font-inter font-semibold px-8"
          >
            View All Services
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServicesHome;
