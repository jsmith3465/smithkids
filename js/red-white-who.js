// Red, White & Who App

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://frlajamhyyectdrcbrnd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybGFqYW1oeXllY3RkcmNicm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4ODA4ODksImV4cCI6MjA4MjQ1Njg4OX0.QAH0GME5_iYkz6SZjfqdL3q9E9Jo1qKv6YWFk2exAtY';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Store current state
let currentUserUid = null;
let allIndividuals = [];
let currentIndividual = null;
let currentQuizQuestions = [];
let currentQuizAnswers = {};
let quizSubmitted = false;
let currentQuestionIndex = 0;
let allKeyEvents = [];
let allKeyEventsGeneral = [];
let selectedYearRange = null;
let selectedPeriodRange = null;
let selectedKeyEvent = null;
let selectedKeyEventsGeneral = null;
let currentFilterType = 'all'; // 'all', 'combined'
let filterPanelVisible = false;

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
    
    currentUserUid = session.uid;
    
    const authCheck = document.getElementById('authCheck');
    const mainContent = document.getElementById('mainContent');
    
    if (!authCheck || !mainContent) {
        console.error('Required DOM elements not found');
        return;
    }
    
    authCheck.classList.add('hidden');
    mainContent.classList.remove('hidden');
    
    try {
        await loadAllIndividuals();
        await loadKeyEvents();
    } catch (error) {
        console.error('Error initializing Red, White & Who:', error);
    }
}

function setupYearRanges() {
    // Create period ranges starting from 1550, every 50 years until present
    const currentYear = new Date().getFullYear();
    const periodRanges = [];
    
    for (let start = 1550; start < currentYear; start += 50) {
        const end = Math.min(start + 49, currentYear);
        const label = `${start}-${end}`;
        periodRanges.push({
            start: start,
            end: end,
            label: label
        });
    }
    
    // Populate period dropdown
    const periodDropdown = document.getElementById('periodDropdown');
    if (periodDropdown) {
        periodDropdown.innerHTML = '<option value="">All Periods</option>' + 
            periodRanges.map(range => {
                const escapedLabel = escapeHtml(range.label);
                const value = `${range.start}-${range.end}`;
                return `<option value="${value}" data-start="${range.start}" data-end="${range.end}">${escapedLabel}</option>`;
            }).join('');
    }
}

function setupKeyEventTiles() {
    // Populate key events dropdown
    const keyEventsDropdown = document.getElementById('keyEventsDropdown');
    if (keyEventsDropdown && allKeyEvents.length > 0) {
        keyEventsDropdown.innerHTML = '<option value="">All Key Events</option>' + 
            allKeyEvents.map(event => {
                const escapedEvent = escapeHtml(event);
                return `<option value="${escapedEvent}">${escapedEvent}</option>`;
            }).join('');
    }
}

async function loadAllIndividuals() {
    try {
        // Explicitly select all columns to avoid any issues
        const { data, error } = await supabase
            .from('red_white_who_individuals')
            .select(`
                individual_id,
                name,
                birth_year,
                death_year,
                birth_date,
                death_date,
                key_events,
                key_events_general,
                key_facts,
                biographical_summary,
                main_photo_url,
                photo_gallery_1,
                photo_gallery_2,
                photo_gallery_3,
                photo_gallery_4,
                photo_gallery_5,
                photo_gallery_6,
                photo_gallery_7,
                photo_gallery_8,
                photo_gallery_9,
                photo_gallery_10,
                created_at,
                updated_at
            `)
            .order('name');
        
        if (error) {
            console.error('Supabase error loading individuals:', error);
            console.error('Error code:', error.code);
            console.error('Error message:', error.message);
            console.error('Error details:', JSON.stringify(error, null, 2));
            
            // Check if it's a column type error
            if (error.message && error.message.includes('column') && error.message.includes('does not exist')) {
                throw new Error('Database schema mismatch. Please run the transformation SQL scripts (transform_key_facts_to_html.sql and transform_key_events_to_html.sql) in Supabase.');
            }
            
            throw error;
        }
        
        if (!data) {
            console.warn('No data returned from Supabase');
            allIndividuals = [];
        } else {
            allIndividuals = data;
            console.log(`Loaded ${allIndividuals.length} individuals`);
            
            // Log sample data structure for debugging
            if (allIndividuals.length > 0) {
                console.log('Sample individual structure:', {
                    name: allIndividuals[0].name,
                    key_events_type: typeof allIndividuals[0].key_events,
                    key_facts_type: typeof allIndividuals[0].key_facts,
                    key_events_preview: allIndividuals[0].key_events ? allIndividuals[0].key_events.substring(0, 50) : null,
                    key_facts_preview: allIndividuals[0].key_facts ? allIndividuals[0].key_facts.substring(0, 50) : null
                });
            }
        }
        
        // Default to showing all individuals
        displayIndividuals(allIndividuals);
        
        // Setup filters after loading individuals
        setupYearRanges();
        loadKeyEventsGeneral();
    } catch (error) {
        console.error('Error loading individuals:', error);
        const errorMessage = error.message || 'Unknown error';
        const grid = document.getElementById('individualsGrid');
        if (grid) {
            grid.innerHTML = 
                `<div style="text-align: center; padding: 40px; color: #dc3545;">
                    <p>Error loading biographies. Please refresh the page.</p>
                    <p style="font-size: 0.9em; color: #999; margin-top: 10px;">Error: ${escapeHtml(errorMessage)}</p>
                    <p style="font-size: 0.8em; color: #999; margin-top: 10px;">Check the browser console for more details.</p>
                </div>`;
        }
    }
}

async function loadKeyEvents() {
    // Extract unique key events from all individuals
    // key_events is now stored as plain text (HTML was removed)
    const eventsSet = new Set();
    allIndividuals.forEach(individual => {
        if (individual.key_events && typeof individual.key_events === 'string' && individual.key_events.trim() !== '') {
            // Check if it's still HTML (for backward compatibility)
            if (individual.key_events.includes('<li>') || individual.key_events.includes('<ul>')) {
                try {
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = individual.key_events;
                    const listItems = tempDiv.querySelectorAll('li');
                    listItems.forEach(li => {
                        const eventText = li.textContent.trim();
                        if (eventText) {
                            eventsSet.add(eventText);
                        }
                    });
                } catch (e) {
                    console.warn('Error parsing key_events HTML:', e, individual);
                }
            } else {
                // Plain text - add directly
                const eventText = individual.key_events.trim();
                if (eventText) {
                    eventsSet.add(eventText);
                }
            }
        }
    });
    
    allKeyEvents = Array.from(eventsSet).sort();
    setupKeyEventTiles();
}

// Handle period dropdown change - filter immediately
function handlePeriodChange() {
    const periodDropdown = document.getElementById('periodDropdown');
    if (!periodDropdown) return;
    
    const selectedValue = periodDropdown.value;
    
    if (!selectedValue || selectedValue === '') {
        // Clear period filter
        selectedPeriodRange = null;
    } else {
        // Parse the value (format: "start-end")
        const [start, end] = selectedValue.split('-').map(Number);
        selectedPeriodRange = { start, end };
    }
    
    // Apply filters immediately
    applyCombinedFilters();
}

// Handle key events dropdown change - filter immediately
function handleKeyEventsChange() {
    const keyEventsDropdown = document.getElementById('keyEventsDropdown');
    if (!keyEventsDropdown) return;
    
    const selectedValue = keyEventsDropdown.value;
    
    if (!selectedValue || selectedValue === '') {
        // Clear key event filter
        selectedKeyEvent = null;
    } else {
        selectedKeyEvent = selectedValue;
    }
    
    // Apply filters immediately
    applyCombinedFilters();
}

function loadKeyEventsGeneral() {
    // Extract unique key_events_general from all individuals
    const generalEventsSet = new Set();
    allIndividuals.forEach(individual => {
        if (individual.key_events_general && typeof individual.key_events_general === 'string' && individual.key_events_general.trim() !== '') {
            generalEventsSet.add(individual.key_events_general.trim());
        }
    });
    
    allKeyEventsGeneral = Array.from(generalEventsSet).sort();
    displayKeyEventsGeneralButtons();
}

function displayKeyEventsGeneralButtons() {
    const container = document.getElementById('keyEventsGeneralButtons');
    if (!container) return;
    
    if (allKeyEventsGeneral.length === 0) {
        container.innerHTML = '<p style="color: #666; text-align: center;">No historical periods available.</p>';
        return;
    }
    
    // Extract short titles from the full descriptions (everything before the colon)
    const buttons = allKeyEventsGeneral.map(generalEvent => {
        const title = generalEvent.split(':')[0]; // Get title before colon
        return `
            <button class="key-events-general-btn" 
                    onclick="filterByKeyEventsGeneral('${escapeHtml(generalEvent)}')"
                    data-key-events-general="${escapeHtml(generalEvent)}">
                ${escapeHtml(title)}
            </button>
        `;
    }).join('');
    
    container.innerHTML = buttons;
}

function filterByKeyEventsGeneral(keyEventsGeneral) {
    // Toggle active state
    const buttons = document.querySelectorAll('.key-events-general-btn');
    buttons.forEach(btn => {
        if (btn.getAttribute('data-key-events-general') === keyEventsGeneral) {
            if (btn.classList.contains('active')) {
                // Deselect if already active
                btn.classList.remove('active');
                selectedKeyEventsGeneral = null;
            } else {
                // Select this button
                btn.classList.add('active');
                selectedKeyEventsGeneral = keyEventsGeneral;
                
                // Deselect other buttons
                buttons.forEach(b => {
                    if (b !== btn) b.classList.remove('active');
                });
            }
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Apply combined filters (will include this selection)
    applyCombinedFilters();
}

function displayIndividuals(individuals) {
    const grid = document.getElementById('individualsGrid');
    if (!grid) return;
    
    if (individuals.length === 0) {
        grid.innerHTML = '<div style="text-align: center; padding: 40px; color: #666;">No biographies found matching your filters.</div>';
        return;
    }
    
    grid.innerHTML = individuals.map(individual => {
        const birthYear = individual.birth_year || 'Unknown';
        const deathYear = individual.death_year || 'Present';
        const years = `${birthYear} - ${deathYear}`;
        
        // key_events is now stored as plain text (HTML was removed)
        let keyEvents = 'No key events listed';
        if (individual.key_events && typeof individual.key_events === 'string' && individual.key_events.trim() !== '') {
            // Check if it's still HTML (for backward compatibility)
            if (individual.key_events.includes('<li>') || individual.key_events.includes('<ul>')) {
                try {
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = individual.key_events;
                    const listItems = Array.from(tempDiv.querySelectorAll('li')).slice(0, 2);
                    if (listItems.length > 0) {
                        keyEvents = listItems.map(li => li.textContent.trim()).join(', ');
                    }
                } catch (e) {
                    console.warn('Error parsing key_events HTML:', e);
                    // Fallback to plain text
                    keyEvents = individual.key_events.trim();
                }
            } else {
                // Plain text - use directly
                keyEvents = individual.key_events.trim();
            }
        }
        
        return `
            <div class="individual-card" onclick="viewBiography(${individual.individual_id})">
                <img src="${individual.main_photo_url || 'https://via.placeholder.com/280x200?text=No+Photo'}" 
                     alt="${escapeHtml(individual.name)}" 
                     onerror="this.src='https://via.placeholder.com/280x200?text=No+Photo'">
                <h3>${escapeHtml(individual.name)}</h3>
                <div class="years">${years}</div>
                <div class="key-events">${escapeHtml(keyEvents)}</div>
            </div>
        `;
    }).join('');
}

// Filter panel toggle
function toggleFilterPanel() {
    const panel = document.getElementById('combinedFilterPanel');
    const btn = document.getElementById('showFilterBtn');
    
    if (!panel || !btn) return;
    
    filterPanelVisible = !filterPanelVisible;
    
    if (filterPanelVisible) {
        panel.style.display = 'block';
        btn.textContent = '🔍 Hide Filters';
    } else {
        panel.style.display = 'none';
        btn.textContent = '🔍 Show Filters';
    }
}

function selectPeriodRange(start, end, label) {
    // Toggle selection for period range
    const tiles = document.querySelectorAll('#periodLivedGrid .year-range-tile');
    tiles.forEach(tile => {
        if (parseInt(tile.dataset.start) === start && parseInt(tile.dataset.end) === end) {
            if (tile.classList.contains('selected')) {
                tile.classList.remove('selected');
                selectedPeriodRange = null;
            } else {
                tiles.forEach(t => t.classList.remove('selected'));
                tile.classList.add('selected');
                selectedPeriodRange = { start, end, label: escapeHtml(label) };
            }
        }
    });
}

function selectYearRange(start, end, label) {
    // Legacy function - kept for compatibility but not used in new UI
    selectPeriodRange(start, end, label);
}

function selectKeyEvent(event) {
    // Toggle selection
    const tiles = document.querySelectorAll('.key-event-tile');
    tiles.forEach(tile => {
        if (tile.dataset.event === event) {
            if (tile.classList.contains('selected')) {
                tile.classList.remove('selected');
                selectedKeyEvent = null;
            } else {
                tiles.forEach(t => t.classList.remove('selected'));
                tile.classList.add('selected');
                selectedKeyEvent = event;
            }
        }
    });
}

function applyCombinedFilters() {
    let filtered = allIndividuals;
    
    // Apply Period Lived filter
    if (selectedPeriodRange) {
        filtered = filtered.filter(individual => {
            if (!individual.birth_year) return false;
            return individual.birth_year >= selectedPeriodRange.start && 
                   individual.birth_year <= selectedPeriodRange.end;
        });
    }
    
    // Apply Key Events filter
    if (selectedKeyEvent) {
        filtered = filtered.filter(individual => {
            if (!individual.key_events || typeof individual.key_events !== 'string' || individual.key_events.trim() === '') {
                return false;
            }
            
            // Check if it's still HTML (for backward compatibility)
            if (individual.key_events.includes('<li>') || individual.key_events.includes('<ul>')) {
                try {
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = individual.key_events;
                    const listItems = Array.from(tempDiv.querySelectorAll('li'));
                    return listItems.some(li => li.textContent.trim() === selectedKeyEvent);
                } catch (e) {
                    console.warn('Error parsing key_events HTML:', e);
                    // Fallback to plain text comparison
                    return individual.key_events.includes(selectedKeyEvent);
                }
            } else {
                // Plain text - check if the selected key event is contained in the text
                return individual.key_events.includes(selectedKeyEvent);
            }
        });
    }
    
    // Apply Historical Period filter
    if (selectedKeyEventsGeneral) {
        filtered = filtered.filter(individual => {
            return individual.key_events_general === selectedKeyEventsGeneral;
        });
    }
    
    currentFilterType = 'combined';
    displayIndividuals(filtered);
}

function clearAllFilters() {
    selectedPeriodRange = null;
    selectedKeyEvent = null;
    selectedKeyEventsGeneral = null;
    currentFilterType = 'all';
    
    // Clear dropdown selections
    const periodDropdown = document.getElementById('periodDropdown');
    const keyEventsDropdown = document.getElementById('keyEventsDropdown');
    
    if (periodDropdown) periodDropdown.value = '';
    if (keyEventsDropdown) keyEventsDropdown.value = '';
    
    // Clear visual selections (for backward compatibility with old UI)
    document.querySelectorAll('#periodLivedGrid .year-range-tile').forEach(tile => tile.classList.remove('selected'));
    document.querySelectorAll('.key-event-tile').forEach(tile => tile.classList.remove('selected'));
    document.querySelectorAll('.key-events-general-btn').forEach(btn => btn.classList.remove('active'));
    
    // Show all individuals
    displayIndividuals(allIndividuals);
}

// Legacy functions - kept for compatibility
function applyYearFilter() {
    applyCombinedFilters();
}

function clearYearFilter() {
    clearAllFilters();
}

function applyKeyEventFilter() {
    applyCombinedFilters();
}

function clearKeyEventFilter() {
    clearAllFilters();
}

async function viewBiography(individualId) {
    try {
        // Find individual
        const individual = allIndividuals.find(i => i.individual_id === individualId);
        if (!individual) {
            alert('Biography not found');
            return;
        }
        
        currentIndividual = individual;
        
        // Check quiz attempts
        const { data: quizAttempts } = await supabase
            .from('red_white_who_quiz_attempts')
            .select('attempt_id')
            .eq('user_uid', currentUserUid)
            .eq('individual_id', individualId);
        
        const attemptCount = quizAttempts ? quizAttempts.length : 0;
        const canTakeQuiz = attemptCount < 3;
        
        // Display biography
        displayBiography(individual, canTakeQuiz, attemptCount);
        
        // Switch views
        document.getElementById('marketplaceView').style.display = 'none';
        document.getElementById('biographyView').classList.add('active');
        document.getElementById('exploreLivesHeader').style.display = 'none';
        
        // Scroll to top
        window.scrollTo(0, 0);
    } catch (error) {
        console.error('Error viewing biography:', error);
        alert('Error loading biography. Please try again.');
    }
}

async function awardReadingCredits(individualId, individualName) {
    try {
        // Get current credit balance
        const { data: existingCredit } = await supabase
            .from('User_Credits')
            .select('credit_id, balance')
            .eq('user_uid', currentUserUid)
            .single();
        
        const newBalance = (existingCredit?.balance || 0) + 5;
        
        if (existingCredit) {
            await supabase
                .from('User_Credits')
                .update({ balance: newBalance, updated_at: new Date().toISOString() })
                .eq('credit_id', existingCredit.credit_id);
        } else {
            await supabase
                .from('User_Credits')
                .insert({ user_uid: currentUserUid, balance: 5 });
        }
        
        // Record transaction
        await supabase
            .from('Credit_Transactions')
            .insert({
                to_user_uid: currentUserUid,
                amount: 5,
                transaction_type: 'credit_added',
                game_type: 'red_white_who_reading',
                description: `Red, White & Who: Read biography of ${individualName}`
            });
        
        // Record the read
        await supabase
            .from('red_white_who_reads')
            .insert({
                user_uid: currentUserUid,
                individual_id: individualId,
                credits_awarded: 5
            });
        
        // Show notification
        showMessage(`You earned 5 credits for reading this biography!`, 'success');
    } catch (error) {
        console.error('Error awarding reading credits:', error);
    }
}

function displayBiography(individual, canTakeQuiz, attemptCount) {
    // Set name with dates in format "Name (Birth Year-Death Year)" with name bold
    const birthYear = individual.birth_year || 'Unknown';
    const deathYear = individual.death_year || 'Present';
    const nameElement = document.getElementById('biographyNameWithDates');
    nameElement.innerHTML = `<strong>${escapeHtml(individual.name)}</strong> (${escapeHtml(birthYear)}-${escapeHtml(deathYear)})`;
    
    // Set main photo
    const mainPhoto = document.getElementById('biographyMainPhoto');
    mainPhoto.src = individual.main_photo_url || 'https://via.placeholder.com/200x250?text=No+Photo';
    mainPhoto.alt = individual.name;
    mainPhoto.onerror = function() {
        this.src = 'https://via.placeholder.com/200x250?text=No+Photo';
    };
    
    // Set key facts as bulleted list with arrows
    const keyFactsList = document.getElementById('keyFactsList');
    if (individual.key_facts && typeof individual.key_facts === 'string' && individual.key_facts.trim() !== '') {
        // Parse key facts - they might be in HTML format or plain text
        // Try to extract text content and split into list items
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = individual.key_facts;
        
        // Get all text nodes and split by common delimiters
        let facts = [];
        const textContent = tempDiv.textContent || tempDiv.innerText || '';
        
        // Try to split by various delimiters (newlines, <br>, <li>, etc.)
        if (tempDiv.querySelectorAll('li').length > 0) {
            // Already has list items
            tempDiv.querySelectorAll('li').forEach(li => {
                const fact = li.textContent.trim();
                if (fact) facts.push(fact);
            });
        } else if (tempDiv.querySelectorAll('p').length > 0) {
            // Has paragraphs
            tempDiv.querySelectorAll('p').forEach(p => {
                const fact = p.textContent.trim();
                if (fact) facts.push(fact);
            });
        } else {
            // Plain text - split by newlines or other delimiters
            facts = textContent
                .split(/\n|<br\s*\/?>|•|·/)
                .map(fact => fact.trim())
                .filter(fact => fact.length > 0);
        }
        
        // If no facts found, try the original text
        if (facts.length === 0 && textContent.trim()) {
            facts = [textContent.trim()];
        }
        
        // Create list items
        if (facts.length > 0) {
            keyFactsList.innerHTML = facts.map(fact => `<li>${escapeHtml(fact)}</li>`).join('');
        } else {
            keyFactsList.innerHTML = '<li style="color: #666;">No key facts available.</li>';
        }
    } else {
        keyFactsList.innerHTML = '<li style="color: #666;">No key facts available.</li>';
    }
    
    // Set biographical summary with paragraph formatting
    const summaryElement = document.getElementById('biographicalSummary');
    if (individual.biographical_summary) {
        // Convert double line breaks to paragraphs for better readability
        const summaryText = individual.biographical_summary;
        // Split by double line breaks or single line breaks, then wrap in <p> tags
        const paragraphs = summaryText
            .split(/\n\s*\n/) // Split on double line breaks
            .map(para => para.trim())
            .filter(para => para.length > 0)
            .map(para => `<p style="margin-bottom: 15px; line-height: 1.8; color: #333;">${escapeHtml(para)}</p>`)
            .join('');
        
        summaryElement.innerHTML = paragraphs || '<p style="color: #666;">No summary available.</p>';
    } else {
        summaryElement.innerHTML = '<p style="color: #666;">No summary available.</p>';
    }
    
    // Set photo gallery - now using 10 separate fields instead of JSONB array
    const photoGalleryGrid = document.getElementById('photoGalleryGrid');
    const galleryPhotos = [];
    
    // Collect all non-null photo URLs from photo_gallery_1 through photo_gallery_10
    for (let i = 1; i <= 10; i++) {
        const photoUrl = individual[`photo_gallery_${i}`];
        if (photoUrl && photoUrl.trim() && photoUrl.trim() !== 'NULL') {
            galleryPhotos.push(photoUrl.trim());
        }
    }
    
    // Display all gallery photos (up to 10)
    if (galleryPhotos.length > 0) {
        photoGalleryGrid.innerHTML = galleryPhotos.map((photoUrl, index) => `
            <div class="photo-gallery-item">
                <img src="${escapeHtml(photoUrl)}" 
                     alt="Gallery photo ${index + 1} for ${escapeHtml(individual.name)}"
                     onerror="this.src='https://via.placeholder.com/250x200?text=No+Photo'"
                     style="cursor: pointer;"
                     onclick="window.open('${escapeHtml(photoUrl)}', '_blank')">
            </div>
        `).join('');
    } else {
        photoGalleryGrid.innerHTML = '<div style="color: #666; grid-column: 1 / -1; text-align: center; padding: 20px;">No additional photos available.</div>';
    }
    
    // Set quiz button
    const quizBtn = document.getElementById('takeQuizBtn');
    if (canTakeQuiz) {
        quizBtn.disabled = false;
        quizBtn.textContent = `📝 Take Quiz (${3 - attemptCount} attempt${3 - attemptCount !== 1 ? 's' : ''} remaining)`;
    } else {
        quizBtn.disabled = true;
        quizBtn.textContent = '📝 Quiz Unavailable (3 attempts used)';
    }
}

function showMarketplace() {
    document.getElementById('biographyView').classList.remove('active');
    document.getElementById('marketplaceView').style.display = 'block';
    document.getElementById('exploreLivesHeader').style.display = 'block';
    currentIndividual = null;
    window.scrollTo(0, 0);
}

async function startQuiz() {
    if (!currentIndividual) return;
    
    try {
        // Load all 10 questions for this individual
        const { data: allQuestions, error } = await supabase
            .from('red_white_who_questions')
            .select('*')
            .eq('individual_id', currentIndividual.individual_id)
            .order('question_order');
        
        if (error) throw error;
        
        if (!allQuestions || allQuestions.length === 0) {
            alert('No questions available for this biography yet.');
            return;
        }
        
        // Select 5 random questions
        const shuffled = allQuestions.sort(() => 0.5 - Math.random());
        currentQuizQuestions = shuffled.slice(0, 5);
        currentQuizAnswers = {};
        quizSubmitted = false;
        currentQuestionIndex = 0;
        
        // Display quiz
        displayQuiz();
        
        // Show modal
        document.getElementById('quizModal').classList.add('active');
    } catch (error) {
        console.error('Error starting quiz:', error);
        alert('Error loading quiz. Please try again.');
    }
}

function displayQuiz() {
    const quizQuestionsDiv = document.getElementById('quizQuestions');
    const quizIndividualName = document.getElementById('quizIndividualName');
    
    quizIndividualName.textContent = currentIndividual.name;
    
    // Show only the current question
    if (currentQuestionIndex < currentQuizQuestions.length) {
        const question = currentQuizQuestions[currentQuestionIndex];
        const questionNumber = currentQuestionIndex + 1;
        const totalQuestions = currentQuizQuestions.length;
        
        // Shuffle answer options
        const answers = [
            { text: question.correct_answer, isCorrect: true },
            { text: question.wrong_answer_1, isCorrect: false },
            { text: question.wrong_answer_2, isCorrect: false },
            { text: question.wrong_answer_3, isCorrect: false }
        ].sort(() => 0.5 - Math.random());
        
        // Check if this question has already been answered
        const existingAnswer = currentQuizAnswers[question.question_id];
        
        quizQuestionsDiv.innerHTML = `
            <div class="quiz-question" data-question-id="${question.question_id}">
                <h4>Question ${questionNumber} of ${totalQuestions}: ${escapeHtml(question.question_text)}</h4>
                ${answers.map((answer, answerIndex) => {
                    const isSelected = existingAnswer && existingAnswer.answerIndex === answerIndex;
                    return `
                        <button class="quiz-answer-option ${isSelected ? 'selected' : ''}" 
                                onclick="selectAnswer(${question.question_id}, ${answerIndex}, ${answer.isCorrect})"
                                data-question-id="${question.question_id}"
                                data-answer-index="${answerIndex}"
                                data-is-correct="${answer.isCorrect}">
                            ${escapeHtml(answer.text)}
                        </button>
                    `;
                }).join('')}
            </div>
        `;
        
        // Show/hide buttons based on question position
        const nextBtn = document.getElementById('nextQuestionBtn');
        const submitBtn = document.getElementById('submitQuizBtn');
        const closeBtn = document.getElementById('closeQuizBtn');
        
        // Check if current question has been answered
        const currentQuestion = currentQuizQuestions[currentQuestionIndex];
        const hasAnswer = currentQuizAnswers[currentQuestion.question_id] !== undefined;
        
        if (currentQuestionIndex < currentQuizQuestions.length - 1) {
            // Not the last question - show Next button
            if (nextBtn) {
                nextBtn.style.display = 'inline-block';
                nextBtn.disabled = !hasAnswer;
            }
            if (submitBtn) submitBtn.style.display = 'none';
            if (closeBtn) closeBtn.style.display = 'none';
        } else {
            // Last question - show Submit button
            if (nextBtn) nextBtn.style.display = 'none';
            if (submitBtn) {
                submitBtn.style.display = 'inline-block';
                submitBtn.disabled = !hasAnswer;
            }
            if (closeBtn) closeBtn.style.display = 'none';
        }
    }
}

function selectAnswer(questionId, answerIndex, isCorrect) {
    if (quizSubmitted) return;
    
    // Remove previous selection for this question
    const questionDiv = document.querySelector(`.quiz-question[data-question-id="${questionId}"]`);
    questionDiv.querySelectorAll('.quiz-answer-option').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Mark selected answer
    const selectedBtn = questionDiv.querySelector(`[data-answer-index="${answerIndex}"]`);
    selectedBtn.classList.add('selected');
    
    // Store answer
    currentQuizAnswers[questionId] = {
        answerIndex,
        isCorrect,
        answerText: selectedBtn.textContent.trim()
    };
    
    // Enable Next Question or Submit button
    const nextBtn = document.getElementById('nextQuestionBtn');
    const submitBtn = document.getElementById('submitQuizBtn');
    if (currentQuestionIndex < currentQuizQuestions.length - 1) {
        if (nextBtn) nextBtn.disabled = false;
    } else {
        if (submitBtn) submitBtn.disabled = false;
    }
}

function nextQuestion() {
    if (currentQuestionIndex < currentQuizQuestions.length - 1) {
        currentQuestionIndex++;
        displayQuiz();
    }
}

async function submitQuiz() {
    if (quizSubmitted) return;
    
    // Check if all questions are answered
    if (Object.keys(currentQuizAnswers).length !== currentQuizQuestions.length) {
        alert('Please answer all questions before submitting.');
        return;
    }
    
    quizSubmitted = true;
    document.getElementById('submitQuizBtn').style.display = 'none';
    document.getElementById('nextQuestionBtn').style.display = 'none';
    
    // Calculate score
    let correctCount = 0;
    const wrongAnswers = [];
    
    currentQuizQuestions.forEach(question => {
        const answer = currentQuizAnswers[question.question_id];
        if (answer && answer.isCorrect) {
            correctCount++;
        } else {
            // Store wrong answer for hint
            wrongAnswers.push({
                question: question.question_text,
                correctAnswer: question.correct_answer,
                userAnswer: answer ? answer.answerText : 'No answer'
            });
        }
    });
    
    const score = correctCount;
    const isPerfect = score === 5;
    
    // Check if user has already passed this quiz (earned credits) for this individual
    // We need to check BEFORE saving the current attempt
    let hasAlreadyPassed = false;
    try {
        const { data: previousAttempts } = await supabase
            .from('red_white_who_quiz_attempts')
            .select('credits_awarded')
            .eq('user_uid', currentUserUid)
            .eq('individual_id', currentIndividual.individual_id)
            .gt('credits_awarded', 0);
        
        hasAlreadyPassed = previousAttempts && previousAttempts.length > 0;
    } catch (error) {
        console.error('Error checking previous attempts:', error);
    }
    
    const creditsAwarded = (isPerfect && !hasAlreadyPassed) ? 5 : 0;
    
    // Save quiz attempt
    try {
        const questionsAsked = currentQuizQuestions.map(q => ({
            question_id: q.question_id,
            question_text: q.question_text
        }));
        
        const answersGiven = Object.entries(currentQuizAnswers).map(([questionId, answer]) => ({
            question_id: parseInt(questionId),
            answer_text: answer.answerText,
            is_correct: answer.isCorrect
        }));
        
        await supabase
            .from('red_white_who_quiz_attempts')
            .insert({
                user_uid: currentUserUid,
                individual_id: currentIndividual.individual_id,
                score: score,
                total_questions: 5,
                questions_asked: questionsAsked,
                answers_given: answersGiven,
                credits_awarded: creditsAwarded
            });
        
        // Award credits if perfect score and hasn't passed before
        if (isPerfect && !hasAlreadyPassed) {
            await awardQuizCredits(currentIndividual.individual_id, currentIndividual.name);
        }
        
        // Check remaining attempts
        const { data: quizAttempts } = await supabase
            .from('red_white_who_quiz_attempts')
            .select('attempt_id')
            .eq('user_uid', currentUserUid)
            .eq('individual_id', currentIndividual.individual_id);
        
        const attemptCount = quizAttempts ? quizAttempts.length : 0;
        const canTakeQuiz = attemptCount < 3;
        
        // Update quiz button
        const quizBtn = document.getElementById('takeQuizBtn');
        if (canTakeQuiz) {
            quizBtn.disabled = false;
            quizBtn.textContent = `📝 Take Quiz (${3 - attemptCount} attempt${3 - attemptCount !== 1 ? 's' : ''} remaining)`;
        } else {
            quizBtn.disabled = true;
            quizBtn.textContent = '📝 Quiz Unavailable (3 attempts used)';
        }
        
    } catch (error) {
        console.error('Error saving quiz attempt:', error);
    }
    
    // Show results (pass hasAlreadyPassed flag and wrong answers for hints)
    showQuizResults(score, isPerfect, creditsAwarded, hasAlreadyPassed, wrongAnswers);
}

async function awardQuizCredits(individualId, individualName) {
    try {
        // Get current credit balance
        const { data: existingCredit } = await supabase
            .from('User_Credits')
            .select('credit_id, balance')
            .eq('user_uid', currentUserUid)
            .single();
        
        const newBalance = (existingCredit?.balance || 0) + 5;
        
        if (existingCredit) {
            await supabase
                .from('User_Credits')
                .update({ balance: newBalance, updated_at: new Date().toISOString() })
                .eq('credit_id', existingCredit.credit_id);
        } else {
            await supabase
                .from('User_Credits')
                .insert({ user_uid: currentUserUid, balance: 5 });
        }
        
        // Record transaction
        await supabase
            .from('Credit_Transactions')
            .insert({
                to_user_uid: currentUserUid,
                amount: 5,
                transaction_type: 'credit_added',
                game_type: 'red_white_who_quiz',
                description: `Red, White & Who: Perfect quiz score for ${individualName}`
            });
    } catch (error) {
        console.error('Error awarding quiz credits:', error);
    }
}

function showQuizResults(score, isPerfect, creditsAwarded, hasAlreadyPassed = false, wrongAnswers = []) {
    const quizQuestionsDiv = document.getElementById('quizQuestions');
    
    let creditsMessage = '';
    let hintMessage = '';
    
    if (isPerfect) {
        if (hasAlreadyPassed) {
            creditsMessage = '<p style="font-size: 1.1rem; color: #666; margin-top: 10px;">You\'ve already earned credits for this quiz, but great job on passing again! 🎉</p>';
        } else if (creditsAwarded > 0) {
            creditsMessage = `<p style="font-size: 1.2rem; color: #155724; font-weight: 600; margin-top: 10px;">🎊 Congratulations! You earned ${creditsAwarded} credits!</p>`;
        }
    } else {
        creditsMessage = '<p style="font-size: 1.1rem; color: #856404; margin-top: 10px;">You need a perfect score (5/5) to earn 5 credits.</p>';
        
        // Show hint with one wrong answer if score < 5
        if (wrongAnswers.length > 0) {
            const hintQuestion = wrongAnswers[0];
            hintMessage = `
                <div style="margin-top: 20px; padding: 15px; background: #fff3cd; border: 2px solid #ffc107; border-radius: 8px;">
                    <p style="font-weight: 600; color: #856404; margin-bottom: 10px;">💡 Hint:</p>
                    <p style="color: #856404; margin-bottom: 5px;"><strong>Question:</strong> ${escapeHtml(hintQuestion.question)}</p>
                    <p style="color: #856404;"><strong>Correct Answer:</strong> ${escapeHtml(hintQuestion.correctAnswer)}</p>
                </div>
                <p style="font-size: 1.1rem; color: #856404; margin-top: 15px; font-weight: 600;">
                    Please re-read the biography and try again!
                </p>
            `;
        }
    }
    
    const resultsHtml = `
        <div class="quiz-results ${isPerfect ? 'perfect' : 'not-perfect'}">
            <h3>${isPerfect ? '🎉 Perfect Score!' : 'Quiz Complete'}</h3>
            <p style="font-size: 1.5rem; margin: 15px 0;">
                You got <strong>${score} out of 5</strong> questions correct.
            </p>
            ${creditsMessage}
            ${hintMessage}
        </div>
    `;
    
    quizQuestionsDiv.innerHTML = resultsHtml;
    document.getElementById('closeQuizBtn').style.display = 'inline-block';
    
    if (isPerfect && creditsAwarded > 0) {
        showMessage(`Congratulations! You earned ${creditsAwarded} credits for a perfect quiz score!`, 'success');
    } else if (isPerfect && hasAlreadyPassed) {
        showMessage('Great job passing the quiz again! You\'ve already earned credits for this quiz.', 'info');
    }
}

function closeQuiz() {
    document.getElementById('quizModal').classList.remove('active');
    // Reload biography to update quiz button
    if (currentIndividual) {
        viewBiography(currentIndividual.individual_id);
    }
}

function showMessage(message, type = 'info') {
    // Simple message display - you can enhance this with a toast notification
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#d4edda' : '#fff3cd'};
        color: ${type === 'success' ? '#155724' : '#856404'};
        border: 2px solid ${type === 'success' ? '#28a745' : '#ffc107'};
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        font-weight: 600;
    `;
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        messageDiv.style.transition = 'opacity 0.3s ease';
        setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Make functions available globally
window.viewBiography = viewBiography;
window.filterByKeyEventsGeneral = filterByKeyEventsGeneral;
window.showMarketplace = showMarketplace;
window.toggleFilterPanel = toggleFilterPanel;
window.selectPeriodRange = selectPeriodRange;
window.selectYearRange = selectYearRange;
window.selectKeyEvent = selectKeyEvent;
window.applyCombinedFilters = applyCombinedFilters;
window.clearAllFilters = clearAllFilters;
window.applyYearFilter = applyYearFilter;
window.clearYearFilter = clearYearFilter;
window.applyKeyEventFilter = applyKeyEventFilter;
window.clearKeyEventFilter = clearKeyEventFilter;
window.handlePeriodChange = handlePeriodChange;
window.handleKeyEventsChange = handleKeyEventsChange;
window.startQuiz = startQuiz;
window.selectAnswer = selectAnswer;
window.nextQuestion = nextQuestion;
window.submitQuiz = submitQuiz;
window.closeQuiz = closeQuiz;

