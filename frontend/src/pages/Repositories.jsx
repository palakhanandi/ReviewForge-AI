import { useEffect, useState } from "react";
import api from "../services/api";
import RepositoryCard from "../components/RepositoryCard";

export default function Repositories() {

    const [repositories, setRepositories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRepositories();
    }, []);

    async function fetchRepositories() {

        try {

            const response = await api.get("/github/repos");

            setRepositories(response.data);

        } catch (error) {

            console.error("Error fetching repositories:", error);

            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
            }

        } finally {

            setLoading(false);

        }
    }

    if (loading) {
        return <h2>Loading repositories...</h2>;
    }

    return (
        <div className="repositories-page">

            <h1>My GitHub Repositories</h1>

            <br />

            {repositories.length === 0 ? (
                <h3>No repositories found.</h3>
            ) : (
                repositories.map((repo) => (
                    <RepositoryCard
                        key={repo.id}
                        repo={repo}
                    />
                ))
            )}

        </div>
    );
}