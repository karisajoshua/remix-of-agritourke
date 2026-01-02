import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, X, Trash2, Star, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface Comment {
  id: string;
  author_name: string;
  author_email: string;
  content: string;
  rating: number | null;
  approved: boolean;
  created_at: string;
  post_id: string;
  blog_posts: {
    title: string;
    slug: string;
  } | null;
}

const AdminComments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchComments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('blog_comments')
      .select('*, blog_posts(title, slug)')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setComments(data as Comment[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleApprove = async (id: string) => {
    const { error } = await supabase
      .from('blog_comments')
      .update({ approved: true })
      .eq('id', id);

    if (error) {
      toast.error('Failed to approve comment');
    } else {
      toast.success('Comment approved');
      fetchComments();
    }
  };

  const handleUnapprove = async (id: string) => {
    const { error } = await supabase
      .from('blog_comments')
      .update({ approved: false })
      .eq('id', id);

    if (error) {
      toast.error('Failed to unapprove comment');
    } else {
      toast.success('Comment unapproved');
      fetchComments();
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    
    const { error } = await supabase
      .from('blog_comments')
      .delete()
      .eq('id', deleteId);

    if (error) {
      toast.error('Failed to delete comment');
    } else {
      toast.success('Comment deleted');
      fetchComments();
    }
    setDeleteId(null);
  };

  const pendingComments = comments.filter((c) => !c.approved);
  const approvedComments = comments.filter((c) => c.approved);

  const CommentCard = ({ comment }: { comment: Comment }) => (
    <div className="bg-white border rounded-lg p-4 shadow-sm">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-agri-dark">{comment.author_name}</span>
            <span className="text-sm text-gray-500">{comment.author_email}</span>
            <Badge variant={comment.approved ? 'default' : 'secondary'}>
              {comment.approved ? 'Approved' : 'Pending'}
            </Badge>
          </div>
          {comment.rating && (
            <div className="flex gap-0.5 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= comment.rating! ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          )}
          <p className="text-gray-700 mb-2">{comment.content}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>Post: {comment.blog_posts?.title || 'Unknown'}</span>
            <span>{format(new Date(comment.created_at), 'MMM d, yyyy h:mm a')}</span>
          </div>
        </div>
        <div className="flex gap-2">
          {comment.blog_posts?.slug && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(`/blog/${comment.blog_posts?.slug}`, '_blank')}
            >
              <Eye className="h-4 w-4" />
            </Button>
          )}
          {comment.approved ? (
            <Button variant="outline" size="sm" onClick={() => handleUnapprove(comment.id)}>
              <X className="h-4 w-4 mr-1" />
              Unapprove
            </Button>
          ) : (
            <Button
              variant="default"
              size="sm"
              className="bg-agri-green hover:bg-agri-green/90"
              onClick={() => handleApprove(comment.id)}
            >
              <Check className="h-4 w-4 mr-1" />
              Approve
            </Button>
          )}
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setDeleteId(comment.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-agri-dark">Comments</h1>
          {pendingComments.length > 0 && (
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              {pendingComments.length} pending
            </Badge>
          )}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-agri-green mx-auto"></div>
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>No comments yet.</p>
          </div>
        ) : (
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All ({comments.length})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({pendingComments.length})</TabsTrigger>
              <TabsTrigger value="approved">Approved ({approvedComments.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4 mt-4">
              {comments.map((comment) => (
                <CommentCard key={comment.id} comment={comment} />
              ))}
            </TabsContent>
            <TabsContent value="pending" className="space-y-4 mt-4">
              {pendingComments.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No pending comments.</p>
              ) : (
                pendingComments.map((comment) => (
                  <CommentCard key={comment.id} comment={comment} />
                ))
              )}
            </TabsContent>
            <TabsContent value="approved" className="space-y-4 mt-4">
              {approvedComments.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No approved comments.</p>
              ) : (
                approvedComments.map((comment) => (
                  <CommentCard key={comment.id} comment={comment} />
                ))
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Comment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this comment? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default AdminComments;
