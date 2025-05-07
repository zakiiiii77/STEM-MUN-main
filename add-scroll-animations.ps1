# Advanced Scroll Animations for Team Page
# This script adds scroll-triggered animations and effects

# Read the current Team.html file
Write-Host "Reading Team.html..."
$htmlContent = Get-Content -Path "Team.html" -Raw

# Create style block for scroll animations
$scrollAnimationStyle = @"
<style>
    /* Scroll-triggered animation base styles */
    .scroll-reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), 
                    transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
    }
    
    .scroll-reveal.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Animation variations */
    .reveal-left {
        transform: translateX(-50px);
    }
    
    .reveal-right {
        transform: translateX(50px);
    }
    
    .reveal-zoom {
        transform: scale(0.8);
    }
    
    .reveal-rotate {
        transform: rotate(-5deg) scale(0.9);
    }
    
    /* When revealed */
    .reveal-left.revealed,
    .reveal-right.revealed,
    .reveal-zoom.revealed,
    .reveal-rotate.revealed {
        transform: translateX(0) rotate(0) scale(1);
    }
    
    /* Staggered delays */
    .scroll-reveal[data-delay="1"] { transition-delay: 0.1s; }
    .scroll-reveal[data-delay="2"] { transition-delay: 0.2s; }
    .scroll-reveal[data-delay="3"] { transition-delay: 0.3s; }
    .scroll-reveal[data-delay="4"] { transition-delay: 0.4s; }
    .scroll-reveal[data-delay="5"] { transition-delay: 0.5s; }
    
    /* Smooth scrolling for whole page */
    html {
        scroll-behavior: smooth !important;
    }
    
    /* Parallax background effect */
    .parallax-bg {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 100% !important;
        background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQgPSIyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGZpbGw9InJnYmEoMjA1LCAxNzYsIDExMSwgMC4wNSkiIGN4PSI1IiBjeT0iNSIgcj0iMiIvPjwvZz48L3N2Zz4=') !important;
        background-repeat: repeat !important;
        z-index: -1 !important;
        pointer-events: none !important;
        opacity: 0.4 !important;
    }
    
    /* Progress indicator */
    .scroll-progress {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 0% !important;
        height: 4px !important;
        background: linear-gradient(to right, #580D00, #CDB06F) !important;
        z-index: 1000 !important;
        transition: width 0.2s ease-out !important;
    }
    
    /* Scroll to top button */
    .scroll-to-top {
        position: fixed !important;
        bottom: 20px !important;
        right: 20px !important;
        width: 50px !important;
        height: 50px !important;
        background: linear-gradient(135deg, #580D00, #420c02) !important;
        color: white !important;
        border-radius: 50% !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        cursor: pointer !important;
        opacity: 0 !important;
        transform: translateY(20px) !important;
        transition: all 0.3s ease !important;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2) !important;
        z-index: 900 !important;
    }
    
    .scroll-to-top.visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .scroll-to-top:hover {
        background: linear-gradient(135deg, #CDB06F, #dcd8cc) !important;
        color: #420c02 !important;
        transform: translateY(-5px) !important;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3) !important;
    }
    
    /* Arrow icon */
    .scroll-to-top-arrow {
        border: solid white !important;
        border-width: 0 3px 3px 0 !important;
        display: inline-block !important;
        padding: 5px !important;
        transform: rotate(-135deg) !important;
        margin-top: 5px !important;
        transition: border-color 0.3s ease !important;
    }
    
    .scroll-to-top:hover .scroll-to-top-arrow {
        border-color: #420c02 !important;
    }
</style>
"@

# Create script for scroll animations
$scrollAnimationScript = @"
<script>
    // Advanced scroll animations
    document.addEventListener('DOMContentLoaded', function() {
        // Add scroll progress indicator
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);
        
        // Add scroll to top button
        const scrollTopBtn = document.createElement('div');
        scrollTopBtn.className = 'scroll-to-top';
        scrollTopBtn.innerHTML = '<div class="scroll-to-top-arrow"></div>';
        document.body.appendChild(scrollTopBtn);
        
        // Add parallax background
        const parallaxBg = document.createElement('div');
        parallaxBg.className = 'parallax-bg';
        document.body.insertBefore(parallaxBg, document.body.firstChild);
        
        // Add scroll reveal classes
        addScrollRevealClasses();
        
        // Initial check for elements in viewport
        checkRevealElements();
        updateScrollProgress();
        checkScrollToTopButton();
        
        // Add scroll event listeners
        window.addEventListener('scroll', function() {
            checkRevealElements();
            updateScrollProgress();
            checkScrollToTopButton();
            moveParallaxBackground();
        });
        
        // Add click event to scroll to top button
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        // Function to add scroll reveal classes to elements
        function addScrollRevealClasses() {
            // Add to section headings
            document.querySelectorAll('.highboard h2').forEach((heading, index) => {
                heading.classList.add('scroll-reveal', 'reveal-zoom');
                heading.setAttribute('data-delay', index % 5 + 1);
            });
            
            // Add to profile cards with alternating animations
            document.querySelectorAll('.profile-card').forEach((card, index) => {
                if (index % 3 === 0) {
                    card.classList.add('scroll-reveal', 'reveal-left');
                } else if (index % 3 === 1) {
                    card.classList.add('scroll-reveal', 'reveal-zoom');
                } else {
                    card.classList.add('scroll-reveal', 'reveal-right');
                }
                card.setAttribute('data-delay', index % 5 + 1);
            });
            
            // Add to year toggle
            const yearToggle = document.querySelector('.year-toggle');
            if (yearToggle) {
                yearToggle.classList.add('scroll-reveal');
            }
        }
        
        // Function to check if elements should be revealed
        function checkRevealElements() {
            const windowHeight = window.innerHeight;
            const scrollY = window.scrollY;
            
            document.querySelectorAll('.scroll-reveal').forEach(el => {
                const rect = el.getBoundingClientRect();
                const elTop = rect.top + scrollY;
                
                if (scrollY + windowHeight * 0.85 > elTop) {
                    el.classList.add('revealed');
                }
            });
        }
        
        // Function to update scroll progress bar
        function updateScrollProgress() {
            const windowScroll = document.documentElement.scrollTop || document.body.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (windowScroll / height) * 100;
            
            progressBar.style.width = scrolled + '%';
        }
        
        // Function to check if scroll to top button should be visible
        function checkScrollToTopButton() {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }
        
        // Function to move parallax background
        function moveParallaxBackground() {
            const scrollY = window.scrollY;
            parallaxBg.style.transform = `translateY(${scrollY * 0.3}px)`;
        }
        
        // Add smooth loading to whole page
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.8s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
            
            // Trigger initial animations
            setTimeout(checkRevealElements, 500);
        }, 100);
    });
</script>
"@

# Apply the changes to the HTML file
Write-Host "Applying advanced scroll animations..."

# Add style block before </head>
$htmlContent = $htmlContent -replace "</head>", "$scrollAnimationStyle`r`n</head>"

# Add script block before </body>
$htmlContent = $htmlContent -replace "</body>", "$scrollAnimationScript`r`n</body>"

# Save the modified content
Write-Host "Saving changes..."
$htmlContent | Out-File -FilePath "Team.html" -Encoding utf8

Write-Host "Scroll animations added successfully!"
Write-Host "The Meet The Board page now has advanced scroll-triggered animations and effects." 