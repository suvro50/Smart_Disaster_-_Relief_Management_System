import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={styles.nav}>
      {/* Brand */}
      <div style={styles.brand} onClick={() => navigate("/")}>
        <span style={styles.brandIcon}>🚨</span>
        <span style={styles.brandText}>Smart Disaster Relief</span>
      </div>

      {/* Desktop Links */}
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/public-map" style={styles.link}>Live Map</Link>
        <Link to="/victim/request-help" style={styles.link}>Request Help</Link>
        <Link to="/report-disaster" style={styles.link}>Report Disaster</Link>

        {token ? (
          <>
            <Link to="/admin/dashboard" style={styles.linkHighlight}>Dashboard</Link>
            <button onClick={logout} style={styles.btnLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/register" style={styles.link}>Register</Link>
            <button onClick={() => navigate("/login")} style={styles.btnLogin}>
              🔐 Login
            </button>
          </>
        )}
      </div>

      {/* Mobile hamburger */}
      <button
        style={styles.hamburger}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={styles.mobileMenu}>
          <Link to="/" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>🏠 Home</Link>
          <Link to="/public-map" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>🗺️ Live Map</Link>
          <Link to="/victim/request-help" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>🆘 Request Help</Link>
          <Link to="/report-disaster" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>📢 Report Disaster</Link>
          {token ? (
            <>
              <Link to="/admin/dashboard" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>📊 Dashboard</Link>
              <button onClick={() => { logout(); setMenuOpen(false); }} style={styles.mobileBtnLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/register" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>🙋 Register</Link>
              <Link to="/login" style={styles.mobileBtnLogin} onClick={() => setMenuOpen(false)}>🔐 Login</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

const styles = {
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 32px",
    height: 64,
    background: "rgba(10, 10, 15, 0.85)",
    backdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    flexWrap: "wrap",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    cursor: "pointer",
    textDecoration: "none",
  },
  brandIcon: {
    fontSize: 24,
  },
  brandText: {
    fontSize: 16,
    fontWeight: 700,
    color: "#fff",
    letterSpacing: 0.5,
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    flexWrap: "wrap",
  },
  link: {
    color: "rgba(255,255,255,0.7)",
    textDecoration: "none",
    padding: "8px 14px",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 500,
    transition: "all 0.2s",
    border: "1px solid transparent",
    cursor: "pointer",
  },
  linkHighlight: {
    color: "#fca5a5",
    textDecoration: "none",
    padding: "8px 14px",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    background: "rgba(239,68,68,0.15)",
    border: "1px solid rgba(239,68,68,0.3)",
    cursor: "pointer",
  },
  btnLogin: {
    background: "linear-gradient(135deg, #ef4444, #dc2626)",
    color: "#fff",
    border: "none",
    padding: "9px 20px",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    marginLeft: 8,
    boxShadow: "0 2px 12px rgba(239,68,68,0.4)",
  },
  btnLogout: {
    background: "rgba(255,255,255,0.08)",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.15)",
    padding: "9px 20px",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    marginLeft: 8,
  },
  hamburger: {
    display: "none",
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: 22,
    cursor: "pointer",
    "@media (max-width: 768px)": {
      display: "block",
    },
  },
  mobileMenu: {
    position: "fixed",
    top: 64,
    left: 0,
    right: 0,
    background: "rgba(10,10,15,0.98)",
    backdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    display: "flex",
    flexDirection: "column",
    padding: "16px 24px 24px",
    gap: 8,
    zIndex: 999,
  },
  mobileLink: {
    color: "rgba(255,255,255,0.8)",
    textDecoration: "none",
    padding: "12px 16px",
    borderRadius: 8,
    fontSize: 15,
    fontWeight: 500,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.06)",
  },
  mobileBtnLogin: {
    background: "linear-gradient(135deg, #ef4444, #dc2626)",
    color: "#fff",
    textDecoration: "none",
    padding: "12px 16px",
    borderRadius: 8,
    fontSize: 15,
    fontWeight: 600,
    textAlign: "center",
    border: "none",
  },
  mobileBtnLogout: {
    background: "rgba(255,255,255,0.08)",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.15)",
    padding: "12px 16px",
    borderRadius: 8,
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    textAlign: "left",
  },
};