import { useState, useEffect } from "react";

const styles = `
  .pub-navbar {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    padding: 0 2rem;
    height: 68px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: all 0.4s ease;
  }
  .pub-navbar.scrolled {
    background: rgba(6,6,6,0.96);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border-orange);
    box-shadow: 0 4px 30px rgba(0,0,0,0.4);
  }
  .pub-nav-logo {
    font-family: var(--font-display);
    font-weight: 800;
    font-size: 1.75rem;
    color: var(--text-1);
    letter-spacing: -0.5px;
  }
  .pub-nav-logo span { color: var(--orange); }
  .pub-nav-links {
    display: flex;
    gap: 2rem;
    list-style: none;
  }
  .pub-nav-links a {
    color: var(--text-3);
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.3px;
    transition: color 0.2s;
  }
  .pub-nav-links a:hover, .pub-nav-links a.active { color: var(--orange); }
  .pub-nav-actions { display: flex; gap: 0.75rem; }
  .pub-hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    padding: 4px;
    cursor: pointer;
  }
  .pub-hamburger span { display: block; width: 22px; height: 2px; background: var(--text-1); border-radius: 2px; transition: var(--transition); }
  .pub-mobile-menu {
    display: none;
    position: fixed;
    top: 68px; left: 0; right: 0;
    background: rgba(6,6,6,0.98);
    backdrop-filter: blur(20px);
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid var(--border-orange);
    flex-direction: column;
    gap: 0.25rem;
    z-index: 99;
  }
  .pub-mobile-menu.open { display: flex; }
  .pub-mobile-menu a {
    color: var(--text-2);
    font-size: 0.9rem;
    padding: 0.65rem 0;
    border-bottom: 1px solid var(--border);
    font-weight: 500;
  }
  .pub-mobile-actions { display: flex; gap: 0.75rem; margin-top: 0.75rem; }
  @media (max-width: 768px) {
    .pub-nav-links, .pub-nav-actions { display: none; }
    .pub-hamburger { display: flex; }
  }
`;

export default function PublicNavbar({ activePage = "home" }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <style>{styles}</style>
      <nav className={`pub-navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="pub-nav-logo">Coach<span>It</span></div>
        <ul className="pub-nav-links">
          <li><a href="/" className={activePage === "home" ? "active" : ""}>Home</a></li>
          <li><a href="/about" className={activePage === "about" ? "active" : ""}>About</a></li>
          <li><a href="/contact" className={activePage === "contact" ? "active" : ""}>Contact</a></li>
        </ul>
        <div className="pub-nav-actions">
          <a href="/login"><button className="btn-secondary btn-sm">Log In</button></a>
          <a href="/register"><button className="btn-primary btn-sm">Register</button></a>
        </div>
        <button className="pub-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span/><span/><span/>
        </button>
      </nav>
      <div className={`pub-mobile-menu ${menuOpen ? "open" : ""}`}>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <div className="pub-mobile-actions">
          <a href="/login" style={{flex:1}}><button className="btn-secondary" style={{width:"100%"}}>Log In</button></a>
          <a href="/register" style={{flex:1}}><button className="btn-primary" style={{width:"100%"}}>Register</button></a>
        </div>
      </div>
    </>
  );
}