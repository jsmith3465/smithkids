# Bible Trivia Questions Migration Guide

This guide explains how to migrate Bible trivia questions from the JavaScript file to the Supabase database.

## Step 1: Create the Database Table

Run the SQL file `create_bible_trivia_questions_table.sql` in your Supabase SQL editor:

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `create_bible_trivia_questions_table.sql`
4. Click "Run" to execute the SQL

This will create the `bible_trivia_questions` table with the following structure:
- `question_id` (Primary Key)
- `question` (Text)
- `option_1`, `option_2`, `option_3`, `option_4` (Answer options)
- `correct_answer_index` (0-3, indicating which option is correct)
- `difficulty` ('easy', 'moderate', or 'hard')
- `bible_book`, `bible_chapter`, `bible_verse` (Bible reference)
- `created_at`, `updated_at` (Timestamps)

## Step 2: Migrate Questions from JavaScript to Database

### Option A: Using Browser Console (Recommended)

1. Open the Bible Trivia page in your browser
2. Open the browser's Developer Console (F12 or right-click > Inspect > Console)
3. Copy and paste the following code into the console:

```javascript
// First, we need to access the triviaQuestions array
// Since it's in a module, we'll need to extract it differently
// Run this in the console after the page loads:

(async function() {
    const SUPABASE_URL = 'https://frlajamhyyectdrcbrnd.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybGFqYW1oeXllY3RkcmNicm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4ODA4ODksImV4cCI6MjA4MjQ1Njg4OX0.QAH0GME5_iYkz6SZjfqdL3q9E9Jo1qKv6YWFk2exAtY';
    
    const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    
    // You'll need to manually copy the triviaQuestions array from bible-trivia.js
    // For now, this is a template - you'll need to paste the actual array here
    // Or use the migration script approach below
    
    console.log('Migration script ready. You need to provide the triviaQuestions array.');
})();
```

### Option B: Using the Migration Script

1. Open `migrate_bible_trivia_questions.js` 
2. In the browser console on the Bible Trivia page, you can import and use it:

```javascript
// Import the migration function
import { migrateQuestions } from './migrate_bible_trivia_questions.js';

// You'll need to get the triviaQuestions array
// This requires accessing the module's exported data
// The easiest way is to temporarily export it from bible-trivia.js
```

### Option C: Manual SQL Insert (For Small Batches)

If you prefer, you can manually insert questions using SQL. Here's the format:

```sql
INSERT INTO bible_trivia_questions (
    question, 
    option_1, 
    option_2, 
    option_3, 
    option_4, 
    correct_answer_index, 
    difficulty, 
    bible_book, 
    bible_chapter, 
    bible_verse
) VALUES (
    'How many days did it take God to create the world?',
    '3 days',
    '6 days',
    '7 days',
    '10 days',
    1,  -- Index of correct answer (0-based: 0=first, 1=second, etc.)
    'easy',
    'Genesis',
    1,
    31
);
```

## Step 3: Verify Migration

After migrating questions, verify they were inserted:

1. Go to Supabase Table Editor
2. Open the `bible_trivia_questions` table
3. Check that questions are present
4. Verify the difficulty levels are correct
5. Test the Bible Trivia app to ensure questions load from the database

## Step 4: Update the Application

The JavaScript file (`bible-trivia.js`) has already been updated to:
- Load questions from the database instead of the hardcoded array
- Fall back to hardcoded questions if the database is unavailable
- Support adding new questions through the database

## Adding New Questions

After migration, you can add new questions directly to the database:

1. Go to Supabase Table Editor
2. Open `bible_trivia_questions` table
3. Click "Insert" > "Insert row"
4. Fill in the question details
5. Set `difficulty` to 'easy', 'moderate', or 'hard'
6. Set `created_at` will be automatically set

## Notes

- The hardcoded questions in `bible-trivia.js` will remain as a fallback
- Questions are automatically shuffled by difficulty when loaded
- The app selects 10 random questions (mix of difficulties) for each game
- All questions are loaded from the database on page load and game reset

## Troubleshooting

If questions don't load:
1. Check browser console for errors
2. Verify the table exists in Supabase
3. Check RLS (Row Level Security) policies allow reading
4. Verify you're authenticated (questions require authentication to read)
5. Check that questions were actually inserted into the database

