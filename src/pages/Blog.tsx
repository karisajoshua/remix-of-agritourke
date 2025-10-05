import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight, Heart, Users, Leaf, Clock, Phone, Mail } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { blogPosts } from '@/data/blogPosts';

const Blog = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Breadcrumb */}
      <div className="pt-20 pb-4 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Blog</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      
      {/* Hero Section */}
      <section className="py-16 bg-agri-grey">
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

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-agri-green text-white px-3 py-1 rounded-full text-xs font-inter font-semibold">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-2xl font-poppins font-bold text-agri-dark mb-3 group-hover:text-agri-green transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <div className="flex items-center space-x-4 text-gray-500 text-xs font-inter mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {post.date}
                    </div>
                    {post.readTime && (
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {post.readTime}
                      </div>
                    )}
                  </div>
                  
                  <p className="text-gray-600 font-inter text-sm mb-6 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  <Link to={`/blog/${post.slug}`}>
                    <Button className="w-full bg-agri-green hover:bg-agri-green/90 text-white group-hover:shadow-lg transition-shadow">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Trip Cancellation Guidelines */}
      <section className="py-20 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-agri-dark mb-6">
              Trip Cancellation Guidelines
            </h2>
            <p className="text-xl text-gray-600 font-inter max-w-3xl mx-auto leading-relaxed">
              We understand that plans can change. Here's everything you need to know about our cancellation policy.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Cancellation Policy */}
            <div className="bg-agri-grey rounded-lg p-8">
              <div className="flex items-center mb-6">
                <Clock className="h-8 w-8 text-agri-green mr-3" />
                <h3 className="text-2xl font-poppins font-bold text-agri-dark">Cancellation Policy</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-poppins font-semibold text-agri-dark mb-2">30+ Days Before Trip</h4>
                  <p className="text-gray-600 font-inter">Full refund minus 10% processing fee</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-poppins font-semibold text-agri-dark mb-2">15-29 Days Before Trip</h4>
                  <p className="text-gray-600 font-inter">75% refund of total payment</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-poppins font-semibold text-agri-dark mb-2">7-14 Days Before Trip</h4>
                  <p className="text-gray-600 font-inter">50% refund of total payment</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-poppins font-semibold text-agri-dark mb-2">Less Than 7 Days</h4>
                  <p className="text-gray-600 font-inter">No refund available</p>
                </div>
              </div>
            </div>

            {/* Emergency & Contact Info */}
            <div className="space-y-8">
              <div className="bg-white border border-gray-200 rounded-lg p-8">
                <h3 className="text-2xl font-poppins font-bold text-agri-dark mb-6">Emergency Cancellations</h3>
                <p className="text-gray-600 font-inter mb-4">
                  In case of medical emergencies, family emergencies, or severe weather conditions, 
                  we may waive standard cancellation fees. Documentation may be required.
                </p>
                <p className="text-gray-600 font-inter">
                  Travel insurance is highly recommended to protect your investment.
                </p>
              </div>

              <div className="bg-agri-green text-white rounded-lg p-8">
                <h3 className="text-2xl font-poppins font-bold mb-6">Need to Cancel?</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-3" />
                    <span className="font-inter">+254710429755</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-3" />
                    <span className="font-inter">bookings@agritourismadventures.com</span>
                  </div>
                </div>
                <p className="mt-4 text-sm font-inter opacity-90">
                  Contact us as early as possible to discuss your cancellation options.
                </p>
              </div>
            </div>
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
            traditions, and innovations that make Kenya's agricultural landscape extraordinary. <Link to="/tours" className="text-agri-green hover:text-agri-green/80 underline">Explore our tours</Link> or <Link to="/services" className="text-agri-green hover:text-agri-green/80 underline">view our services</Link>.
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
