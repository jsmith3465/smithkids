// Bible reading page
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
                    const authCheck = document.getElementById('authCheck');
                    if (authCheck) {
                        authCheck.innerHTML = '<p>Authentication failed. Redirecting to login...</p>';
                    }
                }
            }
        }, 100);
        
        setTimeout(() => {
            clearInterval(checkAuth);
            if (!window.authStatus) {
                const authCheck = document.getElementById('authCheck');
                if (authCheck) {
                    authCheck.innerHTML = '<p style="color: #dc3545;">Authentication check timed out. Please refresh the page.</p>';
                }
            }
        }, 5000);
    }, 200);
});

function initializeBiblePage() {
    const session = window.authStatus?.getSession();
    if (!session) {
        window.location.href = 'login.html';
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
        // Use Bible Gateway's passage display
        // Format: https://www.biblegateway.com/passage/?search=Book+Chapter&version=NIV
        const bookFormatted = book.replace(/\s+/g, '+');
        const passageUrl = `https://www.biblegateway.com/passage/?search=${bookFormatted}+${chapter}&version=NIV`;
        
        // Create a container with Bible Gateway embed
        // Using their widget/embed which allows reading on the site
        const passageContainer = document.createElement('div');
        passageContainer.style.width = '100%';
        passageContainer.style.minHeight = '600px';
        
        // Create iframe for Bible Gateway passage
        const iframe = document.createElement('iframe');
        iframe.src = passageUrl;
        iframe.style.width = '100%';
        iframe.style.minHeight = '600px';
        iframe.style.border = 'none';
        iframe.style.borderRadius = '10px';
        iframe.allowFullscreen = true;
        iframe.loading = 'lazy';
        
        // Add a link to open in new tab as fallback
        const linkContainer = document.createElement('div');
        linkContainer.style.textAlign = 'center';
        linkContainer.style.marginTop = '15px';
        linkContainer.style.padding = '10px';
        linkContainer.style.background = '#f8f9fa';
        linkContainer.style.borderRadius = '8px';
        
        const externalLink = document.createElement('a');
        externalLink.href = passageUrl;
        externalLink.target = '_blank';
        externalLink.rel = 'noopener noreferrer';
        externalLink.textContent = 'Open in Bible Gateway (opens in new tab)';
        externalLink.style.color = '#CC5500';
        externalLink.style.textDecoration = 'none';
        externalLink.style.fontWeight = '600';
        externalLink.onmouseover = function() { this.style.textDecoration = 'underline'; };
        externalLink.onmouseout = function() { this.style.textDecoration = 'none'; };
        
        linkContainer.appendChild(externalLink);
        
        passageContainer.appendChild(iframe);
        passageContainer.appendChild(linkContainer);
        
        bibleContent.innerHTML = '';
        bibleContent.appendChild(passageContainer);
        
        // Note: Highlighting specific verses in iframe is limited by CORS
        // The iframe will show the full chapter, and users can navigate within it
        
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

