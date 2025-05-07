# PowerShell script to update social icons in all HTML files
$htmlFiles = Get-ChildItem -Path . -Filter "*.html"

foreach ($file in $htmlFiles) {
    Write-Host "Processing $($file.Name)..."
    
    # Read file content
    $content = Get-Content -Path $file.FullName -Raw
    
    # Update Facebook icon
    $content = $content -replace '<a href="#"><i class="fa fa-facebook"></i></a>', '<a href="#"><i class="fa fa-facebook fa-brands fab fa-facebook-f"></i></a>'
    
    # Update Twitter icon
    $content = $content -replace '<a href="#"><i class="fa fa-twitter"></i></a>', '<a href="#"><i class="fa fa-twitter fa-brands fab fa-twitter"></i></a>'
    
    # Update Instagram icon
    $content = $content -replace '<a href="#"><i class="fa fa-instagram"></i></a>', '<a href="#"><i class="fa fa-instagram fa-brands fab fa-instagram"></i></a>'
    
    # Update LinkedIn icon
    $content = $content -replace '<a href="#"><i class="fa fa-linkedin"></i></a>', '<a href="#"><i class="fa fa-linkedin fa-brands fab fa-linkedin-in"></i></a>'
    
    # Update YouTube icon
    $content = $content -replace '<a href="#"><i class="fa fa-youtube"></i></a>', '<a href="#"><i class="fa fa-youtube fa-brands fab fa-youtube"></i></a>'
    
    # Update contact info icons
    $content = $content -replace '<i class="fa fa-map-marker"></i>', '<i class="fa fa-map-marker fa-solid fas fa-map-marker-alt"></i>'
    $content = $content -replace '<i class="fa fa-envelope"></i>', '<i class="fa fa-envelope fa-solid fas fa-envelope"></i>'
    $content = $content -replace '<i class="fa fa-phone"></i>', '<i class="fa fa-phone fa-solid fas fa-phone"></i>'
    
    # Save the updated content back to the file
    $content | Set-Content -Path $file.FullName
    
    Write-Host "Updated social icons in $($file.Name)"
}

Write-Host "Social icons updated in all HTML files." 