/* Animated cosmic starfield: layered parallax stars, twinkle, shooting stars. */
(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canvas = document.getElementById('starfield');
  if (!canvas || reduce) return;
  const ctx = canvas.getContext('2d');
  let w, h, dpr, stars = [], shooters = [], raf, last = 0;
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

  const COLORS = ['#ffffff', '#62E9FB', '#3099F3', '#A3A5AB', '#F5A623'];

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.width = innerWidth * dpr;
    h = canvas.height = innerHeight * dpr;
    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';
    build();
  }
  function build() {
    const count = Math.min(260, Math.floor((innerWidth * innerHeight) / 5200));
    stars = Array.from({ length: count }, () => {
      const depth = Math.random();
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        r: (Math.random() * 1.4 + 0.3) * dpr * (0.6 + depth),
        baseA: Math.random() * 0.6 + 0.25,
        tw: Math.random() * 0.02 + 0.004,
        phase: Math.random() * Math.PI * 2,
        depth: depth, // 0..1 — deeper = moves more with parallax
        c: COLORS[Math.floor(Math.random() * COLORS.length)]
      };
    });
  }
  function spawnShooter() {
    const fromLeft = Math.random() > 0.5;
    shooters.push({
      x: fromLeft ? -50 : w + 50,
      y: Math.random() * h * 0.5,
      vx: (fromLeft ? 1 : -1) * (8 + Math.random() * 6) * dpr,
      vy: (3 + Math.random() * 3) * dpr,
      life: 0,
      max: 60 + Math.random() * 30
    });
  }
  function frame(t) {
    raf = requestAnimationFrame(frame);
    if (document.hidden) return;
    const dt = t - last; last = t;
    ctx.clearRect(0, 0, w, h);
    // ease mouse
    mouse.x += (mouse.tx - mouse.x) * 0.05;
    mouse.y += (mouse.ty - mouse.y) * 0.05;

    for (const s of stars) {
      s.phase += s.tw * (dt || 16);
      const a = s.baseA + Math.sin(s.phase) * 0.3;
      const px = s.x + mouse.x * s.depth * 18 * dpr;
      const py = s.y + mouse.y * s.depth * 18 * dpr;
      ctx.globalAlpha = Math.max(0, a);
      ctx.fillStyle = s.c;
      ctx.beginPath();
      ctx.arc(px, py, s.r, 0, Math.PI * 2);
      ctx.fill();
      if (s.r > 1.6 * dpr) { // glow on bigger stars
        ctx.globalAlpha = a * 0.25;
        ctx.beginPath();
        ctx.arc(px, py, s.r * 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // shooting stars
    if (Math.random() < 0.004 && shooters.length < 2) spawnShooter();
    for (let i = shooters.length - 1; i >= 0; i--) {
      const m = shooters[i];
      m.life++;
      m.x += m.vx; m.y += m.vy;
      const fade = 1 - m.life / m.max;
      if (fade <= 0 || m.x < -200 || m.x > w + 200) { shooters.splice(i, 1); continue; }
      const tailX = m.x - m.vx * 8, tailY = m.y - m.vy * 8;
      const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
      grad.addColorStop(0, `rgba(226,248,254,${fade})`);
      grad.addColorStop(1, 'rgba(226,248,254,0)');
      ctx.globalAlpha = 1;
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2 * dpr;
      ctx.beginPath();
      ctx.moveTo(m.x, m.y);
      ctx.lineTo(tailX, tailY);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('mousemove', e => {
    mouse.tx = (e.clientX / innerWidth - 0.5) * 2;
    mouse.ty = (e.clientY / innerHeight - 0.5) * 2;
  }, { passive: true });
  document.addEventListener('visibilitychange', () => { last = performance.now(); });

  resize();
  raf = requestAnimationFrame(frame);
})();
