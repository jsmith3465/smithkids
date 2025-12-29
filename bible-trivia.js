// Bible Trivia Game
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://frlajamhyyectdrcbrnd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybGFqYW1oeXllY3RkcmNicm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4ODA4ODksImV4cCI6MjA4MjQ1Njg4OX0.QAH0GME5_iYkz6SZjfqdL3q9E9Jo1qKv6YWFk2exAtY';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Bible Trivia Questions for Middle School Kids
const triviaQuestions = [
    {
        question: "How many days did it take God to create the world?",
        options: ["3 days", "6 days", "7 days", "10 days"],
        correct: 1, // 6 days
        bibleRef: { book: "Genesis", chapter: 1, verse: 31 }
    },
    {
        question: "What did God tell Noah to build?",
        options: ["A house", "An ark", "A temple", "A tower"],
        correct: 1, // An ark
        bibleRef: { book: "Genesis", chapter: 6, verse: 14 }
    },
    {
        question: "Who was thrown into a lion's den but was saved by God?",
        options: ["David", "Daniel", "Moses", "Joseph"],
        correct: 1, // Daniel
        bibleRef: { book: "Daniel", chapter: 6, verse: 22 }
    },
    {
        question: "What did David use to defeat Goliath?",
        options: ["A sword", "A spear", "A sling and a stone", "A bow and arrow"],
        correct: 2, // A sling and a stone
        bibleRef: { book: "1 Samuel", chapter: 17, verse: 50 }
    },
    {
        question: "In what city was Jesus born?",
        options: ["Jerusalem", "Nazareth", "Bethlehem", "Jericho"],
        correct: 2, // Bethlehem
        bibleRef: { book: "Luke", chapter: 2, verse: 4 }
    },
    {
        question: "How many disciples did Jesus have?",
        options: ["10", "12", "15", "20"],
        correct: 1, // 12
        bibleRef: { book: "Matthew", chapter: 10, verse: 1 }
    },
    {
        question: "What did Jesus use to feed 5,000 people?",
        options: ["5 loaves and 2 fish", "10 loaves and 5 fish", "3 loaves and 1 fish", "7 loaves and 3 fish"],
        correct: 0, // 5 loaves and 2 fish
        bibleRef: { book: "John", chapter: 6, verse: 9 }
    },
    {
        question: "Who helped a man who was beaten and left on the side of the road?",
        options: ["A priest", "A Levite", "A Samaritan", "A Pharisee"],
        correct: 2, // A Samaritan
        bibleRef: { book: "Luke", chapter: 10, verse: 33 }
    },
    {
        question: "What happened to Jesus three days after he was crucified?",
        options: ["He was buried", "He rose from the dead", "He went to heaven", "He appeared to the disciples"],
        correct: 1, // He rose from the dead
        bibleRef: { book: "Matthew", chapter: 28, verse: 6 }
    },
    {
        question: "What did Moses receive from God on Mount Sinai?",
        options: ["A crown", "The Ten Commandments", "A staff", "A book"],
        correct: 1, // The Ten Commandments
        bibleRef: { book: "Exodus", chapter: 20, verse: 1 }
    }
];

class BibleTrivia {
    constructor() {
        this.currentQuestion = 0;
        this.score = 0;
        this.selectedAnswer = null;
        this.questions = this.shuffleQuestions([...triviaQuestions]);
        this.gameStarted = false;
        
        this.init();
    }
    
    init() {
        // Wait for auth
        setTimeout(() => {
            const checkAuth = setInterval(() => {
                if (window.authStatus) {
                    clearInterval(checkAuth);
                    if (window.authStatus.isAuthenticated) {
                        this.setupGame();
                    } else {
                        const authCheck = document.getElementById('authCheck');
                        if (authCheck) {
                            authCheck.innerHTML = '<p>Authentication failed. Redirecting to login...</p>';
                        }
                    }
                }
            }, 100);
            
            setTimeout(() => {
                clearInterval(checkAuth);
                if (!window.authStatus) {
                    const authCheck = document.getElementById('authCheck');
                    if (authCheck) {
                        authCheck.innerHTML = '<p style="color: #dc3545;">Authentication check timed out. Please refresh the page.</p>';
                    }
                }
            }, 5000);
        }, 200);
    }
    
    setupGame() {
        const session = window.authStatus?.getSession();
        if (!session) {
            window.location.href = 'login.html';
            return;
        }
        
        document.getElementById('authCheck').classList.add('hidden');
        document.getElementById('mainContent').classList.remove('hidden');
        
        // Event listeners
        document.getElementById('startGameBtn').addEventListener('click', () => this.startGame());
        document.getElementById('nextQuestionBtn').addEventListener('click', () => this.nextQuestion());
        document.getElementById('finishGameBtn').addEventListener('click', () => this.finishGame());
        document.getElementById('playAgainBtn').addEventListener('click', () => this.resetGame());
    }
    
    shuffleQuestions(questions) {
        // Shuffle array using Fisher-Yates algorithm
        for (let i = questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [questions[i], questions[j]] = [questions[j], questions[i]];
        }
        return questions.slice(0, 10); // Take first 10 questions
    }
    
    startGame() {
        this.gameStarted = true;
        document.getElementById('startScreen').classList.add('hidden');
        document.getElementById('gameScreen').classList.remove('hidden');
        this.currentQuestion = 0;
        this.score = 0;
        this.displayQuestion();
    }
    
    displayQuestion() {
        const question = this.questions[this.currentQuestion];
        const questionNum = this.currentQuestion + 1;
        
        document.getElementById('currentQuestionNum').textContent = questionNum;
        document.getElementById('currentScore').textContent = this.score;
        document.getElementById('questionNumber').textContent = `Question ${questionNum} of 10`;
        document.getElementById('questionText').textContent = question.question;
        
        // Clear previous answers
        const answerOptions = document.getElementById('answerOptions');
        answerOptions.innerHTML = '';
        
        // Create answer buttons
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'answer-option';
            button.textContent = option;
            button.addEventListener('click', () => this.selectAnswer(index));
            answerOptions.appendChild(button);
        });
        
        // Reset UI
        document.getElementById('feedbackSection').classList.remove('show');
        document.getElementById('nextQuestionBtn').style.display = 'none';
        document.getElementById('finishGameBtn').style.display = 'none';
        this.selectedAnswer = null;
    }
    
    async selectAnswer(index) {
        if (this.selectedAnswer !== null) return; // Already answered
        
        this.selectedAnswer = index;
        const question = this.questions[this.currentQuestion];
        const options = document.querySelectorAll('.answer-option');
        
        // Disable all options
        options.forEach(opt => {
            opt.classList.add('disabled');
            opt.style.pointerEvents = 'none';
        });
        
        // Mark selected answer
        options[index].classList.add('selected');
        
        // Check if correct
        const isCorrect = index === question.correct;
        if (isCorrect) {
            options[index].classList.add('correct');
            this.score++;
            this.showFeedback(true, question);
        } else {
            options[index].classList.add('incorrect');
            options[question.correct].classList.add('correct');
            this.showFeedback(false, question);
        }
        
        // Track this question answer
        await this.trackQuestionAnswer(question, isCorrect);
        
        // Show next button
        if (this.currentQuestion === this.questions.length - 1) {
            document.getElementById('finishGameBtn').style.display = 'block';
        } else {
            document.getElementById('nextQuestionBtn').style.display = 'block';
        }
    }
    
    showFeedback(isCorrect, question) {
        const feedbackSection = document.getElementById('feedbackSection');
        const feedbackMessage = document.getElementById('feedbackMessage');
        const bibleLink = document.getElementById('bibleLink');
        
        feedbackSection.classList.add('show');
        
        if (isCorrect) {
            feedbackMessage.className = 'feedback-correct';
            feedbackMessage.textContent = '✓ Correct! Great job!';
            bibleLink.style.display = 'none';
        } else {
            feedbackMessage.className = 'feedback-incorrect';
            feedbackMessage.textContent = `✗ Incorrect. The correct answer is: ${question.options[question.correct]}`;
            
            // Create link to Bible reader
            const ref = question.bibleRef;
            const bibleUrl = `bible.html?book=${encodeURIComponent(ref.book)}&chapter=${ref.chapter}&verse=${ref.verse}`;
            bibleLink.href = bibleUrl;
            bibleLink.style.display = 'inline-block';
            
            // Track Bible link click when user clicks it
            bibleLink.onclick = () => {
                this.trackBibleLinkClick(ref);
            };
        }
    }
    
    nextQuestion() {
        this.currentQuestion++;
        this.displayQuestion();
    }
    
    async finishGame() {
        // Hide game screen
        document.getElementById('gameScreen').classList.add('hidden');
        
        // Show results
        const resultsScreen = document.getElementById('resultsScreen');
        resultsScreen.classList.add('show');
        
        document.getElementById('finalScore').textContent = this.score;
        
        // Calculate credits
        let creditsEarned = 0;
        let message = '';
        
        if (this.score < 5) {
            creditsEarned = 0;
            message = "Keep studying! Read the Bible stories to learn more and try again.";
        } else if (this.score >= 6 && this.score <= 8) {
            creditsEarned = 10;
            message = "Good job! You're learning!";
        } else if (this.score >= 9) {
            creditsEarned = 20;
            message = "Excellent! You know your Bible stories well!";
        }
        
        document.getElementById('resultsMessage').textContent = message;
        
        // Award credits if earned
        if (creditsEarned > 0) {
            const creditsEarnedDiv = document.getElementById('creditsEarned');
            creditsEarnedDiv.textContent = `You earned ${creditsEarned} credits!`;
            creditsEarnedDiv.style.display = 'block';
            
            await this.awardCredits(creditsEarned);
        } else {
            document.getElementById('creditsEarned').style.display = 'none';
        }
        
        // Save game result
        await this.saveGameResult();
    }
    
    async awardCredits(amount) {
        const session = window.authStatus?.getSession();
        if (!session) return;
        
        try {
            // Get current balance
            const { data: existingCredit, error: fetchError } = await supabase
                .from('User_Credits')
                .select('credit_id, balance')
                .eq('user_uid', session.uid)
                .single();
            
            const oldBalance = existingCredit?.balance || 0;
            const newBalance = oldBalance + amount;
            
            if (existingCredit) {
                // Update existing balance
                const { error: updateError } = await supabase
                    .from('User_Credits')
                    .update({ 
                        balance: newBalance, 
                        updated_at: new Date().toISOString() 
                    })
                    .eq('credit_id', existingCredit.credit_id);
                
                if (updateError) throw updateError;
            } else {
                // Create new credit record
                const { error: insertError } = await supabase
                    .from('User_Credits')
                    .insert({ 
                        user_uid: session.uid, 
                        balance: amount 
                    });
                
                if (insertError) throw insertError;
            }
            
            // Record transaction
            const { error: transError } = await supabase
                .from('Credit_Transactions')
                .insert({
                    from_user_uid: session.uid,
                    to_user_uid: session.uid,
                    amount: amount,
                    transaction_type: 'credit_added',
                    game_type: 'bible_trivia',
                    description: `Bible Trivia: Scored ${this.score}/10`
                });
            
            if (transError) throw transError;
            
        } catch (error) {
            console.error('Error awarding credits:', error);
        }
    }
    
    async trackQuestionAnswer(question, isCorrect) {
        const session = window.authStatus?.getSession();
        if (!session) return;
        
        try {
            await supabase
                .from('Bible_Trivia_Answers')
                .insert({
                    user_uid: session.uid,
                    question_text: question.question,
                    is_correct: isCorrect,
                    bible_book: question.bibleRef.book,
                    bible_chapter: question.bibleRef.chapter,
                    bible_verse: question.bibleRef.verse,
                    answered_at: new Date().toISOString()
                });
        } catch (error) {
            // Table might not exist yet, that's okay
            console.log('Could not track question answer (table may not exist):', error);
        }
    }
    
    async trackBibleLinkClick(bibleRef) {
        const session = window.authStatus?.getSession();
        if (!session) return;
        
        try {
            // Track the click
            await supabase
                .from('Bible_Trivia_Link_Clicks')
                .insert({
                    user_uid: session.uid,
                    bible_book: bibleRef.book,
                    bible_chapter: bibleRef.chapter,
                    bible_verse: bibleRef.verse,
                    clicked_at: new Date().toISOString()
                });
            
            // Easter egg: Award 5 credits for reading the Bible story
            await this.awardBibleReadingCredits(5, bibleRef);
        } catch (error) {
            // Table might not exist yet, that's okay
            console.log('Could not track Bible link click (table may not exist):', error);
        }
    }
    
    async awardBibleReadingCredits(amount, bibleRef) {
        const session = window.authStatus?.getSession();
        if (!session) return;
        
        try {
            // Get current balance
            const { data: existingCredit, error: fetchError } = await supabase
                .from('User_Credits')
                .select('credit_id, balance')
                .eq('user_uid', session.uid)
                .single();
            
            const oldBalance = existingCredit?.balance || 0;
            const newBalance = oldBalance + amount;
            
            if (existingCredit) {
                // Update existing balance
                const { error: updateError } = await supabase
                    .from('User_Credits')
                    .update({ 
                        balance: newBalance, 
                        updated_at: new Date().toISOString() 
                    })
                    .eq('credit_id', existingCredit.credit_id);
                
                if (updateError) throw updateError;
            } else {
                // Create new credit record
                const { error: insertError } = await supabase
                    .from('User_Credits')
                    .insert({ 
                        user_uid: session.uid, 
                        balance: amount 
                    });
                
                if (insertError) throw insertError;
            }
            
            // Record transaction
            const { error: transError } = await supabase
                .from('Credit_Transactions')
                .insert({
                    from_user_uid: session.uid,
                    to_user_uid: session.uid,
                    amount: amount,
                    transaction_type: 'credit_added',
                    game_type: 'bible_trivia',
                    description: `Easter Egg: Read Bible story (${bibleRef.book} ${bibleRef.chapter}:${bibleRef.verse})`
                });
            
            if (transError) throw transError;
            
        } catch (error) {
            console.error('Error awarding Bible reading credits:', error);
        }
    }
    
    async saveGameResult() {
        const session = window.authStatus?.getSession();
        if (!session) return;
        
        try {
            await supabase
                .from('Bible_Trivia_Results')
                .insert({
                    user_uid: session.uid,
                    score: this.score,
                    total_questions: 10,
                    credits_earned: this.score < 5 ? 0 : (this.score >= 9 ? 20 : 10)
                });
        } catch (error) {
            // Table might not exist yet, that's okay
            console.log('Could not save game result (table may not exist):', error);
        }
    }
    
    resetGame() {
        this.currentQuestion = 0;
        this.score = 0;
        this.selectedAnswer = null;
        this.questions = this.shuffleQuestions([...triviaQuestions]);
        
        document.getElementById('resultsScreen').classList.remove('show');
        document.getElementById('startScreen').classList.remove('hidden');
        document.getElementById('gameScreen').classList.add('hidden');
    }
}

// Initialize game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new BibleTrivia();
});

