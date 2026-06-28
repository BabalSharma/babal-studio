import { auth, db } from './firebase-config.js';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { doc, getDoc, serverTimestamp, setDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');
const authMessage = document.getElementById('authMessage');

function readableError(error) {
  const code = error?.code || '';
  const map = {
    'auth/invalid-credential': 'Incorrect email or password.',
    'auth/email-already-in-use': 'This email is already registered.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/weak-password': 'Password should be at least 6 characters.',
    'auth/missing-password': 'Password is required.',
    'auth/too-many-requests': 'Too many attempts. Please wait and try again.'
  };
  return map[code] || error?.message || 'Something went wrong.';
}

function showMessage(text, type = 'info') {
  if (!authMessage) return;
  authMessage.textContent = text;
  authMessage.className = `auth-message ${type}`;
}

function activateTab(id) {
  tabButtons.forEach((btn) => btn.classList.toggle('active', btn.dataset.tab === id));
  tabPanels.forEach((panel) => panel.classList.toggle('active', panel.id === id));
  showMessage('');
}

tabButtons.forEach((btn) => btn.addEventListener('click', () => activateTab(btn.dataset.tab)));

document.getElementById('loginForm')?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    showMessage('Login successful. Redirecting to your dashboard...', 'success');
    window.location.href = 'dashboard.html';
  } catch (error) {
    showMessage(readableError(error), 'error');
  }
});

document.getElementById('registerForm')?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const name = document.getElementById('registerName').value.trim();
  const email = document.getElementById('registerEmail').value.trim();
  const phone = document.getElementById('registerPhone').value.trim();
  const password = document.getElementById('registerPassword').value;

  if (phone && !/^[0-9+\-() ]{7,20}$/.test(phone)) {
    showMessage('Please enter a valid phone number.', 'error');
    return;
  }

  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, { displayName: name });
    await setDoc(doc(db, 'clients', user.uid), {
      uid: user.uid,
      name,
      email,
      phone,
      role: 'client',
      createdAt: serverTimestamp()
    }, { merge: true });
    showMessage('Account created successfully. Redirecting...', 'success');
    window.location.href = 'dashboard.html';
  } catch (error) {
    showMessage(readableError(error), 'error');
  }
});

document.getElementById('resetForm')?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = document.getElementById('resetEmail').value.trim();
  try {
    await sendPasswordResetEmail(auth, email);
    showMessage('Password reset email sent.', 'success');
  } catch (error) {
    showMessage(readableError(error), 'error');
  }
});

onAuthStateChanged(auth, async (user) => {
  if (!user || !window.location.pathname.endsWith('login.html')) return;
  const clientDoc = await getDoc(doc(db, 'clients', user.uid)).catch(() => null);
  if (clientDoc?.exists()) {
    window.location.href = 'dashboard.html';
  }
});
