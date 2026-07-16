import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

    const navigate = useNavigate();

    const [data, setData] = useState(null);

    useEffect(() => {
        loadDashboard();
    }, []);

    async function loadDashboard() {

        try {

            const token = localStorage.getItem("token");

            const res = await axios.get(
                "http://127.0.0.1:8000/dashboard/",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setData(res.data);

        }

        catch (err) {

            console.log(err);

        }

    }

    if (!data)
        return <h2>Loading Dashboard...</h2>;

    return (

        <div className="page">

            <div className="dashboard-header">

                <div>

                    <h1>Dashboard</h1>

                    <p>Welcome back 👋</p>

                </div>

                <button
                    className="newReviewBtn"
                    onClick={() => navigate("/repositories")}
                >
                    + New Review
                </button>

            </div>

            <div className="cards">

                <div className="card">

                    <h3>📂 Total Repositories</h3>

                    <h1>{data.total_repositories}</h1>

                </div>

                <div className="card">

                    <h3>🤖 Reviews Generated</h3>

                    <h1>{data.reviews_generated}</h1>

                </div>

                <div className="card">

                    <h3>🔀 Reviewed Pull Requests</h3>

                    <h1>{data.reviewed_pull_requests}</h1>

                </div>

            </div>

            <div className="quickActions">

                <h2>Quick Actions</h2>

                <div className="actionButtons">

                    <button onClick={() => navigate("/repositories")}>
                        Repositories
                    </button>

                    <button onClick={() => navigate("/analytics")}>
                        Analytics
                    </button>

                    <button onClick={() => navigate("/reviews")}>
                        Review History
                    </button>

                    <button onClick={() => navigate("/profile")}>
                        Profile
                    </button>

                </div>

            </div>

            <div className="recent">

                <h2>Recent Reviews</h2>

                <br />

                {

                    data.recent_reviews.length === 0 ?

                    <h3>No Reviews Yet</h3>

                    :

                    data.recent_reviews.map(review => (

                        <div
                            key={review.id}
                            className="repo-card"
                        >

                            <h3>{review.repo}</h3>

                            <p>

                                <b>Owner:</b> {review.owner}

                            </p>

                            <p>

                                PR #{review.pull_number}

                            </p>

                            <p>

                                {new Date(
                                    review.created_at
                                ).toLocaleString()}

                            </p>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}