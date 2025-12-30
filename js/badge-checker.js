// Badge Checker - Automatically checks and awards badges when thresholds are met

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
import { awardBadge } from './badge-utils.js';

const SUPABASE_URL = 'https://frlajamhyyectdrcbrnd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybGFqYW1oeXllY3RkcmNicm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4ODA4ODksImV4cCI6MjA4MjQ1Njg4OX0.QAH0GME5_iYkz6SZjfqdL3q9E9Jo1qKv6YWFk2exAtY';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Check if user has earned the "First Game" badge
 * @param {number} userUid - The user's UID
 */
export async function checkFirstGameBadge(userUid) {
    try {
        // Check if user already has the badge
        const { data: existing, error: checkError } = await supabase
            .from('User_Badges')
            .select('badge_id')
            .eq('user_uid', userUid)
            .eq('badge_type', 'first_game')
            .maybeSingle();
        
        if (checkError && checkError.code !== 'PGRST116') {
            console.error('Error checking first_game badge:', checkError);
            return;
        }
        
        if (existing) {
            return; // Already has the badge
        }
        
        // Check if user has played any game
        const gameTables = [
            'bible_trivia_results',
            'snake_scores',
            'hangman_scores',
            'galaga_scores',
            'breakout_scores',
            'ttt_player_results'
        ];
        
        let hasPlayedGame = false;
        
        for (const table of gameTables) {
            const { data, error } = await supabase
                .from(table)
                .select('*')
                .eq('user_uid', userUid)
                .limit(1)
                .maybeSingle();
            
            if (error && error.code !== 'PGRST116') {
                console.error(`Error checking ${table}:`, error);
                continue;
            }
            
            if (data) {
                hasPlayedGame = true;
                break;
            }
        }
        
        if (hasPlayedGame) {
            await awardBadge(userUid, 'first_game', 'First Game');
        }
    } catch (error) {
        console.error('Error checking first_game badge:', error);
    }
}

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
 * Check if user has earned the "Memory Verse Champion" badge
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
        
        // Check if user has an approved memory verse
        const { data: approvedVerse, error: verseError } = await supabase
            .from('Memory_Verse_Submissions')
            .select('id')
            .eq('user_uid', userUid)
            .eq('status', 'approved')
            .limit(1)
            .maybeSingle();
        
        if (verseError && verseError.code !== 'PGRST116') {
            console.error('Error checking memory verse:', verseError);
            return;
        }
        
        if (approvedVerse) {
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
        
        // Get checklist data for the last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        
        const { data: checklists, error: checklistError } = await supabase
            .from('Morning_Checklist')
            .select('checklist_date, task_1, task_2, task_3, task_4, task_5, task_6')
            .eq('user_uid', userUid)
            .gte('checklist_date', sevenDaysAgo.toISOString().split('T')[0])
            .order('checklist_date', { ascending: false });
        
        if (checklistError) {
            console.error('Error fetching checklists:', checklistError);
            return;
        }
        
        if (!checklists || checklists.length < 7) {
            return; // Not enough days
        }
        
        // Check if all 6 tasks are completed for each of the last 7 days
        const last7Days = checklists.slice(0, 7);
        const allComplete = last7Days.every(day => {
            return day.task_1 && day.task_2 && day.task_3 && day.task_4 && day.task_5 && day.task_6;
        });
        
        if (allComplete) {
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
        // Always check first_game when a game is completed
        if (context === 'game_completed') {
            await checkFirstGameBadge(userUid);
        }
        
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
            await checkFirstGameBadge(userUid);
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

