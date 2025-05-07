/**
 * STEM MUN Header Preloader - Improves performance by preloading header content
 */

// Start preloading header as soon as possible
(function() {
  // Paths to try loading the header from
  const paths = [
    'header.html',
    './header.html',
    './partials/header.html'
  ];
  
  // Store the header content in a global variable for faster access
  window.inlineHeader = null;
  
  // Use the fetch API to preload the header
  function preloadHeader() {
    // Try all paths simultaneously and use the first successful one
    Promise.any(paths.map(path => 
      fetch(path, { cache: 'no-store' })
        .then(response => {
          if (!response.ok) throw new Error(`Failed to load ${path}`);
          return response.text();
        })
        .then(data => {
          // Store the header content for immediate use
          window.inlineHeader = data;
          return { path, data };
        })
        .catch(() => null)
    )).then(result => {
      if (result) {
        console.log(`Header preloaded from ${result.path}`);
      }
    }).catch(() => {
      console.warn('Header preloading failed for all paths');
    });
  }
  
  // Start preloading immediately
  preloadHeader();
})(); 