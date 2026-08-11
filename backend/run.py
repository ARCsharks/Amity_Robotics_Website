import uvicorn
import random

def getRandomPort():
    return random.randint(1000, 9999)

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
