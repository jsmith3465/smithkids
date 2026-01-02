// Handle approval/deny actions via email token links

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://frlajamhyyectdrcbrnd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybGFqYW1oeXllY3RkcmNicm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4ODA4ODksImV4cCI6MjA4MjQ1Njg4OX0.QAH0GME5_iYkz6SZjfqdL3q9E9Jo1qKv6YWFk2exAtY';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Helper function to get correct path for pages
function getPagePath(pageName) {
    const currentPath = window.location.pathname;
    if (currentPath === '/' || currentPath.endsWith('/index.html') || currentPath.endsWith('index.html')) {
        return `pages/${pageName}`;
    }
    return pageName;
}

// Get token from URL
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');

if (!token) {
    showError('Invalid link. No token provided.');
} else {
    processToken(token);
}

async function processToken(token) {
    const loadingDiv = document.getElementById('loading');
    const resultDiv = document.getElementById('result');
    
    try {
        // Look up the token
        const { data: tokenData, error: tokenError } = await supabase
            .from('approval_tokens')
            .select(`
                token_id,
                approval_id,
                action,
                used,
                expires_at,
                unified_approvals (
                    approval_id,
                    approval_type,
                    source_id,
                    user_uid,
                    credits_amount,
                    description,
                    status,
                    Users!unified_approvals_user_uid_fkey (First_Name, Last_Name, Username)
                )
            `)
            .eq('token', token)
            .single();
        
        if (tokenError || !tokenData) {
            showError('Invalid or expired token. This link may have already been used or expired.');
            return;
        }
        
        // Check if token is already used
        if (tokenData.used) {
            showError('This link has already been used. The approval has already been processed.');
            return;
        }
        
        // Check if token is expired
        const expiresAt = new Date(tokenData.expires_at);
        if (expiresAt < new Date()) {
            showError('This link has expired. Please use the approvals page to process this request.');
            return;
        }
        
        // Check if approval is already processed
        if (tokenData.unified_approvals.status !== 'pending') {
            showError(`This approval has already been ${tokenData.unified_approvals.status}.`);
            return;
        }
        
        const approval = tokenData.unified_approvals;
        const user = approval.Users;
        const userName = user.First_Name && user.Last_Name
            ? `${user.First_Name} ${user.Last_Name}`
            : user.Username || 'Unknown User';
        
        // Process the action
        if (tokenData.action === 'approve') {
            await approveRequest(tokenData.approval_id, approval, tokenData.token_id);
        } else if (tokenData.action === 'deny') {
            await denyRequest(tokenData.approval_id, approval, tokenData.token_id);
        }
        
    } catch (error) {
        console.error('Error processing token:', error);
        showError('An error occurred while processing your request. Please try again or use the approvals page.');
    }
}

async function approveRequest(approvalId, approval, tokenId) {
    try {
        // Mark token as used
        await supabase
            .from('approval_tokens')
            .update({ used: true, used_at: new Date().toISOString() })
            .eq('token_id', tokenId);
        
        // Update unified approval status
        const { error: updateError } = await supabase
            .from('unified_approvals')
            .update({
                status: 'approved',
                approved_at: new Date().toISOString(),
                credits_amount: approval.credits_amount
            })
            .eq('approval_id', approvalId);
        
        if (updateError) throw updateError;
        
        // Update the source table based on type
        if (approval.approval_type === 'workout') {
            const { error: workoutError } = await supabase
                .from('Workouts')
                .update({
                    is_approved: true,
                    approved_at: new Date().toISOString(),
                    credits_amount: approval.credits_amount
                })
                .eq('workout_id', approval.source_id);
            
            if (workoutError) throw workoutError;
        } else if (approval.approval_type === 'chore') {
            const { error: choreError } = await supabase
                .from('Chores')
                .update({
                    is_approved: true,
                    approved_at: new Date().toISOString(),
                    credits_amount: approval.credits_amount
                })
                .eq('chore_id', approval.source_id);
            
            if (choreError) throw choreError;
        } else if (approval.approval_type === 'memory_verse') {
            const { error: verseError } = await supabase
                .from('Memory_Verse_Submissions')
                .update({
                    status: 'approved',
                    approved_at: new Date().toISOString()
                })
                .eq('id', approval.source_id);
            
            if (verseError) throw verseError;
            
            // Badge check will handle 3 consecutive months (awards 100 credits via badge)
        } else if (approval.approval_type === 'marketplace_purchase') {
            // Update marketplace purchase status
            const session = window.authStatus?.getSession();
            const adminUid = session ? session.uid : null;
            
            const { error: purchaseError } = await supabase
                .from('marketplace_purchases')
                .update({
                    status: 'approved',
                    approved_at: new Date().toISOString(),
                    approved_by_uid: adminUid
                })
                .eq('purchase_id', approval.source_id);
            
            if (purchaseError) throw purchaseError;
        } else if (approval.approval_type === 'fruit_nomination') {
            // Update fruit nomination status
            const session = window.authStatus?.getSession();
            const adminUid = session ? session.uid : null;
            
            const { error: nominationError } = await supabase
                .from('fruit_nominations')
                .update({
                    status: 'approved',
                    approved_at: new Date().toISOString(),
                    approved_by_uid: adminUid
                })
                .eq('nomination_id', approval.source_id);
            
            if (nominationError) throw nominationError;
        }
        
        // Handle credits based on approval type
        const { data: existingCredit, error: creditFetchError } = await supabase
            .from('User_Credits')
            .select('credit_id, balance, savings_balance')
            .eq('user_uid', approval.user_uid)
            .single();
        
        if (creditFetchError && creditFetchError.code !== 'PGRST116') {
            throw creditFetchError;
        }
        
        const user = approval.Users;
        const userName = user.First_Name && user.Last_Name
            ? `${user.First_Name} ${user.Last_Name}`
            : user.Username || 'Unknown User';
        
        if (approval.approval_type === 'marketplace_purchase') {
            // For marketplace purchases, DEDUCT from savings_balance
            const currentSavings = existingCredit?.savings_balance || 0;
            
            if (currentSavings < approval.credits_amount) {
                throw new Error(`Insufficient savings balance. User has ${currentSavings} credits but needs ${approval.credits_amount}.`);
            }
            
            const newSavings = currentSavings - approval.credits_amount;
            
            if (existingCredit) {
                const { error: balanceUpdateError } = await supabase
                    .from('User_Credits')
                    .update({ 
                        savings_balance: newSavings, 
                        updated_at: new Date().toISOString() 
                    })
                    .eq('credit_id', existingCredit.credit_id);
                
                if (balanceUpdateError) throw balanceUpdateError;
            } else {
                throw new Error('User credit account not found.');
            }
            
            // Record transaction for marketplace purchase
            const { error: transError } = await supabase
                .from('Credit_Transactions')
                .insert({
                    to_user_uid: approval.user_uid,
                    amount: approval.credits_amount,
                    transaction_type: 'marketplace_purchase',
                    description: `Marketplace purchase approved: ${approval.description || 'N/A'}`
                });
            
            if (transError) {
                console.error('Error recording transaction:', transError);
                // Don't fail the approval if transaction recording fails
            }
            
            showSuccess(`Purchase approved! ${userName}'s purchase has been processed and ${approval.credits_amount} credits deducted from savings.`, 'approved');
        } else if (approval.approval_type === 'fruit_nomination') {
            // For fruit nominations, ADD to balance and award badge
            const newBalance = (existingCredit?.balance || 0) + approval.credits_amount;
            
            if (existingCredit) {
                const { error: balanceUpdateError } = await supabase
                    .from('User_Credits')
                    .update({ balance: newBalance, updated_at: new Date().toISOString() })
                    .eq('credit_id', existingCredit.credit_id);
                
                if (balanceUpdateError) throw balanceUpdateError;
            } else {
                const { error: balanceInsertError } = await supabase
                    .from('User_Credits')
                    .insert({ user_uid: approval.user_uid, balance: approval.credits_amount });
                
                if (balanceInsertError) throw balanceInsertError;
            }
            
            // Get nomination details to award badge
            const { data: nomination } = await supabase
                .from('fruit_nominations')
                .select('fruit_type, nominator_uid, reason')
                .eq('nomination_id', approval.source_id)
                .single();
            
            if (nomination) {
                const fruitNames = {
                    'love': 'Love',
                    'joy': 'Joy',
                    'peace': 'Peace',
                    'patience': 'Patience',
                    'kindness': 'Kindness',
                    'goodness': 'Goodness',
                    'faithfulness': 'Faithfulness',
                    'gentleness': 'Gentleness',
                    'self_control': 'Self-Control'
                };
                
                const fruitIcons = {
                    'love': '❤️',
                    'joy': '😊',
                    'peace': '🕊️',
                    'patience': '⏳',
                    'kindness': '🤝',
                    'goodness': '✨',
                    'faithfulness': '🙏',
                    'gentleness': '🌸',
                    'self_control': '🎯'
                };
                
                // Check if user already has this badge
                const { data: existingBadge } = await supabase
                    .from('User_Badges')
                    .select('badge_id')
                    .eq('user_uid', approval.user_uid)
                    .eq('badge_type', nomination.fruit_type)
                    .maybeSingle();
                
                if (!existingBadge) {
                    // Award the badge
                    await supabase
                        .from('User_Badges')
                        .insert({
                            user_uid: approval.user_uid,
                            badge_type: nomination.fruit_type,
                            badge_name: fruitNames[nomination.fruit_type]
                        });
                }
                
                // Get nominator name
                const { data: nominatorData } = await supabase
                    .from('Users')
                    .select('First_Name, Last_Name, Username')
                    .eq('UID', nomination.nominator_uid)
                    .single();
                
                const nominatorName = (nominatorData?.First_Name && nominatorData?.Last_Name)
                    ? `${nominatorData.First_Name} ${nominatorData.Last_Name}`
                    : nominatorData?.Username || 'A family member';
                
                // Send message to nominee
                const messageContent = `
                    <div style="padding: 20px;">
                        <h3 style="color: #28a745; margin-top: 0;">🌟 Fruit of the Spirit Badge Awarded!</h3>
                        <p><strong>Congratulations!</strong> You have been awarded the <strong>${fruitNames[nomination.fruit_type]} ${fruitIcons[nomination.fruit_type]}</strong> Fruit of the Spirit badge!</p>
                        <p><strong>Nominated by:</strong> ${nominatorName}</p>
                        <p><strong>Reason:</strong></p>
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
                            ${nomination.reason.replace(/\n/g, '<br>')}
                        </div>
                        <div style="margin-top: 20px; padding: 15px; background: #d4edda; border-radius: 8px; border: 2px solid #28a745;">
                            <p style="margin: 0; font-weight: 600; color: #155724;">
                                💰 You received <strong>${approval.credits_amount} credits</strong> added to your account!
                            </p>
                        </div>
                    </div>
                `;
                
                await supabase
                    .from('message_boxes')
                    .insert({
                        from_user_uid: session ? session.uid : null,
                        to_user_uid: approval.user_uid,
                        subject: `Fruit of the Spirit Badge: ${fruitNames[nomination.fruit_type]}`,
                        body: messageContent,
                        folder: 'inbox',
                        is_read: false
                    });
            }
            
            // Record transaction
            const fruitName = nomination ? fruitNames[nomination.fruit_type] : 'Fruit of the Spirit';
            const session = window.authStatus?.getSession();
            const { error: transError } = await supabase
                .from('Credit_Transactions')
                .insert({
                    from_user_uid: session ? session.uid : null,
                    to_user_uid: approval.user_uid,
                    amount: approval.credits_amount,
                    transaction_type: 'credit_added',
                    game_type: 'fruit_nomination',
                    description: `Fruit of the Spirit nomination approved${session ? '' : ' via email'}: ${fruitName} badge - ${approval.credits_amount} credits`
                });
            
            if (transError) {
                console.error('Error recording transaction:', transError);
            }
            
            showSuccess(`Fruit nomination approved! Badge awarded and ${approval.credits_amount} credits added to ${userName}'s account.`, 'approved');
        } else {
            // For other approvals (workout, chore, memory_verse), ADD to balance
            const newBalance = (existingCredit?.balance || 0) + approval.credits_amount;
            
            if (existingCredit) {
                const { error: balanceUpdateError } = await supabase
                    .from('User_Credits')
                    .update({ balance: newBalance, updated_at: new Date().toISOString() })
                    .eq('credit_id', existingCredit.credit_id);
                
                if (balanceUpdateError) throw balanceUpdateError;
            } else {
                const { error: balanceInsertError } = await supabase
                    .from('User_Credits')
                    .insert({ user_uid: approval.user_uid, balance: approval.credits_amount });
                
                if (balanceInsertError) throw balanceInsertError;
            }
            
            // Record transaction
            const approvalTypeLabels = {
                workout: 'Workout',
                chore: 'Chore',
                memory_verse: 'Memory Verse',
            };
            
            const typeLabel = approvalTypeLabels[approval.approval_type] || approval.approval_type;
            
            const { error: transError } = await supabase
                .from('Credit_Transactions')
                .insert({
                    from_user_uid: null, // Approved via email link
                    to_user_uid: approval.user_uid,
                    amount: approval.credits_amount,
                    transaction_type: 'credit_added',
                    game_type: approval.approval_type,
                    description: `Approved ${typeLabel} via email: ${approval.description || 'N/A'}`
                });
            
            if (transError) {
                console.error('Error recording transaction:', transError);
                // Don't fail the approval if transaction recording fails
            }
            
            showSuccess(`Approval granted! ${userName} has received ${approval.credits_amount} credits.`, 'approved');
        }
        
    } catch (error) {
        console.error('Error approving request:', error);
        showError('Failed to approve the request. Please try again or use the approvals page.');
    }
}

async function denyRequest(approvalId, approval, tokenId) {
    try {
        // Mark token as used
        await supabase
            .from('approval_tokens')
            .update({ used: true, used_at: new Date().toISOString() })
            .eq('token_id', tokenId);
        
        // Update unified approval status
        const { error: updateError } = await supabase
            .from('unified_approvals')
            .update({
                status: 'rejected',
                approved_at: new Date().toISOString()
            })
            .eq('approval_id', approvalId);
        
        if (updateError) throw updateError;
        
        // Update the source table based on type
        if (approval.approval_type === 'workout') {
            const { error: workoutError } = await supabase
                .from('Workouts')
                .update({
                    is_approved: false,
                    approved_at: new Date().toISOString()
                })
                .eq('workout_id', approval.source_id);
            
            if (workoutError) throw workoutError;
        } else if (approval.approval_type === 'chore') {
            const { error: choreError } = await supabase
                .from('Chores')
                .update({
                    is_approved: false,
                    approved_at: new Date().toISOString()
                })
                .eq('chore_id', approval.source_id);
            
            if (choreError) throw choreError;
        } else if (approval.approval_type === 'memory_verse') {
            const { error: verseError } = await supabase
                .from('Memory_Verse_Submissions')
                .update({
                    status: 'rejected',
                    approved_at: new Date().toISOString()
                })
                .eq('id', approval.source_id);
            
            if (verseError) throw verseError;
        }
        
        const user = approval.Users;
        const userName = user.First_Name && user.Last_Name
            ? `${user.First_Name} ${user.Last_Name}`
            : user.Username || 'Unknown User';
        
        showSuccess(`Request denied. ${userName} has been notified.`, 'denied');
        
    } catch (error) {
        console.error('Error denying request:', error);
        showError('Failed to deny the request. Please try again or use the approvals page.');
    }
}

function showSuccess(message, action) {
    const loadingDiv = document.getElementById('loading');
    const resultDiv = document.getElementById('result');
    
    loadingDiv.style.display = 'none';
    resultDiv.style.display = 'block';
    
    const icon = action === 'approved' ? '✓' : '✗';
    const bgColor = action === 'approved' ? '#d4edda' : '#fff3cd';
    const borderColor = action === 'approved' ? '#28a745' : '#ffc107';
    
    resultDiv.innerHTML = `
        <div class="success-message" style="background: ${bgColor}; border-color: ${borderColor};">
            <h2 style="margin-top: 0; color: ${action === 'approved' ? '#155724' : '#856404'};">
                ${icon} ${action === 'approved' ? 'Approved!' : 'Denied!'}
            </h2>
            <p style="font-size: 1.1rem; margin-bottom: 0;">${message}</p>
        </div>
        <div style="margin-top: 30px;">
            <a href="${getPagePath('approvals.html')}" class="btn btn-primary">View All Approvals</a>
            <a href="${getPagePath('index.html')}" class="btn btn-secondary" style="margin-left: 10px;">Back to Home</a>
        </div>
    `;
}

function showError(message) {
    const loadingDiv = document.getElementById('loading');
    const resultDiv = document.getElementById('result');
    
    loadingDiv.style.display = 'none';
    resultDiv.style.display = 'block';
    
    resultDiv.innerHTML = `
        <div class="error-message">
            <h2 style="margin-top: 0;">Error</h2>
            <p style="font-size: 1.1rem; margin-bottom: 0;">${message}</p>
        </div>
        <div style="margin-top: 30px;">
            <a href="${getPagePath('approvals.html')}" class="btn btn-primary">Go to Approvals Page</a>
            <a href="${getPagePath('index.html')}" class="btn btn-secondary" style="margin-left: 10px;">Back to Home</a>
        </div>
    `;
}

// Check if user has 3 consecutive months of approved memory verses and award bonus
async function checkAndAwardConsecutiveMonthsBonus(userUid, currentSubmissionId) {
    try {
        // Get the current submission's month_year
        const { data: currentSubmission, error: currentError } = await supabase
            .from('Memory_Verse_Submissions')
            .select('month_year')
            .eq('id', currentSubmissionId)
            .single();
        
        if (currentError || !currentSubmission) {
            console.error('Error fetching current submission:', currentError);
            return;
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
        
        if (!isConsecutive) {
            return; // Not consecutive, no bonus
        }
        
        // Check if we've already awarded this bonus for this 3-month streak
        // We'll check if there's already a transaction for "3 consecutive months bonus" 
        // for this user with a recent date (within last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        const { data: existingBonus, error: bonusCheckError } = await supabase
            .from('Credit_Transactions')
            .select('transaction_id')
            .eq('to_user_uid', userUid)
            .eq('game_type', 'memory_verse_consecutive_bonus')
            .gte('created_at', thirtyDaysAgo.toISOString())
            .maybeSingle();
        
        if (bonusCheckError && bonusCheckError.code !== 'PGRST116') {
            console.error('Error checking existing bonus:', bonusCheckError);
            return;
        }
        
        // If bonus already awarded recently, don't award again
        if (existingBonus) {
            return;
        }
        
        // Award 50 credit bonus
        const BONUS_AMOUNT = 50;
        
        // Get current balance
        const { data: existingCredit, error: creditFetchError } = await supabase
            .from('User_Credits')
            .select('credit_id, balance')
            .eq('user_uid', userUid)
            .single();
        
        if (creditFetchError && creditFetchError.code !== 'PGRST116') {
            console.error('Error fetching credit balance:', creditFetchError);
            return;
        }
        
        const oldBalance = existingCredit?.balance || 0;
        const newBalance = oldBalance + BONUS_AMOUNT;
        
        // Update balance
        if (existingCredit) {
            const { error: balanceUpdateError } = await supabase
                .from('User_Credits')
                .update({ balance: newBalance, updated_at: new Date().toISOString() })
                .eq('credit_id', existingCredit.credit_id);
            
            if (balanceUpdateError) {
                console.error('Error updating balance for bonus:', balanceUpdateError);
                return;
            }
        } else {
            const { error: balanceInsertError } = await supabase
                .from('User_Credits')
                .insert({ user_uid: userUid, balance: BONUS_AMOUNT });
            
            if (balanceInsertError) {
                console.error('Error inserting balance for bonus:', balanceInsertError);
                return;
            }
        }
        
        // Record transaction
        const { error: transError } = await supabase
            .from('Credit_Transactions')
            .insert({
                from_user_uid: null, // System bonus
                to_user_uid: userUid,
                amount: BONUS_AMOUNT,
                transaction_type: 'credit_added',
                game_type: 'memory_verse_consecutive_bonus',
                description: `Memory Verse Champion Bonus: 3 consecutive months - ${BONUS_AMOUNT} credits`
            });
        
        if (transError) {
            console.error('Error recording bonus transaction:', transError);
            // Don't fail if transaction recording fails, balance was already updated
        }
        
        console.log(`Awarded ${BONUS_AMOUNT} credit bonus to user ${userUid} for 3 consecutive months of memory verses`);
        
    } catch (error) {
        console.error('Error checking consecutive months bonus:', error);
        // Don't throw - this is a bonus feature, shouldn't break the approval process
    }
}

