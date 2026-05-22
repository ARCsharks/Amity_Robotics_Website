import os
import secrets
from app.core import config

from fastapi import Header, HTTPException

API_KEY = config.API_KEY

async def verify_api_key(x_api_key: str = Header(default=None)):
    if API_KEY is None:
        raise HTTPException(
            status_code=500,
            detail="Error with the API Key. Let the developer know via email."
        )
    
    if x_api_key != API_KEY:
        raise HTTPException(
            status_code=401,
            detail="Invalid API key."
        )
    
def generate_secure_token():
    return secrets.token_hex(32)