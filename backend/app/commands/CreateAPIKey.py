import sys
from pathlib import Path

# ensure backend root is on sys.path to resolve app folder imports when run directly
base = Path(__file__).resolve().parents[2] 
sys.path.insert(0, str(base))

from app.core.security import generate_secure_token

if __name__ == "__main__":
    print(generate_secure_token())