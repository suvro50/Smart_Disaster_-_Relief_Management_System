import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <Link to="/admin/dashboard">Dashboard</Link>
      <Link to="/admin/disasters">Disasters</Link>
      <Link to="/admin/resources">Resources</Link>
      <Link to="/admin/alerts">Alerts</Link>
      <Link to="/admin/reports">Reports</Link>
    </aside>
  );
}
