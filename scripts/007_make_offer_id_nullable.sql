-- Migration: Make offer_id nullable in pages table
-- This allows users to create pages without selecting a specific offer
-- since they now bring their own affiliate links from DigiStore24

ALTER TABLE public.pages 
ALTER COLUMN offer_id DROP NOT NULL;

-- Add a comment to document this change
COMMENT ON COLUMN public.pages.offer_id IS 'Optional reference to offers table. Can be NULL when users provide their own affiliate links.';
