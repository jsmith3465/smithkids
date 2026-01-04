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
let allKeyEvents = [];
let selectedYearRange = null;
let selectedKeyEvent = null;
let currentFilterType = 'all'; // 'all', 'years', 'keyEvents'

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
    // Get all birth years and create meaningful ranges
    const birthYears = allIndividuals
        .map(i => i.birth_year)
        .filter(y => y !== null && y !== undefined)
        .sort((a, b) => a - b);
    
    if (birthYears.length === 0) return;
    
    const minYear = birthYears[0];
    const maxYear = birthYears[birthYears.length - 1];
    
    // Create year range tiles (e.g., 1700s, 1800s, etc.)
    const yearRanges = [];
    const startDecade = Math.floor(minYear / 100) * 100;
    const endDecade = Math.ceil(maxYear / 100) * 100;
    
    for (let decade = startDecade; decade <= endDecade; decade += 100) {
        const rangeStart = decade;
        const rangeEnd = decade + 99;
        const label = decade < 1000 
            ? `${rangeStart}s-${rangeEnd}s` 
            : `${Math.floor(rangeStart / 100)}00s`;
        
        yearRanges.push({
            start: rangeStart,
            end: rangeEnd,
            label: label
        });
    }
    
    // Also add some specific historical periods
    yearRanges.push(
        { start: 1730, end: 1780, label: 'Founding Fathers Era' },
        { start: 1800, end: 1900, label: '1800s' },
        { start: 1900, end: 2000, label: '1900s' }
    );
    
    // Remove duplicates and sort
    const uniqueRanges = [];
    const seen = new Set();
    yearRanges.forEach(range => {
        const key = `${range.start}-${range.end}`;
        if (!seen.has(key)) {
            seen.add(key);
            uniqueRanges.push(range);
        }
    });
    uniqueRanges.sort((a, b) => a.start - b.start);
    
    const yearsGrid = document.getElementById('yearsFilterGrid');
    if (yearsGrid) {
        yearsGrid.innerHTML = uniqueRanges.map(range => {
            const escapedLabel = escapeHtml(range.label);
            return `
                <div class="year-range-tile" onclick="selectYearRange(${range.start}, ${range.end}, ${JSON.stringify(range.label)})" 
                     data-start="${range.start}" data-end="${range.end}">
                    ${escapedLabel}
                </div>
            `;
        }).join('');
    }
}

function setupKeyEventTiles() {
    const keyEventsGrid = document.getElementById('keyEventsGrid');
    if (keyEventsGrid && allKeyEvents.length > 0) {
        keyEventsGrid.innerHTML = allKeyEvents.map(event => `
            <div class="key-event-tile" onclick="selectKeyEvent('${escapeHtml(event)}')" 
                 data-event="${escapeHtml(event)}">
                ${escapeHtml(event)}
            </div>
        `).join('');
    }
}

async function loadAllIndividuals() {
    try {
        const { data, error } = await supabase
            .from('red_white_who_individuals')
            .select('*')
            .order('name');
        
        if (error) throw error;
        
        allIndividuals = data || [];
        displayIndividuals(allIndividuals);
        
        // Setup year ranges and key events after loading individuals
        setupYearRanges();
        setupKeyEventTiles();
    } catch (error) {
        console.error('Error loading individuals:', error);
        document.getElementById('individualsGrid').innerHTML = 
            '<div style="text-align: center; padding: 40px; color: #dc3545;">Error loading biographies. Please refresh the page.</div>';
    }
}

async function loadKeyEvents() {
    // Extract unique key events from all individuals
    const eventsSet = new Set();
    allIndividuals.forEach(individual => {
        if (individual.key_events && Array.isArray(individual.key_events)) {
            individual.key_events.forEach(event => eventsSet.add(event));
        }
    });
    
    allKeyEvents = Array.from(eventsSet).sort();
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
        
        const keyEvents = individual.key_events && individual.key_events.length > 0
            ? individual.key_events.slice(0, 2).join(', ')
            : 'No key events listed';
        
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

// Tile-based filter functions
function showViewAll() {
    currentFilterType = 'all';
    selectedYearRange = null;
    selectedKeyEvent = null;
    
    // Update tile states
    document.querySelectorAll('.search-tile').forEach(tile => tile.classList.remove('active'));
    document.getElementById('viewAllTile').classList.add('active');
    
    // Hide filter panels
    document.getElementById('yearsFilterPanel').classList.remove('active');
    document.getElementById('keyEventsFilterPanel').classList.remove('active');
    
    // Clear selections
    document.querySelectorAll('.year-range-tile').forEach(tile => tile.classList.remove('selected'));
    document.querySelectorAll('.key-event-tile').forEach(tile => tile.classList.remove('selected'));
    
    // Show all individuals
    displayIndividuals(allIndividuals);
}

function showYearsFilter() {
    currentFilterType = 'years';
    
    // Update tile states
    document.querySelectorAll('.search-tile').forEach(tile => tile.classList.remove('active'));
    document.getElementById('yearsTile').classList.add('active');
    
    // Show/hide filter panels
    document.getElementById('yearsFilterPanel').classList.add('active');
    document.getElementById('keyEventsFilterPanel').classList.remove('active');
}

function showKeyEventsFilter() {
    currentFilterType = 'keyEvents';
    
    // Update tile states
    document.querySelectorAll('.search-tile').forEach(tile => tile.classList.remove('active'));
    document.getElementById('keyEventsTile').classList.add('active');
    
    // Show/hide filter panels
    document.getElementById('keyEventsFilterPanel').classList.add('active');
    document.getElementById('yearsFilterPanel').classList.remove('active');
}

function selectYearRange(start, end, label) {
    // Toggle selection
    const tiles = document.querySelectorAll('.year-range-tile');
    tiles.forEach(tile => {
        if (parseInt(tile.dataset.start) === start && parseInt(tile.dataset.end) === end) {
            if (tile.classList.contains('selected')) {
                tile.classList.remove('selected');
                selectedYearRange = null;
            } else {
                tiles.forEach(t => t.classList.remove('selected'));
                tile.classList.add('selected');
                // Escape label to prevent XSS
                selectedYearRange = { start, end, label: escapeHtml(label) };
            }
        }
    });
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

function applyYearFilter() {
    if (!selectedYearRange) {
        alert('Please select a year range first!');
        return;
    }
    
    const filtered = allIndividuals.filter(individual => {
        if (!individual.birth_year) return false;
        return individual.birth_year >= selectedYearRange.start && 
               individual.birth_year <= selectedYearRange.end;
    });
    
    displayIndividuals(filtered);
}

function clearYearFilter() {
    selectedYearRange = null;
    document.querySelectorAll('.year-range-tile').forEach(tile => tile.classList.remove('selected'));
    displayIndividuals(allIndividuals);
}

function applyKeyEventFilter() {
    if (!selectedKeyEvent) {
        alert('Please select a key event first!');
        return;
    }
    
    const filtered = allIndividuals.filter(individual => {
        return individual.key_events && 
               Array.isArray(individual.key_events) && 
               individual.key_events.includes(selectedKeyEvent);
    });
    
    displayIndividuals(filtered);
}

function clearKeyEventFilter() {
    selectedKeyEvent = null;
    document.querySelectorAll('.key-event-tile').forEach(tile => tile.classList.remove('selected'));
    displayIndividuals(allIndividuals);
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
        
        // Check if user has already read this biography (for 5 credit reward)
        const { data: existingRead } = await supabase
            .from('red_white_who_reads')
            .select('read_id')
            .eq('user_uid', currentUserUid)
            .eq('individual_id', individualId)
            .single();
        
        // Award 5 credits for reading if not already read
        if (!existingRead) {
            await awardReadingCredits(individualId, individual.name);
        }
        
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
    // Set name and years
    document.getElementById('biographyName').textContent = individual.name;
    const birthYear = individual.birth_year || 'Unknown';
    const deathYear = individual.death_year || 'Present';
    document.getElementById('biographyYears').textContent = `${birthYear} - ${deathYear}`;
    
    // Set main photo
    const mainPhoto = document.getElementById('biographyMainPhoto');
    mainPhoto.src = individual.main_photo_url || 'https://via.placeholder.com/200x250?text=No+Photo';
    mainPhoto.alt = individual.name;
    mainPhoto.onerror = function() {
        this.src = 'https://via.placeholder.com/200x250?text=No+Photo';
    };
    
    // Set key facts
    const keyFactsGrid = document.getElementById('keyFactsGrid');
    if (individual.key_facts && typeof individual.key_facts === 'object') {
        keyFactsGrid.innerHTML = Object.entries(individual.key_facts).map(([key, value]) => `
            <div class="key-fact-item">
                <strong>${escapeHtml(key)}</strong>
                <span>${escapeHtml(String(value))}</span>
            </div>
        `).join('');
    } else {
        keyFactsGrid.innerHTML = '<div style="color: #666;">No key facts available.</div>';
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
    
    quizQuestionsDiv.innerHTML = currentQuizQuestions.map((question, index) => {
        // Shuffle answer options
        const answers = [
            { text: question.correct_answer, isCorrect: true },
            { text: question.wrong_answer_1, isCorrect: false },
            { text: question.wrong_answer_2, isCorrect: false },
            { text: question.wrong_answer_3, isCorrect: false }
        ].sort(() => 0.5 - Math.random());
        
        return `
            <div class="quiz-question" data-question-id="${question.question_id}">
                <h4>Question ${index + 1}: ${escapeHtml(question.question_text)}</h4>
                ${answers.map((answer, answerIndex) => `
                    <button class="quiz-answer-option" 
                            onclick="selectAnswer(${question.question_id}, ${answerIndex}, ${answer.isCorrect})"
                            data-question-id="${question.question_id}"
                            data-answer-index="${answerIndex}"
                            data-is-correct="${answer.isCorrect}">
                        ${escapeHtml(answer.text)}
                    </button>
                `).join('')}
            </div>
        `;
    }).join('');
    
    document.getElementById('submitQuizBtn').style.display = 'inline-block';
    document.getElementById('closeQuizBtn').style.display = 'none';
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
    
    // Calculate score
    let correctCount = 0;
    currentQuizQuestions.forEach(question => {
        const answer = currentQuizAnswers[question.question_id];
        if (answer && answer.isCorrect) {
            correctCount++;
            // Mark correct answer
            const questionDiv = document.querySelector(`.quiz-question[data-question-id="${question.question_id}"]`);
            questionDiv.querySelector(`[data-is-correct="true"]`).classList.add('correct');
        } else {
            // Mark incorrect answer and show correct one
            const questionDiv = document.querySelector(`.quiz-question[data-question-id="${question.question_id}"]`);
            if (answer) {
                questionDiv.querySelector(`[data-answer-index="${answer.answerIndex}"]`).classList.add('incorrect');
            }
            questionDiv.querySelector(`[data-is-correct="true"]`).classList.add('correct');
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
    
    // Show results (pass hasAlreadyPassed flag)
    showQuizResults(score, isPerfect, creditsAwarded, hasAlreadyPassed);
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

function showQuizResults(score, isPerfect, creditsAwarded, hasAlreadyPassed = false) {
    const quizQuestionsDiv = document.getElementById('quizQuestions');
    
    let creditsMessage = '';
    if (isPerfect) {
        if (hasAlreadyPassed) {
            creditsMessage = '<p style="font-size: 1.1rem; color: #666; margin-top: 10px;">You\'ve already earned credits for this quiz, but great job on passing again! 🎉</p>';
        } else if (creditsAwarded > 0) {
            creditsMessage = `<p style="font-size: 1.2rem; color: #155724; font-weight: 600; margin-top: 10px;">🎊 Congratulations! You earned ${creditsAwarded} credits!</p>`;
        }
    } else {
        creditsMessage = '<p style="font-size: 1.1rem; color: #856404; margin-top: 10px;">You need a perfect score (5/5) to earn 5 credits. Try again!</p>';
    }
    
    const resultsHtml = `
        <div class="quiz-results ${isPerfect ? 'perfect' : 'not-perfect'}">
            <h3>${isPerfect ? '🎉 Perfect Score!' : 'Quiz Complete'}</h3>
            <p style="font-size: 1.5rem; margin: 15px 0;">
                You got <strong>${score} out of 5</strong> questions correct.
            </p>
            ${creditsMessage}
        </div>
    `;
    
    quizQuestionsDiv.insertAdjacentHTML('beforeend', resultsHtml);
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
window.showMarketplace = showMarketplace;
window.showViewAll = showViewAll;
window.showYearsFilter = showYearsFilter;
window.showKeyEventsFilter = showKeyEventsFilter;
window.selectYearRange = selectYearRange;
window.selectKeyEvent = selectKeyEvent;
window.applyYearFilter = applyYearFilter;
window.clearYearFilter = clearYearFilter;
window.applyKeyEventFilter = applyKeyEventFilter;
window.clearKeyEventFilter = clearKeyEventFilter;
window.startQuiz = startQuiz;
window.selectAnswer = selectAnswer;
window.submitQuiz = submitQuiz;
window.closeQuiz = closeQuiz;

