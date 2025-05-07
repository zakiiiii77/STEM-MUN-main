# STEM Model United Nations Website

This is the official website for STEM Model United Nations, featuring a modern and responsive design with enhanced UI elements.

## Recent Enhancements

### Header Improvements
- **Glass Morphism Effect**: Added backdrop-filter for a modern blurred glass effect
- **Advanced Navigation**: Implemented dropdown menus for better content organization
- **Animated Effects**: Enhanced hover animations with cubic-bezier timing functions
- **CTA Button**: Added "Become a Delegate" button with a polished animation
- **Dark Mode Toggle**: Implemented a proper dark mode toggle switch
- **Mobile Optimization**: Improved mobile menu with better transitions and organization
- **Scroll Behavior**: Enhanced the header's scroll behavior with smoother transitions

### Footer Improvements
- **Multi-Column Layout**: Implemented a responsive grid layout with multiple columns
- **Contact Information**: Added a properly formatted contact section with icons
- **Newsletter Signup**: Added a newsletter subscription form
- **Better Social Icons**: Enhanced social media icons with modern hover effects
- **Legal Links**: Added proper legal links for a professional appearance
- **Decorative Elements**: Added subtle decorative elements for visual interest
- **Back-to-Top Button**: Improved back-to-top button with animation

### General Improvements
- **Code Quality**: Better organized CSS with logical structure
- **Performance**: Optimized animations and transitions for better performance
- **Consistency**: Applied the same design patterns across multiple pages
- **Responsiveness**: Improved mobile experience with better breakpoints
- **Modern Effects**: Added cubic-bezier animations for more natural movement

## Technologies Used
- HTML5
- CSS3 with animations and transitions
- JavaScript with jQuery
- Font Awesome for icons
- Responsive design for all devices

## Structure
- `css/` - Contains all CSS files
  - `header.css` - Header styles
  - `footer.css` - Footer styles
  - `variables.css` - CSS variables for consistent theming
  - `animations.css` - Animation keyframes and classes
  - `utilities.css` - Utility classes and common elements
- `js/` - Contains JavaScript files
  - `main.js` - Main JavaScript functionality 
- `img/` - Contains all images and assets

## Features
- Modern responsive design
- Interactive elements with smooth animations
- Dark mode support
- Mobile-friendly navigation
- Consistent design language across all pages

# STEM MUN Website UI Enhancements

This repository contains UI enhancements for the STEM Model United Nations website, with a focus on modern design elements, responsive layouts, and interactive components.

## Recent UI Improvements

### Meet The Board Page Enhancement

The "Meet The Board" page has been completely redesigned with a modern, visually appealing interface that includes:

- **Interactive Team Cards**: Modern cards with hover effects, image scaling, and overlay transitions
- **Particle.js Background**: Dynamic, interactive particle background in the hero section
- **AOS Animations**: Smooth scroll-triggered animations for content elements
- **Modern Typography**: Enhanced typography with gradient text effects and custom underlines
- **Interactive Values Section**: Animated value items with hover effects
- **Enhanced CTA Section**: Modern call-to-action section with floating shapes and gradient backgrounds
- **Parallax Effects**: Subtle parallax on featured member card for increased depth
- **Custom Lightbox**: Interactive image lightbox for team member photos
- **Responsive Design**: Fully responsive layout for all device sizes
- **Advanced CSS Features**: Using modern CSS techniques like grid layout, flexbox, CSS variables, and transitions

### Code Organization

The enhanced UI is structured across several files:

- **team-enhanced.css**: Main stylesheet for the team/board page
- **cta-section.css**: Reusable styles for call-to-action sections
- **footer.css**: Updated modern footer styles
- **team-enhancements.js**: JavaScript for interactive features and animations

### Features Added

1. **Particle.js Integration**: Dynamic interactive particles in the hero section
2. **Advanced Hover Effects**: Interactive cards with multi-stage transitions
3. **Custom Cursor Effects**: Special cursor indicators for interactive elements
4. **ScrollReveal Integration**: Scroll-triggered animations throughout the page
5. **Lightbox Functionality**: Custom-built lightbox for viewing team photos
6. **Parallax Mouse Movement**: 3D-like effects that respond to mouse movement
7. **Gradient Text**: Modern gradient text effects for section titles
8. **Animated UI Elements**: Smooth transitions and animations for UI components
9. **Modern Card Design**: Elevated card design with shadows, overlays, and transitions
10. **Floating Elements**: Decorative shapes positioned with absolute positioning

## Conference Page Fixes

The following fixes were also implemented on the conference page:

1. **Fixed Circle Elements**: Corrected overlapping brown circular elements
2. **Navigation Button Fix**: Improved carousel/slider navigation positioning
3. **Advanced CSS Background**: Replaced background image with CSS-only solution
4. **Z-Index Management**: Proper layering of UI elements to prevent overlap

## How to Use

1. Link the enhanced CSS files in your HTML:
   ```html
   <link type="text/css" rel="stylesheet" href="css/team-enhanced.css" />
   <link type="text/css" rel="stylesheet" href="css/cta-section.css" />
   ```

2. Include the required JavaScript files:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"></script>
   <script src="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js"></script>
   <script src="js/team-enhancements.js"></script>
   ```

3. Make sure to include the AOS CSS:
   ```html
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css" />
   ```

4. Initialize AOS in your JavaScript:
   ```javascript
   AOS.init({
       duration: 1000,
       easing: 'ease-in-out',
       once: true,
       mirror: false
   });
   ```

## Dependencies

- Bootstrap 4
- jQuery
- Font Awesome
- AOS (Animate On Scroll)
- Particles.js
- ScrollReveal

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Future Improvements

- Add dark mode toggle
- Implement more interactive animations
- Create additional page templates with the new design system
- Optimize images and assets for faster loading
