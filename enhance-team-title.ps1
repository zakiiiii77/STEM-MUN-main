# Enhanced Team Page Title Script
# This script adds even more advanced effects to the Team page main title

# Read the current Team.html file
Write-Host "Reading Team.html..."
$htmlContent = Get-Content -Path "Team.html" -Raw

# Create style block for enhanced title effects
$titleStyle = @"
<style>
    /* Enhanced title with advanced effects */
    .team-title-container {
        position: relative !important;
        padding: 40px 0 !important;
        text-align: center !important;
        z-index: 10 !important;
        overflow: hidden !important;
    }
    
    .team-title-glow {
        position: absolute !important;
        width: 300px !important;
        height: 300px !important;
        background: radial-gradient(circle, rgba(205, 176, 111, 0.3) 0%, rgba(205, 176, 111, 0) 70%) !important;
        border-radius: 50% !important;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
        pointer-events: none !important;
        filter: blur(40px) !important;
        animation: pulse 8s infinite alternate ease-in-out !important;
        z-index: -1 !important;
    }
    
    @keyframes pulse {
        0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.3; }
        100% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.7; }
    }
    
    .team-main-title {
        position: relative !important;
        font-family: 'Montserrat', sans-serif !important;
        font-size: 4.5rem !important;
        font-weight: 800 !important;
        text-transform: uppercase !important;
        letter-spacing: 5px !important;
        margin: 0 !important;
        padding: 0 !important;
        background: linear-gradient(90deg, #dcd8cc, #CDB06F, #dcd8cc) !important;
        background-size: 200% auto !important;
        -webkit-background-clip: text !important;
        -webkit-text-fill-color: transparent !important;
        animation: shine 5s linear infinite !important;
        text-shadow: 0 10px 30px rgba(0,0,0,0.2) !important;
        word-break: break-word !important;
    }
    
    @keyframes shine {
        0% { background-position: 0% 50%; }
        100% { background-position: 200% 50%; }
    }
    
    .team-subtitle {
        font-family: 'Montserrat', sans-serif !important;
        font-size: 1.2rem !important;
        font-weight: 400 !important;
        color: rgba(255, 255, 255, 0.7) !important;
        letter-spacing: 2px !important;
        margin-top: 15px !important;
        text-transform: uppercase !important;
        opacity: 0 !important;
        transform: translateY(20px) !important;
        animation: fadeInUp 1s forwards 0.5s ease-out !important;
    }
    
    @keyframes fadeInUp {
        0% { opacity: 0; transform: translateY(20px); }
        100% { opacity: 1; transform: translateY(0); }
    }
    
    .decorative-line {
        position: relative !important;
        width: 150px !important;
        height: 2px !important;
        background: linear-gradient(to right, rgba(205, 176, 111, 0), rgba(205, 176, 111, 1), rgba(205, 176, 111, 0)) !important;
        margin: 25px auto !important;
        opacity: 0 !important;
        transform: scaleX(0.5) !important;
        animation: expandLine 1s forwards 0.8s ease-out !important;
    }
    
    @keyframes expandLine {
        0% { opacity: 0; transform: scaleX(0.5); }
        100% { opacity: 1; transform: scaleX(1); }
    }
    
    /* Responsive adjustments */
    @media (max-width: 768px) {
        .team-main-title {
            font-size: 3rem !important;
            letter-spacing: 3px !important;
        }
        
        .team-subtitle {
            font-size: 1rem !important;
        }
    }
    
    @media (max-width: 480px) {
        .team-main-title {
            font-size: 2.5rem !important;
            letter-spacing: 2px !important;
        }
    }
</style>
"@

# Create script to animate the title
$titleScript = @"
<script>
    // Enhanced title animations
    document.addEventListener('DOMContentLoaded', function() {
        // Get the h1 title
        const titleElement = document.querySelector('.flex-container h1');
        if (!titleElement) return;
        
        // Create a wrapper for the enhanced title
        const titleText = titleElement.textContent;
        const titleHTML = `
            <div class="team-title-container">
                <div class="team-title-glow"></div>
                <h1 class="team-main-title">${titleText}</h1>
                <div class="decorative-line"></div>
                <div class="team-subtitle">Guiding our model united nations journey</div>
            </div>
        `;
        
        // Replace the original title
        titleElement.outerHTML = titleHTML;
        
        // Add mouse movement effect to title glow
        const titleContainer = document.querySelector('.team-title-container');
        const titleGlow = document.querySelector('.team-title-glow');
        
        if (titleContainer && titleGlow) {
            titleContainer.addEventListener('mousemove', function(e) {
                const rect = titleContainer.getBoundingClientRect();
                const xPos = (e.clientX - rect.left) / rect.width;
                const yPos = (e.clientY - rect.top) / rect.height;
                
                // Move the glow slightly with mouse
                titleGlow.style.transform = `translate(calc(-50% + ${(xPos - 0.5) * 100}px), calc(-50% + ${(yPos - 0.5) * 50}px))`;
                
                // Adjust glow opacity based on mouse position
                const distanceFromCenter = Math.sqrt(Math.pow(xPos - 0.5, 2) + Math.pow(yPos - 0.5, 2));
                titleGlow.style.opacity = Math.max(0.3, 1 - distanceFromCenter * 1.5);
            });
            
            // Reset on mouse leave
            titleContainer.addEventListener('mouseleave', function() {
                titleGlow.style.transform = 'translate(-50%, -50%)';
                titleGlow.style.opacity = '0.5';
            });
        }
        
        // Add text splitting for a more advanced effect
        const mainTitle = document.querySelector('.team-main-title');
        if (mainTitle) {
            // Split text into characters with spans
            const text = mainTitle.textContent;
            let splitHTML = '';
            
            for (let i = 0; i < text.length; i++) {
                if (text[i] === ' ') {
                    splitHTML += ' ';
                } else {
                    splitHTML += `<span style="animation-delay: ${i * 0.03}s;">${text[i]}</span>`;
                }
            }
            
            mainTitle.innerHTML = splitHTML;
            
            // Add animation to each character
            const styleSheet = document.createElement('style');
            styleSheet.textContent = `
                .team-main-title span {
                    display: inline-block;
                    animation: charAnimation 1s forwards;
                    opacity: 0;
                    transform: translateY(20px) scale(0.8);
                }
                
                @keyframes charAnimation {
                    0% { opacity: 0; transform: translateY(20px) scale(0.8); }
                    100% { opacity: 1; transform: translateY(0) scale(1); }
                }
            `;
            document.head.appendChild(styleSheet);
        }
    });
</script>
"@

# Apply the changes to the HTML file
Write-Host "Applying enhanced title effects..."

# Add style block before </head>
$htmlContent = $htmlContent -replace "</head>", "$titleStyle`r`n</head>"

# Add script block before </body>
$htmlContent = $htmlContent -replace "</body>", "$titleScript`r`n</body>"

# Save the modified content
Write-Host "Saving changes..."
$htmlContent | Out-File -FilePath "Team.html" -Encoding utf8

Write-Host "Title enhancement completed successfully!"
Write-Host "The Meet The Board page now has an advanced animated title with modern effects." 