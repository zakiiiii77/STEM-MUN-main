# Complete Team Page Fix
# This script combines all the fixes for the Meet The Board page into a single solution

# Read the current Team.html file
Write-Host "Reading Team.html..."
$content = Get-Content -Path "Team.html" -Raw

# 1. Create a consolidated script for reliable year toggle functionality
$reliableToggleScript = @'
<script>
    // Consolidated team toggle function with improved behavior
    window.switchTeam = function(year) {
        console.log("Switching to team " + year);
        
        // Hide all team containers and reset buttons
        document.querySelectorAll('.team-container').forEach(function(container) {
            container.style.display = 'none';
            container.classList.remove('active');
        });
        
        document.querySelectorAll('.year-btn').forEach(function(btn) {
            btn.classList.remove('active');
            if (btn.textContent === year) {
                btn.classList.add('active');
            }
        });
        
        // Show the selected team container with improved reliability
        var selectedContainer = document.getElementById('team' + year);
        if (selectedContainer) {
            // Force display with important properties
            selectedContainer.style.cssText = "display: block !important; opacity: 1 !important; visibility: visible !important;";
            selectedContainer.classList.add('active');
            
            // Ensure all child elements are properly visible
            selectedContainer.querySelectorAll('.highboard').forEach(function(highboard) {
                highboard.style.cssText = "display: block !important; visibility: visible !important;";
            });
            
            selectedContainer.querySelectorAll('.shelf').forEach(function(shelf) {
                shelf.style.cssText = "display: flex !important; flex-wrap: wrap !important; justify-content: center !important; gap: 20px !important; visibility: visible !important;";
            });
            
            selectedContainer.querySelectorAll('.profile-card').forEach(function(card) {
                card.style.cssText = "visibility: visible !important; opacity: 1 !important;";
            });
            
            // Special handling for Secretariat Board headers
            var secretariatHeader = selectedContainer.querySelector('.highboard h2:first-of-type');
            if (secretariatHeader) {
                secretariatHeader.classList.add('secretariat-header');
            }
            
            console.log("Team container for year " + year + " displayed");
        } else {
            console.error("Team container for year " + year + " not found");
        }
    };
    
    // Initialize the page with the correct team shown
    document.addEventListener('DOMContentLoaded', function() {
        // Profile card interactions
        setupProfileCardInteractions();
        
        // Get active button or default to 2024
        var activeYear = "2024";
        var activeButton = document.querySelector('.year-btn.active');
        if (activeButton) {
            activeYear = activeButton.textContent;
        }
        
        // Set initial state
        switchTeam(activeYear);
        
        // Add unified click handlers to year buttons
        document.querySelectorAll('.year-btn').forEach(function(btn) {
            // Remove any existing click handlers
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            
            // Add single, reliable click handler
            newBtn.addEventListener('click', function() {
                switchTeam(this.textContent);
            });
        });
        
        console.log("Team switcher initialized with year: " + activeYear);
    });
    
    // Setup profile card interactions
    function setupProfileCardInteractions() {
        document.querySelectorAll('.profile-card').forEach(function(card) {
            // Add unified hover behaviors
            card.addEventListener('mouseenter', function() {
                var caption = this.querySelector('.caption');
                if (caption) {
                    caption.style.cssText = "transform: translateY(0) !important; opacity: 1 !important;";
                }
                
                var socialLinks = this.querySelector('.social-links');
                if (socialLinks) {
                    socialLinks.style.cssText = "opacity: 1 !important; transform: translateY(0) !important;";
                }
            });
            
            card.addEventListener('mouseleave', function() {
                var caption = this.querySelector('.caption');
                
                // Only hide captions and social links, not the entire profile
                if (!this.classList.contains('expanded')) {
                    if (caption && !this.matches(':hover')) {
                        // Reset caption visibility without hiding the entire card
                        var socialLinks = this.querySelector('.social-links');
                        if (socialLinks) {
                            socialLinks.style.cssText = "opacity: 0 !important;";
                        }
                    }
                }
            });
        });
    }
</script>
'@

# 2. Create consolidated styles for team containers and profile cards
$reliableStyles = @'
<style>
    /* Reliability fixes for team containers */
    .team-container {
        display: none !important;
        transition: opacity 0.3s ease !important;
    }
    
    .team-container.active {
        display: block !important;
        opacity: 1 !important;
        visibility: visible !important;
    }
    
    /* Year toggle enhancements */
    .year-toggle {
        display: flex !important;
        justify-content: center !important;
        margin-bottom: 30px !important;
        gap: 15px !important;
    }
    
    .year-btn {
        background: transparent !important;
        border: 2px solid white !important;
        color: white !important;
        padding: 10px 30px !important;
        margin: 0 10px !important;
        font-size: 18px !important;
        cursor: pointer !important;
        transition: all 0.3s ease !important;
        border-radius: 25px !important;
        font-weight: 600 !important;
    }
    
    .year-btn.active {
        background: white !important;
        color: #5C0000 !important;
    }
    
    .year-btn:focus {
        outline: none !important;
    }
    
    /* Profile card enhancements */
    .profile-card {
        position: relative !important;
        overflow: hidden !important;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
        width: 280px !important;
        height: 360px !important;
        border-radius: 16px !important;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15) !important;
        background: white !important;
        margin: 15px !important;
    }
    
    .profile-card:hover {
        transform: translateY(-15px) !important;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2) !important;
    }
    
    .profile-card .img {
        width: 100% !important;
        height: 280px !important;
        position: relative !important;
        overflow: hidden !important;
        z-index: 1 !important;
    }
    
    .profile-card .img img {
        width: 100% !important;
        height: 100% !important;
        object-fit: cover !important;
        object-position: center top !important;
        transition: transform 0.5s ease !important;
    }
    
    .profile-card:hover .img img {
        transform: scale(1.1) !important;
    }
    
    .profile-card .caption {
        position: absolute !important;
        bottom: 0 !important;
        left: 0 !important;
        width: 100% !important;
        background: white !important;
        padding: 20px !important;
        box-sizing: border-box !important;
        transition: all 0.3s ease !important;
        z-index: 99 !important;
        height: 80px !important;
        overflow: hidden !important;
    }
    
    .profile-card:hover .caption {
        height: 160px !important;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85)) !important;
    }
    
    .profile-card .caption h3 {
        margin: 0 0 5px 0 !important;
        font-size: 1.2rem !important;
        color: #580D00 !important;
        font-weight: 700 !important;
        transition: all 0.3s ease !important;
    }
    
    .profile-card .caption p {
        margin: 0 0 20px 0 !important;
        font-size: 0.95rem !important;
        color: #CDB06F !important;
        font-weight: 500 !important;
    }
    
    .profile-card .social-links {
        display: flex !important;
        justify-content: center !important;
        gap: 12px !important;
        transition: all 0.3s ease !important;
        opacity: 0 !important;
        transform: translateY(10px) !important;
    }
    
    .profile-card:hover .social-links {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .shelf {
        display: flex !important;
        flex-wrap: wrap !important;
        justify-content: center !important;
        gap: 20px !important;
        margin-bottom: 60px !important;
    }
    
    /* Special 2025 team styles */
    #team2025 {
        display: none !important;
    }
    
    #team2025.active {
        display: block !important;
        opacity: 1 !important;
        visibility: visible !important;
    }
    
    #team2025 .highboard h2:first-of-type {
        color: #580D00 !important;
        font-size: 2.8rem !important;
        margin: 40px auto 60px !important;
        position: relative !important;
        display: inline-block !important;
        font-weight: 700 !important;
        padding-bottom: 20px !important;
        width: 100% !important;
    }
    
    #team2025 .year-indicator {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
    }
</style>
'@

# 3. Add the fixes to the HTML file
Write-Host "Applying fixes to the Team.html file..."

# Find the </head> tag to insert our styles
$headClosingTag = '</head>'
$content = $content -replace $headClosingTag, "$reliableStyles$headClosingTag"

# Find a good place to insert our script (after jQuery but before other scripts)
$scriptInsertPoint = '<script src="js/jquery.min.js"></script>'
$content = $content -replace $scriptInsertPoint, "$scriptInsertPoint$reliableToggleScript"

# Replace the onclick handlers of the year buttons to ensure they use our new function
$content = $content -replace 'onclick="switchTeam\(', 'onclick="switchTeam(' 
$content = $content -replace 'onclick="manual2025Switch\(\)"', 'onclick="switchTeam(''2025'')"'

# 4. Save the modified content back to the file
Write-Host "Saving changes to Team.html..."
$content | Set-Content -Path "Team.html" -Force

# 5. Create a backup copy of the original file
if (-not (Test-Path -Path "Team-backup.html")) {
    Write-Host "Creating backup at Team-backup.html..."
    Get-Content -Path "Team.html" | Set-Content -Path "Team-backup.html"
}

Write-Host "Fix completed successfully!"
Write-Host "The Meet The Board page has been updated with reliable year toggle functionality and improved profile card display." 