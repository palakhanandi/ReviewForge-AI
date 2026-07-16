from fastapi import FastAPI
from starlette.middleware.sessions import SessionMiddleware

from app.routers import auth, user, github
from app.routers import webhook
from fastapi.middleware.cors import CORSMiddleware
from app.routers.profile import router as profile_router
from app.routers import ai
from app.routers.dashboard import router as dashboard_router

app = FastAPI()

app.add_middleware(
    SessionMiddleware,
    secret_key="your-super-secret-key"
)

app.include_router(auth.router)
app.include_router(user.router)
app.include_router(github.router)
app.include_router(webhook.router)
app.include_router(ai.router)
app.include_router(profile_router)
app.include_router(dashboard_router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)