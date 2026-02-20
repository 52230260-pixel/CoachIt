import { useState } from "react";
import Sidebar from "../../components/common/Sidebar";
import { mockClients } from "../../utils/mockData";

const styles = `
  .mp-header { margin-bottom: 1.75rem; }
  .mp-title { font-family: var(--font-display); font-size: 2rem; font-weight: 800; color: var(--text-1); }
  .mp-title span { color: var(--orange); }
  .mp-sub { font-size: 0.875rem; color: var(--text-3); margin-top: 0.25rem; }
  .mp-warn { background: rgba(255,149,0,0.06); border: 1px solid rgba(255,149,0,0.2); border-radius: var(--radius-md); padding: 1rem 1.25rem; display: flex; gap: 0.75rem; font-size: 0.875rem; color: var(--text-2); margin-bottom: 1.5rem; }
  .mp-table-wrap { background: var(--bg-3); border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; margin-bottom: 1.5rem; }
  .mp-table { width: 100%; border-collapse: collapse; }
  .mp-table th { padding: 0.85rem 1.25rem; text-align: left; font-size: 0.7rem; font-weight: 700; color: var(--text-4); text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid var(--border); background: var(--bg-4); }
  .mp-table td { padding: 1rem 1.25rem; border-bottom: 1px solid var(--border); vertical-align: middle; }
  .mp-table tr:last-child td { border-bottom: none; }
  .mp-table tr:hover td { background: rgba(255,255,255,0.015); }
  .mp-client-cell { display: flex; align-items: center; gap: 0.75rem; }
  .mp-avatar { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, var(--orange), var(--orange-light)); display: flex; align-items: center; justify-content: center; font-family: var(--font-display); font-size: 1rem; font-weight: 700; color: #fff; flex-shrink: 0; }
  .mp-name { font-weight: 600; color: var(--text-1); font-size: 0.875rem; }
  .mp-email { font-size: 0.75rem; color: var(--text-3); }
  .pw-field-wrap { position: relative; display: flex; gap: 0.5rem; }
  .pw-input { flex: 1; padding: 0.6rem 0.85rem; background: var(--bg-4); border: 1px solid var(--border); border-radius: var(--radius-sm); color: var(--text-1); font-size: 0.85rem; font-family: var(--font-body); outline: none; transition: var(--transition); max-width: 200px; }
  .pw-input:focus { border-color: var(--orange); box-shadow: 0 0 0 3px rgba(255,107,0,0.1); }
  .pw-toggle { background: none; border: none; color: var(--text-3); cursor: pointer; font-size: 0.9rem; padding: 0 0.3rem; }
  .pw-toggle:hover { color: var(--orange); }
  .pw-success-badge { display: inline-flex; align-items: center; gap: 0.3rem; font-size: 0.75rem; color: #22C55E; font-weight: 600; animation: fadeInGreen 0.3s ease; }
  @keyframes fadeInGreen { from { opacity:0; transform: scale(0.8); } to { opacity:1; transform: scale(1); } }
  .mp-generate-btn { padding: 0.5rem 0.85rem; background: var(--bg-4); border: 1px solid var(--border); border-radius: var(--radius-sm); color: var(--text-2); font-size: 0.75rem; font-family: var(--font-body); cursor: pointer; transition: var(--transition); white-space: nowrap; }
  .mp-generate-btn:hover { border-color: var(--border-orange); color: var(--orange); }
  @media (max-width: 900px) {
    .mp-table thead { display: none; }
    .mp-table tr { display: block; padding: 1rem; border-bottom: 1px solid var(--border); }
    .mp-table td { display: block; padding: 0.4rem 0; border: none; }
    .pw-field-wrap { flex-wrap: wrap; }
    .pw-input { max-width: 100%; }
  }
`;

function generatePassword() {
  const chars = "ABCDEFGHJKMNPQRSTWXYZabcdefghjkmnpqrstwxyz23456789!@#$";
  return Array.from({length: 12}, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

export default function ManagePasswords({ onNavigate }) {
  const [passwords, setPasswords] = useState(
    mockClients.reduce((acc, c) => ({...acc, [c.id]: ""}), {})
  );
  const [shown, setShown] = useState({});
  const [saved, setSaved] = useState({});

  const updatePw = (id, val) => setPasswords(p => ({...p, [id]: val}));
  const toggleShow = (id) => setShown(s => ({...s, [id]: !s[id]}));
  const generate = (id) => updatePw(id, generatePassword());

  const handleSave = (id) => {
    if (!passwords[id]) return;
    setSaved(s => ({...s, [id]: true}));
    setTimeout(() => setSaved(s => ({...s, [id]: false})), 2500);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="dashboard-layout">
        <Sidebar role="coach" activePage="passwords" onNavigate={onNavigate} userName="Coach Walid" />
        <main className="dashboard-main">
          <div className="dashboard-content">
            <div className="mp-header">
              <h1 className="mp-title">Manage <span>Passwords</span></h1>
              <div className="mp-sub">Reset or update client account passwords</div>
            </div>

            <div className="mp-warn">
              <span>⚠️</span>
              <div>After changing a client's password, make sure to share the new password with them securely. Always encourage clients to change their password after logging in.</div>
            </div>

            <div className="mp-table-wrap">
              <table className="mp-table">
                <thead>
                  <tr>
                    <th>Client</th>
                    <th>New Password</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {mockClients.map(c => (
                    <tr key={c.id}>
                      <td>
                        <div className="mp-client-cell">
                          <div className="mp-avatar">{c.name.charAt(0)}</div>
                          <div>
                            <div className="mp-name">{c.name}</div>
                            <div className="mp-email">{c.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="pw-field-wrap">
                          <input
                            type={shown[c.id] ? "text" : "password"}
                            className="pw-input"
                            placeholder="New password..."
                            value={passwords[c.id]}
                            onChange={e => updatePw(c.id, e.target.value)}
                          />
                          <button className="pw-toggle" onClick={() => toggleShow(c.id)}>
                            {shown[c.id] ? "🙈" : "👁️"}
                          </button>
                          <button className="mp-generate-btn" onClick={() => generate(c.id)}>🎲 Generate</button>
                        </div>
                      </td>
                      <td>
                        <div style={{display:"flex", alignItems:"center", gap:"0.75rem"}}>
                          <button className="btn-primary btn-sm" onClick={() => handleSave(c.id)} disabled={!passwords[c.id]}>
                            Save
                          </button>
                          {saved[c.id] && <span className="pw-success-badge">✅ Saved!</span>}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}