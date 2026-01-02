// Messages page functionality
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

// Emoji list for picker
const emojis = ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠', '😈', '👿', '👹', '👺', '🤡', '💩', '👻', '💀', '☠️', '👽', '👾', '🤖', '🎃', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾'];

// Kid-friendly meme images (using emoji representations for now)
const kidMemes = [
    { name: 'Happy', emoji: '😊', code: '<span style="font-size: 2rem;">😊</span>' },
    { name: 'Excited', emoji: '🤩', code: '<span style="font-size: 2rem;">🤩</span>' },
    { name: 'Cool', emoji: '😎', code: '<span style="font-size: 2rem;">😎</span>' },
    { name: 'Love', emoji: '🥰', code: '<span style="font-size: 2rem;">🥰</span>' },
    { name: 'Party', emoji: '🎉', code: '<span style="font-size: 2rem;">🎉</span>' },
    { name: 'Star', emoji: '⭐', code: '<span style="font-size: 2rem;">⭐</span>' },
    { name: 'Fire', emoji: '🔥', code: '<span style="font-size: 2rem;">🔥</span>' },
    { name: 'Thumbs Up', emoji: '👍', code: '<span style="font-size: 2rem;">👍</span>' },
    { name: 'Clap', emoji: '👏', code: '<span style="font-size: 2rem;">👏</span>' },
    { name: 'Heart', emoji: '❤️', code: '<span style="font-size: 2rem;">❤️</span>' },
    { name: 'Rainbow', emoji: '🌈', code: '<span style="font-size: 2rem;">🌈</span>' },
    { name: 'Sun', emoji: '☀️', code: '<span style="font-size: 2rem;">☀️</span>' },
];

let currentMessageId = null;
let currentMessage = null;
let allUsers = [];
let composeMode = 'new'; // 'new', 'reply', 'forward'

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    const checkAuth = setInterval(() => {
        if (window.authStatus && window.authStatus.isAuthenticated) {
            clearInterval(checkAuth);
            checkUserAccess();
        } else if (window.authStatus && !window.authStatus.isAuthenticated) {
            clearInterval(checkAuth);
            window.location.href = getPagePath('login.html');
        }
    }, 100);
    
    setTimeout(() => {
        clearInterval(checkAuth);
    }, 5000);
});

async function checkUserAccess() {
    const authCheck = document.getElementById('authCheck');
    const mainContent = document.getElementById('mainContent');
    
    try {
        const session = window.authStatus?.getSession();
        if (!session || !session.uid) {
            window.location.href = getPagePath('login.html');
            return;
        }
        
        authCheck.classList.add('hidden');
        mainContent.classList.remove('hidden');
        
        await loadUsers();
        await loadMessages();
        setupEventListeners();
        setupEmojiPicker();
        setupMemeGallery();
    } catch (error) {
        console.error('Error checking access:', error);
        window.location.href = getPagePath('login.html');
    }
}

function setupEventListeners() {
    document.getElementById('composeBtn').addEventListener('click', () => openCompose('new'));
    document.getElementById('closeComposeBtn').addEventListener('click', closeCompose);
    document.getElementById('cancelComposeBtn').addEventListener('click', closeCompose);
    document.getElementById('composeForm').addEventListener('submit', handleSendMessage);
    
    // Close modal when clicking outside
    document.getElementById('composeModal').addEventListener('click', (e) => {
        if (e.target.id === 'composeModal') {
            closeCompose();
        }
    });
}

async function loadUsers() {
    try {
        const { data, error } = await supabase
            .from('Users')
            .select('UID, First_Name, Last_Name, Username')
            .order('First_Name', { ascending: true });
        
        if (error) throw error;
        
        allUsers = data || [];
        
        // Populate user dropdown
        const toUserSelect = document.getElementById('toUser');
        toUserSelect.innerHTML = '<option value="">Select a user...</option>';
        allUsers.forEach(user => {
            const name = user.First_Name && user.Last_Name 
                ? `${user.First_Name} ${user.Last_Name} (${user.Username})`
                : user.Username;
            const option = document.createElement('option');
            option.value = user.UID;
            option.textContent = name;
            toUserSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading users:', error);
        showError('Failed to load users. Please refresh the page.');
    }
}

async function loadMessages() {
    const session = window.authStatus?.getSession();
    if (!session) return;
    
    const messagesList = document.getElementById('messagesList');
    
    try {
        // Get all messages for this user (both sent and received)
        const { data: receivedMessages, error: receivedError } = await supabase
            .from('messages')
            .select(`
                message_id,
                from_user_uid,
                to_user_uid,
                subject,
                body_html,
                is_read,
                read_at,
                created_at,
                deleted_at,
                parent_message_id,
                forwarded_from_message_id,
                is_forwarded,
                forwarded_from_user_uid,
                from_user:Users!messages_from_user_uid_fkey(First_Name, Last_Name, Username),
                to_user:Users!messages_to_user_uid_fkey(First_Name, Last_Name, Username)
            `)
            .eq('to_user_uid', session.uid)
            .is('deleted_at', null)
            .order('created_at', { ascending: false });
        
        if (receivedError) throw receivedError;
        
        const { data: sentMessages, error: sentError } = await supabase
            .from('messages')
            .select(`
                message_id,
                from_user_uid,
                to_user_uid,
                subject,
                body_html,
                is_read,
                read_at,
                created_at,
                deleted_at,
                parent_message_id,
                forwarded_from_message_id,
                is_forwarded,
                forwarded_from_user_uid,
                from_user:Users!messages_from_user_uid_fkey(First_Name, Last_Name, Username),
                to_user:Users!messages_to_user_uid_fkey(First_Name, Last_Name, Username)
            `)
            .eq('from_user_uid', session.uid)
            .is('deleted_at', null)
            .order('created_at', { ascending: false });
        
        if (sentError) throw sentError;
        
        // Combine and sort messages
        const allMessages = [
            ...(receivedMessages || []).map(m => ({ ...m, direction: 'received' })),
            ...(sentMessages || []).map(m => ({ ...m, direction: 'sent' }))
        ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        
        if (allMessages.length === 0) {
            messagesList.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📭</div><p>No messages yet</p></div>';
            return;
        }
        
        // Display messages
        messagesList.innerHTML = '';
        allMessages.forEach(message => {
            const messageItem = document.createElement('div');
            messageItem.className = `message-item ${message.direction === 'received' && !message.is_read ? 'unread' : ''}`;
            messageItem.dataset.messageId = message.message_id;
            
            const otherUser = message.direction === 'received' ? message.from_user : message.to_user;
            const fromName = otherUser?.First_Name && otherUser?.Last_Name
                ? `${otherUser.First_Name} ${otherUser.Last_Name}`
                : otherUser?.Username || 'Unknown';
            
            const date = new Date(message.created_at);
            const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            
            // Strip HTML for preview
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = message.body_html || '';
            const textPreview = tempDiv.textContent || tempDiv.innerText || '';
            
            messageItem.innerHTML = `
                <div class="message-item-header">
                    <div class="message-item-from">${message.direction === 'received' ? 'From' : 'To'}: ${fromName}</div>
                    <div class="message-item-date">${dateStr}</div>
                </div>
                <div class="message-item-subject">${message.subject || '(No subject)'}</div>
                <div class="message-item-preview">${textPreview.substring(0, 50)}${textPreview.length > 50 ? '...' : ''}</div>
            `;
            
            messageItem.addEventListener('click', () => viewMessage(message));
            messagesList.appendChild(messageItem);
        });
        
    } catch (error) {
        console.error('Error loading messages:', error);
        messagesList.innerHTML = '<div class="empty-state"><p>Error loading messages. Please refresh the page.</p></div>';
    }
}

async function viewMessage(message) {
    currentMessageId = message.message_id;
    currentMessage = message;
    
    const messageView = document.getElementById('messageView');
    messageView.classList.add('active');
    
    const session = window.authStatus?.getSession();
    const otherUser = message.direction === 'received' ? message.from_user : message.to_user;
    const fromName = otherUser?.First_Name && otherUser?.Last_Name
        ? `${otherUser.First_Name} ${otherUser.Last_Name}`
        : otherUser?.Username || 'Unknown';
    
    const date = new Date(message.created_at);
    const dateStr = date.toLocaleString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
    
    messageView.innerHTML = `
        <div class="message-view-header">
            <div class="message-view-subject">${message.subject || '(No subject)'}</div>
            <div class="message-view-meta">
                <div class="message-view-from">${message.direction === 'received' ? 'From' : 'To'}: ${fromName}</div>
                <div class="message-view-date">${dateStr}</div>
            </div>
        </div>
        <div class="message-view-body">${message.body_html || ''}</div>
        <div class="message-view-actions">
            ${message.direction === 'received' ? `<button class="btn-action btn-reply" id="replyBtn">Reply</button>` : ''}
            <button class="btn-action btn-forward" id="forwardBtn">Forward</button>
            <button class="btn-action btn-delete" id="deleteBtn">Delete</button>
        </div>
    `;
    
    // Add event listeners
    if (message.direction === 'received') {
        document.getElementById('replyBtn').addEventListener('click', () => openCompose('reply', message));
    }
    document.getElementById('forwardBtn').addEventListener('click', () => openCompose('forward', message));
    document.getElementById('deleteBtn').addEventListener('click', () => deleteMessage(message.message_id));
    
    // Mark as read if received and unread
    if (message.direction === 'received' && !message.is_read) {
        await markAsRead(message.message_id);
    }
}

async function markAsRead(messageId) {
    try {
        const { error } = await supabase
            .from('messages')
            .update({ 
                is_read: true,
                read_at: new Date().toISOString()
            })
            .eq('message_id', messageId);
        
        if (error) throw error;
        
        // Reload messages to update unread status
        await loadMessages();
        
        // Update unread badge in profile menu if it exists
        if (window.updateUnreadBadge) {
            window.updateUnreadBadge();
        }
    } catch (error) {
        console.error('Error marking message as read:', error);
    }
}

function openCompose(mode, message = null) {
    composeMode = mode;
    currentMessage = message;
    
    const modal = document.getElementById('composeModal');
    const title = document.getElementById('composeTitle');
    const form = document.getElementById('composeForm');
    
    // Reset form
    form.reset();
    document.getElementById('messageBody').innerHTML = '';
    
    if (mode === 'reply') {
        title.textContent = 'Reply';
        document.getElementById('toUser').value = message.from_user_uid;
        document.getElementById('toUser').disabled = true;
        document.getElementById('messageSubject').value = `Re: ${message.subject || ''}`;
    } else if (mode === 'forward') {
        title.textContent = 'Forward';
        document.getElementById('toUser').value = '';
        document.getElementById('toUser').disabled = false;
        document.getElementById('messageSubject').value = `Fwd: ${message.subject || ''}`;
        document.getElementById('messageBody').innerHTML = `<br><br>--- Forwarded Message ---<br>${message.body_html || ''}`;
    } else {
        title.textContent = 'Compose Message';
        document.getElementById('toUser').value = '';
        document.getElementById('toUser').disabled = false;
        document.getElementById('messageSubject').value = '';
    }
    
    modal.classList.add('active');
}

function closeCompose() {
    document.getElementById('composeModal').classList.remove('active');
    document.getElementById('toUser').disabled = false;
}

async function handleSendMessage(e) {
    e.preventDefault();
    
    const session = window.authStatus?.getSession();
    if (!session) return;
    
    const toUserUid = document.getElementById('toUser').value;
    const subject = document.getElementById('messageSubject').value;
    const bodyHtml = document.getElementById('messageBody').innerHTML;
    
    if (!toUserUid || !subject || !bodyHtml.trim()) {
        showError('Please fill in all fields.');
        return;
    }
    
    try {
        let parentMessageId = null;
        if (composeMode === 'reply' && currentMessage) {
            parentMessageId = currentMessage.message_id;
        }
        
        // Insert message
        const { data: newMessage, error } = await supabase
            .from('messages')
            .insert({
                from_user_uid: session.uid,
                to_user_uid: toUserUid,
                subject: subject,
                body_html: bodyHtml,
                parent_message_id: composeMode === 'reply' ? parentMessageId : null,
                forwarded_from_message_id: composeMode === 'forward' && currentMessage ? currentMessage.message_id : null,
                is_forwarded: composeMode === 'forward'
            })
            .select()
            .single();
        
        if (error) throw error;
        
        // Get recipient info for notification
        const recipient = allUsers.find(u => u.UID === parseInt(toUserUid));
        const fromName = session.firstName && session.lastName
            ? `${session.firstName} ${session.lastName}`
            : session.username;
        
        // Send email notification if recipient is admin
        if (recipient) {
            try {
                const { data: recipientData } = await supabase
                    .from('Users')
                    .select('user_type')
                    .eq('UID', toUserUid)
                    .single();
                
                if (recipientData && recipientData.user_type === 'admin') {
                    await supabase.functions.invoke('send-approval-notification', {
                        body: {
                            notification_type: 'new_message',
                            message_id: newMessage.message_id,
                            from_user_name: fromName,
                            message_subject: subject,
                            message_body: bodyHtml
                        }
                    });
                }
            } catch (notifError) {
                console.error('Error sending notification:', notifError);
                // Don't fail the message send if notification fails
            }
        }
        
        showSuccess('Message sent successfully!');
        closeCompose();
        await loadMessages();
        
        // Update unread badge
        if (window.updateUnreadBadge) {
            window.updateUnreadBadge();
        }
        
    } catch (error) {
        console.error('Error sending message:', error);
        showError('Failed to send message. Please try again.');
    }
}

async function deleteMessage(messageId) {
    if (!confirm('Are you sure you want to delete this message?')) {
        return;
    }
    
    try {
        // Get message data before deleting
        const { data: message, error: fetchError } = await supabase
            .from('messages')
            .select('*')
            .eq('message_id', messageId)
            .single();
        
        if (fetchError) throw fetchError;
        
        const session = window.authStatus?.getSession();
        
        // Soft delete
        const { error: deleteError } = await supabase
            .from('messages')
            .update({ deleted_at: new Date().toISOString() })
            .eq('message_id', messageId);
        
        if (deleteError) throw deleteError;
        
        // Save to deleted_messages table
        await supabase
            .from('deleted_messages')
            .insert({
                message_id: messageId,
                from_user_uid: message.from_user_uid,
                to_user_uid: message.to_user_uid,
                subject: message.subject,
                body_html: message.body_html,
                deleted_by_user_uid: session.uid,
                original_created_at: message.created_at,
                is_read: message.is_read,
                parent_message_id: message.parent_message_id,
                is_forwarded: message.is_forwarded || false,
                forwarded_from_user_uid: message.forwarded_from_user_uid
            });
        
        showSuccess('Message deleted successfully!');
        
        // Clear message view
        document.getElementById('messageView').innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📧</div>
                <p>Select a message to view</p>
            </div>
        `;
        
        await loadMessages();
        
    } catch (error) {
        console.error('Error deleting message:', error);
        showError('Failed to delete message. Please try again.');
    }
}

function setupEmojiPicker() {
    const emojiPicker = document.getElementById('emojiPicker');
    emojis.forEach(emoji => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'emoji-btn';
        btn.textContent = emoji;
        btn.addEventListener('click', () => {
            insertAtCursor(emoji);
        });
        emojiPicker.appendChild(btn);
    });
}

function setupMemeGallery() {
    const memeGallery = document.getElementById('memeGallery');
    kidMemes.forEach(meme => {
        const memeItem = document.createElement('div');
        memeItem.className = 'meme-item';
        memeItem.innerHTML = `<div style="text-align: center; padding: 10px; font-size: 2rem;">${meme.emoji}</div><div style="text-align: center; font-size: 0.7rem; padding: 5px;">${meme.name}</div>`;
        memeItem.addEventListener('click', () => {
            insertAtCursor(meme.code);
        });
        memeGallery.appendChild(memeItem);
    });
}

function insertAtCursor(text) {
    const messageBody = document.getElementById('messageBody');
    const selection = window.getSelection();
    
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        const textNode = document.createTextNode(text);
        range.insertNode(textNode);
        range.setStartAfter(textNode);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
    } else {
        messageBody.innerHTML += text;
    }
    
    messageBody.focus();
}

function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000);
    }
}

function showSuccess(message) {
    const successDiv = document.getElementById('successMessage');
    if (successDiv) {
        successDiv.textContent = message;
        successDiv.style.display = 'block';
        setTimeout(() => {
            successDiv.style.display = 'none';
        }, 5000);
    }
}

