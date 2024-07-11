import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: 'AIzaSyDjiP0a_3oweZ0bTMTqCGP-Aki5Z6JYwOY',
  authDomain: 'noteballs-560c5.firebaseapp.com',
  projectId: 'noteballs-560c5',
  storageBucket: 'noteballs-560c5.appspot.com',
  messagingSenderId: '38968478287',
  appId: '1:38968478287:web:90b8f44049d530e977383a'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth }