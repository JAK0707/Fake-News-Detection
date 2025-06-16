# TruthGuard - AI-Powered Fake News Detection & Live News Search

A comprehensive full-stack application for detecting misinformation and searching live news using advanced AI technology and real-time data sources.

## 🚀 Features

- **AI-Powered Fact Checking**: Advanced LLM analysis with supporting evidence from trusted sources
- **Live News Search**: Real-time news search across multiple trusted news sources  
- **Local AI Processing**: Uses Ollama for privacy-focused AI analysis
- **RAG Implementation**: FAISS vectorstore with sentence-transformers for evidence retrieval
- **Modern UI**: Beautiful, responsive React interface with Tailwind CSS
- **Production Ready**: Proper error handling, loading states, and professional design

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Lucide React** for icons

### Backend  
- **FastAPI** for high-performance API
- **Ollama** for local LLM processing
- **FAISS** for vector similarity search
- **SerpAPI** for live news search
- **Python 3.8+**

## 🏃‍♂️ Quick Start

### Prerequisites

1. **Node.js** (v16+)
2. **Python** (v3.8+)
3. **Ollama** installed and running locally

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd fake-news-detection-app
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   cp backend/.env.example backend/.env
   # Edit backend/.env with your API keys
   ```

5. **Start Ollama (in a separate terminal)**
   ```bash
   ollama serve
   # Pull a model if you haven't already
   ollama pull llama2
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

2. **Start the frontend development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## 📋 Environment Variables

Create a `.env` file in the `backend/` directory:

```env
SERPAPI_API_KEY=your_serpapi_key_here
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama2

# Optional: For future cloud LLM integration
# OPENAI_API_KEY=your_openai_key_here
# ANTHROPIC_API_KEY=your_anthropic_key_here
```

## 🔧 API Endpoints

### POST `/api/fake-news-check`
Analyzes text for potential misinformation using local AI and RAG.

**Request:**
```json
{
  "text": "News headline or article to verify"
}
```

**Response:**
```json
{
  "verdict": "real|fake|uncertain",
  "confidence": 0.85,
  "reasoning": "Detailed analysis explanation",
  "sources": [
    {
      "title": "Supporting Article Title",
      "snippet": "Relevant excerpt",
      "url": "https://source-url.com"
    }
  ]
}
```

### POST `/api/news-search`  
Searches for live news using SerpAPI.

**Request:**
```json
{
  "query": "search topic"
}
```

**Response:**
```json
{
  "results": [
    {
      "title": "News Article Title",
      "snippet": "Article preview",
      "url": "https://news-url.com",
      "source": "News Source Name",
      "date": "2024-01-15"
    }
  ]
}
```

## 🧩 Implementation Guide

The current implementation provides a complete frontend and backend structure with mock responses. To complete the integration:

1. **Add your RAG + Ollama logic** to `/api/fake-news-check` endpoint
2. **Add your SerpAPI integration** to `/api/news-search` endpoint  
3. **Set up FAISS vectorstore** with your knowledge base
4. **Configure sentence-transformers** for embeddings

### Recommended RAG Implementation

```python
# Example structure for fake news detection
async def analyze_with_rag(text: str):
    # 1. Generate embeddings for input text
    # 2. Query FAISS vectorstore for similar content
    # 3. Send context + query to Ollama
    # 4. Parse response and extract verdict + reasoning
    # 5. Return structured response
```

## 🎨 UI Components

The application includes professionally designed components:

- **Navigation**: Responsive navbar with active states
- **Hero Section**: Compelling landing page with clear CTAs
- **Forms**: User-friendly input forms with validation
- **Results**: Clean presentation of AI analysis and news results
- **Loading States**: Professional loading indicators
- **Error Handling**: User-friendly error messages

## 🚀 Deployment

### Local Development
```bash
# Terminal 1: Start Ollama
ollama serve

# Terminal 2: Start backend
cd backend && uvicorn main:app --reload

# Terminal 3: Start frontend  
npm run dev
```

### Production Deployment
1. Build the frontend: `npm run build`
2. Deploy backend with proper environment variables
3. Ensure Ollama is accessible (or migrate to cloud LLM)
4. Configure CORS for your production domain

## 🔄 Cloud LLM Migration

The codebase is designed for easy migration to cloud LLMs:

1. **OpenAI**: Replace Ollama calls with OpenAI API
2. **Anthropic**: Use Claude API instead of local processing  
3. **Hugging Face**: Integrate HF Inference API
4. **Environment**: Simply update `.env` variables

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For questions or support, please open an issue on GitHub or contact us at contact@truthguard.ai.

---

**Built with ❤️ using React, FastAPI, and Ollama**