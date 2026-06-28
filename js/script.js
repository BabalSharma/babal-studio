const nav = document.querySelector('.navbar');
const dropBtn = document.getElementById('dropBtn');
const dropdownMenu = document.getElementById('dropdownMenu');
const typingElement = document.getElementById('typing');
const heroParallax = document.querySelector('[data-parallax]');
const root = document.documentElement;
const darkStorageKey = 'babalstudio-theme';

function handleNavScroll() {
  if (!nav) return;
  nav.classList.toggle('is-scrolled', window.scrollY > 18);
}

function setupDropdown() {
  if (!dropBtn || !dropdownMenu) return;

  const closeMenu = () => {
    dropdownMenu.classList.remove('show');
    document.body.classList.remove('menu-open');
    dropBtn.setAttribute('aria-expanded', 'false');
  };

  const openMenu = () => {
    dropdownMenu.classList.add('show');
    document.body.classList.add('menu-open');
    dropBtn.setAttribute('aria-expanded', 'true');
  };

  dropBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    const isOpen = dropdownMenu.classList.contains('show');
    if (isOpen) closeMenu();
    else openMenu();
  });

  dropdownMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

  document.addEventListener('click', (event) => {
    if (!dropdownMenu.contains(event.target) && event.target !== dropBtn) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMenu();
  });
}

function setupReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  items.forEach((item) => observer.observe(item));
}

function setupHeroLabel() {
  if (!typingElement || typingElement.dataset.rotateLabels !== 'true') return;

  const labels = ['Graphic Designer', 'Web Developer', 'Brand Visuals', 'Digital Systems'];
  let activeIndex = 0;
  typingElement.textContent = labels[0];

  window.setInterval(() => {
    activeIndex = (activeIndex + 1) % labels.length;
    if (typeof typingElement.animate === 'function') {
      typingElement.animate(
        [
          { opacity: 1, transform: 'translateY(0px)' },
          { opacity: 0, transform: 'translateY(-6px)' },
          { opacity: 0, transform: 'translateY(6px)' },
          { opacity: 1, transform: 'translateY(0px)' }
        ],
        { duration: 480, easing: 'ease-out' }
      );
    }
    typingElement.textContent = labels[activeIndex];
  }, 2200);
}

function setupHeroParallax() {
  if (!heroParallax || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let ticking = false;
  const updateParallax = () => {
    const offset = Math.min(window.scrollY * 0.045, 16);
    heroParallax.style.transform = `translateY(${offset}px)`;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
}

function applyTheme(theme) {
  const resolvedTheme = theme === 'dark' ? 'dark' : 'light';
  document.body.dataset.theme = resolvedTheme;
  root.style.colorScheme = resolvedTheme;
  localStorage.setItem(darkStorageKey, resolvedTheme);

  const button = document.querySelector('.theme-toggle');
  if (button) {
    button.setAttribute('aria-pressed', String(resolvedTheme === 'dark'));
    button.innerHTML = resolvedTheme === 'dark' ? '<span>☀</span><span>Light</span>' : '<span>☾</span><span>Dark</span>';
  }
}

function setupThemeToggle() {
  const savedTheme = localStorage.getItem(darkStorageKey);
  const preferredDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (preferredDark ? 'dark' : 'light');

  let themeArea = null;
  if (nav) {
    themeArea = nav.querySelector('.nav-utility-group');
    if (!themeArea) {
      themeArea = document.createElement('div');
      themeArea.className = 'nav-utility-group';
      nav.appendChild(themeArea);
    }
  } else {
    themeArea = document.createElement('div');
    themeArea.className = 'floating-theme-wrap';
    document.body.appendChild(themeArea);
  }

  const existingToggle = themeArea.querySelector('.theme-toggle');
  if (!existingToggle) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'theme-toggle';
    button.setAttribute('aria-label', 'Toggle dark mode');
    button.addEventListener('click', () => {
      const next = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
    themeArea.prepend(button);
  }

  applyTheme(initialTheme);
}


function setupActiveNavLinks() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .dropdown-menu a').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#')) return;
    if (href === current) link.classList.add('is-active');
  });
}

function setupSpotlightCards() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll('.card, .login-panel, .login-copy, .order-summary').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--spot-x', `${x}%`);
      card.style.setProperty('--spot-y', `${y}%`);
    });
  });
}

function setupTiltCards() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll('.tilt-card').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(1100px) rotateX(${(-py * 8).toFixed(2)}deg) rotateY(${(px * 10).toFixed(2)}deg) translateY(-4px)`;
    });
    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });
}

function setupSecretAdminAccess() {
  let typed = '';
  document.addEventListener('keydown', (event) => {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    typed = (typed + event.key.toLowerCase()).slice(-5);
    if (typed === 'admin') {
      window.location.href = 'admin.portal/adminlogin.html';
    }
  });
}

function setupFloatingOrbs() {
  if (document.querySelector('.bg-orbs') || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const orbLayer = document.createElement('div');
  orbLayer.className = 'bg-orbs';
  orbLayer.innerHTML = '<span class="orb orb-a"></span><span class="orb orb-b"></span><span class="orb orb-c"></span>';
  document.body.prepend(orbLayer);
}

window.addEventListener('scroll', handleNavScroll, { passive: true });
window.addEventListener('load', handleNavScroll);

setupDropdown();
setupReveal();
setupHeroLabel();
setupHeroParallax();
setupThemeToggle();
setupActiveNavLinks();
setupSpotlightCards();
setupTiltCards();
setupSecretAdminAccess();
setupFloatingOrbs();
