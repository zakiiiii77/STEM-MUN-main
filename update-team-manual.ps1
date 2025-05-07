# Manual approach to combine Team.html with enhanced UI
# This script will create backups and apply the team page update

# 1. First, make backups if they don't exist
if (-Not (Test-Path -Path "Team-original.html")) {
    Write-Host "Creating backup of original Team.html..."
    Copy-Item -Path "Team.html" -Destination "Team-original.html" -Force
}

if (-Not (Test-Path -Path "Team-enhanced-backup.html")) {
    Write-Host "Creating backup of Team-enhanced.html..."
    Copy-Item -Path "Team-enhanced.html" -Destination "Team-enhanced-backup.html" -Force
}

# 2. Now, copy Team-enhanced.html to Team.html to get the enhanced design
Write-Host "Applying the enhanced design to Team.html..."
Copy-Item -Path "Team-enhanced.html" -Destination "Team.html" -Force

# 3. Let the user know what to do next
Write-Host "Success! The enhanced team page design has been applied."
Write-Host ""
Write-Host "IMPORTANT: You now need to manually copy your board members from Team-original.html"
Write-Host "and paste them into the new Team.html file, replacing the placeholder team members."
Write-Host ""
Write-Host "Both files have been backed up so you can safely make changes."
Write-Host "- Team-original.html: Contains your original board members"
Write-Host "- Team-enhanced-backup.html: Contains the original enhanced design"
Write-Host ""
Write-Host "Done!" 