from fastapi import FastAPI
from app.database.database import Base, engine
from app.api.routes import robots, users, teams
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.post("/")
def root():
    return {"status": "The API is running."}

origins = [
    "https://vd1fgc8j-5173.aue.devtunnels.ms/",
    "http://"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],  
)

app.include_router(robots.router, prefix="/robots", tags=["Robots"])
app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(teams.router, prefix="/teams", tags=["Teams"])

