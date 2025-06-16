import React, { useState } from 'react';
import { Search, ExternalLink, Calendar, Loader, Globe } from 'lucide-react';

interface NewsResult {
  title: string;
  snippet: string;
  url: string;
  source: string;
  date?: string;
}

const LiveNewsSearch = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<NewsResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setResults([]);

    try {
      const response = await fetch('http://localhost:8000/api/news-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResults(data.results || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while searching for news');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4">
            <Search className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Live News Search
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Search for the latest news articles from trusted sources worldwide on any topic.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="search-input" className="block text-sm font-medium text-gray-700 mb-2">
                Search Topic
              </label>
              <div className="relative">
                <input
                  id="search-input"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter a topic, keyword, or news subject..."
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  disabled={isLoading}
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="w-full flex items-center justify-center px-6 py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:transform-none"
            >
              {isLoading ? (
                <>
                  <Loader className="h-5 w-5 mr-2 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="h-5 w-5 mr-2" />
                  Search Latest News
                </>
              )}
            </button>
          </form>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
            <div className="flex items-center">
              <Globe className="h-6 w-6 text-red-500 mr-3" />
              <div>
                <h3 className="text-lg font-medium text-red-800">Search Error</h3>
                <p className="text-red-600 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {results.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Search Results
              </h2>
              <span className="text-sm text-gray-500">
                Found {results.length} articles
              </span>
            </div>

            <div className="grid gap-6">
              {results.map((article, index) => (
                <article key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-start justify-between">
                      <h3 className="text-xl font-semibold text-gray-900 leading-tight flex-1 mr-4">
                        {article.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500 whitespace-nowrap">
                        {article.date && (
                          <>
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(article.date)}
                          </>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {article.snippet}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center text-sm text-gray-500">
                        <Globe className="h-4 w-4 mr-1" />
                        <span className="font-medium">{article.source}</span>
                      </div>
                      
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
                      >
                        Read Article
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Search Tips */}
        <div className="mt-12 bg-green-50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Search Tips
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Use specific keywords for more targeted results</li>
            <li>• Try different phrasings if you don't find what you're looking for</li>
            <li>• Search for recent events, trending topics, or specific subjects</li>
            <li>• Results are sourced from trusted news outlets worldwide</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LiveNewsSearch;