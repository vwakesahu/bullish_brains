import React, { useEffect } from 'react'
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useState } from 'react';
// import { useStateValue } from '../context/StateProvider';
// import { GoogleAuthProvider } from 'firebase/auth';

const AcountContainer = () => {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [First, setFirst] = useState('');
    const [Last, setLast] = useState('');
  const getUser = async () => {
    const user = firebase.auth().currentUser;
    if (user) {
      setEmail(user.email);
      firebase.firestore().collection('users').doc(user.uid).get().then((value)=>{
        setUsername(value['username']);
        setFirst(value['firstname']);
        setLast(value['lastname']);
      });
    }
  };

  useEffect(() => {
    getUser();
  }, []);

    // const getuser =async()=>{
        
    // }

    // useEffect(() => {
    //     getuser();
    // }, [])

    // const editm =async()=>{
    //     await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).update({
    //         'firstname': firstname,
    //       'lastname': lastname,
    //       'username': username,
    //       'email': email,
    //     })
    // }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100 ">
          <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 ">Account Information</h2>
            <form>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                  Username
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="username"
                  placeholder="Username"
                  defaultValue={username}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email"
                  defaultValue={email}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="firstName">
                  First Name
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                  defaultValue={First}

                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                  defaultValue={Last}

                />
              </div>
              <div className="flex items-center justify-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    
}

export default AcountContainer