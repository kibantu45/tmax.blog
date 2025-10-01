-- Remove the rental_photos text column to avoid confusion with the rental_photos table
ALTER TABLE public.rentals DROP COLUMN IF EXISTS rental_photos;