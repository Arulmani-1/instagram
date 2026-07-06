// Footer Interactivity
(function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('input');
            const btn = newsletterForm.querySelector('button');
            
            // Simple visual feedback
            alert('email subscription successfully');
            const originalText = btn.textContent;
            btn.textContent = 'Subscribed!';
            btn.style.background = 'var(--neon-blue)';
            input.value = '';
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = 'var(--primary-gradient)';
            }, 3000);
        });
    }
})();
