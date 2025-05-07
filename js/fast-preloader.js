/**
 * Fast Preloader Script - Accelerates loading experience
 * For STEM Model United Nations website
 */

// Execute immediately
(function() {
  // Create preloader element if it doesn't exist
  if (!document.getElementById('preloader')) {
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.innerHTML = `
      <div class="preloader-content">
        <img src="img/logo.svg" alt="STEM MUN Logo" class="preloader-logo">
        <div class="preloader-spinner">
          <div class="spinner-circle"></div>
        </div>
        <div class="preloader-text">Loading...</div>
      </div>
    `;
    
    // Add styles for the preloader
    const style = document.createElement('style');
    style.textContent = `
      #preloader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #420c02;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.8s ease, visibility 0.8s ease;
      }
      .preloader-content {
        text-align: center;
      }
      .preloader-logo {
        width: 120px;
        height: auto;
        margin-bottom: 20px;
        animation: pulse 2s infinite;
      }
      .preloader-spinner {
        display: inline-block;
        position: relative;
        width: 70px;
        height: 70px;
      }
      .spinner-circle {
        position: absolute;
        border: 4px solid rgba(255, 255, 255, 0.3);
        border-top-color: #cdb06f;
        border-radius: 50%;
        width: 100%;
        height: 100%;
        animation: spin 1s linear infinite;
      }
      .preloader-text {
        color: white;
        font-family: 'Montserrat', sans-serif;
        font-size: 16px;
        margin-top: 15px;
        font-weight: 500;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }
    `;
    
    document.head.appendChild(style);
    document.body.insertBefore(preloader, document.body.firstChild);
  }

  // Hide the preloader after a longer delay (3 seconds)
  document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      // Keep the preloader visible for 3 seconds
      setTimeout(function() {
        // Add fadeout
        preloader.style.opacity = '0';
        
        // Remove preloader after fade completes
        setTimeout(function() {
          preloader.style.display = 'none';
          preloader.style.visibility = 'hidden';
        }, 800); // Match the transition time
      }, 3000); // Show for 3 seconds
    }
  });

  // Fallback: If the page is already loaded
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      // Still show the preloader for at least 3 seconds
      setTimeout(function() {
        preloader.style.opacity = '0';
        
        setTimeout(function() {
          preloader.style.display = 'none';
          preloader.style.visibility = 'hidden';
        }, 800);
      }, 3000);
    }
  }

  // Force hide preloader after maximum timeout (failsafe)
  setTimeout(function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.style.opacity = '0';
      
      setTimeout(function() {
        preloader.style.display = 'none';
        preloader.style.visibility = 'hidden';
      }, 800);
    }
  }, 6000); // Maximum 6 seconds (3s display + potential delay + fade time)
})(); 