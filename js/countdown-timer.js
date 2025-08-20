// Countdown Timer for STEM MUN Delegation Form
// Deadline: August 21, 2025 at 12:00 AM Egypt Time

class CountdownTimer {
    constructor() {
        // Set deadline to August 21, 2025 12:00 AM Egypt Time
        this.deadline = new Date('2025-08-21T00:00:00+03:00');
        this.timer = null;
        this.isExpired = false;
        
        this.elements = {
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds'),
            timer: document.getElementById('countdown-timer'),
            warning: document.getElementById('deadline-warning'),
            form: document.querySelector('.contactForm'),
            submitBtn: document.getElementById('submit-btn')
        };
        
        this.init();
    }
    
    init() {
        // Check if deadline has already passed
        if (new Date() >= this.deadline) {
            this.handleExpiredDeadline();
            return;
        }
        
        // Start the countdown
        this.updateCountdown();
        this.timer = setInterval(() => this.updateCountdown(), 1000);
        
        // Add visual enhancements
        this.addVisualEffects();
    }
    
    updateCountdown() {
        const now = new Date().getTime();
        const distance = this.deadline.getTime() - now;
        
        // Check if deadline has passed
        if (distance < 0) {
            this.handleExpiredDeadline();
            return;
        }
        
        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update display
        this.elements.days.textContent = this.formatNumber(days);
        this.elements.hours.textContent = this.formatNumber(hours);
        this.elements.minutes.textContent = this.formatNumber(minutes);
        this.elements.seconds.textContent = this.formatNumber(seconds);
        
        // Add urgency effects
        this.addUrgencyEffects(days, hours, minutes);
        
        // Store countdown state in localStorage
        localStorage.setItem('countdown_active', 'true');
        localStorage.setItem('countdown_time_left', distance.toString());
    }
    
    formatNumber(num) {
        return num.toString().padStart(2, '0');
    }
    
    addUrgencyEffects(days, hours, minutes) {
        const container = document.querySelector('.countdown-container');
        
        // Remove existing urgency classes
        container.classList.remove('urgent', 'critical', 'final-hours');
        
        // Add urgency based on time remaining
        if (days === 0 && hours < 1) {
            // Final hour - most urgent
            container.classList.add('final-hours');
            this.elements.timer.classList.add('pulse-critical');
        } else if (days === 0 && hours < 24) {
            // Less than 24 hours - critical
            container.classList.add('critical');
            this.elements.timer.classList.add('pulse-urgent');
        } else if (days < 3) {
            // Less than 3 days - urgent
            container.classList.add('urgent');
        }
        
        // Flash effect for final minutes
        if (days === 0 && hours === 0 && minutes < 10) {
            this.elements.timer.classList.add('flash-warning');
        }
    }
    
    addVisualEffects() {
        // Add entrance animation
        const container = document.querySelector('.countdown-container');
        container.style.opacity = '0';
        container.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            container.style.transition = 'all 0.8s ease-out';
            container.style.opacity = '1';
            container.style.transform = 'translateY(0)';
        }, 500);
        
        // Add number flip animation
        this.elements.timer.querySelectorAll('.countdown-number').forEach(number => {
            number.addEventListener('transitionend', () => {
                number.classList.add('flip');
                setTimeout(() => number.classList.remove('flip'), 300);
            });
        });
    }
    
    handleExpiredDeadline() {
        this.isExpired = true;
        
        // Clear the timer
        if (this.timer) {
            clearInterval(this.timer);
        }
        
        // Hide countdown and show warning
        this.elements.timer.style.display = 'none';
        this.elements.warning.style.display = 'block';
        
        // Disable the form
        this.disableForm();
        
        // Store expired state
        localStorage.setItem('countdown_active', 'false');
        localStorage.setItem('deadline_expired', 'true');
        
        // Show expiry notification
        this.showExpiryNotification();
    }
    
    disableForm() {
        // Disable all form inputs
        const inputs = this.elements.form.querySelectorAll('input, textarea, select, button');
        inputs.forEach(input => {
            input.disabled = true;
            input.style.opacity = '0.5';
            input.style.cursor = 'not-allowed';
        });
        
        // Add overlay to form
        const overlay = document.createElement('div');
        overlay.className = 'form-expired-overlay';
        overlay.innerHTML = `
            <div class="expiry-message">
                <h3>⏰ Registration Closed</h3>
                <p>The deadline for applications has passed.</p>
                <p>Please contact us at <a href="mailto:info@stemmun.org">info@stemmun.org</a> for more information.</p>
            </div>
        `;
        
        this.elements.form.style.position = 'relative';
        this.elements.form.appendChild(overlay);
    }
    
    showExpiryNotification() {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'deadline-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">⚠️</span>
                <div class="notification-text">
                    <strong>Registration Deadline Passed</strong>
                    <p>The application deadline has expired. The form is now closed.</p>
                </div>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 10000);
    }
    
    // Method to check if deadline has passed (can be called from other scripts)
    static isDeadlinePassed() {
        const deadline = new Date('2025-08-21T00:00:00+03:00');
        return new Date() >= deadline;
    }
    
    // Method to get time remaining
    static getTimeRemaining() {
        const deadline = new Date('2025-08-21T00:00:00+03:00');
        const now = new Date().getTime();
        const distance = deadline.getTime() - now;
        
        if (distance < 0) return null;
        
        return {
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000),
            total: distance
        };
    }
}

// Initialize countdown when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if deadline elements exist
    if (document.getElementById('countdown-timer')) {
        new CountdownTimer();
    }
    
    // Also check on page load if deadline has already passed
    const deadlineExpired = localStorage.getItem('deadline_expired');
    if (deadlineExpired === 'true' && CountdownTimer.isDeadlinePassed()) {
        // If deadline was already expired, disable form immediately
        const form = document.querySelector('.contactForm');
        if (form) {
            const timer = new CountdownTimer();
            timer.handleExpiredDeadline();
        }
    }
});

// Export for use in other scripts
window.CountdownTimer = CountdownTimer;
