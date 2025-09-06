-- Since we can't directly create auth users via SQL, we'll prepare for the admin user
-- When the user signs up with email "osinyamaxwel28@gmail.com", 
-- their profile will be automatically created via the trigger
-- We'll need to manually update their role to 'admin' after they sign up

-- For now, let's just ensure the table is ready
-- We can manually set the admin role after signup