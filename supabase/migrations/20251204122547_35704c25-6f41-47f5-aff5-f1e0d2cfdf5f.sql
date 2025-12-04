-- Add visible column to gallery_images table
ALTER TABLE public.gallery_images 
ADD COLUMN IF NOT EXISTS visible boolean DEFAULT true;

-- Update existing images to be visible
UPDATE public.gallery_images SET visible = true WHERE visible IS NULL;