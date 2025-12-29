// Workout tracking functionality for index page - shows link to add workout page
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (window.authStatus && window.authStatus.isAuthenticated) {
            setupWorkoutTracking();
        }
    }, 500);
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

