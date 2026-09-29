from fastapi.security import APIKeyHeader
from fastapi import Security, status, HTTPException
from dotenv import load_dotenv
import os

ENV = os.getenv("ENVIRONMENT", "development")
if ENV == "development":
    load_dotenv("dev.env")
API_KEY = os.getenv("API_KEY")

api_key_header = APIKeyHeader(name = "API_KEY", auto_error=False)

def verify_api_key(key: str = Security(api_key_header)):
    if not key or key != API_KEY:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or incorrect API Key."
        )
    return key