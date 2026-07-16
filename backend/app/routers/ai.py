from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import func, or_
from app.security import get_current_user
from app.config import GEMINI_API_KEY
from app.database import SessionLocal
from app.models.review import Review

import google.generativeai as genai
import requests

# Configure Gemini
genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-2.5-flash")

router = APIRouter(
    prefix="/ai",
    tags=["Gemini AI"]
)

# ======================================================
# Generate AI Review
# ======================================================

@router.post("/review/{owner}/{repo}/{pull_number}")
def review_pull_request(
    owner: str,
    repo: str,
    pull_number: int,
    user=Depends(get_current_user)
):

    github_token = user["github_token"]

    headers = {
        "Authorization": f"Bearer {github_token}",
        "Accept": "application/vnd.github+json"
    }

    # Fetch PR files
    files_response = requests.get(
        f"https://api.github.com/repos/{owner}/{repo}/pulls/{pull_number}/files",
        headers=headers
    )

    if files_response.status_code != 200:
        raise HTTPException(
            status_code=400,
            detail="Unable to fetch PR files"
        )

    files = files_response.json()

    full_patch = ""

    for file in files:
        if "patch" in file:
            full_patch += f"\n\n### {file['filename']}\n"
            full_patch += file["patch"]

    prompt = f"""
You are a Senior Software Engineer.

Review this Pull Request.

Give:

1. Bugs
2. Security Issues
3. Performance Improvements
4. Code Style
5. Final Recommendation

Pull Request:

{full_patch}
"""

    review = model.generate_content(prompt).text

    # Save Review
    db = SessionLocal()

    new_review = Review(
        owner=owner,
        repo=repo,
        pull_number=pull_number,
        review=review
    )

    db.add(new_review)
    db.commit()
    db.refresh(new_review)

    # Post review to GitHub
    comment_body = {
        "body": f"## 🤖 AI Code Review\n\n{review}"
    }

    comment_response = requests.post(
        f"https://api.github.com/repos/{owner}/{repo}/issues/{pull_number}/comments",
        headers=headers,
        json=comment_body
    )

    db.close()

    if comment_response.status_code not in [200, 201]:
        raise HTTPException(
            status_code=400,
            detail="Failed to post GitHub comment"
        )

    return {
        "id": new_review.id,
        "message": "AI Review Posted Successfully",
        "repository": f"{owner}/{repo}",
        "pull_request": pull_number,
        "review": review,
        "comment_url": comment_response.json()["html_url"]
    }


# ======================================================
# Analytics
# ======================================================

@router.get("/analytics")
def analytics(user=Depends(get_current_user)):

    db = SessionLocal()

    total_reviews = db.query(Review).count()

    total_repositories = (
        db.query(
            Review.owner,
            Review.repo
        )
        .distinct()
        .count()
    )

    total_pull_requests = (
        db.query(
            Review.pull_number
        )
        .distinct()
        .count()
    )

    repo_stats = (
        db.query(
            Review.repo,
            func.count(Review.id).label("count")
        )
        .group_by(Review.repo)
        .all()
    )

    db.close()

    return {
        "total_reviews": total_reviews,
        "total_repositories": total_repositories,
        "total_pull_requests": total_pull_requests,
        "repositories": [
            {
                "repo": repo.repo,
                "count": repo.count
            }
            for repo in repo_stats
        ]
    }


# ======================================================
# Review History
# ======================================================
# ======================================================
# Search Review History
# ======================================================

@router.get("/reviews/search")
def search_reviews(
    query: str = "",
    user=Depends(get_current_user)
):

    db = SessionLocal()

    reviews = (
        db.query(Review)
        .filter(
            or_(
                Review.owner.ilike(f"%{query}%"),
                Review.repo.ilike(f"%{query}%"),
                Review.review.ilike(f"%{query}%")
            )
        )
        .order_by(Review.created_at.desc())
        .all()
    )

    db.close()

    return [
        {
            "id": review.id,
            "owner": review.owner,
            "repo": review.repo,
            "pull_number": review.pull_number,
            "review": review.review,
            "created_at": review.created_at
        }
        for review in reviews
    ]

@router.get("/reviews")
def get_review_history(user=Depends(get_current_user)):

    db = SessionLocal()

    reviews = (
        db.query(Review)
        .order_by(Review.created_at.desc())
        .all()
    )

    result = []

    for review in reviews:
        result.append({
            "id": review.id,
            "owner": review.owner,
            "repo": review.repo,
            "pull_number": review.pull_number,
            "review": review.review,
            "created_at": review.created_at
        })

    db.close()

    return result


# ======================================================
# Get Single Review
# ======================================================

@router.get("/reviews/{review_id}")
def get_review(
    review_id: int,
    user=Depends(get_current_user)
):

    db = SessionLocal()

    review = (
        db.query(Review)
        .filter(Review.id == review_id)
        .first()
    )

    db.close()

    if review is None:
        raise HTTPException(
            status_code=404,
            detail="Review not found"
        )

    return {
        "id": review.id,
        "owner": review.owner,
        "repo": review.repo,
        "pull_number": review.pull_number,
        "review": review.review,
        "created_at": review.created_at
    } 
# ======================================================
# Delete Review
# ======================================================

@router.delete("/reviews/{review_id}")
def delete_review(
    review_id: int,
    user=Depends(get_current_user)
):

    db = SessionLocal()

    review = (
        db.query(Review)
        .filter(Review.id == review_id)
        .first()
    )

    if review is None:
        db.close()

        raise HTTPException(
            status_code=404,
            detail="Review not found"
        )

    db.delete(review)
    db.commit()
    db.close()

    return {
        "message": "Review deleted successfully"
    }
