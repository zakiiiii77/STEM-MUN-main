# Script to fix the 2025 team display issue
# This script updates the Team.html file to ensure the year toggle works correctly

# 1. Read the current Team.html file
Write-Host "Reading Team.html..."
$content = Get-Content -Path "Team.html" -Raw

# 2. Update the switchTeam function to properly handle year toggles
$improvedSwitchTeamFunction = @'
    <script>
        function switchTeam(year) {
            // Hide all team containers
            document.querySelectorAll('.team-container').forEach(container => {
                container.classList.remove('active');
            });
            
            // Show selected team container
            const selectedContainer = document.getElementById('team' + year);
            if (selectedContainer) {
                selectedContainer.classList.add('active');
                
                // Optionally scroll to the team section
                selectedContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                console.error('Team container for year ' + year + ' not found');
            }
            
            // Update button states
            document.querySelectorAll('.year-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.textContent === year) {
                    btn.classList.add('active');
                }
            });
            
            // Reset any animations if needed
            if (typeof AOS !== 'undefined') {
                setTimeout(() => {
                    AOS.refresh();
                }, 300);
            }
        }
        
        // Add event listeners for year buttons
        document.addEventListener('DOMContentLoaded', function() {
            const yearButtons = document.querySelectorAll('.year-btn');
            yearButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    switchTeam(this.textContent);
                });
            });
        });
    </script>
'@

# 3. Replace the existing switchTeam function
$oldScriptPattern = '<script>\s*function switchTeam\(year\).*?</script>'
$updatedContent = $content -replace "(?s)$oldScriptPattern", $improvedSwitchTeamFunction

# 4. Make sure we have proper CSS for the team containers
$teamContainerCSS = @'
    <style>
        .year-toggle {
            margin-top: 20px;
        }
        .year-btn {
            background: transparent;
            border: 2px solid white;
            color: white;
            padding: 10px 30px;
            margin: 0 10px;
            font-size: 18px;
            cursor: pointer;
            transition: all 0.3s ease;
            border-radius: 25px;
        }
        .year-btn.active {
            background: white;
            color: #5C0000;
        }
        .team-container {
            display: none;
        }
        .team-container.active {
            display: block;
            animation: fadeIn 0.5s ease-in-out;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    </style>
'@

# 5. Replace or update the existing CSS
$oldCSSPattern = '<style>\s*\.year-toggle.*?</style>'
$updatedContent = $updatedContent -replace "(?s)$oldCSSPattern", $teamContainerCSS

# 6. Save the updated content back to Team.html
Write-Host "Updating Team.html with improved year toggle functionality..."
$updatedContent | Set-Content -Path "Team.html" -Force

Write-Host "Year toggle functionality has been fixed! You should now be able to switch between 2024 and 2025 teams." -ForegroundColor Green 