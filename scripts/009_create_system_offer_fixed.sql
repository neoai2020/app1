-- First, ensure we have a system niche to reference
INSERT INTO niches (
  id,
  name,
  description,
  icon,
  created_at
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  'General',
  'General purpose niche for user-provided offers',
  '🎯',
  NOW()
)
ON CONFLICT (id) DO NOTHING;

-- Then create the system offer with proper reference
INSERT INTO offers (
  id,
  niche_id,
  title,
  description,
  commission_rate,
  affiliate_network,
  created_at
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000001',
  'User Provided Offer',
  'User is using their own affiliate link from DigiStore24 or other network',
  'Variable',
  'DigiStore24',
  NOW()
)
ON CONFLICT (id) DO NOTHING;
