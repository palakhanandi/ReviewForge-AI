import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

export default function Profile() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        loadProfile();
    }, []);

    async function loadProfile() {

        const token = localStorage.getItem("token");

        try {

            const res = await axios.get(
                "http://127.0.0.1:8000/profile",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setUser(res.data);

        } catch (err) {
            console.log(err);
        }
    }

    if (!user) {
        return <h2 style={{ color: "white" }}>Loading Profile...</h2>;
    }

    return (
        <div className="profile-container">

            <h1 className="profile-title">
                GitHub Profile
            </h1>

            <div className="profile-card">

                <img
                    src={user.avatar}
                    alt="Avatar"
                    className="profile-avatar"
                />

                <div className="profile-info">

                    <h2>{user.name || "No Name"}</h2>

                    <h3>@{user.username}</h3>

                    <p>{user.email || "Email not public"}</p>

                    

                    
                </div>

            </div>

        </div>
    );
}