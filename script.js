// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initCollapsibleSections();
    initSmoothScroll();
    initNavigation();
    initTabs();
    
    // Page-specific features
    if (document.querySelector('.timeline-dot')) {
        initTimelineInteraction();
    }
    
    if (document.querySelector('.session-card')) {
        initSessionCards();
        initSessionFilters();
    }
    
    if (document.querySelector('.filter-bar')) {
        initFilterBar();
    }
});

/* ==========================================
   MOBILE NAVIGATION
   ========================================== */

function initMobileMenu() {
    // Create mobile menu toggle if it doesn't exist
    if (!document.querySelector('.mobile-menu-toggle')) {
        const toggle = document.createElement('button');
        toggle.className = 'mobile-menu-toggle';
        toggle.innerHTML = '☰';
        toggle.setAttribute('aria-label', 'Toggle menu');
        document.body.appendChild(toggle);
        
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'mobile-overlay';
        document.body.appendChild(overlay);
    }
    
    const toggle = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.mobile-overlay');
    
    if (toggle && sidebar && overlay) {
        toggle.addEventListener('click', function() {
            sidebar.classList.add('mobile-open');
            overlay.classList.add('active');
        });
        
        overlay.addEventListener('click', function() {
            sidebar.classList.remove('mobile-open');
            overlay.classList.remove('active');
        });
        
        // Close on nav link click
        const navLinks = sidebar.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                sidebar.classList.remove('mobile-open');
                overlay.classList.remove('active');
            });
        });
    }
}
