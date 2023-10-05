import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

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

function Login() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authStateChanged = () => {
      firebase.auth().onAuthStateChanged((user) => {
        setUser(user);
      });
    };

    authStateChanged();
  }, []);

  const handleSignIn = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert(`Sign In Error: ${error.message}`);
    }
  };

  const handleSignUp = async (email, password) => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      alert(`Sign Up Error: ${error.message}`);
    }
  };

  const handleSignOut = () => {
    firebase.auth().signOut();
  };

  return (
    <div>
      {user ? (
        <>
          <h1>Welcome to the Main Page</h1>
          <p>This is the main content that you want to display to authenticated users.</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </>
      ) : (
        <div>
          <SignIn handleSignIn={handleSignIn} />
          <SignUp handleSignUp={handleSignUp} />
        </div>
      )}
    </div>
  );
}

function SignIn({ handleSignIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignIn(email, password);
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

function SignUp({ handleSignUp }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignUp(email, password);
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Login;