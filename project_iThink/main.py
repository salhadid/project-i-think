import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import accounts, ai, projects, image
from authenticator import authenticator

app = FastAPI()

origins = [
    # "https://localhost",
    # "https://localhost:8000",
    # "https://localhost:3000",
    # "https://localhost:27017",
    "https://trawson.gitlab.io",
    os.environ.get("CORS_HOST", None),
    os.environ.get("REACT_APP_iThink", None),
    os.environ.get("PUBLIC_URL", None),
]

app.include_router(authenticator.router)
app.include_router(accounts.router)
app.include_router(ai.router)
app.include_router(projects.router)
app.include_router(image.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("https")
async def add_cors_header(request, call_next):
    response = await call_next(request)
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response


@app.get("/")
async def health_check():
    return {"Health Check": "Positive"}
