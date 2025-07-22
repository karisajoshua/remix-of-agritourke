
import { Users, Award, Heart, Leaf } from 'lucide-react';

const About = () => {
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

  const teamMembers = [
    {
      name: "Presley Kevogo",
      role: "Founder & CEO",
      image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/executive/Presley%20Kevogo.jpg",
      description: "Passionate advocate for sustainable agritourism with over 7 years of experience connecting travelers with Kenya's agricultural communities."
    },
    {
      name: "Kasati",
      role: "Operations Director",
      image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/executive/Kasati.jpg",
      description: "Expert in tour operations and community partnerships, ensuring authentic and meaningful experiences for every traveler."
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
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
              we showcase the innovation, dedication, and wisdom of Kenya's farmers while 
              creating sustainable income opportunities.
            </p>
            <div className="flex items-center text-agri-green font-inter font-semibold">
              <Heart className="h-5 w-5 mr-2" />
              Travel with Purpose
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-poppins font-bold text-agri-dark mb-6">
              Meet Our Team
            </h3>
            <p className="text-xl text-gray-600 font-inter max-w-3xl mx-auto leading-relaxed">
              Passionate leaders dedicated to creating authentic and sustainable agritourism experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <div className="aspect-w-16 aspect-h-12">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-poppins font-bold text-agri-dark mb-2">
                    {member.name}
                  </h4>
                  <p className="text-agri-green font-inter font-semibold mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-600 font-inter leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
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

export default About;
