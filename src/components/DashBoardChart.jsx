import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import { useRef } from 'react';
import { Chart, ArcElement } from 'chart.js';
import { Wall } from './Wallet-provider';

Chart.register(ArcElement);
// const {balance,setBalance, stocks,setStocks, bonds,setBonds, mfund,setMfund, crypto,setCrypto}= Wall();

const data = {
  labels: ['Stocks', 'Bonds', 'Mutual Funds', 'Crypto'],
  datasets: [
    {
      label: '# of Votes',
      data: [4,6,5, 9],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#000000'],
      borderWidth: 3,
    },
  ],
};
//console.log(stocks);
const options = {
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        boxWidth: 15,
        font: {
          size: 12,
        },
      },
    },
  },

  onClick: (event, chartElement) => {
    if (chartElement.length > 0) {
      console.log('Clicked on graph section:', chartElement[0].index);
    }
  },
};

const DashBoardChart = () => {
    
  const chartRef = useRef();
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
    <h2 className="text-lg font-semibold mb-4">Investment Distribution</h2>
    <Doughnut
      className="flex items-center w-full"
      ref={chartRef}
      data={data}
      options={options}
      
    />
  </div>
  )
}

export default DashBoardChart