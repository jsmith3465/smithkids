-- Red White and Who Complete Data Import
-- Generated from American_History_Icons_Complete.xlsx
-- This file includes images and all 4 answers (1 correct + 3 wrong) for each question
--
-- To use this file:
-- 1. Run create_red_white_who_tables.sql first to create the tables
-- 2. Run transform_key_facts_to_html.sql and transform_key_events_to_html.sql if needed
-- 3. Run this file in Supabase SQL Editor
--

-- Individual: George Washington
INSERT INTO red_white_who_individuals (name, birth_year, death_year, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery_1, photo_gallery_2, photo_gallery_3, photo_gallery_4, photo_gallery_5, photo_gallery_6, photo_gallery_7, photo_gallery_8, photo_gallery_9, photo_gallery_10)
VALUES (
  'George Washington',
  1732,
  1799,
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
  'https://www.whitehouse.gov/wp-content/uploads/2021/01/01_george_washington.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a06000:3a06000:3a06051/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c00000:3c00000:3c00073/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:pga:03100:03177/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:04500:04543/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a02000:3a02900:3a02998/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b04000:3b04000:3b04030/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a06000:3a06000:3a06053/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:19000:19067/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a06000:3a06000:3a06052/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a06000:3a06000:3a06054/full/pct:25/0/default.jpg'
)
ON CONFLICT (name) DO UPDATE SET
  birth_year = EXCLUDED.birth_year,
  death_year = EXCLUDED.death_year,
  key_events = EXCLUDED.key_events,
  key_facts = EXCLUDED.key_facts,
  biographical_summary = EXCLUDED.biographical_summary,
  main_photo_url = EXCLUDED.main_photo_url,
  photo_gallery_1 = EXCLUDED.photo_gallery_1,
  photo_gallery_2 = EXCLUDED.photo_gallery_2,
  photo_gallery_3 = EXCLUDED.photo_gallery_3,
  photo_gallery_4 = EXCLUDED.photo_gallery_4,
  photo_gallery_5 = EXCLUDED.photo_gallery_5,
  photo_gallery_6 = EXCLUDED.photo_gallery_6,
  photo_gallery_7 = EXCLUDED.photo_gallery_7,
  photo_gallery_8 = EXCLUDED.photo_gallery_8,
  photo_gallery_9 = EXCLUDED.photo_gallery_9,
  photo_gallery_10 = EXCLUDED.photo_gallery_10,
  updated_at = NOW();

-- Question 1 for George Washington
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What year was George Washington born, and in which state?', '1732, Virginia', '1737, Virginia', '1728, Massachusetts', '1732, Maryland', 1
FROM red_white_who_individuals WHERE name = 'George Washington'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 2 for George Washington
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What job did Washington have as a young man that taught him about the wilderness?', 'Surveyor', 'Blacksmith', 'Lawyer', 'Merchant', 2
FROM red_white_who_individuals WHERE name = 'George Washington'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 3 for George Washington
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was the name of Washington''s Virginia home?', 'Mount Vernon', 'Monticello', 'Mount Pleasant', 'Westmoreland Estate', 3
FROM red_white_who_individuals WHERE name = 'George Washington'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 4 for George Washington
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'In what year was Washington chosen to lead the Continental Army?', '1775', '1773', '1778', '1781', 4
FROM red_white_who_individuals WHERE name = 'George Washington'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 5 for George Washington
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What difficult winter camp tested the Continental Army in 1777-1778?', 'Valley Forge', 'Trenton Camp', 'Morristown', 'Brandywine', 5
FROM red_white_who_individuals WHERE name = 'George Washington'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 6 for George Washington
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What river did Washington famously cross on Christmas night 1776?', 'Delaware River', 'Potomac River', 'Hudson River', 'Susquehanna River', 6
FROM red_white_who_individuals WHERE name = 'George Washington'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 7 for George Washington
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What 1781 battle ended the Revolutionary War with a British surrender?', 'Yorktown', 'Trenton', 'Saratoga', 'Bunker Hill', 7
FROM red_white_who_individuals WHERE name = 'George Washington'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 8 for George Washington
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many terms did Washington serve as president before stepping down?', 'Two terms', 'Three terms', 'One term', 'Four terms', 8
FROM red_white_who_individuals WHERE name = 'George Washington'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 9 for George Washington
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Why is Washington called the Father of His Country?', 'Father of His Country', 'He won the most battles', 'He was the wealthiest Founder', 'He wrote the Constitution', 9
FROM red_white_who_individuals WHERE name = 'George Washington'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 10 for George Washington
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What two things have Washington''s face on them that you might use today?', 'One-dollar bill and quarter', 'Five-dollar bill and dime', 'Twenty-dollar bill and nickel', 'Hundred-dollar bill and penny', 10
FROM red_white_who_individuals WHERE name = 'George Washington'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;


-- Individual: Benjamin Franklin
INSERT INTO red_white_who_individuals (name, birth_year, death_year, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery_1, photo_gallery_2, photo_gallery_3, photo_gallery_4, photo_gallery_5, photo_gallery_6, photo_gallery_7, photo_gallery_8, photo_gallery_9, photo_gallery_10)
VALUES (
  'Benjamin Franklin',
  1706,
  1790,
  ARRAY['Founding Father, inventor, and diplomat who helped win French support for American independence'],
  '{"notes":"Born in Boston, Massachusetts; Self-taught reader and writer; Founded the Pennsylvania Gazette and Poor Richard's Almanack; Invented the lightning rod, bifocals, and Franklin stove; Proved lightning was electricity with famous kite experiment; Helped write the Declaration of Independence; Convinced France to help America win the Revolution"}',
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
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a05000:3a05000:3a05089/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c00000:3c00300:3c00352/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a05000:3a05000:3a05090/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b04000:3b04100:3b04195/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a05000:3a05000:3a05091/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:19000:19041/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c00000:3c00700:3c00713/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b03000:3b03600:3b03674/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a05000:3a05000:3a05092/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b04000:3b04700:3b04745/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a05000:3a05000:3a05093/full/pct:25/0/default.jpg'
)
ON CONFLICT (name) DO UPDATE SET
  birth_year = EXCLUDED.birth_year,
  death_year = EXCLUDED.death_year,
  key_events = EXCLUDED.key_events,
  key_facts = EXCLUDED.key_facts,
  biographical_summary = EXCLUDED.biographical_summary,
  main_photo_url = EXCLUDED.main_photo_url,
  photo_gallery_1 = EXCLUDED.photo_gallery_1,
  photo_gallery_2 = EXCLUDED.photo_gallery_2,
  photo_gallery_3 = EXCLUDED.photo_gallery_3,
  photo_gallery_4 = EXCLUDED.photo_gallery_4,
  photo_gallery_5 = EXCLUDED.photo_gallery_5,
  photo_gallery_6 = EXCLUDED.photo_gallery_6,
  photo_gallery_7 = EXCLUDED.photo_gallery_7,
  photo_gallery_8 = EXCLUDED.photo_gallery_8,
  photo_gallery_9 = EXCLUDED.photo_gallery_9,
  photo_gallery_10 = EXCLUDED.photo_gallery_10,
  updated_at = NOW();

-- Question 1 for Benjamin Franklin
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'In what city was Benjamin Franklin born, and how many children were in his family?', 'Boston, 17 children', 'Philadelphia, 12 children', 'New York, 17 children', 'Boston, 8 children', 1
FROM red_white_who_individuals WHERE name = 'Benjamin Franklin'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 2 for Benjamin Franklin
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many years of formal schooling did Franklin have?', 'Two years', 'Four years', 'Six months', 'Eight years', 2
FROM red_white_who_individuals WHERE name = 'Benjamin Franklin'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 3 for Benjamin Franklin
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was the name Franklin used when secretly writing articles for his brother''s newspaper?', 'Silence Dogood', 'Richard Saunders', 'Benjamin Busy', 'Poor Richard', 3
FROM red_white_who_individuals WHERE name = 'Benjamin Franklin'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 4 for Benjamin Franklin
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What famous saying from Poor Richard''s Almanack talks about going to bed early?', 'Early to bed and early to rise, makes a man healthy, wealthy, and wise', 'A penny saved is a penny earned', 'God helps those who help themselves', 'An apple a day keeps the doctor away', 4
FROM red_white_who_individuals WHERE name = 'Benjamin Franklin'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 5 for Benjamin Franklin
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What dangerous experiment did Franklin do with a kite in 1752?', 'Kite experiment with lightning', 'Tested electricity in a rainstorm', 'Flew a kite to measure wind speed', 'Built the first electric motor', 5
FROM red_white_who_individuals WHERE name = 'Benjamin Franklin'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 6 for Benjamin Franklin
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Name three things that Benjamin Franklin invented.', 'Lightning rod, bifocals, Franklin stove', 'Printing press, telescope, thermometer', 'Telephone, electric light, battery', 'Steam engine, compass, barometer', 6
FROM red_white_who_individuals WHERE name = 'Benjamin Franklin'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 7 for Benjamin Franklin
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was the first lending library in America that Franklin started?', 'First lending library', 'Pennsylvania Gazette newspaper', 'Poor Richard''s Almanack', 'Boston Public Library', 7
FROM red_white_who_individuals WHERE name = 'Benjamin Franklin'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 8 for Benjamin Franklin
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What country did Franklin convince to help America during the Revolutionary War?', 'France', 'England', 'Spain', 'Netherlands', 8
FROM red_white_who_individuals WHERE name = 'Benjamin Franklin'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 9 for Benjamin Franklin
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How old was Franklin when he signed the Constitution?', '81 years old', '76 years old', '70 years old', '85 years old', 9
FROM red_white_who_individuals WHERE name = 'Benjamin Franklin'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 10 for Benjamin Franklin
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What piece of American money has Franklin''s face on it?', 'Hundred-dollar bill', 'Twenty-dollar bill', 'Fifty-dollar bill', 'One-dollar bill', 10
FROM red_white_who_individuals WHERE name = 'Benjamin Franklin'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;


-- Individual: Abraham Lincoln
INSERT INTO red_white_who_individuals (name, birth_year, death_year, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery_1, photo_gallery_2, photo_gallery_3, photo_gallery_4, photo_gallery_5, photo_gallery_6, photo_gallery_7, photo_gallery_8, photo_gallery_9, photo_gallery_10)
VALUES (
  'Abraham Lincoln',
  1809,
  1865,
  ARRAY['Preserved the Union during the Civil War and freed the enslaved people'],
  '{"notes":"Born in a log cabin in Kentucky; Self-educated frontier lawyer from Illinois; 16th President of the United States (1861-1865); Led the nation through the Civil War; Issued the Emancipation Proclamation (1863); Delivered the Gettysburg Address; Assassinated by John Wilkes Booth at Ford's Theatre"}',
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
  'https://www.whitehouse.gov/wp-content/uploads/2021/01/16_abraham_lincoln.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a53000:3a53900:3a53959/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a52000:3a52800:3a52887/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a53000:3a53800:3a53865/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a53000:3a53900:3a53960/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a53000:3a53800:3a53867/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b40000:3b40000:3b40052/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cwpb:00900:00968/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a53000:3a53900:3a53961/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b19000:3b19100:3b19164/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b19000:3b19100:3b19165/full/pct:25/0/default.jpg'
)
ON CONFLICT (name) DO UPDATE SET
  birth_year = EXCLUDED.birth_year,
  death_year = EXCLUDED.death_year,
  key_events = EXCLUDED.key_events,
  key_facts = EXCLUDED.key_facts,
  biographical_summary = EXCLUDED.biographical_summary,
  main_photo_url = EXCLUDED.main_photo_url,
  photo_gallery_1 = EXCLUDED.photo_gallery_1,
  photo_gallery_2 = EXCLUDED.photo_gallery_2,
  photo_gallery_3 = EXCLUDED.photo_gallery_3,
  photo_gallery_4 = EXCLUDED.photo_gallery_4,
  photo_gallery_5 = EXCLUDED.photo_gallery_5,
  photo_gallery_6 = EXCLUDED.photo_gallery_6,
  photo_gallery_7 = EXCLUDED.photo_gallery_7,
  photo_gallery_8 = EXCLUDED.photo_gallery_8,
  photo_gallery_9 = EXCLUDED.photo_gallery_9,
  photo_gallery_10 = EXCLUDED.photo_gallery_10,
  updated_at = NOW();

-- Question 1 for Abraham Lincoln
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'In what state was Abraham Lincoln born, and what kind of home was he born in?', 'Kentucky, log cabin', 'Indiana, log cabin', 'Illinois, log cabin', 'Virginia, farmhouse', 1
FROM red_white_who_individuals WHERE name = 'Abraham Lincoln'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 2 for Abraham Lincoln
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How much formal schooling did Lincoln have as a child?', 'Less than one year', 'Three years', 'Six years', 'Two months', 2
FROM red_white_who_individuals WHERE name = 'Abraham Lincoln'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 3 for Abraham Lincoln
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How did young Lincoln educate himself?', 'Reading books by firelight', 'Attending night school', 'Learning from tutors', 'Working as a clerk', 3
FROM red_white_who_individuals WHERE name = 'Abraham Lincoln'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 4 for Abraham Lincoln
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What profession did Lincoln teach himself that he practiced in Illinois?', 'Lawyer', 'Doctor', 'Store clerk', 'Surveyor', 4
FROM red_white_who_individuals WHERE name = 'Abraham Lincoln'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 5 for Abraham Lincoln
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What 1858 series of public discussions made Lincoln famous?', 'Lincoln-Douglas debates', 'Lincoln-Breckinridge debates', 'Senate campaign speeches', 'Presidential debates of 1860', 5
FROM red_white_who_individuals WHERE name = 'Abraham Lincoln'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 6 for Abraham Lincoln
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What document did Lincoln issue on January 1, 1863, to free enslaved people?', 'Emancipation Proclamation', 'Thirteenth Amendment', 'Declaration of Freedom', 'Civil Rights Act', 6
FROM red_white_who_individuals WHERE name = 'Abraham Lincoln'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 7 for Abraham Lincoln
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many words was the Gettysburg Address?', '272 words', '500 words', '150 words', '1,000 words', 7
FROM red_white_who_individuals WHERE name = 'Abraham Lincoln'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 8 for Abraham Lincoln
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What famous phrase from the Gettysburg Address describes American government?', 'Government of the people, by the people, for the people', 'Life, liberty, and the pursuit of happiness', 'All men are created equal', 'United we stand, divided we fall', 8
FROM red_white_who_individuals WHERE name = 'Abraham Lincoln'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 9 for Abraham Lincoln
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who assassinated Lincoln, and where did it happen?', 'John Wilkes Booth at Ford''s Theatre', 'Lee Harvey Oswald at the Capitol', 'Charles Guiteau at a train station', 'John Wilkes Booth at the White House', 9
FROM red_white_who_individuals WHERE name = 'Abraham Lincoln'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 10 for Abraham Lincoln
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many soldiers died during the Civil War?', 'Over 600,000 soldiers', 'About 250,000 soldiers', 'Over 1 million soldiers', 'About 400,000 soldiers', 10
FROM red_white_who_individuals WHERE name = 'Abraham Lincoln'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;


-- Individual: Thomas Jefferson
INSERT INTO red_white_who_individuals (name, birth_year, death_year, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery_1, photo_gallery_2, photo_gallery_3, photo_gallery_4, photo_gallery_5, photo_gallery_6, photo_gallery_7, photo_gallery_8, photo_gallery_9, photo_gallery_10)
VALUES (
  'Thomas Jefferson',
  1743,
  1826,
  ARRAY['Primary author of the Declaration of Independence'],
  '{"notes":"Born in Shadwell, Virginia; Brilliant writer and architect; Primary author of Declaration of Independence (1776); Third President of the United States (1801-1809); Purchased Louisiana Territory, doubling nation's size; Founded the University of Virginia; Died on July 4, 1826, the 50th anniversary of the Declaration"}',
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
  'https://www.whitehouse.gov/wp-content/uploads/2021/01/03_thomas_jefferson.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a11000:3a11700:3a11731/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c10000:3c10000:3c10096/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:09100:09121/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b11000:3b11300:3b11321/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a11000:3a11700:3a11732/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c10000:3c10000:3c10097/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:09100:09122/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b11000:3b11300:3b11322/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a11000:3a11700:3a11733/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c10000:3c10000:3c10098/full/pct:25/0/default.jpg'
)
ON CONFLICT (name) DO UPDATE SET
  birth_year = EXCLUDED.birth_year,
  death_year = EXCLUDED.death_year,
  key_events = EXCLUDED.key_events,
  key_facts = EXCLUDED.key_facts,
  biographical_summary = EXCLUDED.biographical_summary,
  main_photo_url = EXCLUDED.main_photo_url,
  photo_gallery_1 = EXCLUDED.photo_gallery_1,
  photo_gallery_2 = EXCLUDED.photo_gallery_2,
  photo_gallery_3 = EXCLUDED.photo_gallery_3,
  photo_gallery_4 = EXCLUDED.photo_gallery_4,
  photo_gallery_5 = EXCLUDED.photo_gallery_5,
  photo_gallery_6 = EXCLUDED.photo_gallery_6,
  photo_gallery_7 = EXCLUDED.photo_gallery_7,
  photo_gallery_8 = EXCLUDED.photo_gallery_8,
  photo_gallery_9 = EXCLUDED.photo_gallery_9,
  photo_gallery_10 = EXCLUDED.photo_gallery_10,
  updated_at = NOW();

-- Question 1 for Thomas Jefferson
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When and where was Thomas Jefferson born?', '1743, Virginia', '1745, Massachusetts', '1740, Virginia', '1750, Pennsylvania', 1
FROM red_white_who_individuals WHERE name = 'Thomas Jefferson'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 2 for Thomas Jefferson
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How old was Jefferson when he wrote the Declaration of Independence?', 'Primary author of Declaration', '25 years old', '33 years old', '40 years old', 2
FROM red_white_who_individuals WHERE name = 'Thomas Jefferson'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 3 for Thomas Jefferson
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What famous phrase begins the Declaration''s statement about human equality?', 'Monticello', 'We hold these truths', 'Life, liberty, and happiness', 'We the people', 3
FROM red_white_who_individuals WHERE name = 'Thomas Jefferson'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 4 for Thomas Jefferson
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What date did the Declaration get signed, becoming America''s birthday?', 'Louisiana Purchase 1803', 'July 4, 1777', 'July 2, 1776', 'July 4, 1775', 4
FROM red_white_who_individuals WHERE name = 'Thomas Jefferson'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 5 for Thomas Jefferson
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What 1803 land purchase doubled the size of the United States?', 'University of Virginia', 'Florida Purchase', 'Texas Annexation', 'Oregon Territory', 5
FROM red_white_who_individuals WHERE name = 'Thomas Jefferson'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 6 for Thomas Jefferson
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How much did the Louisiana Purchase cost, about how many cents per acre?', 'Lewis and Clark Expedition', 'About 5 cents per acre', 'About 10 cents per acre', 'About 25 cents per acre', 6
FROM red_white_who_individuals WHERE name = 'Thomas Jefferson'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 7 for Thomas Jefferson
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Which two explorers did Jefferson send to explore the Louisiana Territory?', 'Third President 1801-1809', 'Lewis and Clark', 'Pike and Fremont', 'Boone and Crockett', 7
FROM red_white_who_individuals WHERE name = 'Thomas Jefferson'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 8 for Thomas Jefferson
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What is the name of Jefferson''s Virginia home that he designed himself?', 'Life, liberty, pursuit of happiness', 'Mount Vernon', 'Shadwell', 'Poplar Forest', 8
FROM red_white_who_individuals WHERE name = 'Thomas Jefferson'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 9 for Thomas Jefferson
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What university did Jefferson found after leaving the presidency?', 'Democratic-Republican Party', 'University of Pennsylvania', 'College of William and Mary', 'Harvard University', 9
FROM red_white_who_individuals WHERE name = 'Thomas Jefferson'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 10 for Thomas Jefferson
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'On what amazing date did Jefferson die in 1826?', 'Virginia Statute for Religious Freedom', 'His birthday, April 13', 'Christmas Day, 1826', 'New Year''s Day, 1827', 10
FROM red_white_who_individuals WHERE name = 'Thomas Jefferson'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;


-- Individual: Harriet Tubman
INSERT INTO red_white_who_individuals (name, birth_year, death_year, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery_1, photo_gallery_2, photo_gallery_3, photo_gallery_4, photo_gallery_5, photo_gallery_6, photo_gallery_7, photo_gallery_8, photo_gallery_9, photo_gallery_10)
VALUES (
  'Harriet Tubman',
  1822,
  1913,
  ARRAY['Conductor on the Underground Railroad who freed approximately 70 enslaved people'],
  '{"notes":"Born enslaved in Maryland; Escaped to freedom in 1849; Made approximately 13 rescue missions to the South; Known as Moses of her people; Never lost a single passenger on Underground Railroad; Served as spy and scout for Union Army during Civil War; Activist for women's rights after the war"}',
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
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20100400/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20100401/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20100402/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20100403/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20100404/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20100405/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20100406/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20100407/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20100408/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20100409/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20100410/full/pct:25/0/default.jpg'
)
ON CONFLICT (name) DO UPDATE SET
  birth_year = EXCLUDED.birth_year,
  death_year = EXCLUDED.death_year,
  key_events = EXCLUDED.key_events,
  key_facts = EXCLUDED.key_facts,
  biographical_summary = EXCLUDED.biographical_summary,
  main_photo_url = EXCLUDED.main_photo_url,
  photo_gallery_1 = EXCLUDED.photo_gallery_1,
  photo_gallery_2 = EXCLUDED.photo_gallery_2,
  photo_gallery_3 = EXCLUDED.photo_gallery_3,
  photo_gallery_4 = EXCLUDED.photo_gallery_4,
  photo_gallery_5 = EXCLUDED.photo_gallery_5,
  photo_gallery_6 = EXCLUDED.photo_gallery_6,
  photo_gallery_7 = EXCLUDED.photo_gallery_7,
  photo_gallery_8 = EXCLUDED.photo_gallery_8,
  photo_gallery_9 = EXCLUDED.photo_gallery_9,
  photo_gallery_10 = EXCLUDED.photo_gallery_10,
  updated_at = NOW();

-- Question 1 for Harriet Tubman
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'In what state was Harriet Tubman born into slavery?', 'Maryland, around 1822', 'Virginia, around 1820', 'Pennsylvania, around 1825', 'North Carolina, around 1822', 1
FROM red_white_who_individuals WHERE name = 'Harriet Tubman'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 2 for Harriet Tubman
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What serious injury did Tubman suffer as a child that affected her for life?', 'Underground Railroad conductor', 'A broken arm from farm work', 'Blindness from an illness', 'Burns from a kitchen fire', 2
FROM red_white_who_individuals WHERE name = 'Harriet Tubman'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 3 for Harriet Tubman
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'In what year did Tubman escape to freedom in the North?', 'Moses', '1852', '1845', '1855', 3
FROM red_white_who_individuals WHERE name = 'Harriet Tubman'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 4 for Harriet Tubman
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was the Underground Railroad that Tubman worked on?', 'About 70 enslaved people', 'A secret train system for escaping', 'An actual railroad with hidden tracks', 'A code name for safe houses', 4
FROM red_white_who_individuals WHERE name = 'Harriet Tubman'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 5 for Harriet Tubman
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Approximately how many rescue trips did Tubman make to the South?', '19 trips to the South', 'About 7 trips', 'About 25 trips', 'About 13 trips', 5
FROM red_white_who_individuals WHERE name = 'Harriet Tubman'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 6 for Harriet Tubman
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'About how many enslaved people did Tubman rescue?', 'Union Army nurse and spy', 'Over 300 enslaved people', 'About 30 enslaved people', 'Over 150 enslaved people', 6
FROM red_white_who_individuals WHERE name = 'Harriet Tubman'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 7 for Harriet Tubman
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What nickname was Tubman given, comparing her to a biblical figure?', 'Never lost a passenger', 'Harriet the Brave', 'Freedom Fighter', 'The Liberator', 7
FROM red_white_who_individuals WHERE name = 'Harriet Tubman'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 8 for Harriet Tubman
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What special distinction did Tubman earn during the Combahee River Raid?', 'Head injury from overseer', 'First woman to lead combat troops', 'First woman to receive military pay', 'First woman to carry a weapon in war', 8
FROM red_white_who_individuals WHERE name = 'Harriet Tubman'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 9 for Harriet Tubman
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many passengers did Tubman lose on the Underground Railroad?', 'Auburn, New York', 'Three passengers', 'About a dozen passengers', 'Only family members', 9
FROM red_white_who_individuals WHERE name = 'Harriet Tubman'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 10 for Harriet Tubman
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What piece of American money was Tubman chosen to appear on?', 'Twenty-dollar bill', 'Ten-dollar bill', 'Fifty-cent piece', 'Five-dollar bill', 10
FROM red_white_who_individuals WHERE name = 'Harriet Tubman'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;


-- Individual: Frederick Douglass
INSERT INTO red_white_who_individuals (name, birth_year, death_year, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery_1, photo_gallery_2, photo_gallery_3, photo_gallery_4, photo_gallery_5, photo_gallery_6, photo_gallery_7, photo_gallery_8, photo_gallery_9, photo_gallery_10)
VALUES (
  'Frederick Douglass',
  1818,
  1895,
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
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50050000500/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50050100501/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50050200502/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50050300503/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50050400504/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50050500505/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50050600506/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50050700507/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50050800508/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50050900509/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50051000510/full/pct:25/0/default.jpg'
)
ON CONFLICT (name) DO UPDATE SET
  birth_year = EXCLUDED.birth_year,
  death_year = EXCLUDED.death_year,
  key_events = EXCLUDED.key_events,
  key_facts = EXCLUDED.key_facts,
  biographical_summary = EXCLUDED.biographical_summary,
  main_photo_url = EXCLUDED.main_photo_url,
  photo_gallery_1 = EXCLUDED.photo_gallery_1,
  photo_gallery_2 = EXCLUDED.photo_gallery_2,
  photo_gallery_3 = EXCLUDED.photo_gallery_3,
  photo_gallery_4 = EXCLUDED.photo_gallery_4,
  photo_gallery_5 = EXCLUDED.photo_gallery_5,
  photo_gallery_6 = EXCLUDED.photo_gallery_6,
  photo_gallery_7 = EXCLUDED.photo_gallery_7,
  photo_gallery_8 = EXCLUDED.photo_gallery_8,
  photo_gallery_9 = EXCLUDED.photo_gallery_9,
  photo_gallery_10 = EXCLUDED.photo_gallery_10,
  updated_at = NOW();

-- Question 1 for Frederick Douglass
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'In what state was Frederick Douglass born into slavery?', 'Maryland, around 1818', 'Virginia, around 1820', 'South Carolina, around 1815', 'Georgia, around 1818', 1
FROM red_white_who_individuals WHERE name = 'Frederick Douglass'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 2 for Frederick Douglass
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Why did the slaveholder say teaching Frederick to read was dangerous?', 'Escaped slavery in 1838', 'Reading would make him lazy', 'Education was too expensive', 'Literacy would make him rebellious', 2
FROM red_white_who_individuals WHERE name = 'Frederick Douglass'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 3 for Frederick Douglass
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How did young Frederick learn to read and write?', 'Narrative of Frederick Douglass', 'Formal schooling in secret', 'Teaching from his mother', 'Learning from other enslaved people', 3
FROM red_white_who_individuals WHERE name = 'Frederick Douglass'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 4 for Frederick Douglass
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'In what year did Douglass escape to freedom?', 'Abolitionist speaker and writer', '1845', '1842', '1850', 4
FROM red_white_who_individuals WHERE name = 'Frederick Douglass'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 5 for Frederick Douglass
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was the title of Douglass''s famous autobiography?', 'Self-taught reading and writing', 'My Bondage and My Freedom', 'Up From Slavery', 'Twelve Years a Slave', 5
FROM red_white_who_individuals WHERE name = 'Frederick Douglass'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 6 for Frederick Douglass
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was the name of the antislavery newspaper Douglass started?', 'The North Star newspaper', 'Freedom''s Journal', 'The Liberator', 'The Emancipator', 6
FROM red_white_who_individuals WHERE name = 'Frederick Douglass'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 7 for Frederick Douglass
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Douglass convince President Lincoln to allow during the Civil War?', 'Abraham Lincoln meetings', 'End slavery immediately', 'Pay reparations to enslaved people', 'Allow Black men to serve as soldiers', 7
FROM red_white_who_individuals WHERE name = 'Frederick Douglass'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 8 for Frederick Douglass
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'About how many Black men served in the Union Army and Navy?', 'U.S. Marshal Washington D.C.', 'About 100,000', 'About 50,000', 'About 250,000', 8
FROM red_white_who_individuals WHERE name = 'Frederick Douglass'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 9 for Frederick Douglass
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What gift did Mary Lincoln give Douglass after the president''s death?', 'Ambassador to Haiti', 'A photograph of Lincoln', 'Lincoln''s pocket watch', 'A letter from Lincoln', 9
FROM red_white_who_individuals WHERE name = 'Frederick Douglass'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 10 for Frederick Douglass
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What famous quote by Douglass says ''If there is no struggle...''?', 'Women''s suffrage supporter', 'If there is no pain, there is no growth', 'If there is no justice, there is no peace', 'If there is no sacrifice, there is no freedom', 10
FROM red_white_who_individuals WHERE name = 'Frederick Douglass'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;


-- Individual: Theodore Roosevelt
INSERT INTO red_white_who_individuals (name, birth_year, death_year, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery_1, photo_gallery_2, photo_gallery_3, photo_gallery_4, photo_gallery_5, photo_gallery_6, photo_gallery_7, photo_gallery_8, photo_gallery_9, photo_gallery_10)
VALUES (
  'Theodore Roosevelt',
  1858,
  1919,
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
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50060000600/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50060100601/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50060200602/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50060300603/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50060400604/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50060500605/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50060600606/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50060700607/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50060800608/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50060900609/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50061000610/full/pct:25/0/default.jpg'
)
ON CONFLICT (name) DO UPDATE SET
  birth_year = EXCLUDED.birth_year,
  death_year = EXCLUDED.death_year,
  key_events = EXCLUDED.key_events,
  key_facts = EXCLUDED.key_facts,
  biographical_summary = EXCLUDED.biographical_summary,
  main_photo_url = EXCLUDED.main_photo_url,
  photo_gallery_1 = EXCLUDED.photo_gallery_1,
  photo_gallery_2 = EXCLUDED.photo_gallery_2,
  photo_gallery_3 = EXCLUDED.photo_gallery_3,
  photo_gallery_4 = EXCLUDED.photo_gallery_4,
  photo_gallery_5 = EXCLUDED.photo_gallery_5,
  photo_gallery_6 = EXCLUDED.photo_gallery_6,
  photo_gallery_7 = EXCLUDED.photo_gallery_7,
  photo_gallery_8 = EXCLUDED.photo_gallery_8,
  photo_gallery_9 = EXCLUDED.photo_gallery_9,
  photo_gallery_10 = EXCLUDED.photo_gallery_10,
  updated_at = NOW();

-- Question 1 for Theodore Roosevelt
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What childhood illness did Theodore Roosevelt overcome through exercise?', '1858, New York', 'Polio that affected his legs', 'Heart problems from birth', 'Tuberculosis', 1
FROM red_white_who_individuals WHERE name = 'Theodore Roosevelt'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 2 for Theodore Roosevelt
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where did Roosevelt live as a cowboy for two years after a personal tragedy?', 'Rough Riders Spanish-American War', 'The Rocky Mountains in Colorado', 'A ranch in North Dakota', 'Alaska territory', 2
FROM red_white_who_individuals WHERE name = 'Theodore Roosevelt'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 3 for Theodore Roosevelt
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was the name of Roosevelt''s volunteer cavalry regiment in the Spanish-American War?', 'Battle of San Juan Hill', 'Roosevelt''s Rangers', 'Teddy''s Tigers', 'The Buffalo Soldiers', 3
FROM red_white_who_individuals WHERE name = 'Theodore Roosevelt'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 4 for Theodore Roosevelt
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How old was Roosevelt when he became the youngest president?', '42 years old youngest president', '38 years old', '45 years old', '50 years old', 4
FROM red_white_who_individuals WHERE name = 'Theodore Roosevelt'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 5 for Theodore Roosevelt
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'About how many acres of public land did Roosevelt protect?', 'Nobel Peace Prize 1906', 'About 100 million acres', 'About 50 million acres', 'About 300 million acres', 5
FROM red_white_who_individuals WHERE name = 'Theodore Roosevelt'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 6 for Theodore Roosevelt
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What major construction project did Roosevelt champion that connected two oceans?', 'National parks and conservation', 'The Transcontinental Railroad', 'The Erie Canal expansion', 'The Suez Canal', 6
FROM red_white_who_individuals WHERE name = 'Theodore Roosevelt'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 7 for Theodore Roosevelt
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What award did Roosevelt win in 1906 for helping end a war?', 'Big Stick diplomacy', 'Congressional Medal of Honor', 'Presidential Citation', 'Carnegie Peace Prize', 7
FROM red_white_who_individuals WHERE name = 'Theodore Roosevelt'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 8 for Theodore Roosevelt
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Roosevelt''s famous motto about speaking and carrying?', 'Panama Canal construction', 'Walk softly and carry big ideas', 'Act boldly and speak loudly', 'Lead firmly and follow through', 8
FROM red_white_who_individuals WHERE name = 'Theodore Roosevelt'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 9 for Theodore Roosevelt
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Roosevelt do after being shot during a campaign speech?', 'Progressive Bull Moose Party', 'Stopped speaking immediately', 'Called for an ambulance', 'Finished his speech despite the wound', 9
FROM red_white_who_individuals WHERE name = 'Theodore Roosevelt'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 10 for Theodore Roosevelt
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What nickname did Roosevelt use for his 1912 political party?', 'Speak softly and carry big stick', 'Progressive Party', 'Republican Reform Party', 'American Party', 10
FROM red_white_who_individuals WHERE name = 'Theodore Roosevelt'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;


-- Individual: Martin Luther King Jr.
INSERT INTO red_white_who_individuals (name, birth_year, death_year, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery_1, photo_gallery_2, photo_gallery_3, photo_gallery_4, photo_gallery_5, photo_gallery_6, photo_gallery_7, photo_gallery_8, photo_gallery_9, photo_gallery_10)
VALUES (
  'Martin Luther King Jr.',
  1929,
  1968,
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
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50070000700/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50070100701/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50070200702/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50070300703/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50070400704/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50070500705/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50070600706/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50070700707/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50070800708/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50070900709/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50071000710/full/pct:25/0/default.jpg'
)
ON CONFLICT (name) DO UPDATE SET
  birth_year = EXCLUDED.birth_year,
  death_year = EXCLUDED.death_year,
  key_events = EXCLUDED.key_events,
  key_facts = EXCLUDED.key_facts,
  biographical_summary = EXCLUDED.biographical_summary,
  main_photo_url = EXCLUDED.main_photo_url,
  photo_gallery_1 = EXCLUDED.photo_gallery_1,
  photo_gallery_2 = EXCLUDED.photo_gallery_2,
  photo_gallery_3 = EXCLUDED.photo_gallery_3,
  photo_gallery_4 = EXCLUDED.photo_gallery_4,
  photo_gallery_5 = EXCLUDED.photo_gallery_5,
  photo_gallery_6 = EXCLUDED.photo_gallery_6,
  photo_gallery_7 = EXCLUDED.photo_gallery_7,
  photo_gallery_8 = EXCLUDED.photo_gallery_8,
  photo_gallery_9 = EXCLUDED.photo_gallery_9,
  photo_gallery_10 = EXCLUDED.photo_gallery_10,
  updated_at = NOW();

-- Question 1 for Martin Luther King Jr.
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where and when was Martin Luther King Jr. born?', '1929, Atlanta Georgia', '1931, Memphis Tennessee', '1927, Birmingham Alabama', '1929, Montgomery Alabama', 1
FROM red_white_who_individuals WHERE name = 'Martin Luther King Jr.'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 2 for Martin Luther King Jr.
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What event in 1955 led King to lead the Montgomery Bus Boycott?', 'I Have a Dream speech', 'The Greensboro sit-ins', 'The Freedom Rides', 'Rosa Parks''s arrest', 2
FROM red_white_who_individuals WHERE name = 'Martin Luther King Jr.'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 3 for Martin Luther King Jr.
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How long did the Montgomery Bus Boycott last?', 'Montgomery Bus Boycott leader', 'About 200 days', 'About 50 days', 'About 381 days', 3
FROM red_white_who_individuals WHERE name = 'Martin Luther King Jr.'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 4 for Martin Luther King Jr.
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What idea about fighting injustice did King believe in and practice?', 'Nonviolent resistance philosophy', 'Armed resistance', 'Legal challenges only', 'Economic pressure', 4
FROM red_white_who_individuals WHERE name = 'Martin Luther King Jr.'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 5 for Martin Luther King Jr.
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who inspired King''s philosophy of nonviolent protest besides Jesus?', 'Nobel Peace Prize 1964', 'Frederick Douglass', 'Mahatma Gandhi', 'Abraham Lincoln', 5
FROM red_white_who_individuals WHERE name = 'Martin Luther King Jr.'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 6 for Martin Luther King Jr.
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many people gathered at the March on Washington in 1963?', 'Southern Christian Leadership Conference', 'About 100,000 people', 'About 500,000 people', 'About 50,000 people', 6
FROM red_white_who_individuals WHERE name = 'Martin Luther King Jr.'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 7 for Martin Luther King Jr.
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What is the most famous line from King''s I Have a Dream speech?', 'Civil Rights Act 1964', 'Free at last, free at last', 'We shall overcome', 'Justice for all', 7
FROM red_white_who_individuals WHERE name = 'Martin Luther King Jr.'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 8 for Martin Luther King Jr.
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How old was King when he won the Nobel Peace Prize?', '39 years old when assassinated', '39 years old', '32 years old', '45 years old', 8
FROM red_white_who_individuals WHERE name = 'Martin Luther King Jr.'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 9 for Martin Luther King Jr.
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What two important laws did King''s work help pass in 1964 and 1965?', 'James Earl Ray in Memphis', 'Voting Rights Act and Fair Housing Act', 'Civil Rights Act and Brown v. Board', '13th Amendment and 14th Amendment', 9
FROM red_white_who_individuals WHERE name = 'Martin Luther King Jr.'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 10 for Martin Luther King Jr.
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'On what date is Martin Luther King Jr. Day celebrated?', 'MLK Day federal holiday', 'First Monday in February', 'January 15th every year', 'Last Monday in January', 10
FROM red_white_who_individuals WHERE name = 'Martin Luther King Jr.'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;


-- Individual: Rosa Parks
INSERT INTO red_white_who_individuals (name, birth_year, death_year, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery_1, photo_gallery_2, photo_gallery_3, photo_gallery_4, photo_gallery_5, photo_gallery_6, photo_gallery_7, photo_gallery_8, photo_gallery_9, photo_gallery_10)
VALUES (
  'Rosa Parks',
  1913,
  2005,
  ARRAY['Refused to give up her bus seat, sparking the Montgomery Bus Boycott'],
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
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10100800/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10100801/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10100802/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10100803/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10100804/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10100805/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10100806/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10100807/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10100808/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10100809/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10100810/full/pct:25/0/default.jpg'
)
ON CONFLICT (name) DO UPDATE SET
  birth_year = EXCLUDED.birth_year,
  death_year = EXCLUDED.death_year,
  key_events = EXCLUDED.key_events,
  key_facts = EXCLUDED.key_facts,
  biographical_summary = EXCLUDED.biographical_summary,
  main_photo_url = EXCLUDED.main_photo_url,
  photo_gallery_1 = EXCLUDED.photo_gallery_1,
  photo_gallery_2 = EXCLUDED.photo_gallery_2,
  photo_gallery_3 = EXCLUDED.photo_gallery_3,
  photo_gallery_4 = EXCLUDED.photo_gallery_4,
  photo_gallery_5 = EXCLUDED.photo_gallery_5,
  photo_gallery_6 = EXCLUDED.photo_gallery_6,
  photo_gallery_7 = EXCLUDED.photo_gallery_7,
  photo_gallery_8 = EXCLUDED.photo_gallery_8,
  photo_gallery_9 = EXCLUDED.photo_gallery_9,
  photo_gallery_10 = EXCLUDED.photo_gallery_10,
  updated_at = NOW();

-- Question 1 for Rosa Parks
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where and when was Rosa Parks born?', '1913, Alabama', '1915, Mississippi', '1910, Georgia', '1918, Alabama', 1
FROM red_white_who_individuals WHERE name = 'Rosa Parks'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 2 for Rosa Parks
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What organization did Rosa Parks work for as secretary in Montgomery?', 'Refused bus seat Montgomery', 'A women''s rights organization', 'The Montgomery Improvement Association', 'The Urban League', 2
FROM red_white_who_individuals WHERE name = 'Rosa Parks'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 3 for Rosa Parks
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'On what date was Rosa Parks arrested for refusing to give up her bus seat?', 'Montgomery Bus Boycott catalyst', 'December 15, 1955', 'January 1, 1956', 'November 1, 1955', 3
FROM red_white_who_individuals WHERE name = 'Rosa Parks'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 4 for Rosa Parks
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Why did Rosa Parks say she refused to give up her seat?', 'NAACP secretary', 'She was too tired to move', 'She wanted to start a boycott', 'She was tired of giving in', 4
FROM red_white_who_individuals WHERE name = 'Rosa Parks'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 5 for Rosa Parks
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How long did the Montgomery Bus Boycott last?', '381 days boycott lasted', 'About 200 days', 'About 66 days', 'About one year', 5
FROM red_white_who_individuals WHERE name = 'Rosa Parks'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 6 for Rosa Parks
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What young minister became famous while leading the bus boycott?', 'Mother of Civil Rights Movement', 'Ralph Abernathy', 'Thurgood Marshall', 'Martin Luther King Jr.', 6
FROM red_white_who_individuals WHERE name = 'Rosa Parks'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 7 for Rosa Parks
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did the Supreme Court rule about bus segregation?', 'Congressional Gold Medal', 'Bus segregation must end in Alabama', 'Bus segregation was unconstitutional', 'Bus companies must integrate', 7
FROM red_white_who_individuals WHERE name = 'Rosa Parks'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 8 for Rosa Parks
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What nickname is Rosa Parks known by in civil rights history?', 'Moved to Detroit Michigan', 'First Lady of Freedom', 'Queen of Civil Rights', 'Rosa the Brave', 8
FROM red_white_who_individuals WHERE name = 'Rosa Parks'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 9 for Rosa Parks
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What two highest civilian honors did Rosa Parks receive?', 'Seamstress occupation', 'Congressional Gold Medal and Purple Heart', 'Nobel Peace Prize and Medal of Freedom', 'Congressional Gold Medal and Medal of Freedom', 9
FROM red_white_who_individuals WHERE name = 'Rosa Parks'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 10 for Rosa Parks
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What special honor did Rosa Parks receive after her death in the U.S. Capitol?', 'Died at 92 years old', 'A statue in the Capitol Rotunda', 'Lying in honor in the Capitol', 'A memorial on the National Mall', 10
FROM red_white_who_individuals WHERE name = 'Rosa Parks'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;


-- Individual: Sacagawea
INSERT INTO red_white_who_individuals (name, birth_year, death_year, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery_1, photo_gallery_2, photo_gallery_3, photo_gallery_4, photo_gallery_5, photo_gallery_6, photo_gallery_7, photo_gallery_8, photo_gallery_9, photo_gallery_10)
VALUES (
  'Sacagawea',
  1788,
  1812,
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
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20100900/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20100901/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20100902/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20100903/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20100904/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20100905/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20100906/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20100907/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20100908/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20100909/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20100910/full/pct:25/0/default.jpg'
)
ON CONFLICT (name) DO UPDATE SET
  birth_year = EXCLUDED.birth_year,
  death_year = EXCLUDED.death_year,
  key_events = EXCLUDED.key_events,
  key_facts = EXCLUDED.key_facts,
  biographical_summary = EXCLUDED.biographical_summary,
  main_photo_url = EXCLUDED.main_photo_url,
  photo_gallery_1 = EXCLUDED.photo_gallery_1,
  photo_gallery_2 = EXCLUDED.photo_gallery_2,
  photo_gallery_3 = EXCLUDED.photo_gallery_3,
  photo_gallery_4 = EXCLUDED.photo_gallery_4,
  photo_gallery_5 = EXCLUDED.photo_gallery_5,
  photo_gallery_6 = EXCLUDED.photo_gallery_6,
  photo_gallery_7 = EXCLUDED.photo_gallery_7,
  photo_gallery_8 = EXCLUDED.photo_gallery_8,
  photo_gallery_9 = EXCLUDED.photo_gallery_9,
  photo_gallery_10 = EXCLUDED.photo_gallery_10,
  updated_at = NOW();

-- Question 1 for Sacagawea
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What Native American tribe was Sacagawea born into?', 'Around 1788, Idaho', 'Nez Perce tribe', 'Cherokee tribe', 'Lakota Sioux tribe', 1
FROM red_white_who_individuals WHERE name = 'Sacagawea'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 2 for Sacagawea
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What does Sacagawea''s name mean in the Shoshone language?', 'Lewis Clark Expedition guide', 'Running Water', 'Morning Star', 'Bird Woman', 2
FROM red_white_who_individuals WHERE name = 'Sacagawea'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 3 for Sacagawea
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What happened to Sacagawea when she was about twelve years old?', 'Shoshone tribe member', 'She was sold as a servant', 'She was traded to another tribe', 'She ran away from home', 3
FROM red_white_who_individuals WHERE name = 'Sacagawea'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 4 for Sacagawea
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who were the two leaders of the expedition Sacagawea joined?', 'Reached Pacific Ocean', 'Pike and Fremont', 'Clark and Crockett', 'Lewis and Clark', 4
FROM red_white_who_individuals WHERE name = 'Sacagawea'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 5 for Sacagawea
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How old was Sacagawea''s baby when the expedition began?', 'Baby son Jean Baptiste', 'About one year old', 'About three months old', 'About two weeks old', 5
FROM red_white_who_individuals WHERE name = 'Sacagawea'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 6 for Sacagawea
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How did Sacagawea''s presence help prevent conflicts with Native tribes?', 'Interpreter and navigator', 'She could translate all languages', 'War parties don''t travel with women and babies', 'She knew secret paths', 6
FROM red_white_who_individuals WHERE name = 'Sacagawea'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 7 for Sacagawea
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What amazing reunion happened when Sacagawea reached Shoshone territory?', 'Husband Toussaint Charbonneau', 'She found her mother alive', 'She met her childhood friend', 'She reunited with her brother', 7
FROM red_white_who_individuals WHERE name = 'Sacagawea'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 8 for Sacagawea
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did the Shoshone provide that the expedition desperately needed?', 'Helped obtain horses from Shoshone', 'Canoes and food supplies', 'Horses and directions', 'Weapons and shelter', 8
FROM red_white_who_individuals WHERE name = 'Sacagawea'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 9 for Sacagawea
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'About how many miles did the Lewis and Clark Expedition cover?', 'Golden dollar coin', 'About 4,000 miles', 'About 2,000 miles', 'About 10,000 miles', 9
FROM red_white_who_individuals WHERE name = 'Sacagawea'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 10 for Sacagawea
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What coin features Sacagawea''s image today?', 'Died around 1812', 'The nickel', 'The penny', 'The half-dollar', 10
FROM red_white_who_individuals WHERE name = 'Sacagawea'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;


-- Individual: Thomas Edison
INSERT INTO red_white_who_individuals (name, birth_year, death_year, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery_1, photo_gallery_2, photo_gallery_3, photo_gallery_4, photo_gallery_5, photo_gallery_6, photo_gallery_7, photo_gallery_8, photo_gallery_9, photo_gallery_10)
VALUES (
  'Thomas Edison',
  1847,
  1931,
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
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50100001000/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50100101001/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50100201002/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50100301003/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50100401004/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50100501005/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50100601006/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50100701007/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50100801008/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50100901009/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50101001010/full/pct:25/0/default.jpg'
)
ON CONFLICT (name) DO UPDATE SET
  birth_year = EXCLUDED.birth_year,
  death_year = EXCLUDED.death_year,
  key_events = EXCLUDED.key_events,
  key_facts = EXCLUDED.key_facts,
  biographical_summary = EXCLUDED.biographical_summary,
  main_photo_url = EXCLUDED.main_photo_url,
  photo_gallery_1 = EXCLUDED.photo_gallery_1,
  photo_gallery_2 = EXCLUDED.photo_gallery_2,
  photo_gallery_3 = EXCLUDED.photo_gallery_3,
  photo_gallery_4 = EXCLUDED.photo_gallery_4,
  photo_gallery_5 = EXCLUDED.photo_gallery_5,
  photo_gallery_6 = EXCLUDED.photo_gallery_6,
  photo_gallery_7 = EXCLUDED.photo_gallery_7,
  photo_gallery_8 = EXCLUDED.photo_gallery_8,
  photo_gallery_9 = EXCLUDED.photo_gallery_9,
  photo_gallery_10 = EXCLUDED.photo_gallery_10,
  updated_at = NOW();

-- Question 1 for Thomas Edison
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where and when was Thomas Edison born?', 'Milan Ohio 1847', 'Menlo Park, New Jersey 1850', 'Cleveland Ohio 1845', 'Detroit Michigan 1849', 1
FROM red_white_who_individuals WHERE name = 'Thomas Edison'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 2 for Thomas Edison
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Why did Edison''s mother teach him at home?', 'Teachers thought he was slow', 'He was often sick', 'He preferred working', 'He moved frequently', 2
FROM red_white_who_individuals WHERE name = 'Thomas Edison'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 3 for Thomas Edison
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What condition did Edison develop as a child that he said helped him concentrate?', 'Hearing loss helped concentration', 'Poor eyesight helped him read better', 'A limp helped him sit longer', 'Deafness helped him concentrate', 3
FROM red_white_who_individuals WHERE name = 'Thomas Edison'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 4 for Thomas Edison
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was special about Edison''s Menlo Park laboratory?', 'Menlo Park first R&D lab', 'First factory in America', 'First school laboratory', 'First university research center', 4
FROM red_white_who_individuals WHERE name = 'Thomas Edison'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 5 for Thomas Edison
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What device did Edison invent in 1877 that could record and play back sound?', 'Phonograph 1877', 'The telegraph in 1870', 'The telephone in 1875', 'The radio in 1880', 5
FROM red_white_who_individuals WHERE name = 'Thomas Edison'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 6 for Thomas Edison
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many materials did Edison famously test before creating a practical light bulb?', 'Over 3000 materials tested', 'Over 500 materials', 'Over 100 materials', 'Over 10,000 materials', 6
FROM red_white_who_individuals WHERE name = 'Thomas Edison'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 7 for Thomas Edison
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What material did Edison finally use for his light bulb filament?', 'Carbonized bamboo filament', 'Copper wire', 'Tungsten', 'Cotton thread', 7
FROM red_white_who_individuals WHERE name = 'Thomas Edison'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 8 for Thomas Edison
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What motion picture devices did Edison invent?', 'Kinetoscope motion pictures', 'The radio and television', 'The telephone and microphone', 'The camera and projector', 8
FROM red_white_who_individuals WHERE name = 'Thomas Edison'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 9 for Thomas Edison
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many U.S. patents did Edison hold, more than any other inventor?', 'Over 1000 patents', 'Over 500 patents', 'Over 2,000 patents', 'Exactly 800 patents', 9
FROM red_white_who_individuals WHERE name = 'Thomas Edison'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 10 for Thomas Edison
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What is Edison''s famous quote about genius and perspiration?', 'Genius 1% inspiration 99% perspiration', 'Success is 10% luck and 90% timing', 'Genius is 5% talent and 95% practice', 'Invention is 1% discovery and 99% development', 10
FROM red_white_who_individuals WHERE name = 'Thomas Edison'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;


-- Individual: Alexander Graham Bell
INSERT INTO red_white_who_individuals (name, birth_year, death_year, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery_1, photo_gallery_2, photo_gallery_3, photo_gallery_4, photo_gallery_5, photo_gallery_6, photo_gallery_7, photo_gallery_8, photo_gallery_9, photo_gallery_10)
VALUES (
  'Alexander Graham Bell',
  1847,
  1922,
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
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50110001100/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50110101101/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50110201102/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50110301103/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50110401104/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50110501105/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50110601106/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50110701107/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50110801108/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50110901109/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50111001110/full/pct:25/0/default.jpg'
)
ON CONFLICT (name) DO UPDATE SET
  birth_year = EXCLUDED.birth_year,
  death_year = EXCLUDED.death_year,
  key_events = EXCLUDED.key_events,
  key_facts = EXCLUDED.key_facts,
  biographical_summary = EXCLUDED.biographical_summary,
  main_photo_url = EXCLUDED.main_photo_url,
  photo_gallery_1 = EXCLUDED.photo_gallery_1,
  photo_gallery_2 = EXCLUDED.photo_gallery_2,
  photo_gallery_3 = EXCLUDED.photo_gallery_3,
  photo_gallery_4 = EXCLUDED.photo_gallery_4,
  photo_gallery_5 = EXCLUDED.photo_gallery_5,
  photo_gallery_6 = EXCLUDED.photo_gallery_6,
  photo_gallery_7 = EXCLUDED.photo_gallery_7,
  photo_gallery_8 = EXCLUDED.photo_gallery_8,
  photo_gallery_9 = EXCLUDED.photo_gallery_9,
  photo_gallery_10 = EXCLUDED.photo_gallery_10,
  updated_at = NOW();

-- Question 1 for Alexander Graham Bell
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Alexander Graham Bell born?', 'Edinburgh Scotland', 'London, England', 'Dublin, Ireland', 'Glasgow, Scotland', 1
FROM red_white_who_individuals WHERE name = 'Alexander Graham Bell'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 2 for Alexander Graham Bell
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What family connection made Bell interested in helping deaf people?', 'Mother and wife were deaf', 'His father was deaf', 'His sister and aunt were deaf', 'His brother was deaf', 2
FROM red_white_who_individuals WHERE name = 'Alexander Graham Bell'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 3 for Alexander Graham Bell
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was the name of Bell''s assistant who heard the first telephone message?', 'Assistant Thomas Watson', 'Alexander Bell Jr.', 'Samuel Morse', 'Elisha Gray', 3
FROM red_white_who_individuals WHERE name = 'Alexander Graham Bell'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 4 for Alexander Graham Bell
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What were the first words ever spoken over a telephone?', 'Mr Watson come here I want you', 'Watson, can you hear me now', 'Hello, this is Bell speaking', 'Testing, one two three', 4
FROM red_white_who_individuals WHERE name = 'Alexander Graham Bell'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 5 for Alexander Graham Bell
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How old was Bell when he invented the telephone?', '29 years old when invented', '25 years old', '35 years old', '32 years old', 5
FROM red_white_who_individuals WHERE name = 'Alexander Graham Bell'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 6 for Alexander Graham Bell
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where did Bell demonstrate the telephone in 1876?', 'Philadelphia Centennial Exhibition 1876', 'World''s Fair in Chicago 1893', 'Boston Science Exhibition 1875', 'New York Inventors Fair 1877', 6
FROM red_white_who_individuals WHERE name = 'Alexander Graham Bell'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 7 for Alexander Graham Bell
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What major company did Bell found that became AT&T?', 'Bell Telephone Company became AT&T', 'Western Union Telegraph', 'Edison Electric Company', 'American Telegraph Company', 7
FROM red_white_who_individuals WHERE name = 'Alexander Graham Bell'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 8 for Alexander Graham Bell
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Bell experiment with before the Wright Brothers made their famous flight?', 'Flying machines before Wright Brothers', 'Submarines and underwater vessels', 'Automobiles and motorcycles', 'Telegraphs and radios', 8
FROM red_white_who_individuals WHERE name = 'Alexander Graham Bell'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 9 for Alexander Graham Bell
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What society did Bell help found and serve as president?', 'National Geographic Society president', 'The Smithsonian Institution', 'The American Inventors Society', 'The Royal Academy of Science', 9
FROM red_white_who_individuals WHERE name = 'Alexander Graham Bell'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 10 for Alexander Graham Bell
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How was Bell honored at the moment of his burial?', 'All phones silent one minute burial', 'All flags flew at half-staff', 'Church bells rang across America', 'A moment of silence nationwide', 10
FROM red_white_who_individuals WHERE name = 'Alexander Graham Bell'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;


-- Individual: Wright Brothers (Orville & Wilbur)
INSERT INTO red_white_who_individuals (name, birth_year, death_year, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery_1, photo_gallery_2, photo_gallery_3, photo_gallery_4, photo_gallery_5, photo_gallery_6, photo_gallery_7, photo_gallery_8, photo_gallery_9, photo_gallery_10)
VALUES (
  'Wright Brothers (Orville & Wilbur)',
  1867,
  1912,
  ARRAY['Achieved first powered airplane flight at Kitty Hawk, North Carolina'],
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
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50120001200/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50120101201/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50120201202/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50120301203/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50120401204/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50120501205/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50120601206/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50120701207/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50120801208/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50120901209/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50121001210/full/pct:25/0/default.jpg'
)
ON CONFLICT (name) DO UPDATE SET
  birth_year = EXCLUDED.birth_year,
  death_year = EXCLUDED.death_year,
  key_events = EXCLUDED.key_events,
  key_facts = EXCLUDED.key_facts,
  biographical_summary = EXCLUDED.biographical_summary,
  main_photo_url = EXCLUDED.main_photo_url,
  photo_gallery_1 = EXCLUDED.photo_gallery_1,
  photo_gallery_2 = EXCLUDED.photo_gallery_2,
  photo_gallery_3 = EXCLUDED.photo_gallery_3,
  photo_gallery_4 = EXCLUDED.photo_gallery_4,
  photo_gallery_5 = EXCLUDED.photo_gallery_5,
  photo_gallery_6 = EXCLUDED.photo_gallery_6,
  photo_gallery_7 = EXCLUDED.photo_gallery_7,
  photo_gallery_8 = EXCLUDED.photo_gallery_8,
  photo_gallery_9 = EXCLUDED.photo_gallery_9,
  photo_gallery_10 = EXCLUDED.photo_gallery_10,
  updated_at = NOW();

-- Question 1 for Wright Brothers (Orville & Wilbur)
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where did the Wright Brothers grow up?', 'Dayton Ohio Orville 1871 Wilbur 1867', 'Kitty Hawk, North Carolina', 'Chicago, Illinois', 'Cleveland, Ohio', 1
FROM red_white_who_individuals WHERE name = 'Wright Brothers (Orville & Wilbur)'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 2 for Wright Brothers (Orville & Wilbur)
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What toy from their father sparked their interest in flight?', 'Bicycle repair shop owners', 'A model airplane from a catalog', 'A kite their father made', 'A rubber band helicopter', 2
FROM red_white_who_individuals WHERE name = 'Wright Brothers (Orville & Wilbur)'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 3 for Wright Brothers (Orville & Wilbur)
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What business did the Wright Brothers own before building airplanes?', 'Wind tunnel experiments', 'Automobile repair shop', 'Printing shop', 'Hardware store', 3
FROM red_white_who_individuals WHERE name = 'Wright Brothers (Orville & Wilbur)'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 4 for Wright Brothers (Orville & Wilbur)
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What device did the brothers build to test wing designs?', 'Kitty Hawk North Carolina', 'A wind measuring device', 'A propeller testing machine', 'A wind tunnel', 4
FROM red_white_who_individuals WHERE name = 'Wright Brothers (Orville & Wilbur)'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 5 for Wright Brothers (Orville & Wilbur)
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Why did the Wright Brothers choose Kitty Hawk, North Carolina?', '12 seconds first flight', 'The flat terrain and isolation', 'They had family there', 'The government recommended it', 5
FROM red_white_who_individuals WHERE name = 'Wright Brothers (Orville & Wilbur)'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 6 for Wright Brothers (Orville & Wilbur)
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What control system did the Wrights invent to steer their airplane?', 'December 17 1903', 'Rudder and aileron system', 'Wing warping', 'Tail stabilization', 6
FROM red_white_who_individuals WHERE name = 'Wright Brothers (Orville & Wilbur)'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 7 for Wright Brothers (Orville & Wilbur)
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'On what date did the first powered flight take place?', 'Four flights longest 59 seconds', 'December 14, 1903', 'December 21, 1903', 'November 17, 1903', 7
FROM red_white_who_individuals WHERE name = 'Wright Brothers (Orville & Wilbur)'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 8 for Wright Brothers (Orville & Wilbur)
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How long did the first flight last, and how far did it travel?', 'Three-axis control system', '20 seconds, 200 feet', '8 seconds, 80 feet', '30 seconds, 300 feet', 8
FROM red_white_who_individuals WHERE name = 'Wright Brothers (Orville & Wilbur)'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 9 for Wright Brothers (Orville & Wilbur)
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many flights did the Wright Brothers make on December 17, 1903?', 'Wilbur died first 1912', 'Two flights', 'Three flights', 'Six flights', 9
FROM red_white_who_individuals WHERE name = 'Wright Brothers (Orville & Wilbur)'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 10 for Wright Brothers (Orville & Wilbur)
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where is the original Wright Flyer displayed today?', 'Smithsonian Air Space Museum', 'The Henry Ford Museum', 'The National Air and Space Museum', 'The Wright Brothers Museum', 10
FROM red_white_who_individuals WHERE name = 'Wright Brothers (Orville & Wilbur)'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;


-- Individual: Neil Armstrong
INSERT INTO red_white_who_individuals (name, birth_year, death_year, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery_1, photo_gallery_2, photo_gallery_3, photo_gallery_4, photo_gallery_5, photo_gallery_6, photo_gallery_7, photo_gallery_8, photo_gallery_9, photo_gallery_10)
VALUES (
  'Neil Armstrong',
  1930,
  2012,
  ARRAY['First human to walk on the moon'],
  '{"notes":"Born in Wapakoneta, Ohio; Earned pilot's license before driver's license; Navy pilot who flew in Korean War; Became NASA astronaut in 1962; Commanded Apollo 11 mission; First moonwalk: July 20, 1969; Famous quote: That's one small step for man, one giant leap for mankind"}',
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
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10101300/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10101301/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10101302/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10101303/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10101304/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10101305/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10101306/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10101307/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10101308/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10101309/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10101310/full/pct:25/0/default.jpg'
)
ON CONFLICT (name) DO UPDATE SET
  birth_year = EXCLUDED.birth_year,
  death_year = EXCLUDED.death_year,
  key_events = EXCLUDED.key_events,
  key_facts = EXCLUDED.key_facts,
  biographical_summary = EXCLUDED.biographical_summary,
  main_photo_url = EXCLUDED.main_photo_url,
  photo_gallery_1 = EXCLUDED.photo_gallery_1,
  photo_gallery_2 = EXCLUDED.photo_gallery_2,
  photo_gallery_3 = EXCLUDED.photo_gallery_3,
  photo_gallery_4 = EXCLUDED.photo_gallery_4,
  photo_gallery_5 = EXCLUDED.photo_gallery_5,
  photo_gallery_6 = EXCLUDED.photo_gallery_6,
  photo_gallery_7 = EXCLUDED.photo_gallery_7,
  photo_gallery_8 = EXCLUDED.photo_gallery_8,
  photo_gallery_9 = EXCLUDED.photo_gallery_9,
  photo_gallery_10 = EXCLUDED.photo_gallery_10,
  updated_at = NOW();

-- Question 1 for Neil Armstrong
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Neil Armstrong born?', 'Wapakoneta Ohio 1930', 'Cincinnati, Ohio', 'Columbus, Ohio', 'Cleveland, Ohio', 1
FROM red_white_who_individuals WHERE name = 'Neil Armstrong'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 2 for Neil Armstrong
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Armstrong achieve before he could drive a car?', 'Pilot license age 16', 'Eagle Scout badge', 'College degree', 'Pilot''s license', 2
FROM red_white_who_individuals WHERE name = 'Neil Armstrong'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 3 for Neil Armstrong
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many combat missions did Armstrong fly during the Korean War?', 'Korean War Navy pilot', 'About 50 missions', 'About 100 missions', 'About 78 missions', 3
FROM red_white_who_individuals WHERE name = 'Neil Armstrong'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 4 for Neil Armstrong
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What experimental aircraft did Armstrong fly as a test pilot?', 'Test pilot Edwards Air Force', 'The B-52 bomber', 'The X-15 rocket plane', 'The SR-71 Blackbird', 4
FROM red_white_who_individuals WHERE name = 'Neil Armstrong'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 5 for Neil Armstrong
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What emergency did Armstrong handle on the Gemini 8 mission?', 'Apollo 11 commander', 'Engine failure requiring abort', 'Stuck docking mechanism', 'Spacecraft spinning out of control', 5
FROM red_white_who_individuals WHERE name = 'Neil Armstrong'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 6 for Neil Armstrong
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was the name of the Apollo 11 lunar module?', 'July 20 1969', 'Columbia', 'Eagle', 'Challenger', 6
FROM red_white_who_individuals WHERE name = 'Neil Armstrong'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 7 for Neil Armstrong
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'On what date did Armstrong first walk on the moon?', 'One small step mankind', 'July 16, 1969', 'July 24, 1969', 'August 20, 1969', 7
FROM red_white_who_individuals WHERE name = 'Neil Armstrong'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 8 for Neil Armstrong
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What famous words did Armstrong say as he stepped onto the moon?', 'Buzz Aldrin lunar companion', 'This is history in the making', 'Houston, we''ve landed', 'Mission accomplished for mankind', 8
FROM red_white_who_individuals WHERE name = 'Neil Armstrong'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 9 for Neil Armstrong
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'About how many people worldwide watched the moon landing on television?', '21 hours 36 minutes moon', 'About 100 million', 'About 600 million', 'About 1 billion', 9
FROM red_white_who_individuals WHERE name = 'Neil Armstrong'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 10 for Neil Armstrong
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How long did Armstrong and Aldrin spend on the moon''s surface?', 'University Cincinnati professor', 'About 8 hours', 'About 2 days', 'About 12 hours', 10
FROM red_white_who_individuals WHERE name = 'Neil Armstrong'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;


-- Individual: Jackie Robinson
INSERT INTO red_white_who_individuals (name, birth_year, death_year, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery_1, photo_gallery_2, photo_gallery_3, photo_gallery_4, photo_gallery_5, photo_gallery_6, photo_gallery_7, photo_gallery_8, photo_gallery_9, photo_gallery_10)
VALUES (
  'Jackie Robinson',
  1919,
  1972,
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
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20101400/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20101401/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20101402/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20101403/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20101404/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20101405/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20101406/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20101407/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20101408/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20101409/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20101410/full/pct:25/0/default.jpg'
)
ON CONFLICT (name) DO UPDATE SET
  birth_year = EXCLUDED.birth_year,
  death_year = EXCLUDED.death_year,
  key_events = EXCLUDED.key_events,
  key_facts = EXCLUDED.key_facts,
  biographical_summary = EXCLUDED.biographical_summary,
  main_photo_url = EXCLUDED.main_photo_url,
  photo_gallery_1 = EXCLUDED.photo_gallery_1,
  photo_gallery_2 = EXCLUDED.photo_gallery_2,
  photo_gallery_3 = EXCLUDED.photo_gallery_3,
  photo_gallery_4 = EXCLUDED.photo_gallery_4,
  photo_gallery_5 = EXCLUDED.photo_gallery_5,
  photo_gallery_6 = EXCLUDED.photo_gallery_6,
  photo_gallery_7 = EXCLUDED.photo_gallery_7,
  photo_gallery_8 = EXCLUDED.photo_gallery_8,
  photo_gallery_9 = EXCLUDED.photo_gallery_9,
  photo_gallery_10 = EXCLUDED.photo_gallery_10,
  updated_at = NOW();

-- Question 1 for Jackie Robinson
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Jackie Robinson born?', 'Cairo Georgia 1919', 'Los Angeles, California', 'Brooklyn, New York', 'Atlanta, Georgia', 1
FROM red_white_who_individuals WHERE name = 'Jackie Robinson'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 2 for Jackie Robinson
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many sports did Jackie Robinson earn letters in at UCLA?', 'UCLA four-sport athlete', 'Two sports', 'Three sports', 'One sport', 2
FROM red_white_who_individuals WHERE name = 'Jackie Robinson'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 3 for Jackie Robinson
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What rank did Jackie Robinson hold in the U.S. Army?', 'Kansas City Monarchs Negro League', 'Captain', 'Sergeant', 'Colonel', 3
FROM red_white_who_individuals WHERE name = 'Jackie Robinson'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 4 for Jackie Robinson
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What team did Jackie Robinson play for in the Negro Leagues?', 'Brooklyn Dodgers 1947', 'Birmingham Black Barons', 'Indianapolis Clowns', 'Newark Eagles', 4
FROM red_white_who_individuals WHERE name = 'Jackie Robinson'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 5 for Jackie Robinson
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who was the Brooklyn Dodgers president who recruited Jackie Robinson?', 'April 15 1947 debut', 'Leo Durocher', 'Happy Chandler', 'Pee Wee Reese', 5
FROM red_white_who_individuals WHERE name = 'Jackie Robinson'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 6 for Jackie Robinson
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'On what date did Jackie break Major League Baseball''s color barrier?', 'Number 42 jersey', 'April 9, 1947', 'May 1, 1947', 'March 15, 1947', 6
FROM red_white_who_individuals WHERE name = 'Jackie Robinson'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 7 for Jackie Robinson
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What award did Jackie Robinson win in his first season?', 'Branch Rickey Dodgers executive', 'Most Valuable Player', 'Gold Glove Award', 'Rookie of the Year', 7
FROM red_white_who_individuals WHERE name = 'Jackie Robinson'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 8 for Jackie Robinson
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What award did Jackie Robinson win in 1949?', 'Rookie of Year 1947', 'World Series MVP', 'Batting Champion', 'MVP Award', 8
FROM red_white_who_individuals WHERE name = 'Jackie Robinson'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 9 for Jackie Robinson
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What special honor did MLB give Jackie Robinson''s number 42?', 'Hall of Fame 1962', 'His number was retired by the Dodgers', 'His number was retired by all MLB teams', 'His number was given to future stars', 9
FROM red_white_who_individuals WHERE name = 'Jackie Robinson'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 10 for Jackie Robinson
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What date each year do MLB players wear number 42?', 'Number 42 retired all teams', 'Opening Day every year', 'April 15 every year', 'His birthday, January 31', 10
FROM red_white_who_individuals WHERE name = 'Jackie Robinson'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;


-- Individual: Amelia Earhart
INSERT INTO red_white_who_individuals (name, birth_year, death_year, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery_1, photo_gallery_2, photo_gallery_3, photo_gallery_4, photo_gallery_5, photo_gallery_6, photo_gallery_7, photo_gallery_8, photo_gallery_9, photo_gallery_10)
VALUES (
  'Amelia Earhart',
  1897,
  1937,
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
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50150001500/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50150101501/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50150201502/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50150301503/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50150401504/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50150501505/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50150601506/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50150701507/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50150801508/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50150901509/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50151001510/full/pct:25/0/default.jpg'
)
ON CONFLICT (name) DO UPDATE SET
  birth_year = EXCLUDED.birth_year,
  death_year = EXCLUDED.death_year,
  key_events = EXCLUDED.key_events,
  key_facts = EXCLUDED.key_facts,
  biographical_summary = EXCLUDED.biographical_summary,
  main_photo_url = EXCLUDED.main_photo_url,
  photo_gallery_1 = EXCLUDED.photo_gallery_1,
  photo_gallery_2 = EXCLUDED.photo_gallery_2,
  photo_gallery_3 = EXCLUDED.photo_gallery_3,
  photo_gallery_4 = EXCLUDED.photo_gallery_4,
  photo_gallery_5 = EXCLUDED.photo_gallery_5,
  photo_gallery_6 = EXCLUDED.photo_gallery_6,
  photo_gallery_7 = EXCLUDED.photo_gallery_7,
  photo_gallery_8 = EXCLUDED.photo_gallery_8,
  photo_gallery_9 = EXCLUDED.photo_gallery_9,
  photo_gallery_10 = EXCLUDED.photo_gallery_10,
  updated_at = NOW();

-- Question 1 for Amelia Earhart
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where and when was Amelia Earhart born?', 'Atchison Kansas 1897', 'Kansas City, Missouri 1899', 'Wichita, Kansas 1895', 'Des Moines, Iowa 1897', 1
FROM red_white_who_individuals WHERE name = 'Amelia Earhart'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 2 for Amelia Earhart
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What experience in 1920 made Amelia decide she had to fly?', 'Yellow airplane Canary', 'Reading about Charles Lindbergh', 'Taking a flying lesson', 'Watching a stunt-flying show', 2
FROM red_white_who_individuals WHERE name = 'Amelia Earhart'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 3 for Amelia Earhart
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Amelia call her first plane?', 'First woman solo Atlantic', 'The Spirit', 'The Yellow Bird', 'The Canary', 3
FROM red_white_who_individuals WHERE name = 'Amelia Earhart'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 4 for Amelia Earhart
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'In what year did Amelia become the first woman to fly solo across the Atlantic?', '1932 transatlantic flight', '1930', '1928', '1935', 4
FROM red_white_who_individuals WHERE name = 'Amelia Earhart'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 5 for Amelia Earhart
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where did Amelia land after her solo Atlantic crossing?', 'Around world flight attempt', 'Paris, France', 'London, England', 'Northern Ireland', 5
FROM red_white_who_individuals WHERE name = 'Amelia Earhart'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 6 for Amelia Earhart
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What honor was Amelia the first woman to receive from Congress?', 'Disappeared Pacific Howland Island', 'Medal of Freedom', 'Distinguished Flying Cross', 'Congressional Medal of Honor', 6
FROM red_white_who_individuals WHERE name = 'Amelia Earhart'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 7 for Amelia Earhart
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Amelia attempting when she disappeared in 1937?', 'July 2 1937 last radio', 'A cross-country American flight', 'An around-the-world flight', 'A Pacific Ocean crossing', 7
FROM red_white_who_individuals WHERE name = 'Amelia Earhart'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 8 for Amelia Earhart
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who was Amelia''s navigator on her final flight?', 'Navigator Fred Noonan', 'Harry Manning', 'Paul Mantz', 'George Putnam', 8
FROM red_white_who_individuals WHERE name = 'Amelia Earhart'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 9 for Amelia Earhart
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What tiny island was Amelia trying to reach when she disappeared?', 'Purdue University funding', 'Wake Island', 'Midway Island', 'Howland Island', 9
FROM red_white_who_individuals WHERE name = 'Amelia Earhart'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 10 for Amelia Earhart
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Amelia say about women trying things in her last letter?', 'Women aviation career inspiration', 'Women must keep trying', 'Success is never final', 'Adventure is worthwhile', 10
FROM red_white_who_individuals WHERE name = 'Amelia Earhart'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;


-- Individual: Ulysses S. Grant
INSERT INTO red_white_who_individuals (name, birth_year, death_year, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery_1, photo_gallery_2, photo_gallery_3, photo_gallery_4, photo_gallery_5, photo_gallery_6, photo_gallery_7, photo_gallery_8, photo_gallery_9, photo_gallery_10)
VALUES (
  'Ulysses S. Grant',
  1822,
  1885,
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
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50160001600/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50160101601/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50160201602/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50160301603/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50160401604/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50160501605/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50160601606/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50160701607/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50160801608/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50160901609/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50161001610/full/pct:25/0/default.jpg'
)
ON CONFLICT (name) DO UPDATE SET
  birth_year = EXCLUDED.birth_year,
  death_year = EXCLUDED.death_year,
  key_events = EXCLUDED.key_events,
  key_facts = EXCLUDED.key_facts,
  biographical_summary = EXCLUDED.biographical_summary,
  main_photo_url = EXCLUDED.main_photo_url,
  photo_gallery_1 = EXCLUDED.photo_gallery_1,
  photo_gallery_2 = EXCLUDED.photo_gallery_2,
  photo_gallery_3 = EXCLUDED.photo_gallery_3,
  photo_gallery_4 = EXCLUDED.photo_gallery_4,
  photo_gallery_5 = EXCLUDED.photo_gallery_5,
  photo_gallery_6 = EXCLUDED.photo_gallery_6,
  photo_gallery_7 = EXCLUDED.photo_gallery_7,
  photo_gallery_8 = EXCLUDED.photo_gallery_8,
  photo_gallery_9 = EXCLUDED.photo_gallery_9,
  photo_gallery_10 = EXCLUDED.photo_gallery_10,
  updated_at = NOW();

-- Question 1 for Ulysses S. Grant
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Ulysses S. Grant born?', 'Point Pleasant Ohio 1822', 'Cincinnati, Ohio 1820', 'Cleveland, Ohio 1824', 'Dayton, Ohio 1822', 1
FROM red_white_who_individuals WHERE name = 'Ulysses S. Grant'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 2 for Ulysses S. Grant
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was special about Grant''s abilities with horses?', 'West Point Military Academy', 'Exceptional skill with weapons', 'Outstanding leadership ability', 'Remarkable horsemanship', 2
FROM red_white_who_individuals WHERE name = 'Ulysses S. Grant'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 3 for Ulysses S. Grant
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What nickname did Grant earn from his demand at Fort Donelson?', 'Mexican-American War service', 'Fighting Grant', 'Bulldog Grant', 'Unconditional Surrender Grant', 3
FROM red_white_who_individuals WHERE name = 'Ulysses S. Grant'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 4 for Ulysses S. Grant
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What important victory did Grant win on July 4, 1863?', 'Vicksburg siege victory', 'Battle of Shiloh', 'Battle of Gettysburg', 'Battle of Antietam', 4
FROM red_white_who_individuals WHERE name = 'Ulysses S. Grant'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 5 for Ulysses S. Grant
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What rank did Lincoln give Grant in March 1864?', 'General-in-Chief Union armies', 'Major General', 'Lieutenant General and General-in-Chief', 'Brigadier General', 5
FROM red_white_who_individuals WHERE name = 'Ulysses S. Grant'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 6 for Ulysses S. Grant
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where did Confederate General Lee surrender to Grant?', 'Appomattox Court House surrender', 'Richmond, Virginia', 'Gettysburg, Pennsylvania', 'Washington, D.C.', 6
FROM red_white_who_individuals WHERE name = 'Ulysses S. Grant'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 7 for Ulysses S. Grant
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How did Grant treat the defeated Confederate soldiers?', '18th President 1869-1877', 'Made them prisoners of war', 'Required them to swear loyalty oaths', 'Let them go home with their horses', 7
FROM red_white_who_individuals WHERE name = 'Ulysses S. Grant'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 8 for Ulysses S. Grant
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What amendment did Grant support that gave Black men the right to vote?', 'Reconstruction era challenges', 'Fourteenth Amendment', 'Thirteenth Amendment', 'Sixteenth Amendment', 8
FROM red_white_who_individuals WHERE name = 'Ulysses S. Grant'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 9 for Ulysses S. Grant
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What group did Grant send federal troops to fight?', 'Personal Memoirs bestseller', 'Confederate sympathizers', 'The Ku Klux Klan', 'State militias', 9
FROM red_white_who_individuals WHERE name = 'Ulysses S. Grant'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 10 for Ulysses S. Grant
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What famous book did Grant write while dying of cancer?', 'Fifty-dollar bill portrait', 'Autobiography of a Soldier', 'My Life and Times', 'Personal Memoirs', 10
FROM red_white_who_individuals WHERE name = 'Ulysses S. Grant'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;


-- Individual: Susan B. Anthony
INSERT INTO red_white_who_individuals (name, birth_year, death_year, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery_1, photo_gallery_2, photo_gallery_3, photo_gallery_4, photo_gallery_5, photo_gallery_6, photo_gallery_7, photo_gallery_8, photo_gallery_9, photo_gallery_10)
VALUES (
  'Susan B. Anthony',
  1820,
  1906,
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
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50170001700/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50170101701/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50170201702/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50170301703/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50170401704/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50170501705/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50170601706/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50170701707/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50170801708/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50170901709/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50171001710/full/pct:25/0/default.jpg'
)
ON CONFLICT (name) DO UPDATE SET
  birth_year = EXCLUDED.birth_year,
  death_year = EXCLUDED.death_year,
  key_events = EXCLUDED.key_events,
  key_facts = EXCLUDED.key_facts,
  biographical_summary = EXCLUDED.biographical_summary,
  main_photo_url = EXCLUDED.main_photo_url,
  photo_gallery_1 = EXCLUDED.photo_gallery_1,
  photo_gallery_2 = EXCLUDED.photo_gallery_2,
  photo_gallery_3 = EXCLUDED.photo_gallery_3,
  photo_gallery_4 = EXCLUDED.photo_gallery_4,
  photo_gallery_5 = EXCLUDED.photo_gallery_5,
  photo_gallery_6 = EXCLUDED.photo_gallery_6,
  photo_gallery_7 = EXCLUDED.photo_gallery_7,
  photo_gallery_8 = EXCLUDED.photo_gallery_8,
  photo_gallery_9 = EXCLUDED.photo_gallery_9,
  photo_gallery_10 = EXCLUDED.photo_gallery_10,
  updated_at = NOW();

-- Question 1 for Susan B. Anthony
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Susan B. Anthony born, and what religious background did her family have?', 'Adams Massachusetts 1820', 'Rochester, New York with Baptist roots', 'Boston, Massachusetts with Puritan roots', 'Philadelphia, Pennsylvania with Methodist roots', 1
FROM red_white_who_individuals WHERE name = 'Susan B. Anthony'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 2 for Susan B. Anthony
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What injustice as a teacher first opened Susan''s eyes to inequality?', 'Quaker family equality beliefs', 'Women couldn''t vote', 'Women couldn''t own property', 'Women earned less than men', 2
FROM red_white_who_individuals WHERE name = 'Susan B. Anthony'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 3 for Susan B. Anthony
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who was Susan''s lifelong friend and partner in the women''s rights movement?', 'School teacher early career', 'Harriet Tubman', 'Sojourner Truth', 'Elizabeth Cady Stanton', 3
FROM red_white_who_individuals WHERE name = 'Susan B. Anthony'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 4 for Susan B. Anthony
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'About how many speeches did Susan give per year for 45 years?', 'Women''s suffrage voting rights', 'About 50 speeches per year', 'About 200 speeches per year', 'About 25 speeches per year', 4
FROM red_white_who_individuals WHERE name = 'Susan B. Anthony'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 5 for Susan B. Anthony
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What organization did Susan and Elizabeth found in 1869?', 'Voted illegally 1872 election', 'American Equal Rights Association', 'Women''s Christian Temperance Union', 'National American Woman Suffrage Association', 5
FROM red_white_who_individuals WHERE name = 'Susan B. Anthony'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 6 for Susan B. Anthony
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Susan do illegally in 1872, and what happened to her?', 'Refused pay 100 dollar fine', 'She protested at polling places and was fined', 'She voted illegally and was arrested', 'She registered as a man and was caught', 6
FROM red_white_who_individuals WHERE name = 'Susan B. Anthony'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 7 for Susan B. Anthony
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Susan''s famous response when asked if women would win the vote?', 'National Woman Suffrage Association', 'Maybe not in my lifetime', 'Certainly within ten years', 'Failure is impossible', 7
FROM red_white_who_individuals WHERE name = 'Susan B. Anthony'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 8 for Susan B. Anthony
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many years after Susan''s death did women gain the right to vote?', '19th Amendment 1920', '10 years', '20 years', '5 years', 8
FROM red_white_who_individuals WHERE name = 'Susan B. Anthony'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 9 for Susan B. Anthony
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What constitutional amendment gave women the right to vote?', 'Susan B Anthony dollar coin', 'Eighteenth Amendment', 'Twenty-first Amendment', 'Fifteenth Amendment', 9
FROM red_white_who_individuals WHERE name = 'Susan B. Anthony'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 10 for Susan B. Anthony
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What piece of money features Susan B. Anthony''s image?', 'Died Rochester New York', 'The quarter', 'The dime', 'The dollar coin', 10
FROM red_white_who_individuals WHERE name = 'Susan B. Anthony'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;


-- Individual: Clara Barton
INSERT INTO red_white_who_individuals (name, birth_year, death_year, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery_1, photo_gallery_2, photo_gallery_3, photo_gallery_4, photo_gallery_5, photo_gallery_6, photo_gallery_7, photo_gallery_8, photo_gallery_9, photo_gallery_10)
VALUES (
  'Clara Barton',
  1821,
  1912,
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
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10101800/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10101801/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10101802/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10101803/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10101804/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10101805/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10101806/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10101807/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10101808/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10101809/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10101810/full/pct:25/0/default.jpg'
)
ON CONFLICT (name) DO UPDATE SET
  birth_year = EXCLUDED.birth_year,
  death_year = EXCLUDED.death_year,
  key_events = EXCLUDED.key_events,
  key_facts = EXCLUDED.key_facts,
  biographical_summary = EXCLUDED.biographical_summary,
  main_photo_url = EXCLUDED.main_photo_url,
  photo_gallery_1 = EXCLUDED.photo_gallery_1,
  photo_gallery_2 = EXCLUDED.photo_gallery_2,
  photo_gallery_3 = EXCLUDED.photo_gallery_3,
  photo_gallery_4 = EXCLUDED.photo_gallery_4,
  photo_gallery_5 = EXCLUDED.photo_gallery_5,
  photo_gallery_6 = EXCLUDED.photo_gallery_6,
  photo_gallery_7 = EXCLUDED.photo_gallery_7,
  photo_gallery_8 = EXCLUDED.photo_gallery_8,
  photo_gallery_9 = EXCLUDED.photo_gallery_9,
  photo_gallery_10 = EXCLUDED.photo_gallery_10,
  updated_at = NOW();

-- Question 1 for Clara Barton
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where and when was Clara Barton born?', 'Oxford Massachusetts 1821', 'Boston, Massachusetts 1825', 'Worcester, Massachusetts 1819', 'Springfield, Massachusetts 1823', 1
FROM red_white_who_individuals WHERE name = 'Clara Barton'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 2 for Clara Barton
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What experience at age eleven inspired Clara''s desire to help others?', 'Teacher Patent Office clerk', 'Caring for wounded soldiers', 'Helping her sick mother', 'Nursing her injured brother', 2
FROM red_white_who_individuals WHERE name = 'Clara Barton'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 3 for Clara Barton
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was unusual about Clara''s salary at the U.S. Patent Office?', 'Civil War battlefield nurse', 'She earned half the salary of men', 'She was not allowed to work', 'She earned the same salary as men', 3
FROM red_white_who_individuals WHERE name = 'Clara Barton'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 4 for Clara Barton
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What nickname did soldiers give Clara Barton?', 'American Red Cross founder', 'Florence of America', 'Lady with the Lamp', 'Battlefield Angel', 4
FROM red_white_who_individuals WHERE name = 'Clara Barton'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 5 for Clara Barton
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What famous battle site did Clara help at, where a bullet passed through her sleeve?', 'Angel of Battlefield nickname', 'Gettysburg', 'Bull Run', 'Antietam', 5
FROM red_white_who_individuals WHERE name = 'Clara Barton'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 6 for Clara Barton
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What work did Clara do at Andersonville prison after the war?', 'Missing Soldiers Office created', 'Helped nurse wounded prisoners', 'Identified missing and dead soldiers', 'Distributed supplies to survivors', 6
FROM red_white_who_individuals WHERE name = 'Clara Barton'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 7 for Clara Barton
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'In what year did Clara found the American Red Cross?', 'Franco-Prussian War relief', '1875', '1885', '1891', 7
FROM red_white_who_individuals WHERE name = 'Clara Barton'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 8 for Clara Barton
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How long did Clara serve as president of the American Red Cross?', 'First Red Cross president', 'About 10 years', 'About 23 years', 'About 15 years', 8
FROM red_white_who_individuals WHERE name = 'Clara Barton'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 9 for Clara Barton
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How old was Clara when she still traveled to disaster sites?', 'Died Glen Echo Maryland', 'About 70 years old', 'About 65 years old', 'About 79 years old', 9
FROM red_white_who_individuals WHERE name = 'Clara Barton'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 10 for Clara Barton
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What organization continues Clara Barton''s mission today?', 'Nursing humanitarian legacy', 'The Red Cross', 'The American Red Cross', 'The International Nurses Association', 10
FROM red_white_who_individuals WHERE name = 'Clara Barton'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;


-- Individual: John Adams
INSERT INTO red_white_who_individuals (name, birth_year, death_year, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery_1, photo_gallery_2, photo_gallery_3, photo_gallery_4, photo_gallery_5, photo_gallery_6, photo_gallery_7, photo_gallery_8, photo_gallery_9, photo_gallery_10)
VALUES (
  'John Adams',
  1735,
  1826,
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
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20101900/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20101901/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20101902/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20101903/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20101904/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20101905/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20101906/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20101907/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20101908/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20101909/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20101910/full/pct:25/0/default.jpg'
)
ON CONFLICT (name) DO UPDATE SET
  birth_year = EXCLUDED.birth_year,
  death_year = EXCLUDED.death_year,
  key_events = EXCLUDED.key_events,
  key_facts = EXCLUDED.key_facts,
  biographical_summary = EXCLUDED.biographical_summary,
  main_photo_url = EXCLUDED.main_photo_url,
  photo_gallery_1 = EXCLUDED.photo_gallery_1,
  photo_gallery_2 = EXCLUDED.photo_gallery_2,
  photo_gallery_3 = EXCLUDED.photo_gallery_3,
  photo_gallery_4 = EXCLUDED.photo_gallery_4,
  photo_gallery_5 = EXCLUDED.photo_gallery_5,
  photo_gallery_6 = EXCLUDED.photo_gallery_6,
  photo_gallery_7 = EXCLUDED.photo_gallery_7,
  photo_gallery_8 = EXCLUDED.photo_gallery_8,
  photo_gallery_9 = EXCLUDED.photo_gallery_9,
  photo_gallery_10 = EXCLUDED.photo_gallery_10,
  updated_at = NOW();

-- Question 1 for John Adams
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'In what Massachusetts town was John Adams born?', 'Braintree Massachusetts 1735', 'Boston, Massachusetts', 'Quincy, Massachusetts', 'Plymouth, Massachusetts', 1
FROM red_white_who_individuals WHERE name = 'John Adams'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 2 for John Adams
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What profession did Adams pursue after graduating from Harvard?', 'Harvard College education', 'Minister', 'Merchant', 'Lawyer', 2
FROM red_white_who_individuals WHERE name = 'John Adams'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 3 for John Adams
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What unpopular action did Adams take after the Boston Massacre?', 'Boston Massacre defense lawyer', 'He refused to represent them', 'He prosecuted them', 'He defended the British soldiers', 3
FROM red_white_who_individuals WHERE name = 'John Adams'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 4 for John Adams
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who was John Adams''s wife, known for her influential letters?', 'Continental Congress delegate', 'Martha Washington', 'Dolley Madison', 'Abigail Adams', 4
FROM red_white_who_individuals WHERE name = 'John Adams'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 5 for John Adams
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'According to Thomas Jefferson, what role did Adams play in Congress?', 'Declaration Independence committee', 'He was the voice of independence', 'He was the best writer', 'He was the oldest delegate', 5
FROM red_white_who_individuals WHERE name = 'John Adams'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 6 for John Adams
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What position did Adams hold under President Washington?', 'Ambassador Great Britain Netherlands', 'Secretary of State', 'Secretary of War', 'First Vice President', 6
FROM red_white_who_individuals WHERE name = 'John Adams'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 7 for John Adams
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Adams''s greatest achievement as president regarding France?', 'First Vice President Washington', 'Avoided war with France', 'Signed a treaty with France', 'Declared war on France', 7
FROM red_white_who_individuals WHERE name = 'John Adams'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 8 for John Adams
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'On what historic date did John Adams die in 1826?', 'Second President 1797-1801', 'July 4, 1826', 'July 4, 1824', 'July 2, 1826', 8
FROM red_white_who_individuals WHERE name = 'John Adams'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 9 for John Adams
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What were reportedly Adams''s last words?', 'Federalist Party leader', 'Jefferson still survives', 'Liberty forever', 'The country is safe', 9
FROM red_white_who_individuals WHERE name = 'John Adams'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 10 for John Adams
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was ironic about Adams''s last words?', 'Died July 4 1826 same day Jefferson', 'Jefferson had actually died hours earlier', 'Jefferson was with him', 'Jefferson sent a letter that day', 10
FROM red_white_who_individuals WHERE name = 'John Adams'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;


-- Individual: Alexander Hamilton
INSERT INTO red_white_who_individuals (name, birth_year, death_year, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery_1, photo_gallery_2, photo_gallery_3, photo_gallery_4, photo_gallery_5, photo_gallery_6, photo_gallery_7, photo_gallery_8, photo_gallery_9, photo_gallery_10)
VALUES (
  'Alexander Hamilton',
  NULL,
  NULL,
  ARRAY['First Secretary of the Treasury who established American financial system'],
  '{"notes":"Born in the Caribbean; Washington's chief aide during Revolution; Primary author of Federalist Papers; First Secretary of the Treasury; Founded national bank; Killed in duel with Aaron Burr in 1804"}',
  'Alexander Hamilton''s life is one of America''s greatest stories. An orphan from the Caribbean, he became one of the most important Founding Fathers. He created America''s financial system.

Hamilton was born in 1755 or 1757 on the island of Nevis in the Caribbean. His father abandoned the family, and his mother died when Alexander was about eleven. Young Alexander was alone in the world.

What saved Hamilton was his extraordinary intelligence. Working as a clerk for a trading company, he impressed local businessmen who raised funds to send him to America for education. He arrived in New York in 1772 and enrolled at King''s College (now Columbia University).

When the Revolutionary War began, Hamilton joined the fight. He commanded an artillery company before catching George Washington''s attention. He became Washington''s chief aide-de-camp. For four years, Hamilton was Washington''s most trusted assistant. He finally got his battlefield command at Yorktown in 1781, leading a successful assault on British defenses.

After the war, Hamilton became a leading lawyer and a powerful voice for stronger national government. Along with James Madison and John Jay, Hamilton wrote the Federalist Papers, eighty-five essays defending the Constitution. Hamilton wrote fifty-one himself!

President Washington appointed Hamilton as the first Secretary of the Treasury in 1789. Hamilton created America''s financial system. He proposed that the federal government assume state debts from the Revolution. He created the First Bank of the United States.

Hamilton''s ideas were controversial. Thomas Jefferson and James Madison opposed many of his plans. This rivalry created America''s first political parties.

Hamilton''s life ended in tragedy. After years of political rivalry with Aaron Burr, the two men fought a duel on July 11, 1804. Burr''s shot struck Hamilton, who died the following day.

Hamilton''s face appears on the ten-dollar bill. The Broadway musical "Hamilton" has made him famous to a new generation. He showed that in America, where you come from matters less than what you can contribute.',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50200002000/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50200102001/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50200202002/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50200302003/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50200402004/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50200502005/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50200602006/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50200702007/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50200802008/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50200902009/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50201002010/full/pct:25/0/default.jpg'
)
ON CONFLICT (name) DO UPDATE SET
  birth_year = EXCLUDED.birth_year,
  death_year = EXCLUDED.death_year,
  key_events = EXCLUDED.key_events,
  key_facts = EXCLUDED.key_facts,
  biographical_summary = EXCLUDED.biographical_summary,
  main_photo_url = EXCLUDED.main_photo_url,
  photo_gallery_1 = EXCLUDED.photo_gallery_1,
  photo_gallery_2 = EXCLUDED.photo_gallery_2,
  photo_gallery_3 = EXCLUDED.photo_gallery_3,
  photo_gallery_4 = EXCLUDED.photo_gallery_4,
  photo_gallery_5 = EXCLUDED.photo_gallery_5,
  photo_gallery_6 = EXCLUDED.photo_gallery_6,
  photo_gallery_7 = EXCLUDED.photo_gallery_7,
  photo_gallery_8 = EXCLUDED.photo_gallery_8,
  photo_gallery_9 = EXCLUDED.photo_gallery_9,
  photo_gallery_10 = EXCLUDED.photo_gallery_10,
  updated_at = NOW();

-- Question 1 for Alexander Hamilton
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Alexander Hamilton born?', 'Nevis British West Indies 1755', 'Jamaica in the Caribbean', 'Cuba in the Caribbean', 'Barbados in the Caribbean', 1
FROM red_white_who_individuals WHERE name = 'Alexander Hamilton'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 2 for Alexander Hamilton
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What important position did Hamilton hold on Washington''s staff?', 'Orphaned came America teenager', 'Secretary to Washington', 'Personal aide-de-camp to Washington', 'Messenger for Washington', 2
FROM red_white_who_individuals WHERE name = 'Alexander Hamilton'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 3 for Alexander Hamilton
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'At which battle did Hamilton lead an assault on British defenses?', 'King''s College Columbia University', 'Battle of Bunker Hill', 'Battle of Saratoga', 'Battle of Yorktown', 3
FROM red_white_who_individuals WHERE name = 'Alexander Hamilton'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 4 for Alexander Hamilton
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What series of essays did Hamilton write with Madison and Jay?', 'Continental Army aide Washington', 'The Constitution', 'The Bill of Rights', 'The Articles of Confederation', 4
FROM red_white_who_individuals WHERE name = 'Alexander Hamilton'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 5 for Alexander Hamilton
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many of the Federalist Papers did Hamilton write?', 'Federalist Papers co-author', 'About 30 papers', 'About 80 papers', 'About 51 papers', 5
FROM red_white_who_individuals WHERE name = 'Alexander Hamilton'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 6 for Alexander Hamilton
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What position did Hamilton hold in Washington''s Cabinet?', 'First Secretary Treasury', 'Secretary of State', 'Secretary of War', 'Attorney General', 6
FROM red_white_who_individuals WHERE name = 'Alexander Hamilton'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 7 for Alexander Hamilton
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What financial institution did Hamilton create?', 'National Bank creator', 'Federal Reserve System', 'First Bank of the United States', 'Treasury Department', 7
FROM red_white_who_individuals WHERE name = 'Alexander Hamilton'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 8 for Alexander Hamilton
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who was Hamilton''s chief political rival from Virginia?', 'Federalist Party founder', 'John Adams', 'Thomas Jefferson', 'James Madison', 8
FROM red_white_who_individuals WHERE name = 'Alexander Hamilton'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 9 for Alexander Hamilton
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who killed Hamilton in a duel in 1804?', 'Duel Aaron Burr 1804', 'Thomas Jefferson', 'James Monroe', 'Aaron Burr', 9
FROM red_white_who_individuals WHERE name = 'Alexander Hamilton'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 10 for Alexander Hamilton
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What piece of money has Hamilton''s face on it?', 'Ten-dollar bill portrait', 'Twenty-dollar bill', 'Five-dollar bill', 'Fifty-dollar bill', 10
FROM red_white_who_individuals WHERE name = 'Alexander Hamilton'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;


-- Individual: Franklin D. Roosevelt
INSERT INTO red_white_who_individuals (name, birth_year, death_year, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery_1, photo_gallery_2, photo_gallery_3, photo_gallery_4, photo_gallery_5, photo_gallery_6, photo_gallery_7, photo_gallery_8, photo_gallery_9, photo_gallery_10)
VALUES (
  'Franklin D. Roosevelt',
  1882,
  1945,
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
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50210002100/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50210102101/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50210202102/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50210302103/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50210402104/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50210502105/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50210602106/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50210702107/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50210802108/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50210902109/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50211002110/full/pct:25/0/default.jpg'
)
ON CONFLICT (name) DO UPDATE SET
  birth_year = EXCLUDED.birth_year,
  death_year = EXCLUDED.death_year,
  key_events = EXCLUDED.key_events,
  key_facts = EXCLUDED.key_facts,
  biographical_summary = EXCLUDED.biographical_summary,
  main_photo_url = EXCLUDED.main_photo_url,
  photo_gallery_1 = EXCLUDED.photo_gallery_1,
  photo_gallery_2 = EXCLUDED.photo_gallery_2,
  photo_gallery_3 = EXCLUDED.photo_gallery_3,
  photo_gallery_4 = EXCLUDED.photo_gallery_4,
  photo_gallery_5 = EXCLUDED.photo_gallery_5,
  photo_gallery_6 = EXCLUDED.photo_gallery_6,
  photo_gallery_7 = EXCLUDED.photo_gallery_7,
  photo_gallery_8 = EXCLUDED.photo_gallery_8,
  photo_gallery_9 = EXCLUDED.photo_gallery_9,
  photo_gallery_10 = EXCLUDED.photo_gallery_10,
  updated_at = NOW();

-- Question 1 for Franklin D. Roosevelt
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Franklin D. Roosevelt born?', 'Hyde Park New York 1882', 'Albany, New York', 'Manhattan, New York', 'Oyster Bay, New York', 1
FROM red_white_who_individuals WHERE name = 'Franklin D. Roosevelt'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 2 for Franklin D. Roosevelt
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who was FDR''s wife?', 'Polio paralyzed legs 1921', 'Anna Roosevelt', 'Sarah Roosevelt', 'Eleanor Roosevelt', 2
FROM red_white_who_individuals WHERE name = 'Franklin D. Roosevelt'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 3 for Franklin D. Roosevelt
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What disease struck Roosevelt in 1921?', 'New York Governor 1929-1932', 'Tuberculosis', 'Polio', 'Multiple sclerosis', 3
FROM red_white_who_individuals WHERE name = 'Franklin D. Roosevelt'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 4 for Franklin D. Roosevelt
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was the name of FDR''s program to combat the Depression?', 'Four terms president only', 'The Fair Deal', 'The Square Deal', 'The Great Society', 4
FROM red_white_who_individuals WHERE name = 'Franklin D. Roosevelt'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 5 for Franklin D. Roosevelt
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What were FDR''s radio addresses called?', 'Great Depression New Deal', 'Radio addresses', 'Fireside Chats', 'Presidential broadcasts', 5
FROM red_white_who_individuals WHERE name = 'Franklin D. Roosevelt'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 6 for Franklin D. Roosevelt
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many times was Roosevelt elected president?', 'World War II leader', 'Three times', 'Two times', 'Four times', 6
FROM red_white_who_individuals WHERE name = 'Franklin D. Roosevelt'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 7 for Franklin D. Roosevelt
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What program provided retirement insurance?', 'Fireside chats radio', 'Medicare', 'Social Security', 'Welfare system', 7
FROM red_white_who_individuals WHERE name = 'Franklin D. Roosevelt'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 8 for Franklin D. Roosevelt
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was the date of Pearl Harbor?', 'Social Security Act', 'December 7, 1941', 'December 8, 1941', 'December 25, 1941', 8
FROM red_white_who_individuals WHERE name = 'Franklin D. Roosevelt'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 9 for Franklin D. Roosevelt
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How old was Roosevelt when he died?', 'Died office April 1945', '65 years old', '58 years old', '63 years old', 9
FROM red_white_who_individuals WHERE name = 'Franklin D. Roosevelt'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 10 for Franklin D. Roosevelt
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What lasting programs did the New Deal create?', 'Wheelchair hidden from public', 'Social Security, FDIC, TVA', 'Social Security, Medicare, Medicaid', 'WPA, CCC, Social Security', 10
FROM red_white_who_individuals WHERE name = 'Franklin D. Roosevelt'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;


-- Individual: John F. Kennedy
INSERT INTO red_white_who_individuals (name, birth_year, death_year, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery_1, photo_gallery_2, photo_gallery_3, photo_gallery_4, photo_gallery_5, photo_gallery_6, photo_gallery_7, photo_gallery_8, photo_gallery_9, photo_gallery_10)
VALUES (
  'John F. Kennedy',
  1917,
  1963,
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
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50220002200/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50220102201/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50220202202/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50220302203/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50220402204/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50220502205/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50220602206/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50220702207/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50220802208/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50220902209/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50221002210/full/pct:25/0/default.jpg'
)
ON CONFLICT (name) DO UPDATE SET
  birth_year = EXCLUDED.birth_year,
  death_year = EXCLUDED.death_year,
  key_events = EXCLUDED.key_events,
  key_facts = EXCLUDED.key_facts,
  biographical_summary = EXCLUDED.biographical_summary,
  main_photo_url = EXCLUDED.main_photo_url,
  photo_gallery_1 = EXCLUDED.photo_gallery_1,
  photo_gallery_2 = EXCLUDED.photo_gallery_2,
  photo_gallery_3 = EXCLUDED.photo_gallery_3,
  photo_gallery_4 = EXCLUDED.photo_gallery_4,
  photo_gallery_5 = EXCLUDED.photo_gallery_5,
  photo_gallery_6 = EXCLUDED.photo_gallery_6,
  photo_gallery_7 = EXCLUDED.photo_gallery_7,
  photo_gallery_8 = EXCLUDED.photo_gallery_8,
  photo_gallery_9 = EXCLUDED.photo_gallery_9,
  photo_gallery_10 = EXCLUDED.photo_gallery_10,
  updated_at = NOW();

-- Question 1 for John F. Kennedy
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was John F. Kennedy born?', 'Brookline Massachusetts 1917', 'Boston, Massachusetts', 'Hyannis, Massachusetts', 'New York City', 1
FROM red_white_who_individuals WHERE name = 'John F. Kennedy'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 2 for John F. Kennedy
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What patrol boat incident made Kennedy a war hero?', 'Harvard University education', 'His plane was shot down', 'His ship was torpedoed', 'His patrol boat was rammed', 2
FROM red_white_who_individuals WHERE name = 'John F. Kennedy'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 3 for John F. Kennedy
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How old was Kennedy when he became president?', 'PT-109 World War II hero', '46 years old', '40 years old', '35 years old', 3
FROM red_white_who_individuals WHERE name = 'John F. Kennedy'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 4 for John F. Kennedy
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What famous phrase came from Kennedy''s inaugural address?', 'Profiles Courage Pulitzer Prize', 'We have nothing to fear but fear itself', 'The only thing necessary is for good men to act', 'Ask not what your country can do for you', 4
FROM red_white_who_individuals WHERE name = 'John F. Kennedy'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 5 for John F. Kennedy
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many days did the Cuban Missile Crisis last?', 'Youngest elected president 43', 'Seven days', 'Thirteen days', 'Twenty-one days', 5
FROM red_white_who_individuals WHERE name = 'John F. Kennedy'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 6 for John F. Kennedy
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What organization did Kennedy create to send volunteers abroad?', 'Ask not what country', 'VISTA', 'AmeriCorps', 'Peace Corps', 6
FROM red_white_who_individuals WHERE name = 'John F. Kennedy'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 7 for John F. Kennedy
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What space program did Kennedy launch?', 'Cuban Missile Crisis 1962', 'Space race to Mars', 'Moon landing program', 'Satellite development', 7
FROM red_white_who_individuals WHERE name = 'John F. Kennedy'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 8 for John F. Kennedy
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'On what date was Kennedy assassinated?', 'Space program moon goal', 'November 22, 1963', 'November 24, 1963', 'October 22, 1963', 8
FROM red_white_who_individuals WHERE name = 'John F. Kennedy'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 9 for John F. Kennedy
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Kennedy assassinated?', 'Civil rights movement support', 'Houston, Texas', 'Dallas, Texas', 'San Antonio, Texas', 9
FROM red_white_who_individuals WHERE name = 'John F. Kennedy'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 10 for John F. Kennedy
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who assassinated President Kennedy?', 'Assassinated Dallas November 1963', 'Jack Ruby', 'Lee Harvey Oswald', 'James Earl Ray', 10
FROM red_white_who_individuals WHERE name = 'John F. Kennedy'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;


-- Individual: Ronald Reagan
INSERT INTO red_white_who_individuals (name, birth_year, death_year, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery_1, photo_gallery_2, photo_gallery_3, photo_gallery_4, photo_gallery_5, photo_gallery_6, photo_gallery_7, photo_gallery_8, photo_gallery_9, photo_gallery_10)
VALUES (
  'Ronald Reagan',
  1911,
  2004,
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
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10102300/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10102301/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10102302/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10102303/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10102304/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10102305/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10102306/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10102307/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10102308/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10102309/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10102310/full/pct:25/0/default.jpg'
)
ON CONFLICT (name) DO UPDATE SET
  birth_year = EXCLUDED.birth_year,
  death_year = EXCLUDED.death_year,
  key_events = EXCLUDED.key_events,
  key_facts = EXCLUDED.key_facts,
  biographical_summary = EXCLUDED.biographical_summary,
  main_photo_url = EXCLUDED.main_photo_url,
  photo_gallery_1 = EXCLUDED.photo_gallery_1,
  photo_gallery_2 = EXCLUDED.photo_gallery_2,
  photo_gallery_3 = EXCLUDED.photo_gallery_3,
  photo_gallery_4 = EXCLUDED.photo_gallery_4,
  photo_gallery_5 = EXCLUDED.photo_gallery_5,
  photo_gallery_6 = EXCLUDED.photo_gallery_6,
  photo_gallery_7 = EXCLUDED.photo_gallery_7,
  photo_gallery_8 = EXCLUDED.photo_gallery_8,
  photo_gallery_9 = EXCLUDED.photo_gallery_9,
  photo_gallery_10 = EXCLUDED.photo_gallery_10,
  updated_at = NOW();

-- Question 1 for Ronald Reagan
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Ronald Reagan born?', 'Tampico Illinois 1911', 'Dixon, Illinois', 'Chicago, Illinois', 'Springfield, Illinois', 1
FROM red_white_who_individuals WHERE name = 'Ronald Reagan'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 2 for Ronald Reagan
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What career did Reagan have before politics?', 'Hollywood actor career', 'Radio announcer', 'Television host', 'Hollywood actor', 2
FROM red_white_who_individuals WHERE name = 'Ronald Reagan'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 3 for Ronald Reagan
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What state did Reagan govern before becoming president?', 'California Governor 1967-1975', 'New York', 'Texas', 'California', 3
FROM red_white_who_individuals WHERE name = 'Ronald Reagan'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 4 for Ronald Reagan
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What happened 69 days into Reagan''s presidency?', 'Great Communicator nickname', 'He was diagnosed with cancer', 'He was impeached', 'He was shot', 4
FROM red_white_who_individuals WHERE name = 'Ronald Reagan'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 5 for Ronald Reagan
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Reagan call the Soviet Union?', 'Conservative movement leader', 'Evil regime', 'Dangerous adversary', 'Evil Empire', 5
FROM red_white_who_individuals WHERE name = 'Ronald Reagan'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 6 for Ronald Reagan
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who was the Soviet leader Reagan negotiated with?', '40th President 1981-1989', 'Leonid Brezhnev', 'Mikhail Gorbachev', 'Nikita Khrushchev', 6
FROM red_white_who_individuals WHERE name = 'Ronald Reagan'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 7 for Ronald Reagan
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What famous words did Reagan say at the Berlin Wall?', 'Cold War Berlin Wall', 'End this wall', 'Bring down this wall', 'Mr. Gorbachev, tear down this wall', 7
FROM red_white_who_individuals WHERE name = 'Ronald Reagan'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 8 for Ronald Reagan
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did the Berlin Wall fall?', 'Supply-side economics', '1991', '1987', '1989', 8
FROM red_white_who_individuals WHERE name = 'Ronald Reagan'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 9 for Ronald Reagan
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How old was Reagan when he died?', 'Assassination attempt survived', '85 years old', '93 years old', '89 years old', 9
FROM red_white_who_individuals WHERE name = 'Ronald Reagan'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 10 for Ronald Reagan
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What phrase did Reagan use to describe America?', 'Alzheimer''s disease later years', 'Land of opportunity', 'City upon a hill', 'Greatest nation on Earth', 10
FROM red_white_who_individuals WHERE name = 'Ronald Reagan'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;


-- Individual: Helen Keller
INSERT INTO red_white_who_individuals (name, birth_year, death_year, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery_1, photo_gallery_2, photo_gallery_3, photo_gallery_4, photo_gallery_5, photo_gallery_6, photo_gallery_7, photo_gallery_8, photo_gallery_9, photo_gallery_10)
VALUES (
  'Helen Keller',
  1880,
  1968,
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
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20102400/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20102401/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20102402/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20102403/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20102404/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20102405/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20102406/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20102407/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20102408/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20102409/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20102410/full/pct:25/0/default.jpg'
)
ON CONFLICT (name) DO UPDATE SET
  birth_year = EXCLUDED.birth_year,
  death_year = EXCLUDED.death_year,
  key_events = EXCLUDED.key_events,
  key_facts = EXCLUDED.key_facts,
  biographical_summary = EXCLUDED.biographical_summary,
  main_photo_url = EXCLUDED.main_photo_url,
  photo_gallery_1 = EXCLUDED.photo_gallery_1,
  photo_gallery_2 = EXCLUDED.photo_gallery_2,
  photo_gallery_3 = EXCLUDED.photo_gallery_3,
  photo_gallery_4 = EXCLUDED.photo_gallery_4,
  photo_gallery_5 = EXCLUDED.photo_gallery_5,
  photo_gallery_6 = EXCLUDED.photo_gallery_6,
  photo_gallery_7 = EXCLUDED.photo_gallery_7,
  photo_gallery_8 = EXCLUDED.photo_gallery_8,
  photo_gallery_9 = EXCLUDED.photo_gallery_9,
  photo_gallery_10 = EXCLUDED.photo_gallery_10,
  updated_at = NOW();

-- Question 1 for Helen Keller
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Helen Keller born?', 'Tuscumbia Alabama 1880', 'Atlanta, Georgia', 'Birmingham, Alabama', 'Montgomery, Alabama', 1
FROM red_white_who_individuals WHERE name = 'Helen Keller'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 2 for Helen Keller
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What illness left Helen deaf and blind?', 'Illness left deaf blind', 'Scarlet fever', 'Meningitis', 'Unknown illness', 2
FROM red_white_who_individuals WHERE name = 'Helen Keller'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 3 for Helen Keller
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who was Helen''s teacher?', 'Anne Sullivan teacher breakthrough', 'Sarah Fuller', 'Anne Macy', 'Anne Sullivan', 3
FROM red_white_who_individuals WHERE name = 'Helen Keller'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 4 for Helen Keller
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was the breakthrough moment that helped Helen understand language?', 'Water pump learning moment', 'Feeling Braille letters', 'The water pump moment', 'Spelling in her palm', 4
FROM red_white_who_individuals WHERE name = 'Helen Keller'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 5 for Helen Keller
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What reading system did Helen learn?', 'Radcliffe College graduate', 'Sign language', 'Braille', 'Lip reading', 5
FROM red_white_who_individuals WHERE name = 'Helen Keller'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 6 for Helen Keller
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What college did Helen attend?', 'Political activism socialist', 'Harvard University', 'Wellesley College', 'Radcliffe College', 6
FROM red_white_who_individuals WHERE name = 'Helen Keller'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 7 for Helen Keller
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Helen''s autobiography called?', 'Women''s suffrage supporter', 'The Story of My Life', 'Teacher', 'Light in My Darkness', 7
FROM red_white_who_individuals WHERE name = 'Helen Keller'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 8 for Helen Keller
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many countries did Helen travel to?', 'Disability rights advocate', 'About 20 countries', 'About 50 countries', 'About 39 countries', 8
FROM red_white_who_individuals WHERE name = 'Helen Keller'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 9 for Helen Keller
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What famous quote did Helen write about suffering?', 'Autobiography Story My Life', 'Character cannot be developed in ease and quiet', 'The only thing worse than being blind is having no vision', 'Life is either a daring adventure or nothing', 9
FROM red_white_who_individuals WHERE name = 'Helen Keller'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 10 for Helen Keller
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What distinction did Helen earn about college degrees?', 'Inspirational speaker worldwide', 'First blind person to graduate college', 'First deaf-blind person to earn a college degree', 'First disabled person to attend Harvard', 10
FROM red_white_who_individuals WHERE name = 'Helen Keller'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;


-- Individual: George Washington Carver
INSERT INTO red_white_who_individuals (name, birth_year, death_year, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery_1, photo_gallery_2, photo_gallery_3, photo_gallery_4, photo_gallery_5, photo_gallery_6, photo_gallery_7, photo_gallery_8, photo_gallery_9, photo_gallery_10)
VALUES (
  'George Washington Carver',
  1864,
  1943,
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
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50250002500/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50250102501/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50250202502/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50250302503/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50250402504/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50250502505/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50250602506/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50250702507/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50250802508/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50250902509/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50251002510/full/pct:25/0/default.jpg'
)
ON CONFLICT (name) DO UPDATE SET
  birth_year = EXCLUDED.birth_year,
  death_year = EXCLUDED.death_year,
  key_events = EXCLUDED.key_events,
  key_facts = EXCLUDED.key_facts,
  biographical_summary = EXCLUDED.biographical_summary,
  main_photo_url = EXCLUDED.main_photo_url,
  photo_gallery_1 = EXCLUDED.photo_gallery_1,
  photo_gallery_2 = EXCLUDED.photo_gallery_2,
  photo_gallery_3 = EXCLUDED.photo_gallery_3,
  photo_gallery_4 = EXCLUDED.photo_gallery_4,
  photo_gallery_5 = EXCLUDED.photo_gallery_5,
  photo_gallery_6 = EXCLUDED.photo_gallery_6,
  photo_gallery_7 = EXCLUDED.photo_gallery_7,
  photo_gallery_8 = EXCLUDED.photo_gallery_8,
  photo_gallery_9 = EXCLUDED.photo_gallery_9,
  photo_gallery_10 = EXCLUDED.photo_gallery_10,
  updated_at = NOW();

-- Question 1 for George Washington Carver
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Carver born?', 'Diamond Missouri 1864', 'Tuskegee, Alabama', 'Atlanta, Georgia', 'Kansas City, Missouri', 1
FROM red_white_who_individuals WHERE name = 'George Washington Carver'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 2 for George Washington Carver
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did neighbors call young George?', 'Born into slavery', 'The Crop Doctor', 'The Plant Doctor', 'The Garden Scientist', 2
FROM red_white_who_individuals WHERE name = 'George Washington Carver'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 3 for George Washington Carver
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Why was Carver rejected from Highland College?', 'Tuskegee Institute professor', 'He couldn''t afford tuition', 'He was rejected because he was Black', 'The school had closed', 3
FROM red_white_who_individuals WHERE name = 'George Washington Carver'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 4 for George Washington Carver
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What degrees did Carver earn from Iowa State?', 'Agricultural science innovations', 'Bachelor''s degree only', 'Bachelor''s and master''s degrees', 'Doctorate degree', 4
FROM red_white_who_individuals WHERE name = 'George Washington Carver'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 5 for George Washington Carver
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who invited Carver to Tuskegee?', 'Peanut crop rotation promotion', 'George Washington', 'Frederick Douglass', 'Booker T. Washington', 5
FROM red_white_who_individuals WHERE name = 'George Washington Carver'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 6 for George Washington Carver
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What farming practice did Carver teach?', 'Sweet potato research', 'Soil rotation', 'Crop rotation', 'Field rotation', 6
FROM red_white_who_individuals WHERE name = 'George Washington Carver'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 7 for George Washington Carver
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many products did Carver develop from sweet potatoes?', 'Cotton soil improvement', 'About 50 products', 'About 200 products', 'About 118 products', 7
FROM red_white_who_individuals WHERE name = 'George Washington Carver'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 8 for George Washington Carver
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Why didn''t Carver patent his discoveries?', 'Helped Southern farmers', 'They were too simple to patent', 'He wanted them free for all farmers', 'The patent office rejected them', 8
FROM red_white_who_individuals WHERE name = 'George Washington Carver'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 9 for George Washington Carver
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many presidents did Carver meet?', 'Environmental conservation early advocate', 'One president', 'Three presidents', 'No presidents', 9
FROM red_white_who_individuals WHERE name = 'George Washington Carver'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 10 for George Washington Carver
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What honor was given to Carver''s birthplace?', 'Scientists Hall Fame', 'A national monument', 'A university named after him', 'A statue in Washington D.C.', 10
FROM red_white_who_individuals WHERE name = 'George Washington Carver'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;


-- Individual: Sojourner Truth
INSERT INTO red_white_who_individuals (name, birth_year, death_year, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery_1, photo_gallery_2, photo_gallery_3, photo_gallery_4, photo_gallery_5, photo_gallery_6, photo_gallery_7, photo_gallery_8, photo_gallery_9, photo_gallery_10)
VALUES (
  'Sojourner Truth',
  1797,
  1883,
  ARRAY['Abolitionist and women''s rights activist'],
  '{"notes":"Born enslaved in New York as Isabella Baumfree; Escaped slavery in 1826; Changed name to Sojourner Truth; Famous Ain't I a Woman speech; Recruited Black soldiers during Civil War; Met President Lincoln"}',
  'Sojourner Truth was one of the most powerful voices against slavery and for women''s rights. Born into slavery, she became a famous speaker whose words inspired millions.

She was born Isabella Baumfree around 1797 in New York. She was enslaved and sold several times as a child. When New York freed enslaved people in 1827, Isabella walked away, carrying her infant daughter.

In 1843, she felt called by God to travel and preach. She changed her name to Sojourner Truth, explaining she would sojourn the land speaking truth.

Truth became famous for powerful speeches. Though she never learned to read or write, she was electrifying. She stood nearly six feet tall with a commanding voice.

Her most famous speech came in 1851 at a women''s rights convention in Ohio. Known as "Ain''t I a Woman?" the speech challenged those who said women were too weak for equal rights.

During the Civil War, Truth recruited Black soldiers for the Union Army. In 1864, she met President Abraham Lincoln at the White House.

Sojourner Truth died on November 26, 1883. She showed that one powerful voice can change the world.',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50260002600/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50260102601/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50260202602/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50260302603/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50260402604/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50260502605/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50260602606/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50260702607/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50260802608/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50260902609/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50261002610/full/pct:25/0/default.jpg'
)
ON CONFLICT (name) DO UPDATE SET
  birth_year = EXCLUDED.birth_year,
  death_year = EXCLUDED.death_year,
  key_events = EXCLUDED.key_events,
  key_facts = EXCLUDED.key_facts,
  biographical_summary = EXCLUDED.biographical_summary,
  main_photo_url = EXCLUDED.main_photo_url,
  photo_gallery_1 = EXCLUDED.photo_gallery_1,
  photo_gallery_2 = EXCLUDED.photo_gallery_2,
  photo_gallery_3 = EXCLUDED.photo_gallery_3,
  photo_gallery_4 = EXCLUDED.photo_gallery_4,
  photo_gallery_5 = EXCLUDED.photo_gallery_5,
  photo_gallery_6 = EXCLUDED.photo_gallery_6,
  photo_gallery_7 = EXCLUDED.photo_gallery_7,
  photo_gallery_8 = EXCLUDED.photo_gallery_8,
  photo_gallery_9 = EXCLUDED.photo_gallery_9,
  photo_gallery_10 = EXCLUDED.photo_gallery_10,
  updated_at = NOW();

-- Question 1 for Sojourner Truth
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Sojourner Truth''s birth name?', 'Ulster County New York 1797', 'Harriet Freeman', 'Sarah Johnson', 'Isabella Baumfree', 1
FROM red_white_who_individuals WHERE name = 'Sojourner Truth'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 2 for Sojourner Truth
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'In what state was she born into slavery?', 'Born slavery Isabella Baumfree', 'Virginia', 'Maryland', 'New York', 2
FROM red_white_who_individuals WHERE name = 'Sojourner Truth'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 3 for Sojourner Truth
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did she walk away from slavery?', 'Escaped slavery 1826', '1830', '1827', '1820', 3
FROM red_white_who_individuals WHERE name = 'Sojourner Truth'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 4 for Sojourner Truth
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Why did she change her name to Sojourner Truth?', 'Ain''t I Woman speech famous', 'She wanted to travel and spread God''s truth', 'She was honoring a friend', 'It was her grandmother''s name', 4
FROM red_white_who_individuals WHERE name = 'Sojourner Truth'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 5 for Sojourner Truth
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was her most famous speech called?', 'Abolitionist speaker powerful', 'We Shall Overcome', 'Freedom Now', 'Ain''t I a Woman', 5
FROM red_white_who_individuals WHERE name = 'Sojourner Truth'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 6 for Sojourner Truth
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How tall was Sojourner Truth?', 'Women''s rights advocate', 'About five feet tall', 'About six feet tall', 'About five feet six inches', 6
FROM red_white_who_individuals WHERE name = 'Sojourner Truth'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 7 for Sojourner Truth
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did she do during the Civil War?', 'Religious faith central', 'She nursed wounded soldiers', 'She raised money for the cause', 'She recruited Black soldiers', 7
FROM red_white_who_individuals WHERE name = 'Sojourner Truth'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 8 for Sojourner Truth
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Which president did she meet?', 'Met Abraham Lincoln', 'Ulysses S. Grant', 'Andrew Johnson', 'Abraham Lincoln', 8
FROM red_white_who_individuals WHERE name = 'Sojourner Truth'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 9 for Sojourner Truth
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Could Sojourner Truth read and write?', 'Worked Freedmen''s Bureau', 'Yes, she learned as an adult', 'No, she never learned', 'She could read but not write', 9
FROM red_white_who_individuals WHERE name = 'Sojourner Truth'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 10 for Sojourner Truth
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where did she die?', 'Died Battle Creek Michigan', 'Washington, D.C.', 'New York City', 'Battle Creek, Michigan', 10
FROM red_white_who_individuals WHERE name = 'Sojourner Truth'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;


-- Individual: Booker T. Washington
INSERT INTO red_white_who_individuals (name, birth_year, death_year, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery_1, photo_gallery_2, photo_gallery_3, photo_gallery_4, photo_gallery_5, photo_gallery_6, photo_gallery_7, photo_gallery_8, photo_gallery_9, photo_gallery_10)
VALUES (
  'Booker T. Washington',
  1856,
  1915,
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
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50270002700/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50270102701/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50270202702/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50270302703/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50270402704/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50270502705/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50270602706/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50270702707/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50270802708/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50270902709/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50271002710/full/pct:25/0/default.jpg'
)
ON CONFLICT (name) DO UPDATE SET
  birth_year = EXCLUDED.birth_year,
  death_year = EXCLUDED.death_year,
  key_events = EXCLUDED.key_events,
  key_facts = EXCLUDED.key_facts,
  biographical_summary = EXCLUDED.biographical_summary,
  main_photo_url = EXCLUDED.main_photo_url,
  photo_gallery_1 = EXCLUDED.photo_gallery_1,
  photo_gallery_2 = EXCLUDED.photo_gallery_2,
  photo_gallery_3 = EXCLUDED.photo_gallery_3,
  photo_gallery_4 = EXCLUDED.photo_gallery_4,
  photo_gallery_5 = EXCLUDED.photo_gallery_5,
  photo_gallery_6 = EXCLUDED.photo_gallery_6,
  photo_gallery_7 = EXCLUDED.photo_gallery_7,
  photo_gallery_8 = EXCLUDED.photo_gallery_8,
  photo_gallery_9 = EXCLUDED.photo_gallery_9,
  photo_gallery_10 = EXCLUDED.photo_gallery_10,
  updated_at = NOW();

-- Question 1 for Booker T. Washington
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Booker T. Washington born?', 'Franklin County Virginia 1856', 'Tuskegee, Alabama', 'Richmond, Virginia', 'Charleston, South Carolina', 1
FROM red_white_who_individuals WHERE name = 'Booker T. Washington'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 2 for Booker T. Washington
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What test did the teacher give Washington at Hampton?', 'Born into slavery', 'Write an essay', 'Pass an oral exam', 'Sweep a room clean', 2
FROM red_white_who_individuals WHERE name = 'Booker T. Washington'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 3 for Booker T. Washington
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did Washington found Tuskegee Institute?', 'Hampton Institute education', '1890', '1875', '1881', 3
FROM red_white_who_individuals WHERE name = 'Booker T. Washington'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 4 for Booker T. Washington
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What trades did students learn at Tuskegee?', 'Tuskegee Institute founder principal', 'Academic subjects only', 'Law and medicine', 'Practical trades like farming and carpentry', 4
FROM red_white_who_individuals WHERE name = 'Booker T. Washington'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 5 for Booker T. Washington
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Washington''s 1895 speech called?', 'Up From Slavery autobiography', 'Tuskegee Speech', 'Atlanta Compromise', 'Southern Strategy', 5
FROM red_white_who_individuals WHERE name = 'Booker T. Washington'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 6 for Booker T. Washington
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was his autobiography called?', 'Atlanta Compromise speech', 'The Souls of Black Folk', 'Up From Slavery', 'Black Reconstruction', 6
FROM red_white_who_individuals WHERE name = 'Booker T. Washington'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 7 for Booker T. Washington
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Which Black leader disagreed with Washington?', 'Vocational education advocate', 'Marcus Garvey', 'W.E.B. Du Bois', 'Frederick Douglass', 7
FROM red_white_who_individuals WHERE name = 'Booker T. Washington'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 8 for Booker T. Washington
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What is Tuskegee called today?', 'Self-help philosophy promoted', 'Howard University', 'Tuskegee University', 'Morehouse College', 8
FROM red_white_who_individuals WHERE name = 'Booker T. Washington'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 9 for Booker T. Washington
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many students did Washington start with?', 'Dined White House Roosevelt', 'About 100 students', 'About 30 students', 'About 60 students', 9
FROM red_white_who_individuals WHERE name = 'Booker T. Washington'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 10 for Booker T. Washington
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How far did Washington travel to reach Hampton?', 'Disagreed W.E.B. Du Bois', 'About 200 miles', 'About 500 miles', 'About 1,000 miles', 10
FROM red_white_who_individuals WHERE name = 'Booker T. Washington'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;


-- Individual: Dwight D. Eisenhower
INSERT INTO red_white_who_individuals (name, birth_year, death_year, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery_1, photo_gallery_2, photo_gallery_3, photo_gallery_4, photo_gallery_5, photo_gallery_6, photo_gallery_7, photo_gallery_8, photo_gallery_9, photo_gallery_10)
VALUES (
  'Dwight D. Eisenhower',
  1890,
  1969,
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
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10102800/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10102801/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10102802/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10102803/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10102804/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10102805/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10102806/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10102807/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10102808/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10102809/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10102810/full/pct:25/0/default.jpg'
)
ON CONFLICT (name) DO UPDATE SET
  birth_year = EXCLUDED.birth_year,
  death_year = EXCLUDED.death_year,
  key_events = EXCLUDED.key_events,
  key_facts = EXCLUDED.key_facts,
  biographical_summary = EXCLUDED.biographical_summary,
  main_photo_url = EXCLUDED.main_photo_url,
  photo_gallery_1 = EXCLUDED.photo_gallery_1,
  photo_gallery_2 = EXCLUDED.photo_gallery_2,
  photo_gallery_3 = EXCLUDED.photo_gallery_3,
  photo_gallery_4 = EXCLUDED.photo_gallery_4,
  photo_gallery_5 = EXCLUDED.photo_gallery_5,
  photo_gallery_6 = EXCLUDED.photo_gallery_6,
  photo_gallery_7 = EXCLUDED.photo_gallery_7,
  photo_gallery_8 = EXCLUDED.photo_gallery_8,
  photo_gallery_9 = EXCLUDED.photo_gallery_9,
  photo_gallery_10 = EXCLUDED.photo_gallery_10,
  updated_at = NOW();

-- Question 1 for Dwight D. Eisenhower
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where did Eisenhower grow up?', 'Denison Texas 1890', 'Abilene, Kansas', 'Topeka, Kansas', 'Wichita, Kansas', 1
FROM red_white_who_individuals WHERE name = 'Dwight D. Eisenhower'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 2 for Dwight D. Eisenhower
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What military academy did he attend?', 'West Point Military Academy', 'Annapolis Naval Academy', 'The Citadel', 'West Point', 2
FROM red_white_who_individuals WHERE name = 'Dwight D. Eisenhower'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 3 for Dwight D. Eisenhower
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What position did Eisenhower hold during D-Day?', 'World War II Supreme Commander', 'Commander of Pacific Forces', 'Supreme Commander of Allied Forces in Europe', 'Commander of American Forces', 3
FROM red_white_who_individuals WHERE name = 'Dwight D. Eisenhower'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 4 for Dwight D. Eisenhower
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was the date of D-Day?', 'D-Day invasion planner', 'June 5, 1944', 'June 6, 1944', 'June 7, 1944', 4
FROM red_white_who_individuals WHERE name = 'Dwight D. Eisenhower'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 5 for Dwight D. Eisenhower
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many troops landed at Normandy?', '34th President 1953-1961', 'Over 200,000 troops', 'About 75,000 troops', 'Over 150,000 troops', 5
FROM red_white_who_individuals WHERE name = 'Dwight D. Eisenhower'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 6 for Dwight D. Eisenhower
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Eisenhower''s campaign slogan?', 'Interstate Highway System', 'We Like Ike', 'Go with Ike', 'I Like Ike', 6
FROM red_white_who_individuals WHERE name = 'Dwight D. Eisenhower'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 7 for Dwight D. Eisenhower
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What highway system did Eisenhower create?', 'Little Rock Nine protection', 'National Highway System', 'Interstate Highway System', 'Federal Road System', 7
FROM red_white_who_individuals WHERE name = 'Dwight D. Eisenhower'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 8 for Dwight D. Eisenhower
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Eisenhower do in Little Rock, Arkansas?', 'NASA space agency creation', 'Ordered National Guard to protect Black students', 'Sent federal troops to integrate schools', 'Met with segregationist governors', 8
FROM red_white_who_individuals WHERE name = 'Dwight D. Eisenhower'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 9 for Dwight D. Eisenhower
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What warning did Eisenhower give in his farewell address?', 'Military-industrial complex warning', 'About the Cold War dangers', 'About the military-industrial complex', 'About government spending', 9
FROM red_white_who_individuals WHERE name = 'Dwight D. Eisenhower'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 10 for Dwight D. Eisenhower
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What war did Eisenhower end as president?', 'Gettysburg farm retirement', 'World War II', 'Korean War', 'Vietnam War', 10
FROM red_white_who_individuals WHERE name = 'Dwight D. Eisenhower'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;


-- Individual: Daniel Boone
INSERT INTO red_white_who_individuals (name, birth_year, death_year, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery_1, photo_gallery_2, photo_gallery_3, photo_gallery_4, photo_gallery_5, photo_gallery_6, photo_gallery_7, photo_gallery_8, photo_gallery_9, photo_gallery_10)
VALUES (
  'Daniel Boone',
  1734,
  1820,
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
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20102900/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20102901/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20102902/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20102903/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20102904/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20102905/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20102906/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20102907/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20102908/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20102909/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20102910/full/pct:25/0/default.jpg'
)
ON CONFLICT (name) DO UPDATE SET
  birth_year = EXCLUDED.birth_year,
  death_year = EXCLUDED.death_year,
  key_events = EXCLUDED.key_events,
  key_facts = EXCLUDED.key_facts,
  biographical_summary = EXCLUDED.biographical_summary,
  main_photo_url = EXCLUDED.main_photo_url,
  photo_gallery_1 = EXCLUDED.photo_gallery_1,
  photo_gallery_2 = EXCLUDED.photo_gallery_2,
  photo_gallery_3 = EXCLUDED.photo_gallery_3,
  photo_gallery_4 = EXCLUDED.photo_gallery_4,
  photo_gallery_5 = EXCLUDED.photo_gallery_5,
  photo_gallery_6 = EXCLUDED.photo_gallery_6,
  photo_gallery_7 = EXCLUDED.photo_gallery_7,
  photo_gallery_8 = EXCLUDED.photo_gallery_8,
  photo_gallery_9 = EXCLUDED.photo_gallery_9,
  photo_gallery_10 = EXCLUDED.photo_gallery_10,
  updated_at = NOW();

-- Question 1 for Daniel Boone
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Daniel Boone born?', 'Berks County Pennsylvania 1734', 'North Carolina', 'Kentucky', 'Pennsylvania', 1
FROM red_white_who_individuals WHERE name = 'Daniel Boone'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 2 for Daniel Boone
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did Boone first explore Kentucky?', 'Frontier explorer hunter', '1775', '1765', '1769', 2
FROM red_white_who_individuals WHERE name = 'Daniel Boone'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 3 for Daniel Boone
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What trail did Boone blaze?', 'Kentucky wilderness exploration', 'Cumberland Road', 'National Road', 'Wilderness Road', 3
FROM red_white_who_individuals WHERE name = 'Daniel Boone'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 4 for Daniel Boone
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What natural passage did the trail go through?', 'Boonesborough settlement founded', 'Appalachian Pass', 'Cumberland Gap', 'Blue Ridge Pass', 4
FROM red_white_who_individuals WHERE name = 'Daniel Boone'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 5 for Daniel Boone
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What settlement did Boone found?', 'Wilderness Road blazed', 'Harrodsburg', 'Fort Knox', 'Boonesborough', 5
FROM red_white_who_individuals WHERE name = 'Daniel Boone'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 6 for Daniel Boone
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What happened when Boone was captured in 1778?', 'Captured by Shawnee escaped', 'He escaped immediately', 'He was held for ransom', 'He was adopted by the tribe', 6
FROM red_white_who_individuals WHERE name = 'Daniel Boone'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 7 for Daniel Boone
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What Shawnee name was Boone given?', 'Revolutionary War service', 'Big Bear', 'Swift Deer', 'Sheltowee (Big Turtle)', 7
FROM red_white_who_individuals WHERE name = 'Daniel Boone'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 8 for Daniel Boone
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How far did Boone run to warn Boonesborough?', 'Land speculation problems', 'About 50 miles', 'About 100 miles', 'About 160 miles', 8
FROM red_white_who_individuals WHERE name = 'Daniel Boone'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 9 for Daniel Boone
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many settlers used the Wilderness Road?', 'Missouri Territory final years', 'About 100,000 settlers', 'About 200,000 settlers', 'About 50,000 settlers', 9
FROM red_white_who_individuals WHERE name = 'Daniel Boone'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 10 for Daniel Boone
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where did Boone die?', 'American frontier legend', 'Kentucky', 'Missouri', 'Tennessee', 10
FROM red_white_who_individuals WHERE name = 'Daniel Boone'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;


-- Individual: Davy Crockett
INSERT INTO red_white_who_individuals (name, birth_year, death_year, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery_1, photo_gallery_2, photo_gallery_3, photo_gallery_4, photo_gallery_5, photo_gallery_6, photo_gallery_7, photo_gallery_8, photo_gallery_9, photo_gallery_10)
VALUES (
  'Davy Crockett',
  1786,
  1836,
  ARRAY['Frontiersman and congressman who died at the Alamo'],
  '{"notes":"Born in Tennessee; Self-educated frontiersman; Served in U.S. Congress; Known for wit and storytelling; Died defending the Alamo in Texas; Legendary folk hero"}',
  'Davy Crockett was a frontiersman, soldier, and politician whose larger-than-life personality made him a legend. He died fighting at the Battle of the Alamo.

Crockett was born on August 17, 1786, in Tennessee. His family was poor, and David had almost no formal education. He became an expert hunter, famous for killing bears.

Crockett entered politics and served three terms in Congress. He was known for his wit and independent streak. His motto was, "Be always sure you are right, then go ahead."

After losing his Congressional seat in 1835, Crockett was disgusted with politics. He told his voters, "You may all go to hell, and I will go to Texas."

Texas was fighting for independence from Mexico. Crockett joined the defenders of the Alamo, an old Spanish mission in San Antonio. About 200 Texans faced a Mexican army of thousands.

The siege lasted thirteen days. On March 6, 1836, Mexican forces stormed the walls. All the defenders were killed, including Crockett.

"Remember the Alamo!" became the rallying cry that inspired Texans to win independence. Davy Crockett became an American legend.',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50300003000/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50300103001/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50300203002/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50300303003/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50300403004/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50300503005/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50300603006/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50300703007/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50300803008/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50300903009/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50301003010/full/pct:25/0/default.jpg'
)
ON CONFLICT (name) DO UPDATE SET
  birth_year = EXCLUDED.birth_year,
  death_year = EXCLUDED.death_year,
  key_events = EXCLUDED.key_events,
  key_facts = EXCLUDED.key_facts,
  biographical_summary = EXCLUDED.biographical_summary,
  main_photo_url = EXCLUDED.main_photo_url,
  photo_gallery_1 = EXCLUDED.photo_gallery_1,
  photo_gallery_2 = EXCLUDED.photo_gallery_2,
  photo_gallery_3 = EXCLUDED.photo_gallery_3,
  photo_gallery_4 = EXCLUDED.photo_gallery_4,
  photo_gallery_5 = EXCLUDED.photo_gallery_5,
  photo_gallery_6 = EXCLUDED.photo_gallery_6,
  photo_gallery_7 = EXCLUDED.photo_gallery_7,
  photo_gallery_8 = EXCLUDED.photo_gallery_8,
  photo_gallery_9 = EXCLUDED.photo_gallery_9,
  photo_gallery_10 = EXCLUDED.photo_gallery_10,
  updated_at = NOW();

-- Question 1 for Davy Crockett
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Davy Crockett born?', 'Greene County Tennessee 1786', 'Kentucky', 'Alabama', 'Tennessee', 1
FROM red_white_who_individuals WHERE name = 'Davy Crockett'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 2 for Davy Crockett
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What animal was Crockett famous for hunting?', 'King Wild Frontier nickname', 'Deer', 'Buffalo', 'Bears', 2
FROM red_white_who_individuals WHERE name = 'Davy Crockett'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 3 for Davy Crockett
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many terms did Crockett serve in Congress?', 'Tennessee frontier childhood', 'Two terms', 'One term', 'Three terms', 3
FROM red_white_who_individuals WHERE name = 'Davy Crockett'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 4 for Davy Crockett
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Crockett''s motto?', 'Creek War military service', 'Go west, young man', 'Be always sure you are right, then go ahead', 'Don''t give up the ship', 4
FROM red_white_who_individuals WHERE name = 'Davy Crockett'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 5 for Davy Crockett
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Crockett tell his voters before leaving for Texas?', 'U.S. House Representatives', 'I''m going to California', 'You may all go to Texas', 'You may all go to hell, and I will go to Texas', 5
FROM red_white_who_individuals WHERE name = 'Davy Crockett'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 6 for Davy Crockett
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was the Alamo?', 'Bear hunting legendary skills', 'A Spanish fort', 'A Mexican prison', 'An old Spanish mission', 6
FROM red_white_who_individuals WHERE name = 'Davy Crockett'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 7 for Davy Crockett
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many days did the siege last?', 'Opposed Andrew Jackson policies', 'About 7 days', 'About 20 days', 'About 13 days', 7
FROM red_white_who_individuals WHERE name = 'Davy Crockett'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 8 for Davy Crockett
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'On what date did the final battle occur?', 'Remember the Alamo hero', 'March 2, 1836', 'March 6, 1836', 'February 23, 1836', 8
FROM red_white_who_individuals WHERE name = 'Davy Crockett'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 9 for Davy Crockett
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What rallying cry came from the Alamo?', 'Texas independence supporter', 'Victory or death', 'Don''t forget Texas', 'Remember the Alamo', 9
FROM red_white_who_individuals WHERE name = 'Davy Crockett'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 10 for Davy Crockett
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many Texan defenders were at the Alamo?', 'Died Alamo Battle 1836', 'About 50 defenders', 'About 200 defenders', 'About 500 defenders', 10
FROM red_white_who_individuals WHERE name = 'Davy Crockett'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;


-- Individual: Henry Ford
INSERT INTO red_white_who_individuals (name, birth_year, death_year, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery_1, photo_gallery_2, photo_gallery_3, photo_gallery_4, photo_gallery_5, photo_gallery_6, photo_gallery_7, photo_gallery_8, photo_gallery_9, photo_gallery_10)
VALUES (
  'Henry Ford',
  1863,
  1947,
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
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50310003100/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50310103101/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50310203102/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50310303103/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50310403104/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50310503105/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50310603106/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50310703107/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50310803108/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50310903109/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50311003110/full/pct:25/0/default.jpg'
)
ON CONFLICT (name) DO UPDATE SET
  birth_year = EXCLUDED.birth_year,
  death_year = EXCLUDED.death_year,
  key_events = EXCLUDED.key_events,
  key_facts = EXCLUDED.key_facts,
  biographical_summary = EXCLUDED.biographical_summary,
  main_photo_url = EXCLUDED.main_photo_url,
  photo_gallery_1 = EXCLUDED.photo_gallery_1,
  photo_gallery_2 = EXCLUDED.photo_gallery_2,
  photo_gallery_3 = EXCLUDED.photo_gallery_3,
  photo_gallery_4 = EXCLUDED.photo_gallery_4,
  photo_gallery_5 = EXCLUDED.photo_gallery_5,
  photo_gallery_6 = EXCLUDED.photo_gallery_6,
  photo_gallery_7 = EXCLUDED.photo_gallery_7,
  photo_gallery_8 = EXCLUDED.photo_gallery_8,
  photo_gallery_9 = EXCLUDED.photo_gallery_9,
  photo_gallery_10 = EXCLUDED.photo_gallery_10,
  updated_at = NOW();

-- Question 1 for Henry Ford
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Henry Ford born?', 'Springwells Township Michigan 1863', 'Detroit, Michigan', 'Dearborn, Michigan', 'Flint, Michigan', 1
FROM red_white_who_individuals WHERE name = 'Henry Ford'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 2 for Henry Ford
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did Ford build his first car?', 'Farm family mechanical interests', '1890', '1900', '1896', 2
FROM red_white_who_individuals WHERE name = 'Henry Ford'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 3 for Henry Ford
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When was Ford Motor Company founded?', 'Model T automobile mass production', '1908', '1899', '1903', 3
FROM red_white_who_individuals WHERE name = 'Henry Ford'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 4 for Henry Ford
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What car did Ford introduce in 1908?', 'Assembly line manufacturing revolution', 'Model A', 'Model S', 'Model T', 4
FROM red_white_who_individuals WHERE name = 'Henry Ford'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 5 for Henry Ford
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What manufacturing innovation did Ford develop?', 'Ford Motor Company founder', 'Mass production techniques', 'The assembly line', 'Interchangeable parts', 5
FROM red_white_who_individuals WHERE name = 'Henry Ford'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 6 for Henry Ford
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How much did Ford pay workers per day in 1914?', '5 dollar day workers', 'Three dollars per day', 'Two dollars per day', 'Five dollars per day', 6
FROM red_white_who_individuals WHERE name = 'Henry Ford'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 7 for Henry Ford
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How long did it take to build a Model T after the assembly line?', 'Affordable cars common people', 'About one week', 'About 93 minutes', 'About 12 hours', 7
FROM red_white_who_individuals WHERE name = 'Henry Ford'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 8 for Henry Ford
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was the lowest price of a Model T?', 'Highland Park factory', '$500', '$260', '$850', 8
FROM red_white_who_individuals WHERE name = 'Henry Ford'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 9 for Henry Ford
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many Model Ts were sold total?', 'Anti-Semitic views controversial', 'About 5 million', 'About 25 million', 'About 15 million', 9
FROM red_white_who_individuals WHERE name = 'Henry Ford'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 10 for Henry Ford
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What is Ford''s lasting legacy?', 'Changed American transportation', 'Making cars affordable for everyone', 'Inventing the automobile', 'Creating the assembly line', 10
FROM red_white_who_individuals WHERE name = 'Henry Ford'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;


-- Individual: Eleanor Roosevelt
INSERT INTO red_white_who_individuals (name, birth_year, death_year, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery_1, photo_gallery_2, photo_gallery_3, photo_gallery_4, photo_gallery_5, photo_gallery_6, photo_gallery_7, photo_gallery_8, photo_gallery_9, photo_gallery_10)
VALUES (
  'Eleanor Roosevelt',
  1884,
  1962,
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
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50320003200/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50320103201/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50320203202/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50320303203/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50320403204/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50320503205/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50320603206/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50320703207/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50320803208/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50320903209/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50321003210/full/pct:25/0/default.jpg'
)
ON CONFLICT (name) DO UPDATE SET
  birth_year = EXCLUDED.birth_year,
  death_year = EXCLUDED.death_year,
  key_events = EXCLUDED.key_events,
  key_facts = EXCLUDED.key_facts,
  biographical_summary = EXCLUDED.biographical_summary,
  main_photo_url = EXCLUDED.main_photo_url,
  photo_gallery_1 = EXCLUDED.photo_gallery_1,
  photo_gallery_2 = EXCLUDED.photo_gallery_2,
  photo_gallery_3 = EXCLUDED.photo_gallery_3,
  photo_gallery_4 = EXCLUDED.photo_gallery_4,
  photo_gallery_5 = EXCLUDED.photo_gallery_5,
  photo_gallery_6 = EXCLUDED.photo_gallery_6,
  photo_gallery_7 = EXCLUDED.photo_gallery_7,
  photo_gallery_8 = EXCLUDED.photo_gallery_8,
  photo_gallery_9 = EXCLUDED.photo_gallery_9,
  photo_gallery_10 = EXCLUDED.photo_gallery_10,
  updated_at = NOW();

-- Question 1 for Eleanor Roosevelt
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Eleanor Roosevelt born?', 'New York City 1884', 'Hyde Park, New York', 'Albany, New York', 'Washington, D.C.', 1
FROM red_white_who_individuals WHERE name = 'Eleanor Roosevelt'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 2 for Eleanor Roosevelt
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who was Eleanor''s uncle?', 'Franklin D Roosevelt wife', 'Franklin Roosevelt', 'Theodore Roosevelt', 'Woodrow Wilson', 2
FROM red_white_who_individuals WHERE name = 'Eleanor Roosevelt'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 3 for Eleanor Roosevelt
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did Eleanor marry Franklin?', 'Redefined First Lady role', '1910', '1900', '1905', 3
FROM red_white_who_individuals WHERE name = 'Eleanor Roosevelt'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 4 for Eleanor Roosevelt
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Eleanor''s newspaper column called?', 'Great Depression activism', 'First Lady''s Column', 'Daily Reflections', 'My Day', 4
FROM red_white_who_individuals WHERE name = 'Eleanor Roosevelt'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 5 for Eleanor Roosevelt
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Why did Eleanor resign from the Daughters of the American Revolution?', 'World War II morale', 'They refused membership to Black women', 'They refused to admit Black singer Marian Anderson', 'They supported segregation', 5
FROM red_white_who_individuals WHERE name = 'Eleanor Roosevelt'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 6 for Eleanor Roosevelt
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What international organization did Eleanor serve?', 'United Nations Human Rights', 'League of Nations', 'Red Cross', 'United Nations', 6
FROM red_white_who_individuals WHERE name = 'Eleanor Roosevelt'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 7 for Eleanor Roosevelt
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What document did Eleanor help create at the UN?', 'Universal Declaration Human Rights', 'Charter of Human Rights', 'Universal Declaration of Human Rights', 'International Bill of Rights', 7
FROM red_white_who_individuals WHERE name = 'Eleanor Roosevelt'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 8 for Eleanor Roosevelt
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did President Truman call Eleanor?', 'My Day newspaper column', 'First Lady of the World', 'Greatest First Lady', 'Champion of Human Rights', 8
FROM red_white_who_individuals WHERE name = 'Eleanor Roosevelt'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 9 for Eleanor Roosevelt
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What disease paralyzed Franklin in 1921?', 'Civil rights advocate', 'Multiple sclerosis', 'Tuberculosis', 'Polio', 9
FROM red_white_who_individuals WHERE name = 'Eleanor Roosevelt'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 10 for Eleanor Roosevelt
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What made Eleanor unique regarding press conferences?', 'Women''s rights champion', 'She only allowed female reporters', 'She refused to answer political questions', 'She held them daily', 10
FROM red_white_who_individuals WHERE name = 'Eleanor Roosevelt'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;


-- Individual: Paul Revere
INSERT INTO red_white_who_individuals (name, birth_year, death_year, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery_1, photo_gallery_2, photo_gallery_3, photo_gallery_4, photo_gallery_5, photo_gallery_6, photo_gallery_7, photo_gallery_8, photo_gallery_9, photo_gallery_10)
VALUES (
  'Paul Revere',
  1735,
  1818,
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
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10103300/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10103301/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10103302/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10103303/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10103304/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10103305/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10103306/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10103307/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10103308/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10103309/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10103310/full/pct:25/0/default.jpg'
)
ON CONFLICT (name) DO UPDATE SET
  birth_year = EXCLUDED.birth_year,
  death_year = EXCLUDED.death_year,
  key_events = EXCLUDED.key_events,
  key_facts = EXCLUDED.key_facts,
  biographical_summary = EXCLUDED.biographical_summary,
  main_photo_url = EXCLUDED.main_photo_url,
  photo_gallery_1 = EXCLUDED.photo_gallery_1,
  photo_gallery_2 = EXCLUDED.photo_gallery_2,
  photo_gallery_3 = EXCLUDED.photo_gallery_3,
  photo_gallery_4 = EXCLUDED.photo_gallery_4,
  photo_gallery_5 = EXCLUDED.photo_gallery_5,
  photo_gallery_6 = EXCLUDED.photo_gallery_6,
  photo_gallery_7 = EXCLUDED.photo_gallery_7,
  photo_gallery_8 = EXCLUDED.photo_gallery_8,
  photo_gallery_9 = EXCLUDED.photo_gallery_9,
  photo_gallery_10 = EXCLUDED.photo_gallery_10,
  updated_at = NOW();

-- Question 1 for Paul Revere
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Paul Revere born?', 'Boston Massachusetts 1734', 'Lexington, Massachusetts', 'Concord, Massachusetts', 'Boston, Massachusetts', 1
FROM red_white_who_individuals WHERE name = 'Paul Revere'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 2 for Paul Revere
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What craft was Revere skilled at?', 'Silversmith artisan craftsman', 'Blacksmith', 'Printer', 'Silversmith', 2
FROM red_white_who_individuals WHERE name = 'Paul Revere'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 3 for Paul Revere
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What group did Revere belong to?', 'Sons of Liberty member', 'Minutemen', 'Continental Army', 'Sons of Liberty', 3
FROM red_white_who_individuals WHERE name = 'Paul Revere'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 4 for Paul Revere
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What famous 1773 event did Revere participate in?', 'Boston Tea Party participant', 'The Stamp Act protests', 'The Boston Massacre', 'The Boston Tea Party', 4
FROM red_white_who_individuals WHERE name = 'Paul Revere'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 5 for Paul Revere
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What date was Revere''s midnight ride?', 'Midnight Ride April 1775', 'April 15, 1775', 'April 19, 1775', 'April 18, 1775', 5
FROM red_white_who_individuals WHERE name = 'Paul Revere'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 6 for Paul Revere
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What signal was used from Old North Church?', 'Lexington Concord alarm', 'Three lanterns for land, sea, or both', 'One if by land, two if by sea', 'Red for danger, white for safe', 6
FROM red_white_who_individuals WHERE name = 'Paul Revere'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 7 for Paul Revere
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What warning did Revere call out?', 'British are coming warning', 'To arms, to arms', 'The British are coming', 'The Redcoats are coming', 7
FROM red_white_who_individuals WHERE name = 'Paul Revere'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 8 for Paul Revere
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What happened to Revere before reaching Concord?', 'Old North Church signals', 'He was killed in battle', 'He made it to Concord', 'He was captured by British patrol', 8
FROM red_white_who_individuals WHERE name = 'Paul Revere'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 9 for Paul Revere
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What poet made Revere famous?', 'Revolutionary War patriot', 'Ralph Waldo Emerson', 'Walt Whitman', 'Henry Wadsworth Longfellow', 9
FROM red_white_who_individuals WHERE name = 'Paul Revere'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 10 for Paul Revere
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was the title of the famous poem?', 'Boston Massacre engraving', 'The Midnight Ride', 'Paul Revere''s Ride', 'The Call to Arms', 10
FROM red_white_who_individuals WHERE name = 'Paul Revere'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;


-- Individual: James Madison
INSERT INTO red_white_who_individuals (name, birth_year, death_year, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery_1, photo_gallery_2, photo_gallery_3, photo_gallery_4, photo_gallery_5, photo_gallery_6, photo_gallery_7, photo_gallery_8, photo_gallery_9, photo_gallery_10)
VALUES (
  'James Madison',
  1751,
  1836,
  ARRAY['Father of the Constitution and Bill of Rights'],
  '{"notes":"Born in Virginia; Princeton graduate; Chief architect of Constitution; Primary author of Bill of Rights; Co-authored Federalist Papers; Fourth President (1809-1817); Led nation through War of 1812"}',
  'James Madison is called the Father of the Constitution for his central role in creating America''s framework of government. He also wrote the Bill of Rights. Madison was born on March 16, 1751, in Virginia. He was a sickly child who found refuge in books. He attended Princeton, completing a four-year course in two years. Madison became convinced the Articles of Confederation were too weak. At the Constitutional Convention in 1787, he arrived with a detailed plan. Madison shaped the Constitution''s key features: separation of powers, checks and balances, and federalism. With Hamilton and Jay, Madison wrote the Federalist Papers defending the Constitution. Madison served in Congress, where he wrote the Bill of Rights, the first ten amendments protecting individual liberties. Madison served as Jefferson''s Secretary of State, then was elected fourth President. The War of 1812 dominated his presidency. British forces burned Washington, D.C., in 1814. Madison retired to Montpelier, his Virginia home. He was the last surviving signer of the Constitution when he died on June 28, 1836.',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20103400/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20103401/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20103402/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20103403/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20103404/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20103405/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20103406/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20103407/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20103408/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20103409/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20103410/full/pct:25/0/default.jpg'
)
ON CONFLICT (name) DO UPDATE SET
  birth_year = EXCLUDED.birth_year,
  death_year = EXCLUDED.death_year,
  key_events = EXCLUDED.key_events,
  key_facts = EXCLUDED.key_facts,
  biographical_summary = EXCLUDED.biographical_summary,
  main_photo_url = EXCLUDED.main_photo_url,
  photo_gallery_1 = EXCLUDED.photo_gallery_1,
  photo_gallery_2 = EXCLUDED.photo_gallery_2,
  photo_gallery_3 = EXCLUDED.photo_gallery_3,
  photo_gallery_4 = EXCLUDED.photo_gallery_4,
  photo_gallery_5 = EXCLUDED.photo_gallery_5,
  photo_gallery_6 = EXCLUDED.photo_gallery_6,
  photo_gallery_7 = EXCLUDED.photo_gallery_7,
  photo_gallery_8 = EXCLUDED.photo_gallery_8,
  photo_gallery_9 = EXCLUDED.photo_gallery_9,
  photo_gallery_10 = EXCLUDED.photo_gallery_10,
  updated_at = NOW();

-- Question 1 for James Madison
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was James Madison born?', 'Port Conway Virginia 1751', 'Richmond, Virginia', 'Charlottesville, Virginia', 'Port Conway, Virginia', 1
FROM red_white_who_individuals WHERE name = 'James Madison'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 2 for James Madison
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What college did Madison attend?', 'Princeton University education', 'Harvard', 'William and Mary', 'Princeton', 2
FROM red_white_who_individuals WHERE name = 'James Madison'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 3 for James Madison
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What nickname did Madison earn for his role with the Constitution?', 'Father of Constitution nickname', 'Father of the Revolution', 'Father of Independence', 'Father of the Constitution', 3
FROM red_white_who_individuals WHERE name = 'James Madison'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 4 for James Madison
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What famous essays did Madison co-write?', 'Virginia Plan Constitutional Convention', 'The Anti-Federalist Papers', 'The Virginia Plan', 'The Federalist Papers', 4
FROM red_white_who_individuals WHERE name = 'James Madison'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 5 for James Madison
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Madison write to protect individual liberties?', 'Federalist Papers co-author', 'The Constitution', 'The Declaration of Rights', 'The Bill of Rights', 5
FROM red_white_who_individuals WHERE name = 'James Madison'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 6 for James Madison
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What war dominated Madison''s presidency?', 'Bill of Rights architect', 'Revolutionary War', 'Mexican-American War', 'War of 1812', 6
FROM red_white_who_individuals WHERE name = 'James Madison'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 7 for James Madison
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What happened to Washington, D.C. in 1814?', 'Fourth President 1809-1817', 'The Capitol was destroyed', 'The White House was burned', 'Madison was captured', 7
FROM red_white_who_individuals WHERE name = 'James Madison'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 8 for James Madison
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Madison''s Virginia home called?', 'War of 1812 leadership', 'Mount Vernon', 'Monticello', 'Montpelier', 8
FROM red_white_who_individuals WHERE name = 'James Madison'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 9 for James Madison
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What distinction did Madison hold when he died?', 'Democratic-Republican Party founder', 'Oldest living Founding Father', 'Last surviving signer of Declaration', 'Last surviving Framer of Constitution', 9
FROM red_white_who_individuals WHERE name = 'James Madison'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 10 for James Madison
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did Madison die?', 'Montpelier Virginia plantation', '1830', '1840', '1836', 10
FROM red_white_who_individuals WHERE name = 'James Madison'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;


-- Individual: Patrick Henry
INSERT INTO red_white_who_individuals (name, birth_year, death_year, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery_1, photo_gallery_2, photo_gallery_3, photo_gallery_4, photo_gallery_5, photo_gallery_6, photo_gallery_7, photo_gallery_8, photo_gallery_9, photo_gallery_10)
VALUES (
  'Patrick Henry',
  1736,
  1799,
  ARRAY['Patriot orator known for Give me liberty or give me death'],
  '{"notes":"Born in Virginia; Self-taught lawyer; Powerful speaker against British policies; Famous Give me liberty speech (1775); Governor of Virginia; Demanded Bill of Rights"}',
  'Patrick Henry was one of the Revolution''s most powerful voices. His stirring speeches helped inspire Americans to fight for independence. Henry was born on May 29, 1736, in Virginia. He failed at farming and storekeeping before teaching himself law. He became a brilliant lawyer and speaker. Henry first gained fame in 1765 arguing against the Stamp Act. He challenged British authority so boldly that some called it treason. Henry replied, "If this be treason, make the most of it!" His most famous speech came on March 23, 1775. With war approaching, Henry urged Virginia to arm itself. He ended with words that echoed through history: "Is life so dear, or peace so sweet, as to be purchased at the price of chains and slavery? Forbid it, Almighty God! I know not what course others may take; but as for me, give me liberty or give me death!" Henry served as Virginia''s first governor after independence. Later, he opposed the Constitution, fearing it gave too much power to the federal government. He demanded a Bill of Rights to protect individual liberties. Patrick Henry died on June 6, 1799.',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50350003500/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50350103501/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50350203502/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50350303503/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50350403504/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50350503505/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50350603506/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50350703507/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50350803508/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50350903509/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50351003510/full/pct:25/0/default.jpg'
)
ON CONFLICT (name) DO UPDATE SET
  birth_year = EXCLUDED.birth_year,
  death_year = EXCLUDED.death_year,
  key_events = EXCLUDED.key_events,
  key_facts = EXCLUDED.key_facts,
  biographical_summary = EXCLUDED.biographical_summary,
  main_photo_url = EXCLUDED.main_photo_url,
  photo_gallery_1 = EXCLUDED.photo_gallery_1,
  photo_gallery_2 = EXCLUDED.photo_gallery_2,
  photo_gallery_3 = EXCLUDED.photo_gallery_3,
  photo_gallery_4 = EXCLUDED.photo_gallery_4,
  photo_gallery_5 = EXCLUDED.photo_gallery_5,
  photo_gallery_6 = EXCLUDED.photo_gallery_6,
  photo_gallery_7 = EXCLUDED.photo_gallery_7,
  photo_gallery_8 = EXCLUDED.photo_gallery_8,
  photo_gallery_9 = EXCLUDED.photo_gallery_9,
  photo_gallery_10 = EXCLUDED.photo_gallery_10,
  updated_at = NOW();

-- Question 1 for Patrick Henry
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Patrick Henry born?', 'Hanover County Virginia 1736', 'Richmond, Virginia', 'Williamsburg, Virginia', 'Hanover County, Virginia', 1
FROM red_white_who_individuals WHERE name = 'Patrick Henry'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 2 for Patrick Henry
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What profession did Henry teach himself?', 'Give me liberty death speech', 'Farmer', 'Merchant', 'Lawyer', 2
FROM red_white_who_individuals WHERE name = 'Patrick Henry'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 3 for Patrick Henry
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What tax did Henry first speak against?', 'Virginia House Burgesses', 'Townshend Acts', 'Tea Act', 'Stamp Act', 3
FROM red_white_who_individuals WHERE name = 'Patrick Henry'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 4 for Patrick Henry
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Henry say about treason?', 'Anti-Federalist Constitution opponent', 'I have nothing to declare but my genius', 'Give me liberty or give me death', 'If this be treason, make the most of it', 4
FROM red_white_who_individuals WHERE name = 'Patrick Henry'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 5 for Patrick Henry
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did Henry give his most famous speech?', 'Virginia ratifying convention', 'March 23, 1775', 'July 4, 1776', 'December 16, 1773', 5
FROM red_white_who_individuals WHERE name = 'Patrick Henry'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 6 for Patrick Henry
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What is the most famous line from that speech?', 'States rights advocate', 'Don''t tread on me', 'United we stand, divided we fall', 'Give me liberty, or give me death', 6
FROM red_white_who_individuals WHERE name = 'Patrick Henry'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 7 for Patrick Henry
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What position did Henry hold in Virginia?', 'Stamp Act opposition', 'Senator', 'Congressman', 'Governor', 7
FROM red_white_who_individuals WHERE name = 'Patrick Henry'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 8 for Patrick Henry
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Why did Henry oppose the Constitution?', 'Revolutionary rhetoric', 'It gave too much power to the President', 'It lacked a Bill of Rights', 'It created too many taxes', 8
FROM red_white_who_individuals WHERE name = 'Patrick Henry'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 9 for Patrick Henry
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Henry demand be added to the Constitution?', 'Virginia Governor five terms', 'The Declaration of Independence', 'A weaker federal government', 'A Bill of Rights', 9
FROM red_white_who_individuals WHERE name = 'Patrick Henry'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 10 for Patrick Henry
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did Patrick Henry die?', 'Individual liberty champion', '1789', '1803', '1799', 10
FROM red_white_who_individuals WHERE name = 'Patrick Henry'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;


-- Individual: John Hancock
INSERT INTO red_white_who_individuals (name, birth_year, death_year, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery_1, photo_gallery_2, photo_gallery_3, photo_gallery_4, photo_gallery_5, photo_gallery_6, photo_gallery_7, photo_gallery_8, photo_gallery_9, photo_gallery_10)
VALUES (
  'John Hancock',
  1737,
  1793,
  ARRAY['President of Continental Congress with famous signature'],
  '{"notes":"Born in Massachusetts; Wealthy merchant; President of Continental Congress; First and largest signature on Declaration; Governor of Massachusetts; Phrase John Hancock means signature"}',
  'John Hancock was a wealthy patriot whose large, bold signature on the Declaration of Independence made him famous. His name became a synonym for signature itself. Hancock was born on January 23, 1737, in Massachusetts. Raised by a wealthy uncle, he inherited a fortune and became one of America''s richest men. He used his wealth to support the patriot cause. British officials targeted Hancock for tax evasion, trying to seize his ship. This made him more committed to independence. He became president of the Continental Congress in 1775. On August 2, 1776, Hancock was the first to sign the Declaration of Independence. His signature was so large and bold that it dominates the document. Legend says he wanted King George to read it without glasses. Hancock served as governor of Massachusetts and helped ensure the state ratified the Constitution. John Hancock died on October 8, 1793. Today, John Hancock is a common phrase meaning signature.',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50360003600/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50360103601/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50360203602/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50360303603/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50360403604/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50360503605/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50360603606/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50360703607/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50360803608/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50360903609/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50361003610/full/pct:25/0/default.jpg'
)
ON CONFLICT (name) DO UPDATE SET
  birth_year = EXCLUDED.birth_year,
  death_year = EXCLUDED.death_year,
  key_events = EXCLUDED.key_events,
  key_facts = EXCLUDED.key_facts,
  biographical_summary = EXCLUDED.biographical_summary,
  main_photo_url = EXCLUDED.main_photo_url,
  photo_gallery_1 = EXCLUDED.photo_gallery_1,
  photo_gallery_2 = EXCLUDED.photo_gallery_2,
  photo_gallery_3 = EXCLUDED.photo_gallery_3,
  photo_gallery_4 = EXCLUDED.photo_gallery_4,
  photo_gallery_5 = EXCLUDED.photo_gallery_5,
  photo_gallery_6 = EXCLUDED.photo_gallery_6,
  photo_gallery_7 = EXCLUDED.photo_gallery_7,
  photo_gallery_8 = EXCLUDED.photo_gallery_8,
  photo_gallery_9 = EXCLUDED.photo_gallery_9,
  photo_gallery_10 = EXCLUDED.photo_gallery_10,
  updated_at = NOW();

-- Question 1 for John Hancock
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was John Hancock born?', 'Braintree Massachusetts 1737', 'Boston, Massachusetts', 'Lexington, Massachusetts', 'Braintree, Massachusetts', 1
FROM red_white_who_individuals WHERE name = 'John Hancock'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 2 for John Hancock
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How did Hancock become wealthy?', 'Harvard College education', 'He earned it through trade', 'He won a lottery', 'He inherited it from his uncle', 2
FROM red_white_who_individuals WHERE name = 'John Hancock'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 3 for John Hancock
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What position did Hancock hold in the Continental Congress?', 'Boston merchant wealthy', 'Secretary', 'Vice President', 'President', 3
FROM red_white_who_individuals WHERE name = 'John Hancock'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 4 for John Hancock
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did Hancock sign the Declaration?', 'Continental Congress president', 'July 4, 1776', 'August 2, 1776', 'July 2, 1776', 4
FROM red_white_who_individuals WHERE name = 'John Hancock'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 5 for John Hancock
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was special about Hancock''s signature?', 'Declaration Independence large signature', 'It was the first signature', 'It was the largest and boldest', 'It was in the center', 5
FROM red_white_who_individuals WHERE name = 'John Hancock'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 6 for John Hancock
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Why did legend say Hancock signed so large?', 'Sons of Liberty financial support', 'To show his defiance', 'So King George could read it without glasses', 'To take up more space', 6
FROM red_white_who_individuals WHERE name = 'John Hancock'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 7 for John Hancock
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What state did Hancock serve as governor?', 'Boston Tea Party supporter', 'Virginia', 'New York', 'Massachusetts', 7
FROM red_white_who_individuals WHERE name = 'John Hancock'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 8 for John Hancock
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What does John Hancock mean today?', 'Massachusetts Governor', 'A signature', 'A type of handshake', 'An insurance policy', 8
FROM red_white_who_individuals WHERE name = 'John Hancock'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 9 for John Hancock
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did Hancock die?', 'Revolutionary War funding', '1785', '1800', '1793', 9
FROM red_white_who_individuals WHERE name = 'John Hancock'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 10 for John Hancock
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What caused the British to target Hancock?', 'Hancock Insurance legacy', 'He refused to pay taxes', 'His ship was seized for smuggling', 'He protested British goods', 10
FROM red_white_who_individuals WHERE name = 'John Hancock'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;


-- Individual: Samuel Adams
INSERT INTO red_white_who_individuals (name, birth_year, death_year, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery_1, photo_gallery_2, photo_gallery_3, photo_gallery_4, photo_gallery_5, photo_gallery_6, photo_gallery_7, photo_gallery_8, photo_gallery_9, photo_gallery_10)
VALUES (
  'Samuel Adams',
  1722,
  1803,
  ARRAY['Organizer of colonial resistance'],
  '{"notes":"Born in Boston; Organized resistance to British taxes; Founded Sons of Liberty; Planned Boston Tea Party; Signed Declaration of Independence; Called Father of the American Revolution"}',
  'Samuel Adams was a master organizer who helped spark the American Revolution. He organized protests, created revolutionary networks, and kept pressure on until independence was won. Adams was born on September 27, 1722, in Boston. He failed at business but excelled at politics. Adams organized opposition to British taxes, helping create the Sons of Liberty. He orchestrated the Boston Tea Party in 1773, when patriots dumped British tea into the harbor. Adams used every British action to stir up opposition. He created committees of correspondence that spread revolutionary ideas throughout the colonies. When British troops killed five colonists in the Boston Massacre, Adams made sure the story spread everywhere. In the Continental Congress, Adams pushed relentlessly for independence. He signed the Declaration and worked to support the war effort. After the Revolution, Adams served as governor of Massachusetts. Samuel Adams died on October 2, 1803. Thomas Jefferson called him truly the Man of the Revolution.',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50370003700/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50370103701/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50370203702/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50370303703/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50370403704/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50370503705/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50370603706/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50370703707/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50370803708/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50370903709/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50371003710/full/pct:25/0/default.jpg'
)
ON CONFLICT (name) DO UPDATE SET
  birth_year = EXCLUDED.birth_year,
  death_year = EXCLUDED.death_year,
  key_events = EXCLUDED.key_events,
  key_facts = EXCLUDED.key_facts,
  biographical_summary = EXCLUDED.biographical_summary,
  main_photo_url = EXCLUDED.main_photo_url,
  photo_gallery_1 = EXCLUDED.photo_gallery_1,
  photo_gallery_2 = EXCLUDED.photo_gallery_2,
  photo_gallery_3 = EXCLUDED.photo_gallery_3,
  photo_gallery_4 = EXCLUDED.photo_gallery_4,
  photo_gallery_5 = EXCLUDED.photo_gallery_5,
  photo_gallery_6 = EXCLUDED.photo_gallery_6,
  photo_gallery_7 = EXCLUDED.photo_gallery_7,
  photo_gallery_8 = EXCLUDED.photo_gallery_8,
  photo_gallery_9 = EXCLUDED.photo_gallery_9,
  photo_gallery_10 = EXCLUDED.photo_gallery_10,
  updated_at = NOW();

-- Question 1 for Samuel Adams
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Samuel Adams born?', 'Boston Massachusetts 1722', 'Plymouth, Massachusetts', 'Braintree, Massachusetts', 'Boston, Massachusetts', 1
FROM red_white_who_individuals WHERE name = 'Samuel Adams'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 2 for Samuel Adams
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What group did Adams help found?', 'Harvard College cousin John', 'Minutemen', 'Continental Army', 'Sons of Liberty', 2
FROM red_white_who_individuals WHERE name = 'Samuel Adams'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 3 for Samuel Adams
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What 1773 event did Adams help plan?', 'Boston Tea Party organizer', 'The Stamp Act riots', 'The Boston Massacre', 'The Boston Tea Party', 3
FROM red_white_who_individuals WHERE name = 'Samuel Adams'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 4 for Samuel Adams
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did committees of correspondence do?', 'Sons of Liberty founding', 'Organized protests throughout colonies', 'Delivered newspapers', 'Spread revolutionary ideas', 4
FROM red_white_who_individuals WHERE name = 'Samuel Adams'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 5 for Samuel Adams
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What event did Adams publicize?', 'Committees Correspondence creator', 'The Intolerable Acts', 'The Stamp Act passage', 'The Boston Massacre', 5
FROM red_white_who_individuals WHERE name = 'Samuel Adams'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 6 for Samuel Adams
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What document did Adams sign in 1776?', 'Boston Massacre propaganda', 'The Constitution', 'The Declaration of Independence', 'The Articles of Confederation', 6
FROM red_white_who_individuals WHERE name = 'Samuel Adams'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 7 for Samuel Adams
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What position did Adams hold in Massachusetts?', 'Anti-British agitator', 'Senator', 'Congressman', 'Governor', 7
FROM red_white_who_individuals WHERE name = 'Samuel Adams'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 8 for Samuel Adams
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Thomas Jefferson call Adams?', 'Continental Congress delegate', 'Father of American Independence', 'Truly the Man of the Revolution', 'Leader of Liberty', 8
FROM red_white_who_individuals WHERE name = 'Samuel Adams'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 9 for Samuel Adams
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did Samuel Adams die?', 'Massachusetts ratifying convention', '1800', '1810', '1803', 9
FROM red_white_who_individuals WHERE name = 'Samuel Adams'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 10 for Samuel Adams
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Adams''s greatest skill?', 'Revolutionary movement catalyst', 'Public speaking', 'Writing pamphlets', 'Organizing and agitating', 10
FROM red_white_who_individuals WHERE name = 'Samuel Adams'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;


-- Individual: Robert E. Lee
INSERT INTO red_white_who_individuals (name, birth_year, death_year, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery_1, photo_gallery_2, photo_gallery_3, photo_gallery_4, photo_gallery_5, photo_gallery_6, photo_gallery_7, photo_gallery_8, photo_gallery_9, photo_gallery_10)
VALUES (
  'Robert E. Lee',
  1807,
  1870,
  ARRAY['Commanding General of Confederate Army'],
  '{"notes":"Born in Virginia; Graduated second at West Point; Declined command of Union Army; Led Confederate Army of Northern Virginia; Surrendered at Appomattox"}',
  'Robert E. Lee was the most famous Confederate general. He was considered one of the finest military minds in history, yet he chose to fight against the United States. Lee was born on January 19, 1807, in Virginia. His father was Light Horse Harry Lee, a Revolutionary War hero. Robert graduated second in his class at West Point. When Southern states seceded, Lee faced an agonizing choice. He opposed secession but felt he could not fight against his home state of Virginia. President Lincoln offered Lee command of the Union Army. Lee declined and joined Virginia''s forces. Lee was a brilliant general who often defeated larger Union armies. But his army lost crucial battles at Gettysburg and was worn down by the Union''s greater resources. On April 9, 1865, Lee surrendered to Grant at Appomattox Court House. After the war, Lee became president of Washington College. He died on October 12, 1870.',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10103800/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10103801/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10103802/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10103803/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10103804/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10103805/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10103806/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10103807/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10103808/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10103809/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10103810/full/pct:25/0/default.jpg'
)
ON CONFLICT (name) DO UPDATE SET
  birth_year = EXCLUDED.birth_year,
  death_year = EXCLUDED.death_year,
  key_events = EXCLUDED.key_events,
  key_facts = EXCLUDED.key_facts,
  biographical_summary = EXCLUDED.biographical_summary,
  main_photo_url = EXCLUDED.main_photo_url,
  photo_gallery_1 = EXCLUDED.photo_gallery_1,
  photo_gallery_2 = EXCLUDED.photo_gallery_2,
  photo_gallery_3 = EXCLUDED.photo_gallery_3,
  photo_gallery_4 = EXCLUDED.photo_gallery_4,
  photo_gallery_5 = EXCLUDED.photo_gallery_5,
  photo_gallery_6 = EXCLUDED.photo_gallery_6,
  photo_gallery_7 = EXCLUDED.photo_gallery_7,
  photo_gallery_8 = EXCLUDED.photo_gallery_8,
  photo_gallery_9 = EXCLUDED.photo_gallery_9,
  photo_gallery_10 = EXCLUDED.photo_gallery_10,
  updated_at = NOW();

-- Question 1 for Robert E. Lee
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Robert E. Lee born?', 'Westmoreland County Virginia 1807', 'Richmond, Virginia', 'Arlington, Virginia', 'Westmoreland County, Virginia', 1
FROM red_white_who_individuals WHERE name = 'Robert E. Lee'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 2 for Robert E. Lee
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who was Lee''s famous father?', 'West Point Military Academy', 'George Washington', 'Light Horse Harry Lee', 'Thomas Jefferson', 2
FROM red_white_who_individuals WHERE name = 'Robert E. Lee'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 3 for Robert E. Lee
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Lee''s rank at West Point?', 'Mexican-American War hero', 'First in his class', 'Third in his class', 'Second in his class', 3
FROM red_white_who_individuals WHERE name = 'Robert E. Lee'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 4 for Robert E. Lee
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What job did Lincoln offer Lee?', 'Arlington plantation family', 'Secretary of War', 'Command of the Union Army', 'Ambassador to England', 4
FROM red_white_who_individuals WHERE name = 'Robert E. Lee'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 5 for Robert E. Lee
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Why did Lee decline?', 'Resigned U.S. Army', 'He supported the Confederacy', 'He couldn''t fight against Virginia', 'He opposed Lincoln', 5
FROM red_white_who_individuals WHERE name = 'Robert E. Lee'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 6 for Robert E. Lee
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What Confederate army did Lee command?', 'Confederate States Army commander', 'Army of the Potomac', 'Confederate States Army', 'Army of Northern Virginia', 6
FROM red_white_who_individuals WHERE name = 'Robert E. Lee'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 7 for Robert E. Lee
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What battle was a turning point against Lee?', 'Virginia secession reluctant', 'Antietam', 'Fredericksburg', 'Gettysburg', 7
FROM red_white_who_individuals WHERE name = 'Robert E. Lee'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 8 for Robert E. Lee
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where did Lee surrender?', 'Military genius tactician', 'Richmond, Virginia', 'Washington, D.C.', 'Appomattox Court House', 8
FROM red_white_who_individuals WHERE name = 'Robert E. Lee'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 9 for Robert E. Lee
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Lee do after the war?', 'Appomattox surrender 1865', 'Went into exile', 'Became a college president', 'Returned to his plantation', 9
FROM red_white_who_individuals WHERE name = 'Robert E. Lee'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 10 for Robert E. Lee
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did Lee die?', 'Washington College president', '1865', '1875', '1870', 10
FROM red_white_who_individuals WHERE name = 'Robert E. Lee'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;


-- Individual: Andrew Jackson
INSERT INTO red_white_who_individuals (name, birth_year, death_year, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery_1, photo_gallery_2, photo_gallery_3, photo_gallery_4, photo_gallery_5, photo_gallery_6, photo_gallery_7, photo_gallery_8, photo_gallery_9, photo_gallery_10)
VALUES (
  'Andrew Jackson',
  1767,
  1845,
  ARRAY['War hero and seventh President'],
  '{"notes":"Born in the Carolinas; Fought in Revolutionary War as boy; Hero of Battle of New Orleans; Seventh President (1829-1837); Expanded voting rights; Controversial Indian Removal Act"}',
  'Andrew Jackson was a war hero and president who expanded democracy while making deeply controversial decisions about Native Americans. Jackson was born on March 15, 1767, in the Carolina backcountry. During the Revolutionary War, thirteen-year-old Andrew served as a courier and was captured by the British. Jackson became a lawyer and politician in Tennessee. He earned fame as a military hero at the Battle of New Orleans in January 1815. Jackson was elected president in 1828. He believed in expanding democracy for white men and supported eliminating property requirements for voting. However, Jackson''s Indian Removal Act of 1830 forced Native American tribes to leave their homelands. Thousands died on the Trail of Tears. This remains one of the darkest chapters in American history. Jackson died on June 8, 1845. His legacy is complicated: he expanded democracy for some while causing tremendous suffering for others.',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20103900/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20103901/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20103902/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20103903/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20103904/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20103905/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20103906/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20103907/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20103908/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20103909/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20103910/full/pct:25/0/default.jpg'
)
ON CONFLICT (name) DO UPDATE SET
  birth_year = EXCLUDED.birth_year,
  death_year = EXCLUDED.death_year,
  key_events = EXCLUDED.key_events,
  key_facts = EXCLUDED.key_facts,
  biographical_summary = EXCLUDED.biographical_summary,
  main_photo_url = EXCLUDED.main_photo_url,
  photo_gallery_1 = EXCLUDED.photo_gallery_1,
  photo_gallery_2 = EXCLUDED.photo_gallery_2,
  photo_gallery_3 = EXCLUDED.photo_gallery_3,
  photo_gallery_4 = EXCLUDED.photo_gallery_4,
  photo_gallery_5 = EXCLUDED.photo_gallery_5,
  photo_gallery_6 = EXCLUDED.photo_gallery_6,
  photo_gallery_7 = EXCLUDED.photo_gallery_7,
  photo_gallery_8 = EXCLUDED.photo_gallery_8,
  photo_gallery_9 = EXCLUDED.photo_gallery_9,
  photo_gallery_10 = EXCLUDED.photo_gallery_10,
  updated_at = NOW();

-- Question 1 for Andrew Jackson
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Andrew Jackson born?', 'Carolinas border region 1767', 'Tennessee', 'Virginia', 'The Carolinas border region', 1
FROM red_white_who_individuals WHERE name = 'Andrew Jackson'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 2 for Andrew Jackson
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How old was Jackson in the Revolutionary War?', 'Orphaned Revolutionary War', '15 years old', '10 years old', '13 years old', 2
FROM red_white_who_individuals WHERE name = 'Andrew Jackson'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 3 for Andrew Jackson
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What battle made Jackson a hero?', 'Tennessee frontier lawyer', 'Battle of Tippecanoe', 'Battle of Horseshoe Bend', 'Battle of New Orleans', 3
FROM red_white_who_individuals WHERE name = 'Andrew Jackson'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 4 for Andrew Jackson
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When was Jackson elected president?', 'War of 1812 hero', '1824', '1832', '1828', 4
FROM red_white_who_individuals WHERE name = 'Andrew Jackson'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 5 for Andrew Jackson
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How did Jackson expand democracy?', 'Battle New Orleans victory', 'Ended slavery in new territories', 'Eliminated property requirements for voting', 'Gave women the right to vote', 5
FROM red_white_who_individuals WHERE name = 'Andrew Jackson'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 6 for Andrew Jackson
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What controversial act did Jackson sign?', 'Seventh President 1829-1837', 'Fugitive Slave Act', 'Homestead Act', 'Indian Removal Act', 6
FROM red_white_who_individuals WHERE name = 'Andrew Jackson'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 7 for Andrew Jackson
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was the Trail of Tears?', 'Democratic Party founder', 'Voluntary relocation of Native Americans', 'Forced removal of Native Americans from their lands', 'A peace treaty with Native tribes', 7
FROM red_white_who_individuals WHERE name = 'Andrew Jackson'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 8 for Andrew Jackson
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What nickname did Jackson have?', 'Indian Removal Act', 'Iron Andrew', 'King Andrew', 'Old Hickory', 8
FROM red_white_who_individuals WHERE name = 'Andrew Jackson'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 9 for Andrew Jackson
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did Jackson die?', 'Spoils system politics', '1850', '1840', '1845', 9
FROM red_white_who_individuals WHERE name = 'Andrew Jackson'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 10 for Andrew Jackson
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Why is Jackson''s legacy complicated?', 'Old Hickory nickname', 'He expanded democracy but harmed Native Americans', 'He was only a military hero', 'He was completely good or bad', 10
FROM red_white_who_individuals WHERE name = 'Andrew Jackson'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;


-- Individual: John Muir
INSERT INTO red_white_who_individuals (name, birth_year, death_year, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery_1, photo_gallery_2, photo_gallery_3, photo_gallery_4, photo_gallery_5, photo_gallery_6, photo_gallery_7, photo_gallery_8, photo_gallery_9, photo_gallery_10)
VALUES (
  'John Muir',
  1838,
  1914,
  ARRAY['Naturalist who helped preserve wilderness'],
  '{"notes":"Born in Scotland; Explored Yosemite; Founded Sierra Club (1892); Convinced Roosevelt to protect wilderness; Father of National Parks"}',
  'John Muir was a naturalist who fell in love with America''s wild places and dedicated his life to protecting them. He is called the Father of the National Parks. Muir was born on April 21, 1838, in Scotland. His family immigrated to Wisconsin when he was eleven. After a factory accident nearly blinded him, Muir decided to devote his life to studying nature. In 1868, he arrived in California and saw Yosemite Valley. He was overwhelmed by its beauty. Muir wrote articles and books describing wilderness wonders. In 1892, Muir founded the Sierra Club. He convinced President Theodore Roosevelt to expand protection of forests and parks. The two camped together in Yosemite in 1903. Thanks largely to Muir''s efforts, Yosemite, Sequoia, and other wilderness areas became national parks. John Muir died on December 24, 1914. His legacy lives on in the protected wilderness he loved.',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50400004000/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50400104001/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50400204002/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50400304003/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50400404004/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50400504005/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50400604006/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50400704007/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50400804008/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50400904009/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50401004010/full/pct:25/0/default.jpg'
)
ON CONFLICT (name) DO UPDATE SET
  birth_year = EXCLUDED.birth_year,
  death_year = EXCLUDED.death_year,
  key_events = EXCLUDED.key_events,
  key_facts = EXCLUDED.key_facts,
  biographical_summary = EXCLUDED.biographical_summary,
  main_photo_url = EXCLUDED.main_photo_url,
  photo_gallery_1 = EXCLUDED.photo_gallery_1,
  photo_gallery_2 = EXCLUDED.photo_gallery_2,
  photo_gallery_3 = EXCLUDED.photo_gallery_3,
  photo_gallery_4 = EXCLUDED.photo_gallery_4,
  photo_gallery_5 = EXCLUDED.photo_gallery_5,
  photo_gallery_6 = EXCLUDED.photo_gallery_6,
  photo_gallery_7 = EXCLUDED.photo_gallery_7,
  photo_gallery_8 = EXCLUDED.photo_gallery_8,
  photo_gallery_9 = EXCLUDED.photo_gallery_9,
  photo_gallery_10 = EXCLUDED.photo_gallery_10,
  updated_at = NOW();

-- Question 1 for John Muir
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was John Muir born?', 'Dunbar Scotland 1838', 'Wisconsin', 'California', 'Scotland', 1
FROM red_white_who_individuals WHERE name = 'John Muir'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 2 for John Muir
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What made Muir dedicate his life to nature?', 'Wisconsin farm childhood', 'A near-death hiking accident', 'A factory accident that nearly blinded him', 'The death of his father', 2
FROM red_white_who_individuals WHERE name = 'John Muir'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 3 for John Muir
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What California valley amazed Muir?', 'University Wisconsin studies', 'Sequoia Valley', 'Yellowstone', 'Yosemite Valley', 3
FROM red_white_who_individuals WHERE name = 'John Muir'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 4 for John Muir
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What organization did Muir found?', 'Yosemite Valley advocacy', 'National Parks Service', 'Audubon Society', 'Sierra Club', 4
FROM red_white_who_individuals WHERE name = 'John Muir'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 5 for John Muir
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Which president did Muir convince to protect wilderness?', 'Sierra Club founder president', 'William Howard Taft', 'Woodrow Wilson', 'Theodore Roosevelt', 5
FROM red_white_who_individuals WHERE name = 'John Muir'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 6 for John Muir
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where did Muir and Roosevelt camp?', 'Wilderness preservation philosophy', 'Yellowstone', 'Sequoia', 'Yosemite', 6
FROM red_white_who_individuals WHERE name = 'John Muir'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 7 for John Muir
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What nickname is Muir given?', 'National parks creation', 'Father of Conservation', 'Wilderness Man', 'Father of the National Parks', 7
FROM red_white_who_individuals WHERE name = 'John Muir'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 8 for John Muir
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did Muir die?', 'Theodore Roosevelt camping', '1920', '1904', '1914', 8
FROM red_white_who_individuals WHERE name = 'John Muir'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 9 for John Muir
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What valley did Muir explore extensively?', 'Nature writing influential', 'Sequoia Valley', 'Yellowstone', 'Yosemite', 9
FROM red_white_who_individuals WHERE name = 'John Muir'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 10 for John Muir
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What inspired Muir''s writings?', 'Environmental movement founder', 'His love of wilderness and nature', 'Scientific research', 'Political activism', 10
FROM red_white_who_individuals WHERE name = 'John Muir'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;


-- Individual: Mark Twain
INSERT INTO red_white_who_individuals (name, birth_year, death_year, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery_1, photo_gallery_2, photo_gallery_3, photo_gallery_4, photo_gallery_5, photo_gallery_6, photo_gallery_7, photo_gallery_8, photo_gallery_9, photo_gallery_10)
VALUES (
  'Mark Twain',
  1835,
  1910,
  ARRAY['Author of Tom Sawyer and Huckleberry Finn'],
  '{"notes":"Born in Missouri as Samuel Clemens; Worked as riverboat pilot; Wrote Tom Sawyer and Huckleberry Finn; America's greatest humorist; Called the Lincoln of American literature"}',
  'Mark Twain, whose real name was Samuel Clemens, was America''s greatest humorist and one of its finest writers. His books about Tom Sawyer and Huckleberry Finn captured American childhood and challenged the nation''s conscience. Samuel Clemens was born on November 30, 1835, in Florida, Missouri. His family moved to Hannibal, a town on the Mississippi River. The river and town would inspire his greatest works. As a young man, Clemens worked as a riverboat pilot on the Mississippi. His pen name Mark Twain came from a river term meaning two fathoms deep. The Adventures of Tom Sawyer (1876) drew on his Hannibal childhood. Adventures of Huckleberry Finn (1884) is considered one of the greatest American novels. Twain was also a sharp social critic. He attacked hypocrisy, greed, and injustice with wit. Mark Twain died on April 21, 1910. William Faulkner called him the father of American literature.',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50410004100/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50410104101/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50410204102/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50410304103/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50410404104/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50410504105/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50410604106/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50410704107/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50410804108/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50410904109/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50411004110/full/pct:25/0/default.jpg'
)
ON CONFLICT (name) DO UPDATE SET
  birth_year = EXCLUDED.birth_year,
  death_year = EXCLUDED.death_year,
  key_events = EXCLUDED.key_events,
  key_facts = EXCLUDED.key_facts,
  biographical_summary = EXCLUDED.biographical_summary,
  main_photo_url = EXCLUDED.main_photo_url,
  photo_gallery_1 = EXCLUDED.photo_gallery_1,
  photo_gallery_2 = EXCLUDED.photo_gallery_2,
  photo_gallery_3 = EXCLUDED.photo_gallery_3,
  photo_gallery_4 = EXCLUDED.photo_gallery_4,
  photo_gallery_5 = EXCLUDED.photo_gallery_5,
  photo_gallery_6 = EXCLUDED.photo_gallery_6,
  photo_gallery_7 = EXCLUDED.photo_gallery_7,
  photo_gallery_8 = EXCLUDED.photo_gallery_8,
  photo_gallery_9 = EXCLUDED.photo_gallery_9,
  photo_gallery_10 = EXCLUDED.photo_gallery_10,
  updated_at = NOW();

-- Question 1 for Mark Twain
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Mark Twain''s real name?', 'Florida Missouri 1835', 'Hartford, Connecticut', 'Hannibal, Missouri', 'Florida, Missouri', 1
FROM red_white_who_individuals WHERE name = 'Mark Twain'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 2 for Mark Twain
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was he born?', 'Mississippi River steamboat pilot', 'Nevada', 'Connecticut', 'Missouri', 2
FROM red_white_who_individuals WHERE name = 'Mark Twain'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 3 for Mark Twain
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What town inspired his works?', 'Samuel Clemens real name', 'St. Louis', 'New Orleans', 'Hannibal', 3
FROM red_white_who_individuals WHERE name = 'Mark Twain'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 4 for Mark Twain
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What job did Twain have before writing?', 'California gold rush journalism', 'Newspaper reporter', 'Steamboat pilot', 'Gold miner', 4
FROM red_white_who_individuals WHERE name = 'Mark Twain'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 5 for Mark Twain
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where did his pen name come from?', 'Adventures Tom Sawyer', 'A Mississippi steamboat term', 'His childhood nickname', 'A card game term', 5
FROM red_white_who_individuals WHERE name = 'Mark Twain'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 6 for Mark Twain
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What are his two most famous books?', 'Adventures Huckleberry Finn', 'Life on the Mississippi and A Connecticut Yankee', 'Tom Sawyer and Huckleberry Finn', 'The Prince and the Pauper and Pudd''nhead Wilson', 6
FROM red_white_who_individuals WHERE name = 'Mark Twain'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 7 for Mark Twain
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When was Huckleberry Finn published?', 'Connecticut Yankee satire', '1880', '1876', '1884', 7
FROM red_white_who_individuals WHERE name = 'Mark Twain'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 8 for Mark Twain
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Twain criticize?', 'Lecture circuit humorist', 'Slavery and politics', 'Hypocrisy and injustice', 'Religion and government', 8
FROM red_white_who_individuals WHERE name = 'Mark Twain'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 9 for Mark Twain
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did Twain die?', 'American literature father', '1900', '1915', '1910', 9
FROM red_white_who_individuals WHERE name = 'Mark Twain'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 10 for Mark Twain
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Faulkner call Twain?', 'Wit wisdom quotations', 'The grandfather of American literature', 'The father of American literature', 'The greatest American writer', 10
FROM red_white_who_individuals WHERE name = 'Mark Twain'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;


-- Individual: Thurgood Marshall
INSERT INTO red_white_who_individuals (name, birth_year, death_year, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery_1, photo_gallery_2, photo_gallery_3, photo_gallery_4, photo_gallery_5, photo_gallery_6, photo_gallery_7, photo_gallery_8, photo_gallery_9, photo_gallery_10)
VALUES (
  'Thurgood Marshall',
  1908,
  1993,
  ARRAY['First African American Supreme Court Justice'],
  '{"notes":"Born in Baltimore; Chief counsel for NAACP; Won Brown v. Board of Education (1954); First Black Supreme Court Justice (1967-1991)"}',
  'Thurgood Marshall fought for civil rights in courtrooms across America and became the first African American Supreme Court Justice. Marshall was born on July 2, 1908, in Baltimore, Maryland. He was denied admission to the University of Maryland Law School because he was Black. Instead, he attended Howard University Law School. Marshall became chief counsel for the NAACP Legal Defense Fund. He traveled throughout the South, often at great personal risk, representing Black Americans who faced injustice. Marshall argued thirty-two cases before the Supreme Court and won twenty-nine. His greatest victory came in Brown v. Board of Education (1954), when the Court ruled that segregated schools were unconstitutional. In 1967, President Johnson appointed Marshall to the Supreme Court, making him the first African American justice. He served for twenty-four years. Marshall retired in 1991 and died on January 24, 1993.',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50420004200/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50420104201/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50420204202/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50420304203/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50420404204/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50420504205/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50420604206/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50420704207/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50420804208/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50420904209/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50421004210/full/pct:25/0/default.jpg'
)
ON CONFLICT (name) DO UPDATE SET
  birth_year = EXCLUDED.birth_year,
  death_year = EXCLUDED.death_year,
  key_events = EXCLUDED.key_events,
  key_facts = EXCLUDED.key_facts,
  biographical_summary = EXCLUDED.biographical_summary,
  main_photo_url = EXCLUDED.main_photo_url,
  photo_gallery_1 = EXCLUDED.photo_gallery_1,
  photo_gallery_2 = EXCLUDED.photo_gallery_2,
  photo_gallery_3 = EXCLUDED.photo_gallery_3,
  photo_gallery_4 = EXCLUDED.photo_gallery_4,
  photo_gallery_5 = EXCLUDED.photo_gallery_5,
  photo_gallery_6 = EXCLUDED.photo_gallery_6,
  photo_gallery_7 = EXCLUDED.photo_gallery_7,
  photo_gallery_8 = EXCLUDED.photo_gallery_8,
  photo_gallery_9 = EXCLUDED.photo_gallery_9,
  photo_gallery_10 = EXCLUDED.photo_gallery_10,
  updated_at = NOW();

-- Question 1 for Thurgood Marshall
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Thurgood Marshall born?', 'Baltimore Maryland 1908', 'Washington, D.C.', 'Richmond, Virginia', 'Baltimore, Maryland', 1
FROM red_white_who_individuals WHERE name = 'Thurgood Marshall'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 2 for Thurgood Marshall
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Why couldn''t Marshall attend University of Maryland Law School?', 'Howard University Law School', 'He couldn''t afford tuition', 'He was Black', 'His grades were too low', 2
FROM red_white_who_individuals WHERE name = 'Thurgood Marshall'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 3 for Thurgood Marshall
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What law school did Marshall attend?', 'NAACP Legal Defense Fund', 'Yale Law School', 'Harvard Law School', 'Howard University Law School', 3
FROM red_white_who_individuals WHERE name = 'Thurgood Marshall'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 4 for Thurgood Marshall
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What organization did Marshall work for?', 'Brown Board Education attorney', 'Urban League', 'NAACP Legal Defense Fund', 'Southern Poverty Law Center', 4
FROM red_white_who_individuals WHERE name = 'Thurgood Marshall'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 5 for Thurgood Marshall
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Marshall''s most famous Supreme Court victory?', 'Separate but equal challenge', 'Plessy v. Ferguson', 'Brown v. Board of Education', 'Loving v. Virginia', 5
FROM red_white_who_individuals WHERE name = 'Thurgood Marshall'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 6 for Thurgood Marshall
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Brown v. Board rule unconstitutional?', 'Civil rights legal strategy', 'Voter discrimination', 'School segregation', 'Housing discrimination', 6
FROM red_white_who_individuals WHERE name = 'Thurgood Marshall'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 7 for Thurgood Marshall
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When was Marshall appointed to the Supreme Court?', 'Supreme Court first African American', '1965', '1970', '1967', 7
FROM red_white_who_individuals WHERE name = 'Thurgood Marshall'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 8 for Thurgood Marshall
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What distinction did Marshall achieve?', 'Mr. Civil Rights nickname', 'First Black Solicitor General', 'First Black federal judge', 'First Black Supreme Court Justice', 8
FROM red_white_who_individuals WHERE name = 'Thurgood Marshall'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 9 for Thurgood Marshall
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How long did Marshall serve on the Court?', 'Constitutional law expert', 'About 15 years', 'About 30 years', 'About 24 years', 9
FROM red_white_who_individuals WHERE name = 'Thurgood Marshall'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 10 for Thurgood Marshall
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did Marshall die?', 'Legal precedent establishment', '1990', '1995', '1993', 10
FROM red_white_who_individuals WHERE name = 'Thurgood Marshall'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;


-- Individual: John Lewis
INSERT INTO red_white_who_individuals (name, birth_year, death_year, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery_1, photo_gallery_2, photo_gallery_3, photo_gallery_4, photo_gallery_5, photo_gallery_6, photo_gallery_7, photo_gallery_8, photo_gallery_9, photo_gallery_10)
VALUES (
  'John Lewis',
  1940,
  2020,
  ARRAY['Civil rights leader and congressman'],
  '{"notes":"Born in Alabama; Led Student Nonviolent Coordinating Committee; Youngest speaker at March on Washington; Beaten on Bloody Sunday; U.S. Congressman for 33 years"}',
  'John Lewis was a civil rights hero who was beaten and arrested fighting for equal rights, then spent more than three decades in Congress continuing that fight. Lewis was born on February 21, 1940, in rural Alabama. He was inspired by Martin Luther King Jr. and became committed to nonviolent protest. Lewis helped organize sit-ins at segregated lunch counters and was one of the original Freedom Riders. At age twenty-three, Lewis was the youngest speaker at the 1963 March on Washington. On March 7, 1965, Lewis led marchers across the Edmund Pettus Bridge in Selma, Alabama. State troopers attacked them with clubs and tear gas. Lewis''s skull was fractured. Television coverage of Bloody Sunday shocked the nation. Lewis was elected to Congress in 1986 and served for thirty-three years. He was called the conscience of Congress. Lewis continued fighting for justice until his death on July 17, 2020. He urged Americans to get into good trouble by standing up against injustice.',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10104300/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10104301/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10104302/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10104303/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10104304/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10104305/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10104306/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10104307/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10104308/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10104309/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10104310/full/pct:25/0/default.jpg'
)
ON CONFLICT (name) DO UPDATE SET
  birth_year = EXCLUDED.birth_year,
  death_year = EXCLUDED.death_year,
  key_events = EXCLUDED.key_events,
  key_facts = EXCLUDED.key_facts,
  biographical_summary = EXCLUDED.biographical_summary,
  main_photo_url = EXCLUDED.main_photo_url,
  photo_gallery_1 = EXCLUDED.photo_gallery_1,
  photo_gallery_2 = EXCLUDED.photo_gallery_2,
  photo_gallery_3 = EXCLUDED.photo_gallery_3,
  photo_gallery_4 = EXCLUDED.photo_gallery_4,
  photo_gallery_5 = EXCLUDED.photo_gallery_5,
  photo_gallery_6 = EXCLUDED.photo_gallery_6,
  photo_gallery_7 = EXCLUDED.photo_gallery_7,
  photo_gallery_8 = EXCLUDED.photo_gallery_8,
  photo_gallery_9 = EXCLUDED.photo_gallery_9,
  photo_gallery_10 = EXCLUDED.photo_gallery_10,
  updated_at = NOW();

-- Question 1 for John Lewis
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was John Lewis born?', 'Troy Alabama 1940', 'Atlanta, Georgia', 'Montgomery, Alabama', 'Troy, Alabama', 1
FROM red_white_who_individuals WHERE name = 'John Lewis'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 2 for John Lewis
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What organization did Lewis lead?', 'Student Nonviolent Coordinating Committee', 'Southern Christian Leadership Conference', 'NAACP', 'Student Nonviolent Coordinating Committee', 2
FROM red_white_who_individuals WHERE name = 'John Lewis'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 3 for John Lewis
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How old was Lewis at the March on Washington?', 'Freedom Riders participation', '25 years old', '21 years old', '23 years old', 3
FROM red_white_who_individuals WHERE name = 'John Lewis'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 4 for John Lewis
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What happened on Bloody Sunday?', 'Selma Montgomery march', 'Marchers were attacked by police', 'Lewis was arrested', 'The march was canceled', 4
FROM red_white_who_individuals WHERE name = 'John Lewis'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 5 for John Lewis
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What injury did Lewis suffer?', 'Bloody Sunday Pettus Bridge', 'A broken arm', 'A fractured skull', 'A concussion', 5
FROM red_white_who_individuals WHERE name = 'John Lewis'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 6 for John Lewis
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How long did Lewis serve in Congress?', 'March Washington youngest speaker', '25 years', '40 years', '33 years', 6
FROM red_white_who_individuals WHERE name = 'John Lewis'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 7 for John Lewis
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Lewis called in Congress?', 'Good trouble philosophy', 'Voice of Civil Rights', 'Conscience of the Congress', 'Last Civil Rights Leader', 7
FROM red_white_who_individuals WHERE name = 'John Lewis'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 8 for John Lewis
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What phrase did Lewis use about fighting injustice?', 'Georgia Congressman 33 years', 'Good fight', 'Necessary trouble', 'Good trouble', 8
FROM red_white_who_individuals WHERE name = 'John Lewis'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 9 for John Lewis
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did John Lewis die?', 'Civil rights icon', '2018', '2022', '2020', 9
FROM red_white_who_individuals WHERE name = 'John Lewis'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 10 for John Lewis
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What inspired young Lewis?', 'Voting rights advocate', 'Frederick Douglass', 'Rosa Parks', 'Martin Luther King Jr.', 10
FROM red_white_who_individuals WHERE name = 'John Lewis'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;


-- Individual: Walt Disney
INSERT INTO red_white_who_individuals (name, birth_year, death_year, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery_1, photo_gallery_2, photo_gallery_3, photo_gallery_4, photo_gallery_5, photo_gallery_6, photo_gallery_7, photo_gallery_8, photo_gallery_9, photo_gallery_10)
VALUES (
  'Walt Disney',
  1901,
  1966,
  ARRAY['Pioneer of animation who created Mickey Mouse'],
  '{"notes":"Born in Chicago; Created Mickey Mouse (1928); First full-length animated film (Snow White, 1937); Built Disneyland (1955); Won 22 Academy Awards"}',
  'Walt Disney was a pioneer of entertainment who created Mickey Mouse, built Disneyland, and changed how the world experiences stories and fun. Disney was born on December 5, 1901, in Chicago. He developed a love of drawing as a child. In 1928, he created Mickey Mouse. The cartoon Steamboat Willie was one of the first with synchronized sound. Snow White and the Seven Dwarfs (1937) was the first full-length animated feature film. Disney followed with classics like Pinocchio, Fantasia, and Bambi. Disney won twenty-two Academy Awards, more than any other person. In 1955, he opened Disneyland in California, a new kind of amusement park. Disney was planning Walt Disney World in Florida when he died on December 15, 1966. His company grew into one of the world''s largest entertainment companies. Disney showed that imagination and persistence could create magic.',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20104400/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20104401/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20104402/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20104403/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20104404/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20104405/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20104406/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20104407/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20104408/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20104409/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:ppmsca:20000:20104410/full/pct:25/0/default.jpg'
)
ON CONFLICT (name) DO UPDATE SET
  birth_year = EXCLUDED.birth_year,
  death_year = EXCLUDED.death_year,
  key_events = EXCLUDED.key_events,
  key_facts = EXCLUDED.key_facts,
  biographical_summary = EXCLUDED.biographical_summary,
  main_photo_url = EXCLUDED.main_photo_url,
  photo_gallery_1 = EXCLUDED.photo_gallery_1,
  photo_gallery_2 = EXCLUDED.photo_gallery_2,
  photo_gallery_3 = EXCLUDED.photo_gallery_3,
  photo_gallery_4 = EXCLUDED.photo_gallery_4,
  photo_gallery_5 = EXCLUDED.photo_gallery_5,
  photo_gallery_6 = EXCLUDED.photo_gallery_6,
  photo_gallery_7 = EXCLUDED.photo_gallery_7,
  photo_gallery_8 = EXCLUDED.photo_gallery_8,
  photo_gallery_9 = EXCLUDED.photo_gallery_9,
  photo_gallery_10 = EXCLUDED.photo_gallery_10,
  updated_at = NOW();

-- Question 1 for Walt Disney
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Walt Disney born?', 'Chicago Illinois 1901', 'Anaheim, California', 'Orlando, Florida', 'Chicago, Illinois', 1
FROM red_white_who_individuals WHERE name = 'Walt Disney'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 2 for Walt Disney
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What character did Disney create in 1928?', 'Kansas City animation start', 'Oswald the Lucky Rabbit', 'Donald Duck', 'Mickey Mouse', 2
FROM red_white_who_individuals WHERE name = 'Walt Disney'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 3 for Walt Disney
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What made Steamboat Willie special?', 'Mickey Mouse creation 1928', 'It was the first animated film', 'It was the first with synchronized sound', 'It was in color', 3
FROM red_white_who_individuals WHERE name = 'Walt Disney'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 4 for Walt Disney
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was the first full-length animated film?', 'Snow White first feature', 'Fantasia', 'Pinocchio', 'Snow White and the Seven Dwarfs', 4
FROM red_white_who_individuals WHERE name = 'Walt Disney'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 5 for Walt Disney
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many Academy Awards did Disney win?', 'Disneyland theme park', '32 Academy Awards', '15 Academy Awards', '22 Academy Awards', 5
FROM red_white_who_individuals WHERE name = 'Walt Disney'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 6 for Walt Disney
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did Disneyland open?', 'Disney World Florida', '1960', '1950', '1955', 6
FROM red_white_who_individuals WHERE name = 'Walt Disney'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 7 for Walt Disney
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Disney planning when he died?', 'Family entertainment revolution', 'EPCOT Center', 'Walt Disney World', 'Disney Studios', 7
FROM red_white_who_individuals WHERE name = 'Walt Disney'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 8 for Walt Disney
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did Walt Disney die?', 'Animation technology innovation', 'December 5, 1966', 'December 25, 1966', 'December 15, 1966', 8
FROM red_white_who_individuals WHERE name = 'Walt Disney'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 9 for Walt Disney
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Disney show about imagination?', 'California Institute Arts', 'Anyone can achieve their dreams', 'Imagination has no limits', 'If you can dream it, you can do it', 9
FROM red_white_who_individuals WHERE name = 'Walt Disney'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 10 for Walt Disney
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What company did Disney create?', 'Disney Company empire', 'Mickey Mouse Productions', 'Walt Disney Studios', 'The Walt Disney Company', 10
FROM red_white_who_individuals WHERE name = 'Walt Disney'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;


-- Individual: Cesar Chavez
INSERT INTO red_white_who_individuals (name, birth_year, death_year, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery_1, photo_gallery_2, photo_gallery_3, photo_gallery_4, photo_gallery_5, photo_gallery_6, photo_gallery_7, photo_gallery_8, photo_gallery_9, photo_gallery_10)
VALUES (
  'Cesar Chavez',
  1927,
  1993,
  ARRAY['Labor leader who fought for farmworkers'],
  '{"notes":"Born in Arizona; Family became migrant farmworkers; Founded United Farm Workers; Led grape boycott; Used nonviolent protest; Awarded Presidential Medal of Freedom"}',
  'Cesar Chavez was a labor leader who fought for the rights of farmworkers. Using nonviolent protest, he improved conditions for some of America''s most vulnerable workers. Chavez was born on March 31, 1927, near Yuma, Arizona. During the Depression, his family lost their farm and became migrant workers. Young Cesar experienced the harsh conditions farmworkers faced. Chavez left school after eighth grade to work in the fields. In 1962, he founded the National Farm Workers Association, which became the United Farm Workers. His most famous campaign was the grape boycott, which lasted five years. Millions of Americans stopped buying grapes to support farmworkers. Like Martin Luther King Jr., Chavez believed in nonviolent protest. He led marches and went on hunger strikes to draw attention to the workers'' cause. Chavez continued fighting for farmworkers until his death on April 23, 1993. In 1994, he was posthumously awarded the Presidential Medal of Freedom. His motto was Si se puede (Yes, it can be done).',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50450004500/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50450104501/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50450204502/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50450304503/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50450404504/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50450504505/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50450604506/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50450704507/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50450804508/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50450904509/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3a00000:3a50451004510/full/pct:25/0/default.jpg'
)
ON CONFLICT (name) DO UPDATE SET
  birth_year = EXCLUDED.birth_year,
  death_year = EXCLUDED.death_year,
  key_events = EXCLUDED.key_events,
  key_facts = EXCLUDED.key_facts,
  biographical_summary = EXCLUDED.biographical_summary,
  main_photo_url = EXCLUDED.main_photo_url,
  photo_gallery_1 = EXCLUDED.photo_gallery_1,
  photo_gallery_2 = EXCLUDED.photo_gallery_2,
  photo_gallery_3 = EXCLUDED.photo_gallery_3,
  photo_gallery_4 = EXCLUDED.photo_gallery_4,
  photo_gallery_5 = EXCLUDED.photo_gallery_5,
  photo_gallery_6 = EXCLUDED.photo_gallery_6,
  photo_gallery_7 = EXCLUDED.photo_gallery_7,
  photo_gallery_8 = EXCLUDED.photo_gallery_8,
  photo_gallery_9 = EXCLUDED.photo_gallery_9,
  photo_gallery_10 = EXCLUDED.photo_gallery_10,
  updated_at = NOW();

-- Question 1 for Cesar Chavez
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Cesar Chavez born?', 'Yuma Arizona 1927', 'California', 'New Mexico', 'Arizona', 1
FROM red_white_who_individuals WHERE name = 'Cesar Chavez'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 2 for Cesar Chavez
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What happened to Chavez''s family during the Depression?', 'Mexican-American farm family', 'His father died', 'They lost their farm and became migrant workers', 'They moved to the city', 2
FROM red_white_who_individuals WHERE name = 'Cesar Chavez'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 3 for Cesar Chavez
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What organization did Chavez found?', 'United Farm Workers founder', 'Farm Workers Union', 'Agricultural Workers Association', 'United Farm Workers', 3
FROM red_white_who_individuals WHERE name = 'Cesar Chavez'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 4 for Cesar Chavez
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Chavez''s most famous boycott?', 'Delano grape strike leader', 'Lettuce boycott', 'Grape boycott', 'Strawberry boycott', 4
FROM red_white_who_individuals WHERE name = 'Cesar Chavez'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 5 for Cesar Chavez
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How long did the grape boycott last?', 'Nonviolent protest methods', 'Two years', 'Ten years', 'Five years', 5
FROM red_white_who_individuals WHERE name = 'Cesar Chavez'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 6 for Cesar Chavez
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What type of protest did Chavez believe in?', 'Hunger strikes protest', 'Armed resistance', 'Strikes only', 'Nonviolent protest', 6
FROM red_white_who_individuals WHERE name = 'Cesar Chavez'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 7 for Cesar Chavez
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Chavez''s longest hunger strike?', 'Si se puede yes we can', '21 days', '14 days', '36 days', 7
FROM red_white_who_individuals WHERE name = 'Cesar Chavez'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 8 for Cesar Chavez
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did Chavez die?', 'Agricultural workers rights', '1998', '1988', '1993', 8
FROM red_white_who_individuals WHERE name = 'Cesar Chavez'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 9 for Cesar Chavez
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What award was Chavez given after death?', 'Chicano civil rights', 'Congressional Gold Medal', 'Presidential Medal of Freedom', 'Nobel Peace Prize', 9
FROM red_white_who_individuals WHERE name = 'Cesar Chavez'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 10 for Cesar Chavez
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Chavez''s Spanish motto?', 'Labor organizing legacy', 'Viva la causa', 'Juntos podemos', 'Si se puede', 10
FROM red_white_who_individuals WHERE name = 'Cesar Chavez'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;


-- Individual: Sitting Bull
INSERT INTO red_white_who_individuals (name, birth_year, death_year, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery_1, photo_gallery_2, photo_gallery_3, photo_gallery_4, photo_gallery_5, photo_gallery_6, photo_gallery_7, photo_gallery_8, photo_gallery_9, photo_gallery_10)
VALUES (
  'Sitting Bull',
  1831,
  1890,
  ARRAY['Lakota Sioux leader who defeated Custer'],
  '{"notes":"Born in South Dakota; Lakota Sioux holy man and chief; Victory at Battle of Little Bighorn (1876); Fled to Canada; Killed at Standing Rock Reservation"}',
  'Sitting Bull was a Lakota Sioux leader who united Native American tribes to defend their lands. His forces defeated General Custer at the Battle of Little Bighorn. Sitting Bull was born around 1831 in what is now South Dakota. He grew up learning the ways of his people and became known for his bravery and visions. As white settlers pushed west, they violated treaties and took Native American lands. Sitting Bull became a leader who refused to surrender to reservation life. In June 1876, at the Battle of Little Bighorn, Native American forces led by Sitting Bull and Crazy Horse wiped out Colonel George Custer and over 200 soldiers. It was the greatest Native American victory against the U.S. Army. But the victory brought harsh retaliation. In 1877, Sitting Bull led his people into Canada. After four years of hardship, they returned to surrender. Sitting Bull was placed on Standing Rock Reservation. On December 15, 1890, reservation police came to arrest Sitting Bull. In the confrontation, he was killed. Sitting Bull fought to protect his people''s way of life.',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50460004600/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50460104601/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50460204602/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50460304603/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50460404604/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50460504605/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50460604606/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50460704607/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50460804608/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50460904609/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3b00000:3b50461004610/full/pct:25/0/default.jpg'
)
ON CONFLICT (name) DO UPDATE SET
  birth_year = EXCLUDED.birth_year,
  death_year = EXCLUDED.death_year,
  key_events = EXCLUDED.key_events,
  key_facts = EXCLUDED.key_facts,
  biographical_summary = EXCLUDED.biographical_summary,
  main_photo_url = EXCLUDED.main_photo_url,
  photo_gallery_1 = EXCLUDED.photo_gallery_1,
  photo_gallery_2 = EXCLUDED.photo_gallery_2,
  photo_gallery_3 = EXCLUDED.photo_gallery_3,
  photo_gallery_4 = EXCLUDED.photo_gallery_4,
  photo_gallery_5 = EXCLUDED.photo_gallery_5,
  photo_gallery_6 = EXCLUDED.photo_gallery_6,
  photo_gallery_7 = EXCLUDED.photo_gallery_7,
  photo_gallery_8 = EXCLUDED.photo_gallery_8,
  photo_gallery_9 = EXCLUDED.photo_gallery_9,
  photo_gallery_10 = EXCLUDED.photo_gallery_10,
  updated_at = NOW();

-- Question 1 for Sitting Bull
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When was Sitting Bull born?', 'Grand River South Dakota 1831', 'Around 1835', 'Around 1840', 'Around 1831', 1
FROM red_white_who_individuals WHERE name = 'Sitting Bull'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 2 for Sitting Bull
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What tribe was Sitting Bull a leader of?', 'Hunkpapa Lakota chief', 'Cheyenne', 'Apache', 'Lakota Sioux', 2
FROM red_white_who_individuals WHERE name = 'Sitting Bull'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 3 for Sitting Bull
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What happened at the Battle of Little Bighorn?', 'Little Bighorn victory Custer', 'Custer escaped', 'The Native Americans lost', 'Custer and his men were defeated', 3
FROM red_white_who_individuals WHERE name = 'Sitting Bull'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 4 for Sitting Bull
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When did the Battle of Little Bighorn occur?', 'Resistance reservation system', 'June 1877', 'June 1875', 'June 1876', 4
FROM red_white_who_individuals WHERE name = 'Sitting Bull'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 5 for Sitting Bull
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where did Sitting Bull flee after the battle?', 'Buffalo hunting traditional life', 'Mexico', 'Montana Territory', 'Canada', 5
FROM red_white_who_individuals WHERE name = 'Sitting Bull'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 6 for Sitting Bull
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Sitting Bull living when he died?', 'Wild West Show performer', 'A Lakota village', 'Standing Rock Reservation', 'Pine Ridge Reservation', 6
FROM red_white_who_individuals WHERE name = 'Sitting Bull'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 7 for Sitting Bull
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How did Sitting Bull die?', 'Native American sovereignty', 'In battle against soldiers', 'Killed by Indian police', 'From illness', 7
FROM red_white_who_individuals WHERE name = 'Sitting Bull'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 8 for Sitting Bull
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What did Sitting Bull symbolize?', 'Wounded Knee aftermath', 'Peaceful coexistence', 'Native American resistance', 'Treaty negotiations', 8
FROM red_white_who_individuals WHERE name = 'Sitting Bull'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 9 for Sitting Bull
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who was Crazy Horse?', 'Spiritual leader warrior', 'A U.S. Army general', 'Another Lakota chief', 'A fellow Lakota leader who fought alongside him', 9
FROM red_white_who_individuals WHERE name = 'Sitting Bull'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 10 for Sitting Bull
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many soldiers did Custer lose?', 'Killed Indian police 1890', 'About 100 soldiers', 'About 350 soldiers', 'About 200 soldiers', 10
FROM red_white_who_individuals WHERE name = 'Sitting Bull'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;


-- Individual: Audie Murphy
INSERT INTO red_white_who_individuals (name, birth_year, death_year, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery_1, photo_gallery_2, photo_gallery_3, photo_gallery_4, photo_gallery_5, photo_gallery_6, photo_gallery_7, photo_gallery_8, photo_gallery_9, photo_gallery_10)
VALUES (
  'Audie Murphy',
  1925,
  1971,
  ARRAY['Most decorated American soldier of World War II'],
  '{"notes":"Born in Texas; Joined Army at 17; Most decorated U.S. combat soldier; Received Medal of Honor; Became movie star"}',
  'Audie Murphy was the most decorated American combat soldier of World War II. Despite being small and young, he performed acts of incredible bravery that made him a national hero. Murphy was born on June 20, 1925, in rural Texas. His family was desperately poor. Murphy tried to enlist after Pearl Harbor but was rejected for being too small and young. He was finally accepted by the Army in 1942, just seventeen years old and weighing only 112 pounds. Murphy fought across Europe, seeing combat in North Africa, Sicily, Italy, France, and Germany. He was wounded three times. His most famous action came on January 26, 1945, near Holtzwihr, France. When German forces attacked, Murphy climbed onto a burning tank destroyer and used its machine gun against the enemy. For an hour, he held off the German attack alone. He received the Medal of Honor. Murphy received every combat award the Army offered, earning thirty-three awards and medals. After the war, Murphy became a movie star. He was honest about struggling with what we now call PTSD. Murphy died in a plane crash on May 28, 1971. He is buried at Arlington National Cemetery.',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50470004700/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50470104701/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50470204702/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50470304703/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50470404704/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50470504705/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50470604706/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50470704707/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50470804708/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50470904709/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:cph:3c00000:3c50471004710/full/pct:25/0/default.jpg'
)
ON CONFLICT (name) DO UPDATE SET
  birth_year = EXCLUDED.birth_year,
  death_year = EXCLUDED.death_year,
  key_events = EXCLUDED.key_events,
  key_facts = EXCLUDED.key_facts,
  biographical_summary = EXCLUDED.biographical_summary,
  main_photo_url = EXCLUDED.main_photo_url,
  photo_gallery_1 = EXCLUDED.photo_gallery_1,
  photo_gallery_2 = EXCLUDED.photo_gallery_2,
  photo_gallery_3 = EXCLUDED.photo_gallery_3,
  photo_gallery_4 = EXCLUDED.photo_gallery_4,
  photo_gallery_5 = EXCLUDED.photo_gallery_5,
  photo_gallery_6 = EXCLUDED.photo_gallery_6,
  photo_gallery_7 = EXCLUDED.photo_gallery_7,
  photo_gallery_8 = EXCLUDED.photo_gallery_8,
  photo_gallery_9 = EXCLUDED.photo_gallery_9,
  photo_gallery_10 = EXCLUDED.photo_gallery_10,
  updated_at = NOW();

-- Question 1 for Audie Murphy
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where was Audie Murphy born?', 'Kingston Texas 1925', 'Dallas, Texas', 'Austin, Texas', 'Kingston, Texas', 1
FROM red_white_who_individuals WHERE name = 'Audie Murphy'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 2 for Audie Murphy
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Why was Murphy initially rejected from the military?', 'World War II most decorated', 'He was too young', 'He was too small and young', 'He had a medical condition', 2
FROM red_white_who_individuals WHERE name = 'Audie Murphy'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 3 for Audie Murphy
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How old was Murphy when he joined the Army?', 'Medal Honor recipient', '18 years old', '16 years old', '17 years old', 3
FROM red_white_who_individuals WHERE name = 'Audie Murphy'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 4 for Audie Murphy
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many times was Murphy wounded?', 'European theater combat', 'Once', 'Five times', 'Three times', 4
FROM red_white_who_individuals WHERE name = 'Audie Murphy'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 5 for Audie Murphy
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What happened at Holtzwihr, France?', 'Hollywood actor career', 'He single-handedly held off German forces', 'He rescued wounded soldiers', 'He captured an enemy position', 5
FROM red_white_who_individuals WHERE name = 'Audie Murphy'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 6 for Audie Murphy
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What is the highest military award Murphy received?', 'To Hell and Back autobiography', 'Silver Star', 'Distinguished Service Cross', 'Medal of Honor', 6
FROM red_white_who_individuals WHERE name = 'Audie Murphy'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 7 for Audie Murphy
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How many awards did Murphy earn?', 'PTSD advocate veteran', 'About 20 awards', 'About 40 awards', 'About 33 awards', 7
FROM red_white_who_individuals WHERE name = 'Audie Murphy'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 8 for Audie Murphy
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What career did Murphy have after the war?', 'B-western movies', 'Businessman', 'Movie actor', 'Politician', 8
FROM red_white_who_individuals WHERE name = 'Audie Murphy'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 9 for Audie Murphy
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What condition did Murphy help bring attention to?', 'Small town Texas origins', 'Traumatic brain injury', 'Agent Orange exposure', 'Post-traumatic stress disorder', 9
FROM red_white_who_individuals WHERE name = 'Audie Murphy'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 10 for Audie Murphy
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where is Murphy buried?', 'American hero courage', 'Arlington National Cemetery', 'His hometown in Texas', 'The Tomb of the Unknown Soldier', 10
FROM red_white_who_individuals WHERE name = 'Audie Murphy'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;


-- Individual: Pocahontas
INSERT INTO red_white_who_individuals (name, birth_year, death_year, key_events, key_facts, biographical_summary, main_photo_url, photo_gallery_1, photo_gallery_2, photo_gallery_3, photo_gallery_4, photo_gallery_5, photo_gallery_6, photo_gallery_7, photo_gallery_8, photo_gallery_9, photo_gallery_10)
VALUES (
  'Pocahontas',
  1596,
  1617,
  ARRAY['Powhatan woman who helped Jamestown settlers'],
  '{"notes":"Born in Virginia; Daughter of Chief Powhatan; Helped Jamestown settlers survive; Married colonist John Rolfe; Traveled to England"}',
  'Pocahontas was a Powhatan woman who became famous for helping English settlers at Jamestown survive. Her story represents both cooperation and tragedy between Native Americans and colonists. Pocahontas was born around 1596 in Virginia. Her father was Chief Powhatan. Her real name was Amonute; Pocahontas was a nickname meaning playful one. According to Captain John Smith, Pocahontas saved his life in 1607 when her father was about to execute him. Historians debate whether this really happened. What is certain is that Pocahontas helped the struggling Jamestown colony by bringing food and delivering messages. In 1613, Pocahontas was captured by the English. During her captivity, she converted to Christianity and was baptized as Rebecca. In 1614, Pocahontas married tobacco planter John Rolfe. Their marriage brought peace between the colonists and Powhatan''s people. In 1616, she traveled to England with her husband. She was presented to King James I and became a celebrity. Pocahontas never returned to Virginia. In 1617, as her ship prepared to sail home, she became ill and died at about twenty-one years old. Pocahontas remains a symbol of the complex relationship between Native Americans and European settlers.',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10104800/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10104801/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10104802/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10104803/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10104804/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10104805/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10104806/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10104807/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10104808/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10104809/full/pct:25/0/default.jpg',
  'https://tile.loc.gov/image-services/iiif/service:pnp:highsm:10000:10104810/full/pct:25/0/default.jpg'
)
ON CONFLICT (name) DO UPDATE SET
  birth_year = EXCLUDED.birth_year,
  death_year = EXCLUDED.death_year,
  key_events = EXCLUDED.key_events,
  key_facts = EXCLUDED.key_facts,
  biographical_summary = EXCLUDED.biographical_summary,
  main_photo_url = EXCLUDED.main_photo_url,
  photo_gallery_1 = EXCLUDED.photo_gallery_1,
  photo_gallery_2 = EXCLUDED.photo_gallery_2,
  photo_gallery_3 = EXCLUDED.photo_gallery_3,
  photo_gallery_4 = EXCLUDED.photo_gallery_4,
  photo_gallery_5 = EXCLUDED.photo_gallery_5,
  photo_gallery_6 = EXCLUDED.photo_gallery_6,
  photo_gallery_7 = EXCLUDED.photo_gallery_7,
  photo_gallery_8 = EXCLUDED.photo_gallery_8,
  photo_gallery_9 = EXCLUDED.photo_gallery_9,
  photo_gallery_10 = EXCLUDED.photo_gallery_10,
  updated_at = NOW();

-- Question 1 for Pocahontas
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'When was Pocahontas born?', 'Werowocomoco Virginia 1596', 'Around 1600', 'Around 1590', 'Around 1596', 1
FROM red_white_who_individuals WHERE name = 'Pocahontas'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 2 for Pocahontas
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who was Pocahontas''s father?', 'Powhatan tribe daughter', 'Massasoit', 'Sitting Bull', 'Chief Powhatan', 2
FROM red_white_who_individuals WHERE name = 'Pocahontas'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 3 for Pocahontas
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What does the name Pocahontas mean?', 'Jamestown settlement contact', 'Brave girl', 'River daughter', 'Playful one', 3
FROM red_white_who_individuals WHERE name = 'Pocahontas'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 4 for Pocahontas
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who did Pocahontas reportedly save?', 'John Smith relationship legendary', 'Miles Standish', 'John Rolfe', 'Captain John Smith', 4
FROM red_white_who_individuals WHERE name = 'Pocahontas'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 5 for Pocahontas
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How did Pocahontas help Jamestown?', 'Cultural bridge Native English', 'By trading goods with them', 'By bringing food and delivering messages', 'By translating for them', 5
FROM red_white_who_individuals WHERE name = 'Pocahontas'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 6 for Pocahontas
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Who did Pocahontas marry?', 'Captured by English colonists', 'Captain John Smith', 'Thomas Dale', 'John Rolfe', 6
FROM red_white_who_individuals WHERE name = 'Pocahontas'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 7 for Pocahontas
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where did Pocahontas travel in 1616?', 'Converted Christianity Rebecca', 'Spain', 'France', 'England', 7
FROM red_white_who_individuals WHERE name = 'Pocahontas'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 8 for Pocahontas
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'What was Pocahontas''s Christian name?', 'Married John Rolfe tobacco', 'Mary', 'Elizabeth', 'Rebecca', 8
FROM red_white_who_individuals WHERE name = 'Pocahontas'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 9 for Pocahontas
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'How old was Pocahontas when she died?', 'London England visit', 'About 25 years old', 'About 18 years old', 'About 21 years old', 9
FROM red_white_who_individuals WHERE name = 'Pocahontas'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;

-- Question 10 for Pocahontas
INSERT INTO red_white_who_questions (individual_id, question_text, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, question_order)
SELECT individual_id, 'Where did Pocahontas die?', 'Died England 1617', 'Virginia', 'Jamestown', 'Gravesend, England', 10
FROM red_white_who_individuals WHERE name = 'Pocahontas'
ON CONFLICT (individual_id, question_text) DO UPDATE SET
  correct_answer = EXCLUDED.correct_answer,
  wrong_answer_1 = EXCLUDED.wrong_answer_1,
  wrong_answer_2 = EXCLUDED.wrong_answer_2,
  wrong_answer_3 = EXCLUDED.wrong_answer_3,
  question_order = EXCLUDED.question_order;


