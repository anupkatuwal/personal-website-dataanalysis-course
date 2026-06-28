document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('#mainNavbar');
  const themeToggle = document.querySelector('.theme-toggle');
  const backToTop = document.querySelector('#backToTop');
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  const navLinks = Array.from(document.querySelectorAll('.navbar-nav .nav-link'));
  const body = document.body;

  // ── Theme ──────────────────────────────────────────────────────────────────
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

  // ── Active nav on scroll ───────────────────────────────────────────────────
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
          });
        }
      });
    },
    { rootMargin: '-40% 0px -45% 0px', threshold: 0 }
  );

  sections.forEach((s) => sectionObserver.observe(s));

  // ── Navbar shadow + back-to-top visibility ─────────────────────────────────
  const handleScroll = () => {
    navbar?.classList.toggle('shadow', window.scrollY > 20);
    backToTop?.classList.toggle('show', window.scrollY > 500);
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ── Scroll-reveal ──────────────────────────────────────────────────────────
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

  // ── Contact form ───────────────────────────────────────────────────────────
  const form = document.querySelector('#contactForm');
  const formSuccess = document.querySelector('#formSuccess');
  const submitBtn = document.querySelector('#formSubmit');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    // Show spinner
    submitBtn.disabled = true;
    submitBtn.querySelector('.spinner-border').classList.remove('d-none');

    // Simulate async send (replace with a real endpoint or Formspree action)
    setTimeout(() => {
      form.reset();
      form.classList.remove('was-validated');
      submitBtn.disabled = false;
      submitBtn.querySelector('.spinner-border').classList.add('d-none');
      formSuccess.classList.remove('d-none');
      setTimeout(() => formSuccess.classList.add('d-none'), 5000);
    }, 1200);
  });
});
