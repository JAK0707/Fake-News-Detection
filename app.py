import streamlit as st
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_ollama import OllamaLLM
from langchain.chains import RetrievalQA

# --- Setup ---
st.set_page_config(page_title="Fake News RAG", layout="centered")

# Title
st.title("🕵️ DEFRAUD – Fake News Verifier")
st.markdown("Verify the credibility of news articles using RAG and Gemma 3B.")

# Load LLM
@st.cache_resource
def load_llm():
    return OllamaLLM(model="gemma3:1b")

# Load Vectorstore
@st.cache_resource
def load_vectorstore():
    embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    persist_path = "./fakenews_faiss_index"
    vectorstore = FAISS.load_local(
        persist_path,
        embeddings=embedding_model,
        index_name="index",
        allow_dangerous_deserialization=True
    )
    return vectorstore

# Load QA chain
@st.cache_resource
def build_qa_chain():
    llm = load_llm()
    vectorstore = load_vectorstore()
    return RetrievalQA.from_chain_type(
        llm=llm,
        retriever=vectorstore.as_retriever(),
        return_source_documents=True
    )

qa_chain = build_qa_chain()

# --- UI ---
user_query = st.text_input("📰 Enter a news claim/article title you'd like to verify:")

if st.button("🔍 Verify") and user_query:
    with st.spinner("Analyzing..."):
        result = qa_chain.invoke(user_query)
        st.subheader("📌 AI Verdict:")
        st.success(result['result'])

        st.subheader("📚 Supporting Sources:")
        for i, doc in enumerate(result['source_documents']):
            source = doc.metadata.get("source", "unknown")
            st.markdown(f"**{i+1}.** {source}")
