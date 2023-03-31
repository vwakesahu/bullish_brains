import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLock } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { StateContext, DispatchContext } from './store';
import { actionType } from './store';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useStateValue } from '../context/StateProvider';


// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const navigator = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [{ user }, dispatch] = useStateValue();

  const state = useContext(StateContext);
  // const dispatch = useContext(DispatchContext);

  const handleSubmit = async(e) => {
    e.preventDefault();
    let userCredential = await firebase.auth().signInWithEmailAndPassword(email,password);
    dispatch({
      type: actionType.SET_USER,
      user: userCredential.user,
  });

  localStorage.setItem("user", JSON.stringify(userCredential.user));
  console.log(userCredential.user);
  navigator("/dash");

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary pb-64">
      <div className="max-w-md w-full mx-auto p-8 rounded-lg shadow-lg bg-white">
        <motion.h2
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-bold text-gray-900 mb-8 text-center"
        >
          Login
        </motion.h2>
        <form onSubmit={handleSubmit}>
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-4"
          >
            <div className="flex items-center border-b border-gray-400 py-2">
              <FiMail className="mr-2 text-gray-600" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-none outline-none w-full text-gray-700"
                required
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <div className="flex items-center border-b border-gray-400 py-2">
              <FiLock className="mr-2 text-gray-600" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-none outline-none w-full text-gray-700 "
                required
              />
            </div>
          </motion.div>
          <motion.button
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
          >
            Login
          </motion.button>
        </form>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-4"
        >
          <p className="text-gray-600">
            Don't have an account?{' '}
            <a href="http://localhost:3000/sign-up" className="text-blue-500 hover:text-blue-600 font-bold">
              Sign up
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;