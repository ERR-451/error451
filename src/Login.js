import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './popup.css'; // Import the CSS file for styling

// Import Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCW5SYNOuiNl5-TT6bsmHdZLDvSg5YAkgI",
    authDomain: "webapp-8910b.firebaseapp.com",
    projectId: "webapp-8910b",
    storageBucket: "webapp-8910b.appspot.com",
    messagingSenderId: "172402497920",
    appId: "1:172402497920:web:9ecfc5b9038e81de3e4965",
    measurementId: "G-YVZFB9GJ6R"
  };

firebase.initializeApp(firebaseConfig);


function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // Track whether it's a sign-up or sign-in form
  const [user, setUser] = useState(null); // Track the user's authentication state

  useEffect(() => {
    const authStateChanged = () => {
      firebase.auth().onAuthStateChanged((authUser) => {
        setUser(authUser);
      });
    };

    authStateChanged();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignUp) {
      // Handle sign-up logic
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        // Sign-up successful, close the pop-up
        props.onPopupClose();
      } catch (error) {
        alert(`Sign Up Error: ${error.message}`);
      }
    } else {
      // Handle sign-in logic
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        // Sign-in successful, close the pop-up
        props.onPopupClose();
      } catch (error) {
        alert(`Sign In Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
        </form>
        <button
          className="toggle-button"
          onClick={() => setIsSignUp((prevIsSignUp) => !prevIsSignUp)}
        >
          {isSignUp ? 'Already have an account? Sign In' : 'Need to sign up? Sign Up'}
        </button>
        <button className="close-button" onClick={props.onPopupClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default Login;
