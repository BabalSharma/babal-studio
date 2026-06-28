import { auth, db } from './firebase.js';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const form = document.getElementById('adminLoginForm');
const errorBox = document.getElementById('error');

async function verifyAdmin(uid) {
  const adminSnap = await getDoc(doc(db, 'admins', uid));
  return adminSnap.exists();
}

form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  errorBox.textContent = '';

  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const isAdmin = await verifyAdmin(user.uid);
    if (!isAdmin) {
      await signOut(auth);
      throw new Error('This account is authenticated but not authorized as an admin. Add admins/{uid} in Firestore first.');
    }
    window.location.href = 'admindashboard.html';
  } catch (error) {
    errorBox.textContent = error.message;
  }
});

onAuthStateChanged(auth, async (user) => {
  if (!user) return;
  const isAdmin = await verifyAdmin(user.uid).catch(() => false);
  if (isAdmin) window.location.href = 'admindashboard.html';
});
