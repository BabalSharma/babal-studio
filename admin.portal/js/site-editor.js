import { auth } from './firebase.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

const KEY = 'babalstudio-site-config-v5';
const LEGACY_KEY = 'babalstudio-site-config-v4';

const DEFAULTS = {
  brandName: 'Babal Studio',
  accentColor: '#0071e3',
  accentStrong: '#0055b8',
  bgColor: '#f5f5f7',
  bgColor2: '#ffffff',
  glassLevel: 'medium',
  collections: {
    blogs: [
      { category: 'Build Log', title: 'How I published my first GitHub Pages site', text: 'A simple note on turning a local HTML project into a live website without paid hosting.', meta1: '4 min read', meta2: 'GitHub Pages', ctaText: 'Read preview', image: '' },
      { category: 'Fix Log', title: 'What I learned fixing AdSense verification', text: 'A real setup note about ads.txt, script placement, and waiting for Google to verify the live page.', meta1: '5 min read', meta2: 'AdSense', ctaText: 'Read preview', image: '' }
    ],
    apps: [
      { label: 'Student Tool', title: 'Study Planner Idea', text: 'A simple student dashboard idea for tasks, focus sessions, and weekly study tracking.', status: 'Idea', platform: 'Web', ctaText: 'Follow progress', ctaHref: 'blogs.html', image: '' },
      { label: 'Website Tool', title: 'PostPilot Experiment', text: 'A small experiment for writing, scheduling, and publishing simple blog updates from an admin page.', status: 'Prototype', platform: 'Web', ctaText: 'See notes', ctaHref: 'blogs.html', image: '' }
    ],
    games: [
      { label: 'Prototype', title: 'Scratch Warrior Game', text: 'A small learning project focused on movement, scoring, health, and simple game logic.', status: 'Learning build', value: 60, ctaText: 'Track progress', ctaHref: '#launch-cards', image: '' },
      { label: 'Idea', title: 'Mini Web Game', text: 'A future browser game idea for practicing JavaScript, animation, and simple UI polish.', status: 'Planned', value: 25, ctaText: 'Follow updates', ctaHref: 'blogs.html', image: '' }
    ]
  },
  pages: {
    home: {
      file: 'index.html',
      hero: { eyebrow: 'Simple websites for real people', title: 'Clear websites.', accent: 'Honest digital work.', description: 'I build simple websites, landing pages, and small digital pages for students, creators, shops, and local businesses.' },
      sections: []
    },
    blogs: {
      file: 'blogs.html',
      hero: { eyebrow: 'Build Log', title: 'Notes from', accent: 'building in public.', description: 'Short updates about websites, Linux setup, student projects, and what I learn while building.' },
      sections: []
    },
    apps: {
      file: 'apps.html',
      hero: { eyebrow: 'App Experiments', title: 'Small tools', accent: 'built while learning.', description: 'A place for simple app ideas, prototypes, and student tools as they grow step by step.' },
      sections: []
    },
    games: {
      file: 'games.html',
      hero: { eyebrow: 'Game Experiments', title: 'Small games', accent: 'and learning builds.', description: 'A simple page for game ideas, prototypes, progress updates, and future playable demos.' },
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
    normalizeSection({ id: 'home-features', type: 'features', eyebrow: 'What changed', title: 'A simple front page with clear sections.', intro: 'The page explains what I build, how projects work, and how to contact me.', items: [
      { label: 'Layout', title: 'Simple homepage flow', text: 'Clear headline, services, pricing, process, and contact section without extra confusion.', ctaText: 'Explore', ctaHref: 'index.html' },
      { label: 'Admin', title: 'Editable website sections', text: 'The site has an admin area for managing sections, posts, and small project cards.', ctaText: 'Open admin', ctaHref: 'admin.portal/adminlogin.html' },
      { label: 'Mobile', title: 'Mobile-first layout', text: 'Pages are designed to stay readable on phones, tablets, and small laptop screens.', ctaText: 'See apps', ctaHref: 'apps.html' }
    ]}),
    normalizeSection({ id: 'home-stats', type: 'stats', eyebrow: 'Trust signals', title: 'Simple signals before you message me.', intro: 'No fake claims. Just clear expectations and a simple working process.', items: [
      { value: '24h', label: 'Reply window', text: 'I try to reply within one day when available.' },
      { value: '3', label: 'Main services', text: 'Websites, portfolios, and landing pages.' },
      { value: '1', label: 'Clear first version', text: 'You see a working draft before final polish.' }
    ]}),
    normalizeSection({ id: 'home-pricing', type: 'pricing', eyebrow: 'Offer blocks', title: 'Start small, then improve.', intro: 'These are starting points. Final price depends on pages, content, and deadline.', items: [
      { name: 'Starter', price: '₹999+', tag: 'Lead magnet', text: 'Fast entry package for small clients and first trust.', features: '1 focused task
Quick delivery
Simple revisions', ctaText: 'Enquire', ctaHref: 'order.html' },
      { name: 'Growth', price: '₹4,999+', tag: 'Most useful', text: 'Balanced service block for design + landing page work.', features: 'Clear scope
Clean layout
CTA-focused structure', ctaText: 'Book now', ctaHref: 'order.html' },
      { name: 'Custom', price: 'Quote', tag: 'Higher value', text: 'For full web builds, app ideas, publishing support, and long-term work.', features: 'Discovery call
Custom roadmap
Priority handling', ctaText: 'Discuss project', ctaHref: 'index.html#contact' }
    ]}),
    normalizeSection({ id: 'home-roadmap', type: 'roadmap', eyebrow: 'Buyer path', title: 'How a project moves from idea to launch.', intro: 'Simple steps make the work easier to understand before we begin.', items: [
      { step: '01', title: 'Message', text: 'You send the website idea, reference, or goal.' },
      { step: '02', title: 'Plan', text: 'I suggest a simple scope, price, and timeline.' },
      { step: '03', title: 'Build', text: 'I create the first version and share progress.' },
      { step: '04', title: 'Launch', text: 'We fix final details and publish the website.' }
    ]}),
    normalizeSection({ id: 'home-cta', type: 'cta', eyebrow: 'Start faster', title: 'Need a simple website?', intro: 'Send a short brief. I will reply with a clear plan instead of confusing promises.', primaryText: 'Open Services', primaryHref: 'product.html', secondaryText: 'Open Blog', secondaryHref: 'blogs.html' }),
    normalizeSection({ id: 'home-contact', type: 'contact', eyebrow: 'Contact', title: 'Start with a short message.', intro: 'Share what you need, your deadline, and any example links you like.', items: [
      { label: 'Email', title: 'babalsharma.studio@gmail.com', text: 'Best for proper briefs, attachments, references, and project details.', ctaText: 'Send Email', ctaHref: 'mailto:babalsharma.studio@gmail.com', icon: 'mail' },
      { label: 'Instagram', title: '@babalsharma.studio', text: 'Good for quick updates, screenshots, and simple project conversations.', ctaText: 'Open Instagram', ctaHref: 'https://www.instagram.com/babalsharma.studio/', icon: 'instagram' }
    ]})
  ];
  seeded.pages.blogs.sections = [normalizeSection({ id: 'blog-cta', type: 'cta', eyebrow: 'Editorial system', title: 'I write short notes from real setup work.', intro: 'These posts are simple build logs, fixes, and lessons from making websites and Linux setups.', primaryText: 'Browse services', primaryHref: 'product.html', secondaryText: 'Go home', secondaryHref: 'index.html' }), normalizeSection({ id: 'blog-gallery', type: 'gallery', eyebrow: 'Visual editorials', title: 'Small case notes and screenshots.', intro: 'Use this section for real screenshots, before-after changes, and project notes.', items: [ { image: 'images/project1.jpg', title: 'Case preview', text: 'Landing page study' }, { image: 'images/project2.jpg', title: 'System notes', text: 'Brand structure' }, { image: 'images/project3.jpg', title: 'UI audit', text: 'Mobile polish' } ] })];
  seeded.pages.apps.sections = [normalizeSection({ id: 'apps-showcase', type: 'showcase', eyebrow: 'App Launches', title: 'Small tool cards and experiments.', intro: 'Use this page to show simple tools, prototypes, and ideas without pretending they are finished.', badge: 'CMS ready', chips: ['Image upload', 'Card creator', 'Mobile layout'], primaryText: 'Open blog', primaryHref: 'blogs.html', secondaryText: 'Open games', secondaryHref: 'games.html', visual: 'phone' }), normalizeSection({ id: 'apps-download', type: 'download', eyebrow: 'Distribution', title: 'Keep useful links in one place.', intro: 'When a tool is ready, add the demo, docs, or download link here.', items: [ { platform: 'Google Play', title: 'Future store listing', text: 'Add this only when the app is ready for public release.', ctaText: 'Add link', ctaHref: '#' }, { platform: 'APK / Beta', title: 'Direct tester rollout', text: 'Useful for fast private testing before store launch.', ctaText: 'Set link', ctaHref: '#' }, { platform: 'Docs', title: 'Guide or landing page', text: 'Explain features, onboarding, and pricing clearly.', ctaText: 'Open docs', ctaHref: '#' } ] })];
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
