const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Read the Excel file
const excelPath = path.join(__dirname, 'American_History_Icons_Complete.xlsx');
const workbook = XLSX.readFile(excelPath);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Convert to JSON
const data = XLSX.utils.sheet_to_json(worksheet);

// Function to escape SQL strings
function escapeSql(str) {
    if (!str || str === '') return 'NULL';
    return `'${String(str).replace(/'/g, "''")}'`;
}

// Generate SQL INSERT statements
let sqlStatements = [];
sqlStatements.push('-- Insert questions for Red White and Who individuals');
sqlStatements.push('-- Generated from American_History_Icons_Complete.xlsx');
sqlStatements.push('-- Each individual has 10 questions with 1 correct answer and 3 wrong answers');
sqlStatements.push('');

data.forEach((row, index) => {
    const name = row['Name'] || row['name'] || row['NAME'];
    if (!name) {
        console.warn(`Row ${index + 1}: No name found, skipping`);
        return;
    }

    // Process 10 questions (Q1-Q10)
    for (let qNum = 1; qNum <= 10; qNum++) {
        const questionText = row[`Q${qNum}`] || '';
        const correctAnswer = row[`Q${qNum}_Answered`] || '';
        const wrongAnswer1 = row[`Q${qNum}_Wrong1`] || '';
        const wrongAnswer2 = row[`Q${qNum}_Wrong2`] || '';
        const wrongAnswer3 = row[`Q${qNum}_Wrong3`] || '';

        // Skip if question text is missing
        if (!questionText || questionText.trim() === '') {
            continue;
        }

        // Validate that we have all required answers
        if (!correctAnswer || !wrongAnswer1 || !wrongAnswer2 || !wrongAnswer3) {
            console.warn(`Row ${index + 1}, Question ${qNum} (${name}): Missing answers, skipping`);
            continue;
        }

        sqlStatements.push(`-- ${name} - Question ${qNum}`);
        sqlStatements.push(`INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)`);
        sqlStatements.push(`SELECT individual_id, ${escapeSql(questionText.trim())}, ${escapeSql(correctAnswer.trim())}, ${escapeSql(wrongAnswer1.trim())}, ${escapeSql(wrongAnswer2.trim())}, ${escapeSql(wrongAnswer3.trim())}, ${qNum}`);
        sqlStatements.push(`FROM red_white_who_individuals WHERE name = ${escapeSql(name)}`);
        sqlStatements.push(`ON CONFLICT (individual_id, question_text) DO NOTHING;`);
        sqlStatements.push('');
    }
});

// Write to SQL file
const outputPath = path.join(__dirname, 'import_red_white_who_questions.sql');
fs.writeFileSync(outputPath, sqlStatements.join('\n'), 'utf8');

console.log(`✅ SQL file generated: ${outputPath}`);
console.log(`📊 Processed ${data.length} rows`);
console.log(`📝 Generated question INSERT statements`);

// Also log column names to help debug
if (data.length > 0) {
    console.log('\n📋 Available columns in Excel file:');
    console.log(Object.keys(data[0]).join(', '));
}

