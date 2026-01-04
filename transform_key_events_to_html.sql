-- Transform key_events from TEXT[] array to HTML bulleted list
-- This script converts the TEXT[] key_events field from:
-- ARRAY['Event 1', 'Event 2', 'Event 3']
-- To:
-- <ul><li>Event 1</li><li>Event 2</li><li>Event 3</li></ul>
-- 
-- The column type will be changed from TEXT[] to TEXT to store HTML directly

-- Step 1: Create a temporary column to store the HTML
ALTER TABLE red_white_who_individuals 
ADD COLUMN IF NOT EXISTS key_events_html TEXT;

-- Step 2: Create a function to convert TEXT[] array to HTML list
CREATE OR REPLACE FUNCTION convert_events_to_html(events_array TEXT[])
RETURNS TEXT AS $$
DECLARE
    html_result TEXT;
    event_item TEXT;
BEGIN
    -- Return NULL if no events
    IF events_array IS NULL OR array_length(events_array, 1) IS NULL THEN
        RETURN NULL;
    END IF;
    
    -- Build HTML list
    html_result := '<ul>';
    FOREACH event_item IN ARRAY events_array
    LOOP
        -- Trim whitespace and add as list item (only if item is not empty after trimming)
        IF trim(both ' ' from event_item) != '' THEN
            html_result := html_result || '<li>' || trim(both ' ' from event_item) || '</li>';
        END IF;
    END LOOP;
    html_result := html_result || '</ul>';
    
    RETURN html_result;
END;
$$ LANGUAGE plpgsql;

-- Step 3: Populate the temporary column with converted HTML
UPDATE red_white_who_individuals
SET key_events_html = convert_events_to_html(key_events)
WHERE key_events IS NOT NULL 
  AND array_length(key_events, 1) > 0;

-- Step 4: Drop the old TEXT[] column
ALTER TABLE red_white_who_individuals 
DROP COLUMN IF EXISTS key_events;

-- Step 5: Rename the new column to key_events
ALTER TABLE red_white_who_individuals 
RENAME COLUMN key_events_html TO key_events;

-- Step 6: Drop the temporary function
DROP FUNCTION IF EXISTS convert_events_to_html(TEXT[]);

-- Step 7: Verify the transformation by checking a few records
SELECT 
    individual_id,
    name,
    key_events
FROM red_white_who_individuals
WHERE key_events IS NOT NULL
LIMIT 5;

