# Script to enhance the hero section of Team.html
# This script updates the hero section with a more modern design

# 1. Read the current Team.html file
Write-Host "Reading Team.html..."
$content = Get-Content -Path "Team.html" -Raw

# 2. Create the enhanced hero section HTML
$enhancedHero = @'
<section class="team-hero">
    <div id="particles-js" class="particles-container"></div>
    <div class="team-hero-overlay"></div>
    <!-- Floating Decorative Elements -->
    <div class="hero-floating-shape hero-shape-1"></div>
    <div class="hero-floating-shape hero-shape-2"></div>
    <div class="team-hero-content">
        <h1 class="team-hero-title">Meet our Best Team</h1>
        <p class="team-hero-subtitle">"Uniting Passion, Knowledge, and Diplomacy for Global Impact"</p>
        <div class="year-toggle">
            <button class="year-btn active" onclick="switchTeam('2024')">2024</button>
            <button class="year-btn" onclick="switchTeam('2025')">2025</button>
        </div>
    </div>
</section>
'@

# 3. Find and replace the flex-container with the enhanced hero section
$oldHeroPattern = '<div class="flex-container">.*?</div>\s*<style>'
$newHeroContent = $enhancedHero + "`r`n<style>"

# 4. Perform the replacement using regex
$updatedContent = $content -replace "(?s)$oldHeroPattern", $newHeroContent

# 5. Save the updated content back to Team.html
Write-Host "Updating Team.html with enhanced hero section..."
$updatedContent | Set-Content -Path "Team.html" -Force

Write-Host "Hero section has been successfully enhanced!" -ForegroundColor Green 