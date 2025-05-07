# Modern profile card style update
# This script applies a more modern and visually appealing style to the team profile cards

# 1. Read the current Team.html file
Write-Host "Reading Team.html..."
$content = Get-Content -Path "Team.html" -Raw

# 2. Create the modern card style
$modernCardStyle = @'
<style>
    /* Modern profile card style with clean design */
    .profile-card {
        width: 280px !important;
        height: 360px !important;
        position: relative !important;
        border-radius: 16px !important;
        overflow: hidden !important;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15) !important;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
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
    
    .profile-card .img::after {
        content: '' !important;
        position: absolute !important;
        bottom: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 50% !important;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent) !important;
        opacity: 0 !important;
        transition: opacity 0.3s ease !important;
    }
    
    .profile-card:hover .img::after {
        opacity: 1 !important;
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
        z-index: 2 !important;
        height: 80px !important;
        overflow: hidden !important;
    }
    
    .profile-card:hover .caption {
        height: 160px !important;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85)) !important;
        backdrop-filter: blur(5px) !important;
        -webkit-backdrop-filter: blur(5px) !important;
    }
    
    .profile-card .caption h3 {
        margin: 0 0 5px 0 !important;
        font-size: 1.2rem !important;
        color: #580D00 !important;
        font-weight: 700 !important;
        transition: all 0.3s ease !important;
        position: relative !important;
        display: inline-block !important;
    }
    
    .profile-card .caption h3::after {
        content: '' !important;
        position: absolute !important;
        bottom: -4px !important;
        left: 0 !important;
        width: 0 !important;
        height: 2px !important;
        background: #CDB06F !important;
        transition: width 0.3s ease !important;
    }
    
    .profile-card:hover .caption h3::after {
        width: 100% !important;
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
    
    .profile-card .social-links a {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        width: 36px !important;
        height: 36px !important;
        border-radius: 50% !important;
        background: #580D00 !important;
        color: white !important;
        font-size: 16px !important;
        transition: all 0.3s ease !important;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
        transform: translateY(0) !important;
    }
    
    .profile-card .social-links a:hover {
        background: #CDB06F !important;
        transform: translateY(-5px) !important;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15) !important;
    }
    
    /* Grid layout for profile cards */
    .shelf {
        display: flex !important;
        flex-wrap: wrap !important;
        justify-content: center !important;
        gap: 20px !important;
        margin-bottom: 60px !important;
    }
    
    /* Ensure proper behavior in 2025 team */
    #team2025 .profile-card {
        width: 280px !important;
        height: 360px !important;
    }
    
    #team2025 .profile-card .caption {
        height: 80px !important;
    }
    
    #team2025 .profile-card:hover .caption {
        height: 160px !important;
    }
    
    #team2025 .profile-card .social-links {
        opacity: 0 !important;
    }
    
    #team2025 .profile-card:hover .social-links {
        opacity: 1 !important;
    }
</style>
'@

# 3. Add the modern card style to the head section
$headClosingTag = '</head>'
$content = $content -replace $headClosingTag, "$modernCardStyle$headClosingTag"

# 4. Add JavaScript to ensure the cards behave properly
$cardBehaviorScript = @'
<script>
    // Modern profile card behavior
    document.addEventListener('DOMContentLoaded', function() {
        // Function to set up the modern card behavior
        function setupModernCards() {
            var profileCards = document.querySelectorAll('.profile-card');
            
            profileCards.forEach(function(card) {
                // Remove any existing event listeners
                card.removeEventListener('mouseenter', handleCardEnter);
                card.removeEventListener('mouseleave', handleCardLeave);
                
                // Add new event listeners
                card.addEventListener('mouseenter', handleCardEnter);
                card.addEventListener('mouseleave', handleCardLeave);
            });
        }
        
        // Card enter handler
        function handleCardEnter() {
            var caption = this.querySelector('.caption');
            var socialLinks = this.querySelector('.social-links');
            var img = this.querySelector('.img img');
            
            if (caption) {
                caption.style.height = '160px';
            }
            
            if (socialLinks) {
                socialLinks.style.opacity = '1';
                socialLinks.style.transform = 'translateY(0)';
            }
            
            if (img) {
                img.style.transform = 'scale(1.1)';
            }
        }
        
        // Card leave handler
        function handleCardLeave() {
            var caption = this.querySelector('.caption');
            var socialLinks = this.querySelector('.social-links');
            var img = this.querySelector('.img img');
            
            if (caption) {
                caption.style.height = '80px';
            }
            
            if (socialLinks) {
                socialLinks.style.opacity = '0';
                socialLinks.style.transform = 'translateY(10px)';
            }
            
            if (img) {
                img.style.transform = 'scale(1)';
            }
        }
        
        // Run setup on page load
        setupModernCards();
        
        // Also run when switching teams
        var yearButtons = document.querySelectorAll('.year-btn');
        yearButtons.forEach(function(btn) {
            btn.addEventListener('click', function() {
                // Wait a bit for the DOM to update
                setTimeout(setupModernCards, 100);
            });
        });
    });
</script>
'@

# 5. Add the card behavior script to the end of the body
$bodyClosingTag = '</body>'
$content = $content -replace $bodyClosingTag, "$cardBehaviorScript$bodyClosingTag"

# 6. Save the updated content back to Team.html
Write-Host "Updating Team.html with modern profile card styles..."
$content | Set-Content -Path "Team.html" -Force

Write-Host "Modern profile card styles have been applied! The cards now have a more elegant and interactive design." -ForegroundColor Green 