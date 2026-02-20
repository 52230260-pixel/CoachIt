import PublicNavbar from "../../components/common/Navbar";

const styles = `
  .about-hero {
    min-height: 60vh;
    background: var(--bg-0);
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    padding: 120px 2rem 4rem;
  }
  .about-bg {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(255,107,0,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,107,0,0.04) 1px, transparent 1px);
    background-size: 60px 60px;
  }
  .about-glow {
    position: absolute; top: 0; right: 0;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(255,107,0,0.08), transparent 65%);
    pointer-events: none;
  }
  .about-hero-inner {
    position: relative; z-index: 2;
    max-width: 900px; margin: 0 auto;
    text-align: center;
  }
  .about-hero-title {
    font-family: var(--font-display);
    font-size: clamp(3rem, 7vw, 6rem);
    font-weight: 900; color: var(--text-1); line-height: 1;
    margin-bottom: 1.25rem;
  }
  .about-hero-title span { color: var(--orange); }
  .about-hero-desc {
    font-size: 1.05rem; color: var(--text-3); max-width: 600px;
    margin: 0 auto; line-height: 1.8;
  }
  .about-section {
    background: var(--bg-1); padding: 5rem 2rem;
  }
  .about-section.alt { background: var(--bg-2); }
  .about-inner { max-width: 1100px; margin: 0 auto; }
  .about-2col {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 4rem; align-items: center;
  }
  .about-label {
    font-size: 0.7rem; font-weight: 700;
    color: var(--orange); text-transform: uppercase;
    letter-spacing: 1.5px; margin-bottom: 0.75rem;
    display: block;
  }
  .about-block-title {
    font-family: var(--font-display);
    font-size: 2.5rem; font-weight: 800;
    color: var(--text-1); line-height: 1.1; margin-bottom: 1.25rem;
  }
  .about-block-title span { color: var(--orange); }
  .about-block-text { font-size: 0.95rem; color: var(--text-3); line-height: 1.8; margin-bottom: 1rem; }
  .about-visual {
    background: var(--bg-3);
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    padding: 2.5rem;
    position: relative;
    overflow: hidden;
  }
  .about-visual::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,107,0,0.05), transparent);
  }
  .visual-stat { margin-bottom: 1.5rem; position: relative; z-index: 1; }
  .visual-stat-header { display: flex; justify-content: space-between; margin-bottom: 0.4rem; }
  .visual-stat-label { font-size: 0.8rem; color: var(--text-3); }
  .visual-stat-val { font-family: var(--font-display); font-size: 1rem; font-weight: 700; color: var(--orange); }
  .visual-bar { height: 6px; background: rgba(255,255,255,0.06); border-radius: 100px; overflow: hidden; }
  .visual-bar-fill { height: 100%; background: linear-gradient(90deg, var(--orange), var(--orange-light)); border-radius: 100px; }
  .values-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--border); border-radius: var(--radius-lg); overflow: hidden; }
  .value-card { background: var(--bg-1); padding: 2rem 1.5rem; }
  .value-icon { font-size: 2rem; display: block; margin-bottom: 1rem; }
  .value-name { font-family: var(--font-display); font-size: 1.3rem; font-weight: 700; color: var(--text-1); margin-bottom: 0.5rem; }
  .value-desc { font-size: 0.85rem; color: var(--text-3); line-height: 1.6; }
  .team-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
  .team-card {
    background: var(--bg-3); border: 1px solid var(--border);
    border-radius: var(--radius-lg); padding: 2rem;
    text-align: center; transition: var(--transition);
  }
  .team-card:hover { border-color: var(--border-orange); transform: translateY(-4px); }
  .team-avatar {
    width: 80px; height: 80px;
    background: linear-gradient(135deg, var(--orange), var(--orange-light));
    border-radius: 50%; margin: 0 auto 1rem;
    display: flex; align-items: center; justify-content: center;
    font-family: var(--font-display); font-size: 2rem; font-weight: 800; color: #fff;
  }
  .team-name { font-family: var(--font-display); font-size: 1.3rem; font-weight: 700; color: var(--text-1); }
  .team-role { font-size: 0.8rem; color: var(--orange); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 0.75rem; }
  .team-bio { font-size: 0.85rem; color: var(--text-3); line-height: 1.6; }
  .section-header-center { text-align: center; margin-bottom: 3.5rem; }
  .sh-title { font-family: var(--font-display); font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; color: var(--text-1); }
  .sh-title span { color: var(--orange); }
  .sh-sub { font-size: 0.95rem; color: var(--text-3); max-width: 500px; margin: 0.75rem auto 0; }
  .stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--border); border-radius: var(--radius-lg); overflow: hidden; }
  .stat-box { background: var(--bg-2); padding: 2rem; text-align: center; }
  .stat-big { font-family: var(--font-display); font-size: 3rem; font-weight: 900; color: var(--orange); display: block; }
  .stat-small { font-size: 0.8rem; color: var(--text-3); text-transform: uppercase; letter-spacing: 0.5px; }
  .about-footer {
    background: var(--bg-0);
    border-top: 1px solid var(--border);
    padding: 2rem;
    text-align: center;
    font-size: 0.8rem;
    color: var(--text-4);
  }
  @media (max-width: 900px) {
    .about-2col { grid-template-columns: 1fr; gap: 2.5rem; }
    .values-grid { grid-template-columns: 1fr; }
    .team-grid { grid-template-columns: 1fr; }
    .stats-row { grid-template-columns: repeat(2, 1fr); }
  }
`;

export default function About() {
  const values = [
    { icon: "🎯", name: "Results-Driven", desc: "Every plan is built around measurable goals. We track, adjust, and optimize until you hit your targets." },
    { icon: "🤝", name: "Personalized", desc: "No two bodies are the same. Your coach creates everything from scratch, for you and only you." },
    { icon: "🔬", name: "Evidence-Based", desc: "Our methods are rooted in sports science and nutrition research. No fads, no gimmicks." },
    { icon: "💬", name: "Communication", desc: "Your coach is always reachable. Ask questions, get feedback, and stay motivated throughout your journey." },
    { icon: "🔒", name: "Privacy First", desc: "Your health data is private. Only you and your assigned coach have access to your personal information." },
    { icon: "⚡", name: "Fast & Efficient", desc: "Get your plan approved quickly. No waiting weeks. Our coaches respond within 24 hours." },
  ];

  const team = [
    { initial: "W", name: "Walid Masri", role: "Head Coach & Founder", bio: "10+ years in sports coaching. Certified strength & conditioning specialist with a passion for body transformation." },
    { initial: "N", name: "Nour Issa", role: "Nutrition Expert", bio: "Registered dietitian specializing in athletic performance nutrition and sustainable meal planning." },
    { initial: "K", name: "Karim Zeidan", role: "Fitness Coach", bio: "Former competitive athlete turned coach. Expert in hypertrophy training and injury prevention." },
  ];

  const stats = [
    { number: "500+", label: "Active Members" },
    { number: "50+", label: "Expert Coaches" },
    { number: "1200+", label: "Plans Created" },
    { number: "98%", label: "Satisfaction Rate" },
  ];

  const progress = [
    { label: "Client Retention Rate", val: "94%", width: "94%" },
    { label: "Goal Achievement Rate", val: "87%", width: "87%" },
    { label: "Plan Completion Rate", val: "91%", width: "91%" },
  ];

  return (
    <>
      <style>{styles}</style>
      <PublicNavbar activePage="about" />

      {/* Hero */}
      <div className="about-hero">
        <div className="about-bg" />
        <div className="about-glow" />
        <div className="about-hero-inner">
          <div className="section-tag">About CoachIt</div>
          <h1 className="about-hero-title">BUILT FOR<br /><span>REAL RESULTS</span></h1>
          <p className="about-hero-desc">
            CoachIt is more than an app. It's a professional coaching ecosystem connecting dedicated athletes with expert coaches to deliver genuinely life-changing fitness transformations.
          </p>
        </div>
      </div>

      {/* Stats */}
      <section className="about-section" style={{paddingTop:"3rem", paddingBottom:"3rem"}}>
        <div className="about-inner">
          <div className="stats-row">
            {stats.map((s,i) => (
              <div className="stat-box" key={i}>
                <span className="stat-big">{s.number}</span>
                <span className="stat-small">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="about-section alt">
        <div className="about-inner">
          <div className="about-2col">
            <div>
              <span className="about-label">Our Mission</span>
              <h2 className="about-block-title">MAKING ELITE<br /><span>COACHING</span> ACCESSIBLE</h2>
              <p className="about-block-text">
                We believe professional coaching shouldn't be exclusive to professional athletes. CoachIt was created to democratize access to expert fitness guidance — giving anyone, anywhere, the tools to transform their body and health.
              </p>
              <p className="about-block-text">
                Our platform bridges the gap between busy professionals who want results and certified coaches who want to impact more lives, all through a seamless digital experience.
              </p>
              <a href="/register"><button className="btn-primary" style={{marginTop:"0.5rem"}}>Join CoachIt →</button></a>
            </div>
            <div className="about-visual">
              {progress.map((p, i) => (
                <div className="visual-stat" key={i}>
                  <div className="visual-stat-header">
                    <span className="visual-stat-label">{p.label}</span>
                    <span className="visual-stat-val">{p.val}</span>
                  </div>
                  <div className="visual-bar">
                    <div className="visual-bar-fill" style={{width: p.width}} />
                  </div>
                </div>
              ))}
              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem", marginTop:"1.5rem", position:"relative", zIndex:1}}>
                {[["🏆","Top Rated","Platform"],["⭐","4.9/5","Client Score"]].map(([icon,val,label],i) => (
                  <div key={i} style={{background:"rgba(255,107,0,0.06)", border:"1px solid var(--border-orange)", borderRadius:"var(--radius-sm)", padding:"1rem", textAlign:"center"}}>
                    <div style={{fontSize:"1.5rem", marginBottom:"0.3rem"}}>{icon}</div>
                    <div style={{fontFamily:"var(--font-display)", fontSize:"1.4rem", fontWeight:"800", color:"var(--orange)"}}>{val}</div>
                    <div style={{fontSize:"0.7rem", color:"var(--text-4)", textTransform:"uppercase", letterSpacing:"0.5px"}}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about-section">
        <div className="about-inner">
          <div className="section-header-center">
            <div className="section-tag">What We Stand For</div>
            <h2 className="sh-title">OUR CORE <span>VALUES</span></h2>
            <p className="sh-sub">The principles that guide every decision we make and every plan we build.</p>
          </div>
          <div className="values-grid">
            {values.map((v, i) => (
              <div className="value-card" key={i}>
                <span className="value-icon">{v.icon}</span>
                <div className="value-name">{v.name}</div>
                <p className="value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="about-section alt">
        <div className="about-inner">
          <div className="section-header-center">
            <div className="section-tag">The Team</div>
            <h2 className="sh-title">THE <span>EXPERTS</span> BEHIND YOUR RESULTS</h2>
            <p className="sh-sub">Our coaches are certified professionals passionate about helping you succeed.</p>
          </div>
          <div className="team-grid">
            {team.map((t, i) => (
              <div className="team-card" key={i}>
                <div className="team-avatar">{t.initial}</div>
                <div className="team-name">{t.name}</div>
                <div className="team-role">{t.role}</div>
                <p className="team-bio">{t.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-section" style={{textAlign:"center"}}>
        <div className="about-inner" style={{maxWidth:"700px"}}>
          <h2 className="sh-title" style={{marginBottom:"1rem"}}>READY TO <span>TRANSFORM?</span></h2>
          <p style={{color:"var(--text-3)", marginBottom:"2rem", fontSize:"1rem", lineHeight:"1.7"}}>
            Join hundreds of members who are already on their path to a stronger, healthier version of themselves.
          </p>
          <a href="/register"><button className="btn-primary" style={{padding:"0.9rem 2.5rem", fontSize:"1rem"}}>Start for Free →</button></a>
        </div>
      </section>

      <div className="about-footer">© 2025 CoachIt. All rights reserved.</div>
    </>
  );
}