# Year Toggle Button Enhancement Script
# This script adds modern styling to the year toggle buttons

# Read the current Team.html file
Write-Host "Reading Team.html..."
$htmlContent = Get-Content -Path "Team.html" -Raw

# Create a style block for the year toggle button enhancements
$enhancedToggleStyle = @"
<style>
    /* Modern year toggle button enhancements */
    .flex-container {
        padding-bottom: 0 !important;
    }
    
    .year-toggle {
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        margin-top: 20px !important;
        margin-bottom: 40px !important;
        gap: 15px !important;
        padding: 10px !important;
        background: rgba(255, 255, 255, 0.15) !important;
        backdrop-filter: blur(10px) !important;
        -webkit-backdrop-filter: blur(10px) !important;
        border-radius: 50px !important;
        width: fit-content !important;
        margin-left: auto !important;
        margin-right: auto !important;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1) !important;
        border: 1px solid rgba(255, 255, 255, 0.2) !important;
    }
    
    .year-btn {
        background: transparent !important;
        border: none !important;
        color: rgba(255, 255, 255, 0.8) !important;
        padding: 12px 30px !important;
        margin: 0 !important;
        font-size: 18px !important;
        font-weight: 600 !important;
        cursor: pointer !important;
        transition: all 0.3s ease !important;
        border-radius: 25px !important;
        letter-spacing: 1px !important;
        position: relative !important;
        overflow: hidden !important;
        z-index: 1 !important;
    }
    
    .year-btn:before {
        content: '' !important;
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 100% !important;
        background: white !important;
        border-radius: 25px !important;
        transform: scaleX(0) !important;
        transform-origin: right !important;
        transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1) !important;
        z-index: -1 !important;
    }
    
    .year-btn:hover {
        color: #580D00 !important;
    }
    
    .year-btn:hover:before {
        transform: scaleX(1) !important;
        transform-origin: left !important;
    }
    
    .year-btn.active {
        background: white !important;
        color: #580D00 !important;
        box-shadow: 0 5px 15px rgba(88, 13, 0, 0.2) !important;
        transform: translateY(-2px) !important;
    }
    
    .year-btn:focus {
        outline: none !important;
    }
    
    /* Additional styling for year indicator */
    .year-indicator {
        position: absolute !important;
        top: 10px !important;
        right: 10px !important;
        background: rgba(255, 255, 255, 0.2) !important;
        color: white !important;
        padding: 5px 15px !important;
        border-radius: 20px !important;
        font-weight: 600 !important;
        font-size: 14px !important;
        letter-spacing: 1px !important;
        backdrop-filter: blur(5px) !important;
        -webkit-backdrop-filter: blur(5px) !important;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
        border: 1px solid rgba(255, 255, 255, 0.3) !important;
    }
</style>
"@

# Create a script for improved button interactions
$buttonInteractionScript = @"
<script>
    // Enhanced year toggle button interactions
    document.addEventListener('DOMContentLoaded', function() {
        // Add ripple effect to buttons
        document.querySelectorAll('.year-btn').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                // Create ripple effect
                let ripple = document.createElement('span');
                ripple.classList.add('ripple');
                ripple.style.position = 'absolute';
                ripple.style.background = 'rgba(255, 255, 255, 0.7)';
                ripple.style.borderRadius = '50%';
                ripple.style.transform = 'scale(0)';
                ripple.style.animation = 'ripple-effect 0.6s linear';
                ripple.style.pointerEvents = 'none';
                
                // Add custom ripple animation to the document if it doesn't exist
                if (!document.querySelector('#ripple-animation')) {
                    let style = document.createElement('style');
                    style.id = 'ripple-animation';
                    style.innerHTML = `
                        @keyframes ripple-effect {
                            0% { transform: scale(0); opacity: 1; }
                            100% { transform: scale(2.5); opacity: 0; }
                        }
                    `;
                    document.head.appendChild(style);
                }
                
                // Position the ripple element
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                ripple.style.width = ripple.style.height = `${size}px`;
                ripple.style.left = `${e.clientX - rect.left - size/2}px`;
                ripple.style.top = `${e.clientY - rect.top - size/2}px`;
                
                // Add to button and remove after animation completes
                this.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);
            });
        });
    });
</script>
"@

# Apply the changes to the HTML file
Write-Host "Applying year toggle button enhancements..."

# Add style block before </head>
$htmlContent = $htmlContent -replace "</head>", "$enhancedToggleStyle`r`n</head>"

# Add interaction script before </body>
$htmlContent = $htmlContent -replace "</body>", "$buttonInteractionScript`r`n</body>"

# Save the modified content
Write-Host "Saving changes..."
$htmlContent | Out-File -FilePath "Team.html" -Encoding utf8

Write-Host "Year toggle button enhancements completed successfully!"
Write-Host "The year toggle buttons now have a modern design with improved interactions." 