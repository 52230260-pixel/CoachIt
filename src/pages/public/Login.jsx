import { useState } from "react";

const styles = `
  .auth-page {
    min-height: 100vh;
    background: var(--bg-0);
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .auth-left {
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 2.5rem;
    background: linear-gradient(160deg, #0D0D0D, #060606);
  }
  .auth-left-bg {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,107,0,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,107,0,0.04) 1px, transparent 1px);
    background-size: 50px 50px;
  }
  .auth-left-glow {
    position: absolute;
    bottom: -10%;
    right: -10%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(255,107,0,0.1) 0%, transparent 65%);
    pointer-events: none;
  }
  .auth-left-content {
    position: relative;
    z-index: 2;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2rem 0;
  }
  .auth-logo {
    position: relative;
    z-index: 2;
    font-family: var(--font-display);
    font-size: 1.75rem;
    font-weight: 800;
    color: var(--text-1);
  }
  .auth-logo span { color: var(--orange); }
  .auth-left-title {
    font-family: var(--font-display);
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 900;
    color: var(--text-1);
    line-height: 1;
    margin-bottom: 1.25rem;
  }
  .auth-left-title span { color: var(--orange); }
  .auth-left-desc {
    font-size: 1rem;
    color: var(--text-3);
    line-height: 1.75;
    max-width: 400px;
    margin-bottom: 2.5rem;
  }
  .auth-feature-list {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }
  .auth-feature {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: var(--text-2);
    font-size: 0.875rem;
  }
  .auth-feature-icon {
    width: 32px;
    height: 32px;
    background: rgba(255,107,0,0.1);
    border: 1px solid var(--border-orange);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    flex-shrink: 0;
  }
  .auth-right {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background: var(--bg-1);
  }
  .auth-form-box {
    width: 100%;
    max-width: 420px;
  }
  .auth-form-title {
    font-family: var(--font-display);
    font-size: 2.2rem;
    font-weight: 800;
    color: var(--text-1);
    margin-bottom: 0.5rem;
  }
  .auth-form-sub {
    font-size: 0.9rem;
    color: var(--text-3);
    margin-bottom: 2rem;
  }
  .auth-form-sub a { color: var(--orange); font-weight: 600; }
  .auth-divider {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 1.5rem 0;
  }
  .auth-divider-line { flex: 1; height: 1px; background: var(--border); }
  .auth-divider-text { font-size: 0.75rem; color: var(--text-4); }
  .role-selector {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }
  .role-option {
    padding: 1rem;
    border: 2px solid var(--border);
    border-radius: var(--radius-md);
    background: var(--bg-4);
    cursor: pointer;
    transition: var(--transition);
    text-align: center;
  }
  .role-option:hover { border-color: rgba(255,107,0,0.3); }
  .role-option.selected {
    border-color: var(--orange);
    background: rgba(255,107,0,0.06);
  }
  .role-option-icon { font-size: 1.5rem; display: block; margin-bottom: 0.4rem; }
  .role-option-label { font-size: 0.85rem; font-weight: 600; color: var(--text-2); }
  .role-option.selected .role-option-label { color: var(--orange); }
  .input-wrapper { position: relative; }
  .input-prefix {
    position: absolute;
    left: 0.9rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1rem;
    pointer-events: none;
    opacity: 0.5;
  }
  .input-with-prefix { padding-left: 2.5rem; }
  .password-toggle {
    position: absolute;
    right: 0.9rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: var(--text-3);
    cursor: pointer;
    font-size: 0.9rem;
    padding: 0;
  }
  .password-toggle:hover { color: var(--orange); }
  .forgot-link {
    display: block;
    text-align: right;
    font-size: 0.8rem;
    color: var(--orange);
    margin-top: 0.4rem;
    cursor: pointer;
  }
  .forgot-link:hover { text-decoration: underline; }
  .submit-btn {
    width: 100%;
    padding: 0.9rem;
    font-size: 1rem;
    margin-top: 0.5rem;
  }
  .error-msg {
    background: rgba(255,68,68,0.08);
    border: 1px solid rgba(255,68,68,0.2);
    border-radius: var(--radius-sm);
    padding: 0.75rem 1rem;
    color: #FF6B6B;
    font-size: 0.85rem;
    margin-bottom: 1rem;
  }
  @media (max-width: 768px) {
    .auth-page { grid-template-columns: 1fr; }
    .auth-left { display: none; }
    .auth-right { min-height: 100vh; padding: 2rem 1.25rem; }
  }
`;

export default function Login() {
  const [role, setRole] = useState("client");
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) { setError("Please fill in all fields."); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (role === "coach") window.location.href = "/coach/dashboard";
      else window.location.href = "/client/dashboard";
    }, 1200);
  };

  const features = [
    { icon: "💪", text: "Custom workout plans tailored for you" },
    { icon: "🥗", text: "Personalized nutrition & diet programs" },
    { icon: "📹", text: "Video tutorials for every exercise" },
    { icon: "💬", text: "Direct messaging with your coach" },
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="auth-page">
        {/* Left Panel */}
        <div className="auth-left">
          <div className="auth-left-bg" />
          <div className="auth-left-glow" />
          <div className="auth-logo">Coach<span>It</span></div>
          <div className="auth-left-content">
            <h1 className="auth-left-title">
              WELCOME<br /><span>BACK.</span>
            </h1>
            <p className="auth-left-desc">
              Log in to access your personalized training plans, track progress, and connect with your coach.
            </p>
            <div className="auth-feature-list">
              {features.map((f, i) => (
                <div className="auth-feature" key={i}>
                  <div className="auth-feature-icon">{f.icon}</div>
                  <span>{f.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="auth-right">
          <div className="auth-form-box">
            <h2 className="auth-form-title">Log In</h2>
            <p className="auth-form-sub">
              New to CoachIt? <a href="/register">Create an account</a>
            </p>

            {/* Role Selector */}
            <div className="role-selector">
              <div className={`role-option ${role === "client" ? "selected" : ""}`} onClick={() => setRole("client")}>
                <span className="role-option-icon">🏋️</span>
                <span className="role-option-label">Client</span>
              </div>
              <div className={`role-option ${role === "coach" ? "selected" : ""}`} onClick={() => setRole("coach")}>
                <span className="role-option-icon">🎯</span>
                <span className="role-option-label">Coach</span>
              </div>
            </div>

            {error && <div className="error-msg">⚠️ {error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="label">Email Address</label>
                <div className="input-wrapper">
                  <span className="input-prefix">✉️</span>
                  <input
                    type="email"
                    className="input-field input-with-prefix"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="label">Password</label>
                <div className="input-wrapper">
                  <span className="input-prefix">🔑</span>
                  <input
                    type={showPass ? "text" : "password"}
                    className="input-field input-with-prefix"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={e => setForm({...form, password: e.target.value})}
                  />
                  <button type="button" className="password-toggle" onClick={() => setShowPass(!showPass)}>
                    {showPass ? "🙈" : "👁️"}
                  </button>
                </div>
                <span className="forgot-link">Forgot password?</span>
              </div>

              <button type="submit" className="btn-primary submit-btn" disabled={loading}>
                {loading ? "Logging in..." : `Log In as ${role === "coach" ? "Coach" : "Client"} →`}
              </button>
            </form>

            <div style={{marginTop:"1.5rem", textAlign:"center"}}>
              <a href="/" style={{fontSize:"0.8rem", color:"var(--text-4)"}}>← Back to Home</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}