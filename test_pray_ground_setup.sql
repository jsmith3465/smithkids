-- Quick test to verify Pray Ground tables are set up correctly
-- Run this in Supabase SQL Editor after running setup_pray_ground_complete.sql

-- Test 1: Check if tables exist
SELECT 
    'prayer_requests' as table_name,
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'prayer_requests')
        THEN '✅ EXISTS'
        ELSE '❌ MISSING'
    END as status
UNION ALL
SELECT 
    'prayer_prayers' as table_name,
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'prayer_prayers')
        THEN '✅ EXISTS'
        ELSE '❌ MISSING'
    END as status;

-- Test 2: Try to query the table (this will fail if RLS is blocking)
SELECT COUNT(*) as prayer_request_count FROM prayer_requests;

-- Test 3: Check RLS status
SELECT 
    tablename,
    CASE WHEN rowsecurity THEN '✅ ENABLED' ELSE '❌ DISABLED' END as rls_status
FROM pg_tables
WHERE schemaname = 'public' 
AND tablename IN ('prayer_requests', 'prayer_prayers');

-- Test 4: List all policies
SELECT tablename, policyname, cmd 
FROM pg_policies
WHERE schemaname = 'public' 
AND tablename IN ('prayer_requests', 'prayer_prayers')
ORDER BY tablename, policyname;

