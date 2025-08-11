// mouse effect code 
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let particles = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Throttle mousemove for performance
let lastMove = 0;
document.addEventListener('mousemove', (e) => {
    const now = performance.now();
    if (now - lastMove < 12) return; // ~80 fps cap for spawns
    lastMove = now;
    for (let i = 0; i < 3; i++) {
        particles.push({
            x: e.clientX,
            y: e.clientY,
            size: Math.random() * 1 + 0.3, // → size between 0.3 and 1.3
            speedX: (Math.random() - 0.5) * 1,
            speedY: (Math.random() - 0.5) * 1,
            life: 1
        });
    }
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Limit number of particles for performance
    if (particles.length > 600) particles.splice(0, particles.length - 600);

    particles.forEach((p, i) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.life -= 0.015;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        ctx.fillStyle = `rgba(255,255,255,${p.life})`;

        // ✨ Add glow effect
        ctx.shadowColor = 'rgba(255,255,255,0.7)';
        ctx.shadowBlur = 10;

        ctx.fill();

        if (p.life <= 0) {
            particles.splice(i, 1);
        }
    });

    requestAnimationFrame(animate);
}

animate();

// --------------------
// Form enhancements
// --------------------

const scriptURL = 'https://script.google.com/macros/s/AKfycbyFSwEQtqOHlefXILOahe1YmNlkPVtOYBY2hGvspdjEOdlBCjHYLMByYGovbfM1Qd0jVA/exec';
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submit-btn');

// Create and append success message element
const messageDiv = document.createElement('div');
messageDiv.style.marginTop = '15px';
messageDiv.style.color = 'green';
messageDiv.style.fontWeight = '600';
form.appendChild(messageDiv);

// Sync step indicator with visibility
function syncStepIndicator() {
    const steps = document.querySelectorAll('.step-indicator .step');
    const sections = document.querySelectorAll('.form-step');
    // Determine visible section by scroll position (closest to top)
    let current = 1;
    let minDist = Infinity;
    sections.forEach(sec => {
        const rect = sec.getBoundingClientRect();
        const dist = Math.abs(rect.top - 120); // header offset
        if (dist < minDist) {
            minDist = dist;
            current = Number(sec.dataset.step || 1);
        }
    });
    steps.forEach(s => s.classList.toggle('active', Number(s.dataset.step) === current));
}

// Only enable scroll-based syncing and basic indicator clicks when not using multi-step controller (no .progressbar)
const __useScrollSync = !document.querySelector('.progressbar');
if (__useScrollSync) {
    document.addEventListener('scroll', () => {
        // Throttle with rAF
        if (syncStepIndicator._ticking) return;
        syncStepIndicator._ticking = true;
        requestAnimationFrame(() => {
            syncStepIndicator();
            syncStepIndicator._ticking = false;
        });
    }, { passive: true });

    // Click on step to scroll to that section
    const stepButtons = document.querySelectorAll('.step-indicator .step');
    stepButtons.forEach(btn => btn.addEventListener('click', () => {
        const target = document.querySelector(`#step-${btn.dataset.step}`);
        if (target) {
            window.scrollTo({ top: window.scrollY + target.getBoundingClientRect().top - 90, behavior: 'smooth' });
        }
    }));
}

// Word counters for essay fields (150 words ~ ~825 chars earlier)
function attachWordCounter(textarea) {
    const counter = document.createElement('div');
    counter.style.color = 'rgba(255,255,255,.8)';
    counter.style.fontSize = '12px';
    counter.style.margin = '-6px 0 10px';
    textarea.insertAdjacentElement('afterend', counter);

    const update = () => {
        const words = (textarea.value.trim().match(/\S+/g) || []).length;
        counter.textContent = `${words}/150 words`;
        if (words > 150) {
            counter.style.color = '#ffb3b3';
        } else {
            counter.style.color = 'rgba(255,255,255,.8)';
        }
    };
    textarea.addEventListener('input', update);
    update();
}

document.querySelectorAll('textarea[name="Essay1"], textarea[name="Essay2"]').forEach(attachWordCounter);

form.addEventListener('submit', e => {
    e.preventDefault();

    // Check if deadline has passed
    if (window.CountdownTimer && window.CountdownTimer.isDeadlinePassed()) {
        showErrorMessage('⚠️ Registration deadline has passed. The form is now closed.');
        return;
    }

    // Enhanced validation for essays (<= 150 words)
    const essays = [
        document.querySelector('textarea[name="Essay1"]'),
        document.querySelector('textarea[name="Essay2"]')
    ];
    
    for (const essay of essays) {
        const words = (essay.value.trim().match(/\S+/g) || []).length;
        if (words > 150) {
            essay.scrollIntoView({ behavior: 'smooth', block: 'center' });
            essay.classList.add('invalid');
            setTimeout(() => essay.classList.remove('invalid'), 3000);
            
            showErrorMessage('Please keep essay responses within 150 words.');
            return;
        }
        if (words < 50) {
            essay.scrollIntoView({ behavior: 'smooth', block: 'center' });
            essay.classList.add('invalid');
            setTimeout(() => essay.classList.remove('invalid'), 3000);
            
            showErrorMessage('Essay responses should be at least 50 words.');
            return;
        }
    }

    // Enhanced loading state
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    submitBtn.textContent = 'Submitting...';

    fetch(scriptURL, {
        method: 'POST',
        body: new FormData(form),
    })
        .then(response => {
            // Success state with enhanced feedback
            submitBtn.classList.remove('loading');
            submitBtn.classList.add('success');
            submitBtn.textContent = 'Submitted Successfully!';
            
            // Mark form as submitted for this session
            sessionStorage.setItem('form_submitted', 'true');
            sessionStorage.setItem('submission_time', new Date().toISOString());
            
            // Show success message and close form
            showSuccessMessage();
            closeFormAfterSubmission();

            // Clear all form data including localStorage
            form.querySelectorAll('input, textarea, select').forEach(field => {
                if (field.tagName === 'SELECT') {
                    field.selectedIndex = 0;
                    field.classList.remove('has-value');
                    field.style.color = 'rgba(255,255,255,0.6)';
                } else {
                    field.value = '';
                }
                field.classList.remove('valid', 'invalid');
            });

            // Clear comprehensive localStorage
            clearSavedData();
            
            // Clear individual textarea localStorage (legacy support)
            form.querySelectorAll('textarea').forEach(textarea => {
                localStorage.removeItem(textarea.name);
            });

            // Reset to first step
            if (typeof currentIndex !== 'undefined') {
                currentIndex = 0;
                if (typeof updateUI === 'function') {
                    updateUI();
                }
            }

            // Clear all step completion indicators
            document.querySelectorAll('.step').forEach(step => {
                step.classList.remove('done', 'active');
            });
            
            // Activate first step
            const firstStep = document.querySelector('.step[data-step="1"]');
            if (firstStep) {
                firstStep.classList.add('active');
            }

            // Auto-reset button after delay
            setTimeout(() => {
                submitBtn.classList.remove('success');
                submitBtn.textContent = 'Submit Application';
                submitBtn.disabled = false;
            }, 3000);
        })
        .catch(error => {
            console.error('Submission error:', error);
            
            // Enhanced error state
            submitBtn.classList.remove('loading');
            submitBtn.style.background = 'linear-gradient(135deg, #ff6b6b, #ff8e53)';
            submitBtn.textContent = 'Submission Failed';
            
            showErrorMessage('There was an error submitting your application. Please try again.');

            setTimeout(() => {
                submitBtn.style.background = '';
                submitBtn.textContent = 'Submit Application';
                submitBtn.disabled = false;
            }, 3000);
        });
    
    // Helper functions for enhanced user feedback
    function showSuccessMessage() {
        createNotification('success', 'Application submitted successfully! Stay tuned for results.', 'fa-check-circle');
    }

    function closeFormAfterSubmission() {
        // Create success overlay
        const overlay = document.createElement('div');
        overlay.className = 'form-submitted-overlay';
        overlay.innerHTML = `
            <div class="submission-success-message">
                <div class="success-icon">✓</div>
                <h2>Application Submitted Successfully!</h2>
                <p>Thank you for applying to STEM Model United Nations.</p>
                <div class="stay-tuned-message">
                    <h3>🎉 Stay Tuned for Results!</h3>
                    <p>We will review your application and get back to you soon.</p>
                    <p>Check your email regularly for updates.</p>
                </div>
                <div class="refresh-note">
                    <small>💡 Want to submit another application? Simply refresh the page!</small>
                </div>
                <div class="contact-info">
                    <p>Questions? Contact us at <a href="mailto:info@stemmun.org">info@stemmun.org</a></p>
                </div>
            </div>
        `;

        // Add overlay to form
        const form = document.querySelector('.contactForm');
        form.style.position = 'relative';
        form.appendChild(overlay);

        // Also hide step indicator and countdown
        const stepIndicator = document.querySelector('.step-indicator');
        const countdownContainer = document.querySelector('.countdown-container');
        
        if (stepIndicator) {
            stepIndicator.style.opacity = '0.3';
            stepIndicator.style.pointerEvents = 'none';
        }
        
        if (countdownContainer) {
            countdownContainer.style.opacity = '0.3';
            countdownContainer.style.pointerEvents = 'none';
        }

        // Add celebration animation
        setTimeout(() => {
            createCelebrationEffect();
        }, 500);
    }

    function createCelebrationEffect() {
        // Create confetti effect
        const colors = ['#cdb06f', '#e2c280', '#7bbf7b', '#9be39b', '#fff'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.cssText = `
                    position: fixed;
                    width: 10px;
                    height: 10px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    top: -10px;
                    left: ${Math.random() * 100}%;
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 10001;
                    animation: confettiFall 3s linear forwards;
                `;
                
                document.body.appendChild(confetti);
                
                setTimeout(() => {
                    if (confetti.parentNode) {
                        confetti.remove();
                    }
                }, 3000);
            }, i * 50);
        }
    }

    function showErrorMessage(text) {
        createNotification('error', text, 'fa-exclamation-triangle');
    }

    function createNotification(type, text, icon) {
        const colors = {
            success: { bg: 'linear-gradient(135deg, #7bbf7b, #9be39b)', shadow: 'rgba(123,191,123,.3)' },
            error: { bg: 'linear-gradient(135deg, #ff6b6b, #ff8e53)', shadow: 'rgba(255,107,107,.3)' }
        };
        
        const notification = document.createElement('div');
        notification.innerHTML = `
            <div class="notification-${type}" style="
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
                backdrop-filter: blur(10px);
                animation: slideInRight 0.5s ease-out;
                max-width: 300px;
                word-wrap: break-word;
            ">
                <i class="fa ${icon}" style="margin-right: 8px;"></i>
                ${text}
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.firstElementChild.style.animation = 'slideOutRight 0.5s ease-in forwards';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 500);
        }, type === 'success' ? 3000 : 4000);
    }
});

// Enhanced localStorage management with comprehensive data persistence
function saveAllFormData() {
    const formData = {
        timestamp: Date.now(),
        currentStep: currentIndex || 0,
        completedSteps: []
    };
    
    // Save all input fields
    document.querySelectorAll('.inputs').forEach(input => {
        if (input.type === 'checkbox') {
            formData[input.name] = input.checked;
        } else if (input.type === 'radio') {
            if (input.checked) {
                formData[input.name] = input.value;
            }
        } else {
            formData[input.name] = input.value;
        }
    });
    
    // Save all textareas
    document.querySelectorAll('textarea').forEach(textarea => {
        formData[textarea.name] = textarea.value;
    });
    
    // Save select dropdowns
    document.querySelectorAll('select').forEach(select => {
        formData[select.name] = select.value;
    });
    
    // Save completed steps
    document.querySelectorAll('.step.done').forEach(step => {
        const stepNum = parseInt(step.getAttribute('data-step'));
        if (!isNaN(stepNum)) {
            formData.completedSteps.push(stepNum);
        }
    });
    
    localStorage.setItem('stemMunDelegationForm', JSON.stringify(formData));
    
    // Also use the comprehensive storage system
    if (window.saveComprehensiveFormData) {
        window.saveComprehensiveFormData();
    }
    
    console.log('Form data saved:', formData);
}

function loadAllFormData() {
    const savedData = localStorage.getItem('stemMunDelegationForm');
    if (!savedData) {
        // Try loading from comprehensive storage
        if (window.loadComprehensiveFormData) {
            return window.loadComprehensiveFormData();
        }
        return false;
    }
    
    try {
        const formData = JSON.parse(savedData);
        console.log('Loading form data:', formData);
        
        // Restore all form fields
        Object.keys(formData).forEach(key => {
            if (key === 'timestamp' || key === 'currentStep' || key === 'completedSteps') return;
            
            const element = document.querySelector(`[name="${key}"]`);
            if (element) {
                if (element.type === 'checkbox') {
                    element.checked = formData[key] || false;
                } else if (element.type === 'radio') {
                    if (element.value === formData[key]) {
                        element.checked = true;
                    }
                } else {
                    element.value = formData[key] || '';
                    
                    // Special handling for select elements
                    if (element.tagName === 'SELECT' && formData[key]) {
                        element.style.color = '#fff';
                        element.classList.add('has-value');
                        
                        // Trigger change event to ensure proper styling
                        element.dispatchEvent(new Event('change', { bubbles: true }));
                    }
                    
                    // Trigger floating label animation for inputs
                    if (element.classList.contains('inputs') && formData[key]) {
                        const inputGroup = element.closest('.input-group');
                        if (inputGroup) {
                            inputGroup.classList.add('focused');
                        }
                        
                        // Update floating label if exists
                        const floatingLabel = element.parentElement.querySelector('.floating-label');
                        if (floatingLabel) {
                            floatingLabel.style.top = '-8px';
                            floatingLabel.style.fontSize = '12px';
                            floatingLabel.style.color = '#cdb06f';
                        }
                    }
                }
                
                // Trigger change event to update any dependent functionality
                element.dispatchEvent(new Event('change', { bubbles: true }));
            }
        });
        
        // Restore completed steps
        if (formData.completedSteps && Array.isArray(formData.completedSteps)) {
            formData.completedSteps.forEach(stepNum => {
                const stepElement = document.querySelector(`[data-step="${stepNum}"]`);
                if (stepElement) {
                    stepElement.classList.add('done');
                }
            });
        }
        
        // Update word counters for textareas
        document.querySelectorAll('textarea').forEach(textarea => {
            updateWordCount(textarea);
        });
        
        // Restore current step
        if (formData.currentStep && formData.currentStep !== currentIndex) {
            currentIndex = formData.currentStep;
            updateUI();
        }
        
        return true;
        
    } catch (error) {
        console.error('Error loading saved form data:', error);
        localStorage.removeItem('stemMunDelegationForm'); // Remove corrupted data
        return false;
    }
}

// Clear saved form data
function clearSavedData() {
    localStorage.removeItem('stemMunDelegationForm');
    
    // Clear comprehensive storage too
    if (window.clearComprehensiveFormData) {
        window.clearComprehensiveFormData();
    }
    
    console.log('Saved form data cleared');
}

// Auto-save setup with debouncing
let autoSaveTimeout;
function setupAutoSave() {
    const autoSave = () => {
        clearTimeout(autoSaveTimeout);
        autoSaveTimeout = setTimeout(saveAllFormData, 1000); // Save after 1 second of inactivity
    };
    
    // Save on input changes
    document.addEventListener('input', autoSave);
    document.addEventListener('change', autoSave);
    
    // Save on step navigation
    document.querySelectorAll('.next-btn, .back-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            setTimeout(saveAllFormData, 100); // Small delay to ensure step change is complete
        });
    });
    
    // Save on page unload
    window.addEventListener('beforeunload', saveAllFormData);
}

// Restore textarea values (legacy support)
const textareas = form.querySelectorAll('textarea');
window.addEventListener('load', () => {
    // Check if form was submitted in this session
    checkSubmissionStatus();
    
    // Load comprehensive form data
    const dataLoaded = loadAllFormData();
    
    // Fallback to individual textarea loading if comprehensive loading failed
    if (!dataLoaded) {
        textareas.forEach(textarea => {
            const saved = localStorage.getItem(textarea.name);
            if (saved) {
                textarea.value = saved;
                updateWordCount(textarea);
            }
        });
    }

    // Initial sync of step indicator
    syncStepIndicator();
    
    // Setup auto-save functionality
    setupAutoSave();
});

// Check if form was submitted and handle accordingly
function checkSubmissionStatus() {
    // Check sessionStorage (clears on refresh) - this allows new applications after refresh
    const wasSubmitted = sessionStorage.getItem('form_submitted');
    
    if (wasSubmitted === 'true') {
        // Form was submitted in this session, show success overlay
        setTimeout(() => {
            closeFormAfterSubmission();
        }, 1000); // Small delay to let page load
    }
    
    // Note: We don't prevent new applications on refresh since sessionStorage clears
    // This allows users to submit multiple applications after refreshing
}

// Individual textarea saving (legacy support)
textareas.forEach(textarea => {
    textarea.addEventListener('input', () => {
        localStorage.setItem(textarea.name, textarea.value);
        updateWordCount(textarea);
    });
});

// --------------------
// Multi-step form logic + improved UX
// --------------------
(function(){
  const form = document.getElementById('contactForm');
  if(!form) return;

  // Flag to track user interaction to prevent auto-scroll on page load
  let hasUserInteracted = false;

  const steps = Array.from(document.querySelectorAll('.form-step'));
  const stepIndicatorEls = Array.from(document.querySelectorAll('.step-indicator .step'));
  const progressFill = document.querySelector('.progressbar-fill');
  const nextBtns = Array.from(document.querySelectorAll('.next-btn'));
  const backBtns = Array.from(document.querySelectorAll('.back-btn'));

  let currentIndex = 0; // 0-based index for steps

  function updateUI(){
    // Hide all steps and show only current
    steps.forEach((el, i) => {
      el.classList.toggle('active', i === currentIndex);
      el.setAttribute('aria-hidden', i === currentIndex ? 'false' : 'true');
    });
    
    // Update step indicators
    stepIndicatorEls.forEach((el, i) => {
      el.classList.toggle('active', i === currentIndex);
      el.classList.toggle('done', i < currentIndex);
    });
    
    // Update progress bar
    const pct = ((currentIndex) / Math.max(steps.length - 1, 1)) * 100;
    if(progressFill) progressFill.style.width = `${pct}%`;
    
    // Only scroll to form after user interaction, not on initial page load
    if (hasUserInteracted) {
        setTimeout(() => {
          const activeStep = steps[currentIndex];
          if(activeStep){
            const rect = activeStep.getBoundingClientRect();
            const top = window.pageYOffset + rect.top - 120;
            window.scrollTo({ top, behavior: 'smooth' });
          }
        }, 100);
    }
  }

  function validateStep(index){
    const container = steps[index];
    if(!container) return true;
    const required = Array.from(container.querySelectorAll('[required]'));
    let valid = true;
    
    required.forEach(field => {
      let ok = true;
      
      if(field.type === 'email'){
        ok = /.+@.+\..+/.test(field.value.trim());
      } else if(field.tagName === 'SELECT'){
        ok = field.value && field.value.trim() !== '';
      } else if(['number', 'date', 'text', 'tel'].includes(field.type) || field.tagName === 'TEXTAREA'){
        ok = field.value && field.value.trim() !== '';
      }
      
      toggleFieldValidity(field, ok);
      if(!ok) valid = false;
    });

    // Additional validation for essays
    if(container.id === 'step-2'){
      const essays = [
        container.querySelector('textarea[name="Essay1"]'),
        container.querySelector('textarea[name="Essay2"]')
      ].filter(Boolean);
      
      for(const textarea of essays){
        const words = (textarea.value.trim().match(/\S+/g) || []).length;
        const ok = words <= 150 && words >= 1;
        toggleFieldValidity(textarea, ok);
        if(!ok) valid = false;
      }
    }

    return valid;
  }

  function toggleFieldValidity(field, ok){
    field.classList.toggle('invalid', !ok);
    field.style.borderColor = ok ? '' : '#ff6b6b';
    field.style.boxShadow = ok ? '' : '0 0 0 2px rgba(255,107,107,.35)';
  }

  function goTo(index){
    if(index < 0 || index >= steps.length) return;
    currentIndex = index;
    updateUI();
  }

  // Hook navigation buttons
  nextBtns.forEach(btn => btn.addEventListener('click', () => {
    hasUserInteracted = true; // Enable auto-scroll for user-initiated navigation
    const target = Number(btn.dataset.next) - 1;
    const ok = validateStep(currentIndex);
    if(!ok){
      const firstInvalid = steps[currentIndex].querySelector('.invalid');
      if(firstInvalid){ 
        firstInvalid.focus();
        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' }); 
      }
      return;
    }
    goTo(target);
  }));

  backBtns.forEach(btn => btn.addEventListener('click', () => {
    hasUserInteracted = true; // Enable auto-scroll for user-initiated navigation
    const target = Number(btn.dataset.back) - 1;
    goTo(target);
  }));

  // Clicking indicator steps
  stepIndicatorEls.forEach((el, i) => el.addEventListener('click', () => {
    hasUserInteracted = true; // Enable auto-scroll for user-initiated navigation
    if(i <= currentIndex || validateStep(currentIndex)){
      goTo(i);
    }
  }));

  // Initialize - show only first step
  updateUI();

  // Add event listeners for form field interactions
  document.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('focus', () => {
      hasUserInteracted = true; // Enable auto-scroll for form field interactions
    });
  });
})();