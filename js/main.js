// Enhanced preloader with advanced animation sequence
$(window).on('load', function() {
  // Sequence the animations for a more professional effect
  setTimeout(function() {
    $(".earth").addClass("animate-earth");
  }, 100);
  
  setTimeout(function() {
    $(".satellite, .satellite-2, .satellite-3").addClass("animate-satellite");
  }, 300);
  
  // Fade out the preloader with a delay for smooth transition
  setTimeout(function() {
    $("#preloader").fadeOut(500);
  }, 800);
});

// Fallback for preloader (in case window load event already fired)
$(document).ready(function() {
  // If page already loaded, remove preloader after a short delay
  if (document.readyState === 'complete') {
    setTimeout(function() {
      $("#preloader").fadeOut(500);
    }, 600);
  }
  
  // Set a maximum timeout for preloader (failsafe)
  setTimeout(function() {
    $("#preloader").fadeOut(500);
  }, 3000);
});

// Create a reusable function to initialize the preloader for all pages
function initPreloader() {
  // If preloader doesn't exist, create it
  if ($("#preloader").length === 0) {
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
    $('body').prepend(preloaderHTML);
  }
}

// Initialize preloader when DOM is ready (for all pages)
$(document).ready(function() {
  initPreloader();
});

// Main function wrapper
(function($){"use strict"
$('body').scrollspy({target:'#nav',offset:$(window).height()/2});

// Smooth scroll for navigation links
$("#nav .main-nav a[href^='#']").on('click',function(e){
  e.preventDefault();
  var hash = this.hash;
  var $target = $(hash);
  
  // Check if the target element exists on the page
  if ($target.length) {
    $('html, body').animate({
      scrollTop: $target.offset().top
    }, 600);
  } else {
    // If target doesn't exist on this page, maybe redirect to homepage with the hash
    if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
      window.location.href = window.location.origin + '/index.html' + hash;
    }
  }
});

// Scroll indicator click event
$('.scroll-indicator').on('click', function() {
  var $target = $('#about2');
  if ($target.length) {
    $('html, body').animate({
      scrollTop: $target.offset().top
    }, 800);
  }
  return false;
});

// Back to top button functionality with improved visibility
$('#back-to-top, .back-to-top-btn').on('click', function(){
  $('body,html').animate({
    scrollTop: 0
  }, 600);
  return false;
});

// Enhanced scroll effects
$(window).on('scroll',function(){
  var scrolled = $(window).scrollTop();
  var windowHeight = $(window).height();
  
  // Back to top button visibility
  if (scrolled > windowHeight/2) {
    $('#back-to-top').addClass('visible');
  } else {
    $('#back-to-top').removeClass('visible');
  }
  
  // Enhanced header transparency effect
  if (scrolled > 50) {
    $('header').addClass('scrolled');
    $('#nav').addClass('fixed-nav');
  } else {
    $('header').removeClass('scrolled');
    $('#nav').removeClass('fixed-nav');
  }
  
  // Parallax effect for hero section (if exists)
  var $heroBackground = $('.hero-background');
  if ($heroBackground.length) {
    $heroBackground.css('transform', 'translateY(' + scrolled * 0.4 + 'px)');
  }
  
  // Animate elements when they come into view
  animateElementsOnScroll();
});

// Mobile navigation toggle
$('#nav .nav-collapse').on('click',function(){
  $('#nav').toggleClass('open');
  $('body').toggleClass('nav-open');
});

// Close mobile menu when clicking outside
$(document).on('click', function(event) {
  if (!$(event.target).closest('#nav').length && $('#nav').hasClass('open')) {
    $('#nav').removeClass('open');
    $('body').removeClass('nav-open');
  }
});

// Dropdown menu toggle for mobile
$('.has-dropdown > a').on('click', function(e) {
  if ($(window).width() < 768) {
    e.preventDefault();
    $(this).parent().toggleClass('open-drop');
    $(this).next('.dropdown-menu').slideToggle(300);
  }
});

// Initialize magnificPopup for work items
$('.work').magnificPopup({
  delegate:'.lightbox',
  type:'image'
});

// Initialize owl carousel for about slider
$('#about-slider').owlCarousel({
  items:1,
  loop:true,
  margin:15,
  nav:true,
  navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
  dots:true,
  autoplay:true,
  animateOut:'fadeOut'
});

// Initialize testimonial slider
$('#h4hovimonial-slider').owlCarousel({
  loop:true,
  margin:15,
  dots:true,
  nav:false,
  autoplay:true,
  responsive:{
    0:{items:1},
    992:{items:2}
  }
});

// Initialize event slider
$('#event-slider').owlCarousel({
  items:1,
  loop:true,
  margin:15,
  nav:true,
  navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
  dots:true,
  autoplay:true,
  animateOut:'fadeOut'
});

// Initialize glimpse slider
$('#glimpse-slider').owlCarousel({
  items:1,
  loop:true,
  margin:15,
  nav:true,
  navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
  dots:true,
  autoplay:true,
  animateOut:'fadeOut'
});

// Initialize conference2023 slider
$('#conference2023').owlCarousel({
  items:1,
  loop:true,
  margin:15,
  nav:true,
  navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
  dots:true,
  autoplay:true,
  animateOut:'fadeOut'
});

// Animate elements when they come into view
function animateElementsOnScroll() {
  if ($('.animate-on-scroll').length === 0) return;
  
  $('.animate-on-scroll').each(function() {
    if ($(this).length) {
      var elementPos = $(this).offset().top;
      var topOfWindow = $(window).scrollTop();
      var windowHeight = $(window).height();
      
      if (elementPos < topOfWindow + windowHeight - 50) {
        var animationClass = $(this).data('animation') || 'fadeIn';
        $(this).addClass(animationClass);
      }
    }
  });
}

// Check for saved dark/light mode preference
$(document).ready(function() {
  // Dark mode code removed
  
  // Add animation classes to elements
  initAnimatedElements();
  
  // Highlight active navigation item based on URL
  highlightActiveNavItem();
  
  // Initialize newsletter form
  initNewsletterForm();
});

// Initialize newsletter form
function initNewsletterForm() {
  $('.newsletter-form').on('submit', function(e) {
    e.preventDefault();
    var email = $(this).find('.newsletter-input').val();
    if(isValidEmail(email)) {
      // Here you would typically send the email to your server
      alert('Thank you for subscribing!');
      $(this).find('.newsletter-input').val('');
    } else {
      alert('Please enter a valid email address');
    }
  });
}

// Email validation
function isValidEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

// Initialize animated elements
function initAnimatedElements() {
  // Add animation classes to elements that should animate on scroll
  $('.stastics-card, .about, .section-header, .work, .footer-column').addClass('animate-on-scroll');
  
  // Set data-animation attributes
  $('.stastics-card').attr('data-animation', 'fadeInUp');
  $('.about').attr('data-animation', 'fadeInUp');
  $('.section-header').attr('data-animation', 'fadeInDown');
  $('.work').attr('data-animation', 'fadeInUp');
  $('.footer-column').attr('data-animation', 'fadeInUp');
  
  // Trigger initial animation check
  animateElementsOnScroll();
}

// Highlight active navigation item based on URL
function highlightActiveNavItem() {
  try {
    var currentLocation = window.location.pathname;
    var fileName = currentLocation.substring(currentLocation.lastIndexOf('/') + 1);
    
    $('.main-nav li a').each(function() {
      var linkHref = $(this).attr('href');
      if (!linkHref) return;
      
      // Handle both absolute and relative paths
      var linkFileName = linkHref.substring(linkHref.lastIndexOf('/') + 1);
      
      if (linkFileName === fileName || 
          (fileName === '' && (linkFileName === 'index.html' || linkHref === './' || linkHref === '/'))) {
        $(this).parent().addClass('active');
      }
    });
  } catch (e) {
    console.log('Error in highlightActiveNavItem: ', e);
  }
}

})(jQuery);

// Enhanced statistics counter with better animation
function startCounter() {
  let valueDisplays = document.querySelectorAll(".number");
  valueDisplays.forEach((valueDisplay) => {
    let startValue = 0;
    let endValue = parseInt(valueDisplay.getAttribute("data-val"));
    let duration = Math.floor(2000 / endValue);
    let counter = setInterval(function () {
      startValue += 1;
      valueDisplay.textContent = startValue + "+";
      if (startValue == endValue) {
        clearInterval(counter);
        // Add a subtle bounce effect after counting completes
        $(valueDisplay).addClass('bounce-once');
        setTimeout(function() {
          $(valueDisplay).removeClass('bounce-once');
        }, 1000);
      }
    }, duration);
  });
}

// Improved intersection observer for counter
let observerOptions = {
  threshold: 0.3,
  rootMargin: '0px 0px -100px 0px'
};

let observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      startCounter();
      observer.disconnect(); // Stop observing after the counter starts
    }
  });
}, observerOptions);

document.addEventListener("DOMContentLoaded", function() {
  // Observe statistics section
  const statsSection = document.querySelector('.stats-container');
  if (statsSection) {
    observer.observe(statsSection);
  }
  
  // Add decorative elements to footer
  const footer = document.querySelector('.modern-footer');
  if (footer) {
    const leftDecoration = document.createElement('div');
    leftDecoration.className = 'footer-decoration left';
    
    const rightDecoration = document.createElement('div');
    rightDecoration.className = 'footer-decoration right';
    
    footer.appendChild(leftDecoration);
    footer.appendChild(rightDecoration);
  }
});

// set up text to print, each item in array is new line
var aText = new Array(
  "STEM Model United",
  "Nations",
  ""
);
var iSpeed = 150; // time delay of print out
var iIndex = 0; // start printing array at this posision
var iArrLength = aText[0].length; // the length of the text array
var iScrollAt = 20; // start scrolling up at this many lines
 
var iTextPos = 0; // initialise text position
var sContents = ''; // initialise contents variable
var iRow; // initialise current row

function typewriter()
{
 var destination = document.getElementById("typedtext");
 if (!destination) return; // Exit if the element doesn't exist
 
 sContents =  ' ';
 iRow = Math.max(0, iIndex-iScrollAt);
 
 while ( iRow < iIndex ) {
  sContents += aText[iRow++] + '<br>';
 }
 destination.innerHTML = sContents  + aText[iIndex].substring(0, iTextPos) + "_";
 if ( iTextPos++ == iArrLength ) {
  iTextPos = 0;
  iIndex++;
  if ( iIndex != aText.length ) {
   iArrLength = aText[iIndex].length;
   setTimeout("typewriter()",200);
  }
 } else {
  setTimeout("typewriter()", iSpeed);
 }
};

window.addEventListener("load", function(){
    // Only call typewriter if the element exists
    if (document.getElementById("typedtext")) {
        typewriter();
    }
});
//end type writer

//scrollreveal
const scrollRevealOption = {
    distance: "50px",
    origin: "bottom",
    duration: 1000,
};

ScrollReveal().reveal(".col-md-12 h2", {
    ...scrollRevealOption,
});
ScrollReveal().reveal(".col-md-12 h6", {
    ...scrollRevealOption,
    delay: 250,
});
ScrollReveal().reveal(".col-md-12 p", {
    ...scrollRevealOption,
    delay: 500,
});
ScrollReveal().reveal(".section-header .title", {
    ...scrollRevealOption,
});
ScrollReveal().reveal(".col-md-6 p", {
    ...scrollRevealOption,
    delay: 250,
});
ScrollReveal().reveal(".col-md-6 .imggg", {
    ...scrollRevealOption,
    origin: "right",
    delay: 500,
});
ScrollReveal().reveal(".become-a-delegate button", {
    ...scrollRevealOption,
    origin: "bottom",
    delay: 500,
});

ScrollReveal().reveal(".abouthov img", {
    ...scrollRevealOption,
    origin: "top",
});
ScrollReveal().reveal(".abouthov h4", {
    ...scrollRevealOption,
    origin: "left",
    delay: 250,
});
ScrollReveal().reveal(".abouthov p", {
    ...scrollRevealOption,
    origin: "bottom",
    delay: 500,
});
ScrollReveal().reveal(".p-1", {
    ...scrollRevealOption,
    origin: "bottom",
    delay: 500,
});
ScrollReveal().reveal(".p-2", {
    ...scrollRevealOption,
    origin: "bottom",
    delay: 550,
});
ScrollReveal().reveal(".p-3", {
    ...scrollRevealOption,
    origin: "bottom",
    delay: 600,
});
ScrollReveal().reveal(".p-4", {
    ...scrollRevealOption,
    origin: "bottom",
    delay: 650,
});
ScrollReveal().reveal(".p-5", {
    ...scrollRevealOption,
    origin: "bottom",
    delay: 700,
});

// Remove dark mode JavaScript completely
/* DARK MODE - Removed as requested */

        
        // Header
        // 
        header = document.querySelector('header');
var lastScrollTop = 0;

window.addEventListener("scroll", function(){
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop){
        header.style.top = "-80px";
    } else {
        header.style.top = "0px";
    }
    lastScrollTop = scrollTop;
});
        // 
        // END Header
        // 
        
