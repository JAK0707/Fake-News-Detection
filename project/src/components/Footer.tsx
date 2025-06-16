import React from 'react';
import { Shield, Github, Mail, Globe } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">TruthGuard</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              AI-powered fact-checking and news verification platform. 
              Fighting misinformation with advanced technology and real-time analysis.
            </p>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/fake-news-checker" className="hover:text-white transition-colors">
                  Fake News Detection
                </a>
              </li>
              <li>
                <a href="/live-news-search" className="hover:text-white transition-colors">
                  Live News Search
                </a>
              </li>
              <li className="text-gray-500">AI-Powered Analysis</li>
              <li className="text-gray-500">Real-time Verification</li>
            </ul>
          </div>

          {/* Technology */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Technology</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="text-gray-500">Local AI Processing</li>
              <li className="text-gray-500">FAISS Vector Search</li>
              <li className="text-gray-500">Ollama Integration</li>
              <li className="text-gray-500">SerpAPI Integration</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <a
                href="mailto:contact@truthguard.ai"
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>Contact Us</span>
              </a>
              <a
                href="https://github.com/yourusername/truthguard"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </a>
              <div className="flex items-center space-x-2 text-gray-400">
                <Globe className="h-4 w-4" />
                <span>Worldwide Coverage</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} TruthGuard. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>About</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;