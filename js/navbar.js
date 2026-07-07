// Navbar Interactivity

(function () {
    const navbar = document.getElementById('main-nav');
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    let lastScrollY = window.scrollY;

    // Scroll Effects: Shrink on scroll
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // Add scrolled class for shrink effect
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollY = currentScrollY;
    });

    // Mobile Menu Toggle (Event Delegation)
    document.body.addEventListener('click', (e) => {
        const toggleBtn = e.target.closest('#mobile-toggle');
        if (toggleBtn) {
            const mMenu = document.getElementById('mobile-menu');
            const nav = document.getElementById('main-nav');
            if (mMenu && nav) {
                toggleBtn.classList.toggle('active');
                mMenu.classList.toggle('active');
                
                // Prevent body scroll when menu is open
                if (mMenu.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                    nav.classList.add('menu-open');
                } else {
                    document.body.style.overflow = '';
                    nav.classList.remove('menu-open');
                }
            }
        }
    });

    // Mobile Dropdown Toggle (Event Delegation)
    document.body.addEventListener('click', (e) => {
        const toggle = e.target.closest('.mobile-dropdown .dropdown-toggle');
        if (toggle) {
            e.preventDefault();
            const dropdownMenu = toggle.nextElementSibling;
            const icon = toggle.querySelector('i, svg');

            if (dropdownMenu && dropdownMenu.classList.contains('mobile-dropdown-menu')) {
                if (dropdownMenu.style.display === 'flex') {
                    dropdownMenu.style.display = 'none';
                    if (icon) icon.style.transform = 'rotate(0deg)';
                    toggle.classList.remove('dropdown-active');
                } else {
                    dropdownMenu.style.display = 'flex';
                    if (icon) icon.style.transform = 'rotate(180deg)';
                    toggle.classList.add('dropdown-active');
                }
            }
        }
    });

    // Set active link based on current page URL
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    // Desktop nav items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        const itemPath = item.getAttribute('href');
        if (currentPath === itemPath || (currentPath === 'index.html' && itemPath === 'index.html')) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Mobile nav items
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    mobileNavItems.forEach(item => {
        const itemPath = item.getAttribute('href');
        if (itemPath && (currentPath === itemPath || (currentPath === 'index.html' && itemPath === 'index.html'))) {
            item.classList.add('active-link');
        } else {
            item.classList.remove('active-link');
        }
    });
})();
