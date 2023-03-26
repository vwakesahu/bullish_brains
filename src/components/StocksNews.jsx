import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import SearchImg from '../img/search.png';

const API_KEY = 'caebaeac5a464f6fb12726af7592181e';

function StockNews() {
  const [query, setQuery] = useState('');
  const [articles, setArticles] = useState([]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        setArticles(data.articles);
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">News</h1>

      <form onSubmit={handleSubmit} className="relative mb-8">
        <input
          className="block w-full rounded-full py-3 pl-10 pr-4 text-gray-900 placeholder-gray-500 bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-white focus:placeholder-gray-400 sm:text-sm sm:leading-5"
          type="text"
          placeholder="Search news"
          aria-label="Search news"
          value={query}
          onChange={handleInputChange}
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="h-5 w-5 text-gray-400" />
        </div>
        <button
          type="submit"
          className="absolute inset-y-0 right-0 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold tracking-wide rounded-full transition duration-150 ease-in-out focus:outline-none focus:shadow-outline"
        >
          Search
        </button>
      </form>

      {articles.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <div key={article.url} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img className="w-full h-48 object-cover object-center" src={article.urlToImage} alt={article.title} />

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
      ) : (
        <div className="flex flex-col items-center justify-center h-96">
          <p className="text-2xl font-bold text-gray-700">No articles found</p>
          <p className="text-gray-700">Try searching for news related to stocks.</p>
        </div>
      )}
    </div>
  );
}

export default StockNews;
