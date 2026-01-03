// Pray Ground app

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://frlajamhyyectdrcbrnd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybGFqYW1oeXllY3RkcmNicm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4ODA4ODksImV4cCI6MjA4MjQ1Njg4OX0.QAH0GME5_iYkz6SZjfqdL3q9E9Jo1qKv6YWFk2exAtY';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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
        const { data: requests, error } = await supabase
            .from('prayer_requests')
            .select('request_id, user_uid, title, details, status, created_at, answered_at, answered_by_uid')
            .order('created_at', { ascending: false });
        
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
            row.style.cursor = 'pointer';
            row.onclick = () => openPrayerModal(request, userMap, currentUserUid);
            
            row.innerHTML = `
                <td class="prayer-request-title-cell">${escapeHtml(request.title)}</td>
                <td>${escapeHtml(dateStr)}</td>
                <td>${escapeHtml(authorName)}</td>
                <td>
                    <span class="prayer-request-status-badge ${isAnswered ? 'answered' : 'active'}">
                        ${isAnswered ? '✓ Answered' : '⏳ Active'}
                    </span>
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
                <small style="color: #666; margin-top: 10px; display: block;">Run <code>create_pray_ground_table.sql</code> in Supabase SQL Editor to create the table.</small>
            </div>`;
        } else {
            prayerRequestsList.innerHTML = `<div style="text-align: center; padding: 40px; color: #dc3545;">
                Error loading prayer requests: ${errorMsg}<br>
                <small style="color: #666; margin-top: 10px; display: block;">Error code: ${errorCode || 'N/A'}</small>
            </div>`;
        }
    }
}

// Mark prayer request as answered
async function markAsAnswered(requestId, userUid) {
    if (!confirm('Are you sure you want to mark this prayer request as answered? This will send a praise report to all family members.')) {
        return;
    }
    
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
        showPrayerMessage('Prayer request marked as answered! Praise report sent to all family members.', 'success');
        
    } catch (error) {
        console.error('Error marking prayer as answered:', error);
        showPrayerMessage('Error marking prayer as answered. Please try again.', 'error');
    }
}

// Open prayer request modal
function openPrayerModal(request, userMap, currentUserUid) {
    const modal = document.getElementById('prayerModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalStatus = document.getElementById('modalStatus');
    const modalDetails = document.getElementById('modalDetails');
    const modalMeta = document.getElementById('modalMeta');
    const modalActions = document.getElementById('modalActions');
    
    if (!modal) return;
    
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
    
    // Set actions
    if (modalActions) {
        if (!isAnswered && isOwner) {
            modalActions.innerHTML = `
                <button class="btn-answered" onclick="markAsAnswered(${request.request_id}, ${currentUserUid}); closePrayerModal();">
                    🙌 Mark as Answered
                </button>
            `;
        } else {
            modalActions.innerHTML = '';
        }
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

// Make functions available globally
window.markAsAnswered = markAsAnswered;
window.openPrayerModal = openPrayerModal;
window.closePrayerModal = closePrayerModal;

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


