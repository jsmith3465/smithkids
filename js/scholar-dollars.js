// Scholar Dollars app

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://frlajamhyyectdrcbrnd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybGFqYW1oeXllY3RkcmNicm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4ODA4ODksImV4cCI6MjA4MjQ1Njg4OX0.QAH0GME5_iYkz6SZjfqdL3q9E9Jo1qKv6YWFk2exAtY';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let currentUserUid = null;
let currentQuarterId = null;
let subjects = [];
let grades = {};
let quarters = [];

// Helper function to get correct path for pages
function getPagePath(pageName) {
    const currentPath = window.location.pathname;
    if (currentPath === '/' || currentPath.endsWith('/index.html') || currentPath.endsWith('index.html')) {
        return `pages/${pageName}`;
    }
    return pageName;
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const checkAuth = setInterval(() => {
            if (window.authStatus) {
                clearInterval(checkAuth);
                if (window.authStatus.isAuthenticated) {
                    checkUserAccess();
                } else {
                    window.location.href = getPagePath('login.html');
                }
            }
        }, 100);
        
        setTimeout(() => {
            clearInterval(checkAuth);
            if (!window.authStatus) {
                window.location.href = getPagePath('login.html');
            }
        }, 5000);
    }, 200);
});

async function checkUserAccess() {
    const session = window.authStatus?.getSession();
    if (!session) {
        window.location.href = getPagePath('login.html');
        return;
    }
    
    // Only standard users can access Scholar Dollars
    if (session.userType === 'admin') {
        document.getElementById('authCheck').innerHTML = '<p style="color: #dc3545;">This page is for standard users only.</p>';
        return;
    }
    
    currentUserUid = session.uid;
    
    const authCheck = document.getElementById('authCheck');
    const mainContent = document.getElementById('mainContent');
    
    if (!authCheck || !mainContent) {
        console.error('Required DOM elements not found');
        return;
    }
    
    authCheck.classList.add('hidden');
    mainContent.classList.remove('hidden');
    
    try {
        await loadQuarters();
        setupEventListeners();
        if (quarters.length > 0) {
            currentQuarterId = quarters[0].quarter_id;
            document.getElementById('quarterSelect').value = currentQuarterId;
            await loadSubjectsAndGrades();
        }
    } catch (error) {
        console.error('Error initializing Scholar Dollars:', error);
    }
}

async function loadQuarters() {
    try {
        const quarterSelect = document.getElementById('quarterSelect');
        if (!quarterSelect) {
            console.error('Quarter select element not found');
            return;
        }
        
        const { data, error } = await supabase
            .from('scholar_dollars_quarters')
            .select('*')
            .order('year', { ascending: false })
            .order('quarter_number', { ascending: false });
        
        if (error) {
            console.error('Error fetching quarters:', error);
            quarterSelect.innerHTML = '<option value="">Error loading quarters</option>';
            throw error;
        }
        
        quarters = data || [];
        
        if (quarters.length === 0) {
            console.warn('No quarters found in database. The table may need to be initialized.');
            quarterSelect.innerHTML = '<option value="">No quarters available</option>';
            
            // Try to insert Q3 2026 if it doesn't exist
            try {
                const { error: insertError } = await supabase
                    .from('scholar_dollars_quarters')
                    .insert({
                        quarter_name: 'Q3 2026',
                        quarter_number: 3,
                        year: 2026,
                        is_active: true
                    });
                
                if (!insertError) {
                    // Reload quarters after insert
                    const { data: newData, error: reloadError } = await supabase
                        .from('scholar_dollars_quarters')
                        .select('*')
                        .order('year', { ascending: false })
                        .order('quarter_number', { ascending: false });
                    
                    if (!reloadError && newData) {
                        quarters = newData;
                    }
                } else {
                    console.error('Error inserting initial quarter:', insertError);
                }
            } catch (insertErr) {
                console.error('Error attempting to create initial quarter:', insertErr);
            }
        }
        
        if (quarters.length > 0) {
            quarterSelect.innerHTML = quarters.map(q => 
                `<option value="${q.quarter_id}">${q.quarter_name}</option>`
            ).join('');
            
            currentQuarterId = quarters[0].quarter_id;
            quarterSelect.value = currentQuarterId;
        } else {
            quarterSelect.innerHTML = '<option value="">No quarters available. Please contact admin.</option>';
        }
    } catch (error) {
        console.error('Error loading quarters:', error);
        const quarterSelect = document.getElementById('quarterSelect');
        if (quarterSelect) {
            quarterSelect.innerHTML = '<option value="">Error loading quarters</option>';
        }
    }
}

async function loadSubjectsAndGrades() {
    if (!currentQuarterId) return;
    
    try {
        // Load subjects
        const { data: subjectsData, error: subjectsError } = await supabase
            .from('scholar_dollars_subjects')
            .select('*')
            .eq('user_uid', currentUserUid)
            .order('display_order', { ascending: true });
        
        if (subjectsError) throw subjectsError;
        
        subjects = subjectsData || [];
        
        // Load grades for current quarter
        if (subjects.length > 0) {
            const subjectIds = subjects.map(s => s.subject_id);
            const { data: gradesData, error: gradesError } = await supabase
                .from('scholar_dollars_grades')
                .select('*')
                .eq('user_uid', currentUserUid)
                .eq('quarter_id', currentQuarterId)
                .in('subject_id', subjectIds);
            
            if (gradesError) throw gradesError;
            
            grades = {};
            if (gradesData) {
                gradesData.forEach(g => {
                    grades[g.subject_id] = g;
                });
            }
        }
        
        renderSubjectsTable();
        updateCreditsSummary();
        checkSubmissionStatus();
    } catch (error) {
        console.error('Error loading subjects and grades:', error);
    }
}

function renderSubjectsTable() {
    const container = document.getElementById('subjectsTableContainer');
    
    if (subjects.length === 0) {
        container.innerHTML = '<div class="empty-state">No subjects added yet. Click "Add Subject" to get started!</div>';
        return;
    }
    
    const table = document.createElement('table');
    table.className = 'subjects-table';
    
    table.innerHTML = `
        <thead>
            <tr>
                <th style="width: 50px;"></th>
                <th>Subject</th>
                <th style="width: 200px;">Grade</th>
                <th style="width: 150px;">Actions</th>
            </tr>
        </thead>
        <tbody id="subjectsTableBody">
        </tbody>
    `;
    
    const tbody = table.querySelector('#subjectsTableBody');
    
    subjects.forEach((subject, index) => {
        const grade = grades[subject.subject_id];
        const gradeValue = grade ? grade.grade : '';
        const isSubmitted = grade ? grade.is_submitted : false;
        
        const row = document.createElement('tr');
        row.setAttribute('data-subject-id', subject.subject_id);
        row.setAttribute('data-order', subject.display_order);
        
        row.innerHTML = `
            <td>
                <span class="drag-handle" title="Drag to reorder">☰</span>
            </td>
            <td>
                <strong>${escapeHtml(subject.subject_name)}</strong>
            </td>
            <td>
                <select class="grade-select ${gradeValue ? `grade-${gradeValue.toLowerCase()}` : ''}" 
                        data-subject-id="${subject.subject_id}"
                        ${isSubmitted ? 'disabled' : ''}
                        onchange="updateGrade(${subject.subject_id}, this.value)">
                    <option value="">Select Grade</option>
                    <option value="A" ${gradeValue === 'A' ? 'selected' : ''}>A</option>
                    <option value="B" ${gradeValue === 'B' ? 'selected' : ''}>B</option>
                    <option value="C" ${gradeValue === 'C' ? 'selected' : ''}>C</option>
                    <option value="D" ${gradeValue === 'D' ? 'selected' : ''}>D</option>
                    <option value="F" ${gradeValue === 'F' ? 'selected' : ''}>F</option>
                </select>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-secondary" onclick="editSubject(${subject.subject_id})" 
                            style="padding: 5px 10px; font-size: 0.9rem;">Edit</button>
                    <button class="btn btn-danger" onclick="deleteSubject(${subject.subject_id})" 
                            style="padding: 5px 10px; font-size: 0.9rem;">Delete</button>
                </div>
            </td>
        `;
        
        tbody.appendChild(row);
    });
    
    container.innerHTML = '';
    container.appendChild(table);
    
    // Setup drag and drop for reordering
    setupDragAndDrop();
}

function setupDragAndDrop() {
    const tbody = document.getElementById('subjectsTableBody');
    if (!tbody) return;
    
    let draggedElement = null;
    
    tbody.querySelectorAll('tr').forEach(row => {
        row.draggable = true;
        
        row.addEventListener('dragstart', (e) => {
            draggedElement = row;
            e.dataTransfer.effectAllowed = 'move';
            row.style.opacity = '0.5';
        });
        
        row.addEventListener('dragend', () => {
            row.style.opacity = '1';
            draggedElement = null;
        });
        
        row.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
        });
        
        row.addEventListener('drop', async (e) => {
            e.preventDefault();
            if (draggedElement && draggedElement !== row) {
                const before = row;
                const after = draggedElement;
                
                if (before.parentNode === after.parentNode) {
                    const allRows = Array.from(tbody.querySelectorAll('tr'));
                    const draggedIndex = allRows.indexOf(after);
                    const targetIndex = allRows.indexOf(before);
                    
                    if (draggedIndex < targetIndex) {
                        before.parentNode.insertBefore(after, before.nextSibling);
                    } else {
                        before.parentNode.insertBefore(after, before);
                    }
                    
                    await updateSubjectOrder();
                }
            }
        });
    });
}

async function updateSubjectOrder() {
    const tbody = document.getElementById('subjectsTableBody');
    if (!tbody) return;
    
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const updates = [];
    
    rows.forEach((row, index) => {
        const subjectId = parseInt(row.getAttribute('data-subject-id'));
        updates.push({
            subject_id: subjectId,
            display_order: index
        });
    });
    
    try {
        for (const update of updates) {
            await supabase
                .from('scholar_dollars_subjects')
                .update({ display_order: update.display_order })
                .eq('subject_id', update.subject_id);
        }
        
        // Reload to refresh display
        await loadSubjectsAndGrades();
    } catch (error) {
        console.error('Error updating subject order:', error);
    }
}

async function updateGrade(subjectId, grade) {
    if (!currentQuarterId) return;
    
    try {
        const existingGrade = grades[subjectId];
        
        if (existingGrade) {
            await supabase
                .from('scholar_dollars_grades')
                .update({ 
                    grade: grade,
                    updated_at: new Date().toISOString()
                })
                .eq('grade_id', existingGrade.grade_id);
        } else {
            const { data, error } = await supabase
                .from('scholar_dollars_grades')
                .insert({
                    user_uid: currentUserUid,
                    subject_id: subjectId,
                    quarter_id: currentQuarterId,
                    grade: grade
                })
                .select()
                .single();
            
            if (error) throw error;
            grades[subjectId] = data;
        }
        
        // Update the select styling
        const select = document.querySelector(`[data-subject-id="${subjectId}"]`);
        if (select) {
            select.className = `grade-select ${grade ? `grade-${grade.toLowerCase()}` : ''}`;
        }
        
        updateCreditsSummary();
    } catch (error) {
        console.error('Error updating grade:', error);
        alert('Error updating grade. Please try again.');
    }
}

function calculateCredits() {
    if (subjects.length === 0) return { total: 0, explanation: '' };
    
    const gradeCounts = { A: 0, B: 0, C: 0, D: 0, F: 0 };
    let totalAGrades = 0;
    let allAs = true;
    
    subjects.forEach(subject => {
        const grade = grades[subject.subject_id];
        if (grade && grade.grade) {
            const gradeValue = grade.grade.toUpperCase();
            gradeCounts[gradeValue]++;
            if (gradeValue === 'A') {
                totalAGrades++;
            } else {
                allAs = false;
            }
        } else {
            allAs = false;
        }
    });
    
    // Check if all subjects have grades and all are A's
    const allSubjectsGraded = subjects.every(s => grades[s.subject_id] && grades[s.subject_id].grade);
    
    if (allSubjectsGraded && allAs) {
        // All A's in quarter = 1,000 credits
        return { 
            total: 1000, 
            explanation: 'All A\'s in this quarter = 1,000 credits!'
        };
    } else {
        // 50 credits per A
        const credits = totalAGrades * 50;
        return { 
            total: credits, 
            explanation: `${totalAGrades} A grade(s) × 50 credits = ${credits} credits`
        };
    }
}

async function checkAllQuartersBonus() {
    // Check if user has all A's in all 4 quarters
    try {
        // Get all submitted grades with quarter info
        const { data: allGrades, error } = await supabase
            .from('scholar_dollars_grades')
            .select(`
                quarter_id, 
                grade,
                scholar_dollars_quarters!inner(quarter_number, year)
            `)
            .eq('user_uid', currentUserUid)
            .eq('is_submitted', true);
        
        if (error) throw error;
        
        if (!allGrades || allGrades.length === 0) {
            return { hasBonus: false, bonusAmount: 0 };
        }
        
        // Get all subjects for this user
        const { data: userSubjects } = await supabase
            .from('scholar_dollars_subjects')
            .select('subject_id')
            .eq('user_uid', currentUserUid);
        
        if (!userSubjects || userSubjects.length === 0) {
            return { hasBonus: false, bonusAmount: 0 };
        }
        
        const subjectCount = userSubjects.length;
        
        // Group by quarter
        const quarterGrades = {};
        allGrades.forEach(g => {
            const quarterKey = `${g.scholar_dollars_quarters.year}-Q${g.scholar_dollars_quarters.quarter_number}`;
            if (!quarterGrades[quarterKey]) {
                quarterGrades[quarterKey] = [];
            }
            quarterGrades[quarterKey].push(g.grade);
        });
        
        // Check if we have all 4 quarters with all subjects graded
        const quarters = Object.keys(quarterGrades);
        if (quarters.length < 4) {
            return { hasBonus: false, bonusAmount: 0 };
        }
        
        // Check if all quarters have all subjects and all are A's
        let allQuartersAllAs = true;
        for (const quarterKey in quarterGrades) {
            const quarterGradeList = quarterGrades[quarterKey];
            // Must have same number of grades as subjects
            if (quarterGradeList.length !== subjectCount) {
                allQuartersAllAs = false;
                break;
            }
            // All must be A's
            if (quarterGradeList.some(g => g.toUpperCase() !== 'A')) {
                allQuartersAllAs = false;
                break;
            }
        }
        
        if (allQuartersAllAs) {
            return { hasBonus: true, bonusAmount: 5000 };
        }
        
        return { hasBonus: false, bonusAmount: 0 };
    } catch (error) {
        console.error('Error checking all quarters bonus:', error);
        return { hasBonus: false, bonusAmount: 0 };
    }
}

async function updateCreditsSummary() {
    const summary = document.getElementById('creditsSummary');
    const amount = document.getElementById('creditsAmount');
    const explanation = document.getElementById('creditsExplanation');
    
    if (subjects.length === 0) {
        summary.style.display = 'none';
        return;
    }
    
    const credits = calculateCredits();
    const bonus = await checkAllQuartersBonus();
    
    let totalCredits = credits.total;
    let explanationText = credits.explanation;
    
    if (bonus.hasBonus) {
        totalCredits += bonus.bonusAmount;
        explanationText += ` + ${bonus.bonusAmount} bonus for all A's in all 4 quarters!`;
    }
    
    amount.textContent = totalCredits.toLocaleString();
    explanation.textContent = explanationText;
    summary.style.display = 'block';
}

function checkSubmissionStatus() {
    // Check if current quarter has been submitted
    const hasAllGrades = subjects.every(s => grades[s.subject_id] && grades[s.subject_id].grade);
    const isSubmitted = subjects.some(s => {
        const grade = grades[s.subject_id];
        return grade && grade.is_submitted;
    });
    
    const submitSection = document.getElementById('submitSection');
    if (hasAllGrades && !isSubmitted) {
        submitSection.style.display = 'block';
    } else {
        submitSection.style.display = 'none';
    }
}

function setupEventListeners() {
    // Quarter selector
    document.getElementById('quarterSelect').addEventListener('change', async (e) => {
        currentQuarterId = parseInt(e.target.value);
        await loadSubjectsAndGrades();
    });
    
    // Add subject button
    document.getElementById('addSubjectBtn').addEventListener('click', () => {
        openSubjectModal();
    });
    
    // Subject form
    document.getElementById('subjectForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        await saveSubject();
    });
    
    // Cancel subject button
    document.getElementById('cancelSubjectBtn').addEventListener('click', () => {
        closeSubjectModal();
    });
    
    // Submit grades button
    document.getElementById('submitGradesBtn').addEventListener('click', async () => {
        await submitGrades();
    });
}

function openSubjectModal(subjectId = null) {
    const modal = document.getElementById('subjectModal');
    const form = document.getElementById('subjectForm');
    const title = document.getElementById('subjectModalTitle');
    const nameInput = document.getElementById('subjectName');
    const idInput = document.getElementById('subjectId');
    
    if (subjectId) {
        const subject = subjects.find(s => s.subject_id === subjectId);
        if (subject) {
            title.textContent = 'Edit Subject';
            nameInput.value = subject.subject_name;
            idInput.value = subject.subject_id;
        }
    } else {
        title.textContent = 'Add Subject';
        nameInput.value = '';
        idInput.value = '';
    }
    
    modal.style.display = 'flex';
    nameInput.focus();
}

function closeSubjectModal() {
    document.getElementById('subjectModal').style.display = 'none';
    document.getElementById('subjectForm').reset();
}

async function saveSubject() {
    const nameInput = document.getElementById('subjectName');
    const idInput = document.getElementById('subjectId');
    const subjectName = nameInput.value.trim();
    
    if (!subjectName) {
        alert('Please enter a subject name.');
        return;
    }
    
    try {
        if (idInput.value) {
            // Update existing
            const subjectId = parseInt(idInput.value);
            await supabase
                .from('scholar_dollars_subjects')
                .update({ 
                    subject_name: subjectName,
                    updated_at: new Date().toISOString()
                })
                .eq('subject_id', subjectId);
        } else {
            // Insert new
            const maxOrder = subjects.length > 0 
                ? Math.max(...subjects.map(s => s.display_order)) 
                : -1;
            
            await supabase
                .from('scholar_dollars_subjects')
                .insert({
                    user_uid: currentUserUid,
                    subject_name: subjectName,
                    display_order: maxOrder + 1
                });
        }
        
        closeSubjectModal();
        await loadSubjectsAndGrades();
    } catch (error) {
        console.error('Error saving subject:', error);
        alert('Error saving subject. Please try again.');
    }
}

async function editSubject(subjectId) {
    openSubjectModal(subjectId);
}

async function deleteSubject(subjectId) {
    if (!confirm('Are you sure you want to delete this subject? This will also delete all grades for this subject.')) {
        return;
    }
    
    try {
        await supabase
            .from('scholar_dollars_subjects')
            .delete()
            .eq('subject_id', subjectId);
        
        await loadSubjectsAndGrades();
    } catch (error) {
        console.error('Error deleting subject:', error);
        alert('Error deleting subject. Please try again.');
    }
}

async function submitGrades() {
    if (!currentQuarterId) {
        alert('Please select a quarter first.');
        return;
    }
    
    // Verify all subjects have grades
    const missingGrades = subjects.filter(s => !grades[s.subject_id] || !grades[s.subject_id].grade);
    if (missingGrades.length > 0) {
        alert(`Please enter grades for all subjects before submitting. Missing: ${missingGrades.map(s => s.subject_name).join(', ')}`);
        return;
    }
    
    if (!confirm('Are you sure you want to submit your grades for this quarter? This will send them to admins for approval.')) {
        return;
    }
    
    try {
        const credits = calculateCredits();
        const bonus = await checkAllQuartersBonus();
        const totalCredits = credits.total + (bonus.hasBonus ? bonus.bonusAmount : 0);
        
        // Mark all grades as submitted
        for (const subject of subjects) {
            const grade = grades[subject.subject_id];
            if (grade) {
                await supabase
                    .from('scholar_dollars_grades')
                    .update({ 
                        is_submitted: true,
                        submitted_at: new Date().toISOString()
                    })
                    .eq('grade_id', grade.grade_id);
            }
        }
        
        // Create submission record
        const { data: submission, error: submissionError } = await supabase
            .from('scholar_dollars_submissions')
            .insert({
                user_uid: currentUserUid,
                quarter_id: currentQuarterId,
                credits_requested: totalCredits,
                status: 'pending'
            })
            .select()
            .single();
        
        if (submissionError) throw submissionError;
        
        // Create approval entry
        const session = window.authStatus?.getSession();
        const quarter = quarters.find(q => q.quarter_id === currentQuarterId);
        const quarterName = quarter ? quarter.quarter_name : 'Unknown Quarter';
        
        const { error: approvalError } = await supabase
            .from('unified_approvals')
            .insert({
                approval_type: 'scholar_dollars',
                source_id: submission.submission_id,
                user_uid: currentUserUid,
                credits_amount: totalCredits,
                description: `Scholar Dollars: ${quarterName} grades submission - ${totalCredits} credits requested`,
                status: 'pending'
            });
        
        if (approvalError) {
            console.error('Error creating approval:', approvalError);
        }
        
        // Send message to all admins
        await sendAdminNotification(session, quarterName, totalCredits);
        
        alert(`Grades submitted successfully! ${totalCredits} credits requested. Admins have been notified.`);
        
        await loadSubjectsAndGrades();
    } catch (error) {
        console.error('Error submitting grades:', error);
        alert('Error submitting grades. Please try again.');
    }
}

async function sendAdminNotification(session, quarterName, credits) {
    try {
        // Get all admin users
        const { data: admins, error: adminsError } = await supabase
            .from('Users')
            .select('UID, First_Name, Last_Name, Username')
            .eq('User_Type', 'admin');
        
        if (adminsError) throw adminsError;
        if (!admins || admins.length === 0) return;
        
        const userName = session.firstName && session.lastName 
            ? `${session.firstName} ${session.lastName}` 
            : session.username;
        
        // Create message for each admin
        for (const admin of admins) {
            const { error: messageError } = await supabase
                .from('Messages')
                .insert({
                    sender_uid: currentUserUid,
                    recipient_uids: [admin.UID],
                    subject: `Scholar Dollars: ${userName} submitted ${quarterName} grades`,
                    body_html: `
                        <p><strong>${userName}</strong> has submitted their grades for <strong>${quarterName}</strong>.</p>
                        <p><strong>Credits Requested:</strong> ${credits.toLocaleString()}</p>
                        <p>Please review and approve in the Approvals section.</p>
                    `
                });
            
            if (messageError) {
                console.error(`Error sending message to admin ${admin.UID}:`, messageError);
            }
        }
    } catch (error) {
        console.error('Error sending admin notification:', error);
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Make functions available globally
window.updateGrade = updateGrade;
window.editSubject = editSubject;
window.deleteSubject = deleteSubject;

