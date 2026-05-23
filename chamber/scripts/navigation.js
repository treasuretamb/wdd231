// navigation.js — Chamber responsive nav + theme sync

document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menu-btn');
  const nav     = document.querySelector('nav');

  // Hamburger toggle
  menuBtn?.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', isOpen);
    menuBtn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  // Close nav when a link is clicked (mobile)
  nav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuBtn?.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (nav && menuBtn && !nav.contains(e.target) && !menuBtn.contains(e.target)) {
      nav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Wayfinding — mark the active page
  const currentPage = window.location.pathname;
  document.querySelectorAll('nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (
      (href.includes('directory') && currentPage.includes('directory')) ||
      (href.includes('discover')  && currentPage.includes('discover'))  ||
      (href.includes('join')      && currentPage.includes('join'))
    ) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // Sync dark mode with main site preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light-mode') {
    document.body.classList.add('light-mode');
  }
});
