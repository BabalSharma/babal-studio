(() => {
  const key = 'babalstudio-site-config-v4';
  const legacyKey = 'babalstudio-site-config-v3';

  const defaults = {
    brandName: 'BabalSharma.Studio',
    accentColor: '#0071e3',
    accentStrong: '#0055b8',
    bgColor: '#f5f5f7',
    bgColor2: '#ffffff',
    glassLevel: 'medium',
    collections: {
      blogs: [
        { category: 'Branding', title: 'How to make a one-person studio look trustworthy', text: 'Spacing, proof, offer clarity, and restraint matter more than flashy effects when trust is the goal.', meta1: '8 min read', meta2: 'Trust systems', ctaText: 'Read preview', image: '' },
        { category: 'Web', title: 'Designing dark mode without killing readability', text: 'A practical breakdown of contrast, surface layering, motion restraint, and visual hierarchy for modern portfolios.', meta1: '6 min read', meta2: 'UI clarity', ctaText: 'Read preview', image: '' }
      ],
      apps: [
        { label: 'Productivity', title: 'FocusFlow Student App', text: 'Study planning, streaks, focus sessions, and academic dashboard ideas for students.', status: 'Beta', platform: 'Android • Web', ctaText: 'Request access', ctaHref: 'login.html', image: '' },
        { label: 'AI Tool', title: 'PromptForge', text: 'A cleaner launch card for AI tools, workflow products, and lightweight SaaS releases.', status: 'Waitlist', platform: 'Web App', ctaText: 'Join waitlist', ctaHref: 'login.html', image: '' }
      ],
      games: [
        { label: 'Arcade', title: 'Nebula Drift', text: 'Fast release card for a cinematic arcade prototype with a cleaner rollout panel.', status: 'Demo live', value: 82, ctaText: 'Open builds', ctaHref: '#launch-cards', image: '' },
        { label: 'Adventure', title: 'Temple Echo', text: 'Store-style teaser card for an exploration game with launch status and progress.', status: 'In progress', value: 64, ctaText: 'Track release', ctaHref: 'games.html', image: '' }
      ]
    },
    pages: {
      home: {
        file: 'index.html',
        hero: { eyebrow: 'Independent digital studio', title: 'Minimal presence.', accent: 'Stronger conversion.', description: 'A cleaner studio homepage built to look trustworthy, feel premium on mobile, and turn portfolio traffic into inquiries, leads, and paid work.' },
        sections: [
          { id: 'home-features', type: 'features', eyebrow: 'What changed', title: 'A more minimal front page with lighter depth.', intro: 'Cleaner rhythm, softer glass, and stronger breathing room across desktop and mobile.', items: [
            { label: 'Layout', title: 'Minimal homepage flow', text: 'Wider spacing, fewer interruptions, and calmer section rhythm for a stronger first impression.', ctaText: 'Explore', ctaHref: 'index.html' },
            { label: 'Admin', title: 'Hidden visual CMS', text: 'Edit sections, blog posts, app cards, and game cards without touching the source code.', ctaText: 'Open admin', ctaHref: 'admin.portal/adminlogin.html' },
            { label: 'Mobile', title: 'Better small-screen feel', text: 'More touch room, cleaner cards, and better readability on IIT mobile widths.', ctaText: 'See apps', ctaHref: 'apps.html' }
          ]},
          { id: 'home-stats', type: 'stats', eyebrow: 'Trust signals', title: 'Numbers make a solo studio feel real.', intro: 'Use simple proof blocks to reduce doubt and guide visitors toward action.', items: [
            { value: '24h', label: 'Fast reply window', text: 'Keep response expectations clear.' },
            { value: '4', label: 'Revenue paths', text: 'Services, apps, games, and content.' },
            { value: '100%', label: 'Mobile-first polish', text: 'Cleaner spacing for small screens.' }
          ]},
          { id: 'home-pricing', type: 'pricing', eyebrow: 'Offer blocks', title: 'Package the work so buying feels easier.', intro: 'Pricing cards help visitors understand what you do, who it is for, and what to do next.', items: [
            { name: 'Starter', price: '₹999+', tag: 'Lead magnet', text: 'Fast entry package for small clients and first trust.', features: '1 focused task\nQuick delivery\nSimple revisions', ctaText: 'Enquire', ctaHref: 'order.html' },
            { name: 'Growth', price: '₹4,999+', tag: 'Most useful', text: 'Balanced service block for design + landing page work.', features: 'Clear scope\nPremium layout\nCTA-focused structure', ctaText: 'Book now', ctaHref: 'order.html' },
            { name: 'Custom', price: 'Quote', tag: 'Higher value', text: 'For full web builds, app ideas, publishing support, and long-term work.', features: 'Discovery call\nCustom roadmap\nPriority handling', ctaText: 'Discuss project', ctaHref: 'index.html#contact' }
          ]},
          { id: 'home-roadmap', type: 'roadmap', eyebrow: 'Buyer path', title: 'Show how a project moves from inquiry to delivery.', intro: 'A roadmap lowers hesitation and helps clients understand your working process.', items: [
            { step: '01', title: 'Inquiry', text: 'Client sends brief, reference, or goal.' },
            { step: '02', title: 'Offer', text: 'You suggest the right package and timeline.' },
            { step: '03', title: 'Build', text: 'Design, review, refine, and prepare assets.' },
            { step: '04', title: 'Launch', text: 'Deliver files, pages, and next-step support.' }
          ]},
          { id: 'home-cta', type: 'cta', eyebrow: 'Start faster', title: 'Use the hidden builder to shape the whole site.', intro: 'The homepage, blog, app, and game layouts can now be managed from one private editor.', primaryText: 'Open Services', primaryHref: 'product.html', secondaryText: 'Open Blog', secondaryHref: 'blogs.html' },
          { id: 'home-contact', type: 'contact', eyebrow: 'Contact', title: 'Start with the fastest route.', intro: 'For design work, websites, and studio collaborations, use the cleanest channel for the job.', items: [
            { label: 'Email', title: 'babalsharma.studio@gmail.com', text: 'Best for briefs, attachments, references, and detailed project requests.', ctaText: 'Send Email', ctaHref: 'mailto:babalsharma.studio@gmail.com', icon: 'mail' },
            { label: 'WhatsApp', title: 'Quick project chat', text: 'Useful for short discussions, availability, and fast pricing questions.', ctaText: 'Open WhatsApp', ctaHref: 'https://wa.me/91XXXXXXXXXX', icon: 'whatsapp' }
          ]}
        ]
      },
      blogs: {
        file: 'blogs.html',
        hero: { eyebrow: 'Studio Blog', title: 'Articles with a', accent: 'clean editorial rhythm.', description: 'Case notes, design process, website experiments, and studio updates presented in a premium reading layout.' },
        sections: [
          { id: 'blog-cta', type: 'cta', eyebrow: 'Editorial system', title: 'New blog posts can now be created from admin.', intro: 'Use the content manager below the page builder to add cards with cover images and meta labels.', primaryText: 'Browse services', primaryHref: 'product.html', secondaryText: 'Go home', secondaryHref: 'index.html' },
          { id: 'blog-gallery', type: 'gallery', eyebrow: 'Visual editorials', title: 'Mix writing with covers, previews, and case snapshots.', intro: 'A gallery block helps make the blog page feel more alive and premium.', items: [
            { image: 'images/project1.jpg', title: 'Case preview', text: 'Landing page study' },
            { image: 'images/project2.jpg', title: 'System notes', text: 'Brand structure' },
            { image: 'images/project3.jpg', title: 'UI audit', text: 'Mobile polish' }
          ]}
        ]
      },
      apps: {
        file: 'apps.html',
        hero: { eyebrow: 'App Distribution', title: 'Mobile-ready launch pages', accent: 'for products and tools.', description: 'Designed for SaaS, AI tools, student utilities, and mobile products that need a clear rollout page with strong visual trust.' },
        sections: [
          { id: 'apps-showcase', type: 'showcase', eyebrow: 'App Launches', title: 'Product rollout cards with image support.', intro: 'Upload product cover images and manage app release cards from one hidden admin workspace.', badge: 'CMS ready', chips: ['Image upload', 'Card creator', 'Mobile layout'], primaryText: 'Open blog', primaryHref: 'blogs.html', secondaryText: 'Open games', secondaryHref: 'games.html', visual: 'phone' },
          { id: 'apps-download', type: 'download', eyebrow: 'Distribution', title: 'Place platform links in one clean block.', intro: 'Use download sections for app stores, APK links, docs, waitlists, and changelogs.', items: [
            { platform: 'Google Play', title: 'Primary store listing', text: 'Best for social proof, reviews, and broad access.', ctaText: 'Add link', ctaHref: '#' },
            { platform: 'APK / Beta', title: 'Direct tester rollout', text: 'Useful for fast private testing before store launch.', ctaText: 'Set link', ctaHref: '#' },
            { platform: 'Docs', title: 'Guide or landing page', text: 'Explain features, onboarding, and pricing clearly.', ctaText: 'Open docs', ctaHref: '#' }
          ]}
        ]
      },
      games: {
        file: 'games.html',
        hero: { eyebrow: 'Game Distribution', title: 'Launch pages for', accent: 'interactive releases.', description: 'Present game projects with platform readiness, release stages, store links, and update visibility in a more product-driven way.' },
        sections: [
          { id: 'games-showcase', type: 'showcase', eyebrow: 'Game Launches', title: 'Interactive release cards with progress status.', intro: 'Add game tiles, artwork, links, and readiness values from admin without touching the code.', badge: 'Launch system', chips: ['Image upload', 'Progress status', 'CTA links'], primaryText: 'See builds', primaryHref: '#launch-cards', secondaryText: 'Open apps', secondaryHref: 'apps.html', visual: 'orbit' },
          { id: 'games-roadmap', type: 'roadmap', eyebrow: 'Release roadmap', title: 'Show players what comes next.', intro: 'Roadmaps help ongoing projects feel active and serious.', items: [
            { step: 'Q1', title: 'Prototype', text: 'Core mechanic and visual direction.' },
            { step: 'Q2', title: 'Demo', text: 'Public test build and feedback pass.' },
            { step: 'Q3', title: 'Store prep', text: 'Artwork, trailer, screenshots, and launch page.' },
            { step: 'Q4', title: 'Release', text: 'Version 1.0 with update plan.' }
          ]}
        ]
      }
    }
  };

  const clone = (v) => JSON.parse(JSON.stringify(v));

  function normalize(parsed) {
    const merged = { ...clone(defaults), ...(parsed || {}) };
    merged.pages = { ...clone(defaults.pages), ...(parsed?.pages || {}) };
    for (const pageKey of Object.keys(defaults.pages)) {
      merged.pages[pageKey] = { ...clone(defaults.pages[pageKey]), ...(merged.pages[pageKey] || {}) };
      merged.pages[pageKey].hero = { ...clone(defaults.pages[pageKey].hero), ...((merged.pages[pageKey] || {}).hero || {}) };
      if (!Array.isArray(merged.pages[pageKey].sections)) merged.pages[pageKey].sections = clone(defaults.pages[pageKey].sections);
    }
    merged.collections = { ...clone(defaults.collections), ...(parsed?.collections || {}) };
    for (const ckey of Object.keys(defaults.collections)) {
      if (!Array.isArray(merged.collections[ckey])) merged.collections[ckey] = clone(defaults.collections[ckey]);
    }
    return merged;
  }

  function load() {
    try {
      const raw = localStorage.getItem(key) || localStorage.getItem(legacyKey);
      if (!raw) return clone(defaults);
      return normalize(JSON.parse(raw));
    } catch {
      return clone(defaults);
    }
  }

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, (m) => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m]));
  }

  function setText(selector, value) {
    document.querySelectorAll(`[data-site-text="${selector}"]`).forEach((el) => { el.textContent = value; });
  }
  function setPageText(selector, value) {
    document.querySelectorAll(`[data-page-text="${selector}"]`).forEach((el) => { el.textContent = value; });
  }

  function iconMarkup(icon) {
    if (icon === 'mail') return '<img class="card-icon" src="images/mail.png" alt="Email Icon" width="56" height="56" loading="lazy" decoding="async" />';
    if (icon === 'whatsapp') return '<img class="card-icon" src="images/whatsapp.png" alt="WhatsApp Icon" width="56" height="56" loading="lazy" decoding="async" />';
    return '';
  }
  function sectionHeader(section) {
    return `<div class="section-header split-header"><div><div class="eyebrow">${escapeHtml(section.eyebrow || 'Section')}</div><h2 class="section-title">${escapeHtml(section.title || '')}</h2></div><p class="section-intro">${escapeHtml(section.intro || '')}</p></div>`;
  }
  function sectionWrap(section, idx, inner) {
    return `<section class="reveal section-compact dynamic-section dynamic-${escapeHtml(section.type)}" data-section-id="${escapeHtml(section.id || `section-${idx}`)}">${sectionHeader(section)}${inner}</section>`;
  }

  function renderFeatures(section, idx) {
    const items = (section.items || []).map((item, i) => `<article class="card reveal" style="--i:${i}"><small>${escapeHtml(item.label)}</small><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p><div class="actions-row" style="justify-content:flex-start;"><a class="btn-secondary" href="${escapeHtml(item.ctaHref || '#')}">${escapeHtml(item.ctaText || 'Open')}</a></div></article>`).join('');
    return sectionWrap(section, idx, `<div class="grid stagger feature-grid-compact">${items}</div>`);
  }
  function renderQuicklinks(section, idx) {
    const items = (section.items || []).map((item, i) => `<a class="card quick-link reveal" style="--i:${i}" href="${escapeHtml(item.href || '#')}"><small>${escapeHtml(item.label)}</small><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p></a>`).join('');
    return sectionWrap(section, idx, `<div class="grid stagger feature-grid-compact">${items}</div>`);
  }
  function renderTestimonials(section, idx) {
    const items = (section.items || []).map((item, i) => `<article class="card quote-card reveal" style="--i:${i}"><p>“${escapeHtml(item.quote)}”</p><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(item.role)}</small></article>`).join('');
    return sectionWrap(section, idx, `<div class="grid stagger feature-grid-compact">${items}</div>`);
  }
  function renderFaq(section, idx) {
    const items = (section.items || []).map((item, i) => `<details class="card faq-item reveal" style="--i:${i}"><summary>${escapeHtml(item.q)}</summary><p>${escapeHtml(item.a)}</p></details>`).join('');
    return sectionWrap(section, idx, `<div class="stack stagger">${items}</div>`);
  }
  function renderContact(section, idx) {
    const items = (section.items || []).map((item, i) => `<article class="card contact-card reveal" style="--i:${i}">${iconMarkup(item.icon)}<small>${escapeHtml(item.label)}</small><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p><div class="actions-row" style="justify-content:flex-start;"><a class="btn-secondary" href="${escapeHtml(item.ctaHref || '#')}">${escapeHtml(item.ctaText || 'Open')}</a>${item.secondaryText ? `<a class="btn-ghost" href="${escapeHtml(item.secondaryHref || '#')}">${escapeHtml(item.secondaryText)}</a>` : ''}</div></article>`).join('');
    return sectionWrap(section, idx, `<div class="grid stagger feature-grid-compact">${items}</div>`);
  }
  function renderCta(section, idx) {
    return `<section class="reveal section-compact dynamic-section dynamic-${escapeHtml(section.type)}" data-section-id="${escapeHtml(section.id || `section-${idx}`)}"><div class="eyebrow">${escapeHtml(section.eyebrow || '')}</div><div class="cta-shell"><div><h2 class="section-title">${escapeHtml(section.title || '')}</h2><p class="section-intro">${escapeHtml(section.intro || '')}</p></div><div class="actions-row"><a class="btn-primary" href="${escapeHtml(section.primaryHref || '#')}">${escapeHtml(section.primaryText || 'Open')}</a>${section.secondaryText ? `<a class="btn-secondary" href="${escapeHtml(section.secondaryHref || '#')}">${escapeHtml(section.secondaryText)}</a>` : ''}</div></div></section>`;
  }
  function renderShowcase(section, idx) {
    const chips = (section.chips || []).map((chip) => `<span class="chip">${escapeHtml(chip)}</span>`).join('');
    const visual = section.visual === 'phone' ? '<div class="showcase-phone glass-soft"></div>' : section.visual === 'orbit' ? '<div class="showcase-orbit"></div>' : '<div class="showcase-glass"></div>';
    return `<section class="reveal section-compact dynamic-section dynamic-${escapeHtml(section.type)}" data-section-id="${escapeHtml(section.id || `section-${idx}`)}"><div class="showcase-grid"><div><div class="eyebrow">${escapeHtml(section.eyebrow || '')}</div><h2 class="section-title">${escapeHtml(section.title || '')}</h2><p class="section-intro">${escapeHtml(section.intro || '')}</p><div class="chip-row">${chips}</div><div class="actions-row"><a class="btn-primary" href="${escapeHtml(section.primaryHref || '#')}">${escapeHtml(section.primaryText || 'Open')}</a>${section.secondaryText ? `<a class="btn-secondary" href="${escapeHtml(section.secondaryHref || '#')}">${escapeHtml(section.secondaryText)}</a>` : ''}</div></div><div class="showcase-visual">${section.badge ? `<span class="showcase-badge">${escapeHtml(section.badge)}</span>` : ''}${visual}</div></div></section>`;
  }
  function renderArticles(section, idx) {
    const items = (section.items || []).map((item, i) => `<article class="card discover-card reveal" data-category="${escapeHtml(String(item.category || 'article').toLowerCase())}" data-search="${escapeHtml(`${item.category || ''} ${item.title || ''} ${item.text || ''} ${item.meta1 || ''} ${item.meta2 || ''}`.toLowerCase())}" style="--i:${i}">${item.image ? `<img class="managed-cover" src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title || 'Article image')}">` : ''}<span class="discover-badge">${escapeHtml(item.category || 'Article')}</span><h2>${escapeHtml(item.title)}</h2><p>${escapeHtml(item.text)}</p><div class="meta-row"><span>${escapeHtml(item.meta1 || '')}</span><span>${escapeHtml(item.meta2 || '')}</span></div><a class="btn-secondary" href="#">${escapeHtml(item.ctaText || 'Read preview')}</a></article>`).join('');
    return sectionWrap(section, idx, `<div class="discover-grid stagger">${items}</div>`);
  }
  function renderProgress(section, idx) {
    const items = (section.items || []).map((item, i) => { const value = Math.max(0, Math.min(100, Number(item.value || 0))); return `<article class="card distro-card reveal" style="--i:${i}"><small>${escapeHtml(item.label)}</small><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p><div class="progress-row"><span>Readiness</span><strong>${value}%</strong></div><div class="progress-bar"><span style="width:${value}%"></span></div></article>`; }).join('');
    const idAttr = String(section.id || '').includes('games') ? 'id="launch-cards"' : '';
    return `<section ${idAttr} class="reveal section-compact dynamic-section dynamic-${escapeHtml(section.type)}" data-section-id="${escapeHtml(section.id || `section-${idx}`)}">${sectionHeader(section)}<div class="grid stagger">${items}</div></section>`;
  }
  function renderSplit(section, idx) {
    const items = (section.items || []).slice(0, 2).map((item) => { const list = String(item.list || '').trim().split(/\n+/).filter(Boolean).map((line) => `<li>${escapeHtml(line)}</li>`).join(''); return `<article class="card"><small>${escapeHtml(item.label)}</small><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p>${list ? `<ul class="clean-list">${list}</ul>` : ''}${item.ctaText ? `<div class="actions-row" style="justify-content:flex-start;"><a class="btn-secondary" href="${escapeHtml(item.ctaHref || '#')}">${escapeHtml(item.ctaText)}</a></div>` : ''}</article>`; }).join('');
    return sectionWrap(section, idx, `<div class="feature-split">${items}</div>`);
  }
  function renderStats(section, idx) {
    const items = (section.items || []).map((item, i) => `<article class="card stat-card reveal" style="--i:${i}"><strong class="stat-value">${escapeHtml(item.value || '0')}</strong><h3>${escapeHtml(item.label || '')}</h3><p>${escapeHtml(item.text || '')}</p></article>`).join('');
    return sectionWrap(section, idx, `<div class="grid stagger stats-grid">${items}</div>`);
  }
  function renderPricing(section, idx) {
    const items = (section.items || []).map((item, i) => { const features = String(item.features || '').split(/\n+/).filter(Boolean).map((x)=>`<li>${escapeHtml(x)}</li>`).join(''); return `<article class="card pricing-card reveal" style="--i:${i}">${item.tag ? `<span class="meta-pill">${escapeHtml(item.tag)}</span>` : ''}<h3>${escapeHtml(item.name || 'Plan')}</h3><div class="price-row">${escapeHtml(item.price || '')}</div><p>${escapeHtml(item.text || '')}</p>${features ? `<ul class="clean-list">${features}</ul>` : ''}<div class="actions-row" style="justify-content:flex-start;"><a class="btn-primary" href="${escapeHtml(item.ctaHref || '#')}">${escapeHtml(item.ctaText || 'Choose')}</a></div></article>`; }).join('');
    return sectionWrap(section, idx, `<div class="grid stagger pricing-grid">${items}</div>`);
  }
  function renderGallery(section, idx) {
    const items = (section.items || []).map((item, i) => `<article class="card gallery-card reveal" style="--i:${i}">${item.image ? `<img class="managed-cover" src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title || 'Gallery image')}">` : '<div class="gallery-placeholder">Add image</div>'}<div class="gallery-copy"><h3>${escapeHtml(item.title || '')}</h3><p>${escapeHtml(item.text || '')}</p></div></article>`).join('');
    return sectionWrap(section, idx, `<div class="grid stagger gallery-grid">${items}</div>`);
  }
  function renderTeam(section, idx) {
    const items = (section.items || []).map((item, i) => `<article class="card team-card reveal" style="--i:${i}">${item.image ? `<img class="team-avatar" src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name || 'Team member')}">` : '<div class="team-avatar placeholder"></div>'}<h3>${escapeHtml(item.name || '')}</h3><small>${escapeHtml(item.role || '')}</small><p>${escapeHtml(item.text || '')}</p></article>`).join('');
    return sectionWrap(section, idx, `<div class="grid stagger feature-grid-compact">${items}</div>`);
  }
  function renderRoadmap(section, idx) {
    const items = (section.items || []).map((item, i) => `<article class="card roadmap-card reveal" style="--i:${i}"><span class="roadmap-step">${escapeHtml(item.step || String(i+1).padStart(2,'0'))}</span><h3>${escapeHtml(item.title || '')}</h3><p>${escapeHtml(item.text || '')}</p></article>`).join('');
    return sectionWrap(section, idx, `<div class="grid stagger roadmap-grid">${items}</div>`);
  }
  function renderDownload(section, idx) {
    const items = (section.items || []).map((item, i) => `<article class="card download-card reveal" style="--i:${i}"><small>${escapeHtml(item.platform || 'Platform')}</small><h3>${escapeHtml(item.title || '')}</h3><p>${escapeHtml(item.text || '')}</p><div class="actions-row" style="justify-content:flex-start;"><a class="btn-secondary" href="${escapeHtml(item.ctaHref || '#')}">${escapeHtml(item.ctaText || 'Open')}</a></div></article>`).join('');
    return sectionWrap(section, idx, `<div class="grid stagger feature-grid-compact">${items}</div>`);
  }

  function renderManagedBlogSection(items) {
    if (!items?.length) return '';
    return `<section class="reveal section-compact managed-collection"><div class="section-header split-header"><div><div class="eyebrow">Latest Posts</div><h2 class="section-title">Blog cards from the hidden editor.</h2></div><p class="section-intro">These posts are created inside the admin content manager and support uploaded cover images.</p></div><div class="discover-grid stagger">${items.map((item, i) => `<article class="card discover-card reveal" data-category="${escapeHtml(String(item.category || 'article').toLowerCase())}" data-search="${escapeHtml(`${item.category || ''} ${item.title || ''} ${item.text || ''} ${item.meta1 || ''} ${item.meta2 || ''}`.toLowerCase())}" style="--i:${i}">${item.image ? `<img class="managed-cover" src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title || 'Article image')}">` : ''}<span class="discover-badge">${escapeHtml(item.category || 'Article')}</span><h2>${escapeHtml(item.title || '')}</h2><p>${escapeHtml(item.text || '')}</p><div class="meta-row"><span>${escapeHtml(item.meta1 || '')}</span><span>${escapeHtml(item.meta2 || '')}</span></div><a class="btn-secondary" href="#">${escapeHtml(item.ctaText || 'Read preview')}</a></article>`).join('')}</div></section>`;
  }
  function renderManagedAppSection(items) {
    if (!items?.length) return '';
    return `<section class="reveal section-compact managed-collection"><div class="section-header split-header"><div><div class="eyebrow">App Cards</div><h2 class="section-title">Release cards managed from admin.</h2></div><p class="section-intro">Use the app card creator to upload product artwork, set platform tags, and add CTA links.</p></div><div class="grid stagger managed-grid">${items.map((item, i) => `<article class="card managed-product-card reveal" style="--i:${i}">${item.image ? `<img class="managed-cover" src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title || 'App cover')}">` : ''}<div class="managed-meta-row"><span class="discover-badge">${escapeHtml(item.label || 'App')}</span><span class="meta-pill">${escapeHtml(item.status || 'Live')}</span></div><h3>${escapeHtml(item.title || '')}</h3><p>${escapeHtml(item.text || '')}</p><div class="meta-row"><span>${escapeHtml(item.platform || '')}</span><span>Mobile-ready</span></div><div class="actions-row" style="justify-content:flex-start;"><a class="btn-secondary" href="${escapeHtml(item.ctaHref || '#')}">${escapeHtml(item.ctaText || 'Open')}</a></div></article>`).join('')}</div></section>`;
  }
  function renderManagedGameSection(items) {
    if (!items?.length) return '';
    return `<section id="launch-cards" class="reveal section-compact managed-collection"><div class="section-header split-header"><div><div class="eyebrow">Game Cards</div><h2 class="section-title">Build tiles with artwork and release status.</h2></div><p class="section-intro">The game creator supports cover images, CTA links, and a progress bar for launch readiness.</p></div><div class="grid stagger managed-grid">${items.map((item, i) => { const value = Math.max(0, Math.min(100, Number(item.value || 0))); return `<article class="card managed-product-card distro-card reveal" style="--i:${i}">${item.image ? `<img class="managed-cover" src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title || 'Game cover')}">` : ''}<div class="managed-meta-row"><span class="discover-badge">${escapeHtml(item.label || 'Game')}</span><span class="meta-pill">${escapeHtml(item.status || 'Planned')}</span></div><h3>${escapeHtml(item.title || '')}</h3><p>${escapeHtml(item.text || '')}</p><div class="progress-row"><span>Readiness</span><strong>${value}%</strong></div><div class="progress-bar"><span style="width:${value}%"></span></div><div class="actions-row" style="justify-content:flex-start; margin-top:14px;"><a class="btn-secondary" href="${escapeHtml(item.ctaHref || '#')}">${escapeHtml(item.ctaText || 'Track release')}</a></div></article>`; }).join('')}</div></section>`;
  }

  function renderDynamicSections(cfg, pageKey) {
    const mount = document.querySelector('[data-dynamic-sections]');
    if (!mount) return;
    const page = cfg.pages[pageKey];
    const sectionsHtml = (page.sections || []).map((section, idx) => {
      switch (section.type) {
        case 'features': return renderFeatures(section, idx);
        case 'quicklinks': return renderQuicklinks(section, idx);
        case 'testimonials': return renderTestimonials(section, idx);
        case 'faq': return renderFaq(section, idx);
        case 'contact': return renderContact(section, idx);
        case 'cta': return renderCta(section, idx);
        case 'showcase': return renderShowcase(section, idx);
        case 'articles': return renderArticles(section, idx);
        case 'progress': return renderProgress(section, idx);
        case 'split': return renderSplit(section, idx);
        case 'stats': return renderStats(section, idx);
        case 'pricing': return renderPricing(section, idx);
        case 'gallery': return renderGallery(section, idx);
        case 'team': return renderTeam(section, idx);
        case 'roadmap': return renderRoadmap(section, idx);
        case 'download': return renderDownload(section, idx);
        default: return '';
      }
    }).join('');
    let collectionHtml = '';
    if (pageKey === 'blogs') collectionHtml = renderManagedBlogSection(cfg.collections.blogs);
    if (pageKey === 'apps') collectionHtml = renderManagedAppSection(cfg.collections.apps);
    if (pageKey === 'games') collectionHtml = renderManagedGameSection(cfg.collections.games);
    mount.innerHTML = sectionsHtml + collectionHtml;
  }

  function applyTheme(cfg) {
    const root = document.documentElement;
    root.style.setProperty('--accent', cfg.accentColor);
    root.style.setProperty('--accent-strong', cfg.accentStrong);
    root.style.setProperty('--bg', cfg.bgColor);
    root.style.setProperty('--bg-2', cfg.bgColor2);
    if (cfg.glassLevel === 'soft') {
      root.style.setProperty('--surface', 'rgba(255,255,255,0.68)');
      root.style.setProperty('--surface-strong', 'rgba(255,255,255,0.82)');
      root.style.setProperty('--surface-soft', 'rgba(255,255,255,0.45)');
    } else if (cfg.glassLevel === 'strong') {
      root.style.setProperty('--surface', 'rgba(255,255,255,0.86)');
      root.style.setProperty('--surface-strong', 'rgba(255,255,255,0.96)');
      root.style.setProperty('--surface-soft', 'rgba(255,255,255,0.64)');
    } else {
      root.style.setProperty('--surface', 'rgba(255,255,255,0.78)');
      root.style.setProperty('--surface-strong', 'rgba(255,255,255,0.92)');
      root.style.setProperty('--surface-soft', 'rgba(255,255,255,0.58)');
    }
  }

  const cfg = load();
  const pageKey = document.body.dataset.page || 'home';
  applyTheme(cfg);
  setText('brandName', cfg.brandName);
  const pageCfg = cfg.pages[pageKey] || defaults.pages.home;
  setPageText('heroEyebrow', pageCfg.hero.eyebrow);
  setPageText('heroTitle', pageCfg.hero.title);
  setPageText('heroAccent', pageCfg.hero.accent);
  setPageText('heroDescription', pageCfg.hero.description);
  renderDynamicSections(cfg, pageKey);
  window.__BABAL_SITE_CONFIG__ = { key, defaults, loadConfig: load };
})();
