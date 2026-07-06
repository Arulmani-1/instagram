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

    // Mobile Menu Toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');

            // Prevent body scroll when menu is open
            if (mobileMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
                navbar.classList.add('menu-open');
            } else {
                document.body.style.overflow = '';
                navbar.classList.remove('menu-open');
            }
        });
    }
    // Mobile Dropdown Toggle
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown .dropdown-toggle');
    mobileDropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const dropdownMenu = toggle.nextElementSibling;
            const icon = toggle.querySelector('i');

            if (dropdownMenu.style.display === 'flex') {
                dropdownMenu.style.display = 'none';
                if (icon) icon.style.transform = 'rotate(0deg)';
                toggle.classList.remove('dropdown-active');
            } else {
                dropdownMenu.style.display = 'flex';
                if (icon) icon.style.transform = 'rotate(180deg)';
                toggle.classList.add('dropdown-active');
            }
        });
    });

    // Set active link based on current page URL
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        const itemPath = item.getAttribute('href');
        if (currentPath === itemPath || (currentPath === 'index.html' && itemPath === 'home.html')) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
})();
