/* ==========================================
   SHARED INTERACTIVE FEATURES
   AI Research Methodology Website
   ========================================== */

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initCollapsibleSections();
    initSmoothScroll();
    initNavigation();
    
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
   COLLAPSIBLE SECTIONS
   ========================================== */

function initCollapsibleSections() {
    const headers = document.querySelectorAll('.collapsible-header');
    
    headers.forEach(header => {
        header.addEventListener('click', function() {
            this.classList.toggle('collapsed');
            const content = this.nextElementSibling;
            
            if (content && content.classList.contains('collapsible-content')) {
                content.classList.toggle('hidden');
            }
        });
    });
}

/* ==========================================
   SMOOTH SCROLLING
   ========================================== */

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            
            if (target) {
                target.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Brief highlight effect
                target.style.transition = 'background-color 0.5s';
                const originalBg = target.style.backgroundColor;
                target.style.backgroundColor = '#fff9e6';
                setTimeout(() => {
                    target.style.backgroundColor = originalBg;
                }, 1000);
            }
        });
    });
}

/* ==========================================
   NAVIGATION ACTIVE STATE
   ========================================== */

function initNavigation() {
    // Set active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
}

/* ==========================================
   COPY TO CLIPBOARD
   ========================================== */

function copyText(button, elementId) {
    const element = document.getElementById(elementId);
    const text = element ? element.textContent : button.closest('.citation-box').textContent.replace('Copy', '').trim();
    
    navigator.clipboard.writeText(text).then(() => {
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.classList.add('copied');
        
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Copy failed:', err);
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        
        try {
            document.execCommand('copy');
            button.textContent = 'Copied!';
            button.classList.add('copied');
            setTimeout(() => {
                button.textContent = 'Copy';
                button.classList.remove('copied');
            }, 2000);
        } catch (err) {
            alert('Copy failed. Please copy manually.');
        }
        
        document.body.removeChild(textarea);
    });
}

/* ==========================================
   TIMELINE INTERACTION (Landing Page)
   ========================================== */

function initTimelineInteraction() {
    const dots = document.querySelectorAll('.timeline-dot');
    
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const detailId = this.getAttribute('data-detail');
            const detail = document.getElementById(detailId);
            
            // Close all other details
            document.querySelectorAll('.timeline-detail').forEach(d => {
                if (d.id !== detailId) {
                    d.classList.remove('show');
                }
            });
            
            // Toggle this detail
            if (detail) {
                detail.classList.toggle('show');
            }
        });
    });
}

/* ==========================================
   SESSION CARDS (Collaboration Log)
   ========================================== */

function initSessionCards() {
    const sessionHeaders = document.querySelectorAll('.session-header');
    
    sessionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const card = this.closest('.session-card');
            const content = card.querySelector('.session-content');
            
            if (content) {
                content.classList.toggle('expanded');
                
                // Update expand/collapse indicator if exists
                const indicator = this.querySelector('.expand-indicator');
                if (indicator) {
                    indicator.textContent = content.classList.contains('expanded') ? '▲' : '▼';
                }
            }
        });
    });
}

/* ==========================================
   SESSION FILTERS (Collaboration Log)
   ========================================== */

function initSessionFilters() {
    const filterBar = document.querySelector('.filter-bar');
    if (!filterBar) return;
    
    const searchInput = filterBar.querySelector('input[type="text"]');
    const phaseSelect = filterBar.querySelector('select[name="phase"]');
    const tagLinks = document.querySelectorAll('.tag');
    
    // Search filter
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterSessions();
        });
    }
    
    // Phase filter
    if (phaseSelect) {
        phaseSelect.addEventListener('change', function() {
            filterSessions();
        });
    }
    
    // Tag filtering
    tagLinks.forEach(tag => {
        tag.addEventListener('click', function(e) {
            e.preventDefault();
            const tagText = this.textContent.trim();
            if (searchInput) {
                searchInput.value = tagText;
                filterSessions();
            }
        });
    });
}

function filterSessions() {
    const searchInput = document.querySelector('.filter-bar input[type="text"]');
    const phaseSelect = document.querySelector('.filter-bar select[name="phase"]');
    const sessions = document.querySelectorAll('.session-card');
    
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const phaseFilter = phaseSelect ? phaseSelect.value : 'all';
    
    let visibleCount = 0;
    
    sessions.forEach(session => {
        const text = session.textContent.toLowerCase();
        const phase = session.getAttribute('data-phase') || '';
        
        const matchesSearch = !searchTerm || text.includes(searchTerm);
        const matchesPhase = phaseFilter === 'all' || phase === phaseFilter;
        
        if (matchesSearch && matchesPhase) {
            session.style.display = 'block';
            visibleCount++;
        } else {
            session.style.display = 'none';
        }
    });
    
    // Update results count if element exists
    const resultsCount = document.querySelector('.results-count');
    if (resultsCount) {
        resultsCount.textContent = `Showing: ${visibleCount} session${visibleCount !== 1 ? 's' : ''}`;
    }
}

/* ==========================================
   GENERAL FILTER BAR
   ========================================== */

function initFilterBar() {
    const clearBtn = document.querySelector('.clear-filters-btn');
    
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            const inputs = document.querySelectorAll('.filter-bar input, .filter-bar select');
            inputs.forEach(input => {
                if (input.tagName === 'SELECT') {
                    input.selectedIndex = 0;
                } else {
                    input.value = '';
                }
            });
            
            // Trigger filter reset
            if (typeof filterSessions === 'function') {
                filterSessions();
            }
        });
    }
}

/* ==========================================
   TAB SWITCHING
   ========================================== */

function switchTab(tabName) {
    // Hide all tab content
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active from all tab buttons
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    const selectedContent = document.getElementById(tabName);
    if (selectedContent) {
        selectedContent.classList.add('active');
    }
    
    // Activate button
    const selectedBtn = document.querySelector(`[onclick="switchTab('${tabName}')"]`);
    if (selectedBtn) {
        selectedBtn.classList.add('active');
    }
}

/* ==========================================
   RED FLAGS RISK ASSESSMENT (Framework Page)
   ========================================== */

function updateRiskAssessment() {
    const checkboxes = document.querySelectorAll('.red-flags-checklist input[type="checkbox"]');
    const indicator = document.querySelector('.risk-indicator');
    
    if (!indicator) return;
    
    let checkedCount = 0;
    checkboxes.forEach(cb => {
        if (cb.checked) checkedCount++;
    });
    
    // Update indicator
    let riskLevel = 'green';
    let riskText = 'GREEN ZONE';
    let riskMessage = 'You\'re using AI appropriately. Keep maintaining boundaries.';
    
    if (checkedCount >= 3) {
        riskLevel = 'red';
        riskText = '🚨 RED ZONE';
        riskMessage = 'Serious integrity concerns. Stop using AI immediately and consult with your advisor about your research process.';
    } else if (checkedCount >= 1) {
        riskLevel = 'yellow';
        riskText = '⚠ YELLOW ZONE';
        riskMessage = 'Warning signs present. Review your AI collaboration approach and implement stronger boundaries.';
    }
    
    indicator.className = 'risk-indicator ' + riskLevel;
    indicator.innerHTML = `
        <h3>${riskText}</h3>
        <p>${riskMessage}</p>
    `;
}

/* ==========================================
   EXPAND ALL / COLLAPSE ALL
   ========================================== */

function expandAll(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    
    const collapsibles = container.querySelectorAll('.collapsible-content');
    const headers = container.querySelectorAll('.collapsible-header');
    
    collapsibles.forEach(content => {
        content.classList.remove('hidden');
    });
    
    headers.forEach(header => {
        header.classList.remove('collapsed');
    });
}

function collapseAll(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    
    const collapsibles = container.querySelectorAll('.collapsible-content');
    const headers = container.querySelectorAll('.collapsible-header');
    
    collapsibles.forEach(content => {
        content.classList.add('hidden');
    });
    
    headers.forEach(header => {
        header.classList.add('collapsed');
    });
}

/* ==========================================
   SCROLL TO TOP
   ========================================== */

// Show/hide back to top button
window.addEventListener('scroll', function() {
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        if (window.pageYOffset > 300) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    }
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
