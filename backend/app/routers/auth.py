from fastapi import APIRouter, Request
from fastapi.responses import RedirectResponse
from app.auth import oauth
from app.config import GITHUB_CALLBACK
from app.security import create_access_token

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

@router.get("/login")
async def login(request: Request):
    return await oauth.github.authorize_redirect(
        request,
        GITHUB_CALLBACK,
        prompt="login"
    )


@router.get("/callback")
async def callback(request: Request):

    token = await oauth.github.authorize_access_token(request)

    github_access_token = token["access_token"]

    user = await oauth.github.get(
        "user",
        token=token
    )

    profile = user.json()

    access_token = create_access_token(
    {
        "github_id": profile["id"],
        "username": profile["login"],
        "name": profile["name"],
        "email": profile["email"],
        "avatar": profile["avatar_url"],
        "github_token": github_access_token
    }
)

    return RedirectResponse(
        url=f"http://localhost:5173/auth-success?token={access_token}"
    )
