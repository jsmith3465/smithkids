-- Transform key_facts from JSON to HTML bulleted list
-- This script converts the JSONB key_facts field from:
-- {"notes":"Item 1; Item 2; Item 3"}
-- To:
-- <ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>
-- 
-- The column type will be changed from JSONB to TEXT to store HTML directly

-- Step 1: Create a temporary column to store the HTML
ALTER TABLE red_white_who_individuals 
ADD COLUMN IF NOT EXISTS key_facts_html TEXT;

-- Step 2: Create a function to convert JSON notes to HTML list
CREATE OR REPLACE FUNCTION convert_notes_to_html(notes_json JSONB)
RETURNS TEXT AS $$
DECLARE
    notes_text TEXT;
    items TEXT[];
    html_result TEXT;
    item TEXT;
BEGIN
    -- Extract the notes text from JSON
    notes_text := notes_json->>'notes';
    
    -- Return NULL if no notes
    IF notes_text IS NULL OR notes_text = '' THEN
        RETURN NULL;
    END IF;
    
    -- Split by semicolon
    items := string_to_array(notes_text, ';');
    
    -- Build HTML list
    html_result := '<ul>';
    FOREACH item IN ARRAY items
    LOOP
        -- Trim whitespace and add as list item (only if item is not empty after trimming)
        IF trim(both ' ' from item) != '' THEN
            html_result := html_result || '<li>' || trim(both ' ' from item) || '</li>';
        END IF;
    END LOOP;
    html_result := html_result || '</ul>';
    
    RETURN html_result;
END;
$$ LANGUAGE plpgsql;

-- Step 3: Populate the temporary column with converted HTML
UPDATE red_white_who_individuals
SET key_facts_html = convert_notes_to_html(key_facts)
WHERE key_facts IS NOT NULL 
  AND key_facts->>'notes' IS NOT NULL
  AND key_facts->>'notes' != '';

-- Step 4: Drop the old JSONB column
ALTER TABLE red_white_who_individuals 
DROP COLUMN IF EXISTS key_facts;

-- Step 5: Rename the new column to key_facts
ALTER TABLE red_white_who_individuals 
RENAME COLUMN key_facts_html TO key_facts;

-- Step 6: Drop the temporary function
DROP FUNCTION IF EXISTS convert_notes_to_html(JSONB);

-- Step 7: Verify the transformation by checking a few records
SELECT 
    individual_id,
    name,
    key_facts
FROM red_white_who_individuals
WHERE key_facts IS NOT NULL
LIMIT 5;

