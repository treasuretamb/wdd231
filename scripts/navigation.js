document.addEventListener('DOMContentLoaded', function() {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    let isOpen = false;

    function toggleMenu() {
        isOpen = !isOpen;
        if (isOpen) {
            mobileNav.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            mobileBtn.textContent = '✕';   // Change to X
            mobileBtn.style.fontSize = '2.5rem';
        } else {
            mobileNav.style.display = 'none';
            document.body.style.overflow = 'auto';
            mobileBtn.textContent = '☰';
            mobileBtn.style.fontSize = '2rem';
        }
    }

    mobileBtn.addEventListener('click', toggleMenu);

    // Close when clicking any link
    const mobileLinks = document.querySelectorAll('.mobile-nav__link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            isOpen = true; // force close
            toggleMenu();
        });
    });

    // Theme Toggle
    const themeToggle = document.getElementById('header-theme-toggle');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'light-mode') {
        document.body.classList.add('light-mode');
        themeToggle.textContent = '🌙';
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        
        if (document.body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light-mode');
            themeToggle.textContent = '🌙';
        } else {
            localStorage.removeItem('theme');
            themeToggle.textContent = '☀️';
        }
    });
});