import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyC3DfEschV-KTn_QwgYwNJnsQx_Ej2Y4uU",
  authDomain: "film-a0fa5.firebaseapp.com",
  projectId: "film-a0fa5",
  storageBucket: "film-a0fa5.appspot.com",
  messagingSenderId: "371491326314",
  appId: "1:371491326314:web:e6e98a59eac65bb60dbd13",
  measurementId: "G-875KYY59E6",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, app };
