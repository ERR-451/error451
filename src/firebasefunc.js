import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// Import Firebase
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/auth";
import "firebase/compat/firestore";

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
