import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const login = () => {
    window.location.href = `${API_URL}/auth/login`;
};

export default function AIReview() {

    const [params] = useSearchParams();

    const owner = params.get("owner");
    const repo = params.get("repo");
    const pr = params.get("pr");

    const [loading, setLoading] = useState(true);
    const [review, setReview] = useState("");

    // Prevent duplicate execution
    const hasGenerated = useRef(false);

    useEffect(() => {

        if (hasGenerated.current) return;

        hasGenerated.current = true;

        generateReview();

    }, []);

    const generateReview = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.post(
                `${API}/ai/review/${owner}/${repo}/${pr}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setReview(response.data.review);

        } catch (err) {

            console.log(err);
            alert("Unable to generate AI Review.");

        }

        setLoading(false);

    };

    return (
        <div className="page">

            <h1>🤖 AI Code Review</h1>

            <p><b>Repository:</b> {owner}/{repo}</p>

            <p><b>Pull Request:</b> #{pr}</p>

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
