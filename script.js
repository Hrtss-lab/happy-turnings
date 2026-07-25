/* =========================================================
   AZURE DREAMS — interaction layer
   Shared across all pages. Each block checks for its
   elements before running, since every page only has a
   subset of the markup.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  const $ = (sel) => document.querySelector(sel);
  const currentPage = document.body.dataset.page;

  /* ---------- page fade-in on load ---------- */
  requestAnimationFrame(() => document.body.classList.add('page-ready'));

  /* ---------- loader ---------- */
  const loader = $('#loader');
  if (loader) {
    window.addEventListener('load', () => setTimeout(() => loader.classList.add('hidden'), 900));
    setTimeout(() => loader.classList.add('hidden'), 1800); // fallback
  }

  /* ---------- cross-page nav transition ----------
     Any <a class="nav-link"> fades the page out before
     following its href, so moving between pages feels
     continuous rather than an abrupt page load. */
  document.querySelectorAll('a.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || link.target === '_blank') return;
      e.preventDefault();
      document.body.classList.add('page-leaving');
      setTimeout(() => { window.location.href = href; }, 420);
    });
  });

  /* ---------- side nav dots (built from PAGES in config.js) ---------- */
  const navDots = $('#navDots');
  if (navDots && typeof PAGES !== 'undefined') {
    PAGES.forEach(p => {
      const a = document.createElement('a');
      a.href = p.file;
      a.className = 'nav-link' + (p.id === currentPage ? ' active' : '');
      a.setAttribute('aria-label', p.label);
      a.addEventListener('click', (e) => {
        if (p.id === currentPage) { e.preventDefault(); return; }
        e.preventDefault();
        document.body.classList.add('page-leaving');
        setTimeout(() => { window.location.href = p.file; }, 420);
      });
      navDots.appendChild(a);
    });
  }

  /* ---------- inject config text (only fills what exists on this page) ---------- */
  if (typeof CONFIG !== 'undefined') {
    document.querySelectorAll('#recipientName').forEach(el => el.textContent = CONFIG.name);
    if ($('#cardMessage')) $('#cardMessage').textContent = CONFIG.cardMessage;
    if ($('#giftMessage')) $('#giftMessage').dataset.text = CONFIG.giftMessage;
    if ($('#finalMessage')) $('#finalMessage').textContent = CONFIG.finalMessage;
    if ($('#closingLine')) $('#closingLine').textContent = CONFIG.closingLine;
    document.title = `Happy Birthday, ${CONFIG.name}`;
  }

  /* ---------- cursor glow + gentle parallax (desktop only) ---------- */
  const glow = $('#cursorGlow');
  const isFinePointer = window.matchMedia('(pointer:fine)').matches;
  if (glow && isFinePointer) {
    window.addEventListener('mousemove', (e) => {
      glow.style.opacity = '0.6';
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';

      const cx = (e.clientX / window.innerWidth) - 0.5;
      const cy = (e.clientY / window.innerHeight) - 0.5;
      document.querySelectorAll('.cloud').forEach((c, i) => {
        c.style.transform = `translate(${cx * (i + 1) * 14}px, ${cy * (i + 1) * 8}px)`;
      });
      document.querySelectorAll('.orb').forEach((o, i) => {
        o.style.marginLeft = `${cx * (i + 1) * 20}px`;
      });
    });
    window.addEventListener('mouseleave', () => glow.style.opacity = '0');
  }

  /* =========================================================
     WISHES PAGE
     ========================================================= */
  const grid = $('#wishGrid');
  if (grid && typeof CONFIG !== 'undefined') {
    const ICONS = {
      gift: `<svg class="icon-svg" width="40" height="40" viewBox="0 0 40 40" fill="none"><rect x="7" y="16" width="26" height="18" rx="2" stroke="var(--sky)" stroke-width="1.4"/><rect x="4" y="10" width="32" height="8" rx="1.5" stroke="var(--sky)" stroke-width="1.4"/><path d="M20 10V34" stroke="var(--sky)" stroke-width="1.4"/><path d="M20 10c-3-6-11-5-9 0s9 0 9 0z" stroke="var(--sky)" stroke-width="1.2"/><path d="M20 10c3-6 11-5 9 0s-9 0-9 0z" stroke="var(--sky)" stroke-width="1.2"/></svg>`,
      star: `<svg class="icon-svg" width="40" height="40" viewBox="0 0 40 40" fill="none"><path d="M20 4c2 7 5 10 12 12-7 2-10 5-12 12-2-7-5-10-12-12 7-2 10-5 12-12z" stroke="var(--sky)" stroke-width="1.3" stroke-linejoin="round"/></svg>`,
      heart: `<svg class="icon-svg" width="40" height="40" viewBox="0 0 40 40" fill="none"><path d="M20 33s-13-8-13-17c0-5 4-9 9-9 2 0 3.5 1 4 2 0.5-1 2-2 4-2 5 0 9 4 9 9 0 9-13 17-13 17z" stroke="var(--sky)" stroke-width="1.4" stroke-linejoin="round"/></svg>`,
      rose: `<svg class="icon-svg" width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="15" r="8" stroke="var(--sky)" stroke-width="1.3"/><path d="M20 23c0 8-2 12-2 12" stroke="var(--sky)" stroke-width="1.3"/><path d="M18 30c-3 0-5 2-6 4" stroke="var(--sky)" stroke-width="1.2"/></svg>`
    };
    CONFIG.wishes.forEach((w, i) => {
      const card = document.createElement('div');
      card.className = 'wish-card fade-in';
      card.style.animationDelay = `${0.3 + i * 0.08}s`;
      card.innerHTML = `
        ${ICONS[w.icon] || ICONS.star}
        <h3>${w.label}</h3>
        <p class="wish-detail">${w.detail}</p>
      `;
      card.addEventListener('click', () => card.classList.toggle('open'));
      grid.appendChild(card);
    });
  }

  /* =========================================================
     CARD PAGE — Celebrate
     ========================================================= */
  const celebrateBtn = $('#celebrateBtn');
  if (celebrateBtn) {
    const cardContinue = $('#cardContinue');
    celebrateBtn.addEventListener('click', () => {
      fireConfetti();
      spawnBalloons(12);
      celebrateBtn.disabled = true;
      celebrateBtn.style.opacity = '0.5';
      if (cardContinue) setTimeout(() => cardContinue.classList.add('shown'), 900);
    });
  }

  /* =========================================================
     GIFT PAGE
     ========================================================= */
  const giftBox = $('#giftBox');
  if (giftBox) {
    const giftMessage = $('#giftMessage');
    const giftContinue = $('#giftContinue');
    const openGift = () => {
      if (giftBox.classList.contains('open')) return;
      giftBox.classList.add('open');
      for (let i = 0; i < 14; i++) {
        const star = document.createElement('div');
        star.className = 'gift-star';
        star.style.left = (Math.random() * 140 + 20) + 'px';
        star.style.top = (Math.random() * 60 + 80) + 'px';
        star.style.animationDelay = (Math.random() * 0.4) + 's';
        giftBox.appendChild(star);
        setTimeout(() => star.remove(), 2200);
      }
      setTimeout(() => {
        if (giftMessage) {
          giftMessage.textContent = giftMessage.dataset.text;
          giftMessage.classList.add('shown');
        }
        if (giftContinue) giftContinue.classList.add('shown');
      }, 500);
    };
    giftBox.addEventListener('click', openGift);
    giftBox.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openGift(); }
    });
  }

  /* =========================================================
     FINAL PAGE — cake + hearts + replay
     ========================================================= */
  const candleGroup = $('#candleGroup');
  if (candleGroup && typeof CONFIG !== 'undefined') {
    const n = CONFIG.candles || 5;
    const startX = 110 - (n - 1) * 10;
    for (let i = 0; i < n; i++) {
      const x = startX + i * 20;
      const wrap = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      wrap.innerHTML = `
        <rect x="${x - 2}" y="70" width="4" height="26" fill="#DCEBFF"/>
        <g class="flame">
          <ellipse cx="${x}" cy="66" rx="4" ry="7" fill="#FFD98A"/>
          <ellipse cx="${x}" cy="68" rx="2" ry="4" fill="#FFF6E0"/>
        </g>
      `;
      candleGroup.appendChild(wrap);
    }
  }

  const heartsField = $('#heartsField');
  function spawnHearts(count = 14) {
    if (!heartsField) return;
    for (let i = 0; i < count; i++) {
      const h = document.createElement('div');
      h.className = 'heart-particle';
      h.textContent = '♡';
      h.style.left = Math.random() * 100 + '%';
      h.style.animationDuration = (10 + Math.random() * 8) + 's';
      h.style.animationDelay = (Math.random() * 2) + 's';
      h.style.fontSize = (12 + Math.random() * 14) + 'px';
      heartsField.appendChild(h);
      setTimeout(() => h.remove(), 20000);
    }
  }
  if (heartsField) {
    spawnHearts(14);
    setInterval(() => spawnHearts(3), 6000);
  }

  const againBtn = $('#againBtn');
  if (againBtn) {
    againBtn.addEventListener('click', () => {
      fireConfetti();
      spawnHearts(10);
    });
  }

  /* =========================================================
     ENDING PAGE — shooting star loop
     ========================================================= */
  const endingStar = $('#endingStar');
  if (endingStar) {
    function shoot() {
      const s = document.createElement('div');
      s.className = 'shooting-star fire';
      s.style.top = (Math.random() * 40 + 5) + '%';
      s.style.left = '-5%';
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 2400);
    }
    setTimeout(shoot, 1200);
    setInterval(shoot, 4500);
  }

  /* =========================================================
     WELCOME PAGE — shooting stars in the sky too
     ========================================================= */
  if (currentPage === 'welcome') {
    const welcomeScene = $('#welcome');
    setInterval(() => {
      const s = document.createElement('div');
      s.className = 'shooting-star fire';
      s.style.top = (Math.random() * 40 + 5) + '%';
      s.style.left = '-5%';
      welcomeScene.appendChild(s);
      setTimeout(() => s.remove(), 2400);
    }, 5000);
  }

  /* =========================================================
     shared effects: confetti + balloons
     ========================================================= */
  function spawnBalloons(count = 10) {
    const colors = ['#4F8EF7', '#A8D8FF', '#1E4ED8', '#F5FAFF'];
    for (let i = 0; i < count; i++) {
      const b = document.createElement('div');
      b.className = 'balloon';
      const left = Math.random() * 90 + 2;
      const drift = (Math.random() - 0.5) * 200;
      const rot = (Math.random() - 0.5) * 30;
      const dur = 6 + Math.random() * 3;
      const delay = Math.random() * 1.2;
      b.style.left = left + 'vw';
      b.style.background = colors[Math.floor(Math.random() * colors.length)];
      b.style.setProperty('--drift', drift + 'px');
      b.style.setProperty('--rot', rot + 'deg');
      b.style.animationDuration = dur + 's';
      b.style.animationDelay = delay + 's';
      document.body.appendChild(b);
      setTimeout(() => b.remove(), (dur + delay) * 1000 + 200);
    }
  }

  function fireConfetti() {
    if (typeof confetti !== 'function') return;
    const colors = ['#4F8EF7', '#A8D8FF', '#1E4ED8', '#F5FAFF'];
    confetti({ particleCount: 90, spread: 75, origin: { y: 0.6 }, colors, scalar: 0.9 });
    setTimeout(() => confetti({ particleCount: 60, spread: 100, origin: { y: 0.4 }, colors, scalar: 0.7 }), 250);
  }

});
