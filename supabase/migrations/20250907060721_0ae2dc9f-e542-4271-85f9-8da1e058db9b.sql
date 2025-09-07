-- Add image_url to rentals table for main property image
ALTER TABLE public.rentals ADD COLUMN image_url TEXT;

-- Create a storage bucket for rental images if it doesn't exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('rental-images', 'rental-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for rental images
CREATE POLICY "Rental images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'rental-images');

CREATE POLICY "Admins can upload rental images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'rental-images' AND 
  (get_current_user_role() = 'admin')
);

CREATE POLICY "Admins can update rental images" 
ON storage.objects 
FOR UPDATE 
USING (
  bucket_id = 'rental-images' AND 
  (get_current_user_role() = 'admin')
);

CREATE POLICY "Admins can delete rental images" 
ON storage.objects 
FOR DELETE 
USING (
  bucket_id = 'rental-images' AND 
  (get_current_user_role() = 'admin')
);