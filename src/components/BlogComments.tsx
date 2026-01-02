import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Star, User } from 'lucide-react';
import { format } from 'date-fns';

interface Comment {
  id: string;
  author_name: string;
  content: string;
  rating: number | null;
  created_at: string;
}

interface BlogCommentsProps {
  postId: string;
  refreshTrigger?: number;
}

const BlogComments = ({ postId, refreshTrigger }: BlogCommentsProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_comments')
        .select('id, author_name, content, rating, created_at')
        .eq('post_id', postId)
        .eq('approved', true)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setComments(data);
      }
      setLoading(false);
    };

    fetchComments();
  }, [postId, refreshTrigger]);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-agri-green mx-auto"></div>
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No comments yet. Be the first to leave a comment!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <div key={comment.id} className="bg-white border rounded-lg p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="bg-agri-grey rounded-full p-2">
              <User className="h-5 w-5 text-agri-dark" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h4 className="font-poppins font-semibold text-agri-dark">
                  {comment.author_name}
                </h4>
                <span className="text-sm text-gray-500">
                  {format(new Date(comment.created_at), 'MMM d, yyyy')}
                </span>
              </div>
              {comment.rating && (
                <div className="flex gap-0.5 my-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= comment.rating!
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              )}
              <p className="text-gray-700 mt-2 font-inter">{comment.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogComments;
