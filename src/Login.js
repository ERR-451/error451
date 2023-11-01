import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './popup.css'; // Import the CSS file for styling

// Import Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import firebaseConfig from "./firebasefunc"


  function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [user, setUser] = useState(null);
    const firestore = firebase.firestore();
  
    useEffect(() => {
      // Check the authentication state when the component mounts
      const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
        if (authUser) {
          // User is signed in
          setUser(authUser);
        } else {
          // User is signed out
          setUser(null);
        }
      });
  
      // Unsubscribe the listener when the component unmounts
      return () => unsubscribe();
    }, []);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (isSignUp) {
        // Handle sign-up logic
        try {
          // Set persistence to LOCAL before creating a new user in Firebase Auth
          await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
          
          // Create a new user in Firebase Auth
          const authUser = await firebase.auth().createUserWithEmailAndPassword(email, password);
  
          // Extract the username from the email (everything before the '@' symbol)
          const username = email.split('@')[0];
  
          // Add user data to Firestore
          await firestore.collection('users').doc(authUser.user.uid).set({
            id: authUser.user.uid,
            email: email,
            username: username, // Use the extracted username
            profilePic: 'https://example.com/profile-pic.jpg', // You can add a profile picture field here if needed
          });
  
          // Sign-up successful, close the pop-up
          props.onPopupClose();
        } catch (error) {
          alert(`Sign Up Error: ${error.message}`);
        }
      } else {
        // Handle sign-in logic
        try {
          // Set persistence to LOCAL before signing in
          await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
          
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