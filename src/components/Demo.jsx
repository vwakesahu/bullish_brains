import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

const StockChart = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=RELIANCE.BSE&outputsize=full&apikey=YYGFPGKNWVMLOYMK'
      );
      setData(result.data['Time Series (Daily)']);
    };
    fetchData();
  }, []);

  const chartData = {
    labels: data ? Object.keys(data).reverse() : [],
    datasets: [
      {
        label: 'Reliance Stock Price',
        data: data
          ? Object.keys(data)
              .reverse()
              .map((date) => {
                return {
                  x: date,
                  y: parseFloat(data[date]['4. close']),
                };
              })
          : [],
        fill: false,
        backgroundColor: '#3f51b5',
        borderColor: '#3f51b5',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          font: {
            size: 16,
          },
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
      },
      y: {
        ticks: {
          callback: function (value, index, values) {
            return '₹' + value;
          },
        },
      },
    },
  };

  return (
    <div>
      {data ? (
        <Line data={chartData} options={options} />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default StockChart;
