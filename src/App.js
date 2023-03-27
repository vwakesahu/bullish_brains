import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components';
import CreateContainer from './components/CreateContainer';
import MainContainer from './components/MainContainer';
import { AnimatePresence } from "framer-motion";
import AboutUs from './components/AboutUs';
import DoughnutChart from './components/DoughnutChart';
import StocksNews from './components/StocksNews';
import Chart from './components/Demo';



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
            <Route path="/demo" element={<Chart />} />




          </Routes>
        </main>
      </div>

    </AnimatePresence>
  );
};

export default App