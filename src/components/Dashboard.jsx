import { Doughnut } from 'react-chartjs-2';
import { useRef } from 'react';
import { Chart, ArcElement } from 'chart.js';
import React from 'react';
import WalletContainer from './WalletContainer';

Chart.register(ArcElement);

const data = {
  labels: ['Stocks', 'Bonds', 'Mutual Funds', 'Crypto'],
  datasets: [
    {
      label: '# of Votes',
      data: [4, 2, 3, 9],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#000000'],
      borderWidth: 3,
    },
  ],
};

const DoughnutChart = () => {
  const chartRef = useRef();

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Investment Distribution</h2>
      <Doughnut
        className="flex items-center w-full sm:w-3/4 md:w-1/2 lg:max-w-lg"
        ref={chartRef}
        data={data}
      />
    </div>
  );
};



const Dashboard = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DoughnutChart />
        <WalletContainer />
      </div>
    </div>
  );
};

export default Dashboard;
