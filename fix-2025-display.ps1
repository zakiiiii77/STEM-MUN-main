# Fix for the 2025 team display issues
# This script focuses purely on fixing the visual display of the 2025 team

# 1. Read the current Team.html file
Write-Host "Reading Team.html..."
$content = Get-Content -Path "Team.html" -Raw

# 2. Add forceful display styles for the team2025 container
$forceDisplayStyle = @'
<style>
    /* Force correct display of team containers */
    #team2025 {
        opacity: 1 !important;
        visibility: visible !important;
    }
    
    #team2025.active {
        display: block !important;
    }
    
    #team2025 .highboard {
        display: block !important;
        visibility: visible !important;
    }
    
    #team2025 .shelf {
        display: flex !important;
        flex-wrap: wrap !important;
        justify-content: center !important;
        gap: 20px !important;
        margin-bottom: 60px !important;
    }
    
    #team2025 .profile-card {
        visibility: visible !important;
        opacity: 1 !important;
    }
    
    /* Fix for the Secretariat Board header */
    #team2025 h2 {
        font-size: 2.5rem !important;
        color: #580D00 !important;
        margin-bottom: 40px !important;
        text-align: center !important;
        position: relative !important;
        padding-bottom: 15px !important;
        font-weight: 700 !important;
    }
    
    #team2025 h2::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 80px;
        height: 3px;
        background: linear-gradient(to right, #580D00, #CDB06F);
        border-radius: 3px;
    }
    
    #team2025 h2 span {
        display: block;
        font-size: 1.1rem;
        color: #CDB06F;
        margin-bottom: 5px;
        font-weight: normal;
    }
    
    /* Direct manual team switcher function that works with any HTML structure */
    function manual2025Switch() {
        // Force hide the 2024 team
        document.getElementById('team2024').style.display = 'none';
        document.getElementById('team2024').classList.remove('active');
        
        // Force show the 2025 team
        var team2025 = document.getElementById('team2025');
        team2025.style.display = 'block';
        team2025.classList.add('active');
        team2025.style.opacity = '1';
        team2025.style.visibility = 'visible';
        
        // Update button states
        var buttons = document.querySelectorAll('.year-btn');
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i].textContent === '2025') {
                buttons[i].classList.add('active');
            } else {
                buttons[i].classList.remove('active');
            }
        }
    }
</style>
'@

# 3. Add the force display style to the head section
$headClosingTag = '</head>'
if (!($content -match "Force correct display of team containers")) {
    $content = $content -replace $headClosingTag, "$forceDisplayStyle$headClosingTag"
}

# 4. Replace any onclick handlers on the 2025 button with a direct function call
$button2025Pattern = '<button class="year-btn"[^>]*?>2025</button>'
$updatedButton2025 = '<button class="year-btn" onclick="manual2025Switch()">2025</button>'
$content = $content -replace $button2025Pattern, $updatedButton2025

# 5. Add direct JavaScript code to the end of the body to run on click
$directScript = @'
<script>
    // Direct manipulation for the 2025 team
    function manual2025Switch() {
        console.log("Direct switch to 2025 team");
        
        // Hide 2024 team
        var team2024 = document.getElementById('team2024');
        if (team2024) {
            team2024.style.display = 'none';
            team2024.classList.remove('active');
        }
        
        // Show 2025 team with full force
        var team2025 = document.getElementById('team2025');
        if (team2025) {
            team2025.style.display = 'block';
            team2025.classList.add('active');
            team2025.style.opacity = '1';
            team2025.style.visibility = 'visible';
            
            // Also make sure all children are visible
            var highboard = team2025.querySelector('.highboard');
            if (highboard) {
                highboard.style.display = 'block';
                highboard.style.visibility = 'visible';
            }
            
            var shelves = team2025.querySelectorAll('.shelf');
            shelves.forEach(function(shelf) {
                shelf.style.display = 'flex';
                shelf.style.flexWrap = 'wrap';
                shelf.style.justifyContent = 'center';
                shelf.style.gap = '20px';
            });
            
            var cards = team2025.querySelectorAll('.profile-card');
            cards.forEach(function(card) {
                card.style.visibility = 'visible';
                card.style.opacity = '1';
            });
            
            // Make it visible regardless of what other scripts might do
            setTimeout(function() {
                team2025.style.display = 'block';
                team2025.style.opacity = '1';
                team2025.style.visibility = 'visible';
            }, 100);
        }
        
        // Update button states
        var buttons = document.querySelectorAll('.year-btn');
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i].textContent === '2025') {
                buttons[i].classList.add('active');
            } else {
                buttons[i].classList.remove('active');
            }
        }
    }
    
    // Add an extra click handler to the 2025 button
    document.addEventListener('DOMContentLoaded', function() {
        var btn2025 = document.querySelector('.year-btn:nth-child(2)');
        if (btn2025) {
            btn2025.addEventListener('click', manual2025Switch);
        }
    });
</script>
'@

# 6. Add the direct script to the end of the body
$bodyClosingTag = '</body>'
$content = $content -replace $bodyClosingTag, "$directScript$bodyClosingTag"

# 7. Save the updated content back to Team.html
Write-Host "Updating Team.html with forced 2025 team display fix..."
$content | Set-Content -Path "Team.html" -Force

Write-Host "2025 team display fix has been applied! The 2025 team should now display correctly when toggled." -ForegroundColor Green 