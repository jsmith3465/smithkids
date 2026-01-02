// Migration script to move Bible trivia questions from JS file to database
// Run this script in the browser console on the Bible Trivia page after the table is created
// Or import it as a module and run migrateQuestions()

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://frlajamhyyectdrcbrnd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybGFqYW1oeXllY3RkcmNicm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4ODA4ODksImV4cCI6MjA4MjQ1Njg4OX0.QAH0GME5_iYkz6SZjfqdL3q9E9Jo1qKv6YWFk2exAtY';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// This function should be called with the triviaQuestions array from bible-trivia.js
export async function migrateQuestions(triviaQuestions) {
    console.log(`Starting migration of ${triviaQuestions.length} questions...`);
    
    const questionsToInsert = triviaQuestions.map((q, index) => ({
        question: q.question,
        option_1: q.options[0],
        option_2: q.options[1],
        option_3: q.options[2],
        option_4: q.options[3],
        correct_answer_index: q.correct,
        difficulty: q.difficulty,
        bible_book: q.bibleRef?.book || null,
        bible_chapter: q.bibleRef?.chapter || null,
        bible_verse: q.bibleRef?.verse || null,
        created_at: new Date().toISOString()
    }));
    
    // Insert in batches of 50 to avoid timeout
    const batchSize = 50;
    let inserted = 0;
    let errors = 0;
    
    for (let i = 0; i < questionsToInsert.length; i += batchSize) {
        const batch = questionsToInsert.slice(i, i + batchSize);
        
        try {
            const { data, error } = await supabase
                .from('bible_trivia_questions')
                .insert(batch);
            
            if (error) {
                console.error(`Error inserting batch ${Math.floor(i / batchSize) + 1}:`, error);
                errors += batch.length;
            } else {
                inserted += batch.length;
                console.log(`Inserted batch ${Math.floor(i / batchSize) + 1}: ${inserted}/${questionsToInsert.length} questions`);
            }
        } catch (err) {
            console.error(`Exception inserting batch ${Math.floor(i / batchSize) + 1}:`, err);
            errors += batch.length;
        }
    }
    
    console.log(`Migration complete! Inserted: ${inserted}, Errors: ${errors}`);
    return { inserted, errors, total: questionsToInsert.length };
}

// For use in browser console:
// 1. Open Bible Trivia page
// 2. Open browser console
// 3. Import this script and the triviaQuestions array
// 4. Call: await migrateQuestions(triviaQuestions)

