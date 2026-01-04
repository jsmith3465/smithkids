# Red White and Who Photo Gallery Migration

## Overview
The photo gallery structure has been changed from a single JSONB array field to 10 separate TEXT fields for better data organization and easier querying.

## Changes Made

### 1. Database Schema Update
- **Removed**: `photo_gallery JSONB` field
- **Added**: 10 separate TEXT fields:
  - `photo_gallery_1` through `photo_gallery_10`

### 2. Files Updated

#### `create_red_white_who_tables.sql`
- Updated table schema to use 10 separate photo fields instead of JSONB array

#### `migrate_red_white_who_photo_gallery.sql` (NEW)
- Migration script to:
  - Add the 10 new photo_gallery fields
  - Migrate existing data from JSONB array to individual fields
  - Drop the old `photo_gallery` column

#### `staging/parse_red_white_who_with_images.js`
- Updated to generate SQL with 10 separate fields
- Each image from the Excel file (Image 1-10) is now stored in its corresponding field

#### `js/red-white-who.js`
- Updated `displayBiography()` function to read from the 10 separate fields instead of JSONB array
- Now collects photos from `photo_gallery_1` through `photo_gallery_10`

#### `staging/insert_red_white_who_with_images.sql` (REGENERATED)
- Regenerated with new structure using 10 separate fields
- Uses `ON CONFLICT (name) DO UPDATE` to update existing records

## Migration Steps

### For Existing Databases:

1. **Run the migration script**:
   ```sql
   -- Execute in Supabase SQL Editor
   migrate_red_white_who_photo_gallery.sql
   ```
   This will:
   - Add the 10 new photo fields
   - Migrate existing data from the JSONB array
   - Remove the old `photo_gallery` column

2. **Re-import data** (optional, if you want fresh data):
   ```sql
   -- Execute in Supabase SQL Editor
   staging/insert_red_white_who_with_images.sql
   ```

### For New Databases:

1. **Create tables**:
   ```sql
   create_red_white_who_tables.sql
   ```

2. **Import data**:
   ```sql
   staging/insert_red_white_who_with_images.sql
   ```

## Benefits

1. **Simpler queries**: No need to parse JSONB arrays
2. **Better indexing**: Can index individual photo fields if needed
3. **Easier updates**: Update individual photos without parsing JSON
4. **Clearer structure**: Each image has its own dedicated field
5. **Better data integrity**: No risk of malformed JSON arrays

## Data Structure

### Before:
```sql
photo_gallery JSONB
-- Example: [{"url": "https://...", "caption": ""}, ...]
```

### After:
```sql
photo_gallery_1 TEXT
photo_gallery_2 TEXT
photo_gallery_3 TEXT
...
photo_gallery_10 TEXT
-- Each field contains a single URL string
```

## JavaScript Usage

The JavaScript code now reads photos like this:
```javascript
for (let i = 1; i <= 10; i++) {
    const photoUrl = individual[`photo_gallery_${i}`];
    if (photoUrl && photoUrl.trim()) {
        galleryPhotos.push(photoUrl.trim());
    }
}
```

## Notes

- The migration script safely migrates existing data from the JSONB array
- Empty/null photo fields are stored as NULL
- The app will display all non-null photos in the gallery
- No data loss occurs during migration

