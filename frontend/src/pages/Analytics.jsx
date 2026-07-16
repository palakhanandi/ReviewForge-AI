import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://127.0.0.1:8000";

export default function Analytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${API}/ai/analytics`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!data) return <h2>Loading Analytics...</h2>;

  return (
    <div className="page">
      <h1>📊 AI Review Analytics</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h2>{data.total_reviews}</h2>
          <p>Total Reviews</p>
        </div>

        <div className="stat-card">
          <h2>{data.total_repositories}</h2>
          <p>Repositories</p>
        </div>

        <div className="stat-card">
          <h2>{data.total_pull_requests}</h2>
          <p>Pull Requests</p>
        </div>
      </div>

      <h2>Repository Usage</h2>

      {data.repositories.map((repo) => (
        <div key={repo.repo} className="repo-card">
          <h3>{repo.repo}</h3>
          <p>{repo.count} AI Reviews</p>
        </div>
      ))}
    </div>
  );
}