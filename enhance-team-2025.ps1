# Script to enhance the 2025 team section appearance
# This script adds special styling and indicators to the 2025 team section

# 1. Read the current Team.html file
Write-Host "Reading Team.html..."
$content = Get-Content -Path "Team.html" -Raw

# 2. Add a year indicator to the 2025 team section
$team2025OpenTag = '<div id="team2025" class="team-container">'
$enhancedTeam2025OpenTag = @'
<div id="team2025" class="team-container">
    <div class="year-indicator">2025</div>
'@

# 3. Replace the opening tag
$content = $content -replace $team2025OpenTag, $enhancedTeam2025OpenTag

# 4. Add additional styling for the team headers in the CSS section
$additionalCSS = @'
    <style>
        /* Enhanced styling for team headers */
        .highboard h2 {
            position: relative;
            margin-bottom: 40px;
            text-align: center;
            font-size: 2.5rem;
            color: var(--primary-color);
            padding-bottom: 15px;
        }
        
        .highboard h2::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 80px;
            height: 3px;
            background: linear-gradient(to right, var(--primary-color), var(--secondary-warm));
            border-radius: 3px;
        }
        
        .highboard h2 span {
            display: block;
            font-size: 1.1rem;
            color: var(--secondary-warm);
            margin-bottom: 5px;
        }
        
        /* Special styling for the 2025 team */
        #team2025 .highboard h2 {
            color: #580D00;
        }
        
        #team2025 .profile-card {
            transform: translateY(0);
            transition: all 0.3s ease;
        }
        
        #team2025 .profile-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        }
    </style>
'@

# 5. Add the additional CSS to the head section
$headClosingTag = '</head>'
$content = $content -replace $headClosingTag, "$additionalCSS$headClosingTag"

# 6. Update the content with the enhanced styling
Write-Host "Updating Team.html with enhanced 2025 team styling..."
$content | Set-Content -Path "Team.html" -Force

Write-Host "2025 team section has been enhanced with special styling!" -ForegroundColor Green 