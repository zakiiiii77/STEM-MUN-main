// Premium Event Booking Form JavaScript - STEM MUN - Performance Optimized

class PremiumBookingForm {
    constructor() {
        this.modal = null;
        this.form = null;
        this.currentStep = 1;
        this.totalSteps = 3;
        this.formData = {};
        this.isSubmitting = false;
        this.isInitialized = false;
        
        // Lazy initialization to improve performance
        this.lazyInit();
    }
    
    lazyInit() {
        // Only initialize when actually needed
        console.log('Premium Form: Lazy initialization ready');
    }
    
    init() {
        if (this.isInitialized) return;
        
        console.log('Initializing Premium Booking Form');
        this.createModal();
        this.bindEvents();
        this.initFloatingLabels();
        this.createOptimizedParticles();
        this.isInitialized = true;
    }
    
    createModal() {
        // Create modal HTML
        const modalHTML = `
            <div class="booking-modal" id="bookingModal">
                <div class="booking-modal-content">
                    <button class="modal-close" onclick="premiumForm.closeModal()">
                        <i class="fas fa-times"></i>
                    </button>
                    
                    <div class="particles-bg">
                        <!-- Particles will be added here -->
                    </div>
                    
                    <div class="form-header">
                        <h2><i class="fas fa-gavel"></i> Event Registration</h2>
                        
                    </div>
                    
                    <div class="form-body">
                        <div class="form-progress">
                            <div class="progress-container">
                                <div class="progress-step active" data-step="1">1</div>
                                <span class="step-label">Personal Info</span>
                            </div>
                            <div class="progress-container">
                                <div class="progress-step" data-step="2">2</div>
                                <span class="step-label">Academic Details</span>
                            </div>
                            <div class="progress-container">
                                <div class="progress-step" data-step="3">3</div>
                                <span class="step-label">Payment</span>
                            </div>
                        </div>
                        
                        <form id="premiumBookingForm" class="premium-form">
                            <!-- Step 1: Personal Information -->
                            <div class="form-step active" data-step="1">
                                <div class="form-group floating-label">
                                    <input type="text" id="fullName" name="fullName" class="premium-input" required>
                                    <label for="fullName">Full Name *</label>
                                </div>
                                
                                <div class="form-group floating-label">
                                    <input type="email" id="email" name="email" class="premium-input" required>
                                    <label for="email">Email Address *</label>
                                </div>
                                
                                <div class="form-group floating-label">
                                    <input type="tel" id="phone" name="phone" class="premium-input" required>
                                    <label for="phone">Phone Number *</label>
                                </div>
                                
                                <div class="form-group floating-label">
                                    <input type="text" id="faculty" name="faculty" class="premium-input" required>
                                    <label for="faculty">Faculty/School *</label>
                                </div>
                                
                                <div class="form-group floating-label">
                                    <input type="text" id="grade" name="grade" class="premium-input" required>
                                    <label for="grade">Grade/Year *</label>
                                </div>
                                
                                <div class="form-navigation">
                                    <button type="button" class="next-step premium-submit" onclick="premiumForm.nextStep()">
                                        Next Step <i class="fas fa-arrow-right"></i>
                                    </button>
                                </div>
                            </div>
                            
                            <!-- Step 2: Payment Information -->
                            <div class="form-step" data-step="2">
                                <div class="payment-instructions">
                                    <h3 style="color: var(--primary-color); margin-bottom: 20px; text-align: center;">
                                        <i class="fas fa-credit-card"></i> Payment Instructions
                                    </h3>
                                    <div style="background: rgba(30, 30, 40, 0.8); padding: 20px; border-radius: 10px; margin-bottom: 20px; border: 1px solid rgba(255, 255, 255, 0.1);">
                                        <p style="margin-bottom: 15px; color: #e2e8f0; font-weight: 500;">
                                            Please make your payment using one of the following methods:
                                        </p>
                                        <div style="display: flex; flex-direction: column; gap: 10px;">
                                            <div style="display: flex; align-items: center; gap: 10px;">
                                                <i class="fas fa-mobile-alt" style="color: #e74c3c; width: 20px;"></i>
                                                <strong style="color: #f1f5f9;">Vodafone Cash:</strong> 
                                                <span style="color: #cbd5e0;">01004110397</span>
                                            </div>
                          
                                        </div>
                                        <p style="margin-top: 15px; color: #9ca3af; font-size: 14px; font-style: italic;">
                                            After payment, please enter the phone number you used to transfer the money in the transaction field below.
                                        </p>
                                    </div>
                                </div>
                                
                                <div class="form-group floating-label">
                                    <input type="tel" id="transactionNumber" name="transactionNumber" class="premium-input" required>
                                    <label for="transactionNumber">Transaction Number *</label>
                                </div>
                                
                                <div class="form-group">
                                    <label for="paymentScreenshot" style="display: block; color: #e2e8f0; font-weight: 500; margin-bottom: 8px;">
                                        <i class="fas fa-camera" style="margin-right: 8px; color: var(--primary-color);"></i>
                                        Payment Screenshot *
                                    </label>
                                    <div class="file-upload-container">
                                        <input type="file" id="paymentScreenshot" name="paymentScreenshot" accept="image/*" class="file-input" required>
                                        <div class="file-upload-display">
                                            <i class="fas fa-cloud-upload-alt"></i>
                                            <span class="upload-text">Click to upload payment screenshot</span>
                                            <small class="upload-hint">JPG, PNG, or GIF (Max 5MB)</small>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="form-group floating-label">
                                    <input type="text" id="promoCode" name="promoCode" class="premium-input">
                                    <label for="promoCode">Promo Code (Optional)</label>
                                </div>
                                
                                <div class="form-navigation">
                                    <button type="button" class="prev-step" onclick="premiumForm.prevStep()">
                                        <i class="fas fa-arrow-left"></i> Previous
                                    </button>
                                    <button type="button" class="next-step premium-submit" onclick="premiumForm.nextStep()">
                                        Next Step <i class="fas fa-arrow-right"></i>
                                    </button>
                                </div>
                            </div>
                            
                            <!-- Step 3: Confirmation & Payment -->
                            <div class="form-step" data-step="3">
                                <div class="pricing-3d">
                                    <div class="pricing-card-3d">
                                        <h3 style="text-align: center; color: #f1f5f9; margin-bottom: 20px;">
                                            <i class="fas fa-gavel" style="color: var(--primary-color);"></i> Event Registration
                                        </h3>
                                        <div class="price-amount">EGP 180</div>
                                        <ul style="list-style: none; padding: 0;">
                                            <li><i class="fas fa-check" style="color: #2ed573; margin-right: 10px;"></i> Full-Day Interactive Event</li>
                                            <li><i class="fas fa-check" style="color: #2ed573; margin-right: 10px;"></i> All Event Materials & Resources</li>
                                            <li><i class="fas fa-check" style="color: #2ed573; margin-right: 10px;"></i> Participation Recognition</li>
                                            <li><i class="fas fa-check" style="color: #2ed573; margin-right: 10px;"></i> Leadership & Communication Workshops</li>
                                            <li><i class="fas fa-check" style="color: #2ed573; margin-right: 10px;"></i> Professional Event Photography</li>
                                        </ul>
                                    </div>
                                </div>
                                
                                <label class="premium-checkbox">
                                    <input type="checkbox" id="terms" name="terms" required>
                                    <span class="checkbox-custom"></span>
                                    <span>I agree to the <a href="#" onclick="premiumForm.showTerms()" style="color: var(--secondary-warm); text-decoration: underline;">Terms & Conditions</a> *</span>
                                </label>
                                
                                <label class="premium-checkbox">
                                    <input type="checkbox" id="newsletter" name="newsletter">
                                    <span class="checkbox-custom"></span>
                                    <span>Subscribe to our newsletter for updates</span>
                                </label>
                                
                                <div class="form-navigation">
                                    <button type="button" class="prev-step" onclick="premiumForm.prevStep()">
                                        <i class="fas fa-arrow-left"></i> Previous
                                    </button>
                                    <button type="submit" class="premium-submit">
                                        <i class="fas fa-calendar-check"></i> Complete Event Registration - EGP 180
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;
        
        // Add modal to body
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.modal = document.getElementById('bookingModal');
        this.form = document.getElementById('premiumBookingForm');
    }
    
    bindEvents() {
        // Debounced event handlers for better performance
        const debounce = (func, wait) => {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        };
        
        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Close modal on overlay click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
        
        // Debounced real-time validation for better performance
        const debouncedValidation = debounce((target) => this.validateField(target), 300);
        this.form.addEventListener('input', (e) => debouncedValidation(e.target));
        this.form.addEventListener('change', (e) => this.validateField(e.target));
        
        // File upload handling
        this.form.addEventListener('change', (e) => {
            if (e.target.type === 'file') {
                this.handleFileUpload(e.target);
            }
        });
    }
    
    initFloatingLabels() {
        const inputs = this.form.querySelectorAll('.premium-input, .premium-textarea');
        
        inputs.forEach(input => {
            // Check if input has value on load
            if (input.value) {
                input.parentElement.classList.add('has-value');
            }
            
            input.addEventListener('input', (e) => {
                const parent = e.target.parentElement;
                if (e.target.value.trim()) {
                    parent.classList.add('has-value');
                } else {
                    parent.classList.remove('has-value');
                }
            });
            
            input.addEventListener('focus', (e) => {
                e.target.parentElement.classList.add('has-value');
            });
            
            input.addEventListener('blur', (e) => {
                if (!e.target.value.trim()) {
                    e.target.parentElement.classList.remove('has-value');
                }
            });
        });
    }
    
    createOptimizedParticles() {
        // Reduced particle count for better performance
        const particlesContainer = this.modal.querySelector('.particles-bg');
        const particleCount = 3; // Reduced from 15 to 3 for mobile performance
        
        // Use requestAnimationFrame for smoother animation
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.willChange = 'transform'; // Optimize for GPU acceleration
            particlesContainer.appendChild(particle);
        }
    }
    
    openModal() {
        console.log('Opening premium booking modal');
        
        // Initialize only when modal is opened (lazy loading)
        if (!this.isInitialized) {
            this.init();
        }
        
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus first input after animation with debounce
        requestAnimationFrame(() => {
            setTimeout(() => {
                const firstInput = this.form.querySelector('.premium-input');
                if (firstInput) firstInput.focus();
            }, 300);
        });
    }
    
    closeModal() {
        console.log('Closing premium booking modal');
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset form if not submitted
        if (!this.isSubmitting) {
            this.resetForm();
        }
    }
    
    nextStep() {
        if (this.currentStep < this.totalSteps) {
            // Validate current step
            if (this.validateCurrentStep()) {
                this.hideStep(this.currentStep);
                this.currentStep++;
                this.showStep(this.currentStep);
                this.updateProgress();
            }
        }
    }
    
    prevStep() {
        if (this.currentStep > 1) {
            this.hideStep(this.currentStep);
            this.currentStep--;
            this.showStep(this.currentStep);
            this.updateProgress();
        }
    }
    
    showStep(step) {
        const stepElement = this.form.querySelector(`[data-step="${step}"]`);
        stepElement.style.display = 'block';
        
        // Use requestAnimationFrame for smoother animation
        requestAnimationFrame(() => {
            stepElement.classList.add('active');
        });
    }
    
    hideStep(step) {
        const stepElement = this.form.querySelector(`[data-step="${step}"]`);
        stepElement.classList.remove('active');
        
        // Use requestAnimationFrame for performance
        requestAnimationFrame(() => {
            setTimeout(() => {
                stepElement.style.display = 'none';
            }, 250); // Reduced timeout for faster transitions
        });
    }
    
    updateProgress() {
        const steps = this.modal.querySelectorAll('.progress-step');
        
        steps.forEach((step, index) => {
            const stepNum = index + 1;
            
            if (stepNum < this.currentStep) {
                step.classList.add('completed');
                step.classList.remove('active');
                step.innerHTML = ''; // Empty content for CSS checkmark
            } else if (stepNum === this.currentStep) {
                step.classList.add('active');
                step.classList.remove('completed');
                step.innerHTML = stepNum;
            } else {
                step.classList.remove('active', 'completed');
                step.innerHTML = stepNum;
            }
        });
    }
    
    validateCurrentStep() {
        const currentStepElement = this.form.querySelector(`[data-step="${this.currentStep}"]`);
        const requiredFields = currentStepElement.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            this.showNotification('Please fill in all required fields correctly.', 'error');
        }
        
        return isValid;
    }
    
    handleFileUpload(fileInput) {
        const file = fileInput.files[0];
        const container = fileInput.closest('.file-upload-container');
        const display = container.querySelector('.file-upload-display');
        
        if (file) {
            // Validate file size (5MB max)
            if (file.size > 5 * 1024 * 1024) {
                this.showNotification('File size must be less than 5MB', 'error');
                fileInput.value = '';
                return;
            }
            
            // Validate file type
            if (!file.type.startsWith('image/')) {
                this.showNotification('Please upload an image file', 'error');
                fileInput.value = '';
                return;
            }
            
            // Update display
            container.classList.add('has-file');
            display.querySelector('.upload-text').textContent = file.name;
            display.querySelector('.upload-hint').textContent = `${(file.size / 1024 / 1024).toFixed(2)} MB`;
            
            // Add remove button
            if (!display.querySelector('.file-name-display')) {
                const fileDisplay = document.createElement('div');
                fileDisplay.className = 'file-name-display';
                fileDisplay.innerHTML = `
                    <span><i class="fas fa-image"></i> ${file.name}</span>
                    <button type="button" class="remove-file" onclick="premiumForm.removeFile('${fileInput.id}')">
                        <i class="fas fa-times"></i>
                    </button>
                `;
                display.appendChild(fileDisplay);
            }
        }
    }
    
    removeFile(inputId) {
        const fileInput = document.getElementById(inputId);
        const container = fileInput.closest('.file-upload-container');
        const display = container.querySelector('.file-upload-display');
        const fileDisplay = display.querySelector('.file-name-display');
        
        fileInput.value = '';
        container.classList.remove('has-file');
        display.querySelector('.upload-text').textContent = 'Click to upload payment screenshot';
        display.querySelector('.upload-hint').textContent = 'JPG, PNG, or GIF (Max 5MB)';
        
        if (fileDisplay) {
            fileDisplay.remove();
        }
    }
    
    validateField(field) {
        const formGroup = field.closest('.form-group') || field.closest('.premium-checkbox');
        let isValid = true;
        
        // Remove previous states
        formGroup.classList.remove('error', 'success');
        
        // Required field validation
        if (field.hasAttribute('required') && !field.value.trim()) {
            isValid = false;
        }
        
        // Email validation
        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
            }
        }
        
        // Phone validation
        if (field.type === 'tel' && field.value) {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(field.value)) {
                isValid = false;
            }
        }
        
        // Transaction number validation (should be a phone number)
        if (field.name === 'transactionNumber' && field.value) {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(field.value)) {
                isValid = false;
            }
        }
        
        // Checkbox validation
        if (field.type === 'checkbox' && field.hasAttribute('required') && !field.checked) {
            isValid = false;
        }
        
        // File validation
        if (field.type === 'file' && field.hasAttribute('required')) {
            if (!field.files || field.files.length === 0) {
                isValid = false;
            }
        }
        
        // Apply validation classes
        if (isValid && field.value) {
            formGroup.classList.add('success');
        } else if (!isValid) {
            formGroup.classList.add('error');
        }
        
        return isValid;
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        if (this.isSubmitting) return;
        
        console.log('Handling form submission');
        
        // Final validation
        if (!this.validateCurrentStep()) {
            return;
        }
        
        this.isSubmitting = true;
        const submitBtn = this.form.querySelector('[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing Registration...';
        submitBtn.disabled = true;
        
        try {
            // Collect form data
            const formData = new FormData(this.form);
            
            // Handle file upload first if present
            let paymentScreenshotUrl = null;
            let paymentScreenshotName = null;
            
            const paymentFile = formData.get('paymentScreenshot');
            if (paymentFile && paymentFile.size > 0) {
                console.log('Uploading payment screenshot...');
                
                // Create unique filename
                const fileExt = paymentFile.name.split('.').pop();
                const fileName = `payment_${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
                
                // Upload to Supabase Storage
                const uploadFormData = new FormData();
                uploadFormData.append('file', paymentFile, fileName);
                
                const uploadResponse = await fetch('https://steddllazfsprnfsmjng.supabase.co/storage/v1/object/payment-screenshots/' + fileName, {
                    method: 'POST',
                    headers: {
                        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0ZWRkbGxhemZzcHJuZnNtam5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4MTYwMzQsImV4cCI6MjA3MTM5MjAzNH0.yf53IyNF3x0O90vPjmiDHOaSQyMlo8roIT3HpXWr_Zk',
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0ZWRkbGxhemZzcHJuZnNtam5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4MTYwMzQsImV4cCI6MjA3MTM5MjAzNH0.yf53IyNF3x0O90vPjmiDHOaSQyMlo8roIT3HpXWr_Zk'
                    },
                    body: uploadFormData
                });
                
                if (uploadResponse.ok) {
                    paymentScreenshotUrl = `https://steddllazfsprnfsmjng.supabase.co/storage/v1/object/public/payment-screenshots/${fileName}`;
                    paymentScreenshotName = paymentFile.name;
                    console.log('Payment screenshot uploaded successfully:', paymentScreenshotUrl);
                } else {
                    console.error('Failed to upload payment screenshot');
                    throw new Error('Failed to upload payment screenshot. Please try again.');
                }
            }
            
            // Convert FormData to object for Supabase
            const applicationData = {
                full_name: formData.get('fullName'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                faculty: formData.get('faculty'),
                grade: formData.get('grade'),
                transaction_number: formData.get('transactionNumber'),
                payment_screenshot_url: paymentScreenshotUrl,
                payment_screenshot_name: paymentScreenshotName,
                promo_code: formData.get('promoCode') || null,
                terms_accepted: formData.get('terms') === 'on',
                newsletter_subscribed: formData.get('newsletter') === 'on'
                // Note: status defaults to 'pending' and submitted_at defaults to NOW() in database
            };
            
            console.log('Application data to be submitted:', applicationData);
            
            // Submit to Supabase
            const response = await fetch('https://steddllazfsprnfsmjng.supabase.co/rest/v1/applications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0ZWRkbGxhemZzcHJuZnNtam5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4MTYwMzQsImV4cCI6MjA3MTM5MjAzNH0.yf53IyNF3x0O90vPjmiDHOaSQyMlo8roIT3HpXWr_Zk',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0ZWRkbGxhemZzcHJuZnNtam5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4MTYwMzQsImV4cCI6MjA3MTM5MjAzNH0.yf53IyNF3x0O90vPjmiDHOaSQyMlo8roIT3HpXWr_Zk',
                    'Prefer': 'return=minimal'
                },
                body: JSON.stringify(applicationData)
            });
            
            console.log('Response status:', response.status);
            console.log('Response status text:', response.statusText);
            
            if (!response.ok) {
                // Get detailed error information
                const errorText = await response.text();
                console.error('Supabase error response:', errorText);
                
                let errorMessage = 'Failed to submit application. ';
                try {
                    const errorData = JSON.parse(errorText);
                    if (errorData.message) {
                        errorMessage += errorData.message;
                    } else if (errorData.hint) {
                        errorMessage += errorData.hint;
                    } else if (errorData.details) {
                        errorMessage += errorData.details;
                    } else {
                        errorMessage += `Server error (${response.status})`;
                    }
                } catch (e) {
                    errorMessage += `Server error (${response.status}): ${errorText}`;
                }
                
                throw new Error(errorMessage);
            }
            
            if (response.ok) {
                // Show enhanced success modal instead of just notification
                if (typeof showSubmissionSuccess === 'function') {
                    showSubmissionSuccess();
                } else {
                    this.showNotification('Registration submitted successfully! Welcome to STEM MUN 2025. We will contact you within 24 hours with event details.', 'success');
                }
                
                // Show success state
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Registration Confirmed!';
                submitBtn.style.background = '#2ed573';
                
                setTimeout(() => {
                    this.closeModal();
                    this.resetForm();
                }, 4000); // Increased timeout to allow user to see the success modal
                
            } else {
                throw new Error('Server response was not ok');
            }
            
        } catch (error) {
            console.error('Error submitting form:', error);
            this.showNotification('There was an error processing your registration. Please try again or contact us directly.', 'error');
            
            // Reset button
            submitBtn.classList.remove('loading');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
        
        this.isSubmitting = false;
    }
    
    resetForm() {
        this.form.reset();
        this.currentStep = 1;
        
        // Hide all steps except first
        const steps = this.form.querySelectorAll('.form-step');
        steps.forEach((step, index) => {
            if (index === 0) {
                step.style.display = 'block';
                step.classList.add('active');
            } else {
                step.style.display = 'none';
                step.classList.remove('active');
            }
        });
        
        // Reset progress
        this.updateProgress();
        
        // Remove validation classes
        this.form.querySelectorAll('.form-group, .premium-checkbox').forEach(group => {
            group.classList.remove('error', 'success', 'has-value');
        });
    }
    
    showNotification(message, type = 'info') {
        // Remove existing notifications
        document.querySelectorAll('.premium-notification').forEach(n => n.remove());
        
        const colors = {
            success: { bg: '#2ed573', shadow: 'rgba(46, 213, 115, 0.3)' },
            error: { bg: '#ff4757', shadow: 'rgba(255, 71, 87, 0.3)' },
            info: { bg: '#3742fa', shadow: 'rgba(55, 66, 250, 0.3)' }
        };
        
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        
        const notification = document.createElement('div');
        notification.className = 'premium-notification';
        notification.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${colors[type].bg};
                color: white;
                padding: 20px 30px;
                border-radius: 15px;
                box-shadow: 0 10px 30px ${colors[type].shadow};
                z-index: 10001;
                font-weight: 600;
                max-width: 400px;
                word-wrap: break-word;
                animation: slideInRight 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                display: flex;
                align-items: center;
                gap: 10px;
            ">
                <i class="fa ${icons[type]}"></i>
                ${message}
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove
        setTimeout(() => {
            const content = notification.querySelector('div');
            content.style.animation = 'slideOutRight 0.5s ease-in forwards';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 500);
        }, type === 'success' ? 5000 : 4000);
    }
    
    showTerms() {
        // Create terms modal (simplified for this example)
        const termsModal = document.createElement('div');
        termsModal.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                z-index: 10002;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
            " onclick="this.remove()">
                <div style="
                    background: white;
                    padding: 40px;
                    border-radius: 20px;
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
                        color: var(--primary-color);
                    ">&times;</button>
                    
                    <h2 style="color: var(--primary-color); margin-bottom: 20px;">Terms & Conditions</h2>
                    
                    <div style="color: var(--text-dark); line-height: 1.6;">
                        <h3>Event Registration Terms</h3>
                        <ul style="margin: 15px 0;">
                            <li>Registration fee is non-refundable after confirmation</li>
                            <li>Participants must attend the full day event</li>
                            <li>Participation recognition will be provided upon completion</li>
                            <li>Event activities and workshops will be communicated before the event</li>
                            <li>Photography/videography consent is included in registration</li>
                        </ul>
                        
                        <h3>Participant Code of Conduct</h3>
                        <ul style="margin: 15px 0;">
                            <li>Maintain respectful behavior at all times</li>
                            <li>Professional or smart casual attire required</li>
                            <li>Respect event facilitators and fellow participants</li>
                            <li>No disruption during sessions or workshops</li>
                            <li>Follow all venue rules and STEM MUN guidelines</li>
                        </ul>
                        
                        <p style="margin-top: 20px; font-size: 14px; opacity: 0.8;">
                            By registering as a participant, you agree to these terms and commit to 
                            engaging actively in this educational experience at STEM MUN.
                        </p>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(termsModal);
    }
}

// Initialize the premium form when DOM is loaded with performance optimization
let premiumForm;

document.addEventListener('DOMContentLoaded', function() {
    // Use lazy initialization for better performance
    premiumForm = new PremiumBookingForm();
    
    // Add optimized animation styles
    const style = document.createElement('style');
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
        
        .form-step {
            display: none;
            opacity: 0;
            transform: translateX(20px);
            transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            will-change: transform, opacity; /* GPU acceleration */
        }
        
        .form-step.active {
            display: block;
            opacity: 1;
            transform: translateX(0);
        }
        
        .form-step:first-child {
            display: block;
        }
        
        .form-navigation {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 30px;
        }
        
        .prev-step {
            background: #6c757d;
            color: white;
            padding: 15px 25px;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 8px;
            will-change: transform; /* GPU acceleration */
        }
        
        .prev-step:hover {
            background: #5a6268;
            transform: translateY(-1px);
        }
        
        /* Optimize particle animations */
        .particle {
            will-change: transform;
            transform: translateZ(0); /* Force GPU acceleration */
        }
        
        /* Optimize modal animations */
        .booking-modal {
            will-change: opacity;
            transform: translateZ(0);
        }
        
        .booking-modal-content {
            will-change: transform;
            transform: translateZ(0);
        }
        
        /* Reduce motion for users who prefer it */
        @media (prefers-reduced-motion: reduce) {
            .form-step,
            .prev-step,
            .particle {
                transition: none !important;
                animation: none !important;
            }
        }
    `;
    document.head.appendChild(style);
});

// Global function to open modal (for button onclick) - now optimized
function openBookingModal() {
    console.log('openBookingModal called');
    console.log('premiumForm exists:', !!premiumForm);
    console.log('PremiumBookingForm class exists:', typeof PremiumBookingForm !== 'undefined');
    
    if (premiumForm) {
        console.log('Using existing premiumForm');
        premiumForm.openModal();
    } else {
        // Fallback initialization if not ready
        console.log('Form not ready, initializing...');
        if (typeof PremiumBookingForm !== 'undefined') {
            premiumForm = new PremiumBookingForm();
            setTimeout(() => {
                console.log('Opening modal after initialization');
                premiumForm.openModal();
            }, 100);
        } else {
            console.error('PremiumBookingForm class not available');
            alert('Form system not loaded. Please refresh the page and try again.');
        }
    }
}
