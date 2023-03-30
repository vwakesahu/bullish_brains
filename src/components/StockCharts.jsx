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

const Charts = () => {
  const {stockName , setStockName , cname, setCname}= Authprovider();
  const tickerName = Authprovider()
    console.log(stockName);   
    console.log(tickerName);
     
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const apikey='YYGFPGKNWVMLOYMK'
      
      // let apiurl=`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockName}&outputsize=full&apikey=${apikey}`
      let apiurl=`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockName}&outputsize=full&apikey=${apikey}`

      const result = await axios.get(
        apiurl
      );
      setData(result.data['Time Series (Daily)']);
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




  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {!data ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-end w-full md:w-1/2">
          
          <Line data={chartData} options={options} className="w-full" />
          <div className="flex items-center mb-4">
            <div className="text-lg px-3 py-2">{cname}</div>
            <button className="bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600 transition-colors duration-300">
              BUY
            </button>
          </div> 
        </div>
      )}
    </div>
  );
  
}

export default Charts;



