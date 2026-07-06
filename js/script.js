// STACKLY Global Script

document.addEventListener('DOMContentLoaded', () => {
    initCursorGlow();
    loadComponents();
});

// Component Loader for Navbar and Footer
async function loadComponents() {
    try {
        const cacheBuster = '?v=' + new Date().getTime();
        
        // Load Navbar
        const navbarResponse = await fetch('navbar.html' + cacheBuster);
        if (navbarResponse.ok) {
            const navbarHtml = await navbarResponse.text();
            document.getElementById('navbar-placeholder').innerHTML = navbarHtml;
            // Load Navbar Specific JS & CSS
            const navScript = document.createElement('script');
            navScript.src = 'js/navbar.js' + cacheBuster;
            document.body.appendChild(navScript);
            
            const navCss = document.createElement('link');
            navCss.rel = 'stylesheet';
            navCss.href = 'css/navbar.css' + cacheBuster;
            document.head.appendChild(navCss);
        }

        // Load Footer
        const footerResponse = await fetch('footer.html' + cacheBuster);
        if (footerResponse.ok) {
            const footerHtml = await footerResponse.text();
            const footerPlaceholder = document.getElementById('footer-placeholder');
            if (footerPlaceholder) {
                footerPlaceholder.innerHTML = footerHtml;
            }
            
            const footerCss = document.createElement('link');
            footerCss.rel = 'stylesheet';
            footerCss.href = 'css/footer.css' + cacheBuster;
            document.head.appendChild(footerCss);
            
            const footerScript = document.createElement('script');
            footerScript.src = 'js/footer.js' + cacheBuster;
            document.body.appendChild(footerScript);
        }

        // Reveal content after loading
        setTimeout(() => {
            const content = document.getElementById('content');
            if(content) content.classList.add('loaded');
            initScrollAnimations();
        }, 100);

    } catch (error) {
        console.error('Error loading components:', error);
    }
}

// Intersection Observer for Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Don't unobserve, allow repeat animations if they scroll back up (optional, leaving commented)
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('[class*="fade-"], [class*="flip-"], [class*="zoom-"], .scale-in, [class*="slide-"]');
    animatedElements.forEach(el => observer.observe(el));

    // Parallax Engine
    window.addEventListener('scroll', () => {
        requestAnimationFrame(() => {
            const scrollY = window.scrollY;
            document.querySelectorAll('.parallax').forEach(el => {
                const speed = el.getAttribute('data-speed') || 0.5;
                el.style.transform = `translateY(${scrollY * speed}px)`;
            });
        });
    });
}

// Global Cursor Glow Effect
function initCursorGlow() {
    const cursor = document.createElement('div');
    cursor.classList.add('cursor-glow');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Expand glow on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea');
    
    // We need to attach these listeners dynamically or via event delegation 
    // since elements might be loaded later. Event delegation is better.
    document.addEventListener('mouseover', (e) => {
        if(e.target.closest('a') || e.target.closest('button') || e.target.closest('.glass-card')) {
            cursor.style.width = '600px';
            cursor.style.height = '600px';
        }
    });

    document.addEventListener('mouseout', (e) => {
        if(e.target.closest('a') || e.target.closest('button') || e.target.closest('.glass-card')) {
            cursor.style.width = '400px';
            cursor.style.height = '400px';
        }
    });
}

// Sidebar Toggle Logic
function toggleSidebar() {
    const sidebar = document.querySelector('.dashboard-sidebar');
    let overlay = document.querySelector('.sidebar-overlay');
    
    // Create overlay if it doesn't exist
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        document.body.appendChild(overlay);
        overlay.onclick = toggleSidebar;
    }
    
    sidebar.classList.toggle('sidebar-open');
    if (sidebar.classList.contains('sidebar-open')) {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close sidebar when clicking any sidebar link
document.addEventListener('click', function(e) {
    const sidebarLink = e.target.closest('.sidebar-nav a');
    if (sidebarLink) {
        const sidebar = document.querySelector('.dashboard-sidebar');
        const overlay = document.querySelector('.sidebar-overlay');
        if (sidebar && sidebar.classList.contains('sidebar-open')) {
            sidebar.classList.remove('sidebar-open');
            if (overlay) overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});
