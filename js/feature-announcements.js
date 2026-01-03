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
        console.log('Checking feature announcements for user:', userUid);
        
        // Add timeout to prevent hanging
        const announcementsPromise = (async () => {
            // Get active announcements
            const { data: announcements, error: announcementsError } = await supabase
                .from('feature_announcements')
                .select('*')
                .eq('is_active', true)
                .order('created_at', { ascending: false });
            
            return { announcements, announcementsError };
        })();
        
        const timeoutPromise = new Promise((resolve) => {
            setTimeout(() => {
                console.warn('Feature announcements check timed out after 3 seconds');
                resolve({ announcements: null, announcementsError: { message: 'Timeout' } });
            }, 3000); // 3 second timeout
        });
        
        const { announcements, announcementsError } = await Promise.race([announcementsPromise, timeoutPromise]);
        
        if (announcementsError) {
            // Check if it's a timeout
            if (announcementsError.message === 'Timeout') {
                console.warn('Feature announcements check timed out');
                return;
            }
            console.error('Error fetching announcements:', announcementsError);
            // Check if table doesn't exist
            const isMissingTable = /does not exist/i.test(announcementsError.message) || 
                                /schema cache/i.test(announcementsError.message) || 
                                announcementsError.code === '42P01';
            if (isMissingTable) {
                console.warn('Feature announcements table does not exist. Run create_feature_announcements_table.sql in Supabase.');
            }
            return;
        }
        
        if (!announcements || announcements.length === 0) {
            console.log('No active announcements found');
            return; // No announcements
        }
        
        console.log('Found', announcements.length, 'active announcements');
        
        // Get announcements user has already seen (with timeout)
        const viewsPromise = (async () => {
            const announcementIds = announcements.map(a => a.announcement_id);
            const { data: viewedAnnouncements, error: viewsError } = await supabase
                .from('user_announcement_views')
                .select('announcement_id')
                .eq('user_uid', userUid)
                .in('announcement_id', announcementIds);
            
            return { viewedAnnouncements, viewsError };
        })();
        
        const viewsTimeoutPromise = new Promise((resolve) => {
            setTimeout(() => {
                console.warn('Viewed announcements check timed out after 3 seconds');
                resolve({ viewedAnnouncements: [], viewsError: { message: 'Timeout' } });
            }, 3000);
        });
        
        const { viewedAnnouncements, viewsError } = await Promise.race([viewsPromise, viewsTimeoutPromise]);
        
        if (viewsError && viewsError.message !== 'Timeout') {
            console.error('Error fetching viewed announcements:', viewsError);
            // Check if table doesn't exist
            const isMissingTable = /does not exist/i.test(viewsError.message) || 
                                /schema cache/i.test(viewsError.message) || 
                                viewsError.code === '42P01';
            if (isMissingTable) {
                console.warn('User announcement views table does not exist. Run create_feature_announcements_table.sql in Supabase.');
            }
            return;
        }
        
        const viewedIds = new Set((viewedAnnouncements || []).map(v => v.announcement_id));
        console.log('User has viewed', viewedIds.size, 'out of', announcements.length, 'announcements');
        
        // Find first unviewed announcement
        const unviewedAnnouncement = announcements.find(a => !viewedIds.has(a.announcement_id));
        
        if (unviewedAnnouncement) {
            console.log('Showing unviewed announcement:', unviewedAnnouncement.title);
            // Wait a bit for page to load, then show announcement
            setTimeout(() => {
                showFeatureAnnouncement(unviewedAnnouncement, userUid);
            }, 500);
        } else {
            console.log('No unviewed announcements');
        }
        
    } catch (error) {
        console.error('Error checking feature announcements:', error);
    }
}

// Show feature announcement
function showFeatureAnnouncement(announcement, userUid) {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => showFeatureAnnouncement(announcement, userUid));
        return;
    }
    
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
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(5px);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            animation: fadeIn 0.4s ease;
        `;
        document.body.appendChild(container);
    } else {
        // If container exists, make sure it's visible
        container.style.display = 'flex';
    }
    
    const linkUrl = announcement.link_url ? getPagePath(announcement.link_url) : null;
    
    container.innerHTML = `
        <div class="feature-announcement" style="
            background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
            border: 5px solid #DAA520;
            border-radius: 25px;
            padding: 50px 40px;
            max-width: 650px;
            width: 90%;
            box-shadow: 0 25px 80px rgba(0, 0, 0, 0.6);
            position: relative;
            animation: slideDown 0.5s ease;
            text-align: center;
        ">
            <button class="announcement-close" onclick="closeFeatureAnnouncement(${announcement.announcement_id}, ${userUid})" style="
                position: absolute;
                top: 20px;
                right: 20px;
                background: #dc3545;
                color: white;
                border: none;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                font-size: 24px;
                font-weight: bold;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
                line-height: 1;
            " onmouseover="this.style.transform='scale(1.15) rotate(90deg)'; this.style.background='#c82333'" onmouseout="this.style.transform='scale(1) rotate(0deg)'; this.style.background='#dc3545'">×</button>
            
            <div style="
                font-size: 6rem; 
                margin-bottom: 25px; 
                animation: bounce 1.5s ease infinite;
                filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.2));
            ">${announcement.icon || '🎉'}</div>
            
            <div style="
                background: linear-gradient(135deg, #DAA520 0%, #CC5500 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                font-size: 0.9rem;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 2px;
                margin-bottom: 10px;
            ">✨ New Feature ✨</div>
            
            <h2 style="
                font-size: 2.8rem;
                font-weight: 900;
                color: #CC5500;
                margin: 0 0 25px 0;
                background: linear-gradient(135deg, #DAA520 0%, #CC5500 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                line-height: 1.2;
            ">${escapeHtml(announcement.title)}</h2>
            
            <div style="
                font-size: 1.15rem;
                color: #444;
                line-height: 1.8;
                margin: 0 0 35px 0;
                padding: 0 10px;
            ">${escapeHtml(announcement.description)}</div>
            
            ${linkUrl ? `
                <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap; margin-top: 30px;">
                    <a href="${linkUrl}" class="btn btn-primary" style="
                        padding: 18px 40px;
                        font-size: 1.2rem;
                        font-weight: 700;
                        text-decoration: none;
                        display: inline-block;
                        border-radius: 12px;
                        box-shadow: 0 5px 15px rgba(218, 165, 32, 0.4);
                        transition: all 0.3s ease;
                    " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 20px rgba(218, 165, 32, 0.6)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 5px 15px rgba(218, 165, 32, 0.4)'" onclick="closeFeatureAnnouncement(${announcement.announcement_id}, ${userUid})">${escapeHtml(announcement.link_text || 'Check it out!')} →</a>
                    <button class="btn btn-secondary" onclick="closeFeatureAnnouncement(${announcement.announcement_id}, ${userUid})" style="
                        padding: 18px 35px;
                        font-size: 1.1rem;
                        font-weight: 600;
                        border-radius: 12px;
                        transition: all 0.3s ease;
                    " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">Maybe Later</button>
                </div>
            ` : `
                <button class="btn btn-primary" onclick="closeFeatureAnnouncement(${announcement.announcement_id}, ${userUid})" style="
                    padding: 18px 40px;
                    font-size: 1.2rem;
                    font-weight: 700;
                    border-radius: 12px;
                    box-shadow: 0 5px 15px rgba(218, 165, 32, 0.4);
                    transition: all 0.3s ease;
                    margin-top: 20px;
                " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 20px rgba(218, 165, 32, 0.6)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 5px 15px rgba(218, 165, 32, 0.4)'">Got it!</button>
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

