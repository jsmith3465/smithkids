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

// Generate SQL UPDATE statements
let sqlStatements = [];
sqlStatements.push('-- Update images for Red White and Who individuals');
sqlStatements.push('-- Generated from American_History_Icons_Complete.xlsx');
sqlStatements.push('-- This will update existing records based on name');
sqlStatements.push('');

data.forEach((row, index) => {
    const name = row['Name'] || row['name'] || row['NAME'];
    if (!name) {
        console.warn(`Row ${index + 1}: No name found, skipping`);
        return;
    }

    // Get main photo URL (could be in various column names)
    const mainPhoto = row['Main Photo'] || row['Main Photo URL'] || row['main_photo_url'] || 
                      row['Image'] || row['Image 1'] || row['Main Image'] || '';
    
    // Get gallery images (Image 1-10 or Photo Gallery 1-10, etc.)
    const galleryImages = [];
    for (let i = 1; i <= 10; i++) {
        const img = row[`Image ${i}`] || row[`Photo Gallery ${i}`] || 
                   row[`Gallery Image ${i}`] || row[`Photo ${i}`] || '';
        galleryImages.push(img || '');
    }

    // Build UPDATE statement
    const updates = [];
    
    if (mainPhoto) {
        updates.push(`main_photo_url = ${escapeSql(mainPhoto)}`);
    }
    
    for (let i = 0; i < 10; i++) {
        if (galleryImages[i]) {
            updates.push(`photo_gallery_${i + 1} = ${escapeSql(galleryImages[i])}`);
        }
    }

    if (updates.length > 0) {
        updates.push(`updated_at = NOW()`);
        sqlStatements.push(`-- ${name}`);
        sqlStatements.push(`UPDATE red_white_who_individuals`);
        sqlStatements.push(`SET ${updates.join(',\n    ')}`);
        sqlStatements.push(`WHERE name = ${escapeSql(name)};`);
        sqlStatements.push('');
    } else {
        console.warn(`Row ${index + 1} (${name}): No images found`);
    }
});

// Write to SQL file
const outputPath = path.join(__dirname, 'update_red_white_who_images.sql');
fs.writeFileSync(outputPath, sqlStatements.join('\n'), 'utf8');

console.log(`✅ SQL file generated: ${outputPath}`);
console.log(`📊 Processed ${data.length} rows`);
console.log(`📝 Generated ${sqlStatements.filter(s => s.startsWith('UPDATE')).length} UPDATE statements`);

