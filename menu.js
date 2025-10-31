/* ==========================================
   LAN Party in een Kerk – Navigatie functionaliteit
   ==========================================
   - Sluit dropdown bij klik buiten of op ESC
   - Verwijder eerst alle aria-current, zet dan precies 1 actieve link
   - Markeer "Praktische info" als actief als een sublink actief is
   - Houd dropdown standaard gesloten bij paginalaad
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  const dd = document.querySelector('.nav-dropdown');
  const allNavLinks = document.querySelectorAll('.site-nav > a, .site-nav .dropdown-list a');

  // 1) Dropdown gesloten starten
  if (dd) dd.removeAttribute('open');

  // 2) Huidige bestandsnaam normaliseren
  const raw = (new URL(window.location.href)).pathname.split('/').pop();
  let currentPath = decodeURIComponent(raw || '').toLowerCase();
  if (currentPath === '' || currentPath === '/') currentPath = 'index.html';

  // 3) VERWIJDER eerst ALLE aria-current
  allNavLinks.forEach(a => a.removeAttribute('aria-current'));

  // 4) Zoek en markeer de echte actieve link (exacte match op bestandsnaam)
  let activeLink = null;
  allNavLinks.forEach(a => {
    const href = a.getAttribute('href') || '';
    // sla ankers en lege hrefs over
    if (!href || href.startsWith('#')) return;

    const target = decodeURIComponent(href.split('/').pop()).toLowerCase();
    if (target === currentPath) {
      a.setAttribute('aria-current', 'page');
      activeLink = a;
    }
  });

  // 5) Als een child van de dropdown actief is → highlight parent ("Praktische info")
  if (dd) {
    const childActive = dd.querySelector('.dropdown-list a[aria-current="page"]');
    dd.classList.toggle('is-active', !!childActive);
  }

  // 6) Klik buiten dropdown → sluit
  if (dd) {
    document.addEventListener('click', e => {
      if (!dd.contains(e.target)) dd.removeAttribute('open');
    });
  }

  // 7) ESC → sluit dropdown
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && dd) dd.removeAttribute('open');
  });
});


//Hamburgermenu

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.hamburger');
  const nav = document.querySelector('.site-nav');

  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    const expanded = btn.classList.toggle('is-active');
    btn.setAttribute('aria-expanded', expanded);
    nav.classList.toggle('is-open', expanded);
    document.body.classList.toggle('menu-open', expanded);
  });

  // Klik buiten menu sluit het
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !btn.contains(e.target)) {
      btn.classList.remove('is-active');
      nav.classList.remove('is-open');
      document.body.classList.remove('menu-open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });

  // ESC sluit het
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      btn.classList.remove('is-active');
      nav.classList.remove('is-open');
      document.body.classList.remove('menu-open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
});

