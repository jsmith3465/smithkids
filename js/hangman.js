// Hangman Game
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
import { checkCredits, deductCredits, showCreditWarning } from './credit-system.js';
import { initializeApprovalNotifications } from './notification-system.js';

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

// Word list - Bible-related words
const words = [
    'JESUS', 'BIBLE', 'PRAYER', 'FAITH', 'LOVE', 'HOPE', 'PEACE', 'JOY',
    'ANGEL', 'CROSS', 'CHURCH', 'PRAY', 'GOD', 'HEAVEN', 'HELL', 'SIN',
    'GRACE', 'MERCY', 'SALVATION', 'REDEMPTION', 'FORGIVENESS', 'REPENTANCE',
    'BAPTISM', 'COMMUNION', 'SACRAMENT', 'SERMON', 'PASTOR', 'MINISTER',
    'PROPHET', 'APOSTLE', 'DISCIPLE', 'SAINT', 'MARTYR', 'MIRACLE',
    'RESURRECTION', 'CRUCIFIXION', 'NATIVITY', 'EPIPHANY', 'PENTECOST',
    'GENESIS', 'EXODUS', 'LEVITICUS', 'NUMBERS', 'DEUTERONOMY', 'JOSHUA',
    'JUDGES', 'RUTH', 'SAMUEL', 'KINGS', 'CHRONICLES', 'EZRA', 'NEHEMIAH',
    'ESTHER', 'JOB', 'PSALM', 'PROVERBS', 'ECCLESIASTES', 'SONG OF SONGS',
    'ISAIAH', 'JEREMIAH', 'LAMENTATIONS', 'EZEKIEL', 'DANIEL', 'HOSEA',
    'JOEL', 'AMOS', 'OBADIAH', 'JONAH', 'MICAH', 'NAHUM', 'HABAKKUK',
    'ZEPHANIAH', 'HAGGAI', 'ZECHARIAH', 'MALACHI', 'MATTHEW', 'MARK',
    'LUKE', 'JOHN', 'ACTS', 'ROMANS', 'CORINTHIANS', 'GALATIANS', 'EPHESIANS',
    'PHILIPPIANS', 'COLOSSIANS', 'THESSALONIANS', 'TIMOTHY', 'TITUS', 'PHILEMON',
    'HEBREWS', 'JAMES', 'PETER', 'JOHN', 'JUDE', 'REVELATION'
];

// Hangman drawing stages
const hangmanStages = [
    `   +---+
   |   |
       |
       |
       |
       |
=========`,
    `   +---+
   |   |
   O   |
       |
       |
       |
=========`,
    `   +---+
   |   |
   O   |
   |   |
       |
       |
=========`,
    `   +---+
   |   |
   O   |
  /|   |
       |
       |
=========`,
    `   +---+
   |   |
   O   |
  /|\\  |
       |
       |
=========`,
    `   +---+
   |   |
   O   |
  /|\\  |
  /    |
       |
=========`,
    `   +---+
   |   |
   O   |
  /|\\  |
  / \\  |
       |
=========`
];

class HangmanGame {
    constructor() {
        this.currentWord = '';
        this.guessedLetters = new Set();
        this.wrongGuesses = 0;
        this.maxWrongGuesses = 6;
        this.gameActive = false;
        this.score = 0;
        this.gameStartTime = null;
        this.gameDuration = 0;
        
        this.init();
    }
    
    init() {
        // Wait for auth
        setTimeout(() => {
            const checkAuth = setInterval(() => {
                if (window.authStatus) {
                    clearInterval(checkAuth);
                    if (window.authStatus.isAuthenticated) {
                        document.getElementById('authCheck').classList.add('hidden');
                        document.getElementById('mainContent').classList.remove('hidden');
                        this.setupGame();
                        
                        // Initialize approval notifications for standard users
                        const session = window.authStatus.getSession();
                        if (session && session.userType !== 'admin') {
                            initializeApprovalNotifications();
                        }
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
    }
    
    setupGame() {
        this.wordDisplay = document.getElementById('wordDisplay');
        this.hangmanDrawing = document.getElementById('hangmanDrawing');
        this.wrongGuessesDisplay = document.getElementById('wrongGuesses');
        this.scoreDisplay = document.getElementById('scoreDisplay');
        this.gameMessage = document.getElementById('gameMessage');
        this.alphabetGrid = document.getElementById('alphabetGrid');
        this.newGameBtn = document.getElementById('newGameBtn');
        
        // Create alphabet buttons
        this.createAlphabetButtons();
        
        // Event listeners
        this.newGameBtn.addEventListener('click', () => this.startNewGame());
        
        // Initial display
        this.updateDisplay();
        
        // Automatically start the game when page loads
        this.startNewGame();
    }
    
    createAlphabetButtons() {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.alphabetGrid.innerHTML = '';
        
        for (let letter of alphabet) {
            const btn = document.createElement('button');
            btn.className = 'letter-btn';
            btn.textContent = letter;
            btn.dataset.letter = letter;
            btn.addEventListener('click', () => this.guessLetter(letter));
            this.alphabetGrid.appendChild(btn);
        }
    }
    
    async startNewGame() {
        // Check and deduct credits before starting (skip for admins)
        const session = window.authStatus?.getSession();
        if (session && session.userType !== 'admin') {
            const creditCheck = await checkCredits(session.uid);
            if (!creditCheck.hasCredits) {
                alert(showCreditWarning(creditCheck.balance));
                return;
            }
            
            // Deduct credit when game begins
            const deductResult = await deductCredits(session.uid, 'hangman');
            if (!deductResult.success) {
                alert('Unable to process payment. Please try again.');
                return;
            }
        }
        
        // Reset game state
        this.currentWord = this.getRandomWord();
        this.guessedLetters.clear();
        this.wrongGuesses = 0;
        this.gameActive = true;
        this.score = 0;
        this.gameStartTime = Date.now();
        this.gameDuration = 0;
        
        // Reset alphabet buttons
        this.alphabetGrid.querySelectorAll('.letter-btn').forEach(btn => {
            btn.disabled = false;
            btn.className = 'letter-btn';
        });
        
        // Clear message
        this.gameMessage.innerHTML = '';
        this.gameMessage.className = '';
        
        this.updateDisplay();
    }
    
    getRandomWord() {
        return words[Math.floor(Math.random() * words.length)];
    }
    
    guessLetter(letter) {
        if (!this.gameActive) return;
        
        const btn = document.querySelector(`[data-letter="${letter}"]`);
        if (btn.disabled) return;
        
        // Disable button
        btn.disabled = true;
        
        if (this.guessedLetters.has(letter)) {
            return;
        }
        
        this.guessedLetters.add(letter);
        
        if (this.currentWord.includes(letter)) {
            // Correct guess
            btn.classList.add('correct');
            this.score += 10;
            
            // Check if word is complete
            if (this.isWordComplete()) {
                this.gameWon();
            }
        } else {
            // Wrong guess
            btn.classList.add('wrong');
            this.wrongGuesses++;
            
            if (this.wrongGuesses >= this.maxWrongGuesses) {
                this.gameLost();
            }
        }
        
        this.updateDisplay();
    }
    
    isWordComplete() {
        for (let letter of this.currentWord) {
            if (letter !== ' ' && !this.guessedLetters.has(letter)) {
                return false;
            }
        }
        return true;
    }
    
    updateDisplay() {
        // Update word display
        let display = '';
        for (let letter of this.currentWord) {
            if (letter === ' ') {
                display += '<span class="letter-box space"></span>';
            } else if (this.guessedLetters.has(letter)) {
                display += `<span class="letter-box">${letter}</span>`;
            } else {
                display += '<span class="letter-box"></span>';
            }
        }
        this.wordDisplay.innerHTML = display;
        
        // Update hangman drawing
        this.hangmanDrawing.textContent = hangmanStages[this.wrongGuesses];
        
        // Update wrong guesses display
        this.wrongGuessesDisplay.textContent = `${this.wrongGuesses} / ${this.maxWrongGuesses}`;
        
        // Update score
        this.scoreDisplay.textContent = this.score;
    }
    
    async gameWon() {
        this.gameActive = false;
        
        // Calculate game duration
        if (this.gameStartTime) {
            this.gameDuration = Math.floor((Date.now() - this.gameStartTime) / 1000);
        }
        
        // Calculate final score (bonus for fewer wrong guesses)
        const bonus = (this.maxWrongGuesses - this.wrongGuesses) * 5;
        this.score += bonus;
        this.scoreDisplay.textContent = this.score;
        
        // Disable all buttons
        this.alphabetGrid.querySelectorAll('.letter-btn').forEach(btn => {
            btn.disabled = true;
        });
        
        // Show win message
        this.gameMessage.innerHTML = `🎉 Congratulations! You won! Final Score: ${this.score}`;
        this.gameMessage.className = 'game-message win';
        
        // Save score to database
        await this.saveScore(true);
    }
    
    async gameLost() {
        this.gameActive = false;
        
        // Calculate game duration
        if (this.gameStartTime) {
            this.gameDuration = Math.floor((Date.now() - this.gameStartTime) / 1000);
        }
        
        // Reveal the word
        let display = '';
        for (let letter of this.currentWord) {
            if (letter === ' ') {
                display += '<span class="letter-box space"></span>';
            } else {
                display += `<span class="letter-box">${letter}</span>`;
            }
        }
        this.wordDisplay.innerHTML = display;
        
        // Disable all buttons
        this.alphabetGrid.querySelectorAll('.letter-btn').forEach(btn => {
            btn.disabled = true;
        });
        
        // Show lose message
        this.gameMessage.innerHTML = `😞 Game Over! The word was: ${this.currentWord}`;
        this.gameMessage.className = 'game-message lose';
        
        // Save score to database
        await this.saveScore(false);
        
        // Check for badge eligibility
        try {
            const session = window.authStatus?.getSession();
            if (session && session.uid) {
                const { checkAllBadges } = await import('./badge-checker.js');
                await checkAllBadges(session.uid, 'game_completed');
            }
        } catch (error) {
            console.error('Error checking badges:', error);
        }
    }
    
    async saveScore(won) {
        const session = window.authStatus?.getSession();
        if (!session || !session.uid) {
            console.error('No user session found');
            return;
        }
        
        try {
            const { error } = await supabase
                .from('hangman_scores')
                .insert({
                    user_uid: session.uid,
                    score: this.score,
                    word: this.currentWord,
                    won: won,
                    wrong_guesses: this.wrongGuesses,
                    game_duration_seconds: this.gameDuration || null
                });
            
            if (error) {
                console.error('Error saving hangman score:', error);
            } else {
                console.log('Hangman score saved successfully');
            }
        } catch (error) {
            console.error('Error saving hangman score:', error);
        }
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    new HangmanGame();
});

