import pandas as pd
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings
import os

# Load dataset
df = pd.read_csv("./data/news_dataset.csv")
df = df[["title", "real"]].dropna()
df["content"] = df["title"].apply(str)

# Convert to LangChain format
from langchain_core.documents import Document
documents = [Document(page_content=row["content"], metadata={"label": row["real"]}) for _, row in df.iterrows()]

# Embedding model
embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

# Build FAISS index
db = FAISS.from_documents(documents, embedding_model)
db.save_local("./index", index_name="index")

print("✅ FAISS vectorstore built and saved.")
