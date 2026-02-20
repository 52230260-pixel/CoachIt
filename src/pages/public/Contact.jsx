import { useState } from "react";
import PublicNavbar from "../../components/common/Navbar";

const styles = `
  .contact-page { background: var(--bg-0); min-height: 100vh; }
  .contact-hero {
    padding: 130px 2rem 4rem;
    background: var(--bg-0);
    position: relative; overflow: hidden;
    text-align: center;
  }
  .contact-bg {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(255,107,0,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,107,0,0.04) 1px, transparent 1px);
    background-size: 60px 60px;
  }
  .contact-glow {
    position: absolute; top: 0; left: 50%;
    transform: translateX(-50%);
    width: 600px; height: 400px;
    background: radial-gradient(circle, rgba(255,107,0,0.08), transparent 65%);
    pointer-events: none;
  }
  .contact-hero-inner { position: relative; z-index: 2; }
  .contact-title {
    font-family: var(--font-display);
    font-size: clamp(3rem, 7vw, 5.5rem);
    font-weight: 900; color: var(--text-1); line-height: 1;
    margin-bottom: 1rem;
  }
  .contact-title span { color: var(--orange); }
  .contact-sub { font-size: 1rem; color: var(--text-3); max-width: 500px; margin: 0 auto; line-height: 1.75; }
  .contact-body { padding: 4rem 2rem; max-width: 1100px; margin: 0 auto; }
  .contact-grid { display: grid; grid-template-columns: 1fr 1.6fr; gap: 3rem; }
  .contact-info-title {
    font-family: var(--font-display);
    font-size: 1.75rem; font-weight: 800; color: var(--text-1); margin-bottom: 1rem;
  }
  .contact-info-desc { font-size: 0.9rem; color: var(--text-3); line-height: 1.75; margin-bottom: 2rem; }
  .contact-item {
    display: flex; align-items: flex-start; gap: 1rem;
    padding: 1.25rem; border: 1px solid var(--border);
    border-radius: var(--radius-md); background: var(--bg-3);
    margin-bottom: 1rem; transition: var(--transition);
  }
  .contact-item:hover { border-color: var(--border-orange); }
  .contact-item-icon {
    width: 44px; height: 44px;
    background: rgba(255,107,0,0.1);
    border: 1px solid var(--border-orange);
    border-radius: var(--radius-sm);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.2rem; flex-shrink: 0;
  }
  .contact-item-label { font-size: 0.7rem; font-weight: 700; color: var(--text-4); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.2rem; }
  .contact-item-val { font-size: 0.9rem; color: var(--text-1); font-weight: 500; }
  .contact-socials { display: flex; gap: 0.75rem; margin-top: 1.5rem; }
  .social-btn {
    padding: 0.6rem 1.2rem;
    background: var(--bg-4); border: 1px solid var(--border);
    border-radius: var(--radius-sm); color: var(--text-3);
    font-size: 0.8rem; font-weight: 600; cursor: pointer;
    transition: var(--transition); display: flex; align-items: center; gap: 0.4rem;
  }
  .social-btn:hover { border-color: var(--border-orange); color: var(--orange); }
  .contact-form-card {
    background: var(--bg-2); border: 1px solid var(--border);
    border-radius: var(--radius-xl); padding: 2.5rem;
  }
  .contact-form-title { font-family: var(--font-display); font-size: 1.75rem; font-weight: 800; color: var(--text-1); margin-bottom: 0.5rem; }
  .contact-form-sub { font-size: 0.875rem; color: var(--text-3); margin-bottom: 2rem; }
  .contact-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
  .contact-select {
    width: 100%; padding: 0.85rem 1rem;
    background: var(--bg-4); border: 1px solid var(--border);
    border-radius: var(--radius-sm); color: var(--text-2);
    font-size: 0.9rem; font-family: var(--font-body);
    outline: none; cursor: pointer; transition: var(--transition);
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='%23666'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
  }
  .contact-select:focus { border-color: var(--orange); box-shadow: 0 0 0 3px rgba(255,107,0,0.12); }
  .contact-select option { background: #1a1a1a; }
  .contact-textarea {
    width: 100%; padding: 0.85rem 1rem; min-height: 140px; resize: vertical;
    background: var(--bg-4); border: 1px solid var(--border);
    border-radius: var(--radius-sm); color: var(--text-1);
    font-size: 0.9rem; font-family: var(--font-body);
    outline: none; transition: var(--transition);
  }
  .contact-textarea::placeholder { color: var(--text-4); }
  .contact-textarea:focus { border-color: var(--orange); box-shadow: 0 0 0 3px rgba(255,107,0,0.12); }
  .contact-success {
    text-align: center; padding: 3rem 1rem;
  }
  .contact-success-icon {
    width: 72px; height: 72px;
    background: rgba(34,197,94,0.1); border: 2px solid rgba(34,197,94,0.3);
    border-radius: 50%; display: flex; align-items: center; justify-content: center;
    font-size: 2rem; margin: 0 auto 1.5rem;
  }
  .contact-footer { background: var(--bg-0); border-top: 1px solid var(--border); padding: 2rem; text-align: center; font-size: 0.8rem; color: var(--text-4); }
  @media (max-width: 900px) {
    .contact-grid { grid-template-columns: 1fr; }
    .contact-two-col { grid-template-columns: 1fr; }
  }
`;

export default function Contact() {
  const [form, setForm] = useState({ firstName:"", lastName:"", email:"", topic:"", message:"" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (f, v) => setForm(p => ({...p, [f]: v}));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!form.firstName || !form.email || !form.message) { setError("Please fill in required fields."); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1200);
  };

  const info = [
    { icon: "📧", label: "Email Us", val: "hello@coachit.com" },
    { icon: "📱", label: "WhatsApp", val: "+962 79 000 0000" },
    { icon: "⏰", label: "Response Time", val: "Within 24 hours" },
    { icon: "📍", label: "Based In", val: "Amman, Jordan" },
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="contact-page">
        <PublicNavbar activePage="contact" />

        <div className="contact-hero">
          <div className="contact-bg" />
          <div className="contact-glow" />
          <div className="contact-hero-inner">
            <div className="section-tag">Get In Touch</div>
            <h1 className="contact-title">LET'S <span>TALK</span></h1>
            <p className="contact-sub">Have a question about CoachIt? Want to become a coach? We'd love to hear from you.</p>
          </div>
        </div>

        <div className="contact-body">
          <div className="contact-grid">
            {/* Info */}
            <div>
              <h3 className="contact-info-title">Reach Out Directly</h3>
              <p className="contact-info-desc">Our team is available to answer your questions and help you get started on your fitness journey.</p>
              {info.map((i, idx) => (
                <div className="contact-item" key={idx}>
                  <div className="contact-item-icon">{i.icon}</div>
                  <div>
                    <div className="contact-item-label">{i.label}</div>
                    <div className="contact-item-val">{i.val}</div>
                  </div>
                </div>
              ))}
              <div className="contact-socials">
                {[["📸","Instagram"],["🐦","Twitter"],["💼","LinkedIn"]].map(([icon,label],i)=>(
                  <button className="social-btn" key={i}>{icon} {label}</button>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="contact-form-card">
              {sent ? (
                <div className="contact-success">
                  <div className="contact-success-icon">✅</div>
                  <h3 style={{fontFamily:"var(--font-display)", fontSize:"1.75rem", fontWeight:"800", marginBottom:"0.75rem"}}>Message Sent!</h3>
                  <p style={{color:"var(--text-3)", lineHeight:"1.7", marginBottom:"1.5rem"}}>
                    Thanks for reaching out, {form.firstName}! We'll get back to you within 24 hours.
                  </p>
                  <button className="btn-secondary" onClick={() => { setSent(false); setForm({firstName:"",lastName:"",email:"",topic:"",message:""}); }}>Send Another Message</button>
                </div>
              ) : (
                <>
                  <h3 className="contact-form-title">Send a Message</h3>
                  <p className="contact-form-sub">Fill out the form and we'll respond as soon as possible.</p>
                  {error && <div style={{background:"rgba(255,68,68,0.08)", border:"1px solid rgba(255,68,68,0.2)", borderRadius:"var(--radius-sm)", padding:"0.75rem 1rem", color:"#FF6B6B", fontSize:"0.85rem", marginBottom:"1rem"}}>⚠️ {error}</div>}
                  <form onSubmit={handleSubmit}>
                    <div className="contact-two-col">
                      <div className="form-group">
                        <label className="label">First Name *</label>
                        <input className="input-field" placeholder="Ahmad" value={form.firstName} onChange={e => update("firstName", e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label className="label">Last Name</label>
                        <input className="input-field" placeholder="Khalil" value={form.lastName} onChange={e => update("lastName", e.target.value)} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="label">Email Address *</label>
                      <input type="email" className="input-field" placeholder="your@email.com" value={form.email} onChange={e => update("email", e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label className="label">Topic</label>
                      <select className="contact-select" value={form.topic} onChange={e => update("topic", e.target.value)}>
                        <option value="">Select a topic...</option>
                        <option value="general">General Inquiry</option>
                        <option value="coach">Become a Coach</option>
                        <option value="billing">Billing & Pricing</option>
                        <option value="technical">Technical Support</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="label">Message *</label>
                      <textarea className="contact-textarea" placeholder="Write your message here..." value={form.message} onChange={e => update("message", e.target.value)} />
                    </div>
                    <button type="submit" className="btn-primary" style={{width:"100%", padding:"0.9rem"}} disabled={loading}>
                      {loading ? "Sending..." : "Send Message →"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="contact-footer">© 2025 CoachIt. All rights reserved.</div>
      </div>
    </>
  );
}