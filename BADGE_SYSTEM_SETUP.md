# Badge System Setup Guide

This document describes the automatic badge system that awards badges when thresholds are met and sends notifications.

## Database Setup

### 1. Create badge_notifications Table

Run this SQL in your Supabase SQL editor:

```sql
CREATE TABLE badge_notifications (
    id SERIAL PRIMARY KEY,
    user_uid BIGINT NOT NULL REFERENCES "Users"("UID"),
    badge_type TEXT NOT NULL,
    badge_name TEXT NOT NULL,
    credits_awarded INTEGER NOT NULL DEFAULT 20,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better query performance
CREATE INDEX idx_badge_notifications_user ON badge_notifications(user_uid);
CREATE INDEX idx_badge_notifications_created ON badge_notifications(created_at);
```

## Badge Thresholds

The following badges are automatically checked and awarded:

1. **First Game** - Awarded when user plays their first game (any game)
2. **Trivia Master** - Awarded when user gets 10 correct answers in Bible Trivia
3. **Memory Verse Champion** - Awarded when user has an approved memory verse
4. **Workout Warrior** - Awarded when user completes 10 approved workouts
5. **Chore Champion** - Awarded when user completes 20 approved chores
6. **Early Bird** - Awarded when user completes morning checklist 7 days in a row
7. **All Fruits of the Spirit** - Awarded when user collects all 9 Fruits of the Spirit badges (100 credit bonus)

## Integration Points

Badge checks are automatically triggered at:

- **Game Completion**: After any game finishes (Snake, Hangman, Galaga, Breakout, Tic Tac Toe, Bible Trivia)
- **Bible Trivia**: After game completion (checks for Trivia Master)
- **Workout Approval**: After admin approves a workout (checks for Workout Warrior)
- **Chore Approval**: After admin approves a chore (checks for Chore Champion)
- **Memory Verse Approval**: After admin approves a memory verse (checks for Memory Verse Champion)
- **Morning Checklist**: After all 6 tasks are completed (checks for Early Bird)

## Notification System

### User Notifications

Badge notifications are displayed to users across all pages:
- Stored in `badge_notifications` table
- Displayed via `badge-notification-system.js`
- Shown as toast notifications in the top-right corner
- Auto-dismiss after 8 seconds
- Tracked in localStorage to prevent duplicates

### Admin Notifications

When a badge is unlocked, admins receive an email notification:
- Sent via Edge Function `send-approval-notification`
- Includes user name, badge name, and unlock time
- Sent to all admin users with email addresses

## Adding Badge Notification System to Pages

Add this to all standard user pages (in the `DOMContentLoaded` or `checkUserAccess` function):

```javascript
// Initialize badge notifications
import { initializeBadgeNotifications } from './badge-notification-system.js';
await initializeBadgeNotifications();
```

Pages that should include this:
- `index.html` (homepage)
- `pages/bible-trivia.html`
- `pages/snake.html`
- `pages/hangman.html`
- `pages/galaga.html`
- `pages/breakout.html`
- `pages/tic-tac-toe.html`
- `pages/add-workout.html`
- `pages/submit-chores.html`
- `pages/memory-verse.html`
- `pages/credit-balance.html`
- `pages/badges.html`
- `pages/fruit-of-spirit.html`

## Credit Amounts

Badge credit amounts are fetched from the `credit_manager` table:
- Default: 20 credits
- All Fruits of the Spirit: 100 credits
- Fruits of the Spirit badges: 20 credits each

Make sure these entries exist in `credit_manager`:
- First Game (credit)
- Trivia Master (credit)
- Memory Verse Champion (credit)
- Workout Warrior (credit)
- Chore Champion (credit)
- Early Bird (credit)
- All Fruits of the Spirit (credit) - 100 credits

## Testing

1. Play a game to test "First Game" badge
2. Complete 10 Bible Trivia questions correctly to test "Trivia Master"
3. Get a workout approved to test "Workout Warrior"
4. Get a chore approved to test "Chore Champion"
5. Get a memory verse approved to test "Memory Verse Champion"
6. Complete morning checklist 7 days in a row to test "Early Bird"
7. Collect all 9 Fruits of the Spirit to test "All Fruits" badge

## Files Modified

- `js/badge-checker.js` - Badge threshold checking logic
- `js/badge-utils.js` - Badge awarding and admin notifications
- `js/badge-notification-system.js` - Cross-page notification system
- `js/bible-trivia.js` - Added badge check after game
- `js/snake.js` - Added badge check after game
- `js/hangman.js` - Added badge check after game
- `js/galaga.js` - Added badge check after game
- `js/breakout.js` - Added badge check after game
- `js/tic-tac-toe.js` - Added badge check after game
- `js/approvals.js` - Added badge check after approval
- `js/morning-checklist.js` - Added badge check after completion
- `supabase/functions/send-approval-notification/index.ts` - Added badge notification handling
- `style.css` - Added badge notification styles
- `DATABASE_SETUP.md` - Added badge_notifications table schema

