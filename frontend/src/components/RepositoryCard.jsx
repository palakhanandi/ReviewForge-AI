import { Link } from "react-router-dom";

export default function RepositoryCard({ repo }) {
  return (
    <div className="repo-card">

      <h2>{repo.name}</h2>

      <p>{repo.description || "No description available"}</p>

      <div className="repo-info">
        <span>💻 {repo.language || "Unknown"}</span>
        <span>{repo.private ? "🔒 Private" : "🌍 Public"}</span>
      </div>

      <div className="repo-stats">
        <span>⭐ {repo.stars}</span>
        <span>🍴 {repo.forks}</span>
        <span>🐞 {repo.issues}</span>
      </div>

      <p>
        Updated: {new Date(repo.updated_at).toLocaleDateString()}
      </p>

      <br />

      <a
        href={repo.url}
        target="_blank"
        rel="noreferrer"
      >
        Open Repository →
      </a>

      <br />
      <br />

      <Link
        to={`/pullrequests?owner=${repo.owner}&repo=${repo.name}`}
      >
        🔀 View Pull Requests
      </Link>

    </div>
  );
}