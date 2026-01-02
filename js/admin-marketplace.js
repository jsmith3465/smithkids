// Admin Marketplace Management page
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

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    const checkAuth = setInterval(() => {
        if (window.authStatus && window.authStatus.isAuthenticated) {
            clearInterval(checkAuth);
            checkUserAccess();
        } else if (window.authStatus && !window.authStatus.isAuthenticated) {
            clearInterval(checkAuth);
            window.location.href = getPagePath('login.html');
        }
    }, 100);
    
    setTimeout(() => {
        clearInterval(checkAuth);
    }, 5000);
});

async function checkUserAccess() {
    const authCheck = document.getElementById('authCheck');
    const mainContent = document.getElementById('mainContent');
    
    try {
        const session = window.authStatus?.getSession();
        if (!session || !session.uid) {
            window.location.href = getPagePath('login.html');
            return;
        }
        
        // Only admins can access this page
        if (session.userType !== 'admin') {
            window.location.href = getPagePath('index.html');
            return;
        }
        
        authCheck.classList.add('hidden');
        mainContent.classList.remove('hidden');
        
        setupTabs();
        await loadMarketplaceItems();
        setupEventListeners();
    } catch (error) {
        console.error('Error checking access:', error);
        window.location.href = getPagePath('login.html');
    }
}

function setupTabs() {
    const tabs = document.querySelectorAll('.marketplace-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');
            switchTab(targetTab);
        });
    });
}

function switchTab(tabName) {
    // Remove active class from all tabs and content
    document.querySelectorAll('.marketplace-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    
    // Add active class to selected tab and content
    const selectedTab = document.querySelector(`[data-tab="${tabName}"]`);
    const selectedContent = document.getElementById(`${tabName}Tab`);
    
    if (selectedTab) selectedTab.classList.add('active');
    if (selectedContent) selectedContent.classList.add('active');
}

function setupEventListeners() {
    const addItemBtn = document.getElementById('addItemBtn');
    const cancelAddBtn = document.getElementById('cancelAddBtn');
    const newItemForm = document.getElementById('newItemForm');
    
    if (addItemBtn) {
        addItemBtn.addEventListener('click', () => {
            document.getElementById('addItemForm').classList.add('active');
        });
    }
    
    if (cancelAddBtn) {
        cancelAddBtn.addEventListener('click', () => {
            document.getElementById('addItemForm').classList.remove('active');
            newItemForm.reset();
        });
    }
    
    if (newItemForm) {
        newItemForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            await addNewItem();
        });
    }
}

async function loadMarketplaceItems() {
    const itemsList = document.getElementById('itemsList');
    
    try {
        const { data: items, error } = await supabase
            .from('marketplace_items')
            .select('*')
            .order('name', { ascending: true });
        
        if (error) throw error;
        
        if (!items || items.length === 0) {
            itemsList.innerHTML = '<div class="no-items">No marketplace items yet. Click "Add New Item" to create one.</div>';
            return;
        }
        
        // Create table
        const table = document.createElement('table');
        table.className = 'items-table';
        
        // Header
        const headerRow = document.createElement('tr');
        headerRow.innerHTML = `
            <th>Icon</th>
            <th>Name</th>
            <th>Description</th>
            <th>Cost</th>
            <th>Status</th>
            <th>Actions</th>
        `;
        table.appendChild(headerRow);
        
        // Item rows
        items.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="item-icon-cell">${item.icon || '🛍️'}</td>
                <td>
                    <input type="text" class="editable-input" data-field="name" data-item-id="${item.item_id}" value="${item.name || ''}">
                </td>
                <td>
                    <input type="text" class="editable-input" data-field="description" data-item-id="${item.item_id}" value="${item.description || ''}">
                </td>
                <td>
                    <input type="number" class="editable-input" data-field="cost" data-item-id="${item.item_id}" value="${item.cost}" min="1">
                </td>
                <td>
                    <button class="toggle-active ${item.is_active ? 'active' : 'inactive'}" 
                            data-item-id="${item.item_id}" 
                            data-current-status="${item.is_active}">
                        ${item.is_active ? 'Active' : 'Inactive'}
                    </button>
                </td>
                <td>
                    <button class="btn btn-danger" style="padding: 5px 10px; font-size: 0.85rem;" 
                            onclick="deleteItem(${item.item_id})">
                        Delete
                    </button>
                </td>
            `;
            table.appendChild(row);
        });
        
        itemsList.innerHTML = '';
        itemsList.appendChild(table);
        
        // Add event listeners for editable inputs
        const editableInputs = document.querySelectorAll('.editable-input');
        editableInputs.forEach(input => {
            input.addEventListener('blur', async () => {
                await updateItemField(
                    input.dataset.itemId,
                    input.dataset.field,
                    input.value
                );
            });
        });
        
        // Add event listeners for toggle buttons
        const toggleButtons = document.querySelectorAll('.toggle-active');
        toggleButtons.forEach(btn => {
            btn.addEventListener('click', async () => {
                await toggleItemStatus(btn.dataset.itemId, btn.dataset.currentStatus === 'true');
            });
        });
        
    } catch (error) {
        console.error('Error loading marketplace items:', error);
        itemsList.innerHTML = '<div class="no-items">Error loading items. Please try again.</div>';
    }
}

async function updateItemField(itemId, field, value) {
    try {
        const updateData = {};
        if (field === 'cost') {
            updateData[field] = parseInt(value);
        } else {
            updateData[field] = value;
        }
        updateData.updated_at = new Date().toISOString();
        
        const { error } = await supabase
            .from('marketplace_items')
            .update(updateData)
            .eq('item_id', itemId);
        
        if (error) throw error;
        
        showSuccess('Item updated successfully!');
        setTimeout(() => hideMessages(), 2000);
    } catch (error) {
        console.error('Error updating item:', error);
        showError('Error updating item. Please try again.');
    }
}

async function toggleItemStatus(itemId, currentStatus) {
    try {
        const { error } = await supabase
            .from('marketplace_items')
            .update({ 
                is_active: !currentStatus,
                updated_at: new Date().toISOString()
            })
            .eq('item_id', itemId);
        
        if (error) throw error;
        
        await loadMarketplaceItems();
        showSuccess('Item status updated successfully!');
        setTimeout(() => hideMessages(), 2000);
    } catch (error) {
        console.error('Error toggling item status:', error);
        showError('Error updating item status. Please try again.');
    }
}

async function addNewItem() {
    const name = document.getElementById('newItemName').value.trim();
    const icon = document.getElementById('newItemIcon').value.trim();
    const cost = parseInt(document.getElementById('newItemCost').value);
    const description = document.getElementById('newItemDescription').value.trim();
    
    if (!name || !icon || !cost || cost < 1) {
        showError('Please fill in all required fields with valid values.');
        return;
    }
    
    try {
        const { error } = await supabase
            .from('marketplace_items')
            .insert({
                name: name,
                icon: icon,
                cost: cost,
                description: description || null,
                is_active: true
            });
        
        if (error) throw error;
        
        document.getElementById('addItemForm').classList.remove('active');
        document.getElementById('newItemForm').reset();
        await loadMarketplaceItems();
        showSuccess('Item added successfully!');
        setTimeout(() => hideMessages(), 2000);
    } catch (error) {
        console.error('Error adding item:', error);
        showError('Error adding item. Please try again.');
    }
}

async function deleteItem(itemId) {
    if (!confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
        return;
    }
    
    try {
        const { error } = await supabase
            .from('marketplace_items')
            .delete()
            .eq('item_id', itemId);
        
        if (error) throw error;
        
        await loadMarketplaceItems();
        showSuccess('Item deleted successfully!');
        setTimeout(() => hideMessages(), 2000);
    } catch (error) {
        console.error('Error deleting item:', error);
        showError('Error deleting item. Please try again.');
    }
}

// Make deleteItem available globally for onclick handlers
window.deleteItem = deleteItem;

function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }
}

function showSuccess(message) {
    const successDiv = document.getElementById('successMessage');
    if (successDiv) {
        successDiv.textContent = message;
        successDiv.style.display = 'block';
    }
}

function hideMessages() {
    const errorDiv = document.getElementById('errorMessage');
    const successDiv = document.getElementById('successMessage');
    if (errorDiv) errorDiv.style.display = 'none';
    if (successDiv) successDiv.style.display = 'none';
}

