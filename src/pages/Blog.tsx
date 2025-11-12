import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { supabase } from '@/integrations/supabase/client';

const Blog = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      setPosts(data || []);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
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

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-agri-green mx-auto"></div>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No blog posts available yet.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article key={post.id} className="bg-white rounded-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                  <div className="h-64 overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      {post.category && <span className="bg-agri-teal/10 text-agri-teal px-3 py-1 rounded-full">{post.category}</span>}
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-poppins font-bold text-agri-dark mb-3 line-clamp-2">{post.title}</h3>
                    <p className="text-gray-600 font-inter mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <Button variant="ghost" onClick={() => navigate(`/blog/${post.slug}`)} className="text-agri-green hover:text-agri-green/80">
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
