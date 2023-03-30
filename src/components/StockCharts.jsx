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
  const {stockName , setStockName}= Authprovider();
  const tickerName = Authprovider()
    console.log(stockName);   
    console.log(tickerName);
     
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const apikey='YYGFPGKNWVMLOYMK'
      
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
      title: {
        display: true,
        text: `${stockName} Stock Price`,
        font: {
          size: 24,
          weight: 'bold',
        },
        color: '#333',
        padding: {
          top: 30,
          bottom: 10,
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
    <div className="flex flex-col items-center justify-center space-y-4 h-screen">
      {!data ? (
        <div className="flex items-center justify-center h-full">
          <Loader />
        </div>
      ) : (
        <Box className=" flex-col items-center justify-center" borderRadius="md" boxShadow="md" p={4} w="45%">
        
        
        <Line data={chartData} options={options} className="w-full" />
      </Box>
      )}
    </div>
  )
}

export default Charts;



