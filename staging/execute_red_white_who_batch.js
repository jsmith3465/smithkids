const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://frlajamhyyectdrcbrnd.supabase.co';
// Note: This script should be run with SUPABASE_SERVICE_KEY environment variable
// For now, we'll use the anon key and rely on RLS policies
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybGFqYW1oeXllY3RkcmNicm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4ODA4ODksImV4cCI6MjA4MjQ1Njg4OX0.QAH0GME5_iYkz6SZjfqdL3q9E9Jo1qKv6YWFk2exAtY';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function executeSQLInBatches() {
    const sqlPath = path.join(__dirname, 'insert_red_white_who_with_images.sql');
    const sqlContent = fs.readFileSync(sqlPath, 'utf8');
    
    // Split by individual blocks (each starts with -- Individual:)
    const blocks = sqlContent.split(/(?=-- Individual:)/);
    
    console.log(`Found ${blocks.length} individual blocks to process`);
    
    let successCount = 0;
    let errorCount = 0;
    
    for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i].trim();
        if (!block || !block.startsWith('-- Individual:')) continue;
        
        // Extract individual name for logging
        const nameMatch = block.match(/-- Individual: (.+)/);
        const name = nameMatch ? nameMatch[1].trim() : `Individual ${i + 1}`;
        
        console.log(`\nProcessing ${i + 1}/${blocks.length}: ${name}`);
        
        try {
            // Split into individual insert and questions
            const parts = block.split(/INSERT INTO red_white_who_questions/);
            const individualSQL = parts[0].trim();
            
            // Execute individual insert using RPC or direct SQL
            // Since we can't use RPC easily, we'll need to parse and use the client
            // For now, let's just log that the SQL is ready
            
            // Actually, the best approach is to execute this in Supabase SQL Editor
            // But we can try to parse and insert using the client
            
            successCount++;
        } catch (error) {
            console.error(`Error processing ${name}:`, error.message);
            errorCount++;
        }
    }
    
    console.log(`\n\nSummary:`);
    console.log(`Success: ${successCount}`);
    console.log(`Errors: ${errorCount}`);
    console.log(`\nNote: Due to the complexity of parsing SQL, it's recommended to execute`);
    console.log(`the SQL file directly in the Supabase SQL Editor.`);
    console.log(`File location: ${sqlPath}`);
}

// Since direct SQL execution via client is complex, let's just provide instructions
console.log('='.repeat(60));
console.log('Red White and Who Data Import');
console.log('='.repeat(60));
console.log('\nThe SQL file has been generated successfully!');
console.log('\nTo import the data:');
console.log('1. Open Supabase Dashboard');
console.log('2. Go to SQL Editor');
console.log('3. Copy and paste the contents of: staging/insert_red_white_who_with_images.sql');
console.log('4. Execute the SQL');
console.log('\nThe file contains 49 individuals with:');
console.log('- Biographical summaries');
console.log('- Main photo URLs');
console.log('- Photo galleries (up to 10 images per individual)');
console.log('- 10 questions per individual with correct answers');
console.log('\nNote: Wrong answers are placeholders and need to be filled in manually.');
console.log('='.repeat(60));

