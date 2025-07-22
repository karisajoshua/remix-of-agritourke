
import { CheckCircle, Truck, Camera, Users, GraduationCap, Home, Mountain, Bus } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Truck,
      title: "Kenya Farm Tours",
      description: "Explore diverse agricultural practices across Kenya's fertile regions",
      features: ["Tea plantation visits", "Coffee farm experiences", "Vegetable farming tours"]
    },
    {
      icon: Camera,
      title: "Dairy + Tea Safaris",
      description: "Combined experiences showcasing Kenya's dairy and tea industries",
      features: ["Dairy farm visits", "Tea processing tours", "Tasting sessions"]
    },
    {
      icon: Mountain,
      title: "9-Day Agricultural Wildlife Safari",
      description: "Ultimate adventure combining wildlife viewing with farm experiences",
      features: ["Wildlife game drives", "Farm visits", "Cultural interactions"]
    },
    {
      icon: Bus,
      title: "Matatu Urban Culture Tours",
      description: "Experience authentic Kenyan urban culture through local transport",
      features: ["City exploration", "Local markets", "Cultural immersion"]
    },
    {
      icon: Users,
      title: "Bonding & Couple Retreats",
      description: "Romantic getaways in beautiful rural settings",
      features: ["Private farm stays", "Romantic dinners", "Scenic landscapes"]
    },
    {
      icon: GraduationCap,
      title: "Educational & STEM Student Tours",
      description: "Learning-focused experiences for students and educational groups",
      features: ["Hands-on learning", "Science applications", "Group activities"]
    },
    {
      icon: Home,
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
            Choose Your Adventure
          </h2>
          <p className="text-xl text-gray-600 font-inter max-w-3xl mx-auto leading-relaxed">
            From educational tours to romantic retreats, we offer diverse experiences 
            that connect you with Kenya's agricultural heritage.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
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

        {/* CTA Section */}
        <div className="mt-16 text-center bg-agri-green rounded-2xl p-12">
          <h3 className="text-3xl font-poppins font-bold text-white mb-4">
            Ready to Start Your Adventure?
          </h3>
          <p className="text-xl text-white/90 font-inter mb-8 max-w-2xl mx-auto">
            Contact us today to customize your perfect agritourism experience in Kenya.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-agri-green hover:bg-gray-100 px-8 py-4 rounded-lg font-inter font-semibold text-lg transition-colors">
              Get Custom Quote
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-agri-green px-8 py-4 rounded-lg font-inter font-semibold text-lg transition-colors">
              Download Brochure
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
