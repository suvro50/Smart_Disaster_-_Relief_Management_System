import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Navbar() {
  const { token, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="brand">Smart Disaster Relief</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        {token ? (
          <>
            <Link to="/admin/dashboard">Dashboard</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}
