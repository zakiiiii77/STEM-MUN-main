/**
 * STEM MUN - Team Page Enhancements
 * Adds animations and interactions to the team/board page
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize particle background immediately on load
  initParticleBackground();
  
  // Add all other enhancements
  enhanceTeamPage();
});

/**
 * Switch between team years (2024/2025)
 * @param {string} year - The year to switch to ('2024' or '2025')
 */
function switchTeam(year) {
  // Update active button
  const yearButtons = document.querySelectorAll('.year-btn');
  yearButtons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.textContent === year) {
      btn.classList.add('active');
    }
  });
  
  // Show the selected year's team container
  const teamContainers = document.querySelectorAll('.team-container');
  teamContainers.forEach(container => {
    container.classList.remove('active');
    if (container.id === `team${year}`) {
      container.classList.add('active');
    }
  });
  
  // Scroll to the team section smoothly
  const teamSection = document.querySelector('.team-section');
  if (teamSection) {
    teamSection.scrollIntoView({ behavior: 'smooth' });
  }
  
  // Reset any animations if needed
  if (typeof AOS !== 'undefined') {
    setTimeout(() => {
      AOS.refresh();
    }, 300);
  }
}

/**
 * Initialize particle background in hero section
 */
function initParticleBackground() {
  if (typeof particlesJS !== 'undefined') {
    // Initialize particles.js
    particlesJS('particles-js', {
      "particles": {
        "number": {
          "value": 60,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#cdb06f"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          }
        },
        "opacity": {
          "value": 0.3,
          "random": true,
          "anim": {
            "enable": true,
            "speed": 0.5,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": true,
            "speed": 2,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#cdb06f",
          "opacity": 0.2,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 1,
          "direction": "none",
          "random": true,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": true,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "grab"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 140,
            "line_linked": {
              "opacity": 0.5
            }
          },
          "push": {
            "particles_nb": 3
          }
        }
      },
      "retina_detect": true
    });
  } else {
    // Load particles.js if not available
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js';
    script.onload = function() {
      initParticleBackground();
    };
    document.head.appendChild(script);
  }
}

/**
 * Apply all team page enhancements and interactions
 */
function enhanceTeamPage() {
  // Enhance team cards with interactive hover effects
  const teamCards = document.querySelectorAll('.team-card');
  teamCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-15px)';
      this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.12)';
      
      const image = this.querySelector('.team-card-image img');
      if (image) {
        image.style.transform = 'scale(1.1)';
      }
      
      const overlay = this.querySelector('.team-card-overlay');
      if (overlay) {
        overlay.style.opacity = '1';
      }
      
      const content = this.querySelector('.team-card-content');
      if (content) {
        content.style.background = 'linear-gradient(135deg, rgba(66, 12, 2, 0.95), rgba(88, 13, 0, 0.9))';
        content.style.color = 'white';
      }
      
      const title = this.querySelector('.team-card-title');
      if (title) {
        title.style.color = 'white';
      }
      
      const position = this.querySelector('.team-card-position');
      if (position) {
        position.style.color = 'rgba(205, 176, 111, 0.9)';
      }
      
      const social = this.querySelector('.team-card-social');
      if (social) {
        social.style.opacity = '1';
        social.style.transform = 'translateY(0)';
      }
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.08)';
      
      const image = this.querySelector('.team-card-image img');
      if (image) {
        image.style.transform = 'scale(1)';
      }
      
      const overlay = this.querySelector('.team-card-overlay');
      if (overlay) {
        overlay.style.opacity = '0';
      }
      
      const content = this.querySelector('.team-card-content');
      if (content) {
        content.style.background = 'white';
        content.style.color = 'initial';
      }
      
      const title = this.querySelector('.team-card-title');
      if (title) {
        title.style.color = 'var(--primary-color)';
      }
      
      const position = this.querySelector('.team-card-position');
      if (position) {
        position.style.color = 'var(--secondary-warm)';
      }
      
      const social = this.querySelector('.team-card-social');
      if (social) {
        social.style.opacity = '0';
        social.style.transform = 'translateY(20px)';
      }
    });
  });
  
  // Enhance value items with interactive effects
  const valueItems = document.querySelectorAll('.value-item');
  valueItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.backgroundColor = 'var(--secondary-warm)';
      this.style.color = 'var(--primary-color)';
      this.style.transform = 'translateY(-5px)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
      this.style.color = 'white';
      this.style.transform = 'translateY(0)';
    });
  });
  
  // Enhance hover effects for profile cards if they exist
  const profileCards = document.querySelectorAll('.profile-card');
  profileCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      const caption = this.querySelector('.caption');
      if (caption) {
        caption.style.opacity = '1';
        caption.style.pointerEvents = 'all';
      }
    });
  });
  
  // Enhanced scroll animations
  initScrollAnimations();
}

/**
 * Initialize scroll animations
 */
function initScrollAnimations() {
  // If AOS is available, initialize it
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: false,
      mirror: true
    });
  }
  
  // If ScrollReveal is available, initialize it
  if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal();
    
    sr.reveal('.profile-card', {
      duration: 800,
      interval: 100,
      distance: '30px',
      origin: 'bottom',
      opacity: 0
    });
  }
}

// Add parallax effect to featured member card
if (window.innerWidth > 768) {
  const featuredMember = document.querySelector('.featured-member');
  if (featuredMember) {
    window.addEventListener('mousemove', function(e) {
      const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
      featuredMember.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });
    
    featuredMember.addEventListener('mouseenter', function() {
      this.style.transition = 'none';
    });
    
    featuredMember.addEventListener('mouseleave', function() {
      this.style.transition = 'all 0.5s ease';
      this.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
  }
}

// Add tilt effect to social media icons
const socialIcons = document.querySelectorAll('.social-icon');
socialIcons.forEach(icon => {
  icon.addEventListener('mouseenter', function() {
    this.style.backgroundColor = 'var(--secondary-warm)';
    this.style.color = 'white';
    this.style.transform = 'translateY(-3px)';
  });
  
  icon.addEventListener('mouseleave', function() {
    this.style.backgroundColor = 'white';
    this.style.color = 'var(--primary-color)';
    this.style.transform = 'translateY(0)';
  });
});

// Add custom cursor effect for featured member
if (window.innerWidth > 992) {
  const featuredMember = document.querySelector('.featured-member');
  
  if (featuredMember) {
    // Create custom cursor element
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    cursor.innerHTML = '<span>View</span>';
    cursor.style.position = 'absolute';
    cursor.style.width = '50px';
    cursor.style.height = '50px';
    cursor.style.borderRadius = '50%';
    cursor.style.backgroundColor = 'var(--secondary-warm)';
    cursor.style.display = 'flex';
    cursor.style.alignItems = 'center';
    cursor.style.justifyContent = 'center';
    cursor.style.color = 'var(--primary-color)';
    cursor.style.fontWeight = 'bold';
    cursor.style.fontSize = '0.8rem';
    cursor.style.pointerEvents = 'none';
    cursor.style.transform = 'scale(0)';
    cursor.style.transition = 'transform 0.3s ease';
    cursor.style.zIndex = '100';
    document.body.appendChild(cursor);
    
    const featuredMemberImage = featuredMember.querySelector('.featured-member-image');
    
    if (featuredMemberImage) {
      featuredMemberImage.addEventListener('mouseenter', function() {
        cursor.style.transform = 'scale(1)';
      });
      
      featuredMemberImage.addEventListener('mouseleave', function() {
        cursor.style.transform = 'scale(0)';
      });
      
      featuredMemberImage.addEventListener('mousemove', function(e) {
        cursor.style.left = `${e.clientX - 25}px`;
        cursor.style.top = `${e.clientY - 25}px`;
      });
      
      // Add lightbox functionality to the featured image
      featuredMemberImage.style.cursor = 'pointer';
      featuredMemberImage.addEventListener('click', function() {
        // Create lightbox
        const lightbox = document.createElement('div');
        lightbox.classList.add('lightbox');
        lightbox.style.position = 'fixed';
        lightbox.style.top = '0';
        lightbox.style.left = '0';
        lightbox.style.width = '100%';
        lightbox.style.height = '100%';
        lightbox.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        lightbox.style.display = 'flex';
        lightbox.style.alignItems = 'center';
        lightbox.style.justifyContent = 'center';
        lightbox.style.zIndex = '1000';
        lightbox.style.opacity = '0';
        lightbox.style.transition = 'opacity 0.3s ease';
        
        // Create lightbox image
        const lightboxImg = document.createElement('img');
        lightboxImg.src = this.querySelector('img').src;
        lightboxImg.style.maxWidth = '90%';
        lightboxImg.style.maxHeight = '90%';
        lightboxImg.style.borderRadius = '5px';
        lightboxImg.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.5)';
        lightboxImg.style.transform = 'scale(0.9)';
        lightboxImg.style.transition = 'transform 0.3s ease';
        
        // Create close button
        const closeBtn = document.createElement('div');
        closeBtn.innerHTML = '&times;';
        closeBtn.style.position = 'absolute';
        closeBtn.style.top = '20px';
        closeBtn.style.right = '20px';
        closeBtn.style.fontSize = '30px';
        closeBtn.style.color = 'white';
        closeBtn.style.cursor = 'pointer';
        closeBtn.style.width = '50px';
        closeBtn.style.height = '50px';
        closeBtn.style.borderRadius = '50%';
        closeBtn.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        closeBtn.style.display = 'flex';
        closeBtn.style.alignItems = 'center';
        closeBtn.style.justifyContent = 'center';
        
        // Add all elements to the DOM
        lightbox.appendChild(lightboxImg);
        lightbox.appendChild(closeBtn);
        document.body.appendChild(lightbox);
        
        // Show lightbox with animation
        setTimeout(() => {
          lightbox.style.opacity = '1';
          lightboxImg.style.transform = 'scale(1)';
        }, 10);
        
        // Close lightbox when clicking the close button or outside the image
        closeBtn.addEventListener('click', function() {
          lightbox.style.opacity = '0';
          setTimeout(() => {
            document.body.removeChild(lightbox);
          }, 300);
        });
        
        lightbox.addEventListener('click', function(e) {
          if (e.target === lightbox) {
            lightbox.style.opacity = '0';
            setTimeout(() => {
              document.body.removeChild(lightbox);
            }, 300);
          }
        });
      });
    }
  }
} 