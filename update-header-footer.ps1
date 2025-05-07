param (
    [switch]$DryRun = $false
)

# Get all HTML files
$htmlFiles = Get-ChildItem -Path . -Filter "*.html" -File

# Count total files
$totalFiles = $htmlFiles.Count
$processedFiles = 0

# Display operation mode
if ($DryRun) {
    Write-Host "RUNNING IN DRY RUN MODE - No changes will be made" -ForegroundColor Yellow
} else {
    Write-Host "RUNNING IN LIVE MODE - Changes will be applied" -ForegroundColor Green
}

# Process each HTML file
foreach ($file in $htmlFiles) {
    $processedFiles++
    $filePath = $file.FullName
    $fileName = $file.Name
    
    # Skip processing for header.html to avoid recursion
    if ($fileName -eq "header.html" -or $fileName -eq "footer.html" -or $fileName -eq "event-menu.html") {
        Write-Host "[$processedFiles/$totalFiles] Skipping $fileName (template file)" -ForegroundColor Gray
        continue
    }
    
    Write-Host "[$processedFiles/$totalFiles] Processing $fileName..." -ForegroundColor Cyan
    
    # Read the file content
    $content = Get-Content -Path $filePath -Raw
    
    # Make a backup of the original content for comparison
    $originalContent = $content
    
    # Add preload-header.js before </head> if not already present
    if (-not $content.Contains('src="js/preload-header.js"')) {
        $content = $content -replace '(?i)(</head>)', '    <script src="js/preload-header.js"></script>
$1'
    }
    
    # Add fast-preloader.js before </head> if not already present
    if (-not $content.Contains('src="js/fast-preloader.js"')) {
        $content = $content -replace '(?i)(</head>)', '    <script src="js/fast-preloader.js"></script>
$1'
    }
    
    # Add fix-header-color.js before </head> if not already present
    if (-not $content.Contains('src="js/fix-header-color.js"')) {
        $content = $content -replace '(?i)(</head>)', '    <script src="js/fix-header-color.js"></script>
$1'
    }
    
    # Add header placeholder after <body> if not already present
    if (-not $content.Contains('<div id="header-placeholder"></div>')) {
        $content = $content -replace '(?i)(<body[^>]*>)', '$1
  <!-- Header Placeholder -->
  <div id="header-placeholder"></div>'
    }

    # Add include-header.js before </body> if not already present
    # Make sure it's not deferred or async for faster loading
    if ($content.Contains('src="js/include-header.js" defer')) {
        $content = $content -replace 'src="js/include-header.js" defer', 'src="js/include-header.js"'
    } elseif ($content.Contains('src="js/include-header.js" async')) {
        $content = $content -replace 'src="js/include-header.js" async', 'src="js/include-header.js"'
    } elseif (-not $content.Contains('src="js/include-header.js"')) {
        $content = $content -replace '(?i)(</body>)', '  <script src="js/include-header.js"></script>
$1'
    }
    
    # If content changed and not in dry run mode, save the file
    if ($content -ne $originalContent) {
        if (-not $DryRun) {
            $content | Set-Content -Path $filePath -Encoding UTF8
            Write-Host "  Updated $fileName" -ForegroundColor Green
        } else {
            Write-Host "  Would update $fileName (dry run)" -ForegroundColor Yellow
        }
    } else {
        Write-Host "  No changes needed for $fileName" -ForegroundColor Gray
    }
}

Write-Host "`nProcessed $totalFiles HTML files." -ForegroundColor Cyan
if ($DryRun) {
    Write-Host "DRY RUN COMPLETE - No changes were made." -ForegroundColor Yellow
} else {
    Write-Host "UPDATES COMPLETE - All HTML files have been processed." -ForegroundColor Green
} 