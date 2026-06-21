/* Sticky glass nav: condense on scroll, mobile menu, active-section highlight. */
(function () {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const links = document.querySelectorAll('.nav__links a');

  // Condense on scroll
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu
  const closeMenu = () => { nav.classList.remove('menu-open'); toggle.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); };
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('menu-open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  });
  links.forEach(l => l.addEventListener('click', closeMenu));

  // Active section via IntersectionObserver
  const sections = ['home', 'shop', 'gallery', 'about', 'custom', 'contact']
    .map(id => document.getElementById(id)).filter(Boolean);
  const map = new Map();
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) map.set(en.target.id, en.intersectionRatio);
      else map.delete(en.target.id);
    });
    // pick the section with the largest visibility
    let best = null, bestR = 0;
    map.forEach((r, id) => { if (r > bestR) { bestR = r; best = id; } });
    if (!best) return;
    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + best));
  }, { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] });
  sections.forEach(s => io.observe(s));
})();
