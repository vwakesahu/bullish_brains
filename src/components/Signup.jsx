import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUserAlt, FaEnvelope, FaLock, FaPhoneAlt, FaRegImage } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState(null);

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setProfileImage(selectedImage);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // handle signup logic here
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-primary pb-[200px]">
            <div className="max-w-md w-full mx-auto rounded-lg shadow-lg bg-gray-50">
                <div className="w-full bg-yellow-400 rounded-lg rounded-b-none px-8 py-6">
                    <motion.h2
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl font-bold text-gray-700 mb-2 text-center"
                    >
                        Create Account
                    </motion.h2>
                    <motion.p
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-800 text-lg mb-6 text-center"
                    >
                        Fill in the details to create your account
                    </motion.p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="w-full px-8 py-6">
                        <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            
                        >
                            <div className="flex items-center border-b border-gray-400 py-2">
                                <FaUserAlt className="mr-2 text-gray-600" />
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                    required
                                />
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="mb-6"
                        >
                            <div className="flex items-center border-b border-gray-400 py-2">
                                <FaUserAlt className="mr-2 text-gray-600" />
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                />
                            </div>
                            <div className="flex items-center border-b border-gray-400 py-2">
                                <FaEnvelope className="mr-2 text-gray-600" />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                />
                            </div>

                            <div className="flex items-center border-b border-gray-400 py-2">
                                <FaLock className="mr-2 text-gray-600" />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                />
                            </div>

                            <div className="flex items-center justify-between mt-6">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Sign Up
                                </button>
                                <Link
                                    to="/login"
                                    className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                                >
                                    Already have an account? Login
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </form>
            </div>
        </div>
        
);
};

export default Signup;
