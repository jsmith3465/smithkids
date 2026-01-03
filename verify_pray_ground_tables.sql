-- Verification script to check if Pray Ground tables exist and are accessible
-- Run this in Supabase SQL Editor to verify the setup

-- Check if prayer_requests table exists
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name = 'prayer_requests'
        ) THEN '✅ prayer_requests table EXISTS'
        ELSE '❌ prayer_requests table DOES NOT EXIST'
    END as prayer_requests_status;

-- Check if prayer_prayers table exists
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name = 'prayer_prayers'
        ) THEN '✅ prayer_prayers table EXISTS'
        ELSE '❌ prayer_prayers table DOES NOT EXIST'
    END as prayer_prayers_status;

-- Check columns in prayer_requests table
SELECT 
    column_name, 
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' 
AND table_name = 'prayer_requests'
ORDER BY ordinal_position;

-- Check if RLS is enabled
SELECT 
    tablename,
    CASE 
        WHEN rowsecurity THEN '✅ RLS ENABLED'
        ELSE '❌ RLS DISABLED'
    END as rls_status
FROM pg_tables
WHERE schemaname = 'public' 
AND tablename IN ('prayer_requests', 'prayer_prayers');

-- Check existing policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE schemaname = 'public' 
AND tablename IN ('prayer_requests', 'prayer_prayers')
ORDER BY tablename, policyname;

-- Try to select from prayer_requests (this will show if there are any access issues)
SELECT COUNT(*) as total_prayer_requests FROM prayer_requests;

