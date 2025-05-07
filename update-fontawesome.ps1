# PowerShell script to add Font Awesome CDN to all HTML files
$htmlFiles = Get-ChildItem -Path . -Filter "*.html"

foreach ($file in $htmlFiles) {
    Write-Host "Processing $($file.Name)..."
    
    # Read file content
    $content = Get-Content -Path $file.FullName -Raw
    
    # Check if Font Awesome CDN is already included
    if ($content -notmatch 'cdnjs\.cloudflare\.com\/ajax\/libs\/font-awesome\/6\.4\.0\/css\/all\.min\.css') {
        $headPattern = [regex]::new('</head>', [System.Text.RegularExpressions.RegexOptions]::Singleline)
        $content = $headPattern.Replace($content, '  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>')
        
        # Save the updated content back to the file
        $content | Set-Content -Path $file.FullName
        
        Write-Host "Added Font Awesome CDN to $($file.Name)"
    } else {
        Write-Host "Font Awesome CDN already exists in $($file.Name)"
    }
}

Write-Host "Font Awesome CDN added to HTML files where needed." 