import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Authprovider } from './Stock-list provider';
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';

const Table = () => {

  const { stockName , setStockName , cname, setCname } = Authprovider();
  const navigate = useNavigate();
  const [tickers, setTickers] = useState([]);
  const [aggs, setAggs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  

  useEffect(() => {


    const fetchData = async () => {
      const tickersResponse = await axios.get(
        'https://api.polygon.io/v3/reference/tickers?active=true&apiKey=puzbSbBx44p10VJ5UfWO34IIkz6wi1bI'
      );
      const aggsResponse = await axios.get(
        'https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/2023-01-09?adjusted=true&apiKey=dEtCpQpVDpWNpxRiBBawg4AJDVABf4_b'
      );

      const commonTickers = aggsResponse.data.results.map((agg) => agg.T).filter((ticker) => {
        return tickersResponse.data.results.some((t) => t.ticker === ticker);
      });

      const commonTickersData = tickersResponse.data.results.filter((t) => commonTickers.includes(t.ticker));

      setTickers(commonTickersData);
      setAggs(aggsResponse.data.results);
    };

    fetchData();
  }, []);

  const filteredAggs = aggs.filter((agg) => {
    const ticker = tickers.find((t) => t.ticker === agg.T);
    return ticker && ticker.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="w-full max-w-screen-xl mx-auto">
  <div className="flex flex-col items-center justify-center">
    <input
      type="text"
      placeholder="Search ticker name"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full md:w-1/2 p-2 rounded-lg shadow-lg"
    />
  </div>

  <div className="-mx-2 mt-8">
    <div className="overflow-x-auto">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-2 py-2 text-left text-gray-600 uppercase">Ticker</th>
            <th className="px-2 py-2 text-left text-gray-600 uppercase">Name</th>
            <th className="px-2 py-2 text-left text-gray-600 uppercase">Open</th>
            <th className="px-2 py-2 text-left text-gray-600 uppercase">Close</th>

          </tr>
        </thead>
        <tbody>
          {filteredAggs.slice(0, 20).map((agg) => {
            const ticker = tickers.find(
              (ticker) => ticker.ticker === agg.T
            );
            return (
              <tr key={agg.T} className="bg-white">
                <td className="px-2 py-2 border-b border-gray-200" onClick={() => {

                }}>
                  <button
                    type="submit"
                    onClick={() => {
                      setStockName(agg.T);
                      setCname(ticker.name);
                      navigate('/chart');
                    }}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    {agg.T}
                  </button>
                </td>
                <td className="px-2 py-2 border-b border-gray-200">{ticker.name}</td>
                <td className="px-2 py-2 border-b border-gray-200">{agg.o}</td>
                <td className="px-2 py-2 border-b border-gray-200 flex">{
                  agg.c > agg.o && (

                    
                      <AiOutlineArrowUp className='text-green-600' />
                   

                  )}{

                  agg.c < agg.o && (

                    
                      <AiOutlineArrowDown className='text-red-600'/>
                    

                  )

                }&nbsp;&nbsp;&nbsp;{agg.c}</td> 
                <td className="px-2 py-2 border-b border-gray-200"></td> 
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
</div>

  

  );
};

export default Table;