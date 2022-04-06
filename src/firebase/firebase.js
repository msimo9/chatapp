// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore}  from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyAz64PoJAnIAO1TSHMcHVBv1EbvFe4DD6M",

  authDomain: "chatapp-4e718.firebaseapp.com",

  projectId: "chatapp-4e718",

  storageBucket: "chatapp-4e718.appspot.com",

  messagingSenderId: "203371847217",

  appId: "1:203371847217:web:0e1fd40b83536e82ec7f10"

};


// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage();