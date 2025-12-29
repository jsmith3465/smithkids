// User Management page for admins
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
        document.getElementById('adminCheck').innerHTML = '<p style="color: #dc3545;">Access denied. Admin privileges required.</p>';
        return;
    }
    
    document.getElementById('authCheck').classList.add('hidden');
    document.getElementById('adminCheck').classList.add('hidden');
    document.getElementById('adminContent').classList.remove('hidden');
    
    await loadAllUsers();
    setupEventListeners();
}

async function loadAllUsers() {
    const usersList = document.getElementById('usersList');
    
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
                                `<button class="btn btn-primary btn-small" onclick="unsuspendUser(${user.UID})">Unsuspend</button>` :
                                `<button class="btn btn-secondary btn-small" onclick="suspendUser(${user.UID})">Suspend</button>`
                        ) : ''}
                        ${isStandard ? 
                            `<button class="btn btn-danger btn-small" onclick="deleteUser(${user.UID}, '${user.Username}')">Delete</button>` :
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
        usersList.innerHTML = '<div class="no-users">Error loading users. Please try again.</div>';
    }
}

function setupEventListeners() {
    const addUserBtn = document.getElementById('addUserBtn');
    if (addUserBtn) {
        addUserBtn.addEventListener('click', async () => {
            await addUser();
        });
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

// Make functions available globally
window.suspendUser = async function(userId) {
    if (!confirm('Are you sure you want to suspend this user? They will not be able to log in until unsuspended.')) {
        return;
    }
    
    try {
        const { error } = await supabase
            .from('Users')
            .update({ is_suspended: true })
            .eq('UID', userId);
        
        if (error) throw error;
        
        showSuccess('User suspended successfully.');
        await loadAllUsers();
        
    } catch (error) {
        console.error('Error suspending user:', error);
        showError('An error occurred while suspending user. Please try again.');
    }
};

window.unsuspendUser = async function(userId) {
    try {
        const { error } = await supabase
            .from('Users')
            .update({ is_suspended: false })
            .eq('UID', userId);
        
        if (error) throw error;
        
        showSuccess('User unsuspended successfully.');
        await loadAllUsers();
        
    } catch (error) {
        console.error('Error unsuspending user:', error);
        showError('An error occurred while unsuspending user. Please try again.');
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

function showSuccess(message) {
    const successMsg = document.getElementById('successMessage');
    successMsg.textContent = message;
    successMsg.style.display = 'block';
    document.getElementById('errorMessage').style.display = 'none';
    
    setTimeout(() => {
        successMsg.style.display = 'none';
    }, 5000);
}

function showError(message) {
    const errorMsg = document.getElementById('errorMessage');
    errorMsg.textContent = message;
    errorMsg.style.display = 'block';
    document.getElementById('successMessage').style.display = 'none';
}

