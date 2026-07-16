from fastapi import APIRouter, Depends
from app.security import get_current_user

router = APIRouter(
    prefix="/profile",
    tags=["Profile"]
)


@router.get("")
def get_profile(user=Depends(get_current_user)):

    return {
        "github_id": user["github_id"],
        "username": user["username"],
        "name": user.get("name"),
        "email": user.get("email"),
        "avatar": user.get("avatar")
    }