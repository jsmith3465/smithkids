-- Update Red, White & Who Images from Multiple Sources
-- Generated: 2026-01-04T03:40:02.304Z
-- 
-- STRATEGY: Distribute images across multiple sources to avoid throttling
-- 
-- Source Distribution:
-- - Library of Congress (loc.gov): ~15 individuals
-- - National Archives (archives.gov): ~10 individuals  
-- - National Portrait Gallery (npg.si.edu): ~10 individuals
-- - Smithsonian (si.edu): ~8 individuals
-- - Britannica (britannica.com): ~6 individuals
-- 
-- INSTRUCTIONS:
-- 1. Search for each individual's images using:
--    - Library of Congress: https://www.loc.gov/search/?q=NAME
--    - National Archives: https://catalog.archives.gov/search?q=NAME
--    - National Portrait Gallery: https://npg.si.edu/collection/search?q=NAME
--    - Smithsonian: https://www.si.edu/search?q=NAME
-- 2. Main photo: Find portrait featuring individual prominently (alone)
-- 3. Gallery photos: Find images related to their biography and achievements
-- 4. Copy direct image URLs (not page URLs)
-- 5. Test URLs in browser before updating
-- 6. Replace placeholders below with actual URLs
--

-- George Washington (ID: 1)
-- Recommended source: loc
-- Main Photo: Portrait of George Washington (solo, prominent)
-- Gallery: Images related to George Washington's life and achievements
UPDATE red_white_who_individuals
SET main_photo_url = 'REPLACE_WITH_MAIN_PHOTO_URL',
    photo_gallery_1 = 'REPLACE_WITH_GALLERY_1_URL',
    photo_gallery_2 = 'REPLACE_WITH_GALLERY_2_URL',
    photo_gallery_3 = 'REPLACE_WITH_GALLERY_3_URL',
    photo_gallery_4 = 'REPLACE_WITH_GALLERY_4_URL',
    photo_gallery_5 = 'REPLACE_WITH_GALLERY_5_URL',
    photo_gallery_6 = 'REPLACE_WITH_GALLERY_6_URL',
    photo_gallery_7 = 'REPLACE_WITH_GALLERY_7_URL',
    photo_gallery_8 = 'REPLACE_WITH_GALLERY_8_URL',
    photo_gallery_9 = 'REPLACE_WITH_GALLERY_9_URL',
    photo_gallery_10 = 'REPLACE_WITH_GALLERY_10_URL'
WHERE individual_id = 1;

-- Benjamin Franklin (ID: 5)
-- Recommended source: archives
-- Main Photo: Portrait of Benjamin Franklin (solo, prominent)
-- Gallery: Images related to Benjamin Franklin's life and achievements
UPDATE red_white_who_individuals
SET main_photo_url = 'REPLACE_WITH_MAIN_PHOTO_URL',
    photo_gallery_1 = 'REPLACE_WITH_GALLERY_1_URL',
    photo_gallery_2 = 'REPLACE_WITH_GALLERY_2_URL',
    photo_gallery_3 = 'REPLACE_WITH_GALLERY_3_URL',
    photo_gallery_4 = 'REPLACE_WITH_GALLERY_4_URL',
    photo_gallery_5 = 'REPLACE_WITH_GALLERY_5_URL',
    photo_gallery_6 = 'REPLACE_WITH_GALLERY_6_URL',
    photo_gallery_7 = 'REPLACE_WITH_GALLERY_7_URL',
    photo_gallery_8 = 'REPLACE_WITH_GALLERY_8_URL',
    photo_gallery_9 = 'REPLACE_WITH_GALLERY_9_URL',
    photo_gallery_10 = 'REPLACE_WITH_GALLERY_10_URL'
WHERE individual_id = 5;

-- Abraham Lincoln (ID: 6)
-- Recommended source: npg
-- Main Photo: Portrait of Abraham Lincoln (solo, prominent)
-- Gallery: Images related to Abraham Lincoln's life and achievements
UPDATE red_white_who_individuals
SET main_photo_url = 'REPLACE_WITH_MAIN_PHOTO_URL',
    photo_gallery_1 = 'REPLACE_WITH_GALLERY_1_URL',
    photo_gallery_2 = 'REPLACE_WITH_GALLERY_2_URL',
    photo_gallery_3 = 'REPLACE_WITH_GALLERY_3_URL',
    photo_gallery_4 = 'REPLACE_WITH_GALLERY_4_URL',
    photo_gallery_5 = 'REPLACE_WITH_GALLERY_5_URL',
    photo_gallery_6 = 'REPLACE_WITH_GALLERY_6_URL',
    photo_gallery_7 = 'REPLACE_WITH_GALLERY_7_URL',
    photo_gallery_8 = 'REPLACE_WITH_GALLERY_8_URL',
    photo_gallery_9 = 'REPLACE_WITH_GALLERY_9_URL',
    photo_gallery_10 = 'REPLACE_WITH_GALLERY_10_URL'
WHERE individual_id = 6;

-- Thomas Jefferson (ID: 7)
-- Recommended source: smithsonian
-- Main Photo: Portrait of Thomas Jefferson (solo, prominent)
-- Gallery: Images related to Thomas Jefferson's life and achievements
UPDATE red_white_who_individuals
SET main_photo_url = 'REPLACE_WITH_MAIN_PHOTO_URL',
    photo_gallery_1 = 'REPLACE_WITH_GALLERY_1_URL',
    photo_gallery_2 = 'REPLACE_WITH_GALLERY_2_URL',
    photo_gallery_3 = 'REPLACE_WITH_GALLERY_3_URL',
    photo_gallery_4 = 'REPLACE_WITH_GALLERY_4_URL',
    photo_gallery_5 = 'REPLACE_WITH_GALLERY_5_URL',
    photo_gallery_6 = 'REPLACE_WITH_GALLERY_6_URL',
    photo_gallery_7 = 'REPLACE_WITH_GALLERY_7_URL',
    photo_gallery_8 = 'REPLACE_WITH_GALLERY_8_URL',
    photo_gallery_9 = 'REPLACE_WITH_GALLERY_9_URL',
    photo_gallery_10 = 'REPLACE_WITH_GALLERY_10_URL'
WHERE individual_id = 7;

-- Harriet Tubman (ID: 8)
-- Recommended source: britannica
-- Main Photo: Portrait of Harriet Tubman (solo, prominent)
-- Gallery: Images related to Harriet Tubman's life and achievements
UPDATE red_white_who_individuals
SET main_photo_url = 'REPLACE_WITH_MAIN_PHOTO_URL',
    photo_gallery_1 = 'REPLACE_WITH_GALLERY_1_URL',
    photo_gallery_2 = 'REPLACE_WITH_GALLERY_2_URL',
    photo_gallery_3 = 'REPLACE_WITH_GALLERY_3_URL',
    photo_gallery_4 = 'REPLACE_WITH_GALLERY_4_URL',
    photo_gallery_5 = 'REPLACE_WITH_GALLERY_5_URL',
    photo_gallery_6 = 'REPLACE_WITH_GALLERY_6_URL',
    photo_gallery_7 = 'REPLACE_WITH_GALLERY_7_URL',
    photo_gallery_8 = 'REPLACE_WITH_GALLERY_8_URL',
    photo_gallery_9 = 'REPLACE_WITH_GALLERY_9_URL',
    photo_gallery_10 = 'REPLACE_WITH_GALLERY_10_URL'
WHERE individual_id = 8;

-- Frederick Douglass (ID: 9)
-- Recommended source: loc
-- Main Photo: Portrait of Frederick Douglass (solo, prominent)
-- Gallery: Images related to Frederick Douglass's life and achievements
UPDATE red_white_who_individuals
SET main_photo_url = 'REPLACE_WITH_MAIN_PHOTO_URL',
    photo_gallery_1 = 'REPLACE_WITH_GALLERY_1_URL',
    photo_gallery_2 = 'REPLACE_WITH_GALLERY_2_URL',
    photo_gallery_3 = 'REPLACE_WITH_GALLERY_3_URL',
    photo_gallery_4 = 'REPLACE_WITH_GALLERY_4_URL',
    photo_gallery_5 = 'REPLACE_WITH_GALLERY_5_URL',
    photo_gallery_6 = 'REPLACE_WITH_GALLERY_6_URL',
    photo_gallery_7 = 'REPLACE_WITH_GALLERY_7_URL',
    photo_gallery_8 = 'REPLACE_WITH_GALLERY_8_URL',
    photo_gallery_9 = 'REPLACE_WITH_GALLERY_9_URL',
    photo_gallery_10 = 'REPLACE_WITH_GALLERY_10_URL'
WHERE individual_id = 9;

-- Theodore Roosevelt (ID: 10)
-- Recommended source: archives
-- Main Photo: Portrait of Theodore Roosevelt (solo, prominent)
-- Gallery: Images related to Theodore Roosevelt's life and achievements
UPDATE red_white_who_individuals
SET main_photo_url = 'REPLACE_WITH_MAIN_PHOTO_URL',
    photo_gallery_1 = 'REPLACE_WITH_GALLERY_1_URL',
    photo_gallery_2 = 'REPLACE_WITH_GALLERY_2_URL',
    photo_gallery_3 = 'REPLACE_WITH_GALLERY_3_URL',
    photo_gallery_4 = 'REPLACE_WITH_GALLERY_4_URL',
    photo_gallery_5 = 'REPLACE_WITH_GALLERY_5_URL',
    photo_gallery_6 = 'REPLACE_WITH_GALLERY_6_URL',
    photo_gallery_7 = 'REPLACE_WITH_GALLERY_7_URL',
    photo_gallery_8 = 'REPLACE_WITH_GALLERY_8_URL',
    photo_gallery_9 = 'REPLACE_WITH_GALLERY_9_URL',
    photo_gallery_10 = 'REPLACE_WITH_GALLERY_10_URL'
WHERE individual_id = 10;

-- Martin Luther King Jr. (ID: 11)
-- Recommended source: npg
-- Main Photo: Portrait of Martin Luther King Jr. (solo, prominent)
-- Gallery: Images related to Martin Luther King Jr.'s life and achievements
UPDATE red_white_who_individuals
SET main_photo_url = 'REPLACE_WITH_MAIN_PHOTO_URL',
    photo_gallery_1 = 'REPLACE_WITH_GALLERY_1_URL',
    photo_gallery_2 = 'REPLACE_WITH_GALLERY_2_URL',
    photo_gallery_3 = 'REPLACE_WITH_GALLERY_3_URL',
    photo_gallery_4 = 'REPLACE_WITH_GALLERY_4_URL',
    photo_gallery_5 = 'REPLACE_WITH_GALLERY_5_URL',
    photo_gallery_6 = 'REPLACE_WITH_GALLERY_6_URL',
    photo_gallery_7 = 'REPLACE_WITH_GALLERY_7_URL',
    photo_gallery_8 = 'REPLACE_WITH_GALLERY_8_URL',
    photo_gallery_9 = 'REPLACE_WITH_GALLERY_9_URL',
    photo_gallery_10 = 'REPLACE_WITH_GALLERY_10_URL'
WHERE individual_id = 11;

-- Rosa Parks (ID: 12)
-- Recommended source: loc
-- Main Photo: Portrait of Rosa Parks (solo, prominent)
-- Gallery: Images related to Rosa Parks's life and achievements
UPDATE red_white_who_individuals
SET main_photo_url = 'REPLACE_WITH_MAIN_PHOTO_URL',
    photo_gallery_1 = 'REPLACE_WITH_GALLERY_1_URL',
    photo_gallery_2 = 'REPLACE_WITH_GALLERY_2_URL',
    photo_gallery_3 = 'REPLACE_WITH_GALLERY_3_URL',
    photo_gallery_4 = 'REPLACE_WITH_GALLERY_4_URL',
    photo_gallery_5 = 'REPLACE_WITH_GALLERY_5_URL',
    photo_gallery_6 = 'REPLACE_WITH_GALLERY_6_URL',
    photo_gallery_7 = 'REPLACE_WITH_GALLERY_7_URL',
    photo_gallery_8 = 'REPLACE_WITH_GALLERY_8_URL',
    photo_gallery_9 = 'REPLACE_WITH_GALLERY_9_URL',
    photo_gallery_10 = 'REPLACE_WITH_GALLERY_10_URL'
WHERE individual_id = 12;

-- Sacagawea (ID: 13)
-- Recommended source: archives
-- Main Photo: Portrait of Sacagawea (solo, prominent)
-- Gallery: Images related to Sacagawea's life and achievements
UPDATE red_white_who_individuals
SET main_photo_url = 'REPLACE_WITH_MAIN_PHOTO_URL',
    photo_gallery_1 = 'REPLACE_WITH_GALLERY_1_URL',
    photo_gallery_2 = 'REPLACE_WITH_GALLERY_2_URL',
    photo_gallery_3 = 'REPLACE_WITH_GALLERY_3_URL',
    photo_gallery_4 = 'REPLACE_WITH_GALLERY_4_URL',
    photo_gallery_5 = 'REPLACE_WITH_GALLERY_5_URL',
    photo_gallery_6 = 'REPLACE_WITH_GALLERY_6_URL',
    photo_gallery_7 = 'REPLACE_WITH_GALLERY_7_URL',
    photo_gallery_8 = 'REPLACE_WITH_GALLERY_8_URL',
    photo_gallery_9 = 'REPLACE_WITH_GALLERY_9_URL',
    photo_gallery_10 = 'REPLACE_WITH_GALLERY_10_URL'
WHERE individual_id = 13;

-- Thomas Edison (ID: 14)
-- Recommended source: npg
-- Main Photo: Portrait of Thomas Edison (solo, prominent)
-- Gallery: Images related to Thomas Edison's life and achievements
UPDATE red_white_who_individuals
SET main_photo_url = 'REPLACE_WITH_MAIN_PHOTO_URL',
    photo_gallery_1 = 'REPLACE_WITH_GALLERY_1_URL',
    photo_gallery_2 = 'REPLACE_WITH_GALLERY_2_URL',
    photo_gallery_3 = 'REPLACE_WITH_GALLERY_3_URL',
    photo_gallery_4 = 'REPLACE_WITH_GALLERY_4_URL',
    photo_gallery_5 = 'REPLACE_WITH_GALLERY_5_URL',
    photo_gallery_6 = 'REPLACE_WITH_GALLERY_6_URL',
    photo_gallery_7 = 'REPLACE_WITH_GALLERY_7_URL',
    photo_gallery_8 = 'REPLACE_WITH_GALLERY_8_URL',
    photo_gallery_9 = 'REPLACE_WITH_GALLERY_9_URL',
    photo_gallery_10 = 'REPLACE_WITH_GALLERY_10_URL'
WHERE individual_id = 14;

-- Alexander Graham Bell (ID: 15)
-- Recommended source: smithsonian
-- Main Photo: Portrait of Alexander Graham Bell (solo, prominent)
-- Gallery: Images related to Alexander Graham Bell's life and achievements
UPDATE red_white_who_individuals
SET main_photo_url = 'REPLACE_WITH_MAIN_PHOTO_URL',
    photo_gallery_1 = 'REPLACE_WITH_GALLERY_1_URL',
    photo_gallery_2 = 'REPLACE_WITH_GALLERY_2_URL',
    photo_gallery_3 = 'REPLACE_WITH_GALLERY_3_URL',
    photo_gallery_4 = 'REPLACE_WITH_GALLERY_4_URL',
    photo_gallery_5 = 'REPLACE_WITH_GALLERY_5_URL',
    photo_gallery_6 = 'REPLACE_WITH_GALLERY_6_URL',
    photo_gallery_7 = 'REPLACE_WITH_GALLERY_7_URL',
    photo_gallery_8 = 'REPLACE_WITH_GALLERY_8_URL',
    photo_gallery_9 = 'REPLACE_WITH_GALLERY_9_URL',
    photo_gallery_10 = 'REPLACE_WITH_GALLERY_10_URL'
WHERE individual_id = 15;

-- Wright Brothers (Orville & Wilbur) (ID: 16)
-- Recommended source: britannica
-- Main Photo: Portrait of Wright Brothers (Orville & Wilbur) (solo, prominent)
-- Gallery: Images related to Wright Brothers (Orville & Wilbur)'s life and achievements
UPDATE red_white_who_individuals
SET main_photo_url = 'REPLACE_WITH_MAIN_PHOTO_URL',
    photo_gallery_1 = 'REPLACE_WITH_GALLERY_1_URL',
    photo_gallery_2 = 'REPLACE_WITH_GALLERY_2_URL',
    photo_gallery_3 = 'REPLACE_WITH_GALLERY_3_URL',
    photo_gallery_4 = 'REPLACE_WITH_GALLERY_4_URL',
    photo_gallery_5 = 'REPLACE_WITH_GALLERY_5_URL',
    photo_gallery_6 = 'REPLACE_WITH_GALLERY_6_URL',
    photo_gallery_7 = 'REPLACE_WITH_GALLERY_7_URL',
    photo_gallery_8 = 'REPLACE_WITH_GALLERY_8_URL',
    photo_gallery_9 = 'REPLACE_WITH_GALLERY_9_URL',
    photo_gallery_10 = 'REPLACE_WITH_GALLERY_10_URL'
WHERE individual_id = 16;

-- Neil Armstrong (ID: 17)
-- Recommended source: loc
-- Main Photo: Portrait of Neil Armstrong (solo, prominent)
-- Gallery: Images related to Neil Armstrong's life and achievements
UPDATE red_white_who_individuals
SET main_photo_url = 'REPLACE_WITH_MAIN_PHOTO_URL',
    photo_gallery_1 = 'REPLACE_WITH_GALLERY_1_URL',
    photo_gallery_2 = 'REPLACE_WITH_GALLERY_2_URL',
    photo_gallery_3 = 'REPLACE_WITH_GALLERY_3_URL',
    photo_gallery_4 = 'REPLACE_WITH_GALLERY_4_URL',
    photo_gallery_5 = 'REPLACE_WITH_GALLERY_5_URL',
    photo_gallery_6 = 'REPLACE_WITH_GALLERY_6_URL',
    photo_gallery_7 = 'REPLACE_WITH_GALLERY_7_URL',
    photo_gallery_8 = 'REPLACE_WITH_GALLERY_8_URL',
    photo_gallery_9 = 'REPLACE_WITH_GALLERY_9_URL',
    photo_gallery_10 = 'REPLACE_WITH_GALLERY_10_URL'
WHERE individual_id = 17;

-- Jackie Robinson (ID: 18)
-- Recommended source: archives
-- Main Photo: Portrait of Jackie Robinson (solo, prominent)
-- Gallery: Images related to Jackie Robinson's life and achievements
UPDATE red_white_who_individuals
SET main_photo_url = 'REPLACE_WITH_MAIN_PHOTO_URL',
    photo_gallery_1 = 'REPLACE_WITH_GALLERY_1_URL',
    photo_gallery_2 = 'REPLACE_WITH_GALLERY_2_URL',
    photo_gallery_3 = 'REPLACE_WITH_GALLERY_3_URL',
    photo_gallery_4 = 'REPLACE_WITH_GALLERY_4_URL',
    photo_gallery_5 = 'REPLACE_WITH_GALLERY_5_URL',
    photo_gallery_6 = 'REPLACE_WITH_GALLERY_6_URL',
    photo_gallery_7 = 'REPLACE_WITH_GALLERY_7_URL',
    photo_gallery_8 = 'REPLACE_WITH_GALLERY_8_URL',
    photo_gallery_9 = 'REPLACE_WITH_GALLERY_9_URL',
    photo_gallery_10 = 'REPLACE_WITH_GALLERY_10_URL'
WHERE individual_id = 18;

-- Amelia Earhart (ID: 19)
-- Recommended source: npg
-- Main Photo: Portrait of Amelia Earhart (solo, prominent)
-- Gallery: Images related to Amelia Earhart's life and achievements
UPDATE red_white_who_individuals
SET main_photo_url = 'REPLACE_WITH_MAIN_PHOTO_URL',
    photo_gallery_1 = 'REPLACE_WITH_GALLERY_1_URL',
    photo_gallery_2 = 'REPLACE_WITH_GALLERY_2_URL',
    photo_gallery_3 = 'REPLACE_WITH_GALLERY_3_URL',
    photo_gallery_4 = 'REPLACE_WITH_GALLERY_4_URL',
    photo_gallery_5 = 'REPLACE_WITH_GALLERY_5_URL',
    photo_gallery_6 = 'REPLACE_WITH_GALLERY_6_URL',
    photo_gallery_7 = 'REPLACE_WITH_GALLERY_7_URL',
    photo_gallery_8 = 'REPLACE_WITH_GALLERY_8_URL',
    photo_gallery_9 = 'REPLACE_WITH_GALLERY_9_URL',
    photo_gallery_10 = 'REPLACE_WITH_GALLERY_10_URL'
WHERE individual_id = 19;

-- Ulysses S. Grant (ID: 20)
-- Recommended source: loc
-- Main Photo: Portrait of Ulysses S. Grant (solo, prominent)
-- Gallery: Images related to Ulysses S. Grant's life and achievements
UPDATE red_white_who_individuals
SET main_photo_url = 'REPLACE_WITH_MAIN_PHOTO_URL',
    photo_gallery_1 = 'REPLACE_WITH_GALLERY_1_URL',
    photo_gallery_2 = 'REPLACE_WITH_GALLERY_2_URL',
    photo_gallery_3 = 'REPLACE_WITH_GALLERY_3_URL',
    photo_gallery_4 = 'REPLACE_WITH_GALLERY_4_URL',
    photo_gallery_5 = 'REPLACE_WITH_GALLERY_5_URL',
    photo_gallery_6 = 'REPLACE_WITH_GALLERY_6_URL',
    photo_gallery_7 = 'REPLACE_WITH_GALLERY_7_URL',
    photo_gallery_8 = 'REPLACE_WITH_GALLERY_8_URL',
    photo_gallery_9 = 'REPLACE_WITH_GALLERY_9_URL',
    photo_gallery_10 = 'REPLACE_WITH_GALLERY_10_URL'
WHERE individual_id = 20;

-- Susan B. Anthony (ID: 21)
-- Recommended source: archives
-- Main Photo: Portrait of Susan B. Anthony (solo, prominent)
-- Gallery: Images related to Susan B. Anthony's life and achievements
UPDATE red_white_who_individuals
SET main_photo_url = 'REPLACE_WITH_MAIN_PHOTO_URL',
    photo_gallery_1 = 'REPLACE_WITH_GALLERY_1_URL',
    photo_gallery_2 = 'REPLACE_WITH_GALLERY_2_URL',
    photo_gallery_3 = 'REPLACE_WITH_GALLERY_3_URL',
    photo_gallery_4 = 'REPLACE_WITH_GALLERY_4_URL',
    photo_gallery_5 = 'REPLACE_WITH_GALLERY_5_URL',
    photo_gallery_6 = 'REPLACE_WITH_GALLERY_6_URL',
    photo_gallery_7 = 'REPLACE_WITH_GALLERY_7_URL',
    photo_gallery_8 = 'REPLACE_WITH_GALLERY_8_URL',
    photo_gallery_9 = 'REPLACE_WITH_GALLERY_9_URL',
    photo_gallery_10 = 'REPLACE_WITH_GALLERY_10_URL'
WHERE individual_id = 21;

-- Clara Barton (ID: 22)
-- Recommended source: npg
-- Main Photo: Portrait of Clara Barton (solo, prominent)
-- Gallery: Images related to Clara Barton's life and achievements
UPDATE red_white_who_individuals
SET main_photo_url = 'REPLACE_WITH_MAIN_PHOTO_URL',
    photo_gallery_1 = 'REPLACE_WITH_GALLERY_1_URL',
    photo_gallery_2 = 'REPLACE_WITH_GALLERY_2_URL',
    photo_gallery_3 = 'REPLACE_WITH_GALLERY_3_URL',
    photo_gallery_4 = 'REPLACE_WITH_GALLERY_4_URL',
    photo_gallery_5 = 'REPLACE_WITH_GALLERY_5_URL',
    photo_gallery_6 = 'REPLACE_WITH_GALLERY_6_URL',
    photo_gallery_7 = 'REPLACE_WITH_GALLERY_7_URL',
    photo_gallery_8 = 'REPLACE_WITH_GALLERY_8_URL',
    photo_gallery_9 = 'REPLACE_WITH_GALLERY_9_URL',
    photo_gallery_10 = 'REPLACE_WITH_GALLERY_10_URL'
WHERE individual_id = 22;

-- John Adams (ID: 23)
-- Recommended source: smithsonian
-- Main Photo: Portrait of John Adams (solo, prominent)
-- Gallery: Images related to John Adams's life and achievements
UPDATE red_white_who_individuals
SET main_photo_url = 'REPLACE_WITH_MAIN_PHOTO_URL',
    photo_gallery_1 = 'REPLACE_WITH_GALLERY_1_URL',
    photo_gallery_2 = 'REPLACE_WITH_GALLERY_2_URL',
    photo_gallery_3 = 'REPLACE_WITH_GALLERY_3_URL',
    photo_gallery_4 = 'REPLACE_WITH_GALLERY_4_URL',
    photo_gallery_5 = 'REPLACE_WITH_GALLERY_5_URL',
    photo_gallery_6 = 'REPLACE_WITH_GALLERY_6_URL',
    photo_gallery_7 = 'REPLACE_WITH_GALLERY_7_URL',
    photo_gallery_8 = 'REPLACE_WITH_GALLERY_8_URL',
    photo_gallery_9 = 'REPLACE_WITH_GALLERY_9_URL',
    photo_gallery_10 = 'REPLACE_WITH_GALLERY_10_URL'
WHERE individual_id = 23;

-- Alexander Hamilton (ID: 24)
-- Recommended source: britannica
-- Main Photo: Portrait of Alexander Hamilton (solo, prominent)
-- Gallery: Images related to Alexander Hamilton's life and achievements
UPDATE red_white_who_individuals
SET main_photo_url = 'REPLACE_WITH_MAIN_PHOTO_URL',
    photo_gallery_1 = 'REPLACE_WITH_GALLERY_1_URL',
    photo_gallery_2 = 'REPLACE_WITH_GALLERY_2_URL',
    photo_gallery_3 = 'REPLACE_WITH_GALLERY_3_URL',
    photo_gallery_4 = 'REPLACE_WITH_GALLERY_4_URL',
    photo_gallery_5 = 'REPLACE_WITH_GALLERY_5_URL',
    photo_gallery_6 = 'REPLACE_WITH_GALLERY_6_URL',
    photo_gallery_7 = 'REPLACE_WITH_GALLERY_7_URL',
    photo_gallery_8 = 'REPLACE_WITH_GALLERY_8_URL',
    photo_gallery_9 = 'REPLACE_WITH_GALLERY_9_URL',
    photo_gallery_10 = 'REPLACE_WITH_GALLERY_10_URL'
WHERE individual_id = 24;

-- Franklin D. Roosevelt (ID: 25)
-- Recommended source: loc
-- Main Photo: Portrait of Franklin D. Roosevelt (solo, prominent)
-- Gallery: Images related to Franklin D. Roosevelt's life and achievements
UPDATE red_white_who_individuals
SET main_photo_url = 'REPLACE_WITH_MAIN_PHOTO_URL',
    photo_gallery_1 = 'REPLACE_WITH_GALLERY_1_URL',
    photo_gallery_2 = 'REPLACE_WITH_GALLERY_2_URL',
    photo_gallery_3 = 'REPLACE_WITH_GALLERY_3_URL',
    photo_gallery_4 = 'REPLACE_WITH_GALLERY_4_URL',
    photo_gallery_5 = 'REPLACE_WITH_GALLERY_5_URL',
    photo_gallery_6 = 'REPLACE_WITH_GALLERY_6_URL',
    photo_gallery_7 = 'REPLACE_WITH_GALLERY_7_URL',
    photo_gallery_8 = 'REPLACE_WITH_GALLERY_8_URL',
    photo_gallery_9 = 'REPLACE_WITH_GALLERY_9_URL',
    photo_gallery_10 = 'REPLACE_WITH_GALLERY_10_URL'
WHERE individual_id = 25;

-- John F. Kennedy (ID: 26)
-- Recommended source: archives
-- Main Photo: Portrait of John F. Kennedy (solo, prominent)
-- Gallery: Images related to John F. Kennedy's life and achievements
UPDATE red_white_who_individuals
SET main_photo_url = 'REPLACE_WITH_MAIN_PHOTO_URL',
    photo_gallery_1 = 'REPLACE_WITH_GALLERY_1_URL',
    photo_gallery_2 = 'REPLACE_WITH_GALLERY_2_URL',
    photo_gallery_3 = 'REPLACE_WITH_GALLERY_3_URL',
    photo_gallery_4 = 'REPLACE_WITH_GALLERY_4_URL',
    photo_gallery_5 = 'REPLACE_WITH_GALLERY_5_URL',
    photo_gallery_6 = 'REPLACE_WITH_GALLERY_6_URL',
    photo_gallery_7 = 'REPLACE_WITH_GALLERY_7_URL',
    photo_gallery_8 = 'REPLACE_WITH_GALLERY_8_URL',
    photo_gallery_9 = 'REPLACE_WITH_GALLERY_9_URL',
    photo_gallery_10 = 'REPLACE_WITH_GALLERY_10_URL'
WHERE individual_id = 26;

-- Ronald Reagan (ID: 27)
-- Recommended source: npg
-- Main Photo: Portrait of Ronald Reagan (solo, prominent)
-- Gallery: Images related to Ronald Reagan's life and achievements
UPDATE red_white_who_individuals
SET main_photo_url = 'REPLACE_WITH_MAIN_PHOTO_URL',
    photo_gallery_1 = 'REPLACE_WITH_GALLERY_1_URL',
    photo_gallery_2 = 'REPLACE_WITH_GALLERY_2_URL',
    photo_gallery_3 = 'REPLACE_WITH_GALLERY_3_URL',
    photo_gallery_4 = 'REPLACE_WITH_GALLERY_4_URL',
    photo_gallery_5 = 'REPLACE_WITH_GALLERY_5_URL',
    photo_gallery_6 = 'REPLACE_WITH_GALLERY_6_URL',
    photo_gallery_7 = 'REPLACE_WITH_GALLERY_7_URL',
    photo_gallery_8 = 'REPLACE_WITH_GALLERY_8_URL',
    photo_gallery_9 = 'REPLACE_WITH_GALLERY_9_URL',
    photo_gallery_10 = 'REPLACE_WITH_GALLERY_10_URL'
WHERE individual_id = 27;

-- Helen Keller (ID: 28)
-- Recommended source: loc
-- Main Photo: Portrait of Helen Keller (solo, prominent)
-- Gallery: Images related to Helen Keller's life and achievements
UPDATE red_white_who_individuals
SET main_photo_url = 'REPLACE_WITH_MAIN_PHOTO_URL',
    photo_gallery_1 = 'REPLACE_WITH_GALLERY_1_URL',
    photo_gallery_2 = 'REPLACE_WITH_GALLERY_2_URL',
    photo_gallery_3 = 'REPLACE_WITH_GALLERY_3_URL',
    photo_gallery_4 = 'REPLACE_WITH_GALLERY_4_URL',
    photo_gallery_5 = 'REPLACE_WITH_GALLERY_5_URL',
    photo_gallery_6 = 'REPLACE_WITH_GALLERY_6_URL',
    photo_gallery_7 = 'REPLACE_WITH_GALLERY_7_URL',
    photo_gallery_8 = 'REPLACE_WITH_GALLERY_8_URL',
    photo_gallery_9 = 'REPLACE_WITH_GALLERY_9_URL',
    photo_gallery_10 = 'REPLACE_WITH_GALLERY_10_URL'
WHERE individual_id = 28;

-- George Washington Carver (ID: 29)
-- Recommended source: archives
-- Main Photo: Portrait of George Washington Carver (solo, prominent)
-- Gallery: Images related to George Washington Carver's life and achievements
UPDATE red_white_who_individuals
SET main_photo_url = 'REPLACE_WITH_MAIN_PHOTO_URL',
    photo_gallery_1 = 'REPLACE_WITH_GALLERY_1_URL',
    photo_gallery_2 = 'REPLACE_WITH_GALLERY_2_URL',
    photo_gallery_3 = 'REPLACE_WITH_GALLERY_3_URL',
    photo_gallery_4 = 'REPLACE_WITH_GALLERY_4_URL',
    photo_gallery_5 = 'REPLACE_WITH_GALLERY_5_URL',
    photo_gallery_6 = 'REPLACE_WITH_GALLERY_6_URL',
    photo_gallery_7 = 'REPLACE_WITH_GALLERY_7_URL',
    photo_gallery_8 = 'REPLACE_WITH_GALLERY_8_URL',
    photo_gallery_9 = 'REPLACE_WITH_GALLERY_9_URL',
    photo_gallery_10 = 'REPLACE_WITH_GALLERY_10_URL'
WHERE individual_id = 29;

-- Sojourner Truth (ID: 30)
-- Recommended source: npg
-- Main Photo: Portrait of Sojourner Truth (solo, prominent)
-- Gallery: Images related to Sojourner Truth's life and achievements
UPDATE red_white_who_individuals
SET main_photo_url = 'REPLACE_WITH_MAIN_PHOTO_URL',
    photo_gallery_1 = 'REPLACE_WITH_GALLERY_1_URL',
    photo_gallery_2 = 'REPLACE_WITH_GALLERY_2_URL',
    photo_gallery_3 = 'REPLACE_WITH_GALLERY_3_URL',
    photo_gallery_4 = 'REPLACE_WITH_GALLERY_4_URL',
    photo_gallery_5 = 'REPLACE_WITH_GALLERY_5_URL',
    photo_gallery_6 = 'REPLACE_WITH_GALLERY_6_URL',
    photo_gallery_7 = 'REPLACE_WITH_GALLERY_7_URL',
    photo_gallery_8 = 'REPLACE_WITH_GALLERY_8_URL',
    photo_gallery_9 = 'REPLACE_WITH_GALLERY_9_URL',
    photo_gallery_10 = 'REPLACE_WITH_GALLERY_10_URL'
WHERE individual_id = 30;

-- Booker T. Washington (ID: 31)
-- Recommended source: smithsonian
-- Main Photo: Portrait of Booker T. Washington (solo, prominent)
-- Gallery: Images related to Booker T. Washington's life and achievements
UPDATE red_white_who_individuals
SET main_photo_url = 'REPLACE_WITH_MAIN_PHOTO_URL',
    photo_gallery_1 = 'REPLACE_WITH_GALLERY_1_URL',
    photo_gallery_2 = 'REPLACE_WITH_GALLERY_2_URL',
    photo_gallery_3 = 'REPLACE_WITH_GALLERY_3_URL',
    photo_gallery_4 = 'REPLACE_WITH_GALLERY_4_URL',
    photo_gallery_5 = 'REPLACE_WITH_GALLERY_5_URL',
    photo_gallery_6 = 'REPLACE_WITH_GALLERY_6_URL',
    photo_gallery_7 = 'REPLACE_WITH_GALLERY_7_URL',
    photo_gallery_8 = 'REPLACE_WITH_GALLERY_8_URL',
    photo_gallery_9 = 'REPLACE_WITH_GALLERY_9_URL',
    photo_gallery_10 = 'REPLACE_WITH_GALLERY_10_URL'
WHERE individual_id = 31;

-- Dwight D. Eisenhower (ID: 32)
-- Recommended source: britannica
-- Main Photo: Portrait of Dwight D. Eisenhower (solo, prominent)
-- Gallery: Images related to Dwight D. Eisenhower's life and achievements
UPDATE red_white_who_individuals
SET main_photo_url = 'REPLACE_WITH_MAIN_PHOTO_URL',
    photo_gallery_1 = 'REPLACE_WITH_GALLERY_1_URL',
    photo_gallery_2 = 'REPLACE_WITH_GALLERY_2_URL',
    photo_gallery_3 = 'REPLACE_WITH_GALLERY_3_URL',
    photo_gallery_4 = 'REPLACE_WITH_GALLERY_4_URL',
    photo_gallery_5 = 'REPLACE_WITH_GALLERY_5_URL',
    photo_gallery_6 = 'REPLACE_WITH_GALLERY_6_URL',
    photo_gallery_7 = 'REPLACE_WITH_GALLERY_7_URL',
    photo_gallery_8 = 'REPLACE_WITH_GALLERY_8_URL',
    photo_gallery_9 = 'REPLACE_WITH_GALLERY_9_URL',
    photo_gallery_10 = 'REPLACE_WITH_GALLERY_10_URL'
WHERE individual_id = 32;

-- Daniel Boone (ID: 33)
-- Recommended source: loc
-- Main Photo: Portrait of Daniel Boone (solo, prominent)
-- Gallery: Images related to Daniel Boone's life and achievements
UPDATE red_white_who_individuals
SET main_photo_url = 'REPLACE_WITH_MAIN_PHOTO_URL',
    photo_gallery_1 = 'REPLACE_WITH_GALLERY_1_URL',
    photo_gallery_2 = 'REPLACE_WITH_GALLERY_2_URL',
    photo_gallery_3 = 'REPLACE_WITH_GALLERY_3_URL',
    photo_gallery_4 = 'REPLACE_WITH_GALLERY_4_URL',
    photo_gallery_5 = 'REPLACE_WITH_GALLERY_5_URL',
    photo_gallery_6 = 'REPLACE_WITH_GALLERY_6_URL',
    photo_gallery_7 = 'REPLACE_WITH_GALLERY_7_URL',
    photo_gallery_8 = 'REPLACE_WITH_GALLERY_8_URL',
    photo_gallery_9 = 'REPLACE_WITH_GALLERY_9_URL',
    photo_gallery_10 = 'REPLACE_WITH_GALLERY_10_URL'
WHERE individual_id = 33;

-- Davy Crockett (ID: 34)
-- Recommended source: archives
-- Main Photo: Portrait of Davy Crockett (solo, prominent)
-- Gallery: Images related to Davy Crockett's life and achievements
UPDATE red_white_who_individuals
SET main_photo_url = 'REPLACE_WITH_MAIN_PHOTO_URL',
    photo_gallery_1 = 'REPLACE_WITH_GALLERY_1_URL',
    photo_gallery_2 = 'REPLACE_WITH_GALLERY_2_URL',
    photo_gallery_3 = 'REPLACE_WITH_GALLERY_3_URL',
    photo_gallery_4 = 'REPLACE_WITH_GALLERY_4_URL',
    photo_gallery_5 = 'REPLACE_WITH_GALLERY_5_URL',
    photo_gallery_6 = 'REPLACE_WITH_GALLERY_6_URL',
    photo_gallery_7 = 'REPLACE_WITH_GALLERY_7_URL',
    photo_gallery_8 = 'REPLACE_WITH_GALLERY_8_URL',
    photo_gallery_9 = 'REPLACE_WITH_GALLERY_9_URL',
    photo_gallery_10 = 'REPLACE_WITH_GALLERY_10_URL'
WHERE individual_id = 34;

-- Henry Ford (ID: 35)
-- Recommended source: npg
-- Main Photo: Portrait of Henry Ford (solo, prominent)
-- Gallery: Images related to Henry Ford's life and achievements
UPDATE red_white_who_individuals
SET main_photo_url = 'REPLACE_WITH_MAIN_PHOTO_URL',
    photo_gallery_1 = 'REPLACE_WITH_GALLERY_1_URL',
    photo_gallery_2 = 'REPLACE_WITH_GALLERY_2_URL',
    photo_gallery_3 = 'REPLACE_WITH_GALLERY_3_URL',
    photo_gallery_4 = 'REPLACE_WITH_GALLERY_4_URL',
    photo_gallery_5 = 'REPLACE_WITH_GALLERY_5_URL',
    photo_gallery_6 = 'REPLACE_WITH_GALLERY_6_URL',
    photo_gallery_7 = 'REPLACE_WITH_GALLERY_7_URL',
    photo_gallery_8 = 'REPLACE_WITH_GALLERY_8_URL',
    photo_gallery_9 = 'REPLACE_WITH_GALLERY_9_URL',
    photo_gallery_10 = 'REPLACE_WITH_GALLERY_10_URL'
WHERE individual_id = 35;

-- Eleanor Roosevelt (ID: 36)
-- Recommended source: loc
-- Main Photo: Portrait of Eleanor Roosevelt (solo, prominent)
-- Gallery: Images related to Eleanor Roosevelt's life and achievements
UPDATE red_white_who_individuals
SET main_photo_url = 'REPLACE_WITH_MAIN_PHOTO_URL',
    photo_gallery_1 = 'REPLACE_WITH_GALLERY_1_URL',
    photo_gallery_2 = 'REPLACE_WITH_GALLERY_2_URL',
    photo_gallery_3 = 'REPLACE_WITH_GALLERY_3_URL',
    photo_gallery_4 = 'REPLACE_WITH_GALLERY_4_URL',
    photo_gallery_5 = 'REPLACE_WITH_GALLERY_5_URL',
    photo_gallery_6 = 'REPLACE_WITH_GALLERY_6_URL',
    photo_gallery_7 = 'REPLACE_WITH_GALLERY_7_URL',
    photo_gallery_8 = 'REPLACE_WITH_GALLERY_8_URL',
    photo_gallery_9 = 'REPLACE_WITH_GALLERY_9_URL',
    photo_gallery_10 = 'REPLACE_WITH_GALLERY_10_URL'
WHERE individual_id = 36;

-- Paul Revere (ID: 37)
-- Recommended source: archives
-- Main Photo: Portrait of Paul Revere (solo, prominent)
-- Gallery: Images related to Paul Revere's life and achievements
UPDATE red_white_who_individuals
SET main_photo_url = 'REPLACE_WITH_MAIN_PHOTO_URL',
    photo_gallery_1 = 'REPLACE_WITH_GALLERY_1_URL',
    photo_gallery_2 = 'REPLACE_WITH_GALLERY_2_URL',
    photo_gallery_3 = 'REPLACE_WITH_GALLERY_3_URL',
    photo_gallery_4 = 'REPLACE_WITH_GALLERY_4_URL',
    photo_gallery_5 = 'REPLACE_WITH_GALLERY_5_URL',
    photo_gallery_6 = 'REPLACE_WITH_GALLERY_6_URL',
    photo_gallery_7 = 'REPLACE_WITH_GALLERY_7_URL',
    photo_gallery_8 = 'REPLACE_WITH_GALLERY_8_URL',
    photo_gallery_9 = 'REPLACE_WITH_GALLERY_9_URL',
    photo_gallery_10 = 'REPLACE_WITH_GALLERY_10_URL'
WHERE individual_id = 37;

-- James Madison (ID: 38)
-- Recommended source: npg
-- Main Photo: Portrait of James Madison (solo, prominent)
-- Gallery: Images related to James Madison's life and achievements
UPDATE red_white_who_individuals
SET main_photo_url = 'REPLACE_WITH_MAIN_PHOTO_URL',
    photo_gallery_1 = 'REPLACE_WITH_GALLERY_1_URL',
    photo_gallery_2 = 'REPLACE_WITH_GALLERY_2_URL',
    photo_gallery_3 = 'REPLACE_WITH_GALLERY_3_URL',
    photo_gallery_4 = 'REPLACE_WITH_GALLERY_4_URL',
    photo_gallery_5 = 'REPLACE_WITH_GALLERY_5_URL',
    photo_gallery_6 = 'REPLACE_WITH_GALLERY_6_URL',
    photo_gallery_7 = 'REPLACE_WITH_GALLERY_7_URL',
    photo_gallery_8 = 'REPLACE_WITH_GALLERY_8_URL',
    photo_gallery_9 = 'REPLACE_WITH_GALLERY_9_URL',
    photo_gallery_10 = 'REPLACE_WITH_GALLERY_10_URL'
WHERE individual_id = 38;

-- Patrick Henry (ID: 39)
-- Recommended source: smithsonian
-- Main Photo: Portrait of Patrick Henry (solo, prominent)
-- Gallery: Images related to Patrick Henry's life and achievements
UPDATE red_white_who_individuals
SET main_photo_url = 'REPLACE_WITH_MAIN_PHOTO_URL',
    photo_gallery_1 = 'REPLACE_WITH_GALLERY_1_URL',
    photo_gallery_2 = 'REPLACE_WITH_GALLERY_2_URL',
    photo_gallery_3 = 'REPLACE_WITH_GALLERY_3_URL',
    photo_gallery_4 = 'REPLACE_WITH_GALLERY_4_URL',
    photo_gallery_5 = 'REPLACE_WITH_GALLERY_5_URL',
    photo_gallery_6 = 'REPLACE_WITH_GALLERY_6_URL',
    photo_gallery_7 = 'REPLACE_WITH_GALLERY_7_URL',
    photo_gallery_8 = 'REPLACE_WITH_GALLERY_8_URL',
    photo_gallery_9 = 'REPLACE_WITH_GALLERY_9_URL',
    photo_gallery_10 = 'REPLACE_WITH_GALLERY_10_URL'
WHERE individual_id = 39;

-- John Hancock (ID: 40)
-- Recommended source: britannica
-- Main Photo: Portrait of John Hancock (solo, prominent)
-- Gallery: Images related to John Hancock's life and achievements
UPDATE red_white_who_individuals
SET main_photo_url = 'REPLACE_WITH_MAIN_PHOTO_URL',
    photo_gallery_1 = 'REPLACE_WITH_GALLERY_1_URL',
    photo_gallery_2 = 'REPLACE_WITH_GALLERY_2_URL',
    photo_gallery_3 = 'REPLACE_WITH_GALLERY_3_URL',
    photo_gallery_4 = 'REPLACE_WITH_GALLERY_4_URL',
    photo_gallery_5 = 'REPLACE_WITH_GALLERY_5_URL',
    photo_gallery_6 = 'REPLACE_WITH_GALLERY_6_URL',
    photo_gallery_7 = 'REPLACE_WITH_GALLERY_7_URL',
    photo_gallery_8 = 'REPLACE_WITH_GALLERY_8_URL',
    photo_gallery_9 = 'REPLACE_WITH_GALLERY_9_URL',
    photo_gallery_10 = 'REPLACE_WITH_GALLERY_10_URL'
WHERE individual_id = 40;

-- Samuel Adams (ID: 41)
-- Recommended source: loc
-- Main Photo: Portrait of Samuel Adams (solo, prominent)
-- Gallery: Images related to Samuel Adams's life and achievements
UPDATE red_white_who_individuals
SET main_photo_url = 'REPLACE_WITH_MAIN_PHOTO_URL',
    photo_gallery_1 = 'REPLACE_WITH_GALLERY_1_URL',
    photo_gallery_2 = 'REPLACE_WITH_GALLERY_2_URL',
    photo_gallery_3 = 'REPLACE_WITH_GALLERY_3_URL',
    photo_gallery_4 = 'REPLACE_WITH_GALLERY_4_URL',
    photo_gallery_5 = 'REPLACE_WITH_GALLERY_5_URL',
    photo_gallery_6 = 'REPLACE_WITH_GALLERY_6_URL',
    photo_gallery_7 = 'REPLACE_WITH_GALLERY_7_URL',
    photo_gallery_8 = 'REPLACE_WITH_GALLERY_8_URL',
    photo_gallery_9 = 'REPLACE_WITH_GALLERY_9_URL',
    photo_gallery_10 = 'REPLACE_WITH_GALLERY_10_URL'
WHERE individual_id = 41;

-- Robert E. Lee (ID: 42)
-- Recommended source: archives
-- Main Photo: Portrait of Robert E. Lee (solo, prominent)
-- Gallery: Images related to Robert E. Lee's life and achievements
UPDATE red_white_who_individuals
SET main_photo_url = 'REPLACE_WITH_MAIN_PHOTO_URL',
    photo_gallery_1 = 'REPLACE_WITH_GALLERY_1_URL',
    photo_gallery_2 = 'REPLACE_WITH_GALLERY_2_URL',
    photo_gallery_3 = 'REPLACE_WITH_GALLERY_3_URL',
    photo_gallery_4 = 'REPLACE_WITH_GALLERY_4_URL',
    photo_gallery_5 = 'REPLACE_WITH_GALLERY_5_URL',
    photo_gallery_6 = 'REPLACE_WITH_GALLERY_6_URL',
    photo_gallery_7 = 'REPLACE_WITH_GALLERY_7_URL',
    photo_gallery_8 = 'REPLACE_WITH_GALLERY_8_URL',
    photo_gallery_9 = 'REPLACE_WITH_GALLERY_9_URL',
    photo_gallery_10 = 'REPLACE_WITH_GALLERY_10_URL'
WHERE individual_id = 42;

-- Andrew Jackson (ID: 43)
-- Recommended source: npg
-- Main Photo: Portrait of Andrew Jackson (solo, prominent)
-- Gallery: Images related to Andrew Jackson's life and achievements
UPDATE red_white_who_individuals
SET main_photo_url = 'REPLACE_WITH_MAIN_PHOTO_URL',
    photo_gallery_1 = 'REPLACE_WITH_GALLERY_1_URL',
    photo_gallery_2 = 'REPLACE_WITH_GALLERY_2_URL',
    photo_gallery_3 = 'REPLACE_WITH_GALLERY_3_URL',
    photo_gallery_4 = 'REPLACE_WITH_GALLERY_4_URL',
    photo_gallery_5 = 'REPLACE_WITH_GALLERY_5_URL',
    photo_gallery_6 = 'REPLACE_WITH_GALLERY_6_URL',
    photo_gallery_7 = 'REPLACE_WITH_GALLERY_7_URL',
    photo_gallery_8 = 'REPLACE_WITH_GALLERY_8_URL',
    photo_gallery_9 = 'REPLACE_WITH_GALLERY_9_URL',
    photo_gallery_10 = 'REPLACE_WITH_GALLERY_10_URL'
WHERE individual_id = 43;

-- John Muir (ID: 44)
-- Recommended source: loc
-- Main Photo: Portrait of John Muir (solo, prominent)
-- Gallery: Images related to John Muir's life and achievements
UPDATE red_white_who_individuals
SET main_photo_url = 'REPLACE_WITH_MAIN_PHOTO_URL',
    photo_gallery_1 = 'REPLACE_WITH_GALLERY_1_URL',
    photo_gallery_2 = 'REPLACE_WITH_GALLERY_2_URL',
    photo_gallery_3 = 'REPLACE_WITH_GALLERY_3_URL',
    photo_gallery_4 = 'REPLACE_WITH_GALLERY_4_URL',
    photo_gallery_5 = 'REPLACE_WITH_GALLERY_5_URL',
    photo_gallery_6 = 'REPLACE_WITH_GALLERY_6_URL',
    photo_gallery_7 = 'REPLACE_WITH_GALLERY_7_URL',
    photo_gallery_8 = 'REPLACE_WITH_GALLERY_8_URL',
    photo_gallery_9 = 'REPLACE_WITH_GALLERY_9_URL',
    photo_gallery_10 = 'REPLACE_WITH_GALLERY_10_URL'
WHERE individual_id = 44;

-- Mark Twain (ID: 45)
-- Recommended source: archives
-- Main Photo: Portrait of Mark Twain (solo, prominent)
-- Gallery: Images related to Mark Twain's life and achievements
UPDATE red_white_who_individuals
SET main_photo_url = 'REPLACE_WITH_MAIN_PHOTO_URL',
    photo_gallery_1 = 'REPLACE_WITH_GALLERY_1_URL',
    photo_gallery_2 = 'REPLACE_WITH_GALLERY_2_URL',
    photo_gallery_3 = 'REPLACE_WITH_GALLERY_3_URL',
    photo_gallery_4 = 'REPLACE_WITH_GALLERY_4_URL',
    photo_gallery_5 = 'REPLACE_WITH_GALLERY_5_URL',
    photo_gallery_6 = 'REPLACE_WITH_GALLERY_6_URL',
    photo_gallery_7 = 'REPLACE_WITH_GALLERY_7_URL',
    photo_gallery_8 = 'REPLACE_WITH_GALLERY_8_URL',
    photo_gallery_9 = 'REPLACE_WITH_GALLERY_9_URL',
    photo_gallery_10 = 'REPLACE_WITH_GALLERY_10_URL'
WHERE individual_id = 45;

-- Thurgood Marshall (ID: 46)
-- Recommended source: npg
-- Main Photo: Portrait of Thurgood Marshall (solo, prominent)
-- Gallery: Images related to Thurgood Marshall's life and achievements
UPDATE red_white_who_individuals
SET main_photo_url = 'REPLACE_WITH_MAIN_PHOTO_URL',
    photo_gallery_1 = 'REPLACE_WITH_GALLERY_1_URL',
    photo_gallery_2 = 'REPLACE_WITH_GALLERY_2_URL',
    photo_gallery_3 = 'REPLACE_WITH_GALLERY_3_URL',
    photo_gallery_4 = 'REPLACE_WITH_GALLERY_4_URL',
    photo_gallery_5 = 'REPLACE_WITH_GALLERY_5_URL',
    photo_gallery_6 = 'REPLACE_WITH_GALLERY_6_URL',
    photo_gallery_7 = 'REPLACE_WITH_GALLERY_7_URL',
    photo_gallery_8 = 'REPLACE_WITH_GALLERY_8_URL',
    photo_gallery_9 = 'REPLACE_WITH_GALLERY_9_URL',
    photo_gallery_10 = 'REPLACE_WITH_GALLERY_10_URL'
WHERE individual_id = 46;

-- John Lewis (ID: 47)
-- Recommended source: smithsonian
-- Main Photo: Portrait of John Lewis (solo, prominent)
-- Gallery: Images related to John Lewis's life and achievements
UPDATE red_white_who_individuals
SET main_photo_url = 'REPLACE_WITH_MAIN_PHOTO_URL',
    photo_gallery_1 = 'REPLACE_WITH_GALLERY_1_URL',
    photo_gallery_2 = 'REPLACE_WITH_GALLERY_2_URL',
    photo_gallery_3 = 'REPLACE_WITH_GALLERY_3_URL',
    photo_gallery_4 = 'REPLACE_WITH_GALLERY_4_URL',
    photo_gallery_5 = 'REPLACE_WITH_GALLERY_5_URL',
    photo_gallery_6 = 'REPLACE_WITH_GALLERY_6_URL',
    photo_gallery_7 = 'REPLACE_WITH_GALLERY_7_URL',
    photo_gallery_8 = 'REPLACE_WITH_GALLERY_8_URL',
    photo_gallery_9 = 'REPLACE_WITH_GALLERY_9_URL',
    photo_gallery_10 = 'REPLACE_WITH_GALLERY_10_URL'
WHERE individual_id = 47;

-- Walt Disney (ID: 48)
-- Recommended source: britannica
-- Main Photo: Portrait of Walt Disney (solo, prominent)
-- Gallery: Images related to Walt Disney's life and achievements
UPDATE red_white_who_individuals
SET main_photo_url = 'REPLACE_WITH_MAIN_PHOTO_URL',
    photo_gallery_1 = 'REPLACE_WITH_GALLERY_1_URL',
    photo_gallery_2 = 'REPLACE_WITH_GALLERY_2_URL',
    photo_gallery_3 = 'REPLACE_WITH_GALLERY_3_URL',
    photo_gallery_4 = 'REPLACE_WITH_GALLERY_4_URL',
    photo_gallery_5 = 'REPLACE_WITH_GALLERY_5_URL',
    photo_gallery_6 = 'REPLACE_WITH_GALLERY_6_URL',
    photo_gallery_7 = 'REPLACE_WITH_GALLERY_7_URL',
    photo_gallery_8 = 'REPLACE_WITH_GALLERY_8_URL',
    photo_gallery_9 = 'REPLACE_WITH_GALLERY_9_URL',
    photo_gallery_10 = 'REPLACE_WITH_GALLERY_10_URL'
WHERE individual_id = 48;

-- Cesar Chavez (ID: 49)
-- Recommended source: loc
-- Main Photo: Portrait of Cesar Chavez (solo, prominent)
-- Gallery: Images related to Cesar Chavez's life and achievements
UPDATE red_white_who_individuals
SET main_photo_url = 'REPLACE_WITH_MAIN_PHOTO_URL',
    photo_gallery_1 = 'REPLACE_WITH_GALLERY_1_URL',
    photo_gallery_2 = 'REPLACE_WITH_GALLERY_2_URL',
    photo_gallery_3 = 'REPLACE_WITH_GALLERY_3_URL',
    photo_gallery_4 = 'REPLACE_WITH_GALLERY_4_URL',
    photo_gallery_5 = 'REPLACE_WITH_GALLERY_5_URL',
    photo_gallery_6 = 'REPLACE_WITH_GALLERY_6_URL',
    photo_gallery_7 = 'REPLACE_WITH_GALLERY_7_URL',
    photo_gallery_8 = 'REPLACE_WITH_GALLERY_8_URL',
    photo_gallery_9 = 'REPLACE_WITH_GALLERY_9_URL',
    photo_gallery_10 = 'REPLACE_WITH_GALLERY_10_URL'
WHERE individual_id = 49;

-- Sitting Bull (ID: 50)
-- Recommended source: archives
-- Main Photo: Portrait of Sitting Bull (solo, prominent)
-- Gallery: Images related to Sitting Bull's life and achievements
UPDATE red_white_who_individuals
SET main_photo_url = 'REPLACE_WITH_MAIN_PHOTO_URL',
    photo_gallery_1 = 'REPLACE_WITH_GALLERY_1_URL',
    photo_gallery_2 = 'REPLACE_WITH_GALLERY_2_URL',
    photo_gallery_3 = 'REPLACE_WITH_GALLERY_3_URL',
    photo_gallery_4 = 'REPLACE_WITH_GALLERY_4_URL',
    photo_gallery_5 = 'REPLACE_WITH_GALLERY_5_URL',
    photo_gallery_6 = 'REPLACE_WITH_GALLERY_6_URL',
    photo_gallery_7 = 'REPLACE_WITH_GALLERY_7_URL',
    photo_gallery_8 = 'REPLACE_WITH_GALLERY_8_URL',
    photo_gallery_9 = 'REPLACE_WITH_GALLERY_9_URL',
    photo_gallery_10 = 'REPLACE_WITH_GALLERY_10_URL'
WHERE individual_id = 50;

-- Audie Murphy (ID: 51)
-- Recommended source: npg
-- Main Photo: Portrait of Audie Murphy (solo, prominent)
-- Gallery: Images related to Audie Murphy's life and achievements
UPDATE red_white_who_individuals
SET main_photo_url = 'REPLACE_WITH_MAIN_PHOTO_URL',
    photo_gallery_1 = 'REPLACE_WITH_GALLERY_1_URL',
    photo_gallery_2 = 'REPLACE_WITH_GALLERY_2_URL',
    photo_gallery_3 = 'REPLACE_WITH_GALLERY_3_URL',
    photo_gallery_4 = 'REPLACE_WITH_GALLERY_4_URL',
    photo_gallery_5 = 'REPLACE_WITH_GALLERY_5_URL',
    photo_gallery_6 = 'REPLACE_WITH_GALLERY_6_URL',
    photo_gallery_7 = 'REPLACE_WITH_GALLERY_7_URL',
    photo_gallery_8 = 'REPLACE_WITH_GALLERY_8_URL',
    photo_gallery_9 = 'REPLACE_WITH_GALLERY_9_URL',
    photo_gallery_10 = 'REPLACE_WITH_GALLERY_10_URL'
WHERE individual_id = 51;

-- Pocahontas (ID: 52)
-- Recommended source: loc
-- Main Photo: Portrait of Pocahontas (solo, prominent)
-- Gallery: Images related to Pocahontas's life and achievements
UPDATE red_white_who_individuals
SET main_photo_url = 'REPLACE_WITH_MAIN_PHOTO_URL',
    photo_gallery_1 = 'REPLACE_WITH_GALLERY_1_URL',
    photo_gallery_2 = 'REPLACE_WITH_GALLERY_2_URL',
    photo_gallery_3 = 'REPLACE_WITH_GALLERY_3_URL',
    photo_gallery_4 = 'REPLACE_WITH_GALLERY_4_URL',
    photo_gallery_5 = 'REPLACE_WITH_GALLERY_5_URL',
    photo_gallery_6 = 'REPLACE_WITH_GALLERY_6_URL',
    photo_gallery_7 = 'REPLACE_WITH_GALLERY_7_URL',
    photo_gallery_8 = 'REPLACE_WITH_GALLERY_8_URL',
    photo_gallery_9 = 'REPLACE_WITH_GALLERY_9_URL',
    photo_gallery_10 = 'REPLACE_WITH_GALLERY_10_URL'
WHERE individual_id = 52;


-- VERIFICATION QUERY:
-- SELECT individual_id, name, main_photo_url FROM red_white_who_individuals ORDER BY individual_id;
