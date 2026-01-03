// Feature Announcements System

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://frlajamhyyectdrcbrnd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybGFqYW1oeXllY3RkcmNicm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4ODA4ODksImV4cCI6MjA4MjQ1Njg4OX0.QAH0GME5_iYkz6SZjfqdL3q9E9Jo1qKv6YWFk2exAtY';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Helper function to get correct path for pages
function getPagePath(pageName) {
    const currentPath = window.location.pathname;
    if (currentPath === '/' || currentPath.endsWith('/index.html') || currentPath.endsWith('index.html')) {
        return pageName.startsWith('pages/') ? pageName : `pages/${pageName}`;
    }
    return pageName;
}

// Check and show feature announcements
async function checkFeatureAnnouncements(userUid) {
    try {
        // Get active announcements
        const { data: announcements, error: announcementsError } = await supabase
            .from('feature_announcements')
            .select('*')
            .eq('is_active', true)
            .order('created_at', { ascending: false });
        
        if (announcementsError) {
            console.error('Error fetching announcements:', announcementsError);
            return;
        }
        
        if (!announcements || announcements.length === 0) {
            return; // No announcements
        }
        
        // Get announcements user has already seen
        const announcementIds = announcements.map(a => a.announcement_id);
        const { data: viewedAnnouncements, error: viewsError } = await supabase
            .from('user_announcement_views')
            .select('announcement_id')
            .eq('user_uid', userUid)
            .in('announcement_id', announcementIds);
        
        if (viewsError) {
            console.error('Error fetching viewed announcements:', viewsError);
            return;
        }
        
        const viewedIds = new Set((viewedAnnouncements || []).map(v => v.announcement_id));
        
        // Find first unviewed announcement
        const unviewedAnnouncement = announcements.find(a => !viewedIds.has(a.announcement_id));
        
        if (unviewedAnnouncement) {
            showFeatureAnnouncement(unviewedAnnouncement, userUid);
        }
        
    } catch (error) {
        console.error('Error checking feature announcements:', error);
    }
}

// Show feature announcement
function showFeatureAnnouncement(announcement, userUid) {
    // Create announcement container if it doesn't exist
    let container = document.getElementById('featureAnnouncementContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'featureAnnouncementContainer';
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;
        document.body.appendChild(container);
    }
    
    const linkUrl = announcement.link_url ? getPagePath(announcement.link_url) : null;
    
    container.innerHTML = `
        <div class="feature-announcement" style="
            background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
            border: 4px solid #DAA520;
            border-radius: 20px;
            padding: 40px;
            max-width: 600px;
            width: 90%;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            position: relative;
            animation: slideDown 0.4s ease;
            text-align: center;
        ">
            <button class="announcement-close" onclick="closeFeatureAnnouncement(${announcement.announcement_id}, ${userUid})" style="
                position: absolute;
                top: 15px;
                right: 15px;
                background: #dc3545;
                color: white;
                border: none;
                border-radius: 50%;
                width: 35px;
                height: 35px;
                font-size: 20px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
            " onmouseover="this.style.transform='scale(1.1)'; this.style.background='#c82333'" onmouseout="this.style.transform='scale(1)'; this.style.background='#dc3545'">×</button>
            
            <div style="font-size: 5rem; margin-bottom: 20px; animation: bounce 1s ease infinite;">${announcement.icon || '🎉'}</div>
            
            <h2 style="
                font-size: 2.5rem;
                font-weight: 900;
                color: #CC5500;
                margin: 0 0 20px 0;
                background: linear-gradient(135deg, #DAA520 0%, #CC5500 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            ">${escapeHtml(announcement.title)}</h2>
            
            <p style="
                font-size: 1.2rem;
                color: #333;
                line-height: 1.6;
                margin: 0 0 30px 0;
            ">${escapeHtml(announcement.description)}</p>
            
            ${linkUrl ? `
                <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                    <a href="${linkUrl}" class="btn btn-primary" style="
                        padding: 15px 30px;
                        font-size: 1.1rem;
                        font-weight: 600;
                        text-decoration: none;
                        display: inline-block;
                    " onclick="closeFeatureAnnouncement(${announcement.announcement_id}, ${userUid})">${escapeHtml(announcement.link_text || 'Check it out!')}</a>
                    <button class="btn btn-secondary" onclick="closeFeatureAnnouncement(${announcement.announcement_id}, ${userUid})" style="
                        padding: 15px 30px;
                        font-size: 1.1rem;
                        font-weight: 600;
                    ">Maybe Later</button>
                </div>
            ` : `
                <button class="btn btn-primary" onclick="closeFeatureAnnouncement(${announcement.announcement_id}, ${userUid})" style="
                    padding: 15px 30px;
                    font-size: 1.1rem;
                    font-weight: 600;
                ">Got it!</button>
            `}
        </div>
    `;
    
    // Add CSS animations if not already added
    if (!document.getElementById('announcementStyles')) {
        const style = document.createElement('style');
        style.id = 'announcementStyles';
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideDown {
                from { 
                    opacity: 0;
                    transform: translateY(-50px);
                }
                to { 
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        `;
        document.head.appendChild(style);
    }
}

// Close announcement and mark as viewed
async function closeFeatureAnnouncement(announcementId, userUid) {
    try {
        // Mark as viewed
        const { error } = await supabase
            .from('user_announcement_views')
            .insert({
                user_uid: userUid,
                announcement_id: announcementId
            });
        
        if (error && error.code !== '23505') { // Ignore duplicate key errors
            console.error('Error marking announcement as viewed:', error);
        }
        
        // Remove announcement from DOM
        const container = document.getElementById('featureAnnouncementContainer');
        if (container) {
            container.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                container.remove();
            }, 300);
        }
        
    } catch (error) {
        console.error('Error closing announcement:', error);
        // Still remove from DOM even if database update fails
        const container = document.getElementById('featureAnnouncementContainer');
        if (container) {
            container.remove();
        }
    }
}

// Make function available globally
window.closeFeatureAnnouncement = closeFeatureAnnouncement;

// Escape HTML to prevent XSS
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Export function to be used by other scripts
export { checkFeatureAnnouncements };

