// Firebase設定ファイル
// Firebaseコンソールから取得した設定を貼り付けてください

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js';

export const firebaseConfig = {
  // ここに設定を貼り付けます
  // apiKey: "...",
  // authDomain: "...",
  // projectId: "...",
  // storageBucket: "...",
  // messagingSenderId: "...",
  // appId: "..."
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
