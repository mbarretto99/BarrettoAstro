/* Populates the deep-sky gallery from local assets and drives the lightbox. */
(function () {
  const IMAGES = [
    { src: 'assets/gallery/m42-orion-nebula.jpg',         cap: 'M42 — The Orion Nebula' },
    { src: 'assets/gallery/ic434-horsehead-nebula.jpg',    cap: 'IC434 — Horsehead & Flame Nebulae' },
    { src: 'assets/gallery/large-magellanic-cloud.jpg',    cap: 'LMC — Large Magellanic Cloud' },
    { src: 'assets/gallery/m8-lagoon-nebula.jpg',          cap: 'M8 — The Lagoon Nebula' },
    { src: 'assets/gallery/ic434-horsehead-2026.jpg',      cap: 'IC434 — Horsehead (2026)' },
    { src: 'assets/gallery/caldwell-100.jpg',              cap: 'Caldwell 100 (NGC 253)' },
    { src: 'assets/gallery/large-magellanic-cloud-2025.jpg', cap: 'LMC — Large Magellanic Cloud (2025)' },
    { src: 'assets/gallery/m42-orion-edited.jpg',          cap: 'M42 — Orion Nebula (processed)' },
    { src: 'assets/gallery/large-magellanic-cloud-st.jpg', cap: 'LMC — starless process' },
    { src: 'assets/gallery/deep-sky-1.jpg',                cap: 'Deep-sky field' },
    { src: 'assets/gallery/deep-sky-2.jpg',                cap: 'Deep-sky field' }
  ];

  const grid = document.getElementById('galleryGrid');
  if (grid) {
    IMAGES.forEach((im, i) => {
      const fig = document.createElement('figure');
      fig.className = 'reveal';
      fig.dataset.index = i;
      fig.innerHTML = `<img src="${im.src}" alt="${im.cap}" loading="lazy" decoding="async" /><figcaption>${im.cap}</figcaption>`;
      fig.addEventListener('click', () => open(i));
      fig.addEventListener('keydown', e => { if (e.key === 'Enter') open(i); });
      fig.tabIndex = 0;
      grid.appendChild(fig);
    });
    if (window.BA_bindReveal) window.BA_bindReveal();
  }

  /* ---- Lightbox ---- */
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbCap = document.getElementById('lbCaption');
  let cur = 0;

  function show(i) {
    cur = (i + IMAGES.length) % IMAGES.length;
    const im = IMAGES[cur];
    lbImg.src = im.src; lbImg.alt = im.cap; lbCap.textContent = im.cap;
  }
  function open(i) { show(i); lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; }
  function close() { lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; }

  document.getElementById('lbClose').addEventListener('click', close);
  document.getElementById('lbPrev').addEventListener('click', () => show(cur - 1));
  document.getElementById('lbNext').addEventListener('click', () => show(cur + 1));
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(cur - 1);
    if (e.key === 'ArrowRight') show(cur + 1);
  });
})();
