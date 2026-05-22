# note to self, pls place changable vari here later

from dotenv import load_dotenv
import os

load_dotenv()

DB_URL = os.getenv("DB_URL")
API_KEY = os.getenv("API_KEY")