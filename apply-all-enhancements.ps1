# Master Enhancement Script for Team Page
# This script applies all enhancements in sequence

Write-Host "=== APPLYING ALL ADVANCED ENHANCEMENTS TO MEET THE BOARD PAGE ===" -ForegroundColor Cyan
Write-Host ""

# Create a backup of the original file
Write-Host "Creating backup of original Team.html..." -ForegroundColor Green
Copy-Item -Path "Team.html" -Destination "Team-original-backup.html" -Force

# Step 1: Apply the advanced styling with 3D effects
Write-Host "Step 1: Applying advanced 3D styling..." -ForegroundColor Yellow
& powershell -ExecutionPolicy Bypass -File advanced-team-style.ps1

# Step 2: Enhance the main title
Write-Host "Step 2: Enhancing the main title..." -ForegroundColor Yellow
& powershell -ExecutionPolicy Bypass -File enhance-team-title.ps1

# Step 3: Add scroll animations
Write-Host "Step 3: Adding scroll animations..." -ForegroundColor Yellow
& powershell -ExecutionPolicy Bypass -File add-scroll-animations.ps1

Write-Host ""
Write-Host "=== ALL ENHANCEMENTS APPLIED SUCCESSFULLY ===" -ForegroundColor Green
Write-Host "The Meet The Board page now features:"
Write-Host "• Advanced 3D card effects with dynamic tilt"
Write-Host "• Animated title with character-by-character animation"
Write-Host "• Scroll-triggered reveal animations"
Write-Host "• Particle background effects"
Write-Host "• Interactive hover states"
Write-Host "• Scroll progress indicator"
Write-Host "• Smooth scrolling and back-to-top button"
Write-Host ""
Write-Host "See ADVANCED-STYLING-GUIDE.md for complete documentation." -ForegroundColor Cyan 