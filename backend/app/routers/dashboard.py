from fastapi import APIRouter, Depends
import requests

from app.security import get_current_user
from app.database import SessionLocal
from app.models.review import Review

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/")
def dashboard(user=Depends(get_current_user)):

    github_token = user["github_token"]

    headers = {
        "Authorization": f"Bearer {github_token}",
        "Accept": "application/vnd.github+json"
    }

    # Fetch only user's repositories
    response = requests.get(
        "https://api.github.com/user/repos?type=owner&per_page=100",
        headers=headers
    )

    repos = response.json()

    db = SessionLocal()

    total_reviews = db.query(Review).count()

    reviewed_prs = (
        db.query(Review.pull_number)
        .distinct()
        .count()
    )

    recent_reviews = (
        db.query(Review)
        .order_by(Review.created_at.desc())
        .limit(5)
        .all()
    )

    db.close()

    return {

        "total_repositories": len(repos),

        "reviews_generated": total_reviews,

        "reviewed_pull_requests": reviewed_prs,

        "recent_reviews": [

            {
                "id": r.id,
                "repo": r.repo,
                "owner": r.owner,
                "pull_number": r.pull_number,
                "created_at": r.created_at
            }

            for r in recent_reviews

        ]

    }