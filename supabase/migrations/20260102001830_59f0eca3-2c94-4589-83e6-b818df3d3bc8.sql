-- Create blog_comments table
CREATE TABLE public.blog_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES public.blog_posts(id) ON DELETE CASCADE NOT NULL,
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  approved BOOLEAN DEFAULT FALSE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.blog_comments ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Anyone can view approved comments
CREATE POLICY "Anyone can view approved comments"
ON public.blog_comments
FOR SELECT
USING (approved = true);

-- Anyone can submit a comment
CREATE POLICY "Anyone can submit comments"
ON public.blog_comments
FOR INSERT
WITH CHECK (true);

-- Only admins can update comments (for approval)
CREATE POLICY "Admins can update comments"
ON public.blog_comments
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can delete comments
CREATE POLICY "Admins can delete comments"
ON public.blog_comments
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can view all comments (including unapproved)
CREATE POLICY "Admins can view all comments"
ON public.blog_comments
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add trigger for updated_at
CREATE TRIGGER update_blog_comments_updated_at
BEFORE UPDATE ON public.blog_comments
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();