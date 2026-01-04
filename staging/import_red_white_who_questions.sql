-- Insert questions for Red White and Who individuals
-- Generated from American_History_Icons_Complete.xlsx
-- Each individual has 10 questions with 1 correct answer and 3 wrong answers

-- George Washington - Question 1
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What year was George Washington born, and in which state?', '1732, Virginia', '1737, Virginia', '1728, Massachusetts', '1732, Maryland', 1
FROM red_white_who_individuals WHERE name = 'George Washington'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- George Washington - Question 2
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What job did Washington have as a young man that taught him about the wilderness?', 'Surveyor', 'Blacksmith', 'Lawyer', 'Merchant', 2
FROM red_white_who_individuals WHERE name = 'George Washington'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- George Washington - Question 3
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was the name of Washington''s Virginia home?', 'Mount Vernon', 'Monticello', 'Mount Pleasant', 'Westmoreland Estate', 3
FROM red_white_who_individuals WHERE name = 'George Washington'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- George Washington - Question 4
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'In what year was Washington chosen to lead the Continental Army?', '1775', '1773', '1778', '1781', 4
FROM red_white_who_individuals WHERE name = 'George Washington'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- George Washington - Question 5
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What difficult winter camp tested the Continental Army in 1777-1778?', 'Valley Forge', 'Trenton Camp', 'Morristown', 'Brandywine', 5
FROM red_white_who_individuals WHERE name = 'George Washington'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- George Washington - Question 6
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What river did Washington famously cross on Christmas night 1776?', 'Delaware River', 'Potomac River', 'Hudson River', 'Susquehanna River', 6
FROM red_white_who_individuals WHERE name = 'George Washington'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- George Washington - Question 7
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What 1781 battle ended the Revolutionary War with a British surrender?', 'Yorktown', 'Trenton', 'Saratoga', 'Bunker Hill', 7
FROM red_white_who_individuals WHERE name = 'George Washington'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- George Washington - Question 8
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many terms did Washington serve as president before stepping down?', 'Two terms', 'Three terms', 'One term', 'Four terms', 8
FROM red_white_who_individuals WHERE name = 'George Washington'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- George Washington - Question 9
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Why is Washington called the Father of His Country?', 'Father of His Country', 'He won the most battles', 'He was the wealthiest Founder', 'He wrote the Constitution', 9
FROM red_white_who_individuals WHERE name = 'George Washington'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- George Washington - Question 10
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What two things have Washington''s face on them that you might use today?', 'One-dollar bill and quarter', 'Five-dollar bill and dime', 'Twenty-dollar bill and nickel', 'Hundred-dollar bill and penny', 10
FROM red_white_who_individuals WHERE name = 'George Washington'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Benjamin Franklin - Question 1
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'In what city was Benjamin Franklin born, and how many children were in his family?', 'Boston, 17 children', 'Philadelphia, 12 children', 'New York, 17 children', 'Boston, 8 children', 1
FROM red_white_who_individuals WHERE name = 'Benjamin Franklin'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Benjamin Franklin - Question 2
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many years of formal schooling did Franklin have?', 'Two years', 'Four years', 'Six months', 'Eight years', 2
FROM red_white_who_individuals WHERE name = 'Benjamin Franklin'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Benjamin Franklin - Question 3
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was the name Franklin used when secretly writing articles for his brother''s newspaper?', 'Silence Dogood', 'Richard Saunders', 'Benjamin Busy', 'Poor Richard', 3
FROM red_white_who_individuals WHERE name = 'Benjamin Franklin'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Benjamin Franklin - Question 4
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What famous saying from Poor Richard''s Almanack talks about going to bed early?', 'Early to bed and early to rise, makes a man healthy, wealthy, and wise', 'A penny saved is a penny earned', 'God helps those who help themselves', 'An apple a day keeps the doctor away', 4
FROM red_white_who_individuals WHERE name = 'Benjamin Franklin'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Benjamin Franklin - Question 5
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What dangerous experiment did Franklin do with a kite in 1752?', 'Kite experiment with lightning', 'Tested electricity in a rainstorm', 'Flew a kite to measure wind speed', 'Built the first electric motor', 5
FROM red_white_who_individuals WHERE name = 'Benjamin Franklin'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Benjamin Franklin - Question 6
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Name three things that Benjamin Franklin invented.', 'Lightning rod, bifocals, Franklin stove', 'Printing press, telescope, thermometer', 'Telephone, electric light, battery', 'Steam engine, compass, barometer', 6
FROM red_white_who_individuals WHERE name = 'Benjamin Franklin'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Benjamin Franklin - Question 7
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was the first lending library in America that Franklin started?', 'First lending library', 'Pennsylvania Gazette newspaper', 'Poor Richard''s Almanack', 'Boston Public Library', 7
FROM red_white_who_individuals WHERE name = 'Benjamin Franklin'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Benjamin Franklin - Question 8
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What country did Franklin convince to help America during the Revolutionary War?', 'France', 'England', 'Spain', 'Netherlands', 8
FROM red_white_who_individuals WHERE name = 'Benjamin Franklin'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Benjamin Franklin - Question 9
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How old was Franklin when he signed the Constitution?', '81 years old', '76 years old', '70 years old', '85 years old', 9
FROM red_white_who_individuals WHERE name = 'Benjamin Franklin'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Benjamin Franklin - Question 10
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What piece of American money has Franklin''s face on it?', 'Hundred-dollar bill', 'Twenty-dollar bill', 'Fifty-dollar bill', 'One-dollar bill', 10
FROM red_white_who_individuals WHERE name = 'Benjamin Franklin'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Abraham Lincoln - Question 1
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'In what state was Abraham Lincoln born, and what kind of home was he born in?', 'Kentucky, log cabin', 'Indiana, log cabin', 'Illinois, log cabin', 'Virginia, farmhouse', 1
FROM red_white_who_individuals WHERE name = 'Abraham Lincoln'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Abraham Lincoln - Question 2
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How much formal schooling did Lincoln have as a child?', 'Less than one year', 'Three years', 'Six years', 'Two months', 2
FROM red_white_who_individuals WHERE name = 'Abraham Lincoln'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Abraham Lincoln - Question 3
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How did young Lincoln educate himself?', 'Reading books by firelight', 'Attending night school', 'Learning from tutors', 'Working as a clerk', 3
FROM red_white_who_individuals WHERE name = 'Abraham Lincoln'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Abraham Lincoln - Question 4
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What profession did Lincoln teach himself that he practiced in Illinois?', 'Lawyer', 'Doctor', 'Store clerk', 'Surveyor', 4
FROM red_white_who_individuals WHERE name = 'Abraham Lincoln'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Abraham Lincoln - Question 5
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What 1858 series of public discussions made Lincoln famous?', 'Lincoln-Douglas debates', 'Lincoln-Breckinridge debates', 'Senate campaign speeches', 'Presidential debates of 1860', 5
FROM red_white_who_individuals WHERE name = 'Abraham Lincoln'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Abraham Lincoln - Question 6
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What document did Lincoln issue on January 1, 1863, to free enslaved people?', 'Emancipation Proclamation', 'Thirteenth Amendment', 'Declaration of Freedom', 'Civil Rights Act', 6
FROM red_white_who_individuals WHERE name = 'Abraham Lincoln'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Abraham Lincoln - Question 7
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many words was the Gettysburg Address?', '272 words', '500 words', '150 words', '1,000 words', 7
FROM red_white_who_individuals WHERE name = 'Abraham Lincoln'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Abraham Lincoln - Question 8
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What famous phrase from the Gettysburg Address describes American government?', 'Government of the people, by the people, for the people', 'Life, liberty, and the pursuit of happiness', 'All men are created equal', 'United we stand, divided we fall', 8
FROM red_white_who_individuals WHERE name = 'Abraham Lincoln'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Abraham Lincoln - Question 9
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who assassinated Lincoln, and where did it happen?', 'John Wilkes Booth at Ford''s Theatre', 'Lee Harvey Oswald at the Capitol', 'Charles Guiteau at a train station', 'John Wilkes Booth at the White House', 9
FROM red_white_who_individuals WHERE name = 'Abraham Lincoln'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Abraham Lincoln - Question 10
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many soldiers died during the Civil War?', 'Over 600,000 soldiers', 'About 250,000 soldiers', 'Over 1 million soldiers', 'About 400,000 soldiers', 10
FROM red_white_who_individuals WHERE name = 'Abraham Lincoln'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Thomas Jefferson - Question 1
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When and where was Thomas Jefferson born?', '1743, Virginia', '1745, Massachusetts', '1740, Virginia', '1750, Pennsylvania', 1
FROM red_white_who_individuals WHERE name = 'Thomas Jefferson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Thomas Jefferson - Question 2
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How old was Jefferson when he wrote the Declaration of Independence?', 'Primary author of Declaration', '25 years old', '33 years old', '40 years old', 2
FROM red_white_who_individuals WHERE name = 'Thomas Jefferson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Thomas Jefferson - Question 3
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What famous phrase begins the Declaration''s statement about human equality?', 'Monticello', 'We hold these truths', 'Life, liberty, and happiness', 'We the people', 3
FROM red_white_who_individuals WHERE name = 'Thomas Jefferson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Thomas Jefferson - Question 4
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What date did the Declaration get signed, becoming America''s birthday?', 'Louisiana Purchase 1803', 'July 4, 1777', 'July 2, 1776', 'July 4, 1775', 4
FROM red_white_who_individuals WHERE name = 'Thomas Jefferson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Thomas Jefferson - Question 5
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What 1803 land purchase doubled the size of the United States?', 'University of Virginia', 'Florida Purchase', 'Texas Annexation', 'Oregon Territory', 5
FROM red_white_who_individuals WHERE name = 'Thomas Jefferson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Thomas Jefferson - Question 6
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How much did the Louisiana Purchase cost, about how many cents per acre?', 'Lewis and Clark Expedition', 'About 5 cents per acre', 'About 10 cents per acre', 'About 25 cents per acre', 6
FROM red_white_who_individuals WHERE name = 'Thomas Jefferson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Thomas Jefferson - Question 7
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Which two explorers did Jefferson send to explore the Louisiana Territory?', 'Third President 1801-1809', 'Lewis and Clark', 'Pike and Fremont', 'Boone and Crockett', 7
FROM red_white_who_individuals WHERE name = 'Thomas Jefferson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Thomas Jefferson - Question 8
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What is the name of Jefferson''s Virginia home that he designed himself?', 'Life, liberty, pursuit of happiness', 'Mount Vernon', 'Shadwell', 'Poplar Forest', 8
FROM red_white_who_individuals WHERE name = 'Thomas Jefferson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Thomas Jefferson - Question 9
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What university did Jefferson found after leaving the presidency?', 'Democratic-Republican Party', 'University of Pennsylvania', 'College of William and Mary', 'Harvard University', 9
FROM red_white_who_individuals WHERE name = 'Thomas Jefferson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Thomas Jefferson - Question 10
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'On what amazing date did Jefferson die in 1826?', 'Virginia Statute for Religious Freedom', 'His birthday, April 13', 'Christmas Day, 1826', 'New Year''s Day, 1827', 10
FROM red_white_who_individuals WHERE name = 'Thomas Jefferson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Harriet Tubman - Question 1
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'In what state was Harriet Tubman born into slavery?', 'Maryland, around 1822', 'Virginia, around 1820', 'Pennsylvania, around 1825', 'North Carolina, around 1822', 1
FROM red_white_who_individuals WHERE name = 'Harriet Tubman'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Harriet Tubman - Question 2
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What serious injury did Tubman suffer as a child that affected her for life?', 'Underground Railroad conductor', 'A broken arm from farm work', 'Blindness from an illness', 'Burns from a kitchen fire', 2
FROM red_white_who_individuals WHERE name = 'Harriet Tubman'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Harriet Tubman - Question 3
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'In what year did Tubman escape to freedom in the North?', 'Moses', '1852', '1845', '1855', 3
FROM red_white_who_individuals WHERE name = 'Harriet Tubman'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Harriet Tubman - Question 4
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was the Underground Railroad that Tubman worked on?', 'About 70 enslaved people', 'A secret train system for escaping', 'An actual railroad with hidden tracks', 'A code name for safe houses', 4
FROM red_white_who_individuals WHERE name = 'Harriet Tubman'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Harriet Tubman - Question 5
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Approximately how many rescue trips did Tubman make to the South?', '19 trips to the South', 'About 7 trips', 'About 25 trips', 'About 13 trips', 5
FROM red_white_who_individuals WHERE name = 'Harriet Tubman'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Harriet Tubman - Question 6
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'About how many enslaved people did Tubman rescue?', 'Union Army nurse and spy', 'Over 300 enslaved people', 'About 30 enslaved people', 'Over 150 enslaved people', 6
FROM red_white_who_individuals WHERE name = 'Harriet Tubman'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Harriet Tubman - Question 7
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What nickname was Tubman given, comparing her to a biblical figure?', 'Never lost a passenger', 'Harriet the Brave', 'Freedom Fighter', 'The Liberator', 7
FROM red_white_who_individuals WHERE name = 'Harriet Tubman'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Harriet Tubman - Question 8
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What special distinction did Tubman earn during the Combahee River Raid?', 'Head injury from overseer', 'First woman to lead combat troops', 'First woman to receive military pay', 'First woman to carry a weapon in war', 8
FROM red_white_who_individuals WHERE name = 'Harriet Tubman'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Harriet Tubman - Question 9
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many passengers did Tubman lose on the Underground Railroad?', 'Auburn, New York', 'Three passengers', 'About a dozen passengers', 'Only family members', 9
FROM red_white_who_individuals WHERE name = 'Harriet Tubman'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Harriet Tubman - Question 10
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What piece of American money was Tubman chosen to appear on?', 'Twenty-dollar bill', 'Ten-dollar bill', 'Fifty-cent piece', 'Five-dollar bill', 10
FROM red_white_who_individuals WHERE name = 'Harriet Tubman'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Frederick Douglass - Question 1
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'In what state was Frederick Douglass born into slavery?', 'Maryland, around 1818', 'Virginia, around 1820', 'South Carolina, around 1815', 'Georgia, around 1818', 1
FROM red_white_who_individuals WHERE name = 'Frederick Douglass'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Frederick Douglass - Question 2
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Why did the slaveholder say teaching Frederick to read was dangerous?', 'Escaped slavery in 1838', 'Reading would make him lazy', 'Education was too expensive', 'Literacy would make him rebellious', 2
FROM red_white_who_individuals WHERE name = 'Frederick Douglass'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Frederick Douglass - Question 3
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How did young Frederick learn to read and write?', 'Narrative of Frederick Douglass', 'Formal schooling in secret', 'Teaching from his mother', 'Learning from other enslaved people', 3
FROM red_white_who_individuals WHERE name = 'Frederick Douglass'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Frederick Douglass - Question 4
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'In what year did Douglass escape to freedom?', 'Abolitionist speaker and writer', '1845', '1842', '1850', 4
FROM red_white_who_individuals WHERE name = 'Frederick Douglass'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Frederick Douglass - Question 5
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was the title of Douglass''s famous autobiography?', 'Self-taught reading and writing', 'My Bondage and My Freedom', 'Up From Slavery', 'Twelve Years a Slave', 5
FROM red_white_who_individuals WHERE name = 'Frederick Douglass'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Frederick Douglass - Question 6
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was the name of the antislavery newspaper Douglass started?', 'The North Star newspaper', 'Freedom''s Journal', 'The Liberator', 'The Emancipator', 6
FROM red_white_who_individuals WHERE name = 'Frederick Douglass'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Frederick Douglass - Question 7
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Douglass convince President Lincoln to allow during the Civil War?', 'Abraham Lincoln meetings', 'End slavery immediately', 'Pay reparations to enslaved people', 'Allow Black men to serve as soldiers', 7
FROM red_white_who_individuals WHERE name = 'Frederick Douglass'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Frederick Douglass - Question 8
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'About how many Black men served in the Union Army and Navy?', 'U.S. Marshal Washington D.C.', 'About 100,000', 'About 50,000', 'About 250,000', 8
FROM red_white_who_individuals WHERE name = 'Frederick Douglass'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Frederick Douglass - Question 9
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What gift did Mary Lincoln give Douglass after the president''s death?', 'Ambassador to Haiti', 'A photograph of Lincoln', 'Lincoln''s pocket watch', 'A letter from Lincoln', 9
FROM red_white_who_individuals WHERE name = 'Frederick Douglass'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Frederick Douglass - Question 10
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What famous quote by Douglass says ''If there is no struggle...''?', 'Women''s suffrage supporter', 'If there is no pain, there is no growth', 'If there is no justice, there is no peace', 'If there is no sacrifice, there is no freedom', 10
FROM red_white_who_individuals WHERE name = 'Frederick Douglass'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Theodore Roosevelt - Question 1
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What childhood illness did Theodore Roosevelt overcome through exercise?', '1858, New York', 'Polio that affected his legs', 'Heart problems from birth', 'Tuberculosis', 1
FROM red_white_who_individuals WHERE name = 'Theodore Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Theodore Roosevelt - Question 2
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where did Roosevelt live as a cowboy for two years after a personal tragedy?', 'Rough Riders Spanish-American War', 'The Rocky Mountains in Colorado', 'A ranch in North Dakota', 'Alaska territory', 2
FROM red_white_who_individuals WHERE name = 'Theodore Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Theodore Roosevelt - Question 3
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was the name of Roosevelt''s volunteer cavalry regiment in the Spanish-American War?', 'Battle of San Juan Hill', 'Roosevelt''s Rangers', 'Teddy''s Tigers', 'The Buffalo Soldiers', 3
FROM red_white_who_individuals WHERE name = 'Theodore Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Theodore Roosevelt - Question 4
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How old was Roosevelt when he became the youngest president?', '42 years old youngest president', '38 years old', '45 years old', '50 years old', 4
FROM red_white_who_individuals WHERE name = 'Theodore Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Theodore Roosevelt - Question 5
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'About how many acres of public land did Roosevelt protect?', 'Nobel Peace Prize 1906', 'About 100 million acres', 'About 50 million acres', 'About 300 million acres', 5
FROM red_white_who_individuals WHERE name = 'Theodore Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Theodore Roosevelt - Question 6
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What major construction project did Roosevelt champion that connected two oceans?', 'National parks and conservation', 'The Transcontinental Railroad', 'The Erie Canal expansion', 'The Suez Canal', 6
FROM red_white_who_individuals WHERE name = 'Theodore Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Theodore Roosevelt - Question 7
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What award did Roosevelt win in 1906 for helping end a war?', 'Big Stick diplomacy', 'Congressional Medal of Honor', 'Presidential Citation', 'Carnegie Peace Prize', 7
FROM red_white_who_individuals WHERE name = 'Theodore Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Theodore Roosevelt - Question 8
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Roosevelt''s famous motto about speaking and carrying?', 'Panama Canal construction', 'Walk softly and carry big ideas', 'Act boldly and speak loudly', 'Lead firmly and follow through', 8
FROM red_white_who_individuals WHERE name = 'Theodore Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Theodore Roosevelt - Question 9
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Roosevelt do after being shot during a campaign speech?', 'Progressive Bull Moose Party', 'Stopped speaking immediately', 'Called for an ambulance', 'Finished his speech despite the wound', 9
FROM red_white_who_individuals WHERE name = 'Theodore Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Theodore Roosevelt - Question 10
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What nickname did Roosevelt use for his 1912 political party?', 'Speak softly and carry big stick', 'Progressive Party', 'Republican Reform Party', 'American Party', 10
FROM red_white_who_individuals WHERE name = 'Theodore Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Martin Luther King Jr. - Question 1
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where and when was Martin Luther King Jr. born?', '1929, Atlanta Georgia', '1931, Memphis Tennessee', '1927, Birmingham Alabama', '1929, Montgomery Alabama', 1
FROM red_white_who_individuals WHERE name = 'Martin Luther King Jr.'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Martin Luther King Jr. - Question 2
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What event in 1955 led King to lead the Montgomery Bus Boycott?', 'I Have a Dream speech', 'The Greensboro sit-ins', 'The Freedom Rides', 'Rosa Parks''s arrest', 2
FROM red_white_who_individuals WHERE name = 'Martin Luther King Jr.'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Martin Luther King Jr. - Question 3
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How long did the Montgomery Bus Boycott last?', 'Montgomery Bus Boycott leader', 'About 200 days', 'About 50 days', 'About 381 days', 3
FROM red_white_who_individuals WHERE name = 'Martin Luther King Jr.'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Martin Luther King Jr. - Question 4
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What idea about fighting injustice did King believe in and practice?', 'Nonviolent resistance philosophy', 'Armed resistance', 'Legal challenges only', 'Economic pressure', 4
FROM red_white_who_individuals WHERE name = 'Martin Luther King Jr.'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Martin Luther King Jr. - Question 5
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who inspired King''s philosophy of nonviolent protest besides Jesus?', 'Nobel Peace Prize 1964', 'Frederick Douglass', 'Mahatma Gandhi', 'Abraham Lincoln', 5
FROM red_white_who_individuals WHERE name = 'Martin Luther King Jr.'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Martin Luther King Jr. - Question 6
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many people gathered at the March on Washington in 1963?', 'Southern Christian Leadership Conference', 'About 100,000 people', 'About 500,000 people', 'About 50,000 people', 6
FROM red_white_who_individuals WHERE name = 'Martin Luther King Jr.'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Martin Luther King Jr. - Question 7
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What is the most famous line from King''s I Have a Dream speech?', 'Civil Rights Act 1964', 'Free at last, free at last', 'We shall overcome', 'Justice for all', 7
FROM red_white_who_individuals WHERE name = 'Martin Luther King Jr.'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Martin Luther King Jr. - Question 8
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How old was King when he won the Nobel Peace Prize?', '39 years old when assassinated', '39 years old', '32 years old', '45 years old', 8
FROM red_white_who_individuals WHERE name = 'Martin Luther King Jr.'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Martin Luther King Jr. - Question 9
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What two important laws did King''s work help pass in 1964 and 1965?', 'James Earl Ray in Memphis', 'Voting Rights Act and Fair Housing Act', 'Civil Rights Act and Brown v. Board', '13th Amendment and 14th Amendment', 9
FROM red_white_who_individuals WHERE name = 'Martin Luther King Jr.'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Martin Luther King Jr. - Question 10
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'On what date is Martin Luther King Jr. Day celebrated?', 'MLK Day federal holiday', 'First Monday in February', 'January 15th every year', 'Last Monday in January', 10
FROM red_white_who_individuals WHERE name = 'Martin Luther King Jr.'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Rosa Parks - Question 1
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where and when was Rosa Parks born?', '1913, Alabama', '1915, Mississippi', '1910, Georgia', '1918, Alabama', 1
FROM red_white_who_individuals WHERE name = 'Rosa Parks'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Rosa Parks - Question 2
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What organization did Rosa Parks work for as secretary in Montgomery?', 'Refused bus seat Montgomery', 'A women''s rights organization', 'The Montgomery Improvement Association', 'The Urban League', 2
FROM red_white_who_individuals WHERE name = 'Rosa Parks'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Rosa Parks - Question 3
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'On what date was Rosa Parks arrested for refusing to give up her bus seat?', 'Montgomery Bus Boycott catalyst', 'December 15, 1955', 'January 1, 1956', 'November 1, 1955', 3
FROM red_white_who_individuals WHERE name = 'Rosa Parks'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Rosa Parks - Question 4
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Why did Rosa Parks say she refused to give up her seat?', 'NAACP secretary', 'She was too tired to move', 'She wanted to start a boycott', 'She was tired of giving in', 4
FROM red_white_who_individuals WHERE name = 'Rosa Parks'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Rosa Parks - Question 5
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How long did the Montgomery Bus Boycott last?', '381 days boycott lasted', 'About 200 days', 'About 66 days', 'About one year', 5
FROM red_white_who_individuals WHERE name = 'Rosa Parks'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Rosa Parks - Question 6
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What young minister became famous while leading the bus boycott?', 'Mother of Civil Rights Movement', 'Ralph Abernathy', 'Thurgood Marshall', 'Martin Luther King Jr.', 6
FROM red_white_who_individuals WHERE name = 'Rosa Parks'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Rosa Parks - Question 7
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did the Supreme Court rule about bus segregation?', 'Congressional Gold Medal', 'Bus segregation must end in Alabama', 'Bus segregation was unconstitutional', 'Bus companies must integrate', 7
FROM red_white_who_individuals WHERE name = 'Rosa Parks'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Rosa Parks - Question 8
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What nickname is Rosa Parks known by in civil rights history?', 'Moved to Detroit Michigan', 'First Lady of Freedom', 'Queen of Civil Rights', 'Rosa the Brave', 8
FROM red_white_who_individuals WHERE name = 'Rosa Parks'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Rosa Parks - Question 9
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What two highest civilian honors did Rosa Parks receive?', 'Seamstress occupation', 'Congressional Gold Medal and Purple Heart', 'Nobel Peace Prize and Medal of Freedom', 'Congressional Gold Medal and Medal of Freedom', 9
FROM red_white_who_individuals WHERE name = 'Rosa Parks'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Rosa Parks - Question 10
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What special honor did Rosa Parks receive after her death in the U.S. Capitol?', 'Died at 92 years old', 'A statue in the Capitol Rotunda', 'Lying in honor in the Capitol', 'A memorial on the National Mall', 10
FROM red_white_who_individuals WHERE name = 'Rosa Parks'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Sacagawea - Question 1
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What Native American tribe was Sacagawea born into?', 'Around 1788, Idaho', 'Nez Perce tribe', 'Cherokee tribe', 'Lakota Sioux tribe', 1
FROM red_white_who_individuals WHERE name = 'Sacagawea'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Sacagawea - Question 2
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What does Sacagawea''s name mean in the Shoshone language?', 'Lewis Clark Expedition guide', 'Running Water', 'Morning Star', 'Bird Woman', 2
FROM red_white_who_individuals WHERE name = 'Sacagawea'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Sacagawea - Question 3
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What happened to Sacagawea when she was about twelve years old?', 'Shoshone tribe member', 'She was sold as a servant', 'She was traded to another tribe', 'She ran away from home', 3
FROM red_white_who_individuals WHERE name = 'Sacagawea'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Sacagawea - Question 4
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who were the two leaders of the expedition Sacagawea joined?', 'Reached Pacific Ocean', 'Pike and Fremont', 'Clark and Crockett', 'Lewis and Clark', 4
FROM red_white_who_individuals WHERE name = 'Sacagawea'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Sacagawea - Question 5
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How old was Sacagawea''s baby when the expedition began?', 'Baby son Jean Baptiste', 'About one year old', 'About three months old', 'About two weeks old', 5
FROM red_white_who_individuals WHERE name = 'Sacagawea'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Sacagawea - Question 6
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How did Sacagawea''s presence help prevent conflicts with Native tribes?', 'Interpreter and navigator', 'She could translate all languages', 'War parties don''t travel with women and babies', 'She knew secret paths', 6
FROM red_white_who_individuals WHERE name = 'Sacagawea'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Sacagawea - Question 7
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What amazing reunion happened when Sacagawea reached Shoshone territory?', 'Husband Toussaint Charbonneau', 'She found her mother alive', 'She met her childhood friend', 'She reunited with her brother', 7
FROM red_white_who_individuals WHERE name = 'Sacagawea'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Sacagawea - Question 8
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did the Shoshone provide that the expedition desperately needed?', 'Helped obtain horses from Shoshone', 'Canoes and food supplies', 'Horses and directions', 'Weapons and shelter', 8
FROM red_white_who_individuals WHERE name = 'Sacagawea'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Sacagawea - Question 9
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'About how many miles did the Lewis and Clark Expedition cover?', 'Golden dollar coin', 'About 4,000 miles', 'About 2,000 miles', 'About 10,000 miles', 9
FROM red_white_who_individuals WHERE name = 'Sacagawea'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Sacagawea - Question 10
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What coin features Sacagawea''s image today?', 'Died around 1812', 'The nickel', 'The penny', 'The half-dollar', 10
FROM red_white_who_individuals WHERE name = 'Sacagawea'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Thomas Edison - Question 1
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where and when was Thomas Edison born?', 'Milan Ohio 1847', 'Menlo Park, New Jersey 1850', 'Cleveland Ohio 1845', 'Detroit Michigan 1849', 1
FROM red_white_who_individuals WHERE name = 'Thomas Edison'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Thomas Edison - Question 2
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Why did Edison''s mother teach him at home?', 'Teachers thought he was slow', 'He was often sick', 'He preferred working', 'He moved frequently', 2
FROM red_white_who_individuals WHERE name = 'Thomas Edison'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Thomas Edison - Question 3
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What condition did Edison develop as a child that he said helped him concentrate?', 'Hearing loss helped concentration', 'Poor eyesight helped him read better', 'A limp helped him sit longer', 'Deafness helped him concentrate', 3
FROM red_white_who_individuals WHERE name = 'Thomas Edison'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Thomas Edison - Question 4
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was special about Edison''s Menlo Park laboratory?', 'Menlo Park first R&D lab', 'First factory in America', 'First school laboratory', 'First university research center', 4
FROM red_white_who_individuals WHERE name = 'Thomas Edison'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Thomas Edison - Question 5
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What device did Edison invent in 1877 that could record and play back sound?', 'Phonograph 1877', 'The telegraph in 1870', 'The telephone in 1875', 'The radio in 1880', 5
FROM red_white_who_individuals WHERE name = 'Thomas Edison'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Thomas Edison - Question 6
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many materials did Edison famously test before creating a practical light bulb?', 'Over 3000 materials tested', 'Over 500 materials', 'Over 100 materials', 'Over 10,000 materials', 6
FROM red_white_who_individuals WHERE name = 'Thomas Edison'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Thomas Edison - Question 7
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What material did Edison finally use for his light bulb filament?', 'Carbonized bamboo filament', 'Copper wire', 'Tungsten', 'Cotton thread', 7
FROM red_white_who_individuals WHERE name = 'Thomas Edison'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Thomas Edison - Question 8
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What motion picture devices did Edison invent?', 'Kinetoscope motion pictures', 'The radio and television', 'The telephone and microphone', 'The camera and projector', 8
FROM red_white_who_individuals WHERE name = 'Thomas Edison'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Thomas Edison - Question 9
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many U.S. patents did Edison hold, more than any other inventor?', 'Over 1000 patents', 'Over 500 patents', 'Over 2,000 patents', 'Exactly 800 patents', 9
FROM red_white_who_individuals WHERE name = 'Thomas Edison'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Thomas Edison - Question 10
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What is Edison''s famous quote about genius and perspiration?', 'Genius 1% inspiration 99% perspiration', 'Success is 10% luck and 90% timing', 'Genius is 5% talent and 95% practice', 'Invention is 1% discovery and 99% development', 10
FROM red_white_who_individuals WHERE name = 'Thomas Edison'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Alexander Graham Bell - Question 1
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Alexander Graham Bell born?', 'Edinburgh Scotland', 'London, England', 'Dublin, Ireland', 'Glasgow, Scotland', 1
FROM red_white_who_individuals WHERE name = 'Alexander Graham Bell'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Alexander Graham Bell - Question 2
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What family connection made Bell interested in helping deaf people?', 'Mother and wife were deaf', 'His father was deaf', 'His sister and aunt were deaf', 'His brother was deaf', 2
FROM red_white_who_individuals WHERE name = 'Alexander Graham Bell'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Alexander Graham Bell - Question 3
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was the name of Bell''s assistant who heard the first telephone message?', 'Assistant Thomas Watson', 'Alexander Bell Jr.', 'Samuel Morse', 'Elisha Gray', 3
FROM red_white_who_individuals WHERE name = 'Alexander Graham Bell'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Alexander Graham Bell - Question 4
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What were the first words ever spoken over a telephone?', 'Mr Watson come here I want you', 'Watson, can you hear me now', 'Hello, this is Bell speaking', 'Testing, one two three', 4
FROM red_white_who_individuals WHERE name = 'Alexander Graham Bell'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Alexander Graham Bell - Question 5
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How old was Bell when he invented the telephone?', '29 years old when invented', '25 years old', '35 years old', '32 years old', 5
FROM red_white_who_individuals WHERE name = 'Alexander Graham Bell'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Alexander Graham Bell - Question 6
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where did Bell demonstrate the telephone in 1876?', 'Philadelphia Centennial Exhibition 1876', 'World''s Fair in Chicago 1893', 'Boston Science Exhibition 1875', 'New York Inventors Fair 1877', 6
FROM red_white_who_individuals WHERE name = 'Alexander Graham Bell'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Alexander Graham Bell - Question 7
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What major company did Bell found that became AT&T?', 'Bell Telephone Company became AT&T', 'Western Union Telegraph', 'Edison Electric Company', 'American Telegraph Company', 7
FROM red_white_who_individuals WHERE name = 'Alexander Graham Bell'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Alexander Graham Bell - Question 8
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Bell experiment with before the Wright Brothers made their famous flight?', 'Flying machines before Wright Brothers', 'Submarines and underwater vessels', 'Automobiles and motorcycles', 'Telegraphs and radios', 8
FROM red_white_who_individuals WHERE name = 'Alexander Graham Bell'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Alexander Graham Bell - Question 9
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What society did Bell help found and serve as president?', 'National Geographic Society president', 'The Smithsonian Institution', 'The American Inventors Society', 'The Royal Academy of Science', 9
FROM red_white_who_individuals WHERE name = 'Alexander Graham Bell'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Alexander Graham Bell - Question 10
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How was Bell honored at the moment of his burial?', 'All phones silent one minute burial', 'All flags flew at half-staff', 'Church bells rang across America', 'A moment of silence nationwide', 10
FROM red_white_who_individuals WHERE name = 'Alexander Graham Bell'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Wright Brothers (Orville & Wilbur) - Question 1
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where did the Wright Brothers grow up?', 'Dayton Ohio Orville 1871 Wilbur 1867', 'Kitty Hawk, North Carolina', 'Chicago, Illinois', 'Cleveland, Ohio', 1
FROM red_white_who_individuals WHERE name = 'Wright Brothers (Orville & Wilbur)'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Wright Brothers (Orville & Wilbur) - Question 2
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What toy from their father sparked their interest in flight?', 'Bicycle repair shop owners', 'A model airplane from a catalog', 'A kite their father made', 'A rubber band helicopter', 2
FROM red_white_who_individuals WHERE name = 'Wright Brothers (Orville & Wilbur)'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Wright Brothers (Orville & Wilbur) - Question 3
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What business did the Wright Brothers own before building airplanes?', 'Wind tunnel experiments', 'Automobile repair shop', 'Printing shop', 'Hardware store', 3
FROM red_white_who_individuals WHERE name = 'Wright Brothers (Orville & Wilbur)'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Wright Brothers (Orville & Wilbur) - Question 4
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What device did the brothers build to test wing designs?', 'Kitty Hawk North Carolina', 'A wind measuring device', 'A propeller testing machine', 'A wind tunnel', 4
FROM red_white_who_individuals WHERE name = 'Wright Brothers (Orville & Wilbur)'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Wright Brothers (Orville & Wilbur) - Question 5
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Why did the Wright Brothers choose Kitty Hawk, North Carolina?', '12 seconds first flight', 'The flat terrain and isolation', 'They had family there', 'The government recommended it', 5
FROM red_white_who_individuals WHERE name = 'Wright Brothers (Orville & Wilbur)'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Wright Brothers (Orville & Wilbur) - Question 6
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What control system did the Wrights invent to steer their airplane?', 'December 17 1903', 'Rudder and aileron system', 'Wing warping', 'Tail stabilization', 6
FROM red_white_who_individuals WHERE name = 'Wright Brothers (Orville & Wilbur)'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Wright Brothers (Orville & Wilbur) - Question 7
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'On what date did the first powered flight take place?', 'Four flights longest 59 seconds', 'December 14, 1903', 'December 21, 1903', 'November 17, 1903', 7
FROM red_white_who_individuals WHERE name = 'Wright Brothers (Orville & Wilbur)'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Wright Brothers (Orville & Wilbur) - Question 8
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How long did the first flight last, and how far did it travel?', 'Three-axis control system', '20 seconds, 200 feet', '8 seconds, 80 feet', '30 seconds, 300 feet', 8
FROM red_white_who_individuals WHERE name = 'Wright Brothers (Orville & Wilbur)'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Wright Brothers (Orville & Wilbur) - Question 9
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many flights did the Wright Brothers make on December 17, 1903?', 'Wilbur died first 1912', 'Two flights', 'Three flights', 'Six flights', 9
FROM red_white_who_individuals WHERE name = 'Wright Brothers (Orville & Wilbur)'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Wright Brothers (Orville & Wilbur) - Question 10
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where is the original Wright Flyer displayed today?', 'Smithsonian Air Space Museum', 'The Henry Ford Museum', 'The National Air and Space Museum', 'The Wright Brothers Museum', 10
FROM red_white_who_individuals WHERE name = 'Wright Brothers (Orville & Wilbur)'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Neil Armstrong - Question 1
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Neil Armstrong born?', 'Wapakoneta Ohio 1930', 'Cincinnati, Ohio', 'Columbus, Ohio', 'Cleveland, Ohio', 1
FROM red_white_who_individuals WHERE name = 'Neil Armstrong'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Neil Armstrong - Question 2
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Armstrong achieve before he could drive a car?', 'Pilot license age 16', 'Eagle Scout badge', 'College degree', 'Pilot''s license', 2
FROM red_white_who_individuals WHERE name = 'Neil Armstrong'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Neil Armstrong - Question 3
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many combat missions did Armstrong fly during the Korean War?', 'Korean War Navy pilot', 'About 50 missions', 'About 100 missions', 'About 78 missions', 3
FROM red_white_who_individuals WHERE name = 'Neil Armstrong'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Neil Armstrong - Question 4
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What experimental aircraft did Armstrong fly as a test pilot?', 'Test pilot Edwards Air Force', 'The B-52 bomber', 'The X-15 rocket plane', 'The SR-71 Blackbird', 4
FROM red_white_who_individuals WHERE name = 'Neil Armstrong'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Neil Armstrong - Question 5
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What emergency did Armstrong handle on the Gemini 8 mission?', 'Apollo 11 commander', 'Engine failure requiring abort', 'Stuck docking mechanism', 'Spacecraft spinning out of control', 5
FROM red_white_who_individuals WHERE name = 'Neil Armstrong'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Neil Armstrong - Question 6
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was the name of the Apollo 11 lunar module?', 'July 20 1969', 'Columbia', 'Eagle', 'Challenger', 6
FROM red_white_who_individuals WHERE name = 'Neil Armstrong'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Neil Armstrong - Question 7
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'On what date did Armstrong first walk on the moon?', 'One small step mankind', 'July 16, 1969', 'July 24, 1969', 'August 20, 1969', 7
FROM red_white_who_individuals WHERE name = 'Neil Armstrong'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Neil Armstrong - Question 8
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What famous words did Armstrong say as he stepped onto the moon?', 'Buzz Aldrin lunar companion', 'This is history in the making', 'Houston, we''ve landed', 'Mission accomplished for mankind', 8
FROM red_white_who_individuals WHERE name = 'Neil Armstrong'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Neil Armstrong - Question 9
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'About how many people worldwide watched the moon landing on television?', '21 hours 36 minutes moon', 'About 100 million', 'About 600 million', 'About 1 billion', 9
FROM red_white_who_individuals WHERE name = 'Neil Armstrong'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Neil Armstrong - Question 10
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How long did Armstrong and Aldrin spend on the moon''s surface?', 'University Cincinnati professor', 'About 8 hours', 'About 2 days', 'About 12 hours', 10
FROM red_white_who_individuals WHERE name = 'Neil Armstrong'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Jackie Robinson - Question 1
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Jackie Robinson born?', 'Cairo Georgia 1919', 'Los Angeles, California', 'Brooklyn, New York', 'Atlanta, Georgia', 1
FROM red_white_who_individuals WHERE name = 'Jackie Robinson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Jackie Robinson - Question 2
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many sports did Jackie Robinson earn letters in at UCLA?', 'UCLA four-sport athlete', 'Two sports', 'Three sports', 'One sport', 2
FROM red_white_who_individuals WHERE name = 'Jackie Robinson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Jackie Robinson - Question 3
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What rank did Jackie Robinson hold in the U.S. Army?', 'Kansas City Monarchs Negro League', 'Captain', 'Sergeant', 'Colonel', 3
FROM red_white_who_individuals WHERE name = 'Jackie Robinson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Jackie Robinson - Question 4
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What team did Jackie Robinson play for in the Negro Leagues?', 'Brooklyn Dodgers 1947', 'Birmingham Black Barons', 'Indianapolis Clowns', 'Newark Eagles', 4
FROM red_white_who_individuals WHERE name = 'Jackie Robinson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Jackie Robinson - Question 5
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who was the Brooklyn Dodgers president who recruited Jackie Robinson?', 'April 15 1947 debut', 'Leo Durocher', 'Happy Chandler', 'Pee Wee Reese', 5
FROM red_white_who_individuals WHERE name = 'Jackie Robinson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Jackie Robinson - Question 6
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'On what date did Jackie break Major League Baseball''s color barrier?', 'Number 42 jersey', 'April 9, 1947', 'May 1, 1947', 'March 15, 1947', 6
FROM red_white_who_individuals WHERE name = 'Jackie Robinson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Jackie Robinson - Question 7
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What award did Jackie Robinson win in his first season?', 'Branch Rickey Dodgers executive', 'Most Valuable Player', 'Gold Glove Award', 'Rookie of the Year', 7
FROM red_white_who_individuals WHERE name = 'Jackie Robinson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Jackie Robinson - Question 8
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What award did Jackie Robinson win in 1949?', 'Rookie of Year 1947', 'World Series MVP', 'Batting Champion', 'MVP Award', 8
FROM red_white_who_individuals WHERE name = 'Jackie Robinson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Jackie Robinson - Question 9
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What special honor did MLB give Jackie Robinson''s number 42?', 'Hall of Fame 1962', 'His number was retired by the Dodgers', 'His number was retired by all MLB teams', 'His number was given to future stars', 9
FROM red_white_who_individuals WHERE name = 'Jackie Robinson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Jackie Robinson - Question 10
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What date each year do MLB players wear number 42?', 'Number 42 retired all teams', 'Opening Day every year', 'April 15 every year', 'His birthday, January 31', 10
FROM red_white_who_individuals WHERE name = 'Jackie Robinson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Amelia Earhart - Question 1
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where and when was Amelia Earhart born?', 'Atchison Kansas 1897', 'Kansas City, Missouri 1899', 'Wichita, Kansas 1895', 'Des Moines, Iowa 1897', 1
FROM red_white_who_individuals WHERE name = 'Amelia Earhart'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Amelia Earhart - Question 2
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What experience in 1920 made Amelia decide she had to fly?', 'Yellow airplane Canary', 'Reading about Charles Lindbergh', 'Taking a flying lesson', 'Watching a stunt-flying show', 2
FROM red_white_who_individuals WHERE name = 'Amelia Earhart'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Amelia Earhart - Question 3
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Amelia call her first plane?', 'First woman solo Atlantic', 'The Spirit', 'The Yellow Bird', 'The Canary', 3
FROM red_white_who_individuals WHERE name = 'Amelia Earhart'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Amelia Earhart - Question 4
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'In what year did Amelia become the first woman to fly solo across the Atlantic?', '1932 transatlantic flight', '1930', '1928', '1935', 4
FROM red_white_who_individuals WHERE name = 'Amelia Earhart'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Amelia Earhart - Question 5
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where did Amelia land after her solo Atlantic crossing?', 'Around world flight attempt', 'Paris, France', 'London, England', 'Northern Ireland', 5
FROM red_white_who_individuals WHERE name = 'Amelia Earhart'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Amelia Earhart - Question 6
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What honor was Amelia the first woman to receive from Congress?', 'Disappeared Pacific Howland Island', 'Medal of Freedom', 'Distinguished Flying Cross', 'Congressional Medal of Honor', 6
FROM red_white_who_individuals WHERE name = 'Amelia Earhart'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Amelia Earhart - Question 7
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Amelia attempting when she disappeared in 1937?', 'July 2 1937 last radio', 'A cross-country American flight', 'An around-the-world flight', 'A Pacific Ocean crossing', 7
FROM red_white_who_individuals WHERE name = 'Amelia Earhart'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Amelia Earhart - Question 8
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who was Amelia''s navigator on her final flight?', 'Navigator Fred Noonan', 'Harry Manning', 'Paul Mantz', 'George Putnam', 8
FROM red_white_who_individuals WHERE name = 'Amelia Earhart'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Amelia Earhart - Question 9
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What tiny island was Amelia trying to reach when she disappeared?', 'Purdue University funding', 'Wake Island', 'Midway Island', 'Howland Island', 9
FROM red_white_who_individuals WHERE name = 'Amelia Earhart'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Amelia Earhart - Question 10
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Amelia say about women trying things in her last letter?', 'Women aviation career inspiration', 'Women must keep trying', 'Success is never final', 'Adventure is worthwhile', 10
FROM red_white_who_individuals WHERE name = 'Amelia Earhart'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Ulysses S. Grant - Question 1
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Ulysses S. Grant born?', 'Point Pleasant Ohio 1822', 'Cincinnati, Ohio 1820', 'Cleveland, Ohio 1824', 'Dayton, Ohio 1822', 1
FROM red_white_who_individuals WHERE name = 'Ulysses S. Grant'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Ulysses S. Grant - Question 2
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was special about Grant''s abilities with horses?', 'West Point Military Academy', 'Exceptional skill with weapons', 'Outstanding leadership ability', 'Remarkable horsemanship', 2
FROM red_white_who_individuals WHERE name = 'Ulysses S. Grant'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Ulysses S. Grant - Question 3
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What nickname did Grant earn from his demand at Fort Donelson?', 'Mexican-American War service', 'Fighting Grant', 'Bulldog Grant', 'Unconditional Surrender Grant', 3
FROM red_white_who_individuals WHERE name = 'Ulysses S. Grant'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Ulysses S. Grant - Question 4
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What important victory did Grant win on July 4, 1863?', 'Vicksburg siege victory', 'Battle of Shiloh', 'Battle of Gettysburg', 'Battle of Antietam', 4
FROM red_white_who_individuals WHERE name = 'Ulysses S. Grant'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Ulysses S. Grant - Question 5
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What rank did Lincoln give Grant in March 1864?', 'General-in-Chief Union armies', 'Major General', 'Lieutenant General and General-in-Chief', 'Brigadier General', 5
FROM red_white_who_individuals WHERE name = 'Ulysses S. Grant'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Ulysses S. Grant - Question 6
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where did Confederate General Lee surrender to Grant?', 'Appomattox Court House surrender', 'Richmond, Virginia', 'Gettysburg, Pennsylvania', 'Washington, D.C.', 6
FROM red_white_who_individuals WHERE name = 'Ulysses S. Grant'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Ulysses S. Grant - Question 7
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How did Grant treat the defeated Confederate soldiers?', '18th President 1869-1877', 'Made them prisoners of war', 'Required them to swear loyalty oaths', 'Let them go home with their horses', 7
FROM red_white_who_individuals WHERE name = 'Ulysses S. Grant'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Ulysses S. Grant - Question 8
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What amendment did Grant support that gave Black men the right to vote?', 'Reconstruction era challenges', 'Fourteenth Amendment', 'Thirteenth Amendment', 'Sixteenth Amendment', 8
FROM red_white_who_individuals WHERE name = 'Ulysses S. Grant'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Ulysses S. Grant - Question 9
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What group did Grant send federal troops to fight?', 'Personal Memoirs bestseller', 'Confederate sympathizers', 'The Ku Klux Klan', 'State militias', 9
FROM red_white_who_individuals WHERE name = 'Ulysses S. Grant'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Ulysses S. Grant - Question 10
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What famous book did Grant write while dying of cancer?', 'Fifty-dollar bill portrait', 'Autobiography of a Soldier', 'My Life and Times', 'Personal Memoirs', 10
FROM red_white_who_individuals WHERE name = 'Ulysses S. Grant'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Susan B. Anthony - Question 1
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Susan B. Anthony born, and what religious background did her family have?', 'Adams Massachusetts 1820', 'Rochester, New York with Baptist roots', 'Boston, Massachusetts with Puritan roots', 'Philadelphia, Pennsylvania with Methodist roots', 1
FROM red_white_who_individuals WHERE name = 'Susan B. Anthony'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Susan B. Anthony - Question 2
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What injustice as a teacher first opened Susan''s eyes to inequality?', 'Quaker family equality beliefs', 'Women couldn''t vote', 'Women couldn''t own property', 'Women earned less than men', 2
FROM red_white_who_individuals WHERE name = 'Susan B. Anthony'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Susan B. Anthony - Question 3
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who was Susan''s lifelong friend and partner in the women''s rights movement?', 'School teacher early career', 'Harriet Tubman', 'Sojourner Truth', 'Elizabeth Cady Stanton', 3
FROM red_white_who_individuals WHERE name = 'Susan B. Anthony'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Susan B. Anthony - Question 4
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'About how many speeches did Susan give per year for 45 years?', 'Women''s suffrage voting rights', 'About 50 speeches per year', 'About 200 speeches per year', 'About 25 speeches per year', 4
FROM red_white_who_individuals WHERE name = 'Susan B. Anthony'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Susan B. Anthony - Question 5
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What organization did Susan and Elizabeth found in 1869?', 'Voted illegally 1872 election', 'American Equal Rights Association', 'Women''s Christian Temperance Union', 'National American Woman Suffrage Association', 5
FROM red_white_who_individuals WHERE name = 'Susan B. Anthony'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Susan B. Anthony - Question 6
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Susan do illegally in 1872, and what happened to her?', 'Refused pay 100 dollar fine', 'She protested at polling places and was fined', 'She voted illegally and was arrested', 'She registered as a man and was caught', 6
FROM red_white_who_individuals WHERE name = 'Susan B. Anthony'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Susan B. Anthony - Question 7
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Susan''s famous response when asked if women would win the vote?', 'National Woman Suffrage Association', 'Maybe not in my lifetime', 'Certainly within ten years', 'Failure is impossible', 7
FROM red_white_who_individuals WHERE name = 'Susan B. Anthony'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Susan B. Anthony - Question 8
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many years after Susan''s death did women gain the right to vote?', '19th Amendment 1920', '10 years', '20 years', '5 years', 8
FROM red_white_who_individuals WHERE name = 'Susan B. Anthony'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Susan B. Anthony - Question 9
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What constitutional amendment gave women the right to vote?', 'Susan B Anthony dollar coin', 'Eighteenth Amendment', 'Twenty-first Amendment', 'Fifteenth Amendment', 9
FROM red_white_who_individuals WHERE name = 'Susan B. Anthony'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Susan B. Anthony - Question 10
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What piece of money features Susan B. Anthony''s image?', 'Died Rochester New York', 'The quarter', 'The dime', 'The dollar coin', 10
FROM red_white_who_individuals WHERE name = 'Susan B. Anthony'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Clara Barton - Question 1
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where and when was Clara Barton born?', 'Oxford Massachusetts 1821', 'Boston, Massachusetts 1825', 'Worcester, Massachusetts 1819', 'Springfield, Massachusetts 1823', 1
FROM red_white_who_individuals WHERE name = 'Clara Barton'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Clara Barton - Question 2
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What experience at age eleven inspired Clara''s desire to help others?', 'Teacher Patent Office clerk', 'Caring for wounded soldiers', 'Helping her sick mother', 'Nursing her injured brother', 2
FROM red_white_who_individuals WHERE name = 'Clara Barton'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Clara Barton - Question 3
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was unusual about Clara''s salary at the U.S. Patent Office?', 'Civil War battlefield nurse', 'She earned half the salary of men', 'She was not allowed to work', 'She earned the same salary as men', 3
FROM red_white_who_individuals WHERE name = 'Clara Barton'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Clara Barton - Question 4
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What nickname did soldiers give Clara Barton?', 'American Red Cross founder', 'Florence of America', 'Lady with the Lamp', 'Battlefield Angel', 4
FROM red_white_who_individuals WHERE name = 'Clara Barton'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Clara Barton - Question 5
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What famous battle site did Clara help at, where a bullet passed through her sleeve?', 'Angel of Battlefield nickname', 'Gettysburg', 'Bull Run', 'Antietam', 5
FROM red_white_who_individuals WHERE name = 'Clara Barton'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Clara Barton - Question 6
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What work did Clara do at Andersonville prison after the war?', 'Missing Soldiers Office created', 'Helped nurse wounded prisoners', 'Identified missing and dead soldiers', 'Distributed supplies to survivors', 6
FROM red_white_who_individuals WHERE name = 'Clara Barton'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Clara Barton - Question 7
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'In what year did Clara found the American Red Cross?', 'Franco-Prussian War relief', '1875', '1885', '1891', 7
FROM red_white_who_individuals WHERE name = 'Clara Barton'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Clara Barton - Question 8
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How long did Clara serve as president of the American Red Cross?', 'First Red Cross president', 'About 10 years', 'About 23 years', 'About 15 years', 8
FROM red_white_who_individuals WHERE name = 'Clara Barton'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Clara Barton - Question 9
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How old was Clara when she still traveled to disaster sites?', 'Died Glen Echo Maryland', 'About 70 years old', 'About 65 years old', 'About 79 years old', 9
FROM red_white_who_individuals WHERE name = 'Clara Barton'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Clara Barton - Question 10
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What organization continues Clara Barton''s mission today?', 'Nursing humanitarian legacy', 'The Red Cross', 'The American Red Cross', 'The International Nurses Association', 10
FROM red_white_who_individuals WHERE name = 'Clara Barton'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- John Adams - Question 1
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'In what Massachusetts town was John Adams born?', 'Braintree Massachusetts 1735', 'Boston, Massachusetts', 'Quincy, Massachusetts', 'Plymouth, Massachusetts', 1
FROM red_white_who_individuals WHERE name = 'John Adams'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- John Adams - Question 2
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What profession did Adams pursue after graduating from Harvard?', 'Harvard College education', 'Minister', 'Merchant', 'Lawyer', 2
FROM red_white_who_individuals WHERE name = 'John Adams'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- John Adams - Question 3
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What unpopular action did Adams take after the Boston Massacre?', 'Boston Massacre defense lawyer', 'He refused to represent them', 'He prosecuted them', 'He defended the British soldiers', 3
FROM red_white_who_individuals WHERE name = 'John Adams'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- John Adams - Question 4
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who was John Adams''s wife, known for her influential letters?', 'Continental Congress delegate', 'Martha Washington', 'Dolley Madison', 'Abigail Adams', 4
FROM red_white_who_individuals WHERE name = 'John Adams'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- John Adams - Question 5
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'According to Thomas Jefferson, what role did Adams play in Congress?', 'Declaration Independence committee', 'He was the voice of independence', 'He was the best writer', 'He was the oldest delegate', 5
FROM red_white_who_individuals WHERE name = 'John Adams'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- John Adams - Question 6
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What position did Adams hold under President Washington?', 'Ambassador Great Britain Netherlands', 'Secretary of State', 'Secretary of War', 'First Vice President', 6
FROM red_white_who_individuals WHERE name = 'John Adams'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- John Adams - Question 7
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Adams''s greatest achievement as president regarding France?', 'First Vice President Washington', 'Avoided war with France', 'Signed a treaty with France', 'Declared war on France', 7
FROM red_white_who_individuals WHERE name = 'John Adams'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- John Adams - Question 8
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'On what historic date did John Adams die in 1826?', 'Second President 1797-1801', 'July 4, 1826', 'July 4, 1824', 'July 2, 1826', 8
FROM red_white_who_individuals WHERE name = 'John Adams'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- John Adams - Question 9
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What were reportedly Adams''s last words?', 'Federalist Party leader', 'Jefferson still survives', 'Liberty forever', 'The country is safe', 9
FROM red_white_who_individuals WHERE name = 'John Adams'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- John Adams - Question 10
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was ironic about Adams''s last words?', 'Died July 4 1826 same day Jefferson', 'Jefferson had actually died hours earlier', 'Jefferson was with him', 'Jefferson sent a letter that day', 10
FROM red_white_who_individuals WHERE name = 'John Adams'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Alexander Hamilton - Question 1
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Alexander Hamilton born?', 'Nevis British West Indies 1755', 'Jamaica in the Caribbean', 'Cuba in the Caribbean', 'Barbados in the Caribbean', 1
FROM red_white_who_individuals WHERE name = 'Alexander Hamilton'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Alexander Hamilton - Question 2
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What important position did Hamilton hold on Washington''s staff?', 'Orphaned came America teenager', 'Secretary to Washington', 'Personal aide-de-camp to Washington', 'Messenger for Washington', 2
FROM red_white_who_individuals WHERE name = 'Alexander Hamilton'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Alexander Hamilton - Question 3
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'At which battle did Hamilton lead an assault on British defenses?', 'King''s College Columbia University', 'Battle of Bunker Hill', 'Battle of Saratoga', 'Battle of Yorktown', 3
FROM red_white_who_individuals WHERE name = 'Alexander Hamilton'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Alexander Hamilton - Question 4
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What series of essays did Hamilton write with Madison and Jay?', 'Continental Army aide Washington', 'The Constitution', 'The Bill of Rights', 'The Articles of Confederation', 4
FROM red_white_who_individuals WHERE name = 'Alexander Hamilton'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Alexander Hamilton - Question 5
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many of the Federalist Papers did Hamilton write?', 'Federalist Papers co-author', 'About 30 papers', 'About 80 papers', 'About 51 papers', 5
FROM red_white_who_individuals WHERE name = 'Alexander Hamilton'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Alexander Hamilton - Question 6
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What position did Hamilton hold in Washington''s Cabinet?', 'First Secretary Treasury', 'Secretary of State', 'Secretary of War', 'Attorney General', 6
FROM red_white_who_individuals WHERE name = 'Alexander Hamilton'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Alexander Hamilton - Question 7
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What financial institution did Hamilton create?', 'National Bank creator', 'Federal Reserve System', 'First Bank of the United States', 'Treasury Department', 7
FROM red_white_who_individuals WHERE name = 'Alexander Hamilton'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Alexander Hamilton - Question 8
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who was Hamilton''s chief political rival from Virginia?', 'Federalist Party founder', 'John Adams', 'Thomas Jefferson', 'James Madison', 8
FROM red_white_who_individuals WHERE name = 'Alexander Hamilton'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Alexander Hamilton - Question 9
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who killed Hamilton in a duel in 1804?', 'Duel Aaron Burr 1804', 'Thomas Jefferson', 'James Monroe', 'Aaron Burr', 9
FROM red_white_who_individuals WHERE name = 'Alexander Hamilton'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Alexander Hamilton - Question 10
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What piece of money has Hamilton''s face on it?', 'Ten-dollar bill portrait', 'Twenty-dollar bill', 'Five-dollar bill', 'Fifty-dollar bill', 10
FROM red_white_who_individuals WHERE name = 'Alexander Hamilton'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Franklin D. Roosevelt - Question 1
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Franklin D. Roosevelt born?', 'Hyde Park New York 1882', 'Albany, New York', 'Manhattan, New York', 'Oyster Bay, New York', 1
FROM red_white_who_individuals WHERE name = 'Franklin D. Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Franklin D. Roosevelt - Question 2
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who was FDR''s wife?', 'Polio paralyzed legs 1921', 'Anna Roosevelt', 'Sarah Roosevelt', 'Eleanor Roosevelt', 2
FROM red_white_who_individuals WHERE name = 'Franklin D. Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Franklin D. Roosevelt - Question 3
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What disease struck Roosevelt in 1921?', 'New York Governor 1929-1932', 'Tuberculosis', 'Polio', 'Multiple sclerosis', 3
FROM red_white_who_individuals WHERE name = 'Franklin D. Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Franklin D. Roosevelt - Question 4
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was the name of FDR''s program to combat the Depression?', 'Four terms president only', 'The Fair Deal', 'The Square Deal', 'The Great Society', 4
FROM red_white_who_individuals WHERE name = 'Franklin D. Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Franklin D. Roosevelt - Question 5
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What were FDR''s radio addresses called?', 'Great Depression New Deal', 'Radio addresses', 'Fireside Chats', 'Presidential broadcasts', 5
FROM red_white_who_individuals WHERE name = 'Franklin D. Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Franklin D. Roosevelt - Question 6
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many times was Roosevelt elected president?', 'World War II leader', 'Three times', 'Two times', 'Four times', 6
FROM red_white_who_individuals WHERE name = 'Franklin D. Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Franklin D. Roosevelt - Question 7
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What program provided retirement insurance?', 'Fireside chats radio', 'Medicare', 'Social Security', 'Welfare system', 7
FROM red_white_who_individuals WHERE name = 'Franklin D. Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Franklin D. Roosevelt - Question 8
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was the date of Pearl Harbor?', 'Social Security Act', 'December 7, 1941', 'December 8, 1941', 'December 25, 1941', 8
FROM red_white_who_individuals WHERE name = 'Franklin D. Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Franklin D. Roosevelt - Question 9
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How old was Roosevelt when he died?', 'Died office April 1945', '65 years old', '58 years old', '63 years old', 9
FROM red_white_who_individuals WHERE name = 'Franklin D. Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Franklin D. Roosevelt - Question 10
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What lasting programs did the New Deal create?', 'Wheelchair hidden from public', 'Social Security, FDIC, TVA', 'Social Security, Medicare, Medicaid', 'WPA, CCC, Social Security', 10
FROM red_white_who_individuals WHERE name = 'Franklin D. Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- John F. Kennedy - Question 1
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was John F. Kennedy born?', 'Brookline Massachusetts 1917', 'Boston, Massachusetts', 'Hyannis, Massachusetts', 'New York City', 1
FROM red_white_who_individuals WHERE name = 'John F. Kennedy'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- John F. Kennedy - Question 2
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What patrol boat incident made Kennedy a war hero?', 'Harvard University education', 'His plane was shot down', 'His ship was torpedoed', 'His patrol boat was rammed', 2
FROM red_white_who_individuals WHERE name = 'John F. Kennedy'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- John F. Kennedy - Question 3
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How old was Kennedy when he became president?', 'PT-109 World War II hero', '46 years old', '40 years old', '35 years old', 3
FROM red_white_who_individuals WHERE name = 'John F. Kennedy'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- John F. Kennedy - Question 4
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What famous phrase came from Kennedy''s inaugural address?', 'Profiles Courage Pulitzer Prize', 'We have nothing to fear but fear itself', 'The only thing necessary is for good men to act', 'Ask not what your country can do for you', 4
FROM red_white_who_individuals WHERE name = 'John F. Kennedy'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- John F. Kennedy - Question 5
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many days did the Cuban Missile Crisis last?', 'Youngest elected president 43', 'Seven days', 'Thirteen days', 'Twenty-one days', 5
FROM red_white_who_individuals WHERE name = 'John F. Kennedy'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- John F. Kennedy - Question 6
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What organization did Kennedy create to send volunteers abroad?', 'Ask not what country', 'VISTA', 'AmeriCorps', 'Peace Corps', 6
FROM red_white_who_individuals WHERE name = 'John F. Kennedy'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- John F. Kennedy - Question 7
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What space program did Kennedy launch?', 'Cuban Missile Crisis 1962', 'Space race to Mars', 'Moon landing program', 'Satellite development', 7
FROM red_white_who_individuals WHERE name = 'John F. Kennedy'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- John F. Kennedy - Question 8
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'On what date was Kennedy assassinated?', 'Space program moon goal', 'November 22, 1963', 'November 24, 1963', 'October 22, 1963', 8
FROM red_white_who_individuals WHERE name = 'John F. Kennedy'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- John F. Kennedy - Question 9
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Kennedy assassinated?', 'Civil rights movement support', 'Houston, Texas', 'Dallas, Texas', 'San Antonio, Texas', 9
FROM red_white_who_individuals WHERE name = 'John F. Kennedy'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- John F. Kennedy - Question 10
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who assassinated President Kennedy?', 'Assassinated Dallas November 1963', 'Jack Ruby', 'Lee Harvey Oswald', 'James Earl Ray', 10
FROM red_white_who_individuals WHERE name = 'John F. Kennedy'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Ronald Reagan - Question 1
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Ronald Reagan born?', 'Tampico Illinois 1911', 'Dixon, Illinois', 'Chicago, Illinois', 'Springfield, Illinois', 1
FROM red_white_who_individuals WHERE name = 'Ronald Reagan'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Ronald Reagan - Question 2
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What career did Reagan have before politics?', 'Hollywood actor career', 'Radio announcer', 'Television host', 'Hollywood actor', 2
FROM red_white_who_individuals WHERE name = 'Ronald Reagan'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Ronald Reagan - Question 3
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What state did Reagan govern before becoming president?', 'California Governor 1967-1975', 'New York', 'Texas', 'California', 3
FROM red_white_who_individuals WHERE name = 'Ronald Reagan'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Ronald Reagan - Question 4
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What happened 69 days into Reagan''s presidency?', 'Great Communicator nickname', 'He was diagnosed with cancer', 'He was impeached', 'He was shot', 4
FROM red_white_who_individuals WHERE name = 'Ronald Reagan'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Ronald Reagan - Question 5
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Reagan call the Soviet Union?', 'Conservative movement leader', 'Evil regime', 'Dangerous adversary', 'Evil Empire', 5
FROM red_white_who_individuals WHERE name = 'Ronald Reagan'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Ronald Reagan - Question 6
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who was the Soviet leader Reagan negotiated with?', '40th President 1981-1989', 'Leonid Brezhnev', 'Mikhail Gorbachev', 'Nikita Khrushchev', 6
FROM red_white_who_individuals WHERE name = 'Ronald Reagan'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Ronald Reagan - Question 7
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What famous words did Reagan say at the Berlin Wall?', 'Cold War Berlin Wall', 'End this wall', 'Bring down this wall', 'Mr. Gorbachev, tear down this wall', 7
FROM red_white_who_individuals WHERE name = 'Ronald Reagan'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Ronald Reagan - Question 8
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did the Berlin Wall fall?', 'Supply-side economics', '1991', '1987', '1989', 8
FROM red_white_who_individuals WHERE name = 'Ronald Reagan'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Ronald Reagan - Question 9
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How old was Reagan when he died?', 'Assassination attempt survived', '85 years old', '93 years old', '89 years old', 9
FROM red_white_who_individuals WHERE name = 'Ronald Reagan'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Ronald Reagan - Question 10
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What phrase did Reagan use to describe America?', 'Alzheimer''s disease later years', 'Land of opportunity', 'City upon a hill', 'Greatest nation on Earth', 10
FROM red_white_who_individuals WHERE name = 'Ronald Reagan'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Helen Keller - Question 1
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Helen Keller born?', 'Tuscumbia Alabama 1880', 'Atlanta, Georgia', 'Birmingham, Alabama', 'Montgomery, Alabama', 1
FROM red_white_who_individuals WHERE name = 'Helen Keller'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Helen Keller - Question 2
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What illness left Helen deaf and blind?', 'Illness left deaf blind', 'Scarlet fever', 'Meningitis', 'Unknown illness', 2
FROM red_white_who_individuals WHERE name = 'Helen Keller'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Helen Keller - Question 3
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who was Helen''s teacher?', 'Anne Sullivan teacher breakthrough', 'Sarah Fuller', 'Anne Macy', 'Anne Sullivan', 3
FROM red_white_who_individuals WHERE name = 'Helen Keller'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Helen Keller - Question 4
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was the breakthrough moment that helped Helen understand language?', 'Water pump learning moment', 'Feeling Braille letters', 'The water pump moment', 'Spelling in her palm', 4
FROM red_white_who_individuals WHERE name = 'Helen Keller'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Helen Keller - Question 5
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What reading system did Helen learn?', 'Radcliffe College graduate', 'Sign language', 'Braille', 'Lip reading', 5
FROM red_white_who_individuals WHERE name = 'Helen Keller'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Helen Keller - Question 6
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What college did Helen attend?', 'Political activism socialist', 'Harvard University', 'Wellesley College', 'Radcliffe College', 6
FROM red_white_who_individuals WHERE name = 'Helen Keller'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Helen Keller - Question 7
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Helen''s autobiography called?', 'Women''s suffrage supporter', 'The Story of My Life', 'Teacher', 'Light in My Darkness', 7
FROM red_white_who_individuals WHERE name = 'Helen Keller'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Helen Keller - Question 8
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many countries did Helen travel to?', 'Disability rights advocate', 'About 20 countries', 'About 50 countries', 'About 39 countries', 8
FROM red_white_who_individuals WHERE name = 'Helen Keller'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Helen Keller - Question 9
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What famous quote did Helen write about suffering?', 'Autobiography Story My Life', 'Character cannot be developed in ease and quiet', 'The only thing worse than being blind is having no vision', 'Life is either a daring adventure or nothing', 9
FROM red_white_who_individuals WHERE name = 'Helen Keller'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Helen Keller - Question 10
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What distinction did Helen earn about college degrees?', 'Inspirational speaker worldwide', 'First blind person to graduate college', 'First deaf-blind person to earn a college degree', 'First disabled person to attend Harvard', 10
FROM red_white_who_individuals WHERE name = 'Helen Keller'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- George Washington Carver - Question 1
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Carver born?', 'Diamond Missouri 1864', 'Tuskegee, Alabama', 'Atlanta, Georgia', 'Kansas City, Missouri', 1
FROM red_white_who_individuals WHERE name = 'George Washington Carver'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- George Washington Carver - Question 2
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did neighbors call young George?', 'Born into slavery', 'The Crop Doctor', 'The Plant Doctor', 'The Garden Scientist', 2
FROM red_white_who_individuals WHERE name = 'George Washington Carver'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- George Washington Carver - Question 3
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Why was Carver rejected from Highland College?', 'Tuskegee Institute professor', 'He couldn''t afford tuition', 'He was rejected because he was Black', 'The school had closed', 3
FROM red_white_who_individuals WHERE name = 'George Washington Carver'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- George Washington Carver - Question 4
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What degrees did Carver earn from Iowa State?', 'Agricultural science innovations', 'Bachelor''s degree only', 'Bachelor''s and master''s degrees', 'Doctorate degree', 4
FROM red_white_who_individuals WHERE name = 'George Washington Carver'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- George Washington Carver - Question 5
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who invited Carver to Tuskegee?', 'Peanut crop rotation promotion', 'George Washington', 'Frederick Douglass', 'Booker T. Washington', 5
FROM red_white_who_individuals WHERE name = 'George Washington Carver'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- George Washington Carver - Question 6
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What farming practice did Carver teach?', 'Sweet potato research', 'Soil rotation', 'Crop rotation', 'Field rotation', 6
FROM red_white_who_individuals WHERE name = 'George Washington Carver'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- George Washington Carver - Question 7
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many products did Carver develop from sweet potatoes?', 'Cotton soil improvement', 'About 50 products', 'About 200 products', 'About 118 products', 7
FROM red_white_who_individuals WHERE name = 'George Washington Carver'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- George Washington Carver - Question 8
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Why didn''t Carver patent his discoveries?', 'Helped Southern farmers', 'They were too simple to patent', 'He wanted them free for all farmers', 'The patent office rejected them', 8
FROM red_white_who_individuals WHERE name = 'George Washington Carver'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- George Washington Carver - Question 9
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many presidents did Carver meet?', 'Environmental conservation early advocate', 'One president', 'Three presidents', 'No presidents', 9
FROM red_white_who_individuals WHERE name = 'George Washington Carver'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- George Washington Carver - Question 10
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What honor was given to Carver''s birthplace?', 'Scientists Hall Fame', 'A national monument', 'A university named after him', 'A statue in Washington D.C.', 10
FROM red_white_who_individuals WHERE name = 'George Washington Carver'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Sojourner Truth - Question 1
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Sojourner Truth''s birth name?', 'Ulster County New York 1797', 'Harriet Freeman', 'Sarah Johnson', 'Isabella Baumfree', 1
FROM red_white_who_individuals WHERE name = 'Sojourner Truth'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Sojourner Truth - Question 2
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'In what state was she born into slavery?', 'Born slavery Isabella Baumfree', 'Virginia', 'Maryland', 'New York', 2
FROM red_white_who_individuals WHERE name = 'Sojourner Truth'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Sojourner Truth - Question 3
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did she walk away from slavery?', 'Escaped slavery 1826', '1830', '1827', '1820', 3
FROM red_white_who_individuals WHERE name = 'Sojourner Truth'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Sojourner Truth - Question 4
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Why did she change her name to Sojourner Truth?', 'Ain''t I Woman speech famous', 'She wanted to travel and spread God''s truth', 'She was honoring a friend', 'It was her grandmother''s name', 4
FROM red_white_who_individuals WHERE name = 'Sojourner Truth'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Sojourner Truth - Question 5
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was her most famous speech called?', 'Abolitionist speaker powerful', 'We Shall Overcome', 'Freedom Now', 'Ain''t I a Woman', 5
FROM red_white_who_individuals WHERE name = 'Sojourner Truth'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Sojourner Truth - Question 6
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How tall was Sojourner Truth?', 'Women''s rights advocate', 'About five feet tall', 'About six feet tall', 'About five feet six inches', 6
FROM red_white_who_individuals WHERE name = 'Sojourner Truth'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Sojourner Truth - Question 7
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did she do during the Civil War?', 'Religious faith central', 'She nursed wounded soldiers', 'She raised money for the cause', 'She recruited Black soldiers', 7
FROM red_white_who_individuals WHERE name = 'Sojourner Truth'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Sojourner Truth - Question 8
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Which president did she meet?', 'Met Abraham Lincoln', 'Ulysses S. Grant', 'Andrew Johnson', 'Abraham Lincoln', 8
FROM red_white_who_individuals WHERE name = 'Sojourner Truth'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Sojourner Truth - Question 9
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Could Sojourner Truth read and write?', 'Worked Freedmen''s Bureau', 'Yes, she learned as an adult', 'No, she never learned', 'She could read but not write', 9
FROM red_white_who_individuals WHERE name = 'Sojourner Truth'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Sojourner Truth - Question 10
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where did she die?', 'Died Battle Creek Michigan', 'Washington, D.C.', 'New York City', 'Battle Creek, Michigan', 10
FROM red_white_who_individuals WHERE name = 'Sojourner Truth'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Booker T. Washington - Question 1
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Booker T. Washington born?', 'Franklin County Virginia 1856', 'Tuskegee, Alabama', 'Richmond, Virginia', 'Charleston, South Carolina', 1
FROM red_white_who_individuals WHERE name = 'Booker T. Washington'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Booker T. Washington - Question 2
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What test did the teacher give Washington at Hampton?', 'Born into slavery', 'Write an essay', 'Pass an oral exam', 'Sweep a room clean', 2
FROM red_white_who_individuals WHERE name = 'Booker T. Washington'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Booker T. Washington - Question 3
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did Washington found Tuskegee Institute?', 'Hampton Institute education', '1890', '1875', '1881', 3
FROM red_white_who_individuals WHERE name = 'Booker T. Washington'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Booker T. Washington - Question 4
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What trades did students learn at Tuskegee?', 'Tuskegee Institute founder principal', 'Academic subjects only', 'Law and medicine', 'Practical trades like farming and carpentry', 4
FROM red_white_who_individuals WHERE name = 'Booker T. Washington'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Booker T. Washington - Question 5
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Washington''s 1895 speech called?', 'Up From Slavery autobiography', 'Tuskegee Speech', 'Atlanta Compromise', 'Southern Strategy', 5
FROM red_white_who_individuals WHERE name = 'Booker T. Washington'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Booker T. Washington - Question 6
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was his autobiography called?', 'Atlanta Compromise speech', 'The Souls of Black Folk', 'Up From Slavery', 'Black Reconstruction', 6
FROM red_white_who_individuals WHERE name = 'Booker T. Washington'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Booker T. Washington - Question 7
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Which Black leader disagreed with Washington?', 'Vocational education advocate', 'Marcus Garvey', 'W.E.B. Du Bois', 'Frederick Douglass', 7
FROM red_white_who_individuals WHERE name = 'Booker T. Washington'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Booker T. Washington - Question 8
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What is Tuskegee called today?', 'Self-help philosophy promoted', 'Howard University', 'Tuskegee University', 'Morehouse College', 8
FROM red_white_who_individuals WHERE name = 'Booker T. Washington'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Booker T. Washington - Question 9
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many students did Washington start with?', 'Dined White House Roosevelt', 'About 100 students', 'About 30 students', 'About 60 students', 9
FROM red_white_who_individuals WHERE name = 'Booker T. Washington'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Booker T. Washington - Question 10
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How far did Washington travel to reach Hampton?', 'Disagreed W.E.B. Du Bois', 'About 200 miles', 'About 500 miles', 'About 1,000 miles', 10
FROM red_white_who_individuals WHERE name = 'Booker T. Washington'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Dwight D. Eisenhower - Question 1
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where did Eisenhower grow up?', 'Denison Texas 1890', 'Abilene, Kansas', 'Topeka, Kansas', 'Wichita, Kansas', 1
FROM red_white_who_individuals WHERE name = 'Dwight D. Eisenhower'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Dwight D. Eisenhower - Question 2
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What military academy did he attend?', 'West Point Military Academy', 'Annapolis Naval Academy', 'The Citadel', 'West Point', 2
FROM red_white_who_individuals WHERE name = 'Dwight D. Eisenhower'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Dwight D. Eisenhower - Question 3
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What position did Eisenhower hold during D-Day?', 'World War II Supreme Commander', 'Commander of Pacific Forces', 'Supreme Commander of Allied Forces in Europe', 'Commander of American Forces', 3
FROM red_white_who_individuals WHERE name = 'Dwight D. Eisenhower'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Dwight D. Eisenhower - Question 4
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was the date of D-Day?', 'D-Day invasion planner', 'June 5, 1944', 'June 6, 1944', 'June 7, 1944', 4
FROM red_white_who_individuals WHERE name = 'Dwight D. Eisenhower'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Dwight D. Eisenhower - Question 5
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many troops landed at Normandy?', '34th President 1953-1961', 'Over 200,000 troops', 'About 75,000 troops', 'Over 150,000 troops', 5
FROM red_white_who_individuals WHERE name = 'Dwight D. Eisenhower'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Dwight D. Eisenhower - Question 6
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Eisenhower''s campaign slogan?', 'Interstate Highway System', 'We Like Ike', 'Go with Ike', 'I Like Ike', 6
FROM red_white_who_individuals WHERE name = 'Dwight D. Eisenhower'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Dwight D. Eisenhower - Question 7
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What highway system did Eisenhower create?', 'Little Rock Nine protection', 'National Highway System', 'Interstate Highway System', 'Federal Road System', 7
FROM red_white_who_individuals WHERE name = 'Dwight D. Eisenhower'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Dwight D. Eisenhower - Question 8
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Eisenhower do in Little Rock, Arkansas?', 'NASA space agency creation', 'Ordered National Guard to protect Black students', 'Sent federal troops to integrate schools', 'Met with segregationist governors', 8
FROM red_white_who_individuals WHERE name = 'Dwight D. Eisenhower'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Dwight D. Eisenhower - Question 9
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What warning did Eisenhower give in his farewell address?', 'Military-industrial complex warning', 'About the Cold War dangers', 'About the military-industrial complex', 'About government spending', 9
FROM red_white_who_individuals WHERE name = 'Dwight D. Eisenhower'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Dwight D. Eisenhower - Question 10
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What war did Eisenhower end as president?', 'Gettysburg farm retirement', 'World War II', 'Korean War', 'Vietnam War', 10
FROM red_white_who_individuals WHERE name = 'Dwight D. Eisenhower'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Daniel Boone - Question 1
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Daniel Boone born?', 'Berks County Pennsylvania 1734', 'North Carolina', 'Kentucky', 'Pennsylvania', 1
FROM red_white_who_individuals WHERE name = 'Daniel Boone'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Daniel Boone - Question 2
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did Boone first explore Kentucky?', 'Frontier explorer hunter', '1775', '1765', '1769', 2
FROM red_white_who_individuals WHERE name = 'Daniel Boone'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Daniel Boone - Question 3
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What trail did Boone blaze?', 'Kentucky wilderness exploration', 'Cumberland Road', 'National Road', 'Wilderness Road', 3
FROM red_white_who_individuals WHERE name = 'Daniel Boone'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Daniel Boone - Question 4
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What natural passage did the trail go through?', 'Boonesborough settlement founded', 'Appalachian Pass', 'Cumberland Gap', 'Blue Ridge Pass', 4
FROM red_white_who_individuals WHERE name = 'Daniel Boone'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Daniel Boone - Question 5
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What settlement did Boone found?', 'Wilderness Road blazed', 'Harrodsburg', 'Fort Knox', 'Boonesborough', 5
FROM red_white_who_individuals WHERE name = 'Daniel Boone'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Daniel Boone - Question 6
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What happened when Boone was captured in 1778?', 'Captured by Shawnee escaped', 'He escaped immediately', 'He was held for ransom', 'He was adopted by the tribe', 6
FROM red_white_who_individuals WHERE name = 'Daniel Boone'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Daniel Boone - Question 7
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What Shawnee name was Boone given?', 'Revolutionary War service', 'Big Bear', 'Swift Deer', 'Sheltowee (Big Turtle)', 7
FROM red_white_who_individuals WHERE name = 'Daniel Boone'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Daniel Boone - Question 8
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How far did Boone run to warn Boonesborough?', 'Land speculation problems', 'About 50 miles', 'About 100 miles', 'About 160 miles', 8
FROM red_white_who_individuals WHERE name = 'Daniel Boone'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Daniel Boone - Question 9
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many settlers used the Wilderness Road?', 'Missouri Territory final years', 'About 100,000 settlers', 'About 200,000 settlers', 'About 50,000 settlers', 9
FROM red_white_who_individuals WHERE name = 'Daniel Boone'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Daniel Boone - Question 10
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where did Boone die?', 'American frontier legend', 'Kentucky', 'Missouri', 'Tennessee', 10
FROM red_white_who_individuals WHERE name = 'Daniel Boone'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Davy Crockett - Question 1
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Davy Crockett born?', 'Greene County Tennessee 1786', 'Kentucky', 'Alabama', 'Tennessee', 1
FROM red_white_who_individuals WHERE name = 'Davy Crockett'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Davy Crockett - Question 2
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What animal was Crockett famous for hunting?', 'King Wild Frontier nickname', 'Deer', 'Buffalo', 'Bears', 2
FROM red_white_who_individuals WHERE name = 'Davy Crockett'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Davy Crockett - Question 3
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many terms did Crockett serve in Congress?', 'Tennessee frontier childhood', 'Two terms', 'One term', 'Three terms', 3
FROM red_white_who_individuals WHERE name = 'Davy Crockett'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Davy Crockett - Question 4
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Crockett''s motto?', 'Creek War military service', 'Go west, young man', 'Be always sure you are right, then go ahead', 'Don''t give up the ship', 4
FROM red_white_who_individuals WHERE name = 'Davy Crockett'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Davy Crockett - Question 5
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Crockett tell his voters before leaving for Texas?', 'U.S. House Representatives', 'I''m going to California', 'You may all go to Texas', 'You may all go to hell, and I will go to Texas', 5
FROM red_white_who_individuals WHERE name = 'Davy Crockett'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Davy Crockett - Question 6
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was the Alamo?', 'Bear hunting legendary skills', 'A Spanish fort', 'A Mexican prison', 'An old Spanish mission', 6
FROM red_white_who_individuals WHERE name = 'Davy Crockett'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Davy Crockett - Question 7
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many days did the siege last?', 'Opposed Andrew Jackson policies', 'About 7 days', 'About 20 days', 'About 13 days', 7
FROM red_white_who_individuals WHERE name = 'Davy Crockett'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Davy Crockett - Question 8
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'On what date did the final battle occur?', 'Remember the Alamo hero', 'March 2, 1836', 'March 6, 1836', 'February 23, 1836', 8
FROM red_white_who_individuals WHERE name = 'Davy Crockett'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Davy Crockett - Question 9
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What rallying cry came from the Alamo?', 'Texas independence supporter', 'Victory or death', 'Don''t forget Texas', 'Remember the Alamo', 9
FROM red_white_who_individuals WHERE name = 'Davy Crockett'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Davy Crockett - Question 10
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many Texan defenders were at the Alamo?', 'Died Alamo Battle 1836', 'About 50 defenders', 'About 200 defenders', 'About 500 defenders', 10
FROM red_white_who_individuals WHERE name = 'Davy Crockett'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Henry Ford - Question 1
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Henry Ford born?', 'Springwells Township Michigan 1863', 'Detroit, Michigan', 'Dearborn, Michigan', 'Flint, Michigan', 1
FROM red_white_who_individuals WHERE name = 'Henry Ford'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Henry Ford - Question 2
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did Ford build his first car?', 'Farm family mechanical interests', '1890', '1900', '1896', 2
FROM red_white_who_individuals WHERE name = 'Henry Ford'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Henry Ford - Question 3
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When was Ford Motor Company founded?', 'Model T automobile mass production', '1908', '1899', '1903', 3
FROM red_white_who_individuals WHERE name = 'Henry Ford'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Henry Ford - Question 4
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What car did Ford introduce in 1908?', 'Assembly line manufacturing revolution', 'Model A', 'Model S', 'Model T', 4
FROM red_white_who_individuals WHERE name = 'Henry Ford'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Henry Ford - Question 5
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What manufacturing innovation did Ford develop?', 'Ford Motor Company founder', 'Mass production techniques', 'The assembly line', 'Interchangeable parts', 5
FROM red_white_who_individuals WHERE name = 'Henry Ford'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Henry Ford - Question 6
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How much did Ford pay workers per day in 1914?', '5 dollar day workers', 'Three dollars per day', 'Two dollars per day', 'Five dollars per day', 6
FROM red_white_who_individuals WHERE name = 'Henry Ford'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Henry Ford - Question 7
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How long did it take to build a Model T after the assembly line?', 'Affordable cars common people', 'About one week', 'About 93 minutes', 'About 12 hours', 7
FROM red_white_who_individuals WHERE name = 'Henry Ford'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Henry Ford - Question 8
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was the lowest price of a Model T?', 'Highland Park factory', '$500', '$260', '$850', 8
FROM red_white_who_individuals WHERE name = 'Henry Ford'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Henry Ford - Question 9
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many Model Ts were sold total?', 'Anti-Semitic views controversial', 'About 5 million', 'About 25 million', 'About 15 million', 9
FROM red_white_who_individuals WHERE name = 'Henry Ford'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Henry Ford - Question 10
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What is Ford''s lasting legacy?', 'Changed American transportation', 'Making cars affordable for everyone', 'Inventing the automobile', 'Creating the assembly line', 10
FROM red_white_who_individuals WHERE name = 'Henry Ford'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Eleanor Roosevelt - Question 1
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Eleanor Roosevelt born?', 'New York City 1884', 'Hyde Park, New York', 'Albany, New York', 'Washington, D.C.', 1
FROM red_white_who_individuals WHERE name = 'Eleanor Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Eleanor Roosevelt - Question 2
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who was Eleanor''s uncle?', 'Franklin D Roosevelt wife', 'Franklin Roosevelt', 'Theodore Roosevelt', 'Woodrow Wilson', 2
FROM red_white_who_individuals WHERE name = 'Eleanor Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Eleanor Roosevelt - Question 3
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did Eleanor marry Franklin?', 'Redefined First Lady role', '1910', '1900', '1905', 3
FROM red_white_who_individuals WHERE name = 'Eleanor Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Eleanor Roosevelt - Question 4
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Eleanor''s newspaper column called?', 'Great Depression activism', 'First Lady''s Column', 'Daily Reflections', 'My Day', 4
FROM red_white_who_individuals WHERE name = 'Eleanor Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Eleanor Roosevelt - Question 5
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Why did Eleanor resign from the Daughters of the American Revolution?', 'World War II morale', 'They refused membership to Black women', 'They refused to admit Black singer Marian Anderson', 'They supported segregation', 5
FROM red_white_who_individuals WHERE name = 'Eleanor Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Eleanor Roosevelt - Question 6
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What international organization did Eleanor serve?', 'United Nations Human Rights', 'League of Nations', 'Red Cross', 'United Nations', 6
FROM red_white_who_individuals WHERE name = 'Eleanor Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Eleanor Roosevelt - Question 7
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What document did Eleanor help create at the UN?', 'Universal Declaration Human Rights', 'Charter of Human Rights', 'Universal Declaration of Human Rights', 'International Bill of Rights', 7
FROM red_white_who_individuals WHERE name = 'Eleanor Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Eleanor Roosevelt - Question 8
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did President Truman call Eleanor?', 'My Day newspaper column', 'First Lady of the World', 'Greatest First Lady', 'Champion of Human Rights', 8
FROM red_white_who_individuals WHERE name = 'Eleanor Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Eleanor Roosevelt - Question 9
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What disease paralyzed Franklin in 1921?', 'Civil rights advocate', 'Multiple sclerosis', 'Tuberculosis', 'Polio', 9
FROM red_white_who_individuals WHERE name = 'Eleanor Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Eleanor Roosevelt - Question 10
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What made Eleanor unique regarding press conferences?', 'Women''s rights champion', 'She only allowed female reporters', 'She refused to answer political questions', 'She held them daily', 10
FROM red_white_who_individuals WHERE name = 'Eleanor Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Paul Revere - Question 1
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Paul Revere born?', 'Boston Massachusetts 1734', 'Lexington, Massachusetts', 'Concord, Massachusetts', 'Boston, Massachusetts', 1
FROM red_white_who_individuals WHERE name = 'Paul Revere'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Paul Revere - Question 2
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What craft was Revere skilled at?', 'Silversmith artisan craftsman', 'Blacksmith', 'Printer', 'Silversmith', 2
FROM red_white_who_individuals WHERE name = 'Paul Revere'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Paul Revere - Question 3
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What group did Revere belong to?', 'Sons of Liberty member', 'Minutemen', 'Continental Army', 'Sons of Liberty', 3
FROM red_white_who_individuals WHERE name = 'Paul Revere'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Paul Revere - Question 4
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What famous 1773 event did Revere participate in?', 'Boston Tea Party participant', 'The Stamp Act protests', 'The Boston Massacre', 'The Boston Tea Party', 4
FROM red_white_who_individuals WHERE name = 'Paul Revere'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Paul Revere - Question 5
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What date was Revere''s midnight ride?', 'Midnight Ride April 1775', 'April 15, 1775', 'April 19, 1775', 'April 18, 1775', 5
FROM red_white_who_individuals WHERE name = 'Paul Revere'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Paul Revere - Question 6
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What signal was used from Old North Church?', 'Lexington Concord alarm', 'Three lanterns for land, sea, or both', 'One if by land, two if by sea', 'Red for danger, white for safe', 6
FROM red_white_who_individuals WHERE name = 'Paul Revere'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Paul Revere - Question 7
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What warning did Revere call out?', 'British are coming warning', 'To arms, to arms', 'The British are coming', 'The Redcoats are coming', 7
FROM red_white_who_individuals WHERE name = 'Paul Revere'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Paul Revere - Question 8
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What happened to Revere before reaching Concord?', 'Old North Church signals', 'He was killed in battle', 'He made it to Concord', 'He was captured by British patrol', 8
FROM red_white_who_individuals WHERE name = 'Paul Revere'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Paul Revere - Question 9
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What poet made Revere famous?', 'Revolutionary War patriot', 'Ralph Waldo Emerson', 'Walt Whitman', 'Henry Wadsworth Longfellow', 9
FROM red_white_who_individuals WHERE name = 'Paul Revere'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Paul Revere - Question 10
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was the title of the famous poem?', 'Boston Massacre engraving', 'The Midnight Ride', 'Paul Revere''s Ride', 'The Call to Arms', 10
FROM red_white_who_individuals WHERE name = 'Paul Revere'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- James Madison - Question 1
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was James Madison born?', 'Port Conway Virginia 1751', 'Richmond, Virginia', 'Charlottesville, Virginia', 'Port Conway, Virginia', 1
FROM red_white_who_individuals WHERE name = 'James Madison'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- James Madison - Question 2
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What college did Madison attend?', 'Princeton University education', 'Harvard', 'William and Mary', 'Princeton', 2
FROM red_white_who_individuals WHERE name = 'James Madison'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- James Madison - Question 3
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What nickname did Madison earn for his role with the Constitution?', 'Father of Constitution nickname', 'Father of the Revolution', 'Father of Independence', 'Father of the Constitution', 3
FROM red_white_who_individuals WHERE name = 'James Madison'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- James Madison - Question 4
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What famous essays did Madison co-write?', 'Virginia Plan Constitutional Convention', 'The Anti-Federalist Papers', 'The Virginia Plan', 'The Federalist Papers', 4
FROM red_white_who_individuals WHERE name = 'James Madison'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- James Madison - Question 5
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Madison write to protect individual liberties?', 'Federalist Papers co-author', 'The Constitution', 'The Declaration of Rights', 'The Bill of Rights', 5
FROM red_white_who_individuals WHERE name = 'James Madison'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- James Madison - Question 6
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What war dominated Madison''s presidency?', 'Bill of Rights architect', 'Revolutionary War', 'Mexican-American War', 'War of 1812', 6
FROM red_white_who_individuals WHERE name = 'James Madison'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- James Madison - Question 7
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What happened to Washington, D.C. in 1814?', 'Fourth President 1809-1817', 'The Capitol was destroyed', 'The White House was burned', 'Madison was captured', 7
FROM red_white_who_individuals WHERE name = 'James Madison'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- James Madison - Question 8
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Madison''s Virginia home called?', 'War of 1812 leadership', 'Mount Vernon', 'Monticello', 'Montpelier', 8
FROM red_white_who_individuals WHERE name = 'James Madison'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- James Madison - Question 9
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What distinction did Madison hold when he died?', 'Democratic-Republican Party founder', 'Oldest living Founding Father', 'Last surviving signer of Declaration', 'Last surviving Framer of Constitution', 9
FROM red_white_who_individuals WHERE name = 'James Madison'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- James Madison - Question 10
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did Madison die?', 'Montpelier Virginia plantation', '1830', '1840', '1836', 10
FROM red_white_who_individuals WHERE name = 'James Madison'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Patrick Henry - Question 1
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Patrick Henry born?', 'Hanover County Virginia 1736', 'Richmond, Virginia', 'Williamsburg, Virginia', 'Hanover County, Virginia', 1
FROM red_white_who_individuals WHERE name = 'Patrick Henry'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Patrick Henry - Question 2
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What profession did Henry teach himself?', 'Give me liberty death speech', 'Farmer', 'Merchant', 'Lawyer', 2
FROM red_white_who_individuals WHERE name = 'Patrick Henry'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Patrick Henry - Question 3
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What tax did Henry first speak against?', 'Virginia House Burgesses', 'Townshend Acts', 'Tea Act', 'Stamp Act', 3
FROM red_white_who_individuals WHERE name = 'Patrick Henry'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Patrick Henry - Question 4
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Henry say about treason?', 'Anti-Federalist Constitution opponent', 'I have nothing to declare but my genius', 'Give me liberty or give me death', 'If this be treason, make the most of it', 4
FROM red_white_who_individuals WHERE name = 'Patrick Henry'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Patrick Henry - Question 5
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did Henry give his most famous speech?', 'Virginia ratifying convention', 'March 23, 1775', 'July 4, 1776', 'December 16, 1773', 5
FROM red_white_who_individuals WHERE name = 'Patrick Henry'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Patrick Henry - Question 6
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What is the most famous line from that speech?', 'States rights advocate', 'Don''t tread on me', 'United we stand, divided we fall', 'Give me liberty, or give me death', 6
FROM red_white_who_individuals WHERE name = 'Patrick Henry'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Patrick Henry - Question 7
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What position did Henry hold in Virginia?', 'Stamp Act opposition', 'Senator', 'Congressman', 'Governor', 7
FROM red_white_who_individuals WHERE name = 'Patrick Henry'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Patrick Henry - Question 8
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Why did Henry oppose the Constitution?', 'Revolutionary rhetoric', 'It gave too much power to the President', 'It lacked a Bill of Rights', 'It created too many taxes', 8
FROM red_white_who_individuals WHERE name = 'Patrick Henry'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Patrick Henry - Question 9
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Henry demand be added to the Constitution?', 'Virginia Governor five terms', 'The Declaration of Independence', 'A weaker federal government', 'A Bill of Rights', 9
FROM red_white_who_individuals WHERE name = 'Patrick Henry'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Patrick Henry - Question 10
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did Patrick Henry die?', 'Individual liberty champion', '1789', '1803', '1799', 10
FROM red_white_who_individuals WHERE name = 'Patrick Henry'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- John Hancock - Question 1
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was John Hancock born?', 'Braintree Massachusetts 1737', 'Boston, Massachusetts', 'Lexington, Massachusetts', 'Braintree, Massachusetts', 1
FROM red_white_who_individuals WHERE name = 'John Hancock'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- John Hancock - Question 2
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How did Hancock become wealthy?', 'Harvard College education', 'He earned it through trade', 'He won a lottery', 'He inherited it from his uncle', 2
FROM red_white_who_individuals WHERE name = 'John Hancock'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- John Hancock - Question 3
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What position did Hancock hold in the Continental Congress?', 'Boston merchant wealthy', 'Secretary', 'Vice President', 'President', 3
FROM red_white_who_individuals WHERE name = 'John Hancock'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- John Hancock - Question 4
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did Hancock sign the Declaration?', 'Continental Congress president', 'July 4, 1776', 'August 2, 1776', 'July 2, 1776', 4
FROM red_white_who_individuals WHERE name = 'John Hancock'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- John Hancock - Question 5
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was special about Hancock''s signature?', 'Declaration Independence large signature', 'It was the first signature', 'It was the largest and boldest', 'It was in the center', 5
FROM red_white_who_individuals WHERE name = 'John Hancock'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- John Hancock - Question 6
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Why did legend say Hancock signed so large?', 'Sons of Liberty financial support', 'To show his defiance', 'So King George could read it without glasses', 'To take up more space', 6
FROM red_white_who_individuals WHERE name = 'John Hancock'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- John Hancock - Question 7
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What state did Hancock serve as governor?', 'Boston Tea Party supporter', 'Virginia', 'New York', 'Massachusetts', 7
FROM red_white_who_individuals WHERE name = 'John Hancock'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- John Hancock - Question 8
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What does John Hancock mean today?', 'Massachusetts Governor', 'A signature', 'A type of handshake', 'An insurance policy', 8
FROM red_white_who_individuals WHERE name = 'John Hancock'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- John Hancock - Question 9
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did Hancock die?', 'Revolutionary War funding', '1785', '1800', '1793', 9
FROM red_white_who_individuals WHERE name = 'John Hancock'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- John Hancock - Question 10
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What caused the British to target Hancock?', 'Hancock Insurance legacy', 'He refused to pay taxes', 'His ship was seized for smuggling', 'He protested British goods', 10
FROM red_white_who_individuals WHERE name = 'John Hancock'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Samuel Adams - Question 1
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Samuel Adams born?', 'Boston Massachusetts 1722', 'Plymouth, Massachusetts', 'Braintree, Massachusetts', 'Boston, Massachusetts', 1
FROM red_white_who_individuals WHERE name = 'Samuel Adams'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Samuel Adams - Question 2
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What group did Adams help found?', 'Harvard College cousin John', 'Minutemen', 'Continental Army', 'Sons of Liberty', 2
FROM red_white_who_individuals WHERE name = 'Samuel Adams'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Samuel Adams - Question 3
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What 1773 event did Adams help plan?', 'Boston Tea Party organizer', 'The Stamp Act riots', 'The Boston Massacre', 'The Boston Tea Party', 3
FROM red_white_who_individuals WHERE name = 'Samuel Adams'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Samuel Adams - Question 4
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did committees of correspondence do?', 'Sons of Liberty founding', 'Organized protests throughout colonies', 'Delivered newspapers', 'Spread revolutionary ideas', 4
FROM red_white_who_individuals WHERE name = 'Samuel Adams'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Samuel Adams - Question 5
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What event did Adams publicize?', 'Committees Correspondence creator', 'The Intolerable Acts', 'The Stamp Act passage', 'The Boston Massacre', 5
FROM red_white_who_individuals WHERE name = 'Samuel Adams'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Samuel Adams - Question 6
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What document did Adams sign in 1776?', 'Boston Massacre propaganda', 'The Constitution', 'The Declaration of Independence', 'The Articles of Confederation', 6
FROM red_white_who_individuals WHERE name = 'Samuel Adams'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Samuel Adams - Question 7
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What position did Adams hold in Massachusetts?', 'Anti-British agitator', 'Senator', 'Congressman', 'Governor', 7
FROM red_white_who_individuals WHERE name = 'Samuel Adams'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Samuel Adams - Question 8
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Thomas Jefferson call Adams?', 'Continental Congress delegate', 'Father of American Independence', 'Truly the Man of the Revolution', 'Leader of Liberty', 8
FROM red_white_who_individuals WHERE name = 'Samuel Adams'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Samuel Adams - Question 9
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did Samuel Adams die?', 'Massachusetts ratifying convention', '1800', '1810', '1803', 9
FROM red_white_who_individuals WHERE name = 'Samuel Adams'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Samuel Adams - Question 10
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Adams''s greatest skill?', 'Revolutionary movement catalyst', 'Public speaking', 'Writing pamphlets', 'Organizing and agitating', 10
FROM red_white_who_individuals WHERE name = 'Samuel Adams'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Robert E. Lee - Question 1
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Robert E. Lee born?', 'Westmoreland County Virginia 1807', 'Richmond, Virginia', 'Arlington, Virginia', 'Westmoreland County, Virginia', 1
FROM red_white_who_individuals WHERE name = 'Robert E. Lee'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Robert E. Lee - Question 2
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who was Lee''s famous father?', 'West Point Military Academy', 'George Washington', 'Light Horse Harry Lee', 'Thomas Jefferson', 2
FROM red_white_who_individuals WHERE name = 'Robert E. Lee'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Robert E. Lee - Question 3
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Lee''s rank at West Point?', 'Mexican-American War hero', 'First in his class', 'Third in his class', 'Second in his class', 3
FROM red_white_who_individuals WHERE name = 'Robert E. Lee'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Robert E. Lee - Question 4
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What job did Lincoln offer Lee?', 'Arlington plantation family', 'Secretary of War', 'Command of the Union Army', 'Ambassador to England', 4
FROM red_white_who_individuals WHERE name = 'Robert E. Lee'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Robert E. Lee - Question 5
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Why did Lee decline?', 'Resigned U.S. Army', 'He supported the Confederacy', 'He couldn''t fight against Virginia', 'He opposed Lincoln', 5
FROM red_white_who_individuals WHERE name = 'Robert E. Lee'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Robert E. Lee - Question 6
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What Confederate army did Lee command?', 'Confederate States Army commander', 'Army of the Potomac', 'Confederate States Army', 'Army of Northern Virginia', 6
FROM red_white_who_individuals WHERE name = 'Robert E. Lee'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Robert E. Lee - Question 7
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What battle was a turning point against Lee?', 'Virginia secession reluctant', 'Antietam', 'Fredericksburg', 'Gettysburg', 7
FROM red_white_who_individuals WHERE name = 'Robert E. Lee'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Robert E. Lee - Question 8
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where did Lee surrender?', 'Military genius tactician', 'Richmond, Virginia', 'Washington, D.C.', 'Appomattox Court House', 8
FROM red_white_who_individuals WHERE name = 'Robert E. Lee'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Robert E. Lee - Question 9
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Lee do after the war?', 'Appomattox surrender 1865', 'Went into exile', 'Became a college president', 'Returned to his plantation', 9
FROM red_white_who_individuals WHERE name = 'Robert E. Lee'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Robert E. Lee - Question 10
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did Lee die?', 'Washington College president', '1865', '1875', '1870', 10
FROM red_white_who_individuals WHERE name = 'Robert E. Lee'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Andrew Jackson - Question 1
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Andrew Jackson born?', 'Carolinas border region 1767', 'Tennessee', 'Virginia', 'The Carolinas border region', 1
FROM red_white_who_individuals WHERE name = 'Andrew Jackson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Andrew Jackson - Question 2
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How old was Jackson in the Revolutionary War?', 'Orphaned Revolutionary War', '15 years old', '10 years old', '13 years old', 2
FROM red_white_who_individuals WHERE name = 'Andrew Jackson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Andrew Jackson - Question 3
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What battle made Jackson a hero?', 'Tennessee frontier lawyer', 'Battle of Tippecanoe', 'Battle of Horseshoe Bend', 'Battle of New Orleans', 3
FROM red_white_who_individuals WHERE name = 'Andrew Jackson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Andrew Jackson - Question 4
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When was Jackson elected president?', 'War of 1812 hero', '1824', '1832', '1828', 4
FROM red_white_who_individuals WHERE name = 'Andrew Jackson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Andrew Jackson - Question 5
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How did Jackson expand democracy?', 'Battle New Orleans victory', 'Ended slavery in new territories', 'Eliminated property requirements for voting', 'Gave women the right to vote', 5
FROM red_white_who_individuals WHERE name = 'Andrew Jackson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Andrew Jackson - Question 6
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What controversial act did Jackson sign?', 'Seventh President 1829-1837', 'Fugitive Slave Act', 'Homestead Act', 'Indian Removal Act', 6
FROM red_white_who_individuals WHERE name = 'Andrew Jackson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Andrew Jackson - Question 7
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was the Trail of Tears?', 'Democratic Party founder', 'Voluntary relocation of Native Americans', 'Forced removal of Native Americans from their lands', 'A peace treaty with Native tribes', 7
FROM red_white_who_individuals WHERE name = 'Andrew Jackson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Andrew Jackson - Question 8
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What nickname did Jackson have?', 'Indian Removal Act', 'Iron Andrew', 'King Andrew', 'Old Hickory', 8
FROM red_white_who_individuals WHERE name = 'Andrew Jackson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Andrew Jackson - Question 9
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did Jackson die?', 'Spoils system politics', '1850', '1840', '1845', 9
FROM red_white_who_individuals WHERE name = 'Andrew Jackson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Andrew Jackson - Question 10
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Why is Jackson''s legacy complicated?', 'Old Hickory nickname', 'He expanded democracy but harmed Native Americans', 'He was only a military hero', 'He was completely good or bad', 10
FROM red_white_who_individuals WHERE name = 'Andrew Jackson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- John Muir - Question 1
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was John Muir born?', 'Dunbar Scotland 1838', 'Wisconsin', 'California', 'Scotland', 1
FROM red_white_who_individuals WHERE name = 'John Muir'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- John Muir - Question 2
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What made Muir dedicate his life to nature?', 'Wisconsin farm childhood', 'A near-death hiking accident', 'A factory accident that nearly blinded him', 'The death of his father', 2
FROM red_white_who_individuals WHERE name = 'John Muir'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- John Muir - Question 3
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What California valley amazed Muir?', 'University Wisconsin studies', 'Sequoia Valley', 'Yellowstone', 'Yosemite Valley', 3
FROM red_white_who_individuals WHERE name = 'John Muir'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- John Muir - Question 4
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What organization did Muir found?', 'Yosemite Valley advocacy', 'National Parks Service', 'Audubon Society', 'Sierra Club', 4
FROM red_white_who_individuals WHERE name = 'John Muir'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- John Muir - Question 5
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Which president did Muir convince to protect wilderness?', 'Sierra Club founder president', 'William Howard Taft', 'Woodrow Wilson', 'Theodore Roosevelt', 5
FROM red_white_who_individuals WHERE name = 'John Muir'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- John Muir - Question 6
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where did Muir and Roosevelt camp?', 'Wilderness preservation philosophy', 'Yellowstone', 'Sequoia', 'Yosemite', 6
FROM red_white_who_individuals WHERE name = 'John Muir'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- John Muir - Question 7
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What nickname is Muir given?', 'National parks creation', 'Father of Conservation', 'Wilderness Man', 'Father of the National Parks', 7
FROM red_white_who_individuals WHERE name = 'John Muir'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- John Muir - Question 8
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did Muir die?', 'Theodore Roosevelt camping', '1920', '1904', '1914', 8
FROM red_white_who_individuals WHERE name = 'John Muir'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- John Muir - Question 9
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What valley did Muir explore extensively?', 'Nature writing influential', 'Sequoia Valley', 'Yellowstone', 'Yosemite', 9
FROM red_white_who_individuals WHERE name = 'John Muir'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- John Muir - Question 10
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What inspired Muir''s writings?', 'Environmental movement founder', 'His love of wilderness and nature', 'Scientific research', 'Political activism', 10
FROM red_white_who_individuals WHERE name = 'John Muir'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Mark Twain - Question 1
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Mark Twain''s real name?', 'Florida Missouri 1835', 'Hartford, Connecticut', 'Hannibal, Missouri', 'Florida, Missouri', 1
FROM red_white_who_individuals WHERE name = 'Mark Twain'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Mark Twain - Question 2
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was he born?', 'Mississippi River steamboat pilot', 'Nevada', 'Connecticut', 'Missouri', 2
FROM red_white_who_individuals WHERE name = 'Mark Twain'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Mark Twain - Question 3
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What town inspired his works?', 'Samuel Clemens real name', 'St. Louis', 'New Orleans', 'Hannibal', 3
FROM red_white_who_individuals WHERE name = 'Mark Twain'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Mark Twain - Question 4
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What job did Twain have before writing?', 'California gold rush journalism', 'Newspaper reporter', 'Steamboat pilot', 'Gold miner', 4
FROM red_white_who_individuals WHERE name = 'Mark Twain'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Mark Twain - Question 5
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where did his pen name come from?', 'Adventures Tom Sawyer', 'A Mississippi steamboat term', 'His childhood nickname', 'A card game term', 5
FROM red_white_who_individuals WHERE name = 'Mark Twain'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Mark Twain - Question 6
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What are his two most famous books?', 'Adventures Huckleberry Finn', 'Life on the Mississippi and A Connecticut Yankee', 'Tom Sawyer and Huckleberry Finn', 'The Prince and the Pauper and Pudd''nhead Wilson', 6
FROM red_white_who_individuals WHERE name = 'Mark Twain'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Mark Twain - Question 7
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When was Huckleberry Finn published?', 'Connecticut Yankee satire', '1880', '1876', '1884', 7
FROM red_white_who_individuals WHERE name = 'Mark Twain'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Mark Twain - Question 8
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Twain criticize?', 'Lecture circuit humorist', 'Slavery and politics', 'Hypocrisy and injustice', 'Religion and government', 8
FROM red_white_who_individuals WHERE name = 'Mark Twain'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Mark Twain - Question 9
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did Twain die?', 'American literature father', '1900', '1915', '1910', 9
FROM red_white_who_individuals WHERE name = 'Mark Twain'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Mark Twain - Question 10
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Faulkner call Twain?', 'Wit wisdom quotations', 'The grandfather of American literature', 'The father of American literature', 'The greatest American writer', 10
FROM red_white_who_individuals WHERE name = 'Mark Twain'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Thurgood Marshall - Question 1
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Thurgood Marshall born?', 'Baltimore Maryland 1908', 'Washington, D.C.', 'Richmond, Virginia', 'Baltimore, Maryland', 1
FROM red_white_who_individuals WHERE name = 'Thurgood Marshall'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Thurgood Marshall - Question 2
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Why couldn''t Marshall attend University of Maryland Law School?', 'Howard University Law School', 'He couldn''t afford tuition', 'He was Black', 'His grades were too low', 2
FROM red_white_who_individuals WHERE name = 'Thurgood Marshall'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Thurgood Marshall - Question 3
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What law school did Marshall attend?', 'NAACP Legal Defense Fund', 'Yale Law School', 'Harvard Law School', 'Howard University Law School', 3
FROM red_white_who_individuals WHERE name = 'Thurgood Marshall'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Thurgood Marshall - Question 4
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What organization did Marshall work for?', 'Brown Board Education attorney', 'Urban League', 'NAACP Legal Defense Fund', 'Southern Poverty Law Center', 4
FROM red_white_who_individuals WHERE name = 'Thurgood Marshall'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Thurgood Marshall - Question 5
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Marshall''s most famous Supreme Court victory?', 'Separate but equal challenge', 'Plessy v. Ferguson', 'Brown v. Board of Education', 'Loving v. Virginia', 5
FROM red_white_who_individuals WHERE name = 'Thurgood Marshall'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Thurgood Marshall - Question 6
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Brown v. Board rule unconstitutional?', 'Civil rights legal strategy', 'Voter discrimination', 'School segregation', 'Housing discrimination', 6
FROM red_white_who_individuals WHERE name = 'Thurgood Marshall'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Thurgood Marshall - Question 7
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When was Marshall appointed to the Supreme Court?', 'Supreme Court first African American', '1965', '1970', '1967', 7
FROM red_white_who_individuals WHERE name = 'Thurgood Marshall'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Thurgood Marshall - Question 8
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What distinction did Marshall achieve?', 'Mr. Civil Rights nickname', 'First Black Solicitor General', 'First Black federal judge', 'First Black Supreme Court Justice', 8
FROM red_white_who_individuals WHERE name = 'Thurgood Marshall'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Thurgood Marshall - Question 9
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How long did Marshall serve on the Court?', 'Constitutional law expert', 'About 15 years', 'About 30 years', 'About 24 years', 9
FROM red_white_who_individuals WHERE name = 'Thurgood Marshall'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Thurgood Marshall - Question 10
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did Marshall die?', 'Legal precedent establishment', '1990', '1995', '1993', 10
FROM red_white_who_individuals WHERE name = 'Thurgood Marshall'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- John Lewis - Question 1
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was John Lewis born?', 'Troy Alabama 1940', 'Atlanta, Georgia', 'Montgomery, Alabama', 'Troy, Alabama', 1
FROM red_white_who_individuals WHERE name = 'John Lewis'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- John Lewis - Question 2
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What organization did Lewis lead?', 'Student Nonviolent Coordinating Committee', 'Southern Christian Leadership Conference', 'NAACP', 'Student Nonviolent Coordinating Committee', 2
FROM red_white_who_individuals WHERE name = 'John Lewis'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- John Lewis - Question 3
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How old was Lewis at the March on Washington?', 'Freedom Riders participation', '25 years old', '21 years old', '23 years old', 3
FROM red_white_who_individuals WHERE name = 'John Lewis'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- John Lewis - Question 4
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What happened on Bloody Sunday?', 'Selma Montgomery march', 'Marchers were attacked by police', 'Lewis was arrested', 'The march was canceled', 4
FROM red_white_who_individuals WHERE name = 'John Lewis'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- John Lewis - Question 5
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What injury did Lewis suffer?', 'Bloody Sunday Pettus Bridge', 'A broken arm', 'A fractured skull', 'A concussion', 5
FROM red_white_who_individuals WHERE name = 'John Lewis'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- John Lewis - Question 6
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How long did Lewis serve in Congress?', 'March Washington youngest speaker', '25 years', '40 years', '33 years', 6
FROM red_white_who_individuals WHERE name = 'John Lewis'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- John Lewis - Question 7
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Lewis called in Congress?', 'Good trouble philosophy', 'Voice of Civil Rights', 'Conscience of the Congress', 'Last Civil Rights Leader', 7
FROM red_white_who_individuals WHERE name = 'John Lewis'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- John Lewis - Question 8
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What phrase did Lewis use about fighting injustice?', 'Georgia Congressman 33 years', 'Good fight', 'Necessary trouble', 'Good trouble', 8
FROM red_white_who_individuals WHERE name = 'John Lewis'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- John Lewis - Question 9
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did John Lewis die?', 'Civil rights icon', '2018', '2022', '2020', 9
FROM red_white_who_individuals WHERE name = 'John Lewis'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- John Lewis - Question 10
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What inspired young Lewis?', 'Voting rights advocate', 'Frederick Douglass', 'Rosa Parks', 'Martin Luther King Jr.', 10
FROM red_white_who_individuals WHERE name = 'John Lewis'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Walt Disney - Question 1
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Walt Disney born?', 'Chicago Illinois 1901', 'Anaheim, California', 'Orlando, Florida', 'Chicago, Illinois', 1
FROM red_white_who_individuals WHERE name = 'Walt Disney'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Walt Disney - Question 2
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What character did Disney create in 1928?', 'Kansas City animation start', 'Oswald the Lucky Rabbit', 'Donald Duck', 'Mickey Mouse', 2
FROM red_white_who_individuals WHERE name = 'Walt Disney'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Walt Disney - Question 3
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What made Steamboat Willie special?', 'Mickey Mouse creation 1928', 'It was the first animated film', 'It was the first with synchronized sound', 'It was in color', 3
FROM red_white_who_individuals WHERE name = 'Walt Disney'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Walt Disney - Question 4
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was the first full-length animated film?', 'Snow White first feature', 'Fantasia', 'Pinocchio', 'Snow White and the Seven Dwarfs', 4
FROM red_white_who_individuals WHERE name = 'Walt Disney'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Walt Disney - Question 5
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many Academy Awards did Disney win?', 'Disneyland theme park', '32 Academy Awards', '15 Academy Awards', '22 Academy Awards', 5
FROM red_white_who_individuals WHERE name = 'Walt Disney'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Walt Disney - Question 6
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did Disneyland open?', 'Disney World Florida', '1960', '1950', '1955', 6
FROM red_white_who_individuals WHERE name = 'Walt Disney'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Walt Disney - Question 7
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Disney planning when he died?', 'Family entertainment revolution', 'EPCOT Center', 'Walt Disney World', 'Disney Studios', 7
FROM red_white_who_individuals WHERE name = 'Walt Disney'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Walt Disney - Question 8
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did Walt Disney die?', 'Animation technology innovation', 'December 5, 1966', 'December 25, 1966', 'December 15, 1966', 8
FROM red_white_who_individuals WHERE name = 'Walt Disney'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Walt Disney - Question 9
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Disney show about imagination?', 'California Institute Arts', 'Anyone can achieve their dreams', 'Imagination has no limits', 'If you can dream it, you can do it', 9
FROM red_white_who_individuals WHERE name = 'Walt Disney'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Walt Disney - Question 10
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What company did Disney create?', 'Disney Company empire', 'Mickey Mouse Productions', 'Walt Disney Studios', 'The Walt Disney Company', 10
FROM red_white_who_individuals WHERE name = 'Walt Disney'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Cesar Chavez - Question 1
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Cesar Chavez born?', 'Yuma Arizona 1927', 'California', 'New Mexico', 'Arizona', 1
FROM red_white_who_individuals WHERE name = 'Cesar Chavez'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Cesar Chavez - Question 2
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What happened to Chavez''s family during the Depression?', 'Mexican-American farm family', 'His father died', 'They lost their farm and became migrant workers', 'They moved to the city', 2
FROM red_white_who_individuals WHERE name = 'Cesar Chavez'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Cesar Chavez - Question 3
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What organization did Chavez found?', 'United Farm Workers founder', 'Farm Workers Union', 'Agricultural Workers Association', 'United Farm Workers', 3
FROM red_white_who_individuals WHERE name = 'Cesar Chavez'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Cesar Chavez - Question 4
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Chavez''s most famous boycott?', 'Delano grape strike leader', 'Lettuce boycott', 'Grape boycott', 'Strawberry boycott', 4
FROM red_white_who_individuals WHERE name = 'Cesar Chavez'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Cesar Chavez - Question 5
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How long did the grape boycott last?', 'Nonviolent protest methods', 'Two years', 'Ten years', 'Five years', 5
FROM red_white_who_individuals WHERE name = 'Cesar Chavez'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Cesar Chavez - Question 6
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What type of protest did Chavez believe in?', 'Hunger strikes protest', 'Armed resistance', 'Strikes only', 'Nonviolent protest', 6
FROM red_white_who_individuals WHERE name = 'Cesar Chavez'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Cesar Chavez - Question 7
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Chavez''s longest hunger strike?', 'Si se puede yes we can', '21 days', '14 days', '36 days', 7
FROM red_white_who_individuals WHERE name = 'Cesar Chavez'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Cesar Chavez - Question 8
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did Chavez die?', 'Agricultural workers rights', '1998', '1988', '1993', 8
FROM red_white_who_individuals WHERE name = 'Cesar Chavez'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Cesar Chavez - Question 9
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What award was Chavez given after death?', 'Chicano civil rights', 'Congressional Gold Medal', 'Presidential Medal of Freedom', 'Nobel Peace Prize', 9
FROM red_white_who_individuals WHERE name = 'Cesar Chavez'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Cesar Chavez - Question 10
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Chavez''s Spanish motto?', 'Labor organizing legacy', 'Viva la causa', 'Juntos podemos', 'Si se puede', 10
FROM red_white_who_individuals WHERE name = 'Cesar Chavez'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Sitting Bull - Question 1
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When was Sitting Bull born?', 'Grand River South Dakota 1831', 'Around 1835', 'Around 1840', 'Around 1831', 1
FROM red_white_who_individuals WHERE name = 'Sitting Bull'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Sitting Bull - Question 2
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What tribe was Sitting Bull a leader of?', 'Hunkpapa Lakota chief', 'Cheyenne', 'Apache', 'Lakota Sioux', 2
FROM red_white_who_individuals WHERE name = 'Sitting Bull'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Sitting Bull - Question 3
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What happened at the Battle of Little Bighorn?', 'Little Bighorn victory Custer', 'Custer escaped', 'The Native Americans lost', 'Custer and his men were defeated', 3
FROM red_white_who_individuals WHERE name = 'Sitting Bull'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Sitting Bull - Question 4
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did the Battle of Little Bighorn occur?', 'Resistance reservation system', 'June 1877', 'June 1875', 'June 1876', 4
FROM red_white_who_individuals WHERE name = 'Sitting Bull'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Sitting Bull - Question 5
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where did Sitting Bull flee after the battle?', 'Buffalo hunting traditional life', 'Mexico', 'Montana Territory', 'Canada', 5
FROM red_white_who_individuals WHERE name = 'Sitting Bull'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Sitting Bull - Question 6
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Sitting Bull living when he died?', 'Wild West Show performer', 'A Lakota village', 'Standing Rock Reservation', 'Pine Ridge Reservation', 6
FROM red_white_who_individuals WHERE name = 'Sitting Bull'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Sitting Bull - Question 7
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How did Sitting Bull die?', 'Native American sovereignty', 'In battle against soldiers', 'Killed by Indian police', 'From illness', 7
FROM red_white_who_individuals WHERE name = 'Sitting Bull'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Sitting Bull - Question 8
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Sitting Bull symbolize?', 'Wounded Knee aftermath', 'Peaceful coexistence', 'Native American resistance', 'Treaty negotiations', 8
FROM red_white_who_individuals WHERE name = 'Sitting Bull'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Sitting Bull - Question 9
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who was Crazy Horse?', 'Spiritual leader warrior', 'A U.S. Army general', 'Another Lakota chief', 'A fellow Lakota leader who fought alongside him', 9
FROM red_white_who_individuals WHERE name = 'Sitting Bull'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Sitting Bull - Question 10
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many soldiers did Custer lose?', 'Killed Indian police 1890', 'About 100 soldiers', 'About 350 soldiers', 'About 200 soldiers', 10
FROM red_white_who_individuals WHERE name = 'Sitting Bull'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Audie Murphy - Question 1
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Audie Murphy born?', 'Kingston Texas 1925', 'Dallas, Texas', 'Austin, Texas', 'Kingston, Texas', 1
FROM red_white_who_individuals WHERE name = 'Audie Murphy'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Audie Murphy - Question 2
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Why was Murphy initially rejected from the military?', 'World War II most decorated', 'He was too young', 'He was too small and young', 'He had a medical condition', 2
FROM red_white_who_individuals WHERE name = 'Audie Murphy'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Audie Murphy - Question 3
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How old was Murphy when he joined the Army?', 'Medal Honor recipient', '18 years old', '16 years old', '17 years old', 3
FROM red_white_who_individuals WHERE name = 'Audie Murphy'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Audie Murphy - Question 4
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many times was Murphy wounded?', 'European theater combat', 'Once', 'Five times', 'Three times', 4
FROM red_white_who_individuals WHERE name = 'Audie Murphy'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Audie Murphy - Question 5
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What happened at Holtzwihr, France?', 'Hollywood actor career', 'He single-handedly held off German forces', 'He rescued wounded soldiers', 'He captured an enemy position', 5
FROM red_white_who_individuals WHERE name = 'Audie Murphy'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Audie Murphy - Question 6
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What is the highest military award Murphy received?', 'To Hell and Back autobiography', 'Silver Star', 'Distinguished Service Cross', 'Medal of Honor', 6
FROM red_white_who_individuals WHERE name = 'Audie Murphy'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Audie Murphy - Question 7
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many awards did Murphy earn?', 'PTSD advocate veteran', 'About 20 awards', 'About 40 awards', 'About 33 awards', 7
FROM red_white_who_individuals WHERE name = 'Audie Murphy'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Audie Murphy - Question 8
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What career did Murphy have after the war?', 'B-western movies', 'Businessman', 'Movie actor', 'Politician', 8
FROM red_white_who_individuals WHERE name = 'Audie Murphy'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Audie Murphy - Question 9
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What condition did Murphy help bring attention to?', 'Small town Texas origins', 'Traumatic brain injury', 'Agent Orange exposure', 'Post-traumatic stress disorder', 9
FROM red_white_who_individuals WHERE name = 'Audie Murphy'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Audie Murphy - Question 10
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where is Murphy buried?', 'American hero courage', 'Arlington National Cemetery', 'His hometown in Texas', 'The Tomb of the Unknown Soldier', 10
FROM red_white_who_individuals WHERE name = 'Audie Murphy'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Pocahontas - Question 1
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When was Pocahontas born?', 'Werowocomoco Virginia 1596', 'Around 1600', 'Around 1590', 'Around 1596', 1
FROM red_white_who_individuals WHERE name = 'Pocahontas'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Pocahontas - Question 2
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who was Pocahontas''s father?', 'Powhatan tribe daughter', 'Massasoit', 'Sitting Bull', 'Chief Powhatan', 2
FROM red_white_who_individuals WHERE name = 'Pocahontas'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Pocahontas - Question 3
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What does the name Pocahontas mean?', 'Jamestown settlement contact', 'Brave girl', 'River daughter', 'Playful one', 3
FROM red_white_who_individuals WHERE name = 'Pocahontas'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Pocahontas - Question 4
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who did Pocahontas reportedly save?', 'John Smith relationship legendary', 'Miles Standish', 'John Rolfe', 'Captain John Smith', 4
FROM red_white_who_individuals WHERE name = 'Pocahontas'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Pocahontas - Question 5
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How did Pocahontas help Jamestown?', 'Cultural bridge Native English', 'By trading goods with them', 'By bringing food and delivering messages', 'By translating for them', 5
FROM red_white_who_individuals WHERE name = 'Pocahontas'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Pocahontas - Question 6
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who did Pocahontas marry?', 'Captured by English colonists', 'Captain John Smith', 'Thomas Dale', 'John Rolfe', 6
FROM red_white_who_individuals WHERE name = 'Pocahontas'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Pocahontas - Question 7
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where did Pocahontas travel in 1616?', 'Converted Christianity Rebecca', 'Spain', 'France', 'England', 7
FROM red_white_who_individuals WHERE name = 'Pocahontas'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Pocahontas - Question 8
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Pocahontas''s Christian name?', 'Married John Rolfe tobacco', 'Mary', 'Elizabeth', 'Rebecca', 8
FROM red_white_who_individuals WHERE name = 'Pocahontas'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Pocahontas - Question 9
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How old was Pocahontas when she died?', 'London England visit', 'About 25 years old', 'About 18 years old', 'About 21 years old', 9
FROM red_white_who_individuals WHERE name = 'Pocahontas'
ON CONFLICT (individual_id, question_text) DO NOTHING;

-- Pocahontas - Question 10
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where did Pocahontas die?', 'Died England 1617', 'Virginia', 'Jamestown', 'Gravesend, England', 10
FROM red_white_who_individuals WHERE name = 'Pocahontas'
ON CONFLICT (individual_id, question_text) DO NOTHING;
