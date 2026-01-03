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
        setupEventListeners();
    } catch (error) {
        console.error('Error initializing Red, White & Who:', error);
    }
}

function setupEventListeners() {
    // Filter inputs
    document.getElementById('nameFilter').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') applyFilters();
    });
    
    document.getElementById('birthYearFrom').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') applyFilters();
    });
    
    document.getElementById('birthYearTo').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') applyFilters();
    });
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
    
    // Update the key event filter dropdown
    const keyEventFilter = document.getElementById('keyEventFilter');
    if (keyEventFilter) {
        // Keep the "All Events" option
        const allEventsOption = keyEventFilter.querySelector('option[value=""]');
        keyEventFilter.innerHTML = '';
        if (allEventsOption) {
            keyEventFilter.appendChild(allEventsOption);
        }
        
        allKeyEvents.forEach(event => {
            const option = document.createElement('option');
            option.value = event;
            option.textContent = event;
            keyEventFilter.appendChild(option);
        });
    }
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

function applyFilters() {
    const nameFilter = document.getElementById('nameFilter').value.toLowerCase().trim();
    const birthYearFrom = document.getElementById('birthYearFrom').value;
    const birthYearTo = document.getElementById('birthYearTo').value;
    const keyEventFilter = document.getElementById('keyEventFilter').value;
    
    let filtered = allIndividuals.filter(individual => {
        // Name filter
        if (nameFilter && !individual.name.toLowerCase().includes(nameFilter)) {
            return false;
        }
        
        // Birth year filters
        if (birthYearFrom && individual.birth_year && individual.birth_year < parseInt(birthYearFrom)) {
            return false;
        }
        if (birthYearTo && individual.birth_year && individual.birth_year > parseInt(birthYearTo)) {
            return false;
        }
        
        // Key event filter
        if (keyEventFilter && (!individual.key_events || !individual.key_events.includes(keyEventFilter))) {
            return false;
        }
        
        return true;
    });
    
    displayIndividuals(filtered);
}

function clearFilters() {
    document.getElementById('nameFilter').value = '';
    document.getElementById('birthYearFrom').value = '';
    document.getElementById('birthYearTo').value = '';
    document.getElementById('keyEventFilter').value = '';
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
    
    // Set biographical summary
    document.getElementById('biographicalSummary').textContent = individual.biographical_summary || 'No summary available.';
    
    // Set photo gallery
    const photoGalleryGrid = document.getElementById('photoGalleryGrid');
    if (individual.photo_gallery && Array.isArray(individual.photo_gallery) && individual.photo_gallery.length > 0) {
        photoGalleryGrid.innerHTML = individual.photo_gallery.map(photo => `
            <div class="photo-gallery-item">
                <img src="${photo.url || 'https://via.placeholder.com/250x200?text=No+Photo'}" 
                     alt="${escapeHtml(photo.caption || '')}"
                     onerror="this.src='https://via.placeholder.com/250x200?text=No+Photo'">
                <div class="caption">${escapeHtml(photo.caption || '')}</div>
            </div>
        `).join('');
    } else {
        photoGalleryGrid.innerHTML = '<div style="color: #666; grid-column: 1 / -1;">No additional photos available.</div>';
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
    const creditsAwarded = isPerfect ? 10 : 0;
    
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
        
        // Award credits if perfect score
        if (isPerfect) {
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
    
    // Show results
    showQuizResults(score, isPerfect, creditsAwarded);
}

async function awardQuizCredits(individualId, individualName) {
    try {
        // Get current credit balance
        const { data: existingCredit } = await supabase
            .from('User_Credits')
            .select('credit_id, balance')
            .eq('user_uid', currentUserUid)
            .single();
        
        const newBalance = (existingCredit?.balance || 0) + 10;
        
        if (existingCredit) {
            await supabase
                .from('User_Credits')
                .update({ balance: newBalance, updated_at: new Date().toISOString() })
                .eq('credit_id', existingCredit.credit_id);
        } else {
            await supabase
                .from('User_Credits')
                .insert({ user_uid: currentUserUid, balance: 10 });
        }
        
        // Record transaction
        await supabase
            .from('Credit_Transactions')
            .insert({
                to_user_uid: currentUserUid,
                amount: 10,
                transaction_type: 'credit_added',
                game_type: 'red_white_who_quiz',
                description: `Red, White & Who: Perfect quiz score for ${individualName}`
            });
    } catch (error) {
        console.error('Error awarding quiz credits:', error);
    }
}

function showQuizResults(score, isPerfect, creditsAwarded) {
    const quizQuestionsDiv = document.getElementById('quizQuestions');
    
    const resultsHtml = `
        <div class="quiz-results ${isPerfect ? 'perfect' : 'not-perfect'}">
            <h3>${isPerfect ? '🎉 Perfect Score!' : 'Quiz Complete'}</h3>
            <p style="font-size: 1.5rem; margin: 15px 0;">
                You got <strong>${score} out of 5</strong> questions correct.
            </p>
            ${isPerfect ? `
                <p style="font-size: 1.2rem; color: #155724; font-weight: 600;">
                    🎊 Congratulations! You earned 10 credits!
                </p>
            ` : `
                <p style="font-size: 1.1rem; color: #856404;">
                    You need a perfect score (5/5) to earn 10 credits. Try again!
                </p>
            `}
        </div>
    `;
    
    quizQuestionsDiv.insertAdjacentHTML('beforeend', resultsHtml);
    document.getElementById('closeQuizBtn').style.display = 'inline-block';
    
    if (isPerfect) {
        showMessage('Congratulations! You earned 10 credits for a perfect quiz score!', 'success');
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
window.applyFilters = applyFilters;
window.clearFilters = clearFilters;
window.startQuiz = startQuiz;
window.selectAnswer = selectAnswer;
window.submitQuiz = submitQuiz;
window.closeQuiz = closeQuiz;

