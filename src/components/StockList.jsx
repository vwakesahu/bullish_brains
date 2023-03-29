import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Authprovider } from './Stock-list provider';
import { useNavigate } from 'react-router-dom';

const Table = () => {
  
  const {stockName , setStockName}= Authprovider();
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
    <div>
      <input type="text" placeholder="Search ticker name" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Ticker</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Open</th>
            <th className="px-4 py-2">Close</th>
          </tr>
        </thead>
        <tbody>
          {filteredAggs.slice(0, 20).map((agg) => {
            const ticker = tickers.find(
              (ticker) => ticker.ticker === agg.T
            );
            return (
              <tr key={agg.T}>
                <td className="border px-4 py-2"onClick={() =>{
                  
                }}><button type="submit" onClick={() =>{
                  setStockName(agg.T);
                  navigate('/chart');
                  }}>{agg.T}</button></td>
                <td className="border px-4 py-2"> <a href={`https://finance.yahoo.com/quote/${agg.T}`} target="_blank" rel="noopener noreferrer">{ticker ? ticker.name : '-'}</a></td>
                <td className="border px-4 py-2">{agg.o}</td>
                <td className="border px-4 py-2">{agg.c}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;