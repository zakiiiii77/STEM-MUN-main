/**
 * Dropdown menu and navigation fixes
 */
$(document).ready(function() {
  // Fix for dropdown menus on mobile
  $('.has-dropdown > a').on('click', function(e) {
    if ($(window).width() < 768) {
      e.preventDefault();
      $(this).parent().toggleClass('open-drop');
      $(this).next('.dropdown-menu').slideToggle(300);
    }
  });
  
  // Fix for dropdown menus on desktop
  $('.has-dropdown').on('mouseenter', function() {
    if ($(window).width() >= 768) {
      $(this).find('.dropdown-menu').stop(true, true).css('display', 'block');
    }
  }).on('mouseleave', function() {
    if ($(window).width() >= 768) {
      $(this).find('.dropdown-menu').stop(true, true).css('display', 'none');
    }
  });
  
  // Fix for active navigation items
  $('.main-nav li a').each(function() {
    var href = $(this).attr('href');
    if (href) {
      // Check if the current URL path matches this link
      var currentPath = window.location.pathname.split('/').pop();
      if (href === currentPath || 
          (currentPath === '' && href === 'index.html') ||
          (currentPath === window.location.pathname && href === 'index.html')) {
        $(this).parent().addClass('active');
      }
      
      // Special case for section links on the same page
      if (href.startsWith('#') && window.location.pathname.endsWith('index.html')) {
        $(this).on('click', function() {
          $('.main-nav li').removeClass('active');
          $(this).parent().addClass('active');
        });
      }
    }
  });
  
  // Fix for links with hashes
  $('a[href^="#"]').on('click', function(e) {
    var target = $(this.hash);
    if (target.length) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 600);
      return false;
    }
  });
  
  // Fix for Home link
  if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
    $('.main-nav li:first-child').addClass('active');
  }
}); 