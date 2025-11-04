-- Add slug field to pages table for SEO-friendly URLs
ALTER TABLE public.pages ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_pages_slug ON public.pages(slug);

-- Add public read policy for published pages
CREATE POLICY "Anyone can view active pages" ON public.pages
  FOR SELECT USING (status = 'active');

-- Function to generate slug from title
CREATE OR REPLACE FUNCTION generate_slug(title TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN lower(regexp_replace(regexp_replace(title, '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g'));
END;
$$ LANGUAGE plpgsql;
