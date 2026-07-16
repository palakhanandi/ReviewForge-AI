from fastapi import APIRouter, Request

router = APIRouter(
    prefix="/webhook",
    tags=["GitHub Webhook"]
)


@router.post("/github")
async def github_webhook(request: Request):

    payload = await request.json()

    event = request.headers.get("X-GitHub-Event")

    if event == "pull_request":

        action = payload["action"]

        pr = payload["pull_request"]

        repo = payload["repository"]["full_name"]

        return {
            "message": "Pull Request Event Received",
            "action": action,
            "repository": repo,
            "pr_number": pr["number"],
            "title": pr["title"],
            "author": pr["user"]["login"]
        }

    return {
        "message": "Ignored Event",
        "event": event
    }