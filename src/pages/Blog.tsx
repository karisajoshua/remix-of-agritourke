
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight, Heart, Users, Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Blog = () => {
  const navigate = useNavigate();

  const blogPosts = [
    {
      id: 1,
      title: "Community-Based Tourism: Building Bridges Through Agriculture",
      excerpt: "Discover how community-based tourism creates meaningful connections between travelers and local farming communities, fostering mutual understanding and economic growth.",
      content: `Community-based tourism represents a powerful model for sustainable travel that benefits both visitors and local communities. In Kenya's agricultural regions, this approach creates authentic experiences while supporting rural economies.

      Through <a href="https://www.communitybasedtourism.eu/" target="_blank" rel="noopener noreferrer" class="text-agri-green hover:text-agri-green/80 underline">community-based tourism</a>, travelers gain insights into traditional farming practices, participate in daily agricultural activities, and form genuine connections with local families. This <a href="https://www.gstc.org/what-is-sustainable-tourism/" target="_blank" rel="noopener noreferrer" class="text-agri-green hover:text-agri-green/80 underline">sustainable model</a> ensures that tourism revenue directly benefits the communities that open their doors to visitors.

      Local farmers become cultural ambassadors, sharing knowledge about indigenous crops, sustainable farming techniques, and traditional food preparation methods. Visitors contribute to household incomes while learning about rural life, creating a win-win situation that preserves cultural heritage and supports economic development.

      The impact extends beyond economics. Community-based tourism builds cross-cultural understanding, breaks down stereotypes, and creates lasting friendships. It's tourism with purpose – travel that transforms both the visitor and the visited.`,
      image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Fair%20view/community-based-tourism.webp",
      author: "Agritourism Adventures Team",
      date: "March 15, 2024",
      category: "Community Tourism"
    },
    {
      id: 2,
      title: "Embrace the Bleat: The Joy of Goat Farming in Kenya",
      excerpt: "From milk to meat, fiber to fertilizer – discover why goat farming is becoming increasingly popular among Kenyan farmers and agritourism enthusiasts.",
      content: `Goat farming in Kenya represents one of the most versatile and rewarding agricultural practices in the country. These hardy animals thrive in diverse climatic conditions and provide multiple income streams for farmers.

      Kenya's goat population exceeds 27 million, making it the largest livestock population in the country. Goats adapt well to arid and semi-arid regions, requiring minimal water and thriving on natural vegetation that cattle cannot utilize effectively.

      Modern goat farming incorporates <a href="https://organicfarm.co.ke/the-complete-guide-to-profitable-goat-farming-in-kenya-2/#:~:text=To%20tap%20into%20premium%20markets,and%20farm%20activities%20for%20inspections" target="_blank" rel="noopener noreferrer" class="text-agri-green hover:text-agri-green/80 underline">sustainable practices</a> that maximize productivity while maintaining environmental balance. From the prized Galla goats of Northern Kenya to the adaptable East African goats found throughout the country, each breed offers unique advantages.

      Visitors to goat farms experience hands-on activities including milking, feeding, and learning about breeding programs. The therapeutic nature of interacting with these gentle animals, combined with learning about their economic importance, creates memorable agritourism experiences.

      Goat farming also supports women's empowerment in rural communities, as women often manage small goat herds, providing them with independent income sources and decision-making power within households.`,
      image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/goat-farming-kenya.webp",
      author: "Farm Experience Team",
      date: "March 10, 2024",
      category: "Livestock Farming"
    },
    {
      id: 3,
      title: "Coffee Culture: From Bean to Cup in Kenya's Highlands",
      excerpt: "Journey through Kenya's coffee regions and discover the intricate process that creates some of the world's finest coffee beans.",
      content: `Kenya produces some of the world's most sought-after coffee, renowned for its bright acidity, full body, and wine-like flavor profile. The journey from bean to cup involves meticulous care at every stage.

      Coffee farming in Kenya follows strict quality standards, with most farms located in high-altitude regions around Mount Kenya, the Aberdare Range, and parts of the Rift Valley. The volcanic soils and favorable climate create ideal growing conditions.

      The wet processing method used in Kenya involves removing the cherry's pulp immediately after harvesting, followed by fermentation and careful drying. This process, combined with the country's unique double fermentation technique, contributes to Kenya's distinctive coffee flavor.

      Agritourism visitors participate in coffee picking during harvest seasons, learn about processing methods, and enjoy freshly roasted coffee while overlooking scenic highland landscapes. Many farms offer cupping sessions where visitors can taste and compare different coffee varieties.

      Small-scale farmers, often organized in cooperatives, produce most of Kenya's coffee. These cooperatives provide farmers with better market access, training, and resources, ensuring sustainable livelihoods for coffee-growing communities.`,
      image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Fair%20view/coffee-culture-kenya.webp",
      author: "Coffee Culture Team",
      date: "March 5, 2024",
      category: "Coffee Farming"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-agri-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-poppins font-bold text-agri-dark mb-6">
              Farm Stories & Insights
            </h1>
            <p className="text-xl text-gray-600 font-inter max-w-3xl mx-auto leading-relaxed">
              Discover the stories behind Kenya's agricultural heritage, farming innovations, 
              and the communities that make our agritourism experiences extraordinary.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {blogPosts.map((post, index) => (
              <article key={post.id} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Content */}
                <div className={index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}>
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="bg-agri-green text-white px-3 py-1 rounded-full text-sm font-inter font-semibold">
                      {post.category}
                    </span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-poppins font-bold text-agri-dark mb-4">
                    {post.title}
                  </h2>
                  
                  <div className="flex items-center space-x-6 text-gray-500 text-sm font-inter mb-6">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {post.date}
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-600 font-inter mb-6 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  {/* Blog content with HTML rendering */}
                  <div 
                    className="text-gray-600 font-inter leading-relaxed mb-8 space-y-4"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </div>

                {/* Image */}
                <div className={index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}>
                  <img
                    src={post.image}
                    alt={post.title}
                    className="rounded-lg shadow-2xl w-full h-96 object-cover"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-agri-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-agri-dark mb-6">
            Ready to Experience It Yourself?
          </h2>
          <p className="text-xl text-gray-600 font-inter max-w-4xl mx-auto leading-relaxed mb-8">
            Join us for an authentic <a href="https://www.rainforest-alliance.org/insights/what-is-sustainable-agriculture/" target="_blank" rel="noopener noreferrer" className="text-agri-green hover:text-agri-green/80 underline">sustainable farming experience</a> and discover the stories, 
            traditions, and innovations that make Kenya's agricultural landscape extraordinary.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <Heart className="h-8 w-8 text-agri-green mx-auto mb-4" />
              <div className="text-3xl font-poppins font-bold text-agri-green mb-2">500+</div>
              <div className="text-gray-600 font-inter">Stories Shared</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <Users className="h-8 w-8 text-agri-green mx-auto mb-4" />
              <div className="text-3xl font-poppins font-bold text-agri-green mb-2">50+</div>
              <div className="text-gray-600 font-inter">Partner Farms</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <Leaf className="h-8 w-8 text-agri-green mx-auto mb-4" />
              <div className="text-3xl font-poppins font-bold text-agri-green mb-2">7+</div>
              <div className="text-gray-600 font-inter">Years Experience</div>
            </div>
          </div>

          <Button 
            size="lg"
            onClick={() => navigate('/tours')}
            className="bg-agri-green hover:bg-agri-green/90 text-white font-inter font-semibold px-8"
          >
            Explore Our Tours
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
