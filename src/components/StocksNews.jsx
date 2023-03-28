import React, { useState, useEffect } from 'react';

const NEWS_API_KEY = 'caebaeac5a464f6fb12726af7592181e';
const POLYGON_API_KEY = 'puzbSbBx44p10VJ5UfWO34IIkz6wi1bI';

function StockPrice() {
  const [news, setNews] = useState([]);
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    // Fetch news data
    fetch(`https://newsapi.org/v2/everything?q=stocks&sources=bbc-news&apiKey=${NEWS_API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        setNews(data.articles);
      });

    // Fetch trades data
    fetch(`https://api.polygon.io/v3/reference/tickers/AAPL/trades?limit=50&apiKey=${POLYGON_API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        setTrades(data.results);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">

      {news.length > 0 && (
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Latest news</h1>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {news.map((article) => (
              <div key={article.url} className="bg-white shadow-md rounded-lg overflow-hidden">
                <img
                  className="w-full h-48 object-cover object-center"
                  src={article.urlToImage}
                  alt={article.title}
                />

                <div className="p-4">
                  <h2 className="text-lg font-bold mb-2">{article.title}</h2>
                  <p className="text-gray-700 text-base">{article.description}</p>

                  <a
                    href={article.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Read More
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {trades.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Latest trades</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Exchange
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {trades.map((trade) => (
                <tr key={trade.iexId}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{trade.price}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{trade.size}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {trade.exchange}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trade.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>)}
        </div>
    
)
              }
export default StockPrice;