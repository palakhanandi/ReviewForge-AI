import { Link } from "react-router-dom";

import {
    FaHome,
    FaFolderOpen,
    FaCodeBranch,
    FaRobot,
    FaCog,
    FaChartBar,
    FaUserCircle,
    FaSignOutAlt
} from "react-icons/fa";

import "../App.css";

function Sidebar() {

    return (

        <div className="sidebar">

            <h1 className="sidebar-logo">
                AI Reviewer
            </h1>

            <div className="sidebar-links">

                <Link to="/profile">
                    <FaUserCircle />
                    <span>Profile</span>
                </Link>

                <Link to="/dashboard">
                    <FaHome />
                    <span>Dashboard</span>
                </Link>

                <Link to="/repositories">
                    <FaFolderOpen />
                    <span>Repositories</span>
                </Link>

               

                <Link to="/reviews">
                    <FaRobot />
                    <span>AI Review</span>
                </Link>

               

                <Link to="/analytics">
                    <FaChartBar />
                    <span>Analytics</span>
                </Link>

            </div>

            <div className="sidebar-spacer"></div>

            <Link to="/logout" className="logout-btn">

                <FaSignOutAlt />

                Logout

            </Link>

        </div>

    );

}

export default Sidebar;