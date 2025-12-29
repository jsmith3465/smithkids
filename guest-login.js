// Guest login page for remote Tic Tac Toe games
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('guestLoginForm');
    const errorMessage = document.getElementById('errorMessage');
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    
    // Get room code from URL
    const urlParams = new URLSearchParams(window.location.search);
    const roomCode = urlParams.get('room');
    
    if (!roomCode) {
        showError('Invalid game link. No room code found.');
        return;
    }
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        
        if (!firstName || !lastName) {
            showError('Please enter both first and last name.');
            return;
        }
        
        // Store guest info in sessionStorage
        const guestInfo = {
            firstName: firstName,
            lastName: lastName,
            roomCode: roomCode,
            isGuest: true,
            timestamp: Date.now()
        };
        
        sessionStorage.setItem('guestSession', JSON.stringify(guestInfo));
        
        // Redirect to Tic Tac Toe page with room code
        // Use relative path - should work if files are in same directory
        window.location.href = `tic-tac-toe.html?room=${roomCode}`;
    });
});

function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 5000);
}

