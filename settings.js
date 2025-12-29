// Settings page for admins
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
    
    // Load current settings
    await loadSettings();
    
    // Add save button listeners
    document.getElementById('saveCodeBtn').addEventListener('click', async () => {
        await saveCode();
    });
    
    document.getElementById('saveLaunchTimeBtn').addEventListener('click', async () => {
        await saveLaunchTime();
    });
}

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
                document.getElementById('checklistCode').placeholder = 'Code is set (enter new code to change)';
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
        if (newCode.length < 4) {
            showError('Code must be at least 4 characters long.');
            return;
        }
        
        if (newCode !== confirmCode) {
            showError('Codes do not match. Please try again.');
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
                showError('Please enter a code to set.');
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
            showSuccess('Code saved successfully!');
            document.getElementById('checklistCode').placeholder = 'Code is set (enter new code to change)';
        } else {
            showSuccess('Settings updated successfully!');
        }
        
    } catch (error) {
        console.error('Error saving code:', error);
        showError('Error saving code. Please try again.');
    }
}

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
    document.getElementById(elementId).style.display = 'none';
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
            showError('Please set your checklist code first.');
            return;
        }
        
        showSuccess('Launch time saved successfully!');
        
    } catch (error) {
        console.error('Error saving launch time:', error);
        showError('Error saving launch time. Please try again.');
    }
}

