



       import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://127.0.0.1:8000";

export default function Analytics() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {

    try {

      setLoading(true);

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

    } finally {

      setLoading(false);

    }

  };

  if (loading)
    return (
      <div className="page">
        <h2>Loading Analytics...</h2>
      </div>
    );

  return (

    <div className="page analytics-page">

      <div className="analytics-header">

        <div>

          <h1>📊 AI Review Analytics</h1>

          <p>
            Track your repositories and AI code review performance.
          </p>

        </div>

        <button
          className="refreshBtn"
          onClick={fetchAnalytics}
        >
          🔄 Refresh
        </button>

      </div>

      <div className="stats-grid">

        <div className="stat-card blue">

          <div className="icon">🤖</div>

          <h1>{data.total_reviews}</h1>

          <h3>Total Reviews</h3>

          <span>AI Generated Reviews</span>

        </div>

        <div className="stat-card purple">

          <div className="icon">📂</div>

          <h1>{data.total_repositories}</h1>

          <h3>Repositories</h3>

          <span>Connected GitHub Repositories</span>

        </div>

        <div className="stat-card green">

          <div className="icon">🔀</div>

          <h1>{data.total_pull_requests}</h1>

          <h3>Pull Requests</h3>

          <span>Reviewed Pull Requests</span>

        </div>

      </div>

      <div className="analytics-content">

        <div className="repo-section">

          <h2>📈 Repository Usage</h2>

          {

            data.repositories.length === 0 ?

              (

                <div className="empty-card">

                  <h3>No Reviews Yet</h3>

                  <p>
                    Generate your first AI review to see analytics.
                  </p>

                </div>

              )

              :

              (

                data.repositories.map((repo) => (

                  <div
                    key={repo.repo}
                    className="repo-card"
                  >

                    <div>

                      <h3>{repo.repo}</h3>

                      <p>{repo.count} AI Reviews</p>

                    </div>

                    <div className="repo-badge">

                      ⭐ {repo.count}

                    </div>

                  </div>

                ))

              )

          }

        </div>

        <div className="insights-card">

          <h2>🤖 AI Insights</h2>

          <div className="insight">

            <span>🔥</span>

            <p>
              Total Reviews:
              <strong> {data.total_reviews}</strong>
            </p>

          </div>

          <div className="insight">

            <span>📂</span>

            <p>
              Active Repositories:
              <strong> {data.total_repositories}</strong>
            </p>

          </div>

          <div className="insight">

            <span>🚀</span>

            <p>
              Pull Requests Reviewed:
              <strong> {data.total_pull_requests}</strong>
            </p>

          </div>

        </div>

      </div>

    </div>

  );

}
