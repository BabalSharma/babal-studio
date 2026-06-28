import { auth } from './firebase.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

const KEY = 'babalstudio-site-config-v4';
const LEGACY_KEY = 'babalstudio-site-config-v3';

const DEFAULTS = {
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
      hero: { eyebrow: 'Minimal digital studio', title: 'Calm design.', accent: 'Sharper presence.', description: 'A quieter, more premium homepage for design, websites, apps, and interactive launches with lighter structure and better breathing room.' },
      sections: []
    },
    blogs: {
      file: 'blogs.html',
      hero: { eyebrow: 'Studio Blog', title: 'Articles with a', accent: 'clean editorial rhythm.', description: 'Case notes, design process, website experiments, and studio updates presented in a premium reading layout.' },
      sections: []
    },
    apps: {
      file: 'apps.html',
      hero: { eyebrow: 'App Distribution', title: 'Mobile-ready launch pages', accent: 'for products and tools.', description: 'Designed for SaaS, AI tools, student utilities, and mobile products that need a clear rollout page with strong visual trust.' },
      sections: []
    },
    games: {
      file: 'games.html',
      hero: { eyebrow: 'Game Distribution', title: 'Launch pages for', accent: 'interactive releases.', description: 'Present game projects with platform readiness, release stages, store links, and update visibility in a more product-driven way.' },
      sections: []
    }
  }
};

function deepClone(v) { return JSON.parse(JSON.stringify(v)); }
function uid(prefix='id') { return `${prefix}-${Math.random().toString(36).slice(2, 8)}`; }

function mergeConfig(parsed) {
  const merged = deepClone(DEFAULTS);
  Object.assign(merged, parsed || {});
  merged.pages = { ...deepClone(DEFAULTS.pages), ...(parsed?.pages || {}) };
  for (const key of Object.keys(DEFAULTS.pages)) {
    merged.pages[key] = { ...deepClone(DEFAULTS.pages[key]), ...(merged.pages[key] || {}) };
    merged.pages[key].hero = { ...deepClone(DEFAULTS.pages[key].hero), ...((merged.pages[key] || {}).hero || {}) };
    if (!Array.isArray(merged.pages[key].sections)) merged.pages[key].sections = deepClone(DEFAULTS.pages[key].sections);
    merged.pages[key].sections = merged.pages[key].sections.map((section) => normalizeSection(section));
  }
  merged.collections = { ...deepClone(DEFAULTS.collections), ...(parsed?.collections || {}) };
  for (const key of Object.keys(DEFAULTS.collections)) {
    if (!Array.isArray(merged.collections[key])) merged.collections[key] = deepClone(DEFAULTS.collections[key]);
  }
  return merged;
}

function loadState() {
  try {
    const raw = localStorage.getItem(KEY) || localStorage.getItem(LEGACY_KEY);
    if (!raw) return seedDefaults();
    return mergeConfig(JSON.parse(raw));
  } catch {
    return seedDefaults();
  }
}

function saveState() {
  localStorage.setItem(KEY, JSON.stringify(state));
  localStorage.removeItem(LEGACY_KEY);
}

function seedDefaults() {
  const seeded = deepClone(DEFAULTS);
  seeded.pages.home.sections = [
    normalizeSection({ id: 'home-features', type: 'features', eyebrow: 'What changed', title: 'A more minimal front page with lighter depth.', intro: 'Cleaner rhythm, softer glass, and stronger breathing room across desktop and mobile.', items: [
      { label: 'Layout', title: 'Minimal homepage flow', text: 'Wider spacing, fewer interruptions, and calmer section rhythm for a stronger first impression.', ctaText: 'Explore', ctaHref: 'index.html' },
      { label: 'Admin', title: 'Hidden visual CMS', text: 'Edit sections, blog posts, app cards, and game cards without touching the source code.', ctaText: 'Open admin', ctaHref: 'admin.portal/adminlogin.html' },
      { label: 'Mobile', title: 'Better small-screen feel', text: 'More touch room, cleaner cards, and better readability on IIT mobile widths.', ctaText: 'See apps', ctaHref: 'apps.html' }
    ]}),
    normalizeSection({ id: 'home-stats', type: 'stats', eyebrow: 'Trust signals', title: 'Numbers make a solo studio feel real.', intro: 'Use simple proof blocks to reduce doubt and guide visitors toward action.', items: [
      { value: '24h', label: 'Fast reply window', text: 'Keep response expectations clear.' },
      { value: '4', label: 'Revenue paths', text: 'Services, apps, games, and content.' },
      { value: '100%', label: 'Mobile-first polish', text: 'Cleaner spacing for small screens.' }
    ]}),
    normalizeSection({ id: 'home-pricing', type: 'pricing', eyebrow: 'Offer blocks', title: 'Package the work so buying feels easier.', intro: 'Pricing cards help visitors understand what you do, who it is for, and what to do next.', items: [
      { name: 'Starter', price: '₹999+', tag: 'Lead magnet', text: 'Fast entry package for small clients and first trust.', features: '1 focused task
Quick delivery
Simple revisions', ctaText: 'Enquire', ctaHref: 'order.html' },
      { name: 'Growth', price: '₹4,999+', tag: 'Most useful', text: 'Balanced service block for design + landing page work.', features: 'Clear scope
Premium layout
CTA-focused structure', ctaText: 'Book now', ctaHref: 'order.html' },
      { name: 'Custom', price: 'Quote', tag: 'Higher value', text: 'For full web builds, app ideas, publishing support, and long-term work.', features: 'Discovery call
Custom roadmap
Priority handling', ctaText: 'Discuss project', ctaHref: 'index.html#contact' }
    ]}),
    normalizeSection({ id: 'home-roadmap', type: 'roadmap', eyebrow: 'Buyer path', title: 'Show how a project moves from inquiry to delivery.', intro: 'A roadmap lowers hesitation and helps clients understand your working process.', items: [
      { step: '01', title: 'Inquiry', text: 'Client sends brief, reference, or goal.' },
      { step: '02', title: 'Offer', text: 'You suggest the right package and timeline.' },
      { step: '03', title: 'Build', text: 'Design, review, refine, and prepare assets.' },
      { step: '04', title: 'Launch', text: 'Deliver files, pages, and next-step support.' }
    ]}),
    normalizeSection({ id: 'home-cta', type: 'cta', eyebrow: 'Start faster', title: 'Use the hidden builder to shape the whole site.', intro: 'The homepage, blog, app, and game layouts can now be managed from one private editor.', primaryText: 'Open Services', primaryHref: 'product.html', secondaryText: 'Open Blog', secondaryHref: 'blogs.html' }),
    normalizeSection({ id: 'home-contact', type: 'contact', eyebrow: 'Contact', title: 'Start with the fastest route.', intro: 'For design work, websites, and studio collaborations, use the cleanest channel for the job.', items: [
      { label: 'Email', title: 'babalsharma.studio@gmail.com', text: 'Best for briefs, attachments, references, and detailed project requests.', ctaText: 'Send Email', ctaHref: 'mailto:babalsharma.studio@gmail.com', icon: 'mail' },
      { label: 'WhatsApp', title: 'Quick project chat', text: 'Useful for short discussions, availability, and fast pricing questions.', ctaText: 'Open WhatsApp', ctaHref: 'https://wa.me/91XXXXXXXXXX', icon: 'whatsapp' }
    ]})
  ];
  seeded.pages.blogs.sections = [normalizeSection({ id: 'blog-cta', type: 'cta', eyebrow: 'Editorial system', title: 'New blog posts can now be created from admin.', intro: 'Use the content manager below the page builder to add cards with cover images and meta labels.', primaryText: 'Browse services', primaryHref: 'product.html', secondaryText: 'Go home', secondaryHref: 'index.html' }), normalizeSection({ id: 'blog-gallery', type: 'gallery', eyebrow: 'Visual editorials', title: 'Mix writing with covers, previews, and case snapshots.', intro: 'A gallery block helps make the blog page feel more alive and premium.', items: [ { image: 'images/project1.jpg', title: 'Case preview', text: 'Landing page study' }, { image: 'images/project2.jpg', title: 'System notes', text: 'Brand structure' }, { image: 'images/project3.jpg', title: 'UI audit', text: 'Mobile polish' } ] })];
  seeded.pages.apps.sections = [normalizeSection({ id: 'apps-showcase', type: 'showcase', eyebrow: 'App Launches', title: 'Product rollout cards with image support.', intro: 'Upload product cover images and manage app release cards from one hidden admin workspace.', badge: 'CMS ready', chips: ['Image upload', 'Card creator', 'Mobile layout'], primaryText: 'Open blog', primaryHref: 'blogs.html', secondaryText: 'Open games', secondaryHref: 'games.html', visual: 'phone' }), normalizeSection({ id: 'apps-download', type: 'download', eyebrow: 'Distribution', title: 'Place platform links in one clean block.', intro: 'Use download sections for app stores, APK links, docs, waitlists, and changelogs.', items: [ { platform: 'Google Play', title: 'Primary store listing', text: 'Best for social proof, reviews, and broad access.', ctaText: 'Add link', ctaHref: '#' }, { platform: 'APK / Beta', title: 'Direct tester rollout', text: 'Useful for fast private testing before store launch.', ctaText: 'Set link', ctaHref: '#' }, { platform: 'Docs', title: 'Guide or landing page', text: 'Explain features, onboarding, and pricing clearly.', ctaText: 'Open docs', ctaHref: '#' } ] })];
  seeded.pages.games.sections = [normalizeSection({ id: 'games-showcase', type: 'showcase', eyebrow: 'Game Launches', title: 'Interactive release cards with progress status.', intro: 'Add game tiles, artwork, links, and readiness values from admin without touching the code.', badge: 'Launch system', chips: ['Image upload', 'Progress status', 'CTA links'], primaryText: 'See builds', primaryHref: '#launch-cards', secondaryText: 'Open apps', secondaryHref: 'apps.html', visual: 'orbit' }), normalizeSection({ id: 'games-roadmap', type: 'roadmap', eyebrow: 'Release roadmap', title: 'Show players what comes next.', intro: 'Roadmaps help ongoing projects feel active and serious.', items: [ { step: 'Q1', title: 'Prototype', text: 'Core mechanic and visual direction.' }, { step: 'Q2', title: 'Demo', text: 'Public test build and feedback pass.' }, { step: 'Q3', title: 'Store prep', text: 'Artwork, trailer, screenshots, and launch page.' }, { step: 'Q4', title: 'Release', text: 'Version 1.0 with update plan.' } ] })];
  return seeded;
}

function normalizeSection(section) {
  const normalized = {
    id: section?.id || uid('section'),
    type: section?.type || 'features',
    eyebrow: section?.eyebrow || 'Section',
    title: section?.title || 'New section',
    intro: section?.intro || '',
    items: Array.isArray(section?.items) ? section.items : []
  };
  return { ...section, ...normalized };
}

function createSection(type) {
  const base = normalizeSection({ type, title: `New ${type} section`, eyebrow: type[0].toUpperCase() + type.slice(1) });
  switch (type) {
    case 'showcase': return { ...base, badge: 'Featured', chips: ['Fast', 'Clean', 'Mobile'], primaryText: 'Open', primaryHref: '#', secondaryText: 'Learn more', secondaryHref: '#', visual: 'glass', items: [] };
    case 'features': return { ...base, items: [{ label: 'Label', title: 'Card title', text: 'Card description', ctaText: 'Open', ctaHref: '#' }, { label: 'Label', title: 'Card title', text: 'Card description', ctaText: 'Open', ctaHref: '#' }] };
    case 'quicklinks': return { ...base, items: [{ label: 'Link', title: 'Quick destination', text: 'Short helper text', href: '#' }] };
    case 'articles': return { ...base, items: [{ category: 'Topic', title: 'Article title', text: 'Article summary', meta1: '5 min', meta2: 'Update', ctaText: 'Read preview', image: '' }] };
    case 'progress': return { ...base, items: [{ label: 'Build', title: 'Launch card', text: 'Progress description', value: 72 }] };
    case 'split': return { ...base, items: [{ label: 'Left', title: 'Left block', text: 'Support text', list: 'First point
Second point', ctaText: 'Open', ctaHref: '#' }, { label: 'Right', title: 'Right block', text: 'Support text', list: 'Another point
Another point', ctaText: 'Open', ctaHref: '#' }] };
    case 'testimonials': return { ...base, items: [{ quote: 'Short quote', name: 'Client name', role: 'Role or result' }] };
    case 'faq': return { ...base, items: [{ q: 'Question', a: 'Answer' }] };
    case 'contact': return { ...base, items: [{ label: 'Email', title: 'hello@example.com', text: 'Best for detailed briefs', ctaText: 'Open', ctaHref: 'mailto:hello@example.com', icon: 'mail' }] };
    case 'cta': return { ...base, primaryText: 'Open', primaryHref: '#', secondaryText: 'Secondary', secondaryHref: '#', items: [] };
    case 'stats': return { ...base, items: [{ value: '24h', label: 'Reply time', text: 'Expectation setting' }, { value: '3', label: 'Offers', text: 'Clear packages' }, { value: '100%', label: 'Mobile polish', text: 'Touch-first layout' }] };
    case 'pricing': return { ...base, items: [{ name: 'Starter', price: '₹999+', tag: 'Entry', text: 'Simple offer summary', features: 'Point one
Point two
Point three', ctaText: 'Choose', ctaHref: '#' }] };
    case 'gallery': return { ...base, items: [{ image: '', title: 'Visual card', text: 'Short caption' }, { image: '', title: 'Visual card', text: 'Short caption' }] };
    case 'team': return { ...base, items: [{ image: '', name: 'Member name', role: 'Role', text: 'Short bio or trust note' }] };
    case 'roadmap': return { ...base, items: [{ step: '01', title: 'Phase title', text: 'What happens here' }, { step: '02', title: 'Phase title', text: 'What happens here' }] };
    case 'download': return { ...base, items: [{ platform: 'Platform', title: 'Download block', text: 'Distribution note', ctaText: 'Open', ctaHref: '#' }] };
    default: return base;
  }
}

const state = loadState();
let currentPage = 'home';
let activeSectionId = null;
let currentManager = 'blogs';
let activeCollectionIndex = 0;

const $ = (id) => document.getElementById(id);
const els = {
  brandName: $('brandName'), accentColor: $('accentColor'), accentStrong: $('accentStrong'), bgColor: $('bgColor'), bgColor2: $('bgColor2'), glassLevel: $('glassLevel'),
  pageSelect: $('pageSelect'), pageFilePill: $('pageFilePill'), heroEyebrow: $('heroEyebrow'), heroTitle: $('heroTitle'), heroAccent: $('heroAccent'), heroDescription: $('heroDescription'),
  sectionList: $('sectionList'), newSectionType: $('newSectionType'), addSectionBtn: $('addSectionBtn'), sectionTypePill: $('sectionTypePill'), sectionForm: $('sectionForm'), itemEditorWrap: $('itemEditorWrap'),
  saveBtn: $('saveBtn'), previewBtn: $('previewBtn'), resetBtn: $('resetBtn'), previewFrame: $('previewFrame'), editorMessage: $('editorMessage'),
  collectionList: $('collectionList'), collectionForm: $('collectionForm'), addCollectionItemBtn: $('addCollectionItemBtn'), managerTitle: $('managerTitle')
};

function bindTheme() {
  ['brandName','accentColor','accentStrong','bgColor','bgColor2','glassLevel'].forEach((key) => {
    els[key].value = state[key];
    els[key].addEventListener('input', () => { state[key] = els[key].value; refreshPreviewSoft(); });
    els[key].addEventListener('change', () => { state[key] = els[key].value; refreshPreviewSoft(); });
  });
}

function pageConfig() { return state.pages[currentPage]; }

function bindPageSelector() {
  els.pageSelect.value = currentPage;
  els.pageSelect.addEventListener('change', () => {
    currentPage = els.pageSelect.value;
    activeSectionId = pageConfig().sections[0]?.id || null;
    renderPageEditor();
    refreshPreview();
  });
  ['heroEyebrow','heroTitle','heroAccent','heroDescription'].forEach((key) => {
    els[key].addEventListener('input', () => {
      const map = { heroEyebrow:'eyebrow', heroTitle:'title', heroAccent:'accent', heroDescription:'description' };
      pageConfig().hero[map[key]] = els[key].value;
      refreshPreviewSoft();
    });
  });
}

function renderPageEditor() {
  const page = pageConfig();
  els.pageFilePill.textContent = page.file;
  els.heroEyebrow.value = page.hero.eyebrow;
  els.heroTitle.value = page.hero.title;
  els.heroAccent.value = page.hero.accent;
  els.heroDescription.value = page.hero.description;
  if (!activeSectionId && page.sections[0]) activeSectionId = page.sections[0].id;
  renderSectionList();
  renderSectionEditor();
}

function renderSectionList() {
  const sections = pageConfig().sections;
  els.sectionList.innerHTML = sections.map((section, idx) => `
    <div class="section-item ${section.id === activeSectionId ? 'active' : ''}" data-section-id="${section.id}">
      <div class="row" style="justify-content:space-between;align-items:center;">
        <div><strong>${escapeHtml(section.title)}</strong><div class="muted" style="font-size:13px;">${escapeHtml(section.type)} • ${idx + 1}</div></div>
        <div class="inline-actions">
          <button type="button" class="small-btn" data-action="up" data-id="${section.id}">↑</button>
          <button type="button" class="small-btn" data-action="down" data-id="${section.id}">↓</button>
          <button type="button" class="small-btn" data-action="delete" data-id="${section.id}">Delete</button>
        </div>
      </div>
    </div>`).join('') || '<div class="note">No sections yet. Add one above.</div>';

  els.sectionList.querySelectorAll('.section-item').forEach((card) => {
    card.addEventListener('click', (event) => {
      const button = event.target.closest('button');
      const id = card.dataset.sectionId;
      if (!button) {
        activeSectionId = id;
        renderSectionList();
        renderSectionEditor();
        return;
      }
      event.stopPropagation();
      mutateSection(button.dataset.action, id);
    });
  });
}

function mutateSection(action, id) {
  const sections = pageConfig().sections;
  const index = sections.findIndex((section) => section.id === id);
  if (index < 0) return;
  if (action === 'delete') {
    sections.splice(index, 1);
    activeSectionId = sections[Math.max(0, index - 1)]?.id || null;
  }
  if (action === 'up' && index > 0) [sections[index - 1], sections[index]] = [sections[index], sections[index - 1]];
  if (action === 'down' && index < sections.length - 1) [sections[index + 1], sections[index]] = [sections[index], sections[index + 1]];
  renderSectionList();
  renderSectionEditor();
  refreshPreviewSoft();
}

function activeSection() { return pageConfig().sections.find((section) => section.id === activeSectionId) || null; }

function renderSectionEditor() {
  const section = activeSection();
  els.sectionForm.innerHTML = '';
  els.itemEditorWrap.innerHTML = '';
  els.sectionTypePill.textContent = section ? section.type : 'No section selected';
  if (!section) return;

  const fields = [
    ['eyebrow', 'Eyebrow'],
    ['title', 'Title'],
    ['intro', 'Intro']
  ];
  if (section.type === 'showcase') fields.push(['badge', 'Badge'], ['chips', 'Chips (comma separated)'], ['primaryText', 'Primary button'], ['primaryHref', 'Primary link'], ['secondaryText', 'Secondary button'], ['secondaryHref', 'Secondary link'], ['visual', 'Visual (glass / phone / orbit)']);
  if (section.type === 'cta') fields.push(['primaryText', 'Primary button'], ['primaryHref', 'Primary link'], ['secondaryText', 'Secondary button'], ['secondaryHref', 'Secondary link']);

  els.sectionForm.innerHTML = fields.map(([key, label]) => {
    const value = key === 'chips' ? (section.chips || []).join(', ') : (section[key] || '');
    if (key === 'intro') {
      return `<label>${label}<textarea rows="3" data-field="${key}">${escapeHtml(value)}</textarea></label>`;
    }
    return `<label>${label}<input type="text" data-field="${key}" value="${escapeHtml(value)}"></label>`;
  }).join('');

  els.sectionForm.querySelectorAll('[data-field]').forEach((field) => {
    field.addEventListener('input', () => {
      const key = field.dataset.field;
      if (key === 'chips') section.chips = field.value.split(',').map((v) => v.trim()).filter(Boolean);
      else section[key] = field.value;
      if (key === 'title') renderSectionList();
      refreshPreviewSoft();
    });
  });

  if (!Array.isArray(section.items)) return;
  renderSectionItems(section);
}

function inferFields(sectionType) {
  const maps = {
    features: [['label','Label'],['title','Title'],['text','Text'],['ctaText','Button'],['ctaHref','Link']],
    quicklinks: [['label','Label'],['title','Title'],['text','Text'],['href','Link']],
    testimonials: [['quote','Quote'],['name','Name'],['role','Role']],
    faq: [['q','Question'],['a','Answer']],
    contact: [['label','Label'],['title','Title'],['text','Text'],['ctaText','Button'],['ctaHref','Link'],['secondaryText','Secondary button'],['secondaryHref','Secondary link'],['icon','Icon (mail / whatsapp / none)']],
    articles: [['category','Category'],['title','Title'],['text','Summary'],['meta1','Meta 1'],['meta2','Meta 2'],['ctaText','Button'],['image','Image URL or data URL']],
    progress: [['label','Label'],['title','Title'],['text','Text'],['value','Progress value (0-100)']],
    split: [['label','Label'],['title','Title'],['text','Text'],['list','List lines'],['ctaText','Button'],['ctaHref','Link']],
    stats: [['value','Value'],['label','Label'],['text','Text']],
    pricing: [['name','Plan name'],['price','Price'],['tag','Tag'],['text','Summary'],['features','Feature lines'],['ctaText','Button'],['ctaHref','Link']],
    gallery: [['image','Image URL or data URL'],['title','Title'],['text','Caption']],
    team: [['image','Image URL or data URL'],['name','Name'],['role','Role'],['text','Bio']],
    roadmap: [['step','Step'],['title','Title'],['text','Text']],
    download: [['platform','Platform'],['title','Title'],['text','Text'],['ctaText','Button'],['ctaHref','Link']]
  };
  return maps[sectionType] || [];
}

function renderSectionItems(section) {
  const listHtml = `<div class="row" style="justify-content:space-between;align-items:center;"><h4 style="margin:0;">Section items</h4><button type="button" class="small-btn" id="addSectionItemBtn">Add item</button></div>` +
    `<div class="item-list">${section.items.map((item, idx) => `
      <div class="item-card">
        <div class="row" style="justify-content:space-between;align-items:center;">
          <div><strong>${escapeHtml(item.title || item.label || item.q || item.name || `Item ${idx + 1}`)}</strong><div class="muted" style="font-size:13px;">${escapeHtml(item.text || item.quote || item.a || '').slice(0, 64)}</div></div>
          <div class="inline-actions">
            <button type="button" class="small-btn" data-item-action="up" data-item-index="${idx}">↑</button>
            <button type="button" class="small-btn" data-item-action="down" data-item-index="${idx}">↓</button>
            <button type="button" class="small-btn" data-item-action="delete" data-item-index="${idx}">Delete</button>
          </div>
        </div>
        <div class="stack" style="margin-top:12px;">${inferFields(section.type).map(([key, label]) => {
          const value = item[key] ?? '';
          const multiline = ['text','a','quote','list'].includes(key);
          return multiline
            ? `<label>${label}<textarea rows="2" data-item-index="${idx}" data-item-field="${key}">${escapeHtml(String(value))}</textarea></label>`
            : `<label>${label}<input type="text" data-item-index="${idx}" data-item-field="${key}" value="${escapeHtml(String(value))}"></label>`;
        }).join('')}</div>
      </div>`).join('')}</div>`;
  els.itemEditorWrap.innerHTML = listHtml;
  $('addSectionItemBtn')?.addEventListener('click', () => {
    const templateFields = Object.fromEntries(inferFields(section.type).map(([key]) => [key, '']));
    if (templateFields.value !== undefined) templateFields.value = 50;
    section.items.push(templateFields);
    renderSectionItems(section);
    refreshPreviewSoft();
  });
  els.itemEditorWrap.querySelectorAll('[data-item-field]').forEach((field) => {
    field.addEventListener('input', () => {
      const idx = Number(field.dataset.itemIndex);
      const key = field.dataset.itemField;
      section.items[idx][key] = key === 'value' ? Number(field.value || 0) : field.value;
      refreshPreviewSoft();
    });
  });
  els.itemEditorWrap.querySelectorAll('[data-item-action]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.itemIndex);
      if (btn.dataset.itemAction === 'delete') section.items.splice(idx, 1);
      if (btn.dataset.itemAction === 'up' && idx > 0) [section.items[idx - 1], section.items[idx]] = [section.items[idx], section.items[idx - 1]];
      if (btn.dataset.itemAction === 'down' && idx < section.items.length - 1) [section.items[idx + 1], section.items[idx]] = [section.items[idx], section.items[idx + 1]];
      renderSectionItems(section);
      refreshPreviewSoft();
    });
  });
}

els.addSectionBtn.addEventListener('click', () => {
  const section = createSection(els.newSectionType.value);
  pageConfig().sections.push(section);
  activeSectionId = section.id;
  renderSectionList();
  renderSectionEditor();
  refreshPreviewSoft();
});

function renderManagerTabs() {
  document.querySelectorAll('.manager-tab').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.manager === currentManager);
    btn.addEventListener('click', () => {
      currentManager = btn.dataset.manager;
      activeCollectionIndex = 0;
      renderCollectionManager();
      refreshPreview();
    });
  });
}

function collectionItems() { return state.collections[currentManager]; }

function renderCollectionManager() {
  const titleMap = { blogs: 'Blog posts', apps: 'App cards', games: 'Game cards' };
  els.managerTitle.textContent = titleMap[currentManager];
  const items = collectionItems();
  if (activeCollectionIndex > items.length - 1) activeCollectionIndex = Math.max(0, items.length - 1);

  els.collectionList.innerHTML = items.map((item, idx) => `
    <div class="collection-card ${idx === activeCollectionIndex ? 'active' : ''}" data-index="${idx}">
      ${item.image ? `<img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title || 'Preview')}">` : '<div class="thumb-preview" style="display:grid;place-items:center;min-height:140px;">No image</div>'}
      <h4>${escapeHtml(item.title || `Item ${idx + 1}`)}</h4>
      <p>${escapeHtml(item.text || item.status || item.category || '')}</p>
      <div class="inline-actions" style="margin-top:12px;">
        <button type="button" class="small-btn" data-caction="up" data-cindex="${idx}">↑</button>
        <button type="button" class="small-btn" data-caction="down" data-cindex="${idx}">↓</button>
        <button type="button" class="small-btn" data-caction="delete" data-cindex="${idx}">Delete</button>
      </div>
    </div>`).join('') || '<div class="note">No items yet. Add one above.</div>';

  els.collectionList.querySelectorAll('.collection-card').forEach((card) => {
    card.addEventListener('click', (event) => {
      const button = event.target.closest('button');
      const idx = Number(card.dataset.index);
      if (!button) {
        activeCollectionIndex = idx;
        renderCollectionManager();
        return;
      }
      event.stopPropagation();
      mutateCollection(button.dataset.caction, idx);
    });
  });

  renderCollectionForm();
}

function mutateCollection(action, idx) {
  const items = collectionItems();
  if (action === 'delete') items.splice(idx, 1);
  if (action === 'up' && idx > 0) [items[idx - 1], items[idx]] = [items[idx], items[idx - 1]];
  if (action === 'down' && idx < items.length - 1) [items[idx + 1], items[idx]] = [items[idx], items[idx + 1]];
  activeCollectionIndex = Math.max(0, Math.min(activeCollectionIndex, items.length - 1));
  renderCollectionManager();
  refreshPreviewSoft();
}

function collectionTemplate(type) {
  if (type === 'blogs') return { category: 'Topic', title: 'New post title', text: 'Short article summary', meta1: '5 min read', meta2: 'New', ctaText: 'Read preview', image: '' };
  if (type === 'apps') return { label: 'App', title: 'New app card', text: 'Product summary', status: 'Beta', platform: 'Web', ctaText: 'Open', ctaHref: '#', image: '' };
  return { label: 'Game', title: 'New game card', text: 'Release summary', status: 'In progress', value: 65, ctaText: 'Track release', ctaHref: '#', image: '' };
}

els.addCollectionItemBtn.addEventListener('click', () => {
  collectionItems().push(collectionTemplate(currentManager));
  activeCollectionIndex = collectionItems().length - 1;
  renderCollectionManager();
  refreshPreviewSoft();
});

function renderCollectionForm() {
  const item = collectionItems()[activeCollectionIndex];
  if (!item) { els.collectionForm.innerHTML = '<div class="note">Select or create an item to edit it.</div>'; return; }
  const fieldsByManager = {
    blogs: [['category','Category'],['title','Title'],['text','Summary', true],['meta1','Meta 1'],['meta2','Meta 2'],['ctaText','Button text'],['image','Image URL or uploaded data']],
    apps: [['label','Label'],['title','Title'],['text','Summary', true],['status','Status'],['platform','Platform'],['ctaText','Button text'],['ctaHref','Button link'],['image','Image URL or uploaded data']],
    games: [['label','Label'],['title','Title'],['text','Summary', true],['status','Status'],['value','Readiness (0-100)'],['ctaText','Button text'],['ctaHref','Button link'],['image','Image URL or uploaded data']]
  };
  const fields = fieldsByManager[currentManager];
  els.collectionForm.innerHTML = fields.map(([key, label, multiline]) => multiline
    ? `<label>${label}<textarea rows="3" data-collection-field="${key}">${escapeHtml(String(item[key] ?? ''))}</textarea></label>`
    : `<label>${label}<input type="text" data-collection-field="${key}" value="${escapeHtml(String(item[key] ?? ''))}"></label>`).join('') +
    `<label>Upload image<input type="file" id="collectionImageUpload" accept="image/*"></label>
     <div class="upload-note">Upload stores a local preview in this browser so you can manage the site visually without editing code.</div>
     ${item.image ? `<img class="thumb-preview" src="${escapeHtml(item.image)}" alt="Preview">` : ''}`;

  els.collectionForm.querySelectorAll('[data-collection-field]').forEach((field) => {
    field.addEventListener('input', () => {
      const key = field.dataset.collectionField;
      item[key] = key === 'value' ? Number(field.value || 0) : field.value;
      renderCollectionManager();
      refreshPreviewSoft();
    });
  });

  $('collectionImageUpload')?.addEventListener('change', async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    item.image = await fileToDataUrl(file);
    renderCollectionManager();
    refreshPreviewSoft();
  });
}

async function fileToDataUrl(file) {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>'"]/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
}

function refreshPreviewSoft() { window.clearTimeout(refreshPreviewSoft.timer); refreshPreviewSoft.timer = window.setTimeout(refreshPreview, 180); }
function refreshPreview() {
  try { saveState(); } catch {}
  const file = pageConfig().file;
  els.previewFrame.src = `../${file}?preview=${Date.now()}`;
  els.editorMessage.textContent = `Updated ${file}. Changes are stored locally in this browser.`;
}

els.saveBtn.addEventListener('click', () => { saveState(); refreshPreview(); els.editorMessage.textContent = 'Saved. Builder sections, pricing blocks, galleries, roadmaps, downloads, blog posts, app cards, and game cards are ready in local storage.'; });
els.previewBtn.addEventListener('click', refreshPreview);
els.resetBtn.addEventListener('click', () => {
  const fresh = seedDefaults();
  Object.keys(state).forEach((key) => delete state[key]);
  Object.assign(state, fresh);
  currentPage = 'home';
  activeSectionId = state.pages.home.sections[0]?.id || null;
  currentManager = 'blogs';
  activeCollectionIndex = 0;
  bindTheme();
  renderManagerTabs();
  renderPageEditor();
  renderCollectionManager();
  refreshPreview();
});

function init() {
  bindTheme();
  bindPageSelector();
  activeSectionId = pageConfig().sections[0]?.id || null;
  renderPageEditor();
  renderManagerTabs();
  renderCollectionManager();
  refreshPreview();
}

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.replace('adminlogin.html');
    return;
  }
  init();
});
