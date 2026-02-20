import { useState } from "react";
import Sidebar from "../../components/common/Sidebar";
import { mockClients, mockRequests } from "../../utils/mockData";

const styles = `
  .dash-header { margin-bottom: 2rem; }
  .dash-header-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; flex-wrap: wrap; margin-bottom: 0.5rem; }
  .dash-greeting { font-family: var(--font-display); font-size: 2rem; font-weight: 800; color: var(--text-1); }
  .dash-greeting span { color: var(--orange); }
  .dash-date { font-size: 0.85rem; color: var(--text-3); }
  .kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 2rem; }
  .kpi-card {
    background: var(--bg-3); border: 1px solid var(--border);
    border-radius: var(--radius-lg); padding: 1.5rem;
    transition: var(--transition); position: relative; overflow: hidden;
  }
  .kpi-card:hover { border-color: var(--border-orange); transform: translateY(-2px); }
  .kpi-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: var(--orange); opacity: 0;
    transition: opacity 0.3s;
  }
  .kpi-card:hover::before { opacity: 1; }
  .kpi-icon { font-size: 1.5rem; margin-bottom: 0.75rem; display: block; }
  .kpi-value { font-family: var(--font-display); font-size: 2.25rem; font-weight: 900; color: var(--text-1); line-height: 1; }
  .kpi-value span { color: var(--orange); }
  .kpi-label { font-size: 0.78rem; color: var(--text-3); margin-top: 0.25rem; text-transform: uppercase; letter-spacing: 0.5px; }
  .kpi-trend { font-size: 0.7rem; color: #22C55E; margin-top: 0.5rem; font-weight: 600; }
  .dash-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem; }
  .dash-card { background: var(--bg-3); border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; }
  .dash-card-header { padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; }
  .dash-card-title { font-family: var(--font-display); font-size: 1.1rem; font-weight: 700; color: var(--text-1); }
  .dash-card-body { padding: 1.25rem 1.5rem; }
  .client-row {
    display: flex; align-items: center; gap: 0.75rem;
    padding: 0.75rem 0; border-bottom: 1px solid var(--border);
  }
  .client-row:last-child { border-bottom: none; }
  .client-row-avatar {
    width: 36px; height: 36px;
    background: linear-gradient(135deg, var(--orange), var(--orange-light));
    border-radius: 50%; display: flex; align-items: center; justify-content: center;
    font-family: var(--font-display); font-size: 1rem; font-weight: 700; color: #fff; flex-shrink: 0;
  }
  .client-row-name { font-size: 0.875rem; font-weight: 600; color: var(--text-1); }
  .client-row-info { font-size: 0.75rem; color: var(--text-3); }
  .client-row-right { margin-left: auto; }
  .request-row {
    padding: 0.85rem 0; border-bottom: 1px solid var(--border);
  }
  .request-row:last-child { border-bottom: none; }
  .request-row-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.25rem; }
  .request-row-name { font-size: 0.875rem; font-weight: 600; color: var(--text-1); }
  .request-row-date { font-size: 0.75rem; color: var(--text-4); }
  .request-row-detail { font-size: 0.78rem; color: var(--text-3); }
  .activity-list { display: flex; flex-direction: column; gap: 0.75rem; }
  .activity-item { display: flex; gap: 0.85rem; align-items: flex-start; }
  .activity-dot {
    width: 8px; height: 8px; border-radius: 50%; background: var(--orange);
    flex-shrink: 0; margin-top: 5px;
  }
  .activity-text { font-size: 0.85rem; color: var(--text-2); line-height: 1.5; }
  .activity-time { font-size: 0.75rem; color: var(--text-4); }
  @media (max-width: 1100px) { .kpi-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 768px) {
    .dash-cols { grid-template-columns: 1fr; }
    .kpi-grid { grid-template-columns: repeat(2, 1fr); }
  }
`;

export default function CoachDashboard({ onNavigate }) {
  const pendingRequests = mockRequests.filter(r => r.status === "pending").length;

  const kpis = [
    { icon: "👥", value: mockClients.length, label: "Active Clients", trend: "+2 this week" },
    { icon: "📬", value: pendingRequests, label: "Pending Requests", trend: "Needs attention" },
    { icon: "📋", value: "12", label: "Active Plans", trend: "+3 this month" },
    { icon: "⭐", value: "4.9", label: "Avg. Rating", trend: "Excellent" },
  ];

  const activities = [
    { text: "New plan request from Nour Khalid", time: "2 hours ago" },
    { text: "Ahmad Khalil's plan expired — renewal needed", time: "5 hours ago" },
    { text: "Bassem Younis sent a plan request", time: "Yesterday" },
    { text: "You approved Dina Mansour's workout plan", time: "Yesterday" },
    { text: "New client registration: Lara Haddad", time: "2 days ago" },
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="dashboard-layout">
        <Sidebar role="coach" activePage="dashboard" onNavigate={onNavigate} userName="Coach Walid" />
        <main className="dashboard-main">
          <div className="dashboard-content">
            <div className="dash-header">
              <div className="dash-header-top">
                <div>
                  <h1 className="dash-greeting">Good morning, <span>Coach Walid</span> 💪</h1>
                  <div className="dash-date">{new Date().toLocaleDateString("en-US", { weekday:"long", year:"numeric", month:"long", day:"numeric"})}</div>
                </div>
                <button className="btn-primary btn-sm" onClick={() => onNavigate("requests")}>
                  View Requests {pendingRequests > 0 && `(${pendingRequests})`}
                </button>
              </div>
            </div>

            {/* KPIs */}
            <div className="kpi-grid">
              {kpis.map((k, i) => (
                <div className="kpi-card" key={i}>
                  <span className="kpi-icon">{k.icon}</span>
                  <div className="kpi-value">{k.value}</div>
                  <div className="kpi-label">{k.label}</div>
                  <div className="kpi-trend">↑ {k.trend}</div>
                </div>
              ))}
            </div>

            {/* Main Cols */}
            <div className="dash-cols">
              {/* Recent Clients */}
              <div className="dash-card">
                <div className="dash-card-header">
                  <span className="dash-card-title">Recent Clients</span>
                  <button className="btn-ghost btn-sm" onClick={() => onNavigate("clients")}>View All</button>
                </div>
                <div className="dash-card-body">
                  {mockClients.slice(0, 4).map(c => (
                    <div className="client-row" key={c.id}>
                      <div className="client-row-avatar">{c.name.charAt(0)}</div>
                      <div>
                        <div className="client-row-name">{c.name}</div>
                        <div className="client-row-info">{c.plan} Plan · {c.level}</div>
                      </div>
                      <div className="client-row-right">
                        <span className="badge badge-green">Active</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pending Requests */}
              <div className="dash-card">
                <div className="dash-card-header">
                  <span className="dash-card-title">Plan Requests</span>
                  <button className="btn-ghost btn-sm" onClick={() => onNavigate("requests")}>View All</button>
                </div>
                <div className="dash-card-body">
                  {mockRequests.map(r => (
                    <div className="request-row" key={r.id}>
                      <div className="request-row-top">
                        <span className="request-row-name">{r.name}</span>
                        <span className="request-row-date">{r.date}</span>
                      </div>
                      <div style={{display:"flex", gap:"0.5rem", alignItems:"center"}}>
                        <span className="request-row-detail">{r.planType.join(", ")} · {r.level}</span>
                        <span className={`badge ${r.status === "pending" ? "badge-orange" : "badge-green"}`}>{r.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Activity Feed */}
            <div className="dash-card">
              <div className="dash-card-header">
                <span className="dash-card-title">Recent Activity</span>
              </div>
              <div className="dash-card-body">
                <div className="activity-list">
                  {activities.map((a, i) => (
                    <div className="activity-item" key={i}>
                      <div className="activity-dot" />
                      <div>
                        <div className="activity-text">{a.text}</div>
                        <div className="activity-time">{a.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}