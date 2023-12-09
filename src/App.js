// Import necessary dependencies and components
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Homepage from "./Homepage";
import Login from "./Login";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCW5SYNOuiNl5-TT6bsmHdZLDvSg5YAkgI",
  authDomain: "webapp-8910b.firebaseapp.com",
  projectId: "webapp-8910b",
  storageBucket: "webapp-8910b.appspot.com",
  messagingSenderId: "172402497920",
  appId: "1:172402497920:web:9ecfc5b9038e81de3e4965",
  measurementId: "G-YVZFB9GJ6R",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Define App component
function App() {
  // State variables for login popup and user
  const [showPopup, setShowPopup] = useState(false);
  const [user, setUser] = useState(null);

  // Effect hook to handle user authentication state
  useEffect(() => {
    // Subscribe to user authentication state changes
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is signed in, update user state
        setUser(authUser);
      } else {
        // User is signed out, update user state
        setUser(null);
      }
    });

    // Clear the login popup timeout
    clearTimeout(popupTimeout);

    // Cleanup function to unsubscribe from auth state changes
    return () => unsubscribe();
  }, []);

  // Timeout to show login popup after 3 seconds
  const popupTimeout = setTimeout(() => {
    if (!user) {
      // Show the login popup if the user is not signed in
      setShowPopup(true);
    }
  }, 3000);

  // Render the App component
  return (
    <div className="App">
      <header className="App-header">
        {/* Conditionally render Login component */}
        {showPopup ? <Login onPopupClose={() => setShowPopup(false)} /> : null}
      </header>

      <main>
        {/* Conditionally render Homepage component if user is signed in */}
        {user ? (
          <Homepage handleSignOut={() => firebase.auth().signOut()} />
        ) : null}
      </main>

      <footer>
        <p>Login to leave reviews</p>
        {/* Conditionally render sign out button if user is signed in */}
        {user ? (
          <button id="signout_button" onClick={() => firebase.auth().signOut()}>
            Sign Out
          </button>
        ) : null}
      </footer>
    </div>
  );
}

// Export App component for use in other files
export default App;
