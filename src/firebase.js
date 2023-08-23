import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAHIwPUIX--R1GPlA_y6piqp2QoBuzc_Mo",
  authDomain: "meow-svie.firebaseapp.com",
  projectId: "meow-svie",
  storageBucket: "meow-svie.appspot.com",
  messagingSenderId: "301002031786",
  appId: "1:301002031786:web:b1db6229ca6ceed63006d3"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);