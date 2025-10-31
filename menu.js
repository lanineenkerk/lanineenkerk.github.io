document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.hamburger');
  const nav = document.querySelector('.site-nav');
  if (!btn || !nav) return;

  // open/close
  btn.addEventListener('click', () => {
    const open = !btn.classList.contains('is-active');
    btn.classList.toggle('is-active', open);
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
    btn.setAttribute('aria-expanded', String(open));
  });

  // klik buiten → sluit
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !btn.contains(e.target)) closeMenu();
  });

  // ESC → sluit
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // ✅ BELANGRIJK: sluit direct bij link-activatie (voor navigatie/SP A)
  // werkt voor alle <a> in het menu, ook dropdown-items; geen preventDefault.
nav.addEventListener('click', (e) => {
  const link = e.target.closest('a[href]:not([target="_blank"])');
  if (!link) return;                 // alleen echte links
  closeMenu();                       // sluit zonder preventDefault
}, true);

  // Back/forward → menu dicht
  window.addEventListener('popstate', closeMenu);

  function closeMenu() {
    btn.classList.remove('is-active');
    nav.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    btn.setAttribute('aria-expanded', 'false');
  }
});



