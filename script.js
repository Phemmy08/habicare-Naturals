// Initialize Lucide Icons
        lucide.createIcons();

        // Header Scroll Effect
        const header = document.getElementById('header');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        });

        // Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuClose = document.getElementById('mobile-menu-close');
        const mobileOverlay = document.getElementById('mobile-overlay');

        function openMobileMenu() {
            mobileMenu.classList.add('active');
            mobileOverlay.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }

        function closeMobileMenu() {
            mobileMenu.classList.remove('active');
            mobileOverlay.classList.add('hidden');
            document.body.style.overflow = '';
        }

        mobileMenuBtn.addEventListener('click', openMobileMenu);
        mobileMenuClose.addEventListener('click', closeMobileMenu);
        mobileOverlay.addEventListener('click', closeMobileMenu);

        // Close mobile menu when clicking a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        // Smooth Scroll for Anchor Links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });



       // Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Get all category cards
    const categoryCards = document.querySelectorAll('.category-card');
    
    // Add enhanced hover effects and analytics tracking
    categoryCards.forEach(card => {
        
        // Track mouse enter for analytics (can be integrated with GA4, etc.)
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
            
            // You can add analytics tracking here
            // Example: gtag('event', 'category_click', { category_name: categoryName });
        });
    });
    
    // Intersection Observer for scroll animations
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
                    }, index * 100); // Stagger by 100ms
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
    
    // Add smooth scroll behavior for anchor links
    categoryCards.forEach(card => {
        card.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Check if it's an anchor link (starts with #)
            if (href && href.startsWith('#')) {
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
    
    // Add keyboard navigation support for accessibility
    categoryCards.forEach(card => {
        card.addEventListener('keydown', function(e) {
            // Enter or Space key
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Performance: Debounce resize handler
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            console.log('Window resized - Categories section adjusted');
            // Add any resize-specific logic here if needed
        }, 250);
    });
    
    console.log('✓ Categories section initialized successfully');
});