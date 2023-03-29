import React from 'react'
import { Authprovider } from './StockList'

const Chart = () => {
    const stk=Authprovider();
    console.log(stk.stockName);
  return (
    <div>
        {stk.stockName}
    </div>
  )
}

export default Chart;