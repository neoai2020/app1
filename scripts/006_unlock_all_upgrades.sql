-- Update all existing users to have full access to all upgrades
UPDATE public.users
SET upgrade_level = 'automated_income'
WHERE upgrade_level IN ('free', 'dfy_vault', 'instant_income');

-- Update the trigger to give new users full access by default
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, upgrade_level, pages_generated)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NULL),
    'automated_income', -- Changed from 'free' to 'automated_income' to give all users full access
    0
  )
  ON CONFLICT (id) DO NOTHING;
  
  RETURN NEW;
END;
$$;
