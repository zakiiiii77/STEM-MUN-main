# Fix for profile card overlay issue
# This script addresses the issue where text and social media icons remain visible after closing the card

# 1. Read the current Team.html file
Write-Host "Reading Team.html..."
$content = Get-Content -Path "Team.html" -Raw

# 2. Add CSS to fix the profile card caption and overlay issues
$profileCardFix = @'
<style>
    /* Fix for profile card overlay issues */
    .profile-card {
        position: relative !important;
        overflow: hidden !important;
        transition: all 0.3s ease !important;
    }
    
    .profile-card .img {
        position: relative !important;
        overflow: hidden !important;
        z-index: 1 !important;
    }
    
    .profile-card .caption {
        position: absolute !important;
        bottom: 0 !important;
        left: 0 !important;
        width: 100% !important;
        padding: 20px !important;
        background: rgba(255, 255, 255, 0.95) !important;
        transform: translateY(100%) !important;
        transition: transform 0.3s ease !important;
        z-index: 2 !important;
        opacity: 0 !important;
    }
    
    .profile-card:hover .caption {
        transform: translateY(0) !important;
        opacity: 1 !important;
    }
    
    .profile-card .caption h3 {
        margin: 0 0 5px 0 !important;
        font-size: 1.1rem !important;
        color: #580D00 !important;
        font-weight: 600 !important;
    }
    
    .profile-card .caption p {
        margin: 0 0 15px 0 !important;
        font-size: 0.9rem !important;
        color: #CDB06F !important;
    }
    
    .profile-card .social-links {
        display: flex !important;
        justify-content: center !important;
        gap: 10px !important;
    }
    
    .profile-card .social-links a {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        width: 30px !important;
        height: 30px !important;
        border-radius: 50% !important;
        background: #580D00 !important;
        color: white !important;
        font-size: 14px !important;
        transition: all 0.3s ease !important;
    }
    
    .profile-card .social-links a:hover {
        background: #CDB06F !important;
        transform: translateY(-3px) !important;
    }
    
    /* Fixed styles for the 2024 team */
    #team2024 .profile-card .caption {
        position: absolute !important;
        bottom: 0 !important;
        left: 0 !important;
        width: 100% !important;
        transform: translateY(100%) !important;
        opacity: 0 !important;
    }
    
    #team2024 .profile-card:hover .caption {
        transform: translateY(0) !important;
        opacity: 1 !important;
    }
    
    /* Fixed styles for the 2025 team */
    #team2025 .profile-card .caption {
        position: absolute !important;
        bottom: 0 !important;
        left: 0 !important;
        width: 100% !important;
        transform: translateY(100%) !important;
        opacity: 0 !important;
    }
    
    #team2025 .profile-card:hover .caption {
        transform: translateY(0) !important;
        opacity: 1 !important;
    }
</style>
'@

# 3. Add the profile card fix to the head section
$headClosingTag = '</head>'
if (!($content -match "Fix for profile card overlay issues")) {
    $content = $content -replace $headClosingTag, "$profileCardFix$headClosingTag"
}

# 4. Add JavaScript to handle card interactions properly
$cardInteractionFix = @'
<script>
    // Fix for profile card overlay issues
    document.addEventListener('DOMContentLoaded', function() {
        // Function to set up proper hover behavior for profile cards
        function setupProfileCards() {
            var profileCards = document.querySelectorAll('.profile-card');
            
            profileCards.forEach(function(card) {
                // Remove any existing event listeners first
                card.removeEventListener('mouseenter', handleCardEnter);
                card.removeEventListener('mouseleave', handleCardLeave);
                
                // Add new event listeners
                card.addEventListener('mouseenter', handleCardEnter);
                card.addEventListener('mouseleave', handleCardLeave);
            });
        }
        
        // Card mouseenter handler
        function handleCardEnter(e) {
            var card = this;
            var caption = card.querySelector('.caption');
            
            if (caption) {
                // Make sure caption is properly hidden by default
                caption.style.transform = 'translateY(0)';
                caption.style.opacity = '1';
            }
        }
        
        // Card mouseleave handler
        function handleCardLeave(e) {
            var card = this;
            var caption = card.querySelector('.caption');
            
            if (caption) {
                // Properly hide the caption when mouse leaves
                caption.style.transform = 'translateY(100%)';
                caption.style.opacity = '0';
            }
        }
        
        // Run setup on page load
        setupProfileCards();
        
        // Also run when switching teams
        var yearButtons = document.querySelectorAll('.year-btn');
        yearButtons.forEach(function(btn) {
            btn.addEventListener('click', function() {
                // Wait a bit for the DOM to update
                setTimeout(setupProfileCards, 100);
            });
        });
        
        // Additional fix for any cards that might have retained state
        function resetAllCards() {
            var allCaptions = document.querySelectorAll('.profile-card .caption');
            allCaptions.forEach(function(caption) {
                caption.style.transform = 'translateY(100%)';
                caption.style.opacity = '0';
            });
        }
        
        // Run reset when clicking anywhere on the document
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.profile-card')) {
                resetAllCards();
            }
        });
    });
</script>
'@

# 5. Add the card interaction fix to the end of the body
$bodyClosingTag = '</body>'
$content = $content -replace $bodyClosingTag, "$cardInteractionFix$bodyClosingTag"

# 6. Save the updated content back to Team.html
Write-Host "Updating Team.html with profile card fixes..."
$content | Set-Content -Path "Team.html" -Force

Write-Host "Profile card overlay issues have been fixed! The captions should now properly hide/show on hover." -ForegroundColor Green 