# Simple Team Page Fix
# This script applies all core fixes to the Meet The Board page

# Read the current Team.html file
Write-Host "Reading Team.html..."
$htmlContent = Get-Content -Path "Team.html" -Raw

# 1. Create a consolidated style block
$styleBlock = @"
<style>
    /* Core fixes for team containers and profile cards */
    .team-container { display: none !important; }
    .team-container.active { display: block !important; opacity: 1 !important; visibility: visible !important; }
    
    #team2025 { display: none !important; }
    #team2025.active { display: block !important; opacity: 1 !important; visibility: visible !important; }
    
    .profile-card { position: relative !important; overflow: hidden !important; }
    .profile-card .caption { position: absolute !important; bottom: 0 !important; left: 0 !important; width: 100% !important; z-index: 99 !important; }
    .profile-card .social-links { transition: opacity 0.3s ease !important; }
    
    /* When hovering on cards, ensure captions are visible */
    .profile-card:hover .caption { opacity: 1 !important; }
    .profile-card:hover .social-links { opacity: 1 !important; }
</style>
"@

# 2. Create a consolidated script for team toggle and profile card functionality
$scriptBlock = @"
<script>
    // Reliable team toggle function
    function reliableSwitchTeam(year) {
        console.log("Switching to team " + year);
        
        // Hide all teams
        var teams = document.querySelectorAll('.team-container');
        teams.forEach(function(team) {
            team.style.display = 'none';
            team.classList.remove('active');
        });
        
        // Show selected team
        var selectedTeam = document.getElementById('team' + year);
        if (selectedTeam) {
            selectedTeam.style.display = 'block';
            selectedTeam.classList.add('active');
            
            // Force visibility for all elements
            selectedTeam.querySelectorAll('.highboard, .shelf, .profile-card').forEach(function(el) {
                el.style.visibility = 'visible';
                el.style.opacity = '1';
            });
        }
        
        // Update button states
        var buttons = document.querySelectorAll('.year-btn');
        buttons.forEach(function(btn) {
            if (btn.textContent === year) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
    
    // Initialize on page load
    document.addEventListener('DOMContentLoaded', function() {
        // Set initial state
        var activeButton = document.querySelector('.year-btn.active');
        if (activeButton) {
            reliableSwitchTeam(activeButton.textContent);
        } else {
            reliableSwitchTeam('2024');
        }
        
        // Add click handlers
        document.querySelectorAll('.year-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                reliableSwitchTeam(this.textContent);
            });
        });
    });
</script>
"@

# 3. Apply the changes to the HTML file
Write-Host "Applying fixes..."

# Create a backup if it doesn't exist
if (-not (Test-Path -Path "Team-backup.html")) {
    Write-Host "Creating backup file..."
    $htmlContent | Out-File -FilePath "Team-backup.html" -Encoding utf8
}

# Add style block before </head>
$htmlContent = $htmlContent -replace "</head>", "$styleBlock`r`n</head>"

# Add script block before </body>
$htmlContent = $htmlContent -replace "</body>", "$scriptBlock`r`n</body>"

# 4. Save the modified content
Write-Host "Saving changes..."
$htmlContent | Out-File -FilePath "Team.html" -Encoding utf8

Write-Host "Fix completed successfully!" 