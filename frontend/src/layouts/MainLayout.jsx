import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="flex h-screen bg-slate-900">

      <Sidebar />

      <div
        className="flex flex-col flex-1"
        style={{ marginLeft: "260px" }}
      >

        <Navbar />

        <div className="flex-1 overflow-auto p-6">
          <Outlet />
        </div>

      </div>

    </div>
  );
}

export default MainLayout;