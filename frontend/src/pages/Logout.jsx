import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import "../App.css";

export default function Logout() {

    const navigate = useNavigate();

    function handleLogout() {

        localStorage.clear();

        navigate("/", { replace: true });

    }

    function handleCancel() {

        navigate(-1);

    }

    return (

        <div className="logout-overlay">

            <div className="logout-modal">

                <div className="logout-circle">

                    <FaSignOutAlt />

                </div>

                <h2>Logout</h2>

                <p>

                    Are you sure you want to logout from
                    <br />

                    <b>ReviewForge AI?</b>

                </p>

                <div className="logout-buttons">

                    <button
                        className="cancel-btn"
                        onClick={handleCancel}
                    >

                        Cancel

                    </button>

                    <button
                        className="confirm-btn"
                        onClick={handleLogout}
                    >

                        Logout

                    </button>

                </div>

            </div>

        </div>

    );

}