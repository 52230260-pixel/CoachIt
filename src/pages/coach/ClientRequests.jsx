import { useState } from "react";
import Sidebar from "../../components/common/Sidebar";
import { mockRequests } from "../../utils/mockData";

const styles = `
  .req-header { margin-bottom: 1.75rem; }
  .req-title { font-family: var(--font-display); font-size: 2rem; font-weight: 800; color: var(--text-1); }
  .req-title span { color: var(--orange); }
  .req-sub { font-size: 0.875rem; color: var(--text-3); margin-top: 0.25rem; }
  .req-tabs { display: flex; gap: 0.25rem; margin-bottom: 1.5rem; background: var(--bg-3); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 0.3rem; width: fit-content; }
  .req-tab { padding: 0.5rem 1.25rem; border-radius: calc(var(--radius-md) - 4px); font-size: 0.85rem; font-weight: 600; color: var(--text-3); cursor: pointer; background: none; border: none; transition: var(--transition); }
  .req-tab.active { background: var(--orange); color: #fff; }
  .req-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 1.25rem; }
  .req-card { background: var(--bg-3); border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; transition: var(--transition); }
  .req-card:hover { border-color: var(--border-orange); }
  .req-card-header { padding: 1.25rem; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: flex-start; }
  .req-card-name { font-family: var(--font-display); font-size: 1.2rem; font-weight: 700; color: var(--text-1); }
  .req-card-date { font-size: 0.75rem; color: var(--text-4); margin-top: 0.25rem; }
  .req-card-body { padding: 1.25rem; }
  .req-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; margin-bottom: 1rem; }
  .req-info-item { background: var(--bg-4); border-radius: var(--radius-sm); padding: 0.6rem 0.85rem; }
  .req-info-label { font-size: 0.65rem; font-weight: 700; color: var(--text-4); text-transform: uppercase; letter-spacing: 0.5px; }
  .req-info-val { font-size: 0.875rem; color: var(--text-1); font-weight: 500; margin-top: 0.1rem; }
  .req-plan-tags { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.25rem; }
  .req-card-actions { display: flex; gap: 0.75rem; }
  .approve-modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.75);
    z-index: 500; display: flex; align-items: center; justify-content: center; padding: 1rem;
    backdrop-filter: blur(4px);
    animation: fadeIn 0.2s ease;
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  .approve-modal {
    background: var(--bg-2); border: 1px solid var(--border);
    border-radius: var(--radius-xl); padding: 2rem;
    width: 100%; max-width: 520px;
    animation: slideUp 0.25s ease;
    max-height: 90vh; overflow-y: auto;
  }
  @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  .am-title { font-family: var(--font-display); font-size: 1.5rem; font-weight: 800; color: var(--text-1); margin-bottom: 0.5rem; }
  .am-sub { font-size: 0.875rem; color: var(--text-3); margin-bottom: 1.5rem; }
  .am-msg-box { background: var(--bg-4); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 1rem; margin-bottom: 1.25rem; }
  .am-msg-label { font-size: 0.7rem; font-weight: 700; color: var(--text-4); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 0.5rem; }
  .am-msg-text { font-size: 0.85rem; color: var(--text-2); line-height: 1.6; }
  .am-footer { display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 1.5rem; flex-wrap: wrap; }
  .empty-state { padding: 4rem 2rem; text-align: center; color: var(--text-3); }
  .empty-icon-big { font-size: 4rem; opacity: 0.3; margin-bottom: 1rem; display: block; }
`;

export default function ClientRequests({ onNavigate }) {
  const [requests, setRequests] = useState(mockRequests);
  const [tab, setTab] = useState("pending");
  const [selectedReq, setSelectedReq] = useState(null);
  const [message, setMessage] = useState("");

  const filtered = requests.filter(r => tab === "all" ? true : r.status === tab);

  const handleApprove = () => {
    if (!message.trim()) return;
    setRequests(requests.map(r => r.id === selectedReq.id ? {...r, status:"approved"} : r));
    setSelectedReq(null);
    setMessage("");
  };

  const handleReject = (id) => {
    setRequests(requests.map(r => r.id === id ? {...r, status:"rejected"} : r));
  };

  return (
    <>
      <style>{styles}</style>
      <div className="dashboard-layout">
        <Sidebar role="coach" activePage="requests" onNavigate={onNavigate} userName="Coach Walid" />
        <main className="dashboard-main">
          <div className="dashboard-content">
            <div className="req-header">
              <h1 className="req-title">Client <span>Requests</span></h1>
              <div className="req-sub">{requests.filter(r=>r.status==="pending").length} pending requests</div>
            </div>

            <div className="req-tabs">
              {[["pending","Pending"],["approved","Approved"],["rejected","Rejected"],["all","All"]].map(([val,label])=>(
                <button key={val} className={`req-tab ${tab===val?"active":""}`} onClick={()=>setTab(val)}>{label}</button>
              ))}
            </div>

            {filtered.length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon-big">📭</span>
                <div>No {tab} requests found.</div>
              </div>
            ) : (
              <div className="req-grid">
                {filtered.map(req => (
                  <div className="req-card" key={req.id}>
                    <div className="req-card-header">
                      <div>
                        <div className="req-card-name">{req.name}</div>
                        <div className="req-card-date">Requested on {req.date}</div>
                      </div>
                      <span className={`badge ${req.status==="pending"?"badge-orange":req.status==="approved"?"badge-green":"badge-red"}`}>
                        {req.status}
                      </span>
                    </div>
                    <div className="req-card-body">
                      <div className="req-info-grid">
                        <div className="req-info-item">
                          <div className="req-info-label">Age</div>
                          <div className="req-info-val">{req.age} yrs</div>
                        </div>
                        <div className="req-info-item">
                          <div className="req-info-label">Gender</div>
                          <div className="req-info-val">{req.gender}</div>
                        </div>
                        <div className="req-info-item">
                          <div className="req-info-label">Weight</div>
                          <div className="req-info-val">{req.weight} kg</div>
                        </div>
                        <div className="req-info-item">
                          <div className="req-info-label">Height</div>
                          <div className="req-info-val">{req.height} cm</div>
                        </div>
                        <div className="req-info-item">
                          <div className="req-info-label">Level</div>
                          <div className="req-info-val">{req.level}</div>
                        </div>
                        <div className="req-info-item">
                          <div className="req-info-label">Phone</div>
                          <div className="req-info-val">{req.phone || "—"}</div>
                        </div>
                      </div>
                      <div className="req-plan-tags">
                        {req.planType.map(p => <span key={p} className="badge badge-orange">{p} Plan</span>)}
                      </div>
                      {req.status === "pending" && (
                        <div className="req-card-actions">
                          <button className="btn-primary btn-sm" style={{flex:1}} onClick={() => setSelectedReq(req)}>
                            ✅ Approve & Send Message
                          </button>
                          <button className="btn-danger btn-sm" onClick={() => handleReject(req.id)}>Reject</button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Approve Modal */}
      {selectedReq && (
        <div className="approve-modal-overlay" onClick={() => setSelectedReq(null)}>
          <div className="approve-modal" onClick={e => e.stopPropagation()}>
            <h3 className="am-title">Approve & Send Plan Details</h3>
            <p className="am-sub">You're approving <strong>{selectedReq.name}</strong>'s request for <strong>{selectedReq.planType.join(" + ")}</strong>. Write a message with plan details that will appear in their Coach Messages.</p>

            <div className="am-msg-box">
              <div className="am-msg-label">📋 Client Request Summary</div>
              <div className="am-msg-text">
                {selectedReq.gender}, {selectedReq.age}y · {selectedReq.weight}kg / {selectedReq.height}cm · Level: {selectedReq.level}<br />
                Plans requested: {selectedReq.planType.join(", ")}
              </div>
            </div>

            <div className="form-group">
              <label className="label">Message to Client *</label>
              <textarea
                className="input-field"
                style={{minHeight:"160px", resize:"vertical"}}
                placeholder="Hi! Your plan has been approved. Here are your details...&#10;&#10;Workout Plan:&#10;- Day 1: ...&#10;&#10;Diet Plan:&#10;- Breakfast: ..."
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="label">Plan Start Date</label>
              <input type="date" className="input-field" defaultValue={new Date().toISOString().split("T")[0]} />
            </div>

            <div className="form-group">
              <label className="label">Plan End Date</label>
              <input type="date" className="input-field" />
            </div>

            <div className="am-footer">
              <button className="btn-secondary" onClick={() => setSelectedReq(null)}>Cancel</button>
              <button className="btn-primary" onClick={handleApprove} disabled={!message.trim()}>
                ✅ Approve & Notify Client
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}