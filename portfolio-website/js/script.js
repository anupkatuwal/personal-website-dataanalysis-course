document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('#mainNavbar');
  const themeToggle = document.querySelector('.theme-toggle');
  const backToTop = document.querySelector('#backToTop');
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  const navLinks = Array.from(document.querySelectorAll('.navbar-nav .nav-link'));
  const body = document.body;

  // Theme toggle with localStorage support
  const storedTheme = localStorage.getItem('portfolio-theme');
  if (storedTheme === 'dark') {
    body.classList.add('dark');
    updateToggleIcon(true);
  }

  themeToggle?.addEventListener('click', () => {
    body.classList.toggle('dark');
    const isDark = body.classList.contains('dark');
    localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
    updateToggleIcon(isDark);
  });

  function updateToggleIcon(isDark) {
    const icon = themeToggle.querySelector('i');
    if (!icon) return;
    icon.className = isDark ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }

  // Active section highlighting on scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${entry.target.id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    },
    { rootMargin: '-40% 0px -45% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));

  // Shrink navbar on scroll
  const handleScroll = () => {
    if (window.scrollY > 20) {
      navbar?.classList.add('shadow');
    } else {
      navbar?.classList.remove('shadow');
    }

    backToTop?.classList.toggle('show', window.scrollY > 500);
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Back to top button
  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
