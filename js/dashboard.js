import { auth, db } from './firebase-config.js';
import { onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { collection, doc, getDoc, onSnapshot, query, where } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const logoutBtn = document.getElementById('clientLogoutBtn');
logoutBtn?.addEventListener('click', async () => {
  await signOut(auth);
  window.location.href = 'login.html';
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

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = 'login.html';
    return;
  }

  const clientSnap = await getDoc(doc(db, 'clients', user.uid));
  const profile = clientSnap.exists() ? clientSnap.data() : { name: user.displayName || 'Client', email: user.email || '', phone: '' };

  document.getElementById('clientName').textContent = profile.name || 'Client';
  document.getElementById('clientEmail').textContent = profile.email || user.email || '—';
  document.getElementById('clientPhone').textContent = profile.phone ? `Phone: ${profile.phone}` : 'Phone: —';

  const ordersQuery = query(collection(db, 'orders'), where('clientUid', '==', user.uid));
  onSnapshot(ordersQuery, (snapshot) => {
    const body = document.getElementById('clientOrdersBody');
    if (!snapshot.size) {
      body.innerHTML = '<tr><td colspan="6">No orders yet. Create your first order.</td></tr>';
      document.getElementById('statOrders').textContent = '0';
      document.getElementById('statProgress').textContent = '0';
      document.getElementById('statCompleted').textContent = '0';
      return;
    }

    let progress = 0;
    let completed = 0;
    const docs = [...snapshot.docs].sort((a, b) => {
      const at = a.data().createdAt?.seconds || 0;
      const bt = b.data().createdAt?.seconds || 0;
      return bt - at;
    });
    body.innerHTML = docs.map((entry) => {
      const order = entry.data();
      const status = order.status || 'Pending';
      if (['Pending', 'In Review', 'In Progress'].includes(status)) progress += 1;
      if (status === 'Completed') completed += 1;
      return `
        <tr>
          <td>#${entry.id.slice(0, 6).toUpperCase()}</td>
          <td>${order.serviceName || '—'}</td>
          <td>${formatCurrency(order.finalPrice)}</td>
          <td>${formatCurrency(order.advanceAmount)}</td>
          <td><span class="status-pill">${status}</span></td>
          <td>${formatDate(order.createdAt)}</td>
        </tr>`;
    }).join('');

    document.getElementById('statOrders').textContent = String(snapshot.size);
    document.getElementById('statProgress').textContent = String(progress);
    document.getElementById('statCompleted').textContent = String(completed);
  }, (error) => {
    document.getElementById('clientOrdersBody').innerHTML = `<tr><td colspan="6">${error.message}</td></tr>`;
  });
});
