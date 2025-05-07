# PowerShell script to update CSS and JS links in all HTML files
$htmlFiles = Get-ChildItem -Path . -Filter "*.html" | Where-Object { $_.Name -ne "index.html" -and $_.Name -ne "contact.html" }

foreach ($file in $htmlFiles) {
    Write-Host "Processing $($file.Name)..."
    
    # Read file content
    $content = Get-Content -Path $file.FullName -Raw
    
    # Check for header.css
    if ($content -notmatch '<link[^>]*href="css/header.css"[^>]*>') {
        $headPattern = [regex]::new('</head>', [System.Text.RegularExpressions.RegexOptions]::Singleline)
        $content = $headPattern.Replace($content, '  <link type="text/css" rel="stylesheet" href="css/header.css" />
</head>')
    }
    
    # Check for footer.css
    if ($content -notmatch '<link[^>]*href="css/footer.css"[^>]*>') {
        $headPattern = [regex]::new('</head>', [System.Text.RegularExpressions.RegexOptions]::Singleline)
        $content = $headPattern.Replace($content, '  <link type="text/css" rel="stylesheet" href="css/footer.css" />
</head>')
    }
    
    # Check for variables.css
    if ($content -notmatch '<link[^>]*href="css/variables.css"[^>]*>') {
        $headPattern = [regex]::new('</head>', [System.Text.RegularExpressions.RegexOptions]::Singleline)
        $content = $headPattern.Replace($content, '  <link type="text/css" rel="stylesheet" href="css/variables.css" />
</head>')
    }
    
    # Check for animations.css
    if ($content -notmatch '<link[^>]*href="css/animations.css"[^>]*>') {
        $headPattern = [regex]::new('</head>', [System.Text.RegularExpressions.RegexOptions]::Singleline)
        $content = $headPattern.Replace($content, '  <link type="text/css" rel="stylesheet" href="css/animations.css" />
</head>')
    }
    
    # Check for utilities.css
    if ($content -notmatch '<link[^>]*href="css/utilities.css"[^>]*>') {
        $headPattern = [regex]::new('</head>', [System.Text.RegularExpressions.RegexOptions]::Singleline)
        $content = $headPattern.Replace($content, '  <link type="text/css" rel="stylesheet" href="css/utilities.css" />
</head>')
    }
    
    # Check for FontAwesome
    if ($content -notmatch '<link[^>]*href="css/font-awesome.min.css"[^>]*>') {
        $headPattern = [regex]::new('</head>', [System.Text.RegularExpressions.RegexOptions]::Singleline)
        $content = $headPattern.Replace($content, '  <link rel="stylesheet" href="css/font-awesome.min.css" />
</head>')
    }
    
    # Check for main.js
    if ($content -notmatch '<script[^>]*src="js/main.js"[^>]*>') {
        $bodyEndPattern = [regex]::new('</body>', [System.Text.RegularExpressions.RegexOptions]::Singleline)
        $content = $bodyEndPattern.Replace($content, '  <script src="js/main.js"></script>
</body>')
    }
    
    # Check for jQuery
    if ($content -notmatch '<script[^>]*src="js/jquery.min.js"[^>]*>') {
        $bodyEndPattern = [regex]::new('</body>', [System.Text.RegularExpressions.RegexOptions]::Singleline)
        $content = $bodyEndPattern.Replace($content, '  <script src="js/jquery.min.js"></script>
</body>')
    }
    
    # Add dark mode toggle functionality
    if ($content -notmatch 'toggleDark') {
        $bodyEndPattern = [regex]::new('</body>', [System.Text.RegularExpressions.RegexOptions]::Singleline)
        $content = $bodyEndPattern.Replace($content, '  <script>
    // Initialize dark mode toggle if saved in localStorage
    $(document).ready(function() {
      if(localStorage.getItem("dark-mode") === "true") {
        $("body").addClass("dark-mode");
        $("#toggleDark input").prop("checked", true);
      }
    });
  </script>
</body>')
    }
    
    # Save the updated content back to the file
    $content | Set-Content -Path $file.FullName
    
    Write-Host "Updated CSS and JS links in $($file.Name)"
}

Write-Host "CSS and JS links updated in all HTML files." 