const searchInput = document.getElementById('discoverSearch');
const discoverFilter = document.getElementById('discoverFilter');
const discoverCards = Array.from(document.querySelectorAll('[data-category][data-search]'));

function filterDiscoverCards() {
  if (!discoverCards.length) return;
  const query = (searchInput?.value || '').trim().toLowerCase();
  const category = discoverFilter?.value || 'all';

  discoverCards.forEach((card) => {
    const matchesCategory = category === 'all' || card.dataset.category === category;
    const matchesSearch = !query || card.dataset.search.includes(query) || card.textContent.toLowerCase().includes(query);
    const visible = matchesCategory && matchesSearch;
    card.style.display = visible ? '' : 'none';
  });
}

searchInput?.addEventListener('input', filterDiscoverCards);
discoverFilter?.addEventListener('change', filterDiscoverCards);
filterDiscoverCards();
