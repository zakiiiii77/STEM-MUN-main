/**
 * STEM MUN Header Color Fix
 * This script ensures the header maintains the correct maroon color scheme
 * and doesn't inherit any blue Bootstrap colors.
 */

(function() {
  // Function to fix header colors with !important flags for maximum override
  function fixHeaderColors() {
    // Target all potential elements that could have bootstrap blue colors
    const elementsToFix = [
      'header', 
      '#nav', 
      '.navbar', 
      '.nav', 
      '.navbar-default',
      '.navbar-nav > .active > a',
      '.dropdown-menu > .active > a',
      '.navbar-default .navbar-nav > .active > a',
      '.navbar-default .navbar-nav > .active > a:focus',
      '.navbar-default .navbar-nav > .active > a:hover'
    ];
    
    // Apply styles as element attributes for maximum specificity
    elementsToFix.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        // Fix for header and navbar
        if (selector.includes('header') || selector.includes('nav') || selector.includes('navbar')) {
          el.setAttribute('style', el.getAttribute('style') + '; background-color: var(--primary-color) !important; background: rgba(66, 12, 2, 0.85) !important; backdrop-filter: blur(10px) !important; -webkit-backdrop-filter: blur(10px) !important;');
        }
        
        // Fix for dropdown menu items
        if (selector.includes('dropdown') || selector.includes('active')) {
          el.setAttribute('style', el.getAttribute('style') + '; background-color: var(--secondary-warm) !important; color: var(--neutral-color) !important;');
        }
      });
    });
    
    // Fix for scrolled header - special treatment
    const scrolledElements = document.querySelectorAll('header.scrolled, #nav.fixed-nav');
    scrolledElements.forEach(el => {
      el.setAttribute('style', el.getAttribute('style') + '; background-color: rgba(66, 12, 2, 0.98) !important; background: rgba(66, 12, 2, 0.98) !important; backdrop-filter: blur(15px) !important; -webkit-backdrop-filter: blur(15px) !important;');
    });
    
    // Also inject a style element with maximum-specificity styles
    if (!document.getElementById('header-fix-styles')) {
      const styleEl = document.createElement('style');
      styleEl.id = 'header-fix-styles';
      styleEl.innerHTML = `
        header, #nav, .navbar, .nav, .navbar-default, 
        body header, body #nav, body .navbar, body .nav, body .navbar-default {
          background-color: var(--primary-color) !important;
          background: rgba(66, 12, 2, 0.85) !important;
          backdrop-filter: blur(10px) !important;
          -webkit-backdrop-filter: blur(10px) !important;
        }
        
        #nav.fixed-nav, header.scrolled,
        body #nav.fixed-nav, body header.scrolled {
          background-color: rgba(66, 12, 2, 0.98) !important;
          background: rgba(66, 12, 2, 0.98) !important;
        }
        
        .dropdown-menu > .active > a, 
        .dropdown-menu > .active > a:focus, 
        .dropdown-menu > .active > a:hover,
        .navbar-default .navbar-nav > .active > a,
        .navbar-default .navbar-nav > .active > a:focus,
        .navbar-default .navbar-nav > .active > a:hover {
          background-color: var(--secondary-warm) !important;
          color: var(--neutral-color) !important;
        }
      `;
      document.head.appendChild(styleEl);
    }
  }
  
  // Apply fixes on DOM ready with immediate execution
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      fixHeaderColors();
      setupOngoingFixes();
    });
  } else {
    // DOM already loaded, apply immediately
    fixHeaderColors();
    setupOngoingFixes();
  }
  
  function setupOngoingFixes() {
    // Set up observation for the header placeholder
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
      const observer = new MutationObserver((mutations) => {
        fixHeaderColors();
      });
      observer.observe(headerPlaceholder, { childList: true, subtree: true });
    }
    
    // Watch for scroll events to fix the header color when scrolled
    window.addEventListener('scroll', () => {
      requestAnimationFrame(fixHeaderColors);
    }, { passive: true });
    
    // Run periodically to ensure styles are applied
    let fixAttempts = 0;
    const fixInterval = setInterval(() => {
      fixHeaderColors();
      fixAttempts++;
      if (fixAttempts >= 15) clearInterval(fixInterval);
    }, 200); // Check more frequently and for a longer period
    
    // Fix colors when window loads, in case other scripts interfere
    window.addEventListener('load', fixHeaderColors);
  }
})(); 