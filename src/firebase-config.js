import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyBZqz-JTvKOasw6KTmLBJv42qreH95cR3c",
  authDomain: "linkedout-bk.firebaseapp.com",
  projectId: "linkedout-bk",
  storageBucket: "linkedout-bk.firebasestorage.app",
  messagingSenderId: "692935477994",
  appId: "1:692935477994:web:a26af9e08606cd7b45e593"
};

const app = initializeApp(firebaseConfig);

// Add this line to log if Firebase is initialized correctly
console.log("Firebase app initialized:", app);

const auth = getAuth(app);
const db = getFirestore(app); // ✅ initialize Firestore

// Google Sign-In
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log("User signed in: ", user);
    })
    .catch((error) => {
      console.error("Error signing in with Google: ", error);
    });
};

// Refactored signUserOut function to directly use the named export `signOut`
const signUserOut = () => {
  signOut(auth)
    .then(() => {
      console.log("User signed out");
    })
    .catch((error) => {
      console.error("Error signing out: ", error);
    });
};

export { auth, db, signInWithGoogle, signUserOut, signOut }; // ✅ export signOut here
