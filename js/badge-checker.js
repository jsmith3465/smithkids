// Badge Checker - Automatically checks and awards badges when thresholds are met

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
import { awardBadge } from './badge-utils.js';

const SUPABASE_URL = 'https://frlajamhyyectdrcbrnd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybGFqYW1oeXllY3RkcmNicm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4ODA4ODksImV4cCI6MjA4MjQ1Njg4OX0.QAH0GME5_iYkz6SZjfqdL3q9E9Jo1qKv6YWFk2exAtY';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Check if user has earned the "Trivia Master" badge (10 correct answers)
 * @param {number} userUid - The user's UID
 */
export async function checkTriviaMasterBadge(userUid) {
    try {
        // Check if user already has the badge
        const { data: existing, error: checkError } = await supabase
            .from('User_Badges')
            .select('badge_id')
            .eq('user_uid', userUid)
            .eq('badge_type', 'trivia_master')
            .maybeSingle();
        
        if (checkError && checkError.code !== 'PGRST116') {
            console.error('Error checking trivia_master badge:', checkError);
            return;
        }
        
        if (existing) {
            return; // Already has the badge
        }
        
        // Get total correct answers from Bible Trivia
        const { data: stats, error: statsError } = await supabase
            .from('bible_trivia_user_stats')
            .select('total_correct')
            .eq('user_uid', userUid)
            .single();
        
        if (statsError && statsError.code !== 'PGRST116') {
            console.error('Error checking trivia stats:', statsError);
            return;
        }
        
        if (stats && stats.total_correct >= 10) {
            await awardBadge(userUid, 'trivia_master', 'Trivia Master');
        }
    } catch (error) {
        console.error('Error checking trivia_master badge:', error);
    }
}

/**
 * Check if user has earned the "Memory Verse Champion" badge (3 consecutive months)
 * @param {number} userUid - The user's UID
 */
export async function checkMemoryVerseBadge(userUid) {
    try {
        // Check if user already has the badge
        const { data: existing, error: checkError } = await supabase
            .from('User_Badges')
            .select('badge_id')
            .eq('user_uid', userUid)
            .eq('badge_type', 'memory_verse')
            .maybeSingle();
        
        if (checkError && checkError.code !== 'PGRST116') {
            console.error('Error checking memory_verse badge:', checkError);
            return;
        }
        
        if (existing) {
            return; // Already has the badge
        }
        
        // Get all approved memory verse submissions for this user, ordered by month_year descending
        const { data: approvedSubmissions, error: submissionsError } = await supabase
            .from('Memory_Verse_Submissions')
            .select('month_year, approved_at')
            .eq('user_uid', userUid)
            .eq('status', 'approved')
            .order('month_year', { ascending: false })
            .limit(3);
        
        if (submissionsError) {
            console.error('Error fetching approved submissions:', submissionsError);
            return;
        }
        
        // Need at least 3 approved submissions
        if (!approvedSubmissions || approvedSubmissions.length < 3) {
            return;
        }
        
        // Check if the last 3 submissions are consecutive months
        const months = approvedSubmissions.map(s => s.month_year).sort(); // Sort ascending for easier checking
        
        // Parse dates and check if they're consecutive
        const monthDates = months.map(monthYear => {
            const [year, month] = monthYear.split('-').map(Number);
            return new Date(year, month - 1, 1); // Create date for first day of month
        });
        
        // Check if dates are consecutive (each month is exactly 1 month after the previous)
        let isConsecutive = true;
        for (let i = 1; i < monthDates.length; i++) {
            const prevMonth = monthDates[i - 1];
            const currentMonth = monthDates[i];
            
            // Calculate expected next month
            const expectedNextMonth = new Date(prevMonth);
            expectedNextMonth.setMonth(expectedNextMonth.getMonth() + 1);
            
            // Check if current month matches expected next month
            if (currentMonth.getTime() !== expectedNextMonth.getTime()) {
                isConsecutive = false;
                break;
            }
        }
        
        if (isConsecutive) {
            await awardBadge(userUid, 'memory_verse', 'Memory Verse Champion');
        }
    } catch (error) {
        console.error('Error checking memory_verse badge:', error);
    }
}

/**
 * Check if user has earned the "Workout Warrior" badge (10 approved workouts)
 * @param {number} userUid - The user's UID
 */
export async function checkWorkoutWarriorBadge(userUid) {
    try {
        // Check if user already has the badge
        const { data: existing, error: checkError } = await supabase
            .from('User_Badges')
            .select('badge_id')
            .eq('user_uid', userUid)
            .eq('badge_type', 'workout_warrior')
            .maybeSingle();
        
        if (checkError && checkError.code !== 'PGRST116') {
            console.error('Error checking workout_warrior badge:', checkError);
            return;
        }
        
        if (existing) {
            return; // Already has the badge
        }
        
        // Count approved workouts
        const { count, error: countError } = await supabase
            .from('Workouts')
            .select('*', { count: 'exact', head: true })
            .eq('user_uid', userUid)
            .eq('is_approved', true);
        
        if (countError) {
            console.error('Error counting workouts:', countError);
            return;
        }
        
        if (count >= 10) {
            await awardBadge(userUid, 'workout_warrior', 'Workout Warrior');
        }
    } catch (error) {
        console.error('Error checking workout_warrior badge:', error);
    }
}

/**
 * Check if user has earned the "Chore Champion" badge (20 approved chores)
 * @param {number} userUid - The user's UID
 */
export async function checkChoreChampionBadge(userUid) {
    try {
        // Check if user already has the badge
        const { data: existing, error: checkError } = await supabase
            .from('User_Badges')
            .select('badge_id')
            .eq('user_uid', userUid)
            .eq('badge_type', 'chore_champion')
            .maybeSingle();
        
        if (checkError && checkError.code !== 'PGRST116') {
            console.error('Error checking chore_champion badge:', checkError);
            return;
        }
        
        if (existing) {
            return; // Already has the badge
        }
        
        // Count approved chores
        const { count, error: countError } = await supabase
            .from('Chores')
            .select('*', { count: 'exact', head: true })
            .eq('user_uid', userUid)
            .eq('is_approved', true);
        
        if (countError) {
            console.error('Error counting chores:', countError);
            return;
        }
        
        if (count >= 20) {
            await awardBadge(userUid, 'chore_champion', 'Chore Champion');
        }
    } catch (error) {
        console.error('Error checking chore_champion badge:', error);
    }
}

/**
 * Check if user has earned the "Early Bird" badge (7 consecutive days of morning checklist)
 * @param {number} userUid - The user's UID
 */
export async function checkEarlyBirdBadge(userUid) {
    try {
        // Check if user already has the badge
        const { data: existing, error: checkError } = await supabase
            .from('User_Badges')
            .select('badge_id')
            .eq('user_uid', userUid)
            .eq('badge_type', 'early_bird')
            .maybeSingle();
        
        if (checkError && checkError.code !== 'PGRST116') {
            console.error('Error checking early_bird badge:', checkError);
            return;
        }
        
        if (existing) {
            return; // Already has the badge
        }
        
        // Get the last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        sevenDaysAgo.setHours(0, 0, 0, 0);
        
        // Build a map of dates that have completed checklists
        const completedDates = new Set();
        
        // 1. Check Morning Checklist page completions
        const { data: checklists, error: checklistError } = await supabase
            .from('Morning_Checklist')
            .select('checklist_date, task_1, task_2, task_3, task_4, task_5, task_6')
            .eq('user_uid', userUid)
            .gte('checklist_date', sevenDaysAgo.toISOString().split('T')[0])
            .order('checklist_date', { ascending: false });
        
        if (checklistError) {
            console.error('Error fetching checklists:', checklistError);
        } else if (checklists) {
            // Add dates where all 6 tasks are completed
            checklists.forEach(day => {
                if (day.task_1 && day.task_2 && day.task_3 && day.task_4 && day.task_5 && day.task_6) {
                    completedDates.add(day.checklist_date);
                }
            });
        }
        
        // 2. Check approved Morning Checklist chores
        const { data: chores, error: choresError } = await supabase
            .from('Chores')
            .select('created_at, is_approved, description')
            .eq('user_uid', userUid)
            .eq('is_approved', true)
            .like('description', '%Morning checklist%')
            .gte('created_at', sevenDaysAgo.toISOString())
            .order('created_at', { ascending: false });
        
        if (choresError) {
            console.error('Error fetching Morning Checklist chores:', choresError);
        } else if (chores) {
            // Add dates from approved chores (extract date from created_at)
            chores.forEach(chore => {
                if (chore.created_at) {
                    const choreDate = new Date(chore.created_at);
                    const dateStr = choreDate.toISOString().split('T')[0];
                    completedDates.add(dateStr);
                }
            });
        }
        
        // Check if we have 7 consecutive days
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        let consecutiveDays = 0;
        for (let i = 0; i < 7; i++) {
            const checkDate = new Date(today);
            checkDate.setDate(checkDate.getDate() - i);
            const dateStr = checkDate.toISOString().split('T')[0];
            
            if (completedDates.has(dateStr)) {
                consecutiveDays++;
            } else {
                break; // Must be consecutive, so stop if we hit a missing day
            }
        }
        
        if (consecutiveDays >= 7) {
            await awardBadge(userUid, 'early_bird', 'Early Bird');
        }
    } catch (error) {
        console.error('Error checking early_bird badge:', error);
    }
}

/**
 * Check all badges for a user (called after relevant actions)
 * @param {number} userUid - The user's UID
 * @param {string} context - The context (e.g., 'game_completed', 'workout_approved', 'chore_approved', 'memory_verse_approved', 'checklist_completed')
 */
export async function checkAllBadges(userUid, context = 'general') {
    try {
        // Check trivia_master after Bible Trivia
        if (context === 'bible_trivia_completed') {
            await checkTriviaMasterBadge(userUid);
        }
        
        // Check workout_warrior after workout approval
        if (context === 'workout_approved') {
            await checkWorkoutWarriorBadge(userUid);
        }
        
        // Check chore_champion after chore approval
        if (context === 'chore_approved') {
            await checkChoreChampionBadge(userUid);
        }
        
        // Check memory_verse after memory verse approval
        if (context === 'memory_verse_approved') {
            await checkMemoryVerseBadge(userUid);
        }
        
        // Check early_bird after checklist completion
        if (context === 'checklist_completed') {
            await checkEarlyBirdBadge(userUid);
        }
        
        // For general checks, check all badges
        if (context === 'general') {
            await checkTriviaMasterBadge(userUid);
            await checkMemoryVerseBadge(userUid);
            await checkWorkoutWarriorBadge(userUid);
            await checkChoreChampionBadge(userUid);
            await checkEarlyBirdBadge(userUid);
        }
    } catch (error) {
        console.error('Error checking badges:', error);
    }
}

