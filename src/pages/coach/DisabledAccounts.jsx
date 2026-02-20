import { useState } from "react";
import Sidebar from "../../components/common/Sidebar";
import { mockDisabledClients } from "../../utils/mockData";

const styles = `
  .da-header { margin-bottom: 1.75rem; }
  .da-title { font-family: var(--font-display); font-size: 2rem; font-weight: 800; color: var(--text-1); }
  .da-title span { color: var(--orange); }
  .da-sub { font-size: 0.875rem; color: var(--text-3); margin-top: 0.25rem; }
  .da-toolbar { margin-bottom: 1.5rem; }
  .da-search-wrap { position: relative; max-width: 360px; }
  .da-search-icon { position: absolute; left: 0.9rem; top: 50%; transform: translateY(-50%); opacity: 0.4; }
  .da-search { padding-left: 2.5rem; }
  .da-info-banner { background: rgba(255,68,68,0.05); border: 1px solid rgba(255,68,68,0.12); border-radius: var(--radius-md); padding: 1rem 1.25rem; margin-bottom: 1.5rem; display: flex; gap: 0.75rem; align-items: flex-start; font-size: 0.875rem; color: var(--text-2); }
  .da-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1rem; }
  .da-card { background: var(--bg-3); border: 1px solid rgba(255,68,68,0.15); border-radius: var(--radius-lg); overflow: hidden; transition: var(--transition); }
  .da-card:hover { border-color: rgba(255,68,68,0.3); }
  .da-card-header { padding: 1.25rem; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 0.85rem; }
  .da-avatar { width: 44px; height: 44px; background: var(--bg-4); border: 1px solid var(--border); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: var(--font-display); font-size: 1.2rem; font-weight: 700; color: var(--text-3); }
  .da-name { font-family: var(--font-display); font-size: 1.15rem; font-weight: 700; color: var(--text-1); }
  .da-email { font-size: 0.78rem; color: var(--text-3); }
  .da-card-body { padding: 1.25rem; }
  .da-detail { display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0; border-bottom: 1px solid var(--border); font-size: 0.85rem; }
  .da-detail:last-child { border-bottom: none; }
  .da-detail-label { color: var(--text-3); }
  .da-detail-val { color: var(--text-1); font-weight: 500; }
  .da-card-footer { padding: 1rem 1.25rem; border-top: 1px solid var(--border); display: flex; gap: 0.75rem; }
  .empty-state { padding: 4rem 2rem; text-align: center; color: var(--text-3); }
  .empty-icon { font-size: 3.5rem; display: block; margin-bottom: 1rem; opacity: 0.3; }
  .re-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.75); z-index: 500; display: flex; align-items: center; justify-content: center; padding: 1rem; backdrop-filter: blur(4px); }
  .re-modal { background: var(--bg-2); border: 1px solid var(--border); border-radius: var(--radius-xl); padding: 2rem; width: 100%; max-width: 440px; }
  .re-modal-title { font-family: var(--font-display); font-size: 1.5rem; font-weight: 800; color: var(--text-1); margin-bottom: 0.5rem; }
  .re-modal-sub { font-size: 0.875rem; color: var(--text-3); margin-bottom: 1.5rem; }
  .re-confirm-box { background: rgba(34,197,94,0.05); border: 1px solid rgba(34,197,94,0.15); border-radius: var(--radius-md); padding: 1rem; font-size: 0.875rem; color: var(--text-2); margin-bottom: 1.5rem; }
  .re-modal-footer { display: flex; gap: 0.75rem; justify-content: flex-end; }
  .btn-success { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.75rem 1.75rem; background: rgba(34,197,94,0.1); color: #22C55E; border: 1px solid rgba(34,197,94,0.25); border-radius: var(--radius-sm); font-size: 0.9rem; font-weight: 600; font-family: var(--font-body); cursor: pointer; transition: var(--transition); }
  .btn-success:hover { background: rgba(34,197,94,0.15); }
`;

export default function DisabledAccounts({ onNavigate }) {
  const [disabled, setDisabled] = useState(mockDisabledClients);
  const [search, setSearch] = useState("");
  const [reEnableTarget, setReEnableTarget] = useState(null);

  const filtered = disabled.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()));

  const handleReEnable = () => {
    setDisabled(disabled.filter(c => c.id !== reEnableTarget.id));
    setReEnableTarget(null);
  };

  const handlePermanentDelete = (id) => {
    setDisabled(disabled.filter(c => c.id !== id));
  };

  return (
    <>
      <style>{styles}</style>
      <div className="dashboard-layout">
        <Sidebar role="coach" activePage="disabled" onNavigate={onNavigate} userName="Coach Walid" />
        <main className="dashboard-main">
          <div className="dashboard-content">
            <div className="da-header">
              <h1 className="da-title">Disabled <span>Accounts</span></h1>
              <div className="da-sub">{disabled.length} disabled account{disabled.length !== 1 ? "s" : ""}</div>
            </div>

            <div className="da-info-banner">
              <span>🚫</span>
              <div>Clients in this list have their accounts disabled and cannot access the platform. You can re-enable their account at any time to restore their access.</div>
            </div>

            <div className="da-toolbar">
              <div className="da-search-wrap">
                <span className="da-search-icon">🔍</span>
                <input className="input-field da-search" placeholder="Search disabled accounts..." value={search} onChange={e => setSearch(e.target.value)} />
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon">✅</span>
                <div>No disabled accounts found.</div>
              </div>
            ) : (
              <div className="da-grid">
                {filtered.map(client => (
                  <div className="da-card" key={client.id}>
                    <div className="da-card-header">
                      <div className="da-avatar">{client.name.charAt(0)}</div>
                      <div>
                        <div className="da-name">{client.name}</div>
                        <div className="da-email">{client.email}</div>
                      </div>
                      <span className="badge badge-red" style={{marginLeft:"auto"}}>Disabled</span>
                    </div>
                    <div className="da-card-body">
                      <div className="da-detail">
                        <span className="da-detail-label">Disabled On</span>
                        <span className="da-detail-val">{client.disabledDate}</span>
                      </div>
                      <div className="da-detail">
                        <span className="da-detail-label">Reason</span>
                        <span className="da-detail-val">{client.reason}</span>
                      </div>
                    </div>
                    <div className="da-card-footer">
                      <button className="btn-success btn-sm" style={{flex:1}} onClick={() => setReEnableTarget(client)}>✅ Re-Enable</button>
                      <button className="btn-danger btn-sm" onClick={() => handlePermanentDelete(client.id)}>🗑️ Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Re-enable Modal */}
      {reEnableTarget && (
        <div className="re-modal-overlay" onClick={() => setReEnableTarget(null)}>
          <div className="re-modal" onClick={e => e.stopPropagation()}>
            <h3 className="re-modal-title">Re-Enable Account</h3>
            <p className="re-modal-sub">You are about to re-enable {reEnableTarget.name}'s account.</p>
            <div className="re-confirm-box">
              ✅ <strong>{reEnableTarget.name}</strong> will regain full access to the platform. They will be moved back to your active clients list.
            </div>
            <div className="re-modal-footer">
              <button className="btn-secondary" onClick={() => setReEnableTarget(null)}>Cancel</button>
              <button className="btn-success" onClick={handleReEnable}>Re-Enable Account</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}