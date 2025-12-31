// Bible Trivia Game

// Helper function to get correct path for pages
function getPagePath(pageName) {
    const currentPath = window.location.pathname;
    if (currentPath === '/' || currentPath.endsWith('/index.html') || currentPath.endsWith('index.html')) {
        return `pages/${pageName}`;
    }
    return pageName;
}
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
import { initializeApprovalNotifications } from './notification-system.js';

const SUPABASE_URL = 'https://frlajamhyyectdrcbrnd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybGFqYW1oeXllY3RkcmNicm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4ODA4ODksImV4cCI6MjA4MjQ1Njg4OX0.QAH0GME5_iYkz6SZjfqdL3q9E9Jo1qKv6YWFk2exAtY';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Bible Trivia Questions - 300 questions total (100 easy, 100 moderate, 100 hard)
// Last Updated: January 2025
// NOTE: Questions should be updated at least monthly to keep content fresh and engaging
const triviaQuestions = [
    // ========== EASY QUESTIONS (1-100) ==========
    {
        question: "How many days did it take God to create the world?",
        options: ["3 days", "6 days", "7 days", "10 days"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Genesis", chapter: 1, verse: 31 }
    },
    {
        question: "What did God tell Noah to build?",
        options: ["A house", "An ark", "A temple", "A tower"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Genesis", chapter: 6, verse: 14 }
    },
    {
        question: "Who was thrown into a lion's den but was saved by God?",
        options: ["David", "Daniel", "Moses", "Joseph"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Daniel", chapter: 6, verse: 22 }
    },
    {
        question: "What did David use to defeat Goliath?",
        options: ["A sword", "A spear", "A sling and a stone", "A bow and arrow"],
        correct: 2,
        difficulty: "easy",
        bibleRef: { book: "1 Samuel", chapter: 17, verse: 50 }
    },
    {
        question: "In what city was Jesus born?",
        options: ["Jerusalem", "Nazareth", "Bethlehem", "Jericho"],
        correct: 2,
        difficulty: "easy",
        bibleRef: { book: "Luke", chapter: 2, verse: 4 }
    },
    {
        question: "How many disciples did Jesus have?",
        options: ["10", "12", "15", "20"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Matthew", chapter: 10, verse: 1 }
    },
    {
        question: "What did Jesus use to feed 5,000 people?",
        options: ["5 loaves and 2 fish", "10 loaves and 5 fish", "3 loaves and 1 fish", "7 loaves and 3 fish"],
        correct: 0,
        difficulty: "easy",
        bibleRef: { book: "John", chapter: 6, verse: 9 }
    },
    {
        question: "Who helped a man who was beaten and left on the side of the road?",
        options: ["A priest", "A Levite", "A Samaritan", "A Pharisee"],
        correct: 2,
        difficulty: "easy",
        bibleRef: { book: "Luke", chapter: 10, verse: 33 }
    },
    {
        question: "What happened to Jesus three days after he was crucified?",
        options: ["He was buried", "He rose from the dead", "He went to heaven", "He appeared to the disciples"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Matthew", chapter: 28, verse: 6 }
    },
    {
        question: "What did Moses receive from God on Mount Sinai?",
        options: ["A crown", "The Ten Commandments", "A staff", "A book"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Exodus", chapter: 20, verse: 1 }
    },
    {
        question: "Who was the first man God created?",
        options: ["Noah", "Adam", "Abraham", "Moses"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Genesis", chapter: 2, verse: 7 }
    },
    {
        question: "What was the name of the garden where Adam and Eve lived?",
        options: ["Garden of Gethsemane", "Garden of Eden", "Garden of Paradise", "Garden of Heaven"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Genesis", chapter: 2, verse: 8 }
    },
    {
        question: "What animal tempted Eve in the garden?",
        options: ["A lion", "A snake", "A bird", "A monkey"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Genesis", chapter: 3, verse: 1 }
    },
    {
        question: "How many animals of each kind did Noah take on the ark?",
        options: ["One pair", "Two pairs", "Seven pairs", "Ten pairs"],
        correct: 0,
        difficulty: "easy",
        bibleRef: { book: "Genesis", chapter: 7, verse: 2 }
    },
    {
        question: "What sign did God give Noah after the flood?",
        options: ["A star", "A rainbow", "A cloud", "A dove"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Genesis", chapter: 9, verse: 13 }
    },
    {
        question: "Who built a tower to reach heaven?",
        options: ["The people of Babel", "The Egyptians", "The Israelites", "The Philistines"],
        correct: 0,
        difficulty: "easy",
        bibleRef: { book: "Genesis", chapter: 11, verse: 4 }
    },
    {
        question: "What was Abraham's original name?",
        options: ["Abram", "Abel", "Aaron", "Adam"],
        correct: 0,
        difficulty: "easy",
        bibleRef: { book: "Genesis", chapter: 17, verse: 5 }
    },
    {
        question: "How old was Abraham when Isaac was born?",
        options: ["50 years old", "75 years old", "100 years old", "120 years old"],
        correct: 2,
        difficulty: "easy",
        bibleRef: { book: "Genesis", chapter: 21, verse: 5 }
    },
    {
        question: "What did God ask Abraham to sacrifice?",
        options: ["A lamb", "His son Isaac", "A goat", "A bull"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Genesis", chapter: 22, verse: 2 }
    },
    {
        question: "Who was sold into slavery by his brothers?",
        options: ["Moses", "Joseph", "David", "Daniel"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Genesis", chapter: 37, verse: 28 }
    },
    {
        question: "How many brothers did Joseph have?",
        options: ["10", "11", "12", "13"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Genesis", chapter: 42, verse: 13 }
    },
    {
        question: "What did Joseph interpret for Pharaoh?",
        options: ["A riddle", "A dream", "A prophecy", "A vision"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Genesis", chapter: 41, verse: 25 }
    },
    {
        question: "Who was found in a basket in the river?",
        options: ["Samuel", "Moses", "David", "Jesus"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Exodus", chapter: 2, verse: 3 }
    },
    {
        question: "What did God send to the Egyptians as plagues?",
        options: ["10 plagues", "7 plagues", "12 plagues", "5 plagues"],
        correct: 0,
        difficulty: "easy",
        bibleRef: { book: "Exodus", chapter: 7, verse: 14 }
    },
    {
        question: "What body of water did Moses part?",
        options: ["The Red Sea", "The Dead Sea", "The Jordan River", "The Nile River"],
        correct: 0,
        difficulty: "easy",
        bibleRef: { book: "Exodus", chapter: 14, verse: 21 }
    },
    {
        question: "How many commandments did God give Moses?",
        options: ["5", "10", "12", "15"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Exodus", chapter: 20, verse: 1 }
    },
    {
        question: "Who brought down the walls of Jericho?",
        options: ["Moses", "Joshua", "David", "Samson"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Joshua", chapter: 6, verse: 20 }
    },
    {
        question: "What did the Israelites use to bring down Jericho's walls?",
        options: ["Swords", "Trumpets and shouts", "Battering rams", "Fire"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Joshua", chapter: 6, verse: 20 }
    },
    {
        question: "Who was the strongest man in the Bible?",
        options: ["Goliath", "Samson", "David", "Saul"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Judges", chapter: 16, verse: 17 }
    },
    {
        question: "What was the source of Samson's strength?",
        options: ["His muscles", "His hair", "His sword", "His faith"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Judges", chapter: 16, verse: 17 }
    },
    {
        question: "Who was the first king of Israel?",
        options: ["David", "Saul", "Solomon", "Rehoboam"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "1 Samuel", chapter: 10, verse: 1 }
    },
    {
        question: "Who was David's best friend?",
        options: ["Saul", "Jonathan", "Goliath", "Samuel"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "1 Samuel", chapter: 18, verse: 1 }
    },
    {
        question: "Who was David's son who became king?",
        options: ["Absalom", "Solomon", "Rehoboam", "Jeroboam"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "1 Kings", chapter: 1, verse: 30 }
    },
    {
        question: "What did Solomon ask God for?",
        options: ["Wealth", "Wisdom", "Power", "Long life"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "1 Kings", chapter: 3, verse: 9 }
    },
    {
        question: "Who was thrown into a fiery furnace?",
        options: ["Daniel", "Shadrach, Meshach, and Abednego", "Moses", "Elijah"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Daniel", chapter: 3, verse: 21 }
    },
    {
        question: "What happened to Shadrach, Meshach, and Abednego in the furnace?",
        options: ["They burned", "They were saved by an angel", "They escaped", "They died"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Daniel", chapter: 3, verse: 25 }
    },
    {
        question: "Who was swallowed by a big fish?",
        options: ["Daniel", "Jonah", "Moses", "Noah"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Jonah", chapter: 1, verse: 17 }
    },
    {
        question: "What was the name of Jesus' mother?",
        options: ["Mary", "Martha", "Elizabeth", "Anna"],
        correct: 0,
        difficulty: "easy",
        bibleRef: { book: "Matthew", chapter: 1, verse: 18 }
    },
    {
        question: "Who was Jesus' earthly father?",
        options: ["Joseph", "David", "Zechariah", "Herod"],
        correct: 0,
        difficulty: "easy",
        bibleRef: { book: "Matthew", chapter: 1, verse: 16 }
    },
    {
        question: "Who baptized Jesus?",
        options: ["Peter", "John the Baptist", "Paul", "Andrew"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Matthew", chapter: 3, verse: 13 }
    },
    {
        question: "Where was Jesus baptized?",
        options: ["The Jordan River", "The Red Sea", "The Dead Sea", "The Sea of Galilee"],
        correct: 0,
        difficulty: "easy",
        bibleRef: { book: "Matthew", chapter: 3, verse: 13 }
    },
    {
        question: "What did Jesus turn water into?",
        options: ["Wine", "Milk", "Oil", "Blood"],
        correct: 0,
        difficulty: "easy",
        bibleRef: { book: "John", chapter: 2, verse: 9 }
    },
    {
        question: "Who walked on water with Jesus?",
        options: ["John", "Peter", "James", "Andrew"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Matthew", chapter: 14, verse: 29 }
    },
    {
        question: "How many people did Jesus feed with 5 loaves and 2 fish?",
        options: ["1,000", "3,000", "5,000", "10,000"],
        correct: 2,
        difficulty: "easy",
        bibleRef: { book: "Matthew", chapter: 14, verse: 21 }
    },
    {
        question: "Who betrayed Jesus?",
        options: ["Peter", "Judas", "Thomas", "John"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Matthew", chapter: 26, verse: 14 }
    },
    {
        question: "How many pieces of silver did Judas receive?",
        options: ["20", "30", "40", "50"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Matthew", chapter: 26, verse: 15 }
    },
    {
        question: "Where was Jesus crucified?",
        options: ["Mount Sinai", "Golgotha", "Mount Zion", "Mount of Olives"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Matthew", chapter: 27, verse: 33 }
    },
    {
        question: "How many days was Jesus in the tomb?",
        options: ["1 day", "2 days", "3 days", "4 days"],
        correct: 2,
        difficulty: "easy",
        bibleRef: { book: "Matthew", chapter: 28, verse: 6 }
    },
    {
        question: "Who was the first to see Jesus after he rose?",
        options: ["Peter", "Mary Magdalene", "John", "Thomas"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "John", chapter: 20, verse: 14 }
    },
    {
        question: "Who doubted that Jesus had risen?",
        options: ["Peter", "Thomas", "John", "James"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "John", chapter: 20, verse: 25 }
    },
    {
        question: "How many books are in the New Testament?",
        options: ["25", "27", "29", "30"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Revelation", chapter: 22, verse: 21 }
    },
    {
        question: "What is the last book of the Bible?",
        options: ["Jude", "Revelation", "3 John", "Hebrews"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Revelation", chapter: 22, verse: 21 }
    },
    {
        question: "Who wrote most of the New Testament letters?",
        options: ["Peter", "Paul", "John", "James"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Romans", chapter: 1, verse: 1 }
    },
    {
        question: "What is the first book of the Bible?",
        options: ["Exodus", "Genesis", "Numbers", "Leviticus"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Genesis", chapter: 1, verse: 1 }
    },
    {
        question: "What is the longest book in the Bible?",
        options: ["Genesis", "Psalms", "Isaiah", "Jeremiah"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Psalms", chapter: 150, verse: 6 }
    },
    {
        question: "Who wrote the book of Psalms?",
        options: ["Solomon", "David", "Moses", "Samuel"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Psalms", chapter: 3, verse: 1 }
    },
    {
        question: "What is the shortest verse in the Bible?",
        options: ["God is love", "Jesus wept", "Pray always", "Love one another"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "John", chapter: 11, verse: 35 }
    },
    {
        question: "What did God create on the first day?",
        options: ["Light", "Animals", "Plants", "People"],
        correct: 0,
        difficulty: "easy",
        bibleRef: { book: "Genesis", chapter: 1, verse: 3 }
    },
    {
        question: "What did God create on the sixth day?",
        options: ["Animals and people", "Plants", "Light", "Water"],
        correct: 0,
        difficulty: "easy",
        bibleRef: { book: "Genesis", chapter: 1, verse: 24 }
    },
    {
        question: "What did God do on the seventh day?",
        options: ["Created more animals", "Rested", "Created people", "Created plants"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Genesis", chapter: 2, verse: 2 }
    },
    {
        question: "What was the name of Adam and Eve's third son?",
        options: ["Cain", "Abel", "Seth", "Noah"],
        correct: 2,
        difficulty: "easy",
        bibleRef: { book: "Genesis", chapter: 4, verse: 25 }
    },
    {
        question: "Who killed his brother Abel?",
        options: ["Seth", "Cain", "Noah", "Enoch"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Genesis", chapter: 4, verse: 8 }
    },
    {
        question: "How long did it rain during the flood?",
        options: ["7 days", "40 days", "100 days", "1 year"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Genesis", chapter: 7, verse: 12 }
    },
    {
        question: "What bird did Noah send out first?",
        options: ["A dove", "A raven", "An eagle", "A sparrow"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Genesis", chapter: 8, verse: 7 }
    },
    {
        question: "What bird brought back an olive leaf?",
        options: ["A raven", "A dove", "An eagle", "A sparrow"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Genesis", chapter: 8, verse: 11 }
    },
    {
        question: "Who was Sarah's son?",
        options: ["Ishmael", "Isaac", "Jacob", "Esau"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Genesis", chapter: 21, verse: 3 }
    },
    {
        question: "Who were Isaac's twin sons?",
        options: ["Jacob and Esau", "Cain and Abel", "Joseph and Benjamin", "Moses and Aaron"],
        correct: 0,
        difficulty: "easy",
        bibleRef: { book: "Genesis", chapter: 25, verse: 24 }
    },
    {
        question: "What did Jacob receive instead of Esau's birthright?",
        options: ["Money", "A blessing", "Land", "Animals"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Genesis", chapter: 27, verse: 27 }
    },
    {
        question: "What was Jacob's name changed to?",
        options: ["Israel", "Judah", "Benjamin", "Joseph"],
        correct: 0,
        difficulty: "easy",
        bibleRef: { book: "Genesis", chapter: 32, verse: 28 }
    },
    {
        question: "How many sons did Jacob have?",
        options: ["10", "11", "12", "13"],
        correct: 2,
        difficulty: "easy",
        bibleRef: { book: "Genesis", chapter: 35, verse: 22 }
    },
    {
        question: "What was Joseph's special coat called?",
        options: ["A robe", "A coat of many colors", "A tunic", "A cloak"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Genesis", chapter: 37, verse: 3 }
    },
    {
        question: "Who became the ruler of Egypt after interpreting Pharaoh's dream?",
        options: ["Moses", "Joseph", "Daniel", "David"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Genesis", chapter: 41, verse: 41 }
    },
    {
        question: "What was the name of Moses' brother?",
        options: ["Aaron", "Joshua", "Caleb", "Miriam"],
        correct: 0,
        difficulty: "easy",
        bibleRef: { book: "Exodus", chapter: 4, verse: 14 }
    },
    {
        question: "What was the name of Moses' sister?",
        options: ["Sarah", "Miriam", "Deborah", "Ruth"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Exodus", chapter: 15, verse: 20 }
    },
    {
        question: "What was the first plague?",
        options: ["Frogs", "Water turned to blood", "Locusts", "Darkness"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Exodus", chapter: 7, verse: 20 }
    },
    {
        question: "What did the Israelites eat in the desert?",
        options: ["Bread from heaven (manna)", "Fish", "Birds", "Fruit"],
        correct: 0,
        difficulty: "easy",
        bibleRef: { book: "Exodus", chapter: 16, verse: 15 }
    },
    {
        question: "What did God provide for water in the desert?",
        options: ["Rain", "Water from a rock", "A river", "A well"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Exodus", chapter: 17, verse: 6 }
    },
    {
        question: "Who led Israel after Moses died?",
        options: ["Aaron", "Joshua", "Caleb", "Samuel"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Joshua", chapter: 1, verse: 1 }
    },
    {
        question: "Who was the first judge of Israel?",
        options: ["Deborah", "Gideon", "Samson", "Othniel"],
        correct: 3,
        difficulty: "easy",
        bibleRef: { book: "Judges", chapter: 3, verse: 9 }
    },
    {
        question: "Who was the only female judge?",
        options: ["Ruth", "Deborah", "Esther", "Miriam"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Judges", chapter: 4, verse: 4 }
    },
    {
        question: "Who defeated the Midianites with only 300 men?",
        options: ["Samson", "Gideon", "David", "Joshua"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Judges", chapter: 7, verse: 7 }
    },
    {
        question: "Who was Ruth's mother-in-law?",
        options: ["Naomi", "Sarah", "Rebekah", "Rachel"],
        correct: 0,
        difficulty: "easy",
        bibleRef: { book: "Ruth", chapter: 1, verse: 4 }
    },
    {
        question: "Who was Ruth's husband?",
        options: ["Boaz", "David", "Saul", "Solomon"],
        correct: 0,
        difficulty: "easy",
        bibleRef: { book: "Ruth", chapter: 4, verse: 13 }
    },
    {
        question: "Who was Samuel's mother?",
        options: ["Hannah", "Sarah", "Rebekah", "Rachel"],
        correct: 0,
        difficulty: "easy",
        bibleRef: { book: "1 Samuel", chapter: 1, verse: 20 }
    },
    {
        question: "Who anointed David as king?",
        options: ["Saul", "Samuel", "Nathan", "Gad"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "1 Samuel", chapter: 16, verse: 13 }
    },
    {
        question: "How tall was Goliath?",
        options: ["6 feet", "7 feet", "Over 9 feet", "10 feet"],
        correct: 2,
        difficulty: "easy",
        bibleRef: { book: "1 Samuel", chapter: 17, verse: 4 }
    },
    {
        question: "Who was David's son who rebelled against him?",
        options: ["Solomon", "Absalom", "Adonijah", "Amnon"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "2 Samuel", chapter: 15, verse: 10 }
    },
    {
        question: "What did Solomon build for God?",
        options: ["An altar", "A temple", "A palace", "A tower"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "1 Kings", chapter: 6, verse: 1 }
    },
    {
        question: "Who visited Solomon to test his wisdom?",
        options: ["The Queen of Sheba", "Pharaoh", "The King of Tyre", "The King of Babylon"],
        correct: 0,
        difficulty: "easy",
        bibleRef: { book: "1 Kings", chapter: 10, verse: 1 }
    },
    {
        question: "Who was taken to heaven in a chariot of fire?",
        options: ["Moses", "Elijah", "Elisha", "Isaiah"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "2 Kings", chapter: 2, verse: 11 }
    },
    {
        question: "Who was Elisha's teacher?",
        options: ["Elijah", "Samuel", "Nathan", "Isaiah"],
        correct: 0,
        difficulty: "easy",
        bibleRef: { book: "2 Kings", chapter: 2, verse: 9 }
    },
    {
        question: "Who was thrown into a den of lions?",
        options: ["Shadrach", "Daniel", "Meshach", "Abednego"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Daniel", chapter: 6, verse: 16 }
    },
    {
        question: "What did the handwriting on the wall say?",
        options: ["MENE, MENE, TEKEL, PARSIN", "HOLY, HOLY, HOLY", "JESUS SAVES", "LOVE ONE ANOTHER"],
        correct: 0,
        difficulty: "easy",
        bibleRef: { book: "Daniel", chapter: 5, verse: 25 }
    },
    {
        question: "Who saved her people from destruction?",
        options: ["Ruth", "Esther", "Deborah", "Mary"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Esther", chapter: 4, verse: 16 }
    },
    {
        question: "Who was Esther's cousin?",
        options: ["Mordecai", "Haman", "Xerxes", "Vashti"],
        correct: 0,
        difficulty: "easy",
        bibleRef: { book: "Esther", chapter: 2, verse: 7 }
    },
    {
        question: "Where was Jesus born?",
        options: ["In a house", "In a stable", "In a palace", "In a temple"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Luke", chapter: 2, verse: 7 }
    },
    {
        question: "Who visited baby Jesus?",
        options: ["The shepherds", "The wise men", "Both shepherds and wise men", "The priests"],
        correct: 2,
        difficulty: "easy",
        bibleRef: { book: "Matthew", chapter: 2, verse: 1 }
    },
    {
        question: "How many wise men visited Jesus?",
        options: ["2", "3", "4", "The Bible doesn't say"],
        correct: 3,
        difficulty: "easy",
        bibleRef: { book: "Matthew", chapter: 2, verse: 1 }
    },
    {
        question: "What gifts did the wise men bring?",
        options: ["Gold, silver, and bronze", "Gold, frankincense, and myrrh", "Food, clothes, and money", "Jewels, spices, and oil"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Matthew", chapter: 2, verse: 11 }
    },
    {
        question: "How old was Jesus when he taught in the temple?",
        options: ["10 years old", "12 years old", "15 years old", "18 years old"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Luke", chapter: 2, verse: 42 }
    },
    {
        question: "What was Jesus' first miracle?",
        options: ["Walking on water", "Turning water into wine", "Feeding 5,000", "Raising Lazarus"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "John", chapter: 2, verse: 11 }
    },
    {
        question: "Who was the first disciple Jesus called?",
        options: ["Peter", "Andrew", "John", "James"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "John", chapter: 1, verse: 40 }
    },
    {
        question: "What were Peter and Andrew doing when Jesus called them?",
        options: ["Fishing", "Farming", "Building", "Teaching"],
        correct: 0,
        difficulty: "easy",
        bibleRef: { book: "Matthew", chapter: 4, verse: 18 }
    },
    {
        question: "What did Jesus say to make Peter and Andrew fishers of men?",
        options: ["Follow me", "Come with me", "Join me", "Come, follow me"],
        correct: 3,
        difficulty: "easy",
        bibleRef: { book: "Matthew", chapter: 4, verse: 19 }
    },
    {
        question: "Who was the tax collector that became a disciple?",
        options: ["Judas", "Matthew", "Thomas", "Philip"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Matthew", chapter: 9, verse: 9 }
    },
    {
        question: "What is the first miracle in the book of John?",
        options: ["Walking on water", "Turning water into wine", "Healing the blind", "Raising the dead"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "John", chapter: 2, verse: 11 }
    },
    {
        question: "Who came to Jesus at night?",
        options: ["Peter", "Nicodemus", "Judas", "Thomas"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "John", chapter: 3, verse: 1 }
    },
    {
        question: "What did Jesus tell Nicodemus he must do?",
        options: ["Be baptized", "Be born again", "Give to the poor", "Follow the law"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "John", chapter: 3, verse: 3 }
    },
    {
        question: "Who was the woman at the well?",
        options: ["A Samaritan woman", "A Jewish woman", "A Roman woman", "A Greek woman"],
        correct: 0,
        difficulty: "easy",
        bibleRef: { book: "John", chapter: 4, verse: 7 }
    },
    {
        question: "What did Jesus offer the woman at the well?",
        options: ["Water", "Living water", "Wine", "Food"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "John", chapter: 4, verse: 10 }
    },
    {
        question: "Who was raised from the dead by Jesus?",
        options: ["Lazarus", "Jairus' daughter", "The widow's son", "All of the above"],
        correct: 3,
        difficulty: "easy",
        bibleRef: { book: "John", chapter: 11, verse: 44 }
    },
    {
        question: "How many days was Lazarus dead before Jesus raised him?",
        options: ["1 day", "2 days", "3 days", "4 days"],
        correct: 2,
        difficulty: "easy",
        bibleRef: { book: "John", chapter: 11, verse: 39 }
    },
    {
        question: "What did Jesus ride into Jerusalem?",
        options: ["A horse", "A donkey", "A camel", "He walked"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Matthew", chapter: 21, verse: 7 }
    },
    {
        question: "What did people wave when Jesus entered Jerusalem?",
        options: ["Flags", "Palm branches", "Clothes", "Swords"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "John", chapter: 12, verse: 13 }
    },
    {
        question: "Who denied Jesus three times?",
        options: ["Judas", "Peter", "Thomas", "John"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Matthew", chapter: 26, verse: 75 }
    },
    {
        question: "Who was the Roman governor who sentenced Jesus to death?",
        options: ["Herod", "Pilate", "Caesar", "Felix"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Matthew", chapter: 27, verse: 2 }
    },
    {
        question: "What was written on the sign above Jesus' cross?",
        options: ["King of the Jews", "This is Jesus", "Savior of the World", "Son of God"],
        correct: 0,
        difficulty: "easy",
        bibleRef: { book: "Matthew", chapter: 27, verse: 37 }
    },
    {
        question: "Who helped carry Jesus' cross?",
        options: ["Peter", "John", "Simon of Cyrene", "Joseph of Arimathea"],
        correct: 2,
        difficulty: "easy",
        bibleRef: { book: "Matthew", chapter: 27, verse: 32 }
    },
    {
        question: "Who asked for Jesus' body to bury it?",
        options: ["Nicodemus", "Joseph of Arimathea", "Peter", "John"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Matthew", chapter: 27, verse: 57 }
    },
    {
        question: "Who rolled the stone away from Jesus' tomb?",
        options: ["The disciples", "An angel", "The soldiers", "Mary Magdalene"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Matthew", chapter: 28, verse: 2 }
    },
    {
        question: "How many days after his resurrection did Jesus ascend to heaven?",
        options: ["7 days", "30 days", "40 days", "50 days"],
        correct: 2,
        difficulty: "easy",
        bibleRef: { book: "Acts", chapter: 1, verse: 3 }
    },
    {
        question: "What happened on the Day of Pentecost?",
        options: ["Jesus was born", "The Holy Spirit came", "Jesus died", "Jesus rose"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Acts", chapter: 2, verse: 1 }
    },
    {
        question: "Who was the first Christian martyr?",
        options: ["Peter", "Paul", "Stephen", "James"],
        correct: 2,
        difficulty: "easy",
        bibleRef: { book: "Acts", chapter: 7, verse: 59 }
    },
    {
        question: "Who was Saul before he became Paul?",
        options: ["A fisherman", "A tax collector", "A Pharisee", "A Roman soldier"],
        correct: 2,
        difficulty: "easy",
        bibleRef: { book: "Acts", chapter: 9, verse: 1 }
    },
    {
        question: "What happened to Saul on the road to Damascus?",
        options: ["He was arrested", "He saw a vision of Jesus", "He was robbed", "He got lost"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Acts", chapter: 9, verse: 3 }
    },
    {
        question: "Who was Paul's companion on many journeys?",
        options: ["Peter", "Barnabas", "John", "Timothy"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Acts", chapter: 13, verse: 2 }
    },
    {
        question: "What did Paul do for a living?",
        options: ["He was a fisherman", "He was a tentmaker", "He was a farmer", "He was a teacher"],
        correct: 1,
        difficulty: "easy",
        bibleRef: { book: "Acts", chapter: 18, verse: 3 }
    },
    {
        question: "What is the theme of 1 Corinthians 13?",
        options: ["Faith", "Hope", "Love", "Joy"],
        correct: 2,
        difficulty: "easy",
        bibleRef: { book: "1 Corinthians", chapter: 13, verse: 1 }
    },
    {
        question: "What is the fruit of the Spirit?",
        options: ["Love, joy, peace", "Patience, kindness, goodness", "Faithfulness, gentleness, self-control", "All of the above"],
        correct: 3,
        difficulty: "easy",
        bibleRef: { book: "Galatians", chapter: 5, verse: 22 }
    },
    {
        question: "What is the armor of God?",
        options: ["Belt of truth, breastplate of righteousness", "Shield of faith, helmet of salvation", "Sword of the Spirit", "All of the above"],
        correct: 3,
        difficulty: "easy",
        bibleRef: { book: "Ephesians", chapter: 6, verse: 14 }
    },
    {
        question: "Who wrote the book of Revelation?",
        options: ["Paul", "Peter", "John", "James"],
        correct: 2,
        difficulty: "easy",
        bibleRef: { book: "Revelation", chapter: 1, verse: 1 }
    },
    {
        question: "What are the four living creatures in Revelation?",
        options: ["Lion, ox, man, eagle", "Bear, wolf, man, bird", "Lion, bear, man, eagle", "Ox, wolf, man, bird"],
        correct: 0,
        difficulty: "easy",
        bibleRef: { book: "Revelation", chapter: 4, verse: 7 }
    },
    // ========== MODERATE QUESTIONS (101-200) ==========
    {
        question: "What was the name of the tree in the middle of the Garden of Eden?",
        options: ["Tree of Life", "Tree of Knowledge of Good and Evil", "Tree of Wisdom", "Tree of Eternal Life"],
        correct: 1,
        difficulty: "moderate",
        bibleRef: { book: "Genesis", chapter: 2, verse: 9 }
    },
    {
        question: "How many years did Methuselah live?",
        options: ["800 years", "900 years", "969 years", "1000 years"],
        correct: 2,
        difficulty: "moderate",
        bibleRef: { book: "Genesis", chapter: 5, verse: 27 }
    },
    {
        question: "What was the name of Noah's wife?",
        options: ["The Bible doesn't say", "Naamah", "Sarah", "Rebekah"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Genesis", chapter: 7, verse: 7 }
    },
    {
        question: "How many languages did God create at Babel?",
        options: ["7", "12", "70", "The Bible doesn't specify"],
        correct: 3,
        difficulty: "moderate",
        bibleRef: { book: "Genesis", chapter: 11, verse: 7 }
    },
    {
        question: "What was the name of Abraham's servant who found a wife for Isaac?",
        options: ["Eliezer", "Lot", "Melchizedek", "Abimelech"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Genesis", chapter: 24, verse: 2 }
    },
    {
        question: "Who was Rebekah's brother?",
        options: ["Laban", "Esau", "Jacob", "Isaac"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Genesis", chapter: 24, verse: 29 }
    },
    {
        question: "How many years did Jacob work for Rachel?",
        options: ["7 years", "14 years", "20 years", "21 years"],
        correct: 1,
        difficulty: "moderate",
        bibleRef: { book: "Genesis", chapter: 29, verse: 20 }
    },
    {
        question: "What was the name of Joseph's Egyptian wife?",
        options: ["Asenath", "Potiphar", "Zuleika", "Hagar"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Genesis", chapter: 41, verse: 45 }
    },
    {
        question: "What were the names of Joseph's two sons?",
        options: ["Ephraim and Manasseh", "Reuben and Simeon", "Judah and Benjamin", "Dan and Naphtali"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Genesis", chapter: 41, verse: 51 }
    },
    {
        question: "What was the name of Moses' wife?",
        options: ["Zipporah", "Miriam", "Jochebed", "Shiphrah"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Exodus", chapter: 2, verse: 21 }
    },
    {
        question: "What was the name of Moses' father-in-law?",
        options: ["Jethro", "Reuel", "Both Jethro and Reuel", "Hobab"],
        correct: 2,
        difficulty: "moderate",
        bibleRef: { book: "Exodus", chapter: 3, verse: 1 }
    },
    {
        question: "What was the name of the mountain where Moses received the Ten Commandments?",
        options: ["Mount Horeb", "Mount Sinai", "Both names are used", "Mount Zion"],
        correct: 2,
        difficulty: "moderate",
        bibleRef: { book: "Exodus", chapter: 19, verse: 20 }
    },
    {
        question: "How many years did the Israelites wander in the desert?",
        options: ["30 years", "40 years", "50 years", "70 years"],
        correct: 1,
        difficulty: "moderate",
        bibleRef: { book: "Numbers", chapter: 14, verse: 33 }
    },
    {
        question: "What was the name of the spy who encouraged Israel to enter the Promised Land?",
        options: ["Joshua", "Caleb", "Both Joshua and Caleb", "Moses"],
        correct: 2,
        difficulty: "moderate",
        bibleRef: { book: "Numbers", chapter: 14, verse: 6 }
    },
    {
        question: "Who was Rahab?",
        options: ["A prostitute who helped the spies", "A queen", "A judge", "A prophetess"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Joshua", chapter: 2, verse: 1 }
    },
    {
        question: "How many times did the Israelites march around Jericho?",
        options: ["6 times in 6 days, then 7 times on the 7th day", "7 times in 7 days", "12 times", "40 times"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Joshua", chapter: 6, verse: 14 }
    },
    {
        question: "What was the name of Gideon's father?",
        options: ["Joash", "Abimelech", "Jotham", "Tola"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Judges", chapter: 6, verse: 11 }
    },
    {
        question: "What was the name of Samson's first wife?",
        options: ["Delilah", "The Bible doesn't say", "Tamar", "Ruth"],
        correct: 1,
        difficulty: "moderate",
        bibleRef: { book: "Judges", chapter: 14, verse: 1 }
    },
    {
        question: "How many Philistines did Samson kill with a donkey's jawbone?",
        options: ["300", "1,000", "3,000", "10,000"],
        correct: 1,
        difficulty: "moderate",
        bibleRef: { book: "Judges", chapter: 15, verse: 15 }
    },
    {
        question: "What was the name of Ruth's first husband?",
        options: ["Boaz", "Mahlon", "Elimelech", "Chilion"],
        correct: 1,
        difficulty: "moderate",
        bibleRef: { book: "Ruth", chapter: 1, verse: 2 }
    },
    {
        question: "Who was Samuel's father?",
        options: ["Elkanah", "Eli", "Joel", "Abijah"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "1 Samuel", chapter: 1, verse: 1 }
    },
    {
        question: "What was the name of Saul's son who was David's friend?",
        options: ["Ishbosheth", "Jonathan", "Abner", "Ishvi"],
        correct: 1,
        difficulty: "moderate",
        bibleRef: { book: "1 Samuel", chapter: 14, verse: 1 }
    },
    {
        question: "How many sons did Jesse have?",
        options: ["7", "8", "10", "12"],
        correct: 1,
        difficulty: "moderate",
        bibleRef: { book: "1 Samuel", chapter: 16, verse: 10 }
    },
    {
        question: "What was the name of Goliath's brother?",
        options: ["Lahmi", "Ishbi-Benob", "Saph", "The Bible doesn't say"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "1 Chronicles", chapter: 20, verse: 5 }
    },
    {
        question: "What was the name of David's first wife?",
        options: ["Bathsheba", "Michal", "Abigail", "Ahinoam"],
        correct: 1,
        difficulty: "moderate",
        bibleRef: { book: "1 Samuel", chapter: 18, verse: 27 }
    },
    {
        question: "Who was Absalom's mother?",
        options: ["Bathsheba", "Michal", "Maakah", "Abigail"],
        correct: 2,
        difficulty: "moderate",
        bibleRef: { book: "2 Samuel", chapter: 3, verse: 3 }
    },
    {
        question: "How many years did David rule as king?",
        options: ["30 years", "40 years", "50 years", "60 years"],
        correct: 1,
        difficulty: "moderate",
        bibleRef: { book: "1 Kings", chapter: 2, verse: 11 }
    },
    {
        question: "What was the name of Solomon's mother?",
        options: ["Bathsheba", "Michal", "Abigail", "Ahinoam"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "1 Kings", chapter: 1, verse: 11 }
    },
    {
        question: "How many years did it take to build Solomon's temple?",
        options: ["5 years", "7 years", "10 years", "20 years"],
        correct: 1,
        difficulty: "moderate",
        bibleRef: { book: "1 Kings", chapter: 6, verse: 38 }
    },
    {
        question: "How many wives did Solomon have?",
        options: ["100", "300", "700", "1,000"],
        correct: 2,
        difficulty: "moderate",
        bibleRef: { book: "1 Kings", chapter: 11, verse: 3 }
    },
    {
        question: "Who was the prophet who confronted David about Bathsheba?",
        options: ["Samuel", "Nathan", "Gad", "Ahijah"],
        correct: 1,
        difficulty: "moderate",
        bibleRef: { book: "2 Samuel", chapter: 12, verse: 1 }
    },
    {
        question: "What was the name of Elijah's successor?",
        options: ["Elisha", "Elijah", "Isaiah", "Jeremiah"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "1 Kings", chapter: 19, verse: 16 }
    },
    {
        question: "How many prophets of Baal did Elijah challenge?",
        options: ["100", "450", "850", "1,000"],
        correct: 1,
        difficulty: "moderate",
        bibleRef: { book: "1 Kings", chapter: 18, verse: 22 }
    },
    {
        question: "What was the name of the widow whose son Elisha raised from the dead?",
        options: ["The Bible doesn't say", "Zarephath", "Shunammite", "Jezebel"],
        correct: 1,
        difficulty: "moderate",
        bibleRef: { book: "1 Kings", chapter: 17, verse: 9 }
    },
    {
        question: "Who was the king of Israel when Elisha was a prophet?",
        options: ["Ahab", "Jehoram", "Jehu", "Multiple kings"],
        correct: 3,
        difficulty: "moderate",
        bibleRef: { book: "2 Kings", chapter: 2, verse: 1 }
    },
    {
        question: "What was the name of the Syrian commander healed by Elisha?",
        options: ["Naaman", "Gehazi", "Hazael", "Ben-Hadad"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "2 Kings", chapter: 5, verse: 1 }
    },
    {
        question: "Who was the youngest king of Judah?",
        options: ["Josiah", "Joash", "Ahaziah", "Manasseh"],
        correct: 1,
        difficulty: "moderate",
        bibleRef: { book: "2 Kings", chapter: 11, verse: 21 }
    },
    {
        question: "How old was Josiah when he became king?",
        options: ["6 years old", "8 years old", "12 years old", "16 years old"],
        correct: 1,
        difficulty: "moderate",
        bibleRef: { book: "2 Kings", chapter: 22, verse: 1 }
    },
    {
        question: "What was the name of Daniel's three friends?",
        options: ["Shadrach, Meshach, and Abednego", "Hananiah, Mishael, and Azariah", "Both names are correct", "The Bible doesn't say"],
        correct: 2,
        difficulty: "moderate",
        bibleRef: { book: "Daniel", chapter: 1, verse: 7 }
    },
    {
        question: "What was Daniel's original name?",
        options: ["Belteshazzar", "Hananiah", "Daniel", "The Bible doesn't say"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Daniel", chapter: 1, verse: 7 }
    },
    {
        question: "Who was the king when the handwriting appeared on the wall?",
        options: ["Nebuchadnezzar", "Belshazzar", "Darius", "Cyrus"],
        correct: 1,
        difficulty: "moderate",
        bibleRef: { book: "Daniel", chapter: 5, verse: 1 }
    },
    {
        question: "What was the name of the king who threw Daniel into the lions' den?",
        options: ["Nebuchadnezzar", "Belshazzar", "Darius", "Cyrus"],
        correct: 2,
        difficulty: "moderate",
        bibleRef: { book: "Daniel", chapter: 6, verse: 1 }
    },
    {
        question: "What was the name of the king who married Esther?",
        options: ["Xerxes", "Artaxerxes", "Darius", "Cyrus"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Esther", chapter: 1, verse: 1 }
    },
    {
        question: "What was the name of Esther's uncle?",
        options: ["Mordecai", "Haman", "Bigthana", "Teresh"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Esther", chapter: 2, verse: 7 }
    },
    {
        question: "What was the name of the man who plotted to kill the Jews?",
        options: ["Mordecai", "Haman", "Xerxes", "Vashti"],
        correct: 1,
        difficulty: "moderate",
        bibleRef: { book: "Esther", chapter: 3, verse: 1 }
    },
    {
        question: "What was the name of Jesus' cousin?",
        options: ["John the Baptist", "James", "Judas", "Simon"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Luke", chapter: 1, verse: 36 }
    },
    {
        question: "What was the name of John the Baptist's father?",
        options: ["Zechariah", "Joseph", "Simeon", "Eli"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Luke", chapter: 1, verse: 5 }
    },
    {
        question: "What was the name of John the Baptist's mother?",
        options: ["Mary", "Elizabeth", "Anna", "Salome"],
        correct: 1,
        difficulty: "moderate",
        bibleRef: { book: "Luke", chapter: 1, verse: 5 }
    },
    {
        question: "How many months older was John the Baptist than Jesus?",
        options: ["3 months", "6 months", "9 months", "12 months"],
        correct: 1,
        difficulty: "moderate",
        bibleRef: { book: "Luke", chapter: 1, verse: 26 }
    },
    {
        question: "What was the name of the town where Jesus grew up?",
        options: ["Bethlehem", "Nazareth", "Jerusalem", "Capernaum"],
        correct: 1,
        difficulty: "moderate",
        bibleRef: { book: "Luke", chapter: 2, verse: 39 }
    },
    {
        question: "What was the name of the governor when Jesus was born?",
        options: ["Herod", "Pilate", "Quirinius", "Caesar"],
        correct: 2,
        difficulty: "moderate",
        bibleRef: { book: "Luke", chapter: 2, verse: 2 }
    },
    {
        question: "What was the name of the tax collector who climbed a tree to see Jesus?",
        options: ["Matthew", "Zacchaeus", "Levi", "Simon"],
        correct: 1,
        difficulty: "moderate",
        bibleRef: { book: "Luke", chapter: 19, verse: 2 }
    },
    {
        question: "What was the name of the woman who anointed Jesus' feet?",
        options: ["Mary Magdalene", "Mary of Bethany", "Both are mentioned", "The Bible doesn't say"],
        correct: 2,
        difficulty: "moderate",
        bibleRef: { book: "Luke", chapter: 7, verse: 37 }
    },
    {
        question: "What was the name of the man whose daughter Jesus raised from the dead?",
        options: ["Jairus", "Lazarus", "Nicodemus", "Joseph"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Mark", chapter: 5, verse: 22 }
    },
    {
        question: "What was the name of the man who was raised from the dead in Nain?",
        options: ["The Bible doesn't say", "Lazarus", "Jairus' daughter", "The widow's son"],
        correct: 3,
        difficulty: "moderate",
        bibleRef: { book: "Luke", chapter: 7, verse: 12 }
    },
    {
        question: "What was the name of the man who was paralyzed and lowered through the roof?",
        options: ["The Bible doesn't say", "Bartimaeus", "Lazarus", "Jairus"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Mark", chapter: 2, verse: 3 }
    },
    {
        question: "What was the name of the blind man Jesus healed in Jericho?",
        options: ["Bartimaeus", "The Bible doesn't say", "Lazarus", "Nicodemus"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Mark", chapter: 10, verse: 46 }
    },
    {
        question: "What was the name of the man who carried Jesus' cross?",
        options: ["Simon of Cyrene", "Joseph of Arimathea", "Nicodemus", "The Bible doesn't say"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Matthew", chapter: 27, verse: 32 }
    },
    {
        question: "What was the name of the place where Jesus was crucified?",
        options: ["Golgotha", "Calvary", "Both names are used", "The Bible doesn't say"],
        correct: 2,
        difficulty: "moderate",
        bibleRef: { book: "Matthew", chapter: 27, verse: 33 }
    },
    {
        question: "What was written on the sign above Jesus' cross in three languages?",
        options: ["Hebrew, Greek, and Latin", "Aramaic, Greek, and Latin", "Hebrew, Aramaic, and Greek", "The Bible doesn't say"],
        correct: 1,
        difficulty: "moderate",
        bibleRef: { book: "John", chapter: 19, verse: 20 }
    },
    {
        question: "Who was the first person to see the empty tomb?",
        options: ["Mary Magdalene", "Peter", "John", "The guards"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "John", chapter: 20, verse: 1 }
    },
    {
        question: "How many times did Jesus appear to his disciples after the resurrection?",
        options: ["3 times", "5 times", "10 times", "The Bible doesn't specify"],
        correct: 3,
        difficulty: "moderate",
        bibleRef: { book: "1 Corinthians", chapter: 15, verse: 5 }
    },
    {
        question: "What was the name of the disciple who replaced Judas?",
        options: ["Matthias", "Barnabas", "Silas", "Timothy"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Acts", chapter: 1, verse: 26 }
    },
    {
        question: "What was the name of the man who was stoned to death for his faith?",
        options: ["Stephen", "James", "Peter", "Paul"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Acts", chapter: 7, verse: 59 }
    },
    {
        question: "What was Saul's name changed to?",
        options: ["Paul", "Peter", "Barnabas", "Silas"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Acts", chapter: 13, verse: 9 }
    },
    {
        question: "What was the name of the first Gentile convert?",
        options: ["Cornelius", "Lydia", "The Ethiopian eunuch", "The Bible doesn't say"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Acts", chapter: 10, verse: 1 }
    },
    {
        question: "What was the name of the first European convert?",
        options: ["Lydia", "Cornelius", "The jailer", "The Bible doesn't say"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Acts", chapter: 16, verse: 14 }
    },
    {
        question: "What was the name of the jailer who was converted in Philippi?",
        options: ["The Bible doesn't say", "Lydia", "Cornelius", "Silas"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Acts", chapter: 16, verse: 25 }
    },
    {
        question: "What was the name of the young man who fell asleep during Paul's sermon?",
        options: ["Eutychus", "Timothy", "Titus", "The Bible doesn't say"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Acts", chapter: 20, verse: 9 }
    },
    {
        question: "What was the name of the island where Paul was shipwrecked?",
        options: ["Malta", "Cyprus", "Crete", "Rhodes"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Acts", chapter: 28, verse: 1 }
    },
    {
        question: "What was the name of Timothy's mother?",
        options: ["Eunice", "Lois", "Both Eunice and Lois", "The Bible doesn't say"],
        correct: 2,
        difficulty: "moderate",
        bibleRef: { book: "2 Timothy", chapter: 1, verse: 5 }
    },
    {
        question: "What was the name of the book that Paul wrote from prison?",
        options: ["Ephesians", "Philippians", "Colossians", "All of the above"],
        correct: 3,
        difficulty: "moderate",
        bibleRef: { book: "Ephesians", chapter: 3, verse: 1 }
    },
    {
        question: "What was the name of the church that Paul wrote the most letters to?",
        options: ["The church in Corinth", "The church in Rome", "The church in Ephesus", "The church in Philippi"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "1 Corinthians", chapter: 1, verse: 2 }
    },
    {
        question: "What was the name of the book that describes the end times?",
        options: ["Daniel", "Revelation", "Ezekiel", "Zechariah"],
        correct: 1,
        difficulty: "moderate",
        bibleRef: { book: "Revelation", chapter: 1, verse: 1 }
    },
    {
        question: "What was the name of the island where John was exiled?",
        options: ["Patmos", "Malta", "Cyprus", "Crete"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Revelation", chapter: 1, verse: 9 }
    },
    {
        question: "What was the name of the seven churches in Revelation?",
        options: ["Ephesus, Smyrna, Pergamum, Thyatira, Sardis, Philadelphia, Laodicea", "Rome, Corinth, Ephesus, Philippi, Colossae, Thessalonica, Galatia", "Jerusalem, Samaria, Antioch, Damascus, Tarsus, Iconium, Lystra", "The Bible doesn't say"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Revelation", chapter: 1, verse: 11 }
    },
    {
        question: "What was the name of the four horsemen in Revelation?",
        options: ["War, Famine, Pestilence, Death", "Conquest, War, Famine, Death", "War, Famine, Disease, Death", "The Bible doesn't name them"],
        correct: 1,
        difficulty: "moderate",
        bibleRef: { book: "Revelation", chapter: 6, verse: 2 }
    },
    {
        question: "What was the name of the river that flowed through the Garden of Eden?",
        options: ["One river that divided into four", "Four separate rivers", "The Nile River", "The Euphrates River"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Genesis", chapter: 2, verse: 10 }
    },
    {
        question: "What were the names of the four rivers in Eden?",
        options: ["Pishon, Gihon, Tigris, Euphrates", "Nile, Jordan, Tigris, Euphrates", "Pishon, Gihon, Jordan, Euphrates", "The Bible doesn't name all of them"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Genesis", chapter: 2, verse: 11 }
    },
    {
        question: "What was the name of the city that Cain built?",
        options: ["Enoch", "Nod", "Babel", "The Bible doesn't say"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Genesis", chapter: 4, verse: 17 }
    },
    {
        question: "What was the name of Noah's three sons?",
        options: ["Shem, Ham, and Japheth", "Cain, Abel, and Seth", "Abraham, Isaac, and Jacob", "The Bible doesn't say"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Genesis", chapter: 6, verse: 10 }
    },
    {
        question: "What was the name of the place where the tower of Babel was built?",
        options: ["Shinar", "Babylon", "Both names refer to the same place", "The Bible doesn't say"],
        correct: 2,
        difficulty: "moderate",
        bibleRef: { book: "Genesis", chapter: 11, verse: 2 }
    },
    {
        question: "What was the name of Abraham's nephew?",
        options: ["Lot", "Nahor", "Haran", "Terah"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Genesis", chapter: 11, verse: 27 }
    },
    {
        question: "What was the name of the place where Abraham almost sacrificed Isaac?",
        options: ["Mount Moriah", "Mount Sinai", "Mount Zion", "Mount Horeb"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Genesis", chapter: 22, verse: 2 }
    },
    {
        question: "What was the name of the well where Isaac's servants found water?",
        options: ["Beersheba", "Lahai Roi", "Elim", "The Bible doesn't say"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Genesis", chapter: 26, verse: 33 }
    },
    {
        question: "What was the name of Jacob's favorite wife?",
        options: ["Leah", "Rachel", "Bilhah", "Zilpah"],
        correct: 1,
        difficulty: "moderate",
        bibleRef: { book: "Genesis", chapter: 29, verse: 18 }
    },
    {
        question: "What was the name of the place where Jacob wrestled with God?",
        options: ["Peniel", "Bethel", "Beersheba", "Hebron"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Genesis", chapter: 32, verse: 30 }
    },
    {
        question: "What was the name of Joseph's Egyptian name?",
        options: ["Zaphenath-Paneah", "Potiphar", "Pharaoh", "The Bible doesn't say"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Genesis", chapter: 41, verse: 45 }
    },
    {
        question: "What was the name of the place where the Israelites crossed the Red Sea?",
        options: ["The Bible doesn't specify", "Pi Hahiroth", "Baal Zephon", "Both Pi Hahiroth and Baal Zephon"],
        correct: 3,
        difficulty: "moderate",
        bibleRef: { book: "Exodus", chapter: 14, verse: 2 }
    },
    {
        question: "What was the name of the bread from heaven?",
        options: ["Manna", "Bread of life", "Angel's food", "The Bible doesn't name it"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Exodus", chapter: 16, verse: 31 }
    },
    {
        question: "What was the name of the place where the Israelites received the Ten Commandments?",
        options: ["Mount Sinai", "Mount Horeb", "Both names are used", "Mount Zion"],
        correct: 2,
        difficulty: "moderate",
        bibleRef: { book: "Exodus", chapter: 19, verse: 20 }
    },
    {
        question: "What was the name of the high priest's breastplate?",
        options: ["The ephod", "The Urim and Thummim", "The breastplate of judgment", "All of the above"],
        correct: 3,
        difficulty: "moderate",
        bibleRef: { book: "Exodus", chapter: 28, verse: 15 }
    },
    {
        question: "What was the name of the golden calf the Israelites made?",
        options: ["The Bible doesn't name it", "Baal", "Moloch", "Asherah"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Exodus", chapter: 32, verse: 4 }
    },
    {
        question: "What was the name of the place where the Israelites camped for 40 years?",
        options: ["Kadesh Barnea", "The wilderness of Sin", "The wilderness of Paran", "Multiple places"],
        correct: 3,
        difficulty: "moderate",
        bibleRef: { book: "Numbers", chapter: 13, verse: 26 }
    },
    {
        question: "What was the name of the prophetess who led Israel after crossing the Red Sea?",
        options: ["Miriam", "Deborah", "Huldah", "Anna"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Exodus", chapter: 15, verse: 20 }
    },
    {
        question: "What was the name of the place where the Israelites first entered the Promised Land?",
        options: ["Jericho", "Gilgal", "Both", "The Bible doesn't say"],
        correct: 1,
        difficulty: "moderate",
        bibleRef: { book: "Joshua", chapter: 4, verse: 19 }
    },
    {
        question: "What was the name of the prostitute who helped the spies in Jericho?",
        options: ["Rahab", "Tamar", "Ruth", "The Bible doesn't say"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Joshua", chapter: 2, verse: 1 }
    },
    {
        question: "What was the name of the judge who defeated the Midianites?",
        options: ["Gideon", "Samson", "Deborah", "Othniel"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Judges", chapter: 6, verse: 11 }
    },
    {
        question: "What was the name of Gideon's son who became a judge?",
        options: ["Abimelech", "Jotham", "Tola", "The Bible doesn't say"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Judges", chapter: 8, verse: 31 }
    },
    {
        question: "What was the name of the place where Samson was buried?",
        options: ["Between Zorah and Eshtaol", "Timnah", "Gaza", "The Bible doesn't say"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Judges", chapter: 16, verse: 31 }
    },
    {
        question: "What was the name of Ruth's second husband?",
        options: ["Boaz", "Mahlon", "Elimelech", "Obed"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Ruth", chapter: 4, verse: 13 }
    },
    {
        question: "What was the name of Ruth and Boaz's son?",
        options: ["Obed", "Jesse", "David", "Solomon"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Ruth", chapter: 4, verse: 17 }
    },
    {
        question: "What was the name of Samuel's two sons who became judges?",
        options: ["Joel and Abijah", "Hophni and Phinehas", "The Bible doesn't name them", "Samuel had no sons"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "1 Samuel", chapter: 8, verse: 2 }
    },
    {
        question: "What was the name of the place where the ark was captured by the Philistines?",
        options: ["Aphek", "Ebenezer", "Both", "The Bible doesn't say"],
        correct: 1,
        difficulty: "moderate",
        bibleRef: { book: "1 Samuel", chapter: 4, verse: 1 }
    },
    {
        question: "What was the name of the place where David killed Goliath?",
        options: ["The Valley of Elah", "The Valley of Rephaim", "The Valley of Aijalon", "The Bible doesn't say"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "1 Samuel", chapter: 17, verse: 2 }
    },
    {
        question: "What was the name of David's first capital city?",
        options: ["Jerusalem", "Hebron", "Bethlehem", "Gath"],
        correct: 1,
        difficulty: "moderate",
        bibleRef: { book: "2 Samuel", chapter: 2, verse: 11 }
    },
    {
        question: "What was the name of the place where Absalom was killed?",
        options: ["The forest of Ephraim", "The Valley of Kidron", "Mount Olivet", "The Bible doesn't say"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "2 Samuel", chapter: 18, verse: 6 }
    },
    {
        question: "What was the name of the wise woman who saved the city of Abel?",
        options: ["The Bible doesn't say", "Deborah", "Huldah", "Jael"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "2 Samuel", chapter: 20, verse: 16 }
    },
    {
        question: "What was the name of the queen who visited Solomon?",
        options: ["The Queen of Sheba", "The Queen of the South", "Both names refer to the same person", "The Bible doesn't name her"],
        correct: 2,
        difficulty: "moderate",
        bibleRef: { book: "1 Kings", chapter: 10, verse: 1 }
    },
    {
        question: "What was the name of the prophet who anointed Jehu as king?",
        options: ["Elisha", "Elijah", "Both", "The Bible doesn't say"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "2 Kings", chapter: 9, verse: 1 }
    },
    {
        question: "What was the name of the king who found the Book of the Law?",
        options: ["Josiah", "Hezekiah", "Jehoash", "Manasseh"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "2 Kings", chapter: 22, verse: 8 }
    },
    {
        question: "What was the name of the prophet who was swallowed by a fish?",
        options: ["Jonah", "Nahum", "Amos", "Hosea"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Jonah", chapter: 1, verse: 17 }
    },
    {
        question: "What was the name of the city that Jonah was sent to?",
        options: ["Nineveh", "Babylon", "Assyria", "The Bible doesn't say"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Jonah", chapter: 1, verse: 2 }
    },
    {
        question: "What was the name of the king of Nineveh who repented?",
        options: ["The Bible doesn't name him", "Sennacherib", "Ashurbanipal", "Tiglath-Pileser"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Jonah", chapter: 3, verse: 6 }
    },
    {
        question: "What was the name of the prophet who was thrown into a cistern?",
        options: ["Jeremiah", "Ezekiel", "Daniel", "Isaiah"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Jeremiah", chapter: 38, verse: 6 }
    },
    {
        question: "What was the name of the king who released Jeremiah from prison?",
        options: ["Zedekiah", "Jehoiakim", "Jehoiachin", "Nebuchadnezzar"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Jeremiah", chapter: 38, verse: 5 }
    },
    {
        question: "What was the name of the prophet who saw a wheel within a wheel?",
        options: ["Ezekiel", "Daniel", "Isaiah", "Jeremiah"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Ezekiel", chapter: 1, verse: 16 }
    },
    {
        question: "What was the name of the valley of dry bones?",
        options: ["The Valley of the Shadow of Death", "The Valley of Dry Bones", "The Bible doesn't name it", "The Valley of Jehoshaphat"],
        correct: 1,
        difficulty: "moderate",
        bibleRef: { book: "Ezekiel", chapter: 37, verse: 1 }
    },
    {
        question: "What was the name of the king who saw the handwriting on the wall?",
        options: ["Belshazzar", "Nebuchadnezzar", "Darius", "Cyrus"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Daniel", chapter: 5, verse: 1 }
    },
    {
        question: "What was the name of the king who threw Shadrach, Meshach, and Abednego into the furnace?",
        options: ["Nebuchadnezzar", "Belshazzar", "Darius", "Cyrus"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Daniel", chapter: 3, verse: 19 }
    },
    {
        question: "What was the name of the king who threw Daniel into the lions' den?",
        options: ["Darius", "Nebuchadnezzar", "Belshazzar", "Cyrus"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Daniel", chapter: 6, verse: 16 }
    },
    {
        question: "What was the name of the Persian king who allowed the Jews to return?",
        options: ["Cyrus", "Darius", "Artaxerxes", "Xerxes"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Ezra", chapter: 1, verse: 1 }
    },
    {
        question: "What was the name of the man who led the Jews back to Jerusalem?",
        options: ["Zerubbabel", "Ezra", "Nehemiah", "All of the above"],
        correct: 3,
        difficulty: "moderate",
        bibleRef: { book: "Ezra", chapter: 2, verse: 2 }
    },
    {
        question: "What was the name of the man who rebuilt the walls of Jerusalem?",
        options: ["Nehemiah", "Ezra", "Zerubbabel", "Joshua"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Nehemiah", chapter: 2, verse: 5 }
    },
    {
        question: "What was the name of the high priest who helped rebuild the temple?",
        options: ["Joshua", "Ezra", "Nehemiah", "Zerubbabel"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Haggai", chapter: 1, verse: 1 }
    },
    {
        question: "What was the name of the prophet who encouraged the rebuilding of the temple?",
        options: ["Haggai", "Zechariah", "Both", "Malachi"],
        correct: 2,
        difficulty: "moderate",
        bibleRef: { book: "Haggai", chapter: 1, verse: 1 }
    },
    {
        question: "What was the name of the last book of the Old Testament?",
        options: ["Malachi", "Zechariah", "Haggai", "Nehemiah"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Malachi", chapter: 4, verse: 6 }
    },
    {
        question: "What was the name of the angel who appeared to Mary?",
        options: ["Gabriel", "Michael", "Raphael", "The Bible doesn't name him"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Luke", chapter: 1, verse: 26 }
    },
    {
        question: "What was the name of the angel who appeared to Zechariah?",
        options: ["Gabriel", "Michael", "Raphael", "The Bible doesn't name him"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Luke", chapter: 1, verse: 19 }
    },
    {
        question: "What was the name of the place where Jesus was tempted?",
        options: ["The wilderness", "The desert", "Both names are used", "The Bible doesn't specify"],
        correct: 2,
        difficulty: "moderate",
        bibleRef: { book: "Matthew", chapter: 4, verse: 1 }
    },
    {
        question: "What was the name of the mountain where Jesus was transfigured?",
        options: ["Mount Tabor", "Mount Hermon", "The Bible doesn't specify", "Mount of Olives"],
        correct: 2,
        difficulty: "moderate",
        bibleRef: { book: "Matthew", chapter: 17, verse: 1 }
    },
    {
        question: "What was the name of the place where Jesus was arrested?",
        options: ["Gethsemane", "The Mount of Olives", "Both names refer to the same place", "The Bible doesn't say"],
        correct: 2,
        difficulty: "moderate",
        bibleRef: { book: "Matthew", chapter: 26, verse: 36 }
    },
    {
        question: "What was the name of the high priest who questioned Jesus?",
        options: ["Caiaphas", "Annas", "Both", "The Bible doesn't say"],
        correct: 2,
        difficulty: "moderate",
        bibleRef: { book: "Matthew", chapter: 26, verse: 57 }
    },
    {
        question: "What was the name of the man who gave his tomb for Jesus?",
        options: ["Joseph of Arimathea", "Nicodemus", "Both", "The Bible doesn't say"],
        correct: 2,
        difficulty: "moderate",
        bibleRef: { book: "Matthew", chapter: 27, verse: 57 }
    },
    {
        question: "What was the name of the disciple who was a twin?",
        options: ["Thomas", "Judas", "James", "The Bible doesn't say"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "John", chapter: 11, verse: 16 }
    },
    {
        question: "What was the name of the disciple who was a Zealot?",
        options: ["Simon", "Judas", "Matthew", "The Bible doesn't say"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Luke", chapter: 6, verse: 15 }
    },
    {
        question: "What was the name of the disciple who was also called Didymus?",
        options: ["Thomas", "Judas", "James", "The Bible doesn't say"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "John", chapter: 11, verse: 16 }
    },
    {
        question: "What was the name of the disciple who was also called Levi?",
        options: ["Matthew", "Mark", "Luke", "The Bible doesn't say"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Mark", chapter: 2, verse: 14 }
    },
    {
        question: "What was the name of the disciple who was also called Cephas?",
        options: ["Peter", "Andrew", "John", "The Bible doesn't say"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "John", chapter: 1, verse: 42 }
    },
    {
        question: "What was the name of the place where the Holy Spirit came?",
        options: ["The upper room", "The temple", "Both", "The Bible doesn't say"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Acts", chapter: 2, verse: 1 }
    },
    {
        question: "What was the name of the man who sold his property and lied about it?",
        options: ["Ananias", "Sapphira", "Both", "The Bible doesn't say"],
        correct: 2,
        difficulty: "moderate",
        bibleRef: { book: "Acts", chapter: 5, verse: 1 }
    },
    {
        question: "What was the name of the man who was stoned to death?",
        options: ["Stephen", "James", "Peter", "The Bible doesn't say"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Acts", chapter: 7, verse: 59 }
    },
    {
        question: "What was the name of the man who was the first Gentile convert?",
        options: ["Cornelius", "Lydia", "The Ethiopian eunuch", "The Bible doesn't say"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Acts", chapter: 10, verse: 1 }
    },
    {
        question: "What was the name of the man who was the first European convert?",
        options: ["Lydia", "Cornelius", "The jailer", "The Bible doesn't say"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Acts", chapter: 16, verse: 14 }
    },
    {
        question: "What was the name of the man who was shipwrecked with Paul?",
        options: ["Luke", "Aristarchus", "Both", "The Bible doesn't say"],
        correct: 2,
        difficulty: "moderate",
        bibleRef: { book: "Acts", chapter: 27, verse: 2 }
    },
    {
        question: "What was the name of the island where Paul was shipwrecked?",
        options: ["Malta", "Cyprus", "Crete", "The Bible doesn't say"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Acts", chapter: 28, verse: 1 }
    },
    {
        question: "What was the name of the man who wrote the book of Hebrews?",
        options: ["Paul", "Luke", "The Bible doesn't say", "Barnabas"],
        correct: 2,
        difficulty: "moderate",
        bibleRef: { book: "Hebrews", chapter: 1, verse: 1 }
    },
    {
        question: "What was the name of the man who wrote the book of James?",
        options: ["James the brother of Jesus", "James the son of Zebedee", "James the son of Alphaeus", "The Bible doesn't specify which James"],
        correct: 3,
        difficulty: "moderate",
        bibleRef: { book: "James", chapter: 1, verse: 1 }
    },
    {
        question: "What was the name of the man who wrote the book of Jude?",
        options: ["Jude the brother of Jesus", "Jude the apostle", "Both", "The Bible doesn't say"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Jude", chapter: 1, verse: 1 }
    },
    {
        question: "What was the name of the man who wrote the book of Revelation?",
        options: ["John the apostle", "John the Baptist", "Both", "The Bible doesn't say"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Revelation", chapter: 1, verse: 1 }
    },
    {
        question: "What was the name of the place where John was exiled?",
        options: ["Patmos", "Malta", "Cyprus", "The Bible doesn't say"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Revelation", chapter: 1, verse: 9 }
    },
    {
        question: "What was the name of the seven churches in Revelation?",
        options: ["Ephesus, Smyrna, Pergamum, Thyatira, Sardis, Philadelphia, Laodicea", "Rome, Corinth, Ephesus, Philippi, Colossae, Thessalonica, Galatia", "Jerusalem, Samaria, Antioch, Damascus, Tarsus, Iconium, Lystra", "The Bible doesn't name them all"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Revelation", chapter: 1, verse: 11 }
    },
    {
        question: "What was the name of the four horsemen in Revelation?",
        options: ["War, Famine, Pestilence, Death", "Conquest, War, Famine, Death", "War, Famine, Disease, Death", "The Bible doesn't name them"],
        correct: 1,
        difficulty: "moderate",
        bibleRef: { book: "Revelation", chapter: 6, verse: 2 }
    },
    {
        question: "What was the name of the beast in Revelation?",
        options: ["The Antichrist", "The False Prophet", "Both", "The Bible doesn't name it"],
        correct: 3,
        difficulty: "moderate",
        bibleRef: { book: "Revelation", chapter: 13, verse: 1 }
    },
    {
        question: "What was the name of the false prophet in Revelation?",
        options: ["The beast from the sea", "The beast from the earth", "Both", "The Bible doesn't name it"],
        correct: 1,
        difficulty: "moderate",
        bibleRef: { book: "Revelation", chapter: 13, verse: 11 }
    },
    {
        question: "What was the name of the city that will be destroyed in Revelation?",
        options: ["Babylon", "Rome", "Both names are used", "The Bible doesn't name it"],
        correct: 2,
        difficulty: "moderate",
        bibleRef: { book: "Revelation", chapter: 17, verse: 5 }
    },
    {
        question: "What was the name of the new city in Revelation?",
        options: ["New Jerusalem", "The Holy City", "Both names are used", "The Bible doesn't name it"],
        correct: 2,
        difficulty: "moderate",
        bibleRef: { book: "Revelation", chapter: 21, verse: 2 }
    },
    {
        question: "What was the name of the river in the new city?",
        options: ["The river of life", "The river of water of life", "Both names are used", "The Bible doesn't name it"],
        correct: 1,
        difficulty: "moderate",
        bibleRef: { book: "Revelation", chapter: 22, verse: 1 }
    },
    {
        question: "What was the name of the tree in the new city?",
        options: ["The tree of life", "The tree of knowledge", "Both", "The Bible doesn't name it"],
        correct: 0,
        difficulty: "moderate",
        bibleRef: { book: "Revelation", chapter: 22, verse: 2 }
    },
    // ========== HARD QUESTIONS (201-300) ==========
    {
        question: "What was the name of the first river mentioned in the Garden of Eden?",
        options: ["Pishon", "Gihon", "Tigris", "Euphrates"],
        correct: 0,
        difficulty: "hard",
        bibleRef: { book: "Genesis", chapter: 2, verse: 11 }
    },
    {
        question: "What precious stone was found in the land of Havilah?",
        options: ["Gold", "Onyx", "Both gold and onyx", "The Bible doesn't say"],
        correct: 2,
        difficulty: "hard",
        bibleRef: { book: "Genesis", chapter: 2, verse: 11 }
    },
    {
        question: "What was the name of the land where the second river of Eden flowed?",
        options: ["Cush", "Assyria", "Both", "The Bible doesn't say"],
        correct: 0,
        difficulty: "hard",
        bibleRef: { book: "Genesis", chapter: 2, verse: 13 }
    },
    {
        question: "What was the name of Cain's son?",
        options: ["Enoch", "Irad", "Mehujael", "Methushael"],
        correct: 0,
        difficulty: "hard",
        bibleRef: { book: "Genesis", chapter: 4, verse: 17 }
    },
    {
        question: "What was the name of Lamech's two wives?",
        options: ["Adah and Zillah", "Naamah and Tubal-Cain", "Both", "The Bible doesn't say"],
        correct: 0,
        difficulty: "hard",
        bibleRef: { book: "Genesis", chapter: 4, verse: 19 }
    },
    {
        question: "What was the name of the man who walked with God and was taken away?",
        options: ["Enoch", "Noah", "Methuselah", "Lamech"],
        correct: 0,
        difficulty: "hard",
        bibleRef: { book: "Genesis", chapter: 5, verse: 24 }
    },
    {
        question: "What was the name of Noah's father?",
        options: ["Lamech", "Methuselah", "Enoch", "Jared"],
        correct: 0,
        difficulty: "hard",
        bibleRef: { book: "Genesis", chapter: 5, verse: 28 }
    },
    {
        question: "What was the name of the place where the ark came to rest?",
        options: ["Mount Ararat", "Mount Sinai", "Mount Moriah", "Mount Zion"],
        correct: 0,
        difficulty: "hard",
        bibleRef: { book: "Genesis", chapter: 8, verse: 4 }
    },
    {
        question: "What was the name of the first bird Noah sent out?",
        options: ["A raven", "A dove", "A sparrow", "The Bible doesn't say"],
        correct: 0,
        difficulty: "hard",
        bibleRef: { book: "Genesis", chapter: 8, verse: 7 }
    },
    {
        question: "What was the name of the place where Abraham built an altar?",
        options: ["Bethel", "Shechem", "Both", "The Bible doesn't say"],
        correct: 2,
        difficulty: "hard",
        bibleRef: { book: "Genesis", chapter: 12, verse: 6 }
    },
    {
        question: "What was the name of the king of Salem who blessed Abraham?",
        options: ["Melchizedek", "Abimelech", "Phicol", "The Bible doesn't say"],
        correct: 0,
        difficulty: "hard",
        bibleRef: { book: "Genesis", chapter: 14, verse: 18 }
    },
    {
        question: "What was the name of the place where Hagar met the angel?",
        options: ["Beer Lahai Roi", "Beersheba", "Kadesh", "The Bible doesn't say"],
        correct: 0,
        difficulty: "hard",
        bibleRef: { book: "Genesis", chapter: 16, verse: 14 }
    },
    {
        question: "What was the name of the place where Abraham and Abimelech made a treaty?",
        options: ["Beersheba", "Gerar", "Both", "The Bible doesn't say"],
        correct: 2,
        difficulty: "hard",
        bibleRef: { book: "Genesis", chapter: 21, verse: 31 }
    },
    {
        question: "What was the name of the well where Isaac's servants found water?",
        options: ["Sitnah", "Rehoboth", "Shibah", "All of the above"],
        correct: 3,
        difficulty: "hard",
        bibleRef: { book: "Genesis", chapter: 26, verse: 22 }
    },
    {
        question: "What was the name of the place where Jacob had a dream?",
        options: ["Bethel", "Luz", "Both names refer to the same place", "The Bible doesn't say"],
        correct: 2,
        difficulty: "hard",
        bibleRef: { book: "Genesis", chapter: 28, verse: 19 }
    },
    {
        question: "What was the name of Laban's father?",
        options: ["Bethuel", "Nahor", "Terah", "The Bible doesn't say"],
        correct: 0,
        difficulty: "hard",
        bibleRef: { book: "Genesis", chapter: 28, verse: 5 }
    },
    {
        question: "What was the name of the place where Jacob and Laban made a covenant?",
        options: ["Mizpah", "Galeed", "Both names are used", "The Bible doesn't say"],
        correct: 2,
        difficulty: "hard",
        bibleRef: { book: "Genesis", chapter: 31, verse: 47 }
    },
    {
        question: "What was the name of the place where Jacob wrestled with God?",
        options: ["Peniel", "Penuel", "Both names are used", "The Bible doesn't say"],
        correct: 2,
        difficulty: "hard",
        bibleRef: { book: "Genesis", chapter: 32, verse: 30 }
    },
    {
        question: "What was the name of the place where Dinah was violated?",
        options: ["Shechem", "Bethel", "Hebron", "The Bible doesn't say"],
        correct: 0,
        difficulty: "hard",
        bibleRef: { book: "Genesis", chapter: 34, verse: 2 }
    },
    {
        question: "What was the name of the man who violated Dinah?",
        options: ["Shechem", "Hamor", "Both", "The Bible doesn't say"],
        correct: 0,
        difficulty: "hard",
        bibleRef: { book: "Genesis", chapter: 34, verse: 2 }
    },
    {
        question: "What was the name of the place where Rachel died?",
        options: ["Ephrath", "Bethlehem", "Both names refer to the same place", "The Bible doesn't say"],
        correct: 2,
        difficulty: "hard",
        bibleRef: { book: "Genesis", chapter: 35, verse: 19 }
    },
    {
        question: "What was the name of the man who sold Joseph to the Ishmaelites?",
        options: ["Judah", "Reuben", "Both", "The Bible doesn't say"],
        correct: 0,
        difficulty: "hard",
        bibleRef: { book: "Genesis", chapter: 37, verse: 27 }
    },
    {
        question: "What was the name of the man who bought Joseph from the Ishmaelites?",
        options: ["Potiphar", "Pharaoh", "Both", "The Bible doesn't say"],
        correct: 0,
        difficulty: "hard",
        bibleRef: { book: "Genesis", chapter: 37, verse: 36 }
    },
    {
        question: "What was the name of the place where Joseph was imprisoned?",
        options: ["The Bible doesn't specify", "Potiphar's house", "Pharaoh's prison", "All of the above"],
        correct: 3,
        difficulty: "hard",
        bibleRef: { book: "Genesis", chapter: 39, verse: 20 }
    },
    {
        question: "What was the name of the cupbearer who was restored?",
        options: ["The Bible doesn't name him", "The chief cupbearer", "Both", "The chief baker"],
        correct: 0,
        difficulty: "hard",
        bibleRef: { book: "Genesis", chapter: 40, verse: 9 }
    },
    {
        question: "What was the name of the baker who was executed?",
        options: ["The Bible doesn't name him", "The chief baker", "Both", "The chief cupbearer"],
        correct: 0,
        difficulty: "hard",
        bibleRef: { book: "Genesis", chapter: 40, verse: 16 }
    },
    {
        question: "What was the name of the place where the Israelites made bricks?",
        options: ["Pithom", "Rameses", "Both", "The Bible doesn't say"],
        correct: 2,
        difficulty: "hard",
        bibleRef: { book: "Exodus", chapter: 1, verse: 11 }
    },
    {
        question: "What was the name of the place where Moses saw the burning bush?",
        options: ["Mount Horeb", "Mount Sinai", "Both names refer to the same place", "The Bible doesn't say"],
        correct: 2,
        difficulty: "hard",
        bibleRef: { book: "Exodus", chapter: 3, verse: 1 }
    },
    {
        question: "What was the name of the place where the Israelites camped after leaving Egypt?",
        options: ["Succoth", "Etham", "Pi Hahiroth", "All of the above"],
        correct: 3,
        difficulty: "hard",
        bibleRef: { book: "Exodus", chapter: 13, verse: 20 }
    },
    {
        question: "What was the name of the place where the Israelites first camped in the wilderness?",
        options: ["Marah", "Elim", "Both", "The Bible doesn't say"],
        correct: 0,
        difficulty: "hard",
        bibleRef: { book: "Exodus", chapter: 15, verse: 23 }
    },
    {
        question: "What was the name of the place where the Israelites found 12 springs?",
        options: ["Elim", "Marah", "Rephidim", "The Bible doesn't say"],
        correct: 0,
        difficulty: "hard",
        bibleRef: { book: "Exodus", chapter: 15, verse: 27 }
    },
    {
        question: "What was the name of the place where the Israelites fought the Amalekites?",
        options: ["Rephidim", "Massah", "Meribah", "The Bible doesn't say"],
        correct: 0,
        difficulty: "hard",
        bibleRef: { book: "Exodus", chapter: 17, verse: 8 }
    },
    {
        question: "What was the name of the place where Moses struck the rock?",
        options: ["Massah", "Meribah", "Both names are used", "The Bible doesn't say"],
        correct: 2,
        difficulty: "hard",
        bibleRef: { book: "Exodus", chapter: 17, verse: 7 }
    },
    {
        question: "What was the name of the place where Jethro met Moses?",
        options: ["The mountain of God", "Mount Horeb", "Both names refer to the same place", "The Bible doesn't say"],
        correct: 2,
        difficulty: "hard",
        bibleRef: { book: "Exodus", chapter: 18, verse: 5 }
    },
    {
        question: "What was the name of the place where the Israelites received the Ten Commandments?",
        options: ["Mount Sinai", "Mount Horeb", "Both names are used", "The Bible doesn't say"],
        correct: 2,
        difficulty: "hard",
        bibleRef: { book: "Exodus", chapter: 19, verse: 20 }
    },
    {
        question: "What was the name of the place where the golden calf was made?",
        options: ["The base of the mountain", "Mount Sinai", "Both", "The Bible doesn't say"],
        correct: 0,
        difficulty: "hard",
        bibleRef: { book: "Exodus", chapter: 32, verse: 1 }
    },
    {
        question: "What was the name of the place where the tabernacle was set up?",
        options: ["The Bible doesn't specify", "The camp of Israel", "Both", "Mount Sinai"],
        correct: 0,
        difficulty: "hard",
        bibleRef: { book: "Exodus", chapter: 40, verse: 2 }
    },
    {
        question: "What was the name of the place where the Israelites first camped in the Promised Land?",
        options: ["Gilgal", "Jericho", "Both", "The Bible doesn't say"],
        correct: 0,
        difficulty: "hard",
        bibleRef: { book: "Joshua", chapter: 4, verse: 19 }
    },
    {
        question: "What was the name of the place where Achan was stoned?",
        options: ["The Valley of Achor", "The Valley of Aijalon", "Both", "The Bible doesn't say"],
        correct: 0,
        difficulty: "hard",
        bibleRef: { book: "Joshua", chapter: 7, verse: 24 }
    },
    {
        question: "What was the name of the place where the sun stood still?",
        options: ["Gibeon", "Aijalon", "Both", "The Bible doesn't say"],
        correct: 0,
        difficulty: "hard",
        bibleRef: { book: "Joshua", chapter: 10, verse: 12 }
    },
    {
        question: "What was the name of the place where Deborah judged Israel?",
        options: ["Between Ramah and Bethel", "The palm of Deborah", "Both", "The Bible doesn't say"],
        correct: 2,
        difficulty: "hard",
        bibleRef: { book: "Judges", chapter: 4, verse: 5 }
    },
    {
        question: "What was the name of the place where Sisera was killed?",
        options: ["Kedesh", "Harosheth Haggoyim", "Both", "The Bible doesn't say"],
        correct: 0,
        difficulty: "hard",
        bibleRef: { book: "Judges", chapter: 4, verse: 21 }
    },
    {
        question: "What was the name of the place where Gideon's army camped?",
        options: ["The spring of Harod", "The hill of Moreh", "Both", "The Bible doesn't say"],
        correct: 0,
        difficulty: "hard",
        bibleRef: { book: "Judges", chapter: 7, verse: 1 }
    },
    {
        question: "What was the name of the place where Samson was buried?",
        options: ["Between Zorah and Eshtaol", "Timnah", "Gaza", "The Bible doesn't say"],
        correct: 0,
        difficulty: "hard",
        bibleRef: { book: "Judges", chapter: 16, verse: 31 }
    },
    {
        question: "What was the name of the place where the ark was kept?",
        options: ["Shiloh", "Kiriath Jearim", "Both", "The Bible doesn't say"],
        correct: 2,
        difficulty: "hard",
        bibleRef: { book: "1 Samuel", chapter: 1, verse: 3 }
    },
    {
        question: "What was the name of the place where Samuel anointed Saul?",
        options: ["Ramah", "Mizpah", "Both", "The Bible doesn't say"],
        correct: 0,
        difficulty: "hard",
        bibleRef: { book: "1 Samuel", chapter: 9, verse: 6 }
    },
    {
        question: "What was the name of the place where Jonathan made a covenant with David?",
        options: ["The Bible doesn't specify", "In the field", "Both", "At Gibeah"],
        correct: 0,
        difficulty: "hard",
        bibleRef: { book: "1 Samuel", chapter: 18, verse: 3 }
    },
    {
        question: "What was the name of the place where David hid from Saul?",
        options: ["The cave of Adullam", "The stronghold", "Both", "The Bible doesn't say"],
        correct: 2,
        difficulty: "hard",
        bibleRef: { book: "1 Samuel", chapter: 22, verse: 1 }
    },
    {
        question: "What was the name of the place where Saul consulted the medium?",
        options: ["Endor", "Gilboa", "Both", "The Bible doesn't say"],
        correct: 0,
        difficulty: "hard",
        bibleRef: { book: "1 Samuel", chapter: 28, verse: 7 }
    },
    {
        question: "What was the name of the place where Saul died?",
        options: ["Mount Gilboa", "The Valley of Jezreel", "Both", "The Bible doesn't say"],
        correct: 2,
        difficulty: "hard",
        bibleRef: { book: "1 Samuel", chapter: 31, verse: 1 }
    },
    {
        question: "What was the name of the place where David was anointed king?",
        options: ["Hebron", "Bethlehem", "Both", "The Bible doesn't say"],
        correct: 0,
        difficulty: "hard",
        bibleRef: { book: "2 Samuel", chapter: 2, verse: 4 }
    },
    {
        question: "What was the name of the place where Absalom was killed?",
        options: ["The forest of Ephraim", "The Valley of Kidron", "Both", "The Bible doesn't say"],
        correct: 0,
        difficulty: "hard",
        bibleRef: { book: "2 Samuel", chapter: 18, verse: 6 }
    },
    {
        question: "What was the name of the place where Solomon built the temple?",
        options: ["Mount Moriah", "Mount Zion", "Both", "The Bible doesn't say"],
        correct: 0,
        difficulty: "hard",
        bibleRef: { book: "2 Chronicles", chapter: 3, verse: 1 }
    },
    {
        question: "What was the name of the place where Elijah challenged the prophets of Baal?",
        options: ["Mount Carmel", "Mount Horeb", "Both", "The Bible doesn't say"],
        correct: 0,
        difficulty: "hard",
        bibleRef: { book: "1 Kings", chapter: 18, verse: 19 }
    },
    {
        question: "What was the name of the place where Elijah was taken to heaven?",
        options: ["The Bible doesn't specify", "Near the Jordan", "Both", "Mount Horeb"],
        correct: 0,
        difficulty: "hard",
        bibleRef: { book: "2 Kings", chapter: 2, verse: 1 }
    },
    {
        question: "What was the name of the place where Elisha performed his first miracle?",
        options: ["Jericho", "Bethel", "Both", "The Bible doesn't say"],
        correct: 0,
        difficulty: "hard",
        bibleRef: { book: "2 Kings", chapter: 2, verse: 19 }
    },
    {
        question: "What was the name of the place where Naaman was healed?",
        options: ["The Jordan River", "The Abana River", "Both", "The Bible doesn't say"],
        correct: 0,
        difficulty: "hard",
        bibleRef: { book: "2 Kings", chapter: 5, verse: 10 }
    },
    {
        question: "What was the name of the place where Josiah found the Book of the Law?",
        options: ["The temple", "The house of the Lord", "Both", "The Bible doesn't say"],
        correct: 2,
        difficulty: "hard",
        bibleRef: { book: "2 Kings", chapter: 22, verse: 8 }
    },
    {
        question: "What was the name of the place where Daniel was thrown into the lions' den?",
        options: ["Babylon", "The den of lions", "Both", "The Bible doesn't say"],
        correct: 0,
        difficulty: "hard",
        bibleRef: { book: "Daniel", chapter: 6, verse: 16 }
    },
    {
        question: "What was the name of the place where the handwriting appeared on the wall?",
        options: ["The king's palace", "Babylon", "Both", "The Bible doesn't say"],
        correct: 2,
        difficulty: "hard",
        bibleRef: { book: "Daniel", chapter: 5, verse: 5 }
    },
    {
        question: "What was the name of the place where Esther became queen?",
        options: ["Susa", "The citadel of Susa", "Both", "The Bible doesn't say"],
        correct: 2,
        difficulty: "hard",
        bibleRef: { book: "Esther", chapter: 2, verse: 8 }
    },
    {
        question: "What was the name of the place where Jesus was born?",
        options: ["Bethlehem", "Ephrath", "Both names refer to the same place", "The Bible doesn't say"],
        correct: 2,
        difficulty: "hard",
        bibleRef: { book: "Matthew", chapter: 2, verse: 1 }
    },
    {
        question: "What was the name of the place where Jesus was baptized?",
        options: ["The Jordan River", "Bethany beyond the Jordan", "Both", "The Bible doesn't say"],
        correct: 1,
        difficulty: "hard",
        bibleRef: { book: "John", chapter: 1, verse: 28 }
    },
    {
        question: "What was the name of the place where Jesus turned water into wine?",
        options: ["Cana", "Cana in Galilee", "Both", "The Bible doesn't say"],
        correct: 2,
        difficulty: "hard",
        bibleRef: { book: "John", chapter: 2, verse: 1 }
    },
    {
        question: "What was the name of the place where Jesus met the woman at the well?",
        options: ["Sychar", "Shechem", "Both", "The Bible doesn't say"],
        correct: 0,
        difficulty: "hard",
        bibleRef: { book: "John", chapter: 4, verse: 5 }
    },
    {
        question: "What was the name of the place where Jesus fed the 5,000?",
        options: ["The Bible doesn't specify", "A remote place", "Both", "Bethsaida"],
        correct: 0,
        difficulty: "hard",
        bibleRef: { book: "Matthew", chapter: 14, verse: 13 }
    },
    {
        question: "What was the name of the place where Jesus walked on water?",
        options: ["The Sea of Galilee", "Lake Gennesaret", "Both names refer to the same place", "The Bible doesn't say"],
        correct: 2,
        difficulty: "hard",
        bibleRef: { book: "Matthew", chapter: 14, verse: 25 }
    },
    {
        question: "What was the name of the place where Jesus was transfigured?",
        options: ["A high mountain", "Mount Tabor", "Mount Hermon", "The Bible doesn't specify"],
        correct: 3,
        difficulty: "hard",
        bibleRef: { book: "Matthew", chapter: 17, verse: 1 }
    },
    {
        question: "What was the name of the place where Jesus raised Lazarus?",
        options: ["Bethany", "Bethany near Jerusalem", "Both", "The Bible doesn't say"],
        correct: 2,
        difficulty: "hard",
        bibleRef: { book: "John", chapter: 11, verse: 1 }
    },
    {
        question: "What was the name of the place where Jesus entered Jerusalem?",
        options: ["The Mount of Olives", "Bethphage", "Both", "The Bible doesn't say"],
        correct: 2,
        difficulty: "hard",
        bibleRef: { book: "Matthew", chapter: 21, verse: 1 }
    },
    {
        question: "What was the name of the place where Jesus was arrested?",
        options: ["Gethsemane", "The Mount of Olives", "Both", "The Bible doesn't say"],
        correct: 2,
        difficulty: "hard",
        bibleRef: { book: "Matthew", chapter: 26, verse: 36 }
    },
    {
        question: "What was the name of the place where Jesus was crucified?",
        options: ["Golgotha", "Calvary", "The Place of the Skull", "All of the above"],
        correct: 3,
        difficulty: "hard",
        bibleRef: { book: "Matthew", chapter: 27, verse: 33 }
    },
    {
        question: "What was the name of the place where Jesus was buried?",
        options: ["A tomb", "A new tomb", "Both", "The Bible doesn't say"],
        correct: 2,
        difficulty: "hard",
        bibleRef: { book: "Matthew", chapter: 27, verse: 60 }
    },
    {
        question: "What was the name of the place where Jesus appeared to the disciples?",
        options: ["The upper room", "The Sea of Galilee", "Both", "The Bible doesn't say"],
        correct: 2,
        difficulty: "hard",
        bibleRef: { book: "John", chapter: 20, verse: 19 }
    },
    {
        question: "What was the name of the place where Jesus ascended to heaven?",
        options: ["The Mount of Olives", "Bethany", "Both", "The Bible doesn't say"],
        correct: 2,
        difficulty: "hard",
        bibleRef: { book: "Acts", chapter: 1, verse: 12 }
    },
    {
        question: "What was the name of the place where the Holy Spirit came?",
        options: ["The upper room", "Jerusalem", "Both", "The Bible doesn't say"],
        correct: 2,
        difficulty: "hard",
        bibleRef: { book: "Acts", chapter: 2, verse: 1 }
    },
    {
        question: "What was the name of the place where Stephen was stoned?",
        options: ["Jerusalem", "Outside the city", "Both", "The Bible doesn't say"],
        correct: 1,
        difficulty: "hard",
        bibleRef: { book: "Acts", chapter: 7, verse: 58 }
    },
    {
        question: "What was the name of the place where Saul was converted?",
        options: ["Damascus", "On the road to Damascus", "Both", "The Bible doesn't say"],
        correct: 2,
        difficulty: "hard",
        bibleRef: { book: "Acts", chapter: 9, verse: 3 }
    },
    {
        question: "What was the name of the place where Cornelius lived?",
        options: ["Caesarea", "Caesarea Maritima", "Both", "The Bible doesn't say"],
        correct: 2,
        difficulty: "hard",
        bibleRef: { book: "Acts", chapter: 10, verse: 1 }
    },
    {
        question: "What was the name of the place where Paul and Barnabas were sent?",
        options: ["Antioch", "Cyprus", "Both", "The Bible doesn't say"],
        correct: 1,
        difficulty: "hard",
        bibleRef: { book: "Acts", chapter: 13, verse: 4 }
    },
    {
        question: "What was the name of the place where Paul was stoned?",
        options: ["Lystra", "Iconium", "Both", "The Bible doesn't say"],
        correct: 0,
        difficulty: "hard",
        bibleRef: { book: "Acts", chapter: 14, verse: 19 }
    },
    {
        question: "What was the name of the place where Paul met Timothy?",
        options: ["Lystra", "Derbe", "Both", "The Bible doesn't say"],
        correct: 0,
        difficulty: "hard",
        bibleRef: { book: "Acts", chapter: 16, verse: 1 }
    },
    {
        question: "What was the name of the place where Paul was shipwrecked?",
        options: ["Malta", "Melite", "Both names refer to the same place", "The Bible doesn't say"],
        correct: 2,
        difficulty: "hard",
        bibleRef: { book: "Acts", chapter: 28, verse: 1 }
    },
    {
        question: "What was the name of the place where John was exiled?",
        options: ["Patmos", "The island of Patmos", "Both", "The Bible doesn't say"],
        correct: 2,
        difficulty: "hard",
        bibleRef: { book: "Revelation", chapter: 1, verse: 9 }
    },
    {
        question: "What was the name of the first church mentioned in Revelation?",
        options: ["Ephesus", "Smyrna", "Pergamum", "The Bible doesn't say"],
        correct: 0,
        difficulty: "hard",
        bibleRef: { book: "Revelation", chapter: 2, verse: 1 }
    },
    {
        question: "What was the name of the second church mentioned in Revelation?",
        options: ["Smyrna", "Pergamum", "Thyatira", "The Bible doesn't say"],
        correct: 0,
        difficulty: "hard",
        bibleRef: { book: "Revelation", chapter: 2, verse: 8 }
    },
    {
        question: "What was the name of the third church mentioned in Revelation?",
        options: ["Pergamum", "Thyatira", "Sardis", "The Bible doesn't say"],
        correct: 0,
        difficulty: "hard",
        bibleRef: { book: "Revelation", chapter: 2, verse: 12 }
    },
    {
        question: "What was the name of the fourth church mentioned in Revelation?",
        options: ["Thyatira", "Sardis", "Philadelphia", "The Bible doesn't say"],
        correct: 0,
        difficulty: "hard",
        bibleRef: { book: "Revelation", chapter: 2, verse: 18 }
    },
    {
        question: "What was the name of the fifth church mentioned in Revelation?",
        options: ["Sardis", "Philadelphia", "Laodicea", "The Bible doesn't say"],
        correct: 0,
        difficulty: "hard",
        bibleRef: { book: "Revelation", chapter: 3, verse: 1 }
    },
    {
        question: "What was the name of the sixth church mentioned in Revelation?",
        options: ["Philadelphia", "Laodicea", "Ephesus", "The Bible doesn't say"],
        correct: 0,
        difficulty: "hard",
        bibleRef: { book: "Revelation", chapter: 3, verse: 7 }
    },
    {
        question: "What was the name of the seventh church mentioned in Revelation?",
        options: ["Laodicea", "Ephesus", "Smyrna", "The Bible doesn't say"],
        correct: 0,
        difficulty: "hard",
        bibleRef: { book: "Revelation", chapter: 3, verse: 14 }
    },
    {
        question: "What was the name of the first seal in Revelation?",
        options: ["The white horse", "Conquest", "Both", "The Bible doesn't name it"],
        correct: 2,
        difficulty: "hard",
        bibleRef: { book: "Revelation", chapter: 6, verse: 2 }
    },
    {
        question: "What was the name of the second seal in Revelation?",
        options: ["The red horse", "War", "Both", "The Bible doesn't name it"],
        correct: 2,
        difficulty: "hard",
        bibleRef: { book: "Revelation", chapter: 6, verse: 4 }
    },
    {
        question: "What was the name of the third seal in Revelation?",
        options: ["The black horse", "Famine", "Both", "The Bible doesn't name it"],
        correct: 2,
        difficulty: "hard",
        bibleRef: { book: "Revelation", chapter: 6, verse: 5 }
    },
    {
        question: "What was the name of the fourth seal in Revelation?",
        options: ["The pale horse", "Death", "Both", "The Bible doesn't name it"],
        correct: 2,
        difficulty: "hard",
        bibleRef: { book: "Revelation", chapter: 6, verse: 8 }
    },
    {
        question: "What was the name of the beast from the sea?",
        options: ["The Antichrist", "The first beast", "Both", "The Bible doesn't name it"],
        correct: 1,
        difficulty: "hard",
        bibleRef: { book: "Revelation", chapter: 13, verse: 1 }
    },
    {
        question: "What was the name of the beast from the earth?",
        options: ["The false prophet", "The second beast", "Both", "The Bible doesn't name it"],
        correct: 1,
        difficulty: "hard",
        bibleRef: { book: "Revelation", chapter: 13, verse: 11 }
    },
    {
        question: "What was the name of the city that will be destroyed?",
        options: ["Babylon", "The great city", "Both", "The Bible doesn't name it"],
        correct: 2,
        difficulty: "hard",
        bibleRef: { book: "Revelation", chapter: 17, verse: 5 }
    },
    {
        question: "What was the name of the new city?",
        options: ["New Jerusalem", "The Holy City", "Both", "The Bible doesn't name it"],
        correct: 2,
        difficulty: "hard",
        bibleRef: { book: "Revelation", chapter: 21, verse: 2 }
    },
    {
        question: "What was the name of the river in the new city?",
        options: ["The river of the water of life", "The river of life", "Both", "The Bible doesn't name it"],
        correct: 0,
        difficulty: "hard",
        bibleRef: { book: "Revelation", chapter: 22, verse: 1 }
    },
    {
        question: "What was the name of the tree in the new city?",
        options: ["The tree of life", "The tree", "Both", "The Bible doesn't name it"],
        correct: 2,
        difficulty: "hard",
        bibleRef: { book: "Revelation", chapter: 22, verse: 2 }
    }
];

class BibleTrivia {
    constructor() {
        this.currentQuestion = 0;
        this.score = 0;
        this.selectedAnswer = null;
        this.questions = this.shuffleQuestions([...triviaQuestions]);
        this.gameStarted = false;
        
        // Track answers by difficulty
        this.answersByDifficulty = {
            easy: { total: 0, correct: 0 },
            moderate: { total: 0, correct: 0 },
            hard: { total: 0, correct: 0 }
        };
        
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
    
    async setupGame() {
        const session = window.authStatus?.getSession();
        if (!session) {
            window.location.href = getPagePath('login.html');
            return;
        }
        
        document.getElementById('authCheck').classList.add('hidden');
        document.getElementById('mainContent').classList.remove('hidden');
        
        // Initialize approval notifications for standard users
        if (session.userType !== 'admin') {
            initializeApprovalNotifications();
            
            // Initialize badge notifications
            try {
                const { initializeBadgeNotifications } = await import('./badge-notification-system.js');
                await initializeBadgeNotifications();
            } catch (error) {
                console.error('Error initializing badge notifications:', error);
            }
        }
        
        // Event listeners
        const startGameBtn = document.getElementById('startGameBtn');
        const nextQuestionBtn = document.getElementById('nextQuestionBtn');
        const finishGameBtn = document.getElementById('finishGameBtn');
        const playAgainBtn = document.getElementById('playAgainBtn');
        
        if (startGameBtn) {
            startGameBtn.addEventListener('click', () => this.startGame());
        } else {
            console.error('startGameBtn not found');
        }
        
        if (nextQuestionBtn) {
            nextQuestionBtn.addEventListener('click', () => this.nextQuestion());
        }
        
        if (finishGameBtn) {
            finishGameBtn.addEventListener('click', () => this.finishGame());
        }
        
        if (playAgainBtn) {
            playAgainBtn.addEventListener('click', () => this.resetGame());
        }
    }
    
    shuffleQuestions(questions) {
        // Separate questions by difficulty
        const easyQuestions = questions.filter(q => q.difficulty === 'easy');
        const moderateQuestions = questions.filter(q => q.difficulty === 'moderate');
        const hardQuestions = questions.filter(q => q.difficulty === 'hard');
        
        // Shuffle each difficulty group
        const shuffle = (arr) => {
            const shuffled = [...arr];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        };
        
        // Select questions: 5 easy, 3 moderate, 2 hard
        const selectedEasy = shuffle(easyQuestions).slice(0, 5);
        const selectedModerate = shuffle(moderateQuestions).slice(0, 3);
        const selectedHard = shuffle(hardQuestions).slice(0, 2);
        
        // Combine and shuffle the final selection
        const combined = [...selectedEasy, ...selectedModerate, ...selectedHard];
        return shuffle(combined);
    }
    
    startGame() {
        // Note: Bible Trivia is free to play - no credits are required or deducted
        this.gameStarted = true;
        document.getElementById('startScreen').classList.add('hidden');
        document.getElementById('gameInfoSection').classList.remove('hidden');
        document.getElementById('gameScreen').classList.remove('hidden');
        this.currentQuestion = 0;
        this.score = 0;
        this.displayQuestion();
    }
    
    displayQuestion() {
        const question = this.questions[this.currentQuestion];
        const questionNum = this.currentQuestion + 1;
        
        // Capitalize difficulty for display
        const difficultyDisplay = question.difficulty ? 
            question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1) : '';
        
        document.getElementById('currentQuestionNum').textContent = questionNum;
        document.getElementById('currentScore').textContent = this.score;
        document.getElementById('questionNumber').textContent = `Question ${questionNum} - ${difficultyDisplay}`;
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
        
        // Track answer by difficulty
        const difficulty = question.difficulty;
        this.answersByDifficulty[difficulty].total++;
        if (isCorrect) {
            this.answersByDifficulty[difficulty].correct++;
        }
        
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
        
        // Get maximum credits from Credit_Manager table
        let MAX_CREDITS = 20; // Default fallback
        try {
            const { data: creditData, error: creditError } = await supabase
                .from('credit_manager')
                .select('credit_amount')
                .eq('app_name', 'Bible Trivia')
                .eq('transaction_type', 'credit')
                .maybeSingle();
            
            if (!creditError && creditData && creditData.credit_amount > 0) {
                MAX_CREDITS = creditData.credit_amount;
            }
        } catch (error) {
            console.warn('Could not fetch max credits from Credit_Manager, using default:', error);
        }
        
        // Calculate credits based on percentage of maximum
        let creditsEarned = 0;
        let message = '';
        
        if (this.score < 3) {
            creditsEarned = 0;
            message = "Keep studying! Read the Bible stories to learn more and try again.";
        } else {
            // Calculate credits as percentage of maximum, rounded to nearest whole number
            // Percentage = (score / 10) * 100
            // Credits = (percentage / 100) * MAX_CREDITS, rounded
            const percentage = (this.score / 10) * 100;
            creditsEarned = Math.round((percentage / 100) * MAX_CREDITS);
            
            // Ensure minimum of 1 credit if score is 3 or more
            if (creditsEarned < 1 && this.score >= 3) {
                creditsEarned = 1;
            }
            
            // Set message based on score
            if (this.score >= 3 && this.score <= 4) {
                message = "Good start! Keep learning!";
            } else if (this.score >= 5 && this.score <= 6) {
                message = "Nice work! You're getting better!";
            } else if (this.score === 7) {
                message = "Great job! You know your Bible stories!";
            } else if (this.score >= 8 && this.score <= 9) {
                message = "Excellent! You're really learning!";
            } else if (this.score === 10) {
                message = "Perfect score! You're a Bible expert!";
            }
        }
        
        document.getElementById('resultsMessage').textContent = message;
        
        // Award credits if earned (always call to ensure proper recording)
        if (creditsEarned > 0) {
            const creditsEarnedDiv = document.getElementById('creditsEarned');
            creditsEarnedDiv.textContent = `You earned ${creditsEarned} credits!`;
            creditsEarnedDiv.style.display = 'block';
            
            // Award credits and record transaction
            const creditsAwarded = await this.awardCredits(creditsEarned);
            if (!creditsAwarded) {
                console.error('Failed to award credits for Bible Trivia game');
            }
        } else {
            document.getElementById('creditsEarned').style.display = 'none';
        }
        
        // Save game result (this also records credits_earned in the results table)
        await this.saveGameResult();
        
        // Check for badge eligibility
        try {
            const { checkAllBadges } = await import('./badge-checker.js');
            await checkAllBadges(session.uid, 'bible_trivia_completed');
        } catch (error) {
            console.error('Error checking badges:', error);
        }
    }
    
    async awardCredits(amount) {
        const session = window.authStatus?.getSession();
        if (!session || !session.uid) {
            console.error('No user session found - cannot award credits');
            return false;
        }
        
        if (amount <= 0) {
            console.warn('Attempted to award 0 or negative credits');
            return false;
        }
        
        try {
            // Get current balance
            const { data: existingCredit, error: fetchError } = await supabase
                .from('User_Credits')
                .select('credit_id, balance')
                .eq('user_uid', session.uid)
                .single();
            
            if (fetchError && fetchError.code !== 'PGRST116') {
                throw fetchError;
            }
            
            const oldBalance = existingCredit?.balance || 0;
            const newBalance = oldBalance + amount;
            
            // Update or create credit record
            if (existingCredit) {
                // Update existing balance
                const { error: updateError } = await supabase
                    .from('User_Credits')
                    .update({ 
                        balance: newBalance, 
                        updated_at: new Date().toISOString() 
                    })
                    .eq('credit_id', existingCredit.credit_id);
                
                if (updateError) {
                    console.error('Error updating credit balance:', updateError);
                    throw updateError;
                }
            } else {
                // Create new credit record
                const { error: insertError } = await supabase
                    .from('User_Credits')
                    .insert({ 
                        user_uid: session.uid, 
                        balance: amount 
                    });
                
                if (insertError) {
                    console.error('Error creating credit record:', insertError);
                    throw insertError;
                }
            }
            
            // Record transaction in credit history
            const transactionDescription = `Bible Trivia: Scored ${this.score}/10 correct (${amount} credit${amount !== 1 ? 's' : ''} earned)`;
            
            const { data: transactionData, error: transError } = await supabase
                .from('Credit_Transactions')
                .insert({
                    from_user_uid: null, // Self-earned credits have no from_user
                    to_user_uid: session.uid,
                    amount: amount,
                    transaction_type: 'credit_added',
                    game_type: 'bible_trivia',
                    description: transactionDescription
                })
                .select()
                .single();
            
            if (transError) {
                console.error('Error recording credit transaction:', transError);
                throw transError;
            }
            
            console.log(`Successfully awarded ${amount} credits for Bible Trivia. Transaction ID: ${transactionData?.transaction_id}`);
            console.log(`Old balance: ${oldBalance}, New balance: ${newBalance}`);
            
            // Update profile menu if available to refresh credit balance display
            if (window.createProfileMenu) {
                setTimeout(() => window.createProfileMenu(), 500);
            }
            
            return true;
            
        } catch (error) {
            console.error('Error awarding credits:', error);
            console.error('Error details:', error.message, error.stack);
            return false;
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
        if (!session || !session.uid) {
            console.error('No user session found - cannot save Bible Trivia game result');
            return;
        }
        
        try {
            // Ensure answersByDifficulty is initialized
            if (!this.answersByDifficulty) {
                console.error('answersByDifficulty not initialized');
                this.answersByDifficulty = {
                    easy: { total: 0, correct: 0 },
                    moderate: { total: 0, correct: 0 },
                    hard: { total: 0, correct: 0 }
                };
            }
            
            // Calculate credits earned based on percentage of maximum
            // Get maximum credits from Credit_Manager table
            let MAX_CREDITS = 20; // Default fallback
            try {
                const { data: creditData, error: creditError } = await supabase
                    .from('credit_manager')
                    .select('credit_amount')
                    .eq('app_name', 'Bible Trivia')
                    .eq('transaction_type', 'credit')
                    .maybeSingle();
                
                if (!creditError && creditData && creditData.credit_amount > 0) {
                    MAX_CREDITS = creditData.credit_amount;
                }
            } catch (error) {
                console.warn('Could not fetch max credits from Credit_Manager, using default:', error);
            }
            
            let creditsEarned = 0;
            
            if (this.score >= 3) {
                // Calculate credits as percentage of maximum, rounded to nearest whole number
                const percentage = (this.score / 10) * 100;
                creditsEarned = Math.round((percentage / 100) * MAX_CREDITS);
                
                // Ensure minimum of 1 credit if score is 3 or more
                if (creditsEarned < 1) {
                    creditsEarned = 1;
                }
            }
            
            // Calculate percentage correct
            const percentageCorrect = (this.score / 10) * 100;
            
            const gameData = {
                    user_uid: session.uid,
                    score: this.score,
                    total_questions: 10,
                credits_earned: creditsEarned,
                percentage_correct: percentageCorrect,
                easy_questions: this.answersByDifficulty.easy?.total || 0,
                easy_correct: this.answersByDifficulty.easy?.correct || 0,
                moderate_questions: this.answersByDifficulty.moderate?.total || 0,
                moderate_correct: this.answersByDifficulty.moderate?.correct || 0,
                hard_questions: this.answersByDifficulty.hard?.total || 0,
                hard_correct: this.answersByDifficulty.hard?.correct || 0
            };
            
            console.log('Attempting to save Bible Trivia game result:', gameData);
            
            // Save detailed game result
            const { data: savedData, error: saveError } = await supabase
                .from('bible_trivia_results')
                .insert(gameData)
                .select();
            
            if (saveError) {
                console.error('Error saving Bible Trivia game result:', saveError);
                console.error('Game data attempted:', gameData);
            } else {
                console.log('Bible Trivia game result saved successfully:', savedData);
                
                // Update user stats table
                await this.updateUserStats(session.uid);
            }
        } catch (error) {
            console.error('Error saving game result:', error);
            console.error('Error details:', error.message, error.stack);
        }
    }
    
    async updateUserStats(userUid) {
        try {
            // Check if user stats exist
            const { data: existingStats, error: fetchError } = await supabase
                .from('bible_trivia_user_stats')
                .select('stats_id, total_games_played, total_easy_questions, total_easy_correct, total_moderate_questions, total_moderate_correct, total_hard_questions, total_hard_correct')
                .eq('user_uid', userUid)
                .single();
            
            if (fetchError && fetchError.code !== 'PGRST116') {
                console.error('Error fetching user stats:', fetchError);
                return;
            }
            
            // Calculate new totals
            const newGamesPlayed = (existingStats?.total_games_played || 0) + 1;
            const newEasyQuestions = (existingStats?.total_easy_questions || 0) + this.answersByDifficulty.easy.total;
            const newEasyCorrect = (existingStats?.total_easy_correct || 0) + this.answersByDifficulty.easy.correct;
            const newModerateQuestions = (existingStats?.total_moderate_questions || 0) + this.answersByDifficulty.moderate.total;
            const newModerateCorrect = (existingStats?.total_moderate_correct || 0) + this.answersByDifficulty.moderate.correct;
            const newHardQuestions = (existingStats?.total_hard_questions || 0) + this.answersByDifficulty.hard.total;
            const newHardCorrect = (existingStats?.total_hard_correct || 0) + this.answersByDifficulty.hard.correct;
            
            if (existingStats) {
                // Update existing stats
                const { error: updateError } = await supabase
                    .from('bible_trivia_user_stats')
                    .update({
                        total_games_played: newGamesPlayed,
                        total_easy_questions: newEasyQuestions,
                        total_easy_correct: newEasyCorrect,
                        total_moderate_questions: newModerateQuestions,
                        total_moderate_correct: newModerateCorrect,
                        total_hard_questions: newHardQuestions,
                        total_hard_correct: newHardCorrect,
                        last_updated: new Date().toISOString()
                    })
                    .eq('stats_id', existingStats.stats_id);
                
                if (updateError) {
                    console.error('Error updating user stats:', updateError);
                } else {
                    console.log('User stats updated successfully');
                }
            } else {
                // Insert new stats record
                const { error: insertError } = await supabase
                    .from('bible_trivia_user_stats')
                    .insert({
                        user_uid: userUid,
                        total_games_played: newGamesPlayed,
                        total_easy_questions: newEasyQuestions,
                        total_easy_correct: newEasyCorrect,
                        total_moderate_questions: newModerateQuestions,
                        total_moderate_correct: newModerateCorrect,
                        total_hard_questions: newHardQuestions,
                        total_hard_correct: newHardCorrect
                    });
                
                if (insertError) {
                    console.error('Error inserting user stats:', insertError);
                } else {
                    console.log('User stats created successfully');
                }
            }
        } catch (error) {
            console.error('Error updating user stats:', error);
        }
    }
    
    resetGame() {
        this.currentQuestion = 0;
        this.score = 0;
        this.selectedAnswer = null;
        this.questions = this.shuffleQuestions([...triviaQuestions]);
        
        // Reset difficulty tracking
        this.answersByDifficulty = {
            easy: { total: 0, correct: 0 },
            moderate: { total: 0, correct: 0 },
            hard: { total: 0, correct: 0 }
        };
        
        document.getElementById('resultsScreen').classList.remove('show');
        document.getElementById('gameInfoSection').classList.add('hidden');
        document.getElementById('startScreen').classList.remove('hidden');
        document.getElementById('gameScreen').classList.add('hidden');
    }
}

// Initialize game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new BibleTrivia();
});

