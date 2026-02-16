/**
 * HABIECARE NATURALS - Main JavaScript
 */

// Initialize Lucide Icons
if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Re-initialize Lucide Icons after DOM is loaded
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // ================================
    // MOBILE MENU FUNCTIONALITY
    // ================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    // Function to open mobile menu
    function openMobileMenu() {
        mobileMenu.classList.add('active');
        mobileOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    // Function to close mobile menu
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        mobileOverlay.classList.add('hidden');
        document.body.style.overflow = '';
    }

    // Open menu when hamburger button is clicked
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', openMobileMenu);
    }

    // Close menu when close button is clicked
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }

    // Close menu when overlay is clicked
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', closeMobileMenu);
    }

    // Close menu when a navigation link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });

    // Close menu on escape key press
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // ================================
    // HEADER SCROLL EFFECT
    // ================================
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }

        lastScroll = currentScroll;
    });

    // ================================
    // PRODUCT CATEGORIES
    // ================================
    const categoryCards = document.querySelectorAll('.category-card');
    
    // Add enhanced hover effects and analytics tracking
    categoryCards.forEach(card => {
        
        // Track mouse enter for analytics
        card.addEventListener('mouseenter', function() {
            const categoryName = this.querySelector('.category-name').textContent;
            console.log(`User hovering over: ${categoryName}`);
            
            // Add custom class for additional effects if needed
            this.classList.add('is-hovered');
        });
        
        // Track mouse leave
        card.addEventListener('mouseleave', function() {
            this.classList.remove('is-hovered');
        });
        
        // Track clicks for analytics
        card.addEventListener('click', function(e) {
            const categoryName = this.querySelector('.category-name').textContent;
            const categoryUrl = this.getAttribute('href');
            
            console.log(`User clicked: ${categoryName}`);
            console.log(`Navigating to: ${categoryUrl}`);
            
            // Add a subtle click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // ================================
    // SCROLL ANIMATIONS
    // ================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add staggered animation class
                const cards = entry.target.querySelectorAll('.category-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                });
                
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe the categories grid
    const categoriesGrid = document.querySelector('.categories-grid');
    if (categoriesGrid) {
        // Set initial state for animation
        categoryCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        observer.observe(categoriesGrid);
    }
    
    // ================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ================================
    const allLinks = document.querySelectorAll('a[href^="#"]');
    
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Check if it's a valid anchor link
            if (href && href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ================================
    // KEYBOARD NAVIGATION
    // ================================
    categoryCards.forEach(card => {
        card.addEventListener('keydown', function(e) {
            // Enter or Space key
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // ================================
    // PERFORMANCE: DEBOUNCE RESIZE
    // ================================
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            console.log('Window resized - Layout adjusted');
        }, 250);
    });
    
    console.log('✓ HABIECARE NATURALS website initialized successfully');
});
