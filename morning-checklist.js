// Morning Checklist page for admins
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
    
    // Set today's date as default
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('checklistDate').value = today;
    
    // Load checklists
    await loadChecklists(today);
    
    // Add date change listener
    document.getElementById('checklistDate').addEventListener('change', async (e) => {
        await loadChecklists(e.target.value);
    });
    
    // Add post changes button listener
    document.getElementById('postChangesBtn').addEventListener('click', () => {
        showCodeModal();
    });
    
    // Add code modal listeners
    document.getElementById('submitCodeBtn').addEventListener('click', async () => {
        await submitCode();
    });
    
    document.getElementById('cancelCodeBtn').addEventListener('click', () => {
        hideCodeModal();
    });
    
    // Allow Enter key to submit code
    document.getElementById('adminCodeInput').addEventListener('keypress', async (e) => {
        if (e.key === 'Enter') {
            await submitCode();
        }
    });
}

// Store pending changes
let pendingChanges = {};

// Handle checklist changes (store locally, don't save yet)
window.handleChecklistChange = function(userUid, item, checked, date) {
    if (!pendingChanges[date]) {
        pendingChanges[date] = {};
    }
    if (!pendingChanges[date][userUid]) {
        pendingChanges[date][userUid] = {};
    }
    pendingChanges[date][userUid][item] = checked;
};

function showCodeModal() {
    document.getElementById('codeModal').classList.remove('hidden');
    document.getElementById('adminCodeInput').value = '';
    document.getElementById('adminCodeInput').focus();
    document.getElementById('codeError').style.display = 'none';
}

function hideCodeModal() {
    document.getElementById('codeModal').classList.add('hidden');
    document.getElementById('adminCodeInput').value = '';
    document.getElementById('codeError').style.display = 'none';
}

async function submitCode() {
    const session = window.authStatus?.getSession();
    if (!session) return;
    
    const enteredCode = document.getElementById('adminCodeInput').value.trim();
    const codeError = document.getElementById('codeError');
    
    if (!enteredCode) {
        codeError.textContent = 'Please enter a code.';
        codeError.style.display = 'block';
        return;
    }
    
    try {
        // Get admin's saved code
        const { data: settings, error: settingsError } = await supabase
            .from('Admin_Settings')
            .select('checklist_code')
            .eq('admin_uid', session.uid)
            .single();
        
        if (settingsError && settingsError.code !== 'PGRST116') {
            throw settingsError;
        }
        
        const savedCode = settings?.checklist_code;
        
        if (!savedCode) {
            codeError.textContent = 'No code set. Please set your code in Settings first.';
            codeError.style.display = 'block';
            return;
        }
        
        if (enteredCode !== savedCode) {
            codeError.textContent = 'Incorrect code. Please try again.';
            codeError.style.display = 'block';
            return;
        }
        
        // Code is correct, post changes
        await postChecklistChanges();
        hideCodeModal();
        
    } catch (error) {
        console.error('Error verifying code:', error);
        codeError.textContent = 'Error verifying code. Please try again.';
        codeError.style.display = 'block';
    }
}

async function postChecklistChanges() {
    const date = document.getElementById('checklistDate').value;
    
    try {
        // Get all users to check for completed checklists
        const { data: users } = await supabase
            .from('Users')
            .select('UID, First_Name, Last_Name')
            .eq('user_type', 'standard');
        
        const usersMap = {};
        if (users) {
            users.forEach(user => {
                usersMap[user.UID] = user;
            });
        }
        
        // Get all current checkbox states from the DOM
        const allUserIds = users.map(u => u.UID);
        const allChanges = {};
        
        allUserIds.forEach(userUid => {
            const checkboxStates = {
                make_bed: document.getElementById(`make_bed_${userUid}`)?.checked || false,
                clean_room: document.getElementById(`clean_room_${userUid}`)?.checked || false,
                get_dressed: document.getElementById(`get_dressed_${userUid}`)?.checked || false,
                eat_breakfast: document.getElementById(`eat_breakfast_${userUid}`)?.checked || false,
                brush_teeth: document.getElementById(`brush_teeth_${userUid}`)?.checked || false,
                comb_hair: document.getElementById(`comb_hair_${userUid}`)?.checked || false
            };
            allChanges[userUid] = checkboxStates;
        });
        
        // Post all changes and check for completed checklists
        for (const [userUid, checkboxStates] of Object.entries(allChanges)) {
            // Check if checklist entry exists
            const { data: existing } = await supabase
                .from('Morning_Checklist')
                .select('checklist_id')
                .eq('user_uid', userUid)
                .eq('checklist_date', date)
                .single();
            
            const updateData = {
                user_uid: parseInt(userUid),
                checklist_date: date,
                make_bed: checkboxStates.make_bed,
                clean_room: checkboxStates.clean_room,
                get_dressed: checkboxStates.get_dressed,
                eat_breakfast: checkboxStates.eat_breakfast,
                brush_teeth: checkboxStates.brush_teeth,
                comb_hair: checkboxStates.comb_hair,
                updated_at: new Date().toISOString()
            };
            
            if (existing) {
                // Update existing
                const { error: updateError } = await supabase
                    .from('Morning_Checklist')
                    .update(updateData)
                    .eq('checklist_id', existing.checklist_id);
                
                if (updateError) throw updateError;
            } else {
                // Insert new
                const { error: insertError } = await supabase
                    .from('Morning_Checklist')
                    .insert(updateData);
                
                if (insertError) throw insertError;
            }
            
            // Check if all 6 items are completed
            const allCompleted = 
                checkboxStates.make_bed &&
                checkboxStates.clean_room &&
                checkboxStates.get_dressed &&
                checkboxStates.eat_breakfast &&
                checkboxStates.brush_teeth &&
                checkboxStates.comb_hair;
            
            if (allCompleted) {
                // Award 10 credits (only if not already awarded for this date)
                await awardChecklistCredits(parseInt(userUid), usersMap[userUid], date);
            }
        }
        
        // Clear pending changes for this date
        delete pendingChanges[date];
        
        // Reload checklists
        await loadChecklists(date);
        
        // Count how many users got credits
        let creditsAwarded = 0;
        for (const [userUid, changes] of Object.entries(allChanges)) {
            const allCompleted = 
                changes.make_bed &&
                changes.clean_room &&
                changes.get_dressed &&
                changes.eat_breakfast &&
                changes.brush_teeth &&
                changes.comb_hair;
            if (allCompleted) creditsAwarded++;
        }
        
        if (creditsAwarded > 0) {
            alert(`Changes posted successfully! ${creditsAwarded} user(s) completed all items and received 10 credits each.`);
        } else {
            alert('Changes posted successfully!');
        }
        
    } catch (error) {
        console.error('Error posting changes:', error);
        alert('Error posting changes. Please try again.');
    }
}

async function awardChecklistCredits(userUid, user, date) {
    try {
        // Check if credits already awarded for this date (check transactions)
        const session = window.authStatus?.getSession();
        const { data: existingTransaction } = await supabase
            .from('Credit_Transactions')
            .select('transaction_id')
            .eq('to_user_uid', userUid)
            .eq('transaction_type', 'credit_added')
            .like('description', `%Morning checklist completed%`)
            .gte('created_at', `${date}T00:00:00`)
            .lt('created_at', `${date}T23:59:59`)
            .single();
        
        if (existingTransaction) {
            // Credits already awarded for this date
            return;
        }
        
        // Check current credit balance
        const { data: existingCredit } = await supabase
            .from('User_Credits')
            .select('credit_id, balance')
            .eq('user_uid', userUid)
            .single();
        
        const newBalance = (existingCredit?.balance || 0) + 10;
        
        if (existingCredit) {
            // Update existing balance
            await supabase
                .from('User_Credits')
                .update({ 
                    balance: newBalance, 
                    updated_at: new Date().toISOString() 
                })
                .eq('credit_id', existingCredit.credit_id);
        } else {
            // Create new credit record
            await supabase
                .from('User_Credits')
                .insert({ 
                    user_uid: userUid, 
                    balance: 10 
                });
        }
        
        // Record transaction
        await supabase
            .from('Credit_Transactions')
            .insert({
                from_user_uid: session.uid,
                to_user_uid: userUid,
                amount: 10,
                transaction_type: 'credit_added',
                description: `Morning checklist completed - ${user.First_Name || ''} ${user.Last_Name || ''}`.trim()
            });
        
    } catch (error) {
        console.error('Error awarding credits:', error);
    }
}

async function loadChecklists(date) {
    const checklistGrid = document.getElementById('checklistGrid');
    
    try {
        // Get all standard users
        const { data: users, error: usersError } = await supabase
            .from('Users')
            .select('UID, First_Name, Last_Name, Username')
            .eq('user_type', 'standard')
            .order('First_Name', { ascending: true });
        
        if (usersError) throw usersError;
        
        if (!users || users.length === 0) {
            checklistGrid.innerHTML = '<div class="no-users">No standard users found.</div>';
            return;
        }
        
        // Get checklist data for the selected date
        const { data: checklists, error: checklistsError } = await supabase
            .from('Morning_Checklist')
            .select('user_uid, make_bed, clean_room, get_dressed, eat_breakfast, brush_teeth, comb_hair')
            .eq('checklist_date', date);
        
        if (checklistsError) throw checklistsError;
        
        // Create checklist map
        const checklistMap = {};
        if (checklists) {
            checklists.forEach(checklist => {
                checklistMap[checklist.user_uid] = checklist;
            });
        }
        
        // Build checklist grid
        checklistGrid.innerHTML = '';
        
        users.forEach(user => {
            const displayName = (user.First_Name && user.Last_Name) 
                ? `${user.First_Name} ${user.Last_Name}` 
                : user.Username;
            
            const checklist = checklistMap[user.UID] || {
                make_bed: false,
                clean_room: false,
                get_dressed: false,
                eat_breakfast: false,
                brush_teeth: false,
                comb_hair: false
            };
            
            const userBox = document.createElement('div');
            userBox.className = 'user-checklist-box';
            userBox.innerHTML = `
                <div class="user-name">${displayName}</div>
                <div class="checklist-item">
                    <input type="checkbox" id="make_bed_${user.UID}" ${checklist.make_bed ? 'checked' : ''} 
                           onchange="handleChecklistChange(${user.UID}, 'make_bed', this.checked, '${date}')">
                    <label for="make_bed_${user.UID}">Make Bed</label>
                </div>
                <div class="checklist-item">
                    <input type="checkbox" id="clean_room_${user.UID}" ${checklist.clean_room ? 'checked' : ''} 
                           onchange="handleChecklistChange(${user.UID}, 'clean_room', this.checked, '${date}')">
                    <label for="clean_room_${user.UID}">Clean Room</label>
                </div>
                <div class="checklist-item">
                    <input type="checkbox" id="get_dressed_${user.UID}" ${checklist.get_dressed ? 'checked' : ''} 
                           onchange="handleChecklistChange(${user.UID}, 'get_dressed', this.checked, '${date}')">
                    <label for="get_dressed_${user.UID}">Get Dressed</label>
                </div>
                <div class="checklist-item">
                    <input type="checkbox" id="eat_breakfast_${user.UID}" ${checklist.eat_breakfast ? 'checked' : ''} 
                           onchange="handleChecklistChange(${user.UID}, 'eat_breakfast', this.checked, '${date}')">
                    <label for="eat_breakfast_${user.UID}">Eat Breakfast</label>
                </div>
                <div class="checklist-item">
                    <input type="checkbox" id="brush_teeth_${user.UID}" ${checklist.brush_teeth ? 'checked' : ''} 
                           onchange="handleChecklistChange(${user.UID}, 'brush_teeth', this.checked, '${date}')">
                    <label for="brush_teeth_${user.UID}">Brush Teeth</label>
                </div>
                <div class="checklist-item">
                    <input type="checkbox" id="comb_hair_${user.UID}" ${checklist.comb_hair ? 'checked' : ''} 
                           onchange="handleChecklistChange(${user.UID}, 'comb_hair', this.checked, '${date}')">
                    <label for="comb_hair_${user.UID}">Comb Hair</label>
                </div>
            `;
            checklistGrid.appendChild(userBox);
        });
        
    } catch (error) {
        console.error('Error loading checklists:', error);
        checklistGrid.innerHTML = '<div class="no-users">Error loading checklists. Please try again.</div>';
    }
}


