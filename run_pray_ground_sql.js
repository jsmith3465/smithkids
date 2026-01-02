// Script to run create_pray_ground_table.sql via Supabase REST API
// Note: This requires the SUPABASE_SERVICE_ROLE_KEY environment variable

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

const SUPABASE_URL = 'https://frlajamhyyectdrcbrnd.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Error: SUPABASE_SERVICE_ROLE_KEY environment variable is required.');
    console.error('Please set it with: export SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

async function runSQL() {
    try {
        // Read the SQL file
        const sql = readFileSync('create_pray_ground_table.sql', 'utf8');
        
        // Split by semicolons and filter out empty/comment-only statements
        const statements = sql
            .split(';')
            .map(s => s.trim())
            .filter(s => s && !s.startsWith('--') && s.length > 0);
        
        console.log(`Executing ${statements.length} SQL statements...`);
        
        for (let i = 0; i < statements.length; i++) {
            const statement = statements[i];
            if (!statement || statement.trim().length === 0) continue;
            
            console.log(`\nExecuting statement ${i + 1}/${statements.length}...`);
            
            try {
                const { data, error } = await supabase.rpc('exec_sql', { 
                    sql_query: statement + ';' 
                });
                
                if (error) {
                    // Try direct query execution
                    const { error: queryError } = await supabase
                        .from('_exec_sql')
                        .select('*')
                        .limit(0);
                    
                    if (queryError && queryError.message.includes('exec_sql')) {
                        console.error('Error: Supabase RPC function "exec_sql" not available.');
                        console.error('Please run the SQL file manually in the Supabase SQL Editor.');
                        console.error('\nSQL file location: create_pray_ground_table.sql');
                        process.exit(1);
                    }
                    
                    // If it's a "relation does not exist" or similar, it might be okay
                    if (error.message.includes('already exists') || 
                        error.message.includes('duplicate') ||
                        error.code === '42P07' || error.code === '42710') {
                        console.log(`  ⚠️  Warning: ${error.message}`);
                    } else {
                        throw error;
                    }
                } else {
                    console.log(`  ✓ Statement executed successfully`);
                }
            } catch (err) {
                console.error(`  ✗ Error: ${err.message}`);
                throw err;
            }
        }
        
        console.log('\n✅ All SQL statements executed successfully!');
        console.log('The prayer_requests table should now be created.');
        
    } catch (error) {
        console.error('\n❌ Error running SQL:', error.message);
        console.error('\nNote: This script requires the Supabase service role key.');
        console.error('Alternatively, you can run the SQL file manually in the Supabase SQL Editor:');
        console.error('  1. Go to https://supabase.com/dashboard');
        console.error('  2. Select your project');
        console.error('  3. Go to SQL Editor');
        console.error('  4. Copy and paste the contents of create_pray_ground_table.sql');
        console.error('  5. Click Run');
        process.exit(1);
    }
}

runSQL();

