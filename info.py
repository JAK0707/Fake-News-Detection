from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.llms import Ollama
from langchain.chains import RetrievalQA
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_ollama import OllamaLLM

llm = OllamaLLM(model="gemma3:1b")


# Load embedding model
embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

# Path where the FAISS index and pickle file are stored
persist_path = "./fakenews_faiss_index"

# Load the FAISS vector store (set allow_dangerous_deserialization=True)
vectorstore = FAISS.load_local(
    persist_path,
    embeddings=embedding_model,
    index_name="index",
    allow_dangerous_deserialization=True
)



# Create the RAG (RetrievalQA) chain
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=vectorstore.as_retriever(),
    return_source_documents=True
)

# Sample query
query = "What is the source of the claim about the 2020 election fraud?"

# Run the query
response = qa_chain.invoke(query)


# Print response
print("\n📌 Answer:")
print(response['result'])

print("\n📚 Retrieved Sources:")
for doc in response['source_documents']:
    print(f"- {doc.metadata.get('source', 'unknown')}")
