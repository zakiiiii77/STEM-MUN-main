// Script to update all HTML files with the header placeholder and inline fallback
const fs = require('fs');
const path = require('path');

// List of HTML files to skip
const skipFiles = ['header.html', 'partials/header.html'];

// Get all HTML files in the current directory
function getAllHtmlFiles(dir) {
  const files = fs.readdirSync(dir);
  const htmlFiles = [];
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip node_modules and other system directories
      if (file !== 'node_modules' && !file.startsWith('.')) {
        htmlFiles.push(...getAllHtmlFiles(filePath));
      }
    } else if (file.endsWith('.html') && !skipFiles.includes(file) && !skipFiles.includes(filePath)) {
      htmlFiles.push(filePath);
    }
  });
  
  return htmlFiles;
}

// Inline script to add to each HTML file
const inlineScript = `
  <!-- Inline fallback script for header -->
  <script>
    // Wait for the DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
      // Set a timeout to check if the header was loaded by include-header.js
      setTimeout(function() {
        const headerPlaceholder = document.getElementById('header-placeholder');
        if (!headerPlaceholder) return;
        
        const headerContent = headerPlaceholder.innerHTML;
        
        // If the header is still empty or only contains an error message after 2 seconds,
        // add the inline header as fallback
        if (!headerContent || headerContent.includes('Error loading header')) {
          console.log('Using inline header as fallback');
          
          // First try to directly load the header file one more time
          console.log('Attempting direct load of header.html as last resort');
          
          // Try both header paths synchronously as a last resort
          const xhr = new XMLHttpRequest();
          try {
            xhr.open('GET', 'header.html', false); // Synchronous request
            xhr.send();
            if (xhr.status === 200) {
              headerPlaceholder.innerHTML = xhr.responseText;
              console.log('Successfully loaded header.html synchronously');
              initNavFunctionality();
              return;
            }
          } catch(e) {
            console.log('Synchronous XHR for header.html failed:', e);
          }
          
          // Try partials folder if direct path failed
          try {
            xhr.open('GET', 'partials/header.html', false); // Synchronous request
            xhr.send();
            if (xhr.status === 200) {
              headerPlaceholder.innerHTML = xhr.responseText;
              console.log('Successfully loaded partials/header.html synchronously');
              initNavFunctionality();
              return;
            }
          } catch(e) {
            console.log('Synchronous XHR for partials/header.html failed:', e);
          }
          
          // If all dynamic loading attempts fail, use the embedded header
          console.log('All dynamic loading attempts failed. Using hardcoded header.');
          // Load the header inline (copy of the header.html content)
          headerPlaceholder.innerHTML = \`
          <header>
            <nav id="nav" class="navbar nav">
              <div class="navbar-header">
                <div id="svg-icon" class="navbar-brand">
                  <a href="index.html">
                    <img class="logo" src="img/logo.svg" alt="logo" />
                  </a>
                </div>
              </div>
              <div class="nav-collapse">
                <span></span>
              </div>
              <ul class="main-nav nav navbar-nav navbar-right">
                <li><a href="index.html">Home</a></li>
                <li><a href="index.html#about">About</a></li>
                <li class="has-dropdown">
                  <a href="#">Events</a>
                  <ul class="dropdown-menu">
                    <li><a href="events.html">All Events</a></li>
                    <li><a href="conferences.html">Conferences</a></li>
                  </ul>
                </li>
                <li class="has-dropdown">
                  <a href="#">Programs</a>
                  <ul class="dropdown-menu">
                    <li><a href="conferences.html">Conferences</a></li>
                  </ul>
                </li>
                <li><a href="Team.html">Meet The Board</a></li>
                <li><a href="newspaper.html">Newspaper</a></li>
                <li><a href="contact.html">Contact</a></li>
                <li><a href="delegates.html" id="cta">Become a Delegate</a></li>
              </ul>
            </nav>
          </header>
          \`;
          
          // Add active class to current page
          const currentPage = window.location.pathname.split('/').pop() || 'index.html';
          const links = document.querySelectorAll('#nav a');
          
          links.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage) {
              link.parentElement.classList.add('active');
            }
          });
          
          // Initialize navigation functionality
          initNavFunctionalityFallback();
        }
      }, 2000); // Check after 2 seconds
    });
    
    // Function to test if header file is accessible
    function isHeaderAccessible() {
      try {
        const xhr = new XMLHttpRequest();
        xhr.open('HEAD', 'header.html', false);
        xhr.send();
        
        if (xhr.status === 200) {
          console.log('Header file is accessible');
          return true;
        } else {
          console.log('Header file returned status: ' + xhr.status);
          return false;
        }
      } catch(e) {
        console.log('Error checking header accessibility:', e);
        return false;
      }
    }
    
    // Fallback navigation functionality
    function initNavFunctionalityFallback() {
      // Mobile Menu Toggle
      const navCollapse = document.querySelector('.nav-collapse');
      if (navCollapse) {
        navCollapse.addEventListener('click', function() {
          document.getElementById('nav').classList.toggle('open');
          document.body.classList.toggle('nav-open');
        });
      }
      
      // Handle Dropdowns on Mobile
      const dropdownLinks = document.querySelectorAll('.main-nav li.has-dropdown > a');
      dropdownLinks.forEach(link => {
        link.addEventListener('click', function(e) {
          if (window.innerWidth < 768) {
            e.preventDefault();
            this.parentElement.classList.toggle('open');
            const dropdown = this.nextElementSibling;
            if (dropdown.style.display === 'block') {
              dropdown.style.display = 'none';
            } else {
              dropdown.style.display = 'block';
            }
          }
        });
      });
      
      // Fixed header on scroll
      window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
          document.getElementById('nav').classList.add('fixed-nav');
          document.querySelector('header').classList.add('scrolled');
        } else {
          document.getElementById('nav').classList.remove('fixed-nav');
          document.querySelector('header').classList.remove('scrolled');
        }
      });
    }
  </script>
`;

// Process each HTML file
function processHtmlFile(filePath) {
  console.log(`Processing ${filePath}...`);
  
  // Read the file content
  let fileContent = fs.readFileSync(filePath, 'utf8');
  
  // Check if the file already has the header placeholder
  if (fileContent.includes('id="header-placeholder"')) {
    console.log(`  - Header placeholder already exists in ${filePath}`);
  } else {
    // Find the existing header section and replace it with the placeholder
    const headerPattern = /<header[\s\S]*?<\/header>/i;
    
    if (headerPattern.test(fileContent)) {
      fileContent = fileContent.replace(headerPattern, '<div id="header-placeholder"></div>');
      console.log(`  - Replaced existing header with placeholder in ${filePath}`);
    } else {
      // If no header tag found, try to insert after body tag
      const bodyPattern = /<body[^>]*>/i;
      
      if (bodyPattern.test(fileContent)) {
        fileContent = fileContent.replace(bodyPattern, '$&\n  <div id="header-placeholder"></div>');
        console.log(`  - Added header placeholder after body tag in ${filePath}`);
      } else {
        console.log(`  - Could not find suitable location for header placeholder in ${filePath}`);
        return;
      }
    }
  }
  
  // Check if the file already has the inline script
  if (fileContent.includes('Inline fallback script for header')) {
    console.log(`  - Inline fallback script already exists in ${filePath}`);
  } else {
    // Add the inline script before the closing head tag
    const headClosePattern = /<\/head>/i;
    
    if (headClosePattern.test(fileContent)) {
      fileContent = fileContent.replace(headClosePattern, `${inlineScript}\n</head>`);
      console.log(`  - Added inline fallback script to ${filePath}`);
    } else {
      console.log(`  - Could not find </head> tag in ${filePath}`);
      return;
    }
  }
  
  // Check if the file already includes the include-header.js script
  if (fileContent.includes('include-header.js')) {
    console.log(`  - include-header.js script already included in ${filePath}`);
  } else {
    // Find a good position to add the script (before the closing body tag)
    const bodyClosePattern = /<\/body>/i;
    
    if (bodyClosePattern.test(fileContent)) {
      const scriptsToAdd = '\n  <script src="js/include-header.js"></script>';
      fileContent = fileContent.replace(bodyClosePattern, `${scriptsToAdd}\n</body>`);
      console.log(`  - Added include-header.js script to ${filePath}`);
    } else {
      console.log(`  - Could not find </body> tag in ${filePath}`);
      return;
    }
  }
  
  // Save the updated file
  fs.writeFileSync(filePath, fileContent);
  console.log(`  - Successfully updated ${filePath}`);
}

// Main function
function main() {
  try {
    const htmlFiles = getAllHtmlFiles('.');
    console.log(`Found ${htmlFiles.length} HTML files to process`);
    
    htmlFiles.forEach(file => {
      try {
        processHtmlFile(file);
      } catch (err) {
        console.error(`Error processing ${file}:`, err);
      }
    });
    
    console.log('All files processed successfully!');
  } catch (err) {
    console.error('Error:', err);
  }
}

// Run the script
main(); 