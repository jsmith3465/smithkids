const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Find the Excel file - try multiple paths
let excelPath = path.join(__dirname, 'American_History_Icons_With_Images.xlsx');
if (!fs.existsSync(excelPath)) {
    excelPath = path.join(process.cwd(), 'staging', 'American_History_Icons_With_Images.xlsx');
}
if (!fs.existsSync(excelPath)) {
    excelPath = path.join(process.cwd(), 'American_History_Icons_With_Images.xlsx');
}
const workbook = XLSX.readFile(excelPath);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet);

let sqlOutput = '-- Red White and Who Individuals and Questions with Images\n';
sqlOutput += '-- Generated from American_History_Icons_With_Images.xlsx\n';
sqlOutput += '-- \n';
sqlOutput += '-- This file contains individuals with biographical information, questions, and images.\n';
sqlOutput += '--\n';
sqlOutput += '-- To use this file:\n';
sqlOutput += '-- 1. Run create_red_white_who_tables.sql first to create the tables\n';
sqlOutput += '-- 2. Run this file in Supabase SQL Editor\n';
sqlOutput += '--\n\n';

function escapeSql(str) {
    if (str === null || str === undefined || str === '') return 'NULL';
    return `'${String(str).replace(/'/g, "''")}'`;
}

function parseYears(yearsStr) {
    if (!yearsStr) return { birthYear: null, deathYear: null };
    const match = yearsStr.match(/(\d{4})-(\d{4})/);
    if (match) {
        return { birthYear: parseInt(match[1]), deathYear: parseInt(match[2]) };
    }
    return { birthYear: null, deathYear: null };
}

function parseKeyFacts(keyFactsStr) {
    if (!keyFactsStr) return '{}';
    try {
        // If it's already JSON, return it
        JSON.parse(keyFactsStr);
        return escapeSql(keyFactsStr);
    } catch (e) {
        // If it's plain text, wrap it in a JSON object
        return escapeSql(JSON.stringify({ notes: keyFactsStr }));
    }
}

function buildPhotoGallery(galleryImages) {
    if (!galleryImages || galleryImages.length === 0) return '[]';
    
    // Create array of photo objects with url
    const photos = galleryImages.map(url => ({ url: url, caption: '' }));
    return escapeSql(JSON.stringify(photos));
}

data.forEach((row, index) => {
    const name = row['Name'] || '';
    const yearsLived = row['Years Lived'] || '';
    const keyEvent = row['Key Event'] || '';
    const keyFacts = row['Key Facts'] || '';
    const biographicalSummary = row['Biographical Summary'] || '';
    const mainPhotoUrl = row['Main Image'] || '';
    
    // Get gallery images from Image 1 through Image 10
    const galleryImages = [];
    for (let i = 1; i <= 10; i++) {
        const imageUrl = row[`Image ${i}`];
        if (imageUrl && imageUrl.trim()) {
            galleryImages.push(imageUrl.trim());
        }
    }
    
    if (!name || !biographicalSummary) {
        console.warn(`Skipping row ${index + 1}: Missing name or biographical summary`);
        return;
    }
    
    const { birthYear, deathYear } = parseYears(yearsLived);
    const keyEventsArray = keyEvent ? [keyEvent] : [];
    const keyFactsJson = parseKeyFacts(keyFacts);
    const photoGallery = buildPhotoGallery(galleryImages);
    
    sqlOutput += `-- Individual: ${name}\n`;
    sqlOutput += `INSERT INTO red_white_who_individuals (name, birth_year, death_year, birth_date, death_date, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery)\n`;
    sqlOutput += `VALUES (\n`;
    sqlOutput += `  ${escapeSql(name)},\n`;
    sqlOutput += `  ${birthYear || 'NULL'},\n`;
    sqlOutput += `  ${deathYear || 'NULL'},\n`;
    sqlOutput += `  NULL,\n`; // birth_date
    sqlOutput += `  NULL,\n`; // death_date
    sqlOutput += `  ARRAY[${keyEventsArray.map(e => escapeSql(e)).join(', ')}]::TEXT[],\n`;
    sqlOutput += `  ${keyFactsJson}::JSONB,\n`;
    sqlOutput += `  ${escapeSql(biographicalSummary)},\n`;
    sqlOutput += `  ${escapeSql(mainPhotoUrl || null)},\n`;
    sqlOutput += `  ${photoGallery}::JSONB\n`;
    sqlOutput += `)\n`;
    sqlOutput += `ON CONFLICT DO NOTHING;\n\n`;
    
    // Questions - look for Q1-Q10 and Q1_Answered-Q10_Answered
    for (let i = 1; i <= 10; i++) {
        const questionText = row[`Q${i}`];
        const correctAnswer = row[`Q${i}_Answered`];
        
        if (questionText) {
            // Wrong answers are not provided in the Excel file, so we'll use placeholders
            // These will need to be filled in manually or generated
            const wrong1 = '[WRONG ANSWER 1 NEEDED]';
            const wrong2 = '[WRONG ANSWER 2 NEEDED]';
            const wrong3 = '[WRONG ANSWER 3 NEEDED]';
            
            sqlOutput += `INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)\n`;
            sqlOutput += `SELECT individual_id, ${escapeSql(questionText)}, ${escapeSql(correctAnswer || '[ANSWER NEEDED]')}, ${escapeSql(wrong1)}, ${escapeSql(wrong2)}, ${escapeSql(wrong3)}, ${i}\n`;
            sqlOutput += `FROM red_white_who_individuals WHERE name = ${escapeSql(name)}\n`;
            sqlOutput += `ON CONFLICT (individual_id, question_text) DO NOTHING;\n\n`;
        }
    }
});

let outputPath = path.join(__dirname, 'insert_red_white_who_with_images.sql');
if (!fs.existsSync(path.dirname(outputPath))) {
    outputPath = path.join(process.cwd(), 'staging', 'insert_red_white_who_with_images.sql');
}
fs.writeFileSync(outputPath, sqlOutput);
console.log(`SQL file generated: ${outputPath}`);
console.log(`Total individuals to insert: ${data.length}`);
console.log(`\nNote: Please review the generated SQL file and fill in any placeholder answers before running it.`);

