// Landing page functionality
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://frlajamhyyectdrcbrnd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybGFqYW1oeXllY3RkcmNicm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4ODA4ODksImV4cCI6MjA4MjQ1Njg4OX0.QAH0GME5_iYkz6SZjfqdL3q9E9Jo1qKv6YWFk2exAtY';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Motivational quotes for kids aged 7-13
const motivationalQuotes = [
    { text: "You are braver than you believe, stronger than you seem, and smarter than you think!", author: "A.A. Milne" },
    { text: "Every expert was once a beginner. Every pro was once an amateur. Every icon was once an unknown.", author: "Robin Sharma" },
    { text: "The only way to do great work is to love what you do!", author: "Steve Jobs" },
    { text: "You miss 100% of the shots you don't take!", author: "Wayne Gretzky" },
    { text: "Believe you can and you're halfway there!", author: "Theodore Roosevelt" },
    { text: "It's not whether you get knocked down, it's whether you get back up!", author: "Vince Lombardi" },
    { text: "Dream big and dare to fail!", author: "Norman Vaughan" },
    { text: "The future belongs to those who believe in the beauty of their dreams!", author: "Eleanor Roosevelt" },
    { text: "You are never too old to set another goal or to dream a new dream!", author: "C.S. Lewis" },
    { text: "Success is the sum of small efforts repeated day in and day out!", author: "Robert Collier" },
    { text: "The only person you should try to be better than is the person you were yesterday!", author: "Unknown" },
    { text: "You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose!", author: "Dr. Seuss" },
    { text: "Why fit in when you were born to stand out?", author: "Dr. Seuss" },
    { text: "Be yourself; everyone else is already taken!", author: "Oscar Wilde" },
    { text: "Mistakes are proof that you are trying!", author: "Unknown" },
    { text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go!", author: "Dr. Seuss" },
    { text: "Today is your day! Your mountain is waiting, so get on your way!", author: "Dr. Seuss" },
    { text: "You're off to great places! Today is your day!", author: "Dr. Seuss" },
    { text: "Think left and think right and think low and think high. Oh, the thinks you can think up if only you try!", author: "Dr. Seuss" },
    { text: "You're braver than you believe and stronger and smarter than you think!", author: "A.A. Milne" }
];

// Get time-based greeting
function getTimeBasedGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) {
        return "Good morning";
    } else if (hour < 17) {
        return "Good afternoon";
    } else {
        return "Good evening";
    }
}

// Get a random quote (can be made to change per login by using session storage)
function getRandomQuote() {
    // Use session storage to track if we've shown a quote this session
    // For a new quote each login, we could use login timestamp
    const sessionData = sessionStorage.getItem('userSession');
    let quoteIndex = 0;
    
    if (sessionData) {
        try {
            const session = JSON.parse(sessionData);
            // Use login time to seed random selection (so it's consistent per session)
            const loginTime = session.loginTime || Date.now().toString();
            quoteIndex = parseInt(loginTime.slice(-2)) % motivationalQuotes.length;
        } catch (e) {
            quoteIndex = Math.floor(Math.random() * motivationalQuotes.length);
        }
    } else {
        quoteIndex = Math.floor(Math.random() * motivationalQuotes.length);
    }
    
    return motivationalQuotes[quoteIndex];
}

// Initialize landing page
document.addEventListener('DOMContentLoaded', () => {
    // Wait for authentication
    const checkAuth = setInterval(() => {
        if (window.authStatus && window.authStatus.isAuthenticated) {
            clearInterval(checkAuth);
            initializeLanding();
        } else if (window.authStatus && !window.authStatus.isAuthenticated) {
            clearInterval(checkAuth);
        }
    }, 100);
    
    setTimeout(() => {
        clearInterval(checkAuth);
    }, 5000);
});

function initializeLanding() {
    const session = window.authStatus.getSession();
    if (!session) return;
    
    // Set greeting
    const greetingText = document.getElementById('greetingText');
    const userName = document.getElementById('userName');
    const displayName = session.firstName && session.lastName 
        ? `${session.firstName} ${session.lastName}` 
        : session.username;
    
    greetingText.textContent = getTimeBasedGreeting() + ',';
    userName.textContent = displayName;
    
    // Set quote
    const quote = getRandomQuote();
    document.getElementById('quoteText').textContent = `"${quote.text}"`;
    document.getElementById('quoteAuthor').textContent = `— ${quote.author}`;
    
    // Show main content
    document.getElementById('authCheck').classList.add('hidden');
    document.getElementById('mainContent').classList.remove('hidden');
}

