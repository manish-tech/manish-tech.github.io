// Theme toggle
(function () {
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  btn.addEventListener('click', () => {
    const current = root.dataset.theme ||
      (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next = current === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
  });
  document.getElementById('year').textContent = new Date().getFullYear();
})();

// Hero terminal: a simulated order-event stream
(function () {
  const el = document.getElementById('stream');
  if (!el) return;
  const events = [
    ['order.created', 'ok', 'tenant=co-01 channel=mercadolibre id=ML-48213'],
    ['inventory.reserved', 'ok', 'sku=PX-2291 qty=2 wh=BOG-1'],
    ['promotion.applied', 'ok', 'rule=BLACKFRIDAY state=ACTIVE'],
    ['invoice.issued', 'ok', 'provider=siigo dian=accepted'],
    ['order.created', 'ok', 'tenant=mx-02 channel=shopify id=SH-99107'],
    ['backorder.detected', 'warn', 'sku=TR-0042 → rerouting'],
    ['warehouse.routed', 'ok', 'from=MEX-1 to=MEX-3 breaker=closed'],
    ['shipment.packed', 'ok', 'id=SH-99107 carrier=estafeta'],
    ['export.chunk', 'ok', 'rows=50000/120000 heap=stable'],
    ['consumer.retry', 'warn', 'attempt=2/3 backoff=400ms'],
    ['consumer.recovered', 'ok', 'offset committed'],
    ['order.delivered', 'ok', 'id=ML-48213 sla=met'],
  ];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const MAX = 11;
  let lines = [];
  let i = 0;

  const ts = () => new Date().toTimeString().slice(0, 8);
  const esc = (s) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
  const fmt = ([key, level, detail]) =>
    `<span class="t-time">${ts()}</span> <span class="${level === 'warn' ? 't-warn' : 't-ok'}">${level === 'warn' ? '▲' : '●'}</span> <span class="t-key">${key}</span> ${esc(detail)}`;

  function render() {
    el.innerHTML = lines.map((l) => `<div>${l}</div>`).join('') + '<div><span class="t-cursor"></span></div>';
  }
  function push() {
    lines.push(fmt(events[i % events.length]));
    if (lines.length > MAX) lines.shift();
    i++;
    render();
  }

  if (reduce) {
    for (let k = 0; k < MAX; k++) push();
    return;
  }
  push();
  setInterval(push, 1100);
})();

// Reveal sections on scroll
(function () {
  const targets = document.querySelectorAll('.card, .timeline > li, .skill-group, .stat, .section-head, .post-item');
  if (!('IntersectionObserver' in window)) return;
  targets.forEach((t) => t.classList.add('reveal'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  targets.forEach((t) => io.observe(t));
})();
