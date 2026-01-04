/**
 * Script to find and update Red, White & Who images from multiple sources
 * This script helps identify image URLs from diverse providers to avoid throttling
 */

const INDIVIDUALS = [
    { id: 1, name: 'George Washington', searchTerms: ['George Washington portrait', 'George Washington painting', 'first president'] },
    { id: 5, name: 'Benjamin Franklin', searchTerms: ['Benjamin Franklin portrait', 'Benjamin Franklin inventor'] },
    { id: 6, name: 'Abraham Lincoln', searchTerms: ['Abraham Lincoln portrait', 'Abraham Lincoln president'] },
    { id: 7, name: 'Thomas Jefferson', searchTerms: ['Thomas Jefferson portrait', 'Thomas Jefferson founding father'] },
    { id: 8, name: 'Harriet Tubman', searchTerms: ['Harriet Tubman portrait', 'Harriet Tubman Underground Railroad'] },
    { id: 9, name: 'Frederick Douglass', searchTerms: ['Frederick Douglass portrait', 'Frederick Douglass abolitionist'] },
    { id: 10, name: 'Theodore Roosevelt', searchTerms: ['Theodore Roosevelt portrait', 'Teddy Roosevelt president'] },
    { id: 11, name: 'Martin Luther King Jr.', searchTerms: ['Martin Luther King Jr portrait', 'MLK civil rights'] },
    { id: 12, name: 'Rosa Parks', searchTerms: ['Rosa Parks portrait', 'Rosa Parks civil rights'] },
    { id: 13, name: 'Sacagawea', searchTerms: ['Sacagawea portrait', 'Sacagawea Lewis and Clark'] },
    { id: 14, name: 'Thomas Edison', searchTerms: ['Thomas Edison portrait', 'Thomas Edison inventor'] },
    { id: 15, name: 'Alexander Graham Bell', searchTerms: ['Alexander Graham Bell portrait', 'Alexander Graham Bell telephone'] },
    { id: 16, name: 'Wright Brothers (Orville & Wilbur)', searchTerms: ['Wright Brothers portrait', 'Orville Wilbur Wright'] },
    { id: 17, name: 'Neil Armstrong', searchTerms: ['Neil Armstrong portrait', 'Neil Armstrong astronaut'] },
    { id: 18, name: 'Jackie Robinson', searchTerms: ['Jackie Robinson portrait', 'Jackie Robinson baseball'] },
    { id: 19, name: 'Amelia Earhart', searchTerms: ['Amelia Earhart portrait', 'Amelia Earhart pilot'] },
    { id: 20, name: 'Ulysses S. Grant', searchTerms: ['Ulysses S Grant portrait', 'Ulysses Grant president'] },
    { id: 21, name: 'Susan B. Anthony', searchTerms: ['Susan B Anthony portrait', 'Susan B Anthony suffrage'] },
    { id: 22, name: 'Clara Barton', searchTerms: ['Clara Barton portrait', 'Clara Barton Red Cross'] },
    { id: 23, name: 'John Adams', searchTerms: ['John Adams portrait', 'John Adams founding father'] },
    { id: 24, name: 'Alexander Hamilton', searchTerms: ['Alexander Hamilton portrait', 'Alexander Hamilton founding father'] },
    { id: 25, name: 'Franklin D. Roosevelt', searchTerms: ['Franklin D Roosevelt portrait', 'FDR president'] },
    { id: 26, name: 'John F. Kennedy', searchTerms: ['John F Kennedy portrait', 'JFK president'] },
    { id: 27, name: 'Ronald Reagan', searchTerms: ['Ronald Reagan portrait', 'Ronald Reagan president'] },
    { id: 28, name: 'Helen Keller', searchTerms: ['Helen Keller portrait', 'Helen Keller author'] },
    { id: 29, name: 'George Washington Carver', searchTerms: ['George Washington Carver portrait', 'George Washington Carver scientist'] },
    { id: 30, name: 'Sojourner Truth', searchTerms: ['Sojourner Truth portrait', 'Sojourner Truth abolitionist'] },
    { id: 31, name: 'Booker T. Washington', searchTerms: ['Booker T Washington portrait', 'Booker T Washington educator'] },
    { id: 32, name: 'Dwight D. Eisenhower', searchTerms: ['Dwight Eisenhower portrait', 'Ike Eisenhower president'] },
    { id: 33, name: 'Daniel Boone', searchTerms: ['Daniel Boone portrait', 'Daniel Boone frontiersman'] },
    { id: 34, name: 'Davy Crockett', searchTerms: ['Davy Crockett portrait', 'Davy Crockett Alamo'] },
    { id: 35, name: 'Henry Ford', searchTerms: ['Henry Ford portrait', 'Henry Ford Model T'] },
    { id: 36, name: 'Eleanor Roosevelt', searchTerms: ['Eleanor Roosevelt portrait', 'Eleanor Roosevelt first lady'] },
    { id: 37, name: 'Paul Revere', searchTerms: ['Paul Revere portrait', 'Paul Revere midnight ride'] },
    { id: 38, name: 'James Madison', searchTerms: ['James Madison portrait', 'James Madison founding father'] },
    { id: 39, name: 'Patrick Henry', searchTerms: ['Patrick Henry portrait', 'Patrick Henry give me liberty'] },
    { id: 40, name: 'John Hancock', searchTerms: ['John Hancock portrait', 'John Hancock signature'] },
    { id: 41, name: 'Samuel Adams', searchTerms: ['Samuel Adams portrait', 'Samuel Adams founding father'] },
    { id: 42, name: 'Robert E. Lee', searchTerms: ['Robert E Lee portrait', 'Robert E Lee general'] },
    { id: 43, name: 'Andrew Jackson', searchTerms: ['Andrew Jackson portrait', 'Andrew Jackson president'] },
    { id: 44, name: 'John Muir', searchTerms: ['John Muir portrait', 'John Muir conservationist'] },
    { id: 45, name: 'Mark Twain', searchTerms: ['Mark Twain portrait', 'Mark Twain author'] },
    { id: 46, name: 'Thurgood Marshall', searchTerms: ['Thurgood Marshall portrait', 'Thurgood Marshall Supreme Court'] },
    { id: 47, name: 'John Lewis', searchTerms: ['John Lewis portrait', 'John Lewis civil rights'] },
    { id: 48, name: 'Walt Disney', searchTerms: ['Walt Disney portrait', 'Walt Disney Mickey Mouse'] },
    { id: 49, name: 'Cesar Chavez', searchTerms: ['Cesar Chavez portrait', 'Cesar Chavez farmworkers'] },
    { id: 50, name: 'Sitting Bull', searchTerms: ['Sitting Bull portrait', 'Sitting Bull Lakota'] },
    { id: 51, name: 'Audie Murphy', searchTerms: ['Audie Murphy portrait', 'Audie Murphy Medal of Honor'] },
    { id: 52, name: 'Pocahontas', searchTerms: ['Pocahontas portrait', 'Pocahontas Jamestown'] },
];

// Known reliable public domain image sources
const IMAGE_SOURCE_PATTERNS = {
    libraryOfCongress: {
        base: 'https://www.loc.gov/item/',
        search: 'https://www.loc.gov/search/?q=',
        description: 'Library of Congress - extensive historical image collection'
    },
    nationalArchives: {
        base: 'https://catalog.archives.gov/id/',
        search: 'https://catalog.archives.gov/search?q=',
        description: 'National Archives - official government records and photographs'
    },
    nationalPortraitGallery: {
        base: 'https://npg.si.edu/',
        search: 'https://npg.si.edu/collection/search?q=',
        description: 'National Portrait Gallery - official portraits'
    },
    smithsonian: {
        base: 'https://www.si.edu/',
        search: 'https://www.si.edu/search?q=',
        description: 'Smithsonian Institution - vast collection'
    },
    britannica: {
        base: 'https://www.britannica.com/',
        description: 'Encyclopedia Britannica - educational images'
    },
    biography: {
        base: 'https://www.biography.com/',
        description: 'Biography.com - biographical images'
    },
    // Alternative Wikimedia Commons (different servers)
    wikimediaCommons: {
        base: 'https://commons.wikimedia.org/wiki/',
        description: 'Wikimedia Commons - alternative to upload.wikimedia.org'
    },
    // Public domain review
    publicDomainReview: {
        base: 'https://publicdomainreview.org/',
        description: 'Public Domain Review - curated public domain images'
    }
};

console.log('📋 Image Source Strategy:');
console.log('To avoid throttling, we need to diversify image sources across:');
Object.entries(IMAGE_SOURCE_PATTERNS).forEach(([key, value]) => {
    console.log(`  - ${key}: ${value.description}`);
});

console.log('\n📝 Next Steps:');
console.log('1. For each individual, search for images from DIFFERENT sources');
console.log('2. Main photo: Find a portrait featuring the individual prominently');
console.log('3. Gallery photos: Find images related to their life and achievements');
console.log('4. Test all URLs before updating the database');
console.log('\n💡 Recommended approach:');
console.log('   - Use Library of Congress for main portraits');
console.log('   - Use National Archives for historical photos');
console.log('   - Use National Portrait Gallery for official portraits');
console.log('   - Use Smithsonian for artifacts and related images');
console.log('   - Mix sources across all 49 individuals');

// Generate search URLs for manual searching
function generateSearchUrls() {
    const searchUrls = [];
    
    INDIVIDUALS.forEach(individual => {
        const searches = {
            individual: individual.name,
            id: individual.id,
            urls: []
        };
        
        // Generate search URLs for each source
        individual.searchTerms.forEach(term => {
            searches.urls.push({
                source: 'Library of Congress',
                url: `${IMAGE_SOURCE_PATTERNS.libraryOfCongress.search}${encodeURIComponent(term)}`
            });
            searches.urls.push({
                source: 'National Archives',
                url: `${IMAGE_SOURCE_PATTERNS.nationalArchives.search}${encodeURIComponent(term)}`
            });
            searches.urls.push({
                source: 'National Portrait Gallery',
                url: `${IMAGE_SOURCE_PATTERNS.nationalPortraitGallery.search}${encodeURIComponent(term)}`
            });
        });
        
        searchUrls.push(searches);
    });
    
    return searchUrls;
}

// Export for use in other scripts
module.exports = {
    INDIVIDUALS,
    IMAGE_SOURCE_PATTERNS,
    generateSearchUrls
};

if (require.main === module) {
    console.log('\n🔍 Generated search strategy for', INDIVIDUALS.length, 'individuals');
    console.log('Run this script with a web scraping tool or manually search using the patterns above');
}

