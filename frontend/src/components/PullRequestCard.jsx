import "../App.css";
import { useNavigate } from "react-router-dom";

export default function PullRequestCard({ pr }) {

  const navigate = useNavigate();

  return (
    <div className="repo-card">

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >

        <div>

          <h2>
            #{pr.number} {pr.title}
          </h2>

          <p>
            by <b>{pr.author}</b>
          </p>

        </div>

        <img
          src={pr.avatar}
          alt={pr.author}
          width="60"
          style={{
            borderRadius: "50%"
          }}
        />

      </div>

      <br />

      <div className="repo-info">

        <span>
          {pr.state === "open"
            ? "🟢 Open"
            : "🔴 Closed"}
        </span>

        <span>
          💬 {pr.comments} Comments
        </span>

      </div>

      <br />

      <p>
        Created :{" "}
        {new Date(pr.created_at).toLocaleDateString()}
      </p>

      <br />

      <a
        href={pr.url}
        target="_blank"
        rel="noreferrer"
      >
        View on GitHub
      </a>

      <button
        className="review-btn"
        style={{ marginLeft: 20 }}
        onClick={() =>
          navigate(
            `/aireview?owner=${pr.owner}&repo=${pr.repo}&pr=${pr.number}`
          )
        }
      >
        🤖 AI Review
      </button>

    </div>
  );
}