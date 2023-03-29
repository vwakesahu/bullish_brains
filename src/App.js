import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components';
import CreateContainer from './components/CreateContainer';
import MainContainer from './components/MainContainer';
import { AnimatePresence } from "framer-motion";
import AboutUs from './components/AboutUs';
import DoughnutChart from './components/DoughnutChart';
import StocksNews from './components/StocksNews';
import Demo from './components/Demo';
import Footer from './components/Footer';
import Login from './components/LoginContainer';
import Signup from './components/Signup';
import StockList from './components/StockList';
import WalletContainer from './components/Wallet';



const App = () => {
  return (
    <AnimatePresence mode='wait'>

      <div className="w-screen sm:h-full md:h-screen flex flex-col bg-primary">
        <Header />

        <main className="mt-24 p-8 w-full">
          <Routes>
            <Route path="/*" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/dash" element={<DoughnutChart />} />
            <Route path="/news" element={<StocksNews />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/stock-list" element={<StockList />} />
            <Route path="/wallet" element={<WalletContainer />} />









          </Routes>
        </main>
        <Footer />
      </div>

    </AnimatePresence>
  );
};

export default App