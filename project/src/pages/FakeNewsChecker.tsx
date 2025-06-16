import React, { useState } from 'react';
import { Shield, AlertCircle, CheckCircle, XCircle, Loader, ExternalLink } from 'lucide-react';

interface AnalysisResult {
  verdict: 'real' | 'fake' | 'uncertain';
  confidence: number;
  reasoning: string;
  sources: Array<{
    title: string;
    snippet: string;
    url: string;
  }>;
}

const FakeNewsChecker = () => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('http://localhost:8000/api/fake-news-check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: input }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while checking the news');
    } finally {
      setIsLoading(false);
    }
  };

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'real': return 'text-green-700 bg-green-100 border-green-200';
      case 'fake': return 'text-red-700 bg-red-100 border-red-200';
      case 'uncertain': return 'text-yellow-700 bg-yellow-100 border-yellow-200';
      default: return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case 'real': return CheckCircle;
      case 'fake': return XCircle;
      case 'uncertain': return AlertCircle;
      default: return Shield;
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
            <Shield className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Fake News Detector
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Submit a news headline or article for AI-powered fact-checking with supporting evidence from trusted sources.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="news-input" className="block text-sm font-medium text-gray-700 mb-2">
                News Content to Verify
              </label>
              <textarea
                id="news-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste a news headline, article excerpt, or claim you want to fact-check..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
                rows={6}
                disabled={isLoading}
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="w-full flex items-center justify-center px-6 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:transform-none"
            >
              {isLoading ? (
                <>
                  <Loader className="h-5 w-5 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Shield className="h-5 w-5 mr-2" />
                  Check for Misinformation
                </>
              )}
            </button>
          </form>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
            <div className="flex items-center">
              <XCircle className="h-6 w-6 text-red-500 mr-3" />
              <div>
                <h3 className="text-lg font-medium text-red-800">Error</h3>
                <p className="text-red-600 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {result && (
          <div className="space-y-6">
            {/* Verdict */}
            <div className={`border rounded-2xl p-6 ${getVerdictColor(result.verdict)}`}>
              <div className="flex items-center mb-4">
                {React.createElement(getVerdictIcon(result.verdict), {
                  className: "h-8 w-8 mr-3"
                })}
                <div>
                  <h2 className="text-2xl font-bold capitalize">
                    {result.verdict === 'real' ? 'Likely True' : 
                     result.verdict === 'fake' ? 'Likely False' : 'Uncertain'}
                  </h2>
                  <p className="text-sm opacity-75">
                    Confidence: {Math.round(result.confidence * 100)}%
                  </p>
                </div>
              </div>
              <p className="text-base leading-relaxed">
                {result.reasoning}
              </p>
            </div>

            {/* Supporting Sources */}
            {result.sources && result.sources.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Supporting Evidence
                </h3>
                <div className="space-y-4">
                  {result.sources.map((source, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {source.title}
                      </h4>
                      <p className="text-gray-600 mb-3 leading-relaxed">
                        {source.snippet}
                      </p>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                      >
                        Read Full Article
                        <ExternalLink className="h-4 w-4 ml-1" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tips */}
        <div className="mt-12 bg-blue-50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Tips for Better Results
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Include complete headlines or substantial article excerpts</li>
            <li>• Provide context when possible (date, source, etc.)</li>
            <li>• For best results, submit claims that can be fact-checked</li>
            <li>• Review supporting sources for additional verification</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FakeNewsChecker;