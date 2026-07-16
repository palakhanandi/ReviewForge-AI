from fastapi import APIRouter, Depends
from app.security import get_current_user
import requests

router = APIRouter(
    prefix="/github",
    tags=["GitHub"]
)



@router.get("/profile")
def github_profile(user=Depends(get_current_user)):

    token = user["github_token"]

    headers = {
        "Authorization": f"Bearer {token}",
        "Accept": "application/vnd.github+json"
    }

    response = requests.get(
        "https://api.github.com/user",
        headers=headers
    )

    return response.json()



@router.get("/repos")
def get_repositories(user=Depends(get_current_user)):

    github_token = user["github_token"]

    headers = {
        "Authorization": f"Bearer {github_token}",
        "Accept": "application/vnd.github+json"
    }

    response = requests.get(
        "https://api.github.com/user/repos",
        headers=headers
    )

    repos = response.json()

    return [
    {
        "id": repo["id"],
        "name": repo["name"],
        "owner": repo["owner"]["login"],
        "private": repo["private"],
        "default_branch": repo["default_branch"],
        "url": repo["html_url"],

        "description": repo["description"],
        "language": repo["language"],
        "updated_at": repo["updated_at"],
        "stars": repo["stargazers_count"],
        "forks": repo["forks_count"],
        "open_issues": repo["open_issues_count"]
    }
    for repo in repos
]

@router.get("/repos/{owner}/{repo}/pulls")
def get_pull_requests(
    owner: str,
    repo: str,
    user=Depends(get_current_user)
):

    github_token = user["github_token"]

    headers = {
        "Authorization": f"Bearer {github_token}",
        "Accept": "application/vnd.github+json"
    }

    response = requests.get(
        f"https://api.github.com/repos/{owner}/{repo}/pulls",
        headers=headers
    )

    pulls = response.json()

    return [
{
    "number": pr["number"],
    "title": pr["title"],
    "state": pr["state"],
    "author": pr["user"]["login"],
    "avatar": pr["user"]["avatar_url"],
    "created_at": pr["created_at"],
    "url": pr["html_url"],

    "owner": owner,
    "repo": repo,

   
}
for pr in pulls
]