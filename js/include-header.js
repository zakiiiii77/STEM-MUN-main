// JavaScript to include the common header
(function() {
  /**
   * Multi-strategy header loader that uses several approaches to ensure header is displayed:
   * 1. Fast direct loading with multiple path fallbacks
   * 2. Wait for preloaded content from preload-header.js
   * 3. Inline fallback content if all else fails
   * 4. Observer pattern to ensure content is displayed
   */
  
  // Define header fallback HTML that can be used if all loading methods fail
  const headerFallbackHTML = `
  <!-- Common Header for STEM MUN Website -->
  <header style="background-color: var(--primary-color) !important; background: rgba(66, 12, 2, 0.85) !important; backdrop-filter: blur(10px) !important; -webkit-backdrop-filter: blur(10px) !important;">
    <nav id="nav" class="navbar nav" style="background-color: var(--primary-color) !important; background: rgba(66, 12, 2, 0.85) !important; backdrop-filter: blur(10px) !important; -webkit-backdrop-filter: blur(10px) !important;">
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
        <li><a href="events.html">Events</a></li>
        <li><a href="conferences.html">Conferences</a></li>
        <li><a href="Team.html">Meet The Board</a></li>
        <li><a href="newspaper.html">Newspaper</a></li>
        <li><a href="contact.html">Contact</a></li>
        <li><a href="https://mymun.com/conferences/stem-model-united-nations-2025" id="cta" target="_blank">Become a Delegate</a></li>
      </ul>
    </nav>
  </header>`;
  
  // Function to load the header content
  function loadHeader() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (!headerPlaceholder) return false;
    
    // Set a loading indicator immediately
    headerPlaceholder.innerHTML = '<div style="height: 70px; background-color: var(--primary-color); border-bottom: 1px solid rgba(255,255,255,0.1);"></div>';

    // Strategy 1: Try window.inlineHeader from preload-header.js first since it's fastest
    if (window.inlineHeader) {
      headerPlaceholder.innerHTML = window.inlineHeader;
      console.log('Used preloaded header content');
      initNavFunctionality();
      return true;
    }
    
    // Strategy 2: Try multiple paths simultaneously
    const paths = [
      'header.html',
      './header.html',
      './partials/header.html',
      '../header.html',
      '/header.html'
    ];
    
    // Create an array of fetch promises
    const fetchPromises = paths.map(path => 
      fetch(path, { 
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' } 
      })
      .then(response => {
        if (!response.ok) throw new Error(`Failed to load ${path}`);
        return response.text();
      })
      .then(data => ({ path, data }))
      .catch(() => null) // Suppress errors for individual fetches
    );
    
    // Use Promise.any to get the first successful response
    Promise.any(fetchPromises)
      .then(result => {
        if (result && result.data) {
          headerPlaceholder.innerHTML = result.data;
          console.log(`Header loaded successfully from ${result.path}`);
          initNavFunctionality();
          
          // Also store for future use
          if (!window.inlineHeader) {
            window.inlineHeader = result.data;
          }
        } else {
          throw new Error('All header loading attempts failed');
        }
      })
      .catch(error => {
        console.error('Error loading header:', error);
        
        // Strategy 3: Use inline fallback header if fetch failed
        if (headerPlaceholder.innerHTML.trim() === '' || 
            headerPlaceholder.innerHTML.includes('Error loading') || 
            headerPlaceholder.innerHTML.includes('height: 70px')) {
          headerPlaceholder.innerHTML = headerFallbackHTML;
          console.log('Using inline header fallback due to fetch error');
          initNavFunctionality();
        }
      });
      
    return true;
  }
  
  // Initialize navigation functionality
  function initNavFunctionality() {
    // Mobile Menu Toggle
    const navCollapse = document.querySelector('.nav-collapse');
    if (navCollapse) {
      navCollapse.addEventListener('click', function() {
        const nav = document.getElementById('nav');
        if (nav) {
          nav.classList.toggle('open');
          document.body.classList.toggle('nav-open');
        }
      });
    }
    
    // Fixed header on scroll
    function handleScroll() {
      if (window.scrollY > 50) {
        const nav = document.getElementById('nav');
        const header = document.querySelector('header');
        if (nav) nav.classList.add('fixed-nav');
        if (header) header.classList.add('scrolled');
      } else {
        const nav = document.getElementById('nav');
        const header = document.querySelector('header');
        if (nav) nav.classList.remove('fixed-nav');
        if (header) header.classList.remove('scrolled');
      }
    }
    
    // Use passive event listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Set active class based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.main-nav a');
    
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === 'index.html' && href === './')) {
        link.parentElement.classList.add('active');
      }
    });
  }
  
  // Function to add preloader to all pages
  function addPreloader() {
    // Only add if it doesn't already exist
    if (!document.getElementById('preloader')) {
      const preloaderHTML = `
        <div id="preloader">
          <div class="stars"></div>
          <div class="globe-decoration"></div>
          <div class="shooting-star"></div>
          <div class="shooting-star"></div>
          <div class="shooting-star"></div>
          <div class="earth-container">
            <div class="earth"></div>
            <div class="orbits-container">
              <div class="orbit">
                <div class="satellite"></div>
              </div>
              <div class="orbit">
                <div class="satellite-2"></div>
              </div>
              <div class="orbit">
                <div class="satellite-3"></div>
              </div>
            </div>
          </div>
          <h1>STEM Model United Nations</h1>
          <div class="loading-text">
            Diplomacy in action<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>
          </div>
        </div>
      `;
      
      // Prepend to body
      document.body.insertAdjacentHTML('afterbegin', preloaderHTML);
      
      // Initialize animation sequence
      setTimeout(function() {
        const earth = document.querySelector(".earth");
        if (earth) earth.classList.add("animate-earth");
      }, 300);
      
      setTimeout(function() {
        const satellites = document.querySelectorAll(".satellite, .satellite-2, .satellite-3");
        satellites.forEach(sat => sat.classList.add("animate-satellite"));
      }, 800);
      
      // Fade out preloader when page is fully loaded
      window.addEventListener('load', function() {
        setTimeout(function() {
          const preloader = document.getElementById('preloader');
          if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(function() {
              preloader.style.display = 'none';
            }, 500);
          }
        }, 500);
      });
    }
  }
  
  // Load header with immediate execution and multiple failsafes
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      loadHeader();
      
      // Set a fallback timer in case the header doesn't load
      setTimeout(function() {
        const headerPlaceholder = document.getElementById('header-placeholder');
        if (headerPlaceholder && (headerPlaceholder.innerHTML.trim() === '' || 
            headerPlaceholder.innerHTML.includes('Error loading') || 
            headerPlaceholder.innerHTML.includes('height: 70px'))) {
          headerPlaceholder.innerHTML = headerFallbackHTML;
          console.log('Using header fallback after timeout');
          initNavFunctionality();
        }
      }, 800); // Shorter timeout for faster fallback
    });
  } else {
    // DOM already loaded, apply immediately
    loadHeader();
  }
})(); 