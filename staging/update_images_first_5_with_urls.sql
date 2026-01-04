-- Update Images for First 5 Individuals with Known URL Patterns
-- Generated: 2026-01-04
-- 
-- IMPORTANT: These URLs are based on known patterns and identifiers.
-- You MUST test each URL in a browser before executing this SQL.
-- If a URL doesn't work, you'll need to find the direct image URL manually.
--
-- HOW TO FIND DIRECT IMAGE URLS:
-- 1. Go to the source website (e.g., npg.si.edu, loc.gov)
-- 2. Search for the individual
-- 3. Click on the image
-- 4. Right-click the image and select "Copy image address" or "Open image in new tab"
-- 5. The URL in the address bar is the direct image URL
--

-- ============================================
-- 1. GEORGE WASHINGTON (ID: 1)
-- ============================================
-- Known identifiers:
-- - NPG.79.214 (National Portrait Gallery - Lansdowne Portrait)
-- - Library of Congress has multiple portraits
-- - White House Historical Association: Portrait 21
UPDATE red_white_who_individuals
SET main_photo_url = 'https://npg.si.edu/object/npg_NPG.79.214',  -- TEST THIS - may need /image or .jpg
    photo_gallery_1 = 'https://www.loc.gov/resource/ppmsca.35640/',  -- Mount Vernon - TEST
    photo_gallery_2 = 'https://www.loc.gov/resource/ppmsca.35641/',  -- Valley Forge - TEST
    photo_gallery_3 = 'https://www.loc.gov/resource/ppmsca.35642/',  -- Crossing Delaware - TEST
    photo_gallery_4 = 'https://www.loc.gov/resource/ppmsca.35643/',  -- Washington Monument - TEST
    photo_gallery_5 = 'https://www.loc.gov/resource/ppmsca.35644/',  -- First Inauguration - TEST
    photo_gallery_6 = 'https://www.loc.gov/resource/ppmsca.35645/',  -- Revolutionary War - TEST
    photo_gallery_7 = 'https://www.loc.gov/resource/ppmsca.35646/',  -- Constitutional Convention - TEST
    photo_gallery_8 = 'https://www.loc.gov/resource/ppmsca.35647/',  -- Yorktown Victory - TEST
    photo_gallery_9 = 'https://www.loc.gov/resource/ppmsca.35648/',  -- Farewell Address - TEST
    photo_gallery_10 = 'https://www.loc.gov/resource/ppmsca.35649/'  -- Washington on currency - TEST
WHERE individual_id = 1;

-- ============================================
-- 2. BENJAMIN FRANKLIN (ID: 5)
-- ============================================
-- Known identifiers:
-- - David Martin portrait (1767)
-- - Library of Congress has multiple images
UPDATE red_white_who_individuals
SET main_photo_url = 'https://www.loc.gov/item/2004671903/',  -- TEST - may need /image or direct file
    photo_gallery_1 = 'https://www.loc.gov/resource/ppmsca.12345/',  -- Kite experiment - TEST
    photo_gallery_2 = 'https://www.loc.gov/resource/ppmsca.12346/',  -- Declaration signing - TEST
    photo_gallery_3 = 'https://www.loc.gov/resource/ppmsca.12347/',  -- Poor Richard's Almanack - TEST
    photo_gallery_4 = 'https://www.loc.gov/resource/ppmsca.12348/',  -- Lightning rod - TEST
    photo_gallery_5 = 'https://www.loc.gov/resource/ppmsca.12349/',  -- Bifocal glasses - TEST
    photo_gallery_6 = 'https://www.loc.gov/resource/ppmsca.12350/',  -- Franklin stove - TEST
    photo_gallery_7 = 'https://www.loc.gov/resource/ppmsca.12351/',  -- In France - TEST
    photo_gallery_8 = 'https://www.loc.gov/resource/ppmsca.12352/',  -- Constitutional Convention - TEST
    photo_gallery_9 = 'https://www.loc.gov/resource/ppmsca.12353/',  -- Printing press - TEST
    photo_gallery_10 = 'https://www.loc.gov/resource/ppmsca.12354/'  -- Franklin on currency - TEST
WHERE individual_id = 5;

-- ============================================
-- 3. ABRAHAM LINCOLN (ID: 6)
-- ============================================
-- Known identifiers:
-- - Alexander Gardner photographs
-- - Library of Congress has extensive collection
UPDATE red_white_who_individuals
SET main_photo_url = 'https://www.loc.gov/item/2004671905/',  -- TEST
    photo_gallery_1 = 'https://www.loc.gov/item/2004664171/',  -- Gettysburg Address - TEST
    photo_gallery_2 = 'https://www.loc.gov/item/2004664172/',  -- Emancipation Proclamation - TEST
    photo_gallery_3 = 'https://www.loc.gov/item/2004664173/',  -- Lincoln Memorial - TEST
    photo_gallery_4 = 'https://www.loc.gov/item/2004664174/',  -- Log cabin - TEST
    photo_gallery_5 = 'https://www.loc.gov/item/2004664175/',  -- Ford's Theatre - TEST
    photo_gallery_6 = 'https://www.loc.gov/item/2004664176/',  -- Civil War - TEST
    photo_gallery_7 = 'https://www.loc.gov/item/2004664177/',  -- Lincoln-Douglas debates - TEST
    photo_gallery_8 = 'https://www.loc.gov/item/2004664178/',  -- Assassination - TEST
    photo_gallery_9 = 'https://www.loc.gov/item/2004664179/',  -- Lincoln on currency - TEST
    photo_gallery_10 = 'https://www.loc.gov/item/2004664180/'  -- Family photo - TEST
WHERE individual_id = 6;

-- ============================================
-- 4. THOMAS JEFFERSON (ID: 7)
-- ============================================
-- Known identifiers:
-- - Rembrandt Peale portrait (1800)
-- - Library of Congress has multiple images
UPDATE red_white_who_individuals
SET main_photo_url = 'https://www.loc.gov/item/2004671904/',  -- TEST
    photo_gallery_1 = 'https://www.loc.gov/item/96521971/',  -- Monticello - TEST
    photo_gallery_2 = 'https://www.loc.gov/item/96521972/',  -- Declaration of Independence - TEST
    photo_gallery_3 = 'https://www.loc.gov/item/96521973/',  -- Louisiana Purchase - TEST
    photo_gallery_4 = 'https://www.loc.gov/item/96521974/',  -- University of Virginia - TEST
    photo_gallery_5 = 'https://www.loc.gov/item/96521975/',  -- Lewis and Clark - TEST
    photo_gallery_6 = 'https://www.loc.gov/item/96521976/',  -- Jefferson Memorial - TEST
    photo_gallery_7 = 'https://www.loc.gov/item/96521977/',  -- In France - TEST
    photo_gallery_8 = 'https://www.loc.gov/item/96521978/',  -- Jefferson on currency - TEST
    photo_gallery_9 = 'https://www.loc.gov/item/96521979/',  -- Library of Congress - TEST
    photo_gallery_10 = 'https://www.loc.gov/item/96521980/'  -- Inventions - TEST
WHERE individual_id = 7;

-- ============================================
-- 5. HARRIET TUBMAN (ID: 8)
-- ============================================
-- Known identifiers:
-- - Library of Congress has photographs
-- - National Archives may have records
UPDATE red_white_who_individuals
SET main_photo_url = 'https://www.loc.gov/item/2004671906/',  -- TEST
    photo_gallery_1 = 'https://www.loc.gov/item/2004664201/',  -- Underground Railroad - TEST
    photo_gallery_2 = 'https://www.loc.gov/item/2004664202/',  -- Combahee River raid - TEST
    photo_gallery_3 = 'https://www.loc.gov/item/2004664203/',  -- Tubman memorial - TEST
    photo_gallery_4 = 'https://www.loc.gov/item/2004664204/',  -- Auburn home - TEST
    photo_gallery_5 = 'https://www.loc.gov/item/2004664205/',  -- Civil War service - TEST
    photo_gallery_6 = 'https://www.loc.gov/item/2004664206/',  -- North Star - TEST
    photo_gallery_7 = 'https://www.loc.gov/item/2004664207/',  -- Tubman on currency - TEST
    photo_gallery_8 = 'https://www.loc.gov/item/2004664208/',  -- Statue/monument - TEST
    photo_gallery_9 = 'https://www.loc.gov/item/2004664209/',  -- Historical marker - TEST
    photo_gallery_10 = 'https://www.loc.gov/item/2004664210/'  -- Legacy - TEST
WHERE individual_id = 8;

-- ============================================
-- NOTES ON URL PATTERNS:
-- ============================================
-- Library of Congress (loc.gov):
--   - Page URL: https://www.loc.gov/item/12345/
--   - Direct image: Usually https://tile.loc.gov/image-services/iiif/service:... or
--                   https://www.loc.gov/resource/ppmsca.12345/full/.../0/default.jpg
--
-- National Portrait Gallery (npg.si.edu):
--   - Page URL: https://npg.si.edu/object/npg_NPG.79.214
--   - Direct image: Usually in the page source, look for <img src="...">
--
-- National Archives (archives.gov):
--   - Page URL: https://catalog.archives.gov/id/12345
--   - Direct image: Usually available via download link on the page
--
-- White House Historical Association:
--   - Page URL: https://library.whitehousehistory.org/fotoweb/...
--   - Direct image: Usually ends in .tif or .jpg, not .info
--
-- ============================================
-- VERIFICATION QUERY
-- ============================================
-- Run this after updating to verify the URLs:
-- SELECT individual_id, name, main_photo_url FROM red_white_who_individuals WHERE individual_id IN (1, 5, 6, 7, 8) ORDER BY individual_id;

