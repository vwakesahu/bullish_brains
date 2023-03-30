import React, { useState } from "react";
import { Wall } from "./Wallet-provider";

const WalletContainer = () => {

  const {balance,setBalance, stocks,setStocks, bonds,setBonds, mfund,setMfund, crypto,setCrypto}=Wall();

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg flex font-semibold">Wallet</h2>
        <div className=""><p className="text-lg flex font-semibold">Balance: <span className="text-lg flex font-semibold text-red-500">&nbsp;${balance}</span></p></div>
      </div>
      <div className="flex justify-between items-center">

      </div>

      <div className="flex justify-between items-center mb-4 mt-2">
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
          <p className="text-sm">Stocks</p>
        </div>
        <p className="text-lg font-semibold">${stocks}</p>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
          <p className="text-sm">Bonds</p>
        </div>
        <p className="text-lg font-semibold">${bonds}</p>
      </div>



      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div>
          <p className="text-sm">Mutual Funds</p>
        </div>
        <p className="text-lg font-semibold">${mfund}</p>
      </div>



      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-black mr-2"></div>
          <p className="text-sm">Crypto</p>
        </div>
        <p className="text-lg font-semibold">${crypto}</p>
      </div>



    </div>
  )
}

export default WalletContainer