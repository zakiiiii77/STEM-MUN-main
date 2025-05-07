# Simple Team Upgrade Script
# This script injects enhanced CSS and JS into Team.html

# 1. Check if we're in the right directory
if (-not (Test-Path -Path "Team.html")) {
    Write-Host "Error: Team.html not found in current directory" -ForegroundColor Red
    exit 1
}

# 2. Create a backup of Team.html
Write-Host "Creating backup of Team.html..."
Copy-Item -Path "Team.html" -Destination "Team-original-backup.html" -Force

# 3. Read the current Team.html file
$content = Get-Content -Path "Team.html" -Raw

# 4. Add enhanced CSS links to head section
Write-Host "Adding enhanced CSS links..."
$css = @'
<link type="text/css" rel="stylesheet" href="css/team-enhanced.css" />
    <link type="text/css" rel="stylesheet" href="css/variables.css" />
    <link type="text/css" rel="stylesheet" href="css/cta-section.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css" />
'@

$content = $content.Replace('<link rel="icon" type="image/png" href="icon.svg" />', 
                           '<link rel="icon" type="image/png" href="icon.svg" />' + "`r`n" + $css)

# 5. Add enhanced JS before closing body tag
Write-Host "Adding enhanced JS scripts..."
$js = @'
    <script src="https://unpkg.com/scrollreveal"></script>
    <script src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js"></script>
    <script src="js/team-enhancements.js"></script>
    <script src="js/team-animations.js"></script>
    <script>
        // Initialize AOS animations
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    </script>
'@

$content = $content.Replace('</body>', $js + "`r`n" + '</body>')

# 6. Save the modified content back to Team.html
Write-Host "Saving changes to Team.html..."
$content | Set-Content -Path "Team.html" -Force

Write-Host "Success! Team.html has been enhanced with modern design elements while preserving all board members." -ForegroundColor Green
Write-Host "A backup of the original file was saved as Team-original-backup.html" 