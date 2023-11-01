import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Homepage from "./Homepage";
import Login from "./Login";
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCW5SYNOuiNl5-TT6bsmHdZLDvSg5YAkgI",
  authDomain: "webapp-8910b.firebaseapp.com",
  projectId: "webapp-8910b",
  storageBucket: "webapp-8910b.appspot.com",
  messagingSenderId: "172402497920",
  appId: "1:172402497920:web:9ecfc5b9038e81de3e4965",
  measurementId: "G-YVZFB9GJ6R",
};

firebase.initializeApp(firebaseConfig);

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check the authentication state when the app loads
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is signed in
        setUser(authUser);
      } else {
        // User is signed out
        setUser(null);
      }
    });

    // Clear the login popup timeout when the app loads
    clearTimeout(popupTimeout);

    return () => unsubscribe();
  }, []);

  const popupTimeout = setTimeout(() => {
    if (!user) {
      // Show the login popup only if the user is not already signed in
      setShowPopup(true);
    }
  }, 3000);

  /* Add a useEffect here to get JSON data from Firebase
     and store in variables */

  return (
    <div className="App">
      <header className="App-header">
        {showPopup ? <Login onPopupClose={() => setShowPopup(false)} /> : null}
      </header>

      <main>{user ? <Homepage handleSignOut={() => firebase.auth().signOut()} /> : null}</main>

      <footer>
        <p>This is footer content</p>
      </footer>
    </div>
  );
}

export default App;