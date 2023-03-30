import React from 'react'
import { Authprovider } from './Stock-list provider';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { Box, Text } from '@chakra-ui/react';
import Loader from './Loader'
import { Wall } from './Wallet-provider';

const Charts = () => {
  const {stockName , setStockName , cname, setCname}= Authprovider();
  const {balance,setBalance, stocks,setStocks, bonds,setBonds, mfund,setMfund, crypto,setCrypto}=Wall();
  const tickerName = Authprovider();
    console.log(stockName);   
    console.log(tickerName);
     
  const [data, setData] = useState(null);
  const [pdate,setPdate]=useState(null);

  let stockprice;

  useEffect(() => {
    const fetchData = async () => {
      const apikey='YYGFPGKNWVMLOYMK'
      
      // let apiurl=`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockName}&outputsize=full&apikey=${apikey}`
      let apiurl=`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockName}&outputsize=full&apikey=${apikey}`

      const result = await axios.get(
        apiurl
      );
      setData(result.data['Time Series (Daily)']);
      setPdate(result.data['Meta Data']['3. Last Refreshed']);
    };
    fetchData();
  }, []);

  const chartData = {
    labels: data ? Object.keys(data).sort() : [],
    datasets: [
      {
        label: `${stockName} Stock Price`,
        data: data
          ? Object.keys(data)
            .sort()
            .map((date) => {
              return {
                x: date,
                y: parseFloat(data[date]['1. open']),
              };
            })
          : [],
        fill: false,
        backgroundColor: 'rgba(255, 221, 65, 0.2)',
        borderColor: '#ffc107',
        pointRadius: 0,
      },
    ],
  };

  const options = {
    maintainAspectRatio: true,
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          font: {
            size: 16,
          },
          color: '#333',
        },
      },
      tooltip: {
        displayColors: false,
        titleFont: {
          size: 16,
          weight: 'bold',
        },
        bodyFont: {
          size: 14,
        },
        padding: {
          top: 10,
          bottom: 10,
          left: 10,
          right: 10,
        },
      },
    },
    scales: {
      x: {
        type: 'time',
        adapters: {
          date: require('chartjs-adapter-date-fns'),
        },
        time: {
          unit: 'day',
          displayFormats: {
            day: 'MMM d',
          },
        },
        ticks: {
          color: '#333',
        },
        grid: {
          color: '#eee',
        },
      },
      y: {
        ticks: {
          callback: function (value) {
            return value;
          },
          color: '#333',
        },
        grid: {
          color: '#eee',
        },
      },
    },
  };

  const buyClick = () =>{
    if(stockprice>balance)
    {
      //not able to purchase
    }
    else{
      setBalance(balance-stockprice);
      //stock evaluation++
    }
  }

  const sellClick = () =>{
    setBalance(balance+stockprice);
    //stock evaluation--
  }
  return (
    <div className="flex space-y-4">
      
  {!data ? (
    <div className="flex items-center justify-center h-full">
      <Loader />
    </div>
  ) : (
    <div className='justify-between'>
      <div className='flex w-screen md:w-1/2'>
      
        {cname} 
        <button
      className='bg-red-100'
      onClick={buyClick}
    >
      BUY
    </button>
    <button
      className='bg-green-100'
      onClick={sellClick}
    >
      SELL
    </button>
        <Line data={chartData} options={options} className="w-1/2 md:w-1/2 " />
      </div>
      
    </div>
  )}


</div>

  )
}

export default Charts;



