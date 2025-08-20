/**
 * Dynamic Earth Orbit Lazy Loading System
 * A space-themed image loader with interactive orbit animations
 */

// Configuration
const config = {
  // Class names
  lazyClass: 'lazy-image',
  containerClass: 'lazy-image-container',
  loadedClass: 'lazy-loaded',
  
  // Observer settings
  threshold: 0.05,
  rootMargin: '100px 0px',
  
  // Debug mode
  debug: false,
  
  // Loading text
  loadingText: 'Loading orbit data...'
};

// Statistics tracking
const stats = {
  totalImages: 0,
  loadedImages: 0,
  startTime: 0
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  stats.startTime = performance.now();
  initOrbitLazyLoading();
});

/**
 * Initialize the Earth orbit lazy loading system
 */
function initOrbitLazyLoading() {
  // Find all images to be lazy loaded
  const lazyImages = document.querySelectorAll('img[data-src], img[loading="lazy"]:not([data-no-lazy])');
  
  stats.totalImages = lazyImages.length;
  
  if (!lazyImages.length) {
    if (config.debug) console.log('No images to lazy load');
    return;
  }
  
  // Check for Intersection Observer support
  if (!('IntersectionObserver' in window)) {
    loadAllImagesImmediately(lazyImages);
    return;
  }
  
  // Prepare images by adding necessary classes and orbit elements
  prepareImages(lazyImages);
  
  // Create and configure the observer
  const observer = new IntersectionObserver(handleIntersections, {
    rootMargin: config.rootMargin,
    threshold: config.threshold
  });
  
  // Start observing each image
  lazyImages.forEach(image => observer.observe(image));
  
  if (config.debug) {
    console.log(`Earth orbit lazy loading initialized with ${lazyImages.length} images`);
  }
}

/**
 * Prepare images with orbit-themed loading elements
 */
function prepareImages(images) {
  images.forEach(img => {
    // Skip images that should not be lazy loaded
    if (img.hasAttribute('data-no-lazy')) return;
    
    // Add the lazy-image class
    img.classList.add(config.lazyClass);
    
    // Create or use existing container
    let container = img.closest(`.${config.containerClass}`);
    if (!container) {
      container = document.createElement('div');
      container.className = config.containerClass;
      img.parentNode.insertBefore(container, img);
      container.appendChild(img);
    }
    
    // Store the original src in data-src if not already set
    if (img.hasAttribute('loading') && !img.hasAttribute('data-src')) {
      img.dataset.src = img.src;
    }
    
    // Set transparent placeholder
    if (!img.hasAttribute('data-src-processed')) {
      if (!img.hasAttribute('data-src')) {
        img.dataset.src = img.src;
      }
      
      img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
      img.setAttribute('data-src-processed', 'true');
    }
    
    // Create orbit system if it doesn't exist
    if (!container.querySelector('.orbit-system')) {
      // Add orbit system
      const orbitSystem = document.createElement('div');
      orbitSystem.className = 'orbit-system';
      
      // Add orbits
      const orbit1 = document.createElement('div');
      orbit1.className = 'orbit orbit-1';
      
      const orbit2 = document.createElement('div');
      orbit2.className = 'orbit orbit-2';
      
      // Add satellites
      const satellite1 = document.createElement('div');
      satellite1.className = 'satellite satellite-1';
      orbit1.appendChild(satellite1);
      
      const satellite2 = document.createElement('div');
      satellite2.className = 'satellite satellite-2';
      orbit2.appendChild(satellite2);
      
      orbitSystem.appendChild(orbit1);
      orbitSystem.appendChild(orbit2);
      container.appendChild(orbitSystem);
      
      // Add stars background
      const stars = document.createElement('div');
      stars.className = 'stars';
      
      // Add 5 stars
      for (let i = 0; i < 5; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        stars.appendChild(star);
      }
      
      container.appendChild(stars);
      
      // Add loading text
      const loadingProgress = document.createElement('div');
      loadingProgress.className = 'loading-progress';
      loadingProgress.textContent = config.loadingText;
      container.appendChild(loadingProgress);
      
      // Add success checkmark (hidden initially)
      const successCheckmark = document.createElement('div');
      successCheckmark.className = 'success-checkmark';
      container.appendChild(successCheckmark);
    }
  });
}

/**
 * Handle when images enter the viewport
 */
function handleIntersections(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      loadOrbitImage(img);
      observer.unobserve(img);
    }
  });
}

/**
 * Load an image with orbit animation
 */
function loadOrbitImage(img) {
  // Avoid loading already loaded images
  if (img.classList.contains(config.loadedClass)) return;
  
  const loadStart = performance.now();
  const container = img.closest(`.${config.containerClass}`);
  
  // Update loading text with random space-themed messages
  if (container) {
    const loadingProgress = container.querySelector('.loading-progress');
    if (loadingProgress) {
      const messages = [
        'Establishing orbit...',
        'Downloading satellite data...',
        'Scanning atmosphere...',
        'Processing Earth imagery...',
        'Calibrating sensors...'
      ];
      
      // Set initial message
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      loadingProgress.textContent = randomMessage;
      
      // Update message every 2 seconds
      let messageIndex = 0;
      const messageInterval = setInterval(() => {
        messageIndex = (messageIndex + 1) % messages.length;
        loadingProgress.textContent = messages[messageIndex];
      }, 2000);
      
      // Clear interval when image loads
      setTimeout(() => clearInterval(messageInterval), 10000);
    }
  }
  
  // If there's a data-src attribute
  if (img.dataset.src) {
    img.src = img.dataset.src;
  }
  
  // If there's a data-srcset attribute
  if (img.dataset.srcset) {
    img.srcset = img.dataset.srcset;
  }
  
  // Handle when the image loads
  img.onload = function() {
    // Mark as loaded
    img.classList.add(config.loadedClass);
    
    // Update statistics
    stats.loadedImages++;
    const loadTime = performance.now() - loadStart;
    
    // Show success animation
    if (container) {
      const loadingProgress = container.querySelector('.loading-progress');
      if (loadingProgress) {
        loadingProgress.textContent = 'Orbit established';
        
        // Fade out loading text
        setTimeout(() => {
          loadingProgress.style.opacity = '0';
        }, 1000);
      }
    }
    
    // Log stats if in debug mode
    if (config.debug) {
      console.log(`Image loaded in ${Math.round(loadTime)}ms: ${img.src}`);
      
      if (stats.loadedImages === stats.totalImages) {
        const totalTime = performance.now() - stats.startTime;
        console.log(`All Earth images loaded (${stats.totalImages}) in ${Math.round(totalTime)}ms`);
      }
    }
  };
  
  // Handle loading errors
  img.onerror = function() {
    console.warn(`Failed to load image: ${img.dataset.src}`);
    
    if (container) {
      const loadingProgress = container.querySelector('.loading-progress');
      if (loadingProgress) {
        loadingProgress.textContent = 'Orbit failed';
        loadingProgress.style.color = '#ff4d4d';
      }
    }
  };
}

/**
 * Fallback for browsers without Intersection Observer
 */
function loadAllImagesImmediately(images) {
  if (config.debug) {
    console.log('Intersection Observer not supported - loading all images immediately');
  }
  
  // Prepare images first
  prepareImages(images);
  
  // Then load them with a small delay
  setTimeout(() => {
    images.forEach(img => loadOrbitImage(img));
  }, 100);
}

// Auto-initialization
if (document.readyState === 'complete') {
  initOrbitLazyLoading();
} else if (document.readyState === 'interactive') {
  setTimeout(initOrbitLazyLoading, 300);
} 