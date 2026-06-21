/* 3D tilt + glow on product cards (.tilt).
   Exposes window.BA_bindTilt() to bind cards rendered after filtering. */
(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const MAX = 8; // degrees

  function attach(card) {
    if (card.__tilt) return; card.__tilt = true;
    if (reduce) return;
    let raf = null;
    const onMove = (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const rx = (0.5 - py) * MAX;
      const ry = (px - 0.5) * MAX;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
        card.style.setProperty('--mx', (px * 100) + '%');
        card.style.setProperty('--my', (py * 100) + '%');
      });
    };
    const reset = () => { if (raf) cancelAnimationFrame(raf); card.style.transform = ''; };
    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', reset);
  }

  function bind() { document.querySelectorAll('.tilt').forEach(attach); }
  window.BA_bindTilt = bind;
  bind();
})();
