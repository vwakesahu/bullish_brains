import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { motion } from "framer-motion";

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
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
    }, [firebaseConfig]);

    const handleSubmit = (e) => {
        e.preventDefault();
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
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
            })
            .catch((error) => {
                console.error("Error creating user: ", error);
            });
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
                <div >
                    <label htmlFor="firstName" className="block text-gray-700 font-bold mb-2">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div >
                    <label htmlFor="lastName" className="block text-gray-700 font-bold mb-2">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div >
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email:</label>
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
                    <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button type="submit" className=" w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Sign Up
                    </button>
                </div>
            </form>
        </div>

    );
}

export default Signup;