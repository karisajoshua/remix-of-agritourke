
import { TrendingUp, Users, Leaf, Heart } from 'lucide-react';

const Impact = () => {
  const stats = [
    {
      icon: Users,
      number: "500+",
      label: "Families Supported",
      description: "Local farming families benefiting from tourism"
    },
    {
      icon: TrendingUp,
      number: "$50K+",
      label: "Community Income",
      description: "Generated for local communities annually"
    },
    {
      icon: Leaf,
      number: "25",
      label: "Sustainable Practices",
      description: "Eco-friendly farming methods promoted"
    },
    {
      icon: Heart,
      number: "98%",
      label: "Satisfaction Rate",
      description: "Travelers who'd recommend our tours"
    }
  ];

  return (
    <section id="impact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-agri-dark mb-6">
            Travel That Gives Back
          </h2>
          <p className="text-xl text-gray-600 font-inter max-w-4xl mx-auto leading-relaxed">
            Every journey strengthens communities, honors tradition, and promotes environmental 
            sustainability. Agritourism helps preserve ancestral wisdom while supporting local economies.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Content */}
          <div>
            <h3 className="text-3xl font-poppins font-bold text-agri-dark mb-6">
              Our Commitment to Sustainability
            </h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-agri-green/10 rounded-full flex items-center justify-center mr-4 mt-1">
                  <Users className="h-4 w-4 text-agri-green" />
                </div>
                <div>
                  <h4 className="text-lg font-poppins font-semibold text-agri-dark mb-2">
                    Community Empowerment
                  </h4>
                  <p className="text-gray-600 font-inter leading-relaxed">
                    We work directly with local farmers and communities, ensuring that tourism 
                    benefits reach the grassroots level and create lasting positive change.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-agri-green/10 rounded-full flex items-center justify-center mr-4 mt-1">
                  <Leaf className="h-4 w-4 text-agri-green" />
                </div>
                <div>
                  <h4 className="text-lg font-poppins font-semibold text-agri-dark mb-2">
                    Environmental Conservation
                  </h4>
                  <p className="text-gray-600 font-inter leading-relaxed">
                    Our tours promote sustainable farming practices and environmental 
                    awareness, helping preserve Kenya's natural heritage for future generations.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-agri-green/10 rounded-full flex items-center justify-center mr-4 mt-1">
                  <Heart className="h-4 w-4 text-agri-green" />
                </div>
                <div>
                  <h4 className="text-lg font-poppins font-semibold text-agri-dark mb-2">
                    Cultural Preservation
                  </h4>
                  <p className="text-gray-600 font-inter leading-relaxed">
                    We help preserve traditional farming knowledge and cultural practices 
                    by creating platforms for knowledge sharing and cultural exchange.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div>
            <img
              src="https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Fair%20view/sustainable%20tourism.webp"
              alt="Sustainable tourism practices in Kenya's agricultural communities"
              className="rounded-lg shadow-2xl w-full h-96 object-cover"
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-gradient-to-br from-agri-green/5 to-agri-teal/5 rounded-xl"
            >
              <div className="w-16 h-16 bg-agri-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="h-8 w-8 text-agri-green" />
              </div>
              <div className="text-4xl font-poppins font-bold text-agri-green mb-2">
                {stat.number}
              </div>
              <div className="text-lg font-poppins font-semibold text-agri-dark mb-2">
                {stat.label}
              </div>
              <div className="text-sm text-gray-600 font-inter">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Impact;
