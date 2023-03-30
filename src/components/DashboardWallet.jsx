import React from 'react'

const DashboardWallet = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg flex font-semibold">Wallet</h2>
        <div className=""><p className="text-lg flex font-semibold">Balance: <span className="text-lg flex font-semibold text-red-500">&nbsp;$10,000</span></p></div>
      </div>
      <div className="flex justify-between items-center">

      </div>

      <div className="flex justify-between items-center mb-4 mt-2">
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
          <p className="text-sm">Stocks</p>
        </div>
        <p className="text-lg font-semibold">$4,000</p>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
          <p className="text-sm">Bonds</p>
        </div>
        <p className="text-lg font-semibold">$2,000</p>
      </div>



      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div>
          <p className="text-sm">Mutual Funds</p>
        </div>
        <p className="text-lg font-semibold">$3,000</p>
      </div>



      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-black mr-2"></div>
          <p className="text-sm">Crypto</p>
        </div>
        <p className="text-lg font-semibold">$9,000</p>
      </div>



    </div>
  )
}

export default DashboardWallet