import { CheckCircle, Truck, Camera, Users, GraduationCap, Home, Mountain, Bus } from 'lucide-react';
import { useContentProtection } from '@/hooks/useContentProtection';
import { Link } from 'react-router-dom';

const Services = () => {
  // Enable content protection
  useContentProtection();

  const services = [
    "Kenya Farm Tours",
    "Farm Stays", 
    "Agricultural Safaris",
    "Educational Workshops and Activities",
    "Industry Trade Shows and Conferences",
    "Cultural and Sightseeing Tours",
    "Agri-research Tours",
    "School and Student Tours"
  ];

  return (
    <section id="services" className="py-20 bg-agri-grey">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-agri-dark mb-6">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 font-inter max-w-4xl mx-auto leading-relaxed mb-8">
            At Agritourism Adventures, we offer a wide range of services designed to give you a deep, immersive experience in Kenya's vibrant agricultural and cultural landscape.
          </p>
          <h3 className="text-2xl font-poppins font-semibold text-agri-green mb-8">
            What We Offer:
          </h3>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => {
            // Map services to tour categories
            const categoryMap: { [key: string]: string } = {
              "Kenya Farm Tours": "Farm%20Tours",
              "Farm Stays": "Farm%20Tours", 
              "Agricultural Safaris": "Safari%20%26%20Wildlife",
              "Educational Workshops and Activities": "Educational%20Tours",
              "Industry Trade Shows and Conferences": "Educational%20Tours",
              "Cultural and Sightseeing Tours": "Cultural%20%26%20Urban",
              "Agri-research Tours": "Educational%20Tours",
              "School and Student Tours": "Educational%20Tours"
            };

            const category = categoryMap[service];

            if (category) {
              return (
                <Link
                  key={index}
                  to={`/tours?category=${category}`}
                  className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                >
                  <div className="flex items-center mb-3">
                    <CheckCircle className="h-5 w-5 text-agri-green mr-3 flex-shrink-0" />
                    <span className="text-lg font-inter font-semibold text-agri-dark hover:text-agri-teal transition-colors">
                      {service}
                    </span>
                  </div>
                </Link>
              );
            } else {
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-lg"
                >
                  <div className="flex items-center mb-3">
                    <CheckCircle className="h-5 w-5 text-agri-green mr-3 flex-shrink-0" />
                    <span className="text-lg font-inter font-semibold text-agri-dark">
                      {service}
                    </span>
                  </div>
                </div>
              );
            }
          })}
        </div>

        <div className="text-center">
          <p className="text-lg text-gray-600 font-inter max-w-4xl mx-auto leading-relaxed">
            Each service is thoughtfully curated to provide hands-on learning, authentic engagement, and unforgettable memories.
          </p>
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
            <a 
              href="https://wa.me/254710429755" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-agri-green hover:bg-gray-100 px-8 py-4 rounded-lg font-inter font-semibold text-lg transition-colors inline-block"
              aria-label="Get custom quote via WhatsApp"
            >
              Get Custom Quote
            </a>
            <a 
              href="/documents/AA_Brochure.pdf" 
              download="Agritourism-Adventures-Brochure.pdf"
              className="border-2 border-white text-white hover:bg-white hover:text-agri-green px-8 py-4 rounded-lg font-inter font-semibold text-lg transition-colors inline-block"
            >
              Download Brochure
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
