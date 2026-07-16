import useAuth from "../hooks/useAuth";
import { FaGithub } from "react-icons/fa";
import "../App.css";

function Login() {

    const { login } = useAuth();

    return (

        <div className="login-page">

            <div className="background-glow glow1"></div>
            <div className="background-glow glow2"></div>

            <div className="login-card">

                <div className="github-logo">
                    <FaGithub />
                </div>

                <h1>ReviewForge AI</h1>

                <h3>AI Powered Code Review</h3>

                <p>
                    Automatically review GitHub Pull Requests
                    using <strong>Gemini AI</strong>, built with
                    <strong> FastAPI</strong> and
                    <strong> React</strong>.
                </p>

                <button
                    className="github-btn"
                    onClick={login}
                >
                    <FaGithub size={24} />
                    Continue with GitHub
                </button>

                <div className="login-footer">
                    Secure GitHub OAuth Authentication
                </div>

            </div>

        </div>

    );

}

export default Login;