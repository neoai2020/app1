-- Create a system-level default offer that can be used as a fallback
-- This ensures the app works even if the offer_id nullable migration hasn't been run yet

-- First, ensure we have a "General" niche as fallback
INSERT INTO public.niches (id, name, description, icon)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'General',
  'General affiliate marketing niche',
  '🌐'
)
ON CONFLICT (id) DO NOTHING;

-- Create a system offer that can be used when users bring their own links
INSERT INTO public.offers (id, niche_id, title, description, commission_rate, affiliate_network)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000001',
  'User Provided Affiliate Link',
  'This is a placeholder offer for pages where users provide their own affiliate links from DigiStore24 or other networks.',
  'Variable',
  'User Provided'
)
ON CONFLICT (id) DO NOTHING;

-- Add comment for documentation
COMMENT ON TABLE public.offers IS 'Offers table. ID 00000000-0000-0000-0000-000000000001 is a system placeholder for user-provided affiliate links.';
