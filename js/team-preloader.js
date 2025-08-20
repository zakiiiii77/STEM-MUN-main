/**
 * STEM MUN - Team Page Preloader
 * Modern preloader animation specifically for the team/board page
 */

document.addEventListener('DOMContentLoaded', function() {
  // Create preloader element
  const preloader = document.createElement('div');
  preloader.id = 'team-preloader';
  preloader.style.position = 'fixed';
  preloader.style.top = '0';
  preloader.style.left = '0';
  preloader.style.width = '100%';
  preloader.style.height = '100%';
  preloader.style.backgroundColor = '#420c02';
  preloader.style.display = 'flex';
  preloader.style.flexDirection = 'column';
  preloader.style.alignItems = 'center';
  preloader.style.justifyContent = 'center';
  preloader.style.zIndex = '9999';
  preloader.style.transition = 'opacity 0.8s ease, visibility 0.8s ease';
  
  // Create logo container
  const logoContainer = document.createElement('div');
  logoContainer.style.marginBottom = '30px';
  logoContainer.style.position = 'relative';
  
  // Add logo
  const logo = document.createElement('img');
  logo.src = 'img/logo.svg';
  logo.alt = 'STEM MUN Logo';
  logo.style.width = '100px';
  logo.style.height = 'auto';
  logo.style.opacity = '0';
  logo.style.transform = 'translateY(20px)';
  logo.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  
  // Create loading bar container
  const loadingContainer = document.createElement('div');
  loadingContainer.style.width = '200px';
  loadingContainer.style.height = '4px';
  loadingContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
  loadingContainer.style.borderRadius = '2px';
  loadingContainer.style.overflow = 'hidden';
  loadingContainer.style.marginBottom = '15px';
  
  // Create loading bar
  const loadingBar = document.createElement('div');
  loadingBar.style.width = '0%';
  loadingBar.style.height = '100%';
  loadingBar.style.backgroundColor = '#cdb06f';
  loadingBar.style.borderRadius = '2px';
  loadingBar.style.transition = 'width 0.4s ease-out';
  
  // Create loading text
  const loadingText = document.createElement('div');
  loadingText.textContent = 'Loading team...';
  loadingText.style.color = 'rgba(255, 255, 255, 0.7)';
  loadingText.style.fontSize = '14px';
  loadingText.style.fontFamily = 'Montserrat, sans-serif';
  loadingText.style.opacity = '0';
  loadingText.style.transform = 'translateY(10px)';
  loadingText.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  
  // Add elements to the DOM
  loadingContainer.appendChild(loadingBar);
  logoContainer.appendChild(logo);
  preloader.appendChild(logoContainer);
  preloader.appendChild(loadingContainer);
  preloader.appendChild(loadingText);
  document.body.appendChild(preloader);
  
  // Prevent scrolling while preloader is active
  document.body.style.overflow = 'hidden';
  
  // Animate the logo and text appearance after a short delay
  setTimeout(() => {
    logo.style.opacity = '1';
    logo.style.transform = 'translateY(0)';
    loadingText.style.opacity = '1';
    loadingText.style.transform = 'translateY(0)';
  }, 300);
  
  // Simulate loading progress
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15;
    
    if (progress > 100) {
      progress = 100;
      clearInterval(interval);
      
      // Wait a moment at 100% before hiding the preloader
      setTimeout(() => {
        hidePreloader();
      }, 500);
    }
    
    loadingBar.style.width = `${progress}%`;
    
    // Update loading text at certain progress points
    if (progress > 30 && progress < 70) {
      loadingText.textContent = 'Preparing team cards...';
    } else if (progress >= 70) {
      loadingText.textContent = 'Almost ready...';
    }
  }, 200);
  
  // Hide preloader when page is loaded
  window.addEventListener('load', function() {
    hidePreloader();
  });
  
  // Hide preloader function
  function hidePreloader() {
    // Make sure progress is at 100%
    loadingBar.style.width = '100%';
    
    // Wait a moment before hiding
    setTimeout(() => {
      preloader.style.opacity = '0';
      preloader.style.visibility = 'hidden';
      
      // Re-enable scrolling
      document.body.style.overflow = '';
      
      // Remove preloader after transition completes
      setTimeout(() => {
        if (document.body.contains(preloader)) {
          document.body.removeChild(preloader);
        }
      }, 800);
    }, 600);
  }
  
  // If page takes too long to load, hide preloader after 8 seconds
  setTimeout(() => {
    hidePreloader();
  }, 8000);
}); 