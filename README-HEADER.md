# STEM MUN Website Header Management

This document explains how the unified header system works across the STEM MUN website.

## How It Works

The website now uses a centralized header that can be edited in one place and automatically appears on all pages. This makes maintenance easier and ensures consistency across the site.

### Key Components

1. **partials/header.html** - Contains the actual header HTML code
2. **js/include-header.js** - JavaScript that loads the header into each page

## How to Make Changes

### To modify the header on all pages:

1. Edit the `partials/header.html` file
2. Your changes will automatically appear on all pages that use the header

### To add the header to a new page:

1. Add this div where you want the header to appear:
   ```html
   <div id="header-placeholder"></div>
   ```

2. Add the include-header.js script before your closing </body> tag:
   ```html
   <script src="js/include-header.js"></script>
   ```

## Troubleshooting

If you see "Error loading header" on your page:

1. Make sure `partials/header.html` exists
2. Check that the path to include-header.js is correct in your HTML
3. Check your browser's console for specific error messages
4. Verify that your web server is properly serving HTML files
5. **For conference page issues:** We've added a special inline fallback script that will automatically add the header if the dynamic loading fails

### Advanced Troubleshooting

If the header loading issues persist:

1. Open browser developer tools (F12) and look for network errors
2. Check if the header file is being blocked by CORS policy
3. Try adding this inline fallback right after the header placeholder:

```html
<!-- Header Placeholder -->
<div id="header-placeholder"></div>

<!-- Inline Header Fallback -->
<script>
  // Immediately check if the header is loaded
  (function() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    
    if (headerPlaceholder && headerPlaceholder.innerHTML.trim() === '') {
      setTimeout(function() {
        if (headerPlaceholder.innerHTML.trim() === '' || 
            headerPlaceholder.innerHTML.includes('Error loading header')) {
          console.log('Using inline header fallback');
          headerPlaceholder.innerHTML = `
          <!-- Copy the contents of header.html here -->
          `;
        }
      }, 1000); // Check after 1 second
    }
  })();
</script>
```

The system tries several possible paths to find the header:
- header.html (direct in current directory)
- ./header.html (same level explicit)
- ./partials/header.html (same level partials) 
- ../partials/header.html (one level up partials)
- /partials/header.html (root level partials)
- ../header.html (one level up)
- /header.html (root level)

## Benefits

- Consistent navigation across all pages
- Make changes in one place instead of editing each page
- Automatically highlights the current page in the navigation
- Properly handles mobile menu functionality
- Fallback mechanism for reliability

## Technical Details

The system uses the Fetch API to load the header HTML into the placeholder. It automatically tries multiple file paths to find the header, making it more robust. The system also adds the 'active' class to the current page's navigation item.

### Fallback System

The header loading system includes multiple fallback mechanisms:

1. **Primary method:** Fetch API to dynamically load header.html
2. **First fallback:** Multiple path attempts if the first path fails
3. **Secondary fallback:** Synchronous XMLHttpRequest if all fetch attempts fail 
4. **Final fallback:** Embedded header HTML in the page itself

This multi-layered approach ensures that the header will always be displayed, even if there are connectivity or server issues. 