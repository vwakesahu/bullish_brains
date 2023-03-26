import { useEffect, useState } from 'react';

const StockNews = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=caebaeac5a464f6fb12726af7592181e'
        );
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Latest Stock News</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.url} className="mb-4">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-medium hover:underline"
            >
              {article.title}
            </a>
            <p className="text-gray-500 text-sm">{article.description}</p>
            <div className="text-gray-600 text-sm">
              {new Date(article.publishedAt).toLocaleDateString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockNews;
