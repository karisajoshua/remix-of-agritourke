import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Star } from 'lucide-react';
import { toast } from 'sonner';

const commentSchema = z.object({
  author_name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  author_email: z.string().email('Please enter a valid email'),
  content: z.string().min(10, 'Comment must be at least 10 characters').max(1000),
  rating: z.number().min(1).max(5).optional(),
});

type CommentFormData = z.infer<typeof commentSchema>;

interface CommentFormProps {
  postId: string;
  onCommentSubmitted?: () => void;
}

const CommentForm = ({ postId, onCommentSubmitted }: CommentFormProps) => {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
  });

  const onSubmit = async (data: CommentFormData) => {
    setSubmitting(true);
    try {
      const { error } = await supabase.from('blog_comments').insert({
        post_id: postId,
        author_name: data.author_name,
        author_email: data.author_email,
        content: data.content,
        rating: rating > 0 ? rating : null,
        approved: false,
      });

      if (error) throw error;

      toast.success('Thank you! Your comment is pending approval.');
      reset();
      setRating(0);
      onCommentSubmitted?.();
    } catch (error) {
      console.error('Error submitting comment:', error);
      toast.error('Failed to submit comment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-agri-grey rounded-lg p-6">
      <h3 className="text-xl font-poppins font-bold text-agri-dark mb-4">Leave a Comment</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="author_name">Name *</Label>
            <Input
              id="author_name"
              {...register('author_name')}
              placeholder="Your name"
              className="mt-1"
            />
            {errors.author_name && (
              <p className="text-red-500 text-sm mt-1">{errors.author_name.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="author_email">Email *</Label>
            <Input
              id="author_email"
              type="email"
              {...register('author_email')}
              placeholder="Your email"
              className="mt-1"
            />
            {errors.author_email && (
              <p className="text-red-500 text-sm mt-1">{errors.author_email.message}</p>
            )}
          </div>
        </div>

        <div>
          <Label>Rating (optional)</Label>
          <div className="flex gap-1 mt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="p-1 focus:outline-none"
              >
                <Star
                  className={`h-6 w-6 transition-colors ${
                    star <= (hoveredRating || rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="content">Comment *</Label>
          <Textarea
            id="content"
            {...register('content')}
            placeholder="Write your comment..."
            rows={4}
            className="mt-1"
          />
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={submitting}
          className="bg-agri-green hover:bg-agri-green/90"
        >
          {submitting ? 'Submitting...' : 'Submit Comment'}
        </Button>
      </form>
    </div>
  );
};

export default CommentForm;
