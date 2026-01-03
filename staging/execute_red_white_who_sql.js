const fs = require('fs');
const path = require('path');

// Read the SQL file
const sqlFile = path.join(__dirname, '..', 'insert_red_white_who_data.sql');
const sqlContent = fs.readFileSync(sqlFile, 'utf8');

// Split by individual (each starts with "-- Individual:")
const individuals = sqlContent.split(/-- Individual:/).filter(block => block.trim());

console.log(`Found ${individuals.length} individuals to insert`);
console.log('\nSQL file is ready to execute in Supabase SQL Editor.');
console.log('Due to the large size, it should be run directly in Supabase SQL Editor.');
console.log('\nFile location:', sqlFile);
console.log('File size:', (fs.statSync(sqlFile).size / 1024).toFixed(2), 'KB');
console.log('Total lines:', sqlContent.split('\n').length);

