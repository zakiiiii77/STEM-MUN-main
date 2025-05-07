# Direct fix for profile card overlay issues
# This script uses a simpler approach to fix the issue where text remains visible

# 1. Read the current Team.html file
Write-Host "Reading Team.html..."
$content = Get-Content -Path "Team.html" -Raw

# 2. Create a direct CSS override that's as simple as possible
$directFix = @'
<style>
    /* Direct fix for profile card overlay issues */
    /* Completely reset all previous styles */
    
    .profile-card {
        width: 250px !important;
        height: 350px !important;
        position: relative !important;
        overflow: hidden !important;
        border-radius: 10px !important;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1) !important;
        transition: all 0.3s ease !important;
    }
    
    .profile-card .img {
        width: 100% !important;
        height: 100% !important;
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
    }
    
    .profile-card .img img {
        width: 100% !important;
        height: 100% !important;
        object-fit: cover !important;
        object-position: center top !important;
    }
    
    .profile-card .caption {
        position: absolute !important;
        bottom: -100% !important; /* Start completely off screen */
        left: 0 !important;
        width: 100% !important;
        height: auto !important;
        background: rgba(255, 255, 255, 0.95) !important;
        padding: 20px !important;
        transition: bottom 0.3s ease !important;
        text-align: center !important;
    }
    
    .profile-card:hover .caption {
        bottom: 0 !important; /* Slide up on hover */
    }
    
    .profile-card .caption h3 {
        margin: 0 0 5px 0 !important;
        color: #580D00 !important;
        font-size: 18px !important;
        font-weight: 600 !important;
    }
    
    .profile-card .caption p {
        margin: 0 0 15px 0 !important;
        color: #CDB06F !important;
        font-size: 14px !important;
    }
    
    .profile-card .social-links {
        display: flex !important;
        justify-content: center !important;
        gap: 10px !important;
    }
    
    .profile-card .social-links a {
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        width: 32px !important;
        height: 32px !important;
        background: #580D00 !important;
        color: white !important;
        border-radius: 50% !important;
        font-size: 14px !important;
        transition: all 0.3s ease !important;
    }
    
    .profile-card .social-links a:hover {
        background: #CDB06F !important;
        transform: translateY(-3px) !important;
    }
</style>
'@

# 3. Add the direct fix to the head section
$headClosingTag = '</head>'
$content = $content -replace $headClosingTag, "$directFix$headClosingTag"

# 4. Add a dedicated JavaScript solution that doesn't rely on CSS
$jsCardFix = @'
<script>
    // Direct JavaScript fix for profile card overlay issues
    document.addEventListener('DOMContentLoaded', function() {
        // Hide all captions initially
        var allCaptions = document.querySelectorAll('.profile-card .caption');
        allCaptions.forEach(function(caption) {
            caption.style.bottom = '-100%';
        });
        
        // Add event listeners to all profile cards
        var profileCards = document.querySelectorAll('.profile-card');
        profileCards.forEach(function(card) {
            // On mouse enter
            card.addEventListener('mouseenter', function() {
                var caption = this.querySelector('.caption');
                if (caption) {
                    caption.style.bottom = '0';
                }
            });
            
            // On mouse leave
            card.addEventListener('mouseleave', function() {
                var caption = this.querySelector('.caption');
                if (caption) {
                    caption.style.bottom = '-100%';
                }
            });
        });
        
        // Ensure captions are reset when clicking elsewhere
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.profile-card')) {
                allCaptions.forEach(function(caption) {
                    caption.style.bottom = '-100%';
                });
            }
        });
        
        // Re-apply this when toggling between teams
        document.querySelectorAll('.year-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                setTimeout(function() {
                    // Re-hide all captions
                    document.querySelectorAll('.profile-card .caption').forEach(function(caption) {
                        caption.style.bottom = '-100%';
                    });
                }, 50);
            });
        });
    });
</script>
'@

# 5. Add the JS card fix to the end of the body
$bodyClosingTag = '</body>'
$content = $content -replace $bodyClosingTag, "$jsCardFix$bodyClosingTag"

# 6. Save the updated content back to Team.html
Write-Host "Applying direct fix to Team.html..."
$content | Set-Content -Path "Team.html" -Force

Write-Host "Direct profile card fix has been applied! This should resolve the overlay issues." -ForegroundColor Green 