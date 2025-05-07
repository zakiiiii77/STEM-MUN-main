# Profile Card Enhancement Script
# This script adds modern styling to the profile cards and ensures they display correctly

# Read the current Team.html file
Write-Host "Reading Team.html..."
$htmlContent = Get-Content -Path "Team.html" -Raw

# Create a style block for the profile card enhancements
$enhancedCardStyle = @"
<style>
    /* Modern profile card enhancements */
    .profile-card {
        width: 280px !important;
        height: 360px !important;
        border-radius: 16px !important;
        background: white !important;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
        overflow: hidden !important;
        position: relative !important;
        z-index: 1 !important;
        margin: 15px !important;
    }
    
    .profile-card:hover {
        transform: translateY(-15px) !important;
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2) !important;
    }
    
    .profile-card .img {
        width: 100% !important;
        height: 75% !important;
        overflow: hidden !important;
        position: relative !important;
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
        padding: 15px !important;
        box-sizing: border-box !important;
        height: 85px !important;
        transition: all 0.3s ease !important;
        overflow: hidden !important;
    }
    
    .profile-card:hover .caption {
        height: 150px !important;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9)) !important;
        backdrop-filter: blur(5px) !important;
    }
    
    .profile-card .caption h3 {
        margin: 0 0 5px 0 !important;
        font-size: 1.2rem !important;
        color: #580D00 !important;
        font-weight: 600 !important;
    }
    
    .profile-card .caption p {
        margin: 0 0 15px 0 !important;
        font-size: 0.95rem !important;
        color: #CDB06F !important;
    }
    
    .profile-card .social-links {
        opacity: 0 !important;
        transform: translateY(10px) !important;
        transition: all 0.3s ease !important;
        display: flex !important;
        justify-content: center !important;
        gap: 15px !important;
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
    }
    
    .profile-card .social-links a:hover {
        background: #CDB06F !important;
        transform: translateY(-5px) !important;
    }
    
    /* Fix for shelf layout */
    .shelf {
        display: flex !important;
        flex-wrap: wrap !important;
        justify-content: center !important;
        gap: 20px !important;
        margin-bottom: 60px !important;
    }
</style>
"@

# Create a script for improved card interactions
$cardInteractionScript = @"
<script>
    // Enhanced profile card interactions
    document.addEventListener('DOMContentLoaded', function() {
        // Setup all profile cards
        setupProfileCards();
        
        // Function to set up profile card interactions
        function setupProfileCards() {
            document.querySelectorAll('.profile-card').forEach(function(card) {
                // Fix any styling issues directly
                card.style.overflow = 'hidden';
                
                var caption = card.querySelector('.caption');
                if (caption) {
                    caption.style.position = 'absolute';
                    caption.style.bottom = '0';
                    caption.style.width = '100%';
                    caption.style.zIndex = '99';
                }
                
                var socialLinks = card.querySelector('.social-links');
                if (socialLinks) {
                    socialLinks.style.transition = 'opacity 0.3s ease';
                }
                
                // Remove any existing event listeners to avoid duplicates
                card.replaceWith(card.cloneNode(true));
            });
            
            // Re-add event listeners to the new card nodes
            document.querySelectorAll('.profile-card').forEach(function(card) {
                card.addEventListener('mouseenter', function() {
                    var caption = this.querySelector('.caption');
                    var socialLinks = this.querySelector('.social-links');
                    
                    if (caption) caption.style.opacity = '1';
                    if (socialLinks) socialLinks.style.opacity = '1';
                });
                
                card.addEventListener('mouseleave', function() {
                    var socialLinks = this.querySelector('.social-links');
                    if (socialLinks && !this.matches(':hover')) {
                        socialLinks.style.opacity = '0';
                    }
                });
            });
        }
    });
</script>
"@

# Apply the changes to the HTML file
Write-Host "Applying profile card enhancements..."

# Add style block before </head>
$htmlContent = $htmlContent -replace "</head>", "$enhancedCardStyle`r`n</head>"

# Add interaction script before </body>
$htmlContent = $htmlContent -replace "</body>", "$cardInteractionScript`r`n</body>"

# Save the modified content
Write-Host "Saving changes..."
$htmlContent | Out-File -FilePath "Team.html" -Encoding utf8

Write-Host "Profile card enhancements completed successfully!"
Write-Host "The team profile cards now have a modern design with improved interactions." 