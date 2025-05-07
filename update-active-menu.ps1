# PowerShell script to update active menu item in each HTML file
$htmlFiles = Get-ChildItem -Path . -Filter "*.html"

foreach ($file in $htmlFiles) {
    Write-Host "Processing $($file.Name)..."
    
    # Read file content
    $content = Get-Content -Path $file.FullName -Raw
    
    # Reset all active classes first
    $content = $content -replace '<li class="active">', '<li>'
    
    # Set the appropriate active class based on filename
    switch ($file.Name) {
        "index.html" {
            $content = $content -replace '<li><a href="#home">Home</a></li>', '<li class="active"><a href="#home">Home</a></li>'
        }
        "contact.html" {
            $content = $content -replace '<li><a href="contact.html">Contact</a></li>', '<li class="active"><a href="contact.html">Contact</a></li>'
        }
        "Team.html" {
            $content = $content -replace '<li><a href="Team.html">Meet The Board</a></li>', '<li class="active"><a href="Team.html">Meet The Board</a></li>'
        }
        "events.html" {
            # For dropdown menus, we need to mark the parent as active
            $content = $content -replace '<li class="has-dropdown">\s*<a href="#">Events</a>', '<li class="has-dropdown active">\s*<a href="#">Events</a>'
        }
        "conferences.html" {
            $content = $content -replace '<li class="has-dropdown">\s*<a href="#">Programs</a>', '<li class="has-dropdown active">\s*<a href="#">Programs</a>'
        }
        "competition.html" {
            $content = $content -replace '<li class="has-dropdown">\s*<a href="#">Programs</a>', '<li class="has-dropdown active">\s*<a href="#">Programs</a>'
        }
        "committees.html" {
            $content = $content -replace '<li class="has-dropdown">\s*<a href="#">Programs</a>', '<li class="has-dropdown active">\s*<a href="#">Programs</a>'
        }
        "delegates.html" {
            $content = $content -replace '<li><a href="delegates.html" id="cta">Become a Delegate</a></li>', '<li class="active"><a href="delegates.html" id="cta">Become a Delegate</a></li>'
        }
        "spark.html" {
            $content = $content -replace '<li class="has-dropdown">\s*<a href="#">Programs</a>', '<li class="has-dropdown active">\s*<a href="#">Programs</a>'
        }
    }
    
    # Save the updated content back to the file
    $content | Set-Content -Path $file.FullName
    
    Write-Host "Updated active menu item in $($file.Name)"
}

Write-Host "Active menu items updated in all HTML files." 