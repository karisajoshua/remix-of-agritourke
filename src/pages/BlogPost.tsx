import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowLeft, Clock, MessageSquare } from 'lucide-react';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { supabase } from '@/integrations/supabase/client';
import { sanitizeHtml } from '@/lib/sanitize';
import BlogComments from '@/components/BlogComments';
import CommentForm from '@/components/CommentForm';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentCount, setCommentCount] = useState(0);
  const [refreshComments, setRefreshComments] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchPost = async () => {
      if (!slug) return;
      const { data } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();
      setPost(data);
      
      if (data) {
        const { data: related } = await supabase
          .from('blog_posts')
          .select('*')
          .neq('slug', slug)
          .limit(3);
        setRelatedPosts(related || []);

        // Fetch comment count
        const { count } = await supabase
          .from('blog_comments')
          .select('*', { count: 'exact', head: true })
          .eq('post_id', data.id)
          .eq('approved', true);
        setCommentCount(count || 0);
      }
      setLoading(false);
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="pt-32 pb-20 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-agri-green mx-auto"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-poppins font-bold text-agri-dark mb-6">Article Not Found</h1>
            <Button onClick={() => navigate('/blog')} className="bg-agri-green hover:bg-agri-green/90">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-20 pb-4 bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/blog">Blog</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{post.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <article className="pt-12 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              {post.category && <span className="bg-agri-teal/10 text-agri-teal px-3 py-1 rounded-full">{post.category}</span>}
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
              {post.read_time && (
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.read_time}</span>
                </div>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-poppins font-bold text-agri-dark mb-4">{post.title}</h1>
            <div className="flex items-center gap-2 text-gray-600">
              <User className="h-5 w-5" />
              <span className="font-inter">By {post.author}</span>
            </div>
          </div>

          {post.image && (
            <div className="mb-12 rounded-lg overflow-hidden">
              <img src={post.image} alt={post.title} className="w-full h-auto" />
            </div>
          )}

          <div 
            className="prose prose-lg max-w-none font-inter"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
          />

          {/* Comments Section */}
          <div className="mt-16 pt-8 border-t">
            <div className="flex items-center gap-2 mb-8">
              <MessageSquare className="h-6 w-6 text-agri-green" />
              <h2 className="text-2xl font-poppins font-bold text-agri-dark">
                Comments {commentCount > 0 && `(${commentCount})`}
              </h2>
            </div>
            
            <BlogComments postId={post.id} refreshTrigger={refreshComments} />
            
            <div className="mt-8">
              <CommentForm 
                postId={post.id} 
                onCommentSubmitted={() => setRefreshComments(r => r + 1)} 
              />
            </div>
          </div>

          <div className="mt-12 pt-8 border-t">
            <Button onClick={() => navigate('/blog')} variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
