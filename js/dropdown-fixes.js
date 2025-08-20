// Additional dropdown fixes for complete text visibility
document.addEventListener('DOMContentLoaded', function() {
    // Wait for all other scripts to load
    setTimeout(fixDropdownTextVisibility, 200);
});

function fixDropdownTextVisibility() {
    const selectElements = document.querySelectorAll('select.inputs');
    
    selectElements.forEach(select => {
        // Apply direct style fixes with increased dimensions
        select.style.cssText = `
            appearance: none !important;
            -webkit-appearance: none !important;
            -moz-appearance: none !important;
            background-color: rgba(255, 255, 255, 0.1) !important;
            border: 2px solid rgba(255, 255, 255, 0.2) !important;
            border-radius: 12px !important;
            padding: 18px 50px 18px 20px !important;
            font-size: 17px !important;
            font-weight: 600 !important;
            color: #fff !important;
            cursor: pointer !important;
            transition: all 0.3s ease !important;
            backdrop-filter: blur(10px) !important;
            width: 100% !important;
            min-height: 60px !important;
            line-height: 1.6 !important;
            box-sizing: border-box !important;
            background-image: url('data:image/svg+xml;utf8,<svg fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>') !important;
            background-repeat: no-repeat !important;
            background-position: right 18px center !important;
            background-size: 18px !important;
        `;
        
        // Fix all options with increased dimensions
        const options = select.querySelectorAll('option');
        options.forEach((option, index) => {
            option.style.cssText = `
                background-color: #2d0f0a !important;
                background: #2d0f0a !important;
                color: #ffffff !important;
                padding: 16px 20px !important;
                font-weight: 600 !important;
                border: none !important;
                font-size: 17px !important;
                line-height: 1.8 !important;
                min-height: 50px !important;
                white-space: normal !important;
                word-wrap: break-word !important;
                text-overflow: clip !important;
                overflow: visible !important;
                box-sizing: border-box !important;
                display: block !important;
                opacity: 1 !important;
                visibility: visible !important;
                height: auto !important;
            `;
            
            // Special handling for placeholder
            if (index === 0 && !option.value) {
                option.style.color = 'rgba(255, 255, 255, 0.6) !important';
                option.style.fontStyle = 'italic !important';
                option.style.minHeight = '50px !important';
            }
        });
        
        // Add event listeners for dynamic styling
        select.addEventListener('focus', function() {
            this.style.borderColor = '#cdb06f !important';
            this.style.boxShadow = '0 6px 20px rgba(205,176,111,.25), 0 0 0 3px rgba(205,176,111,.1) !important';
            this.style.backgroundColor = 'rgba(255,255,255,.12) !important';
        });
        
        select.addEventListener('blur', function() {
            this.style.borderColor = 'rgba(255, 255, 255, 0.2) !important';
            this.style.boxShadow = 'none !important';
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.1) !important';
        });
        
        select.addEventListener('change', function() {
            if (this.value) {
                this.style.color = '#fff !important';
                this.style.fontWeight = '600 !important';
            }
        });
        
        // Force immediate re-render
        select.style.display = 'none';
        select.offsetHeight;
        select.style.display = 'block';
    });
}

// Additional CSS injection with highest specificity
const maxPriorityCSS = `
/* Maximum priority dropdown fixes */
html body .contactForm select.inputs {
    min-height: 60px !important;
    line-height: 1.6 !important;
    box-sizing: border-box !important;
    font-size: 17px !important;
}

html body .contactForm select.inputs option {
    background-color: #2d0f0a !important;
    color: #ffffff !important;
    padding: 16px 20px !important;
    font-weight: 600 !important;
    min-height: 50px !important;
    line-height: 1.8 !important;
    white-space: normal !important;
    overflow: visible !important;
    text-overflow: clip !important;
    box-sizing: border-box !important;
    font-size: 17px !important;
    height: auto !important;
}

html body .contactForm select[name="Committee"] option,
html body .contactForm select[name="Delegation-country"] option {
    background-color: #2d0f0a !important;
    color: #ffffff !important;
    font-size: 17px !important;
    font-weight: 600 !important;
    padding: 16px 20px !important;
    min-height: 50px !important;
    line-height: 1.8 !important;
    height: auto !important;
}

html body .contactForm select.inputs option:hover,
html body .contactForm select.inputs option:checked {
    background-color: #cdb06f !important;
    color: #2d0f0a !important;
    font-weight: 700 !important;
    min-height: 50px !important;
}
`;

// Inject with maximum priority
const maxPriorityStyle = document.createElement('style');
maxPriorityStyle.textContent = maxPriorityCSS;
maxPriorityStyle.id = 'max-priority-dropdown-fixes';
document.head.appendChild(maxPriorityStyle);

// Continuous monitoring to ensure dropdowns stay fixed
setInterval(() => {
    document.querySelectorAll('select.inputs').forEach(select => {
        if (select.style.minHeight !== '60px') {
            select.style.minHeight = '60px';
            select.style.lineHeight = '1.6';
            select.style.boxSizing = 'border-box';
            select.style.fontSize = '17px';
            select.style.padding = '18px 50px 18px 20px';
        }
        
        select.querySelectorAll('option').forEach(option => {
            if (option.style.backgroundColor !== 'rgb(45, 15, 10)') {
                option.style.backgroundColor = '#2d0f0a';
                option.style.color = '#ffffff';
                option.style.minHeight = '50px';
                option.style.lineHeight = '1.8';
                option.style.whiteSpace = 'normal';
                option.style.overflow = 'visible';
                option.style.fontSize = '17px';
                option.style.padding = '16px 20px';
                option.style.height = 'auto';
            }
        });
    });
}, 1000);
