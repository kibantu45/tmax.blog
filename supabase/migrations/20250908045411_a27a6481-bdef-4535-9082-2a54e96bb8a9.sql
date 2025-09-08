-- Fix infinite recursion in user_roles policies by creating a security definer function
-- Drop existing problematic policies
DROP POLICY IF EXISTS "Admins can manage user roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage all items" ON public.items;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can manage eshop products" ON public.eshop_products;
DROP POLICY IF EXISTS "Admins can manage groceries" ON public.groceries;
DROP POLICY IF EXISTS "Admins can manage medicines" ON public.medicines;
DROP POLICY IF EXISTS "Admins can manage service providers" ON public.service_providers;
DROP POLICY IF EXISTS "Admins can manage all shops" ON public.shops;
DROP POLICY IF EXISTS "Admins can manage all shop products" ON public.shop_products;
DROP POLICY IF EXISTS "Admins can manage rentals" ON public.rentals;
DROP POLICY IF EXISTS "Admins can manage rental photos" ON public.rental_photos;
DROP POLICY IF EXISTS "Admins can manage university links" ON public.university_links;

-- Create a security definer function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_current_user_admin()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  );
$$;

-- Recreate all admin policies using the security definer function
CREATE POLICY "Admins can manage user roles" 
ON public.user_roles 
FOR ALL 
USING (public.is_current_user_admin());

CREATE POLICY "Admins can manage all items" 
ON public.items 
FOR ALL 
USING (public.is_current_user_admin());

CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR ALL 
USING (public.is_current_user_admin());

CREATE POLICY "Admins can manage eshop products" 
ON public.eshop_products 
FOR ALL 
USING (public.is_current_user_admin());

CREATE POLICY "Admins can manage groceries" 
ON public.groceries 
FOR ALL 
USING (public.is_current_user_admin());

CREATE POLICY "Admins can manage medicines" 
ON public.medicines 
FOR ALL 
USING (public.is_current_user_admin());

CREATE POLICY "Admins can manage service providers" 
ON public.service_providers 
FOR ALL 
USING (public.is_current_user_admin());

CREATE POLICY "Admins can manage all shops" 
ON public.shops 
FOR ALL 
USING (public.is_current_user_admin());

CREATE POLICY "Admins can manage all shop products" 
ON public.shop_products 
FOR ALL 
USING (public.is_current_user_admin());

CREATE POLICY "Admins can manage rentals" 
ON public.rentals 
FOR ALL 
USING (public.is_current_user_admin());

CREATE POLICY "Admins can manage rental photos" 
ON public.rental_photos 
FOR ALL 
USING (public.is_current_user_admin());

CREATE POLICY "Admins can manage university links" 
ON public.university_links 
FOR ALL 
USING (public.is_current_user_admin());