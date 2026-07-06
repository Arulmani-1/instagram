// main.js

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. Mobile Drawer Navigation
    // ==========================================
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeDrawerBtn = document.querySelector('.close-drawer');

    if (mobileMenuBtn && closeDrawerBtn && mobileDrawer) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileDrawer.classList.add('open');
        });
        closeDrawerBtn.addEventListener('click', () => {
            mobileDrawer.classList.remove('open');
        });
    }

    // ==========================================
    // 2. Navbar Scroll Effect & Reading Progress
    // ==========================================
    const navbar = document.getElementById('navbar');
    const readingProgress = document.getElementById('reading-progress');

    window.addEventListener('scroll', () => {
        if (navbar) {
            // Navbar glass effect
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Reading progress (mainly for blog, but globally applied)
        if (readingProgress) {
            const totalHeight = document.body.scrollHeight - window.innerHeight;
            const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
            readingProgress.style.width = `${progress}%`;
        }
    });

    // ==========================================
    // 3. Zero-Gravity Parallax Effect
    // ==========================================
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth - e.pageX * 2) / 100;
        const y = (window.innerHeight - e.pageY * 2) / 100;

        parallaxLayers.forEach(layer => {
            const speed = layer.getAttribute('data-speed') || 0.05;
            const xOffset = x * speed * 100;
            const yOffset = y * speed * 100;
            
            // Apply transform while maintaining 3d style if present
            layer.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });

    // ==========================================
    // 4. Magnetic Buttons (Premium feel)
    // ==========================================
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const position = btn.getBoundingClientRect();
            const x = e.clientX - position.left - position.width / 2;
            const y = e.clientY - position.top - position.height / 2;
            
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
        });
        
        btn.addEventListener('mouseout', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    // ==========================================
    // 5. Utility Functions (e.g., Like Burst)
    // ==========================================
    const likeBursts = document.querySelectorAll('.like-burst');
    likeBursts.forEach(btn => {
        btn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if(icon.classList.contains('fa-regular')) {
                icon.classList.remove('fa-regular');
                icon.classList.add('fa-solid', 'text-secondary');
                icon.style.color = 'var(--secondary)';
                
                // Create particle effect
                for(let i=0; i<5; i++) {
                    createParticle(this);
                }
            } else {
                icon.classList.add('fa-regular');
                icon.classList.remove('fa-solid', 'text-secondary');
                icon.style.color = 'inherit';
            }
        });
    });

    function createParticle(parent) {
        const particle = document.createElement('div');
        particle.innerHTML = '<i class="fa-solid fa-heart"></i>';
        particle.style.position = 'absolute';
        particle.style.color = 'var(--secondary)';
        particle.style.fontSize = '12px';
        particle.style.pointerEvents = 'none';
        
        // Random direction
        const angle = Math.random() * Math.PI * 2;
        const velocity = 50 + Math.random() * 50;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        particle.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        parent.appendChild(particle);
        
        // Force reflow
        particle.offsetHeight;
        
        particle.style.transform = `translate(${tx}px, ${ty}px) scale(0)`;
        particle.style.opacity = '0';
        
        
        setTimeout(() => particle.remove(), 600);
    }

    // ==========================================
    // 6. Dynamic Footer Loading
    // ==========================================
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        fetch('footer.html')
            .then(res => {
                if(!res.ok) throw new Error("Failed to load");
                return res.text();
            })
            .then(html => {
                footerPlaceholder.innerHTML = html;
            })
            .catch(err => {
                console.log('Cannot fetch footer.html dynamically on file:// protocol or it does not exist.', err);
                // Fallback basic footer if fetch fails due to CORS on file://
                footerPlaceholder.innerHTML = `
                <footer class="main-footer glass-panel" style="text-align:center; padding:40px; margin-top:60px; border-top:1px solid rgba(255,255,255,0.1);">
                    <p style="color:var(--text-muted);">&copy; 2026 SOCIALLY Enterprise. All rights reserved.</p>
                </footer>`;
            });
    }
});
