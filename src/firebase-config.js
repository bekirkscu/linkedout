import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBZqz-JTvKOasw6KTmLBJv42qreH95cR3c",
  authDomain: "linkedout-bk.firebaseapp.com",
  projectId: "linkedout-bk",
  storageBucket: "linkedout-bk.firebasestorage.app",
  messagingSenderId: "692935477994",
  appId: "1:692935477994:web:a26af9e08606cd7b45e593"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// notes below saves time when finding code at times.
// Google Sign-In
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account", // This ensures the account selection dialog is shown
});

// Sign-In with Google
const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log("User signed in: ", user);
      // Store the user info in the state or do something else
    })
    .catch((error) => {
      console.error("Error signing in with Google: ", error);
    });
};

// Sign out user
const signUserOut = () => {
  signOut(auth)
    .then(() => {
      console.log("User signed out");
    })
    .catch((error) => {
      console.error("Error signing out: ", error);
    });
};

export { auth, signInWithGoogle, signUserOut };
