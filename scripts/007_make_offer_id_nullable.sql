-- Make offer_id nullable since users can provide their own affiliate links
ALTER TABLE public.pages 
ALTER COLUMN offer_id DROP NOT NULL;

-- Add offer_name column to store user's custom offer name
ALTER TABLE public.pages 
ADD COLUMN IF NOT EXISTS offer_name TEXT;

-- Add video metadata columns for comment packs
ALTER TABLE public.pages 
ADD COLUMN IF NOT EXISTS video_id TEXT,
ADD COLUMN IF NOT EXISTS video_title TEXT,
ADD COLUMN IF NOT EXISTS video_url TEXT,
ADD COLUMN IF NOT EXISTS channel_title TEXT;
