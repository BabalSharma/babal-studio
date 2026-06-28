import { db } from './firebase-config.js';
import { collection, getDocs } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const grid = document.getElementById('servicesGrid');
const categoryFilter = document.getElementById('categoryFilter');
const sortPrice = document.getElementById('sortPrice');
let servicesList = [];

function formatCurrency(value) {
  return value ? `₹${Number(value).toLocaleString('en-IN')}` : 'Contact';
}

function renderServices(list) {
  if (!grid) return;
  if (!list.length) {
    grid.innerHTML = '<article class="card is-visible"><h3>No services found</h3><p>Try another filter or add services in the admin dashboard.</p></article>';
    return;
  }

  grid.innerHTML = list.map((service, index) => {
    const oldPrice = Number(service.oldPrice) || 0;
    const offerPrice = Number(service.offerPrice) || 0;
    const discount = oldPrice > offerPrice && oldPrice > 0 ? Math.round(((oldPrice - offerPrice) / oldPrice) * 100) : 0;
    return `
      <article class="card reveal is-visible" style="--i:${index % 3}">
        ${service.imageUrl ? `<img src="${service.imageUrl}" alt="${service.name}" loading="lazy" decoding="async">` : ''}
        <small>${service.category || 'Service'}</small>
        <h3>${service.name || 'Untitled service'}</h3>
        <p>${service.description || 'No description available.'}</p>
        <div class="pricing-row">
          ${oldPrice ? `<span class="old-price">${formatCurrency(oldPrice)}</span>` : ''}
          <span class="new-price">${formatCurrency(offerPrice)}</span>
          ${discount ? `<span class="discount-badge">${discount}% OFF</span>` : ''}
        </div>
        <div class="actions-row" style="justify-content:flex-start; margin-top:18px;">
          <a class="btn" href="order.html?service=${encodeURIComponent(service.name || '')}">Order now</a>
        </div>
      </article>`;
  }).join('');
}

function populateCategories() {
  if (!categoryFilter) return;
  const categories = [...new Set(servicesList.map((service) => service.category).filter(Boolean))];
  categoryFilter.innerHTML = '<option value="all">All Categories</option>' + categories.map((category) => `<option value="${category}">${category}</option>`).join('');
}

function applyFilters() {
  let filtered = [...servicesList];
  if (categoryFilter?.value && categoryFilter.value !== 'all') {
    filtered = filtered.filter((service) => service.category === categoryFilter.value);
  }
  if (sortPrice?.value === 'low') filtered.sort((a, b) => (a.offerPrice || 0) - (b.offerPrice || 0));
  if (sortPrice?.value === 'high') filtered.sort((a, b) => (b.offerPrice || 0) - (a.offerPrice || 0));
  renderServices(filtered);
}

async function fetchServices() {
  try {
    const snapshot = await getDocs(collection(db, 'services'));
    servicesList = snapshot.docs.map((entry) => ({ id: entry.id, ...entry.data() })).filter((service) => ['active','published'].includes(String(service.status || 'active').toLowerCase()));
    populateCategories();
    applyFilters();
  } catch (error) {
    console.error(error);
    if (grid) grid.innerHTML = `<article class="card is-visible"><h3>Catalog unavailable</h3><p>${error.message}</p></article>`;
  }
}

categoryFilter?.addEventListener('change', applyFilters);
sortPrice?.addEventListener('change', applyFilters);
fetchServices();
