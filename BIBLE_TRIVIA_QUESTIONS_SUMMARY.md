# Bible Trivia Questions Summary

## Current Status

### Questions in JavaScript File (`bible-trivia.js`)
- **Easy**: 100 questions
- **Moderate**: 100 questions  
- **Hard**: 100 questions
- **Total**: 300 questions

### Target Goals
- **Easy**: 300 questions (need to add 200 more)
- **Moderate**: 150 questions (need to add 50 more)
- **Hard**: 100 questions (already have 100, no change needed)

## Files Created

### 1. `create_bible_trivia_questions_table.sql`
- Creates the `bible_trivia_questions` table in Supabase
- Sets up indexes and Row Level Security policies
- **Action Required**: Run this in Supabase SQL Editor first

### 2. `add_bible_trivia_questions.sql`
- Contains approximately **200+ additional easy questions**
- Contains **50 additional moderate questions**
- **Action Required**: Run this after migrating the initial 300 questions from the JS file

### 3. `migrate_bible_trivia_questions.js`
- Helper function for migrating questions programmatically
- Can be used in browser console or as a module

### 4. `migrate_questions_helper.html`
- User-friendly web page for migrating questions
- Paste the `triviaQuestions` array and click to migrate
- Includes database status checker

### 5. Updated `bible-trivia.js`
- Now loads questions from database instead of hardcoded array
- Falls back to hardcoded questions if database unavailable
- Automatically reloads questions on game reset

## Migration Steps

### Step 1: Create the Database Table
1. Go to Supabase SQL Editor
2. Copy and paste contents of `create_bible_trivia_questions_table.sql`
3. Click "Run"

### Step 2: Migrate Initial 300 Questions
1. Open `migrate_questions_helper.html` in your browser
2. Open `bible-trivia.js` and copy the entire `triviaQuestions` array (lines 41 to approximately line 2790)
3. Paste into the helper page
4. Click "Migrate Questions"
5. Verify using "Check Database" button

### Step 3: Add Additional Questions
1. Go to Supabase SQL Editor
2. Copy and paste contents of `add_bible_trivia_questions.sql`
3. Click "Run"
4. This will add approximately 200+ easy and 50 moderate questions

### Step 4: Verify Totals
After running both migrations, you should have:
- **Easy**: ~300 questions (100 from JS + 200+ from SQL)
- **Moderate**: ~150 questions (100 from JS + 50 from SQL)
- **Hard**: 100 questions (from JS)

## Adding More Questions

If you need to add more questions to reach exact totals, you can:

1. **Via Supabase Table Editor**:
   - Go to Table Editor > `bible_trivia_questions`
   - Click "Insert" > "Insert row"
   - Fill in all fields
   - Set `difficulty` to 'easy', 'moderate', or 'hard'
   - `created_at` will be set automatically

2. **Via SQL**:
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
       'Your question here?',
       'Option 1',
       'Option 2',
       'Option 3',
       'Option 4',
       0,  -- 0-3 for correct answer index
       'easy',  -- or 'moderate' or 'hard'
       'Book Name',  -- or NULL
       ChapterNumber,  -- or NULL
       VerseNumber  -- or NULL
   );
   ```

## Question Format

Each question needs:
- `question`: The question text
- `option_1`, `option_2`, `option_3`, `option_4`: Four answer choices
- `correct_answer_index`: 0, 1, 2, or 3 (which option is correct)
- `difficulty`: 'easy', 'moderate', or 'hard'
- `bible_book`, `bible_chapter`, `bible_verse`: Bible reference (can be NULL)
- `created_at`: Automatically set to current timestamp

## Notes

- The app will automatically use database questions when available
- Hardcoded questions remain as a fallback if database is unavailable
- Questions are shuffled by difficulty when loaded
- The app selects 10 random questions (mix of difficulties) for each game
- All questions are loaded from the database on page load and game reset

## Troubleshooting

If questions don't load:
1. Check browser console for errors
2. Verify the table exists: `SELECT COUNT(*) FROM bible_trivia_questions;`
3. Check RLS policies allow reading
4. Verify you're authenticated
5. Check that questions were actually inserted

If you need to check question counts by difficulty:
```sql
SELECT difficulty, COUNT(*) 
FROM bible_trivia_questions 
GROUP BY difficulty;
```

