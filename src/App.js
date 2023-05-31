import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components';
import CreateContainer from './components/CreateContainer';
import MainContainer from './components/MainContainer';
import { AnimatePresence } from "framer-motion";
import AboutUs from './components/AboutUs';
import DoughnutChart from './components/Dashboard';
import StocksNews from './components/StocksNews';
import Footer from './components/Footer';
import Login from './components/LoginContainer';
import Signup from './components/Signup';
import WalletContainer from './components/WalletContainer';
import Chart from './components/StockCharts';
import Table from './components/StockList';
import { Authstock } from './components/Stock-list provider';
import { Wallprovider } from './components/Wallet-provider';
import Demo from './components/Demo';
import Dashboard from './components/Dashboard';
import RequiredAuth from './components/RequiredAuth';
import DemoChart from './components/DemoChart';
import AcountContainer from './components/AcountContainer';



const App = () => {
  return (
    <AnimatePresence mode='wait'>
       <Wallprovider>

      <div className="w-screen sm:h-full md:h-screen flex flex-col bg-primary">
        <Header />

        <main className="mt-24 p-8 w-full">
          <Authstock>


           
              <Routes>
              <Route path="/account" element={<RequiredAuth><AcountContainer /></RequiredAuth>} />

                <Route path="/demo-chart" element={<DemoChart />} />
                <Route path="/*" element={<StocksNews />} />
                <Route path="/createItem" element={<CreateContainer />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/dash" element={<RequiredAuth><Dashboard /></RequiredAuth>} />
                <Route path="/news" element={<StocksNews />} />
                <Route path="/login" element={<Login />} />
                <Route path="/sign-up" element={<Signup />} />
                <Route path="/stock-list" element={<Table />} />
                <Route path="/chart" element={<Chart />} />
                <Route path="/wallet" element={<RequiredAuth><WalletContainer /></RequiredAuth>} />
                <Route path="/demo" element={<Demo />} />

              </Routes>
          </Authstock>


        </main>
        <Footer />
      </div>
      </Wallprovider>

    </AnimatePresence>
  );
};

export default App