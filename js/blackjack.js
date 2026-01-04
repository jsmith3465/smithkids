// Blackjack Game
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

// Card suits and ranks
const SUITS = ['♠', '♥', '♦', '♣'];
const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const SUIT_COLORS = {
    '♠': 'black',
    '♣': 'black',
    '♥': 'red',
    '♦': 'red'
};

class BlackjackGame {
    constructor() {
        this.deck = [];
        this.playerHand = [];
        this.dealerHand = [];
        this.gameActive = false;
        this.gameStartTime = null;
        this.wins = 0;
        this.losses = 0;
        this.pushes = 0;
        
        this.init();
    }
    
    init() {
        // Wait for auth
        setTimeout(() => {
            const checkAuth = setInterval(() => {
                if (window.authStatus) {
                    clearInterval(checkAuth);
                    this.checkUserAccess();
                }
            }, 100);
        }, 100);
    }
    
    async checkUserAccess() {
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
            
            // Load user statistics
            await this.loadStatistics();
            
            // Set up event listeners
            document.getElementById('dealBtn').addEventListener('click', () => this.dealCards());
            document.getElementById('hitBtn').addEventListener('click', () => this.hit());
            document.getElementById('standBtn').addEventListener('click', () => this.stand());
        } catch (error) {
            console.error('Error checking access:', error);
            window.location.href = getPagePath('login.html');
        }
    }
    
    createDeck() {
        // Create 6 decks (312 cards total)
        const deck = [];
        for (let deckNum = 0; deckNum < 6; deckNum++) {
            for (let suit of SUITS) {
                for (let rank of RANKS) {
                    deck.push({ suit, rank, color: SUIT_COLORS[suit] });
                }
            }
        }
        return this.shuffleDeck(deck);
    }
    
    shuffleDeck(deck) {
        // Fisher-Yates shuffle algorithm
        const shuffled = [...deck];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
    
    getCardValue(card) {
        if (card.rank === 'A') {
            return 11; // Will be handled as 1 or 11 in hand calculation
        } else if (['J', 'Q', 'K'].includes(card.rank)) {
            return 10;
        } else {
            return parseInt(card.rank);
        }
    }
    
    calculateHandValue(hand) {
        let value = 0;
        let aces = 0;
        
        for (let card of hand) {
            const cardValue = this.getCardValue(card);
            if (cardValue === 11) {
                aces++;
                value += 11;
            } else {
                value += cardValue;
            }
        }
        
        // Adjust for aces
        while (value > 21 && aces > 0) {
            value -= 10;
            aces--;
        }
        
        return value;
    }
    
    isBlackjack(hand) {
        return hand.length === 2 && this.calculateHandValue(hand) === 21;
    }
    
    dealCards() {
        // Create and shuffle deck
        this.deck = this.createDeck();
        
        // Reset hands
        this.playerHand = [];
        this.dealerHand = [];
        this.gameActive = true;
        this.gameStartTime = Date.now();
        
        // Deal initial cards: player, dealer, player, dealer
        this.playerHand.push(this.deck.pop());
        this.dealerHand.push(this.deck.pop());
        this.playerHand.push(this.deck.pop());
        this.dealerHand.push(this.deck.pop());
        
        // Update UI
        this.updateDisplay();
        
        // Enable/disable buttons
        document.getElementById('dealBtn').disabled = true;
        document.getElementById('hitBtn').disabled = false;
        document.getElementById('standBtn').disabled = false;
        
        // Clear message
        this.showMessage('');
        
        // Check for player blackjack
        if (this.isBlackjack(this.playerHand)) {
            // Check if dealer also has blackjack
            if (this.isBlackjack(this.dealerHand)) {
                this.endGame('push', true);
            } else {
                this.endGame('win', true);
            }
        } else if (this.calculateHandValue(this.playerHand) === 21) {
            // Player has 21 but not blackjack (3+ cards)
            this.stand();
        }
    }
    
    hit() {
        if (!this.gameActive) return;
        
        // Deal a card to player
        this.playerHand.push(this.deck.pop());
        this.updateDisplay();
        
        const playerValue = this.calculateHandValue(this.playerHand);
        
        // Check if player busts
        if (playerValue > 21) {
            this.endGame('loss');
        }
    }
    
    stand() {
        if (!this.gameActive) return;
        
        // Disable player actions
        document.getElementById('hitBtn').disabled = true;
        document.getElementById('standBtn').disabled = true;
        
        // Dealer plays
        this.dealerPlay();
    }
    
    dealerPlay() {
        // Reveal dealer's hidden card
        this.updateDisplay();
        
        // Dealer must hit until 17 or higher
        while (this.calculateHandValue(this.dealerHand) < 17) {
            this.dealerHand.push(this.deck.pop());
            this.updateDisplay();
        }
        
        // Determine winner
        const playerValue = this.calculateHandValue(this.playerHand);
        const dealerValue = this.calculateHandValue(this.dealerHand);
        
        if (dealerValue > 21) {
            // Dealer busts
            this.endGame('win');
        } else if (playerValue > dealerValue) {
            this.endGame('win');
        } else if (playerValue < dealerValue) {
            this.endGame('loss');
        } else {
            this.endGame('push');
        }
    }
    
    endGame(result, isBlackjackEnd = false) {
        this.gameActive = false;
        
        // Disable all buttons
        document.getElementById('hitBtn').disabled = true;
        document.getElementById('standBtn').disabled = true;
        document.getElementById('dealBtn').disabled = false;
        
        // Update statistics
        if (result === 'win') {
            this.wins++;
            this.showMessage('You Win!', 'win');
        } else if (result === 'loss') {
            this.losses++;
            this.showMessage('You Lose!', 'loss');
        } else {
            this.pushes++;
            this.showMessage('Push!', 'push');
        }
        
        // Update display
        this.updateStatistics();
        this.updateDisplay();
        
        // Save game result
        this.saveGameResult(result, isBlackjackEnd);
    }
    
    updateDisplay() {
        // Update player hand
        const playerCardsDiv = document.getElementById('playerCards');
        playerCardsDiv.innerHTML = '';
        this.playerHand.forEach(card => {
            playerCardsDiv.appendChild(this.createCardElement(card));
        });
        
        // Update dealer hand
        const dealerCardsDiv = document.getElementById('dealerCards');
        dealerCardsDiv.innerHTML = '';
        this.dealerHand.forEach((card, index) => {
            // Hide dealer's second card until game ends
            if (index === 1 && this.gameActive) {
                dealerCardsDiv.appendChild(this.createCardBackElement());
            } else {
                dealerCardsDiv.appendChild(this.createCardElement(card));
            }
        });
        
        // Update hand values
        const playerValue = this.calculateHandValue(this.playerHand);
        document.getElementById('playerValue').textContent = `Value: ${playerValue}`;
        
        if (this.gameActive && this.dealerHand.length > 0) {
            // Show only first card value during game
            const firstCardValue = this.getCardValue(this.dealerHand[0]);
            document.getElementById('dealerValue').textContent = `Value: ${firstCardValue}+`;
        } else {
            const dealerValue = this.calculateHandValue(this.dealerHand);
            document.getElementById('dealerValue').textContent = `Value: ${dealerValue}`;
        }
    }
    
    createCardElement(card) {
        const cardDiv = document.createElement('div');
        cardDiv.className = `card ${card.color}`;
        
        const rankDiv = document.createElement('div');
        rankDiv.className = 'card-rank';
        rankDiv.textContent = card.rank;
        
        const suitDiv = document.createElement('div');
        suitDiv.className = 'card-suit';
        suitDiv.textContent = card.suit;
        
        cardDiv.appendChild(rankDiv);
        cardDiv.appendChild(suitDiv);
        
        return cardDiv;
    }
    
    createCardBackElement() {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card card-back';
        cardDiv.textContent = '🂠';
        return cardDiv;
    }
    
    showMessage(text, type = '') {
        const messageDiv = document.getElementById('gameMessage');
        messageDiv.textContent = text;
        messageDiv.className = 'game-message';
        if (type) {
            messageDiv.classList.add(type);
        }
        if (text) {
            messageDiv.classList.remove('hidden');
        } else {
            messageDiv.classList.add('hidden');
        }
    }
    
    updateStatistics() {
        document.getElementById('winsDisplay').textContent = this.wins;
        document.getElementById('lossesDisplay').textContent = this.losses;
        document.getElementById('pushesDisplay').textContent = this.pushes;
    }
    
    async loadStatistics() {
        const session = window.authStatus?.getSession();
        if (!session || !session.uid) return;
        
        try {
            const { data, error } = await supabase
                .from('blackjack_scores')
                .select('result')
                .eq('user_uid', session.uid);
            
            if (error) throw error;
            
            if (data) {
                this.wins = data.filter(r => r.result === 'win').length;
                this.losses = data.filter(r => r.result === 'loss').length;
                this.pushes = data.filter(r => r.result === 'push').length;
                this.updateStatistics();
            }
        } catch (error) {
            console.error('Error loading statistics:', error);
        }
    }
    
    async saveGameResult(result, isBlackjackEnd = false) {
        const session = window.authStatus?.getSession();
        if (!session || !session.uid) {
            console.error('No user session found');
            return;
        }
        
        try {
            const gameDuration = this.gameStartTime ? Math.floor((Date.now() - this.gameStartTime) / 1000) : 0;
            const playerValue = this.calculateHandValue(this.playerHand);
            const dealerValue = this.calculateHandValue(this.dealerHand);
            const playerBlackjack = isBlackjackEnd && result === 'win';
            const dealerBlackjack = isBlackjackEnd && result === 'push';
            
            const { error } = await supabase
                .from('blackjack_scores')
                .insert({
                    user_uid: session.uid,
                    result: result,
                    player_final_hand: playerValue,
                    dealer_final_hand: dealerValue,
                    player_blackjack: playerBlackjack,
                    dealer_blackjack: dealerBlackjack,
                    game_duration_seconds: gameDuration
                });
            
            if (error) {
                console.error('Error saving game result:', error);
            } else {
                console.log('Game result saved successfully');
            }
        } catch (error) {
            console.error('Error saving game result:', error);
        }
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    new BlackjackGame();
});

