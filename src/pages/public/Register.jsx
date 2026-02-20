import { useState } from "react";

const styles = `
  .reg-page {
    min-height: 100vh;
    background: var(--bg-0);
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .reg-left {
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    padding: 2.5rem;
    background: linear-gradient(160deg, #0D0D0D, #060606);
  }
  .reg-bg-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,107,0,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,107,0,0.04) 1px, transparent 1px);
    background-size: 50px 50px;
  }
  .reg-glow {
    position: absolute;
    top: 20%;
    left: 20%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(255,107,0,0.1), transparent 65%);
    pointer-events: none;
  }
  .reg-left-inner {
    position: relative;
    z-index: 2;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .reg-title {
    font-family: var(--font-display);
    font-size: clamp(2.8rem, 5vw, 4.5rem);
    font-weight: 900;
    color: var(--text-1);
    line-height: 1;
    margin-bottom: 1.25rem;
  }
  .reg-title span { color: var(--orange); }
  .reg-steps-title {
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--text-4);
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin-bottom: 1.25rem;
    margin-top: 2rem;
  }
  .reg-steps { display: flex; flex-direction: column; gap: 1rem; }
  .reg-step {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
  }
  .reg-step-num {
    width: 28px;
    height: 28px;
    background: rgba(255,107,0,0.1);
    border: 1px solid var(--border-orange);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-display);
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--orange);
    flex-shrink: 0;
  }
  .reg-step-text { font-size: 0.85rem; color: var(--text-3); padding-top: 0.35rem; line-height: 1.5; }
  .reg-right {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background: var(--bg-1);
    overflow-y: auto;
  }
  .reg-form-box {
    width: 100%;
    max-width: 460px;
    padding: 1rem 0;
  }
  .reg-form-title {
    font-family: var(--font-display);
    font-size: 2.2rem;
    font-weight: 800;
    color: var(--text-1);
    margin-bottom: 0.5rem;
  }
  .reg-form-sub {
    font-size: 0.875rem;
    color: var(--text-3);
    margin-bottom: 2rem;
  }
  .reg-form-sub a { color: var(--orange); font-weight: 600; }
  .reg-logo {
    font-family: var(--font-display);
    font-size: 1.75rem;
    font-weight: 800;
    color: var(--text-1);
    margin-bottom: 0;
  }
  .reg-logo span { color: var(--orange); }
  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
  .reg-checkbox-group { display: flex; align-items: flex-start; gap: 0.75rem; }
  .reg-checkbox-group input[type="checkbox"] {
    width: 18px;
    height: 18px;
    accent-color: var(--orange);
    flex-shrink: 0;
    margin-top: 2px;
    cursor: pointer;
  }
  .reg-checkbox-label { font-size: 0.85rem; color: var(--text-3); line-height: 1.5; }
  .reg-checkbox-label a { color: var(--orange); }
  .success-screen {
    text-align: center;
    padding: 2rem 0;
  }
  .success-icon {
    width: 80px;
    height: 80px;
    background: rgba(34,197,94,0.1);
    border: 2px solid rgba(34,197,94,0.3);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    margin: 0 auto 1.5rem;
  }
  .success-title {
    font-family: var(--font-display);
    font-size: 2rem;
    font-weight: 800;
    color: var(--text-1);
    margin-bottom: 0.75rem;
  }
  .success-desc { font-size: 0.9rem; color: var(--text-3); line-height: 1.7; margin-bottom: 2rem; }
  .email-hint {
    background: rgba(255,107,0,0.06);
    border: 1px solid var(--border-orange);
    border-radius: var(--radius-md);
    padding: 1rem;
    font-size: 0.85rem;
    color: var(--text-2);
    margin-bottom: 1.5rem;
    text-align: left;
  }
  @media (max-width: 768px) {
    .reg-page { grid-template-columns: 1fr; }
    .reg-left { display: none; }
    .reg-right { min-height: 100vh; align-items: flex-start; padding: 2rem 1.25rem; }
    .two-col { grid-template-columns: 1fr; }
  }
`;

export default function Register() {
  const [step, setStep] = useState("form"); // "form" | "success"
  const [loading, setLoading] = useState(false);
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", password: "", confirmPassword: ""
  });

  const update = (field, val) => setForm(p => ({...p, [field]: val}));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      setError("Please fill in all required fields."); return;
    }
    if (form.password.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (form.password !== form.confirmPassword) { setError("Passwords do not match."); return; }
    if (!agree) { setError("Please accept the Terms of Service."); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep("success"); }, 1400);
  };

  const steps = [
    "Create your account with a secure password",
    "Our system sends you a welcome email",
    "Log in and submit your plan request",
    "Your coach builds your custom plan",
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="reg-page">
        {/* Left */}
        <div className="reg-left">
          <div className="reg-bg-grid" />
          <div className="reg-glow" />
          <div className="reg-logo" style={{position:"relative", zIndex:2}}>Coach<span>It</span></div>
          <div className="reg-left-inner">
            <h1 className="reg-title">START YOUR<br /><span>JOURNEY.</span><br />TODAY.</h1>
            <div className="reg-steps-title">Your Path to Fitness</div>
            <div className="reg-steps">
              {steps.map((s, i) => (
                <div className="reg-step" key={i}>
                  <div className="reg-step-num">{i + 1}</div>
                  <div className="reg-step-text">{s}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="reg-right">
          <div className="reg-form-box">
            {step === "success" ? (
              <div className="success-screen">
                <div className="success-icon">✅</div>
                <h2 className="success-title">Account Created!</h2>
                <p className="success-desc">
                  Welcome to CoachIt, {form.firstName}! Your account has been created successfully.
                </p>
                <div className="email-hint">
                  📧 <strong>Check your inbox!</strong> We've sent a welcome email to <strong>{form.email}</strong> with your account details.
                </div>
                <a href="/login"><button className="btn-primary" style={{width:"100%"}}>Continue to Login →</button></a>
              </div>
            ) : (
              <>
                <h2 className="reg-form-title">Create Account</h2>
                <p className="reg-form-sub">Already have an account? <a href="/login">Log in</a></p>

                {error && <div style={{background:"rgba(255,68,68,0.08)", border:"1px solid rgba(255,68,68,0.2)", borderRadius:"var(--radius-sm)", padding:"0.75rem 1rem", color:"#FF6B6B", fontSize:"0.85rem", marginBottom:"1rem"}}>⚠️ {error}</div>}

                <form onSubmit={handleSubmit}>
                  <div className="two-col">
                    <div className="form-group">
                      <label className="label">First Name *</label>
                      <input className="input-field" placeholder="Ahmad" value={form.firstName} onChange={e => update("firstName", e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label className="label">Last Name *</label>
                      <input className="input-field" placeholder="Khalil" value={form.lastName} onChange={e => update("lastName", e.target.value)} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="label">Email Address *</label>
                    <input type="email" className="input-field" placeholder="your@email.com" value={form.email} onChange={e => update("email", e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label className="label">Password *</label>
                    <input type="password" className="input-field" placeholder="Min. 8 characters" value={form.password} onChange={e => update("password", e.target.value)} />
                    {form.password && (
                      <div style={{marginTop:"0.4rem", height:"3px", borderRadius:"100px", background:"var(--border)", overflow:"hidden"}}>
                        <div style={{
                          height:"100%", borderRadius:"100px", transition:"all 0.3s",
                          width: form.password.length < 6 ? "30%" : form.password.length < 10 ? "65%" : "100%",
                          background: form.password.length < 6 ? "#FF4444" : form.password.length < 10 ? "#FF9500" : "#22C55E"
                        }} />
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="label">Confirm Password *</label>
                    <input type="password" className="input-field" placeholder="Re-enter password" value={form.confirmPassword} onChange={e => update("confirmPassword", e.target.value)} />
                  </div>

                  <div className="form-group reg-checkbox-group">
                    <input type="checkbox" id="agree" checked={agree} onChange={e => setAgree(e.target.checked)} />
                    <label htmlFor="agree" className="reg-checkbox-label">
                      I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
                    </label>
                  </div>

                  <button type="submit" className="btn-primary" style={{width:"100%", padding:"0.9rem", fontSize:"1rem"}} disabled={loading}>
                    {loading ? "Creating Account..." : "Create My Account →"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}