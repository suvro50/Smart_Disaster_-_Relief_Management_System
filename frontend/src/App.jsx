import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/layout/Footer";
import LiveBackground from "./components/layout/LiveBackground";
import Navbar from "./components/layout/Navbar.jsx";
import { useAuth } from "./hooks/useAuth.js";

const Landing = lazy(() => import("./pages/public/Landing.jsx"));
const Login = lazy(() => import("./pages/public/Login.jsx"));
const Register = lazy(() => import("./pages/public/Register"));
const VerifyEmail = lazy(() => import("./pages/public/VerifyEmail.jsx"));
const PublicMap = lazy(() => import("./pages/public/PublicMap"));
const ReportDisaster = lazy(() => import("./pages/public/ReportDisaster"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard.jsx"));
const DisasterManager = lazy(() => import("./pages/admin/DisasterManager"));
const RescueManager = lazy(() => import("./pages/admin/RescueManager"));
const ResourceManager = lazy(() => import("./pages/admin/ResourceManager"));
const UserManager = lazy(() => import("./pages/admin/UserManager"));
const AlertManager = lazy(() => import("./pages/admin/AlertManager"));
const EvacuationManager = lazy(() => import("./pages/admin/EvacuationManager"));
const Reports = lazy(() => import("./pages/admin/Reports"));
const RescueDashboard = lazy(() => import("./pages/rescue/RescueDashboard"));
const MyMissions = lazy(() => import("./pages/rescue/MyMissions"));
const ResourceRequest = lazy(() => import("./pages/rescue/ResourceRequest"));
const RequestHelp = lazy(() => import("./pages/victim/RequestHelp"));
const TrackRequest = lazy(() => import("./pages/victim/TrackRequest"));
const SafetyInfo = lazy(() => import("./pages/victim/SafetyInfo"));

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

export default function App() {
  return (
    <div>
      <LiveBackground />
      <Navbar />
      <Suspense fallback={<main className="page">Loading page...</main>}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/public-map" element={<PublicMap />} />
          <Route path="/report-disaster" element={<ReportDisaster />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/admin/disasters" element={<ProtectedRoute><DisasterManager /></ProtectedRoute>} />
          <Route path="/admin/rescues" element={<ProtectedRoute><RescueManager /></ProtectedRoute>} />
          <Route path="/admin/resources" element={<ProtectedRoute><ResourceManager /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute><UserManager /></ProtectedRoute>} />
          <Route path="/admin/alerts" element={<ProtectedRoute><AlertManager /></ProtectedRoute>} />
          <Route path="/admin/evacuations" element={<ProtectedRoute><EvacuationManager /></ProtectedRoute>} />
          <Route path="/admin/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
          <Route path="/rescue/dashboard" element={<ProtectedRoute><RescueDashboard /></ProtectedRoute>} />
          <Route path="/rescue/missions" element={<ProtectedRoute><MyMissions /></ProtectedRoute>} />
          <Route path="/rescue/resource-request" element={<ProtectedRoute><ResourceRequest /></ProtectedRoute>} />
          <Route path="/victim/request-help" element={<RequestHelp />} />
          <Route path="/victim/track-request" element={<TrackRequest />} />
          <Route path="/victim/safety-info" element={<SafetyInfo />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}
