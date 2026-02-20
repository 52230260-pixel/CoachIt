import { useState } from "react";
import Sidebar from "../../components/common/Sidebar";

const styles = `
  .settings-title { font-family: var(--font-display); font-size: 2rem; font-weight: 800; color: var(--text-1); margin-bottom: 0.25rem; }
  .settings-title span { color: var(--orange); }
  .settings-sub { font-size: 0.875rem; color: var(--text-3); margin-bottom: 2rem; }
  .settings-grid { display: grid; grid-template-columns: 240px 1fr; gap: 2rem; }
  .settings-nav { display: flex; flex-direction: column; gap: 0.25rem; }
  .settings-nav-item { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1rem; border-radius: var(--radius-sm); font-size: 0.875rem; font-weight: 500; color: var(--text-3); cursor: pointer; transition: var(--transition); border: none; background: none; text-align: left; }
  .settings-nav-item:hover { background: rgba(255,255,255,0.04); color: var(--text-1); }
  .settings-nav-item.active { background: rgba(255,107,0,0.1); color: var(--orange); border-left: 2px solid var(--orange); }
  .settings-nav-icon { font-size: 1rem; }
  .settings-panel { display: flex; flex-direction: column; gap: 1.5rem; }
  .settings-section { background: var(--bg-3); border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; }
  .settings-section-header { padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--border); }
  .settings-section-title { font-family: var(--font-display); font-size: 1.15rem; font-weight: 700; color: var(--text-1); }
  .settings-section-desc { font-size: 0.8rem; color: var(--text-3); margin-top: 0.2rem; }
  .settings-section-body { padding: 1.5rem; }
  .settings-row { display: flex; justify-content: space-between; align-items: center; padding: 0.85rem 0; border-bottom: 1px solid var(--border); }
  .settings-row:last-child { border-bottom: none; }
  .settings-row-label { font-size: 0.9rem; color: var(--text-1); font-weight: 500; }
  .settings-row-desc { font-size: 0.78rem; color: var(--text-3); margin-top: 0.15rem; }
  .settings-row-control { flex-shrink: 0; margin-left: 1rem; }
  .toggle {
    width: 44px; height: 24px; background: var(--bg-4);
    border: 1px solid var(--border); border-radius: 100px; cursor: pointer;
    position: relative; transition: var(--transition);
  }
  .toggle.on { background: var(--orange); border-color: var(--orange); }
  .toggle-thumb {
    width: 18px; height: 18px; border-radius: 50%; background: #fff;
    position: absolute; top: 2px; left: 3px;
    transition: transform 0.25s ease;
    box-shadow: 0 1px 3px rgba(0,0,0,0.4);
  }
  .toggle.on .toggle-thumb { transform: translateX(19px); }
  .settings-avatar-section { display: flex; align-items: center; gap: 1.5rem; margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--border); }
  .settings-avatar { width: 80px; height: 80px; background: linear-gradient(135deg, var(--orange), var(--orange-light)); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: var(--font-display); font-size: 2rem; font-weight: 800; color: #fff; flex-shrink: 0; }
  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
  .settings-footer { display: flex; justify-content: flex-end; gap: 0.75rem; padding: 1rem 1.5rem; border-top: 1px solid var(--border); }
  .save-toast { position: fixed; bottom: 2rem; right: 2rem; background: #22C55E; color: #fff; padding: 0.75rem 1.5rem; border-radius: var(--radius-md); font-size: 0.875rem; font-weight: 600; z-index: 1000; animation: slideToast 0.3s ease; box-shadow: 0 8px 30px rgba(34,197,94,0.4); }
  @keyframes slideToast { from { transform: translateY(20px); opacity:0; } to { transform: translateY(0); opacity:1; } }
  @media (max-width: 768px) { .settings-grid { grid-template-columns: 1fr; } .two-col { grid-template-columns: 1fr; } }
`;

function Toggle({ on, onChange }) {
  return <div className={`toggle ${on ? "on" : ""}`} onClick={() => onChange(!on)}><div className="toggle-thumb" /></div>;
}

export default function CoachSettings({ onNavigate }) {
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({ firstName:"Walid", lastName:"Masri", email:"walid@coachit.com", phone:"", bio:"Certified strength & conditioning coach." });
  const [notifications, setNotifications] = useState({ newRequest:true, planExpiry:true, emailAlerts:true, smsAlerts:false });
  const [security, setSecurity] = useState({ twoFactor:false, loginAlerts:true });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const navItems = [
    { id:"profile", icon:"👤", label:"Profile" },
    { id:"notifications", icon:"🔔", label:"Notifications" },
    { id:"security", icon:"🔐", label:"Security" },
    { id:"account", icon:"⚙️", label:"Account" },
  ];

  const upd = (f, v) => setProfile(p => ({...p, [f]: v}));

  return (
    <>
      <style>{styles}</style>
      <div className="dashboard-layout">
        <Sidebar role="coach" activePage="settings" onNavigate={onNavigate} userName="Coach Walid" />
        <main className="dashboard-main">
          <div className="dashboard-content">
            <h1 className="settings-title">Coach <span>Settings</span></h1>
            <div className="settings-sub">Manage your profile, notifications, and account preferences</div>

            <div className="settings-grid">
              {/* Nav */}
              <div className="settings-nav">
                {navItems.map(item => (
                  <button key={item.id} className={`settings-nav-item ${activeTab === item.id ? "active" : ""}`} onClick={() => setActiveTab(item.id)}>
                    <span className="settings-nav-icon">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Panel */}
              <div className="settings-panel">
                {activeTab === "profile" && (
                  <div className="settings-section">
                    <div className="settings-section-header">
                      <div className="settings-section-title">Profile Information</div>
                      <div className="settings-section-desc">Update your public coach profile</div>
                    </div>
                    <div className="settings-section-body">
                      <div className="settings-avatar-section">
                        <div className="settings-avatar">W</div>
                        <div>
                          <button className="btn-ghost btn-sm">Change Photo</button>
                          <div style={{fontSize:"0.75rem", color:"var(--text-4)", marginTop:"0.4rem"}}>JPG, PNG. Max 2MB.</div>
                        </div>
                      </div>
                      <div className="two-col">
                        <div className="form-group">
                          <label className="label">First Name</label>
                          <input className="input-field" value={profile.firstName} onChange={e => upd("firstName", e.target.value)} />
                        </div>
                        <div className="form-group">
                          <label className="label">Last Name</label>
                          <input className="input-field" value={profile.lastName} onChange={e => upd("lastName", e.target.value)} />
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="label">Email</label>
                        <input type="email" className="input-field" value={profile.email} onChange={e => upd("email", e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label className="label">Phone Number</label>
                        <input className="input-field" placeholder="+962 79 000 0000" value={profile.phone} onChange={e => upd("phone", e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label className="label">Bio</label>
                        <textarea className="input-field" style={{minHeight:"100px", resize:"vertical"}} value={profile.bio} onChange={e => upd("bio", e.target.value)} />
                      </div>
                    </div>
                    <div className="settings-footer">
                      <button className="btn-secondary">Cancel</button>
                      <button className="btn-primary" onClick={handleSave}>Save Changes</button>
                    </div>
                  </div>
                )}

                {activeTab === "notifications" && (
                  <div className="settings-section">
                    <div className="settings-section-header">
                      <div className="settings-section-title">Notification Preferences</div>
                      <div className="settings-section-desc">Control how and when you get notified</div>
                    </div>
                    <div className="settings-section-body">
                      {[
                        { key:"newRequest", label:"New Client Requests", desc:"Get notified when a client submits a plan request" },
                        { key:"planExpiry", label:"Plan Expiry Alerts", desc:"Get reminded when a client's plan is about to expire" },
                        { key:"emailAlerts", label:"Email Notifications", desc:"Receive notifications via email" },
                        { key:"smsAlerts", label:"SMS Notifications", desc:"Receive notifications via SMS (if number is set)" },
                      ].map(item => (
                        <div className="settings-row" key={item.key}>
                          <div>
                            <div className="settings-row-label">{item.label}</div>
                            <div className="settings-row-desc">{item.desc}</div>
                          </div>
                          <div className="settings-row-control">
                            <Toggle on={notifications[item.key]} onChange={v => setNotifications(n => ({...n, [item.key]: v}))} />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="settings-footer">
                      <button className="btn-primary" onClick={handleSave}>Save Preferences</button>
                    </div>
                  </div>
                )}

                {activeTab === "security" && (
                  <div className="settings-section">
                    <div className="settings-section-header">
                      <div className="settings-section-title">Security</div>
                      <div className="settings-section-desc">Manage your account security settings</div>
                    </div>
                    <div className="settings-section-body">
                      <div className="settings-row">
                        <div>
                          <div className="settings-row-label">Two-Factor Authentication</div>
                          <div className="settings-row-desc">Add an extra layer of security to your account</div>
                        </div>
                        <div className="settings-row-control">
                          <Toggle on={security.twoFactor} onChange={v => setSecurity(s => ({...s, twoFactor: v}))} />
                        </div>
                      </div>
                      <div className="settings-row">
                        <div>
                          <div className="settings-row-label">Login Alerts</div>
                          <div className="settings-row-desc">Get notified of new logins to your account</div>
                        </div>
                        <div className="settings-row-control">
                          <Toggle on={security.loginAlerts} onChange={v => setSecurity(s => ({...s, loginAlerts: v}))} />
                        </div>
                      </div>
                      <div style={{marginTop:"1.5rem", paddingTop:"1.5rem", borderTop:"1px solid var(--border)"}}>
                        <div className="form-group">
                          <label className="label">Current Password</label>
                          <input type="password" className="input-field" placeholder="••••••••" />
                        </div>
                        <div className="two-col">
                          <div className="form-group">
                            <label className="label">New Password</label>
                            <input type="password" className="input-field" placeholder="Min. 8 characters" />
                          </div>
                          <div className="form-group">
                            <label className="label">Confirm Password</label>
                            <input type="password" className="input-field" placeholder="Re-enter password" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="settings-footer">
                      <button className="btn-primary" onClick={handleSave}>Update Security</button>
                    </div>
                  </div>
                )}

                {activeTab === "account" && (
                  <div className="settings-section">
                    <div className="settings-section-header">
                      <div className="settings-section-title">Account</div>
                      <div className="settings-section-desc">Manage your account settings</div>
                    </div>
                    <div className="settings-section-body">
                      <div className="settings-row">
                        <div>
                          <div className="settings-row-label">Account Status</div>
                          <div className="settings-row-desc">Your account is active and in good standing</div>
                        </div>
                        <span className="badge badge-green">Active</span>
                      </div>
                      <div className="settings-row">
                        <div>
                          <div className="settings-row-label">Member Since</div>
                          <div className="settings-row-desc">Date you joined CoachIt</div>
                        </div>
                        <span style={{fontSize:"0.875rem", color:"var(--text-2)"}}>January 2024</span>
                      </div>
                      <div style={{marginTop:"2rem", padding:"1.25rem", background:"rgba(255,68,68,0.04)", border:"1px solid rgba(255,68,68,0.12)", borderRadius:"var(--radius-md)"}}>
                        <div style={{fontFamily:"var(--font-display)", fontSize:"1.1rem", fontWeight:"700", color:"#FF4444", marginBottom:"0.5rem"}}>Danger Zone</div>
                        <div style={{fontSize:"0.875rem", color:"var(--text-3)", marginBottom:"1rem"}}>These actions are permanent and cannot be undone.</div>
                        <button className="btn-danger">Delete My Account</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
      {saved && <div className="save-toast">✅ Settings saved successfully!</div>}
    </>
  );
}