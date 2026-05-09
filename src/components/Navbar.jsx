import { useState, useEffect } from 'react';

const links = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Tentang', href: '#tentang' },
  { label: 'Proyek', href: '#proyek' },
  { label: 'Kontak', href: '#kontak' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <style>{`
        .nav{
          position:sticky;top:0;z-index:200;
          padding:20px 0;
          transition:all .35s cubic-bezier(.22,1,.36,1);
        }
        .nav.on{
          padding:12px 0;
          background:rgba(9,9,11,.82);
          border-bottom:1px solid rgba(255,255,255,.06);
          backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
        }
        .nav-inner{display:flex;align-items:center;justify-content:space-between}
        .logo{font-size:18px;font-weight:800;color:#fff;text-decoration:none;letter-spacing:-.03em;position:relative}
        .logo span{color:#a78bfa}
        .logo::after{
          content:'';position:absolute;bottom:-4px;left:0;
          width:100%;height:1.5px;
          background:linear-gradient(90deg,#7c3aed,transparent);
          border-radius:2px;
        }
        .nav-links{display:flex;align-items:center;gap:32px}
        .nav-link{
          font-size:13px;font-weight:500;color:#71717a;
          text-decoration:none;padding:4px 0;position:relative;
          transition:color .2s;letter-spacing:.01em;
        }
        .nav-link::after{
          content:'';position:absolute;bottom:-2px;left:0;
          width:0;height:1.5px;background:#7c3aed;border-radius:2px;
          transition:width .25s cubic-bezier(.22,1,.36,1);
        }
        .nav-link:hover{color:#e4e4e7}
        .nav-link:hover::after{width:100%}
        .nav-cta{
          font-size:12px;font-weight:700;letter-spacing:.04em;
          color:#a78bfa;text-decoration:none;
          border:1px solid rgba(124,58,237,.3);
          padding:8px 18px;border-radius:8px;
          transition:all .2s;white-space:nowrap;
        }
        .nav-cta:hover{background:rgba(124,58,237,.1);border-color:rgba(124,58,237,.55)}
        .hbg{
          display:none;flex-direction:column;gap:5px;
          cursor:pointer;padding:4px;background:none;border:none;
        }
        .hbg s{display:block;width:20px;height:1.5px;background:#71717a;border-radius:2px;transition:all .25s}
        .hbg.on s:nth-child(1){transform:translateY(6.5px) rotate(45deg);background:#fff}
        .hbg.on s:nth-child(2){opacity:0}
        .hbg.on s:nth-child(3){transform:translateY(-6.5px) rotate(-45deg);background:#fff}
        .mob-menu{
          display:none;flex-direction:column;gap:2px;
          padding:14px 0 20px;border-top:1px solid rgba(255,255,255,.05);margin-top:12px;
        }
        .mob-menu.on{display:flex}
        .mob-link{
          color:#71717a;font-size:15px;font-weight:500;padding:11px 2px;
          text-decoration:none;border-bottom:1px solid rgba(255,255,255,.04);
          transition:color .2s;
        }
        .mob-link:hover{color:#fff}
        @media(min-width:640px){.hbg,.mob-menu{display:none!important}}
        @media(max-width:639px){.nav-links{display:none!important}.hbg{display:flex!important}}
      `}</style>

      <nav className={`nav ${scrolled ? 'on' : ''}`}>
        <div className="nav-inner">
          <a href="#beranda" className="logo">
            sakhi<span>.</span>
          </a>
          <div className="nav-links">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="nav-link">
                {l.label}
              </a>
            ))}
            <a
              href="https://drive.google.com/file/d/1F_1Iwh0pbo0IgktGh6WwyvgX64Z3htNK/view?usp=drive_link"
              className="nav-cta"
              target="_blank"
              rel="noopener noreferrer">
              Unduh CV ↗
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
            href="https://drive.google.com/file/d/1F_1Iwh0pbo0IgktGh6WwyvgX64Z3htNK/view?usp=drive_link"
            className="nav-cta"
            style={{ marginTop: '10px', width: 'fit-content' }}
            target="_blank"
            rel="noopener noreferrer">
            Unduh CV ↗
          </a>
        </div>
      </nav>
    </>
  );
}
