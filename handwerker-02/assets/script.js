// Update year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Reveal on scroll using IntersectionObserver
(() => {
  const items = document.querySelectorAll('[data-animate]');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) {
    items.forEach((el) => el.classList.add('in-view'));
    return;
  }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach((el) => obs.observe(el));
})();

// Mobile navigation toggle
(() => {
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('primary-navigation');
  if (!toggle || !nav) return;

  const srLabel = toggle.querySelector('.sr-only');
  const iconPath = toggle.querySelector('path');
  const icons = {
    closed: 'M4 7h16M4 12h16M4 17h16',
    open: 'M6 6l12 12M6 18L18 6'
  };
  const mq = window.matchMedia('(min-width: 48rem)');
  const coarseMq = window.matchMedia('(pointer: coarse)');
  const isMobileLike = () => coarseMq.matches || (navigator.maxTouchPoints || 0) > 1;
  const isDesktop = () => mq.matches && !isMobileLike();

  const setState = (open) => {
    const desktop = isDesktop();
    const resolved = desktop ? true : open;
    nav.setAttribute('data-open', String(resolved));
    nav.setAttribute('aria-hidden', String(!(desktop || resolved)));
    toggle.setAttribute('aria-expanded', String(resolved));
    toggle.classList.toggle('is-active', resolved && !desktop);
    toggle.setAttribute('aria-hidden', desktop ? 'true' : 'false');
    toggle.setAttribute('tabindex', desktop ? '-1' : '0');
    if (document.body) {
      document.body.classList.toggle('nav-touch', !desktop);
    }
    if (srLabel) srLabel.textContent = !desktop && resolved ? 'Menü schließen' : 'Menü öffnen';
    if (iconPath) iconPath.setAttribute('d', !desktop && resolved ? icons.open : icons.closed);
  };

  const syncForViewport = () => {
    if (isDesktop()) {
      setState(true);
    } else {
      setState(false);
    }
  };

  syncForViewport();
  if (mq.addEventListener) {
    mq.addEventListener('change', syncForViewport);
  } else if (mq.addListener) {
    mq.addListener(syncForViewport);
  }
  if (coarseMq.addEventListener) {
    coarseMq.addEventListener('change', syncForViewport);
  } else if (coarseMq.addListener) {
    coarseMq.addListener(syncForViewport);
  }

  toggle.addEventListener('click', (event) => {
    if (isDesktop()) return;
    event.preventDefault();
    const next = nav.getAttribute('data-open') !== 'true';
    setState(next);
    if (next) {
      const firstLink = nav.querySelector('a');
      firstLink?.focus();
    }
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (!isDesktop()) setState(false);
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !isDesktop() && nav.getAttribute('data-open') === 'true') {
      setState(false);
      toggle.focus({ preventScroll: true });
    }
  });

  document.addEventListener('click', (event) => {
    if (isDesktop() || nav.getAttribute('data-open') !== 'true') return;
    if (!nav.contains(event.target) && !toggle.contains(event.target)) {
      setState(false);
    }
  });
})();

// Before/After compare slider logic
(() => {
  const compares = document.querySelectorAll('.compare');
  compares.forEach((wrap) => {
    const surface = wrap.querySelector('.compare-surface');
    const range = wrap.querySelector('.compare-range');
    const afterImg = wrap.querySelector('.compare-img.after');
    const beforeLayer = wrap.querySelector('.compare-layer.before');
    const afterLayer = wrap.querySelector('.compare-layer.after');
    const handle = wrap.querySelector('.compare-handle');

    if (!surface || !range) return;

    const setPos = (val) => {
      const numeric = typeof val === 'number' ? val : parseFloat(val);
      const clamped = Number.isFinite(numeric) ? Math.max(0, Math.min(100, numeric)) : 50;
      const percent = clamped + '%';
      surface.style.setProperty('--pos', percent);
      if (afterImg) afterImg.style.clipPath = `inset(0 0 0 ${percent})`;
      if (beforeLayer) beforeLayer.style.width = percent;
      if (afterLayer) afterLayer.style.left = percent;
      if (handle) handle.style.left = percent;
      range.value = String(clamped);
    };

    // Init
    setPos(range.value || 50);

    range.addEventListener('input', (e) => {
      setPos(e.target.value);
    });

    // Drag by clicking anywhere
    const toPercent = (evt) => {
      const rect = surface.getBoundingClientRect();
      const x = (evt.clientX ?? (evt.touches?.[0]?.clientX || 0)) - rect.left;
      return (x / rect.width) * 100;
    };

    const onMove = (evt) => {
      evt.preventDefault();
      const p = toPercent(evt);
      setPos(p);
    };

    const start = (evt) => {
      onMove(evt);
      window.addEventListener('mousemove', onMove);
      window.addEventListener('touchmove', onMove, { passive: false });
      window.addEventListener('mouseup', end);
      window.addEventListener('touchend', end);
    };
    const end = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove, { passive: false });
      window.removeEventListener('mouseup', end);
      window.removeEventListener('touchend', end);
    };
    surface.addEventListener('mousedown', start);
    surface.addEventListener('touchstart', start, { passive: false });
  });
})();

// Highlight active nav item and analytics hooks
(() => {
  const header = document.querySelector('header');
  const navLinks = Array.from(header?.querySelectorAll('nav a[href^="#"]') || [])
    .filter((a) => !a.dataset.analytics);

  // Active section highlighting
  const sections = navLinks
    .map((a) => document.querySelector(a.getAttribute('href'))) 
    .filter(Boolean);

  const setActive = (id) => {
    navLinks.forEach((a) => {
      const match = a.getAttribute('href') === `#${id}`;
      a.setAttribute('aria-current', match ? 'page' : 'false');
      a.classList.toggle('text-accent-700', !!match);
      a.classList.toggle('font-semibold', !!match);
    });
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActive(entry.target.id);
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0.01 });

  sections.forEach((sec) => io.observe(sec));

  // Analytics hooks (console only, can be replaced later)
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-analytics]');
    if (el) {
      const payload = { type: el.dataset.analytics, id: el.dataset.analyticsId || null };
      if (window?.console) console.log('[analytics]', payload);
    }
  });
  document.getElementById('contact-form')?.addEventListener('submit', () => {
    if (window?.console) console.log('[analytics]', { type: 'form-submit', id: 'contact-form' });
  });
})();

// Cost calculator
(() => {
  const typeSel = document.getElementById('calc-type');
  const areaInput = document.getElementById('calc-area');
  const btn = document.getElementById('calc-btn');
  const out = document.getElementById('calc-result');
  const offerBtn = document.getElementById('offer-btn');
  const msg = document.getElementById('nachricht');

  if (!btn) return;

  const rates = {
    'Malerarbeiten': 20, // €/m² Richtwert
    'Bodenverlegung': 35,
    'Trockenbau': 45,
    'Badezimmer-Renovierung': 120,
    'Komplettsanierung': 950 // pauschal pro m² Wohnfläche (Richtwert)
  };

  const format = (num) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(num);

  btn.addEventListener('click', () => {
    const type = typeSel.value;
    const area = parseFloat(areaInput.value);
    if (!area || area <= 0) {
      out.textContent = 'Bitte eine gültige Fläche angeben (m²).';
      offerBtn.disabled = true;
      return;
    }
    const base = rates[type] ?? 0;
    let price = base * area;
    // +/- 10% Bandbreite als Orientierung
    const min = Math.round(price * 0.9);
    const max = Math.round(price * 1.1);
    out.innerHTML = `Unverbindliche Schätzung für <strong>${type}</strong> bei <strong>${area} m²</strong>: <strong>${format(min)} – ${format(max)}</strong>`;
    offerBtn.disabled = false;

    // Vorbefüllen der Nachricht
    if (msg) {
      const hint = `Anfrage zu ${type}, Fläche ca. ${area} m². Unverbindliche Schätzung: ${format(min)} – ${format(max)}.`;
      if (!msg.value.includes('Anfrage zu')) {
        msg.value = hint + (msg.value ? `\n\n${msg.value}` : '');
      }
    }
  });

  offerBtn?.addEventListener('click', () => {
    document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' });
  });
})();

// Enhance layout to match reference design (non-breaking, progressive)
(() => {
  // Insert stats row under hero CTAs
  const hero = document.querySelector('#top');
  const ctas = hero?.querySelector('.flex.flex-wrap.gap-3');
  if (ctas && !hero.querySelector('[data-insert="hero-stats"]')) {
    const stats = document.createElement('div');
    stats.setAttribute('data-insert', 'hero-stats');
    stats.className = 'mt-8 grid grid-cols-3 gap-6 text-center md:text-left';
    stats.innerHTML = `
      <div><div class="text-2xl font-extrabold text-gray-900">15+</div><div class="text-xs text-gray-600">Jahre Erfahrung</div></div>
      <div><div class="text-2xl font-extrabold text-gray-900">500+</div><div class="text-xs text-gray-600">Projekte</div></div>
      <div><div class="text-2xl font-extrabold text-gray-900">98%</div><div class="text-xs text-gray-600">Zufriedenheit</div></div>`;
    ctas.after(stats);
  }

  // Replace hero decorative panel with compare slider
  const heroPanel = document.querySelector('#top .aspect-\\[4\\/3\\]');
  if (heroPanel && !heroPanel.querySelector('.compare-surface')) {
    heroPanel.innerHTML = `
      <div class="compare">
        <div class="compare-surface">
          <img src="img/before_after/1_before.jpg" alt="Vorher: Küche" class="compare-img before" loading="lazy" decoding="async" width="800" height="600" />
          <img src="img/before_after/1_after.png" alt="Nachher: Küche" class="compare-img after" loading="lazy" decoding="async" width="800" height="600" />
          <div class="compare-layer before"><div class="label">Vorher</div></div>
          <div class="compare-layer after"><div class="label">Nachher</div></div>
          <div class="compare-handle" aria-hidden="true"></div>
          <input class="compare-range" type="range" min="0" max="100" value="50" aria-label="Vorher/Nachher Schieberegler" />
        </div>
      </div>`;
  }

  // Rename section headings to match reference (non-destructive)
  const svcTitle = document.querySelector('#leistungen h2');
  if (svcTitle && !/Unsere/.test(svcTitle.textContent)) svcTitle.textContent = 'Unsere Leistungen';
  const galTitle = document.querySelector('#galerie h2');
  if (galTitle && !/Unsere/.test(galTitle.textContent)) galTitle.textContent = 'Unsere Projekte';

  // Add contact CTA button in info card
  const infoCard = document.querySelector('#kontakt .p-6.rounded-xl.border');
  if (infoCard && !infoCard.querySelector('[data-insert="contact-cta"]')) {
    const box = document.createElement('div');
    box.className = 'mt-4';
    box.innerHTML = '<a data-insert="contact-cta" href="#kontakt" class="inline-flex items-center rounded-md bg-accent-500 px-4 py-2 font-medium text-white hover:bg-accent-600">Kostenlose Beratung</a>';
    infoCard.appendChild(box);
  }
})();
