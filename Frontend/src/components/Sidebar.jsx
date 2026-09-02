import { NavLink } from "react-router-dom";
import {
  LayoutGrid,
  Package,
  Archive,
  FileText,
  ClipboardList,
  ListChecks,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { username, role, logout } = useAuth();
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-mark">KL</div>
        <div>
          <div className="sidebar-title display">Kit Ledger</div>
          <div className="sidebar-subtitle mono">Sports Supply System</div>
        </div>
      </div>

      <div className="sidebar-status">
        <span className="status-dot" />
        <span>ONLINE</span>
      </div>

      <div className="sidebar-nav">
        <div className="sidebar-group-label mono">Overview</div>
        <NavLink
          to="/dashboard"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <LayoutGrid size={16} /> Dashboard
        </NavLink>

        <div className="sidebar-group-label mono">Inventory</div>
        <NavLink
          to="/items"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <Package size={16} /> Items <span className="nav-dot" />
        </NavLink>
        <NavLink
          to="/lost-records"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <Archive size={16} /> Lost Records <span className="nav-dot" />
        </NavLink>
        <NavLink
          to="/damaged-records"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <FileText size={16} /> Damaged Records <span className="nav-dot" />
        </NavLink>

        <div className="sidebar-group-label mono">Reports</div>
        <NavLink
          to="/reports/lost-damaged"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <ClipboardList size={16} /> Lost &amp; Damaged{" "}
          <span className="nav-dot" />
        </NavLink>
        <NavLink
          to="/reports/purchase-list"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <ListChecks size={16} /> Purchase List <span className="nav-dot" />
        </NavLink>
      </div>

      <div className="sidebar-footer">
        <div className="mono" style={{ fontSize: "11px", color: "#a9a688" }}>
          SIGNED IN AS
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <b style={{ color: "#f2eee1" }}>{username}</b>{" "}
          <span className="role-badge mono">{role?.toUpperCase()}</span>
        </div>
        <button
          className="mono"
          onClick={logout}
          style={{
            background: "none",
            border: "none",
            color: "#a9a688",
            cursor: "pointer",
            padding: 0,
            marginTop: "8px",
          }}
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
