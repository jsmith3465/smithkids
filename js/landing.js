// Landing page functionality
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://frlajamhyyectdrcbrnd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybGFqYW1oeXllY3RkcmNicm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4ODA4ODksImV4cCI6MjA4MjQ1Njg4OX0.QAH0GME5_iYkz6SZjfqdL3q9E9Jo1qKv6YWFk2exAtY';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Motivational quotes from "The Way of the Warrior Kid" and related themes for kids aged 7-13
const motivationalQuotes = [
    { text: "Discipline equals freedom. By staying disciplined, you can achieve your goals and overcome challenges.", author: "The Way of the Warrior Kid", type: "quote" },
    { text: "Good is never good enough! Always strive to improve and set new goals after achieving one.", author: "The Way of the Warrior Kid", type: "quote" },
    { text: "A warrior kid never quits. When things get tough, that's when you push harder.", author: "The Way of the Warrior Kid", type: "quote" },
    { text: "Hard work beats talent when talent doesn't work hard. Keep pushing yourself every single day.", author: "The Way of the Warrior Kid", type: "quote" },
    { text: "You become what you do every day. Make your habits work for you, not against you.", author: "The Way of the Warrior Kid", type: "quote" },
    { text: "A warrior kid is disciplined, strong, and ready for anything. Train your body and your mind.", author: "The Way of the Warrior Kid", type: "quote" },
    { text: "The only easy day was yesterday. Today you get stronger, faster, and better.", author: "The Way of the Warrior Kid", type: "quote" },
    { text: "Don't just do your best—do what's required. Then do more. That's what makes you a warrior.", author: "The Way of the Warrior Kid", type: "quote" },
    { text: "Excuses are for people who don't want it bad enough. Warriors find a way to get it done.", author: "The Way of the Warrior Kid", type: "quote" },
    { text: "Every champion was once a beginner. Every expert was once a student. Keep learning and growing.", author: "The Way of the Warrior Kid", type: "quote" },
    { text: "Mental toughness is just as important as physical strength. Train both every single day.", author: "The Way of the Warrior Kid", type: "quote" },
    { text: "A warrior kid doesn't make excuses—they make results. Show up and do the work.", author: "The Way of the Warrior Kid", type: "quote" },
    { text: "The difference between ordinary and extraordinary is that little extra. Give that extra effort today.", author: "The Way of the Warrior Kid", type: "quote" },
    { text: "You don't have to be great to start, but you have to start to be great. Begin your journey today.", author: "The Way of the Warrior Kid", type: "quote" },
    { text: "A warrior kid is always prepared. Train hard, study hard, and be ready for any challenge.", author: "The Way of the Warrior Kid", type: "quote" },
    { text: "Success isn't given—it's earned. Every day is a chance to earn your success.", author: "The Way of the Warrior Kid", type: "quote" },
    { text: "When you feel like quitting, remember why you started. Keep pushing forward, warrior kid!", author: "The Way of the Warrior Kid", type: "quote" },
    { text: "A warrior kid never backs down from a challenge. Face your fears and overcome them.", author: "The Way of the Warrior Kid", type: "quote" },
    { text: "The only way to get better is to practice. Every day you practice, you get one step closer to your goal.", author: "The Way of the Warrior Kid", type: "quote" },
    { text: "Be the warrior kid who shows up, works hard, and never gives up. That's how champions are made.", author: "The Way of the Warrior Kid", type: "quote" }
];

// Bible verses about Jesus for kids aged 7-13 (NIV)
const bibleVerses = [
    { text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.", book: "John", chapter: 3, verse: 16, type: "bible" },
    { text: "Jesus said, 'Let the little children come to me, and do not hinder them, for the kingdom of heaven belongs to such as these.'", book: "Matthew", chapter: 19, verse: 14, type: "bible" },
    { text: "Jesus answered, 'I am the way and the truth and the life. No one comes to the Father except through me.'", book: "John", chapter: 14, verse: 6, type: "bible" },
    { text: "For I can do everything through Christ, who gives me strength.", book: "Philippians", chapter: 4, verse: 13, type: "bible" },
    { text: "Jesus said to her, 'I am the resurrection and the life. The one who believes in me will live, even though they die.'", book: "John", chapter: 11, verse: 25, type: "bible" },
    { text: "But Jesus looked at them and said, 'With man this is impossible, but with God all things are possible.'", book: "Matthew", chapter: 19, verse: 26, type: "bible" },
    { text: "Jesus said, 'I am the light of the world. Whoever follows me will never walk in darkness, but will have the light of life.'", book: "John", chapter: 8, verse: 12, type: "bible" },
    { text: "Come to me, all you who are weary and burdened, and I will give you rest.", book: "Matthew", chapter: 11, verse: 28, type: "bible" },
    { text: "For the Son of Man came to seek and to save the lost.", book: "Luke", chapter: 19, verse: 10, type: "bible" },
    { text: "Jesus said, 'I am the good shepherd. The good shepherd lays down his life for the sheep.'", book: "John", chapter: 10, verse: 11, type: "bible" },
    { text: "Jesus said, 'Do not let your hearts be troubled. You believe in God; believe also in me.'", book: "John", chapter: 14, verse: 1, type: "bible" },
    { text: "For even the Son of Man did not come to be served, but to serve, and to give his life as a ransom for many.", book: "Mark", chapter: 10, verse: 45, type: "bible" },
    { text: "Jesus said, 'I am the bread of life. Whoever comes to me will never go hungry, and whoever believes in me will never be thirsty.'", book: "John", chapter: 6, verse: 35, type: "bible" },
    { text: "But God demonstrates his own love for us in this: While we were still sinners, Christ died for us.", book: "Romans", chapter: 5, verse: 8, type: "bible" },
    { text: "Jesus said, 'I have come that they may have life, and have it to the full.'", book: "John", chapter: 10, verse: 10, type: "bible" },
    { text: "For to us a child is born, to us a son is given, and the government will be on his shoulders. And he will be called Wonderful Counselor, Mighty God, Everlasting Father, Prince of Peace.", book: "Isaiah", chapter: 9, verse: 6, type: "bible" },
    { text: "Jesus said, 'Love your neighbor as yourself.'", book: "Matthew", chapter: 22, verse: 39, type: "bible" },
    { text: "Jesus said, 'Do to others as you would have them do to you.'", book: "Luke", chapter: 6, verse: 31, type: "bible" },
    { text: "Trust in the Lord with all your heart and lean not on your own understanding.", book: "Proverbs", chapter: 3, verse: 5, type: "bible" },
    { text: "When I am afraid, I put my trust in you.", book: "Psalm", chapter: 56, verse: 3, type: "bible" }
];

// Combined array - we'll use weighted selection to maintain 3:2 ratio (Bible verses : motivational quotes)
// For every 5 messages: 3 Bible verses, 2 motivational quotes

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

// Get a random quote or Bible verse with 3:2 ratio (Bible verses : motivational quotes)
// For every 5 messages: 3 Bible verses, 2 motivational quotes
// Randomly selects each time the page is visited
function getRandomQuote() {
    // Randomly select type with 60% chance for Bible verses (3/5) and 40% for quotes (2/5)
    const random = Math.random();
    let selectedItem;
    
    if (random < 0.6) {
        // 60% chance: Select a random Bible verse
        const randomIndex = Math.floor(Math.random() * bibleVerses.length);
        selectedItem = bibleVerses[randomIndex];
    } else {
        // 40% chance: Select a random motivational quote
        const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
        selectedItem = motivationalQuotes[randomIndex];
    }
    
    return selectedItem;
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
    
    // Set quote or Bible verse
    const quote = getRandomQuote();
    const quoteTextEl = document.getElementById('quoteText');
    const quoteAuthorEl = document.getElementById('quoteAuthor');
    
    quoteTextEl.textContent = `"${quote.text}"`;
    
    if (quote.type === 'bible') {
        // For Bible verses, make the reference a clickable link
        const reference = `${quote.book} ${quote.chapter}:${quote.verse}`;
        const referenceLink = document.createElement('a');
        referenceLink.href = `pages/bible.html?book=${encodeURIComponent(quote.book)}&chapter=${quote.chapter}&verse=${quote.verse}`;
        referenceLink.textContent = reference;
        referenceLink.style.color = '#CC5500';
        referenceLink.style.textDecoration = 'none';
        referenceLink.style.fontWeight = '600';
        referenceLink.onmouseover = function() { this.style.textDecoration = 'underline'; };
        referenceLink.onmouseout = function() { this.style.textDecoration = 'none'; };
        
        // Add click event to award bonus credit
        referenceLink.addEventListener('click', async (e) => {
            e.preventDefault();
            await awardBibleVerseBonus(session.uid, quote.book, quote.chapter, quote.verse);
            // Navigate to the Bible page after awarding credit
            window.location.href = referenceLink.href;
        });
        
        quoteAuthorEl.innerHTML = '';
        quoteAuthorEl.appendChild(document.createTextNode('— '));
        quoteAuthorEl.appendChild(referenceLink);
        quoteAuthorEl.appendChild(document.createTextNode(' (NIV)'));
    } else {
        quoteAuthorEl.textContent = `— ${quote.author}`;
    }
    
    // Show main content
    document.getElementById('authCheck').classList.add('hidden');
    document.getElementById('mainContent').classList.remove('hidden');
}

async function awardBibleVerseBonus(userUid, book, chapter, verse) {
    try {
        // Get or create credit record
        const { data: existingCredit, error: creditFetchError } = await supabase
            .from('User_Credits')
            .select('credit_id, balance')
            .eq('user_uid', userUid)
            .single();
        
        if (creditFetchError && creditFetchError.code !== 'PGRST116') {
            console.error('Error fetching credits:', creditFetchError);
            return;
        }
        
        const newBalance = (existingCredit?.balance || 0) + 1;
        
        if (existingCredit) {
            // Update existing balance
            const { error: balanceUpdateError } = await supabase
                .from('User_Credits')
                .update({ balance: newBalance, updated_at: new Date().toISOString() })
                .eq('credit_id', existingCredit.credit_id);
            
            if (balanceUpdateError) {
                console.error('Error updating credits:', balanceUpdateError);
                return;
            }
        } else {
            // Create new credit record
            const { error: balanceInsertError } = await supabase
                .from('User_Credits')
                .insert({ user_uid: userUid, balance: 1 });
            
            if (balanceInsertError) {
                console.error('Error creating credit record:', balanceInsertError);
                return;
            }
        }
        
        // Record transaction
        const { error: transactionError } = await supabase
            .from('Credit_Transactions')
            .insert({
                to_user_uid: userUid,
                amount: 1,
                transaction_type: 'credit_added',
                game_type: 'bible_verse_bonus',
                description: `Special bonus for being biblically curious - ${book} ${chapter}:${verse}`
            });
        
        if (transactionError) {
            console.error('Error recording transaction:', transactionError);
            // Don't fail if transaction recording fails, credit was already added
        }
        
        // Show success message
        showBonusMessage();
        
    } catch (error) {
        console.error('Error awarding Bible verse bonus:', error);
    }
}

function showBonusMessage() {
    // Create a temporary message element
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
        color: #155724;
        padding: 15px 20px;
        border-radius: 10px;
        border: 2px solid #28a745;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        font-weight: 600;
        font-size: 1rem;
        animation: slideInRight 0.3s ease-out;
    `;
    messageDiv.textContent = '✨ +1 Credit: Special bonus for being biblically curious!';
    
    // Add animation style if not already present
    if (!document.getElementById('bonusMessageStyle')) {
        const style = document.createElement('style');
        style.id = 'bonusMessageStyle';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(messageDiv);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        messageDiv.style.animation = 'slideInRight 0.3s ease-out reverse';
        setTimeout(() => {
            messageDiv.remove();
        }, 300);
    }, 3000);
}

