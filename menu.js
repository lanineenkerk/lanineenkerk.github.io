document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.hamburger');
  const nav = document.querySelector('.site-nav');

  if (!btn || !nav) return;

  // Open/sluit menu
  btn.addEventListener('click', () => {
    const expanded = btn.classList.toggle('is-active');
    btn.setAttribute('aria-expanded', expanded);
    nav.classList.toggle('is-open', expanded);
    document.body.classList.toggle('menu-open', expanded);
  });

  // Klik buiten menu → sluit
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !btn.contains(e.target)) {
      closeMenu();
    }
  });

  // ESC → sluit
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMenu();
    }
  });

  // ✅ Klik op een link (of dropdown-item) → sluit volledig menu
  nav.querySelectorAll('a, summary').forEach(el => {
    el.addEventListener('click', () => {
      // Wacht een fractie zodat de link kan navigeren
      setTimeout(() => closeMenu(), 150);
    });
  });

  // Helper: menu sluiten
  function closeMenu() {
    btn.classList.remove('is-active');
    nav.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    btn.setAttribute('aria-expanded', 'false');
  }
});
