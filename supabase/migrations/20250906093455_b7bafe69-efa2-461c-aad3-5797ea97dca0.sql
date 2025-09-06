-- Add role column to existing profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user';

-- Update RLS policies for profiles table to support admin role checking
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = auth.uid() AND p.role = 'admin'
  )
);

-- Create admin user by updating existing user or inserting if email doesn't exist
-- First, check if a user with this email exists and update their role
UPDATE public.profiles 
SET role = 'admin' 
WHERE email = 'osinyamaxwel28@gmail.com';

-- If no rows were updated, the user doesn't exist yet
-- When they sign up, their role will be 'user' by default
-- We'll need to manually set them as admin after signup