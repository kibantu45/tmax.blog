-- Create tables for dynamic content management

-- Medicines/Pharmacy table
CREATE TABLE public.medicines (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text,
  price integer NOT NULL,
  image_url text,
  category text NOT NULL,
  prescription_required boolean DEFAULT false,
  stock integer DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Groceries table
CREATE TABLE public.groceries (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text,
  price integer NOT NULL,
  image_url text,
  category text NOT NULL,
  store_name text,
  whatsapp text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- E-shop products table
CREATE TABLE public.eshop_products (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text,
  price integer NOT NULL,
  image_url text,
  category text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Service providers table
CREATE TABLE public.service_providers (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text,
  category text NOT NULL,
  phone text,
  whatsapp text,
  location text,
  availability text DEFAULT 'Available',
  image_url text,
  rating decimal(2,1) DEFAULT 4.0,
  speciality text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Rentals table with multiple photos support
CREATE TABLE public.rentals (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  price_per_day integer NOT NULL,
  location text,
  category text NOT NULL,
  amenities text[],
  contact_phone text,
  contact_whatsapp text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Rental photos table for multiple images
CREATE TABLE public.rental_photos (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  rental_id uuid REFERENCES public.rentals(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  is_primary boolean DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Gossip posts table
CREATE TABLE public.gossip_posts (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  content text NOT NULL,
  image_url text,
  category text DEFAULT 'trending',
  likes_count integer DEFAULT 0,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Gossip likes table
CREATE TABLE public.gossip_likes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id uuid REFERENCES public.gossip_posts(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(post_id, user_id)
);

-- University special links table
CREATE TABLE public.university_links (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  url text NOT NULL,
  description text,
  icon text,
  category text DEFAULT 'portal',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- User roles for admin access
CREATE TYPE public.user_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'user',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable RLS on all tables
ALTER TABLE public.medicines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.groceries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.eshop_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rentals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rental_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gossip_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gossip_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.university_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Public read policies for product tables
CREATE POLICY "Public can view medicines" ON public.medicines FOR SELECT USING (true);
CREATE POLICY "Public can view groceries" ON public.groceries FOR SELECT USING (true);
CREATE POLICY "Public can view eshop products" ON public.eshop_products FOR SELECT USING (true);
CREATE POLICY "Public can view service providers" ON public.service_providers FOR SELECT USING (true);
CREATE POLICY "Public can view rentals" ON public.rentals FOR SELECT USING (true);
CREATE POLICY "Public can view rental photos" ON public.rental_photos FOR SELECT USING (true);
CREATE POLICY "Public can view university links" ON public.university_links FOR SELECT USING (true);

-- Gossip policies
CREATE POLICY "Users can view gossip posts" ON public.gossip_posts FOR SELECT USING (true);
CREATE POLICY "Users can create gossip posts" ON public.gossip_posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own gossip posts" ON public.gossip_posts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own gossip posts" ON public.gossip_posts FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view gossip likes" ON public.gossip_likes FOR SELECT USING (true);
CREATE POLICY "Users can create gossip likes" ON public.gossip_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own gossip likes" ON public.gossip_likes FOR DELETE USING (auth.uid() = user_id);

-- User roles policies
CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);

-- Admin policies for all tables
CREATE POLICY "Admins can manage medicines" ON public.medicines USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can manage groceries" ON public.groceries USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can manage eshop products" ON public.eshop_products USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can manage service providers" ON public.service_providers USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can manage rentals" ON public.rentals USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can manage rental photos" ON public.rental_photos USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can manage university links" ON public.university_links USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can manage user roles" ON public.user_roles USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));

-- Create functions for updating timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_medicines_updated_at BEFORE UPDATE ON public.medicines FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_groceries_updated_at BEFORE UPDATE ON public.groceries FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_eshop_products_updated_at BEFORE UPDATE ON public.eshop_products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_service_providers_updated_at BEFORE UPDATE ON public.service_providers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_rentals_updated_at BEFORE UPDATE ON public.rentals FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_gossip_posts_updated_at BEFORE UPDATE ON public.gossip_posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_roles.user_id = is_admin.user_id AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Insert sample data for university links
INSERT INTO public.university_links (name, url, description, icon) VALUES
('E-learning Portal', 'https://elearning.tum.ac.ke', 'Access online courses and materials', 'GraduationCap'),
('TUMMIS Portal', 'https://smis.tum.ac.ke', 'Student information management system', 'Users'),
('HELB Portal', 'https://hef.co.ke', 'Higher Education Loans Board', 'CreditCard');

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('gossip-images', 'gossip-images', true);

-- Storage policies
CREATE POLICY "Public can view product images" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');
CREATE POLICY "Admins can upload product images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'product-images' AND (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')));
CREATE POLICY "Admins can update product images" ON storage.objects FOR UPDATE USING (bucket_id = 'product-images' AND (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')));
CREATE POLICY "Admins can delete product images" ON storage.objects FOR DELETE USING (bucket_id = 'product-images' AND (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')));

CREATE POLICY "Public can view gossip images" ON storage.objects FOR SELECT USING (bucket_id = 'gossip-images');
CREATE POLICY "Users can upload gossip images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'gossip-images' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can update their own gossip images" ON storage.objects FOR UPDATE USING (bucket_id = 'gossip-images' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can delete their own gossip images" ON storage.objects FOR DELETE USING (bucket_id = 'gossip-images' AND auth.uid()::text = (storage.foldername(name))[1]);