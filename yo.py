import streamlit as st
from serpapi import GoogleSearch
from dotenv import load_dotenv
import os

# Load API key from .env
load_dotenv()
SERPAPI_KEY = os.getenv("SERPAPI_KEY")

# Set up the Streamlit UI
st.title("🔍 Google Search via SerpAPI")
st.markdown("Enter your search query below:")

# User input
query = st.text_input("Search query", placeholder="e.g., plane crash today")

# When user clicks search
if st.button("Search") and query:
    with st.spinner("Searching..."):
        if not SERPAPI_KEY:
            st.error("API key not found. Please check your .env file.")
        else:
            params = {
                "api_key": SERPAPI_KEY,
                "engine": "google",
                "q": query,
                "location": "Austin, Texas, United States",
                "google_domain": "google.com",
                "gl": "us",
                "hl": "en"
            }

            try:
                search = GoogleSearch(params)
                results = search.get_dict()

                if "organic_results" in results:
                    st.subheader("Top Search Results:")
                    for res in results["organic_results"]:
                        title = res.get("title", "No Title")
                        link = res.get("link", "")
                        snippet = res.get("snippet", "No Description")

                        st.markdown(f"### [{title}]({link})")
                        st.write(snippet)
                        st.write("---")
                else:
                    st.warning("No results found or API limit exceeded.")

            except Exception as e:
                st.error(f"An error occurred: {e}")
