import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";
import PullRequestCard from "../components/PullRequestCard";

export default function PullRequests() {

    const [searchParams] = useSearchParams();

    const owner = searchParams.get("owner");
    const repo = searchParams.get("repo");

    const [pulls, setPulls] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (owner && repo) {
            fetchPullRequests();
        }

    }, [owner, repo]);

    async function fetchPullRequests() {

        try {

            const response = await api.get(
                `/github/repos/${owner}/${repo}/pulls`
            );

            setPulls(response.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }
    }

    if (loading) {

        return <h2>Loading Pull Requests...</h2>;

    }

    return (

        <div>

            <h1>Pull Requests</h1>

            <br />

            {pulls.length === 0 ? (

                <h3>No Pull Requests Found.</h3>

            ) : (

                pulls.map(pr => (

                    <PullRequestCard
                        key={pr.number}
                        pr={pr}
                    />

                ))

            )}

        </div>

    );

}