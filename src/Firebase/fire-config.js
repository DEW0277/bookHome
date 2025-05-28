import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDmeDaefstTD1nsW9bo1bcpBBthABcn0LE',
  authDomain: 'firs-projact.firebaseapp.com',
  projectId: 'firs-projact',
  storageBucket: 'firs-projact.firebasestorage.app',
  messagingSenderId: '374258553569',
  appId: '1:374258553569:web:595b56cc4d53d334dcdda0',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
