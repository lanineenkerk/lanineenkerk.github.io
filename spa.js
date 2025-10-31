/* ==========================================
   Mini-SPA navigatie (houd bg/header/footer)
   - Vervangt alleen <main> + <title>
   - Werkt met browser back/forward (popstate)
   - Sluit dropdown na navigatie
   - Markeert actieve link (zelfde logica als menu)
   - Graceful degradation (fout? -> normale nav)
   ========================================== */

(function () {
  const isSameOrigin = (url) => {
    try {
      const u = new URL(url, window.location.href);
      return u.origin === window.location.origin;
    } catch { return false; }
  };

  const normalizePath = (p) => {
    const file = decodeURIComponent((p.split('/').pop() || '').toLowerCase());
    return (!file || file === '/') ? 'index.html' : file;
  };

  const updateActiveNav = () => {
    const dd = document.querySelector('.nav-dropdown');
    const links = document.querySelectorAll('.site-nav > a, .site-nav .dropdown-list a');

    // wis alle aria-current
    links.forEach(a => a.removeAttribute('aria-current'));

    const currentPath = normalizePath(window.location.pathname);
    links.forEach(a => {
      const href = a.getAttribute('href') || '';
      if (!href || href.startsWith('#')) return;
      const target = normalizePath(href);
      if (target === currentPath) a.setAttribute('aria-current', 'page');
    });

    if (dd) {
      const childActive = dd.querySelector('.dropdown-list a[aria-current="page"]');
      dd.classList.toggle('is-active', !!childActive);
      dd.removeAttribute('open');
    }
  };

  const swapTo = async (url, push = true) => {
    document.body.classList.add('is-transitioning');

    try {
      const res = await fetch(url, { headers: { 'X-Requested-With': 'spa' } });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const html = await res.text();

      const doc = new DOMParser().parseFromString(html, 'text/html');
      const newMain = doc.querySelector('main');
      const curMain = document.querySelector('main');
      if (!newMain || !curMain) throw new Error('MAIN_NOT_FOUND');

      // vervang <main>
      curMain.replaceWith(newMain);

      // update title
      if (doc.title) document.title = doc.title;

      // history
      if (push) history.pushState({}, '', url);

      // naar boven scrollen, tenzij er een hash is
      if (!url.includes('#')) window.scrollTo({ top: 0 });

      // nav highlighting
      updateActiveNav();
    } catch (e) {
      // fallback naar normale navigatie
      window.location.href = url;
    } finally {
      // lichte delay zodat CSS-transition zichtbaar is
      setTimeout(() => document.body.classList.remove('is-transitioning'), 120);
    }
  };

  // Intercepteer clicks op interne links (topnav + dropdown)
  document.addEventListener('click', (e) => {
    // alleen link-clicks
    const a = e.target.closest('a');
    if (!a) return;

    // opt-outs en externe links met target/download/hash-only
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || a.hasAttribute('download') || a.target === '_blank') return;

    const url = new URL(href, window.location.href).toString();
    if (!isSameOrigin(url)) return;

    // Alleen navigeren als het een volledige pagina betreft (geen anchors binnen dezelfde pagina)
    const cur = new URL(window.location.href);
    const next = new URL(url);
    if (cur.pathname === next.pathname && cur.hash !== next.hash) return;

    // SPA-navigatie
    e.preventDefault();
    if (url === window.location.href) return; // niks doen als zelfde pagina
    swapTo(url, true);
  });

  // Back/forward
  window.addEventListener('popstate', () => swapTo(window.location.href, false));

  // Initiale nav state
  updateActiveNav();
})();
