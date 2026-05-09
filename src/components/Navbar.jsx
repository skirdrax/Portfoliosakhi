import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Tentang', href: '#tentang' },
  { label: 'Proyek', href: '#proyek' },
  { label: 'Kontak', href: '#kontak' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <style>{`
        .navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          padding: 18px 0;
          transition: background 0.3s, border-color 0.3s, backdrop-filter 0.3s;
        }
        .navbar.scrolled {
          background: rgba(24,24,27,0.85);
          border-bottom: 1px solid rgba(255,255,255,0.07);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          padding: 12px 0;
        }
        .nav-logo {
          font-size: 18px;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.02em;
          text-decoration: none;
        }
        .nav-logo span { color: #a78bfa; }
        .nav-link {
          font-size: 14px;
          font-weight: 500;
          color: #a1a1aa;
          text-decoration: none;
          padding: 6px 4px;
          position: relative;
          transition: color 0.2s;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 1.5px;
          background: #7c3aed;
          border-radius: 2px;
          transition: width 0.25s cubic-bezier(.4,0,.2,1);
        }
        .nav-link:hover { color: #fff; }
        .nav-link:hover::after { width: 100%; }
        .nav-cta {
          font-size: 13px;
          font-weight: 600;
          color: #a78bfa;
          border: 1px solid rgba(139,92,246,0.35);
          padding: 7px 16px;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .nav-cta:hover {
          background: rgba(139,92,246,0.12);
          border-color: rgba(139,92,246,0.6);
        }
        .hamburger {
          display: flex;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          padding: 4px;
          background: none;
          border: none;
        }
        .hamburger span {
          display: block;
          width: 22px;
          height: 2px;
          background: #a1a1aa;
          border-radius: 2px;
          transition: all 0.25s;
        }
        .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); background: #fff; }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); background: #fff; }
        .mobile-menu {
          display: none;
          flex-direction: column;
          gap: 4px;
          padding: 12px 0 20px;
          border-top: 1px solid rgba(255,255,255,0.06);
          margin-top: 14px;
        }
        .mobile-menu.open { display: flex; }
        .mobile-link {
          color: #a1a1aa;
          font-size: 15px;
          font-weight: 500;
          padding: 10px 4px;
          text-decoration: none;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          transition: color 0.2s;
        }
        .mobile-link:hover { color: #fff; }
        @media (min-width: 640px) {
          .hamburger, .mobile-menu { display: none !important; }
        }
      `}</style>

      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="flex items-center justify-between">
          <a href="#beranda" className="nav-logo">
            Sakhi<span>.</span>
          </a>
          <div className="hidden sm:flex items-center gap-7">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
            <a
              href="https://drive.google.com/file/d/1F_1Iwh0pbo0IgktGh6WwyvgX64Z3htNK/view?usp=drive_link"
              className="nav-cta"
              target="_blank"
              rel="noopener noreferrer">
              Unduh CV
            </a>
          </div>
          <button
            className={`hamburger ${menuOpen ? 'open' : ''} sm:hidden`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu">
            <span />
            <span />
            <span />
          </button>
        </div>
        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="mobile-link"
              onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
          <a
            href="https://drive.google.com/file/d/1F_1Iwh0pbo0IgktGh6WwyvgX64Z3htNK/view?usp=drive_link"
            className="nav-cta mt-2 w-fit"
            target="_blank"
            rel="noopener noreferrer">
            Unduh CV
          </a>
        </div>
      </nav>
    </>
  );
}
