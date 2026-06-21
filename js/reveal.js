/* Scroll-reveal (fade-up) + animated stat counters.
   Exposes window.BA_bindReveal() so freshly-rendered product cards get observed too. */
(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target;
      el.classList.add('in');
      // counters — count this element and any descendants carrying data-count
      if (el.dataset.count) count(el);
      el.querySelectorAll('[data-count]').forEach(count);
      io.unobserve(el);
    });
  }, { threshold: 0.15 });

  function count(el) {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const suffix = el.dataset.suffix || '';
    if (reduce) { el.textContent = target.toLocaleString(undefined, { minimumFractionDigits: decimals }) + suffix; return; }
    // preserve trailing <span> label if present
    const labelEl = el.querySelector('span');
    const label = labelEl ? labelEl.outerHTML : '';
    const dur = 1400; const start = performance.now();
    function tick(now) {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = target * eased;
      el.innerHTML = val.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix + (label ? ' ' + label : '');
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function bind(scope) {
    (scope || document).querySelectorAll('.reveal:not(.in)').forEach(el => {
      if (reduce) { el.classList.add('in'); if (el.dataset.count) count(el); el.querySelectorAll('[data-count]').forEach(count); }
      else io.observe(el);
    });
  }
  window.BA_bindReveal = () => bind(document);
  bind(document);
})();
