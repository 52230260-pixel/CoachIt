import { useState, useEffect, useRef } from "react";

// ============================================================
// NAVBAR COMPONENT
// ============================================================
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          padding: 0 2rem;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: all 0.4s ease;
        }
        .navbar.scrolled {
          background: rgba(10, 10, 10, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 107, 0, 0.15);
          box-shadow: 0 4px 30px rgba(0,0,0,0.4);
        }
        .navbar-logo {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 800;
          font-size: 1.8rem;
          letter-spacing: -0.5px;
          color: #fff;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .navbar-logo span { color: #FF6B00; }
        .navbar-links {
          display: flex;
          gap: 2rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .navbar-links a {
          color: rgba(255,255,255,0.75);
          text-decoration: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          letter-spacing: 0.5px;
          transition: color 0.2s;
        }
        .navbar-links a:hover { color: #FF6B00; }
        .navbar-actions {
          display: flex;
          gap: 0.75rem;
          align-items: center;
        }
        .btn-login {
          padding: 0.5rem 1.25rem;
          border: 1px solid rgba(255,255,255,0.25);
          background: transparent;
          color: #fff;
          border-radius: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-login:hover {
          border-color: #FF6B00;
          color: #FF6B00;
        }
        .btn-register {
          padding: 0.5rem 1.25rem;
          background: #FF6B00;
          color: #fff;
          border: none;
          border-radius: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-register:hover {
          background: #E55F00;
          transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(255,107,0,0.4);
        }
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          background: none;
          border: none;
          padding: 4px;
        }
        .hamburger span {
          display: block;
          width: 24px;
          height: 2px;
          background: #fff;
          transition: all 0.3s;
        }
        .mobile-menu {
          display: none;
          position: fixed;
          top: 72px;
          left: 0;
          right: 0;
          background: rgba(10,10,10,0.98);
          backdrop-filter: blur(20px);
          padding: 1.5rem 2rem;
          border-bottom: 1px solid rgba(255,107,0,0.15);
          flex-direction: column;
          gap: 1rem;
          z-index: 99;
        }
        .mobile-menu.open { display: flex; }
        .mobile-menu a {
          color: rgba(255,255,255,0.8);
          text-decoration: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          padding: 0.5rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .mobile-menu-actions {
          display: flex;
          gap: 0.75rem;
          margin-top: 0.5rem;
        }
        @media (max-width: 768px) {
          .navbar-links, .navbar-actions { display: none; }
          .hamburger { display: flex; }
        }
      `}</style>

      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <a href="/" className="navbar-logo">
          Coach<span>It</span>
        </a>

        <ul className="navbar-links">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>

        <div className="navbar-actions">
          <button
            className="btn-login"
            onClick={() => (window.location.href = "/login")}
          >
            Log In
          </button>
          <button
            className="btn-register"
            onClick={() => (window.location.href = "/register")}
          >
            Register
          </button>
        </div>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <div className="mobile-menu-actions">
          <button
            className="btn-login"
            style={{ flex: 1 }}
            onClick={() => (window.location.href = "/login")}
          >
            Log In
          </button>
          <button
            className="btn-register"
            style={{ flex: 1 }}
            onClick={() => (window.location.href = "/register")}
          >
            Register
          </button>
        </div>
      </div>
    </>
  );
}

// ============================================================
// HERO SECTION
// ============================================================
function HeroSection() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const stats = [
    { number: "500+", label: "Active Members" },
    { number: "50+", label: "Expert Coaches" },
    { number: "1200+", label: "Custom Plans" },
    { number: "98%", label: "Success Rate" },
  ];

  return (
    <>
      <style>{`
        .hero {
          min-height: 100vh;
          background: #0A0A0A;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
        }
        .hero-bg-grid {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(255,107,0,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,107,0,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .hero-glow {
          position: absolute;
          top: 20%;
          right: -10%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(255,107,0,0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .hero-glow-2 {
          position: absolute;
          bottom: 0;
          left: -5%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(255,107,0,0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          padding-top: 72px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          min-height: 100vh;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 1rem;
          border: 1px solid rgba(255,107,0,0.3);
          border-radius: 100px;
          background: rgba(255,107,0,0.08);
          color: #FF6B00;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease;
        }
        .hero-badge.visible { opacity: 1; transform: translateY(0); }
        .hero-badge::before {
          content: '';
          width: 6px;
          height: 6px;
          background: #FF6B00;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.5); }
        }
        .hero-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 800;
          font-size: clamp(3rem, 6vw, 5.5rem);
          line-height: 0.95;
          color: #fff;
          margin: 0 0 1.5rem 0;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.7s ease 0.1s;
        }
        .hero-title.visible { opacity: 1; transform: translateY(0); }
        .hero-title .accent { color: #FF6B00; }
        .hero-title .outline {
          -webkit-text-stroke: 2px rgba(255,255,255,0.3);
          color: transparent;
        }
        .hero-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 1.05rem;
          line-height: 1.75;
          color: rgba(255,255,255,0.55);
          max-width: 480px;
          margin-bottom: 2.5rem;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.7s ease 0.2s;
        }
        .hero-desc.visible { opacity: 1; transform: translateY(0); }
        .hero-cta {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.7s ease 0.3s;
        }
        .hero-cta.visible { opacity: 1; transform: translateY(0); }
        .cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.9rem 2rem;
          background: #FF6B00;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s;
          text-decoration: none;
        }
        .cta-primary:hover {
          background: #E55F00;
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(255,107,0,0.5);
        }
        .cta-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.9rem 2rem;
          background: transparent;
          color: #fff;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.25s;
          text-decoration: none;
        }
        .cta-secondary:hover {
          border-color: rgba(255,255,255,0.4);
          background: rgba(255,255,255,0.04);
        }
        .hero-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1px;
          margin-top: 3rem;
          background: rgba(255,255,255,0.06);
          border-radius: 12px;
          overflow: hidden;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.7s ease 0.4s;
        }
        .hero-stats.visible { opacity: 1; transform: translateY(0); }
        .stat-item {
          background: rgba(255,255,255,0.02);
          padding: 1.25rem;
          text-align: center;
        }
        .stat-number {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 2rem;
          font-weight: 800;
          color: #FF6B00;
          display: block;
        }
        .stat-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .hero-visual {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0;
          transform: translateX(40px);
          transition: all 0.9s ease 0.2s;
        }
        .hero-visual.visible { opacity: 1; transform: translateX(0); }
        .hero-card-main {
          background: linear-gradient(135deg, #1A1A1A, #111);
          border: 1px solid rgba(255,107,0,0.2);
          border-radius: 20px;
          padding: 2rem;
          width: 320px;
          box-shadow: 0 30px 80px rgba(0,0,0,0.5);
          position: relative;
          z-index: 2;
        }
        .card-avatar {
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #FF6B00, #FF9500);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }
        .card-name {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 1.4rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.25rem;
        }
        .card-tag {
          display: inline-block;
          padding: 0.2rem 0.7rem;
          background: rgba(255,107,0,0.15);
          color: #FF6B00;
          border-radius: 100px;
          font-size: 0.7rem;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 1.5rem;
        }
        .progress-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          color: rgba(255,255,255,0.5);
          margin-bottom: 0.4rem;
          display: flex;
          justify-content: space-between;
        }
        .progress-bar {
          height: 6px;
          background: rgba(255,255,255,0.08);
          border-radius: 100px;
          overflow: hidden;
          margin-bottom: 0.75rem;
        }
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #FF6B00, #FF9500);
          border-radius: 100px;
          animation: fillBar 1.5s ease forwards;
          width: 0%;
        }
        @keyframes fillBar {
          to { width: var(--width); }
        }
        .floating-card {
          position: absolute;
          background: rgba(20,20,20,0.95);
          border: 1px solid rgba(255,107,0,0.15);
          border-radius: 12px;
          padding: 0.9rem 1.1rem;
          backdrop-filter: blur(10px);
        }
        .floating-card-1 {
          top: -20px;
          right: -40px;
          animation: float1 4s ease-in-out infinite;
        }
        .floating-card-2 {
          bottom: 20px;
          left: -50px;
          animation: float2 4s ease-in-out infinite 0.5s;
        }
        @keyframes float1 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(8px); }
        }
        .floating-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .floating-value {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 1.4rem;
          font-weight: 700;
          color: #FF6B00;
        }
        @media (max-width: 900px) {
          .hero-content {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 3rem;
          }
          .hero-desc { max-width: 100%; margin-left: auto; margin-right: auto; }
          .hero-cta { justify-content: center; }
          .hero-visual { display: none; }
        }
      `}</style>

      <section className="hero">
        <div className="hero-bg-grid" />
        <div className="hero-glow" />
        <div className="hero-glow-2" />
        <div className="hero-content">
          <div>
            <div className={`hero-badge ${visible ? "visible" : ""}`}>
              🔥 Online Training Platform
            </div>
            <h1 className={`hero-title ${visible ? "visible" : ""}`}>
              TRAIN
              <br />
              <span className="accent">SMARTER.</span>
              <br />
              <span className="outline">LIVE BETTER.</span>
            </h1>
            <p className={`hero-desc ${visible ? "visible" : ""}`}>
              Connect with elite coaches, receive personalized workout and diet
              plans, and transform your body — all from one powerful platform.
            </p>
            <div className={`hero-cta ${visible ? "visible" : ""}`}>
              <a href="/register" className="cta-primary">
                Start Your Journey →
              </a>
              <a href="/about" className="cta-secondary">
                Learn More
              </a>
            </div>
            <div className={`hero-stats ${visible ? "visible" : ""}`}>
              {stats.map((s, i) => (
                <div className="stat-item" key={i}>
                  <span className="stat-number">{s.number}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`hero-visual ${visible ? "visible" : ""}`}>
            <div className="hero-card-main">
              <div className="card-avatar">💪</div>
              <div className="card-name">Your Custom Plan</div>
              <div className="card-tag">Active Coach Plan</div>

              <div className="progress-label">
                <span>Weekly Workout</span>
                <span>4/5 done</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ "--width": "80%" }} />
              </div>

              <div className="progress-label">
                <span>Calories Goal</span>
                <span>1820/2200</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ "--width": "83%" }} />
              </div>

              <div className="progress-label">
                <span>Hydration</span>
                <span>2.1L / 3L</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ "--width": "70%" }} />
              </div>
            </div>

            <div className="floating-card floating-card-1">
              <div className="floating-label">This Week</div>
              <div className="floating-value">+2.3kg</div>
              <div className="floating-label">Muscle Gained</div>
            </div>

            <div className="floating-card floating-card-2">
              <div className="floating-label">Plan Ends</div>
              <div className="floating-value">12 Days</div>
              <div className="floating-label">Remaining</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ============================================================
// MOTIVATION SECTION - Scrolling quotes ticker
// ============================================================
function MotivationTicker() {
  const quotes = [
    "NO PAIN NO GAIN",
    "PUSH YOUR LIMITS",
    "BE CONSISTENT",
    "RESULTS TAKE TIME",
    "TRUST THE PROCESS",
    "EAT CLEAN TRAIN HARD",
    "YOUR BODY YOUR RULES",
    "STRONGER EVERY DAY",
    "NEVER GIVE UP",
  ];

  return (
    <>
      <style>{`
        .ticker-wrapper {
          background: #FF6B00;
          overflow: hidden;
          padding: 0.85rem 0;
          position: relative;
        }
        .ticker-track {
          display: flex;
          gap: 0;
          animation: tickerMove 25s linear infinite;
          width: max-content;
        }
        @keyframes tickerMove {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-item {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 2px;
          color: rgba(255,255,255,0.95);
          padding: 0 2rem;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        .ticker-item::after {
          content: '●';
          color: rgba(255,255,255,0.4);
          font-size: 0.4rem;
        }
      `}</style>
      <div className="ticker-wrapper">
        <div className="ticker-track">
          {[...quotes, ...quotes].map((q, i) => (
            <div className="ticker-item" key={i}>
              {q}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ============================================================
// HOW IT WORKS SECTION
// ============================================================
function HowItWorks() {
  const steps = [
    {
      icon: "📝",
      step: "01",
      title: "Create Account",
      desc: "Sign up in seconds and set up your profile with your fitness goals and preferences.",
    },
    {
      icon: "📋",
      step: "02",
      title: "Request a Plan",
      desc: "Submit your details — weight, height, fitness level — and select workout or diet plan.",
    },
    {
      icon: "⚡",
      step: "03",
      title: "Coach Reviews",
      desc: "Your coach reviews your request, approves it, and builds a fully personalized plan just for you.",
    },
    {
      icon: "🏆",
      step: "04",
      title: "Start Training",
      desc: "Access your custom plans anytime, track progress, and communicate with your coach directly.",
    },
  ];

  return (
    <>
      <style>{`
        .how-section {
          background: #0D0D0D;
          padding: 6rem 2rem;
        }
        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .section-tag {
          display: inline-block;
          padding: 0.35rem 1rem;
          border: 1px solid rgba(255,107,0,0.25);
          border-radius: 100px;
          color: #FF6B00;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }
        .section-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(2.2rem, 5vw, 3.5rem);
          font-weight: 800;
          color: #fff;
          margin: 0 0 1rem 0;
        }
        .section-title span { color: #FF6B00; }
        .section-subtitle {
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          color: rgba(255,255,255,0.4);
          max-width: 500px;
          margin: 0 auto;
        }
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          max-width: 1100px;
          margin: 0 auto;
          background: rgba(255,255,255,0.04);
          border-radius: 16px;
          overflow: hidden;
        }
        .step-card {
          background: #0D0D0D;
          padding: 2.5rem 1.75rem;
          position: relative;
          transition: background 0.3s;
        }
        .step-card:hover { background: #131313; }
        .step-number {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 5rem;
          font-weight: 900;
          color: rgba(255,107,0,0.07);
          position: absolute;
          top: 1rem;
          right: 1.5rem;
          line-height: 1;
        }
        .step-icon {
          font-size: 2rem;
          margin-bottom: 1.25rem;
          display: block;
        }
        .step-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          color: #FF6B00;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: 0.5rem;
        }
        .step-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.75rem;
        }
        .step-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          color: rgba(255,255,255,0.45);
          line-height: 1.65;
        }
        @media (max-width: 900px) {
          .steps-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 500px) {
          .steps-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="how-section">
        <div className="section-header">
          <div className="section-tag">How It Works</div>
          <h2 className="section-title">
            4 STEPS TO YOUR <span>BEST BODY</span>
          </h2>
          <p className="section-subtitle">
            Our proven system takes you from where you are to where you want to
            be.
          </p>
        </div>

        <div className="steps-grid">
          {steps.map((s, i) => (
            <div className="step-card" key={i}>
              <div className="step-number">{s.step}</div>
              <span className="step-icon">{s.icon}</span>
              <div className="step-label">Step {s.step}</div>
              <div className="step-title">{s.title}</div>
              <p className="step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

// ============================================================
// FEATURES SECTION
// ============================================================
function FeaturesSection() {
  const features = [
    {
      icon: "🏋️",
      title: "Custom Workout Plans",
      desc: "Your coach designs a training program tailored to your fitness level, goals, and available equipment. With YouTube video guides for each exercise.",
    },
    {
      icon: "🥗",
      title: "Personalized Diet Plans",
      desc: "Receive a nutrition plan calculated for your body type, goals, and dietary preferences. No generic meal plans — everything is built for you.",
    },
    {
      icon: "💬",
      title: "Direct Coach Messaging",
      desc: "Stay connected with your coach through in-app messaging. Get feedback, updates, and motivation whenever you need it.",
    },
    {
      icon: "📅",
      title: "Plan Scheduling",
      desc: "Every plan comes with a clear start and end date so you always know where you are in your fitness journey.",
    },
    {
      icon: "📚",
      title: "Exercise & Food Library",
      desc: "Browse a comprehensive library of exercises and foods, curated by your coach with descriptions and video demonstrations.",
    },
    {
      icon: "🔒",
      title: "Secure & Private",
      desc: "Your personal information and health data are fully protected. Only you and your coach have access.",
    },
  ];

  return (
    <>
      <style>{`
        .features-section {
          background: #0A0A0A;
          padding: 6rem 2rem;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          max-width: 1100px;
          margin: 0 auto;
          background: rgba(255,255,255,0.04);
          border-radius: 16px;
          overflow: hidden;
        }
        .feature-card {
          background: #0A0A0A;
          padding: 2.5rem 2rem;
          transition: background 0.3s;
          border-right: none;
        }
        .feature-card:hover { background: #111; }
        .feature-icon {
          font-size: 2.2rem;
          margin-bottom: 1.25rem;
          display: block;
          filter: grayscale(0);
        }
        .feature-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 1.35rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.75rem;
        }
        .feature-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          color: rgba(255,255,255,0.42);
          line-height: 1.7;
        }
        @media (max-width: 900px) {
          .features-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .features-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="features-section">
        <div className="section-header">
          <div className="section-tag">What We Offer</div>
          <h2 className="section-title">
            EVERYTHING YOU NEED TO <span>TRANSFORM</span>
          </h2>
          <p className="section-subtitle">
            Professional tools for coaches and clients, built into one platform.
          </p>
        </div>
        <div className="features-grid">
          {features.map((f, i) => (
            <div className="feature-card" key={i}>
              <span className="feature-icon">{f.icon}</span>
              <div className="feature-title">{f.title}</div>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

// ============================================================
// TESTIMONIALS SECTION
// ============================================================
function Testimonials() {
  const testimonials = [
    {
      name: "Ahmad Khalil",
      tag: "Lost 18kg in 4 months",
      text: "CoachIt completely changed how I approach fitness. My coach's custom plan was exactly what I needed. The YouTube links for each exercise made it easy to follow from home.",
      avatar: "A",
    },
    {
      name: "Sarah El-Hassan",
      tag: "Built lean muscle mass",
      text: "I've tried many apps before, but nothing compared to having a real coach design my meals and workouts. The diet plan was delicious and actually sustainable.",
      avatar: "S",
    },
    {
      name: "Omar Nasser",
      tag: "Beginner to intermediate",
      text: "As a complete beginner, I was nervous. But my coach guided me from day one. Within 3 months I could see real, visible changes. The plan request feature is genius.",
      avatar: "O",
    },
  ];

  return (
    <>
      <style>{`
        .testimonials-section {
          background: #0D0D0D;
          padding: 6rem 2rem;
        }
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        .testimonial-card {
          background: linear-gradient(135deg, rgba(255,107,0,0.04), rgba(255,255,255,0.02));
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 2rem;
          transition: transform 0.3s, border-color 0.3s;
        }
        .testimonial-card:hover {
          transform: translateY(-4px);
          border-color: rgba(255,107,0,0.2);
        }
        .t-quote {
          font-size: 2rem;
          color: #FF6B00;
          opacity: 0.6;
          line-height: 1;
          margin-bottom: 1rem;
          font-family: Georgia, serif;
        }
        .t-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          line-height: 1.75;
          color: rgba(255,255,255,0.55);
          margin-bottom: 1.5rem;
        }
        .t-author {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .t-avatar {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #FF6B00, #FF9500);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: #fff;
          flex-shrink: 0;
        }
        .t-name {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: #fff;
        }
        .t-tag {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem;
          color: #FF6B00;
          font-weight: 600;
        }
        @media (max-width: 768px) {
          .testimonials-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="testimonials-section">
        <div className="section-header">
          <div className="section-tag">Testimonials</div>
          <h2 className="section-title">
            REAL PEOPLE. <span>REAL RESULTS.</span>
          </h2>
          <p className="section-subtitle">
            Hear from members who transformed their lives with CoachIt.
          </p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div className="testimonial-card" key={i}>
              <div className="t-quote">"</div>
              <p className="t-text">{t.text}</p>
              <div className="t-author">
                <div className="t-avatar">{t.avatar}</div>
                <div>
                  <div className="t-name">{t.name}</div>
                  <div className="t-tag">✓ {t.tag}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

// ============================================================
// CTA SECTION
// ============================================================
function CTASection() {
  return (
    <>
      <style>{`
        .cta-section {
          background: #0A0A0A;
          padding: 5rem 2rem;
        }
        .cta-box {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
          background: linear-gradient(135deg, rgba(255,107,0,0.1), rgba(255,107,0,0.03));
          border: 1px solid rgba(255,107,0,0.2);
          border-radius: 24px;
          padding: 4rem 3rem;
          position: relative;
          overflow: hidden;
        }
        .cta-box::before {
          content: '';
          position: absolute;
          top: -50%;
          left: 50%;
          transform: translateX(-50%);
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(255,107,0,0.15), transparent 70%);
          pointer-events: none;
        }
        .cta-box h2 {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 800;
          color: #fff;
          margin-bottom: 1rem;
          position: relative;
        }
        .cta-box h2 span { color: #FF6B00; }
        .cta-box p {
          font-family: 'DM Sans', sans-serif;
          color: rgba(255,255,255,0.5);
          font-size: 1rem;
          margin-bottom: 2.5rem;
          position: relative;
        }
        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          position: relative;
        }
      `}</style>
      <section className="cta-section">
        <div className="cta-box">
          <h2>
            READY TO START YOUR <span>TRANSFORMATION?</span>
          </h2>
          <p>
            Join hundreds of members who are already training smarter with
            CoachIt.
          </p>
          <div className="cta-buttons">
            <a href="/register" className="cta-primary">
              Create Free Account →
            </a>
            <a href="/contact" className="cta-secondary">
              Talk to Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

// ============================================================
// FOOTER
// ============================================================
function Footer() {
  return (
    <>
      <style>{`
        .footer {
          background: #060606;
          border-top: 1px solid rgba(255,255,255,0.05);
          padding: 3rem 2rem 2rem;
        }
        .footer-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 3rem;
          margin-bottom: 3rem;
        }
        .footer-brand-name {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 1.6rem;
          font-weight: 800;
          color: #fff;
          margin-bottom: 0.75rem;
        }
        .footer-brand-name span { color: #FF6B00; }
        .footer-brand-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          color: rgba(255,255,255,0.35);
          line-height: 1.65;
          max-width: 300px;
        }
        .footer-col-title {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          color: rgba(255,255,255,0.3);
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: 1rem;
        }
        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .footer-links a {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          color: rgba(255,255,255,0.45);
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-links a:hover { color: #FF6B00; }
        .footer-bottom {
          max-width: 1100px;
          margin: 0 auto;
          padding-top: 2rem;
          border-top: 1px solid rgba(255,255,255,0.05);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .footer-copy {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.25);
        }
        @media (max-width: 768px) {
          .footer-inner { grid-template-columns: 1fr; gap: 2rem; }
          .footer-bottom { justify-content: center; text-align: center; }
        }
      `}</style>

      <footer className="footer">
        <div className="footer-inner">
          <div>
            <div className="footer-brand-name">
              Coach<span>It</span>
            </div>
            <p className="footer-brand-desc">
              Your ultimate online training platform connecting coaches and
              clients through personalized workout and nutrition plans.
            </p>
          </div>
          <div>
            <div className="footer-col-title">Navigation</div>
            <ul className="footer-links">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
              <li>
                <a href="/login">Log In</a>
              </li>
              <li>
                <a href="/register">Register</a>
              </li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Legal</div>
            <ul className="footer-links">
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms of Service</a>
              </li>
              <li>
                <a href="#">Cookie Policy</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">
            © 2025 CoachIt. All rights reserved.
          </div>
          <div className="footer-copy">
            Built with 💪 for fitness enthusiasts
          </div>
        </div>
      </footer>
    </>
  );
}

// ============================================================
// MAIN HOME PAGE
// ============================================================
export default function Home() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #0A0A0A; color: #fff; }
        .cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.9rem 2rem;
          background: #FF6B00;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s;
          text-decoration: none;
        }
        .cta-primary:hover {
          background: #E55F00;
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(255,107,0,0.5);
        }
        .cta-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.9rem 2rem;
          background: transparent;
          color: #fff;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.25s;
          text-decoration: none;
        }
        .cta-secondary:hover {
          border-color: rgba(255,255,255,0.4);
          background: rgba(255,255,255,0.04);
        }
        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .section-tag {
          display: inline-block;
          padding: 0.35rem 1rem;
          border: 1px solid rgba(255,107,0,0.25);
          border-radius: 100px;
          color: #FF6B00;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }
        .section-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(2.2rem, 5vw, 3.5rem);
          font-weight: 800;
          color: #fff;
          margin: 0 0 1rem 0;
        }
        .section-title span { color: #FF6B00; }
        .section-subtitle {
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          color: rgba(255,255,255,0.4);
          max-width: 500px;
          margin: 0 auto;
        }
      `}</style>
      <Navbar />
      <HeroSection />
      <MotivationTicker />
      <HowItWorks />
      <FeaturesSection />
      <Testimonials />
      <CTASection />
      <Footer />
    </>
  );
}
