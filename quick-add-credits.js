// Quick Add Credits page (no login required, token-based)
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://frlajamhyyectdrcbrnd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybGFqYW1oeXllY3RkcmNicm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4ODA4ODksImV4cCI6MjA4MjQ1Njg4OX0.QAH0GME5_iYkz6SZjfqdL3q9E9Jo1qKv6YWFk2exAtY';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let adminUid = null;
let adminInfo = null;

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    validateToken();
});

async function validateToken() {
    // Get token from URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    if (!token) {
        showInvalidToken();
        return;
    }
    
    try {
        // Validate token
        const { data: linkData, error: linkError } = await supabase
            .from('Admin_Links')
            .select('link_id, admin_uid, is_active, last_used_at, usage_count')
            .eq('access_token', token)
            .eq('is_active', true)
            .single();
        
        if (linkError || !linkData) {
            showInvalidToken();
            return;
        }
        
        adminUid = linkData.admin_uid;
        
        // Get admin info
        const { data: adminData, error: adminError } = await supabase
            .from('Users')
            .select('UID, First_Name, Last_Name, Username, user_type')
            .eq('UID', adminUid)
            .eq('user_type', 'admin')
            .single();
        
        if (adminError || !adminData) {
            showInvalidToken();
            return;
        }
        
        adminInfo = adminData;
        
        // Update link usage
        await supabase
            .from('Admin_Links')
            .update({
                last_used_at: new Date().toISOString(),
                usage_count: linkData.usage_count + 1
            })
            .eq('link_id', linkData.link_id);
        
        // Show admin name
        const displayName = (adminData.First_Name && adminData.Last_Name)
            ? `${adminData.First_Name} ${adminData.Last_Name}`
            : adminData.Username;
        document.getElementById('adminName').textContent = `Logged in as: ${displayName}`;
        
        // Show content
        document.getElementById('tokenCheck').classList.add('hidden');
        document.getElementById('mainContent').classList.remove('hidden');
        
        await loadStandardUsers();
        setupEventListeners();
        
    } catch (error) {
        console.error('Error validating token:', error);
        showInvalidToken();
    }
}

function showInvalidToken() {
    document.getElementById('tokenCheck').classList.add('hidden');
    document.getElementById('invalidToken').classList.remove('hidden');
}

async function loadStandardUsers() {
    const userCheckboxList = document.getElementById('userCheckboxList');
    
    try {
        const { data: users, error } = await supabase
            .from('Users')
            .select('UID, First_Name, Last_Name, Username')
            .eq('user_type', 'standard')
            .order('First_Name', { ascending: true });
        
        if (error) throw error;
        
        if (!users || users.length === 0) {
            userCheckboxList.innerHTML = '<p style="text-align: center; color: #999;">No standard users found.</p>';
            return;
        }
        
        userCheckboxList.innerHTML = '';
        
        users.forEach(user => {
            const displayName = (user.First_Name && user.Last_Name) 
                ? `${user.First_Name} ${user.Last_Name}` 
                : user.Username;
            
            const checkboxItem = document.createElement('div');
            checkboxItem.className = 'user-checkbox-item';
            checkboxItem.innerHTML = `
                <input type="checkbox" id="user_${user.UID}" value="${user.UID}" data-name="${displayName}">
                <label for="user_${user.UID}" style="cursor: pointer; flex: 1;">${displayName} (${user.Username})</label>
            `;
            userCheckboxList.appendChild(checkboxItem);
        });
    } catch (error) {
        console.error('Error loading users:', error);
        userCheckboxList.innerHTML = '<p style="text-align: center; color: #dc3545;">Error loading users.</p>';
    }
}

function setupEventListeners() {
    const selectAllBtn = document.getElementById('selectAllBtn');
    const deselectAllBtn = document.getElementById('deselectAllBtn');
    const addCreditsBtn = document.getElementById('addCreditsBtn');
    
    selectAllBtn.addEventListener('click', () => {
        document.querySelectorAll('#userCheckboxList input[type="checkbox"]').forEach(cb => {
            cb.checked = true;
        });
    });
    
    deselectAllBtn.addEventListener('click', () => {
        document.querySelectorAll('#userCheckboxList input[type="checkbox"]').forEach(cb => {
            cb.checked = false;
        });
    });
    
    addCreditsBtn.addEventListener('click', async () => {
        await addCredits();
    });
}

async function addCredits() {
    const creditAmount = parseInt(document.getElementById('creditAmount').value);
    const selectedUsers = Array.from(document.querySelectorAll('#userCheckboxList input[type="checkbox"]:checked'));
    
    if (!creditAmount || creditAmount < 1) {
        showError('Please enter a valid credit amount (minimum 1).');
        return;
    }
    
    if (selectedUsers.length === 0) {
        showError('Please select at least one user.');
        return;
    }
    
    if (!adminUid) {
        showError('Invalid admin access.');
        return;
    }
    
    const addCreditsBtn = document.getElementById('addCreditsBtn');
    addCreditsBtn.disabled = true;
    addCreditsBtn.textContent = 'Adding Credits...';
    
    try {
        const userIds = selectedUsers.map(cb => parseInt(cb.value));
        const userNames = selectedUsers.map(cb => cb.dataset.name);
        
        // Process each user
        for (let i = 0; i < userIds.length; i++) {
            const userId = userIds[i];
            
            // Get or create credit record
            const { data: existingCredit, error: fetchError } = await supabase
                .from('User_Credits')
                .select('credit_id, balance')
                .eq('user_uid', userId)
                .single();
            
            if (fetchError && fetchError.code !== 'PGRST116') {
                throw fetchError;
            }
            
            const newBalance = (existingCredit?.balance || 0) + creditAmount;
            
            if (existingCredit) {
                // Update existing balance
                const { error: updateError } = await supabase
                    .from('User_Credits')
                    .update({ balance: newBalance, updated_at: new Date().toISOString() })
                    .eq('credit_id', existingCredit.credit_id);
                
                if (updateError) throw updateError;
            } else {
                // Create new credit record
                const { error: insertError } = await supabase
                    .from('User_Credits')
                    .insert({ user_uid: userId, balance: creditAmount });
                
                if (insertError) throw insertError;
            }
            
            // Record transaction
            const { error: transError } = await supabase
                .from('Credit_Transactions')
                .insert({
                    from_user_uid: adminUid,
                    to_user_uid: userId,
                    amount: creditAmount,
                    transaction_type: 'credit_added',
                    description: `Admin added ${creditAmount} credits (Quick Access)`
                });
            
            if (transError) throw transError;
        }
        
        showSuccess(`Successfully added ${creditAmount} credits to ${userNames.length} user(s): ${userNames.join(', ')}`);
        
        // Reset form
        document.getElementById('creditAmount').value = 10;
        document.querySelectorAll('#userCheckboxList input[type="checkbox"]').forEach(cb => {
            cb.checked = false;
        });
        
    } catch (error) {
        console.error('Error adding credits:', error);
        showError('An error occurred while adding credits. Please try again.');
    } finally {
        addCreditsBtn.disabled = false;
        addCreditsBtn.textContent = 'Add Credits';
    }
}

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

