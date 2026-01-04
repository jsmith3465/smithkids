-- Migration: Convert photo_gallery JSONB to 10 separate TEXT fields
-- Run this migration to update existing table structure

-- Add the new photo_gallery columns
ALTER TABLE red_white_who_individuals
ADD COLUMN IF NOT EXISTS photo_gallery_1 TEXT,
ADD COLUMN IF NOT EXISTS photo_gallery_2 TEXT,
ADD COLUMN IF NOT EXISTS photo_gallery_3 TEXT,
ADD COLUMN IF NOT EXISTS photo_gallery_4 TEXT,
ADD COLUMN IF NOT EXISTS photo_gallery_5 TEXT,
ADD COLUMN IF NOT EXISTS photo_gallery_6 TEXT,
ADD COLUMN IF NOT EXISTS photo_gallery_7 TEXT,
ADD COLUMN IF NOT EXISTS photo_gallery_8 TEXT,
ADD COLUMN IF NOT EXISTS photo_gallery_9 TEXT,
ADD COLUMN IF NOT EXISTS photo_gallery_10 TEXT;

-- Migrate existing data from photo_gallery JSONB to individual fields
-- This extracts URLs from the JSONB array and populates the new fields
UPDATE red_white_who_individuals
SET 
    photo_gallery_1 = CASE 
        WHEN photo_gallery IS NOT NULL AND jsonb_array_length(photo_gallery) > 0 
        THEN photo_gallery->0->>'url' 
        ELSE NULL 
    END,
    photo_gallery_2 = CASE 
        WHEN photo_gallery IS NOT NULL AND jsonb_array_length(photo_gallery) > 1 
        THEN photo_gallery->1->>'url' 
        ELSE NULL 
    END,
    photo_gallery_3 = CASE 
        WHEN photo_gallery IS NOT NULL AND jsonb_array_length(photo_gallery) > 2 
        THEN photo_gallery->2->>'url' 
        ELSE NULL 
    END,
    photo_gallery_4 = CASE 
        WHEN photo_gallery IS NOT NULL AND jsonb_array_length(photo_gallery) > 3 
        THEN photo_gallery->3->>'url' 
        ELSE NULL 
    END,
    photo_gallery_5 = CASE 
        WHEN photo_gallery IS NOT NULL AND jsonb_array_length(photo_gallery) > 4 
        THEN photo_gallery->4->>'url' 
        ELSE NULL 
    END,
    photo_gallery_6 = CASE 
        WHEN photo_gallery IS NOT NULL AND jsonb_array_length(photo_gallery) > 5 
        THEN photo_gallery->5->>'url' 
        ELSE NULL 
    END,
    photo_gallery_7 = CASE 
        WHEN photo_gallery IS NOT NULL AND jsonb_array_length(photo_gallery) > 6 
        THEN photo_gallery->6->>'url' 
        ELSE NULL 
    END,
    photo_gallery_8 = CASE 
        WHEN photo_gallery IS NOT NULL AND jsonb_array_length(photo_gallery) > 7 
        THEN photo_gallery->7->>'url' 
        ELSE NULL 
    END,
    photo_gallery_9 = CASE 
        WHEN photo_gallery IS NOT NULL AND jsonb_array_length(photo_gallery) > 8 
        THEN photo_gallery->8->>'url' 
        ELSE NULL 
    END,
    photo_gallery_10 = CASE 
        WHEN photo_gallery IS NOT NULL AND jsonb_array_length(photo_gallery) > 9 
        THEN photo_gallery->9->>'url' 
        ELSE NULL 
    END;

-- Drop the old photo_gallery column
ALTER TABLE red_white_who_individuals
DROP COLUMN IF EXISTS photo_gallery;

-- Add comments to the new columns
COMMENT ON COLUMN red_white_who_individuals.photo_gallery_1 IS 'Gallery image 1 URL';
COMMENT ON COLUMN red_white_who_individuals.photo_gallery_2 IS 'Gallery image 2 URL';
COMMENT ON COLUMN red_white_who_individuals.photo_gallery_3 IS 'Gallery image 3 URL';
COMMENT ON COLUMN red_white_who_individuals.photo_gallery_4 IS 'Gallery image 4 URL';
COMMENT ON COLUMN red_white_who_individuals.photo_gallery_5 IS 'Gallery image 5 URL';
COMMENT ON COLUMN red_white_who_individuals.photo_gallery_6 IS 'Gallery image 6 URL';
COMMENT ON COLUMN red_white_who_individuals.photo_gallery_7 IS 'Gallery image 7 URL';
COMMENT ON COLUMN red_white_who_individuals.photo_gallery_8 IS 'Gallery image 8 URL';
COMMENT ON COLUMN red_white_who_individuals.photo_gallery_9 IS 'Gallery image 9 URL';
COMMENT ON COLUMN red_white_who_individuals.photo_gallery_10 IS 'Gallery image 10 URL';

