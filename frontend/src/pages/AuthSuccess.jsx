import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function AuthSuccess() {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {

        const token = searchParams.get("token");

        if (token) {
            localStorage.setItem("token", token);
        }

        navigate("/dashboard");

    }, []);

    return <h2>Logging in...</h2>;
}