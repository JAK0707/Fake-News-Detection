from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.docstore.document import Document
import pandas as pd
import os

# Load WELFake dataset
df = pd.read_csv("data/WELFake.csv").dropna()
df = df[["title", "text", "label"]]  # Correct lowercase column names

# Create documents from title + text
documents = [
    Document(page_content=f"{row['title']}. {row['text']}", metadata={"label": row["label"]})
    for _, row in df.iterrows()
]

# Split documents into chunks
splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
splits = splitter.split_documents(documents)

# Load embedding model
embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

# Build vector DB with FAISS
vector_db = FAISS.from_documents(splits, embedding_model)

# Save the vector DB locally
os.makedirs("vector_db", exist_ok=True)
vector_db.save_local("vector_db")

print("✅ Vector DB built and saved to ./vector_db")
