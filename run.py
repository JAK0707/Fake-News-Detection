from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_ollama import OllamaLLM
from langchain.chains import RetrievalQA
from langchain.agents import initialize_agent, AgentType, Tool
from langchain_community.utilities import SerpAPIWrapper
from dotenv import load_dotenv
import os

# Load environment
load_dotenv()

# Embeddings & FAISS index
embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
persist_path = "./index"
vectorstore = FAISS.load_local(
    persist_path,
    embeddings=embedding_model,
    index_name="index",
    allow_dangerous_deserialization=True
)

# Load LLM
llm = OllamaLLM(model="gemma3:1b")

# Tools
retriever = vectorstore.as_retriever()
qa_chain = RetrievalQA.from_chain_type(llm=llm, retriever=retriever, return_source_documents=True)
search = SerpAPIWrapper()  # uses your SERPAPI_API_KEY from .env

tools = [
    Tool(
        name="News RAG QA",
        func=lambda q: qa_chain.invoke(q)['result'],
        description="Answers from news dataset"
    ),
    Tool(
        name="Web Search",
        func=search.run,
        description="Real-time search using SerpAPI"
    ),
]


# Agent setup
agent = initialize_agent(tools, llm, agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION, verbose=True)

# Query
query = "Was the 2020 election really fraudulent?"
response = agent.run(query)

print("\n🧠 Final Answer:")
print(response)
