/**
 * Enhanced Team Toggle Functionality
 * Controls switching between 2024 and 2025 team displays with advanced animations
 */

// Execute when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("Enhanced team toggle script loaded");
    
    // Get all required elements
    const team2024 = document.getElementById('team2024');
    const team2025 = document.getElementById('team2025');
    const btn2024 = document.querySelector('.year-btn[data-year="2024"]');
    const btn2025 = document.querySelector('.year-btn[data-year="2025"]');
    const teamSection = document.querySelector('.team-section');
    
    // Verify elements exist
    if (!team2024) console.error("team2024 container missing");
    if (!team2025) console.error("team2025 container missing");
    if (!btn2024) console.error("2024 button missing");
    if (!btn2025) console.error("2025 button missing");
    
    if (!team2024 || !team2025 || !btn2024 || !btn2025) {
        console.error("Critical elements missing - cannot proceed with team toggle");
        return;
    }
    
    // Create and add shine elements to buttons
    createButtonEffects();
    
    // Add particles to team section for visual flair
    if (teamSection) {
        createParticles();
    }
    
    // Set initial state - 2025 team visible
    setInitialState();
    
    // Add direct click handlers with animated transitions
    btn2024.addEventListener('click', function(e) {
        e.preventDefault();
        animateButtonClick(this);
        showTeam(2024);
    });
    
    btn2025.addEventListener('click', function(e) {
        e.preventDefault();
        animateButtonClick(this);
        showTeam(2025);
    });
    
    /**
     * Set initial state when page loads
     */
    function setInitialState() {
        // Default to showing 2025 team
        showTeam(2025);
        
        // Add initial animation to the visible team
        setTimeout(() => {
            const activeTeam = document.querySelector('.team-container.active');
            if (activeTeam) {
                const cards = activeTeam.querySelectorAll('.profile-card');
                cards.forEach((card, index) => {
                    card.style.setProperty('--card-index', index);
                    card.style.animationDelay = `${0.1 * index}s`;
                });
            }
        }, 100);
    }
    
    /**
     * Animate button click with ripple effect
     * @param {HTMLElement} button - The clicked button
     */
    function animateButtonClick(button) {
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('btn-ripple');
        button.appendChild(ripple);
        
        // Calculate diameter based on button's dimensions
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        ripple.style.width = ripple.style.height = `${diameter}px`;
        
        // Position the ripple centered on click
        const rect = button.getBoundingClientRect();
        ripple.style.left = `${button.clientWidth / 2 - diameter / 2}px`;
        ripple.style.top = `${button.clientHeight / 2 - diameter / 2}px`;
        
        // Remove ripple after animation completes
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    /**
     * Create button shine and ripple effects
     */
    function createButtonEffects() {
        const buttons = document.querySelectorAll('.year-btn');
        
        buttons.forEach(btn => {
            // Add shine element if not exists
            if (!btn.querySelector('.btn-shine')) {
                const shine = document.createElement('span');
                shine.classList.add('btn-shine');
                btn.appendChild(shine);
            }
            
            // Add wrapper for text with 3D effect
            if (!btn.querySelector('span:not(.btn-shine)')) {
                const text = btn.textContent;
                btn.textContent = '';
                const textSpan = document.createElement('span');
                textSpan.textContent = text;
                btn.appendChild(textSpan);
            }
        });
        
        // Add CSS for ripple effect if not already in stylesheet
        if (!document.querySelector('#ripple-style')) {
            const style = document.createElement('style');
            style.id = 'ripple-style';
            style.textContent = `
                .btn-ripple {
                    position: absolute;
                    background: rgba(255, 255, 255, 0.5);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                }
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    /**
     * Create floating particles for enhanced visual appeal
     */
    function createParticles() {
        // Create container for particles
        const particleContainer = document.createElement('div');
        particleContainer.classList.add('team-particles');
        teamSection.appendChild(particleContainer);
        
        // Add CSS for particles
        if (!document.querySelector('#particle-style')) {
            const style = document.createElement('style');
            style.id = 'particle-style';
            style.textContent = `
                .team-particles {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    z-index: 1;
                    pointer-events: none;
                }
                .particle {
                    position: absolute;
                    background: radial-gradient(circle, rgba(205, 176, 111, 0.8) 0%, transparent 70%);
                    border-radius: 50%;
                    opacity: 0.2;
                    z-index: 1;
                    pointer-events: none;
                    animation: float-particle var(--duration) infinite ease-in-out;
                    animation-delay: var(--delay);
                }
                @keyframes float-particle {
                    0%, 100% {
                        transform: translate(0, 0) rotate(0deg);
                    }
                    25% {
                        transform: translate(var(--move-x), var(--move-y)) rotate(var(--rotate));
                    }
                    50% {
                        transform: translate(var(--move-x2), var(--move-y2)) rotate(calc(var(--rotate) * 2));
                    }
                    75% {
                        transform: translate(var(--move-x3), var(--move-y3)) rotate(var(--rotate));
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Create particles
        const particleCount = 12;
        for (let i = 0; i < particleCount; i++) {
            createParticle(particleContainer);
        }
    }
    
    /**
     * Create a single particle with random properties
     * @param {HTMLElement} container - Container to append the particle to
     */
    function createParticle(container) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size between 10 and 60 pixels
        const size = Math.random() * 50 + 10;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random starting position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        
        // Random movement variables
        const moveX = (Math.random() - 0.5) * 200;
        const moveY = (Math.random() - 0.5) * 200;
        particle.style.setProperty('--move-x', `${moveX}px`);
        particle.style.setProperty('--move-y', `${moveY}px`);
        particle.style.setProperty('--move-x2', `${moveX * 0.7}px`);
        particle.style.setProperty('--move-y2', `${moveY * 0.7}px`);
        particle.style.setProperty('--move-x3', `${moveX * 0.4}px`);
        particle.style.setProperty('--move-y3', `${moveY * 0.4}px`);
        
        // Random rotation
        const rotate = (Math.random() - 0.5) * 60;
        particle.style.setProperty('--rotate', `${rotate}deg`);
        
        // Random animation duration and delay
        const duration = Math.random() * 15 + 15; // 15-30s
        const delay = Math.random() * -15;
        particle.style.setProperty('--duration', `${duration}s`);
        particle.style.setProperty('--delay', `${delay}s`);
        
        // Random opacity
        particle.style.opacity = (Math.random() * 0.15 + 0.05).toFixed(2);
        
        container.appendChild(particle);
    }
    
    /**
     * Main function to switch between teams with enhanced animations
     * @param {number} year - The year to display (2024 or 2025)
     */
    function showTeam(year) {
        if (year !== 2024 && year !== 2025) {
            console.error("Invalid year: " + year);
            return;
        }
        
        console.log("Switching to team " + year);
        
        // Update button states with smooth transition
        if (year === 2024) {
            btn2024.classList.add('active');
            btn2025.classList.remove('active');
        } else {
            btn2025.classList.add('active');
            btn2024.classList.remove('active');
        }
        
        // Add transition effect to team section
        if (teamSection) {
            teamSection.classList.add('transitioning');
        }
        
        // Update team container visibility with smooth transitions
        if (year === 2024) {
            // Hide 2025 team
            hideTeamContainer(team2025);
            
            // Show 2024 team with delay to ensure clean transition
            setTimeout(() => {
                showTeamContainer(team2024);
                
                // Remove transition class after animation completes
                setTimeout(() => {
                    if (teamSection) {
                        teamSection.classList.remove('transitioning');
                    }
                }, 800);
            }, 400); // Increased delay for smoother transition
        } else {
            // Hide 2024 team
            hideTeamContainer(team2024);
            
            // Show 2025 team with delay to ensure clean transition
            setTimeout(() => {
                showTeamContainer(team2025);
                
                // Remove transition class after animation completes
                setTimeout(() => {
                    if (teamSection) {
                        teamSection.classList.remove('transitioning');
                    }
                }, 800);
            }, 400); // Increased delay for smoother transition
        }
    }
    
    /**
     * Show a team container with enhanced animations
     * @param {HTMLElement} container - The team container to show
     */
    function showTeamContainer(container) {
        // Apply visibility classes
        container.classList.remove('hidden');
        container.classList.add('active');
        
        // Force inline styles
        container.style.display = 'block';
        container.style.visibility = 'visible';
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
        
        // Ensure all h2 titles are visible with staggered animation
        const titles = container.querySelectorAll('h2');
        titles.forEach((title, index) => {
            title.style.display = 'block';
            title.style.visibility = 'visible';
            title.style.opacity = '0';
            title.style.transform = 'translateY(20px)';
            
            // Animate title with slight delay
            setTimeout(() => {
                title.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                title.style.opacity = '1';
                title.style.transform = 'translateY(0)';
            }, 100 + (index * 150));
        });
        
        // Force all cards in container to be visible with staggered animation
        const cards = container.querySelectorAll('.profile-card');
        cards.forEach((card, index) => {
            card.style.setProperty('--card-index', index);
            card.style.display = 'flex';
            card.style.visibility = 'visible';
            
            // Reset animation to trigger again
            card.style.animation = 'none';
            card.offsetHeight; // Force reflow
            card.style.animation = 'fadeInUp 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
            card.style.animationDelay = `${0.1 + (index * 0.1)}s`;
        });
        
        // Force all shelves to be visible
        const shelves = container.querySelectorAll('.shelf');
        shelves.forEach(shelf => {
            shelf.style.display = 'flex';
            shelf.style.visibility = 'visible';
            shelf.style.opacity = '0';
            shelf.style.transform = 'translateY(20px)';
            
            // Animate shelf
            setTimeout(() => {
                shelf.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                shelf.style.opacity = '1';
                shelf.style.transform = 'translateY(0)';
            }, 200);
        });
    }
    
    /**
     * Hide a team container with fade out animation
     * @param {HTMLElement} container - The team container to hide
     */
    function hideTeamContainer(container) {
        // Animate fade out
        container.style.transition = 'opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease';
        container.style.opacity = '0';
        container.style.transform = 'translateY(30px)';
        
        // Add hidden classes after animation completes
        setTimeout(() => {
            // Remove visibility classes
            container.classList.remove('active');
            container.classList.add('hidden');
            
            // Force inline styles
            container.style.display = 'none';
            container.style.visibility = 'hidden';
        }, 300);
    }
}); 