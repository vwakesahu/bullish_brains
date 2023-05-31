import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Loader from './Loader';
import { Box } from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';

const Demo = () => {


  
  let stockname='NIFTY_50'

  
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
        label: 'Apple Inc',
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
        text: 'Apple Inc',
        font: {
          size: 25,
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
          size: 12,
          weight: 'bold',
        },
        bodyFont: {
          size: 10,
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
    <div className="relative h-screen gap-2">
      {/* Top Left Container */}
      <div className="absolute shadow-lg top-0 left-0 h-1/2 w-1/2 bg-gray-200 flex flex-col items-center justify-center rounded-lg">
      {!data ? (
          <div className="flex items-center justify-center h-full">
            <Loader />
          </div>
        ) : (
          <Box className="flex flex-col items-center justify-center" borderRadius="md" boxShadow="md" p={4} w="100%">
            
           
            <Line data={chartData} options={options} className="w-full" />
          </Box>
        )}
      </div>


      {/* Bottom Left Container */}
      <div className="py-5 m-2 bottom-0 left-0 h-1/2 w-1/2 bg-gray-200 flex items-center justify-center">
        <h1 className="text-lg font-bold">Bottom Left Container</h1>
      </div>

      {/* Bottom Right Container */}
      <div className="absolute bottom-0 right-0 h-1/4 w-1/4 bg-gray-500 flex items-center justify-center">
        <h1 className="text-lg font-bold">Bottom Right Container</h1>
      </div>
    </div>
  );
}

export default Demo