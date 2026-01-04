# Red White and Who Data Import Instructions

## Overview
The Excel file `staging/American_History_Icons_With_Images.xlsx` has been parsed and converted to SQL.

## Generated Files
- `staging/insert_red_white_who_with_images.sql` - Complete SQL file with all 49 individuals
- `staging/parse_red_white_who_with_images.js` - Parser script (already executed)

## What's Included
Each individual record contains:
- **Name** - Full name of the individual
- **Years Lived** - Birth and death years (parsed from "1732-1799" format)
- **Key Event** - What they are known for
- **Key Facts** - Additional facts (stored as JSONB)
- **Biographical Summary** - Full biographical text (500-1000 words)
- **Main Image** - URL to the main photo
- **Photo Gallery** - Up to 10 gallery images (stored as JSONB array)
- **10 Questions** - With correct answers (wrong answers are placeholders)

## Database Changes Made
1. ✅ Added unique constraint on `name` column in `red_white_who_individuals` table
2. ✅ SQL file uses `ON CONFLICT (name) DO UPDATE` to update existing records

## Import Steps

### Option 1: Execute in Supabase SQL Editor (Recommended)
1. Open Supabase Dashboard
2. Navigate to SQL Editor
3. Open the file: `staging/insert_red_white_who_with_images.sql`
4. Copy the entire contents
5. Paste into SQL Editor
6. Click "Run" to execute

The file will:
- Insert or update 49 individuals with images
- Insert 490 questions (10 per individual)
- Update existing records if names match

### Option 2: Execute in Batches
If the file is too large, you can split it by individual blocks (each starts with `-- Individual:`).

## Important Notes

### Wrong Answers
The SQL file contains placeholder wrong answers: `[WRONG ANSWER 1 NEEDED]`, etc.

**You will need to:**
1. Review each question
2. Generate 3 plausible wrong answers for each question
3. Update the SQL file or database directly

### Image URLs
All images are stored as URLs (text-based references). Make sure:
- URLs are accessible
- Images load correctly in the app
- Gallery images are properly formatted as JSONB

## Verification

After importing, verify the data:

```sql
-- Check total individuals
SELECT COUNT(*) FROM red_white_who_individuals;

-- Check individuals with images
SELECT name, main_photo_url, 
       jsonb_array_length(photo_gallery) as gallery_count
FROM red_white_who_individuals
WHERE main_photo_url IS NOT NULL;

-- Check questions per individual
SELECT i.name, COUNT(q.question_id) as question_count
FROM red_white_who_individuals i
LEFT JOIN red_white_who_questions q ON i.individual_id = q.individual_id
GROUP BY i.name
ORDER BY i.name;
```

## Next Steps
1. Execute the SQL file in Supabase
2. Review and fill in wrong answers for questions
3. Test the Red White and Who app to ensure images and questions display correctly

