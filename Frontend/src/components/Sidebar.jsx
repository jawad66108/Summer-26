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
  const navClass = ({ isActive }) => `nav-item${isActive ? " current" : ""}`;

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="mark">KL</div>
        <h1 className="display">Kit Ledger</h1>
        <p>Sports Supply System</p>
      </div>

      <div className="nav-section-label">Overview</div>
      <NavLink to="/dashboard" className={navClass}>
        <LayoutGrid size={15} /> Dashboard
      </NavLink>

      <div className="nav-section-label">Inventory</div>
      <NavLink to="/items" className={navClass}>
        <Package size={15} /> Items <span className="dot" />
      </NavLink>
      <NavLink to="/lost-records" className={navClass}>
        <Archive size={15} /> Lost Records <span className="dot" />
      </NavLink>
      <NavLink to="/damaged-records" className={navClass}>
        <FileText size={15} /> Damaged Records <span className="dot" />
      </NavLink>

      <div className="nav-section-label">Reports</div>
      <NavLink to="/reports/lost-damaged" className={navClass}>
        <ClipboardList size={15} /> Lost &amp; Damaged <span className="dot" />
      </NavLink>
      <NavLink to="/reports/purchase-list" className={navClass}>
        <ListChecks size={15} /> Purchase List <span className="dot" />
      </NavLink>

      <div className="sidebar-foot">
        <div>Signed in as</div>
        <div>
          <b>{username}</b>
        </div>
        <span className="role-chip">{role?.toUpperCase()}</span>
        <button className="logout-link" onClick={logout}>
          Sign out
        </button>
      </div>
    </aside>
  );
}
