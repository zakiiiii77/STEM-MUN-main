/**
 * STEM MUN - Conference Page Enhancements
 * Adds animations and interactions to the conferences page
 */

document.addEventListener('DOMContentLoaded', function() {
  // Fix z-index for carousel navigation buttons and circular elements
  function fixOwlCarouselNavigation() {
    // Ensure owl carousel buttons have proper z-index and positioning
    const owlNavs = document.querySelectorAll('.owl-nav');
    owlNavs.forEach(nav => {
      nav.style.zIndex = '20';
    });
    
    const owlButtons = document.querySelectorAll('.owl-prev, .owl-next');
    owlButtons.forEach(button => {
      button.style.zIndex = '20';
      button.style.position = 'absolute';
      button.style.display = 'flex';
      button.style.alignItems = 'center';
      button.style.justifyContent = 'center';
    });
    
    // Ensure the navigation buttons are always on top
    const owlPrevButtons = document.querySelectorAll('.owl-prev');
    owlPrevButtons.forEach(button => {
      button.style.left = '-20px';
    });
    
    const owlNextButtons = document.querySelectorAll('.owl-next');
    owlNextButtons.forEach(button => {
      button.style.right = '-20px';
    });
    
    // Set timeline container's z-index to ensure buttons are in front
    const timelineContainers = document.querySelectorAll('.timeline-container');
    timelineContainers.forEach(container => {
      container.style.position = 'relative';
      container.style.zIndex = '1';
    });
    
    // Fix the circular decorative elements
    const decorativeCircles = document.querySelectorAll(
      '.timeline-header h2::before, ' +
      '.conferences-header h2::before, ' +
      '.cta-title::before, ' +
      '.letter-header h2::after, ' +
      '.timeline-title::after, ' +
      '.timeline-header h2::after, ' +
      '.gallery-header h2::after, ' +
      '.conference-hero-headline .highlight::after'
    );
    
    // Apply styles with stylesheet since pseudo-elements can't be directly accessed
    const styleSheet = document.createElement('style');
    styleSheet.innerHTML = `
      .timeline-header h2::before,
      .conferences-header h2::before,
      .cta-title::before,
      .letter-header h2::after,
      .timeline-title::after,
      .timeline-header h2::after,
      .gallery-header h2::after,
      .conference-hero-headline .highlight::after {
        width: 45px !important;
        height: 45px !important;
        opacity: 0.1 !important;
        z-index: -1 !important;
        animation: none !important;
        transform: none !important;
        transition: none !important;
      }
    `;
    document.head.appendChild(styleSheet);
  }
  
  // Call the function on page load and whenever the window is resized
  fixOwlCarouselNavigation();
  window.addEventListener('resize', fixOwlCarouselNavigation);
  
  // Wait a bit for carousel initialization, then fix navigation again
  setTimeout(fixOwlCarouselNavigation, 500);
  setTimeout(fixOwlCarouselNavigation, 1000);
  
  // Conference Hero Background Parallax Effect
  const heroSection = document.querySelector('.conference-hero');
  if (heroSection) {
    // Create ultra-modern interactive background
    const heroBackground = document.querySelector('.conference-hero-bg');
    if (heroBackground) {
      // Set up the base container for our advanced background
      heroBackground.style.position = 'absolute';
      heroBackground.style.top = '0';
      heroBackground.style.left = '0';
      heroBackground.style.width = '100%';
      heroBackground.style.height = '100%';
      heroBackground.style.zIndex = '-1';
      heroBackground.style.overflow = 'hidden';
      
      // Create a multi-layered background with SVG patterns, particles, and animated gradients
      heroBackground.innerHTML = `
        <div class="animated-gradient-bg"></div>
        <div class="geometric-pattern"></div>
        <div class="particles-container" id="particles-js"></div>
        <svg class="svg-defs">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#420c02" stop-opacity="0.8"/>
              <stop offset="50%" stop-color="#6a1d04" stop-opacity="0.9"/>
              <stop offset="100%" stop-color="#8a2305" stop-opacity="0.7"/>
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="10" result="blur"/>
              <feComposite in="SourceGraphic" in2="blur" operator="over"/>
            </filter>
          </defs>
        </svg>
        <div class="floating-elements">
          <div class="floating-element elem-1"></div>
          <div class="floating-element elem-2"></div>
          <div class="floating-element elem-3"></div>
          <div class="floating-element elem-4"></div>
          <div class="floating-element elem-5"></div>
          <div class="floating-element elem-6"></div>
          <div class="floating-element elem-7"></div>
          <div class="floating-element elem-8"></div>
        </div>
        <div class="glowing-lines">
          <div class="line line1"></div>
          <div class="line line2"></div>
          <div class="line line3"></div>
          <div class="line line4"></div>
        </div>
      `;
      
      // Add comprehensive styles for the advanced background
      const style = document.createElement('style');
      style.textContent = `
        .animated-gradient-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #4a1303 0%, #6a1d04 50%, #8a2305 100%);
          animation: gradientShift 15s infinite alternate;
          z-index: -5;
        }
        
        @keyframes gradientShift {
          0% {
            background-position: 0% 0%;
          }
          50% {
            background-position: 100% 100%;
          }
          100% {
            background-position: 0% 0%;
          }
        }
        
        .geometric-pattern {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: repeating-linear-gradient(
            45deg,
            rgba(205, 176, 111, 0.07) 0,
            rgba(205, 176, 111, 0.07) 1px,
            transparent 1px,
            transparent 16px
          );
          z-index: -4;
          opacity: 0.5;
        }
        
        .particles-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -3;
        }
        
        .floating-elements {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -2;
        }
        
        .floating-element {
          position: absolute;
          border-radius: 50%;
          background: rgba(205, 176, 111, 0.15);
          box-shadow: 0 0 20px rgba(205, 176, 111, 0.1);
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
          transform-origin: center center;
          transition: all 0.5s ease-out;
        }
        
        .elem-1 {
          width: 300px;
          height: 300px;
          top: -100px;
          right: 10%;
          animation: float1 20s infinite alternate ease-in-out;
          background: radial-gradient(circle at 30% 30%, rgba(205, 176, 111, 0.2), rgba(205, 176, 111, 0.05));
        }
        
        .elem-2 {
          width: 200px;
          height: 200px;
          bottom: 5%;
          left: 10%;
          animation: float2 17s infinite alternate-reverse ease-in-out;
          background: radial-gradient(circle at 70% 70%, rgba(205, 176, 111, 0.2), rgba(205, 176, 111, 0.05));
        }
        
        .elem-3 {
          width: 150px;
          height: 150px;
          top: 30%;
          left: 20%;
          animation: float3 14s infinite alternate ease-in-out;
          background: radial-gradient(circle at 40% 40%, rgba(205, 176, 111, 0.15), rgba(205, 176, 111, 0.05));
        }
        
        .elem-4 {
          width: 180px;
          height: 180px;
          bottom: 15%;
          right: 15%;
          animation: float4 18s infinite alternate-reverse ease-in-out;
          background: radial-gradient(circle at 60% 60%, rgba(205, 176, 111, 0.15), rgba(205, 176, 111, 0.05));
        }
        
        .elem-5 {
          width: 120px;
          height: 120px;
          top: 20%;
          right: 25%;
          animation: float5 12s infinite alternate ease-in-out;
          background: radial-gradient(circle at 50% 50%, rgba(205, 176, 111, 0.2), rgba(205, 176, 111, 0.05));
        }
        
        .elem-6 {
          width: 90px;
          height: 90px;
          top: 60%;
          left: 10%;
          animation: float6 10s infinite alternate-reverse ease-in-out;
          background: radial-gradient(circle at 30% 70%, rgba(205, 176, 111, 0.15), rgba(205, 176, 111, 0.05));
        }
        
        .elem-7 {
          width: 140px;
          height: 140px;
          top: 10%;
          left: 40%;
          animation: float7 16s infinite alternate ease-in-out;
          background: radial-gradient(circle at 60% 30%, rgba(205, 176, 111, 0.15), rgba(205, 176, 111, 0.05));
        }
        
        .elem-8 {
          width: 100px;
          height: 100px;
          bottom: 10%;
          right: 40%;
          animation: float8 15s infinite alternate-reverse ease-in-out;
          background: radial-gradient(circle at 40% 60%, rgba(205, 176, 111, 0.15), rgba(205, 176, 111, 0.05));
        }
        
        .glowing-lines {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          overflow: hidden;
        }
        
        .line {
          position: absolute;
          height: 2px;
          background-color: rgba(205, 176, 111, 0.3);
          filter: url(#glow);
          transform-origin: left center;
        }
        
        .line1 {
          width: 70%;
          top: 20%;
          left: -10%;
          transform: rotate(20deg);
          animation: lineGlow 8s infinite alternate;
        }
        
        .line2 {
          width: 60%;
          top: 40%;
          right: -10%;
          transform: rotate(-15deg);
          animation: lineGlow 12s infinite alternate-reverse;
        }
        
        .line3 {
          width: 80%;
          bottom: 30%;
          left: -5%;
          transform: rotate(10deg);
          animation: lineGlow 10s infinite alternate;
        }
        
        .line4 {
          width: 50%;
          bottom: 10%;
          right: 0;
          transform: rotate(-10deg);
          animation: lineGlow 9s infinite alternate-reverse;
        }
        
        @keyframes float1 {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(30px, 30px) rotate(5deg); }
        }
        
        @keyframes float2 {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(-20px, 20px) rotate(-5deg); }
        }
        
        @keyframes float3 {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(15px, 25px) rotate(8deg); }
        }
        
        @keyframes float4 {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(-25px, -15px) rotate(-8deg); }
        }
        
        @keyframes float5 {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(20px, -20px) rotate(10deg); }
        }
        
        @keyframes float6 {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(-15px, -25px) rotate(-10deg); }
        }
        
        @keyframes float7 {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(25px, 15px) rotate(7deg); }
        }
        
        @keyframes float8 {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(-10px, 30px) rotate(-7deg); }
        }
        
        @keyframes lineGlow {
          0% { opacity: 0.2; width: 60%; }
          50% { opacity: 0.5; width: 70%; }
          100% { opacity: 0.2; width: 60%; }
        }
      `;
      document.head.appendChild(style);
      
      // Initialize particles animation if particles.js is available
      if (window.particlesJS) {
        particlesJS('particles-js', {
          particles: {
            number: { value: 50, density: { enable: true, value_area: 800 } },
            color: { value: "#cdb06f" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: {
              enable: true,
              distance: 150,
              color: "#cdb06f",
              opacity: 0.2,
              width: 1
            },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              random: true,
              straight: false,
              out_mode: "out",
              bounce: false
            }
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: { enable: true, mode: "repulse" },
              onclick: { enable: true, mode: "push" },
              resize: true
            }
          },
          retina_detect: true
        });
      } else {
        // If particles.js is not available, add a script to load it
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
        script.onload = function() {
          particlesJS('particles-js', {
            particles: {
              number: { value: 50, density: { enable: true, value_area: 800 } },
              color: { value: "#cdb06f" },
              shape: { type: "circle" },
              opacity: { value: 0.5, random: true },
              size: { value: 3, random: true },
              line_linked: {
                enable: true,
                distance: 150,
                color: "#cdb06f",
                opacity: 0.2,
                width: 1
              },
              move: {
                enable: true,
                speed: 1,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false
              }
            },
            interactivity: {
              detect_on: "canvas",
              events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" },
                resize: true
              }
            },
            retina_detect: true
          });
        };
        document.head.appendChild(script);
      }
    }

    // Enhanced parallax effect
    window.addEventListener('scroll', function() {
      const scrollPosition = window.pageYOffset;
      const heroBackground = document.querySelector('.conference-hero-bg');
      if (heroBackground) {
        // Advanced parallax for multiple elements
        const floatingElements = heroBackground.querySelectorAll('.floating-element');
        floatingElements.forEach((element, index) => {
          const speed = (index + 1) * 0.04;
          const translateY = Math.min(scrollPosition * speed, heroSection.offsetHeight / 2);
          const currentTransform = window.getComputedStyle(element).transform;
          const matrix = new DOMMatrix(currentTransform);
          
          // Extract current rotation and other transforms, then add parallax
          const currentX = matrix.m41;
          const currentY = matrix.m42;
          const currentRotation = Math.atan2(matrix.m21, matrix.m11) * (180 / Math.PI);
          
          element.style.transform = `translate(${currentX}px, ${currentY + translateY}px) rotate(${currentRotation}deg)`;
        });
        
        // Parallax for lines
        const lines = heroBackground.querySelectorAll('.line');
        lines.forEach((line, index) => {
          const speed = (index + 1) * 0.03;
          const translateY = Math.min(scrollPosition * speed, heroSection.offsetHeight / 3);
          const rotation = line.style.transform.match(/rotate\(([-\d.]+)deg\)/);
          const currentRotation = rotation ? parseFloat(rotation[1]) : 0;
          
          line.style.transform = `translateY(${translateY}px) rotate(${currentRotation}deg)`;
        });
      }
    });
  }
  
  // Timeline Dot Animations
  const timelineDots = document.querySelectorAll('.timeline-dot');
  timelineDots.forEach(dot => {
    dot.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.2)';
      this.style.boxShadow = '0 0 0 12px rgba(205, 176, 111, 0.15)';
    });
    
    dot.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
      this.style.boxShadow = 'none';
    });
  });
  
  // Conference Cards Hover Effects
  const conferenceCards = document.querySelectorAll('.conference-card');
  conferenceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-20px)';
      this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.12)';
      
      const image = this.querySelector('.conference-card-img img');
      if (image) {
        image.style.transform = 'scale(1.12)';
      }
      
      const link = this.querySelector('.conference-card-link');
      if (link) {
        link.style.color = 'var(--primary-color)';
      }
      
      const arrow = this.querySelector('.fa-arrow-right');
      if (arrow) {
        arrow.style.transform = 'translateX(5px)';
      }
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';
      
      const image = this.querySelector('.conference-card-img img');
      if (image) {
        image.style.transform = 'scale(1)';
      }
      
      const link = this.querySelector('.conference-card-link');
      if (link) {
        link.style.color = 'var(--secondary-warm)';
      }
      
      const arrow = this.querySelector('.fa-arrow-right');
      if (arrow) {
        arrow.style.transform = 'translateX(0)';
      }
    });
  });
  
  // Gallery Item Hover Effects
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
      this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
      
      const image = this.querySelector('img');
      if (image) {
        image.style.transform = 'scale(1.1)';
      }
      
      const title = this.querySelector('.gallery-title');
      if (title) {
        title.style.transform = 'translateY(-5px)';
      }
      
      const overlay = this.querySelector('.gallery-overlay');
      if (overlay) {
        overlay.style.background = 'linear-gradient(to top, rgba(66, 12, 2, 0.95), rgba(66, 12, 2, 0.2) 85%)';
      }
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
      
      const image = this.querySelector('img');
      if (image) {
        image.style.transform = 'scale(1)';
      }
      
      const title = this.querySelector('.gallery-title');
      if (title) {
        title.style.transform = 'translateY(0)';
      }
      
      const overlay = this.querySelector('.gallery-overlay');
      if (overlay) {
        overlay.style.background = 'linear-gradient(to top, rgba(66, 12, 2, 0.9), rgba(66, 12, 2, 0) 70%)';
      }
    });
  });
  
  // Letter Container Hover Effect
  const letterContainer = document.querySelector('.letter-container');
  if (letterContainer) {
    letterContainer.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
      this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.1)';
    });
    
    letterContainer.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.05)';
    });
  }
  
  // CTA Buttons Hover Effects
  const ctaButtons = document.querySelectorAll('.cta-btn');
  ctaButtons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-7px)';
      
      if (this.classList.contains('primary')) {
        this.style.boxShadow = '0 15px 30px rgba(255, 255, 255, 0.2)';
      } else if (this.classList.contains('secondary')) {
        this.style.boxShadow = '0 15px 30px rgba(205, 176, 111, 0.3)';
        this.style.borderColor = 'var(--secondary-warm)';
      }
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      
      if (this.classList.contains('primary')) {
        this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
      } else if (this.classList.contains('secondary')) {
        this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
        this.style.borderColor = 'rgba(255, 255, 255, 0.7)';
      }
    });
  });
  
  // Set CTA section background image if it doesn't have one
  const ctaOverlay = document.querySelector('.cta-overlay');
  if (ctaOverlay && !ctaOverlay.style.backgroundImage) {
    // Use a gradient instead of an image since we don't have pattern-bg.png
    ctaOverlay.style.background = 'linear-gradient(45deg, rgba(66, 12, 2, 0.2) 25%, transparent 25%, transparent 50%, rgba(66, 12, 2, 0.2) 50%, rgba(66, 12, 2, 0.2) 75%, transparent 75%, transparent)';
    ctaOverlay.style.backgroundSize = '20px 20px';
    ctaOverlay.style.position = 'absolute';
    ctaOverlay.style.top = '0';
    ctaOverlay.style.left = '0';
    ctaOverlay.style.width = '100%';
    ctaOverlay.style.height = '100%';
    ctaOverlay.style.zIndex = '1';
  }

  // Initialize particles for hero section if particles.js is available
  function initHeroParticles() {
    if (typeof particlesJS !== 'undefined' && document.getElementById('hero-particles')) {
      particlesJS('hero-particles', {
        "particles": {
          "number": {
            "value": 40,
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
            },
            "polygon": {
              "nb_sides": 5
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
    } else if (document.getElementById('hero-particles')) {
      // If particles.js is not available, load it and then initialize
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
      script.onload = function() {
        initHeroParticles();
      };
      document.head.appendChild(script);
    }
  }
  
  // Call the particles initialization function
  initHeroParticles();
}); 