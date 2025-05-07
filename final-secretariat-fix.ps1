# Final fix for Secretariat Board header in 2025 team
# This script focuses on making sure the Secretariat Board header is correctly styled

# 1. Read the current Team.html file
Write-Host "Reading Team.html..."
$content = Get-Content -Path "Team.html" -Raw

# 2. Add special styling for the Secretariat Board header
$secretariatStyles = @'
<style>
    /* Enhanced styling for Secretariat Board heading */
    #team2025 .highboard h2:first-of-type {
        font-family: 'Poppins', Arial, sans-serif !important;
        font-size: 2.8rem !important;
        color: #580D00 !important;
        text-align: center !important;
        margin: 40px auto 60px !important;
        position: relative !important;
        display: inline-block !important;
        font-weight: 700 !important;
        padding-bottom: 20px !important;
        width: 100% !important;
    }
    
    #team2025 .highboard h2:first-of-type::after {
        content: '' !important;
        position: absolute !important;
        bottom: 0 !important;
        left: 50% !important;
        transform: translateX(-50%) !important;
        width: 100px !important;
        height: 4px !important;
        background: linear-gradient(to right, #580D00, #CDB06F) !important;
        border-radius: 4px !important;
    }
    
    #team2025 .highboard h2:first-of-type span {
        display: block !important;
        font-size: 1.4rem !important;
        color: #CDB06F !important;
        margin-top: 5px !important;
        font-weight: 500 !important;
        opacity: 0.9 !important;
    }
    
    /* Make sure the 2025 year indicator is visible */
    #team2025 .year-indicator {
        font-size: 8rem !important;
        color: rgba(205, 176, 111, 0.15) !important;
        position: absolute !important;
        right: 30px !important;
        top: 20px !important;
        font-weight: 900 !important;
        z-index: 0 !important;
        pointer-events: none !important;
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
    }
    
    /* Ensure all team members are visible */
    #team2025 .profile-card {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        width: 250px !important;
        max-width: 100% !important;
        height: auto !important;
        min-height: 300px !important;
        background: white !important;
        border-radius: 10px !important;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1) !important;
        overflow: hidden !important;
        transition: all 0.3s ease !important;
        transform: scale(1) !important;
    }
    
    #team2025 .profile-card:hover {
        transform: translateY(-10px) !important;
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15) !important;
    }
    
    #team2025 .profile-card .img {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        width: 100% !important;
        height: 250px !important;
        border-radius: 10px 10px 0 0 !important;
        overflow: hidden !important;
    }
    
    #team2025 .profile-card .img img {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        width: 100% !important;
        height: 100% !important;
        object-fit: cover !important;
        object-position: center top !important;
        transition: transform 0.3s ease !important;
    }
    
    #team2025 .profile-card:hover .img img {
        transform: scale(1.05) !important;
    }
    
    #team2025 .profile-card .caption {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        padding: 20px !important;
        text-align: center !important;
    }
    
    #team2025 .profile-card .caption h3 {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        font-size: 1.2rem !important;
        color: #580D00 !important;
        margin-bottom: 5px !important;
        font-weight: 600 !important;
    }
    
    #team2025 .profile-card .caption p {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        font-size: 0.9rem !important;
        color: #CDB06F !important;
        margin-bottom: 15px !important;
    }
</style>
'@

# 3. Add the Secretariat Board styles to the head section
$headClosingTag = '</head>'
if (!($content -match "Enhanced styling for Secretariat Board heading")) {
    $content = $content -replace $headClosingTag, "$secretariatStyles$headClosingTag"
}

# 4. Fix any issues with the Secretariat Board header structure
$secretariatHeaderPattern = '<h2><span>Guiding with Vision</span>Secretariat Board</h2>'
$enhancedSecretariatHeader = '<h2 class="secretariat-header"><span>Guiding with Vision</span>Secretariat Board</h2>'

$content = $content -replace $secretariatHeaderPattern, $enhancedSecretariatHeader

# 5. Add special JavaScript to ensure the Secretariat Board is visible
$secretariatScript = @'
<script>
    // Special function to ensure the Secretariat Board is visible
    document.addEventListener('DOMContentLoaded', function() {
        // Function to enhance the 2025 Secretariat Board
        function enhanceSecretariatBoard() {
            var team2025 = document.getElementById('team2025');
            if (!team2025) return;
            
            var secretariatHeader = team2025.querySelector('.highboard h2:first-of-type');
            if (secretariatHeader) {
                secretariatHeader.classList.add('secretariat-header');
                secretariatHeader.style.fontFamily = "'Poppins', Arial, sans-serif";
                secretariatHeader.style.fontSize = "2.8rem";
                secretariatHeader.style.color = "#580D00";
                secretariatHeader.style.textAlign = "center";
                secretariatHeader.style.margin = "40px auto 60px";
                secretariatHeader.style.position = "relative";
                secretariatHeader.style.display = "inline-block";
                secretariatHeader.style.fontWeight = "700";
                secretariatHeader.style.paddingBottom = "20px";
                secretariatHeader.style.width = "100%";
            }
            
            // Make sure the year indicator is visible
            var yearIndicator = team2025.querySelector('.year-indicator');
            if (yearIndicator) {
                yearIndicator.style.display = "block";
                yearIndicator.style.visibility = "visible";
                yearIndicator.style.opacity = "1";
            }
            
            // Make sure all profile cards are visible
            var profileCards = team2025.querySelectorAll('.profile-card');
            profileCards.forEach(function(card) {
                card.style.display = "block";
                card.style.visibility = "visible";
                card.style.opacity = "1";
            });
        }
        
        // Run the enhancement immediately
        enhanceSecretariatBoard();
        
        // Also run it when clicking on the 2025 button
        var btn2025 = document.querySelector('.year-btn:nth-child(2)');
        if (btn2025) {
            btn2025.addEventListener('click', function() {
                // Wait a bit for other scripts to run
                setTimeout(enhanceSecretariatBoard, 100);
            });
        }
    });
</script>
'@

# 6. Add the script to the end of the body
$bodyClosingTag = '</body>'
$content = $content -replace $bodyClosingTag, "$secretariatScript$bodyClosingTag"

# 7. Save the updated content back to Team.html
Write-Host "Updating Team.html with enhanced Secretariat Board styling..."
$content | Set-Content -Path "Team.html" -Force

Write-Host "Secretariat Board styling has been enhanced! The 2025 team header should now display correctly." -ForegroundColor Green 