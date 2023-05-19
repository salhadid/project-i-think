from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from authenticator import authenticator
from routers import accounts
from routers import ai

app = FastAPI()
app.include_router(authenticator.router)
app.include_router(accounts.router)
app.include_router(ai.router)


origins = [
    "http://localhost",
    "http://localhost:3000",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




























# origins = [
#     "http://localhost",
#     "http://localhost:3000",
#     "CORS_HOST"
# ]


# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=[
#         os.environ.get("http://localhost:3000", "http://localhost")
#     ],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )
