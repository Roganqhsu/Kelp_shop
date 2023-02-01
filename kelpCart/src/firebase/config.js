import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDHGtd-G2d15hDvWprzrgp6VIv9RTchdDY",
  authDomain: "eshop-ebff5.firebaseapp.com",
  projectId: "eshop-ebff5",
  storageBucket: "eshop-ebff5.appspot.com",
  messagingSenderId: "881249412358",
  appId: "1:881249412358:web:5b42c19e1cfa85fdc46a87"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
