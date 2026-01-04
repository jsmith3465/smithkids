/**
 * Script to find and compile image URLs for the first 5 individuals
 * George Washington, Benjamin Franklin, Abraham Lincoln, Thomas Jefferson, Harriet Tubman
 */

const INDIVIDUALS = [
    {
        id: 1,
        name: 'George Washington',
        searchTerms: ['George Washington portrait', 'Mount Vernon', 'Valley Forge', 'Crossing Delaware', 'Washington Monument']
    },
    {
        id: 5,
        name: 'Benjamin Franklin',
        searchTerms: ['Benjamin Franklin portrait', 'kite experiment', 'Declaration of Independence', 'Poor Richard Almanack', 'lightning rod']
    },
    {
        id: 6,
        name: 'Abraham Lincoln',
        searchTerms: ['Abraham Lincoln portrait', 'Gettysburg Address', 'Emancipation Proclamation', 'Lincoln Memorial', 'Ford Theatre']
    },
    {
        id: 7,
        name: 'Thomas Jefferson',
        searchTerms: ['Thomas Jefferson portrait', 'Monticello', 'Declaration of Independence', 'Louisiana Purchase', 'University of Virginia']
    },
    {
        id: 8,
        name: 'Harriet Tubman',
        searchTerms: ['Harriet Tubman portrait', 'Underground Railroad', 'Combahee River', 'Auburn New York', 'Tubman memorial']
    }
];

// Known reliable image sources with URL patterns
const IMAGE_SOURCES = {
    libraryOfCongress: {
        base: 'https://www.loc.gov/item/',
        search: 'https://www.loc.gov/search/?q=',
        description: 'Library of Congress - extensive historical collection'
    },
    nationalArchives: {
        base: 'https://catalog.archives.gov/id/',
        search: 'https://catalog.archives.gov/search?q=',
        description: 'National Archives - official government records'
    },
    nationalPortraitGallery: {
        base: 'https://npg.si.edu/object/',
        search: 'https://npg.si.edu/collection/search?q=',
        description: 'National Portrait Gallery - official portraits'
    },
    smithsonian: {
        base: 'https://www.si.edu/object/',
        search: 'https://www.si.edu/search?q=',
        description: 'Smithsonian Institution'
    },
    whiteHouseHistory: {
        base: 'https://library.whitehousehistory.org/',
        description: 'White House Historical Association'
    }
};

console.log('🔍 Image Search Strategy for First 5 Individuals:');
console.log('='.repeat(60));
INDIVIDUALS.forEach(individual => {
    console.log(`\n${individual.name} (ID: ${individual.id})`);
    console.log(`Search terms: ${individual.searchTerms.join(', ')}`);
    console.log(`\nRecommended sources:`);
    Object.entries(IMAGE_SOURCES).forEach(([key, source]) => {
        console.log(`  - ${key}: ${source.search || source.base}${individual.name}`);
    });
});

console.log('\n\n📝 Next Steps:');
console.log('1. Search each individual using the search URLs above');
console.log('2. Find main portrait (individual prominently featured alone)');
console.log('3. Find 10 gallery images related to their biography');
console.log('4. Copy direct image URLs (not page URLs)');
console.log('5. Test URLs in browser to ensure they load');
console.log('6. Compile into SQL UPDATE statements');

// Export for use in other scripts
module.exports = {
    INDIVIDUALS,
    IMAGE_SOURCES
};

