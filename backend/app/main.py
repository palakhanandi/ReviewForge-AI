
import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware

from app.routers import auth, user, github
from app.routers import webhook
from app.routers.profile import router as profile_router
from app.routers import ai
from app.routers.dashboard import router as dashboard_router


app = FastAPI()


# =========================
# Session Middleware
# =========================

app.add_middleware(
    SessionMiddleware,
    secret_key=os.getenv(
        "SESSION_SECRET",
        "development-secret-key"
    )
)


# =========================
# CORS
# =========================

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173",
        "https://reviewforge-ai-2.onrender.com",
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


# =========================
# Routers
# =========================

app.include_router(auth.router)
app.include_router(user.router)
app.include_router(github.router)
app.include_router(webhook.router)
app.include_router(ai.router)
app.include_router(profile_router)
app.include_router(dashboard_router)
