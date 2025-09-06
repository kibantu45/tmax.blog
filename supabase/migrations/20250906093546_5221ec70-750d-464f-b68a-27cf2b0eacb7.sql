-- Fix infinite recursion in RLS by creating a security definer function
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE SET search_path = public;

-- Update AdminPanel to use profiles table instead of user_roles
-- Drop old policies that reference user_roles for admin checks
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- Create new admin policy using the security definer function
CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR ALL 
USING (public.get_current_user_role() = 'admin');

-- Update other admin policies to use profiles table
DROP POLICY IF EXISTS "Admins can manage medicines" ON public.medicines;
CREATE POLICY "Admins can manage medicines" 
ON public.medicines 
FOR ALL 
USING (public.get_current_user_role() = 'admin');

DROP POLICY IF EXISTS "Admins can manage groceries" ON public.groceries;
CREATE POLICY "Admins can manage groceries" 
ON public.groceries 
FOR ALL 
USING (public.get_current_user_role() = 'admin');

DROP POLICY IF EXISTS "Admins can manage eshop products" ON public.eshop_products;
CREATE POLICY "Admins can manage eshop products" 
ON public.eshop_products 
FOR ALL 
USING (public.get_current_user_role() = 'admin');

DROP POLICY IF EXISTS "Admins can manage service providers" ON public.service_providers;
CREATE POLICY "Admins can manage service providers" 
ON public.service_providers 
FOR ALL 
USING (public.get_current_user_role() = 'admin');

DROP POLICY IF EXISTS "Admins can manage rentals" ON public.rentals;
CREATE POLICY "Admins can manage rentals" 
ON public.rentals 
FOR ALL 
USING (public.get_current_user_role() = 'admin');

DROP POLICY IF EXISTS "Admins can manage all shops" ON public.shops;
CREATE POLICY "Admins can manage all shops" 
ON public.shops 
FOR ALL 
USING (public.get_current_user_role() = 'admin');

DROP POLICY IF EXISTS "Admins can manage all shop products" ON public.shop_products;
CREATE POLICY "Admins can manage all shop products" 
ON public.shop_products 
FOR ALL 
USING (public.get_current_user_role() = 'admin');

DROP POLICY IF EXISTS "Admins can manage all items" ON public.items;
CREATE POLICY "Admins can manage all items" 
ON public.items 
FOR ALL 
USING (public.get_current_user_role() = 'admin');