import { useState } from "react";

const styles = `
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 260px;
    height: 100vh;
    background: var(--bg-0);
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    z-index: 200;
    transition: transform 0.3s ease;
  }
  .sidebar-logo {
    padding: 1.5rem 1.25rem;
    border-bottom: 1px solid var(--border);
    font-family: var(--font-display);
    font-size: 1.6rem;
    font-weight: 800;
    color: var(--text-1);
    flex-shrink: 0;
  }
  .sidebar-logo span { color: var(--orange); }
  .sidebar-user {
    padding: 1.25rem;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-shrink: 0;
  }
  .sidebar-avatar {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, var(--orange), var(--orange-light));
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-display);
    font-size: 1.1rem;
    font-weight: 700;
    color: #fff;
    flex-shrink: 0;
  }
  .sidebar-user-name {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-1);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .sidebar-user-role {
    font-size: 0.7rem;
    color: var(--orange);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .sidebar-nav {
    flex: 1;
    overflow-y: auto;
    padding: 1rem 0.75rem;
  }
  .sidebar-section-label {
    font-size: 0.65rem;
    font-weight: 700;
    color: var(--text-4);
    text-transform: uppercase;
    letter-spacing: 1.5px;
    padding: 0.5rem 0.5rem 0.5rem;
    margin-top: 0.5rem;
  }
  .sidebar-link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.7rem 0.75rem;
    border-radius: var(--radius-sm);
    color: var(--text-3);
    font-size: 0.875rem;
    font-weight: 500;
    transition: var(--transition);
    cursor: pointer;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    text-decoration: none;
  }
  .sidebar-link:hover {
    background: rgba(255,255,255,0.04);
    color: var(--text-1);
  }
  .sidebar-link.active {
    background: rgba(255,107,0,0.1);
    color: var(--orange);
    border-left: 2px solid var(--orange);
  }
  .sidebar-link-icon {
    font-size: 1rem;
    width: 20px;
    text-align: center;
    flex-shrink: 0;
  }
  .sidebar-link-badge {
    margin-left: auto;
    background: var(--orange);
    color: #fff;
    font-size: 0.65rem;
    font-weight: 700;
    padding: 0.1rem 0.45rem;
    border-radius: 100px;
    min-width: 18px;
    text-align: center;
  }
  .sidebar-footer {
    padding: 1rem 0.75rem;
    border-top: 1px solid var(--border);
    flex-shrink: 0;
  }
  .sidebar-logout {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.7rem 0.75rem;
    border-radius: var(--radius-sm);
    color: #FF4444;
    font-size: 0.875rem;
    font-weight: 500;
    transition: var(--transition);
    cursor: pointer;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
  }
  .sidebar-logout:hover { background: rgba(255,68,68,0.07); }

  .sidebar-overlay {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.7);
    z-index: 199;
  }

  .topbar {
    display: none;
    position: sticky;
    top: 0;
    background: var(--bg-0);
    border-bottom: 1px solid var(--border);
    padding: 1rem 1.25rem;
    align-items: center;
    justify-content: space-between;
    z-index: 100;
  }
  .topbar-logo {
    font-family: var(--font-display);
    font-size: 1.4rem;
    font-weight: 800;
    color: var(--text-1);
  }
  .topbar-logo span { color: var(--orange); }
  .topbar-menu-btn {
    width: 36px;
    height: 36px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
  }
  .topbar-menu-btn span {
    display: block;
    width: 22px;
    height: 2px;
    background: var(--text-1);
    border-radius: 2px;
    transition: var(--transition);
  }

  @media (max-width: 900px) {
    .sidebar { transform: translateX(-100%); }
    .sidebar.open { transform: translateX(0); }
    .sidebar-overlay.open { display: block; }
    .topbar { display: flex; }
  }
`;

const coachNavItems = [
  { section: "Overview", items: [
    { icon: "📊", label: "Dashboard", page: "dashboard" },
  ]},
  { section: "Clients", items: [
    { icon: "👥", label: "My Clients", page: "clients", badge: null },
    { icon: "📬", label: "Client Requests", page: "requests", badge: "2" },
    { icon: "🚫", label: "Disabled Accounts", page: "disabled" },
  ]},
  { section: "Library", items: [
    { icon: "🏋️", label: "Exercise Library", page: "exercises" },
    { icon: "🥗", label: "Food Library", page: "foods" },
  ]},
  { section: "Account", items: [
    { icon: "🔑", label: "Manage Passwords", page: "passwords" },
    { icon: "⚙️", label: "Settings", page: "settings" },
  ]},
];

const clientNavItems = [
  { section: "My Journey", items: [
    { icon: "🏠", label: "Dashboard", page: "dashboard" },
    { icon: "📋", label: "Request a Plan", page: "request" },
    { icon: "💪", label: "My Plans", page: "plans" },
    { icon: "💬", label: "Coach Messages", page: "messages" },
  ]},
  { section: "Profile", items: [
    { icon: "👤", label: "Personal Info", page: "profile" },
    { icon: "⚙️", label: "Settings", page: "settings" },
  ]},
];

export default function Sidebar({ role = "coach", activePage, onNavigate, userName = "Coach Walid" }) {
  const [open, setOpen] = useState(false);
  const navItems = role === "coach" ? coachNavItems : clientNavItems;
  const initial = userName.charAt(0).toUpperCase();

  const handleNav = (page) => {
    onNavigate(page);
    setOpen(false);
  };

  return (
    <>
      <style>{styles}</style>

      {/* Mobile Topbar */}
      <div className="topbar">
        <div className="topbar-logo">Coach<span>It</span></div>
        <button className="topbar-menu-btn" onClick={() => setOpen(true)}>
          <span /><span /><span />
        </button>
      </div>

      {/* Overlay */}
      <div className={`sidebar-overlay ${open ? "open" : ""}`} onClick={() => setOpen(false)} />

      {/* Sidebar */}
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-logo">Coach<span>It</span></div>

        <div className="sidebar-user">
          <div className="sidebar-avatar">{initial}</div>
          <div>
            <div className="sidebar-user-name">{userName}</div>
            <div className="sidebar-user-role">{role}</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((section) => (
            <div key={section.section}>
              <div className="sidebar-section-label">{section.section}</div>
              {section.items.map((item) => (
                <button
                  key={item.page}
                  className={`sidebar-link ${activePage === item.page ? "active" : ""}`}
                  onClick={() => handleNav(item.page)}
                >
                  <span className="sidebar-link-icon">{item.icon}</span>
                  {item.label}
                  {item.badge && <span className="sidebar-link-badge">{item.badge}</span>}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-logout" onClick={() => { window.location.href = "/login"; }}>
            <span>🚪</span> Log Out
          </button>
        </div>
      </aside>
    </>
  );
}