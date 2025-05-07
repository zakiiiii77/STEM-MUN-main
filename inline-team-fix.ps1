# Inline team fix script - adds direct inline styles and script at the top of Team.html
# This ensures the toggle works properly regardless of external CSS or JS

# 1. Read the current Team.html file
Write-Host "Reading Team.html..."
$content = Get-Content -Path "Team.html" -Raw

# 2. Create inline styles and script that will be added at the top of the body
$inlineFix = @'
<!-- Start of inline team toggle fix -->
<style>
    /* Direct inline styles for team containers - overrides everything else */
    .team-container {
        display: none !important;
    }
    .team-container.active {
        display: block !important;
    }
    .year-toggle {
        display: flex;
        justify-content: center;
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
</style>

<script>
    // Immediately executing function to initialize the team toggle
    (function() {
        console.log("Initializing inline team toggle fix");
        
        // Function to switch between teams
        window.directSwitchTeam = function(year) {
            console.log("Direct switch to team " + year);
            
            // Hide all team containers using direct DOM manipulation
            var containers = document.querySelectorAll('.team-container');
            for (var i = 0; i < containers.length; i++) {
                containers[i].style.display = 'none';
                containers[i].classList.remove('active');
            }
            
            // Show the selected team container
            var selectedContainer = document.getElementById('team' + year);
            if (selectedContainer) {
                selectedContainer.style.display = 'block';
                selectedContainer.classList.add('active');
                console.log("Team " + year + " container now visible");
            } else {
                console.error("Team container for year " + year + " not found");
            }
            
            // Update button states
            var buttons = document.querySelectorAll('.year-btn');
            for (var i = 0; i < buttons.length; i++) {
                if (buttons[i].textContent === year) {
                    buttons[i].classList.add('active');
                } else {
                    buttons[i].classList.remove('active');
                }
            }
        }
        
        // Set up event handlers once the DOM is fully loaded
        document.addEventListener('DOMContentLoaded', function() {
            console.log("DOM loaded, setting up direct team toggle handlers");
            
            // Get all year toggle buttons and attach click handlers
            var buttons = document.querySelectorAll('.year-btn');
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].setAttribute('onclick', "directSwitchTeam('" + buttons[i].textContent + "')");
                console.log("Added click handler to button: " + buttons[i].textContent);
            }
            
            // Initialize with the currently active button
            var activeButton = document.querySelector('.year-btn.active');
            if (activeButton) {
                console.log("Found active button: " + activeButton.textContent);
                directSwitchTeam(activeButton.textContent);
            } else {
                console.log("No active button found, defaulting to 2024");
                var defaultButton = document.querySelector('.year-btn');
                if (defaultButton) {
                    defaultButton.classList.add('active');
                    directSwitchTeam(defaultButton.textContent);
                }
            }
        });
    })();
</script>
<!-- End of inline team toggle fix -->
'@

# 3. Add the inline fix at the start of the body
$bodyTag = '<body>'
$content = $content -replace $bodyTag, "$bodyTag$inlineFix"

# 4. Save the updated file
Write-Host "Writing inline fix to Team.html..."
$content | Set-Content -Path "Team.html" -Force

Write-Host "Inline fix has been applied! The team toggle should now work properly regardless of external CSS/JS." -ForegroundColor Green 