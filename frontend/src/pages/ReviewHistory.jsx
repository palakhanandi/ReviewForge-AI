import { useEffect, useState } from "react";
import axios from "axios";

export default function ReviewHistory() {

    const [reviews, setReviews] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadReviews();
    }, []);

    async function loadReviews() {

        try {

            const token = localStorage.getItem("token");

            const res = await axios.get(
                "http://127.0.0.1:8000/ai/reviews",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setReviews(res.data);

        } catch (err) {

            console.log(err);

        }

    }

    async function searchReviews() {

        try {

            const token = localStorage.getItem("token");

            const res = await axios.get(
                `http://127.0.0.1:8000/ai/reviews/search?query=${search}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setReviews(res.data);

        } catch (err) {

            console.log(err);

        }

    }

    async function deleteReview(id) {

        const confirmDelete = window.confirm(
            "Delete this review?"
        );

        if (!confirmDelete) return;

        try {

            const token = localStorage.getItem("token");

            await axios.delete(
                `http://127.0.0.1:8000/ai/reviews/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            loadReviews();

        } catch (err) {

            console.log(err);

            alert("Unable to delete review.");

        }

    }

    return (

        <div className="page">

            <h1>🤖 AI Review History</h1>

            <br />

            <div
                style={{
                    display: "flex",
                    gap: 10,
                    marginBottom: 30
                }}
            >

                <input
                    type="text"
                    placeholder="Search repository or owner..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    style={{
                        flex: 1,
                        padding: 12,
                        borderRadius: 8
                    }}
                />

                <button
                    className="review-btn"
                    onClick={searchReviews}
                >
                    Search
                </button>

                <button
                    className="review-btn"
                    onClick={loadReviews}
                >
                    Reset
                </button>

            </div>

            {reviews.length === 0 ? (

                <h3>No Reviews Found</h3>

            ) : (

                reviews.map((review) => (

                    <div
                        key={review.id}
                        className="repo-card"
                    >

                        <h2>{review.repo}</h2>

                        <p>
                            <b>Owner:</b> {review.owner}
                        </p>

                        <p>
                            <b>Pull Request:</b> #{review.pull_number}
                        </p>

                        <p>
                            <b>Date:</b>{" "}
                            {new Date(
                                review.created_at
                            ).toLocaleString()}
                        </p>

                        <br />

                        <details>

                            <summary
                                style={{
                                    cursor: "pointer",
                                    fontWeight: "bold"
                                }}
                            >
                                View AI Review
                            </summary>

                            <pre
                                style={{
                                    whiteSpace: "pre-wrap",
                                    marginTop: 20,
                                    maxHeight: 300,
                                    overflowY: "auto"
                                }}
                            >
                                {review.review}
                            </pre>

                        </details>

                        <br />

                        <button
                            className="review-btn"
                            onClick={() =>
                                deleteReview(review.id)
                            }
                            style={{
                                background: "#dc2626"
                            }}
                        >
                            🗑 Delete Review
                        </button>

                    </div>

                ))

            )}

        </div>

    );

}