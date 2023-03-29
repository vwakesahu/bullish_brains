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
import WalletContainer from "./Wallet";
import React, { useEffect, useState } from "react";

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


const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [isMenu, setIsMenu] = useState(false);
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

      if(true){

        // const user = userCredential.user;
        await firebase.firestore().collection("users").add({
            'firstname':providerData['0']['displayName'],
            'lastname':"",
            'username':"",
            'email': providerData['0']['email'],
            uid:providerData['0']['uid'],
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
    } else {
      setIsMenu(!isMenu);
    }
  };

  const logout = () => {
    setIsMenu(false);
    localStorage.clear();

    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };



  const [searchValue, setSearchValue] = useState("");

  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
  };

  const callSearchFunction = (e) => {
    e.preventDefault();
    console.log("Search value: ", searchValue);
    setSearchValue("");
  };




  return (
    <header className='fixed w-screen p-3 px-4 md:p-4 md:px-16 bg-primary'>
      {/* Desktop & Tablet*/}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to={"/"} className='flex items-center gap-2'>
          <img src={Logo} className='w-[70px] -mt-2 object-cover' alt="logo" />


          <p className='text-headingColor text-3xl font-bold relative'>Bullish Brains<p className='text-[10px] -mt-[15px]'>-By Initiators</p></p>
        </Link>

        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-24 "
          >



            <form className="flex items-center justify-center mt-4">
              <div className="relative mr-4">
                <input
                  className="bg-gray-100 rounded-full py-2 pl-10 block w-full xl:w-45 focus:outline-none focus:bg-white focus:border-gray-300"
                  type="text"
                  value={searchValue}
                  onChange={handleSearchInputChanges}
                  placeholder="Search..."
                />
              </div>
              <button
                className="bg-yellow-400 hover:bg-red-400 text-white font-bold py-2 px-4 rounded-full"
                type="submit"
                onClick={callSearchFunction}
              >
                <FaSearch />
              </button>
            </form>



            <Link to={"news"} className='flex items-center gap-2'>

            <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>News</li>
            </Link>
            <Link to={"about-us"} className='flex items-center gap-2'>
              <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>About Us</li>
            </Link>

          </motion.ul>

          <div
            className="relative flex items-center justify-center"
          >

          </div>

          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : Avatar}
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
              alt="userprofile"
              onClick={login}
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
              >

                {
                  user && (

                    <div>
                    <Link to={"dash"} className='flex items-center gap-2'>
                      <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base'

                        
                      ><TfiDashboard />Dashboard</p>
                    </Link>
                    <WalletContainer />
                    </div>

                  )

                }

                <p
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                  onClick={logout}
                >
                  <TbLogout />Logout
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>


      {/*For Mobile*/}
      <div className='flex items-center justify-between md:hidden w-full h-full'>

        <div className='relative flex items-center justify-center -left-6' >
          <FiMenu className='text-textColor text-3xl ml-8 cursor-pointer' />


        </div>
        <Link to={"/"} className='flex items-center gap-0'>
          <img src={Logo} className='w-12 object-cover' alt="logo" />
          <p className='text-headingColor text-2xl font-bold'>Bullish Brains</p>
        </Link>


        <div className='relative'>
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : Avatar}
            className='w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full'
            alt="user profile"
          />
          {
            isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className='w-40 bg-green-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0'>

                <Link to={'/createItem'}>
                  <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base'>New Item <FiMenu /></p>
                </Link>


                <ul
                  className='flex flex-col'>
                  <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-200 px-4 py-2
              onClick={() => setIsMenu (false)}'>Explore</li>
                  <Link to={"dash"} className='flex items-center gap-2'>
                    <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-200 px-4 py-2
              onClick={() => setIsMenu (false)}'>Dashboard</li></Link>
                  <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-200 px-4 py-2
              onClick={() => setIsMenu (false)}'>Service</li>
                  <Link to={"about-us"} className='flex items-center gap-2'><li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-200 px-4 py-2
              onClick={() => setIsMenu (false)}'>About Us</li></Link>
                </ul>

                <p className='m-2 p-2 rounded-md shadow:md flex items-center justify-center bg-gray-300 gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base'>
                  Log Out<TbLogout />
                </p>
              </motion.div>
            )
          }
        </div>

      </div>

    </header>
  )
}

export default Header