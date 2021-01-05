import firebase from "firebase/app";
import "firebase/auth";


  // Your web app's firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDmvRBjlDbLwTP7bpQrrRlTGDm8v_gevfk",
    authDomain: "e-commerce-54076.firebaseapp.com",
    projectId: "e-commerce-54076",
    storageBucket: "e-commerce-54076.appspot.com",
    messagingSenderId: "762827254151",
    appId: "1:762827254151:web:c4a3f365402ae0a986cb22"
  };
  // Initialize firebase
  firebase.initializeApp(firebaseConfig);


  export const auth =firebase.auth()
  export const  googleAuthProvider = new firebase.auth.GoogleAuthProvider();
