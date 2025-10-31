/* Lightbox zonder hash (voor alle .zoomable afbeeldingen) */
document.addEventListener('DOMContentLoaded', () => {
  const openers = Array.from(document.querySelectorAll('a.zoomable[href^="#"]'))
    .map(a => ({ a, id: a.getAttribute('href').slice(1) }))
    .filter(({ id }) => document.getElementById(id)?.classList.contains('lightbox'));

  const openLightbox = (lb) => {
    document.querySelectorAll('.lightbox.is-open').forEach(x => x.classList.remove('is-open'));
    lb.classList.add('is-open');
    document.body.classList.add('no-scroll');
  };

  const closeLightbox = (lb) => {
    lb.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
  };

  // Open via thumbnail
  openers.forEach(({ a, id }) => {
    const lb = document.getElementById(id);
    a.addEventListener('click', e => {
      e.preventDefault();
      openLightbox(lb);
    });
  });

  // Sluit via achtergrond of ×
  document.addEventListener('click', e => {
    const lb = e.target.closest('.lightbox');
    if (!lb) return;
    if (e.target.classList.contains('lightbox-bg') || e.target.classList.contains('close')) {
      e.preventDefault();
      closeLightbox(lb);
    }
  });

  // Sluit met Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const lb = document.querySelector('.lightbox.is-open');
      if (lb) closeLightbox(lb);
    }
  });

  // Fallback: als er toch een hash binnenkomt, schakel om naar class-based en verwijder hash
  window.addEventListener('hashchange', () => {
    const id = location.hash.slice(1);
    const lb = id && document.getElementById(id);
    if (lb && lb.classList.contains('lightbox')) {
      history.replaceState({}, '', location.pathname);
      openLightbox(lb);
    }
  });
});
