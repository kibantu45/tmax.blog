-- Create shops table for multiple shop owners
CREATE TABLE public.shops (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  shop_name TEXT NOT NULL,
  category TEXT NOT NULL,
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  contact_number TEXT,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create shop_products table
CREATE TABLE public.shop_products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  shop_id UUID REFERENCES public.shops(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  stock INTEGER DEFAULT 0,
  image_url TEXT,
  description TEXT,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create marketplace items table
CREATE TABLE public.items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  image_url TEXT,
  seller_phone TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  category TEXT DEFAULT 'general',
  condition TEXT DEFAULT 'used',
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.shops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shop_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;

-- RLS Policies for shops
CREATE POLICY "Public can view shops" 
ON public.shops 
FOR SELECT 
USING (true);

CREATE POLICY "Shop owners can manage their shops" 
ON public.shops 
FOR ALL 
USING (auth.uid() = owner_id);

CREATE POLICY "Admins can manage all shops" 
ON public.shops 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM user_roles 
  WHERE user_id = auth.uid() AND role = 'admin'
));

-- RLS Policies for shop_products
CREATE POLICY "Public can view shop products" 
ON public.shop_products 
FOR SELECT 
USING (true);

CREATE POLICY "Shop owners can manage their products" 
ON public.shop_products 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.shops 
  WHERE shops.id = shop_products.shop_id AND shops.owner_id = auth.uid()
));

CREATE POLICY "Admins can manage all shop products" 
ON public.shop_products 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM user_roles 
  WHERE user_id = auth.uid() AND role = 'admin'
));

-- RLS Policies for marketplace items
CREATE POLICY "Public can view marketplace items" 
ON public.items 
FOR SELECT 
USING (true);

CREATE POLICY "Users can create their own items" 
ON public.items 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own items" 
ON public.items 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own items" 
ON public.items 
FOR DELETE 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all items" 
ON public.items 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM user_roles 
  WHERE user_id = auth.uid() AND role = 'admin'
));

-- Create triggers for updated_at columns
CREATE TRIGGER update_shops_updated_at
BEFORE UPDATE ON public.shops
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_shop_products_updated_at
BEFORE UPDATE ON public.shop_products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_items_updated_at
BEFORE UPDATE ON public.items
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample shops data
INSERT INTO public.shops (shop_name, category, contact_number, description, image_url) VALUES
('Tum Perfumes', 'beauty', '+254712345678', 'Premium perfumes and fragrances', '/lovable-uploads/vitamin-c.jpg'),
('Campus Jerseys', 'clothing', '+254787654321', 'Sports jerseys and team merchandise', '/lovable-uploads/l1.jpeg'),
('Tum Groceries', 'groceries', '+254798765432', 'Fresh groceries and daily essentials', '/lovable-uploads/l2.jpeg'),
('Tech Hub', 'electronics', '+254711223344', 'Latest gadgets and electronics', '/lovable-uploads/l3.jpeg'),
('Fashion Corner', 'clothing', '+254722334455', 'Trendy clothing and accessories', '/lovable-uploads/l4.jpeg');

-- Insert sample products for each shop
INSERT INTO public.shop_products (shop_id, name, price, stock, image_url, description, category) VALUES
-- Tum Perfumes
((SELECT id FROM public.shops WHERE shop_name = 'Tum Perfumes'), 'Dior Sauvage', 8500, 15, '/lovable-uploads/vitamin-c.jpg', 'Premium mens fragrance', 'perfume'),
((SELECT id FROM public.shops WHERE shop_name = 'Tum Perfumes'), 'Chanel No. 5', 12000, 8, '/lovable-uploads/vitamin-c.jpg', 'Classic womens perfume', 'perfume'),

-- Campus Jerseys  
((SELECT id FROM public.shops WHERE shop_name = 'Campus Jerseys'), 'Arsenal Home Jersey', 3500, 20, '/lovable-uploads/l1.jpeg', '2024/25 season jersey', 'jersey'),
((SELECT id FROM public.shops WHERE shop_name = 'Campus Jerseys'), 'Manchester United Away', 3800, 15, '/lovable-uploads/l1.jpeg', 'Official team merchandise', 'jersey'),

-- Tum Groceries
((SELECT id FROM public.shops WHERE shop_name = 'Tum Groceries'), 'Rice 2kg', 250, 50, '/lovable-uploads/l2.jpeg', 'Quality basmati rice', 'groceries'),
((SELECT id FROM public.shops WHERE shop_name = 'Tum Groceries'), 'Cooking Oil 1L', 320, 30, '/lovable-uploads/l2.jpeg', 'Pure sunflower oil', 'groceries'),

-- Tech Hub
((SELECT id FROM public.shops WHERE shop_name = 'Tech Hub'), 'iPhone 15', 85000, 5, '/lovable-uploads/l3.jpeg', 'Latest iPhone model', 'electronics'),
((SELECT id FROM public.shops WHERE shop_name = 'Tech Hub'), 'Samsung Galaxy S24', 75000, 8, '/lovable-uploads/l3.jpeg', 'Android flagship phone', 'electronics'),

-- Fashion Corner
((SELECT id FROM public.shops WHERE shop_name = 'Fashion Corner'), 'Denim Jacket', 2500, 12, '/lovable-uploads/l4.jpeg', 'Trendy denim jacket', 'clothing'),
((SELECT id FROM public.shops WHERE shop_name = 'Fashion Corner'), 'Casual Sneakers', 4500, 18, '/lovable-uploads/l4.jpeg', 'Comfortable daily wear', 'shoes');