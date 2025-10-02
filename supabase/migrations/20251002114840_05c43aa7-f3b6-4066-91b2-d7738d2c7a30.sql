-- Add currency and theme_preference columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'USD',
ADD COLUMN IF NOT EXISTS theme_preference TEXT DEFAULT 'light';