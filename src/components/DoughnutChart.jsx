import { Doughnut } from 'react-chartjs-2';
import { useRef } from 'react';
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);

const data = {
  labels: ['Stocks', 'Bonds', 'Mutual Funds', 'Crpto'],
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
    <div >
      <div>
        <Doughnut className="flex items-center w-full sm:w-3/4 md:w-1/2 lg:max-w-lg mt-9" ref={chartRef} data={data} />
      </div>
    </div>
  );
};

export default DoughnutChart;
