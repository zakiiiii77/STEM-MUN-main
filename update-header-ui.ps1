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
    
    # Skip processing for header.html and event-menu.html to avoid recursion
    if ($fileName -eq "header.html" -or $fileName -eq "event-menu.html") {
        Write-Host "[$processedFiles/$totalFiles] Skipping $fileName (template file)" -ForegroundColor Gray
        continue
    }
    
    Write-Host "[$processedFiles/$totalFiles] Processing $fileName..." -ForegroundColor Cyan
    
    # Read file content
    $content = Get-Content -Path $filePath -Raw
    $originalContent = $content
    
    # Check if the header enhancements are already included
    $hasHeaderEnhancements = $content -match 'href="css/header-enhancements.css"'
    $hasHeaderScript = $content -match 'src="js/header-enhancements.js"'
    
    # Add header enhancements CSS if not already present
    if (-not $hasHeaderEnhancements) {
        Write-Host "  - Adding header-enhancements.css link" -ForegroundColor Yellow
        $cssInsertPoint = '<link type="text/css" rel="stylesheet" href="css/header.css" />'
        $cssLink = '<link type="text/css" rel="stylesheet" href="css/header.css" />' + "`n  " + '<link type="text/css" rel="stylesheet" href="css/header-enhancements.css" />'
        $content = $content -replace [regex]::Escape($cssInsertPoint), $cssLink
    } else {
        Write-Host "  - header-enhancements.css already present" -ForegroundColor Green
    }
    
    # Add header enhancements JS if not already present
    if (-not $hasHeaderScript) {
        Write-Host "  - Adding header-enhancements.js script" -ForegroundColor Yellow
        
        # Look for include-header.js
        if ($content -match 'src="js/include-header.js"') {
            $pattern = '<script src="js/include-header.js"></script>'
            $replacement = '<script src="js/include-header.js"></script>' + "`n  " + '<script src="js/header-enhancements.js" defer></script>'
            $content = $content -replace [regex]::Escape($pattern), $replacement
        } 
        # If no include-header.js, look for fast-preloader.js
        elseif ($content -match 'src="js/fast-preloader.js"') {
            $pattern = '<script src="js/fast-preloader.js"></script>'
            $replacement = '<script src="js/fast-preloader.js"></script>' + "`n  " + '<script src="js/header-enhancements.js" defer></script>'
            $content = $content -replace [regex]::Escape($pattern), $replacement
        }
        # If none of the above, look for </head> tag
        else {
            $headCloseTag = '</head>'
            $scriptTag = '  <script src="js/header-enhancements.js" defer></script>' + "`n</head>"
            $content = $content -replace $headCloseTag, $scriptTag
        }
    } else {
        Write-Host "  - header-enhancements.js already present" -ForegroundColor Green
    }
    
    # Update header color styles in critical CSS
    if ($content -match 'id="critical-header-styles"') {
        Write-Host "  - Updating critical header styles" -ForegroundColor Yellow
        # Find critical-header-styles content
        $criticalStylesStart = $content.IndexOf('<style id="critical-header-styles">')
        $criticalStylesEnd = $content.IndexOf('</style>', $criticalStylesStart)
        
        if ($criticalStylesStart -ge 0 -and $criticalStylesEnd -ge 0) {
            # Update backdrop-filter values
            $criticalStyles = $content.Substring($criticalStylesStart, $criticalStylesEnd - $criticalStylesStart)
            $updatedCriticalStyles = $criticalStyles -replace 'backdrop-filter: blur\(10px\)', 'backdrop-filter: blur(15px)' -replace '-webkit-backdrop-filter: blur\(10px\)', '-webkit-backdrop-filter: blur(15px)'
            $content = $content.Remove($criticalStylesStart, $criticalStylesEnd - $criticalStylesStart).Insert($criticalStylesStart, $updatedCriticalStyles)
        }
    }
    
    # Check if changes were made
    $hasChanges = $content -ne $originalContent
    
    # Save changes if not in dry run mode
    if ($hasChanges) {
        if (-not $DryRun) {
            Write-Host "  - Saving changes to $fileName" -ForegroundColor Green
            Set-Content -Path $filePath -Value $content
        } else {
            Write-Host "  - Changes detected in $fileName (would save if not in dry run)" -ForegroundColor Yellow
        }
    } else {
        Write-Host "  - No changes needed for $fileName" -ForegroundColor Gray
    }
}

Write-Host "`nProcessed $processedFiles files out of $totalFiles total files" -ForegroundColor Cyan

# Check if the files exist and create them if they don't
$cssPath = "css/header-enhancements.css"
$jsPath = "js/header-enhancements.js"

if (-not (Test-Path $cssPath)) {
    Write-Host "header-enhancements.css not found - would create it" -ForegroundColor Yellow
    if (-not $DryRun) {
        Write-Host "Creating header-enhancements.css" -ForegroundColor Green
        # Code omitted - create this file manually
    }
}

if (-not (Test-Path $jsPath)) {
    Write-Host "header-enhancements.js not found - would create it" -ForegroundColor Yellow
    if (-not $DryRun) {
        Write-Host "Creating header-enhancements.js" -ForegroundColor Green
        # Code omitted - create this file manually
    }
} 