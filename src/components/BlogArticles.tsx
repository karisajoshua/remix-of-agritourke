
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BlogArticles = () => {
  const articles = [
    {
      id: 1,
      title: "The Rise of Community-Based Tourism in Kenya",
      excerpt: "Discover how local communities are transforming tourism while preserving their cultural heritage. Learn about sustainable practices that benefit both visitors and residents.",
      author: "Agritourism Adventures Team",
      date: "January 15, 2025",
      readTime: "8 min read",
      category: "Community Tourism",
      image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Fair%20view/Community%20engagement.webp",
      content: `
        <p>Community-based tourism (CBT) represents a revolutionary approach to travel that empowers local communities while providing authentic experiences for visitors. According to <a href="https://www.communitybasedtourism.eu/" target="_blank" rel="noopener noreferrer" class="text-agri-green hover:text-agri-dark underline">Community Based Tourism EU</a>, this model ensures that tourism benefits are distributed directly to host communities.</p>
        
        <h3>What Makes Community-Based Tourism Special?</h3>
        <p>Unlike traditional tourism models, CBT puts local communities at the center of tourism development. The <a href="https://www.unwto.org/" target="_blank" rel="noopener noreferrer" class="text-agri-green hover:text-agri-dark underline">UN World Tourism Organization</a> recognizes CBT as a key strategy for achieving sustainable development goals in rural areas.</p>
        
        <p>In Kenya, community-based tourism initiatives are supported by <a href="https://ktb.go.ke/" target="_blank" rel="noopener noreferrer" class="text-agri-green hover:text-agri-dark underline">Kenya Tourism Board</a> policies that promote cultural preservation and economic empowerment. These programs follow guidelines established by <a href="https://www.responsibletravel.org/" target="_blank" rel="noopener noreferrer" class="text-agri-green hover:text-agri-dark underline">The Center for Responsible Travel</a>.</p>
        
        <h3>Benefits of Community-Based Tourism</h3>
        <ul>
          <li><strong>Cultural Preservation:</strong> Local traditions and customs are maintained and celebrated</li>
          <li><strong>Economic Empowerment:</strong> Direct income generation for community members</li>
          <li><strong>Environmental Conservation:</strong> Communities become stewards of their natural resources</li>
          <li><strong>Authentic Experiences:</strong> Visitors gain genuine insights into local life</li>
        </ul>
        
        <p>Research from <a href="https://ecotourism.org/" target="_blank" rel="noopener noreferrer" class="text-agri-green hover:text-agri-dark underline">The International Ecotourism Society</a> shows that community-based tourism can increase local incomes by up to 40% while maintaining cultural integrity.</p>
      `
    },
    {
      id: 2,
      title: "Sustainable Goat Farming Practices in Kenya",
      excerpt: "Explore modern goat farming techniques that combine traditional knowledge with sustainable agricultural practices. Learn from experienced farmers across Kenya.",
      author: "Agricultural Experts Team",
      date: "January 10, 2025", 
      readTime: "6 min read",
      category: "Agriculture",
      image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/goats.jpg",
      content: `
        <p>Goat farming in Kenya represents a perfect blend of traditional pastoral practices and modern agricultural techniques. The <a href="https://www.fao.org/" target="_blank" rel="noopener noreferrer" class="text-agri-green hover:text-agri-dark underline">Food and Agriculture Organization (FAO)</a> recognizes goat farming as a crucial component of sustainable livestock systems in arid and semi-arid regions.</p>
        
        <h3>Why Goat Farming Matters</h3>
        <p>Goats are particularly well-suited to Kenya's diverse climate conditions. Research from <a href="https://sarep.ucdavis.edu/sustainable-ag/agritourism" target="_blank" rel="noopener noreferrer" class="text-agri-green hover:text-agri-dark underline">UC Davis sustainable agriculture programs</a> highlights how goat farming contributes to food security and economic stability in rural communities.</p>
        
        <h3>Sustainable Practices</h3>
        <ul>
          <li><strong>Rotational Grazing:</strong> Prevents overgrazing and maintains pasture health</li>
          <li><strong>Integrated Farming:</strong> Combining goat farming with crop production</li>
          <li><strong>Breeding Programs:</strong> Improving genetic diversity and disease resistance</li>
          <li><strong>Water Conservation:</strong> Efficient water management systems</li>
        </ul>
        
        <p>Following guidelines from <a href="https://www.gstcouncil.org/" target="_blank" rel="noopener noreferrer" class="text-agri-green hover:text-agri-dark underline">Global Sustainable Tourism Council</a>, agritourism experiences featuring goat farming provide educational value while supporting local economies.</p>
      `
    },
    {
      id: 3,
      title: "Understanding Trip Cancellation Policies in Agritourism",
      excerpt: "Navigate the complexities of travel planning with our comprehensive guide to cancellation policies, insurance options, and flexible booking arrangements.",
      author: "Travel Advisory Team",
      date: "January 5, 2025",
      readTime: "10 min read", 
      category: "Travel Guidelines",
      image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Fair%20view/Planning.webp",
      content: `
        <p>Understanding trip cancellation policies is essential for responsible travel planning. The <a href="https://www.thetravelfoundation.org.uk/" target="_blank" rel="noopener noreferrer" class="text-agri-green hover:text-agri-dark underline">Travel Foundation</a> emphasizes the importance of clear cancellation policies in building trust between tour operators and travelers.</p>
        
        <h3>Industry Best Practices</h3>
        <p>According to <a href="https://www.unwto.org/" target="_blank" rel="noopener noreferrer" class="text-agri-green hover:text-agri-dark underline">UNWTO guidelines</a>, transparent cancellation policies protect both travelers and service providers while promoting sustainable tourism practices.</p>
        
        <h3>Key Considerations</h3>
        <ul>
          <li><strong>Advance Notice:</strong> Earlier cancellations typically result in higher refund percentages</li>
          <li><strong>Force Majeure:</strong> Policies for unavoidable circumstances like natural disasters</li>
          <li><strong>Health Emergencies:</strong> Flexible arrangements during pandemic or health crises</li>
          <li><strong>Travel Insurance:</strong> Protection for unexpected situations</li>
        </ul>
        
        <p>The <a href="https://www.responsibletravel.org/" target="_blank" rel="noopener noreferrer" class="text-agri-green hover:text-agri-dark underline">Center for Responsible Travel</a> recommends that tour operators maintain fair and flexible cancellation policies that balance business sustainability with customer protection.</p>
      `
    }
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article key={article.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 bg-agri-green text-white px-3 py-1 rounded-full text-xs font-inter font-semibold">
                  {article.category}
                </div>
              </div>
              
              <div className="p-6">
                <h2 className="text-xl font-poppins font-bold text-agri-dark mb-3 line-clamp-2">
                  {article.title}
                </h2>
                
                <p className="text-gray-600 font-inter mb-4 leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 font-inter mb-4">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {article.author}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {article.readTime}
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-gray-500 font-inter mb-4">
                  <Calendar className="h-4 w-4 mr-1" />
                  {article.date}
                </div>
                
                <Button 
                  className="w-full bg-agri-teal hover:bg-agri-teal/90 text-white font-inter font-semibold group"
                >
                  Read Full Article
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogArticles;
