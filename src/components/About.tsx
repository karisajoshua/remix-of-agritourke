
import { Users, Award, Heart, Leaf, CheckCircle, MapPin, Phone, Mail, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const About = () => {
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

  const whyChooseUs = [
    "🚜 Cutting-edge Technology – We use the latest tools and methods to elevate your experience.",
    "🌿 Expert Farmers – Learn directly from seasoned professionals.",
    "✅ Certified & Trusted – Our services meet the highest industry standards.",
    "🌍 Global Accessibility – Wherever you are in the world, we're here to serve you."
  ];

  const steps = [
    {
      number: "1",
      title: "Schedule Your Experience",
      description: "Book your personalized safari today—designed just for you."
    },
    {
      number: "2", 
      title: "Get Professional Advice",
      description: "Tell us what you want and we'll guide you toward the perfect itinerary."
    },
    {
      number: "3",
      title: "Meet Our Seasoned Experts", 
      description: "Connect with local farmers and professionals to learn, share, and grow."
    },
    {
      number: "4",
      title: "Let's Get to Work",
      description: "Roll up your sleeves, have fun on the farm, and take home memories (and maybe some fresh produce too)!"
    }
  ];

  const quotes = [
    {
      text: "Agriculture not only gives riches to a nation but the only riches she can call her own.",
      author: "Samuel Johnson"
    },
    {
      text: "Travelling—it leaves you speechless, then turns you into a storyteller.",
      author: "Ibn Battuta"
    },
    {
      text: "Farming is not just a job; it's a way of life that connects us to the land, our culture, and each other.",
      author: "Unknown"
    }
  ];

  const teamMembers = [
    {
      name: "Presley Kevogo",
      role: "Founder & CEO",
      image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/executive/Presley%20Kevogo.jpg",
      description: "Passionate about sustainable agriculture and community empowerment"
    },
    {
      name: "Elijah Kasati",
      role: "Strategic Tourism Advisor",
      image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/executive/Kasati.jpg",
      description: "Expert strategist specializing in sustainable agritourism development and cultural immersion experiences"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-agri-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-poppins font-bold text-agri-dark mb-6">
              Cultivate. Innovate. Elevate.
            </h1>
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-poppins font-bold text-agri-green mb-4">
                AGRITOURISM ADVENTURES
              </h2>
              <h3 className="text-2xl font-poppins font-semibold text-agri-dark mb-6">
                Connecting You to Kenya's Vibrant Agricultural Roots
              </h3>
            </div>
            <p className="text-xl text-gray-600 font-inter max-w-5xl mx-auto leading-relaxed mb-8">
              We are a tour company dedicated to fostering meaningful connections between travelers, organic farmers, students, and farm enthusiasts through immersive experiences in Kenya's agricultural landscape. From small family farms to large commercial enterprises, our tours offer rare insights into the country's rich agrarian heritage.
            </p>
            <p className="text-xl text-gray-600 font-inter max-w-5xl mx-auto leading-relaxed mb-8">
              Whether you're passionate about coffee farming, curious about goat rearing, or attending leading agribusiness conferences, we meticulously plan each detail—allowing you to fully enjoy a journey filled with learning, fun, and cultural exploration.
            </p>
            <p className="text-xl text-agri-green font-inter font-semibold max-w-4xl mx-auto">
              Experience Kenya through the eyes of its hardworking farmers and vibrant agricultural communities.
            </p>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-agri-dark mb-6">
              WHERE TRAVEL MEETS SUSTAINABILITY
            </h2>
            <h3 className="text-2xl font-poppins font-semibold text-agri-green mb-6">
              Feel the Culture, Live the Traditions
            </h3>
            <p className="text-xl text-gray-600 font-inter max-w-5xl mx-auto leading-relaxed">
              Explore the heart of Kenya through agritourism. From avocado farms to eco-friendly crop systems, our experiences blend nature, learning, and local wisdom. Watch stories unfold in every landscape and engage with farming communities that care for the land and its legacy.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-agri-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-agri-dark mb-6">
              THE IMPACT OF AGRITOURISM
            </h2>
            <h3 className="text-2xl font-poppins font-semibold text-agri-green mb-6">
              Connecting People, Preserving Traditions
            </h3>
            <p className="text-xl text-gray-600 font-inter max-w-5xl mx-auto leading-relaxed mb-8">
              Agritourism builds a bridge between rural and urban communities. It educates, inspires, and drives sustainable development. Our unique tours empower travelers and farmers alike by promoting environmental stewardship and celebrating food systems that nourish both people and planet.
            </p>
            <p className="text-xl text-gray-600 font-inter max-w-5xl mx-auto leading-relaxed mb-12">
              Through these connections, we strengthen local economies, honor ancestral wisdom, and champion the traditions that sustain global communities.
            </p>
            
            {/* Quick Facts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-lg p-8 shadow-lg">
                <div className="text-4xl font-poppins font-bold text-agri-green mb-4">68%</div>
                <p className="text-lg text-gray-600 font-inter">
                  of travelers now seek experiential, educational tours.
                </p>
              </div>
              <div className="bg-white rounded-lg p-8 shadow-lg">
                <div className="text-4xl font-poppins font-bold text-agri-green mb-4">17.23%</div>
                <p className="text-lg text-gray-600 font-inter">
                  Global agritourism is projected to grow by 2024.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <h2 className="text-4xl font-poppins font-bold text-agri-dark mb-6">
                7 YEARS IN THE BUSINESS
              </h2>
              <p className="text-xl text-gray-600 font-inter mb-8 leading-relaxed">
                For over seven years, we've led the way in immersive agricultural travel across Kenya, celebrating farmers and their invaluable role in food security and culture.
              </p>
              <h3 className="text-2xl font-poppins font-bold text-agri-green mb-4">
                JOBS FILL YOUR POCKET, ADVENTURES FILL YOUR SOUL
              </h3>
              <p className="text-lg text-gray-600 font-inter mb-6">
                Discover Kenya's agricultural heart through personalized farm tours, cultural insights, and hands-on experiences that create unforgettable memories.
              </p>
              <p className="text-lg text-gray-600 font-inter mb-8">
                Discover More about our services and start your journey into sustainable adventure.
              </p>
              <Button 
                onClick={() => navigate('/services')}
                className="bg-agri-teal hover:bg-agri-teal/90 text-white font-inter font-semibold"
              >
                Explore Our Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div>
              <img
                src="https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Pineaples/Boat%20Rides.JPG"
                alt="Scenic boat rides through Kenya's agricultural waterways"
                className="rounded-lg shadow-2xl w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-20 bg-agri-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-agri-dark mb-6">
              SIGHTSEEING AND CULTURE
            </h2>
            <h3 className="text-2xl font-poppins font-semibold text-agri-green mb-8">
              Culture and Agritourism in Kenya
            </h3>
          </div>
          
          <div className="space-y-12">
            <div className="max-w-5xl mx-auto">
              <p className="text-lg text-gray-600 font-inter leading-relaxed mb-6">
                Kenya is a land rich in culture and breathtaking sights. What makes it truly unique is how seamlessly traditional lifestyles blend with modern values. Kenyans are known for their adaptability—open to new cultural influences while proudly preserving their heritage. Whether it's the rhythmic drumming of the Akamba, the exhilarating bullfighting traditions of Western Kenya, or the world-renowned athleticism of the Kalenjin runners, Kenya has something extraordinary for everyone.
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <h4 className="text-2xl font-poppins font-bold text-agri-dark mb-4">
                The Sophistication of Tradition
              </h4>
              <p className="text-lg text-gray-600 font-inter leading-relaxed mb-6">
                Today's travelers are seeking more than typical tourist experiences. Many are moving away from long, pre-planned vacations and turning instead to short cultural getaways, self-improvement holidays, and business-leisure trips that offer deeper meaning. This shift is driving a growing interest in immersive cultural tourism—visits to festivals, museums, heritage sites, live performances, art workshops, and traditional communities.
              </p>
              <p className="text-lg text-gray-600 font-inter leading-relaxed mb-6">
                Kenya is perfectly positioned for this transformation. From historical buildings and archaeological sites to stone fences, orchards, and ancient roads, there is so much to explore. Visitors, both local and international, are eager to experience the richness of Kenyan culture through its landmarks, lifestyle, and living traditions.
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <h4 className="text-2xl font-poppins font-bold text-agri-dark mb-4">
                Cultural Flavors and Rhythms
              </h4>
              <p className="text-lg text-gray-600 font-inter leading-relaxed mb-6">
                Even Kenya's food tells a story of cultural fusion. Chapatis, samosas, and parathas hint at Indian influence through generations of intermarriage and trade. Game meat—like ostrich or crocodile—offered at restaurants such as The Carnivore and Fogo Gaucho in Nairobi, gives tourists a taste of the wild.
              </p>
              <p className="text-lg text-gray-600 font-inter leading-relaxed mb-6">
                The sounds of Kenya are just as captivating as its sights. The traditional chants of the Maasai on the Narok plains, the familiar calls of matatu touts in Nairobi, and the lively dances of Mijikenda women all paint a vivid cultural picture.
              </p>
              <p className="text-lg text-agri-green font-inter font-semibold">
                Watch this video to experience it from wherever you are.
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <h4 className="text-2xl font-poppins font-bold text-agri-dark mb-4">
                Beyond the Safari: A Richer Experience
              </h4>
              <p className="text-lg text-gray-600 font-inter leading-relaxed mb-6">
                We quickly realized that blending cultural discovery with adventure makes every safari experience more meaningful. Guests don't just see Kenya—they feel it. Our tours offer space for genuine conversations, cultural appreciation, and creativity. Children and adults alike rediscover the joy of exploration, stepping away from the distractions of city life and screens.
              </p>
              <p className="text-lg text-gray-600 font-inter leading-relaxed">
                And in a country known globally for its warmth and hospitality, visitors receive something priceless: a sense of welcome and connection that money simply can't buy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Steps */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-agri-dark mb-6">
              Begin Your Agritourism Journey in 4 Easy Steps
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="bg-agri-grey rounded-lg p-8 shadow-lg text-center">
                <div className="w-16 h-16 bg-agri-green rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-poppins font-bold text-white">{step.number}</span>
                </div>
                <h3 className="text-xl font-poppins font-bold text-agri-dark mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 font-inter leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-agri-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-agri-dark mb-6">
              Why Choose Agritourism Adventures?
            </h2>
            <p className="text-xl text-gray-600 font-inter max-w-4xl mx-auto leading-relaxed mb-8">
              We combine innovation, expertise, and commitment to provide deeply immersive and enriching agricultural experiences across Kenya.
            </p>
            <p className="text-xl text-gray-600 font-inter max-w-4xl mx-auto leading-relaxed mb-12">
              With modern tools, expert partners, and a passion for sustainability, we ensure your journey is not just enjoyable but also meaningful.
            </p>
            <h3 className="text-2xl font-poppins font-semibold text-agri-green mb-8">
              What sets us apart:
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
                <p className="text-lg font-inter text-agri-dark leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inspirational Quotes */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-agri-dark mb-6">
              Inspiring Words Along the Journey
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {quotes.map((quote, index) => (
              <div key={index} className="bg-agri-grey rounded-lg p-8 shadow-lg text-center">
                <p className="text-lg font-inter text-gray-600 italic mb-6 leading-relaxed">
                  "{quote.text}"
                </p>
                <p className="text-agri-green font-inter font-semibold">
                  — {quote.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-agri-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-agri-dark mb-6">
              Meet the Management
            </h2>
            <p className="text-xl text-gray-600 font-inter max-w-4xl mx-auto leading-relaxed">
              Our team of dedicated professionals brings years of experience in agriculture, hospitality, and tourism. Together, we ensure that every tour is memorable and meaningful.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-agri-grey rounded-xl p-8 shadow-lg text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                />
                <h3 className="text-2xl font-poppins font-bold text-agri-dark mb-2">
                  {member.name}
                </h3>
                <p className="text-agri-green font-inter font-semibold mb-4">
                  {member.role}
                </p>
                <p className="text-gray-600 font-inter leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-agri-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-agri-dark mb-6">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-xl text-gray-600 font-inter max-w-4xl mx-auto leading-relaxed mb-8">
            Join us for an unforgettable journey through Kenya's agricultural landscape. 
            Every tour is crafted with care, tradition, and a commitment to quality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => navigate('/tours')}
              className="bg-agri-green hover:bg-agri-green/90 text-white font-inter font-semibold px-8"
            >
              Explore Our Tours
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => navigate('/services')}
              className="border-agri-green text-agri-green hover:bg-agri-green hover:text-white font-inter font-semibold px-8"
            >
              View All Services
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
