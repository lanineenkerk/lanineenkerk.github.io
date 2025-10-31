document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const nav       = document.getElementById('main-nav');
  const overlay   = document.querySelector('.menu-overlay');

  if (!hamburger || !nav || !overlay) return;

  function openMenu() {
    document.body.classList.add('menu-open');
    nav.classList.add('is-open');
    hamburger.classList.add('is-active');
    overlay.hidden = false;
  }

  function closeMenu() {
    document.body.classList.remove('menu-open');
    nav.classList.remove('is-open');
    hamburger.classList.remove('is-active');
    overlay.hidden = true;
  }

  // Toggle met hamburger
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    if (nav.classList.contains('is-open')) closeMenu(); else openMenu();
  });

  // Klik op overlay => sluit menu
  overlay.addEventListener('click', () => {
    closeMenu();
  });

  // Klik op link in nav (capture) => sluit menu, daarna normale navigatie/SPA
  nav.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link) return;
    // Laat normale navigatie/SPA z’n werk doen; alleen sluiten
    closeMenu();
  }, true);

  // Escape => sluit menu
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // (Optioneel) klik buiten nav (zonder overlay) => sluit menu
  // Met overlay is dit niet echt nodig, maar voor de zekerheid:
  document.addEventListener('click', (e) => {
    if (!nav.classList.contains('is-open')) return;
    if (nav.contains(e.target) || hamburger.contains(e.target)) return;
    closeMenu();
  });
});
