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

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const checkAuth = setInterval(() => {
            if (window.authStatus) {
                clearInterval(checkAuth);
                if (window.authStatus.isAuthenticated) {
                    checkUserAccess();
                } else {
                    window.location.href = getPagePath('login.html');
                }
            }
        }, 100);
        
        setTimeout(() => {
            clearInterval(checkAuth);
            if (!window.authStatus) {
                window.location.href = getPagePath('login.html');
            }
        }, 5000);
    }, 200);
});

// Bible books list
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

async function checkUserAccess() {
    const session = window.authStatus?.getSession();
    if (!session) {
        window.location.href = getPagePath('login.html');
        return;
    }
    
    document.getElementById('authCheck').classList.add('hidden');
    document.getElementById('mainContent').classList.remove('hidden');
    
    await loadMemoryVerse();
    
    await loadMemoryVerse();
}

function initializeModal() {
    // Populate year dropdown
    const yearSelect = document.getElementById('modalYear');
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < 6; i++) {
        const year = currentYear + i;
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }
    
    // Populate book dropdowns
    const startBookSelect = document.getElementById('modalStartBook');
    const endBookSelect = document.getElementById('modalEndBook');
    bibleBooks.forEach(book => {
        const option1 = document.createElement('option');
        option1.value = book;
        option1.textContent = book;
        startBookSelect.appendChild(option1);
        
        const option2 = document.createElement('option');
        option2.value = book;
        option2.textContent = book;
        endBookSelect.appendChild(option2);
    });
    
    // When starting book changes, update ending book
    startBookSelect.addEventListener('change', () => {
        endBookSelect.value = startBookSelect.value;
    });
    
    // Close modal buttons
    document.getElementById('closeModalBtn').addEventListener('click', closeAddVerseModal);
    document.getElementById('cancelModalBtn').addEventListener('click', closeAddVerseModal);
    
    // Add verse button
    document.getElementById('addVerseBtn').addEventListener('click', async () => {
        await addMemoryVerse();
    });
    
    // Close modal when clicking outside
    document.getElementById('addVerseModal').addEventListener('click', (e) => {
        if (e.target.id === 'addVerseModal') {
            closeAddVerseModal();
        }
    });
}

function showAddVerseModal() {
    const modal = document.getElementById('addVerseModal');
    modal.style.display = 'flex';
    
    // Clear form
    document.getElementById('modalMonth').value = '';
    document.getElementById('modalYear').value = '';
    document.getElementById('modalStartBook').value = '';
    document.getElementById('modalStartChapter').value = '';
    document.getElementById('modalStartVerse').value = '';
    document.getElementById('modalEndBook').value = '';
    document.getElementById('modalEndChapter').value = '';
    document.getElementById('modalEndVerse').value = '';
}

function closeAddVerseModal() {
    document.getElementById('addVerseModal').style.display = 'none';
}

async function addMemoryVerse() {
    const month = document.getElementById('modalMonth').value;
    const year = document.getElementById('modalYear').value;
    const startBook = document.getElementById('modalStartBook').value;
    const startChapter = parseInt(document.getElementById('modalStartChapter').value);
    const startVerse = parseInt(document.getElementById('modalStartVerse').value);
    const endBook = document.getElementById('modalEndBook').value;
    const endChapter = parseInt(document.getElementById('modalEndChapter').value);
    const endVerse = parseInt(document.getElementById('modalEndVerse').value);
    
    if (!month || !year || !startBook || !startChapter || !startVerse || !endBook || !endChapter || !endVerse) {
        alert('All fields are required.');
        return;
    }
    
    const monthYear = `${year}-${month}`;
    const addBtn = document.getElementById('addVerseBtn');
    addBtn.disabled = true;
    addBtn.textContent = 'Adding...';
    
    try {
        // Check if verse already exists for this month
        const { data: existing, error: checkError } = await supabase
            .from('Monthly_Memory_Verses')
            .select('id')
            .eq('month_year', monthYear)
            .maybeSingle();
        
        if (checkError && checkError.code !== 'PGRST116') throw checkError;
        
        if (existing) {
            alert('A memory verse already exists for this month. Please update it from the Settings page.');
            addBtn.disabled = false;
            addBtn.textContent = 'Add';
            return;
        }
        
        // Insert new verse
        const { error: insertError } = await supabase
            .from('Monthly_Memory_Verses')
            .insert({
                month_year: monthYear,
                start_book: startBook,
                start_chapter: startChapter,
                start_verse: startVerse,
                end_book: endBook,
                end_chapter: endChapter,
                end_verse: endVerse
            });
        
        if (insertError) throw insertError;
        
        // Close modal and refresh table
        closeAddVerseModal();
        await loadAllMemoryVerses();
        await loadMemoryVerse(); // Also refresh current month display
        
    } catch (error) {
        console.error('Error adding memory verse:', error);
        alert('Error adding memory verse. Please try again.');
    } finally {
        addBtn.disabled = false;
        addBtn.textContent = 'Add';
    }
}

async function loadAllMemoryVerses() {
    const tableContainer = document.getElementById('versesTableContainer');
    
    try {
        const { data: verses, error } = await supabase
            .from('Monthly_Memory_Verses')
            .select('*')
            .order('month_year', { ascending: false });
        
        if (error) throw error;
        
        if (!verses || verses.length === 0) {
            tableContainer.innerHTML = '<div class="no-users">No memory verses set yet.</div>';
            return;
        }
        
        let html = '<table class="users-table" style="margin-top: 0;"><thead><tr>';
        html += '<th>Month/Year</th><th>Verse Reference</th></tr></thead><tbody>';
        
        verses.forEach(verse => {
            const monthYear = new Date(verse.month_year + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
            const reference = verse.start_book === verse.end_book 
                ? `${verse.start_book} ${verse.start_chapter}:${verse.start_verse}${verse.start_verse !== verse.end_verse ? `-${verse.end_verse}` : ''}`
                : `${verse.start_book} ${verse.start_chapter}:${verse.start_verse} - ${verse.end_book} ${verse.end_chapter}:${verse.end_verse}`;
            
            html += `<tr>
                <td>${monthYear}</td>
                <td>${reference}</td>
            </tr>`;
        });
        
        html += '</tbody></table>';
        tableContainer.innerHTML = html;
        
    } catch (error) {
        console.error('Error loading memory verses:', error);
        tableContainer.innerHTML = '<div class="no-users">Error loading memory verses.</div>';
    }
}

async function loadMemoryVerse() {
    const verseContainer = document.getElementById('verseContainer');
    
    try {
        // Get current month/year in YYYY-MM format
        const now = new Date();
        const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
        
        const { data: verse, error } = await supabase
            .from('Monthly_Memory_Verses')
            .select('*')
            .eq('month_year', currentMonth)
            .maybeSingle();
        
        if (error && error.code !== 'PGRST116') throw error;
        
        if (!verse) {
            verseContainer.innerHTML = `
                <div style="padding: 40px; background: #f8f9fa; border-radius: 10px; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #666; margin-bottom: 20px;">No Memory Verse Set</h2>
                    <p style="color: #999;">There is no memory verse set for ${now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}.</p>
                </div>
            `;
            return;
        }
        
        // Format the verse reference
        const reference = verse.start_book === verse.end_book 
            ? `${verse.start_book} ${verse.start_chapter}:${verse.start_verse}${verse.start_verse !== verse.end_verse ? `-${verse.end_verse}` : ''}`
            : `${verse.start_book} ${verse.start_chapter}:${verse.start_verse} - ${verse.end_book} ${verse.end_chapter}:${verse.end_verse}`;
        
        // Check if user has already submitted for this month
        const session = window.authStatus?.getSession();
        const { data: existingSubmission, error: submissionError } = await supabase
            .from('Memory_Verse_Submissions')
            .select('id, status')
            .eq('user_uid', session.uid)
            .eq('month_year', currentMonth)
            .maybeSingle();
        
        if (submissionError && submissionError.code !== 'PGRST116') {
            console.error('Error checking submission:', submissionError);
        }
        
        const hasPendingSubmission = existingSubmission && existingSubmission.status === 'pending';
        const hasApprovedSubmission = existingSubmission && existingSubmission.status === 'approved';
        
        verseContainer.innerHTML = `
            <div style="padding: 40px; background: #f8f9fa; border-radius: 10px; max-width: 800px; margin: 0 auto;">
                <h2 style="color: #CC5500; margin-bottom: 20px; font-size: 2rem;">
                    ${now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} Memory Verse
                </h2>
                
                <div style="background: white; padding: 30px; border-radius: 10px; margin-bottom: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <div style="font-size: 1.5rem; font-weight: 700; color: #333; margin-bottom: 20px;">
                        ${reference}
                    </div>
                    <p style="color: #666; font-size: 1.1rem; line-height: 1.6;">
                        Memorize this verse and click the button below when you're ready to recite it!
                    </p>
                </div>
                
                ${hasApprovedSubmission ? `
                    <div style="background: #d4edda; border: 2px solid #28a745; color: #155724; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                        <h3 style="margin: 0 0 10px 0;">✅ Approved!</h3>
                        <p style="margin: 0;">You have successfully memorized this verse and received 50 credits!</p>
                    </div>
                ` : hasPendingSubmission ? `
                    <div style="background: #fff3cd; border: 2px solid #ffc107; color: #856404; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                        <h3 style="margin: 0 0 10px 0;">⏳ Pending Approval</h3>
                        <p style="margin: 0;">Your submission is waiting for admin approval. Once approved, you'll receive 50 credits!</p>
                    </div>
                    <button id="memorizedBtn" class="btn btn-primary" style="width: 100%; padding: 15px; font-size: 1.2rem; max-width: 400px; margin: 0 auto; display: block;" disabled>
                        I have it memorized! (50 credits) - Already Submitted
                    </button>
                ` : `
                    <button id="memorizedBtn" class="btn btn-primary" style="width: 100%; padding: 15px; font-size: 1.2rem; max-width: 400px; margin: 0 auto; display: block;">
                        I have it memorized! (50 credits)
                    </button>
                `}
            </div>
        `;
        
        // Add event listener for the button if it's not disabled
        if (!hasPendingSubmission && !hasApprovedSubmission) {
            document.getElementById('memorizedBtn').addEventListener('click', async () => {
                await submitMemoryVerse(currentMonth, verse.id);
            });
        }
        
    } catch (error) {
        console.error('Error loading memory verse:', error);
        verseContainer.innerHTML = `
            <div style="padding: 40px; background: #f8d7da; border: 2px solid #dc3545; color: #721c24; border-radius: 10px; max-width: 600px; margin: 0 auto;">
                <h2 style="margin-bottom: 20px;">Error</h2>
                <p>An error occurred while loading the memory verse. Please try again later.</p>
            </div>
        `;
    }
}

async function submitMemoryVerse(monthYear, verseId) {
    const session = window.authStatus?.getSession();
    if (!session) return;
    
    const btn = document.getElementById('memorizedBtn');
    btn.disabled = true;
    btn.textContent = 'Submitting...';
    
    try {
        // Create submission
        const { data: submissionData, error: insertError } = await supabase
            .from('Memory_Verse_Submissions')
            .insert({
                user_uid: session.uid,
                month_year: monthYear,
                verse_id: verseId,
                status: 'pending',
                submitted_at: new Date().toISOString()
            })
            .select('id')
            .single();
        
        if (insertError) throw insertError;
        
        // Create unified approval entry
        const { error: approvalError } = await supabase
            .from('unified_approvals')
            .insert({
                approval_type: 'memory_verse',
                source_id: submissionData.id,
                user_uid: session.uid,
                credits_amount: 50,
                status: 'pending',
                description: 'Memory Verse Submission'
            });
        
        if (approvalError) {
            console.error('Error creating unified approval:', approvalError);
            // Don't fail the submission if approval creation fails
        }
        
        // Reload the page to show pending status
        await loadMemoryVerse();
        
        // Show success message
        const verseContainer = document.getElementById('verseContainer');
        const successMsg = document.createElement('div');
        successMsg.style.cssText = 'background: #d4edda; border: 2px solid #28a745; color: #155724; padding: 15px; border-radius: 10px; margin-bottom: 20px; text-align: center;';
        successMsg.textContent = '✅ Submission successful! Your request is pending admin approval.';
        verseContainer.insertBefore(successMsg, verseContainer.firstChild);
        
        setTimeout(() => {
            successMsg.remove();
        }, 5000);
        
    } catch (error) {
        console.error('Error submitting memory verse:', error);
        alert('Error submitting memory verse. Please try again.');
        btn.disabled = false;
        btn.textContent = 'I have it memorized! (50 credits)';
    }
}

