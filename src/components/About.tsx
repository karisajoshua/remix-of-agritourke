
import { Users, Award, Heart, Leaf, Globe, TrendingUp } from 'lucide-react';

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

  const impactStats = [
    {
      stat: "68%",
      description: "of travelers now seek experiential, educational tours"
    },
    {
      stat: "17.23%",
      description: "projected growth in global agritourism by 2024"
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
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-poppins font-bold text-agri-dark mb-8">
            AGRITOURISM ADVENTURES
          </h2>
          <h3 className="text-2xl md:text-3xl font-poppins font-semibold text-agri-green mb-8">
            Connecting You to Kenya's Vibrant Agricultural Roots
          </h3>
          <p className="text-xl text-gray-600 font-inter max-w-5xl mx-auto leading-relaxed">
            We are a tour company dedicated to fostering meaningful connections between travelers, 
            organic farmers, students, and farm enthusiasts through immersive experiences in Kenya's 
            agricultural landscape. From small family farms to large commercial enterprises, our tours 
            offer rare insights into the country's rich agrarian heritage.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <img
              src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=600&h=400&fit=crop"
              alt="Colorful flowers in a Kenyan farm"
              className="rounded-lg shadow-2xl w-full h-96 object-cover"
            />
          </div>
          <div>
            <h3 className="text-3xl font-poppins font-bold text-agri-dark mb-6">
              Our Mission
            </h3>
            <p className="text-lg text-gray-600 font-inter mb-6 leading-relaxed">
              Whether you're passionate about coffee farming, curious about goat rearing, or attending 
              leading agribusiness conferences, we meticulously plan each detail—allowing you to fully 
              enjoy a journey filled with learning, fun, and cultural exploration.
            </p>
            <p className="text-lg text-gray-600 font-inter mb-6 leading-relaxed">
              Experience Kenya through the eyes of its hardworking farmers and vibrant agricultural communities.
            </p>
            <div className="flex items-center text-agri-green font-inter font-semibold">
              <Heart className="h-5 w-5 mr-2" />
              Travel with Purpose
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div className="bg-white rounded-xl shadow-lg p-12 mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-poppins font-bold text-agri-dark mb-6">
              WHERE TRAVEL MEETS SUSTAINABILITY
            </h3>
            <h4 className="text-2xl font-poppins font-semibold text-agri-green mb-6">
              Feel the Culture, Live the Traditions
            </h4>
            <p className="text-xl text-gray-600 font-inter max-w-4xl mx-auto leading-relaxed">
              Explore the heart of Kenya through agritourism. From avocado farms to eco-friendly crop systems, 
              our experiences blend nature, learning, and local wisdom. Watch stories unfold in every landscape 
              and engage with farming communities that care for the land and its legacy.
            </p>
          </div>
        </div>

        {/* Impact Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-poppins font-bold text-agri-dark mb-6">
              THE IMPACT OF AGRITOURISM
            </h3>
            <h4 className="text-2xl font-poppins font-semibold text-agri-green mb-6">
              Connecting People, Preserving Traditions
            </h4>
            <p className="text-xl text-gray-600 font-inter max-w-4xl mx-auto leading-relaxed mb-8">
              Agritourism builds a bridge between rural and urban communities. It educates, inspires, 
              and drives sustainable development. Our unique tours empower travelers and farmers alike 
              by promoting environmental stewardship and celebrating food systems that nourish both 
              people and planet.
            </p>
            <p className="text-lg text-gray-600 font-inter max-w-4xl mx-auto leading-relaxed">
              Through these connections, we strengthen local economies, honor ancestral wisdom, and 
              champion the traditions that sustain global communities.
            </p>
          </div>

          {/* Quick Facts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {impactStats.map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-8 shadow-lg text-center">
                <div className="text-4xl md:text-5xl font-poppins font-bold text-agri-green mb-4">
                  {item.stat}
                </div>
                <p className="text-gray-600 font-inter leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Culture Section */}
        <div className="bg-white rounded-xl shadow-lg p-12 mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-poppins font-bold text-agri-dark mb-6">
              SIGHTSEEING AND CULTURE
            </h3>
            <h4 className="text-2xl font-poppins font-semibold text-agri-green mb-6">
              Culture and Agritourism in Kenya
            </h4>
          </div>

          <div className="space-y-8 text-lg text-gray-600 font-inter leading-relaxed">
            <p>
              Kenya is a land rich in culture and breathtaking sights. What makes it truly unique is how 
              seamlessly traditional lifestyles blend with modern values. Kenyans are known for their 
              adaptability—open to new cultural influences while proudly preserving their heritage. Whether 
              it's the rhythmic drumming of the Akamba, the exhilarating bullfighting traditions of Western 
              Kenya, or the world-renowned athleticism of the Kalenjin runners, Kenya has something 
              extraordinary for everyone.
            </p>

            <div>
              <h5 className="text-2xl font-poppins font-bold text-agri-dark mb-4">
                The Sophistication of Tradition
              </h5>
              <p className="mb-4">
                Today's travelers are seeking more than typical tourist experiences. Many are moving away 
                from long, pre-planned vacations and turning instead to short cultural getaways, 
                self-improvement holidays, and business-leisure trips that offer deeper meaning. This shift 
                is driving a growing interest in immersive cultural tourism—visits to festivals, museums, 
                heritage sites, live performances, art workshops, and traditional communities.
              </p>
              <p>
                Kenya is perfectly positioned for this transformation. From historical buildings and 
                archaeological sites to stone fences, orchards, and ancient roads, there is so much to 
                explore. Visitors, both local and international, are eager to experience the richness of 
                Kenyan culture through its landmarks, lifestyle, and living traditions.
              </p>
            </div>

            <div>
              <h5 className="text-2xl font-poppins font-bold text-agri-dark mb-4">
                Cultural Flavors and Rhythms
              </h5>
              <p className="mb-4">
                Even Kenya's food tells a story of cultural fusion. Chapatis, samosas, and parathas hint 
                at Indian influence through generations of intermarriage and trade. Game meat—like ostrich 
                or crocodile—offered at restaurants such as The Carnivore and Fogo Gaucho in Nairobi, gives 
                tourists a taste of the wild.
              </p>
              <p>
                The sounds of Kenya are just as captivating as its sights. The traditional chants of the 
                Maasai on the Narok plains, the familiar calls of matatu touts in Nairobi, and the lively 
                dances of Mijikenda women all paint a vivid cultural picture.
              </p>
            </div>

            <div>
              <h5 className="text-2xl font-poppins font-bold text-agri-dark mb-4">
                Beyond the Safari: A Richer Experience
              </h5>
              <p className="mb-4">
                We quickly realized that blending cultural discovery with adventure makes every safari 
                experience more meaningful. Guests don't just see Kenya—they feel it. Our tours offer space 
                for genuine conversations, cultural appreciation, and creativity. Children and adults alike 
                rediscover the joy of exploration, stepping away from the distractions of city life and screens.
              </p>
              <p>
                And in a country known globally for its warmth and hospitality, visitors receive something 
                priceless: a sense of welcome and connection that money simply can't buy.
              </p>
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
