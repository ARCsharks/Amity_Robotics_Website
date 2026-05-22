from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

from app.database.database import Base, engine
from app.api.routes import robots, users, teams, sponsors
from app.core.limiter import limiter, SlowAPIMiddleware, RateLimitExceeded, _rate_limit_exceeded_handler
from app.services.email_service import cred_setup

cred_setup()

Base.metadata.create_all(bind=engine)

app.state.limiter = limiter

app.add_exception_handler(
    RateLimitExceeded,
    _rate_limit_exceeded_handler
)

app.add_middleware(SlowAPIMiddleware)


@app.post("/")
def root():
    return {"status": "The API is running."}

origins = [
    "https://www.arcsharks.com.au",
    "http://localhost:5173"
    
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],  
)

app.include_router(robots.router, prefix="/robots", tags=["Robots"])
app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(teams.router, prefix="/teams", tags=["Teams"])
app.include_router(sponsors.router, prefix="/sponsors", tags=["Sponsors"])
