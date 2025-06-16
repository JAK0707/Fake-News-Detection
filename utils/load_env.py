from dotenv import load_dotenv
import os

def load_environment():
    load_dotenv()
    if "SERPAPI_API_KEY" not in os.environ:
        raise EnvironmentError("SERPAPI_API_KEY not set in .env file")
