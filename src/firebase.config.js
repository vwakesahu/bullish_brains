
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';



const firebaseConfig = {
  apiKey: "AIzaSyBlc8dyS0gFupsNBibnVQYYWd2pIvShbYc",
  authDomain: "bullishbrains-86d8d.firebaseapp.com",
  databaseURL: "https://bullishbrains-86d8d-default-rtdb.firebaseio.com",
  projectId: "bullishbrains-86d8d",
  storageBucket: "bullishbrains-86d8d.appspot.com",
  messagingSenderId: "1016988951904",
  appId: "1:1016988951904:web:d8e6632d2361ef4bee2a05"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);
export { app, firestore, storage };