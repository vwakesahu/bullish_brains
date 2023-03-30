
import React from 'react';
import DashBoardChart from './DashBoardChart';
import DashboardWallet from './DashboardWallet';





const Dashboard = () => {

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 h-full">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
    {/* chart container */}
    <div className="h-full">
      <DashBoardChart />
    </div>
    
    {/* wallet container */}
    <div className="h-full">
      <DashboardWallet />
    </div>
  </div>
</div>




  );
};

export default Dashboard;



{/* <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* //chart container */}
    //<DashBoardChart />
    



    {/* //wallet container */}
    //<DashboardWallet />
    //  </div>
   // </div> */}