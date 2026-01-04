const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Determine the correct paths
const scriptDir = __dirname;
const projectRoot = process.cwd();
const stagingDir = path.join(projectRoot, 'staging');

// Read the Excel file - try multiple possible locations
let excelPath = path.join(scriptDir, 'American_History_Icons_Complete.xlsx');
if (!fs.existsSync(excelPath)) {
    excelPath = path.join(stagingDir, 'American_History_Icons_Complete.xlsx');
}
if (!fs.existsSync(excelPath)) {
    console.error('Could not find Excel file. Tried:', excelPath);
    process.exit(1);
}

console.log('Reading Excel file from:', excelPath);
const workbook = XLSX.readFile(excelPath);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet);

console.log(`Found ${data.length} rows in the Excel file`);
console.log('Column names:', Object.keys(data[0] || {}));

// SQL output
let sqlOutput = `-- Red White and Who Complete Data Import
-- Generated from American_History_Icons_Complete.xlsx
-- This file includes images and all 4 answers (1 correct + 3 wrong) for each question
--
-- To use this file:
-- 1. Run create_red_white_who_tables.sql first to create the tables
-- 2. Run transform_key_facts_to_html.sql and transform_key_events_to_html.sql if needed
-- 3. Run this file in Supabase SQL Editor
--

`;

// Process each row
data.forEach((row, index) => {
    const name = row['Name'] || row['name'] || '';
    if (!name) {
        console.warn(`Row ${index + 1}: Skipping row with no name`);
        return;
    }

    // Parse years
    const yearsLived = row['Years Lived'] || row['Years lived'] || row['years_lived'] || '';
    let birthYear = null;
    let deathYear = null;
    if (yearsLived) {
        const match = yearsLived.match(/(\d{4})\s*-\s*(\d{4})/);
        if (match) {
            birthYear = parseInt(match[1]);
            deathYear = parseInt(match[2]);
        }
    }

    // Key events (will be converted to HTML later, but store as array for now)
    const keyEvent = row['Key Event'] || row['Key event'] || row['key_event'] || '';
    const keyEvents = keyEvent ? [keyEvent] : [];

    // Key facts (will be converted to HTML later)
    const keyFacts = row['Key Facts'] || row['Key facts'] || row['key_facts'] || '';
    const keyFactsJson = keyFacts ? `{"notes":"${keyFacts.replace(/"/g, '\\"')}"}` : null;

    // Biographical summary
    const biographicalSummary = (row['Biographical Summary'] || row['Biographical summary'] || row['biographical_summary'] || '').replace(/'/g, "''");

    // Main photo
    const mainPhoto = row['Main Photo'] || row['Main photo'] || row['main_photo'] || row['Main Image'] || row['Main image'] || row['main_image'] || '';

    // Photo gallery (Image 1 through Image 10)
    const photoGallery = [];
    for (let i = 1; i <= 10; i++) {
        const imageKey = `Image ${i}`;
        const imageUrl = row[imageKey] || '';
        if (imageUrl && imageUrl.trim() && imageUrl.trim() !== 'NULL' && imageUrl.trim() !== 'null') {
            photoGallery.push(imageUrl.trim());
        }
    }

    // Build photo gallery fields (pad with nulls if less than 10)
    const photoFields = [];
    for (let i = 0; i < 10; i++) {
        photoFields.push(photoGallery[i] ? `'${photoGallery[i].replace(/'/g, "''")}'` : 'NULL');
    }

    // Build SQL for individual
    sqlOutput += `-- Individual: ${name}\n`;
    sqlOutput += `INSERT INTO red_white_who_individuals (name, birth_year, death_year, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery_1, photo_gallery_2, photo_gallery_3, photo_gallery_4, photo_gallery_5, photo_gallery_6, photo_gallery_7, photo_gallery_8, photo_gallery_9, photo_gallery_10)\n`;
    sqlOutput += `VALUES (\n`;
    sqlOutput += `  '${name.replace(/'/g, "''")}',\n`;
    sqlOutput += `  ${birthYear || 'NULL'},\n`;
    sqlOutput += `  ${deathYear || 'NULL'},\n`;
    
    // Key events as array (will be converted to HTML by transform script)
    if (keyEvents.length > 0) {
        sqlOutput += `  ARRAY[${keyEvents.map(e => `'${e.replace(/'/g, "''")}'`).join(', ')}],\n`;
    } else {
        sqlOutput += `  NULL,\n`;
    }
    
    // Key facts as JSON (will be converted to HTML by transform script)
    if (keyFactsJson) {
        sqlOutput += `  '${keyFactsJson}',\n`;
    } else {
        sqlOutput += `  NULL,\n`;
    }
    
    sqlOutput += `  '${biographicalSummary}',\n`;
    sqlOutput += `  ${mainPhoto ? `'${mainPhoto.replace(/'/g, "''")}'` : 'NULL'},\n`;
    sqlOutput += `  ${photoFields.join(',\n  ')}\n`;
    sqlOutput += `)\n`;
    sqlOutput += `ON CONFLICT (name) DO UPDATE SET\n`;
    sqlOutput += `  birth_year = EXCLUDED.birth_year,\n`;
    sqlOutput += `  death_year = EXCLUDED.death_year,\n`;
    sqlOutput += `  key_events = EXCLUDED.key_events,\n`;
    sqlOutput += `  key_facts = EXCLUDED.key_facts,\n`;
    sqlOutput += `  biographical_summary = EXCLUDED.biographical_summary,\n`;
    sqlOutput += `  main_photo_url = EXCLUDED.main_photo_url,\n`;
    sqlOutput += `  photo_gallery_1 = EXCLUDED.photo_gallery_1,\n`;
    sqlOutput += `  photo_gallery_2 = EXCLUDED.photo_gallery_2,\n`;
    sqlOutput += `  photo_gallery_3 = EXCLUDED.photo_gallery_3,\n`;
    sqlOutput += `  photo_gallery_4 = EXCLUDED.photo_gallery_4,\n`;
    sqlOutput += `  photo_gallery_5 = EXCLUDED.photo_gallery_5,\n`;
    sqlOutput += `  photo_gallery_6 = EXCLUDED.photo_gallery_6,\n`;
    sqlOutput += `  photo_gallery_7 = EXCLUDED.photo_gallery_7,\n`;
    sqlOutput += `  photo_gallery_8 = EXCLUDED.photo_gallery_8,\n`;
    sqlOutput += `  photo_gallery_9 = EXCLUDED.photo_gallery_9,\n`;
    sqlOutput += `  photo_gallery_10 = EXCLUDED.photo_gallery_10,\n`;
    sqlOutput += `  updated_at = NOW();\n\n`;

    // Process questions (Q1 through Q10)
    for (let q = 1; q <= 10; q++) {
        const questionKey = `Q${q}` || `Question ${q}` || `question_${q}`;
        const questionText = row[questionKey] || '';
        
        if (!questionText || questionText.trim() === '') {
            continue; // Skip empty questions
        }

        // Get answers - using the actual column names from the Excel file
        const correctAnswerKey = `Q${q}_Answered`;
        const wrongAnswer1Key = `Q${q}_Wrong1`;
        const wrongAnswer2Key = `Q${q}_Wrong2`;
        const wrongAnswer3Key = `Q${q}_Wrong3`;

        const correctAnswer = row[correctAnswerKey] || '';
        const wrongAnswer1 = row[wrongAnswer1Key] || '';
        const wrongAnswer2 = row[wrongAnswer2Key] || '';
        const wrongAnswer3 = row[wrongAnswer3Key] || '';

        const foundAnswers = { 
            correct: correctAnswer, 
            wrong1: wrongAnswer1, 
            wrong2: wrongAnswer2, 
            wrong3: wrongAnswer3 
        };

        // Only insert if we have all required answers
        if (foundAnswers.correct && foundAnswers.wrong1 && foundAnswers.wrong2 && foundAnswers.wrong3) {
            sqlOutput += `-- Question ${q} for ${name}\n`;
            sqlOutput += `INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)\n`;
            sqlOutput += `SELECT individual_id, '${questionText.replace(/'/g, "''")}', '${foundAnswers.correct.replace(/'/g, "''")}', '${foundAnswers.wrong1.replace(/'/g, "''")}', '${foundAnswers.wrong2.replace(/'/g, "''")}', '${foundAnswers.wrong3.replace(/'/g, "''")}', ${q}\n`;
            sqlOutput += `FROM red_white_who_individuals WHERE name = '${name.replace(/'/g, "''")}'\n`;
            sqlOutput += `ON CONFLICT (individual_id, question_text) DO UPDATE SET\n`;
            sqlOutput += `  correct_answer = EXCLUDED.correct_answer,\n`;
            sqlOutput += `  wrong_answer_1 = EXCLUDED.wrong_answer_1,\n`;
            sqlOutput += `  wrong_answer_2 = EXCLUDED.wrong_answer_2,\n`;
            sqlOutput += `  wrong_answer_3 = EXCLUDED.wrong_answer_3,\n`;
            sqlOutput += `  question_order = EXCLUDED.question_order;\n\n`;
        } else {
            console.warn(`Row ${index + 1} (${name}), Question ${q}: Missing answers. Found:`, {
                correct: !!foundAnswers.correct,
                wrong1: !!foundAnswers.wrong1,
                wrong2: !!foundAnswers.wrong2,
                wrong3: !!foundAnswers.wrong3
            });
        }
    }

    sqlOutput += '\n';
});

// Write to file - use the same directory as the Excel file
const outputPath = path.join(path.dirname(excelPath), 'insert_red_white_who_complete.sql');
fs.writeFileSync(outputPath, sqlOutput, 'utf8');
console.log(`\nSQL file generated: ${outputPath}`);
console.log(`Total rows processed: ${data.length}`);

