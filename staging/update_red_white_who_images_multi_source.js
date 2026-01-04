const fs = require('fs');
const path = require('path');

// Known public domain image sources to diversify from Wikimedia
const IMAGE_SOURCES = {
    libraryOfCongress: 'https://www.loc.gov/item/',
    nationalArchives: 'https://catalog.archives.gov/id/',
    nationalPortraitGallery: 'https://npg.si.edu/',
    smithsonian: 'https://www.si.edu/',
    britannica: 'https://www.britannica.com/',
    biography: 'https://www.biography.com/',
    // Alternative Wikimedia Commons mirrors
    wikimediaCommons: 'https://commons.wikimedia.org/wiki/',
    // Public domain image repositories
    publicDomainReview: 'https://publicdomainreview.org/',
    // Historical image collections
    gettyImages: 'https://www.gettyimages.com/', // Note: may require licensing
    // State and local historical societies often have public domain images
};

// List of all 49 individuals from the database
const INDIVIDUALS = [
    { id: 1, name: 'George Washington' },
    { id: 5, name: 'Benjamin Franklin' },
    { id: 6, name: 'Abraham Lincoln' },
    { id: 7, name: 'Thomas Jefferson' },
    { id: 8, name: 'Harriet Tubman' },
    { id: 9, name: 'Frederick Douglass' },
    { id: 10, name: 'Theodore Roosevelt' },
    { id: 11, name: 'Martin Luther King Jr.' },
    { id: 12, name: 'Rosa Parks' },
    { id: 13, name: 'Sacagawea' },
    { id: 14, name: 'Thomas Edison' },
    { id: 15, name: 'Alexander Graham Bell' },
    { id: 16, name: 'Wright Brothers (Orville & Wilbur)' },
    { id: 17, name: 'Neil Armstrong' },
    { id: 18, name: 'Jackie Robinson' },
    { id: 19, name: 'Amelia Earhart' },
    { id: 20, name: 'Ulysses S. Grant' },
    { id: 21, name: 'Susan B. Anthony' },
    { id: 22, name: 'Clara Barton' },
    { id: 23, name: 'John Adams' },
    { id: 24, name: 'Alexander Hamilton' },
    { id: 25, name: 'Franklin D. Roosevelt' },
    { id: 26, name: 'John F. Kennedy' },
    { id: 27, name: 'Ronald Reagan' },
    { id: 28, name: 'Helen Keller' },
    { id: 29, name: 'George Washington Carver' },
    { id: 30, name: 'Sojourner Truth' },
    { id: 31, name: 'Booker T. Washington' },
    { id: 32, name: 'Dwight D. Eisenhower' },
    { id: 33, name: 'Daniel Boone' },
    { id: 34, name: 'Davy Crockett' },
    { id: 35, name: 'Henry Ford' },
    { id: 36, name: 'Eleanor Roosevelt' },
    { id: 37, name: 'Paul Revere' },
    { id: 38, name: 'James Madison' },
    { id: 39, name: 'Patrick Henry' },
    { id: 40, name: 'John Hancock' },
    { id: 41, name: 'Samuel Adams' },
    { id: 42, name: 'Robert E. Lee' },
    { id: 43, name: 'Andrew Jackson' },
    { id: 44, name: 'John Muir' },
    { id: 45, name: 'Mark Twain' },
    { id: 46, name: 'Thurgood Marshall' },
    { id: 47, name: 'John Lewis' },
    { id: 48, name: 'Walt Disney' },
    { id: 49, name: 'Cesar Chavez' },
    { id: 50, name: 'Sitting Bull' },
    { id: 51, name: 'Audie Murphy' },
    { id: 52, name: 'Pocahontas' },
];

// This script generates a template SQL file with placeholders
// You'll need to manually search and fill in the actual image URLs
// from multiple sources to avoid throttling

function generateImageUpdateSQL() {
    let sql = `-- Update Red, White & Who Images from Multiple Sources
-- Generated: ${new Date().toISOString()}
-- 
-- INSTRUCTIONS:
-- 1. For each individual, find images from DIFFERENT sources:
--    - Library of Congress (loc.gov)
--    - National Archives (archives.gov)
--    - National Portrait Gallery (npg.si.edu)
--    - Smithsonian (si.edu)
--    - Britannica (britannica.com)
--    - Biography.com
--    - Other public domain sources
-- 2. Main photo should prominently feature the individual alone
-- 3. Gallery photos should relate to their biography and achievements
-- 4. Replace the placeholder URLs below with actual working URLs
-- 5. Test URLs before executing this SQL
--
-- IMPORTANT: Use diverse sources to prevent throttling from any single provider
--

`;

    INDIVIDUALS.forEach(individual => {
        const name = individual.name;
        const id = individual.id;
        
        sql += `-- ${name} (ID: ${id})\n`;
        sql += `-- Main Photo: Find portrait featuring ${name} prominently\n`;
        sql += `-- Gallery Photos: Find images related to ${name}'s life and achievements\n`;
        sql += `UPDATE red_white_who_individuals\n`;
        sql += `SET main_photo_url = 'REPLACE_WITH_MAIN_PHOTO_URL',\n`;
        sql += `    photo_gallery_1 = 'REPLACE_WITH_GALLERY_1_URL',\n`;
        sql += `    photo_gallery_2 = 'REPLACE_WITH_GALLERY_2_URL',\n`;
        sql += `    photo_gallery_3 = 'REPLACE_WITH_GALLERY_3_URL',\n`;
        sql += `    photo_gallery_4 = 'REPLACE_WITH_GALLERY_4_URL',\n`;
        sql += `    photo_gallery_5 = 'REPLACE_WITH_GALLERY_5_URL',\n`;
        sql += `    photo_gallery_6 = 'REPLACE_WITH_GALLERY_6_URL',\n`;
        sql += `    photo_gallery_7 = 'REPLACE_WITH_GALLERY_7_URL',\n`;
        sql += `    photo_gallery_8 = 'REPLACE_WITH_GALLERY_8_URL',\n`;
        sql += `    photo_gallery_9 = 'REPLACE_WITH_GALLERY_9_URL',\n`;
        sql += `    photo_gallery_10 = 'REPLACE_WITH_GALLERY_10_URL'\n`;
        sql += `WHERE individual_id = ${id};\n\n`;
    });

    return sql;
}

// Generate the SQL file
const sqlContent = generateImageUpdateSQL();
const outputPath = path.join(__dirname, 'update_red_white_who_images_template.sql');

fs.writeFileSync(outputPath, sqlContent, 'utf8');
console.log(`✅ Generated SQL template: ${outputPath}`);
console.log(`📝 Next steps:`);
console.log(`   1. Search for images for each individual from multiple sources`);
console.log(`   2. Replace placeholder URLs in the SQL file`);
console.log(`   3. Test URLs to ensure they work`);
console.log(`   4. Execute the SQL in Supabase`);

