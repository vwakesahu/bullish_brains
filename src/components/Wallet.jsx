import React from 'react';

const WalletContainer = () => {



  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <div className="flex justify-between items-center ">
        <h2 className="text-lg font-semibold">Wallet</h2>
       
      </div>
      <div className="flex justify-between items-center">
        <p className="text-gray-600">Balance:</p>
        <p className="text-gray-800">$10,000</p>
      </div>
    
    </div>
  );
};

export default WalletContainer;
