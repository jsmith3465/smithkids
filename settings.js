// Settings page for admins - Integrated with User Management
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
        window.location.href = 'login.html';
        return;
    }
    
    if (session.userType !== 'admin') {
        alert('Admin access required.');
        window.location.href = 'index.html';
        return;
    }
    
    // Show main content
    document.getElementById('authCheck').classList.add('hidden');
    document.getElementById('mainContent').classList.remove('hidden');
    
    // Initialize tabs
    initializeTabs();
    
    // Load current settings
    await loadSettings();
    
    // Load users for User Management tab
    await loadAllUsers();
    
    // Add save button listeners
    document.getElementById('saveCodeBtn').addEventListener('click', async () => {
        await saveCode();
    });
    
    document.getElementById('saveLaunchTimeBtn').addEventListener('click', async () => {
        await saveLaunchTime();
    });
    
    // Add user management listeners
    setupUserManagementListeners();
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
