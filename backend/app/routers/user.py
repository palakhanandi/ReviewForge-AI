from fastapi import APIRouter, Depends
from app.security import get_current_user

router = APIRouter(
    prefix="/user",
    tags=["User"]
)
@router.get("/me")
def get_me(user=Depends(get_current_user)):
    return user