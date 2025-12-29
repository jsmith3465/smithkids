// Morning Checklist page for admins
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://frlajamhyyectdrcbrnd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybGFqYW1oeXllY3RkcmNicm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4ODA4ODksImV4cCI6MjA4MjQ1Njg4OX0.QAH0GME5_iYkz6SZjfqdL3q9E9Jo1qKv6YWFk2exAtY';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Global variables
let launchTime = '0700'; // Default launch time
let countdownInterval = null;
let timeUpdateInterval = null;
let codeEntered = false;
let warning15Min = false;
let warning10Min = false;
let warning5Min = false;
let launchAlarmPlayed = false;

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
    
    // Check if admin has a code set
    const { data: settings } = await supabase
        .from('Admin_Settings')
        .select('checklist_code, launch_time')
        .eq('admin_uid', session.uid)
        .single();
    
    if (!settings || !settings.checklist_code) {
        alert('Please set your pin code in Settings before accessing the Morning Checklist page.');
        window.location.href = 'settings.html';
        return;
    }
    
    // Load launch time
    if (settings.launch_time) {
        launchTime = settings.launch_time;
    }
    
    // Show main content
    document.getElementById('authCheck').classList.add('hidden');
    document.getElementById('mainContent').classList.remove('hidden');
    
    // Set today's date as default (always use today)
    const today = new Date().toISOString().split('T')[0];
    
    // Initialize date/time display and countdown
    updateDateTime();
    updateLaunchTimeDisplay();
    startCountdown();
    startTimeUpdate();
    
    // Load checklists for today
    await loadChecklists(today);
    
    // Add post changes button listener
    document.getElementById('postChangesBtn').addEventListener('click', () => {
        showCodeModal();
    });
    
    // Add launch time change button listener
    document.getElementById('changeLaunchTimeBtn').addEventListener('click', () => {
        showLaunchTimeModal();
    });
    
    // Add code modal listeners
    document.getElementById('submitCodeBtn').addEventListener('click', async () => {
        await submitCode();
    });
    
    document.getElementById('cancelCodeBtn').addEventListener('click', () => {
        hideCodeModal();
    });
    
    // Add exit code modal listeners
    document.getElementById('submitExitCodeBtn').addEventListener('click', async () => {
        await submitExitCode();
    });
    
    document.getElementById('cancelExitBtn').addEventListener('click', () => {
        hideExitCodeModal();
    });
    
    // Add launch time modal listeners
    document.getElementById('submitLaunchTimeBtn').addEventListener('click', async () => {
        await submitLaunchTimeChange();
    });
    
    document.getElementById('cancelLaunchTimeBtn').addEventListener('click', () => {
        hideLaunchTimeModal();
    });
    
    // Allow Enter key to submit codes
    document.getElementById('adminCodeInput').addEventListener('keypress', async (e) => {
        if (e.key === 'Enter') {
            await submitCode();
        }
    });
    
    document.getElementById('exitCodeInput').addEventListener('keypress', async (e) => {
        if (e.key === 'Enter') {
            await submitExitCode();
        }
    });
    
    document.getElementById('launchTimeCodeInput').addEventListener('keypress', async (e) => {
        if (e.key === 'Enter') {
            await submitLaunchTimeChange();
        }
    });
    
    // Prevent navigation without code
    preventNavigation();
}

function updateDateTime() {
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const militaryTime = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const traditionalTime = now.toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: '2-digit', second: '2-digit' });
    
    document.getElementById('currentDate').textContent = dateStr;
    document.getElementById('currentTime').textContent = `${militaryTime} (${traditionalTime})`;
}

function startTimeUpdate() {
    timeUpdateInterval = setInterval(() => {
        updateDateTime();
    }, 1000);
}

function updateLaunchTimeDisplay() {
    const hours = launchTime.substring(0, 2);
    const minutes = launchTime.substring(2, 4);
    const militaryTime = `${hours}:${minutes}`;
    const time12 = new Date(`2000-01-01T${hours}:${minutes}:00`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    document.getElementById('launchTimeDisplay').textContent = `${militaryTime} (${time12})`;
}

function startCountdown() {
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
    
    countdownInterval = setInterval(() => {
        updateCountdown();
    }, 1000);
    
    updateCountdown(); // Update immediately
}

function updateCountdown() {
    const now = new Date();
    const hours = parseInt(launchTime.substring(0, 2));
    const minutes = parseInt(launchTime.substring(2, 4));
    
    const launchDate = new Date();
    launchDate.setHours(hours, minutes, 0, 0);
    
    // If launch time has passed today, set for tomorrow
    if (launchDate < now) {
        launchDate.setDate(launchDate.getDate() + 1);
        // Reset warnings for new day
        warning15Min = false;
        warning10Min = false;
        warning5Min = false;
        launchAlarmPlayed = false;
    }
    
    const diff = launchDate - now;
    const totalSeconds = Math.floor(diff / 1000);
    const hoursLeft = Math.floor(totalSeconds / 3600);
    const minutesLeft = Math.floor((totalSeconds % 3600) / 60);
    const secondsLeft = totalSeconds % 60;
    
    const countdownText = `${String(hoursLeft).padStart(2, '0')}:${String(minutesLeft).padStart(2, '0')}:${String(secondsLeft).padStart(2, '0')}`;
    const countdownDisplay = document.getElementById('countdownText');
    countdownDisplay.textContent = countdownText;
    
    // Color coding
    const totalMinutes = Math.floor(totalSeconds / 60);
    countdownDisplay.className = '';
    if (totalMinutes > 15) {
        countdownDisplay.classList.add('countdown-green');
    } else if (totalMinutes > 5) {
        countdownDisplay.classList.add('countdown-yellow');
    } else {
        countdownDisplay.classList.add('countdown-red');
    }
    
    // Update the countdown display container color as well
    const countdownContainer = document.getElementById('countdownDisplay');
    if (countdownContainer) {
        countdownContainer.className = '';
        if (totalMinutes > 15) {
            countdownContainer.classList.add('countdown-green');
        } else if (totalMinutes > 5) {
            countdownContainer.classList.add('countdown-yellow');
        } else {
            countdownContainer.classList.add('countdown-red');
        }
    }
    
    // Audio warnings (only if countdown is positive)
    // Check for exact minute marks (15:00, 10:00, 5:00)
    // Use minutesLeft and secondsLeft to check for exact minute marks
    if (totalSeconds > 0) {
        // 15 minutes exactly (15:00)
        if (minutesLeft === 15 && secondsLeft === 0 && !warning15Min) {
            warning15Min = true;
            speakWarning('15 minutes');
        } 
        // 10 minutes exactly (10:00)
        else if (minutesLeft === 10 && secondsLeft === 0 && !warning10Min) {
            warning10Min = true;
            speakWarning('10 minutes');
        } 
        // 5 minutes exactly (5:00)
        else if (minutesLeft === 5 && secondsLeft === 0 && !warning5Min) {
            warning5Min = true;
            speakWarning('5 minutes');
        }
    }
    
    // Launch alarm (when countdown reaches zero)
    if (totalSeconds <= 0 && totalSeconds > -60 && !launchAlarmPlayed) {
        launchAlarmPlayed = true;
        playLaunchAlarm();
    }
}

function speakWarning(minutes) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(`${minutes} minute warning`);
        utterance.rate = 0.9;
        utterance.pitch = 0.8;
        utterance.volume = 1.0;
        window.speechSynthesis.speak(utterance);
    }
}

function playLaunchAlarm() {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance('Launch! Launch! Launch!');
        utterance.rate = 1.2;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        // Repeat 3 times
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                window.speechSynthesis.speak(utterance);
            }, i * 1000);
        }
    }
}

function preventNavigation() {
    // Intercept all link clicks
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link && link.href && !codeEntered) {
            e.preventDefault();
            const href = link.getAttribute('href');
            if (href && href !== '#' && !href.startsWith('javascript:')) {
                showExitCodeModal(href);
            }
        }
    }, true);
    
    // Intercept browser back/forward
    window.addEventListener('beforeunload', (e) => {
        if (!codeEntered) {
            e.preventDefault();
            e.returnValue = 'You must enter your pin code to leave this page.';
        }
    });
    
    // Handle back button
    window.addEventListener('popstate', (e) => {
        if (!codeEntered) {
            e.preventDefault();
            window.history.pushState(null, '', window.location.href);
            showExitCodeModal();
        }
    });
    
    // Push initial state
    window.history.pushState(null, '', window.location.href);
}

let pendingNavigationUrl = null;

function showExitCodeModal(url = null) {
    pendingNavigationUrl = url;
    document.getElementById('exitCodeModal').classList.remove('hidden');
    document.getElementById('exitCodeInput').value = '';
    document.getElementById('exitCodeInput').focus();
    document.getElementById('exitCodeError').style.display = 'none';
}

function hideExitCodeModal() {
    document.getElementById('exitCodeModal').classList.add('hidden');
    document.getElementById('exitCodeInput').value = '';
    pendingNavigationUrl = null;
}

async function submitExitCode() {
    const session = window.authStatus?.getSession();
    if (!session) return;
    
    const enteredCode = document.getElementById('exitCodeInput').value.trim();
    const codeError = document.getElementById('exitCodeError');
    
    if (!enteredCode) {
        codeError.textContent = 'Please enter a pin code.';
        codeError.style.display = 'block';
        return;
    }
    
    // Validate pin code format (4-8 digits)
    if (!/^\d{4,8}$/.test(enteredCode)) {
        codeError.textContent = 'Pin code must be 4-8 digits.';
        codeError.style.display = 'block';
        return;
    }
    
    try {
        const { data: settings } = await supabase
            .from('Admin_Settings')
            .select('checklist_code')
            .eq('admin_uid', session.uid)
            .single();
        
        if (!settings || enteredCode !== settings.checklist_code) {
            codeError.textContent = 'Incorrect pin code. Please try again.';
            codeError.style.display = 'block';
            return;
        }
        
        // Code is correct, allow navigation
        codeEntered = true;
        hideExitCodeModal();
        
        // Cleanup intervals
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }
        if (timeUpdateInterval) {
            clearInterval(timeUpdateInterval);
        }
        
        if (pendingNavigationUrl) {
            window.location.href = pendingNavigationUrl;
        }
        
    } catch (error) {
        console.error('Error verifying exit code:', error);
        codeError.textContent = 'Error verifying code. Please try again.';
        codeError.style.display = 'block';
    }
}

function showLaunchTimeModal() {
    document.getElementById('launchTimeModal').classList.remove('hidden');
    document.getElementById('launchTimeCodeInput').value = '';
    document.getElementById('launchTimeInput').value = launchTime;
    document.getElementById('launchTimeInput').focus();
    document.getElementById('launchTimeError').style.display = 'none';
}

function hideLaunchTimeModal() {
    document.getElementById('launchTimeModal').classList.add('hidden');
    document.getElementById('launchTimeCodeInput').value = '';
    document.getElementById('launchTimeInput').value = '';
    document.getElementById('launchTimeError').style.display = 'none';
}

async function submitLaunchTimeChange() {
    const session = window.authStatus?.getSession();
    if (!session) return;
    
    const enteredCode = document.getElementById('launchTimeCodeInput').value.trim();
    const newLaunchTime = document.getElementById('launchTimeInput').value.trim();
    const codeError = document.getElementById('launchTimeError');
    
    if (!enteredCode) {
        codeError.textContent = 'Please enter a pin code.';
        codeError.style.display = 'block';
        return;
    }
    
    // Validate pin code format (4-8 digits)
    if (!/^\d{4,8}$/.test(enteredCode)) {
        codeError.textContent = 'Pin code must be 4-8 digits.';
        codeError.style.display = 'block';
        return;
    }
    
    if (!newLaunchTime || !/^\d{4}$/.test(newLaunchTime)) {
        codeError.textContent = 'Please enter a valid time in military format (HHMM, e.g., 0700).';
        codeError.style.display = 'block';
        return;
    }
    
    const hours = parseInt(newLaunchTime.substring(0, 2));
    const minutes = parseInt(newLaunchTime.substring(2, 4));
    
    if (hours > 23 || minutes > 59) {
        codeError.textContent = 'Invalid time. Hours must be 00-23 and minutes must be 00-59.';
        codeError.style.display = 'block';
        return;
    }
    
    try {
        const { data: settings } = await supabase
            .from('Admin_Settings')
            .select('checklist_code, setting_id')
            .eq('admin_uid', session.uid)
            .single();
        
        if (!settings || enteredCode !== settings.checklist_code) {
            codeError.textContent = 'Incorrect pin code. Please try again.';
            codeError.style.display = 'block';
            return;
        }
        
        // Update launch time
        const { error: updateError } = await supabase
            .from('Admin_Settings')
            .update({ 
                launch_time: newLaunchTime,
                updated_at: new Date().toISOString()
            })
            .eq('setting_id', settings.setting_id);
        
        if (updateError) throw updateError;
        
        launchTime = newLaunchTime;
        updateLaunchTimeDisplay();
        warning15Min = false;
        warning10Min = false;
        warning5Min = false;
        launchAlarmPlayed = false;
        
        hideLaunchTimeModal();
        alert('Launch time updated successfully!');
        
    } catch (error) {
        console.error('Error updating launch time:', error);
        codeError.textContent = 'Error updating launch time. Please try again.';
        codeError.style.display = 'block';
    }
}

// Store pending changes (only saved when Approve Checklist is clicked)
let pendingChanges = {};

// Handle checklist changes (store in memory only, don't save to database)
window.handleChecklistChange = function(userUid, item, checked, date) {
    // Always use today's date
    const today = new Date().toISOString().split('T')[0];
    const useDate = date || today;
    
    // Store in pendingChanges - will be saved when Approve Checklist is clicked
    if (!pendingChanges[useDate]) {
        pendingChanges[useDate] = {};
    }
    if (!pendingChanges[useDate][userUid]) {
        pendingChanges[useDate][userUid] = {};
    }
    pendingChanges[useDate][userUid][item] = checked;
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
        codeError.textContent = 'Please enter a pin code.';
        codeError.style.display = 'block';
        return;
    }
    
    // Validate pin code format (4-8 digits)
    if (!/^\d{4,8}$/.test(enteredCode)) {
        codeError.textContent = 'Pin code must be 4-8 digits.';
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
            codeError.textContent = 'No pin code set. Please set your pin code in Settings first.';
            codeError.style.display = 'block';
            return;
        }
        
        if (enteredCode !== savedCode) {
            codeError.textContent = 'Incorrect pin code. Please try again.';
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
    // Always use today's date
    const date = new Date().toISOString().split('T')[0];
    
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
        
        // Reload checklists to refresh display
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
            alert('Changes posted successfully! All checklist data has been saved with timestamps.');
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
    
    // Always use today's date
    const today = new Date().toISOString().split('T')[0];
    const useDate = date || today;
    
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
        
        // Get checklist data for today's date
        const { data: checklists, error: checklistsError } = await supabase
            .from('Morning_Checklist')
            .select('user_uid, make_bed, clean_room, get_dressed, eat_breakfast, brush_teeth, comb_hair')
            .eq('checklist_date', useDate);
        
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
                           onchange="handleChecklistChange(${user.UID}, 'make_bed', this.checked, '${useDate}')">
                    <label for="make_bed_${user.UID}">Make Bed</label>
                </div>
                <div class="checklist-item">
                    <input type="checkbox" id="clean_room_${user.UID}" ${checklist.clean_room ? 'checked' : ''} 
                           onchange="handleChecklistChange(${user.UID}, 'clean_room', this.checked, '${useDate}')">
                    <label for="clean_room_${user.UID}">Clean Room</label>
                </div>
                <div class="checklist-item">
                    <input type="checkbox" id="get_dressed_${user.UID}" ${checklist.get_dressed ? 'checked' : ''} 
                           onchange="handleChecklistChange(${user.UID}, 'get_dressed', this.checked, '${useDate}')">
                    <label for="get_dressed_${user.UID}">Get Dressed</label>
                </div>
                <div class="checklist-item">
                    <input type="checkbox" id="eat_breakfast_${user.UID}" ${checklist.eat_breakfast ? 'checked' : ''} 
                           onchange="handleChecklistChange(${user.UID}, 'eat_breakfast', this.checked, '${useDate}')">
                    <label for="eat_breakfast_${user.UID}">Eat Breakfast</label>
                </div>
                <div class="checklist-item">
                    <input type="checkbox" id="brush_teeth_${user.UID}" ${checklist.brush_teeth ? 'checked' : ''} 
                           onchange="handleChecklistChange(${user.UID}, 'brush_teeth', this.checked, '${useDate}')">
                    <label for="brush_teeth_${user.UID}">Brush Teeth</label>
                </div>
                <div class="checklist-item">
                    <input type="checkbox" id="comb_hair_${user.UID}" ${checklist.comb_hair ? 'checked' : ''} 
                           onchange="handleChecklistChange(${user.UID}, 'comb_hair', this.checked, '${useDate}')">
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


