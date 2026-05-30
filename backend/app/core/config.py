from dotenv import load_dotenv
import os

load_dotenv()

DB_URL = os.getenv("DB_URL", "sqlite:///./robotics.db")
API_KEY = os.getenv("API_KEY")
GOOGLE_AUTH_DIR = os.getenv("GOOGLE_AUTH_DIR", ".")
CORS_ORIGINS = [
    origin.strip()
    for origin in os.getenv(
        "CORS_ORIGINS",
        "https://www.arcsharks.com.au,http://localhost:5173,http://localhost:3000",
    ).split(",")
    if origin.strip()
]
