import { auth, db } from './firebase-config.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { addDoc, collection, doc, getDoc, getDocs, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const serviceSelect = document.getElementById('serviceSelect');
const rushCheckbox = document.getElementById('rushDelivery');
const couponCodeInput = document.getElementById('couponCode');
const couponMessage = document.getElementById('couponMessage');
const payBtn = document.getElementById('payBtn');
const successMessage = document.getElementById('successMessage');
const oldPriceEl = document.getElementById('oldPrice');
const offerPriceEl = document.getElementById('offerPrice');
const discountBadgeEl = document.getElementById('discountBadge');
const discountInput = document.getElementById('discount');
const priceAfterDiscountInput = document.getElementById('priceAfterDiscount');
const advanceInput = document.getElementById('advance');
const deliveryInput = document.getElementById('delivery');
const summaryService = document.getElementById('summaryService');
const summaryTotal = document.getElementById('summaryTotal');
const summaryAdvance = document.getElementById('summaryAdvance');
const summaryDelivery = document.getElementById('summaryDelivery');
const applyCouponBtn = document.getElementById('applyCouponBtn');

const coupons = { WELCOME10: 10, STUDIO15: 15 };
let servicesList = [];
let currentUser = null;
let currentClientProfile = null;

function formatCurrency(value) {
  return value ? `₹${Number(value).toLocaleString('en-IN')}` : '—';
}

function updateSummary(serviceName = '—', total = 0, advance = 0, delivery = '—') {
  if (summaryService) summaryService.textContent = serviceName;
  if (summaryTotal) summaryTotal.textContent = formatCurrency(total);
  if (summaryAdvance) summaryAdvance.textContent = formatCurrency(advance);
  if (summaryDelivery) summaryDelivery.textContent = typeof delivery === 'number' ? `${delivery} hour(s)` : delivery;
}

function populateFormProfile() {
  if (!currentUser) return;
  const nameField = document.getElementById('name');
  const emailField = document.getElementById('email');
  const phoneField = document.getElementById('phone');
  if (nameField && !nameField.value) nameField.value = currentClientProfile?.name || currentUser.displayName || '';
  if (emailField && !emailField.value) emailField.value = currentClientProfile?.email || currentUser.email || '';
  if (phoneField && !phoneField.value) phoneField.value = currentClientProfile?.phone || '';
}

function populateServiceSelect() {
  if (!serviceSelect) return;
  serviceSelect.innerHTML = '<option value="">-- Choose a Service --</option>' + servicesList.map((service) => `<option value="${service.id}">${service.name}</option>`).join('');
  const selectedName = new URLSearchParams(window.location.search).get('service');
  if (selectedName) {
    const found = servicesList.find((service) => service.name === selectedName);
    if (found) serviceSelect.value = found.id;
  }
  updatePrice();
}

function getSelectedService() {
  return servicesList.find((service) => service.id === serviceSelect?.value) || null;
}

function computePricing() {
  const selected = getSelectedService();
  if (!selected) return null;

  const baseOfferPrice = Number(selected.offerPrice) || 0;
  const baseOldPrice = Number(selected.oldPrice) || 0;
  const advancePercent = Number(selected.advancePercent) || 50;
  let finalPrice = baseOfferPrice;
  let deliveryHours = Number(selected.deliveryHours) || 24;

  if (rushCheckbox?.checked && finalPrice > 0) {
    finalPrice = Math.ceil(finalPrice * 1.3);
    deliveryHours = Math.max(1, deliveryHours - 1);
  }

  const code = couponCodeInput?.value.trim().toUpperCase();
  const couponPercent = coupons[code] || 0;
  if (couponPercent) finalPrice = Math.ceil(finalPrice * (1 - couponPercent / 100));

  const referencePrice = baseOldPrice > 0 ? baseOldPrice : baseOfferPrice;
  const totalDiscount = referencePrice > 0 ? Math.max(0, Math.round(((referencePrice - finalPrice) / referencePrice) * 100)) : 0;
  const advanceAmount = Math.ceil(finalPrice * advancePercent / 100);

  return { selected, finalPrice, advanceAmount, deliveryHours, totalDiscount, baseOldPrice, couponPercent, couponCode: code };
}

function updatePrice() {
  const pricing = computePricing();
  if (!pricing) {
    updateSummary();
    return;
  }
  const { selected, finalPrice, advanceAmount, deliveryHours, totalDiscount, baseOldPrice } = pricing;
  if (oldPriceEl) {
    oldPriceEl.textContent = baseOldPrice ? formatCurrency(baseOldPrice) : '';
    oldPriceEl.style.display = baseOldPrice ? 'inline-flex' : 'none';
  }
  if (offerPriceEl) offerPriceEl.textContent = formatCurrency(finalPrice);
  if (discountBadgeEl) {
    discountBadgeEl.textContent = totalDiscount ? `${totalDiscount}% OFF` : '';
    discountBadgeEl.style.display = totalDiscount ? 'inline-flex' : 'none';
  }
  if (discountInput) discountInput.value = String(totalDiscount || 0);
  if (priceAfterDiscountInput) priceAfterDiscountInput.value = formatCurrency(finalPrice);
  if (advanceInput) advanceInput.value = formatCurrency(advanceAmount);
  if (deliveryInput) deliveryInput.value = `${deliveryHours} hour(s)`;
  updateSummary(selected.name, finalPrice, advanceAmount, deliveryHours);
}

async function fetchServices() {
  const snapshot = await getDocs(collection(db, 'services'));
  servicesList = snapshot.docs.map((entry) => ({ id: entry.id, ...entry.data() })).filter((service) => ['active','published'].includes(String(service.status || 'active').toLowerCase()));
  populateServiceSelect();
}

serviceSelect?.addEventListener('change', updatePrice);
rushCheckbox?.addEventListener('change', updatePrice);
applyCouponBtn?.addEventListener('click', () => {
  updatePrice();
  const code = couponCodeInput?.value.trim().toUpperCase();
  if (couponMessage) {
    couponMessage.textContent = coupons[code] ? `Coupon applied: ${coupons[code]}% off.` : 'Invalid coupon code.';
    couponMessage.style.color = coupons[code] ? 'var(--success)' : 'var(--danger)';
  }
});

payBtn?.addEventListener('click', async () => {
  if (!currentUser) {
    alert('Please login first to save your order.');
    window.location.href = 'login.html';
    return;
  }

  const pricing = computePricing();
  if (!pricing) return alert('Please select a service.');
  if (!document.getElementById('termsCheckbox')?.checked) return alert('Please accept Terms & Conditions.');

  const name = document.getElementById('name')?.value.trim();
  const email = document.getElementById('email')?.value.trim();
  const phone = document.getElementById('phone')?.value.trim();
  const details = document.getElementById('details')?.value.trim() || '';
  if (!name || !email || !phone) return alert('Please fill all required fields.');

  try {
    payBtn.disabled = true;
    payBtn.textContent = 'Saving Order...';
    const orderRef = await addDoc(collection(db, 'orders'), {
      clientUid: currentUser.uid,
      clientName: name,
      clientEmail: email,
      clientPhone: phone,
      serviceId: pricing.selected.id,
      serviceName: pricing.selected.name,
      category: pricing.selected.category || '',
      finalPrice: pricing.finalPrice,
      advanceAmount: pricing.advanceAmount,
      discountPercent: pricing.totalDiscount,
      couponCode: pricing.couponPercent ? pricing.couponCode : '',
      couponPercent: pricing.couponPercent,
      rushDelivery: Boolean(rushCheckbox?.checked),
      deliveryHours: pricing.deliveryHours,
      details,
      status: 'Pending',
      paymentStatus: 'Advance Pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    successMessage.style.display = 'block';
    successMessage.textContent = `Order saved successfully. Order ID: ${orderRef.id.slice(0, 6).toUpperCase()}`;
    document.getElementById('orderForm')?.reset();
    populateFormProfile();
    updatePrice();
  } catch (error) {
    alert(error.message);
  } finally {
    payBtn.disabled = false;
    payBtn.textContent = 'Save Order & Continue';
  }
});

onAuthStateChanged(auth, async (user) => {
  currentUser = user;
  if (!user) {
    document.getElementById('orderAuthNotice').innerHTML = 'You must <a href="login.html">login</a> before saving a real order.';
    return;
  }
  const snap = await getDoc(doc(db, 'clients', user.uid)).catch(() => null);
  currentClientProfile = snap?.exists() ? snap.data() : null;
  populateFormProfile();
  document.getElementById('orderAuthNotice').textContent = `Logged in as ${currentClientProfile?.name || user.displayName || user.email}`;
});

fetchServices().catch((error) => {
  console.error(error);
  document.getElementById('orderAuthNotice').textContent = `Could not load services: ${error.message}`;
});
