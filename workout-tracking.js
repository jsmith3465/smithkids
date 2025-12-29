// Workout tracking functionality for index page - shows link to add workout page
document.addEventListener('DOMContentLoaded', () => {
    // Wait for auth to be ready
    const checkAuth = setInterval(() => {
        if (window.authStatus) {
            clearInterval(checkAuth);
            if (window.authStatus.isAuthenticated) {
                setupWorkoutTracking();
            }
        }
    }, 100);
    
    setTimeout(() => {
        clearInterval(checkAuth);
        // Try one more time after timeout
        if (window.authStatus && window.authStatus.isAuthenticated) {
            setupWorkoutTracking();
        }
    }, 5000);
});

function setupWorkoutTracking() {
    const session = window.authStatus?.getSession();
    if (!session) return;
    
    // Show workout section with link for all users (admin and standard)
    const workoutSection = document.getElementById('workoutSection');
    if (workoutSection) {
        workoutSection.classList.remove('hidden');
    }
}

