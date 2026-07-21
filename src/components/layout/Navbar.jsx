import { useState, useEffect } from 'react';
import { useActiveSection } from '../hooks/useActiveSection';

const links = [
  { label: 'Beranda', href: '#beranda', id: 'beranda' },
  { label: 'Tentang', href: '#tentang', id: 'tentang' },
  { label: 'Proyek', href: '#proyek', id: 'proyek' },
  { label: 'Kontak', href: '#kontak', id: 'kontak' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const activeSection = useActiveSection(links.map((l) => l.id)) || 'beranda';

  const [showPopup, setShowPopup] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => setDarkMode(e.detail);
    window.addEventListener('themeChange', handler);
    return () => window.removeEventListener('themeChange', handler);
  }, []);

  const handleCvClick = (e) => {
    e.preventDefault();
    setShowPopup(true);
    setCountdown(3);

    const id = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(id);

          // BUAT LINK DOWNLOAD
          const link = document.createElement('a');
          link.href = '/assets/CV/CV_Sakhiardra_port.pdf';
          link.download = 'CV_Sakhiardra_Port.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          setShowPopup(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setIntervalId(id);
  };
  const cancelPopup = () => {
    if (intervalId) clearInterval(intervalId);
    setShowPopup(false);
    setCountdown(3);
  };

  const bg = darkMode ? '#09090b' : '#ffffff';
  const textPrimary = darkMode ? '#fff' : '#18181b';
  const textSecondary = darkMode ? '#a1a1aa' : '#52525b';
  const borderColor = darkMode ? 'rgba(255,255,255,.06)' : 'rgba(0,0,0,.06)';
  const lineBg = darkMode ? 'rgba(255,255,255,.04)' : 'rgba(0,0,0,.04)';

  return (
    <>
      <style>{`
        .nav { position: sticky; top: 0; z-index: 200; width: 100%; padding: 20px 24px; box-sizing: border-box; background: ${bg}; transition: all .35s cubic-bezier(.22,1,.36,1); }
        .nav.on { padding: 12px 24px; border-bottom: 1px solid ${borderColor}; backdrop-filter: blur(20px); }
        .nav-inner { display: flex; align-items: center; justify-content: space-between; max-width: 1200px; margin: 0 auto; }
        .logo { font-size: 18px; font-weight: 800; color: ${textPrimary}; text-decoration: none; letter-spacing: -.03em; position: relative; }
        .logo span { color: #3b82f6; }
        .nav-links { display: flex; align-items: center; gap: 32px; }
        .nav-link { font-size: 13px; font-weight: 500; color: ${textSecondary}; text-decoration: none; padding: 4px 0; position: relative; transition: color .2s; }
        .nav-link::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 0; height: 1.5px; background: #2563eb; border-radius: 2px; transition: width .25s; }
        .nav-link:hover { color: ${textPrimary}; }
        .nav-link:hover::after { width: 100%; }
        .nav-link.active::after { width: 100% !important; }
        .nav-cta { font-size: 12px; font-weight: 700; letter-spacing: .04em; color: #3b82f6; text-decoration: none; border: 1px solid rgba(37,99,235,.3); padding: 8px 18px; border-radius: 8px; transition: all .2s; white-space: nowrap; }
        .nav-cta:hover { background: rgba(37,99,235,.1); border-color: rgba(37,99,235,.55); }
        .hbg { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 4px; background: none; border: none; }
        .hbg s { display: block; width: 20px; height: 1.5px; background: ${textSecondary}; border-radius: 2px; transition: all .25s; }
        .hbg.on s:nth-child(1) { transform: translateY(6.5px) rotate(45deg); background: ${textPrimary}; }
        .hbg.on s:nth-child(2) { opacity: 0; }
        .hbg.on s:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); background: ${textPrimary}; }
        .mob-menu { display: none; flex-direction: column; gap: 2px; padding: 14px 0 20px; border-top: 1px solid ${lineBg}; margin-top: 12px; }
        .mob-menu.on { display: flex; }
        .mob-link { color: ${textSecondary}; font-size: 15px; font-weight: 500; padding: 11px 2px; text-decoration: none; border-bottom: 1px solid ${lineBg}; transition: color .2s; }
        .mob-link:hover { color: ${textPrimary}; }
        @media (min-width: 640px) { .hbg, .mob-menu { display: none !important; } }
        @media (max-width: 639px) { .nav-links { display: none !important; } .hbg { display: flex !important; } .nav { padding: 16px 20px !important; } .nav.on { padding: 10px 20px !important; } }

        /* POPUP STYLE */
        .popup-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.6); backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center;
          z-index: 99999; padding: 20px;
        }
        .popup-content {
          background: ${bg}; border: 2px solid #2563eb;
          box-shadow: 8px 8px 0 rgba(37,99,235,0.3);
          padding: 30px 40px; max-width: 400px; width: 90%;
          text-align: center; animation: slideUp 0.3s ease;
        }
        .popup-content h3 { font-size: 18px; font-weight: 700; color: ${textPrimary}; margin-bottom: 12px; }
        .popup-content p { font-size: 14px; color: ${textSecondary}; margin-bottom: 20px; }
        .popup-content strong { color: #2563eb; font-size: 24px; }
        .popup-cancel {
          background: transparent; border: 2px solid ${borderColor};
          color: ${textSecondary}; padding: 8px 24px; font-size: 13px;
          font-weight: 600; cursor: pointer; transition: all 0.2s;
        }
        .popup-cancel:hover { border-color: #2563eb; color: ${textPrimary}; }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <nav className={`nav ${scrolled ? 'on' : ''}`}>
        <div className="nav-inner">
          <a href="#beranda" className="logo">
            sakhi<span>Ardra</span>
          </a>
          <div className="nav-links">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`nav-link ${activeSection === l.id ? 'active' : ''}`}>
                {l.label}
              </a>
            ))}
            <a
              href="#"
              className="nav-cta"
              style={{ marginTop: '10px', width: 'fit-content' }}
              onClick={handleCvClick}>
              Download CV ↗
            </a>
          </div>
          <button
            className={`hbg ${open ? 'on' : ''}`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu">
            <s />
            <s />
            <s />
          </button>
        </div>
        <div className={`mob-menu ${open ? 'on' : ''}`}>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="mob-link"
              onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a
            href="#"
            className="nav-cta"
            style={{ marginTop: '10px', width: 'fit-content' }}
            onClick={handleCvClick}>
            Download CV ↗
          </a>
        </div>
      </nav>

      {showPopup && (
        <div className="popup-overlay" onClick={cancelPopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h3> Mengunduh CV...</h3>
            <p>
              Download akan dimulai dalam <strong>{countdown}</strong> detik...
            </p>
            <button className="popup-cancel" onClick={cancelPopup}>
              Batal
            </button>
          </div>
        </div>
      )}
    </>
  );
}
