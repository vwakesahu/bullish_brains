import React from 'react'
import { Authprovider } from './Stock-list provider';
import { Box, Text, Button } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import Loader from './Loader'
import { Wall } from './Wallet-provider';

const Charts = () => {


  const { stockName, setStockName, cname, setCname } = Authprovider();
  const { balance, setBalance, stocks, setStocks, bonds, setBonds, mfund, setMfund, crypto, setCrypto } = Wall();
  const tickerName = Authprovider();
  const [data, setData] = useState(null);
  const [pdate, setPdate] = useState(null);

  let stockprice;

  console.log(stockName);
  console.log(tickerName);

  useEffect(() => {
    const fetchData = async () => {
      const apikey = 'YYGFPGKNWVMLOYMK'

      // let apiurl=`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockName}&outputsize=full&apikey=${apikey}`
      let apiurl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockName}&outputsize=full&apikey=${apikey}`

      const result = await axios.get(
        apiurl
      );
      setData(result.data['Time Series (Daily)']);
      setPdate(parseFloat(result.data['Time Series (Daily)'][Object.keys(result.data['Time Series (Daily)'])[0]]['4. close']));
      console.log(pdate);
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
        text: `${cname}`,
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

  const buyClick = () => {
    if (stockprice > balance) {
      //not able to purchase
    }
    else {
      setBalance(balance - stockprice);
      //stock evaluation++
    }
  }

  const sellClick = () => {
    setBalance(balance + stockprice);
    //stock evaluation--
  }
  return (
    <div className="grid grid-cols-12 items-center justify-center mb-64 mt-6">
      <div className="col-span-3 flex items-center justify-center">
        <Box className="flex flex-col items-center justify-center" borderRadius="md" boxShadow="md" p={4} w="90%">
          <Box className="flex-col justify-between w-full mt-4">
            <Text className='text-headingColor text-3xl font-bold relative' fontSize="lg" fontWeight="bold" color="#333" mb={2}>
              Current Price: <span className='text-red-600'> ${pdate}</span>

            </Text>
          </Box>

          <Box className="flex-col justify-between w-full mt-4">
            <Box className="w-full p-4 bg-green-500 rounded-md shadow-md">
              <Text fontSize="lg" fontWeight="bold" color="#333" mb={2}>
                Buy
              </Text>
              <Button colorScheme="red" size="sm" fontSize="lg" fontWeight="bold" color="#fff" mb={2}>
                Buy Now
              </Button>
            </Box>
            <Box className="w-full p-4 bg-red-500 rounded-md shadow-md mt-4">
              <Text fontSize="lg" fontWeight="bold" color="#333" mb={2}>
                Sell
              </Text>
              <Button colorScheme="red" size="sm" fontSize="lg" fontWeight="bold" color="#fff">
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
          <div className="flex flex-col items-center justify-center ml-8 rounded-md shadow-md p-4 w-full">
            <Line data={chartData} options={options} className="w-full" />
          </div>

        )}
      </div>
    </div>
  );

}

export default Charts;


