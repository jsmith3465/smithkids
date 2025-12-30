// Settings page for admins - Integrated with User Management

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

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const checkAuth = setInterval(() => {
            if (window.authStatus) {
                clearInterval(checkAuth);
                if (window.authStatus.isAuthenticated) {
                    checkAdminAccess();
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

async function checkAdminAccess() {
    const session = window.authStatus?.getSession();
    if (!session) {
        window.location.href = getPagePath('login.html');
        return;
    }
    
    // Show main content (both admin and standard users can access settings)
    document.getElementById('authCheck').classList.add('hidden');
    document.getElementById('mainContent').classList.remove('hidden');
    
    // Hide admin-only tabs for standard users
    if (session.userType !== 'admin') {
        document.getElementById('passwordTabBtn').style.display = 'none';
        document.getElementById('generalTabBtn').style.display = 'block'; // Change Password is visible to all
        document.getElementById('usersTabBtn').style.display = 'none';
        document.getElementById('memoryTabBtn').style.display = 'none';
    }
    
    // Initialize tabs
    initializeTabs();
    
    // Load current settings (only for admins)
    if (session.userType === 'admin') {
        await loadSettings();
        // Load users for User Management tab
        await loadAllUsers();
        
        // Add save button listeners for admin settings
        document.getElementById('saveCodeBtn').addEventListener('click', async () => {
            await saveCode();
        });
        
        document.getElementById('saveLaunchTimeBtn').addEventListener('click', async () => {
            await saveLaunchTime();
        });
        
        // Add user management listeners
        setupUserManagementListeners();
        
        // Add memory verse listeners
        document.getElementById('saveMemoryVerseBtn').addEventListener('click', async () => {
            await saveMemoryVerse();
        });
        
        // Set General Settings as default active tab for admin
        switchTab('password');
    } else {
        // Set Change Password as default active tab for standard users
        switchTab('general');
    }
    
    // Add password change listener (for all users)
    document.getElementById('savePasswordBtn').addEventListener('click', async () => {
        await changePassword();
    });
}

// Tab Management
function initializeTabs() {
    const tabs = document.querySelectorAll('.settings-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');
            switchTab(targetTab);
        });
    });
}

function switchTab(tabName) {
    // Remove active class from all tabs and content
    document.querySelectorAll('.settings-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    
    // Add active class to selected tab and content
    const selectedTab = document.querySelector(`[data-tab="${tabName}"]`);
    const selectedContent = document.getElementById(`${tabName}Tab`);
    
    if (selectedTab) selectedTab.classList.add('active');
    if (selectedContent) selectedContent.classList.add('active');
    
    // Load data for the selected tab if needed
    if (tabName === 'users') {
        loadAllUsers();
    } else if (tabName === 'memory') {
        loadMemoryVerses();
        initializeMemoryVerseForm();
        
        // Add modal button listeners
        setupMemoryVerseModal();
    } else if (tabName === 'password') {
        // General Settings tab - load settings if admin
        const session = window.authStatus?.getSession();
        if (session && session.userType === 'admin') {
            loadSettings();
        }
    }
}

// General Settings Functions
async function loadSettings() {
    const session = window.authStatus?.getSession();
    if (!session) return;
    
    try {
        const { data: settings, error } = await supabase
            .from('Admin_Settings')
            .select('checklist_code, launch_time')
            .eq('admin_uid', session.uid)
            .single();
        
        if (error && error.code !== 'PGRST116') {
            console.error('Error loading settings:', error);
            return;
        }
        
        if (settings) {
            if (settings.checklist_code) {
                // Don't show the actual code, just indicate one is set
                document.getElementById('checklistCode').placeholder = 'Pin code is set (enter new pin code to change)';
            }
            
            if (settings.launch_time) {
                document.getElementById('launchTimeSetting').value = settings.launch_time;
            } else {
                document.getElementById('launchTimeSetting').value = '0700';
            }
        } else {
            document.getElementById('launchTimeSetting').value = '0700';
        }
    } catch (error) {
        console.error('Error loading settings:', error);
    }
}

async function saveCode() {
    const session = window.authStatus?.getSession();
    if (!session) return;
    
    const newCode = document.getElementById('checklistCode').value.trim();
    const confirmCode = document.getElementById('confirmCode').value.trim();
    
    // Clear messages
    hideMessage('successMessage');
    hideMessage('errorMessage');
    
    // If code is provided, validate it
    if (newCode) {
        // Check if it's all digits
        if (!/^\d+$/.test(newCode)) {
            showError('Pin code must contain only digits (0-9).');
            return;
        }
        
        // Check length (4-8 digits)
        if (newCode.length < 4 || newCode.length > 8) {
            showError('Pin code must be between 4 and 8 digits.');
            return;
        }
        
        if (newCode !== confirmCode) {
            showError('Pin codes do not match. Please try again.');
            return;
        }
    }
    
    try {
        // Check if settings exist
        const { data: existing, error: checkError } = await supabase
            .from('Admin_Settings')
            .select('setting_id')
            .eq('admin_uid', session.uid)
            .single();
        
        if (checkError && checkError.code !== 'PGRST116') {
            throw checkError;
        }
        
        if (existing) {
            // Update existing settings
            const updateData = {
                updated_at: new Date().toISOString()
            };
            
            if (newCode) {
                updateData.checklist_code = newCode;
            }
            
            const { error: updateError } = await supabase
                .from('Admin_Settings')
                .update(updateData)
                .eq('setting_id', existing.setting_id);
            
            if (updateError) throw updateError;
        } else {
            // Create new settings
            if (!newCode) {
                showError('Please enter a pin code to set.');
                return;
            }
            
            const { error: insertError } = await supabase
                .from('Admin_Settings')
                .insert({
                    admin_uid: session.uid,
                    checklist_code: newCode,
                    launch_time: '0700' // Default launch time
                });
            
            if (insertError) throw insertError;
        }
        
        // Clear inputs
        document.getElementById('checklistCode').value = '';
        document.getElementById('confirmCode').value = '';
        
        if (newCode) {
            showSuccess('Pin code saved successfully!');
            document.getElementById('checklistCode').placeholder = 'Pin code is set (enter new pin code to change)';
        } else {
            showSuccess('Settings updated successfully!');
        }
        
    } catch (error) {
        console.error('Error saving pin code:', error);
        const errorMessage = error.message || error.details || 'Unknown error';
        showError(`Error saving pin code: ${errorMessage}. Please try again.`);
    }
}

async function saveLaunchTime() {
    const session = window.authStatus?.getSession();
    if (!session) return;
    
    const newLaunchTime = document.getElementById('launchTimeSetting').value.trim();
    
    // Clear messages
    hideMessage('successMessage');
    hideMessage('errorMessage');
    
    if (!newLaunchTime || !/^\d{4}$/.test(newLaunchTime)) {
        showError('Please enter a valid time in military format (HHMM, e.g., 0700).');
        return;
    }
    
    const hours = parseInt(newLaunchTime.substring(0, 2));
    const minutes = parseInt(newLaunchTime.substring(2, 4));
    
    if (hours > 23 || minutes > 59) {
        showError('Invalid time. Hours must be 00-23 and minutes must be 00-59.');
        return;
    }
    
    try {
        // Check if settings exist
        const { data: existing, error: checkError } = await supabase
            .from('Admin_Settings')
            .select('setting_id')
            .eq('admin_uid', session.uid)
            .single();
        
        if (checkError && checkError.code !== 'PGRST116') {
            throw checkError;
        }
        
        if (existing) {
            // Update existing settings
            const { error: updateError } = await supabase
                .from('Admin_Settings')
                .update({
                    launch_time: newLaunchTime,
                    updated_at: new Date().toISOString()
                })
                .eq('setting_id', existing.setting_id);
            
            if (updateError) throw updateError;
        } else {
            // Create new settings with default code (user must set code first)
            showError('Please set your pin code first.');
            return;
        }
        
        showSuccess('Launch time saved successfully!');
        
    } catch (error) {
        console.error('Error saving launch time:', error);
        showError('Error saving launch time. Please try again.');
    }
}

// User Management Functions
function setupUserManagementListeners() {
    const addUserBtn = document.getElementById('addUserBtn');
    if (addUserBtn) {
        addUserBtn.addEventListener('click', async () => {
            await addUser();
        });
    }
}

async function loadAllUsers() {
    const usersList = document.getElementById('usersList');
    if (!usersList) return;
    
    try {
        const { data: users, error } = await supabase
            .from('Users')
            .select('UID, Username, First_Name, Last_Name, user_type, is_suspended')
            .order('First_Name', { ascending: true });
        
        if (error) throw error;
        
        if (!users || users.length === 0) {
            usersList.innerHTML = '<div class="no-users">No users found.</div>';
            return;
        }
        
        // Build table
        const table = document.createElement('table');
        table.className = 'users-table';
        
        // Header
        const headerRow = document.createElement('tr');
        headerRow.innerHTML = `
            <th>Name</th>
            <th>Username</th>
            <th>Type</th>
            <th>Status</th>
            <th>Actions</th>
        `;
        table.appendChild(headerRow);
        
        // User rows
        users.forEach(user => {
            const displayName = (user.First_Name && user.Last_Name) 
                ? `${user.First_Name} ${user.Last_Name}` 
                : user.Username;
            
            const statusClass = user.is_suspended ? 'suspended' : 'active';
            const statusText = user.is_suspended ? 'Suspended' : 'Active';
            
            const row = document.createElement('tr');
            row.id = `userRow_${user.UID}`;
            const isStandard = user.user_type === 'standard';
            row.innerHTML = `
                <td>${displayName}</td>
                <td>${user.Username}</td>
                <td>${user.user_type || 'standard'}</td>
                <td class="${statusClass}">${statusText}</td>
                <td>
                    <div class="action-buttons">
                        ${isStandard ? (
                            user.is_suspended ? 
                                `<button class="btn btn-primary btn-small" onclick="suspendUser(${user.UID})">Unsuspend</button>` :
                                `<button class="btn btn-secondary btn-small" onclick="suspendUser(${user.UID})">Suspend</button>`
                        ) : ''}
                        ${isStandard ? 
                            `<button class="btn btn-danger btn-small" onclick="deleteUser(${user.UID}, '${user.Username.replace(/'/g, "\\'")}')">Delete</button>` :
                            ''
                        }
                    </div>
                </td>
            `;
            table.appendChild(row);
        });
        
        usersList.innerHTML = '';
        usersList.appendChild(table);
        
    } catch (error) {
        console.error('Error loading users:', error);
        const usersList = document.getElementById('usersList');
        if (usersList) {
            usersList.innerHTML = '<div class="no-users">Error loading users. Please try again.</div>';
        }
    }
}

async function addUser() {
    const username = document.getElementById('newUsername').value.trim();
    const password = document.getElementById('newPassword').value;
    const firstName = document.getElementById('newFirstName').value.trim();
    const lastName = document.getElementById('newLastName').value.trim();
    const userType = document.getElementById('newUserType').value;
    
    if (!username || !password) {
        showError('Username and password are required.');
        return;
    }
    
    const addUserBtn = document.getElementById('addUserBtn');
    addUserBtn.disabled = true;
    addUserBtn.textContent = 'Adding User...';
    
    try {
        // Check if username already exists
        const { data: existingUser, error: checkError } = await supabase
            .from('Users')
            .select('UID')
            .eq('Username', username)
            .maybeSingle();
        
        if (checkError && checkError.code !== 'PGRST116') {
            throw checkError;
        }
        
        if (existingUser) {
            showError('Username already exists. Please choose a different username.');
            return;
        }
        
        // Add new user
        const { data: newUser, error: insertError } = await supabase
            .from('Users')
            .insert({
                Username: username,
                Password: password, // Note: In production, this should be hashed
                First_Name: firstName || '',
                Last_Name: lastName || '',
                user_type: userType,
                is_suspended: false
            })
            .select('UID')
            .single();
        
        if (insertError) {
            console.error('Insert error details:', insertError);
            throw insertError;
        }
        
        showSuccess(`User "${username}" added successfully!`);
        
        // Clear form
        document.getElementById('newUsername').value = '';
        document.getElementById('newPassword').value = '';
        document.getElementById('newFirstName').value = '';
        document.getElementById('newLastName').value = '';
        document.getElementById('newUserType').value = 'standard';
        
        // Reload users list
        await loadAllUsers();
        
    } catch (error) {
        console.error('Error adding user:', error);
        const errorMessage = error.message || 'An error occurred while adding user. Please try again.';
        showError(errorMessage);
    } finally {
        addUserBtn.disabled = false;
        addUserBtn.textContent = 'Add User';
    }
}

// Make functions available globally for onclick handlers
window.suspendUser = async function(userId) {
    try {
        // First check current status
        const { data: user, error: fetchError } = await supabase
            .from('Users')
            .select('is_suspended, Username')
            .eq('UID', userId)
            .single();
        
        if (fetchError) throw fetchError;
        
        const isSuspended = user.is_suspended;
        const action = isSuspended ? 'unsuspend' : 'suspend';
        
        if (!isSuspended && !confirm(`Are you sure you want to suspend user "${user.Username}"? They will not be able to log in until unsuspended.`)) {
            return;
        }
        
        const { error } = await supabase
            .from('Users')
            .update({ is_suspended: !isSuspended })
            .eq('UID', userId);
        
        if (error) throw error;
        
        showSuccess(`User ${action === 'suspend' ? 'suspended' : 'unsuspended'} successfully.`);
        await loadAllUsers();
        
    } catch (error) {
        console.error('Error toggling user suspension:', error);
        showError('An error occurred. Please try again.');
    }
};

window.deleteUser = async function(userId, username) {
    if (!confirm(`Are you sure you want to delete user "${username}"? This action cannot be undone and will delete all associated data.`)) {
        return;
    }
    
    if (!confirm('This will permanently delete the user and all their data. Are you absolutely sure?')) {
        return;
    }
    
    try {
        const { error } = await supabase
            .from('Users')
            .delete()
            .eq('UID', userId);
        
        if (error) throw error;
        
        showSuccess(`User "${username}" deleted successfully.`);
        await loadAllUsers();
        
    } catch (error) {
        console.error('Error deleting user:', error);
        showError('An error occurred while deleting user. Please try again.');
    }
};

// Password Change Function
async function changePassword() {
    const session = window.authStatus?.getSession();
    if (!session) {
        showError('Session expired. Please log in again.');
        return;
    }
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmNewPassword = document.getElementById('confirmNewPassword').value;
    
    // Validation
    if (!currentPassword || !newPassword || !confirmNewPassword) {
        showError('All fields are required.');
        return;
    }
    
    if (newPassword !== confirmNewPassword) {
        showError('New passwords do not match.');
        return;
    }
    
    if (newPassword.length < 4) {
        showError('New password must be at least 4 characters long.');
        return;
    }
    
    const savePasswordBtn = document.getElementById('savePasswordBtn');
    savePasswordBtn.disabled = true;
    savePasswordBtn.textContent = 'Changing Password...';
    
    try {
        // Verify current password
        const { data: user, error: fetchError } = await supabase
            .from('Users')
            .select('Password')
            .eq('UID', session.uid)
            .single();
        
        if (fetchError) throw fetchError;
        
        if (user.Password !== currentPassword) {
            showError('Current password is incorrect.');
            return;
        }
        
        // Update password
        const { error: updateError } = await supabase
            .from('Users')
            .update({ Password: newPassword })
            .eq('UID', session.uid);
        
        if (updateError) throw updateError;
        
        showSuccess('Password changed successfully!');
        
        // Clear form
        document.getElementById('currentPassword').value = '';
        document.getElementById('newPassword').value = '';
        document.getElementById('confirmNewPassword').value = '';
        
    } catch (error) {
        console.error('Error changing password:', error);
        showError('An error occurred while changing password. Please try again.');
    } finally {
        savePasswordBtn.disabled = false;
        savePasswordBtn.textContent = 'Change Password';
    }
}

// Message Functions
function showSuccess(message) {
    const successMsg = document.getElementById('successMessage');
    successMsg.textContent = message;
    successMsg.style.display = 'block';
    setTimeout(() => hideMessage('successMessage'), 5000);
}

function showError(message) {
    const errorMsg = document.getElementById('errorMessage');
    errorMsg.textContent = message;
    errorMsg.style.display = 'block';
}

function hideMessage(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = 'none';
    }
}

// Bible books list (same as in bible.js)
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

// Chapter counts for each book
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

// Initialize Memory Verse Form
function initializeMemoryVerseForm() {
    const startBookSelect = document.getElementById('startBook');
    const endBookSelect = document.getElementById('endBook');
    const yearSelect = document.getElementById('memoryVerseYear');
    
    // Populate year dropdown (current year and next 5 years)
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < 6; i++) {
        const year = currentYear + i;
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }
    
    // Populate book dropdowns
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
        updateEndVerse();
    });
    
    // When starting chapter changes, update ending chapter and verse
    document.getElementById('startChapter').addEventListener('change', updateEndVerse);
    
    // When starting verse changes, update ending verse
    document.getElementById('startVerse').addEventListener('change', updateEndVerse);
}

function updateEndVerse() {
    const startBook = document.getElementById('startBook').value;
    const startChapter = parseInt(document.getElementById('startChapter').value);
    const startVerse = parseInt(document.getElementById('startVerse').value);
    const endBookSelect = document.getElementById('endBook');
    const endChapter = document.getElementById('endChapter');
    const endVerse = document.getElementById('endVerse');
    
    if (startBook && startChapter && startVerse) {
        // Set ending book to same as starting book
        endBookSelect.value = startBook;
        
        // Set ending chapter to same as starting chapter
        endChapter.value = startChapter;
        
        // Set ending verse to starting verse + 1
        endVerse.value = startVerse + 1;
    }
}

// Load Memory Verses
async function loadMemoryVerses() {
    const memoryVersesList = document.getElementById('memoryVersesList');
    
    try {
        const { data: verses, error } = await supabase
            .from('Monthly_Memory_Verses')
            .select('*')
            .order('month_year', { ascending: false });
        
        if (error) throw error;
        
        if (!verses || verses.length === 0) {
            memoryVersesList.innerHTML = '<div class="no-users">No memory verses set yet.</div>';
            return;
        }
        
        let html = '<table class="users-table" style="margin-top: 0;"><thead><tr>';
        html += '<th>Month/Year</th><th>Verse Reference</th><th>Actions</th></tr></thead><tbody>';
        
        verses.forEach(verse => {
            const monthYear = new Date(verse.month_year + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
            const reference = verse.start_book === verse.end_book 
                ? `${verse.start_book} ${verse.start_chapter}:${verse.start_verse}${verse.start_verse !== verse.end_verse ? `-${verse.end_verse}` : ''}`
                : `${verse.start_book} ${verse.start_chapter}:${verse.start_verse} - ${verse.end_book} ${verse.end_chapter}:${verse.end_verse}`;
            
            // Parse month_year to populate form when editing (if needed in future)
            const [year, month] = verse.month_year.split('-');
            
            html += `<tr>
                <td>${monthYear}</td>
                <td>${reference}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn btn-small btn-delete" onclick="deleteMemoryVerse('${verse.id}')">Delete</button>
                    </div>
                </td>
            </tr>`;
        });
        
        html += '</tbody></table>';
        memoryVersesList.innerHTML = html;
        
    } catch (error) {
        console.error('Error loading memory verses:', error);
        memoryVersesList.innerHTML = '<div class="no-users">Error loading memory verses.</div>';
    }
}

// Save Memory Verse
async function saveMemoryVerse() {
    const month = document.getElementById('memoryVerseMonth').value;
    const year = document.getElementById('memoryVerseYear').value;
    const startBook = document.getElementById('startBook').value;
    const startChapter = parseInt(document.getElementById('startChapter').value);
    const startVerse = parseInt(document.getElementById('startVerse').value);
    const endBook = document.getElementById('endBook').value;
    const endChapter = parseInt(document.getElementById('endChapter').value);
    const endVerse = parseInt(document.getElementById('endVerse').value);
    
    if (!month || !year || !startBook || !startChapter || !startVerse || !endBook || !endChapter || !endVerse) {
        showError('All fields are required.');
        return;
    }
    
    // Combine month and year into YYYY-MM format
    const monthYear = `${year}-${month}`;
    
    const saveBtn = document.getElementById('saveMemoryVerseBtn');
    saveBtn.disabled = true;
    saveBtn.textContent = 'Saving...';
    
    try {
        // Check if verse already exists for this month
        const { data: existing, error: checkError } = await supabase
            .from('Monthly_Memory_Verses')
            .select('id')
            .eq('month_year', monthYear)
            .maybeSingle();
        
        if (checkError && checkError.code !== 'PGRST116') throw checkError;
        
        if (existing) {
            // Update existing
            const { error: updateError } = await supabase
                .from('Monthly_Memory_Verses')
                .update({
                    start_book: startBook,
                    start_chapter: startChapter,
                    start_verse: startVerse,
                    end_book: endBook,
                    end_chapter: endChapter,
                    end_verse: endVerse
                })
                .eq('id', existing.id);
            
            if (updateError) throw updateError;
            showSuccess('Memory verse updated successfully!');
        } else {
            // Insert new
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
            showSuccess('Memory verse saved successfully!');
        }
        
        // Clear form and hide it
        document.getElementById('memoryVerseMonth').value = '';
        document.getElementById('memoryVerseYear').value = '';
        document.getElementById('startBook').value = '';
        document.getElementById('startChapter').value = '';
        document.getElementById('startVerse').value = '';
        document.getElementById('endBook').value = '';
        document.getElementById('endChapter').value = '';
        document.getElementById('endVerse').value = '';
        
        // Close modal and clear form
        closeMemoryVerseModal();
        
        // Reload list
        await loadMemoryVerses();
        
    } catch (error) {
        console.error('Error saving memory verse:', error);
        console.error('Error details:', {
            message: error.message,
            code: error.code,
            details: error.details,
            hint: error.hint
        });
        
        // Show more specific error message
        let errorMessage = 'Error saving memory verse. ';
        if (error.message) {
            errorMessage += error.message;
        } else if (error.code === 'PGRST116') {
            errorMessage += 'The table may not exist. Please create the Monthly_Memory_Verses table in your database.';
        } else if (error.code === '23505') {
            errorMessage += 'A memory verse already exists for this month.';
        } else if (error.code === '42501') {
            errorMessage += 'Permission denied. Please check your database permissions.';
        } else {
            errorMessage += 'Please check the browser console for details.';
        }
        
        showError(errorMessage);
    } finally {
        saveBtn.disabled = false;
        saveBtn.textContent = 'Add Verse';
    }
}

// Setup Memory Verse Modal
function setupMemoryVerseModal() {
    const showBtn = document.getElementById('showAddMemoryVerseBtn');
    const modal = document.getElementById('addMemoryVerseModal');
    const closeBtn = document.getElementById('closeMemoryVerseModalBtn');
    const cancelBtn = document.getElementById('cancelMemoryVerseBtn');
    
    if (showBtn && modal) {
        showBtn.addEventListener('click', () => {
            modal.style.display = 'flex';
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeMemoryVerseModal);
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeMemoryVerseModal);
    }
    
    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target.id === 'addMemoryVerseModal') {
                closeMemoryVerseModal();
            }
        });
    }
}

// Close Memory Verse Modal
function closeMemoryVerseModal() {
    const modal = document.getElementById('addMemoryVerseModal');
    if (modal) {
        modal.style.display = 'none';
    }
    
    // Clear form
    document.getElementById('memoryVerseMonth').value = '';
    document.getElementById('memoryVerseYear').value = '';
    document.getElementById('startBook').value = '';
    document.getElementById('startChapter').value = '';
    document.getElementById('startVerse').value = '';
    document.getElementById('endBook').value = '';
    document.getElementById('endChapter').value = '';
    document.getElementById('endVerse').value = '';
}

// Delete Memory Verse
window.deleteMemoryVerse = async function(verseId) {
    if (!confirm('Are you sure you want to delete this memory verse?')) {
        return;
    }
    
    try {
        const { error } = await supabase
            .from('Monthly_Memory_Verses')
            .delete()
            .eq('id', verseId);
        
        if (error) throw error;
        
        showSuccess('Memory verse deleted successfully.');
        await loadMemoryVerses();
        
    } catch (error) {
        console.error('Error deleting memory verse:', error);
        showError('Error deleting memory verse. Please try again.');
    }
};
