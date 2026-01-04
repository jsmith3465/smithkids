# Red, White & Who Image Update Guide

## Problem
All images are currently from `upload.wikimedia.org`, which is being throttled. We need to diversify image sources across multiple providers to prevent future throttling.

## Solution Strategy
Distribute images across multiple public domain sources:
- **Library of Congress** (loc.gov) - ~15 individuals
- **National Archives** (archives.gov) - ~10 individuals  
- **National Portrait Gallery** (npg.si.edu) - ~10 individuals
- **Smithsonian** (si.edu) - ~8 individuals
- **Britannica** (britannica.com) - ~6 individuals

## How to Find Images

### 1. Library of Congress (loc.gov)
- Search: https://www.loc.gov/search/?q=NAME
- Look for "View larger image" or "Download" button
- Copy the direct image URL (usually ends in .jpg, .png, .tif)

### 2. National Archives (archives.gov)
- Search: https://catalog.archives.gov/search?q=NAME
- Click on image, then "View in National Archives Catalog"
- Right-click image and "Copy image address"

### 3. National Portrait Gallery (npg.si.edu)
- Search: https://npg.si.edu/collection/search?q=NAME
- Click on portrait, then "Download" or "View full image"
- Copy the direct image URL

### 4. Smithsonian (si.edu)
- Search: https://www.si.edu/search?q=NAME
- Filter by "Images"
- Click image, then "Download" or copy image URL

### 5. Britannica (britannica.com)
- Search: https://www.britannica.com/search?query=NAME
- Images are usually in CDN format: `https://cdn.britannica.com/...`

## Image Requirements

### Main Photo
- Must prominently feature the individual **by themselves**
- Portrait style preferred
- High quality, clear image
- Public domain or free to use

### Gallery Photos (10 per individual)
- Should relate directly to the individual
- Should connect to content in their biography
- Examples:
  - Historical events they participated in
  - Places associated with them
  - Objects/artifacts related to their achievements
  - Documents they created
  - Memorials/monuments honoring them

## Testing URLs
Before updating the database:
1. Open each URL in a new browser tab
2. Verify the image loads correctly
3. Check that it's the correct individual/content
4. Ensure it's public domain or free to use

## SQL Update Format
```sql
UPDATE red_white_who_individuals
SET main_photo_url = 'https://example.com/image.jpg',
    photo_gallery_1 = 'https://example.com/gallery1.jpg',
    photo_gallery_2 = 'https://example.com/gallery2.jpg',
    -- ... etc
WHERE individual_id = 1;
```

## Next Steps
1. Use the search URLs in `find_and_update_images.js`
2. Find images for each individual from different sources
3. Fill in the SQL template: `update_red_white_who_images_multi_source.sql`
4. Test all URLs
5. Execute SQL in Supabase

