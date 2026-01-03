// Pray Ground app

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://frlajamhyyectdrcbrnd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybGFqYW1oeXllY3RkcmNicm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4ODA4ODksImV4cCI6MjA4MjQ1Njg4OX0.QAH0GME5_iYkz6SZjfqdL3q9E9Jo1qKv6YWFk2exAtY';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Store requests and user map for easy access
let currentRequests = [];
let currentUserMap = {};
let currentPrayerCounts = {};
let currentUserPrayers = new Set();

// Helper function to get correct path for pages
function getPagePath(pageName) {
    const currentPath = window.location.pathname;
    if (currentPath === '/' || currentPath.endsWith('/index.html') || currentPath.endsWith('index.html')) {
        return `pages/${pageName}`;
    }
    return pageName;
}

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

async function checkUserAccess() {
    const session = window.authStatus?.getSession();
    if (!session) {
        window.location.href = getPagePath('login.html');
        return;
    }
    
    const authCheck = document.getElementById('authCheck');
    const mainContent = document.getElementById('mainContent');
    
    if (!authCheck || !mainContent) {
        console.error('Required DOM elements not found');
        return;
    }
    
    authCheck.classList.add('hidden');
    mainContent.classList.remove('hidden');
    
    try {
        setupPrayerRequestForm(session.uid);
        setupSubmitToggle();
        setupClosePrayerForm();
        setupPrayerModal();
        await loadPrayerRequests(session.uid);
    } catch (error) {
        console.error('Error initializing Pray Ground:', error);
    }
}

// Setup submit toggle button
function setupSubmitToggle() {
    const submitToggle = document.getElementById('submitPrayerToggle');
    const submitSection = document.getElementById('submitPrayerSection');
    
    if (!submitToggle || !submitSection) return;
    
    submitToggle.addEventListener('click', () => {
        const isVisible = submitSection.style.display === 'block';
        submitSection.style.display = isVisible ? 'none' : 'block';
        
        // Scroll to form if showing
        if (!isVisible) {
            setTimeout(() => {
                submitSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        }
    });
}

// Setup close prayer form button
function setupClosePrayerForm() {
    const closeButton = document.getElementById('closePrayerForm');
    const submitSection = document.getElementById('submitPrayerSection');
    
    if (!closeButton || !submitSection) return;
    
    closeButton.addEventListener('click', () => {
        submitSection.style.display = 'none';
    });
}

// Setup prayer request form
function setupPrayerRequestForm(userUid) {
    const prayerRequestForm = document.getElementById('prayerRequestForm');
    if (!prayerRequestForm) return;
    
    prayerRequestForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await submitPrayerRequest(userUid);
    });
}

// Submit prayer request
async function submitPrayerRequest(userUid) {
    const titleInput = document.getElementById('prayerTitle');
    const detailsTextarea = document.getElementById('prayerDetails');
    const messageDiv = document.getElementById('prayerMessage');
    
    if (!titleInput || !detailsTextarea || !messageDiv) return;
    
    const title = titleInput.value.trim();
    const details = detailsTextarea.value.trim();
    
    if (!title || !details) {
        showPrayerMessage('Please fill in both title and details.', 'error');
        return;
    }
    
    try {
        // Create prayer request
        const { data: prayerRequest, error: insertError } = await supabase
            .from('prayer_requests')
            .insert({
                user_uid: userUid,
                title: title,
                details: details,
                status: 'active'
            })
            .select()
            .single();
        
        if (insertError) throw insertError;
        
        // Get user info for message
        const { data: userData, error: userError } = await supabase
            .from('Users')
            .select('First_Name, Last_Name, Username')
            .eq('UID', userUid)
            .single();
        
        if (userError) {
            console.error('Error fetching user data:', userError);
        }
        
        const userName = (userData?.First_Name && userData?.Last_Name)
            ? `${userData.First_Name} ${userData.Last_Name}`
            : userData?.Username || 'A family member';
        
        // Get current date/time for message
        const now = new Date();
        const dateStr = now.toLocaleDateString() + ' at ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        // Send message to all users except the poster
        const { data: allUsers, error: usersError } = await supabase
            .from('Users')
            .select('UID');
        
        if (usersError) {
            console.error('Error fetching all users:', usersError);
        }
        
        if (allUsers && allUsers.length > 0) {
            const messageContent = `
                <div style="padding: 20px;">
                    <h3 style="color: #1976D2; margin-top: 0;">🙏 New Prayer Request</h3>
                    <p><strong>Submitted by:</strong> ${escapeHtml(userName)}</p>
                    <p><strong>Date:</strong> ${escapeHtml(dateStr)}</p>
                    <p><strong>Title:</strong> ${escapeHtml(title)}</p>
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
                        <strong>Prayer Request:</strong><br>
                        ${escapeHtml(details).replace(/\n/g, '<br>')}
                    </div>
                    <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #e0e0e0;">
                        <a href="${getPagePath('pray-ground.html')}" style="
                            display: inline-block;
                            padding: 10px 20px;
                            background: #1976D2;
                            color: white;
                            text-decoration: none;
                            border-radius: 5px;
                            font-weight: 600;
                        ">View in Pray Ground</a>
                    </div>
                </div>
            `;
            
            // Send message to all users except the poster
            const messagePromises = [];
            for (const user of allUsers) {
                // Don't send message to the person who submitted it
                if (user.UID !== userUid) {
                    messagePromises.push(
                        supabase
                            .from('message_boxes')
                            .insert({
                                from_user_uid: userUid,
                                to_user_uid: user.UID,
                                subject: `New Prayer Request: ${escapeHtml(title)}`,
                                body: messageContent,
                                folder: 'inbox',
                                is_read: false
                            })
                    );
                }
            }
            
            // Wait for all messages to be sent
            const messageResults = await Promise.allSettled(messagePromises);
            const failedMessages = messageResults.filter(r => r.status === 'rejected');
            
            if (failedMessages.length > 0) {
                console.warn('Some messages failed to send:', failedMessages);
            }
            
            console.log(`Prayer request notification sent to ${allUsers.length - 1} family members`);
        }
        
        // Show success message
        showPrayerMessage('Prayer request submitted successfully! All family members have been notified.', 'success');
        
        // Reset form
        prayerRequestForm.reset();
        
        // Hide the form
        const submitSection = document.getElementById('submitPrayerSection');
        if (submitSection) {
            submitSection.style.display = 'none';
        }
        
        // Reload prayer requests to show the new one
        await loadPrayerRequests(userUid);
        
    } catch (error) {
        console.error('Error submitting prayer request:', error);
        showPrayerMessage('Error submitting prayer request. Please try again.', 'error');
    }
}

// Load all prayer requests
async function loadPrayerRequests(currentUserUid) {
    const prayerRequestsList = document.getElementById('prayerRequestsList');
    if (!prayerRequestsList) return;
    
    try {
        // First, try a simple query to check if table exists and is accessible
        const { data: requests, error } = await supabase
            .from('prayer_requests')
            .select('request_id, user_uid, title, details, status, created_at, answered_at, answered_by_uid, praise_report')
            .order('created_at', { ascending: false })
            .limit(1); // Limit to 1 for initial check
        
        // Log the error for debugging
        if (error) {
            console.error('Supabase error details:', {
                message: error.message,
                code: error.code,
                details: error.details,
                hint: error.hint,
                fullError: error
            });
        }
        
        // Get prayer counts for each request
        const requestIds = requests ? requests.map(r => r.request_id) : [];
        let prayerCounts = {};
        let userPrayers = new Set();
        
        if (requestIds.length > 0) {
            try {
                // Get count of prayers for each request
                const { data: prayers, error: prayersError } = await supabase
                    .from('prayer_prayers')
                    .select('request_id, user_uid')
                    .in('request_id', requestIds);
                
                if (!prayersError && prayers) {
                    // Count prayers per request
                    prayers.forEach(prayer => {
                        if (!prayerCounts[prayer.request_id]) {
                            prayerCounts[prayer.request_id] = 0;
                        }
                        prayerCounts[prayer.request_id]++;
                        
                        // Track if current user has prayed
                        if (prayer.user_uid === currentUserUid) {
                            userPrayers.add(prayer.request_id);
                        }
                    });
                }
            } catch (prayerError) {
                console.warn('Error fetching prayer counts (table may not exist):', prayerError);
            }
        }
        
        if (error) throw error;
        
        prayerRequestsList.innerHTML = '';
        
        if (!requests || requests.length === 0) {
            prayerRequestsList.innerHTML = '<div style="text-align: center; padding: 40px; color: #666; font-style: italic;">No prayer requests yet. Be the first to submit one!</div>';
            return;
        }
        
        // Get all user UIDs that we need
        const allUserUids = [...new Set([
            ...requests.map(r => r.user_uid),
            ...requests.filter(r => r.answered_by_uid).map(r => r.answered_by_uid)
        ])];
        
        // Fetch all user info
        const { data: allUsers, error: usersError } = await supabase
            .from('Users')
            .select('UID, First_Name, Last_Name, Username')
            .in('UID', allUserUids);
        
        if (usersError) {
            console.error('Error fetching users:', usersError);
        }
        
        // Create user map
        const userMap = {};
        if (allUsers) {
            allUsers.forEach(user => {
                userMap[user.UID] = user;
            });
        }
        
        // Store in module-level variables for easy access
        currentRequests = requests;
        currentUserMap = userMap;
        currentPrayerCounts = prayerCounts;
        currentUserPrayers = userPrayers;
        
        // Create table
        const table = document.createElement('table');
        table.className = 'prayer-requests-table';
        
        // Table header
        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Posted By</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        `;
        table.appendChild(thead);
        
        // Table body
        const tbody = document.createElement('tbody');
        
        requests.forEach(request => {
            const user = userMap[request.user_uid];
            const authorName = (user?.First_Name && user?.Last_Name)
                ? `${user.First_Name} ${user.Last_Name}`
                : user?.Username || 'Unknown';
            
            const isOwner = request.user_uid === currentUserUid;
            const isAnswered = request.status === 'answered';
            
            const requestDate = new Date(request.created_at);
            const dateStr = requestDate.toLocaleDateString() + ' ' + requestDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            const row = document.createElement('tr');
            row.className = isAnswered ? 'answered' : '';
            row.style.cursor = 'default'; // Changed from 'pointer' since we have action buttons
            const prayerCount = prayerCounts[request.request_id] || 0;
            const hasUserPrayed = userPrayers.has(request.request_id);
            
            // Create action buttons
            let actionsHtml = '';
            
            if (!isOwner && !hasUserPrayed && !isAnswered) {
                // "I Prayed For This" button for requests user didn't create
                actionsHtml = `
                    <button class="btn btn-small" onclick="event.stopPropagation(); markAsPrayedForFromTable(${request.request_id}, ${currentUserUid}, ${request.user_uid})" style="
                        padding: 8px 16px;
                        font-size: 0.9rem;
                        margin-right: 5px;
                    ">🙏 I Prayed</button>
                    <button class="btn btn-small" onclick="event.stopPropagation(); openPrayerModalById(${request.request_id}, ${currentUserUid})" style="
                        padding: 8px 16px;
                        font-size: 0.9rem;
                    ">View</button>
                `;
            } else if (!isOwner && hasUserPrayed) {
                // Show that user has prayed
                actionsHtml = `
                    <span style="color: #28a745; font-size: 0.9rem; margin-right: 10px;">✓ Prayed</span>
                    <button class="btn btn-small" onclick="event.stopPropagation(); openPrayerModalById(${request.request_id}, ${currentUserUid})" style="
                        padding: 8px 16px;
                        font-size: 0.9rem;
                    ">View</button>
                `;
            } else if (isOwner && !isAnswered) {
                // "Mark as Answered" button for requests user created
                actionsHtml = `
                    <button class="btn btn-small btn-success" onclick="event.stopPropagation(); handleMarkAsAnswered(${request.request_id}, ${currentUserUid})" style="
                        padding: 8px 16px;
                        font-size: 0.9rem;
                        margin-right: 5px;
                    ">✓ Mark Answered</button>
                    <button class="btn btn-small" onclick="event.stopPropagation(); openPrayerModalById(${request.request_id}, ${currentUserUid})" style="
                        padding: 8px 16px;
                        font-size: 0.9rem;
                    ">View</button>
                `;
            } else {
                // Just view button for answered requests
                actionsHtml = `
                    <button class="btn btn-small" onclick="event.stopPropagation(); openPrayerModalById(${request.request_id}, ${currentUserUid})" style="
                        padding: 8px 16px;
                        font-size: 0.9rem;
                    ">View</button>
                `;
            }
            
            row.innerHTML = `
                <td class="prayer-request-title-cell" onclick="openPrayerModalById(${request.request_id}, ${currentUserUid})" style="cursor: pointer;">${escapeHtml(request.title)}</td>
                <td onclick="openPrayerModalById(${request.request_id}, ${currentUserUid})" style="cursor: pointer;">${escapeHtml(dateStr)}</td>
                <td onclick="openPrayerModalById(${request.request_id}, ${currentUserUid})" style="cursor: pointer;">${escapeHtml(authorName)}</td>
                <td onclick="openPrayerModalById(${request.request_id}, ${currentUserUid})" style="cursor: pointer;">
                    <span class="prayer-request-status-badge ${isAnswered ? 'answered' : 'active'}">
                        ${isAnswered ? '✓ Answered' : '⏳ Active'}
                    </span>
                </td>
                <td onclick="event.stopPropagation();" style="cursor: default;">
                    ${actionsHtml}
                </td>
            `;
            
            tbody.appendChild(row);
        });
        
        table.appendChild(tbody);
        prayerRequestsList.innerHTML = '';
        prayerRequestsList.appendChild(table);
        
    } catch (error) {
        console.error('Error loading prayer requests:', error);
        const errorMsg = error?.message || String(error);
        const errorCode = error?.code || '';
        const isMissingTable = /does not exist/i.test(errorMsg) || /schema cache/i.test(errorMsg) || errorCode === '42P01' || errorCode === 'PGRST116';
        
        if (isMissingTable) {
            prayerRequestsList.innerHTML = `<div style="text-align: center; padding: 40px; color: #dc3545;">
                Prayer requests table is not set up yet.<br>
                <small style="color: #666; margin-top: 10px; display: block;">
                    Run <code>setup_pray_ground_complete.sql</code> in Supabase SQL Editor to create the table.<br>
                    <strong>Error details:</strong> ${errorMsg}<br>
                    <strong>Error code:</strong> ${errorCode || 'N/A'}
                </small>
            </div>`;
        } else {
            prayerRequestsList.innerHTML = `<div style="text-align: center; padding: 40px; color: #dc3545;">
                Error loading prayer requests: ${errorMsg}<br>
                <small style="color: #666; margin-top: 10px; display: block;">
                    Error code: ${errorCode || 'N/A'}<br>
                    <br>
                    <strong>If the table exists, this might be an RLS (Row Level Security) issue.</strong><br>
                    Make sure you've run <code>setup_pray_ground_complete.sql</code> in Supabase SQL Editor.
                </small>
            </div>`;
        }
    }
}

// Handle mark as answered from list (asks about praise report)
async function handleMarkAsAnswered(requestId, userUid, fromModal = false) {
    if (!confirm('Are you sure you want to mark this prayer request as answered? This will send a praise report to all family members.')) {
        return;
    }
    
    // Mark as answered
    await markAsAnswered(requestId, userUid, false);
    
    // Ask if they want to add a praise report
    const wantsPraiseReport = confirm('Would you like to add a praise report explaining how God answered this prayer?');
    
    if (wantsPraiseReport) {
        if (fromModal) {
            // If called from modal, just reload the modal content
            await loadPrayerRequests(userUid);
            await openPrayerModalById(requestId, userUid);
        } else {
            // If called from list, open the modal
            await openPrayerModalById(requestId, userUid);
        }
    } else if (fromModal) {
        // Close modal if called from modal and user doesn't want praise report
        closePrayerModal();
    }
}

// Mark prayer request as answered
async function markAsAnswered(requestId, userUid, showSuccess = true) {
    
    try {
        const { error: updateError } = await supabase
            .from('prayer_requests')
            .update({
                status: 'answered',
                answered_at: new Date().toISOString(),
                answered_by_uid: userUid
            })
            .eq('request_id', requestId);
        
        if (updateError) throw updateError;
        
        // Get prayer request details
        const { data: request, error: requestError } = await supabase
            .from('prayer_requests')
            .select('title, user_uid')
            .eq('request_id', requestId)
            .single();
        
        if (requestError) throw requestError;
        
        if (request) {
            // Get requester info
            const { data: requesterData } = await supabase
                .from('Users')
                .select('First_Name, Last_Name, Username')
                .eq('UID', request.user_uid)
                .single();
            
            const requester = requesterData;
            const requesterName = (requester?.First_Name && requester?.Last_Name)
                ? `${requester.First_Name} ${requester.Last_Name}`
                : requester?.Username || 'A family member';
            
            // Get user who marked it as answered
            const { data: answererData } = await supabase
                .from('Users')
                .select('First_Name, Last_Name, Username')
                .eq('UID', userUid)
                .single();
            
            const answererName = (answererData?.First_Name && answererData?.Last_Name)
                ? `${answererData.First_Name} ${answererData.Last_Name}`
                : answererData?.Username || 'A family member';
            
            // Send praise report to all users
            const { data: allUsers } = await supabase
                .from('Users')
                .select('UID');
            
            if (allUsers && allUsers.length > 0) {
                const messageContent = `
                    <div style="padding: 20px;">
                        <h3 style="color: #28a745; margin-top: 0;">🙌 Praise Report!</h3>
                        <p><strong>Prayer Request Answered!</strong></p>
                        <div style="background: #d4edda; padding: 15px; border-radius: 8px; margin: 10px 0; border: 2px solid #28a745;">
                            <p style="margin: 0; font-weight: 600; color: #155724;">
                                "${escapeHtml(request.title)}"
                            </p>
                            <p style="margin: 5px 0 0 0; color: #155724;">
                                Originally requested by: ${escapeHtml(requesterName)}
                            </p>
                        </div>
                        <p><strong>Marked as answered by:</strong> ${escapeHtml(answererName)}</p>
                        <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                        <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #e0e0e0;">
                            <p style="font-style: italic; color: #666;">"Give thanks to the Lord, for he is good; his love endures forever." - Psalm 107:1</p>
                        </div>
                        <div style="margin-top: 20px;">
                            <a href="${getPagePath('pray-ground.html')}" style="
                                display: inline-block;
                                padding: 10px 20px;
                                background: #28a745;
                                color: white;
                                text-decoration: none;
                                border-radius: 5px;
                                font-weight: 600;
                            ">View in Pray Ground</a>
                        </div>
                    </div>
                `;
                
                for (const user of allUsers) {
                    await supabase
                        .from('message_boxes')
                        .insert({
                            from_user_uid: userUid,
                            to_user_uid: user.UID,
                            subject: `Praise Report: ${request.title}`,
                            body: messageContent,
                            folder: 'inbox',
                            is_read: false
                        });
                }
            }
        }
        
        // Close modal if open
        closePrayerModal();
        
        // Reload prayer requests
        await loadPrayerRequests(userUid);
        
        // Show success message
        if (showSuccess) {
            showPrayerMessage('Prayer request marked as answered! Praise report sent to all family members.', 'success');
        }
        
    } catch (error) {
        console.error('Error marking prayer as answered:', error);
        showPrayerMessage('Error marking prayer as answered. Please try again.', 'error');
    }
}

// Open prayer request modal by ID (helper function)
async function openPrayerModalById(requestId, currentUserUid) {
    const request = currentRequests.find(r => r.request_id === requestId);
    if (!request) {
        console.error('Request not found:', requestId);
        return;
    }
    const prayerCount = currentPrayerCounts[requestId] || 0;
    const hasUserPrayed = currentUserPrayers.has(requestId);
    await openPrayerModal(request, currentUserMap, currentUserUid, prayerCount, hasUserPrayed);
}

// Open prayer request modal
async function openPrayerModal(request, userMap, currentUserUid, prayerCount = 0, hasUserPrayed = false) {
    const modal = document.getElementById('prayerModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalStatus = document.getElementById('modalStatus');
    const modalDetails = document.getElementById('modalDetails');
    const modalMeta = document.getElementById('modalMeta');
    const modalActions = document.getElementById('modalActions');
    
    if (!modal) return;
    
    // Refresh prayer count and status
    try {
        const { data: prayers } = await supabase
            .from('prayer_prayers')
            .select('user_uid')
            .eq('request_id', request.request_id);
        
        if (prayers) {
            prayerCount = prayers.length;
            hasUserPrayed = prayers.some(p => p.user_uid === currentUserUid);
        }
    } catch (error) {
        console.warn('Error refreshing prayer count:', error);
    }
    
    const user = userMap[request.user_uid];
    const authorName = (user?.First_Name && user?.Last_Name)
        ? `${user.First_Name} ${user.Last_Name}`
        : user?.Username || 'Unknown';
    
    const isOwner = request.user_uid === currentUserUid;
    const isAnswered = request.status === 'answered';
    
    const requestDate = new Date(request.created_at);
    const dateStr = requestDate.toLocaleDateString() + ' at ' + requestDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Set title
    if (modalTitle) modalTitle.textContent = escapeHtml(request.title);
    
    // Set status
    if (modalStatus) {
        modalStatus.innerHTML = `
            <span class="prayer-request-status-badge ${isAnswered ? 'answered' : 'active'}">
                ${isAnswered ? '✓ Answered' : '⏳ Active'}
            </span>
            ${prayerCount > 0 ? `
                <span style="margin-left: 15px; color: #1976D2; font-weight: 600; font-size: 1rem;">
                    🙏 ${prayerCount} ${prayerCount === 1 ? 'person has' : 'people have'} prayed for this
                </span>
            ` : ''}
        `;
    }
    
    // Set details
    if (modalDetails) {
        modalDetails.textContent = request.details;
    }
    
    // Set meta information
    if (modalMeta) {
        let metaHtml = `
            <div class="prayer-modal-meta-item">
                <span class="prayer-modal-meta-label">Posted by:</span>
                <span>${escapeHtml(authorName)}</span>
            </div>
            <div class="prayer-modal-meta-item">
                <span class="prayer-modal-meta-label">Date:</span>
                <span>${escapeHtml(dateStr)}</span>
            </div>
        `;
        
        if (isAnswered && request.answered_at) {
            const answeredDate = new Date(request.answered_at);
            const answeredDateStr = answeredDate.toLocaleDateString() + ' at ' + answeredDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            const answerer = userMap[request.answered_by_uid];
            const answererName = answerer 
                ? ((answerer.First_Name && answerer.Last_Name) ? `${answerer.First_Name} ${answerer.Last_Name}` : answerer.Username || 'Unknown')
                : 'Unknown';
            
            metaHtml += `
                <div class="prayer-modal-meta-item">
                    <span class="prayer-modal-meta-label">Answered on:</span>
                    <span>${escapeHtml(answeredDateStr)}</span>
                </div>
                <div class="prayer-modal-meta-item">
                    <span class="prayer-modal-meta-label">Marked as answered by:</span>
                    <span>${escapeHtml(answererName)}</span>
                </div>
            `;
        }
        
            modalMeta.innerHTML = metaHtml;
    }
    
    // Add praise report section
    const modalPraiseReport = document.getElementById('modalPraiseReport');
    if (modalPraiseReport) {
        if (isOwner) {
            // Show editable praise report for owner (available at any time)
            const placeholderText = isAnswered 
                ? 'Describe how God answered this prayer...' 
                : 'Share updates, answered prayers, or how God is working in this situation...';
            const labelText = isAnswered 
                ? 'Share how God answered this prayer:' 
                : 'Add a praise report or update (you can edit this anytime):';
            
            modalPraiseReport.innerHTML = `
                <div style="margin-top: 25px; padding-top: 25px; border-top: 2px solid #e0e0e0;">
                    <h3 style="color: #28a745; margin-bottom: 15px; font-size: 1.3rem;">🙌 Praise Report</h3>
                    <p style="color: #666; margin-bottom: 15px; font-style: italic;">${labelText}</p>
                    <textarea id="praiseReportText" style="
                        width: 100%;
                        padding: 15px;
                        border: 2px solid #28a745;
                        border-radius: 8px;
                        font-size: 1rem;
                        min-height: 150px;
                        resize: vertical;
                        font-family: inherit;
                        box-sizing: border-box;
                        margin-bottom: 15px;
                    " placeholder="${placeholderText}">${escapeHtml(request.praise_report || '')}</textarea>
                    <button class="btn btn-success" onclick="savePraiseReport(${request.request_id}, ${currentUserUid})" style="
                        padding: 12px 24px;
                        font-size: 1rem;
                        font-weight: 600;
                    ">💾 ${request.praise_report ? 'Update' : 'Save'} Praise Report</button>
                    ${request.praise_report ? `
                        <p style="color: #666; font-size: 0.9rem; margin-top: 10px; font-style: italic;">
                            You can edit this praise report at any time by updating the text above and clicking "Update Praise Report".
                        </p>
                    ` : ''}
                </div>
            `;
        } else if (request.praise_report) {
            // Show read-only praise report for others (if it exists)
            modalPraiseReport.innerHTML = `
                <div style="margin-top: 25px; padding-top: 25px; border-top: 2px solid #e0e0e0;">
                    <h3 style="color: #28a745; margin-bottom: 15px; font-size: 1.3rem;">🙌 Praise Report</h3>
                    <div style="
                        background: #d4edda;
                        padding: 20px;
                        border-radius: 8px;
                        border: 2px solid #28a745;
                        color: #155724;
                        white-space: pre-wrap;
                        line-height: 1.8;
                    ">${escapeHtml(request.praise_report)}</div>
                </div>
            `;
        } else {
            // No praise report yet - only show placeholder if answered
            if (isAnswered) {
                modalPraiseReport.innerHTML = `
                    <div style="margin-top: 25px; padding-top: 25px; border-top: 2px solid #e0e0e0;">
                        <h3 style="color: #28a745; margin-bottom: 15px; font-size: 1.3rem;">🙌 Praise Report</h3>
                        <p style="color: #666; font-style: italic;">A praise report will be added soon!</p>
                    </div>
                `;
            } else {
                // Don't show anything if not answered and no praise report
                modalPraiseReport.innerHTML = '';
            }
        }
    }
    
    // Set actions
    if (modalActions) {
        let actionsHtml = '';
        
        // Add "I Prayed For This" button (for everyone except owner, and only if not already prayed)
        if (!isOwner && !hasUserPrayed && !isAnswered) {
            actionsHtml += `
                <button class="btn btn-primary" onclick="markAsPrayedFor(${request.request_id}, ${currentUserUid}, ${request.user_uid})" style="
                    padding: 15px 30px;
                    font-size: 1.1rem;
                    font-weight: 600;
                    margin-right: 10px;
                ">
                    🙏 I Prayed For This
                </button>
            `;
        } else if (!isOwner && hasUserPrayed) {
            actionsHtml += `
                <div style="padding: 15px 30px; font-size: 1.1rem; color: #28a745; font-weight: 600; display: inline-block;">
                    ✓ You have prayed for this request
                </div>
            `;
        }
        
        // Add "Mark as Answered" button (for owner only)
        if (!isAnswered && isOwner) {
            actionsHtml += `
                <button class="btn btn-success" onclick="handleMarkAsAnswered(${request.request_id}, ${currentUserUid}, true)" style="
                    padding: 15px 30px;
                    font-size: 1.1rem;
                    font-weight: 600;
                    margin-left: ${!isOwner && !hasUserPrayed ? '10px' : '0'};
                    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
                    border: 2px solid #28a745;
                    box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
                    transition: all 0.3s ease;
                " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(40, 167, 69, 0.5)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(40, 167, 69, 0.3)'">
                    ✅ Mark as Answered
                </button>
            `;
        }
        
        modalActions.innerHTML = actionsHtml || '<div style="color: #999; font-style: italic;">No actions available</div>';
    }
    
    // Show modal
    modal.style.display = 'block';
}

// Close prayer modal
function closePrayerModal() {
    const modal = document.getElementById('prayerModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Setup modal close handlers
function setupPrayerModal() {
    const modal = document.getElementById('prayerModal');
    const closeBtn = document.getElementById('closeModal');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closePrayerModal);
    }
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closePrayerModal();
            }
        });
    }
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closePrayerModal();
        }
    });
}

// Mark prayer request as prayed for from table (reloads table)
async function markAsPrayedForFromTable(requestId, userUid, posterUid) {
    await markAsPrayedFor(requestId, userUid, posterUid, true);
}

// Mark prayer request as prayed for
async function markAsPrayedFor(requestId, userUid, posterUid, fromTable = false) {
    try {
        // Check if user has already prayed for this request
        const { data: existingPrayer, error: checkError } = await supabase
            .from('prayer_prayers')
            .select('prayer_id')
            .eq('request_id', requestId)
            .eq('user_uid', userUid)
            .maybeSingle();
        
        if (checkError && checkError.code !== 'PGRST116') {
            throw checkError;
        }
        
        if (existingPrayer) {
            alert('You have already prayed for this request!');
            return;
        }
        
        // Record that user prayed for this request
        const { error: insertError } = await supabase
            .from('prayer_prayers')
            .insert({
                request_id: requestId,
                user_uid: userUid
            });
        
        if (insertError) {
            // Check if table doesn't exist
            const isMissingTable = /does not exist/i.test(insertError.message) || 
                                /schema cache/i.test(insertError.message) || 
                                insertError.code === '42P01';
            if (isMissingTable) {
                alert('Prayer tracking is not set up yet. Please run create_prayer_prayers_table.sql in Supabase.');
                return;
            }
            throw insertError;
        }
        
        // Get prayer request details
        const { data: request, error: requestError } = await supabase
            .from('prayer_requests')
            .select('title')
            .eq('request_id', requestId)
            .single();
        
        if (requestError) throw requestError;
        
        // Get user who prayed info
        const { data: prayerUserData, error: prayerUserError } = await supabase
            .from('Users')
            .select('First_Name, Last_Name, Username')
            .eq('UID', userUid)
            .single();
        
        if (prayerUserError) throw prayerUserError;
        
        const prayerUserName = (prayerUserData?.First_Name && prayerUserData?.Last_Name)
            ? `${prayerUserData.First_Name} ${prayerUserData.Last_Name}`
            : prayerUserData?.Username || 'A family member';
        
        const now = new Date();
        const dateStr = now.toLocaleDateString() + ' at ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        // Send encouraging message to the original poster
        const messageContent = `
            <div style="padding: 20px;">
                <h3 style="color: #1976D2; margin-top: 0;">🙏 Someone Prayed For Your Request!</h3>
                <p><strong>Great news!</strong> Someone in your family has lifted up your prayer request in prayer!</p>
                <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 15px 0; border: 2px solid #1976D2;">
                    <p style="margin: 0; font-weight: 600; color: #1565C0;">
                        "${escapeHtml(request.title)}"
                    </p>
                </div>
                <p><strong>Prayed by:</strong> ${escapeHtml(prayerUserName)}</p>
                <p><strong>Date:</strong> ${escapeHtml(dateStr)}</p>
                <div style="margin-top: 20px; padding: 15px; background: #d4edda; border-radius: 8px; border: 2px solid #28a745;">
                    <p style="margin: 0; font-style: italic; color: #155724;">
                        "Therefore, confess your sins to one another and pray for one another, that you may be healed. The prayer of a righteous person has great power as it is working." - James 5:16
                    </p>
                </div>
                <div style="margin-top: 20px;">
                    <a href="${getPagePath('pray-ground.html')}" style="
                        display: inline-block;
                        padding: 10px 20px;
                        background: #1976D2;
                        color: white;
                        text-decoration: none;
                        border-radius: 5px;
                        font-weight: 600;
                    ">View in Pray Ground</a>
                </div>
            </div>
        `;
        
        // Send message to the original poster
        const { error: messageError } = await supabase
            .from('message_boxes')
            .insert({
                from_user_uid: userUid,
                to_user_uid: posterUid,
                subject: `🙏 Someone Prayed For: ${request.title}`,
                body: messageContent,
                folder: 'inbox',
                is_read: false
            });
        
        if (messageError) {
            console.error('Error sending message to poster:', messageError);
            // Don't fail the whole operation if message fails, but log it
        } else {
            console.log('Message sent successfully to poster:', posterUid);
        }
        
        // Close modal if it was open (only if called from modal, not from table)
        if (!fromTable) {
            closePrayerModal();
        }
        
        // Reload prayer requests to update the table (including action buttons)
        await loadPrayerRequests(userUid);
        
        // Show success message
        showPrayerMessage('Thank you for praying! The requester has been notified.', 'success');
        
    } catch (error) {
        console.error('Error marking as prayed for:', error);
        showPrayerMessage('Error recording your prayer. Please try again.', 'error');
    }
}

// Save praise report
async function savePraiseReport(requestId, userUid) {
    const praiseReportText = document.getElementById('praiseReportText');
    if (!praiseReportText) return;
    
    const praiseReport = praiseReportText.value.trim();
    
    try {
        const { error } = await supabase
            .from('prayer_requests')
            .update({ praise_report: praiseReport })
            .eq('request_id', requestId)
            .eq('user_uid', userUid); // Ensure only owner can update
        
        if (error) throw error;
        
        // Update the stored request
        const requestIndex = currentRequests.findIndex(r => r.request_id === requestId);
        if (requestIndex !== -1) {
            currentRequests[requestIndex].praise_report = praiseReport;
        }
        
        // Show success message
        showPrayerMessage('Praise report saved successfully!', 'success');
        
        // Reload to refresh the display
        await loadPrayerRequests(userUid);
        
        // Reopen modal to show updated praise report
        setTimeout(() => {
            openPrayerModalById(requestId, userUid);
        }, 500);
        
    } catch (error) {
        console.error('Error saving praise report:', error);
        showPrayerMessage('Error saving praise report. Please try again.', 'error');
    }
}

// Make functions available globally
window.markAsAnswered = markAsAnswered;
window.handleMarkAsAnswered = handleMarkAsAnswered;
window.markAsPrayedFor = markAsPrayedFor;
window.markAsPrayedForFromTable = markAsPrayedForFromTable;
window.openPrayerModal = openPrayerModal;
window.openPrayerModalById = openPrayerModalById;
window.closePrayerModal = closePrayerModal;
window.savePraiseReport = savePraiseReport;

// Show message
function showPrayerMessage(message, type) {
    const messageDiv = document.getElementById('prayerMessage');
    if (!messageDiv) return;
    
    messageDiv.style.display = 'block';
    messageDiv.style.background = type === 'success' ? '#d4edda' : '#f8d7da';
    messageDiv.style.border = `2px solid ${type === 'success' ? '#28a745' : '#dc3545'}`;
    messageDiv.style.color = type === 'success' ? '#155724' : '#721c24';
    messageDiv.textContent = message;
    
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}


