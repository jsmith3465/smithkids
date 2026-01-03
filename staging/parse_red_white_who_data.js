const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Read the Excel file
const excelPath = path.join(__dirname, 'American_History_Icons_for_Kids.xlsx');
console.log('Reading Excel file from:', excelPath);
const workbook = XLSX.readFile(excelPath);

// Get the first sheet
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Convert to JSON
const data = XLSX.utils.sheet_to_json(worksheet);

console.log(`Found ${data.length} rows in the Excel file`);
console.log('Sample row:', data[0]);
console.log('\nColumn names:', Object.keys(data[0] || {}));

// Generate SQL insert statements
let sqlOutput = '-- Red White and Who Individuals and Questions\n';
sqlOutput += '-- Generated from American_History_Icons_for_Kids.xlsx\n\n';

// Process each row
data.forEach((row, index) => {
    // Extract data (adjust column names based on actual Excel structure)
    const name = row['Name'] || row['name'] || row['NAME'] || '';
    const yearsLived = row['Years Lived'] || row['years_lived'] || row['YearsLived'] || '';
    const keyEvent = row['Key Event'] || row['key_event'] || row['KeyEvent'] || row['Key Events'] || row['key_events'] || row['KeyEvents'] || '';
    const keyFacts = row['Key Facts'] || row['key_facts'] || row['KeyFacts'] || '';
    const biographicalSummary = row['Biographical Summary'] || row['biographical_summary'] || row['BiographicalSummary'] || row['Summary'] || row['summary'] || '';
    const mainPhotoUrl = row['Main Photo URL'] || row['main_photo_url'] || row['MainPhotoUrl'] || row['Photo'] || row['photo'] || '';
    
    // Parse years lived (format: "1732-1799" or "1732 - 1799")
    let parsedBirthYear = null;
    let parsedDeathYear = null;
    if (yearsLived) {
        const match = yearsLived.toString().match(/(\d{4})\s*[-–]\s*(\d{4})/);
        if (match) {
            parsedBirthYear = parseInt(match[1]);
            parsedDeathYear = parseInt(match[2]);
        } else {
            // Try single year
            const singleYear = yearsLived.toString().match(/(\d{4})/);
            if (singleYear) {
                parsedBirthYear = parseInt(singleYear[1]);
            }
        }
    }
    
    // Questions - Excel has Q1-Q10 columns with questions but no answers
    // We'll need to generate placeholder questions or extract from summary
    const questions = [];
    for (let i = 1; i <= 10; i++) {
        const questionText = row[`Q${i}`] || row[`Question ${i}`] || row[`Question${i}`] || '';
        
        if (questionText) {
            // Since we don't have answers, we'll create placeholder entries
            // These will need to be filled in manually or generated
            questions.push({
                question_text: questionText,
                correct_answer: '[ANSWER NEEDED]',
                wrong_answer_1: '[WRONG ANSWER 1 NEEDED]',
                wrong_answer_2: '[WRONG ANSWER 2 NEEDED]',
                wrong_answer_3: '[WRONG ANSWER 3 NEEDED]',
                order: i
            });
        }
    }
    
    if (!name || !biographicalSummary) {
        console.warn(`Skipping row ${index + 1}: Missing name or biographical summary`);
        return;
    }
    
    // Parse key events (assuming comma-separated or array)
    let keyEventsArray = [];
    if (keyEvent) {
        if (typeof keyEvent === 'string') {
            keyEventsArray = keyEvent.split(',').map(e => e.trim()).filter(e => e);
        } else if (Array.isArray(keyEvent)) {
            keyEventsArray = keyEvent;
        }
    }
    
    // Parse key facts (assuming JSON string or object)
    let keyFactsObj = {};
    if (keyFacts) {
        if (typeof keyFacts === 'string') {
            try {
                keyFactsObj = JSON.parse(keyFacts);
            } catch (e) {
                // If not JSON, create a simple object
                keyFactsObj = { notes: keyFacts };
            }
        } else if (typeof keyFacts === 'object') {
            keyFactsObj = keyFacts;
        }
    }
    
    // Escape SQL strings
    function escapeSql(str) {
        if (!str) return 'NULL';
        return `'${String(str).replace(/'/g, "''")}'`;
    }
    
    function escapeSqlArray(arr) {
        if (!arr || arr.length === 0) return 'ARRAY[]::TEXT[]';
        return `ARRAY[${arr.map(e => escapeSql(e)).join(', ')}]`;
    }
    
    function escapeJsonb(obj) {
        if (!obj || Object.keys(obj).length === 0) return "'{}'::JSONB";
        return escapeSql(JSON.stringify(obj));
    }
    
    // Insert individual
    sqlOutput += `-- Individual: ${name}\n`;
    sqlOutput += `INSERT INTO red_white_who_individuals (name, birth_year, death_year, birth_date, death_date, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery)\n`;
    sqlOutput += `VALUES (\n`;
    sqlOutput += `  ${escapeSql(name)},\n`;
    sqlOutput += `  ${parsedBirthYear ? parsedBirthYear : 'NULL'},\n`;
    sqlOutput += `  ${parsedDeathYear ? parsedDeathYear : 'NULL'},\n`;
    sqlOutput += `  NULL,\n`; // birth_date
    sqlOutput += `  NULL,\n`; // death_date
    sqlOutput += `  ${escapeSqlArray(keyEventsArray)},\n`;
    sqlOutput += `  ${escapeJsonb(keyFactsObj)},\n`;
    sqlOutput += `  ${escapeSql(biographicalSummary)},\n`;
    sqlOutput += `  ${mainPhotoUrl ? escapeSql(mainPhotoUrl) : 'NULL'},\n`;
    sqlOutput += `  '[]'::JSONB\n`;
    sqlOutput += `)\n`;
    sqlOutput += `ON CONFLICT DO NOTHING\n`;
    sqlOutput += `RETURNING individual_id;\n\n`;
    
    // Insert questions
    if (questions.length > 0) {
        sqlOutput += `-- Questions for ${name}\n`;
        questions.forEach((q, qIndex) => {
            sqlOutput += `INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)\n`;
            sqlOutput += `SELECT individual_id, ${escapeSql(q.question_text)}, ${escapeSql(q.correct_answer)}, ${escapeSql(q.wrong_answer_1)}, ${escapeSql(q.wrong_answer_2)}, ${escapeSql(q.wrong_answer_3)}, ${q.order}\n`;
            sqlOutput += `FROM red_white_who_individuals WHERE name = ${escapeSql(name)}\n`;
            sqlOutput += `ON CONFLICT (individual_id, question_text) DO NOTHING;\n\n`;
        });
    }
    
    sqlOutput += '\n';
});

// Write to file
const outputPath = path.join(__dirname, 'insert_red_white_who_data.sql');
fs.writeFileSync(outputPath, sqlOutput, 'utf8');

console.log(`\nSQL file generated: ${outputPath}`);
console.log(`Total individuals to insert: ${data.length}`);

