-- Red White and Who Individuals and Questions
-- Generated from American_History_Icons_for_Kids.xlsx
-- 
-- NOTE: This file contains 49 individuals with biographical information and questions.
-- The questions have placeholder answers that need to be filled in manually.
-- Each question needs: correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3
--
-- To use this file:
-- 1. Run create_red_white_who_tables.sql first to create the tables
-- 2. Review and update the placeholder answers in this file
-- 3. Run this file in Supabase SQL Editor
--

-- Individual: George Washington
INSERT INTO red_white_who_individuals (name, birth_year, death_year, birth_date, death_date, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery)
VALUES (
  'George Washington',
  1732,
  1799,
  NULL,
  NULL,
  ARRAY['First President of the United States and Commander of the Continental Army'],
  '{"notes":"Born in Westmoreland County, Virginia; Served as Commander-in-Chief during Revolutionary War; Unanimously elected as first U.S. President (1789-1797); Established many presidential traditions; Voluntarily stepped down after two terms; Known as Father of His Country"}',
  'George Washington is one of the most important people in American history. He helped create the United States and became its first president. People called him the "Father of His Country" because of everything he did to help America become a free nation.

Washington was born on February 22, 1732, in Virginia. When he was young, he learned to be a surveyor, which meant he measured land and made maps. This job took him into the wilderness, where he learned about the frontier and how to survive in tough conditions. These skills would help him later as a military leader.

Before the Revolutionary War, Washington fought in the French and Indian War as a young officer. He learned important lessons about battle and leadership, even though he experienced both victories and defeats. After the war, he became a successful farmer at his home called Mount Vernon in Virginia.

When the American colonies decided to fight for independence from Britain, the Continental Congress chose Washington to lead the Continental Army in 1775. This was an incredibly difficult job. His soldiers often did not have enough food, clothing, or weapons. Many of them were farmers, not trained soldiers. But Washington never gave up.

The winter at Valley Forge in 1777-1778 was one of the hardest times. The army camped in freezing weather with little food or warm clothing. Many soldiers got sick. But Washington stayed with his men and helped them survive. He trained them to be better soldiers. When spring came, they were ready to fight harder than ever.

Washington led his army to many important victories. One of his cleverest moves was crossing the Delaware River on Christmas night in 1776 to surprise enemy soldiers at Trenton, New Jersey. The final big victory came at Yorktown in 1781, when British General Cornwallis surrendered. America had won its independence!

After the war, something amazing happened. Washington could have become a king or a dictator because he was so popular. But he believed in the new republic and gave up his power to go home to his farm. When the country needed a new Constitution, Washington came back to lead the convention that created it.

In 1789, Washington was elected as the first President of the United States. Everyone voted for him, making him the only president to win unanimously! As president, he established many traditions that presidents still follow today. He created the Cabinet, a group of advisors who help the president make decisions. He also decided to step down after two terms, setting an example that most presidents followed until it became law.

Washington died on December 14, 1799. He was 67 years old. People across the country mourned the loss of their greatest hero. His friend Henry Lee said Washington was "first in war, first in peace, and first in the hearts of his countrymen."

Today, we honor Washington in many ways. Our nation''s capital is named after him. His face is on the one-dollar bill and the quarter. But his greatest legacy is the example he set: a leader who fought for freedom and then gave up power peacefully. That is why George Washington will always be remembered as one of America''s greatest heroes.',
  NULL,
  '[]'::JSONB
)
RETURNING individual_id;

-- Questions for George Washington
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What year was George Washington born, and in which state?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 1
FROM red_white_who_individuals WHERE name = 'George Washington'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What job did Washington have as a young man that taught him about the wilderness?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 2
FROM red_white_who_individuals WHERE name = 'George Washington'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was the name of Washington''s Virginia home?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 3
FROM red_white_who_individuals WHERE name = 'George Washington'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'In what year was Washington chosen to lead the Continental Army?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 4
FROM red_white_who_individuals WHERE name = 'George Washington'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What difficult winter camp tested the Continental Army in 1777-1778?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 5
FROM red_white_who_individuals WHERE name = 'George Washington'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What river did Washington famously cross on Christmas night 1776?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 6
FROM red_white_who_individuals WHERE name = 'George Washington'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What 1781 battle ended the Revolutionary War with a British surrender?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 7
FROM red_white_who_individuals WHERE name = 'George Washington'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many terms did Washington serve as president before stepping down?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 8
FROM red_white_who_individuals WHERE name = 'George Washington'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Why is Washington called the Father of His Country?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 9
FROM red_white_who_individuals WHERE name = 'George Washington'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What two things have Washington''s face on them that you might use today?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 10
FROM red_white_who_individuals WHERE name = 'George Washington'
ON CONFLICT (individual_id, question_text) DO NOTHING;


-- Individual: Benjamin Franklin
INSERT INTO red_white_who_individuals (name, birth_year, death_year, birth_date, death_date, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery)
VALUES (
  'Benjamin Franklin',
  1706,
  1790,
  NULL,
  NULL,
  ARRAY['Founding Father', 'inventor', 'and diplomat who helped win French support for American independence'],
  '{"notes":"Born in Boston, Massachusetts; Self-taught reader and writer; Founded the Pennsylvania Gazette and Poor Richard''s Almanack; Invented the lightning rod, bifocals, and Franklin stove; Proved lightning was electricity with famous kite experiment; Helped write the Declaration of Independence; Convinced France to help America win the Revolution"}',
  'Benjamin Franklin was one of the most amazing people in American history. He was an inventor, scientist, writer, and one of the Founding Fathers who helped create the United States. He proved that you do not need to be born rich or go to fancy schools to achieve great things.

Franklin was born in Boston on January 17, 1706. He was the fifteenth of seventeen children! His family did not have much money, so Benjamin only went to school for two years. But he loved learning and taught himself by reading every book he could find.

When he was twelve years old, Benjamin became an apprentice to his older brother James, who was a printer. Benjamin learned how to print newspapers and books. He also secretly wrote funny articles for his brother''s newspaper, pretending to be a middle-aged woman named "Silence Dogood." When James found out his little brother was the real writer, he was not happy!

At seventeen, Benjamin ran away to Philadelphia with almost no money. He walked into the city eating a big, puffy roll of bread, which became one of the most famous images in American history. In Philadelphia, Franklin worked hard and eventually started his own printing business. He became very successful.

Franklin published a newspaper called the Pennsylvania Gazette and a book called Poor Richard''s Almanack, which was full of weather predictions, jokes, and wise sayings. Many of his sayings are still famous today, like "Early to bed and early to rise, makes a man healthy, wealthy, and wise" and "A penny saved is a penny earned."

But Franklin did not just want to make money. He wanted to help his community and understand how the world worked. He started the first lending library in America, the first volunteer fire department, and helped create a hospital and a university. He invented things that made life better, including the lightning rod which protects buildings from lightning strikes, bifocal glasses which let people see both near and far with the same glasses, and the Franklin stove which heated homes more efficiently.

Franklin''s most famous experiment was flying a kite during a thunderstorm in 1752. He wanted to prove that lightning was electricity. When lightning struck near his kite, electricity traveled down the wet string to a metal key, creating a spark. This was incredibly dangerous, but it proved his theory! His discovery led to the lightning rod, which has saved countless buildings from fires.

When America decided to fight for independence, Franklin was already an old man, but he was still incredibly important. He helped edit the Declaration of Independence and signed it proudly. He was one of the oldest Founding Fathers at 70 years old.

Franklin''s biggest contribution to winning the Revolutionary War happened in France. Congress sent him to convince the French to help America fight the British. The French people loved Franklin! He dressed simply and wore a fur cap, and they thought he was a wise man from the wilderness. Franklin charmed the French king and his court, and France agreed to send soldiers, ships, and money to help America. Without French help, America might not have won the war.

After the war, Franklin helped write the Constitution. He was 81 years old and the oldest delegate at the Constitutional Convention. When some people complained about parts of the Constitution they did not like, Franklin gave a famous speech asking everyone to sign it anyway. He said no document could be perfect, but this one was very good.

Benjamin Franklin died on April 17, 1790, at age 84. About 20,000 people came to his funeral, the largest gathering in American history at that time. His life showed that with hard work, curiosity, and determination, anyone can make a difference.

Today, Franklin''s face is on the hundred-dollar bill. But his real legacy is the example he set: never stop learning, always help your community, and believe that ordinary people can do extraordinary things.',
  NULL,
  '[]'::JSONB
)
RETURNING individual_id;

-- Questions for Benjamin Franklin
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'In what city was Benjamin Franklin born, and how many children were in his family?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 1
FROM red_white_who_individuals WHERE name = 'Benjamin Franklin'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many years of formal schooling did Franklin have?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 2
FROM red_white_who_individuals WHERE name = 'Benjamin Franklin'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was the name Franklin used when secretly writing articles for his brother''s newspaper?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 3
FROM red_white_who_individuals WHERE name = 'Benjamin Franklin'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What famous saying from Poor Richard''s Almanack talks about going to bed early?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 4
FROM red_white_who_individuals WHERE name = 'Benjamin Franklin'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What dangerous experiment did Franklin do with a kite in 1752?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 5
FROM red_white_who_individuals WHERE name = 'Benjamin Franklin'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Name three things that Benjamin Franklin invented.', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 6
FROM red_white_who_individuals WHERE name = 'Benjamin Franklin'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was the first lending library in America that Franklin started?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 7
FROM red_white_who_individuals WHERE name = 'Benjamin Franklin'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What country did Franklin convince to help America during the Revolutionary War?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 8
FROM red_white_who_individuals WHERE name = 'Benjamin Franklin'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How old was Franklin when he signed the Constitution?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 9
FROM red_white_who_individuals WHERE name = 'Benjamin Franklin'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What piece of American money has Franklin''s face on it?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 10
FROM red_white_who_individuals WHERE name = 'Benjamin Franklin'
ON CONFLICT (individual_id, question_text) DO NOTHING;


-- Individual: Abraham Lincoln
INSERT INTO red_white_who_individuals (name, birth_year, death_year, birth_date, death_date, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery)
VALUES (
  'Abraham Lincoln',
  1809,
  1865,
  NULL,
  NULL,
  ARRAY['Preserved the Union during the Civil War and freed the enslaved people'],
  '{"notes":"Born in a log cabin in Kentucky; Self-educated frontier lawyer from Illinois; 16th President of the United States (1861-1865); Led the nation through the Civil War; Issued the Emancipation Proclamation (1863); Delivered the Gettysburg Address; Assassinated by John Wilkes Booth at Ford''s Theatre"}',
  'Abraham Lincoln is considered one of the greatest American presidents. He led the country through its most difficult time, the Civil War, and ended slavery in America. His story shows that anyone can achieve greatness, no matter how poor or humble their beginnings.

Lincoln was born on February 12, 1809, in a tiny one-room log cabin in Kentucky. His family was very poor. They moved to Indiana when Abraham was seven, and life on the frontier was hard. Abraham''s mother died when he was only nine years old.

Lincoln had almost no formal education, probably less than one year of schooling total. But he loved to learn and read every book he could find. He would walk miles to borrow a book, then read it by firelight after a long day of farm work. He read the Bible, Shakespeare, and books about history. All this reading helped him become one of the greatest writers and speakers in American history.

When Lincoln was twenty-two, he left home and settled in New Salem, Illinois. He worked many jobs, including store clerk, postmaster, and surveyor, while teaching himself law. He was admitted to the bar in 1836, which meant he could work as a lawyer. He moved to Springfield, Illinois, and built a successful law practice. People liked him because he was honest, smart, and had a great sense of humor.

Lincoln entered politics and served in the Illinois state legislature and later in the U.S. Congress. In 1858, he ran for Senate against Stephen Douglas. They had seven famous debates about slavery that attracted huge crowds. Lincoln lost that election, but the debates made him famous across the country.

In 1860, Lincoln ran for president and won. But before he even took office, seven Southern states left the Union because they were afraid Lincoln would end slavery. Four more states left after the Civil War started. The country was torn apart.

The Civil War began in April 1861 when Confederate forces attacked Fort Sumter in South Carolina. Lincoln''s goal was to save the Union and keep all the states together as one country. He also believed that slavery was wrong, but at first, he was not sure if the Constitution allowed him to end it.

As the war continued, Lincoln became convinced that freeing the enslaved people was both morally right and necessary to win the war. On January 1, 1863, he issued the Emancipation Proclamation, declaring that all enslaved people in the Confederate states were free. This was one of the most important moments in American history.

Lincoln gave one of the most famous speeches ever at Gettysburg, Pennsylvania, in November 1863. The speech was only about 272 words long, just two minutes, but it beautifully explained what America stood for. He said the nation was "dedicated to the proposition that all men are created equal" and called for "a new birth of freedom." He ended by hoping that "government of the people, by the people, for the people, shall not perish from the earth."

The Civil War was brutal. Over 600,000 soldiers died, more than in any other American war. Lincoln felt the weight of every death. He worked hard to find generals who could win the war, finally finding success with Ulysses S. Grant. He was reelected in 1864, and the war finally ended in April 1865 when Confederate General Robert E. Lee surrendered at Appomattox.

Lincoln wanted to heal the nation after the war. In his second inaugural address, he said the country should act "with malice toward none, with charity for all." He wanted to bring the Southern states back into the Union peacefully and fairly.

But Lincoln never got to see his vision completed. On April 14, 1865, just five days after the war ended, Lincoln went to see a play at Ford''s Theatre in Washington, D.C. An actor named John Wilkes Booth, who supported the Confederacy, shot Lincoln. The president died the next morning. He was 56 years old.

The nation was devastated. Lincoln had saved the Union and freed millions of enslaved people, and now he was gone. Today, his face is on the penny and the five-dollar bill. The Lincoln Memorial in Washington, D.C., honors his memory. But his greatest monument is a united, free America, the country he gave his life to preserve.',
  NULL,
  '[]'::JSONB
)
RETURNING individual_id;

-- Questions for Abraham Lincoln
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'In what state was Abraham Lincoln born, and what kind of home was he born in?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 1
FROM red_white_who_individuals WHERE name = 'Abraham Lincoln'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How much formal schooling did Lincoln have as a child?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 2
FROM red_white_who_individuals WHERE name = 'Abraham Lincoln'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How did young Lincoln educate himself?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 3
FROM red_white_who_individuals WHERE name = 'Abraham Lincoln'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What profession did Lincoln teach himself that he practiced in Illinois?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 4
FROM red_white_who_individuals WHERE name = 'Abraham Lincoln'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What 1858 series of public discussions made Lincoln famous?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 5
FROM red_white_who_individuals WHERE name = 'Abraham Lincoln'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What document did Lincoln issue on January 1, 1863, to free enslaved people?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 6
FROM red_white_who_individuals WHERE name = 'Abraham Lincoln'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many words was the Gettysburg Address?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 7
FROM red_white_who_individuals WHERE name = 'Abraham Lincoln'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What famous phrase from the Gettysburg Address describes American government?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 8
FROM red_white_who_individuals WHERE name = 'Abraham Lincoln'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who assassinated Lincoln, and where did it happen?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 9
FROM red_white_who_individuals WHERE name = 'Abraham Lincoln'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many soldiers died during the Civil War?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 10
FROM red_white_who_individuals WHERE name = 'Abraham Lincoln'
ON CONFLICT (individual_id, question_text) DO NOTHING;


-- Individual: Thomas Jefferson
INSERT INTO red_white_who_individuals (name, birth_year, death_year, birth_date, death_date, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery)
VALUES (
  'Thomas Jefferson',
  1743,
  1826,
  NULL,
  NULL,
  ARRAY['Primary author of the Declaration of Independence'],
  '{"notes":"Born in Shadwell, Virginia; Brilliant writer and architect; Primary author of Declaration of Independence (1776); Third President of the United States (1801-1809); Purchased Louisiana Territory, doubling nation''s size; Founded the University of Virginia; Died on July 4, 1826, the 50th anniversary of the Declaration"}',
  'Thomas Jefferson was one of the most brilliant people in American history. He was the main author of the Declaration of Independence, the third President of the United States, and a man of amazing talents: architect, inventor, scientist, musician, and writer. His words "all men are created equal" have inspired people around the world for almost 250 years.

Jefferson was born on April 13, 1743, in Virginia. His family was wealthy, and young Thomas received an excellent education. He loved learning and could read books in several languages, including Latin, Greek, and French. He attended the College of William and Mary and studied law. Throughout his life, Jefferson collected books. His personal library eventually became the foundation of the Library of Congress.

In 1775, the American colonies were moving toward war with Britain. The Continental Congress needed someone to write a document explaining why America deserved to be free. They chose the 33-year-old Jefferson because he was such a talented writer.

Jefferson wrote the Declaration of Independence in about seventeen days, working in a rented room in Philadelphia. The most famous part begins: "We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness."

These words were revolutionary. They declared that all people have rights that no government can take away. The Declaration was signed on July 4, 1776, and that date became America''s birthday, Independence Day.

Jefferson served his country in many ways. He was Governor of Virginia, a diplomat in France, the first Secretary of State under President Washington, and Vice President under John Adams. In 1800, he was elected the third President of the United States.

As president, Jefferson made one of the most important decisions in American history: the Louisiana Purchase in 1803. He bought a huge territory from France for about 15 million dollars, roughly 3 cents per acre! This purchase doubled the size of the United States and opened the West for exploration and settlement.

Jefferson sent Meriwether Lewis and William Clark on a famous expedition to explore this new territory. They traveled all the way to the Pacific Ocean, mapping the land, meeting Native American tribes, and discovering plants and animals unknown to scientists. Their journey is one of the greatest adventures in American history.

After his presidency, Jefferson retired to Monticello, his beautiful home in Virginia that he designed himself. He was an architect and inventor who was always thinking of new ideas. He invented a wheel cipher for writing secret codes, a better plow for farming, and designed buildings that are still admired today.

Jefferson''s greatest project in retirement was founding the University of Virginia. He designed the buildings, planned the courses, and chose the books for the library. He considered it one of his proudest achievements. He even wanted it listed on his tombstone instead of being president!

Jefferson died on July 4, 1826, exactly fifty years after the Declaration of Independence was signed. Amazingly, his old friend and rival John Adams died on the very same day. It seemed like a miracle that both men passed away on America''s fiftieth birthday.

Jefferson''s legacy is complicated. While he wrote that "all men are created equal," he owned enslaved people throughout his life. This contradiction troubles us today and shows that even great people can fail to live up to their own ideals. It is important to understand both his achievements and his failures.

Despite these contradictions, Jefferson''s words in the Declaration of Independence have inspired freedom movements around the world. His belief in education, democracy, and human rights helped shape the country we live in today. His life reminds us that ideas have power, and that the right words at the right time can change history.',
  NULL,
  '[]'::JSONB
)
RETURNING individual_id;

-- Questions for Thomas Jefferson
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When and where was Thomas Jefferson born?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 1
FROM red_white_who_individuals WHERE name = 'Thomas Jefferson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How old was Jefferson when he wrote the Declaration of Independence?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 2
FROM red_white_who_individuals WHERE name = 'Thomas Jefferson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What famous phrase begins the Declaration''s statement about human equality?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 3
FROM red_white_who_individuals WHERE name = 'Thomas Jefferson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What date did the Declaration get signed, becoming America''s birthday?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 4
FROM red_white_who_individuals WHERE name = 'Thomas Jefferson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What 1803 land purchase doubled the size of the United States?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 5
FROM red_white_who_individuals WHERE name = 'Thomas Jefferson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How much did the Louisiana Purchase cost, about how many cents per acre?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 6
FROM red_white_who_individuals WHERE name = 'Thomas Jefferson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Which two explorers did Jefferson send to explore the Louisiana Territory?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 7
FROM red_white_who_individuals WHERE name = 'Thomas Jefferson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What is the name of Jefferson''s Virginia home that he designed himself?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 8
FROM red_white_who_individuals WHERE name = 'Thomas Jefferson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What university did Jefferson found after leaving the presidency?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 9
FROM red_white_who_individuals WHERE name = 'Thomas Jefferson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'On what amazing date did Jefferson die in 1826?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 10
FROM red_white_who_individuals WHERE name = 'Thomas Jefferson'
ON CONFLICT (individual_id, question_text) DO NOTHING;


-- Individual: Harriet Tubman
INSERT INTO red_white_who_individuals (name, birth_year, death_year, birth_date, death_date, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery)
VALUES (
  'Harriet Tubman',
  1822,
  1913,
  NULL,
  NULL,
  ARRAY['Conductor on the Underground Railroad who freed approximately 70 enslaved people'],
  '{"notes":"Born enslaved in Maryland; Escaped to freedom in 1849; Made approximately 13 rescue missions to the South; Known as Moses of her people; Never lost a single passenger on Underground Railroad; Served as spy and scout for Union Army during Civil War; Activist for women''s rights after the war"}',
  'Harriet Tubman was one of the bravest Americans who ever lived. Born into slavery, she escaped to freedom and then risked her life again and again to lead others to freedom on the Underground Railroad. She was called the "Moses of her people" because, like Moses in the Bible, she led her people out of bondage.

Harriet was born around 1822 in Maryland. Her birth name was Araminta Ross, but she later took her mother''s name, Harriet. Life as an enslaved person was brutal. Harriet was forced to work from the time she was a young child. When she was about twelve years old, she was seriously injured when an overseer threw a heavy metal weight that hit her in the head. This injury caused her to have seizures and blackouts for the rest of her life. But it never stopped her from fighting for freedom.

In 1849, Harriet made a dangerous decision: she would escape to the North, where slavery was illegal. Traveling mostly at night, using the North Star to guide her, she made it to Pennsylvania. She was free! But she could not enjoy her freedom while her family and friends were still enslaved.

Harriet became a "conductor" on the Underground Railroad. This was not an actual railroad. It was a secret network of people who helped enslaved people escape to freedom. The routes were called "lines," the hiding places were called "stations," and the helpers were called "conductors." Harriet became the most famous conductor of all.

Over the next eleven years, Harriet made approximately thirteen trips back to the South. This was incredibly dangerous. If she was caught, she could be killed or sold into slavery again. Slaveholders offered a huge reward for her capture, some say up to 40,000 dollars, an enormous sum at the time. But Harriet was clever, brave, and determined.

She rescued about seventy people, including her elderly parents. She usually traveled in winter when the longer nights gave more cover. She carried a pistol for protection and had secret signals and codes to communicate with her passengers. She told the people she was rescuing, "We got to go free or die." And she meant it. She never allowed anyone to turn back, because they might give away information about the escape routes.

Harriet never lost a single passenger. As she said, "I was the conductor of the Underground Railroad for eight years, and I can say what most conductors cannot say. I never ran my train off the track and I never lost a passenger."

When the Civil War began in 1861, Harriet saw another chance to fight for freedom. She went to South Carolina and worked for the Union Army as a cook, nurse, and scout. She even became the first woman to lead an armed military raid in American history! In June 1863, she guided Union soldiers on a raid along the Combahee River that freed more than 700 enslaved people.

After the war, Harriet settled in Auburn, New York. She was very poor because the government never properly paid her for her military service. But she spent her life helping others. She opened her home to people in need and worked for women''s right to vote. She believed that everyone, regardless of race or gender, deserved equal rights.

Harriet Tubman died on March 10, 1913, surrounded by friends and family. She was about ninety-one years old. Her last words were, "I go to prepare a place for you."

Today, Harriet Tubman is celebrated as an American hero. Her face was chosen to appear on the twenty-dollar bill. Schools, parks, and monuments are named after her. But her greatest legacy is the example she set: one brave person, willing to risk everything, can make a tremendous difference. She showed that the desire for freedom cannot be stopped by chains, laws, or fear.',
  NULL,
  '[]'::JSONB
)
RETURNING individual_id;

-- Questions for Harriet Tubman
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'In what state was Harriet Tubman born into slavery?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 1
FROM red_white_who_individuals WHERE name = 'Harriet Tubman'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What serious injury did Tubman suffer as a child that affected her for life?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 2
FROM red_white_who_individuals WHERE name = 'Harriet Tubman'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'In what year did Tubman escape to freedom in the North?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 3
FROM red_white_who_individuals WHERE name = 'Harriet Tubman'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was the Underground Railroad that Tubman worked on?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 4
FROM red_white_who_individuals WHERE name = 'Harriet Tubman'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Approximately how many rescue trips did Tubman make to the South?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 5
FROM red_white_who_individuals WHERE name = 'Harriet Tubman'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'About how many enslaved people did Tubman rescue?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 6
FROM red_white_who_individuals WHERE name = 'Harriet Tubman'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What nickname was Tubman given, comparing her to a biblical figure?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 7
FROM red_white_who_individuals WHERE name = 'Harriet Tubman'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What special distinction did Tubman earn during the Combahee River Raid?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 8
FROM red_white_who_individuals WHERE name = 'Harriet Tubman'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many passengers did Tubman lose on the Underground Railroad?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 9
FROM red_white_who_individuals WHERE name = 'Harriet Tubman'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What piece of American money was Tubman chosen to appear on?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 10
FROM red_white_who_individuals WHERE name = 'Harriet Tubman'
ON CONFLICT (individual_id, question_text) DO NOTHING;


-- Individual: Frederick Douglass
INSERT INTO red_white_who_individuals (name, birth_year, death_year, birth_date, death_date, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery)
VALUES (
  'Frederick Douglass',
  1818,
  1895,
  NULL,
  NULL,
  ARRAY['Escaped slavery to become the most influential African American leader of the 1800s'],
  '{"notes":"Born enslaved in Maryland; Escaped to freedom in 1838; Self-educated, brilliant speaker and writer; Published autobiography and antislavery newspaper; Advised President Lincoln during Civil War; Fought for rights of African Americans and women; Served in several government positions"}',
  'Frederick Douglass was born into slavery but became one of the most powerful voices for freedom in American history. Through courage, intelligence, and an incredible gift for speaking and writing, he became the most famous African American of the 1800s. His life proved that enslaved people were just as intelligent and capable as anyone else, something that many white Americans at the time refused to believe.

Frederick was born in February 1818 on a plantation in Maryland. Like many enslaved children, he never knew his exact birthday and was separated from his mother when very young. He grew up with his grandmother until he was sent to work for different owners.

When Frederick was about eight years old, he was sent to Baltimore to live with a new family. The wife, Sophia Auld, began teaching him the alphabet. But her husband stopped her, saying that teaching an enslaved person to read was against the law and would make him want to be free. Young Frederick overheard this, and it changed his life.

Frederick realized that reading was the "pathway from slavery to freedom." If slaveholders were so afraid of enslaved people reading, then reading must be powerful. So Frederick taught himself. He traded bread with poor white children in exchange for reading lessons. He practiced letters in the dirt. He studied any scrap of newspaper he could find. By the time he was a teenager, Frederick could read and write better than most free people.

Frederick was sent back to the country to work in the fields. He was beaten and mistreated. But he never stopped dreaming of freedom. In 1838, at age twenty, he made his escape. Dressed as a sailor and carrying papers borrowed from a free Black sailor, he boarded a train heading north. His heart pounded the whole way, but he made it to New York City. He was free!

Frederick settled in New Bedford, Massachusetts, and changed his last name to Douglass to avoid being captured. He began attending antislavery meetings, and in 1841, he was asked to speak about his experiences. He was so powerful that the audience was amazed. Soon, he was traveling across the North and to Europe, speaking against slavery.

In 1845, Douglass published his autobiography, "Narrative of the Life of Frederick Douglass." The book was a sensation. Douglass wrote with such power and intelligence that many white people finally began to understand the horrors of slavery. The book made him famous but also put him in danger because his former owner now knew where he was. Friends raised money to buy his freedom legally, and Douglass continued his fight.

Douglass started his own antislavery newspaper called "The North Star." Its motto was "Right is of no Sex, Truth is of no Color." He believed that everyone, Black and white, men and women, deserved equal rights.

When the Civil War began, Douglass pushed President Lincoln to let Black men fight in the Union Army. He believed that fighting for their country would help prove that Black Americans deserved equal rights. Lincoln eventually agreed, and Douglass recruited Black soldiers, including his own sons. About 180,000 Black men served in the Union Army and Navy.

Douglass met with President Lincoln several times during the war. Lincoln called him "my friend Douglass," and the two men respected each other. After Lincoln was assassinated, his widow gave Douglass the president''s walking stick as a token of their friendship.

After the war, Douglass continued fighting for equal rights. He supported women''s right to vote and spoke out against racial violence. He served in important government positions, including U.S. Marshal and ambassador to Haiti. He never stopped speaking out against injustice.

Frederick Douglass died on February 20, 1895, after attending a women''s rights meeting. He was seventy-seven years old. Thousands of people came to pay their respects.

Douglass showed what enslaved people could accomplish when given the chance. He went from being someone''s property to meeting with presidents and changing the world. His words continue to inspire: "If there is no struggle, there is no progress." Frederick Douglass proved that one voice, raised in truth, can shake the world.',
  NULL,
  '[]'::JSONB
)
RETURNING individual_id;

-- Questions for Frederick Douglass
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'In what state was Frederick Douglass born into slavery?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 1
FROM red_white_who_individuals WHERE name = 'Frederick Douglass'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Why did the slaveholder say teaching Frederick to read was dangerous?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 2
FROM red_white_who_individuals WHERE name = 'Frederick Douglass'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How did young Frederick learn to read and write?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 3
FROM red_white_who_individuals WHERE name = 'Frederick Douglass'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'In what year did Douglass escape to freedom?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 4
FROM red_white_who_individuals WHERE name = 'Frederick Douglass'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was the title of Douglass''s famous autobiography?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 5
FROM red_white_who_individuals WHERE name = 'Frederick Douglass'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was the name of the antislavery newspaper Douglass started?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 6
FROM red_white_who_individuals WHERE name = 'Frederick Douglass'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Douglass convince President Lincoln to allow during the Civil War?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 7
FROM red_white_who_individuals WHERE name = 'Frederick Douglass'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'About how many Black men served in the Union Army and Navy?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 8
FROM red_white_who_individuals WHERE name = 'Frederick Douglass'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What gift did Mary Lincoln give Douglass after the president''s death?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 9
FROM red_white_who_individuals WHERE name = 'Frederick Douglass'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What famous quote by Douglass says ''If there is no struggle...''?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 10
FROM red_white_who_individuals WHERE name = 'Frederick Douglass'
ON CONFLICT (individual_id, question_text) DO NOTHING;


-- Individual: Theodore Roosevelt
INSERT INTO red_white_who_individuals (name, birth_year, death_year, birth_date, death_date, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery)
VALUES (
  'Theodore Roosevelt',
  1858,
  1919,
  NULL,
  NULL,
  ARRAY['Progressive president who conserved natural resources and expanded American power'],
  '{"notes":"Born in New York City to a wealthy family; Overcame childhood illness through exercise; Led the Rough Riders in Spanish-American War; Became youngest president at age 42 (1901-1909); Created national parks and forests; Built the Panama Canal; Won Nobel Peace Prize; Continued campaign speech after being shot"}',
  'Theodore Roosevelt was one of the most energetic and exciting presidents in American history. He was a soldier, explorer, author, and leader who believed in living what he called "the strenuous life." He protected America''s wild places, built the Panama Canal, and showed that the president could be a powerful force for good.

Roosevelt was born on October 27, 1858, in New York City. His family was wealthy, but young "Teddy" faced a serious challenge: he had terrible asthma that made it hard to breathe. Doctors were not sure he would survive. His father gave him important advice: he needed to build up his body to fight his illness.

Theodore took this advice to heart. He started exercising, boxing, and spending time outdoors. He went hiking, hunting, and camping. By the time he was a teenager, he had transformed himself from a sickly child into a strong young man. He never forgot this lesson. He believed that challenges could be overcome through determination and hard work.

Roosevelt went to Harvard University and became interested in science, especially animals. He wrote books about nature and hunting. He also entered politics, serving in the New York State Assembly. When his first wife died in 1884, heartbroken Theodore went west to the Dakota Badlands. He lived as a cowboy for two years, herding cattle and hunting. This time in the West gave him a lifelong love of wilderness and wildlife.

When the Spanish-American War broke out in 1898, Roosevelt was assistant secretary of the Navy. But he wanted to fight! He resigned and organized a volunteer cavalry regiment called the Rough Riders. This group included cowboys, college athletes, Native Americans, and other adventurers. Roosevelt led them in a famous charge up San Juan Hill in Cuba. He became a national hero.

Roosevelt returned home and was elected governor of New York. Then he became vice president under William McKinley. When McKinley was assassinated in 1901, Roosevelt became president at age forty-two, the youngest person ever to hold that office.

As president, Roosevelt believed in using government power to help ordinary people. He took on powerful corporations called "trusts" that controlled whole industries. He sued companies that cheated customers and workers. His approach was called the "Square Deal" because he wanted everyone to be treated fairly.

Roosevelt loved nature and worried that America''s wild places were disappearing. He protected about 230 million acres of public land, an area larger than Texas and California combined! He created five national parks, including Crater Lake and Mesa Verde. He established national forests, wildlife refuges, and national monuments including the Grand Canyon. Today''s national park system exists largely because of Theodore Roosevelt.

One of Roosevelt''s biggest achievements was the Panama Canal. For centuries, ships had to sail all the way around South America to get from the Atlantic to the Pacific Ocean. Roosevelt made building a canal through Panama a priority. The project took ten years and was an engineering marvel. When it opened in 1914, it changed world trade forever.

Roosevelt believed America should be powerful on the world stage. His motto was "speak softly and carry a big stick," meaning be polite but strong. He built up the Navy and sent the "Great White Fleet" around the world to show American power. He also won the Nobel Peace Prize in 1906 for helping end a war between Russia and Japan. He was the first American to win a Nobel Prize.

After leaving the presidency in 1909, Roosevelt went on an African safari and explored a river in the Amazon jungle. He never stopped seeking adventure!

In 1912, Roosevelt ran for president again. During a campaign speech in Milwaukee, a man shot him in the chest. The bullet went through his steel eyeglass case and a thick speech in his pocket before lodging near his heart. What did Roosevelt do? He gave his ninety-minute speech anyway! He told the crowd, "It takes more than that to kill a Bull Moose." He lost the election but won America''s admiration.

Theodore Roosevelt died in his sleep on January 6, 1919, at age sixty. His legacy lives on in our national parks, in the idea that government should help ordinary people, and in the example he set of living life to the fullest.',
  NULL,
  '[]'::JSONB
)
RETURNING individual_id;

-- Questions for Theodore Roosevelt
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What childhood illness did Theodore Roosevelt overcome through exercise?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 1
FROM red_white_who_individuals WHERE name = 'Theodore Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where did Roosevelt live as a cowboy for two years after a personal tragedy?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 2
FROM red_white_who_individuals WHERE name = 'Theodore Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was the name of Roosevelt''s volunteer cavalry regiment in the Spanish-American War?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 3
FROM red_white_who_individuals WHERE name = 'Theodore Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How old was Roosevelt when he became the youngest president?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 4
FROM red_white_who_individuals WHERE name = 'Theodore Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'About how many acres of public land did Roosevelt protect?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 5
FROM red_white_who_individuals WHERE name = 'Theodore Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What major construction project did Roosevelt champion that connected two oceans?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 6
FROM red_white_who_individuals WHERE name = 'Theodore Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What award did Roosevelt win in 1906 for helping end a war?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 7
FROM red_white_who_individuals WHERE name = 'Theodore Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Roosevelt''s famous motto about speaking and carrying?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 8
FROM red_white_who_individuals WHERE name = 'Theodore Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Roosevelt do after being shot during a campaign speech?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 9
FROM red_white_who_individuals WHERE name = 'Theodore Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What nickname did Roosevelt use for his 1912 political party?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 10
FROM red_white_who_individuals WHERE name = 'Theodore Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;


-- Individual: Martin Luther King Jr.
INSERT INTO red_white_who_individuals (name, birth_year, death_year, birth_date, death_date, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery)
VALUES (
  'Martin Luther King Jr.',
  1929,
  1968,
  NULL,
  NULL,
  ARRAY['Leader of the Civil Rights Movement who championed nonviolent protest'],
  '{"notes":"Born in Atlanta, Georgia; Baptist minister and doctor of theology; Led Montgomery Bus Boycott (1955-1956); Delivered I Have a Dream speech (1963); Won Nobel Peace Prize at age 35 (1964); Helped pass Civil Rights Act and Voting Rights Act; Assassinated in Memphis, Tennessee (1968); National holiday honors his birthday"}',
  'Martin Luther King Jr. was one of the most important leaders in American history. Through peaceful protest and powerful speeches, he led the fight for civil rights and helped end legal segregation in America. His dream of equality continues to inspire people around the world.

Martin was born on January 15, 1929, in Atlanta, Georgia. His father was a Baptist minister, and Martin grew up in a religious household that valued education and service to others. Even as a child, Martin was an excellent student and a gifted speaker.

Growing up in the segregated South, Martin experienced racism firsthand. There were separate water fountains, restrooms, and schools for Black and white people. Black people had to sit in the back of buses and could not eat at many restaurants. Young Martin could not understand why people were treated differently because of their skin color.

Martin was so smart that he skipped two grades of high school and entered college at fifteen! He studied to become a minister like his father and earned a doctorate degree. He married Coretta Scott in 1953, and they would have four children.

In 1955, a Black woman named Rosa Parks was arrested in Montgomery, Alabama, for refusing to give up her bus seat to a white person. The Black community asked the young Reverend King to lead a boycott of the city buses. For 381 days, Black citizens refused to ride the buses. They walked miles to work or organized carpools. The bus company lost so much money that the city finally ended bus segregation. Martin Luther King Jr. had shown that nonviolent protest could bring change.

King believed deeply in nonviolent resistance, the idea that you could fight injustice without using violence. He was inspired by Jesus Christ''s teachings about loving your enemies and by Mahatma Gandhi, who had used nonviolent protest to free India from British rule. King taught his followers to face hatred with love, to accept being attacked without fighting back, and to appeal to the conscience of their opponents.

Over the next decade, King led protests, marches, and boycotts across the South. He was arrested more than twenty times. His house was bombed. He received death threats constantly. But he never stopped believing in nonviolence and never stopped fighting for equality.

In 1963, King organized protests in Birmingham, Alabama, one of the most segregated cities in America. Police attacked peaceful marchers with fire hoses and dogs. Television showed these brutal images to the nation, and many white Americans were shocked. That same year, King helped organize the March on Washington, where over 250,000 people gathered at the Lincoln Memorial.

It was there that King delivered his most famous speech. Standing before the huge crowd, he described his dream for America: "I have a dream that my four little children will one day live in a nation where they will not be judged by the color of their skin but by the content of their character." The speech was so powerful that it is considered one of the greatest in American history.

King''s efforts helped pass important laws. The Civil Rights Act of 1964 ended segregation in public places and made job discrimination illegal. The Voting Rights Act of 1965 protected Black Americans'' right to vote. In 1964, King won the Nobel Peace Prize at just thirty-five years old, one of the youngest people ever to receive the honor.

But not everyone appreciated King''s message. On April 4, 1968, while standing on a balcony at a motel in Memphis, Tennessee, King was shot and killed by James Earl Ray. He was only thirty-nine years old.

The nation mourned. There were riots in many cities, though King would not have wanted violence in his name. His funeral was held in Atlanta, and people around the world honored his memory.

Today, Martin Luther King Jr. Day is a national holiday celebrated on the third Monday of January. It is the only federal holiday honoring an individual American citizen other than George Washington. Schools and streets are named after him. The Martin Luther King Jr. Memorial stands on the National Mall in Washington, D.C.

But King''s greatest legacy is the change he brought to America. Because of his courage and leadership, segregation laws were struck down. Because of his dream, America moved closer to being a country where everyone truly is treated equally. His words still challenge us to build a better, more just world: "Injustice anywhere is a threat to justice everywhere.',
  NULL,
  '[]'::JSONB
)
RETURNING individual_id;

-- Questions for Martin Luther King Jr.
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where and when was Martin Luther King Jr. born?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 1
FROM red_white_who_individuals WHERE name = 'Martin Luther King Jr.'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What event in 1955 led King to lead the Montgomery Bus Boycott?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 2
FROM red_white_who_individuals WHERE name = 'Martin Luther King Jr.'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How long did the Montgomery Bus Boycott last?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 3
FROM red_white_who_individuals WHERE name = 'Martin Luther King Jr.'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What idea about fighting injustice did King believe in and practice?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 4
FROM red_white_who_individuals WHERE name = 'Martin Luther King Jr.'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who inspired King''s philosophy of nonviolent protest besides Jesus?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 5
FROM red_white_who_individuals WHERE name = 'Martin Luther King Jr.'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many people gathered at the March on Washington in 1963?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 6
FROM red_white_who_individuals WHERE name = 'Martin Luther King Jr.'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What is the most famous line from King''s I Have a Dream speech?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 7
FROM red_white_who_individuals WHERE name = 'Martin Luther King Jr.'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How old was King when he won the Nobel Peace Prize?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 8
FROM red_white_who_individuals WHERE name = 'Martin Luther King Jr.'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What two important laws did King''s work help pass in 1964 and 1965?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 9
FROM red_white_who_individuals WHERE name = 'Martin Luther King Jr.'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'On what date is Martin Luther King Jr. Day celebrated?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 10
FROM red_white_who_individuals WHERE name = 'Martin Luther King Jr.'
ON CONFLICT (individual_id, question_text) DO NOTHING;


-- Individual: Rosa Parks
INSERT INTO red_white_who_individuals (name, birth_year, death_year, birth_date, death_date, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery)
VALUES (
  'Rosa Parks',
  1913,
  2005,
  NULL,
  NULL,
  ARRAY['Refused to give up her bus seat', 'sparking the Montgomery Bus Boycott'],
  '{"notes":"Born in Tuskegee, Alabama; Secretary of Montgomery NAACP; Arrested December 1, 1955, for refusing to give up bus seat; Her arrest sparked the Montgomery Bus Boycott; Known as Mother of the Civil Rights Movement; Received Congressional Gold Medal; Awarded Presidential Medal of Freedom"}',
  'Rosa Parks changed American history with one simple act of courage: she refused to give up her seat on a bus. Her quiet defiance sparked the Montgomery Bus Boycott and helped launch the Civil Rights Movement. She became known as the "Mother of the Civil Rights Movement."

Rosa was born on February 4, 1913, in Tuskegee, Alabama. She grew up in a time when Black people in the South faced harsh segregation laws called "Jim Crow" laws. Black people had to use separate water fountains, restrooms, and schools. They could not eat at the same restaurants as white people or stay in the same hotels.

Even as a child, Rosa knew segregation was wrong. She grew up hearing stories of her grandfather standing guard with a shotgun to protect the family from the Ku Klux Klan. Her mother taught her to respect herself and stand up for what was right.

Rosa was a good student who wanted to become a teacher, but she had to leave school to care for her sick mother and grandmother. She later completed her high school education, something only about 7 percent of Black Americans did at that time. In 1932, she married Raymond Parks, a barber who was active in civil rights work.

Rosa joined the NAACP (National Association for the Advancement of Colored People) in 1943 and became secretary of the Montgomery chapter. She worked on cases involving racial injustice and helped register Black voters, dangerous work in the segregated South.

December 1, 1955, started as an ordinary day. Rosa was tired after working at a department store. She got on a bus to go home and sat in the first row of the "colored section." When the white section filled up, the bus driver ordered Rosa and three other Black passengers to give up their seats so a white man could sit down. The other three passengers moved. Rosa did not.

She was not physically tired, as some stories say. She was tired of giving in. "I felt that I had a right to be treated as any other passenger," she later explained. "I had had enough. I wanted to be free."

The bus driver called the police, and Rosa was arrested. She was taken to jail and charged with violating segregation laws. When she got out, her husband was worried. "Rosa, the white folks will kill you," he said. But Rosa was determined to fight back.

Black leaders in Montgomery had been waiting for the right case to challenge bus segregation. Rosa was perfect: a respected, dignified woman who had done nothing wrong. They organized a boycott of the city buses.

The Montgomery Bus Boycott lasted 381 days, more than a year! Black citizens refused to ride the buses. They walked to work, sometimes for miles. They organized carpools and shared rides. The bus company lost so much money that the city finally ended bus segregation. The young minister leading the boycott was Martin Luther King Jr., who became famous during this time.

Finally, the Supreme Court ruled that bus segregation was unconstitutional. On December 21, 1956, Rosa Parks rode a desegregated bus for the first time.

But victory came at a price. Rosa and her husband both lost their jobs because of her activism. They received death threats. In 1957, they moved to Detroit, Michigan, where Rosa worked for Congressman John Conyers for many years.

Rosa continued working for civil rights her whole life. She founded the Rosa and Raymond Parks Institute for Self-Development to help young people. She received many honors, including the Congressional Gold Medal and the Presidential Medal of Freedom, the two highest civilian honors in America.

Rosa Parks died on October 24, 2005, at age ninety-two. Her body lay in honor in the U.S. Capitol Rotunda. She was the first woman and second non-government official to receive this honor. Thousands of people came to pay their respects.

Rosa Parks showed that ordinary people can make extraordinary change. She was not a famous leader when she refused to give up her seat. She was just a hardworking woman who decided she had had enough injustice. Her courage inspired a movement that changed America forever.',
  NULL,
  '[]'::JSONB
)
RETURNING individual_id;

-- Questions for Rosa Parks
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where and when was Rosa Parks born?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 1
FROM red_white_who_individuals WHERE name = 'Rosa Parks'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What organization did Rosa Parks work for as secretary in Montgomery?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 2
FROM red_white_who_individuals WHERE name = 'Rosa Parks'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'On what date was Rosa Parks arrested for refusing to give up her bus seat?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 3
FROM red_white_who_individuals WHERE name = 'Rosa Parks'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Why did Rosa Parks say she refused to give up her seat?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 4
FROM red_white_who_individuals WHERE name = 'Rosa Parks'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How long did the Montgomery Bus Boycott last?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 5
FROM red_white_who_individuals WHERE name = 'Rosa Parks'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What young minister became famous while leading the bus boycott?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 6
FROM red_white_who_individuals WHERE name = 'Rosa Parks'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did the Supreme Court rule about bus segregation?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 7
FROM red_white_who_individuals WHERE name = 'Rosa Parks'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What nickname is Rosa Parks known by in civil rights history?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 8
FROM red_white_who_individuals WHERE name = 'Rosa Parks'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What two highest civilian honors did Rosa Parks receive?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 9
FROM red_white_who_individuals WHERE name = 'Rosa Parks'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What special honor did Rosa Parks receive after her death in the U.S. Capitol?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 10
FROM red_white_who_individuals WHERE name = 'Rosa Parks'
ON CONFLICT (individual_id, question_text) DO NOTHING;


-- Individual: Sacagawea
INSERT INTO red_white_who_individuals (name, birth_year, death_year, birth_date, death_date, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery)
VALUES (
  'Sacagawea',
  1788,
  1812,
  NULL,
  NULL,
  ARRAY['Guided Lewis and Clark Expedition across the American West'],
  '{"notes":"Born into the Lemhi Shoshone tribe in Idaho; Kidnapped by enemy tribe at about age 12; Joined Lewis and Clark Expedition in 1804; Traveled thousands of miles with her infant son; Helped expedition as interpreter and guide; Reunited with her brother during the journey; Her image appears on the golden dollar coin"}',
  'Sacagawea was a young Native American woman who helped guide one of the greatest explorations in American history: the Lewis and Clark Expedition. Though she was only about sixteen years old and carrying a baby, she traveled thousands of miles across unknown territory and helped the expedition succeed.

Sacagawea (sometimes spelled Sacajawea) was born around 1788 into the Lemhi Shoshone tribe in what is now Idaho. Her name means "Bird Woman" in the Shoshone language. Her people lived in the Rocky Mountains and were known for their horses.

When Sacagawea was about twelve years old, her life changed dramatically. A group of Hidatsa warriors attacked her village, kidnapped Sacagawea and other children, and took them far from home to their village in what is now North Dakota. It must have been terrifying for the young girl to be taken so far from everything she knew.

In 1804, President Thomas Jefferson sent Meriwether Lewis and William Clark on an expedition to explore the land west of the Mississippi River. Jefferson had just purchased this huge territory from France, and he wanted to know what was there. The expedition also hoped to find a water route to the Pacific Ocean.

Lewis and Clark spent the winter of 1804-1805 near the Hidatsa village where Sacagawea was living. By then, she was about sixteen and married to a French-Canadian fur trader named Toussaint Charbonneau. Lewis and Clark hired Charbonneau as an interpreter, but they really wanted Sacagawea. They knew they would need help communicating with the Shoshone people to get horses to cross the mountains.

In February 1805, Sacagawea gave birth to a baby boy named Jean Baptiste. Just two months later, she began the expedition with her infant son strapped to her back! She would carry him for thousands of miles.

Sacagawea proved invaluable to the expedition. She knew which plants were safe to eat and which were medicinal. When their boat nearly capsized, she calmly saved important papers and supplies while others panicked. Clark wrote in his journal that Sacagawea showed "equal fortitude and resolution with any person onboard."

Her presence also helped keep the peace. When Native American tribes saw the expedition coming, they noticed Sacagawea and her baby. They knew that war parties did not travel with women and children, so the group must come in peace. This helped prevent conflicts.

The most dramatic moment of the journey came when the expedition reached Shoshone territory. Sacagawea suddenly recognized the land of her childhood. Then something amazing happened: when they met the Shoshone chief, Sacagawea realized it was her brother Cameahwait! She had not seen him since being kidnapped as a child. The reunion was joyful, and Cameahwait agreed to provide the horses the expedition desperately needed to cross the Rocky Mountains.

Sacagawea helped guide the expedition all the way to the Pacific Ocean. When they finally reached the coast, Clark was so grateful that he gave her a special gift. The whole journey covered about 8,000 miles, an incredible distance for anyone, let alone a young mother with a baby.

After the expedition ended in 1806, Sacagawea and Charbonneau returned to the Hidatsa village. Most historians believe Sacagawea died in 1812 at about age twenty-five. Some Shoshone oral traditions say she lived much longer, but this is uncertain.

Clark remained fond of Sacagawea and called her son "my little dancing boy." He offered to raise and educate the child, and Jean Baptiste eventually became a well-traveled mountain man and guide.

Today, Sacagawea is remembered as a symbol of courage and determination. Her image appears on the golden dollar coin. Statues honor her across the country. Mountains, rivers, and lakes bear her name.

Sacagawea''s story reminds us that great achievements often depend on people whose contributions might be overlooked. Without this teenage mother and her baby, one of history''s greatest explorations might have failed.',
  NULL,
  '[]'::JSONB
)
RETURNING individual_id;

-- Questions for Sacagawea
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What Native American tribe was Sacagawea born into?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 1
FROM red_white_who_individuals WHERE name = 'Sacagawea'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What does Sacagawea''s name mean in the Shoshone language?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 2
FROM red_white_who_individuals WHERE name = 'Sacagawea'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What happened to Sacagawea when she was about twelve years old?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 3
FROM red_white_who_individuals WHERE name = 'Sacagawea'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who were the two leaders of the expedition Sacagawea joined?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 4
FROM red_white_who_individuals WHERE name = 'Sacagawea'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How old was Sacagawea''s baby when the expedition began?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 5
FROM red_white_who_individuals WHERE name = 'Sacagawea'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How did Sacagawea''s presence help prevent conflicts with Native tribes?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 6
FROM red_white_who_individuals WHERE name = 'Sacagawea'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What amazing reunion happened when Sacagawea reached Shoshone territory?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 7
FROM red_white_who_individuals WHERE name = 'Sacagawea'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did the Shoshone provide that the expedition desperately needed?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 8
FROM red_white_who_individuals WHERE name = 'Sacagawea'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'About how many miles did the Lewis and Clark Expedition cover?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 9
FROM red_white_who_individuals WHERE name = 'Sacagawea'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What coin features Sacagawea''s image today?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 10
FROM red_white_who_individuals WHERE name = 'Sacagawea'
ON CONFLICT (individual_id, question_text) DO NOTHING;


-- Individual: Thomas Edison
INSERT INTO red_white_who_individuals (name, birth_year, death_year, birth_date, death_date, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery)
VALUES (
  'Thomas Edison',
  1847,
  1931,
  NULL,
  NULL,
  ARRAY['Invented the practical light bulb and created the modern research laboratory'],
  '{"notes":"Born in Milan, Ohio; Had very little formal schooling; Became deaf as a child; Invented the phonograph, light bulb, and motion picture camera; Held 1,093 U.S. patents, more than any other inventor; Created first industrial research laboratory; Known as The Wizard of Menlo Park"}',
  'Thomas Edison was America''s greatest inventor. He created the practical electric light bulb, the phonograph, and the motion picture camera. His inventions changed how people live, work, and play. With 1,093 patents to his name, Edison invented more useful things than anyone in history.

Thomas Alva Edison was born on February 11, 1847, in Milan, Ohio. He was a curious child who was always asking "why?" His teachers thought he was difficult and called him "addled" (confused), so his mother pulled him out of school and taught him at home. That turned out to be a blessing. Edison said his mother "was the making of me."

When Edison was about twelve, he became partially deaf, possibly from scarlet fever or a head injury. Rather than seeing this as a handicap, Edison said it helped him concentrate. He did not get distracted by background noise!

As a teenager, Edison worked selling newspapers and candy on trains. He set up a chemistry laboratory in the baggage car and even printed his own newspaper. A dangerous chemical fire got him kicked off the train, but nothing could stop his curiosity.

Edison''s first major invention came in 1869: an improved stock ticker machine that companies used to track stock prices. He sold this invention for 40,000 dollars, a fortune at the time! He used the money to set up his first laboratory.

In 1876, Edison created something revolutionary: the world''s first industrial research laboratory in Menlo Park, New Jersey. Before this, inventors worked alone. Edison gathered teams of scientists and engineers to work together on inventions. This new approach to research would change the world.

Edison called his laboratory an "invention factory." He promised to create "a minor invention every ten days and a big thing every six months." He delivered on that promise!

In 1877, Edison invented the phonograph, a machine that could record and play back sound. This was the first device ever to record and reproduce the human voice. When Edison first demonstrated it by recording "Mary Had a Little Lamb," people were amazed. Some thought it was a trick. The phonograph led to record players, CDs, and all the ways we listen to recorded music today.

Edison''s most famous invention was the practical incandescent light bulb. Other inventors had created light bulbs before, but they burned out quickly or were too expensive. Edison tested thousands of materials looking for the right filament, the part that glows. He famously said, "I have not failed. I have just found 10,000 ways that will not work."

Finally, in October 1879, Edison found a carbonized bamboo filament that could glow for over 1,200 hours. He had created a practical light bulb! But that was not enough. Edison also developed the entire electrical system needed to power light bulbs: power stations, wires, switches, and meters. Within a few years, his electric lighting system lit up parts of New York City.

Edison also invented an early motion picture camera called the kinetograph and a viewing device called the kinetoscope. These inventions helped create the movie industry. He built the first movie studio, called the "Black Maria," and made some of the earliest films.

At his laboratory in West Orange, New Jersey, Edison continued inventing until his death. He created better batteries, improved cement, worked on electric cars, and much more. He employed thousands of people and mentored the next generation of inventors.

Edison was famous for his work ethic. He often worked more than 100 hours a week and took short naps instead of full nights of sleep. He believed that "genius is one percent inspiration and ninety-nine percent perspiration."

Edison died on October 18, 1931, at age eighty-four. On the night of his funeral, people across America dimmed their lights for one minute to honor the man who had brought light to the world.

Thomas Edison showed that invention requires not just brilliant ideas but hard work, persistence, and the willingness to fail many times before succeeding. His "invention factory" approach to research is still used today. And every time you turn on a light, watch a movie, or listen to recorded music, you are enjoying something Thomas Edison helped create.',
  NULL,
  '[]'::JSONB
)
RETURNING individual_id;

-- Questions for Thomas Edison
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where and when was Thomas Edison born?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 1
FROM red_white_who_individuals WHERE name = 'Thomas Edison'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Why did Edison''s mother teach him at home?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 2
FROM red_white_who_individuals WHERE name = 'Thomas Edison'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What condition did Edison develop as a child that he said helped him concentrate?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 3
FROM red_white_who_individuals WHERE name = 'Thomas Edison'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was special about Edison''s Menlo Park laboratory?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 4
FROM red_white_who_individuals WHERE name = 'Thomas Edison'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What device did Edison invent in 1877 that could record and play back sound?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 5
FROM red_white_who_individuals WHERE name = 'Thomas Edison'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many materials did Edison famously test before creating a practical light bulb?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 6
FROM red_white_who_individuals WHERE name = 'Thomas Edison'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What material did Edison finally use for his light bulb filament?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 7
FROM red_white_who_individuals WHERE name = 'Thomas Edison'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What motion picture devices did Edison invent?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 8
FROM red_white_who_individuals WHERE name = 'Thomas Edison'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many U.S. patents did Edison hold, more than any other inventor?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 9
FROM red_white_who_individuals WHERE name = 'Thomas Edison'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What is Edison''s famous quote about genius and perspiration?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 10
FROM red_white_who_individuals WHERE name = 'Thomas Edison'
ON CONFLICT (individual_id, question_text) DO NOTHING;


-- Individual: Alexander Graham Bell
INSERT INTO red_white_who_individuals (name, birth_year, death_year, birth_date, death_date, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery)
VALUES (
  'Alexander Graham Bell',
  1847,
  1922,
  NULL,
  NULL,
  ARRAY['Invented the telephone'],
  '{"notes":"Born in Edinburgh, Scotland; Emigrated to America as a young man; Worked as a teacher for deaf children; Invented the telephone in 1876; Founded AT&T telephone company; Also worked on early airplanes and other inventions; Helped found National Geographic Society"}',
  'Alexander Graham Bell invented the telephone, one of the most important inventions in human history. His device allowed people to talk to each other across great distances, changing forever how humans communicate. But Bell''s work was always driven by his desire to help people, especially those who were deaf.

Bell was born on March 3, 1847, in Edinburgh, Scotland. His family was deeply involved in the study of speech and sound. His father developed a system called "Visible Speech" to help deaf people learn to talk. His mother was nearly deaf, and young Alexander communicated with her by speaking in low tones close to her forehead.

From childhood, Bell was fascinated by sound and speech. When he was a boy, he and his brother built a machine that could say "Mama." He was always experimenting with ways to transmit sound.

The Bell family emigrated to Canada in 1870 after two of Alexander''s brothers died of tuberculosis. Bell later moved to Boston, where he became a teacher at a school for deaf children. He was deeply committed to helping deaf people communicate. One of his students was a young woman named Mabel Hubbard, who had been deaf since childhood. Bell and Mabel fell in love and eventually married.

While teaching, Bell continued his experiments with sound. He wanted to invent a "harmonic telegraph" that could send multiple messages over a single wire. As he worked on this, he began to wonder: could he send the human voice over a wire?

Bell worked with a skilled electrician named Thomas Watson. They spent months experimenting in their laboratory. On March 10, 1876, Bell was in one room and Watson in another, connected by wire. Bell spoke into his device: "Mr. Watson, come here. I want to see you." Watson heard the words clearly through the wire. The telephone was born!

Bell was only twenty-nine years old when he invented the telephone. He demonstrated it at the 1876 Centennial Exhibition in Philadelphia, where the Emperor of Brazil famously exclaimed, "My God, it talks!" The invention caused a sensation.

Bell founded the Bell Telephone Company, which eventually became AT&T, one of the largest companies in the world. But Bell did not enjoy business. He sold most of his shares in the company and spent the rest of his life inventing and exploring ideas.

Bell''s curious mind led him in many directions. He experimented with flying machines before the Wright Brothers made their famous flight. He invented a metal detector, which was used to try to find the bullet in President James Garfield after he was shot. He developed better techniques to help deaf people. He helped found the National Geographic Society and served as its president.

Bell continued to care deeply about deaf education throughout his life. He believed deaf children could learn to speak and read lips rather than only using sign language. This view was controversial then and remains so today, but Bell''s dedication to helping deaf people was sincere.

Bell became a U.S. citizen in 1882. He built a summer home in Nova Scotia, Canada, where he continued experimenting until his death. On August 2, 1922, at age seventy-five, Bell died at his beloved Nova Scotia home. At the moment of his burial, every telephone in North America was silenced for one minute in his honor.

The telephone Bell invented has evolved into something he could never have imagined. Today''s smartphones do far more than transmit voice. They send messages, take photos, and connect to the internet. But it all started with Bell''s simple words: "Mr. Watson, come here. I want to see you."

Alexander Graham Bell showed that inventions often come from trying to solve human problems. His desire to help deaf people communicate led him to create something that connected the whole world.',
  NULL,
  '[]'::JSONB
)
RETURNING individual_id;

-- Questions for Alexander Graham Bell
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Alexander Graham Bell born?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 1
FROM red_white_who_individuals WHERE name = 'Alexander Graham Bell'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What family connection made Bell interested in helping deaf people?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 2
FROM red_white_who_individuals WHERE name = 'Alexander Graham Bell'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was the name of Bell''s assistant who heard the first telephone message?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 3
FROM red_white_who_individuals WHERE name = 'Alexander Graham Bell'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What were the first words ever spoken over a telephone?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 4
FROM red_white_who_individuals WHERE name = 'Alexander Graham Bell'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How old was Bell when he invented the telephone?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 5
FROM red_white_who_individuals WHERE name = 'Alexander Graham Bell'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where did Bell demonstrate the telephone in 1876?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 6
FROM red_white_who_individuals WHERE name = 'Alexander Graham Bell'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What major company did Bell found that became AT&T?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 7
FROM red_white_who_individuals WHERE name = 'Alexander Graham Bell'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Bell experiment with before the Wright Brothers made their famous flight?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 8
FROM red_white_who_individuals WHERE name = 'Alexander Graham Bell'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What society did Bell help found and serve as president?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 9
FROM red_white_who_individuals WHERE name = 'Alexander Graham Bell'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How was Bell honored at the moment of his burial?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 10
FROM red_white_who_individuals WHERE name = 'Alexander Graham Bell'
ON CONFLICT (individual_id, question_text) DO NOTHING;


-- Individual: Wright Brothers (Orville & Wilbur)
INSERT INTO red_white_who_individuals (name, birth_year, death_year, birth_date, death_date, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery)
VALUES (
  'Wright Brothers (Orville & Wilbur)',
  1867,
  1912,
  NULL,
  NULL,
  ARRAY['Achieved first powered airplane flight at Kitty Hawk', 'North Carolina'],
  '{"notes":"Grew up in Dayton, Ohio; Owned a bicycle repair shop; First powered flight: December 17, 1903; First flight lasted 12 seconds, covered 120 feet; Made four flights that day; Self-taught engineers who built their own wind tunnel; Developed the first practical airplane"}',
  'Orville and Wilbur Wright achieved one of humanity''s oldest dreams: they taught people to fly. On December 17, 1903, at Kitty Hawk, North Carolina, the Wright Brothers made the first powered, controlled airplane flight in history. This twelve-second flight changed the world forever.

Wilbur Wright was born in 1867 and Orville in 1871. They grew up in Dayton, Ohio, in a close, supportive family. Their father was a minister, and their mother was skilled with machines. She encouraged her children''s curiosity and could fix almost anything around the house.

When they were young, their father gave them a toy helicopter powered by a rubber band. The boys were fascinated. They played with it until it broke, then built their own copies. This toy sparked their lifelong interest in flight.

Neither brother finished high school, but both were brilliant at solving mechanical problems. They opened a bicycle repair shop and later began building their own bicycles. The skills they learned working with lightweight materials, chains, gears, and balance would prove essential when they turned to flying machines.

In the 1890s, the brothers became interested in gliders and flight. They read everything they could find about flying. They discovered that much of what people thought they knew about flight was wrong. They would have to figure things out themselves.

The Wrights were brilliant engineers. They built their own wind tunnel, one of the first in the world, to test wing designs. They spent years experimenting with kites and gliders. They traveled to Kitty Hawk, North Carolina, because it had steady winds and soft sand dunes perfect for landing.

Other inventors were trying to build airplanes too, but they focused on powerful engines. The Wrights realized that the bigger challenge was control. A bird does not just flap its wings. It steers by twisting and tilting them. The Wrights invented a system called "wing warping" that let the pilot control the airplane by twisting the wings slightly. This was their crucial breakthrough.

By 1903, the brothers had built a powered airplane called the Flyer. It had a wingspan of forty feet and weighed about 600 pounds with the pilot. They built the engine themselves because no existing engine was light enough and powerful enough.

On December 17, 1903, at Kitty Hawk, they were ready. The wind was cold and strong, perfect flying weather. Orville lay flat on the lower wing, took the controls, and the Flyer lifted off the ground.

That first flight lasted only twelve seconds and covered 120 feet, less than the length of a football field. But for the first time in history, a machine carrying a human had taken off under its own power, flown through the air, and landed safely.

The brothers made three more flights that day. The longest, piloted by Wilbur, lasted 59 seconds and covered 852 feet. Then a gust of wind flipped the Flyer and damaged it. They never flew that plane again, but they had made history.

Amazingly, the world mostly ignored their achievement at first. Many people did not believe anyone had really flown. The brothers kept improving their planes, and by 1905, they could fly for more than half an hour at a time. Finally, in 1908, they gave public demonstrations that amazed crowds and made them famous.

Wilbur Wright died of typhoid fever in 1912 at age forty-five. Orville lived until 1948 and saw airplanes transform warfare, transportation, and the world.

The Wright Brothers succeeded where others failed because they approached flight systematically. They did not just try to build a plane. They first understood how flying worked. They tested, failed, learned, and tried again. Their story shows that careful thinking and persistence can solve even the most difficult problems.

Today, part of their original Flyer is in the Smithsonian''s National Air and Space Museum. The bicycle mechanics from Dayton, Ohio, gave humanity the gift of flight.',
  NULL,
  '[]'::JSONB
)
RETURNING individual_id;

-- Questions for Wright Brothers (Orville & Wilbur)
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where did the Wright Brothers grow up?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 1
FROM red_white_who_individuals WHERE name = 'Wright Brothers (Orville & Wilbur)'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What toy from their father sparked their interest in flight?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 2
FROM red_white_who_individuals WHERE name = 'Wright Brothers (Orville & Wilbur)'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What business did the Wright Brothers own before building airplanes?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 3
FROM red_white_who_individuals WHERE name = 'Wright Brothers (Orville & Wilbur)'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What device did the brothers build to test wing designs?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 4
FROM red_white_who_individuals WHERE name = 'Wright Brothers (Orville & Wilbur)'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Why did the Wright Brothers choose Kitty Hawk, North Carolina?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 5
FROM red_white_who_individuals WHERE name = 'Wright Brothers (Orville & Wilbur)'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What control system did the Wrights invent to steer their airplane?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 6
FROM red_white_who_individuals WHERE name = 'Wright Brothers (Orville & Wilbur)'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'On what date did the first powered flight take place?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 7
FROM red_white_who_individuals WHERE name = 'Wright Brothers (Orville & Wilbur)'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How long did the first flight last, and how far did it travel?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 8
FROM red_white_who_individuals WHERE name = 'Wright Brothers (Orville & Wilbur)'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many flights did the Wright Brothers make on December 17, 1903?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 9
FROM red_white_who_individuals WHERE name = 'Wright Brothers (Orville & Wilbur)'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where is the original Wright Flyer displayed today?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 10
FROM red_white_who_individuals WHERE name = 'Wright Brothers (Orville & Wilbur)'
ON CONFLICT (individual_id, question_text) DO NOTHING;


-- Individual: Neil Armstrong
INSERT INTO red_white_who_individuals (name, birth_year, death_year, birth_date, death_date, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery)
VALUES (
  'Neil Armstrong',
  1930,
  2012,
  NULL,
  NULL,
  ARRAY['First human to walk on the moon'],
  '{"notes":"Born in Wapakoneta, Ohio; Earned pilot''s license before driver''s license; Navy pilot who flew in Korean War; Became NASA astronaut in 1962; Commanded Apollo 11 mission; First moonwalk: July 20, 1969; Famous quote: That''s one small step for man, one giant leap for mankind"}',
  'Neil Armstrong was the first human being to walk on the moon. On July 20, 1969, he stepped onto the lunar surface and spoke words heard by millions around the world: "That''s one small step for man, one giant leap for mankind." His achievement represented the greatest exploration in human history.

Neil Alden Armstrong was born on August 5, 1930, in Wapakoneta, Ohio. From early childhood, he was fascinated by airplanes. When he was six, his father took him on his first airplane ride. From that moment, Neil dreamed of flying.

Neil earned his pilot''s license when he was just sixteen years old, before he could even drive a car! He worked at a local airport and took odd jobs to pay for flying lessons. After high school, he studied aeronautical engineering at Purdue University on a Navy scholarship.

When the Korean War started, Neil became a Navy fighter pilot. He flew 78 combat missions from an aircraft carrier. On one mission, his plane was damaged and he had to eject to safety. His experience as a test pilot and combat veteran made him perfect for the dangerous job of astronaut.

After the war, Armstrong became a test pilot, flying experimental aircraft at incredible speeds and altitudes. He flew the X-15 rocket plane to the edge of space, reaching speeds over 4,000 miles per hour. Test pilots have one of the most dangerous jobs in the world, but Armstrong stayed calm in emergencies that would panic most people.

In 1962, NASA selected Armstrong as an astronaut. He first flew to space in 1966 on the Gemini 8 mission. During that flight, the spacecraft began spinning out of control. Armstrong kept his cool and saved the mission by using emergency procedures. NASA knew they had found someone who could handle anything.

In 1969, President Kennedy''s challenge to land a man on the moon before the decade ended was about to be achieved. NASA chose Armstrong to command Apollo 11 and be the first person to walk on the moon.

On July 16, 1969, Apollo 11 launched from Florida carrying Armstrong, Buzz Aldrin, and Michael Collins. The world watched as the spacecraft traveled 240,000 miles to the moon over three days.

On July 20, Armstrong and Aldrin entered the lunar module Eagle and began their descent. As they approached, alarms started going off because the computer was overloaded! Armstrong had to take manual control and fly past a boulder field to find a safe landing spot. With only about 25 seconds of fuel left, he landed safely. "The Eagle has landed," he reported.

Six hours later, Armstrong climbed down the ladder and became the first human to set foot on another world. About 600 million people watched on television. Armstrong and Aldrin spent about two and a half hours on the moon''s surface, collecting samples, taking photos, and planting an American flag.

The astronauts returned safely to Earth on July 24, splashing down in the Pacific Ocean. They were celebrated as heroes around the world.

Armstrong did not enjoy being famous. He was a humble, private man who believed the moon landing was a team effort involving hundreds of thousands of people. He left NASA in 1971 and became a professor of engineering.

Neil Armstrong died on August 25, 2012, at age eighty-two. His family asked that when people see the moon, they think of Neil Armstrong and give him a wink.

Armstrong''s moonwalk proved that humans can achieve the seemingly impossible. It took courage, teamwork, and dedication, and one small step that changed how we see ourselves and our place in the universe.',
  NULL,
  '[]'::JSONB
)
RETURNING individual_id;

-- Questions for Neil Armstrong
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Neil Armstrong born?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 1
FROM red_white_who_individuals WHERE name = 'Neil Armstrong'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Armstrong achieve before he could drive a car?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 2
FROM red_white_who_individuals WHERE name = 'Neil Armstrong'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many combat missions did Armstrong fly during the Korean War?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 3
FROM red_white_who_individuals WHERE name = 'Neil Armstrong'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What experimental aircraft did Armstrong fly as a test pilot?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 4
FROM red_white_who_individuals WHERE name = 'Neil Armstrong'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What emergency did Armstrong handle on the Gemini 8 mission?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 5
FROM red_white_who_individuals WHERE name = 'Neil Armstrong'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was the name of the Apollo 11 lunar module?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 6
FROM red_white_who_individuals WHERE name = 'Neil Armstrong'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'On what date did Armstrong first walk on the moon?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 7
FROM red_white_who_individuals WHERE name = 'Neil Armstrong'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What famous words did Armstrong say as he stepped onto the moon?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 8
FROM red_white_who_individuals WHERE name = 'Neil Armstrong'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'About how many people worldwide watched the moon landing on television?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 9
FROM red_white_who_individuals WHERE name = 'Neil Armstrong'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How long did Armstrong and Aldrin spend on the moon''s surface?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 10
FROM red_white_who_individuals WHERE name = 'Neil Armstrong'
ON CONFLICT (individual_id, question_text) DO NOTHING;


-- Individual: Jackie Robinson
INSERT INTO red_white_who_individuals (name, birth_year, death_year, birth_date, death_date, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery)
VALUES (
  'Jackie Robinson',
  1919,
  1972,
  NULL,
  NULL,
  ARRAY['Broke Major League Baseball''s color barrier'],
  '{"notes":"Born in Cairo, Georgia; Star athlete at UCLA in four sports; U.S. Army lieutenant during World War II; First African American in modern Major League Baseball (1947); Rookie of the Year 1947, MVP 1949; Number 42 retired by all MLB teams"}',
  'Jackie Robinson was a baseball hero who changed America. In 1947, he became the first African American to play in Major League Baseball in the modern era. By breaking baseball''s color barrier with courage and skill, he helped pave the way for the Civil Rights Movement.

Jack Roosevelt Robinson was born on January 31, 1919, in Cairo, Georgia. His family was poor, and after his father left, Jackie''s mother moved the family to Pasadena, California. Money was tight, but Jackie discovered he had incredible athletic talent.

At UCLA, Jackie became the first athlete to earn letters in four sports: baseball, basketball, football, and track. He was a star in all of them!

Jackie joined the U.S. Army and became a lieutenant. He faced racism in the military and was even court-martialed for refusing to move to the back of a military bus. He was found not guilty, but the experience showed him how much racism existed in America.

After the war, Jackie played baseball in the Negro Leagues for the Kansas City Monarchs. The Negro Leagues were separate professional baseball leagues for Black players because Major League Baseball did not allow African Americans to play.

Branch Rickey, president of the Brooklyn Dodgers, wanted to change that. He needed a player who was talented enough to succeed AND strong enough to face hatred without fighting back. He chose Jackie Robinson.

When Rickey met with Jackie, he described the terrible treatment Jackie would face: insults, threats, players trying to hurt him. He asked Jackie if he could handle it without fighting back. Rickey said, "I''m looking for a ballplayer with guts enough NOT to fight back."

Jackie agreed. He understood that if he fought back, people would use it as an excuse to say Black players did not belong in the majors.

On April 15, 1947, Jackie Robinson took the field for the Brooklyn Dodgers. The color barrier was broken.

That first season was brutal. Pitchers threw at his head. Base runners tried to spike him with their cleats. Fans shouted terrible slurs. Hotels would not let him stay with the team. He received death threats.

Through it all, Jackie kept his promise. He did not fight back with his fists. Instead, he fought back with his bat, his glove, and his speed. He hit .297, stole 29 bases, and was named Rookie of the Year.

Over his ten-year career, Jackie was selected for six All-Star games, won the MVP award in 1949, and helped the Dodgers win the World Series in 1955.

Jackie''s success opened the door for other Black players. Soon, stars like Willie Mays, Hank Aaron, and many others were playing in the majors. Baseball, and America, would never be the same.

After retiring from baseball in 1956, Jackie remained active in civil rights. He never stopped speaking out against injustice.

Jackie Robinson died on October 24, 1972, at age fifty-three. In 1997, Major League Baseball retired his number 42 across all teams. No player on any team will ever wear that number again. Every year on April 15, every MLB player wears 42 to honor Jackie Robinson Day.

Jackie Robinson showed that courage is not about fighting back. Sometimes it is about having the strength not to. His dignity in the face of hatred helped change hearts and minds.',
  NULL,
  '[]'::JSONB
)
RETURNING individual_id;

-- Questions for Jackie Robinson
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Jackie Robinson born?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 1
FROM red_white_who_individuals WHERE name = 'Jackie Robinson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many sports did Jackie Robinson earn letters in at UCLA?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 2
FROM red_white_who_individuals WHERE name = 'Jackie Robinson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What rank did Jackie Robinson hold in the U.S. Army?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 3
FROM red_white_who_individuals WHERE name = 'Jackie Robinson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What team did Jackie Robinson play for in the Negro Leagues?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 4
FROM red_white_who_individuals WHERE name = 'Jackie Robinson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who was the Brooklyn Dodgers president who recruited Jackie Robinson?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 5
FROM red_white_who_individuals WHERE name = 'Jackie Robinson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'On what date did Jackie break Major League Baseball''s color barrier?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 6
FROM red_white_who_individuals WHERE name = 'Jackie Robinson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What award did Jackie Robinson win in his first season?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 7
FROM red_white_who_individuals WHERE name = 'Jackie Robinson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What award did Jackie Robinson win in 1949?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 8
FROM red_white_who_individuals WHERE name = 'Jackie Robinson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What special honor did MLB give Jackie Robinson''s number 42?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 9
FROM red_white_who_individuals WHERE name = 'Jackie Robinson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What date each year do MLB players wear number 42?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 10
FROM red_white_who_individuals WHERE name = 'Jackie Robinson'
ON CONFLICT (individual_id, question_text) DO NOTHING;


-- Individual: Amelia Earhart
INSERT INTO red_white_who_individuals (name, birth_year, death_year, birth_date, death_date, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery)
VALUES (
  'Amelia Earhart',
  1897,
  1937,
  NULL,
  NULL,
  ARRAY['First woman to fly solo across the Atlantic Ocean'],
  '{"notes":"Born in Atchison, Kansas; First woman to fly solo across Atlantic (1932); Set many flying records; Advocate for women in aviation; Disappeared during around-the-world flight in 1937; Her disappearance remains a mystery"}',
  'Amelia Earhart was a fearless pilot who broke records and inspired women around the world to reach for the sky. She was the first woman to fly solo across the Atlantic Ocean and set many other flying records. Her mysterious disappearance made her a legend.

Amelia was born on July 24, 1897, in Atchison, Kansas. Even as a child, she was adventurous and did not follow the rules for how girls were "supposed" to act. She climbed trees and loved exploring. She collected newspaper clippings about successful women to inspire herself.

In 1920, Amelia attended a stunt-flying exhibition. When she saw a plane swoop toward the crowd, she knew she had to fly. She later said, "As soon as we left the ground, I knew I myself had to fly."

Amelia took flying lessons and worked many jobs to pay for them. In 1921, she bought her first plane, a bright yellow biplane she called "The Canary."

In 1928, Amelia became the first woman to cross the Atlantic Ocean by airplane, but only as a passenger. She was honest about her role, saying she felt like "a sack of potatoes" during the flight because she did not actually pilot the plane. But she was determined to make the crossing herself.

On May 20, 1932, Amelia took off from Newfoundland, Canada. She faced thick clouds, ice on her wings, and mechanical problems. After nearly fifteen hours alone in the cockpit, she landed in Northern Ireland. She had become the first woman to fly solo across the Atlantic Ocean!

The achievement made Amelia the most famous woman in America. She received the Distinguished Flying Cross from Congress, the first woman to receive the honor. She used her fame to encourage other women to pursue their dreams.

Amelia continued to set records. She was the first person to fly solo from Hawaii to California. She set speed and altitude records and became a symbol of what women could achieve.

In 1937, Amelia attempted her greatest challenge: flying around the world at the equator. She and her navigator, Fred Noonan, took off from Miami and flew east. By early July, they had completed about 22,000 miles. Only 7,000 remained.

On July 2, 1937, Amelia and Fred took off from New Guinea heading for tiny Howland Island in the Pacific Ocean. They never arrived. Despite a massive search by the U.S. Navy, no trace of Amelia, Fred, or their plane was ever found.

What happened to Amelia Earhart? No one knows for certain. Her disappearance remains one of history''s greatest mysteries.

Amelia was only thirty-nine when she disappeared. But she accomplished incredible things. She showed that women could be just as brave and skilled as men.

In her last letter, Amelia wrote: "Women must try to do things as men have tried. When they fail, their failure must be but a challenge to others."

Amelia Earhart''s courage continues to inspire people today. She proved that limits are often just waiting to be broken.',
  NULL,
  '[]'::JSONB
)
RETURNING individual_id;

-- Questions for Amelia Earhart
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where and when was Amelia Earhart born?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 1
FROM red_white_who_individuals WHERE name = 'Amelia Earhart'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What experience in 1920 made Amelia decide she had to fly?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 2
FROM red_white_who_individuals WHERE name = 'Amelia Earhart'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Amelia call her first plane?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 3
FROM red_white_who_individuals WHERE name = 'Amelia Earhart'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'In what year did Amelia become the first woman to fly solo across the Atlantic?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 4
FROM red_white_who_individuals WHERE name = 'Amelia Earhart'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where did Amelia land after her solo Atlantic crossing?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 5
FROM red_white_who_individuals WHERE name = 'Amelia Earhart'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What honor was Amelia the first woman to receive from Congress?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 6
FROM red_white_who_individuals WHERE name = 'Amelia Earhart'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Amelia attempting when she disappeared in 1937?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 7
FROM red_white_who_individuals WHERE name = 'Amelia Earhart'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who was Amelia''s navigator on her final flight?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 8
FROM red_white_who_individuals WHERE name = 'Amelia Earhart'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What tiny island was Amelia trying to reach when she disappeared?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 9
FROM red_white_who_individuals WHERE name = 'Amelia Earhart'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Amelia say about women trying things in her last letter?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 10
FROM red_white_who_individuals WHERE name = 'Amelia Earhart'
ON CONFLICT (individual_id, question_text) DO NOTHING;


-- Individual: Ulysses S. Grant
INSERT INTO red_white_who_individuals (name, birth_year, death_year, birth_date, death_date, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery)
VALUES (
  'Ulysses S. Grant',
  1822,
  1885,
  NULL,
  NULL,
  ARRAY['Led Union Army to victory in the Civil War'],
  '{"notes":"Born in Point Pleasant, Ohio; Graduated from West Point; Served in Mexican-American War; Became commanding general of Union forces in 1864; Accepted Confederate surrender at Appomattox; 18th President of the United States (1869-1877); Wrote famous memoirs"}',
  'Ulysses S. Grant was the general who won the Civil War for the Union and later served as the 18th President. His military genius and determination saved the nation during its darkest hour.

Hiram Ulysses Grant was born on April 27, 1822, in Point Pleasant, Ohio. His name was accidentally changed to Ulysses S. Grant when he enrolled at West Point, and he kept it. His father was a leather tanner, and young Ulysses hated working in the tannery. He had a remarkable talent with horses.

Grant attended West Point, where he was an average student except in horsemanship. He fought in the Mexican-American War, where he gained valuable experience.

After the Mexican War, Grant struggled. He missed his wife Julia and children. He resigned from the Army and tried farming and other businesses, failing at all of them. By 1861, when the Civil War began, Grant was working in his father''s leather goods store. He seemed like a failure.

But war changed everything. Grant rejoined the Army and quickly showed his talents. In 1862, he captured Fort Donelson in Tennessee, demanding "unconditional and immediate surrender," earning him the nickname "Unconditional Surrender Grant."

Grant understood that the Union had more men and resources than the Confederacy. His strategy was to keep attacking so the enemy could not recover. This approach was costly, but it worked.

In 1863, Grant won one of the war''s most important victories at Vicksburg, Mississippi. After a long siege, the Confederate fortress surrendered on July 4. The Union now controlled the Mississippi River, splitting the Confederacy in two.

President Lincoln noticed Grant''s success while other generals kept losing. In March 1864, Lincoln promoted Grant to command all Union armies.

On April 9, 1865, Confederate General Robert E. Lee surrendered to Grant at Appomattox Court House in Virginia. The Civil War was effectively over. Grant was generous in victory, allowing Confederate soldiers to keep their horses and go home in peace.

In 1868, Grant was elected president with the slogan "Let Us Have Peace." As president, Grant worked to protect the rights of newly freed Black Americans. He supported the 15th Amendment, which gave Black men the right to vote, and he sent federal troops to fight the Ku Klux Klan.

After leaving office, Grant went on a world tour. But bad investments left him nearly broke. When he was diagnosed with throat cancer, he began writing his memoirs to provide for his family.

Grant wrote through terrible pain, racing against death to finish his book. He completed it just days before he died on July 23, 1885. His "Personal Memoirs" became a bestseller.

Ulysses S. Grant saved the Union and fought for civil rights. When his country needed him most, he answered the call.',
  NULL,
  '[]'::JSONB
)
RETURNING individual_id;

-- Questions for Ulysses S. Grant
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Ulysses S. Grant born?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 1
FROM red_white_who_individuals WHERE name = 'Ulysses S. Grant'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was special about Grant''s abilities with horses?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 2
FROM red_white_who_individuals WHERE name = 'Ulysses S. Grant'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What nickname did Grant earn from his demand at Fort Donelson?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 3
FROM red_white_who_individuals WHERE name = 'Ulysses S. Grant'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What important victory did Grant win on July 4, 1863?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 4
FROM red_white_who_individuals WHERE name = 'Ulysses S. Grant'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What rank did Lincoln give Grant in March 1864?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 5
FROM red_white_who_individuals WHERE name = 'Ulysses S. Grant'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where did Confederate General Lee surrender to Grant?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 6
FROM red_white_who_individuals WHERE name = 'Ulysses S. Grant'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How did Grant treat the defeated Confederate soldiers?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 7
FROM red_white_who_individuals WHERE name = 'Ulysses S. Grant'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What amendment did Grant support that gave Black men the right to vote?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 8
FROM red_white_who_individuals WHERE name = 'Ulysses S. Grant'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What group did Grant send federal troops to fight?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 9
FROM red_white_who_individuals WHERE name = 'Ulysses S. Grant'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What famous book did Grant write while dying of cancer?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 10
FROM red_white_who_individuals WHERE name = 'Ulysses S. Grant'
ON CONFLICT (individual_id, question_text) DO NOTHING;


-- Individual: Susan B. Anthony
INSERT INTO red_white_who_individuals (name, birth_year, death_year, birth_date, death_date, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery)
VALUES (
  'Susan B. Anthony',
  1820,
  1906,
  NULL,
  NULL,
  ARRAY['Leader of the women''s suffrage movement'],
  '{"notes":"Born in Adams, Massachusetts to a Quaker family; Campaigned for abolition of slavery; Arrested for voting illegally in 1872; Co-founded National Woman Suffrage Association; Gave about 100 speeches per year for 45 years; Women gained right to vote 14 years after her death"}',
  'Susan B. Anthony dedicated her entire adult life to fighting for women''s right to vote. She traveled across the country giving speeches, organized campaigns, and even got arrested for voting. Though she died before women won the right to vote, her work made that victory possible.

Susan Brownell Anthony was born on February 15, 1820, in Adams, Massachusetts, into a Quaker family. Quakers believed in equality between men and women, which influenced Susan''s beliefs about justice.

Susan was an excellent student. At seventeen, she became a teacher. But she was shocked to discover that male teachers earned four times as much as female teachers for doing the same work. This injustice stuck with her.

Susan first became active in the temperance movement, which worked to reduce alcohol use. But when Susan tried to speak at a temperance meeting, she was told that women should listen, not speak. This made her realize that women needed the right to vote to have any real power.

In 1851, Susan met Elizabeth Cady Stanton, who became her lifelong friend and partner in the fight for women''s rights. They made a perfect team: Stanton was the writer who developed ideas, while Anthony was the organizer who spread those ideas.

Susan gave about 75 to 100 speeches per year for 45 years! She traveled in freezing trains and faced hostile crowds. People threw rotten eggs at her. But she never stopped.

In 1869, Susan and Elizabeth founded the National Woman Suffrage Association. Susan became its leader and chief organizer.

In 1872, Susan did something bold: she voted in the presidential election. This was illegal because women were not allowed to vote. Susan was arrested and put on trial. The judge fined her 100 dollars.

Susan refused to pay. "Resistance to tyranny is obedience to God," she declared. The fine was never collected.

Every year, Susan went to Congress to ask for a constitutional amendment giving women the right to vote. Every year, she was rejected. But she never gave up hope. When asked if women would ever win the vote, she replied, "Failure is impossible."

Susan B. Anthony died on March 13, 1906, at age eighty-six. She did not live to see women gain the right to vote.

In 1920, fourteen years after Susan''s death, the Nineteenth Amendment gave American women the right to vote. It is sometimes called the "Susan B. Anthony Amendment" in her honor.

Today, Susan B. Anthony''s image appears on the one-dollar coin. Her greatest monument is the right that American women now take for granted: the right to vote.',
  NULL,
  '[]'::JSONB
)
RETURNING individual_id;

-- Questions for Susan B. Anthony
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Susan B. Anthony born, and what religious background did her family have?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 1
FROM red_white_who_individuals WHERE name = 'Susan B. Anthony'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What injustice as a teacher first opened Susan''s eyes to inequality?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 2
FROM red_white_who_individuals WHERE name = 'Susan B. Anthony'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who was Susan''s lifelong friend and partner in the women''s rights movement?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 3
FROM red_white_who_individuals WHERE name = 'Susan B. Anthony'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'About how many speeches did Susan give per year for 45 years?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 4
FROM red_white_who_individuals WHERE name = 'Susan B. Anthony'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What organization did Susan and Elizabeth found in 1869?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 5
FROM red_white_who_individuals WHERE name = 'Susan B. Anthony'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Susan do illegally in 1872, and what happened to her?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 6
FROM red_white_who_individuals WHERE name = 'Susan B. Anthony'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Susan''s famous response when asked if women would win the vote?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 7
FROM red_white_who_individuals WHERE name = 'Susan B. Anthony'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many years after Susan''s death did women gain the right to vote?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 8
FROM red_white_who_individuals WHERE name = 'Susan B. Anthony'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What constitutional amendment gave women the right to vote?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 9
FROM red_white_who_individuals WHERE name = 'Susan B. Anthony'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What piece of money features Susan B. Anthony''s image?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 10
FROM red_white_who_individuals WHERE name = 'Susan B. Anthony'
ON CONFLICT (individual_id, question_text) DO NOTHING;


-- Individual: Clara Barton
INSERT INTO red_white_who_individuals (name, birth_year, death_year, birth_date, death_date, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery)
VALUES (
  'Clara Barton',
  1821,
  1912,
  NULL,
  NULL,
  ARRAY['Founded the American Red Cross'],
  '{"notes":"Born in Oxford, Massachusetts; Nursed wounded soldiers during Civil War; Called Angel of the Battlefield; Founded American Red Cross in 1881; Led Red Cross until age 83"}',
  'Clara Barton was a nurse and humanitarian who founded the American Red Cross. During the Civil War, she risked her life to bring supplies and care to wounded soldiers on the battlefield.

Clarissa Harlowe Barton was born on December 25, 1821, in Oxford, Massachusetts. When her brother David was badly injured in a fall, eleven-year-old Clara nursed him for two years. This sparked her desire to help others.

At seventeen, Clara became a teacher. In 1852, she founded one of New Jersey''s first free public schools, which grew from six students to over 600.

Clara moved to Washington, D.C., and became one of the first women to work in the U.S. Patent Office, earning the same salary as men.

When the Civil War began in 1861, Clara saw soldiers arriving in Washington who desperately needed supplies. She collected bandages, medicine, and food. Soon, she had warehouses full of supplies.

Clara did not just collect supplies. She delivered them to the front lines herself. She traveled to battlefields where fighting was still happening. At the Battle of Antietam, a bullet passed through her sleeve while she was helping a wounded soldier.

Soldiers called Clara the "Angel of the Battlefield." She comforted the dying and wrote letters home for men who could not write. She helped everyone regardless of which side they fought on.

After the war, Clara helped identify soldiers who had died in prison camps and notify their families. At Andersonville prison, she helped mark over 13,000 graves.

When Clara went to Europe to rest, she learned about the International Red Cross. She was amazed. This was exactly what she believed in!

When Clara returned to America, she campaigned to create an American Red Cross. In 1881, she founded the American Red Cross and served as its president for over twenty years.

Under Clara''s leadership, the American Red Cross helped victims of floods, fires, hurricanes, and other disasters. She personally traveled to disaster sites well into her seventies.

Clara Barton died on April 12, 1912, at age ninety.

Today, the American Red Cross continues Clara''s mission, responding to disasters and helping people in need. Every time the Red Cross helps someone in crisis, it continues the work Clara Barton began.',
  NULL,
  '[]'::JSONB
)
RETURNING individual_id;

-- Questions for Clara Barton
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where and when was Clara Barton born?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 1
FROM red_white_who_individuals WHERE name = 'Clara Barton'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What experience at age eleven inspired Clara''s desire to help others?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 2
FROM red_white_who_individuals WHERE name = 'Clara Barton'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was unusual about Clara''s salary at the U.S. Patent Office?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 3
FROM red_white_who_individuals WHERE name = 'Clara Barton'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What nickname did soldiers give Clara Barton?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 4
FROM red_white_who_individuals WHERE name = 'Clara Barton'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What famous battle site did Clara help at, where a bullet passed through her sleeve?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 5
FROM red_white_who_individuals WHERE name = 'Clara Barton'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What work did Clara do at Andersonville prison after the war?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 6
FROM red_white_who_individuals WHERE name = 'Clara Barton'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'In what year did Clara found the American Red Cross?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 7
FROM red_white_who_individuals WHERE name = 'Clara Barton'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How long did Clara serve as president of the American Red Cross?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 8
FROM red_white_who_individuals WHERE name = 'Clara Barton'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How old was Clara when she still traveled to disaster sites?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 9
FROM red_white_who_individuals WHERE name = 'Clara Barton'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What organization continues Clara Barton''s mission today?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 10
FROM red_white_who_individuals WHERE name = 'Clara Barton'
ON CONFLICT (individual_id, question_text) DO NOTHING;


-- Individual: John Adams
INSERT INTO red_white_who_individuals (name, birth_year, death_year, birth_date, death_date, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery)
VALUES (
  'John Adams',
  1735,
  1826,
  NULL,
  NULL,
  ARRAY['Second President and leading advocate for independence'],
  '{"notes":"Born in Braintree, Massachusetts; Harvard-educated lawyer; Defended British soldiers after Boston Massacre; Leading advocate for independence in Continental Congress; First Vice President and second President; Died on July 4, 1826, same day as Thomas Jefferson"}',
  'John Adams was a brilliant Founding Father who helped lead America to independence. He served as the first Vice President and second President of the United States.

Adams was born on October 30, 1735, in Braintree (now Quincy), Massachusetts. His father was a farmer and church leader. After graduating from Harvard College, John became a lawyer.

Adams quickly became one of the best lawyers in Massachusetts. He was known for his honesty and belief that everyone deserved a fair trial. This belief was tested in 1770 after the Boston Massacre, when British soldiers shot and killed five colonists. Most lawyers were afraid to defend the soldiers, but Adams agreed to represent them. He believed even unpopular people deserved justice. He won the case for most of the soldiers.

In 1764, Adams married Abigail Smith, beginning one of the greatest partnerships in American history. Abigail was brilliant and outspoken. She was his most trusted advisor. Their letters give us wonderful insights into the founding era.

As tensions with Britain grew, Adams became one of the strongest voices for independence in the Continental Congress. Thomas Jefferson later called Adams "our Colossus."

Adams nominated George Washington to command the Continental Army and served on the committee that drafted the Declaration of Independence.

During the Revolutionary War, Adams served as a diplomat in Europe. He helped negotiate the Treaty of Paris, which officially ended the war.

Under the new Constitution, Adams served as the first Vice President under George Washington.

In 1796, Adams was elected the second President. His greatest achievement as president was keeping America out of war with France, even though it cost him popularity.

Adams lost the 1800 election to Thomas Jefferson. He retired to his farm in Quincy. For many years, he and Jefferson did not speak. But in 1812, they began writing letters to each other again. Their correspondence is one of the treasures of American literature.

John Adams died on July 4, 1826, exactly fifty years after the Declaration of Independence. His last words were reportedly "Thomas Jefferson survives." But unknown to Adams, Jefferson had died just hours earlier. The two old friends passed away on the same historic day.

Adams''s contributions to American freedom were immense. He fought for independence when it was dangerous and served his country faithfully.',
  NULL,
  '[]'::JSONB
)
RETURNING individual_id;

-- Questions for John Adams
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'In what Massachusetts town was John Adams born?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 1
FROM red_white_who_individuals WHERE name = 'John Adams'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What profession did Adams pursue after graduating from Harvard?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 2
FROM red_white_who_individuals WHERE name = 'John Adams'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What unpopular action did Adams take after the Boston Massacre?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 3
FROM red_white_who_individuals WHERE name = 'John Adams'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who was John Adams''s wife, known for her influential letters?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 4
FROM red_white_who_individuals WHERE name = 'John Adams'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'According to Thomas Jefferson, what role did Adams play in Congress?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 5
FROM red_white_who_individuals WHERE name = 'John Adams'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What position did Adams hold under President Washington?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 6
FROM red_white_who_individuals WHERE name = 'John Adams'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Adams''s greatest achievement as president regarding France?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 7
FROM red_white_who_individuals WHERE name = 'John Adams'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'On what historic date did John Adams die in 1826?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 8
FROM red_white_who_individuals WHERE name = 'John Adams'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What were reportedly Adams''s last words?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 9
FROM red_white_who_individuals WHERE name = 'John Adams'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was ironic about Adams''s last words?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 10
FROM red_white_who_individuals WHERE name = 'John Adams'
ON CONFLICT (individual_id, question_text) DO NOTHING;


-- Individual: Alexander Hamilton
INSERT INTO red_white_who_individuals (name, birth_year, death_year, birth_date, death_date, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery)
VALUES (
  'Alexander Hamilton',
  1755,
  NULL,
  NULL,
  NULL,
  ARRAY['First Secretary of the Treasury who established American financial system'],
  '{"notes":"Born in the Caribbean; Washington''s chief aide during Revolution; Primary author of Federalist Papers; First Secretary of the Treasury; Founded national bank; Killed in duel with Aaron Burr in 1804"}',
  'Alexander Hamilton''s life is one of America''s greatest stories. An orphan from the Caribbean, he became one of the most important Founding Fathers. He created America''s financial system.

Hamilton was born in 1755 or 1757 on the island of Nevis in the Caribbean. His father abandoned the family, and his mother died when Alexander was about eleven. Young Alexander was alone in the world.

What saved Hamilton was his extraordinary intelligence. Working as a clerk for a trading company, he impressed local businessmen who raised funds to send him to America for education. He arrived in New York in 1772 and enrolled at King''s College (now Columbia University).

When the Revolutionary War began, Hamilton joined the fight. He commanded an artillery company before catching George Washington''s attention. He became Washington''s chief aide-de-camp. For four years, Hamilton was Washington''s most trusted assistant. He finally got his battlefield command at Yorktown in 1781, leading a successful assault on British defenses.

After the war, Hamilton became a leading lawyer and a powerful voice for stronger national government. Along with James Madison and John Jay, Hamilton wrote the Federalist Papers, eighty-five essays defending the Constitution. Hamilton wrote fifty-one himself!

President Washington appointed Hamilton as the first Secretary of the Treasury in 1789. Hamilton created America''s financial system. He proposed that the federal government assume state debts from the Revolution. He created the First Bank of the United States.

Hamilton''s ideas were controversial. Thomas Jefferson and James Madison opposed many of his plans. This rivalry created America''s first political parties.

Hamilton''s life ended in tragedy. After years of political rivalry with Aaron Burr, the two men fought a duel on July 11, 1804. Burr''s shot struck Hamilton, who died the following day.

Hamilton''s face appears on the ten-dollar bill. The Broadway musical "Hamilton" has made him famous to a new generation. He showed that in America, where you come from matters less than what you can contribute.',
  NULL,
  '[]'::JSONB
)
RETURNING individual_id;

-- Questions for Alexander Hamilton
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Alexander Hamilton born?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 1
FROM red_white_who_individuals WHERE name = 'Alexander Hamilton'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What important position did Hamilton hold on Washington''s staff?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 2
FROM red_white_who_individuals WHERE name = 'Alexander Hamilton'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'At which battle did Hamilton lead an assault on British defenses?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 3
FROM red_white_who_individuals WHERE name = 'Alexander Hamilton'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What series of essays did Hamilton write with Madison and Jay?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 4
FROM red_white_who_individuals WHERE name = 'Alexander Hamilton'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many of the Federalist Papers did Hamilton write?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 5
FROM red_white_who_individuals WHERE name = 'Alexander Hamilton'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What position did Hamilton hold in Washington''s Cabinet?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 6
FROM red_white_who_individuals WHERE name = 'Alexander Hamilton'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What financial institution did Hamilton create?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 7
FROM red_white_who_individuals WHERE name = 'Alexander Hamilton'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who was Hamilton''s chief political rival from Virginia?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 8
FROM red_white_who_individuals WHERE name = 'Alexander Hamilton'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who killed Hamilton in a duel in 1804?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 9
FROM red_white_who_individuals WHERE name = 'Alexander Hamilton'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What piece of money has Hamilton''s face on it?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 10
FROM red_white_who_individuals WHERE name = 'Alexander Hamilton'
ON CONFLICT (individual_id, question_text) DO NOTHING;


-- Individual: Franklin D. Roosevelt
INSERT INTO red_white_who_individuals (name, birth_year, death_year, birth_date, death_date, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery)
VALUES (
  'Franklin D. Roosevelt',
  1882,
  1945,
  NULL,
  NULL,
  ARRAY['Led America through the Great Depression and World War II'],
  '{"notes":"Born in Hyde Park, New York; Stricken by polio in 1921; 32nd President elected four times (1933-1945); Created the New Deal; Led America in World War II; Only president to serve more than two terms"}',
  'Franklin Delano Roosevelt led America through two of its greatest challenges: the Great Depression and World War II. He was elected president four times, more than any other president.

Roosevelt was born on January 30, 1882, at his family''s estate in Hyde Park, New York. He came from a wealthy family. In 1905, he married Eleanor Roosevelt, who became one of history''s most influential first ladies.

Then disaster struck. In 1921, at age thirty-nine, Roosevelt contracted polio. The disease left his legs permanently paralyzed. Many assumed his political career was over.

Instead, through determination, Roosevelt rebuilt his life. He learned to "walk" short distances in heavy leg braces, supporting himself on a cane. His struggle with disability gave him deeper empathy.

Roosevelt was elected governor of New York in 1928. When the Great Depression began, his active response established his reputation. In 1932, promising "a new deal for the American people," he won the presidency.

Roosevelt took office with banks failing and unemployment at twenty-five percent. He pushed through legislation creating new agencies and used radio "fireside chats" to explain his programs directly to the American people.

The New Deal created Social Security to provide retirement insurance. It regulated banks and stock markets. It put people to work building roads, bridges, and parks.

When Japan attacked Pearl Harbor on December 7, 1941, America entered World War II. Roosevelt mobilized American industry and led the alliance with Britain and the Soviet Union.

Roosevelt won a fourth term in 1944. On April 12, 1945, he died of a stroke at age sixty-three. The nation mourned deeply.

Roosevelt left an America transformed. Social Security, regulated markets, and global leadership became permanent features of American life.',
  NULL,
  '[]'::JSONB
)
RETURNING individual_id;

-- Questions for Franklin D. Roosevelt
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Franklin D. Roosevelt born?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 1
FROM red_white_who_individuals WHERE name = 'Franklin D. Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who was FDR''s wife?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 2
FROM red_white_who_individuals WHERE name = 'Franklin D. Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What disease struck Roosevelt in 1921?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 3
FROM red_white_who_individuals WHERE name = 'Franklin D. Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was the name of FDR''s program to combat the Depression?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 4
FROM red_white_who_individuals WHERE name = 'Franklin D. Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What were FDR''s radio addresses called?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 5
FROM red_white_who_individuals WHERE name = 'Franklin D. Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many times was Roosevelt elected president?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 6
FROM red_white_who_individuals WHERE name = 'Franklin D. Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What program provided retirement insurance?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 7
FROM red_white_who_individuals WHERE name = 'Franklin D. Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was the date of Pearl Harbor?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 8
FROM red_white_who_individuals WHERE name = 'Franklin D. Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How old was Roosevelt when he died?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 9
FROM red_white_who_individuals WHERE name = 'Franklin D. Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What lasting programs did the New Deal create?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 10
FROM red_white_who_individuals WHERE name = 'Franklin D. Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;


-- Individual: John F. Kennedy
INSERT INTO red_white_who_individuals (name, birth_year, death_year, birth_date, death_date, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery)
VALUES (
  'John F. Kennedy',
  1917,
  1963,
  NULL,
  NULL,
  ARRAY['Youngest elected president who navigated the Cuban Missile Crisis'],
  '{"notes":"Born in Brookline, Massachusetts; Navy hero in World War II; 35th President (1961-1963); Created the Peace Corps; Navigated Cuban Missile Crisis; Assassinated in Dallas, November 22, 1963"}',
  'John Fitzgerald Kennedy brought youth and idealism to the presidency, inspiring a generation with his call to "ask what you can do for your country."

Kennedy was born on May 29, 1917, in Brookline, Massachusetts. His father Joseph was a wealthy businessman. Kennedy attended Harvard, graduating in 1940.

When America entered World War II, Kennedy joined the Navy. In 1943, a Japanese destroyer rammed his patrol boat, PT-109. Kennedy led the survivors to safety, towing an injured crewman. He became a war hero.

Kennedy won election to Congress in 1946 and to the Senate in 1952. In 1953, he married Jacqueline Bouvier. Kennedy won the 1960 election, becoming the youngest elected president at age forty-three.

Kennedy''s inaugural address defined his presidency: "Ask not what your country can do for you, ask what you can do for your country."

In October 1962, American reconnaissance discovered Soviet nuclear missiles in Cuba. The Cuban Missile Crisis was the Cold War''s most dangerous moment. For thirteen days, the world faced possible nuclear war. Kennedy chose a naval blockade and diplomacy. The Soviets agreed to remove the missiles.

Kennedy created the Peace Corps, sending American volunteers to developing countries. He launched the Apollo program to land a man on the moon. He proposed civil rights legislation.

On November 22, 1963, while riding in a motorcade through Dallas, Texas, Kennedy was shot and killed by Lee Harvey Oswald. He was forty-six.

Kennedy''s legacy includes his call to service and his navigation of the Cuban Missile Crisis. His tragic death ensured he remains one of America''s most iconic presidents.',
  NULL,
  '[]'::JSONB
)
RETURNING individual_id;

-- Questions for John F. Kennedy
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was John F. Kennedy born?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 1
FROM red_white_who_individuals WHERE name = 'John F. Kennedy'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What patrol boat incident made Kennedy a war hero?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 2
FROM red_white_who_individuals WHERE name = 'John F. Kennedy'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How old was Kennedy when he became president?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 3
FROM red_white_who_individuals WHERE name = 'John F. Kennedy'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What famous phrase came from Kennedy''s inaugural address?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 4
FROM red_white_who_individuals WHERE name = 'John F. Kennedy'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many days did the Cuban Missile Crisis last?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 5
FROM red_white_who_individuals WHERE name = 'John F. Kennedy'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What organization did Kennedy create to send volunteers abroad?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 6
FROM red_white_who_individuals WHERE name = 'John F. Kennedy'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What space program did Kennedy launch?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 7
FROM red_white_who_individuals WHERE name = 'John F. Kennedy'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'On what date was Kennedy assassinated?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 8
FROM red_white_who_individuals WHERE name = 'John F. Kennedy'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Kennedy assassinated?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 9
FROM red_white_who_individuals WHERE name = 'John F. Kennedy'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who assassinated President Kennedy?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 10
FROM red_white_who_individuals WHERE name = 'John F. Kennedy'
ON CONFLICT (individual_id, question_text) DO NOTHING;


-- Individual: Ronald Reagan
INSERT INTO red_white_who_individuals (name, birth_year, death_year, birth_date, death_date, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery)
VALUES (
  'Ronald Reagan',
  1911,
  2004,
  NULL,
  NULL,
  ARRAY['Conservative president who helped end the Cold War'],
  '{"notes":"Born in Tampico, Illinois; Hollywood actor; Governor of California; 40th President (1981-1989); Survived assassination attempt; Challenged Soviet Union; Berlin Wall fell 1989"}',
  'Ronald Reagan changed America''s direction and helped end the Cold War. His optimism earned him the nickname "The Great Communicator."

Reagan was born on February 6, 1911, in Tampico, Illinois. After college, he became a radio sportscaster, then a Hollywood actor, appearing in more than fifty films.

Reagan had been a Democrat, but his politics shifted rightward. In 1966, he was elected governor of California. In 1980, he won the presidency against Jimmy Carter.

Reagan took office at sixty-nine, the oldest president to that point. Just sixty-nine days later, he was shot by John Hinckley Jr. His grace under pressure, joking with surgeons that he hoped they were Republicans, strengthened his popularity.

Reagan''s economic program centered on tax cuts and reduced regulation. A recession in 1982 gave way to an economic boom.

Reagan called the Soviet Union an "evil empire" and launched a major military buildup. His relationship with Soviet leader Mikhail Gorbachev proved transformative. Their summits produced arms reduction treaties.

Reagan''s 1987 demand at the Berlin Wall, "Mr. Gorbachev, tear down this wall!" became a defining Cold War moment. The wall fell in 1989, and the Soviet Union collapsed in 1991.

Reagan left office in 1989 with high approval ratings. He died on June 5, 2004, at age ninety-three.

Reagan''s legacy includes a more conservative political climate and the end of the Cold War. He described America as "a shining city on a hill.',
  NULL,
  '[]'::JSONB
)
RETURNING individual_id;

-- Questions for Ronald Reagan
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Ronald Reagan born?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 1
FROM red_white_who_individuals WHERE name = 'Ronald Reagan'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What career did Reagan have before politics?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 2
FROM red_white_who_individuals WHERE name = 'Ronald Reagan'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What state did Reagan govern before becoming president?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 3
FROM red_white_who_individuals WHERE name = 'Ronald Reagan'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What happened 69 days into Reagan''s presidency?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 4
FROM red_white_who_individuals WHERE name = 'Ronald Reagan'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Reagan call the Soviet Union?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 5
FROM red_white_who_individuals WHERE name = 'Ronald Reagan'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who was the Soviet leader Reagan negotiated with?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 6
FROM red_white_who_individuals WHERE name = 'Ronald Reagan'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What famous words did Reagan say at the Berlin Wall?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 7
FROM red_white_who_individuals WHERE name = 'Ronald Reagan'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did the Berlin Wall fall?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 8
FROM red_white_who_individuals WHERE name = 'Ronald Reagan'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How old was Reagan when he died?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 9
FROM red_white_who_individuals WHERE name = 'Ronald Reagan'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What phrase did Reagan use to describe America?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 10
FROM red_white_who_individuals WHERE name = 'Ronald Reagan'
ON CONFLICT (individual_id, question_text) DO NOTHING;


-- Individual: Helen Keller
INSERT INTO red_white_who_individuals (name, birth_year, death_year, birth_date, death_date, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery)
VALUES (
  'Helen Keller',
  1880,
  1968,
  NULL,
  NULL,
  ARRAY['Overcame being deaf and blind to become an author and activist'],
  '{"notes":"Born in Alabama; Lost sight and hearing at 19 months; Learned to communicate with teacher Anne Sullivan; First deaf-blind person to earn college degree; Author and advocate for people with disabilities"}',
  'Helen Keller was one of the most remarkable people in history. Though deaf and blind from infancy, she learned to read, write, and speak, becoming a famous author and advocate.

Helen was born on June 27, 1880, in Tuscumbia, Alabama. At about nineteen months, she developed a severe illness that left her completely deaf and blind. Unable to see or hear, young Helen was trapped in a dark, silent world. She could not communicate and became wild and frustrated.

When Helen was six, her parents contacted the Perkins School for the Blind. The school sent Anne Sullivan, a young teacher who had been nearly blind herself.

Anne arrived in March 1887 and began spelling words into Helen''s hand. At first, Helen did not understand. Then came the breakthrough. Anne held Helen''s hand under a water pump while spelling W-A-T-E-R. Suddenly, Helen understood! The cool liquid had a name.

From that moment, Helen learned rapidly. She learned Braille. She learned to write. Most remarkably, she learned to speak by feeling vibrations of other people''s throats.

In 1900, Helen entered Radcliffe College. Anne sat beside her, spelling lectures into her hand. In 1904, Helen graduated with honors, becoming the first deaf-blind person to earn a college degree.

Helen wrote her autobiography, "The Story of My Life," which has been translated into fifty languages. She traveled to 39 countries, meeting presidents and kings, advocating for people with disabilities.

Helen Keller died on June 1, 1968. She showed that no obstacle is too great to overcome. She wrote, "Although the world is full of suffering, it is also full of the overcoming of it.',
  NULL,
  '[]'::JSONB
)
RETURNING individual_id;

-- Questions for Helen Keller
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Helen Keller born?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 1
FROM red_white_who_individuals WHERE name = 'Helen Keller'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What illness left Helen deaf and blind?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 2
FROM red_white_who_individuals WHERE name = 'Helen Keller'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who was Helen''s teacher?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 3
FROM red_white_who_individuals WHERE name = 'Helen Keller'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was the breakthrough moment that helped Helen understand language?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 4
FROM red_white_who_individuals WHERE name = 'Helen Keller'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What reading system did Helen learn?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 5
FROM red_white_who_individuals WHERE name = 'Helen Keller'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What college did Helen attend?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 6
FROM red_white_who_individuals WHERE name = 'Helen Keller'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Helen''s autobiography called?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 7
FROM red_white_who_individuals WHERE name = 'Helen Keller'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many countries did Helen travel to?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 8
FROM red_white_who_individuals WHERE name = 'Helen Keller'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What famous quote did Helen write about suffering?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 9
FROM red_white_who_individuals WHERE name = 'Helen Keller'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What distinction did Helen earn about college degrees?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 10
FROM red_white_who_individuals WHERE name = 'Helen Keller'
ON CONFLICT (individual_id, question_text) DO NOTHING;


-- Individual: George Washington Carver
INSERT INTO red_white_who_individuals (name, birth_year, death_year, birth_date, death_date, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery)
VALUES (
  'George Washington Carver',
  1864,
  1943,
  NULL,
  NULL,
  ARRAY['Agricultural scientist who revolutionized Southern farming'],
  '{"notes":"Born enslaved in Missouri; First Black faculty member at Iowa State; Joined Tuskegee Institute; Developed hundreds of products from peanuts and sweet potatoes; Helped poor farmers"}',
  'George Washington Carver was a brilliant scientist who transformed Southern agriculture. Born into slavery, he became one of America''s most famous scientists.

Carver was born around 1864 in Missouri. His mother was enslaved, and baby George was stolen by raiders. His mother was never found, but George was recovered and raised by his former owners.

George loved plants. Neighbors called him "the plant doctor." He desperately wanted an education but faced discrimination. He was rejected from Highland College when they discovered he was Black.

Carver did not give up. He enrolled at Simpson College in Iowa and later transferred to Iowa State, earning his master''s degree. He became Iowa State''s first Black faculty member.

In 1896, Booker T. Washington invited Carver to join Tuskegee Institute in Alabama. Carver arrived with almost no equipment. He and his students built their laboratory from materials found in trash heaps.

Carver saw that Southern farmers were destroying their soil by growing only cotton. He taught them to rotate crops, planting peanuts and sweet potatoes to restore nutrients.

In his laboratory, Carver discovered hundreds of uses for these crops. From peanuts, he developed dyes, plastics, and food products. From sweet potatoes, he created more than 100 products.

Carver became one of the most famous scientists in America. He met three presidents. Despite his fame, he never patented most of his discoveries because he believed they belonged to humanity.

George Washington Carver died on January 5, 1943. His birthplace became a national monument, the first dedicated to an African American.',
  NULL,
  '[]'::JSONB
)
RETURNING individual_id;

-- Questions for George Washington Carver
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Carver born?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 1
FROM red_white_who_individuals WHERE name = 'George Washington Carver'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did neighbors call young George?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 2
FROM red_white_who_individuals WHERE name = 'George Washington Carver'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Why was Carver rejected from Highland College?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 3
FROM red_white_who_individuals WHERE name = 'George Washington Carver'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What degrees did Carver earn from Iowa State?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 4
FROM red_white_who_individuals WHERE name = 'George Washington Carver'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who invited Carver to Tuskegee?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 5
FROM red_white_who_individuals WHERE name = 'George Washington Carver'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What farming practice did Carver teach?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 6
FROM red_white_who_individuals WHERE name = 'George Washington Carver'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many products did Carver develop from sweet potatoes?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 7
FROM red_white_who_individuals WHERE name = 'George Washington Carver'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Why didn''t Carver patent his discoveries?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 8
FROM red_white_who_individuals WHERE name = 'George Washington Carver'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many presidents did Carver meet?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 9
FROM red_white_who_individuals WHERE name = 'George Washington Carver'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What honor was given to Carver''s birthplace?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 10
FROM red_white_who_individuals WHERE name = 'George Washington Carver'
ON CONFLICT (individual_id, question_text) DO NOTHING;


-- Individual: Sojourner Truth
INSERT INTO red_white_who_individuals (name, birth_year, death_year, birth_date, death_date, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery)
VALUES (
  'Sojourner Truth',
  1797,
  1883,
  NULL,
  NULL,
  ARRAY['Abolitionist and women''s rights activist'],
  '{"notes":"Born enslaved in New York as Isabella Baumfree; Escaped slavery in 1826; Changed name to Sojourner Truth; Famous Ain''t I a Woman speech; Recruited Black soldiers during Civil War; Met President Lincoln"}',
  'Sojourner Truth was one of the most powerful voices against slavery and for women''s rights. Born into slavery, she became a famous speaker whose words inspired millions.

She was born Isabella Baumfree around 1797 in New York. She was enslaved and sold several times as a child. When New York freed enslaved people in 1827, Isabella walked away, carrying her infant daughter.

In 1843, she felt called by God to travel and preach. She changed her name to Sojourner Truth, explaining she would sojourn the land speaking truth.

Truth became famous for powerful speeches. Though she never learned to read or write, she was electrifying. She stood nearly six feet tall with a commanding voice.

Her most famous speech came in 1851 at a women''s rights convention in Ohio. Known as "Ain''t I a Woman?" the speech challenged those who said women were too weak for equal rights.

During the Civil War, Truth recruited Black soldiers for the Union Army. In 1864, she met President Abraham Lincoln at the White House.

Sojourner Truth died on November 26, 1883. She showed that one powerful voice can change the world.',
  NULL,
  '[]'::JSONB
)
RETURNING individual_id;

-- Questions for Sojourner Truth
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Sojourner Truth''s birth name?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 1
FROM red_white_who_individuals WHERE name = 'Sojourner Truth'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'In what state was she born into slavery?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 2
FROM red_white_who_individuals WHERE name = 'Sojourner Truth'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did she walk away from slavery?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 3
FROM red_white_who_individuals WHERE name = 'Sojourner Truth'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Why did she change her name to Sojourner Truth?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 4
FROM red_white_who_individuals WHERE name = 'Sojourner Truth'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was her most famous speech called?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 5
FROM red_white_who_individuals WHERE name = 'Sojourner Truth'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How tall was Sojourner Truth?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 6
FROM red_white_who_individuals WHERE name = 'Sojourner Truth'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did she do during the Civil War?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 7
FROM red_white_who_individuals WHERE name = 'Sojourner Truth'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Which president did she meet?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 8
FROM red_white_who_individuals WHERE name = 'Sojourner Truth'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Could Sojourner Truth read and write?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 9
FROM red_white_who_individuals WHERE name = 'Sojourner Truth'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where did she die?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 10
FROM red_white_who_individuals WHERE name = 'Sojourner Truth'
ON CONFLICT (individual_id, question_text) DO NOTHING;


-- Individual: Booker T. Washington
INSERT INTO red_white_who_individuals (name, birth_year, death_year, birth_date, death_date, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery)
VALUES (
  'Booker T. Washington',
  1856,
  1915,
  NULL,
  NULL,
  ARRAY['Educator who founded Tuskegee Institute'],
  '{"notes":"Born enslaved in Virginia; Founded Tuskegee Institute (1881); Advocated education for African Americans; Gave Atlanta Compromise speech (1895); Advised presidents; Most influential Black leader of his era"}',
  'Booker T. Washington was the most influential African American leader of his time. Born into slavery, he built Tuskegee Institute into one of the nation''s most important schools.

Washington was born on April 5, 1856, in Virginia. After the Civil War, his family moved to West Virginia, where young Booker worked in coal mines.

Washington desperately wanted an education. He traveled 500 miles to Hampton Institute in Virginia. When he arrived, a teacher told him to sweep a room. He cleaned it perfectly, and the teacher admitted him.

In 1881, Washington was asked to start a school for Black students in Tuskegee, Alabama. He arrived to find almost nothing. He started with thirty students in a rundown church.

Washington built Tuskegee from nothing into a major institution. Students learned practical trades like farming and carpentry. They built the school''s buildings themselves.

In 1895, Washington gave his famous "Atlanta Compromise" speech, arguing that Black and white Americans could work together economically while remaining socially separate.

Washington became the most powerful Black leader in America. Presidents sought his advice. His autobiography, "Up from Slavery," was widely read.

Not everyone agreed with Washington''s approach. W.E.B. Du Bois argued that Black Americans should demand full equality immediately.

Washington died on November 14, 1915. Tuskegee, now Tuskegee University, continues today.',
  NULL,
  '[]'::JSONB
)
RETURNING individual_id;

-- Questions for Booker T. Washington
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Booker T. Washington born?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 1
FROM red_white_who_individuals WHERE name = 'Booker T. Washington'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What test did the teacher give Washington at Hampton?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 2
FROM red_white_who_individuals WHERE name = 'Booker T. Washington'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did Washington found Tuskegee Institute?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 3
FROM red_white_who_individuals WHERE name = 'Booker T. Washington'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What trades did students learn at Tuskegee?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 4
FROM red_white_who_individuals WHERE name = 'Booker T. Washington'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Washington''s 1895 speech called?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 5
FROM red_white_who_individuals WHERE name = 'Booker T. Washington'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was his autobiography called?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 6
FROM red_white_who_individuals WHERE name = 'Booker T. Washington'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Which Black leader disagreed with Washington?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 7
FROM red_white_who_individuals WHERE name = 'Booker T. Washington'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What is Tuskegee called today?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 8
FROM red_white_who_individuals WHERE name = 'Booker T. Washington'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many students did Washington start with?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 9
FROM red_white_who_individuals WHERE name = 'Booker T. Washington'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How far did Washington travel to reach Hampton?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 10
FROM red_white_who_individuals WHERE name = 'Booker T. Washington'
ON CONFLICT (individual_id, question_text) DO NOTHING;


-- Individual: Dwight D. Eisenhower
INSERT INTO red_white_who_individuals (name, birth_year, death_year, birth_date, death_date, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery)
VALUES (
  'Dwight D. Eisenhower',
  1890,
  1969,
  NULL,
  NULL,
  ARRAY['Supreme Commander in WWII and 34th President'],
  '{"notes":"Born in Texas, raised in Kansas; Graduated West Point; Supreme Commander in Europe WWII; Planned D-Day; 34th President (1953-1961); Built Interstate Highway System"}',
  'Dwight Eisenhower led Allied forces to victory in Europe during World War II and then served two terms as President.

Eisenhower was born on October 14, 1890, in Texas but grew up in Abilene, Kansas. He won an appointment to West Point and became an Army officer.

In World War II, Eisenhower rose rapidly to command American forces in Europe. By 1943, he was Supreme Commander of all Allied forces preparing to invade Nazi-occupied Europe.

D-Day, June 6, 1944, was the largest seaborne invasion in history. Eisenhower planned and commanded Operation Overlord, landing over 150,000 troops on the beaches of Normandy, France. The Allies liberated France and pushed into Germany.

Eisenhower accepted Germany''s surrender on May 8, 1945.

In 1952, Eisenhower ran for president. His slogan, "I Like Ike," captured his popularity. He won in a landslide.

As president, Eisenhower ended the Korean War. He signed the Federal Highway Act of 1956, creating the Interstate Highway System. He sent federal troops to Little Rock, Arkansas, to enforce school desegregation.

In his farewell address, Eisenhower warned about the "military-industrial complex."

Eisenhower died on March 28, 1969. He is remembered as both a military hero and a steady president.',
  NULL,
  '[]'::JSONB
)
RETURNING individual_id;

-- Questions for Dwight D. Eisenhower
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where did Eisenhower grow up?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 1
FROM red_white_who_individuals WHERE name = 'Dwight D. Eisenhower'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What military academy did he attend?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 2
FROM red_white_who_individuals WHERE name = 'Dwight D. Eisenhower'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What position did Eisenhower hold during D-Day?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 3
FROM red_white_who_individuals WHERE name = 'Dwight D. Eisenhower'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was the date of D-Day?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 4
FROM red_white_who_individuals WHERE name = 'Dwight D. Eisenhower'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many troops landed at Normandy?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 5
FROM red_white_who_individuals WHERE name = 'Dwight D. Eisenhower'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Eisenhower''s campaign slogan?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 6
FROM red_white_who_individuals WHERE name = 'Dwight D. Eisenhower'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What highway system did Eisenhower create?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 7
FROM red_white_who_individuals WHERE name = 'Dwight D. Eisenhower'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Eisenhower do in Little Rock, Arkansas?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 8
FROM red_white_who_individuals WHERE name = 'Dwight D. Eisenhower'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What warning did Eisenhower give in his farewell address?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 9
FROM red_white_who_individuals WHERE name = 'Dwight D. Eisenhower'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What war did Eisenhower end as president?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 10
FROM red_white_who_individuals WHERE name = 'Dwight D. Eisenhower'
ON CONFLICT (individual_id, question_text) DO NOTHING;


-- Individual: Daniel Boone
INSERT INTO red_white_who_individuals (name, birth_year, death_year, birth_date, death_date, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery)
VALUES (
  'Daniel Boone',
  1734,
  1820,
  NULL,
  NULL,
  ARRAY['Frontiersman who blazed the Wilderness Road into Kentucky'],
  '{"notes":"Born in Pennsylvania; Explored Kentucky wilderness; Blazed Wilderness Road through Cumberland Gap; Founded Boonesborough; Captured by Shawnee and adopted into tribe; Symbol of frontier spirit"}',
  'Daniel Boone was America''s most famous frontiersman. He explored Kentucky and blazed trails that thousands of pioneers followed.

Boone was born on November 2, 1734, in Pennsylvania. His family moved to North Carolina when Daniel was a teenager. He became an expert hunter and marksman.

In 1769, Boone crossed the Appalachian Mountains into Kentucky. Few white people had ever seen this land. Boone spent two years exploring, amazed by the rich forests.

In 1775, Boone led thirty axmen to cut a trail through the Cumberland Gap. This became the Wilderness Road. At its end, Boone established Boonesborough.

In 1778, Shawnee warriors captured Boone. Instead of killing him, Chief Blackfish adopted him into the tribe, naming him "Sheltowee" (Big Turtle). Boone lived with the Shawnee for months while secretly planning escape.

When Boone learned of an attack planned against Boonesborough, he escaped and ran 160 miles in four days to warn the settlers. The fort held.

Boone spent his life on the frontier. He eventually settled in Missouri, where he died on September 26, 1820, at age eighty-five.

The Wilderness Road Boone blazed brought over 200,000 settlers into Kentucky.',
  NULL,
  '[]'::JSONB
)
RETURNING individual_id;

-- Questions for Daniel Boone
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Daniel Boone born?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 1
FROM red_white_who_individuals WHERE name = 'Daniel Boone'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did Boone first explore Kentucky?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 2
FROM red_white_who_individuals WHERE name = 'Daniel Boone'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What trail did Boone blaze?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 3
FROM red_white_who_individuals WHERE name = 'Daniel Boone'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What natural passage did the trail go through?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 4
FROM red_white_who_individuals WHERE name = 'Daniel Boone'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What settlement did Boone found?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 5
FROM red_white_who_individuals WHERE name = 'Daniel Boone'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What happened when Boone was captured in 1778?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 6
FROM red_white_who_individuals WHERE name = 'Daniel Boone'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What Shawnee name was Boone given?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 7
FROM red_white_who_individuals WHERE name = 'Daniel Boone'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How far did Boone run to warn Boonesborough?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 8
FROM red_white_who_individuals WHERE name = 'Daniel Boone'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many settlers used the Wilderness Road?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 9
FROM red_white_who_individuals WHERE name = 'Daniel Boone'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where did Boone die?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 10
FROM red_white_who_individuals WHERE name = 'Daniel Boone'
ON CONFLICT (individual_id, question_text) DO NOTHING;


-- Individual: Davy Crockett
INSERT INTO red_white_who_individuals (name, birth_year, death_year, birth_date, death_date, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery)
VALUES (
  'Davy Crockett',
  1786,
  1836,
  NULL,
  NULL,
  ARRAY['Frontiersman and congressman who died at the Alamo'],
  '{"notes":"Born in Tennessee; Self-educated frontiersman; Served in U.S. Congress; Known for wit and storytelling; Died defending the Alamo in Texas; Legendary folk hero"}',
  'Davy Crockett was a frontiersman, soldier, and politician whose larger-than-life personality made him a legend. He died fighting at the Battle of the Alamo.

Crockett was born on August 17, 1786, in Tennessee. His family was poor, and David had almost no formal education. He became an expert hunter, famous for killing bears.

Crockett entered politics and served three terms in Congress. He was known for his wit and independent streak. His motto was, "Be always sure you are right, then go ahead."

After losing his Congressional seat in 1835, Crockett was disgusted with politics. He told his voters, "You may all go to hell, and I will go to Texas."

Texas was fighting for independence from Mexico. Crockett joined the defenders of the Alamo, an old Spanish mission in San Antonio. About 200 Texans faced a Mexican army of thousands.

The siege lasted thirteen days. On March 6, 1836, Mexican forces stormed the walls. All the defenders were killed, including Crockett.

"Remember the Alamo!" became the rallying cry that inspired Texans to win independence. Davy Crockett became an American legend.',
  NULL,
  '[]'::JSONB
)
RETURNING individual_id;

-- Questions for Davy Crockett
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Davy Crockett born?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 1
FROM red_white_who_individuals WHERE name = 'Davy Crockett'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What animal was Crockett famous for hunting?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 2
FROM red_white_who_individuals WHERE name = 'Davy Crockett'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many terms did Crockett serve in Congress?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 3
FROM red_white_who_individuals WHERE name = 'Davy Crockett'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Crockett''s motto?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 4
FROM red_white_who_individuals WHERE name = 'Davy Crockett'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Crockett tell his voters before leaving for Texas?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 5
FROM red_white_who_individuals WHERE name = 'Davy Crockett'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was the Alamo?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 6
FROM red_white_who_individuals WHERE name = 'Davy Crockett'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many days did the siege last?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 7
FROM red_white_who_individuals WHERE name = 'Davy Crockett'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'On what date did the final battle occur?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 8
FROM red_white_who_individuals WHERE name = 'Davy Crockett'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What rallying cry came from the Alamo?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 9
FROM red_white_who_individuals WHERE name = 'Davy Crockett'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many Texan defenders were at the Alamo?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 10
FROM red_white_who_individuals WHERE name = 'Davy Crockett'
ON CONFLICT (individual_id, question_text) DO NOTHING;


-- Individual: Henry Ford
INSERT INTO red_white_who_individuals (name, birth_year, death_year, birth_date, death_date, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery)
VALUES (
  'Henry Ford',
  1863,
  1947,
  NULL,
  NULL,
  ARRAY['Revolutionized manufacturing with the assembly line'],
  '{"notes":"Born in Dearborn, Michigan; Founded Ford Motor Company (1903); Introduced Model T (1908); Developed moving assembly line; Paid workers $5 per day; Made cars affordable for average Americans"}',
  'Henry Ford changed the world by making automobiles affordable for ordinary families. His assembly line revolutionized manufacturing.

Ford was born on July 30, 1863, on a farm in Michigan. He was fascinated by machines from childhood. In 1896, he built his first "horseless carriage."

Ford founded the Ford Motor Company in 1903. His goal was to build a car ordinary people could afford.

In 1908, Ford introduced the Model T. It was simple, reliable, and affordable. Americans loved it.

Ford developed the moving assembly line, where the car frame moved along a conveyor belt while workers added parts at each station. This made production faster and cheaper.

In 1914, Ford paid his workers five dollars a day, more than double the normal wage. He understood that well-paid workers could buy the products they made.

The assembly line cut the time to build a Model T from twelve hours to ninety-three minutes. The price dropped from $850 to $260. By 1927, Ford had sold fifteen million Model Ts.

Ford died on April 7, 1947. His methods spread to other industries. The assembly line became the standard for modern manufacturing.',
  NULL,
  '[]'::JSONB
)
RETURNING individual_id;

-- Questions for Henry Ford
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Henry Ford born?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 1
FROM red_white_who_individuals WHERE name = 'Henry Ford'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did Ford build his first car?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 2
FROM red_white_who_individuals WHERE name = 'Henry Ford'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When was Ford Motor Company founded?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 3
FROM red_white_who_individuals WHERE name = 'Henry Ford'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What car did Ford introduce in 1908?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 4
FROM red_white_who_individuals WHERE name = 'Henry Ford'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What manufacturing innovation did Ford develop?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 5
FROM red_white_who_individuals WHERE name = 'Henry Ford'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How much did Ford pay workers per day in 1914?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 6
FROM red_white_who_individuals WHERE name = 'Henry Ford'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How long did it take to build a Model T after the assembly line?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 7
FROM red_white_who_individuals WHERE name = 'Henry Ford'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was the lowest price of a Model T?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 8
FROM red_white_who_individuals WHERE name = 'Henry Ford'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many Model Ts were sold total?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 9
FROM red_white_who_individuals WHERE name = 'Henry Ford'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What is Ford''s lasting legacy?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 10
FROM red_white_who_individuals WHERE name = 'Henry Ford'
ON CONFLICT (individual_id, question_text) DO NOTHING;


-- Individual: Eleanor Roosevelt
INSERT INTO red_white_who_individuals (name, birth_year, death_year, birth_date, death_date, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery)
VALUES (
  'Eleanor Roosevelt',
  1884,
  1962,
  NULL,
  NULL,
  ARRAY['First Lady who became a humanitarian leader'],
  '{"notes":"Born in New York City; Niece of Theodore Roosevelt; Married FDR; Most active First Lady in history; Championed civil rights; Wrote My Day column; U.S. delegate to United Nations; Chaired Universal Declaration of Human Rights committee"}',
  'Eleanor Roosevelt transformed the role of First Lady and became one of the most influential women of the twentieth century.

Eleanor was born on October 11, 1884, in New York City. Her father was Theodore Roosevelt''s brother. Though born wealthy, Eleanor''s childhood was difficult. Her parents died when she was young.

In 1905, Eleanor married her distant cousin Franklin Roosevelt. Her uncle Theodore, then President, gave her away.

When Franklin was paralyzed by polio in 1921, Eleanor became his political partner. When Franklin became president in 1933, Eleanor became the most active First Lady in history.

Eleanor held press conferences for female reporters only, forcing news organizations to hire women. She wrote a daily newspaper column called "My Day." She traveled constantly to learn how ordinary people lived.

Eleanor championed civil rights. When singer Marian Anderson was barred from Constitution Hall, Eleanor resigned from the organization and helped arrange a concert at the Lincoln Memorial.

After Franklin''s death in 1945, Eleanor served as a delegate to the United Nations. She chaired the committee that drafted the Universal Declaration of Human Rights.

Eleanor Roosevelt died on November 7, 1962. President Truman called her "First Lady of the World.',
  NULL,
  '[]'::JSONB
)
RETURNING individual_id;

-- Questions for Eleanor Roosevelt
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Eleanor Roosevelt born?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 1
FROM red_white_who_individuals WHERE name = 'Eleanor Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who was Eleanor''s uncle?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 2
FROM red_white_who_individuals WHERE name = 'Eleanor Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did Eleanor marry Franklin?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 3
FROM red_white_who_individuals WHERE name = 'Eleanor Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Eleanor''s newspaper column called?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 4
FROM red_white_who_individuals WHERE name = 'Eleanor Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Why did Eleanor resign from the Daughters of the American Revolution?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 5
FROM red_white_who_individuals WHERE name = 'Eleanor Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What international organization did Eleanor serve?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 6
FROM red_white_who_individuals WHERE name = 'Eleanor Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What document did Eleanor help create at the UN?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 7
FROM red_white_who_individuals WHERE name = 'Eleanor Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did President Truman call Eleanor?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 8
FROM red_white_who_individuals WHERE name = 'Eleanor Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What disease paralyzed Franklin in 1921?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 9
FROM red_white_who_individuals WHERE name = 'Eleanor Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What made Eleanor unique regarding press conferences?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 10
FROM red_white_who_individuals WHERE name = 'Eleanor Roosevelt'
ON CONFLICT (individual_id, question_text) DO NOTHING;


-- Individual: Paul Revere
INSERT INTO red_white_who_individuals (name, birth_year, death_year, birth_date, death_date, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery)
VALUES (
  'Paul Revere',
  1735,
  1818,
  NULL,
  NULL,
  ARRAY['Patriot famous for midnight ride warning of British troops'],
  '{"notes":"Born in Boston; Skilled silversmith; Member of Sons of Liberty; Made midnight ride April 18, 1775; Warned colonists British were coming; Immortalized in Longfellow poem"}',
  'Paul Revere was a patriot whose midnight ride to warn of approaching British troops became one of the most famous events in American history.

Revere was born on January 1, 1735, in Boston. His father was a silversmith, and Paul learned the trade, becoming one of Boston''s finest craftsmen.

Revere joined the Sons of Liberty, opposing British taxes. He made engravings spreading patriot ideas. In December 1773, he participated in the Boston Tea Party.

On the night of April 18, 1775, British troops were marching to seize colonial weapons in Concord. The patriots needed warning.

Revere arranged for lanterns in Old North Church: one if by land, two if by sea. When two lanterns appeared, Revere rowed across the Charles River, borrowed a horse, and rode through the night warning, "The Regulars are coming out!"

Revere was captured before reaching Concord, but other riders spread the warning. When British troops arrived at Lexington and Concord on April 19, armed colonists were waiting. The Revolutionary War had begun.

After the war, Revere opened one of America''s first copper mills. He died on May 10, 1818, at age eighty-three.

Henry Wadsworth Longfellow''s 1861 poem "Paul Revere''s Ride" made him an American legend.',
  NULL,
  '[]'::JSONB
)
RETURNING individual_id;

-- Questions for Paul Revere
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Paul Revere born?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 1
FROM red_white_who_individuals WHERE name = 'Paul Revere'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What craft was Revere skilled at?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 2
FROM red_white_who_individuals WHERE name = 'Paul Revere'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What group did Revere belong to?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 3
FROM red_white_who_individuals WHERE name = 'Paul Revere'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What famous 1773 event did Revere participate in?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 4
FROM red_white_who_individuals WHERE name = 'Paul Revere'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What date was Revere''s midnight ride?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 5
FROM red_white_who_individuals WHERE name = 'Paul Revere'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What signal was used from Old North Church?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 6
FROM red_white_who_individuals WHERE name = 'Paul Revere'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What warning did Revere call out?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 7
FROM red_white_who_individuals WHERE name = 'Paul Revere'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What happened to Revere before reaching Concord?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 8
FROM red_white_who_individuals WHERE name = 'Paul Revere'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What poet made Revere famous?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 9
FROM red_white_who_individuals WHERE name = 'Paul Revere'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was the title of the famous poem?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 10
FROM red_white_who_individuals WHERE name = 'Paul Revere'
ON CONFLICT (individual_id, question_text) DO NOTHING;


-- Individual: James Madison
INSERT INTO red_white_who_individuals (name, birth_year, death_year, birth_date, death_date, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery)
VALUES (
  'James Madison',
  1751,
  1836,
  NULL,
  NULL,
  ARRAY['Father of the Constitution and Bill of Rights'],
  '{"notes":"Born in Virginia; Princeton graduate; Chief architect of Constitution; Primary author of Bill of Rights; Co-authored Federalist Papers; Fourth President (1809-1817); Led nation through War of 1812"}',
  'James Madison is called the Father of the Constitution for his central role in creating America''s framework of government. He also wrote the Bill of Rights. Madison was born on March 16, 1751, in Virginia. He was a sickly child who found refuge in books. He attended Princeton, completing a four-year course in two years. Madison became convinced the Articles of Confederation were too weak. At the Constitutional Convention in 1787, he arrived with a detailed plan. Madison shaped the Constitution''s key features: separation of powers, checks and balances, and federalism. With Hamilton and Jay, Madison wrote the Federalist Papers defending the Constitution. Madison served in Congress, where he wrote the Bill of Rights, the first ten amendments protecting individual liberties. Madison served as Jefferson''s Secretary of State, then was elected fourth President. The War of 1812 dominated his presidency. British forces burned Washington, D.C., in 1814. Madison retired to Montpelier, his Virginia home. He was the last surviving signer of the Constitution when he died on June 28, 1836.',
  NULL,
  '[]'::JSONB
)
RETURNING individual_id;

-- Questions for James Madison
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was James Madison born?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 1
FROM red_white_who_individuals WHERE name = 'James Madison'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What college did Madison attend?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 2
FROM red_white_who_individuals WHERE name = 'James Madison'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What nickname did Madison earn for his role with the Constitution?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 3
FROM red_white_who_individuals WHERE name = 'James Madison'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What famous essays did Madison co-write?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 4
FROM red_white_who_individuals WHERE name = 'James Madison'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Madison write to protect individual liberties?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 5
FROM red_white_who_individuals WHERE name = 'James Madison'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What war dominated Madison''s presidency?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 6
FROM red_white_who_individuals WHERE name = 'James Madison'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What happened to Washington, D.C. in 1814?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 7
FROM red_white_who_individuals WHERE name = 'James Madison'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Madison''s Virginia home called?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 8
FROM red_white_who_individuals WHERE name = 'James Madison'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What distinction did Madison hold when he died?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 9
FROM red_white_who_individuals WHERE name = 'James Madison'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did Madison die?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 10
FROM red_white_who_individuals WHERE name = 'James Madison'
ON CONFLICT (individual_id, question_text) DO NOTHING;


-- Individual: Patrick Henry
INSERT INTO red_white_who_individuals (name, birth_year, death_year, birth_date, death_date, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery)
VALUES (
  'Patrick Henry',
  1736,
  1799,
  NULL,
  NULL,
  ARRAY['Patriot orator known for Give me liberty or give me death'],
  '{"notes":"Born in Virginia; Self-taught lawyer; Powerful speaker against British policies; Famous Give me liberty speech (1775); Governor of Virginia; Demanded Bill of Rights"}',
  'Patrick Henry was one of the Revolution''s most powerful voices. His stirring speeches helped inspire Americans to fight for independence. Henry was born on May 29, 1736, in Virginia. He failed at farming and storekeeping before teaching himself law. He became a brilliant lawyer and speaker. Henry first gained fame in 1765 arguing against the Stamp Act. He challenged British authority so boldly that some called it treason. Henry replied, "If this be treason, make the most of it!" His most famous speech came on March 23, 1775. With war approaching, Henry urged Virginia to arm itself. He ended with words that echoed through history: "Is life so dear, or peace so sweet, as to be purchased at the price of chains and slavery? Forbid it, Almighty God! I know not what course others may take; but as for me, give me liberty or give me death!" Henry served as Virginia''s first governor after independence. Later, he opposed the Constitution, fearing it gave too much power to the federal government. He demanded a Bill of Rights to protect individual liberties. Patrick Henry died on June 6, 1799.',
  NULL,
  '[]'::JSONB
)
RETURNING individual_id;

-- Questions for Patrick Henry
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Patrick Henry born?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 1
FROM red_white_who_individuals WHERE name = 'Patrick Henry'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What profession did Henry teach himself?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 2
FROM red_white_who_individuals WHERE name = 'Patrick Henry'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What tax did Henry first speak against?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 3
FROM red_white_who_individuals WHERE name = 'Patrick Henry'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Henry say about treason?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 4
FROM red_white_who_individuals WHERE name = 'Patrick Henry'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did Henry give his most famous speech?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 5
FROM red_white_who_individuals WHERE name = 'Patrick Henry'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What is the most famous line from that speech?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 6
FROM red_white_who_individuals WHERE name = 'Patrick Henry'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What position did Henry hold in Virginia?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 7
FROM red_white_who_individuals WHERE name = 'Patrick Henry'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Why did Henry oppose the Constitution?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 8
FROM red_white_who_individuals WHERE name = 'Patrick Henry'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Henry demand be added to the Constitution?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 9
FROM red_white_who_individuals WHERE name = 'Patrick Henry'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did Patrick Henry die?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 10
FROM red_white_who_individuals WHERE name = 'Patrick Henry'
ON CONFLICT (individual_id, question_text) DO NOTHING;


-- Individual: John Hancock
INSERT INTO red_white_who_individuals (name, birth_year, death_year, birth_date, death_date, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery)
VALUES (
  'John Hancock',
  1737,
  1793,
  NULL,
  NULL,
  ARRAY['President of Continental Congress with famous signature'],
  '{"notes":"Born in Massachusetts; Wealthy merchant; President of Continental Congress; First and largest signature on Declaration; Governor of Massachusetts; Phrase John Hancock means signature"}',
  'John Hancock was a wealthy patriot whose large, bold signature on the Declaration of Independence made him famous. His name became a synonym for signature itself. Hancock was born on January 23, 1737, in Massachusetts. Raised by a wealthy uncle, he inherited a fortune and became one of America''s richest men. He used his wealth to support the patriot cause. British officials targeted Hancock for tax evasion, trying to seize his ship. This made him more committed to independence. He became president of the Continental Congress in 1775. On August 2, 1776, Hancock was the first to sign the Declaration of Independence. His signature was so large and bold that it dominates the document. Legend says he wanted King George to read it without glasses. Hancock served as governor of Massachusetts and helped ensure the state ratified the Constitution. John Hancock died on October 8, 1793. Today, John Hancock is a common phrase meaning signature.',
  NULL,
  '[]'::JSONB
)
RETURNING individual_id;

-- Questions for John Hancock
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was John Hancock born?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 1
FROM red_white_who_individuals WHERE name = 'John Hancock'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How did Hancock become wealthy?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 2
FROM red_white_who_individuals WHERE name = 'John Hancock'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What position did Hancock hold in the Continental Congress?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 3
FROM red_white_who_individuals WHERE name = 'John Hancock'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did Hancock sign the Declaration?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 4
FROM red_white_who_individuals WHERE name = 'John Hancock'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was special about Hancock''s signature?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 5
FROM red_white_who_individuals WHERE name = 'John Hancock'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Why did legend say Hancock signed so large?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 6
FROM red_white_who_individuals WHERE name = 'John Hancock'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What state did Hancock serve as governor?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 7
FROM red_white_who_individuals WHERE name = 'John Hancock'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What does John Hancock mean today?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 8
FROM red_white_who_individuals WHERE name = 'John Hancock'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did Hancock die?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 9
FROM red_white_who_individuals WHERE name = 'John Hancock'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What caused the British to target Hancock?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 10
FROM red_white_who_individuals WHERE name = 'John Hancock'
ON CONFLICT (individual_id, question_text) DO NOTHING;


-- Individual: Samuel Adams
INSERT INTO red_white_who_individuals (name, birth_year, death_year, birth_date, death_date, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery)
VALUES (
  'Samuel Adams',
  1722,
  1803,
  NULL,
  NULL,
  ARRAY['Organizer of colonial resistance'],
  '{"notes":"Born in Boston; Organized resistance to British taxes; Founded Sons of Liberty; Planned Boston Tea Party; Signed Declaration of Independence; Called Father of the American Revolution"}',
  'Samuel Adams was a master organizer who helped spark the American Revolution. He organized protests, created revolutionary networks, and kept pressure on until independence was won. Adams was born on September 27, 1722, in Boston. He failed at business but excelled at politics. Adams organized opposition to British taxes, helping create the Sons of Liberty. He orchestrated the Boston Tea Party in 1773, when patriots dumped British tea into the harbor. Adams used every British action to stir up opposition. He created committees of correspondence that spread revolutionary ideas throughout the colonies. When British troops killed five colonists in the Boston Massacre, Adams made sure the story spread everywhere. In the Continental Congress, Adams pushed relentlessly for independence. He signed the Declaration and worked to support the war effort. After the Revolution, Adams served as governor of Massachusetts. Samuel Adams died on October 2, 1803. Thomas Jefferson called him truly the Man of the Revolution.',
  NULL,
  '[]'::JSONB
)
RETURNING individual_id;

-- Questions for Samuel Adams
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Samuel Adams born?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 1
FROM red_white_who_individuals WHERE name = 'Samuel Adams'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What group did Adams help found?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 2
FROM red_white_who_individuals WHERE name = 'Samuel Adams'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What 1773 event did Adams help plan?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 3
FROM red_white_who_individuals WHERE name = 'Samuel Adams'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did committees of correspondence do?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 4
FROM red_white_who_individuals WHERE name = 'Samuel Adams'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What event did Adams publicize?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 5
FROM red_white_who_individuals WHERE name = 'Samuel Adams'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What document did Adams sign in 1776?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 6
FROM red_white_who_individuals WHERE name = 'Samuel Adams'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What position did Adams hold in Massachusetts?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 7
FROM red_white_who_individuals WHERE name = 'Samuel Adams'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Thomas Jefferson call Adams?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 8
FROM red_white_who_individuals WHERE name = 'Samuel Adams'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did Samuel Adams die?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 9
FROM red_white_who_individuals WHERE name = 'Samuel Adams'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Adams''s greatest skill?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 10
FROM red_white_who_individuals WHERE name = 'Samuel Adams'
ON CONFLICT (individual_id, question_text) DO NOTHING;


-- Individual: Robert E. Lee
INSERT INTO red_white_who_individuals (name, birth_year, death_year, birth_date, death_date, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery)
VALUES (
  'Robert E. Lee',
  1807,
  1870,
  NULL,
  NULL,
  ARRAY['Commanding General of Confederate Army'],
  '{"notes":"Born in Virginia; Graduated second at West Point; Declined command of Union Army; Led Confederate Army of Northern Virginia; Surrendered at Appomattox"}',
  'Robert E. Lee was the most famous Confederate general. He was considered one of the finest military minds in history, yet he chose to fight against the United States. Lee was born on January 19, 1807, in Virginia. His father was Light Horse Harry Lee, a Revolutionary War hero. Robert graduated second in his class at West Point. When Southern states seceded, Lee faced an agonizing choice. He opposed secession but felt he could not fight against his home state of Virginia. President Lincoln offered Lee command of the Union Army. Lee declined and joined Virginia''s forces. Lee was a brilliant general who often defeated larger Union armies. But his army lost crucial battles at Gettysburg and was worn down by the Union''s greater resources. On April 9, 1865, Lee surrendered to Grant at Appomattox Court House. After the war, Lee became president of Washington College. He died on October 12, 1870.',
  NULL,
  '[]'::JSONB
)
RETURNING individual_id;

-- Questions for Robert E. Lee
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Robert E. Lee born?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 1
FROM red_white_who_individuals WHERE name = 'Robert E. Lee'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who was Lee''s famous father?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 2
FROM red_white_who_individuals WHERE name = 'Robert E. Lee'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Lee''s rank at West Point?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 3
FROM red_white_who_individuals WHERE name = 'Robert E. Lee'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What job did Lincoln offer Lee?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 4
FROM red_white_who_individuals WHERE name = 'Robert E. Lee'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Why did Lee decline?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 5
FROM red_white_who_individuals WHERE name = 'Robert E. Lee'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What Confederate army did Lee command?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 6
FROM red_white_who_individuals WHERE name = 'Robert E. Lee'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What battle was a turning point against Lee?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 7
FROM red_white_who_individuals WHERE name = 'Robert E. Lee'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where did Lee surrender?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 8
FROM red_white_who_individuals WHERE name = 'Robert E. Lee'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Lee do after the war?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 9
FROM red_white_who_individuals WHERE name = 'Robert E. Lee'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did Lee die?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 10
FROM red_white_who_individuals WHERE name = 'Robert E. Lee'
ON CONFLICT (individual_id, question_text) DO NOTHING;


-- Individual: Andrew Jackson
INSERT INTO red_white_who_individuals (name, birth_year, death_year, birth_date, death_date, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery)
VALUES (
  'Andrew Jackson',
  1767,
  1845,
  NULL,
  NULL,
  ARRAY['War hero and seventh President'],
  '{"notes":"Born in the Carolinas; Fought in Revolutionary War as boy; Hero of Battle of New Orleans; Seventh President (1829-1837); Expanded voting rights; Controversial Indian Removal Act"}',
  'Andrew Jackson was a war hero and president who expanded democracy while making deeply controversial decisions about Native Americans. Jackson was born on March 15, 1767, in the Carolina backcountry. During the Revolutionary War, thirteen-year-old Andrew served as a courier and was captured by the British. Jackson became a lawyer and politician in Tennessee. He earned fame as a military hero at the Battle of New Orleans in January 1815. Jackson was elected president in 1828. He believed in expanding democracy for white men and supported eliminating property requirements for voting. However, Jackson''s Indian Removal Act of 1830 forced Native American tribes to leave their homelands. Thousands died on the Trail of Tears. This remains one of the darkest chapters in American history. Jackson died on June 8, 1845. His legacy is complicated: he expanded democracy for some while causing tremendous suffering for others.',
  NULL,
  '[]'::JSONB
)
RETURNING individual_id;

-- Questions for Andrew Jackson
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Andrew Jackson born?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 1
FROM red_white_who_individuals WHERE name = 'Andrew Jackson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How old was Jackson in the Revolutionary War?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 2
FROM red_white_who_individuals WHERE name = 'Andrew Jackson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What battle made Jackson a hero?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 3
FROM red_white_who_individuals WHERE name = 'Andrew Jackson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When was Jackson elected president?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 4
FROM red_white_who_individuals WHERE name = 'Andrew Jackson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How did Jackson expand democracy?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 5
FROM red_white_who_individuals WHERE name = 'Andrew Jackson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What controversial act did Jackson sign?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 6
FROM red_white_who_individuals WHERE name = 'Andrew Jackson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was the Trail of Tears?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 7
FROM red_white_who_individuals WHERE name = 'Andrew Jackson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What nickname did Jackson have?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 8
FROM red_white_who_individuals WHERE name = 'Andrew Jackson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did Jackson die?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 9
FROM red_white_who_individuals WHERE name = 'Andrew Jackson'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Why is Jackson''s legacy complicated?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 10
FROM red_white_who_individuals WHERE name = 'Andrew Jackson'
ON CONFLICT (individual_id, question_text) DO NOTHING;


-- Individual: John Muir
INSERT INTO red_white_who_individuals (name, birth_year, death_year, birth_date, death_date, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery)
VALUES (
  'John Muir',
  1838,
  1914,
  NULL,
  NULL,
  ARRAY['Naturalist who helped preserve wilderness'],
  '{"notes":"Born in Scotland; Explored Yosemite; Founded Sierra Club (1892); Convinced Roosevelt to protect wilderness; Father of National Parks"}',
  'John Muir was a naturalist who fell in love with America''s wild places and dedicated his life to protecting them. He is called the Father of the National Parks. Muir was born on April 21, 1838, in Scotland. His family immigrated to Wisconsin when he was eleven. After a factory accident nearly blinded him, Muir decided to devote his life to studying nature. In 1868, he arrived in California and saw Yosemite Valley. He was overwhelmed by its beauty. Muir wrote articles and books describing wilderness wonders. In 1892, Muir founded the Sierra Club. He convinced President Theodore Roosevelt to expand protection of forests and parks. The two camped together in Yosemite in 1903. Thanks largely to Muir''s efforts, Yosemite, Sequoia, and other wilderness areas became national parks. John Muir died on December 24, 1914. His legacy lives on in the protected wilderness he loved.',
  NULL,
  '[]'::JSONB
)
RETURNING individual_id;

-- Questions for John Muir
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was John Muir born?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 1
FROM red_white_who_individuals WHERE name = 'John Muir'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What made Muir dedicate his life to nature?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 2
FROM red_white_who_individuals WHERE name = 'John Muir'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What California valley amazed Muir?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 3
FROM red_white_who_individuals WHERE name = 'John Muir'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What organization did Muir found?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 4
FROM red_white_who_individuals WHERE name = 'John Muir'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Which president did Muir convince to protect wilderness?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 5
FROM red_white_who_individuals WHERE name = 'John Muir'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where did Muir and Roosevelt camp?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 6
FROM red_white_who_individuals WHERE name = 'John Muir'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What nickname is Muir given?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 7
FROM red_white_who_individuals WHERE name = 'John Muir'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did Muir die?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 8
FROM red_white_who_individuals WHERE name = 'John Muir'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What valley did Muir explore extensively?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 9
FROM red_white_who_individuals WHERE name = 'John Muir'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What inspired Muir''s writings?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 10
FROM red_white_who_individuals WHERE name = 'John Muir'
ON CONFLICT (individual_id, question_text) DO NOTHING;


-- Individual: Mark Twain
INSERT INTO red_white_who_individuals (name, birth_year, death_year, birth_date, death_date, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery)
VALUES (
  'Mark Twain',
  1835,
  1910,
  NULL,
  NULL,
  ARRAY['Author of Tom Sawyer and Huckleberry Finn'],
  '{"notes":"Born in Missouri as Samuel Clemens; Worked as riverboat pilot; Wrote Tom Sawyer and Huckleberry Finn; America''s greatest humorist; Called the Lincoln of American literature"}',
  'Mark Twain, whose real name was Samuel Clemens, was America''s greatest humorist and one of its finest writers. His books about Tom Sawyer and Huckleberry Finn captured American childhood and challenged the nation''s conscience. Samuel Clemens was born on November 30, 1835, in Florida, Missouri. His family moved to Hannibal, a town on the Mississippi River. The river and town would inspire his greatest works. As a young man, Clemens worked as a riverboat pilot on the Mississippi. His pen name Mark Twain came from a river term meaning two fathoms deep. The Adventures of Tom Sawyer (1876) drew on his Hannibal childhood. Adventures of Huckleberry Finn (1884) is considered one of the greatest American novels. Twain was also a sharp social critic. He attacked hypocrisy, greed, and injustice with wit. Mark Twain died on April 21, 1910. William Faulkner called him the father of American literature.',
  NULL,
  '[]'::JSONB
)
RETURNING individual_id;

-- Questions for Mark Twain
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Mark Twain''s real name?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 1
FROM red_white_who_individuals WHERE name = 'Mark Twain'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was he born?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 2
FROM red_white_who_individuals WHERE name = 'Mark Twain'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What town inspired his works?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 3
FROM red_white_who_individuals WHERE name = 'Mark Twain'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What job did Twain have before writing?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 4
FROM red_white_who_individuals WHERE name = 'Mark Twain'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where did his pen name come from?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 5
FROM red_white_who_individuals WHERE name = 'Mark Twain'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What are his two most famous books?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 6
FROM red_white_who_individuals WHERE name = 'Mark Twain'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When was Huckleberry Finn published?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 7
FROM red_white_who_individuals WHERE name = 'Mark Twain'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Twain criticize?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 8
FROM red_white_who_individuals WHERE name = 'Mark Twain'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did Twain die?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 9
FROM red_white_who_individuals WHERE name = 'Mark Twain'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Faulkner call Twain?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 10
FROM red_white_who_individuals WHERE name = 'Mark Twain'
ON CONFLICT (individual_id, question_text) DO NOTHING;


-- Individual: Thurgood Marshall
INSERT INTO red_white_who_individuals (name, birth_year, death_year, birth_date, death_date, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery)
VALUES (
  'Thurgood Marshall',
  1908,
  1993,
  NULL,
  NULL,
  ARRAY['First African American Supreme Court Justice'],
  '{"notes":"Born in Baltimore; Chief counsel for NAACP; Won Brown v. Board of Education (1954); First Black Supreme Court Justice (1967-1991)"}',
  'Thurgood Marshall fought for civil rights in courtrooms across America and became the first African American Supreme Court Justice. Marshall was born on July 2, 1908, in Baltimore, Maryland. He was denied admission to the University of Maryland Law School because he was Black. Instead, he attended Howard University Law School. Marshall became chief counsel for the NAACP Legal Defense Fund. He traveled throughout the South, often at great personal risk, representing Black Americans who faced injustice. Marshall argued thirty-two cases before the Supreme Court and won twenty-nine. His greatest victory came in Brown v. Board of Education (1954), when the Court ruled that segregated schools were unconstitutional. In 1967, President Johnson appointed Marshall to the Supreme Court, making him the first African American justice. He served for twenty-four years. Marshall retired in 1991 and died on January 24, 1993.',
  NULL,
  '[]'::JSONB
)
RETURNING individual_id;

-- Questions for Thurgood Marshall
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Thurgood Marshall born?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 1
FROM red_white_who_individuals WHERE name = 'Thurgood Marshall'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Why couldn''t Marshall attend University of Maryland Law School?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 2
FROM red_white_who_individuals WHERE name = 'Thurgood Marshall'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What law school did Marshall attend?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 3
FROM red_white_who_individuals WHERE name = 'Thurgood Marshall'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What organization did Marshall work for?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 4
FROM red_white_who_individuals WHERE name = 'Thurgood Marshall'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Marshall''s most famous Supreme Court victory?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 5
FROM red_white_who_individuals WHERE name = 'Thurgood Marshall'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Brown v. Board rule unconstitutional?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 6
FROM red_white_who_individuals WHERE name = 'Thurgood Marshall'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When was Marshall appointed to the Supreme Court?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 7
FROM red_white_who_individuals WHERE name = 'Thurgood Marshall'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What distinction did Marshall achieve?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 8
FROM red_white_who_individuals WHERE name = 'Thurgood Marshall'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How long did Marshall serve on the Court?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 9
FROM red_white_who_individuals WHERE name = 'Thurgood Marshall'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did Marshall die?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 10
FROM red_white_who_individuals WHERE name = 'Thurgood Marshall'
ON CONFLICT (individual_id, question_text) DO NOTHING;


-- Individual: John Lewis
INSERT INTO red_white_who_individuals (name, birth_year, death_year, birth_date, death_date, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery)
VALUES (
  'John Lewis',
  1940,
  2020,
  NULL,
  NULL,
  ARRAY['Civil rights leader and congressman'],
  '{"notes":"Born in Alabama; Led Student Nonviolent Coordinating Committee; Youngest speaker at March on Washington; Beaten on Bloody Sunday; U.S. Congressman for 33 years"}',
  'John Lewis was a civil rights hero who was beaten and arrested fighting for equal rights, then spent more than three decades in Congress continuing that fight. Lewis was born on February 21, 1940, in rural Alabama. He was inspired by Martin Luther King Jr. and became committed to nonviolent protest. Lewis helped organize sit-ins at segregated lunch counters and was one of the original Freedom Riders. At age twenty-three, Lewis was the youngest speaker at the 1963 March on Washington. On March 7, 1965, Lewis led marchers across the Edmund Pettus Bridge in Selma, Alabama. State troopers attacked them with clubs and tear gas. Lewis''s skull was fractured. Television coverage of Bloody Sunday shocked the nation. Lewis was elected to Congress in 1986 and served for thirty-three years. He was called the conscience of Congress. Lewis continued fighting for justice until his death on July 17, 2020. He urged Americans to get into good trouble by standing up against injustice.',
  NULL,
  '[]'::JSONB
)
RETURNING individual_id;

-- Questions for John Lewis
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was John Lewis born?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 1
FROM red_white_who_individuals WHERE name = 'John Lewis'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What organization did Lewis lead?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 2
FROM red_white_who_individuals WHERE name = 'John Lewis'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How old was Lewis at the March on Washington?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 3
FROM red_white_who_individuals WHERE name = 'John Lewis'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What happened on Bloody Sunday?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 4
FROM red_white_who_individuals WHERE name = 'John Lewis'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What injury did Lewis suffer?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 5
FROM red_white_who_individuals WHERE name = 'John Lewis'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How long did Lewis serve in Congress?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 6
FROM red_white_who_individuals WHERE name = 'John Lewis'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Lewis called in Congress?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 7
FROM red_white_who_individuals WHERE name = 'John Lewis'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What phrase did Lewis use about fighting injustice?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 8
FROM red_white_who_individuals WHERE name = 'John Lewis'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did John Lewis die?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 9
FROM red_white_who_individuals WHERE name = 'John Lewis'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What inspired young Lewis?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 10
FROM red_white_who_individuals WHERE name = 'John Lewis'
ON CONFLICT (individual_id, question_text) DO NOTHING;


-- Individual: Walt Disney
INSERT INTO red_white_who_individuals (name, birth_year, death_year, birth_date, death_date, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery)
VALUES (
  'Walt Disney',
  1901,
  1966,
  NULL,
  NULL,
  ARRAY['Pioneer of animation who created Mickey Mouse'],
  '{"notes":"Born in Chicago; Created Mickey Mouse (1928); First full-length animated film (Snow White, 1937); Built Disneyland (1955); Won 22 Academy Awards"}',
  'Walt Disney was a pioneer of entertainment who created Mickey Mouse, built Disneyland, and changed how the world experiences stories and fun. Disney was born on December 5, 1901, in Chicago. He developed a love of drawing as a child. In 1928, he created Mickey Mouse. The cartoon Steamboat Willie was one of the first with synchronized sound. Snow White and the Seven Dwarfs (1937) was the first full-length animated feature film. Disney followed with classics like Pinocchio, Fantasia, and Bambi. Disney won twenty-two Academy Awards, more than any other person. In 1955, he opened Disneyland in California, a new kind of amusement park. Disney was planning Walt Disney World in Florida when he died on December 15, 1966. His company grew into one of the world''s largest entertainment companies. Disney showed that imagination and persistence could create magic.',
  NULL,
  '[]'::JSONB
)
RETURNING individual_id;

-- Questions for Walt Disney
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Walt Disney born?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 1
FROM red_white_who_individuals WHERE name = 'Walt Disney'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What character did Disney create in 1928?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 2
FROM red_white_who_individuals WHERE name = 'Walt Disney'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What made Steamboat Willie special?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 3
FROM red_white_who_individuals WHERE name = 'Walt Disney'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was the first full-length animated film?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 4
FROM red_white_who_individuals WHERE name = 'Walt Disney'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many Academy Awards did Disney win?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 5
FROM red_white_who_individuals WHERE name = 'Walt Disney'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did Disneyland open?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 6
FROM red_white_who_individuals WHERE name = 'Walt Disney'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Disney planning when he died?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 7
FROM red_white_who_individuals WHERE name = 'Walt Disney'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did Walt Disney die?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 8
FROM red_white_who_individuals WHERE name = 'Walt Disney'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Disney show about imagination?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 9
FROM red_white_who_individuals WHERE name = 'Walt Disney'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What company did Disney create?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 10
FROM red_white_who_individuals WHERE name = 'Walt Disney'
ON CONFLICT (individual_id, question_text) DO NOTHING;


-- Individual: Cesar Chavez
INSERT INTO red_white_who_individuals (name, birth_year, death_year, birth_date, death_date, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery)
VALUES (
  'Cesar Chavez',
  1927,
  1993,
  NULL,
  NULL,
  ARRAY['Labor leader who fought for farmworkers'],
  '{"notes":"Born in Arizona; Family became migrant farmworkers; Founded United Farm Workers; Led grape boycott; Used nonviolent protest; Awarded Presidential Medal of Freedom"}',
  'Cesar Chavez was a labor leader who fought for the rights of farmworkers. Using nonviolent protest, he improved conditions for some of America''s most vulnerable workers. Chavez was born on March 31, 1927, near Yuma, Arizona. During the Depression, his family lost their farm and became migrant workers. Young Cesar experienced the harsh conditions farmworkers faced. Chavez left school after eighth grade to work in the fields. In 1962, he founded the National Farm Workers Association, which became the United Farm Workers. His most famous campaign was the grape boycott, which lasted five years. Millions of Americans stopped buying grapes to support farmworkers. Like Martin Luther King Jr., Chavez believed in nonviolent protest. He led marches and went on hunger strikes to draw attention to the workers'' cause. Chavez continued fighting for farmworkers until his death on April 23, 1993. In 1994, he was posthumously awarded the Presidential Medal of Freedom. His motto was Si se puede (Yes, it can be done).',
  NULL,
  '[]'::JSONB
)
RETURNING individual_id;

-- Questions for Cesar Chavez
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Cesar Chavez born?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 1
FROM red_white_who_individuals WHERE name = 'Cesar Chavez'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What happened to Chavez''s family during the Depression?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 2
FROM red_white_who_individuals WHERE name = 'Cesar Chavez'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What organization did Chavez found?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 3
FROM red_white_who_individuals WHERE name = 'Cesar Chavez'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Chavez''s most famous boycott?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 4
FROM red_white_who_individuals WHERE name = 'Cesar Chavez'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How long did the grape boycott last?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 5
FROM red_white_who_individuals WHERE name = 'Cesar Chavez'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What type of protest did Chavez believe in?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 6
FROM red_white_who_individuals WHERE name = 'Cesar Chavez'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Chavez''s longest hunger strike?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 7
FROM red_white_who_individuals WHERE name = 'Cesar Chavez'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did Chavez die?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 8
FROM red_white_who_individuals WHERE name = 'Cesar Chavez'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What award was Chavez given after death?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 9
FROM red_white_who_individuals WHERE name = 'Cesar Chavez'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Chavez''s Spanish motto?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 10
FROM red_white_who_individuals WHERE name = 'Cesar Chavez'
ON CONFLICT (individual_id, question_text) DO NOTHING;


-- Individual: Sitting Bull
INSERT INTO red_white_who_individuals (name, birth_year, death_year, birth_date, death_date, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery)
VALUES (
  'Sitting Bull',
  1831,
  1890,
  NULL,
  NULL,
  ARRAY['Lakota Sioux leader who defeated Custer'],
  '{"notes":"Born in South Dakota; Lakota Sioux holy man and chief; Victory at Battle of Little Bighorn (1876); Fled to Canada; Killed at Standing Rock Reservation"}',
  'Sitting Bull was a Lakota Sioux leader who united Native American tribes to defend their lands. His forces defeated General Custer at the Battle of Little Bighorn. Sitting Bull was born around 1831 in what is now South Dakota. He grew up learning the ways of his people and became known for his bravery and visions. As white settlers pushed west, they violated treaties and took Native American lands. Sitting Bull became a leader who refused to surrender to reservation life. In June 1876, at the Battle of Little Bighorn, Native American forces led by Sitting Bull and Crazy Horse wiped out Colonel George Custer and over 200 soldiers. It was the greatest Native American victory against the U.S. Army. But the victory brought harsh retaliation. In 1877, Sitting Bull led his people into Canada. After four years of hardship, they returned to surrender. Sitting Bull was placed on Standing Rock Reservation. On December 15, 1890, reservation police came to arrest Sitting Bull. In the confrontation, he was killed. Sitting Bull fought to protect his people''s way of life.',
  NULL,
  '[]'::JSONB
)
RETURNING individual_id;

-- Questions for Sitting Bull
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When was Sitting Bull born?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 1
FROM red_white_who_individuals WHERE name = 'Sitting Bull'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What tribe was Sitting Bull a leader of?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 2
FROM red_white_who_individuals WHERE name = 'Sitting Bull'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What happened at the Battle of Little Bighorn?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 3
FROM red_white_who_individuals WHERE name = 'Sitting Bull'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did the Battle of Little Bighorn occur?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 4
FROM red_white_who_individuals WHERE name = 'Sitting Bull'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where did Sitting Bull flee after the battle?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 5
FROM red_white_who_individuals WHERE name = 'Sitting Bull'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Sitting Bull living when he died?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 6
FROM red_white_who_individuals WHERE name = 'Sitting Bull'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How did Sitting Bull die?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 7
FROM red_white_who_individuals WHERE name = 'Sitting Bull'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Sitting Bull symbolize?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 8
FROM red_white_who_individuals WHERE name = 'Sitting Bull'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who was Crazy Horse?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 9
FROM red_white_who_individuals WHERE name = 'Sitting Bull'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many soldiers did Custer lose?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 10
FROM red_white_who_individuals WHERE name = 'Sitting Bull'
ON CONFLICT (individual_id, question_text) DO NOTHING;


-- Individual: Audie Murphy
INSERT INTO red_white_who_individuals (name, birth_year, death_year, birth_date, death_date, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery)
VALUES (
  'Audie Murphy',
  1925,
  1971,
  NULL,
  NULL,
  ARRAY['Most decorated American soldier of World War II'],
  '{"notes":"Born in Texas; Joined Army at 17; Most decorated U.S. combat soldier; Received Medal of Honor; Became movie star"}',
  'Audie Murphy was the most decorated American combat soldier of World War II. Despite being small and young, he performed acts of incredible bravery that made him a national hero. Murphy was born on June 20, 1925, in rural Texas. His family was desperately poor. Murphy tried to enlist after Pearl Harbor but was rejected for being too small and young. He was finally accepted by the Army in 1942, just seventeen years old and weighing only 112 pounds. Murphy fought across Europe, seeing combat in North Africa, Sicily, Italy, France, and Germany. He was wounded three times. His most famous action came on January 26, 1945, near Holtzwihr, France. When German forces attacked, Murphy climbed onto a burning tank destroyer and used its machine gun against the enemy. For an hour, he held off the German attack alone. He received the Medal of Honor. Murphy received every combat award the Army offered, earning thirty-three awards and medals. After the war, Murphy became a movie star. He was honest about struggling with what we now call PTSD. Murphy died in a plane crash on May 28, 1971. He is buried at Arlington National Cemetery.',
  NULL,
  '[]'::JSONB
)
RETURNING individual_id;

-- Questions for Audie Murphy
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Audie Murphy born?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 1
FROM red_white_who_individuals WHERE name = 'Audie Murphy'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Why was Murphy initially rejected from the military?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 2
FROM red_white_who_individuals WHERE name = 'Audie Murphy'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How old was Murphy when he joined the Army?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 3
FROM red_white_who_individuals WHERE name = 'Audie Murphy'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many times was Murphy wounded?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 4
FROM red_white_who_individuals WHERE name = 'Audie Murphy'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What happened at Holtzwihr, France?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 5
FROM red_white_who_individuals WHERE name = 'Audie Murphy'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What is the highest military award Murphy received?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 6
FROM red_white_who_individuals WHERE name = 'Audie Murphy'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many awards did Murphy earn?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 7
FROM red_white_who_individuals WHERE name = 'Audie Murphy'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What career did Murphy have after the war?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 8
FROM red_white_who_individuals WHERE name = 'Audie Murphy'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What condition did Murphy help bring attention to?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 9
FROM red_white_who_individuals WHERE name = 'Audie Murphy'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where is Murphy buried?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 10
FROM red_white_who_individuals WHERE name = 'Audie Murphy'
ON CONFLICT (individual_id, question_text) DO NOTHING;


-- Individual: Pocahontas
INSERT INTO red_white_who_individuals (name, birth_year, death_year, birth_date, death_date, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery)
VALUES (
  'Pocahontas',
  1596,
  1617,
  NULL,
  NULL,
  ARRAY['Powhatan woman who helped Jamestown settlers'],
  '{"notes":"Born in Virginia; Daughter of Chief Powhatan; Helped Jamestown settlers survive; Married colonist John Rolfe; Traveled to England"}',
  'Pocahontas was a Powhatan woman who became famous for helping English settlers at Jamestown survive. Her story represents both cooperation and tragedy between Native Americans and colonists. Pocahontas was born around 1596 in Virginia. Her father was Chief Powhatan. Her real name was Amonute; Pocahontas was a nickname meaning playful one. According to Captain John Smith, Pocahontas saved his life in 1607 when her father was about to execute him. Historians debate whether this really happened. What is certain is that Pocahontas helped the struggling Jamestown colony by bringing food and delivering messages. In 1613, Pocahontas was captured by the English. During her captivity, she converted to Christianity and was baptized as Rebecca. In 1614, Pocahontas married tobacco planter John Rolfe. Their marriage brought peace between the colonists and Powhatan''s people. In 1616, she traveled to England with her husband. She was presented to King James I and became a celebrity. Pocahontas never returned to Virginia. In 1617, as her ship prepared to sail home, she became ill and died at about twenty-one years old. Pocahontas remains a symbol of the complex relationship between Native Americans and European settlers.',
  NULL,
  '[]'::JSONB
)
RETURNING individual_id;

-- Questions for Pocahontas
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When was Pocahontas born?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 1
FROM red_white_who_individuals WHERE name = 'Pocahontas'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who was Pocahontas''s father?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 2
FROM red_white_who_individuals WHERE name = 'Pocahontas'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What does the name Pocahontas mean?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 3
FROM red_white_who_individuals WHERE name = 'Pocahontas'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who did Pocahontas reportedly save?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 4
FROM red_white_who_individuals WHERE name = 'Pocahontas'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How did Pocahontas help Jamestown?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 5
FROM red_white_who_individuals WHERE name = 'Pocahontas'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who did Pocahontas marry?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 6
FROM red_white_who_individuals WHERE name = 'Pocahontas'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where did Pocahontas travel in 1616?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 7
FROM red_white_who_individuals WHERE name = 'Pocahontas'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Pocahontas''s Christian name?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 8
FROM red_white_who_individuals WHERE name = 'Pocahontas'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How old was Pocahontas when she died?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 9
FROM red_white_who_individuals WHERE name = 'Pocahontas'
ON CONFLICT (individual_id, question_text) DO NOTHING;

INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where did Pocahontas die?', '[ANSWER NEEDED]', '[WRONG ANSWER 1 NEEDED]', '[WRONG ANSWER 2 NEEDED]', '[WRONG ANSWER 3 NEEDED]', 10
FROM red_white_who_individuals WHERE name = 'Pocahontas'
ON CONFLICT (individual_id, question_text) DO NOTHING;


