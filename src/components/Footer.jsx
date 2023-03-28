import React from 'react';
import { FaTwitter, FaFacebook, FaLinkedin, FaGithub } from 'react-icons/fa';
import { AiFillPhone, AiFillMail } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-between">
        <div className="w-full md:w-1/4 mb-4 md:mb-0">
          <Link to="/" className="text-2xl font-bold mb-2 block">
            Bullish Brains 
          </Link>
          <p className="text-gray-400">Just a demo of stock page</p>
        </div>
        <div className="w-full md:w-1/4 mb-4 md:mb-0">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="list-unstyled">
            <li>
              <Link to="/" className="hover:text-gray-400 block mb-2">Home</Link>
            </li>
            <li>
              <Link to="/stocks" className="hover:text-gray-400 block mb-2">Stocks</Link>
            </li>
            <li>
              <Link to="/news" className="hover:text-gray-400 block mb-2">News</Link>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/4 mb-4 md:mb-0">
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p className="flex items-center">
            <AiFillPhone className="mr-2" />
            +91 1234567829
          </p>
          <p className="flex items-center">
            <AiFillMail className="mr-2" />
            initiator@bullishbrains.com
          </p>
        </div>
        <div className="w-full md:w-1/4 mb-4 md:mb-0">
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex">
          <a href="https://github.com/vwakesahu/bullish_brains" className=" mr-4 hover:text-gray-400">
              <FaGithub />
            </a>
            <a href="#" className="mr-4 hover:text-gray-400">
              <FaTwitter />
            </a>
            <a href="#" className="mr-4 hover:text-gray-400">
              <FaFacebook />
            </a>
            <a href="#" className="mr-4 hover:text-gray-400">
              <FaLinkedin />
            </a>
            
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} Bullish Brains. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
