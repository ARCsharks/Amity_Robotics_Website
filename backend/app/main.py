from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core import config
app = FastAPI()

from app.database.database import Base, engine
from app.api.routes import robots, users, teams, sponsors, posts
from app.core.limiter import limiter, SlowAPIMiddleware, RateLimitExceeded, _rate_limit_exceeded_handler

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

@app.get("/health")
def health():
    return {"status": "ok"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=config.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],  
)

app.include_router(robots.router, prefix="/robots", tags=["Robots"])
app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(teams.router, prefix="/teams", tags=["Teams"])
app.include_router(sponsors.router, prefix="/sponsors", tags=["Sponsors"])
app.include_router(posts.router, prefix="/posts", tags=["Posts"])
