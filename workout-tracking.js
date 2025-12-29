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
    
    // Only show for standard users (admins don't need to record workouts)
    if (session.userType === 'admin') {
        return;
    }
    
    // Show workout section with link
    const workoutSection = document.getElementById('workoutSection');
    if (workoutSection) {
        workoutSection.classList.remove('hidden');
    }
}

