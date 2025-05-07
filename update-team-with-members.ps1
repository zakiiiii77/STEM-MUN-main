# Script to preserve board members while using enhanced design
# This script will create a new file that combines both

# 1. First check if backup exists, if not create one
if (-Not (Test-Path -Path "Team-original.html")) {
    Write-Host "Creating backup of current Team.html..."
    Copy-Item -Path "Team.html" -Destination "Team-original.html" -Force
}

# 2. Extract the team members content from original Team.html
Write-Host "Extracting team members from original file..."
$teamContent = Get-Content -Path "Team-original.html" -Raw

# Use a more specific pattern to find the team content
$yearToggleSection = '<div class="year-toggle">(.*?)</div>'
$startPattern = '<div id="team2024" class="team-container active">'
$endPattern = '<div id="team2025" class="team-container">(.*?)</div>\s*</div>\s*</div>\s*<!-- (Scripts|Modern Footer) -->'

# First try to extract the entire section with both 2024 and 2025 teams
if ($teamContent -match "(?s)$startPattern(.*?)$endPattern") {
    Write-Host "Found team member sections..."
    $memberContent = $startPattern + $matches[1] + '<div id="team2025" class="team-container">' + $matches[2] + '</div></div></div>'
    
    # 3. Read enhanced template
    $enhancedTemplate = Get-Content -Path "Team-enhanced.html" -Raw
    
    # 4. Add the year toggle buttons to the hero section
    $heroSectionPattern = '<div class="team-hero-content">(.*?)</div>'
    $yearToggleButtons = @"
<div class="team-hero-content">$1
    <div class="year-toggle">
        <button class="year-btn active" onclick="switchTeam('2024')">2024</button>
        <button class="year-btn" onclick="switchTeam('2025')">2025</button>
    </div>
</div>
"@
    $enhancedTemplate = $enhancedTemplate -replace "(?s)$heroSectionPattern", $yearToggleButtons
    
    # 5. Add CSS for the team containers
    $cssToAdd = @"
<style>
    .year-toggle {
        margin-top: 30px;
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
        color: #420c02;
    }
    .team-container {
        display: none;
    }
    .team-container.active {
        display: block;
    }
    .team-container-wrapper {
        padding: 100px 0;
        background-color: #f9f9f9;
        position: relative;
    }
    .team-container-wrapper::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 300px;
        height: 300px;
        background: radial-gradient(circle, rgba(66, 12, 2, 0.05), transparent 70%);
        border-radius: 50%;
        z-index: 0;
    }
    .highboard {
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
    }
    .highboard h2 {
        text-align: center;
        margin: 1.5rem;
        position: relative;
        color: #420c02;
        font-size: 2.5rem;
        margin-bottom: 50px;
    }
    .highboard h2 span {
        font-size: 75%;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: -22px;
        width: 100%;
        height: 100%;
        color: rgba(66, 12, 2, 0.15);
    }
    .shelf {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        padding: 2rem 0;
        margin-bottom: 2rem;
    }
    .profile-card {
        background-position: center;
        position: relative;
        width: 240px;
        height: 240px;
        background-color: rgba(220, 216, 204, 0.25);
        padding: 15px;
        border-radius: 50%;
        box-shadow: -5px 8px 45px rgba(0, 0, 0, 0.3);
        transition: all .4s;
        margin: 4rem 1.5rem;
    }
    .profile-card:hover {
        border-radius: 10px;
        height: 260px;
    }
    .profile-card .img {
        position: relative;
        width: 100%;
        height: 100%;
    }
    .profile-card:hover img {
        border-radius: 10px;
        transform: translateY(-80px);
    }
    .img img {
        object-fit: cover;
        object-position: top;
        height: 100%;
        width: 100%;
        border-radius: 50%;
        transition: all .4s;
        z-index: 99;
    }
    .caption {
        text-align: center;
        transform: translateY(-80px);
        opacity: 0;
        pointer-events: none;
        transition: all .5s;
    }
    .profile-card:hover .caption {
        opacity: 1;
        pointer-events: all;
        padding-top: 1rem;
    }
    .caption h3 {
        font-size: 19px;
        font-weight: 600;
        margin: 0;
        color: #420c02;
    }
    .caption p {
        font-size: 12px;
        font-weight: 500;
        margin: 2px 0 12px 0;
        color: #48382f;
    }
    .caption .social-links i {
        font-size: 21px;
        margin: 0 3px;
        cursor: pointer;
        color: #48382f;
        transition: all .4s;
    }
    .caption .social-links i:hover {
        color: #cdb06f;
    }
</style>
"@
    $enhancedTemplate = $enhancedTemplate -replace '</head>', "$cssToAdd`r`n</head>"
    
    # 6. Replace the content in enhanced template
    $enhancedPattern = '<section class="executive-board team-section">.*?</section>\s*<!-- Join Our Team Section -->'
    $replacePattern = '<section class="team-container-wrapper">' + "`r`n" + $memberContent + "`r`n" + '</section>' + "`r`n" + '<!-- Join Our Team Section -->'
    
    $newContent = $enhancedTemplate -replace "(?s)$enhancedPattern", $replacePattern
    
    # 7. Add the team switching JavaScript
    $scriptToAdd = @"
    
    <script>
        function switchTeam(year) {
            document.querySelectorAll('.team-container').forEach(container => {
                container.classList.remove('active');
            });
            document.querySelectorAll('.year-btn').forEach(button => {
                button.classList.remove('active');
            });
            document.getElementById('team' + year).classList.add('active');
            document.querySelector('.year-btn[onclick="switchTeam(\'' + year + '\')"]').classList.add('active');
        }
    </script>
"@
    
    $newContent = $newContent -replace '</body>', "$scriptToAdd`r`n</body>"
    
    # 8. Create new file
    $newContent | Set-Content -Path "Team-combined.html" -Force
    
    Write-Host "Success! Created Team-combined.html with enhanced design and original board members."
    Write-Host "Review the file and if it looks good, rename it to Team.html using:"
    Write-Host "Copy-Item -Path 'Team-combined.html' -Destination 'Team.html' -Force"
} else {
    # Alternative approach: directly extract content between specific elements
    Write-Host "Trying alternative extraction method..."
    
    # Extract team content by looking for the flex-container and the scripts section
    if ($teamContent -match '(?s)<div class="flex-container">(.*?)<!-- Scripts -->') {
        $teamSectionContent = $matches[1]
        
        # 3. Read enhanced template
        $enhancedTemplate = Get-Content -Path "Team-enhanced.html" -Raw
        
        # 4. Update hero section with flex-container content
        $heroSectionPattern = '<div class="team-hero-content">(.*?)</div>'
        $heroReplacement = @"
<div class="team-hero-content">
    <h1 class="team-hero-title" data-aos="fade-up">Meet our Best Team</h1>
    <p class="team-hero-subtitle" data-aos="fade-up" data-aos-delay="200">"Uniting Passion, Knowledge, and Diplomacy for Global Impact"</p>
    <div class="year-toggle">
        <button class="year-btn active" onclick="switchTeam('2024')">2024</button>
        <button class="year-btn" onclick="switchTeam('2025')">2025</button>
    </div>
</div>
"@
        $enhancedTemplate = $enhancedTemplate -replace "(?s)$heroSectionPattern", $heroReplacement
        
        # 5. Add CSS for the team containers (same as before)
        $cssToAdd = @"
<style>
    .year-toggle {
        margin-top: 30px;
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
        color: #420c02;
    }
    .team-container {
        display: none;
    }
    .team-container.active {
        display: block;
    }
    .team-container-wrapper {
        padding: 100px 0;
        background-color: #f9f9f9;
        position: relative;
    }
    .team-container-wrapper::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 300px;
        height: 300px;
        background: radial-gradient(circle, rgba(66, 12, 2, 0.05), transparent 70%);
        border-radius: 50%;
        z-index: 0;
    }
    .highboard {
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
    }
    .highboard h2 {
        text-align: center;
        margin: 1.5rem;
        position: relative;
        color: #420c02;
        font-size: 2.5rem;
        margin-bottom: 50px;
    }
    .highboard h2 span {
        font-size: 75%;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: -22px;
        width: 100%;
        height: 100%;
        color: rgba(66, 12, 2, 0.15);
    }
    .shelf {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        padding: 2rem 0;
        margin-bottom: 2rem;
    }
    .profile-card {
        background-position: center;
        position: relative;
        width: 240px;
        height: 240px;
        background-color: rgba(220, 216, 204, 0.25);
        padding: 15px;
        border-radius: 50%;
        box-shadow: -5px 8px 45px rgba(0, 0, 0, 0.3);
        transition: all .4s;
        margin: 4rem 1.5rem;
    }
    .profile-card:hover {
        border-radius: 10px;
        height: 260px;
    }
    .profile-card .img {
        position: relative;
        width: 100%;
        height: 100%;
    }
    .profile-card:hover img {
        border-radius: 10px;
        transform: translateY(-80px);
    }
    .img img {
        object-fit: cover;
        object-position: top;
        height: 100%;
        width: 100%;
        border-radius: 50%;
        transition: all .4s;
        z-index: 99;
    }
    .caption {
        text-align: center;
        transform: translateY(-80px);
        opacity: 0;
        pointer-events: none;
        transition: all .5s;
    }
    .profile-card:hover .caption {
        opacity: 1;
        pointer-events: all;
        padding-top: 1rem;
    }
    .caption h3 {
        font-size: 19px;
        font-weight: 600;
        margin: 0;
        color: #420c02;
    }
    .caption p {
        font-size: 12px;
        font-weight: 500;
        margin: 2px 0 12px 0;
        color: #48382f;
    }
    .caption .social-links i {
        font-size: 21px;
        margin: 0 3px;
        cursor: pointer;
        color: #48382f;
        transition: all .4s;
    }
    .caption .social-links i:hover {
        color: #cdb06f;
    }
    
    /* Additional styles for team sections */
    #team2024, #team2025 {
        max-width: 1200px;
        margin: 0 auto;
    }

    @media only screen and (max-width: 767px) {
        .profile-card {
            width: 200px;
            height: 200px;
            margin: 2rem 1rem;
        }
        .year-btn {
            padding: 8px 20px;
            font-size: 16px;
        }
    }
</style>
"@
        $enhancedTemplate = $enhancedTemplate -replace '</head>', "$cssToAdd`r`n</head>"
        
        # 6. Replace the team section in enhanced template
        $enhancedPattern = '<section class="executive-board team-section">.*?</section>\s*<!-- Join Our Team Section -->'
        
        # Process team content by removing flex-container start/end and adding container wrapper
        $styleRemoved = $teamSectionContent -replace '<style>.*?</style>', ''
        $teamContent = '<section class="team-container-wrapper">' + $styleRemoved + '</section>'
        
        $newContent = $enhancedTemplate -replace "(?s)$enhancedPattern", $teamContent + "`r`n" + '<!-- Join Our Team Section -->'
        
        # 7. Add the team switching JavaScript
        $scriptToAdd = @"
    
    <script>
        function switchTeam(year) {
            document.querySelectorAll('.team-container').forEach(container => {
                container.classList.remove('active');
            });
            document.querySelectorAll('.year-btn').forEach(button => {
                button.classList.remove('active');
            });
            document.getElementById('team' + year).classList.add('active');
            document.querySelector('.year-btn[onclick="switchTeam(\'' + year + '\')"]').classList.add('active');
        }
    </script>
"@
        
        $newContent = $newContent -replace '</body>', "$scriptToAdd`r`n</body>"
        
        # 8. Create new file
        $newContent | Set-Content -Path "Team-combined.html" -Force
        
        Write-Host "Success! Created Team-combined.html with enhanced design and original board members."
        Write-Host "Review the file and if it looks good, rename it to Team.html using:"
        Write-Host "Copy-Item -Path 'Team-combined.html' -Destination 'Team.html' -Force"
    } else {
        Write-Host "Error: Could not extract team content using either method."
    }
}

Write-Host "Done!" 