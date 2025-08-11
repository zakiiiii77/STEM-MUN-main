// Enhanced dropdown functionality to fix visibility issues
document.addEventListener('DOMContentLoaded', function() {
    // Force select dropdown visibility fix
    fixSelectDropdowns();
    
    // Enhanced localStorage management
    setupComprehensiveLocalStorage();
    
    // Load saved data after a short delay to ensure DOM is ready
    setTimeout(loadComprehensiveFormData, 100);
});

function fixSelectDropdowns() {
    const selectElements = document.querySelectorAll('select.inputs');
    
    selectElements.forEach(select => {
        // Force immediate styling to fix visibility
        forceSelectStyling(select);
        
        // Create wrapper for enhanced functionality
        enhanceSelectDropdown(select);
        
        // Add event listeners for better interaction
        addSelectEventListeners(select);
    });
}

function forceSelectStyling(selectElement) {
    // Apply comprehensive inline styles to override any conflicting CSS
    const selectStyles = {
        'appearance': 'none',
        '-webkit-appearance': 'none',
        '-moz-appearance': 'none',
        'background-color': 'rgba(255, 255, 255, 0.1) !important',
        'background-image': 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23cdb06f\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6,9 12,15 18,9\'%3e%3c/polyline%3e%3c/svg%3e")',
        'background-repeat': 'no-repeat',
        'background-position': 'right 16px center',
        'background-size': '16px',
        'border': '2px solid rgba(255, 255, 255, 0.2)',
        'border-radius': '12px',
        'padding': '16px 45px 16px 16px',
        'font-size': '16px',
        'font-weight': '600',
        'color': '#fff',
        'cursor': 'pointer',
        'transition': 'all 0.3s ease',
        'backdrop-filter': 'blur(10px)',
        'width': '100%',
        'position': 'relative',
        'z-index': '1',
        'min-height': '50px',
        'line-height': '1.4',
        'box-sizing': 'border-box'
    };
    
    // Apply styles
    Object.assign(selectElement.style, selectStyles);
    
    // Force option styling with enhanced text display
    const options = selectElement.querySelectorAll('option');
    options.forEach((option, index) => {
        const optionStyles = {
            'background-color': '#2d0f0a',
            'background': '#2d0f0a',
            'color': '#ffffff',
            'padding': '12px 16px',
            'font-weight': '600',
            'border': 'none',
            'font-size': '16px',
            'line-height': '1.5',
            'min-height': '40px',
            'white-space': 'nowrap',
            'overflow': 'visible',
            'text-overflow': 'clip',
            'box-sizing': 'border-box',
            'display': 'block',
            'opacity': '1',
            'visibility': 'visible'
        };
        Object.assign(option.style, optionStyles);
        
        // Special styling for placeholder option
        if (index === 0 && (option.value === '' || option.value === null)) {
            option.style.color = 'rgba(255, 255, 255, 0.6)';
            option.style.fontStyle = 'italic';
            option.style.backgroundColor = '#2d0f0a';
        }
        
        // Ensure text is fully visible
        option.style.whiteSpace = 'normal';
        option.style.wordWrap = 'break-word';
        option.style.textOverflow = 'clip';
        option.style.overflow = 'visible';
    });
    
    // Force re-render to ensure styles take effect
    selectElement.style.display = 'none';
    selectElement.offsetHeight; // Trigger reflow
    selectElement.style.display = 'block';
}

function addSelectEventListeners(selectElement) {
    // Enhanced focus handling
    selectElement.addEventListener('focus', function() {
        this.style.borderColor = '#cdb06f';
        this.style.boxShadow = '0 6px 20px rgba(205,176,111,.25), 0 0 0 3px rgba(205,176,111,.1)';
        this.style.backgroundColor = 'rgba(255,255,255,.12)';
        this.style.transform = 'translateY(-2px)';
    });
    
    selectElement.addEventListener('blur', function() {
        this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        this.style.boxShadow = 'none';
        this.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        this.style.transform = 'translateY(0)';
    });
    
    // Handle selection changes
    selectElement.addEventListener('change', function() {
        if (this.value) {
            this.style.color = '#fff';
            this.classList.add('has-value');
            
            // Trigger floating label animation if exists
            const floatingLabel = this.parentElement.querySelector('.floating-label');
            if (floatingLabel) {
                floatingLabel.style.top = '-8px';
                floatingLabel.style.fontSize = '12px';
                floatingLabel.style.color = '#cdb06f';
            }
        } else {
            this.classList.remove('has-value');
        }
        
        // Save to localStorage when changed
        saveComprehensiveFormData();
    });
    
    // Hover effects
    selectElement.addEventListener('mouseenter', function() {
        if (!this.matches(':focus')) {
            this.style.borderColor = 'rgba(205,176,111,.6)';
            this.style.transform = 'translateY(-1px)';
        }
    });
    
    selectElement.addEventListener('mouseleave', function() {
        if (!this.matches(':focus')) {
            this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            this.style.transform = 'translateY(0)';
        }
    });
}

function enhanceSelectDropdown(selectElement) {
    // Skip if already enhanced
    if (selectElement.parentElement.classList.contains('custom-select-wrapper')) {
        return;
    }
    
    // Create wrapper for additional enhancements
    const wrapper = document.createElement('div');
    wrapper.className = 'custom-select-wrapper';
    wrapper.style.cssText = 'position: relative; display: block; width: 100%;';
    
    // Insert wrapper
    selectElement.parentNode.insertBefore(wrapper, selectElement);
    wrapper.appendChild(selectElement);
}

// Comprehensive localStorage management
function setupComprehensiveLocalStorage() {
    // Auto-save on any form input change
    const formElements = document.querySelectorAll('.inputs, textarea, input[type="checkbox"], input[type="radio"]');
    
    formElements.forEach(element => {
        element.addEventListener('input', debounce(saveComprehensiveFormData, 500));
        element.addEventListener('change', saveComprehensiveFormData);
    });
    
    // Save on step navigation
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('next-btn') || e.target.classList.contains('back-btn') || e.target.classList.contains('step')) {
            setTimeout(saveComprehensiveFormData, 100);
        }
    });
    
    // Save before page unload
    window.addEventListener('beforeunload', saveComprehensiveFormData);
}

function saveComprehensiveFormData() {
    const formData = {
        timestamp: Date.now(),
        currentStep: getCurrentStep(),
        completedSteps: getCompletedSteps(),
        formFields: {}
    };
    
    // Save all form inputs
    const allInputs = document.querySelectorAll('.inputs, textarea, input[type="checkbox"], input[type="radio"]');
    allInputs.forEach(input => {
        const name = input.name || input.id;
        if (name) {
            if (input.type === 'checkbox') {
                formData.formFields[name] = input.checked;
            } else if (input.type === 'radio') {
                if (input.checked) {
                    formData.formFields[name] = input.value;
                }
            } else {
                formData.formFields[name] = input.value;
            }
        }
    });
    
    // Save to localStorage
    localStorage.setItem('stemMunDelegationFormComplete', JSON.stringify(formData));
    console.log('Complete form data saved:', formData);
}

function loadComprehensiveFormData() {
    const savedData = localStorage.getItem('stemMunDelegationFormComplete');
    if (!savedData) return false;
    
    try {
        const formData = JSON.parse(savedData);
        console.log('Loading complete form data:', formData);
        
        // Restore all form fields
        Object.entries(formData.formFields || {}).forEach(([name, value]) => {
            const elements = document.querySelectorAll(`[name="${name}"], #${name}`);
            
            elements.forEach(element => {
                if (element.type === 'checkbox') {
                    element.checked = value || false;
                } else if (element.type === 'radio') {
                    if (element.value === value) {
                        element.checked = true;
                    }
                } else {
                    element.value = value || '';
                    
                    // Trigger change event to update styling
                    element.dispatchEvent(new Event('change', { bubbles: true }));
                    
                    // Update select appearance
                    if (element.tagName === 'SELECT' && value) {
                        element.style.color = '#fff';
                        element.classList.add('has-value');
                    }
                    
                    // Update floating labels
                    if (value && element.classList.contains('inputs')) {
                        const floatingLabel = element.parentElement.querySelector('.floating-label');
                        if (floatingLabel) {
                            floatingLabel.style.top = '-8px';
                            floatingLabel.style.fontSize = '12px';
                            floatingLabel.style.color = '#cdb06f';
                        }
                    }
                }
            });
        });
        
        // Restore step progress
        if (formData.completedSteps && Array.isArray(formData.completedSteps)) {
            formData.completedSteps.forEach(stepNum => {
                const stepElement = document.querySelector(`[data-step="${stepNum}"]`);
                if (stepElement) {
                    stepElement.classList.add('done');
                }
            });
        }
        
        // Restore current step
        if (formData.currentStep && typeof window.showStep === 'function') {
            setTimeout(() => {
                window.showStep(formData.currentStep);
            }, 200);
        }
        
        // Update word counters for textareas
        document.querySelectorAll('textarea').forEach(textarea => {
            if (window.updateWordCount && typeof window.updateWordCount === 'function') {
                window.updateWordCount(textarea);
            }
        });
        
        return true;
        
    } catch (error) {
        console.error('Error loading saved form data:', error);
        localStorage.removeItem('stemMunDelegationFormComplete');
        return false;
    }
}

function getCurrentStep() {
    const activeStep = document.querySelector('.form-step.active');
    if (activeStep) {
        return parseInt(activeStep.getAttribute('data-step')) || 0;
    }
    return 0;
}

function getCompletedSteps() {
    const completedSteps = [];
    document.querySelectorAll('.step.done').forEach(step => {
        const stepNum = parseInt(step.getAttribute('data-step'));
        if (!isNaN(stepNum)) {
            completedSteps.push(stepNum);
        }
    });
    return completedSteps;
}

function clearComprehensiveFormData() {
    localStorage.removeItem('stemMunDelegationFormComplete');
    localStorage.removeItem('stemMunDelegationForm'); // Clear legacy data too
    console.log('All form data cleared');
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions for global access
window.saveComprehensiveFormData = saveComprehensiveFormData;
window.loadComprehensiveFormData = loadComprehensiveFormData;
window.clearComprehensiveFormData = clearComprehensiveFormData;

// CSS injection for maximum dropdown option visibility
const criticalSelectCSS = `
/* Critical dropdown fixes - Maximum priority */
select.inputs {
    background-color: rgba(255, 255, 255, 0.1) !important;
    color: #fff !important;
    border: 2px solid rgba(255, 255, 255, 0.2) !important;
    min-height: 60px !important;
    line-height: 1.6 !important;
    box-sizing: border-box !important;
    appearance: none !important;
    -webkit-appearance: none !important;
    -moz-appearance: none !important;
    font-size: 17px !important;
}

select.inputs option {
    background-color: #2d0f0a !important;
    background: #2d0f0a !important;
    color: #ffffff !important;
    padding: 16px 20px !important;
    font-weight: 600 !important;
    border: none !important;
    opacity: 1 !important;
    visibility: visible !important;
    display: block !important;
    font-size: 17px !important;
    line-height: 1.8 !important;
    min-height: 50px !important;
    white-space: normal !important;
    word-wrap: break-word !important;
    text-overflow: clip !important;
    overflow: visible !important;
    box-sizing: border-box !important;
    height: auto !important;
}

select.inputs option[value=""] {
    color: rgba(255,255,255,0.6) !important;
    font-style: italic !important;
    background-color: #2d0f0a !important;
    min-height: 50px !important;
}

select.inputs option:hover,
select.inputs option:checked,
select.inputs option:focus,
select.inputs option:active {
    background-color: #cdb06f !important;
    background: #cdb06f !important;
    color: #2d0f0a !important;
    font-weight: 700 !important;
    min-height: 50px !important;
}

/* Specific fixes for committee and country dropdowns */
select[name="Committee"] option,
select[name="Delegation-country"] option {
    background-color: #2d0f0a !important;
    color: #ffffff !important;
    padding: 16px 20px !important;
    font-weight: 600 !important;
    min-height: 50px !important;
    line-height: 1.8 !important;
    white-space: normal !important;
    overflow: visible !important;
    font-size: 17px !important;
    height: auto !important;
}

/* Force dropdown list appearance */
select.inputs:focus {
    outline: none !important;
    border-color: #cdb06f !important;
    box-shadow: 0 0 0 3px rgba(205,176,111,.15) !important;
}

/* Browser-specific override */
@supports (-webkit-appearance: none) {
    select.inputs option {
        background-color: #2d0f0a !important;
        color: #ffffff !important;
        min-height: 50px !important;
    }
}

@-moz-document url-prefix() {
    select.inputs option {
        background-color: #2d0f0a !important;
        color: #ffffff !important;
        padding: 16px 20px !important;
        min-height: 50px !important;
        font-size: 17px !important;
    }
}
`;

// Inject critical CSS immediately
const criticalStyleSheet = document.createElement('style');
criticalStyleSheet.textContent = criticalSelectCSS;
criticalStyleSheet.id = 'critical-dropdown-styles';
document.head.appendChild(criticalStyleSheet);

// Force re-render of all select elements with enhanced visibility
setTimeout(() => {
    document.querySelectorAll('select.inputs').forEach(select => {
        // Force reflow and re-render
        select.style.display = 'none';
        select.offsetHeight; // Trigger reflow
        select.style.display = 'block';
        
        // Ensure all options are properly styled with increased dimensions
        const options = select.querySelectorAll('option');
        options.forEach(option => {
            option.style.backgroundColor = '#2d0f0a';
            option.style.color = '#ffffff';
            option.style.padding = '16px 20px';
            option.style.minHeight = '50px';
            option.style.lineHeight = '1.8';
            option.style.whiteSpace = 'normal';
            option.style.overflow = 'visible';
            option.style.textOverflow = 'clip';
            option.style.fontSize = '17px';
            option.style.height = 'auto';
        });
    });
}, 100);

// CSS injection for better cross-browser compatibility
const enhancedSelectCSS = `
.custom-select-wrapper {
    position: relative !important;
    display: block !important;
    width: 100% !important;
}

.custom-select-wrapper select {
    appearance: none !important;
    -webkit-appearance: none !important;
    -moz-appearance: none !important;
    background-image: none !important;
    background-color: rgba(255, 255, 255, 0.05) !important;
    border: 2px solid rgba(255, 255, 255, 0.2) !important;
    border-radius: 12px !important;
    padding: 16px 45px 16px 16px !important;
    font-size: 16px !important;
    font-weight: 600 !important;
    color: #fff !important;
    cursor: pointer !important;
    transition: all 0.3s ease !important;
    backdrop-filter: blur(10px) !important;
    width: 100% !important;
}

.custom-select-wrapper select:focus {
    border-color: #cdb06f !important;
    box-shadow: 0 6px 20px rgba(205,176,111,.25), 0 0 0 3px rgba(205,176,111,.1) !important;
    background-color: rgba(255,255,255,.08) !important;
    outline: none !important;
}

.custom-select-wrapper select option {
    background-color: #2d0f0a !important;
    color: #fff !important;
    padding: 12px 16px !important;
    font-weight: 600 !important;
    border: none !important;
}

.custom-select-wrapper select option:hover,
.custom-select-wrapper select option:checked {
    background-color: #cdb06f !important;
    color: #2d0f0a !important;
}

/* Firefox specific fixes */
@-moz-document url-prefix() {
    .custom-select-wrapper select option {
        background-color: #2d0f0a !important;
        color: #fff !important;
    }
}

/* Mobile responsiveness */
@media (max-width: 768px) {
    .custom-select-wrapper select {
        font-size: 16px !important;
        padding: 14px 40px 14px 14px !important;
    }
    
    .custom-dropdown-arrow {
        right: 14px !important;
    }
}
`;

// Inject CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = enhancedSelectCSS;
document.head.appendChild(styleSheet);

// Additional utility functions for form enhancement
function addSelectPlaceholder(selectElement, placeholderText) {
    if (selectElement.querySelector('option[value=""]')) return;
    
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = placeholderText;
    placeholder.disabled = true;
    placeholder.selected = true;
    placeholder.hidden = true;
    selectElement.insertBefore(placeholder, selectElement.firstChild);
}

// Auto-enhance all selects with placeholders
document.addEventListener('DOMContentLoaded', function() {
    const selects = document.querySelectorAll('select.inputs');
    selects.forEach(select => {
        if (!select.querySelector('option[value=""]') && select.name) {
            const placeholderText = select.getAttribute('data-placeholder') || 
                                  `Select ${select.name.replace(/([A-Z])/g, ' $1').toLowerCase()}`;
            addSelectPlaceholder(select, placeholderText);
        }
    });
});
