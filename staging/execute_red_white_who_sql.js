const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://frlajamhyyectdrcbrnd.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybGFqYW1oeXllY3RkcmNicm5kIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Njg4MDg4OSwiZXhwIjoyMDgyNDU2ODg5fQ.YourServiceKeyHere';

// Use anon key for now - we'll need service key for inserts if RLS is strict
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function executeSQLFile() {
    const sqlPath = path.join(__dirname, 'insert_red_white_who_with_images.sql');
    const sqlContent = fs.readFileSync(sqlPath, 'utf8');
    
    // Split by individual (each starts with -- Individual:)
    const individuals = sqlContent.split(/-- Individual:/);
    
    console.log(`Found ${individuals.length - 1} individuals to process`);
    
    for (let i = 1; i < individuals.length; i++) {
        const individualSQL = '-- Individual:' + individuals[i];
        
        // Split into individual insert and questions
        const parts = individualSQL.split(/INSERT INTO red_white_who_questions/);
        const individualInsert = parts[0].trim();
        const questions = parts.slice(1);
        
        try {
            // Execute individual insert
            console.log(`Processing individual ${i}/${individuals.length - 1}...`);
            const { error: individualError } = await supabase.rpc('exec_sql', { 
                sql: individualInsert 
            });
            
            if (individualError) {
                // Try direct execution
                const { error: directError } = await supabase
                    .from('red_white_who_individuals')
                    .insert(/* parse and insert */);
                
                if (directError) {
                    console.error(`Error inserting individual ${i}:`, directError.message);
                    // Continue with next individual
                    continue;
                }
            }
            
            // Execute questions
            for (const questionSQL of questions) {
                const fullQuestionSQL = 'INSERT INTO red_white_who_questions' + questionSQL.trim();
                const { error: questionError } = await supabase.rpc('exec_sql', { 
                    sql: fullQuestionSQL 
                });
                
                if (questionError) {
                    console.error(`Error inserting question:`, questionError.message);
                }
            }
            
        } catch (error) {
            console.error(`Error processing individual ${i}:`, error.message);
        }
    }
    
    console.log('Done processing all individuals');
}

// Actually, let's use a simpler approach - execute the SQL directly via Supabase
// But we need to use the SQL editor or create a function
// For now, let's just output instructions

console.log('SQL file is ready at: staging/insert_red_white_who_with_images.sql');
console.log('Please execute this file in the Supabase SQL Editor.');
console.log('The file contains 49 individuals with images and questions.');

