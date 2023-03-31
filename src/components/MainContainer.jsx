import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { Box, Text, Button } from '@chakra-ui/react';
import Loader from './Loader'
const MainContainer = () => {

  
  let stockname='AAPL'

  
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const apikey='YYGFPGKNWVMLOYMK'
      
      let apiurl=`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockname}&outputsize=full&apikey=${apikey}`
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
        label: 'Reliance Stock Price',
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
        text: 'Reliance Industries Ltd. (RELIANCE.BSE)',
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
    <div className="grid grid-cols-12 h-screen">
      <div className="col-span-3 flex items-center justify-center">
        <Box className="flex flex-col items-center justify-center" borderRadius="md" boxShadow="md" p={4} w="90%">
          
          <Box className="flex-col justify-between w-full">
            <Box className="ml-11 w-1/2 p-4 bg-green-500 rounded-md shadow-md">
              <Text fontSize="lg" fontWeight="bold" color="#333" mb={2}>
                Buy
              </Text>
              <Button colorScheme="red" size="sm" fontSize="lg" fontWeight="bold" color="#fff" mb={2}>
                Buy Now
              </Button>
            </Box>
            <Box className="ml-11 w-1/2 p-4 bg-red-500 rounded-md shadow-md mt-5">
              <Text fontSize="lg" fontWeight="bold" color="#333" mb={2}>
                Sell
              </Text>
              <Button  colorScheme="red" size="sm" fontSize="lg" fontWeight="bold" color="#fff">
                Sell Now
              </Button>
            </Box>
          </Box>
        </Box>
      </div>
      <div className="col-span-8 flex items-center justify-center">
        {!data ? (
          <div className="flex items-center justify-center h-full">
            <Loader />
          </div>
        ) : (
          <Box className="flex flex-col items-center justify-center mr10" borderRadius="md" boxShadow="md" p={4} w="100%">
            
           
            <Line data={chartData} options={options} className="w-full" />
          </Box>
        )}
      </div>
    </div>
  )
  
  
  
}

export default MainContainer