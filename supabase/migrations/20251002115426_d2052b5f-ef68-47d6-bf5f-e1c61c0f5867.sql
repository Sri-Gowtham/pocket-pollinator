-- Add missing columns to expenses table
ALTER TABLE public.expenses
ADD COLUMN IF NOT EXISTS description TEXT,
ADD COLUMN IF NOT EXISTS payment_method TEXT;