import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { motion } from "framer-motion";
// import React, { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import firebase from "firebase/compat/app";
import { TbLogout } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { actionType } from '../context/reducer';
import { useStateValue } from '../context/StateProvider';
import { app } from '../firebase.config';
import Avatar from '../img/avatar.png';
import Logo from '../img/logo.png';
import { FaSearch } from "react-icons/fa";
import { TfiDashboard } from 'react-icons/tfi'
import WalletContainer from "./WalletContainer";
import React, { useEffect, useState } from "react";
import "firebase/compat/auth";
import "firebase/compat/firestore";


const firebaseConfig = {
  // Your Firebase project's configuration object
  // ...

  apiKey: "AIzaSyBlc8dyS0gFupsNBibnVQYYWd2pIvShbYc",
  authDomain: "bullishbrains-86d8d.firebaseapp.com",
  databaseURL: "https://bullishbrains-86d8d-default-rtdb.firebaseio.com",
  projectId: "bullishbrains-86d8d",
  storageBucket: "bullishbrains-86d8d.appspot.com",
  messagingSenderId: "1016988951904",
  appId: "1:1016988951904:web:d8e6632d2361ef4bee2a05"
};

function Signup() {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [{ user }, dispatch] = useStateValue();


  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }, [firebaseConfig]);

  const login = async () => {
    if (!user) {
      const {
        user: { providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });

      if (true) {

        // const user = userCredential.user;
        await firebase.firestore().collection("users").add({
          'firstname': providerData['0']['displayName'],
          'lastname': "",
          'username': "",
          'email': providerData['0']['email'],
          uid: providerData['0']['uid'],
          wallet: 1000000
        })
          .then(() => {
            console.log("User data stored in Firestore.");
          })
          .catch((error) => {
            console.error("Error creating user: ", error);
          });
      }

      localStorage.setItem("user", JSON.stringify(providerData[0]));
      console.log(providerData);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    // Store user data in Firestore
    return firebase.firestore().collection("users").add({
      firstName,
      lastName,
      username,
      email: user.email,
      uid: user.uid,
      wallet: 1000000
    });
  })
  .then(() => {
    console.log("User data stored in Firestore.");
    // Log in the user
    return firebase.auth().signInWithEmailAndPassword(email, password);
  })
  .then(() => {
    console.log("User logged in successfully.");
  })
  .catch((error) => {
    console.error("Error creating user: ", error);
  });
  };

  return (
    <div >
      

      <form onSubmit={handleSubmit} >
        <div className="mb-4">
          <label htmlFor="firstName" >
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" >
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <label htmlFor="username" >
          Username:
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="email">
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password" >
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <p className="text-gray-600 mb-11">
          Already have an account?{' '}
          <a
            href="http://localhost:3000/login"
          >
            Sign in
          </a>{' '}
        </p>
          <button
            type="submit"
          >
            Sign Up
          </button>
          <button
            onClick={login}
            type="submit"
          >
            Sign Up with Google
          </button>

         
      </form>
    </div>
  );
}

export default Signup;