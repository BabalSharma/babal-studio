import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCrj4jFNfKdUqYMQTlMKa5RKMa-dWSjJHM",
  authDomain: "babalsharmastudioadmin.firebaseapp.com",
  projectId: "babalsharmastudioadmin",
  storageBucket: "babalsharmastudioadmin.firebasestorage.app",
  messagingSenderId: "301456808026",
  appId: "1:301456808026:web:5a240d31c0ef876737e063"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
