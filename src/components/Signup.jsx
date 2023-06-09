import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { motion } from "framer-motion";
// import React, { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import firebase from "firebase/compat/app";
import { TbLogout } from 'react-icons/tb';
import { Await, Link, useNavigate } from 'react-router-dom';
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
  // const [islogin,setIslogin]=useState(false);
  const navigate = useNavigate();

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
        await firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).set({
          'firstname': "",
          'lastname': "",
          'username': providerData['0']['displayName'],
          'email': providerData['0']['email'],
          uid: firebase.auth().currentUser.uid,
          wallet: '1000000'
        })
          .then(() => {
            console.log("User data stored in Firestore.");
            navigate("/dash");
            
          })
          .catch((error) => {
            console.error("Error creating user: ", error);
          });
      }

      localStorage.setItem("user", JSON.stringify(providerData[0]));
      console.log(providerData);
      

    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
   let userCredential =await firebase.auth().createUserWithEmailAndPassword(email,password);
   await firebase.firestore().collection('users').doc(userCredential.user.uid).set({
    firstName,
    lastName,
    username,
    email,
    'uid':userCredential.user.uid,
   ' wallet':'1000000',
   })
    dispatch({
        type: actionType.SET_USER,
        user: userCredential.user,
    });
    localStorage.setItem("user", JSON.stringify(userCredential.user));
    console.log(userCredential.user);
    navigate("/dash");

  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
      <motion.h2
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-3xl font-bold text-gray-900 mb-8 text-center"
      >
        Create Account
      </motion.h2>

      <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto">
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-700 font-bold mb-2">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700 font-bold mb-2">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <p className="text-gray-600 mb-11">
          Already have an account?{' '}
          <a
            href="http://localhost:3000/login"
            className="text-blue-500 hover:text-blue-600 font-bold "
          >
            Sign in
          </a>{' '}
        </p>
        <div className="flex items-center justify-between mb-3">
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign Up
          </button>
        </div>

        <div className="flex items-center justify-between mb-6">
          <button
            onClick={login}
            type="submit"
            className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign Up with Google
          </button>
        </div>

        <div className="flex justify-center">
          <p className="text-sm text-gray-500">
            By signing up, you agree to our{' '}
            <a
              href="#"
              className="text-blue-500 hover:text-blue-600 font-bold"
            >
              Terms of Service
            </a>{' '}
            and{' '}
            <a
              href="#"
              className="text-blue-500 hover:text-blue-600 font-bold"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup;