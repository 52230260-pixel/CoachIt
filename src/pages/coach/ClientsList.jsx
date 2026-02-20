import { useState } from "react";
import Sidebar from "../../components/common/Sidebar";
import { mockClients } from "../../utils/mockData";

const styles = `
  .cl-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; flex-wrap: wrap; margin-bottom: 1.75rem; }
  .cl-title { font-family: var(--font-display); font-size: 2rem; font-weight: 800; color: var(--text-1); }
  .cl-title span { color: var(--orange); }
  .cl-sub { font-size: 0.875rem; color: var(--text-3); margin-top: 0.25rem; }
  .cl-toolbar { display: flex; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 1.5rem; align-items: center; }
  .cl-search-wrap { position: relative; flex: 1; min-width: 220px; max-width: 360px; }
  .cl-search-icon { position: absolute; left: 0.9rem; top: 50%; transform: translateY(-50%); opacity: 0.4; font-size: 0.9rem; }
  .cl-search { padding-left: 2.5rem; }
  .cl-filter { padding: 0.75rem 1rem; background: var(--bg-3); border: 1px solid var(--border); border-radius: var(--radius-sm); color: var(--text-2); font-size: 0.85rem; font-family: var(--font-body); outline: none; cursor: pointer; }
  .cl-filter:focus { border-color: var(--orange); }
  .cl-table-wrap { background: var(--bg-3); border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; }
  .cl-table { width: 100%; border-collapse: collapse; }
  .cl-table th {
    padding: 0.85rem 1.25rem; text-align: left;
    font-size: 0.7rem; font-weight: 700; color: var(--text-4);
    text-transform: uppercase; letter-spacing: 1px;
    border-bottom: 1px solid var(--border);
    background: var(--bg-4);
  }
  .cl-table td { padding: 1rem 1.25rem; border-bottom: 1px solid var(--border); vertical-align: middle; }
  .cl-table tr:last-child td { border-bottom: none; }
  .cl-table tr:hover td { background: rgba(255,255,255,0.015); }
  .cl-client-name { font-weight: 600; color: var(--text-1); font-size: 0.9rem; }
  .cl-client-email { font-size: 0.78rem; color: var(--text-3); }
  .cl-avatar { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, var(--orange), var(--orange-light)); display: flex; align-items: center; justify-content: center; font-family: var(--font-display); font-size: 1rem; font-weight: 700; color: #fff; flex-shrink: 0; }
  .cl-name-cell { display: flex; align-items: center; gap: 0.75rem; }
  .cl-actions { display: flex; gap: 0.5rem; }
  .cl-end-date { font-size: 0.8rem; color: var(--text-2); }
  .cl-end-date.soon { color: #FF9500; }
  .modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.75);
    z-index: 500; display: flex; align-items: center; justify-content: center; padding: 1rem;
    backdrop-filter: blur(4px);
    animation: fadeIn 0.2s ease;
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  .modal-box {
    background: var(--bg-2); border: 1px solid var(--border);
    border-radius: var(--radius-xl); padding: 2rem;
    width: 100%; max-width: 500px;
    animation: slideUp 0.25s ease;
  }
  @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  .modal-title { font-family: var(--font-display); font-size: 1.5rem; font-weight: 800; color: var(--text-1); margin-bottom: 0.5rem; }
  .modal-sub { font-size: 0.875rem; color: var(--text-3); margin-bottom: 1.5rem; }
  .modal-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 0.75rem; }
  .modal-detail { background: var(--bg-4); border-radius: var(--radius-sm); padding: 0.75rem 1rem; }
  .modal-detail-label { font-size: 0.68rem; font-weight: 700; color: var(--text-4); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 0.2rem; }
  .modal-detail-val { font-size: 0.9rem; color: var(--text-1); font-weight: 500; }
  .modal-footer { display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 1.5rem; flex-wrap: wrap; }
  .disable-confirm-box { background: rgba(255,68,68,0.05); border: 1px solid rgba(255,68,68,0.15); border-radius: var(--radius-md); padding: 1rem; font-size: 0.875rem; color: var(--text-2); margin-bottom: 1.5rem; }
  .empty-state { padding: 4rem 2rem; text-align: center; }
  .empty-icon { font-size: 3rem; display: block; margin-bottom: 1rem; opacity: 0.4; }
  .empty-text { color: var(--text-3); font-size: 0.9rem; }
  @media (max-width: 900px) {
    .cl-table thead { display: none; }
    .cl-table tr { display: block; padding: 1rem; border-bottom: 1px solid var(--border); }
    .cl-table td { display: block; padding: 0.3rem 0; border: none; }
    .cl-actions { margin-top: 0.75rem; }
  }
`;

export default function ClientsList({ onNavigate }) {
  const [clients, setClients] = useState(mockClients);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedClient, setSelectedClient] = useState(null);
  const [modal, setModal] = useState(null); // "view" | "disable"

  const filtered = clients.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" ? true : c.plan.toLowerCase().includes(filter);
    return matchSearch && matchFilter;
  });

  const openModal = (client, type) => { setSelectedClient(client); setModal(type); };
  const closeModal = () => { setSelectedClient(null); setModal(null); };

  const handleDisable = () => {
    setClients(clients.filter(c => c.id !== selectedClient.id));
    closeModal();
  };

  const getDaysLeft = (endDate) => {
    const diff = Math.ceil((new Date(endDate) - new Date()) / (1000*60*60*24));
    return diff;
  };

  return (
    <>
      <style>{styles}</style>
      <div className="dashboard-layout">
        <Sidebar role="coach" activePage="clients" onNavigate={onNavigate} userName="Coach Walid" />
        <main className="dashboard-main">
          <div className="dashboard-content">
            <div className="cl-header">
              <div>
                <h1 className="cl-title">My <span>Clients</span></h1>
                <div className="cl-sub">{clients.length} active clients</div>
              </div>
            </div>

            <div className="cl-toolbar">
              <div className="cl-search-wrap">
                <span className="cl-search-icon">🔍</span>
                <input className="input-field cl-search" placeholder="Search by name or email..." value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <select className="cl-filter" value={filter} onChange={e => setFilter(e.target.value)}>
                <option value="all">All Plans</option>
                <option value="workout">Workout</option>
                <option value="diet">Diet</option>
                <option value="both">Both</option>
              </select>
            </div>

            <div className="cl-table-wrap">
              {filtered.length === 0 ? (
                <div className="empty-state">
                  <span className="empty-icon">🔍</span>
                  <div className="empty-text">No clients match your search.</div>
                </div>
              ) : (
                <table className="cl-table">
                  <thead>
                    <tr>
                      <th>Client</th>
                      <th>Plan Type</th>
                      <th>Level</th>
                      <th>Plan Ends</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(c => {
                      const days = getDaysLeft(c.endDate);
                      return (
                        <tr key={c.id}>
                          <td>
                            <div className="cl-name-cell">
                              <div className="cl-avatar">{c.name.charAt(0)}</div>
                              <div>
                                <div className="cl-client-name">{c.name}</div>
                                <div className="cl-client-email">{c.email}</div>
                              </div>
                            </div>
                          </td>
                          <td><span className="badge badge-orange">{c.plan}</span></td>
                          <td><span className="badge badge-gray">{c.level}</span></td>
                          <td>
                            <div className={`cl-end-date ${days < 7 ? "soon" : ""}`}>
                              {c.endDate} {days < 7 && days >= 0 && `⚠️ ${days}d left`}
                            </div>
                          </td>
                          <td>
                            <div className="cl-actions">
                              <button className="btn-ghost btn-sm" onClick={() => openModal(c, "view")}>Manage</button>
                              <button className="btn-danger btn-sm" onClick={() => openModal(c, "disable")}>Disable</button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* View / Manage Modal */}
      {modal === "view" && selectedClient && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <h3 className="modal-title">{selectedClient.name}</h3>
            <p className="modal-sub">Client overview and details</p>
            <div className="modal-row">
              <div className="modal-detail">
                <div className="modal-detail-label">Email</div>
                <div className="modal-detail-val">{selectedClient.email}</div>
              </div>
              <div className="modal-detail">
                <div className="modal-detail-label">Phone</div>
                <div className="modal-detail-val">{selectedClient.phone || "—"}</div>
              </div>
            </div>
            <div className="modal-row">
              <div className="modal-detail">
                <div className="modal-detail-label">Weight</div>
                <div className="modal-detail-val">{selectedClient.weight} kg</div>
              </div>
              <div className="modal-detail">
                <div className="modal-detail-label">Height</div>
                <div className="modal-detail-val">{selectedClient.height} cm</div>
              </div>
            </div>
            <div className="modal-row">
              <div className="modal-detail">
                <div className="modal-detail-label">Age</div>
                <div className="modal-detail-val">{selectedClient.age} yrs</div>
              </div>
              <div className="modal-detail">
                <div className="modal-detail-label">Level</div>
                <div className="modal-detail-val">{selectedClient.level}</div>
              </div>
            </div>
            <div className="modal-row">
              <div className="modal-detail">
                <div className="modal-detail-label">Plan Type</div>
                <div className="modal-detail-val">{selectedClient.plan}</div>
              </div>
              <div className="modal-detail">
                <div className="modal-detail-label">Plan Period</div>
                <div className="modal-detail-val">{selectedClient.startDate} → {selectedClient.endDate}</div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={closeModal}>Close</button>
              <button className="btn-primary" onClick={() => { closeModal(); onNavigate("manage-client-" + selectedClient.id); }}>Manage Plan</button>
            </div>
          </div>
        </div>
      )}

      {/* Disable Modal */}
      {modal === "disable" && selectedClient && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <h3 className="modal-title">Disable Account</h3>
            <p className="modal-sub">You are about to disable {selectedClient.name}'s account.</p>
            <div className="disable-confirm-box">
              ⚠️ This will move <strong>{selectedClient.name}</strong> to the disabled accounts list. They will lose access to their plans immediately. You can re-enable their account at any time.
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={closeModal}>Cancel</button>
              <button className="btn-danger" onClick={handleDisable}>Yes, Disable Account</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}