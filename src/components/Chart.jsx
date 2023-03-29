import React from 'react'
import { Authprovider } from './Stock-list provider';

const Chart = () => {
  const {stockName , setStockName}= Authprovider();
    console.log(stockName);
  return (
    <div>
        {stockName}
    </div>
  )
}

export default Chart;