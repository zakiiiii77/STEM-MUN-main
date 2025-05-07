/**
 * STEM MUN - Team Page Advanced Animations
 * Additional animations and effects for the Team/Board page
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize animation framework
  initializeAnimations();

  // Setup hover animations
  setupHoverAnimations();

  // Setup scroll effects
  setupScrollEffects();
  
  // Setup animated backgrounds
  setupAnimatedBackgrounds();
});

/**
 * Initialize animation framework and base settings
 */
function initializeAnimations() {
  // Configure AOS with enhanced settings if available
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out-cubic',
      once: false,
      mirror: true,
      anchorPlacement: 'center-bottom',
      disable: 'mobile'
    });
  }
  
  // Configure ScrollReveal with custom settings if available
  if (typeof ScrollReveal !== 'undefined') {
    window.sr = ScrollReveal();
    
    // Define custom animations
    sr.reveal('.section-title', {
      duration: 1200,
      distance: '20px',
      origin: 'bottom',
      opacity: 0,
      scale: 0.9,
      cleanup: true
    });
    
    // Define animations for team members with sequencing
    sr.reveal('.team-card', {
      duration: 800,
      interval: 150,
      distance: '30px',
      origin: 'bottom',
      opacity: 0,
      scale: 0.9,
      viewFactor: 0.2,
      cleanup: true
    });
    
    // Animate the featured member
    sr.reveal('.featured-member', {
      duration: 1000,
      distance: '0px',
      opacity: 0,
      scale: 0.95,
      viewFactor: 0.3,
      cleanup: true
    });
    
    // Animate mission values with a sequence
    sr.reveal('.value-item', {
      duration: 600,
      interval: 100,
      distance: '20px',
      origin: 'bottom',
      opacity: 0,
      cleanup: true
    });
  }
}

/**
 * Setup hover animation effects
 */
function setupHoverAnimations() {
  // Magnetic hover effect for social icons
  const socialIcons = document.querySelectorAll('.social-icon');
  socialIcons.forEach(icon => {
    // Create magnetic hover effect
    icon.addEventListener('mousemove', function(e) {
      const { left, top, width, height } = this.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      
      const centerX = width / 2;
      const centerY = height / 2;
      
      const moveX = (x - centerX) / 8;
      const moveY = (y - centerY) / 8;
      
      this.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
    });
    
    icon.addEventListener('mouseleave', function() {
      this.style.transform = 'translate(0px, 0px) scale(1)';
    });
  });
  
  // 3D tilt effect for team cards
  const teamCards = document.querySelectorAll('.team-card');
  teamCards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      if (window.innerWidth < 992) return; // Disable on mobile
      
      const { left, top, width, height } = this.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      
      const centerX = width / 2;
      const centerY = height / 2;
      
      const moveX = (x - centerX) / 20;
      const moveY = (y - centerY) / 20;
      
      this.style.transform = `perspective(1000px) rotateX(${-moveY}deg) rotateY(${moveX}deg) translateZ(10px)`;
      
      // Apply dynamic lighting effect
      const image = this.querySelector('.team-card-image');
      if (image) {
        const percentX = (x / width) * 100;
        const percentY = (y / height) * 100;
        image.style.backgroundImage = `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%)`;
      }
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
      
      const image = this.querySelector('.team-card-image');
      if (image) {
        image.style.backgroundImage = 'none';
      }
    });
  });
  
  // Value items hover effect
  const valueItems = document.querySelectorAll('.value-item');
  valueItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      // Apply ripple effect
      const ripple = document.createElement('span');
      ripple.classList.add('value-ripple');
      ripple.style.position = 'absolute';
      ripple.style.top = '0';
      ripple.style.left = '0';
      ripple.style.width = '100%';
      ripple.style.height = '100%';
      ripple.style.backgroundColor = 'rgba(255,255,255,0.3)';
      ripple.style.borderRadius = '50px';
      ripple.style.transform = 'scale(0)';
      ripple.style.opacity = '1';
      ripple.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
      ripple.style.pointerEvents = 'none';
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.style.zIndex = '1';
      this.appendChild(ripple);
      
      // Start animation
      setTimeout(() => {
        ripple.style.transform = 'scale(2.5)';
        ripple.style.opacity = '0';
      }, 10);
      
      // Remove after animation completes
      setTimeout(() => {
        if (this.contains(ripple)) {
          this.removeChild(ripple);
        }
      }, 600);
    });
  });
}

/**
 * Setup scroll-based effects
 */
function setupScrollEffects() {
  // Parallax scrolling for background elements
  window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;
    
    // Parallax for team hero content
    const heroContent = document.querySelector('.team-hero-content');
    if (heroContent) {
      heroContent.style.transform = `translateY(${scrollY * 0.2}px)`;
      heroContent.style.opacity = 1 - (scrollY * 0.003);
    }
    
    // Parallax for floating elements
    const floatingElements = document.querySelectorAll('.cta-floating-shape');
    floatingElements.forEach((element, index) => {
      const direction = index % 2 === 0 ? 1 : -1;
      const speed = 0.15 * (index + 1);
      element.style.transform = `translateY(${scrollY * speed * direction}px)`;
    });
  });
  
  // Reveal section titles with custom animation
  const sectionTitles = document.querySelectorAll('.section-title h2');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add reveal animation class
        entry.target.classList.add('title-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  sectionTitles.forEach(title => {
    // Add required CSS styles
    title.style.position = 'relative';
    title.style.overflow = 'hidden';
    
    // Create reveal overlay
    const overlay = document.createElement('span');
    overlay.classList.add('title-overlay');
    overlay.style.position = 'absolute';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = '#cdb06f';
    overlay.style.transform = 'translateX(-100%)';
    overlay.style.zIndex = '1';
    overlay.style.pointerEvents = 'none';
    
    // Add to the DOM
    title.appendChild(overlay);
    
    // Add CSS for animation
    const style = document.createElement('style');
    style.textContent = `
      .title-revealed .title-overlay {
        animation: revealOverlay 1.2s cubic-bezier(0.77, 0, 0.175, 1) forwards;
      }
      
      @keyframes revealOverlay {
        0% { transform: translateX(-100%); }
        50% { transform: translateX(0); }
        100% { transform: translateX(100%); }
      }
    `;
    document.head.appendChild(style);
    
    // Start observing
    observer.observe(title);
  });
}

/**
 * Setup animated background effects
 */
function setupAnimatedBackgrounds() {
  // Create animated gradient background for team mission section
  const teamMission = document.querySelector('.team-mission');
  if (teamMission) {
    // Create canvas for animated gradient
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.opacity = '0.07';
    canvas.style.zIndex = '0';
    
    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = teamMission.offsetWidth;
      canvas.height = teamMission.offsetHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Insert canvas as first child
    teamMission.insertBefore(canvas, teamMission.firstChild);
    
    // Set up animation
    const ctx = canvas.getContext('2d');
    let time = 0;
    
    function animate() {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Calculate gradient points based on time
      const centerX = canvas.width / 2 + Math.sin(time * 0.5) * (canvas.width * 0.3);
      const centerY = canvas.height / 2 + Math.cos(time * 0.3) * (canvas.height * 0.2);
      
      // Create gradient
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, canvas.width * 0.8
      );
      
      // Add color stops - Golden/brown tones
      gradient.addColorStop(0, 'rgba(205, 176, 111, 0.8)');
      gradient.addColorStop(0.5, 'rgba(160, 82, 45, 0.5)');
      gradient.addColorStop(1, 'rgba(66, 12, 2, 0.2)');
      
      // Fill with gradient
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update time
      time += 0.005;
      
      // Continue animation loop
      requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
  }
} 