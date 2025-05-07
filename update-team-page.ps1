# Update Team Page Script
# This script replaces the old Team.html with the enhanced version

# 1. Make a backup of the current Team.html
Write-Host "Creating backup of current Team.html..."
Copy-Item -Path "Team.html" -Destination "Team-original.html" -Force

# 2. Replace Team.html with Team-enhanced.html
Write-Host "Replacing Team.html with enhanced version..."
Copy-Item -Path "Team-enhanced.html" -Destination "Team.html" -Force

# 3. Notify completion
Write-Host "Team page has been updated successfully!"
Write-Host "The original page has been saved as Team-original.html"

Write-Host "Done!" 