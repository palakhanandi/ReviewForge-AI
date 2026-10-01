```jsx
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api"; // change path if your api.js is in a different folder

const API_URL = import.meta.env.VITE_API_URL;

export default function AIReview() {
    const [params] = useSearchParams();

    const owner = params.get("owner");
    const repo = params.get("repo");
    const pr = params.get("pr");

    const [loading, setLoading] = useState(true);
    const [review, setReview] = useState("");

    const hasGenerated = useRef(false);

    // GitHub login
    const login = () => {
        window.location.href = `${API_URL}/auth/login`;
    };

    useEffect(() => {
        if (hasGenerated.current) return;

        hasGenerated.current = true;

        generateReview();
    }, []);

    const generateReview = async () => {
        try {
            const response = await api.post(
                `/ai/review/${owner}/${repo}/${pr}`,
                {}
            );

            setReview(response.data.review);

        } catch (err) {
            console.error("AI Review Error:", err);

            if (err.response?.status === 401) {
                alert("Please login first.");
                login();
                return;
            }

            alert("Unable to generate AI Review.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page">

            <h1>🤖 AI Code Review</h1>

            <p>
                <b>Repository:</b> {owner}/{repo}
            </p>

            <p>
                <b>Pull Request:</b> #{pr}
            </p>

            <br />

            {loading ? (
                <h2>Generating AI Review...</h2>
            ) : (
                <div className="review-box">
                    <h2>Gemini Review</h2>
                    <pre>{review}</pre>
                </div>
            )}

        </div>
    );
}
```
