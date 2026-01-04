/**
 * Generate SQL UPDATE statements for Red, White & Who images
 * Uses multiple image sources to avoid throttling
 */

const fs = require('fs');
const path = require('path');

// Known working image URL patterns from reliable public domain sources
// These are examples - you'll need to find specific URLs for each individual

const IMAGE_URL_EXAMPLES = {
    // Library of Congress examples
    libraryOfCongress: {
        pattern: 'https://www.loc.gov/resource/',
        example: 'https://www.loc.gov/resource/pnp.hec.12345/'
    },
    // National Archives examples  
    nationalArchives: {
        pattern: 'https://catalog.archives.gov/id/',
        example: 'https://catalog.archives.gov/id/12345'
    },
    // National Portrait Gallery
    nationalPortraitGallery: {
        pattern: 'https://npg.si.edu/object/',
        example: 'https://npg.si.edu/object/npg_NPG.12345'
    },
    // Smithsonian
    smithsonian: {
        pattern: 'https://www.si.edu/object/',
        example: 'https://www.si.edu/object/siris_arc_12345'
    },
    // Alternative Wikimedia Commons (different domain)
    wikimediaCommons: {
        pattern: 'https://commons.wikimedia.org/wiki/File:',
        example: 'https://commons.wikimedia.org/wiki/File:Example.jpg'
    },
    // Britannica
    britannica: {
        pattern: 'https://cdn.britannica.com/',
        example: 'https://cdn.britannica.com/12/12345-050-ABCDEF/Example.jpg'
    }
};

// All individuals with their IDs
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

function generateSQL() {
    let sql = `-- Update Red, White & Who Images from Multiple Sources
-- Generated: ${new Date().toISOString()}
-- 
-- STRATEGY: Distribute images across multiple sources to avoid throttling
-- 
-- Source Distribution:
-- - Library of Congress (loc.gov): ~15 individuals
-- - National Archives (archives.gov): ~10 individuals  
-- - National Portrait Gallery (npg.si.edu): ~10 individuals
-- - Smithsonian (si.edu): ~8 individuals
-- - Britannica (britannica.com): ~6 individuals
-- 
-- INSTRUCTIONS:
-- 1. Search for each individual's images using:
--    - Library of Congress: https://www.loc.gov/search/?q=NAME
--    - National Archives: https://catalog.archives.gov/search?q=NAME
--    - National Portrait Gallery: https://npg.si.edu/collection/search?q=NAME
--    - Smithsonian: https://www.si.edu/search?q=NAME
-- 2. Main photo: Find portrait featuring individual prominently (alone)
-- 3. Gallery photos: Find images related to their biography and achievements
-- 4. Copy direct image URLs (not page URLs)
-- 5. Test URLs in browser before updating
-- 6. Replace placeholders below with actual URLs
--

`;

    // Rotate through sources to distribute load
    const sources = ['loc', 'archives', 'npg', 'smithsonian', 'britannica', 'loc', 'archives', 'npg'];
    let sourceIndex = 0;

    INDIVIDUALS.forEach((individual, index) => {
        const source = sources[sourceIndex % sources.length];
        sourceIndex++;
        
        sql += `-- ${individual.name} (ID: ${individual.id})\n`;
        sql += `-- Recommended source: ${source}\n`;
        sql += `-- Main Photo: Portrait of ${individual.name} (solo, prominent)\n`;
        sql += `-- Gallery: Images related to ${individual.name}'s life and achievements\n`;
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
        sql += `WHERE individual_id = ${individual.id};\n\n`;
    });

    sql += `\n-- VERIFICATION QUERY:\n`;
    sql += `-- SELECT individual_id, name, main_photo_url FROM red_white_who_individuals ORDER BY individual_id;\n`;

    return sql;
}

// Generate the SQL file
const sqlContent = generateSQL();
const outputPath = path.join(__dirname, 'update_red_white_who_images_multi_source.sql');

fs.writeFileSync(outputPath, sqlContent, 'utf8');
console.log(`✅ Generated SQL template: ${outputPath}`);
console.log(`📊 Total individuals: ${INDIVIDUALS.length}`);
console.log(`📝 Next steps:`);
console.log(`   1. Use the search URLs provided in find_and_update_images.js`);
console.log(`   2. Find images from multiple sources for each individual`);
console.log(`   3. Replace placeholder URLs in the SQL file`);
console.log(`   4. Test all URLs before executing`);
console.log(`   5. Execute the SQL in Supabase`);

