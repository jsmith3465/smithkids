-- Update Images for First 5 Individuals
-- Generated: 2026-01-04
-- 
-- INSTRUCTIONS:
-- 1. For each URL below, you need to find the DIRECT image URL (not the page URL)
-- 2. Direct image URLs typically end in .jpg, .png, .tif, or have /image/ in the path
-- 3. Test each URL in a browser - it should display the image directly
-- 4. Replace the placeholder URLs with actual working direct image URLs
-- 5. Use diverse sources to avoid throttling:
--    - Library of Congress (loc.gov)
--    - National Archives (archives.gov)  
--    - National Portrait Gallery (npg.si.edu)
--    - Smithsonian (si.edu)
--    - White House Historical Association
--    - Britannica (britannica.com)
--
-- HOW TO FIND DIRECT IMAGE URLS:
-- 1. Go to the source website (e.g., npg.si.edu)
-- 2. Search for the individual
-- 3. Click on the image
-- 4. Right-click the image and select "Copy image address" or "Open image in new tab"
-- 5. The URL in the address bar is the direct image URL
--

-- ============================================
-- 1. GEORGE WASHINGTON (ID: 1)
-- ============================================
-- Main Photo: Portrait featuring George Washington prominently by himself
-- Sources to try:
--   - National Portrait Gallery: https://npg.si.edu/collection/search?q=George%20Washington
--   - Library of Congress: https://www.loc.gov/search/?q=George%20Washington%20portrait
--   - White House: https://www.whitehousehistory.org/
UPDATE red_white_who_individuals
SET main_photo_url = 'REPLACE_WITH_DIRECT_IMAGE_URL',
    photo_gallery_1 = 'REPLACE_WITH_DIRECT_IMAGE_URL',  -- Mount Vernon
    photo_gallery_2 = 'REPLACE_WITH_DIRECT_IMAGE_URL',  -- Valley Forge
    photo_gallery_3 = 'REPLACE_WITH_DIRECT_IMAGE_URL',  -- Crossing Delaware
    photo_gallery_4 = 'REPLACE_WITH_DIRECT_IMAGE_URL',  -- Washington Monument
    photo_gallery_5 = 'REPLACE_WITH_DIRECT_IMAGE_URL',  -- First Inauguration
    photo_gallery_6 = 'REPLACE_WITH_DIRECT_IMAGE_URL',  -- Revolutionary War
    photo_gallery_7 = 'REPLACE_WITH_DIRECT_IMAGE_URL',  -- Constitutional Convention
    photo_gallery_8 = 'REPLACE_WITH_DIRECT_IMAGE_URL',  -- Yorktown Victory
    photo_gallery_9 = 'REPLACE_WITH_DIRECT_IMAGE_URL',  -- Farewell Address
    photo_gallery_10 = 'REPLACE_WITH_DIRECT_IMAGE_URL'  -- Washington on currency
WHERE individual_id = 1;

-- ============================================
-- 2. BENJAMIN FRANKLIN (ID: 5)
-- ============================================
-- Main Photo: Portrait featuring Benjamin Franklin prominently by himself
-- Sources to try:
--   - National Portrait Gallery: https://npg.si.edu/collection/search?q=Benjamin%20Franklin
--   - Library of Congress: https://www.loc.gov/search/?q=Benjamin%20Franklin%20portrait
--   - White House: https://www.whitehousehistory.org/
UPDATE red_white_who_individuals
SET main_photo_url = 'REPLACE_WITH_DIRECT_IMAGE_URL',
    photo_gallery_1 = 'REPLACE_WITH_DIRECT_IMAGE_URL',  -- Kite experiment
    photo_gallery_2 = 'REPLACE_WITH_DIRECT_IMAGE_URL',  -- Declaration signing
    photo_gallery_3 = 'REPLACE_WITH_DIRECT_IMAGE_URL',  -- Poor Richard's Almanack
    photo_gallery_4 = 'REPLACE_WITH_DIRECT_IMAGE_URL',  -- Lightning rod
    photo_gallery_5 = 'REPLACE_WITH_DIRECT_IMAGE_URL',  -- Bifocal glasses
    photo_gallery_6 = 'REPLACE_WITH_DIRECT_IMAGE_URL',  -- Franklin stove
    photo_gallery_7 = 'REPLACE_WITH_DIRECT_IMAGE_URL',  -- In France
    photo_gallery_8 = 'REPLACE_WITH_DIRECT_IMAGE_URL',  -- Constitutional Convention
    photo_gallery_9 = 'REPLACE_WITH_DIRECT_IMAGE_URL',  -- Printing press
    photo_gallery_10 = 'REPLACE_WITH_DIRECT_IMAGE_URL'  -- Franklin on currency
WHERE individual_id = 5;

-- ============================================
-- 3. ABRAHAM LINCOLN (ID: 6)
-- ============================================
-- Main Photo: Portrait featuring Abraham Lincoln prominently by himself
-- Sources to try:
--   - National Portrait Gallery: https://npg.si.edu/collection/search?q=Abraham%20Lincoln
--   - Library of Congress: https://www.loc.gov/search/?q=Abraham%20Lincoln%20portrait
--   - National Archives: https://catalog.archives.gov/search?q=Abraham%20Lincoln
UPDATE red_white_who_individuals
SET main_photo_url = 'REPLACE_WITH_DIRECT_IMAGE_URL',
    photo_gallery_1 = 'REPLACE_WITH_DIRECT_IMAGE_URL',  -- Gettysburg Address
    photo_gallery_2 = 'REPLACE_WITH_DIRECT_IMAGE_URL',  -- Emancipation Proclamation
    photo_gallery_3 = 'REPLACE_WITH_DIRECT_IMAGE_URL',  -- Lincoln Memorial
    photo_gallery_4 = 'REPLACE_WITH_DIRECT_IMAGE_URL',  -- Log cabin
    photo_gallery_5 = 'REPLACE_WITH_DIRECT_IMAGE_URL',  -- Ford's Theatre
    photo_gallery_6 = 'REPLACE_WITH_DIRECT_IMAGE_URL',  -- Civil War
    photo_gallery_7 = 'REPLACE_WITH_DIRECT_IMAGE_URL',  -- Lincoln-Douglas debates
    photo_gallery_8 = 'REPLACE_WITH_DIRECT_IMAGE_URL',  -- Assassination
    photo_gallery_9 = 'REPLACE_WITH_DIRECT_IMAGE_URL',  -- Lincoln on currency
    photo_gallery_10 = 'REPLACE_WITH_DIRECT_IMAGE_URL'  -- Family photo
WHERE individual_id = 6;

-- ============================================
-- 4. THOMAS JEFFERSON (ID: 7)
-- ============================================
-- Main Photo: Portrait featuring Thomas Jefferson prominently by himself
-- Sources to try:
--   - National Portrait Gallery: https://npg.si.edu/collection/search?q=Thomas%20Jefferson
--   - Library of Congress: https://www.loc.gov/search/?q=Thomas%20Jefferson%20portrait
--   - Monticello: https://www.monticello.org/
UPDATE red_white_who_individuals
SET main_photo_url = 'REPLACE_WITH_DIRECT_IMAGE_URL',
    photo_gallery_1 = 'REPLACE_WITH_DIRECT_IMAGE_URL',  -- Monticello
    photo_gallery_2 = 'REPLACE_WITH_DIRECT_IMAGE_URL',  -- Declaration of Independence
    photo_gallery_3 = 'REPLACE_WITH_DIRECT_IMAGE_URL',  -- Louisiana Purchase
    photo_gallery_4 = 'REPLACE_WITH_DIRECT_IMAGE_URL',  -- University of Virginia
    photo_gallery_5 = 'REPLACE_WITH_DIRECT_IMAGE_URL',  -- Lewis and Clark
    photo_gallery_6 = 'REPLACE_WITH_DIRECT_IMAGE_URL',  -- Jefferson Memorial
    photo_gallery_7 = 'REPLACE_WITH_DIRECT_IMAGE_URL',  -- In France
    photo_gallery_8 = 'REPLACE_WITH_DIRECT_IMAGE_URL',  -- Jefferson on currency
    photo_gallery_9 = 'REPLACE_WITH_DIRECT_IMAGE_URL',  -- Library of Congress
    photo_gallery_10 = 'REPLACE_WITH_DIRECT_IMAGE_URL'  -- Inventions
WHERE individual_id = 7;

-- ============================================
-- 5. HARRIET TUBMAN (ID: 8)
-- ============================================
-- Main Photo: Portrait featuring Harriet Tubman prominently by herself
-- Sources to try:
--   - National Portrait Gallery: https://npg.si.edu/collection/search?q=Harriet%20Tubman
--   - Library of Congress: https://www.loc.gov/search/?q=Harriet%20Tubman%20portrait
--   - National Archives: https://catalog.archives.gov/search?q=Harriet%20Tubman
UPDATE red_white_who_individuals
SET main_photo_url = 'REPLACE_WITH_DIRECT_IMAGE_URL',
    photo_gallery_1 = 'REPLACE_WITH_DIRECT_IMAGE_URL',  -- Underground Railroad
    photo_gallery_2 = 'REPLACE_WITH_DIRECT_IMAGE_URL',  -- Combahee River raid
    photo_gallery_3 = 'REPLACE_WITH_DIRECT_IMAGE_URL',  -- Tubman memorial
    photo_gallery_4 = 'REPLACE_WITH_DIRECT_IMAGE_URL',  -- Auburn home
    photo_gallery_5 = 'REPLACE_WITH_DIRECT_IMAGE_URL',  -- Civil War service
    photo_gallery_6 = 'REPLACE_WITH_DIRECT_IMAGE_URL',  -- North Star
    photo_gallery_7 = 'REPLACE_WITH_DIRECT_IMAGE_URL',  -- Tubman on currency
    photo_gallery_8 = 'REPLACE_WITH_DIRECT_IMAGE_URL',  -- Statue/monument
    photo_gallery_9 = 'REPLACE_WITH_DIRECT_IMAGE_URL',  -- Historical marker
    photo_gallery_10 = 'REPLACE_WITH_DIRECT_IMAGE_URL'  -- Legacy
WHERE individual_id = 8;

-- ============================================
-- VERIFICATION QUERY
-- ============================================
-- Run this after updating to verify the URLs:
-- SELECT individual_id, name, main_photo_url FROM red_white_who_individuals WHERE individual_id IN (1, 5, 6, 7, 8) ORDER BY individual_id;

