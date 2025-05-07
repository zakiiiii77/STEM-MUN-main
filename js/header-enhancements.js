/**
 * STEM MUN - Advanced Header Enhancements
 * Adds modern interactive features to the website header
 */

(function() {
  'use strict';
  
  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    initHeaderLayout();
    initHeaderAnimations();
    initScrollEffects();
    initMobileMenuAnimations();
  });
  
  /**
   * Initialize header layout and spacing fixes
   */
  function initHeaderLayout() {
    // Fix navigation spacing
    const navItems = document.querySelectorAll('.main-nav > li');
    
    // Ensure proper spacing for nav items
    navItems.forEach((item, index) => {
      // Add proper margins
      if (index > 0 && index < navItems.length - 1) {
        item.style.margin = '0 5px';
      }
      
      // Special styling for CTA button
      if (item.querySelector('#cta')) {
        item.style.marginLeft = '15px';
      }
    });
    
    // Fix dropdown alignment
    const dropdowns = document.querySelectorAll('.dropdown-menu');
    dropdowns.forEach(dropdown => {
      dropdown.style.minWidth = '200px';
      dropdown.style.marginTop = '1px';
    });
  }
  
  /**
   * Initialize header animations and effects
   */
  function initHeaderAnimations() {
    // Apply a staggered animation to nav items on load
    const navItems = document.querySelectorAll('.main-nav > li');
    
    navItems.forEach((item, index) => {
      // Set animation variables for staggered entry
      item.style.setProperty('--i', index);
      
      // Add subtle hover animation
      item.addEventListener('mouseenter', function() {
        const siblings = Array.from(navItems).filter(el => el !== item);
        siblings.forEach(sibling => {
          sibling.style.opacity = '0.8';
          sibling.style.transform = 'scale(0.97)';
        });
      });
      
      item.addEventListener('mouseleave', function() {
        navItems.forEach(navItem => {
          navItem.style.opacity = '';
          navItem.style.transform = '';
        });
      });
    });
    
    // Apply special effect to CTA button
    const ctaButton = document.querySelector('#cta');
    if (ctaButton) {
      // Add subtle pulse animation to CTA button
      setInterval(() => {
        ctaButton.classList.add('pulse');
        setTimeout(() => {
          ctaButton.classList.remove('pulse');
        }, 1000);
      }, 5000);
    }
    
    // Add floating notification indicator if needed (for future features)
    const createNotificationIndicator = (count) => {
      if (count && count > 0) {
        const navItem = document.querySelector('.main-nav > li:nth-child(5)');
        if (navItem) {
          const indicator = document.createElement('span');
          indicator.className = 'notification-badge';
          indicator.textContent = count > 9 ? '9+' : count;
          navItem.querySelector('a').appendChild(indicator);
        }
      }
    };
    
    // For future use with notifications
    // createNotificationIndicator(3);
  }
  
  /**
   * Initialize scroll-based effects for the header
   */
  function initScrollEffects() {
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    const nav = document.getElementById('nav');
    const delta = 5;
    const navbarHeight = header ? header.offsetHeight : 200;
    
    // Create scroll indicator
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-progress-indicator';
    if (header) {
      header.appendChild(scrollIndicator);
    }
    
    // Handle scroll events with improved performance using requestAnimationFrame
    let ticking = false;
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          
          // Update scroll progress indicator
          const scrollPercent = Math.min(100, (scrollTop / (document.body.scrollHeight - window.innerHeight)) * 100);
          scrollIndicator.style.width = `${scrollPercent}%`;
          
          // Don't apply parallax on mobile devices for better performance
          if (window.innerWidth > 768 && header) {
            const parallaxAmount = Math.min(0.1, scrollTop * 0.0003);
            header.style.transform = `translateY(${parallaxAmount}px)`;
          }
          
          // Auto-hide header on scroll down, show on scroll up
          if (Math.abs(lastScrollTop - scrollTop) <= delta) {
            ticking = false;
            return;
          }
          
          if (scrollTop > lastScrollTop && scrollTop > navbarHeight) {
            // Scrolling down
            if (header && window.innerWidth > 768) {
              header.classList.add('header-hidden');
            }
          } else {
            // Scrolling up
            if (header) {
              header.classList.remove('header-hidden');
            }
          }
          
          lastScrollTop = scrollTop;
          
          // Handle fixed header appearance
          if (scrollTop > 50) {
            if (nav) nav.classList.add('fixed-nav');
            if (header) header.classList.add('scrolled');
          } else {
            if (nav) nav.classList.remove('fixed-nav');
            if (header) header.classList.remove('scrolled');
          }
          
          ticking = false;
        });
        
        ticking = true;
      }
    }, { passive: true });
  }
  
  /**
   * Initialize mobile menu animations and effects
   */
  function initMobileMenuAnimations() {
    const navToggle = document.querySelector('.nav-collapse');
    const navMenu = document.querySelector('.main-nav');
    const menuItems = document.querySelectorAll('.main-nav li');
    
    if (navToggle && navMenu) {
      // Set animation variables for staggered entry in mobile menu
      menuItems.forEach((item, index) => {
        item.style.setProperty('--i', index);
      });
      
      // Handle menu toggle animation
      navToggle.addEventListener('click', function() {
        const nav = document.getElementById('nav');
        if (nav) {
          nav.classList.toggle('open');
          document.body.classList.toggle('nav-open');
          
          // Add body overlay when menu is open
          if (nav.classList.contains('open')) {
            if (!document.querySelector('.menu-overlay')) {
              const overlay = document.createElement('div');
              overlay.className = 'menu-overlay';
              document.body.appendChild(overlay);
              
              // Fade in overlay
              setTimeout(() => {
                overlay.style.opacity = '1';
              }, 10);
              
              overlay.addEventListener('click', function() {
                nav.classList.remove('open');
                document.body.classList.remove('nav-open');
                
                // Fade out and remove overlay
                overlay.style.opacity = '0';
                setTimeout(() => {
                  if (overlay.parentNode) {
                    document.body.removeChild(overlay);
                  }
                }, 300);
              });
            }
          } else {
            const overlay = document.querySelector('.menu-overlay');
            if (overlay) {
              overlay.style.opacity = '0';
              setTimeout(() => {
                if (overlay.parentNode) {
                  document.body.removeChild(overlay);
                }
              }, 300);
            }
          }
        }
      });
    }
    
    // Handle dropdowns on mobile
    const dropdownLinks = document.querySelectorAll('.main-nav li.has-dropdown > a');
    dropdownLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        if (window.innerWidth < 768) {
          e.preventDefault();
          this.parentElement.classList.toggle('open-drop');
          const dropdown = this.nextElementSibling;
          if (dropdown) {
            if (dropdown.style.maxHeight) {
              dropdown.style.maxHeight = null;
              dropdown.style.opacity = '0';
            } else {
              dropdown.style.maxHeight = dropdown.scrollHeight + 'px';
              dropdown.style.opacity = '1';
            }
          }
        }
      });
    });
  }
})(); 