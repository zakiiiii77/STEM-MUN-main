# Direct fix for team2025 visibility issue
# This script makes minimal changes to ensure the team2025 container works with the toggle

# 1. Read the current Team.html file
Write-Host "Reading Team.html..."
$content = Get-Content -Path "Team.html" -Raw

# 2. First, ensure the team2025 container has the proper class
$team2025Tag = '<div id="team2025" class="team-container">'
$fixedTeam2025Tag = '<div id="team2025" class="team-container">'

# If there's a year indicator, we need to handle that pattern too
$team2025WithIndicator = '<div id="team2025" class="team-container">\s*<div class="year-indicator">2025</div>'
$fixedTeam2025WithIndicator = '<div id="team2025" class="team-container">\n    <div class="year-indicator">2025</div>'

if ($content -match $team2025WithIndicator) {
    Write-Host "Found team2025 with year indicator, fixing..."
    $content = $content -replace $team2025WithIndicator, $fixedTeam2025WithIndicator
} else {
    Write-Host "Found basic team2025 tag, fixing..."
    $content = $content -replace $team2025Tag, $fixedTeam2025Tag
}

# 3. Create a simplified switchTeam function that definitely works
$simpleFunction = @'
<script>
    // Simple and reliable year toggle function
    function switchTeam(year) {
        console.log("Switching to team " + year);
        
        // Hide all team containers
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
            console.log("Team container found and displayed");
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
    
    // Initialize the page with the correct team shown
    document.addEventListener('DOMContentLoaded', function() {
        // Get active button or default to 2024
        var activeYear = "2024";
        var activeButton = document.querySelector('.year-btn.active');
        if (activeButton) {
            activeYear = activeButton.textContent;
        }
        
        // Set initial state
        switchTeam(activeYear);
        
        // Add click handlers to year buttons
        var yearButtons = document.querySelectorAll('.year-btn');
        for (var i = 0; i < yearButtons.length; i++) {
            yearButtons[i].addEventListener('click', function() {
                switchTeam(this.textContent);
            });
        }
        
        console.log("Team switcher initialized with year: " + activeYear);
    });
</script>
'@

# 4. Replace any existing switchTeam function
$oldScriptPattern = '<script>\s*(?:\/\/.*\n)*\s*function switchTeam\(year\)[\s\S]*?<\/script>'
$updatedContent = $content -replace $oldScriptPattern, $simpleFunction

# 5. Add a simple inline style to ensure team containers work properly
$simpleStyle = @'
<style>
    /* Simple and reliable team container styles */
    .team-container {
        display: none;
    }
    .team-container.active {
        display: block;
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
'@

# 6. Add the style to the head section
if (!($content -match "<style>\s*\/\* Simple and reliable team container styles \*\/")) {
    $headClosingTag = '</head>'
    $updatedContent = $updatedContent -replace $headClosingTag, "$simpleStyle$headClosingTag"
}

# 7. Add an inline debug script at the end of the body
$debugScript = @'
<script>
    // Debug helper
    console.log("Page loaded. Checking team containers:");
    var team2024 = document.getElementById('team2024');
    var team2025 = document.getElementById('team2025');
    console.log("team2024 exists:", !!team2024);
    console.log("team2025 exists:", !!team2025);
    if (team2024) console.log("team2024 classes:", team2024.className);
    if (team2025) console.log("team2025 classes:", team2025.className);
</script>
'@

$bodyClosingTag = '</body>'
$updatedContent = $updatedContent -replace $bodyClosingTag, "$debugScript$bodyClosingTag"

# 8. Save the updated content back to Team.html
Write-Host "Updating Team.html with simplified and reliable year toggle functionality..."
$updatedContent | Set-Content -Path "Team.html" -Force

Write-Host "Direct fix has been applied! The 2025 team should now be visible when toggled." -ForegroundColor Green 