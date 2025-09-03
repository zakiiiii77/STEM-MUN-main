// Event Booking Page JavaScript - STEM MUN

// Global variables and configuration
const CONFIG = {
    SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbyFSwEQtqOHlefXILOahe1YmNlkPVtOYBY2hGvspdjEOdlBCjHYLMByYGovbfM1Qd0jVA/exec',
    AUTO_SAVE_KEY: 'eventBookingFormData'
};

document.addEventListener('DOMContentLoaded', function() {
    console.log('Event booking page loaded');
    
    // Use requestIdleCallback for non-critical initialization to improve performance
    if (window.requestIdleCallback) {
        requestIdleCallback(() => {
            initMobileNav();
            initSmoothScrolling();
            initAutoSave();
            enhanceFormInteractions();
        });
    } else {
        // Fallback for browsers without requestIdleCallback
        setTimeout(() => {
            initMobileNav();
            initSmoothScrolling();
            initAutoSave();
            enhanceFormInteractions();
        }, 100);
    }
    
    // Initialize critical functionality immediately
    initBookingForm();
    initFormValidation();
});

// Booking Form Handler
function initBookingForm() {
    const form = document.getElementById('eventBookingForm');
    
    if (form) {
        console.log('Form found, adding event listener');
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted');
            
            // Validate form
            if (!validateBookingForm()) {
                console.log('Form validation failed');
                return;
            }
            
            console.log('Form validation passed');
            
            // Show loading state
            const submitBtn = form.querySelector('.book-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing Booking...';
            submitBtn.disabled = true;
            
            // Submit form data
            const formData = new FormData(form);
            
            // Log form data for debugging
            console.log('Form data to be submitted:');
            for (let [key, value] of formData.entries()) {
                console.log(key + ': ' + value);
            }
            
            fetch(CONFIG.SCRIPT_URL, {
                method: 'POST',
                body: formData
            })
            .then(response => {
                console.log('Response received:', response);
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                showSuccessMessage();
                form.reset();
                
                // Reset button
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Booking Confirmed!';
                submitBtn.style.background = 'var(--success-color)';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);
            })
            .catch(error => {
                console.error('Error:', error);
                showErrorMessage('There was an error processing your booking. Please try again.');
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
        });
    } else {
        console.error('Form with ID "eventBookingForm" not found');
    }
}

// Form Validation
function validateBookingForm() {
    const form = document.getElementById('eventBookingForm');
    if (!form) {
        console.error('Form not found for validation');
        return false;
    }
    
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    let errors = [];
    
    console.log('Validating form with', requiredFields.length, 'required fields');
    
    // Remove previous error states
    form.querySelectorAll('.error').forEach(field => {
        field.classList.remove('error');
    });
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('error');
            field.parentElement.classList.add('error');
            errors.push(`${field.name} is required`);
            isValid = false;
        } else {
            field.classList.remove('error');
            field.parentElement.classList.remove('error');
        }
        
        // Email validation
        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                field.classList.add('error');
                field.parentElement.classList.add('error');
                errors.push('Please enter a valid email address');
                isValid = false;
            }
        }
        
        // Phone validation
        if (field.type === 'tel' && field.value) {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(field.value)) {
                field.classList.add('error');
                field.parentElement.classList.add('error');
                errors.push('Please enter a valid phone number');
                isValid = false;
            }
        }
        
        // Age validation
        if (field.name === 'age' && field.value) {
            const age = parseInt(field.value);
            if (age < 14 || age > 25) {
                field.classList.add('error');
                field.parentElement.classList.add('error');
                errors.push('Age must be between 14 and 25');
                isValid = false;
            }
        }
    });
    
    // Terms acceptance
    const termsCheckbox = form.querySelector('#terms');
    if (termsCheckbox && !termsCheckbox.checked) {
        termsCheckbox.parentElement.classList.add('error');
        errors.push('You must agree to the Terms & Conditions');
        isValid = false;
    }
    
    if (!isValid) {
        console.log('Validation errors:', errors);
        showErrorMessage('Please fill in all required fields correctly.');
        
        // Scroll to first error
        const firstError = form.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => {
                const input = firstError.querySelector('input, select, textarea');
                if (input) input.focus();
            }, 500);
        }
    } else {
        console.log('Form validation passed');
    }
    
    return isValid;
}

// Real-time field validation
function initFormValidation() {
    const form = document.getElementById('eventBookingForm');
    if (!form) return;
    
    // Add error styles to CSS
    const style = document.createElement('style');
    style.textContent = `
        .error input, .error select, .error textarea {
            border-color: var(--error-color) !important;
            box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.1) !important;
        }
        .error .checkbox-label {
            color: var(--error-color);
        }
    `;
    document.head.appendChild(style);
    
    // Real-time validation
    form.addEventListener('input', function(e) {
        const field = e.target;
        
        // Remove error state on input
        if (field.classList.contains('error') || field.parentElement.classList.contains('error')) {
            field.classList.remove('error');
            field.parentElement.classList.remove('error');
        }
        
        // Email validation
        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        }
        
        // Phone validation
        if (field.type === 'tel' && field.value) {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(field.value)) {
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        }
    });
    
    // Terms checkbox validation
    const termsCheckbox = form.querySelector('#terms');
    if (termsCheckbox) {
        termsCheckbox.addEventListener('change', function() {
            if (this.checked) {
                this.parentElement.classList.remove('error');
            }
        });
    }
}

// Mobile Navigation
function initMobileNav() {
    const navCollapse = document.querySelector('.nav-collapse');
    const mainNav = document.querySelector('.main-nav');
    const navbar = document.querySelector('.navbar');
    
    console.log('Initializing mobile navigation');
    console.log('Nav collapse found:', !!navCollapse);
    console.log('Main nav found:', !!mainNav);
    
    if (navCollapse && mainNav) {
        navCollapse.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Mobile nav toggle clicked');
            
            mainNav.classList.toggle('active');
            navCollapse.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (mainNav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.main-nav a').forEach(link => {
            link.addEventListener('click', () => {
                console.log('Nav link clicked, closing menu');
                mainNav.classList.remove('active');
                navCollapse.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Handle dropdown clicks on mobile
        document.querySelectorAll('.has-dropdown > a').forEach(dropdown => {
            dropdown.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    const menu = this.nextElementSibling;
                    if (menu) {
                        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
                    }
                }
            });
        });
    }
    
    // Close menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            if (mainNav) {
                mainNav.classList.remove('active');
                document.body.style.overflow = '';
            }
            if (navCollapse) {
                navCollapse.classList.remove('active');
            }
        }
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Success Message
function showSuccessMessage() {
    // Show enhanced success modal if available, otherwise fall back to notification
    if (typeof showSubmissionSuccess === 'function') {
        showSubmissionSuccess();
    } else {
        const message = createNotification('success', 'Booking submitted successfully! We will contact you within 24 hours to confirm your registration.', 'fa-check-circle');
    }
}

// Error Message
function showErrorMessage(text) {
    const message = createNotification('error', text, 'fa-exclamation-triangle');
}

// Notification System
function createNotification(type, text, icon) {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());
    
    const colors = {
        success: { bg: 'var(--success-color)', shadow: 'rgba(76, 175, 80, 0.3)' },
        error: { bg: 'var(--error-color)', shadow: 'rgba(244, 67, 54, 0.3)' }
    };
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content" style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type].bg};
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            box-shadow: 0 8px 25px ${colors[type].shadow};
            z-index: 10000;
            font-weight: 600;
            max-width: 400px;
            word-wrap: break-word;
            animation: slideInRight 0.5s ease-out;
        ">
            <i class="fa ${icon}" style="margin-right: 8px;"></i>
            ${text}
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove
    setTimeout(() => {
        const content = notification.querySelector('.notification-content');
        content.style.animation = 'slideOutRight 0.5s ease-in forwards';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 500);
    }, type === 'success' ? 5000 : 4000);
    
    // Add animations to CSS if not exists
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Terms & Conditions Modal
function showTerms() {
    const modal = document.createElement('div');
    modal.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 10001;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        " onclick="this.remove()">
            <div style="
                background: white;
                padding: 30px;
                border-radius: 15px;
                max-width: 600px;
                max-height: 80vh;
                overflow-y: auto;
                position: relative;
            " onclick="event.stopPropagation()">
                <button onclick="this.closest('div').closest('div').remove()" style="
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: var(--accent-color);
                ">&times;</button>
                
                <h2 style="color: var(--primary-color); margin-bottom: 20px;">Terms & Conditions</h2>
                
                <div style="color: var(--accent-color); line-height: 1.6;">
                    <h3>Event Registration Terms</h3>
                    <ul style="margin: 15px 0;">
                        <li>Registration fee is non-refundable</li>
                        <li>Participants must attend all 3 days of the program</li>
                        <li>Certificate will be provided upon completion</li>
                        <li>Photography/videography consent is included</li>
                    </ul>
                    
                    <h3>Code of Conduct</h3>
                    <ul style="margin: 15px 0;">
                        <li>Respectful behavior towards all participants</li>
                        <li>Professional dress code required</li>
                        <li>No disruption during sessions</li>
                        <li>Follow all venue rules and regulations</li>
                    </ul>
                    
                    <h3>Health & Safety</h3>
                    <ul style="margin: 15px 0;">
                        <li>Participants must inform of any medical conditions</li>
                        <li>Emergency contact information required</li>
                        <li>First aid will be available on-site</li>
                    </ul>
                    
                    <p style="margin-top: 20px; font-size: 14px; opacity: 0.8;">
                        By registering, you agree to these terms and conditions.
                    </p>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Form auto-save functionality
function initAutoSave() {
    const form = document.getElementById('eventBookingForm');
    if (!form) {
        console.log('Form not found for auto-save');
        return;
    }
    
    console.log('Initializing auto-save');
    
    // Load saved data
    const savedData = localStorage.getItem(CONFIG.AUTO_SAVE_KEY);
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            console.log('Loading saved form data:', data);
            
            Object.keys(data).forEach(key => {
                const field = form.querySelector(`[name="${key}"]`);
                if (field) {
                    if (field.type === 'checkbox') {
                        field.checked = data[key];
                    } else {
                        field.value = data[key];
                    }
                }
            });
        } catch (e) {
            console.error('Error loading saved form data:', e);
        }
    }
    
    // Save data on input
    form.addEventListener('input', function() {
        const formData = new FormData(form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        // Handle checkboxes
        form.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            data[checkbox.name] = checkbox.checked;
        });
        
        localStorage.setItem(CONFIG.AUTO_SAVE_KEY, JSON.stringify(data));
    });
    
    // Clear saved data on successful submission
    form.addEventListener('submit', function() {
        setTimeout(() => {
            localStorage.removeItem(CONFIG.AUTO_SAVE_KEY);
            console.log('Cleared saved form data');
        }, 1000);
    });
}

// Enhanced form interactions
function enhanceFormInteractions() {
    const form = document.getElementById('eventBookingForm');
    if (!form) {
        console.log('Form not found for enhanced interactions');
        return;
    }
    
    console.log('Enhancing form interactions');
    
    // Add floating label effect
    form.querySelectorAll('input, textarea, select').forEach(field => {
        field.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        field.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if field has value on load
        if (field.value) {
            field.parentElement.classList.add('focused');
        }
    });
}
