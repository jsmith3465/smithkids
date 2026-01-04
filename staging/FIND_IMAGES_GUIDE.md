# Guide to Finding Direct Image URLs for First 5 Individuals

## Overview
This guide helps you find direct image URLs (not page URLs) for the first 5 individuals in the Red, White & Who database.

## What is a Direct Image URL?
A direct image URL is a URL that points directly to an image file (usually ending in .jpg, .png, .tif, etc.) and displays the image when opened in a browser.

**Good (Direct Image URL):**
- `https://npg.si.edu/object/npg_NPG.79.214.jpg`
- `https://www.loc.gov/resource/pnp.hec.12345.jpg`

**Bad (Page URL):**
- `https://npg.si.edu/object/npg_NPG.79.214` (page, not image)
- `https://www.loc.gov/item/12345/` (page, not image)

## How to Find Direct Image URLs

### Method 1: Right-Click on Image
1. Go to the source website
2. Find the image you want
3. Right-click on the image
4. Select "Copy image address" or "Open image in new tab"
5. The URL in the address bar is the direct image URL

### Method 2: Inspect Element
1. Go to the page with the image
2. Right-click on the image
3. Select "Inspect" or "Inspect Element"
4. Look for the `<img>` tag
5. Find the `src` attribute - that's the direct image URL

### Method 3: View Page Source
1. Go to the page with the image
2. Right-click and select "View Page Source"
3. Search for the image filename (Ctrl+F)
4. Find the image URL in the HTML

## Sources for Each Individual

### 1. George Washington (ID: 1)

**Main Photo Sources:**
- National Portrait Gallery: https://npg.si.edu/collection/search?q=George%20Washington
- Library of Congress: https://www.loc.gov/search/?q=George%20Washington%20portrait
- White House Historical Association: https://www.whitehousehistory.org/

**Gallery Photo Ideas:**
- Mount Vernon (his home)
- Valley Forge (winter encampment)
- Crossing the Delaware (famous painting)
- Washington Monument
- First inauguration
- Revolutionary War scenes
- Constitutional Convention
- Yorktown victory
- Farewell address
- Washington on currency

### 2. Benjamin Franklin (ID: 5)

**Main Photo Sources:**
- National Portrait Gallery: https://npg.si.edu/collection/search?q=Benjamin%20Franklin
- Library of Congress: https://www.loc.gov/search/?q=Benjamin%20Franklin%20portrait
- White House Historical Association: https://www.whitehousehistory.org/

**Gallery Photo Ideas:**
- Kite experiment (lightning)
- Signing Declaration of Independence
- Poor Richard's Almanack
- Lightning rod invention
- Bifocal glasses
- Franklin stove
- In France (diplomat)
- Constitutional Convention
- Printing press
- Franklin on currency

### 3. Abraham Lincoln (ID: 6)

**Main Photo Sources:**
- National Portrait Gallery: https://npg.si.edu/collection/search?q=Abraham%20Lincoln
- Library of Congress: https://www.loc.gov/search/?q=Abraham%20Lincoln%20portrait
- National Archives: https://catalog.archives.gov/search?q=Abraham%20Lincoln

**Gallery Photo Ideas:**
- Gettysburg Address
- Emancipation Proclamation document
- Lincoln Memorial
- Log cabin (birthplace)
- Ford's Theatre
- Civil War scenes
- Lincoln-Douglas debates
- Assassination
- Lincoln on currency
- Family photos

### 4. Thomas Jefferson (ID: 7)

**Main Photo Sources:**
- National Portrait Gallery: https://npg.si.edu/collection/search?q=Thomas%20Jefferson
- Library of Congress: https://www.loc.gov/search/?q=Thomas%20Jefferson%20portrait
- Monticello: https://www.monticello.org/

**Gallery Photo Ideas:**
- Monticello (his home)
- Declaration of Independence
- Louisiana Purchase
- University of Virginia
- Lewis and Clark expedition
- Jefferson Memorial
- In France (diplomat)
- Jefferson on currency
- Library of Congress
- Inventions (wheel cipher, plow)

### 5. Harriet Tubman (ID: 8)

**Main Photo Sources:**
- National Portrait Gallery: https://npg.si.edu/collection/search?q=Harriet%20Tubman
- Library of Congress: https://www.loc.gov/search/?q=Harriet%20Tubman%20portrait
- National Archives: https://catalog.archives.gov/search?q=Harriet%20Tubman

**Gallery Photo Ideas:**
- Underground Railroad routes
- Combahee River raid
- Tubman memorial/statue
- Auburn, NY home
- Civil War service
- North Star (navigation)
- Tubman on currency ($20 bill)
- Statues/monuments
- Historical markers
- Legacy/memorials

## Testing URLs

Before updating the database:
1. Copy each URL
2. Paste it into a new browser tab
3. If it shows the image directly, it's a good URL
4. If it shows a webpage, you need to find the direct image URL

## Next Steps

1. Use the search URLs above to find images
2. Get the direct image URLs using the methods described
3. Replace the placeholders in `update_images_first_5.sql`
4. Test all URLs
5. Execute the SQL in Supabase

