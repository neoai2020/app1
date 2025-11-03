-- Seed dummy offers for testing
-- Health & Fitness Niche
INSERT INTO offers (niche_id, title, description, commission_rate, affiliate_network, example_link, compliance_notes)
SELECT 
  id,
  'Ultimate Weight Loss System',
  'Proven 30-day weight loss program with meal plans and workout guides. High conversion rate with 60-day money back guarantee.',
  50.00,
  'ClickBank',
  'https://example.com/weight-loss-offer',
  'Must include disclaimer: Results may vary. Consult physician before starting any diet program.'
FROM niches WHERE slug = 'health-fitness'
UNION ALL
SELECT 
  id,
  'Keto Diet Masterclass',
  'Complete keto diet course with recipes, shopping lists, and personal coaching. Recurring monthly subscription.',
  35.00,
  'ClickBank',
  'https://example.com/keto-offer',
  'FDA disclaimer required. Individual results may vary.'
FROM niches WHERE slug = 'health-fitness'
UNION ALL
SELECT 
  id,
  'Home Workout Equipment Bundle',
  'Premium resistance bands and workout gear with lifetime warranty. Physical product with high customer satisfaction.',
  25.00,
  'Amazon Associates',
  'https://example.com/workout-gear',
  'Standard Amazon affiliate disclosure required.'
FROM niches WHERE slug = 'health-fitness';

-- Make Money Online Niche
INSERT INTO offers (niche_id, title, description, commission_rate, affiliate_network, example_link, compliance_notes)
SELECT 
  id,
  'Affiliate Marketing Blueprint',
  'Step-by-step course teaching affiliate marketing from scratch. Includes templates, tools, and community access.',
  75.00,
  'ClickBank',
  'https://example.com/affiliate-course',
  'Income disclaimer required: Earnings not guaranteed. Results depend on individual effort.'
FROM niches WHERE slug = 'make-money-online'
UNION ALL
SELECT 
  id,
  'Dropshipping Automation Software',
  'All-in-one dropshipping platform with product research, supplier integration, and automated fulfillment.',
  100.00,
  'ShareASale',
  'https://example.com/dropship-software',
  'Must disclose: Success requires work and investment. No guaranteed income.'
FROM niches WHERE slug = 'make-money-online'
UNION ALL
SELECT 
  id,
  'Crypto Trading Signals',
  'Premium cryptocurrency trading signals with 85% accuracy rate. Monthly subscription with daily alerts.',
  40.00,
  'ClickBank',
  'https://example.com/crypto-signals',
  'Risk disclaimer required: Trading involves substantial risk of loss. Past performance not indicative of future results.'
FROM niches WHERE slug = 'make-money-online';

-- Relationships & Dating Niche
INSERT INTO offers (niche_id, title, description, commission_rate, affiliate_network, example_link, compliance_notes)
SELECT 
  id,
  'Text Chemistry Program',
  'Proven texting strategies to attract and keep your ideal partner. Digital course with bonus materials.',
  45.00,
  'ClickBank',
  'https://example.com/text-chemistry',
  'Results disclaimer: Individual experiences may vary.'
FROM niches WHERE slug = 'relationships-dating'
UNION ALL
SELECT 
  id,
  'His Secret Obsession',
  'Relationship psychology course revealing what men really want. Best-selling program with high conversion.',
  55.00,
  'ClickBank',
  'https://example.com/secret-obsession',
  'Standard relationship advice disclaimer required.'
FROM niches WHERE slug = 'relationships-dating';

-- Personal Development Niche
INSERT INTO offers (niche_id, title, description, commission_rate, affiliate_network, example_link, compliance_notes)
SELECT 
  id,
  'Manifestation Magic Audio Program',
  'Binaural beats and guided meditation for manifestation. Instant digital download with 60-day guarantee.',
  38.00,
  'ClickBank',
  'https://example.com/manifestation',
  'Results disclaimer: Individual experiences vary. Not a substitute for medical advice.'
FROM niches WHERE slug = 'personal-development'
UNION ALL
SELECT 
  id,
  'Productivity Planner System',
  'Physical planner with proven productivity methods. Includes digital companion app and video training.',
  30.00,
  'ShareASale',
  'https://example.com/productivity-planner',
  'Standard affiliate disclosure required.'
FROM niches WHERE slug = 'personal-development';

-- Technology & Software Niche
INSERT INTO offers (niche_id, title, description, commission_rate, affiliate_network, example_link, compliance_notes)
SELECT 
  id,
  'Website Builder Pro',
  'Drag-and-drop website builder with hosting included. Monthly subscription with 30-day free trial.',
  50.00,
  'CJ Affiliate',
  'https://example.com/website-builder',
  'Standard software affiliate terms apply.'
FROM niches WHERE slug = 'technology-software'
UNION ALL
SELECT 
  id,
  'VPN Security Suite',
  'Premium VPN service with military-grade encryption. Annual subscription with money-back guarantee.',
  60.00,
  'Impact',
  'https://example.com/vpn-service',
  'Privacy policy disclosure required.'
FROM niches WHERE slug = 'technology-software';

-- Home & Garden Niche
INSERT INTO offers (niche_id, title, description, commission_rate, affiliate_network, example_link, compliance_notes)
SELECT 
  id,
  'Smart Garden System',
  'Automated indoor garden with LED grow lights. Grow herbs and vegetables year-round with zero effort.',
  35.00,
  'Amazon Associates',
  'https://example.com/smart-garden',
  'Amazon affiliate disclosure required.'
FROM niches WHERE slug = 'home-garden'
UNION ALL
SELECT 
  id,
  'DIY Woodworking Plans',
  'Comprehensive woodworking plans library with video tutorials. Lifetime access to 16,000+ projects.',
  42.00,
  'ClickBank',
  'https://example.com/woodworking-plans',
  'Standard disclaimer: Skill level and results may vary.'
FROM niches WHERE slug = 'home-garden';

-- Pet Care Niche
INSERT INTO offers (niche_id, title, description, commission_rate, affiliate_network, example_link, compliance_notes)
SELECT 
  id,
  'Dog Training Mastery Course',
  'Professional dog training system for all breeds and ages. Includes behavior correction and obedience training.',
  47.00,
  'ClickBank',
  'https://example.com/dog-training',
  'Results vary by dog and owner consistency. Not veterinary advice.'
FROM niches WHERE slug = 'pet-care'
UNION ALL
SELECT 
  id,
  'Premium Pet Subscription Box',
  'Monthly curated box of toys, treats, and accessories. Recurring commission on all subscriptions.',
  20.00,
  'ShareASale',
  'https://example.com/pet-box',
  'Standard subscription terms and affiliate disclosure.'
FROM niches WHERE slug = 'pet-care';
