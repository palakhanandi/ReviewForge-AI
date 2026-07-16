import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Repositories from "./pages/Repositories";
import PullRequests from "./pages/PullRequests";
import AIReview from "./pages/AIReview";
import Settings from "./pages/Settings";
import AuthSuccess from "./pages/AuthSuccess";
import Analytics from "./pages/Analytics";
import MainLayout from "./layouts/MainLayout";
import ReviewHistory from "./pages/ReviewHistory";
import Profile from "./pages/Profile";
import Logout from "./pages/Logout";
function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route element={<MainLayout />}>

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/repositories" element={<Repositories />} />

          <Route path="/pullrequests" element={<PullRequests />} />
          <Route path="/aireview" element={<AIReview />} />

          <Route path="/settings" element={<Settings />} />
          <Route path="/auth-success" element={<AuthSuccess />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/logout" element={<Logout />} />
          <Route
    path="/profile"
    element={<Profile />}
/>
          <Route
    path="/reviews"
    element={<ReviewHistory />}
/>
        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;