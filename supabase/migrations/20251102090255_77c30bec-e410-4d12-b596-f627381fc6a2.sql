-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'viewer');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "User roles are viewable by everyone"
  ON public.user_roles FOR SELECT
  USING (true);

CREATE POLICY "Only admins can manage roles"
  ON public.user_roles FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Create security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create tours table
CREATE TABLE public.tours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  duration TEXT,
  location TEXT,
  participants TEXT,
  image TEXT,
  description TEXT,
  category TEXT,
  featured BOOLEAN DEFAULT false,
  full_description TEXT,
  itinerary JSONB DEFAULT '[]'::jsonb,
  includes JSONB DEFAULT '[]'::jsonb,
  external_links JSONB DEFAULT '[]'::jsonb,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.tours ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tours are viewable by everyone"
  ON public.tours FOR SELECT
  USING (true);

CREATE POLICY "Only admins can insert tours"
  ON public.tours FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update tours"
  ON public.tours FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete tours"
  ON public.tours FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Create blog_posts table
CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  image TEXT,
  author TEXT,
  date TEXT,
  category TEXT,
  read_time TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Blog posts are viewable by everyone"
  ON public.blog_posts FOR SELECT
  USING (true);

CREATE POLICY "Only admins can insert blog posts"
  ON public.blog_posts FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update blog posts"
  ON public.blog_posts FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete blog posts"
  ON public.blog_posts FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Create gallery_categories table
CREATE TABLE public.gallery_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.gallery_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Gallery categories are viewable by everyone"
  ON public.gallery_categories FOR SELECT
  USING (true);

CREATE POLICY "Only admins can insert gallery categories"
  ON public.gallery_categories FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update gallery categories"
  ON public.gallery_categories FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete gallery categories"
  ON public.gallery_categories FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Create gallery_images table
CREATE TABLE public.gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL,
  title TEXT,
  description TEXT,
  category TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Gallery images are viewable by everyone"
  ON public.gallery_images FOR SELECT
  USING (true);

CREATE POLICY "Only admins can insert gallery images"
  ON public.gallery_images FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update gallery images"
  ON public.gallery_images FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete gallery images"
  ON public.gallery_images FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Add updated_at triggers to tables
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.tours
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.gallery_images
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('tour-images', 'tour-images', true),
  ('blog-images', 'blog-images', true),
  ('gallery-images', 'gallery-images', true);

-- Storage policies for tour-images
CREATE POLICY "Tour images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'tour-images');

CREATE POLICY "Only admins can upload tour images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'tour-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update tour images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'tour-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete tour images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'tour-images' AND public.has_role(auth.uid(), 'admin'));

-- Storage policies for blog-images
CREATE POLICY "Blog images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'blog-images');

CREATE POLICY "Only admins can upload blog images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update blog images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete blog images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'));

-- Storage policies for gallery-images
CREATE POLICY "Gallery images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'gallery-images');

CREATE POLICY "Only admins can upload gallery images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'gallery-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update gallery images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'gallery-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete gallery images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'gallery-images' AND public.has_role(auth.uid(), 'admin'));