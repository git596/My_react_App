// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmVVDHjdJMNPIP4OCEXSJWLVcbuJoY7bM",
  authDomain: "rasanjanawebapp.firebaseapp.com",
  projectId: "rasanjanawebapp",
  storageBucket: "rasanjanawebapp.appspot.com",
  messagingSenderId: "1067911682006",
  appId: "1:1067911682006:web:0ad2074906143c777f7677"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);