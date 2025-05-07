# Advanced Team Page Style Enhancement
# This script applies cutting-edge styling to the Meet The Board page

# Read the current Team.html file
Write-Host "Reading Team.html..."
$htmlContent = Get-Content -Path "Team.html" -Raw

# Create advanced style block with modern animations and effects
$advancedStyle = @"
<style>
    /* Advanced styling for the entire team page */
    .flex-container {
        background: linear-gradient(135deg, #420c02 0%, #2c0802 100%) !important;
        position: relative !important;
        overflow: hidden !important;
    }
    
    .flex-container::before {
        content: '' !important;
        position: absolute !important;
        width: 100% !important;
        height: 100% !important;
        top: 0 !important;
        left: 0 !important;
        background: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTAwMCAxMDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiPjxwYXRoIGQ9Ik0gMjAsLTIwIEwgLTIwLDIwIE0gMCwwIEwgNDAsNDAgTSA0MCwwIEwgMCw0MCIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEuNSI+PC9wYXRoPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSI+PC9yZWN0Pjwvc3ZnPg==') !important;
        opacity: 0.2 !important;
        z-index: 0 !important;
        pointer-events: none !important;
    }
    
    .flex-container h1 {
        font-family: 'Montserrat', sans-serif !important;
        font-weight: 800 !important;
        text-transform: uppercase !important;
        letter-spacing: 2px !important;
        background: linear-gradient(90deg, #dcd8cc, #CDB06F) !important;
        -webkit-background-clip: text !important;
        -webkit-text-fill-color: transparent !important;
        text-shadow: 0 5px 15px rgba(0,0,0,0.2) !important;
        animation: textShimmer 3s infinite !important;
        position: relative !important;
        z-index: 1 !important;
    }
    
    @keyframes textShimmer {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    
    /* Floating animations for cards */
    @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
    }
    
    /* Advanced year toggle styling */
    .year-toggle {
        position: relative !important;
        z-index: 5 !important;
        background: rgba(255, 255, 255, 0.05) !important;
        backdrop-filter: blur(10px) !important;
        -webkit-backdrop-filter: blur(10px) !important;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2) !important;
        border: 1px solid rgba(255, 255, 255, 0.1) !important;
        padding: 10px !important;
        border-radius: 50px !important;
        transform: translateY(-25px) !important;
    }
    
    .year-btn {
        position: relative !important;
        background: transparent !important;
        border: none !important;
        color: rgba(255, 255, 255, 0.7) !important;
        font-weight: 600 !important;
        letter-spacing: 1px !important;
        padding: 12px 30px !important;
        border-radius: 25px !important;
        transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1) !important;
        overflow: hidden !important;
    }
    
    .year-btn.active {
        background: linear-gradient(135deg, #CDB06F, #dcd8cc) !important;
        color: #3a0a01 !important;
        box-shadow: 0 5px 15px rgba(205, 176, 111, 0.4) !important;
    }
    
    .year-btn:hover:not(.active) {
        background: rgba(255, 255, 255, 0.1) !important;
        color: white !important;
    }
    
    /* Advanced 3D Profile Cards */
    .profile-card {
        perspective: 1000px !important;
        transform-style: preserve-3d !important;
        width: 280px !important;
        height: 400px !important;
        margin: 25px !important;
        transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1) !important;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1) !important;
        border-radius: 20px !important;
        overflow: hidden !important;
        animation: float 6s ease-in-out infinite !important;
        animation-delay: calc(var(--animation-order) * 0.2s) !important;
    }
    
    .profile-card:hover {
        transform: translateY(-20px) rotateX(5deg) rotateY(5deg) !important;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3) !important;
    }
    
    .profile-card .img {
        height: 80% !important;
        clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%) !important;
        position: relative !important;
    }
    
    .profile-card .img::after {
        content: '' !important;
        position: absolute !important;
        bottom: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 50% !important;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.75), transparent) !important;
        opacity: 0 !important;
        transition: opacity 0.3s ease !important;
    }
    
    .profile-card:hover .img::after {
        opacity: 1 !important;
    }
    
    .profile-card .img img {
        transition: transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) !important;
        filter: brightness(0.95) contrast(1.1) !important;
    }
    
    .profile-card:hover .img img {
        transform: scale(1.15) !important;
    }
    
    .profile-card .caption {
        position: absolute !important;
        bottom: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 90px !important;
        background: white !important;
        padding: 20px !important;
        box-sizing: border-box !important;
        transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1) !important;
        z-index: 2 !important;
        border-top: 4px solid #CDB06F !important;
        transform: translateY(0) !important;
    }
    
    .profile-card:hover .caption {
        height: 180px !important;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(255, 255, 255, 0.9)) !important;
        backdrop-filter: blur(5px) !important;
    }
    
    .profile-card .caption h3 {
        margin: 0 0 5px 0 !important;
        font-size: 1.2rem !important;
        font-weight: 700 !important;
        color: #420c02 !important;
        transition: all 0.3s ease !important;
        position: relative !important;
        display: inline-block !important;
    }
    
    .profile-card .caption h3::after {
        content: '' !important;
        position: absolute !important;
        bottom: -4px !important;
        left: 0 !important;
        width: 0 !important;
        height: 2px !important;
        background: #CDB06F !important;
        transition: width 0.5s ease !important;
    }
    
    .profile-card:hover .caption h3::after {
        width: 100% !important;
    }
    
    .profile-card .caption p {
        margin: 0 0 20px 0 !important;
        font-size: 0.9rem !important;
        color: #CDB06F !important;
        font-weight: 500 !important;
        opacity: 0.9 !important;
        transition: opacity 0.3s ease !important;
    }
    
    .profile-card .social-links {
        position: absolute !important;
        bottom: 20px !important;
        left: 0 !important;
        width: 100% !important;
        display: flex !important;
        justify-content: center !important;
        gap: 15px !important;
        opacity: 0 !important;
        transform: translateY(20px) !important;
        transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1) !important;
    }
    
    .profile-card:hover .social-links {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .profile-card .social-links a {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        width: 40px !important;
        height: 40px !important;
        border-radius: 50% !important;
        background: #420c02 !important;
        color: white !important;
        font-size: 16px !important;
        transition: all 0.3s ease !important;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1) !important;
        transform: translateY(0) scale(1) !important;
    }
    
    .profile-card .social-links a:hover {
        background: #CDB06F !important;
        transform: translateY(-5px) scale(1.1) !important;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15) !important;
    }
    
    /* Heading Styles */
    .highboard h2 {
        position: relative !important;
        font-family: 'Montserrat', sans-serif !important;
        font-size: 2.5rem !important;
        font-weight: 700 !important;
        color: #420c02 !important;
        margin: 60px 0 40px !important;
        text-align: center !important;
        overflow: hidden !important;
    }
    
    .highboard h2 span {
        display: block !important;
        font-size: 1rem !important;
        color: #CDB06F !important;
        margin-bottom: 5px !important;
        letter-spacing: 3px !important;
        text-transform: uppercase !important;
        opacity: 0.8 !important;
    }
    
    .highboard h2::after {
        content: '' !important;
        position: absolute !important;
        bottom: -15px !important;
        left: 50% !important;
        transform: translateX(-50%) !important;
        width: 80px !important;
        height: 3px !important;
        background: linear-gradient(to right, #420c02, #CDB06F) !important;
        border-radius: 3px !important;
    }
    
    /* Scroll animations */
    .shelf {
        opacity: 0 !important;
        transform: translateY(30px) !important;
        transition: all 0.8s cubic-bezier(0.19, 1, 0.22, 1) !important;
    }
    
    .shelf.visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    /* Year indicator */
    .year-indicator {
        position: absolute !important;
        top: 20px !important;
        right: 20px !important;
        background: linear-gradient(135deg, #CDB06F, #dcd8cc) !important;
        color: #420c02 !important;
        padding: 8px 20px !important;
        border-radius: 30px !important;
        font-weight: 700 !important;
        font-size: 1.2rem !important;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2) !important;
        z-index: 10 !important;
    }
    
    /* Theme color variables for consistency */
    :root {
        --primary-color: #420c02;
        --secondary-color: #CDB06F;
        --background-color: #ffffff;
        --text-color: #333333;
        --accent-color: #dcd8cc;
    }
</style>
"@

# Create script for advanced animations and interactions
$advancedScript = @"
<script>
    // Advanced animations and interactions
    document.addEventListener('DOMContentLoaded', function() {
        // Set animation order for staggered card animations
        document.querySelectorAll('.profile-card').forEach((card, index) => {
            card.style.setProperty('--animation-order', index % 5);
            
            // Add tilt effect
            card.addEventListener('mousemove', handleTilt);
            card.addEventListener('mouseleave', resetTilt);
        });
        
        // Handle card tilt effect
        function handleTilt(e) {
            const card = this;
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            const angleX = (e.clientY - cardCenterY) / 15;
            const angleY = (cardCenterX - e.clientX) / 15;
            
            card.style.transform = \`translateY(-20px) rotateX(\${angleX}deg) rotateY(\${angleY}deg)\`;
        }
        
        // Reset tilt on mouse leave
        function resetTilt() {
            this.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
        }
        
        // Scroll animations for shelves
        const shelves = document.querySelectorAll('.shelf');
        
        // Initial check in case elements are already in view
        checkVisibility();
        
        // Listen for scroll
        window.addEventListener('scroll', checkVisibility);
        
        function checkVisibility() {
            shelves.forEach(shelf => {
                const rect = shelf.getBoundingClientRect();
                const windowHeight = window.innerHeight || document.documentElement.clientHeight;
                
                if (rect.top <= windowHeight * 0.8) {
                    shelf.classList.add('visible');
                }
            });
        }
        
        // Enhanced team switching
        document.querySelectorAll('.year-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                // Reset all shelves to invisible
                shelves.forEach(shelf => {
                    shelf.classList.remove('visible');
                });
                
                // Wait for container to change, then recheck visibility
                setTimeout(checkVisibility, 100);
            });
        });
        
        // Add particle background to header
        createParticleBackground();
        
        function createParticleBackground() {
            const headerContainer = document.querySelector('.flex-container');
            if (!headerContainer) return;
            
            const particleContainer = document.createElement('div');
            particleContainer.className = 'particle-container';
            particleContainer.style.position = 'absolute';
            particleContainer.style.top = '0';
            particleContainer.style.left = '0';
            particleContainer.style.width = '100%';
            particleContainer.style.height = '100%';
            particleContainer.style.overflow = 'hidden';
            particleContainer.style.pointerEvents = 'none';
            particleContainer.style.zIndex = '1';
            
            headerContainer.insertBefore(particleContainer, headerContainer.firstChild);
            
            // Create particles
            const particleCount = 20;
            for (let i = 0; i < particleCount; i++) {
                createParticle(particleContainer);
            }
        }
        
        function createParticle(container) {
            const particle = document.createElement('div');
            const size = Math.random() * 5 + 2;
            
            particle.style.position = 'absolute';
            particle.style.width = \`\${size}px\`;
            particle.style.height = \`\${size}px\`;
            particle.style.borderRadius = '50%';
            particle.style.background = 'rgba(255, 255, 255, 0.1)';
            particle.style.left = \`\${Math.random() * 100}%\`;
            particle.style.top = \`\${Math.random() * 100}%\`;
            particle.style.opacity = Math.random() * 0.5 + 0.3;
            particle.style.transform = 'translateY(0)';
            particle.style.transition = 'transform ease-out, opacity ease-out';
            particle.style.transitionDuration = \`\${Math.random() * 5 + 10}s\`;
            
            container.appendChild(particle);
            
            // Animate particle
            setTimeout(() => {
                particle.style.transform = \`translateY(-\${Math.random() * 50 + 100}px)\`;
                particle.style.opacity = '0';
                
                // Remove and recreate particle when animation ends
                particle.addEventListener('transitionend', function() {
                    particle.remove();
                    createParticle(container);
                });
            }, 100);
        }
    });
</script>
"@

# Apply the changes to the HTML file
Write-Host "Applying advanced styling and animations..."

# Add style block before </head>
$htmlContent = $htmlContent -replace "</head>", "$advancedStyle`r`n</head>"

# Add script block before </body>
$htmlContent = $htmlContent -replace "</body>", "$advancedScript`r`n</body>"

# Save the modified content
Write-Host "Saving changes..."
$htmlContent | Out-File -FilePath "Team.html" -Encoding utf8

Write-Host "Advanced styling completed successfully!"
Write-Host "The Meet The Board page now has cutting-edge design with 3D effects, animations, and modern styling." 