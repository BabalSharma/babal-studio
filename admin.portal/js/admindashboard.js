import { auth, db } from './firebase.js';
import { onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const logoutBtn = document.getElementById('logoutBtn');
const serviceForm = document.getElementById('serviceForm');
const resetServiceBtn = document.getElementById('resetServiceBtn');
const serviceFormMessage = document.getElementById('serviceFormMessage');
const servicesTableBody = document.getElementById('servicesTableBody');
const ordersTableBody = document.getElementById('ordersTableBody');
const clientsTableBody = document.getElementById('clientsTableBody');

logoutBtn?.addEventListener('click', async () => {
  await signOut(auth);
  window.location.href = 'adminlogin.html';
});

function formatCurrency(value) {
  return value ? `₹${Number(value).toLocaleString('en-IN')}` : '—';
}

function formatDate(value) {
  try {
    const date = value?.toDate ? value.toDate() : new Date(value);
    return new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'short' }).format(date);
  } catch {
    return '—';
  }
}

function setServiceForm(service = null) {
  document.getElementById('serviceId').value = service?.id || '';
  document.getElementById('serviceCategory').value = service?.category || '';
  document.getElementById('serviceName').value = service?.name || '';
  document.getElementById('serviceDescription').value = service?.description || '';
  document.getElementById('serviceImageUrl').value = service?.imageUrl || '';
  document.getElementById('serviceOldPrice').value = service?.oldPrice || '';
  document.getElementById('serviceOfferPrice').value = service?.offerPrice || '';
  document.getElementById('serviceAdvancePercent').value = service?.advancePercent || 50;
  document.getElementById('serviceDeliveryHours').value = service?.deliveryHours || 24;
  document.getElementById('serviceStatus').value = service?.status || 'Active';
  serviceFormMessage.textContent = service ? `Editing ${service.name}` : 'Ready to create a new service.';
}

resetServiceBtn?.addEventListener('click', () => setServiceForm());

serviceForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const serviceId = document.getElementById('serviceId').value;
  const payload = {
    category: document.getElementById('serviceCategory').value.trim(),
    name: document.getElementById('serviceName').value.trim(),
    description: document.getElementById('serviceDescription').value.trim(),
    imageUrl: document.getElementById('serviceImageUrl').value.trim(),
    oldPrice: Number(document.getElementById('serviceOldPrice').value) || 0,
    offerPrice: Number(document.getElementById('serviceOfferPrice').value) || 0,
    advancePercent: Number(document.getElementById('serviceAdvancePercent').value) || 50,
    deliveryHours: Number(document.getElementById('serviceDeliveryHours').value) || 24,
    status: document.getElementById('serviceStatus').value,
    updatedAt: serverTimestamp()
  };

  try {
    if (serviceId) {
      await updateDoc(doc(db, 'services', serviceId), payload);
      serviceFormMessage.textContent = 'Service updated successfully.';
    } else {
      await addDoc(collection(db, 'services'), { ...payload, createdAt: serverTimestamp() });
      serviceFormMessage.textContent = 'Service created successfully.';
    }
    setServiceForm();
  } catch (error) {
    serviceFormMessage.textContent = error.message;
  }
});

async function requireAdmin(user) {
  if (!user) {
    window.location.href = 'adminlogin.html';
    return false;
  }
  const adminSnap = await getDoc(doc(db, 'admins', user.uid));
  if (!adminSnap.exists()) {
    await signOut(auth);
    window.location.href = 'adminlogin.html';
    return false;
  }
  return true;
}

function watchServices() {
  onSnapshot(query(collection(db, 'services'), orderBy('createdAt', 'desc')), (snapshot) => {
    document.getElementById('totalServices').textContent = String(snapshot.size);
    if (!snapshot.size) {
      servicesTableBody.innerHTML = '<tr><td colspan="5">No services found.</td></tr>';
      return;
    }
    servicesTableBody.innerHTML = snapshot.docs.map((entry) => {
      const service = { id: entry.id, ...entry.data() };
      return `
        <tr>
          <td>${service.name || '—'}</td>
          <td>${service.category || '—'}</td>
          <td>${formatCurrency(service.offerPrice)}</td>
          <td><span class="status-pill">${service.status || '—'}</span></td>
          <td>
            <div class="table-actions">
              <button type="button" data-action="edit-service" data-id="${service.id}">Edit</button>
              <button type="button" data-action="delete-service" data-id="${service.id}">Delete</button>
            </div>
          </td>
        </tr>`;
    }).join('');

    servicesTableBody.querySelectorAll('[data-action="edit-service"]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const service = snapshot.docs.find((entry) => entry.id === btn.dataset.id);
        if (service) setServiceForm({ id: service.id, ...service.data() });
      });
    });

    servicesTableBody.querySelectorAll('[data-action="delete-service"]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        if (!confirm('Delete this service?')) return;
        await deleteDoc(doc(db, 'services', btn.dataset.id));
      });
    });
  });
}

function watchOrders() {
  onSnapshot(query(collection(db, 'orders'), orderBy('createdAt', 'desc')), (snapshot) => {
    document.getElementById('totalOrders').textContent = String(snapshot.size);
    const pending = snapshot.docs.filter((entry) => ['Pending', 'In Review', 'In Progress'].includes(entry.data().status)).length;
    document.getElementById('pendingOrders').textContent = String(pending);
    if (!snapshot.size) {
      ordersTableBody.innerHTML = '<tr><td colspan="7">No orders yet.</td></tr>';
      return;
    }
    ordersTableBody.innerHTML = snapshot.docs.map((entry) => {
      const order = entry.data();
      return `
      <tr>
        <td>#${entry.id.slice(0, 6).toUpperCase()}</td>
        <td>${order.clientName || '—'}<br><small>${order.clientEmail || ''}</small></td>
        <td>${order.serviceName || '—'}</td>
        <td>${formatCurrency(order.finalPrice)}</td>
        <td>
          <select data-action="order-status" data-id="${entry.id}">
            ${['Pending', 'In Review', 'In Progress', 'Completed', 'Cancelled'].map((status) => `<option value="${status}" ${order.status === status ? 'selected' : ''}>${status}</option>`).join('')}
          </select>
        </td>
        <td>
          <select data-action="payment-status" data-id="${entry.id}">
            ${['Advance Pending', 'Advance Paid', 'Paid in Full'].map((status) => `<option value="${status}" ${order.paymentStatus === status ? 'selected' : ''}>${status}</option>`).join('')}
          </select>
        </td>
        <td><small>${formatDate(order.createdAt)}</small></td>
      </tr>`;
    }).join('');

    ordersTableBody.querySelectorAll('[data-action="order-status"]').forEach((select) => {
      select.addEventListener('change', async () => {
        await updateDoc(doc(db, 'orders', select.dataset.id), { status: select.value, updatedAt: serverTimestamp() });
      });
    });

    ordersTableBody.querySelectorAll('[data-action="payment-status"]').forEach((select) => {
      select.addEventListener('change', async () => {
        await updateDoc(doc(db, 'orders', select.dataset.id), { paymentStatus: select.value, updatedAt: serverTimestamp() });
      });
    });
  });
}

function watchClients() {
  onSnapshot(query(collection(db, 'clients'), orderBy('createdAt', 'desc')), (snapshot) => {
    document.getElementById('totalClients').textContent = String(snapshot.size);
    if (!snapshot.size) {
      clientsTableBody.innerHTML = '<tr><td colspan="4">No clients found.</td></tr>';
      return;
    }
    clientsTableBody.innerHTML = snapshot.docs.map((entry) => {
      const client = entry.data();
      return `
        <tr>
          <td>${client.name || '—'}</td>
          <td>${client.email || '—'}</td>
          <td>${client.phone || '—'}</td>
          <td>${formatDate(client.createdAt)}</td>
        </tr>`;
    }).join('');
  });
}

onAuthStateChanged(auth, async (user) => {
  const ok = await requireAdmin(user);
  if (!ok) return;
  setServiceForm();
  watchServices();
  watchOrders();
  watchClients();
});
