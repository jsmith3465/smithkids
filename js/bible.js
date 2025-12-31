// Bible reading page

// Helper function to get correct path for pages
function getPagePath(pageName) {
    const currentPath = window.location.pathname;
    if (currentPath === '/' || currentPath.endsWith('/index.html') || currentPath.endsWith('index.html')) {
        return `pages/${pageName}`;
    }
    return pageName;
}
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://frlajamhyyectdrcbrnd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybGFqYW1oeXllY3RkcmNicm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4ODA4ODksImV4cCI6MjA4MjQ1Njg4OX0.QAH0GME5_iYkz6SZjfqdL3q9E9Jo1qKv6YWFk2exAtY';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Bible books in order
const bibleBooks = [
    // Old Testament
    "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel",
    "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther", "Job", "Psalm", "Proverbs",
    "Ecclesiastes", "Song of Songs", "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos",
    "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi",
    // New Testament
    "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians",
    "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus", "Philemon",
    "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude", "Revelation"
];

// Chapter counts for each book (approximate - some books have varying chapter counts)
const chapterCounts = {
    "Genesis": 50, "Exodus": 40, "Leviticus": 27, "Numbers": 36, "Deuteronomy": 34,
    "Joshua": 24, "Judges": 21, "Ruth": 4, "1 Samuel": 31, "2 Samuel": 24,
    "1 Kings": 22, "2 Kings": 25, "1 Chronicles": 29, "2 Chronicles": 36, "Ezra": 10,
    "Nehemiah": 13, "Esther": 10, "Job": 42, "Psalm": 150, "Proverbs": 31,
    "Ecclesiastes": 12, "Song of Songs": 8, "Isaiah": 66, "Jeremiah": 52, "Lamentations": 5,
    "Ezekiel": 48, "Daniel": 12, "Hosea": 14, "Joel": 3, "Amos": 9,
    "Obadiah": 1, "Jonah": 4, "Micah": 7, "Nahum": 3, "Habakkuk": 3,
    "Zephaniah": 3, "Haggai": 2, "Zechariah": 14, "Malachi": 4,
    "Matthew": 28, "Mark": 16, "Luke": 24, "John": 21, "Acts": 28,
    "Romans": 16, "1 Corinthians": 16, "2 Corinthians": 13, "Galatians": 6, "Ephesians": 6,
    "Philippians": 4, "Colossians": 4, "1 Thessalonians": 5, "2 Thessalonians": 3, "1 Timothy": 6,
    "2 Timothy": 4, "Titus": 3, "Philemon": 1, "Hebrews": 13, "James": 5,
    "1 Peter": 5, "2 Peter": 3, "1 John": 5, "2 John": 1, "3 John": 1,
    "Jude": 1, "Revelation": 22
};

let currentBook = "John";
let currentChapter = 3;
let highlightVerse = null;

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const checkAuth = setInterval(() => {
            if (window.authStatus) {
                clearInterval(checkAuth);
                if (window.authStatus.isAuthenticated) {
                    initializeBiblePage();
                } else {
                    // Wait a bit longer - auth might still be initializing
                    setTimeout(() => {
                        if (window.authStatus && window.authStatus.isAuthenticated) {
                            initializeBiblePage();
                        } else {
                            const authCheck = document.getElementById('authCheck');
                            if (authCheck) {
                                authCheck.innerHTML = '<p>Authentication failed. Redirecting to login...</p>';
                                setTimeout(() => {
                                    window.location.href = getPagePath('login.html');
                                }, 2000);
                            }
                        }
                    }, 1000);
                }
            }
        }, 100);
        
        setTimeout(() => {
            clearInterval(checkAuth);
            // Give it one more chance after timeout
            if (window.authStatus && window.authStatus.isAuthenticated) {
                initializeBiblePage();
            } else if (!window.authStatus) {
                const authCheck = document.getElementById('authCheck');
                if (authCheck) {
                    authCheck.innerHTML = '<p style="color: #dc3545;">Authentication check timed out. Please refresh the page.</p>';
                }
            }
        }, 8000); // Increased timeout to 8 seconds
    }, 200);
});

function initializeBiblePage() {
    const session = window.authStatus?.getSession();
    if (!session) {
        window.location.href = getPagePath('login.html');
        return;
    }
    
    // Get parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const bookParam = urlParams.get('book');
    const chapterParam = urlParams.get('chapter');
    const verseParam = urlParams.get('verse');
    
    if (bookParam) currentBook = bookParam;
    if (chapterParam) currentChapter = parseInt(chapterParam) || 1;
    if (verseParam) highlightVerse = parseInt(verseParam);
    
    // Populate book selector
    const bookSelect = document.getElementById('bookSelect');
    bibleBooks.forEach(book => {
        const option = document.createElement('option');
        option.value = book;
        option.textContent = book;
        if (book === currentBook) option.selected = true;
        bookSelect.appendChild(option);
    });
    
    // Setup event listeners
    setupEventListeners();
    
    // Load chapter
    loadChapter(currentBook, currentChapter);
    
    // Show main content
    document.getElementById('authCheck').classList.add('hidden');
    document.getElementById('mainContent').classList.remove('hidden');
}

function setupEventListeners() {
    const bookSelect = document.getElementById('bookSelect');
    const chapterSelect = document.getElementById('chapterSelect');
    const prevBtn = document.getElementById('prevChapterBtn');
    const nextBtn = document.getElementById('nextChapterBtn');
    
    bookSelect.addEventListener('change', () => {
        currentBook = bookSelect.value;
        currentChapter = 1;
        highlightVerse = null;
        updateChapterSelector();
        loadChapter(currentBook, currentChapter);
    });
    
    chapterSelect.addEventListener('change', () => {
        currentChapter = parseInt(chapterSelect.value) || 1;
        highlightVerse = null;
        loadChapter(currentBook, currentChapter);
    });
    
    prevBtn.addEventListener('click', () => {
        if (currentChapter > 1) {
            currentChapter--;
            highlightVerse = null;
            updateChapterSelector();
            loadChapter(currentBook, currentChapter);
        } else {
            // Go to previous book's last chapter
            const bookIndex = bibleBooks.indexOf(currentBook);
            if (bookIndex > 0) {
                currentBook = bibleBooks[bookIndex - 1];
                currentChapter = chapterCounts[currentBook] || 1;
                highlightVerse = null;
                bookSelect.value = currentBook;
                updateChapterSelector();
                loadChapter(currentBook, currentChapter);
            }
        }
    });
    
    nextBtn.addEventListener('click', () => {
        const maxChapters = chapterCounts[currentBook] || 1;
        if (currentChapter < maxChapters) {
            currentChapter++;
            highlightVerse = null;
            updateChapterSelector();
            loadChapter(currentBook, currentChapter);
        } else {
            // Go to next book's first chapter
            const bookIndex = bibleBooks.indexOf(currentBook);
            if (bookIndex < bibleBooks.length - 1) {
                currentBook = bibleBooks[bookIndex + 1];
                currentChapter = 1;
                highlightVerse = null;
                bookSelect.value = currentBook;
                updateChapterSelector();
                loadChapter(currentBook, currentChapter);
            }
        }
    });
}

function updateChapterSelector() {
    const chapterSelect = document.getElementById('chapterSelect');
    const maxChapters = chapterCounts[currentBook] || 1;
    
    chapterSelect.innerHTML = '';
    for (let i = 1; i <= maxChapters; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        if (i === currentChapter) option.selected = true;
        chapterSelect.appendChild(option);
    }
}

async function loadChapter(book, chapter) {
    const bibleContent = document.getElementById('bibleContent');
    const bibleTitle = document.getElementById('bibleTitle');
    const errorMsg = document.getElementById('errorMessage');
    
    bibleContent.innerHTML = '<div class="loading">Loading chapter...</div>';
    errorMsg.style.display = 'none';
    bibleTitle.textContent = `${book} ${chapter}`;
    
    updateChapterSelector();
    updateURL();
    
    try {
        // Use bible-api.com to fetch the entire chapter natively (no iframe)
        // Format: https://bible-api.com/book+chapter:verseRange (e.g., john+3:1-21)
        // For full chapters, we'll try fetching a large verse range
        const bookFormatted = book.toLowerCase().replace(/\s+/g, '+');
        
        // Try fetching as a full chapter first (book+chapter format)
        // If that doesn't work, we'll try with a verse range
        let apiUrl = `https://bible-api.com/${bookFormatted}+${chapter}`;
        let data = null;
        let response = null;
        
        // Fetch chapter with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        try {
            response = await fetch(apiUrl, { 
                signal: controller.signal,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            clearTimeout(timeoutId);
            
            if (response.ok) {
                data = await response.json();
            } else {
                // Try with verse range format (1-200 should cover most chapters)
                apiUrl = `https://bible-api.com/${bookFormatted}+${chapter}:1-200`;
                const controller2 = new AbortController();
                const timeoutId2 = setTimeout(() => controller2.abort(), 10000);
                
                response = await fetch(apiUrl, { 
                    signal: controller2.signal,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                clearTimeout(timeoutId2);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                data = await response.json();
            }
        } catch (fetchError) {
            clearTimeout(timeoutId);
            throw fetchError;
        }
        
        // Create container for verses
        const versesContainer = document.createElement('div');
        versesContainer.style.textAlign = 'left';
        versesContainer.style.maxWidth = '900px';
        versesContainer.style.margin = '0 auto';
        versesContainer.style.padding = '20px';
        versesContainer.style.lineHeight = '1.8';
        versesContainer.style.fontSize = '1.1rem';
        
        // Parse and display verses
        // The bible-api.com returns data in different formats depending on the request
        // For full chapters, it may return verses array or a text field with verse numbers
        if (data.verses && Array.isArray(data.verses)) {
            // Format: verses array with verse objects
            data.verses.forEach(verse => {
                const verseElement = document.createElement('div');
                verseElement.className = 'bible-verse';
                
                // Check if this verse should be highlighted
                const verseNum = parseInt(verse.verse) || verse.verse;
                if (highlightVerse && verseNum === highlightVerse) {
                    verseElement.classList.add('highlighted-verse');
                }
                
                // Create verse number
                const verseNumber = document.createElement('span');
                verseNumber.className = 'verse-number';
                verseNumber.textContent = verseNum;
                
                // Create verse text
                const verseText = document.createElement('span');
                verseText.textContent = ` ${verse.text || ''}`;
                
                verseElement.appendChild(verseNumber);
                verseElement.appendChild(verseText);
                versesContainer.appendChild(verseElement);
            });
        } else if (data.text) {
            // Format: single text field with verse numbers embedded
            // Parse the text to extract individual verses
            const text = data.text;
            // Split by verse numbers (format: "1 text 2 text 3 text" or "[1] text [2] text")
            const versePattern = /(\d+)\s+/g;
            const verses = [];
            let lastIndex = 0;
            let match;
            
            while ((match = versePattern.exec(text)) !== null) {
                if (match.index > lastIndex) {
                    verses.push({
                        verse: match[1],
                        text: text.substring(lastIndex, match.index).trim()
                    });
                }
                lastIndex = match.index + match[0].length;
            }
            
            // Add the last verse
            if (lastIndex < text.length) {
                const lastVerseNum = verses.length > 0 ? parseInt(verses[verses.length - 1].verse) + 1 : 1;
                verses.push({
                    verse: lastVerseNum.toString(),
                    text: text.substring(lastIndex).trim()
                });
            }
            
            // If parsing failed, display as-is
            if (verses.length === 0) {
                const verseElement = document.createElement('div');
                verseElement.className = 'bible-verse';
                verseElement.style.whiteSpace = 'pre-wrap';
                verseElement.textContent = text;
                versesContainer.appendChild(verseElement);
            } else {
                // Display parsed verses
                verses.forEach(verse => {
                    if (!verse.text) return; // Skip empty verses
                    
                    const verseElement = document.createElement('div');
                    verseElement.className = 'bible-verse';
                    
                    // Check if this verse should be highlighted
                    const verseNum = parseInt(verse.verse);
                    if (highlightVerse && verseNum === highlightVerse) {
                        verseElement.classList.add('highlighted-verse');
                    }
                    
                    // Create verse number
                    const verseNumber = document.createElement('span');
                    verseNumber.className = 'verse-number';
                    verseNumber.textContent = verse.verse;
                    
                    // Create verse text
                    const verseText = document.createElement('span');
                    verseText.textContent = ` ${verse.text}`;
                    
                    verseElement.appendChild(verseNumber);
                    verseElement.appendChild(verseText);
                    versesContainer.appendChild(verseElement);
                });
            }
        } else {
            throw new Error('Invalid API response format');
        }
        
        // Add reference information
        if (data.reference) {
            const referenceDiv = document.createElement('div');
            referenceDiv.style.textAlign = 'center';
            referenceDiv.style.marginTop = '20px';
            referenceDiv.style.padding = '15px';
            referenceDiv.style.background = '#f8f9fa';
            referenceDiv.style.borderRadius = '8px';
            referenceDiv.style.fontSize = '0.9rem';
            referenceDiv.style.color = '#666';
            referenceDiv.textContent = `${data.reference} (${data.translation_name || 'NIV'})`;
            versesContainer.appendChild(referenceDiv);
        }
        
        bibleContent.innerHTML = '';
        bibleContent.appendChild(versesContainer);
        
        // Scroll to highlighted verse if present
        if (highlightVerse) {
            const highlightedVerse = versesContainer.querySelector('.highlighted-verse');
            if (highlightedVerse) {
                setTimeout(() => {
                    highlightedVerse.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
            }
        }
        
    } catch (error) {
        console.error('Error loading chapter:', error);
        errorMsg.textContent = 'Error loading chapter. Please try again.';
        errorMsg.style.display = 'block';
        bibleContent.innerHTML = '<div class="loading">Error loading chapter. Please try again.</div>';
    }
}

// Update URL without reloading
function updateURL() {
    const newURL = `bible.html?book=${encodeURIComponent(currentBook)}&chapter=${currentChapter}${highlightVerse ? `&verse=${highlightVerse}` : ''}`;
    window.history.pushState({ book: currentBook, chapter: currentChapter, verse: highlightVerse }, '', newURL);
}

