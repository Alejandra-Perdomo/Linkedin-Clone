import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs, addDoc, serverTimestamp, orderBy, query } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: "AIzaSyBiPLZAQDOd5onfqJJ5ZKOhnL0Us2oMdLA",
    authDomain: "linkedin-clone-1659a.firebaseapp.com",
    projectId: "linkedin-clone-1659a",
    storageBucket: "linkedin-clone-1659a.appspot.com",
    messagingSenderId: "880776200633",
    appId: "1:880776200633:web:a9bab95ca52d9f6183f668"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {db, auth, collection, getDocs, addDoc, serverTimestamp, orderBy, query}