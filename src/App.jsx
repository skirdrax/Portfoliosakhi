import DataImage from '../data';
import { listTools, listProyek } from '../data';
import { useEffect, useState } from 'react';

function useScrollReveal(dependency) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' },
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [dependency]);
}

function useCursor() {
  useEffect(() => {
    const dot = document.getElementById('cur-dot');
    const ring = document.getElementById('cur-ring');
    if (!dot || !ring) return;
    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0,
      raf;
    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top = my + 'px';
    };
    const tick = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      raf = requestAnimationFrame(tick);
    };
    const over = (e) => {
      if (e.target.closest('a,button,[data-mag]')) {
        ring.classList.add('big');
        dot.classList.add('hide');
      }
    };
    const out = () => {
      ring.classList.remove('big');
      dot.classList.remove('hide');
    };
    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);
    raf = requestAnimationFrame(tick);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
      cancelAnimationFrame(raf);
    };
  }, []);
}

export default function App() {
  const [filter, setFilter] = useState('Semua');
  const [darkMode, setDarkMode] = useState(true);

  useScrollReveal(filter);
  useCursor();

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Theme variables
  const theme = darkMode
    ? {
        bg: '#09090b',
        bgCard: 'rgba(255,255,255,.025)',
        bgCardHover: 'rgba(124,58,237,.07)',
        textPrimary: '#fff',
        textSecondary: '#a1a1aa',
        textMuted: '#3f3f46',
        border: 'rgba(255,255,255,.08)',
        borderLight: 'rgba(255,255,255,.07)',
        glow: 'rgba(124,58,237,.15)',
        gridLine: 'rgba(139,92,246,.065)',
        inputBg: 'rgba(255,255,255,.03)',
      }
    : {
        bg: '#f4f4f9',
        bgCard: 'rgba(0,0,0,.02)',
        bgCardHover: 'rgba(124,58,237,.05)',
        textPrimary: '#18181b',
        textSecondary: '#52525b',
        textMuted: '#a1a1aa',
        border: 'rgba(0,0,0,.08)',
        borderLight: 'rgba(0,0,0,.05)',
        glow: 'rgba(124,58,237,.08)',
        gridLine: 'rgba(139,92,246,.04)',
        inputBg: 'rgba(0,0,0,.02)',
      };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          background: ${theme.bg};
          overflow-x: hidden;
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        /* Custom cursor */
        a, button, [data-mag], .btn-p, .btn-g, .send-btn, .proyek-card, .tool-card, .edu-card, .stat-card, .filter-btn, .theme-toggle {
          cursor: pointer !important;
        }
        
        * {
          cursor: none !important;
        }
        
        a, button, [data-mag], .btn-p, .btn-g, .send-btn, .proyek-card, .tool-card, .edu-card, .stat-card, .filter-btn, .theme-toggle {
          cursor: pointer !important;
        }
        
        #cur-dot {
          position: fixed; width: 8px; height: 8px;
          background: #a78bfa; border-radius: 50%;
          pointer-events: none; z-index: 9999;
          transform: translate(-50%, -50%);
          transition: opacity .2s;
        }
        #cur-dot.hide { opacity: 0 }
        #cur-ring {
          position: fixed; width: 38px; height: 38px;
          border: 1.5px solid rgba(167,139,250,.5); border-radius: 50%;
          pointer-events: none; z-index: 9998;
          transform: translate(-50%, -50%);
          transition: width .25s, height .25s, border-color .25s;
        }
        #cur-ring.big { width: 58px; height: 58px; border-color: rgba(167,139,250,.85) }

        /* Animations */
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px) } to { opacity: 1; transform: none } }
        @keyframes float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-14px) } }
        @keyframes blink { 0%,100% { opacity: 1 } 50% { opacity: 0 } }
        @keyframes shimmer { from { background-position: -500px 0 } to { background-position: 500px 0 } }
        @keyframes gridMove { from { background-position: 0 0 } to { background-position: 40px 40px } }
        @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(124,58,237,.4) } 70% { box-shadow: 0 0 0 10px rgba(124,58,237,0) } 100% { box-shadow: 0 0 0 0 rgba(124,58,237,0) } }
        @keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }

        .reveal { opacity: 0; transform: translateY(28px); transition: opacity .65s cubic-bezier(.22,1,.36,1), transform .65s cubic-bezier(.22,1,.36,1) }
        .reveal.revealed { opacity: 1; transform: none }
        .d1 { transition-delay: .07s }
        .d2 { transition-delay: .14s }
        .d3 { transition-delay: .21s }
        .d4 { transition-delay: .28s }

        .grid-bg {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background-image: linear-gradient(${theme.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${theme.gridLine} 1px, transparent 1px);
          background-size: 40px 40px;
          animation: gridMove 10s linear infinite;
          mask-image: radial-gradient(ellipse 90% 70% at 50% 0%, black 30%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 90% 70% at 50% 0%, black 30%, transparent 100%);
        }
        .glow {
          position: absolute; top: -80px; left: 50%; transform: translateX(-50%);
          width: 700px; height: 280px;
          background: radial-gradient(ellipse at center, ${theme.glow} 0%, transparent 65%);
          pointer-events: none; z-index: 0;
        }

        .hero-name {
          font-size: clamp(44px, 7vw, 70px); font-weight: 800;
          line-height: 1.04; letter-spacing: -.035em;
          margin-bottom: 20px;
        }
        .accent {
          background: linear-gradient(130deg, #c4b5fd 0%, #7c3aed 45%, #a78bfa 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .cursor-blink {
          display: inline-block; width: 3px; height: .88em;
          background: #7c3aed; margin-left: 3px; vertical-align: -1px;
          animation: blink 1.1s step-end infinite;
        }
        .badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(124,58,237,.1); border: 1px solid rgba(124,58,237,.25);
          padding: 7px 16px; border-radius: 999px; margin-bottom: 28px;
          font-size: 13px; color: #c4b5fd;
        }
        .badge-dot {
          width: 7px; height: 7px; background: #7c3aed; border-radius: 50%; flex-shrink: 0;
          animation: pulse 2s infinite;
        }

        .theme-toggle {
          position: fixed;
          top: 20px;
          right: 20px;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(124,58,237,.15);
          border: 1px solid rgba(124,58,237,.3);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9997;
          transition: all 0.3s ease;
        }
        .theme-toggle:hover {
          background: rgba(124,58,237,.3);
          transform: scale(1.05);
        }
        .sun-icon, .moon-icon {
          width: 24px;
          height: 24px;
          transition: transform 0.3s ease;
        }
        .theme-toggle:hover .sun-icon,
        .theme-toggle:hover .moon-icon {
          transform: rotate(15deg);
        }

        .btn-p {
          display: inline-flex; align-items: center; gap: 8px;
          background: #7c3aed; color: #fff;
          padding: 13px 28px; border-radius: 10px;
          font-weight: 700; font-size: 14px; letter-spacing: .02em;
          text-decoration: none; position: relative; overflow: hidden;
          transition: background .2s, transform .18s, box-shadow .2s;
        }
        .btn-p::after {
          content: ''; position: absolute; top: 0; left: -100%;
          width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.13), transparent);
          transition: left .4s;
        }
        .btn-p:hover::after { left: 150% }
        .btn-p:hover { background: #6d28d9; transform: translateY(-2px); box-shadow: 0 10px 28px rgba(109,40,217,.4) }

        .btn-g {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent;
          padding: 13px 24px; border-radius: 10px;
          font-weight: 600; font-size: 14px;
          border: 1px solid ${theme.border};
          text-decoration: none; transition: all .2s;
        }
        .btn-g:hover { background: rgba(124,58,237,.1); border-color: rgba(124,58,237,.3); transform: translateY(-2px) }

        .img-wrap {
          display: inline-block; position: relative;
          animation: float 7s ease-in-out infinite;
        }
        .img-wrap::before {
          content: ''; position: absolute; inset: -2px; border-radius: 24px; z-index: -1;
          background: linear-gradient(135deg, rgba(124,58,237,.55), rgba(167,139,250,.2) 50%, transparent);
        }
        .corner { position: absolute; width: 55px; height: 55px; border-color: rgba(124,58,237,.5); border-style: solid }
        .tl { top: -8px; left: -8px; border-width: 2px 0 0 2px; border-radius: 4px 0 0 0 }
        .br { bottom: -8px; right: -8px; border-width: 0 2px 2px 0; border-radius: 0 0 4px 0 }
        .hero-img { width: 100%; max-width: 370px; border-radius: 22px; display: block; filter: brightness(.95) contrast(1.05) }

        .section-tag {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 700; letter-spacing: .13em;
          text-transform: uppercase; color: #7c3aed; margin-bottom: 14px;
        }
        .section-tag::before { content: ''; display: block; width: 18px; height: 1.5px; background: #7c3aed; border-radius: 2px }

        .shimmer {
          height: 1px; margin: 80px 0;
          background: linear-gradient(90deg, transparent, rgba(124,58,237,.5) 40%, rgba(167,139,250,.9) 50%, rgba(124,58,237,.5) 60%, transparent);
          background-size: 500px 100%;
          animation: shimmer 2.8s infinite;
        }

        .about-card {
          background: ${theme.bgCard}; border: 1px solid ${theme.border};
          border-radius: 20px; padding: 36px; position: relative; overflow: hidden;
          transition: border-color .3s;
        }
        .about-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(124,58,237,.6), transparent);
        }
        .about-card:hover { border-color: rgba(124,58,237,.4) }

        .stat-card {
          padding: 20px; background: rgba(124,58,237,.08);
          border: 1px solid rgba(124,58,237,.2); border-radius: 14px;
          text-align: center; transition: all .25s;
        }
        .stat-card:hover { background: rgba(124,58,237,.12); border-color: rgba(124,58,237,.4); transform: translateY(-3px) }
        .stat-n { font-size: 38px; font-weight: 800; line-height: 1 }
        .stat-n span { color: #7c3aed }

        .edu-card {
          display: flex; align-items: center; gap: 18px;
          padding: 20px 22px;
          background: ${theme.bgCard};
          border: 1px solid ${theme.borderLight};
          border-left: 3px solid rgba(124,58,237,.5);
          border-radius: 0 14px 14px 0;
          text-decoration: none; color: inherit;
          transition: all .25s;
        }
        .edu-card:hover { background: ${theme.bgCardHover}; border-left-color: #7c3aed; transform: translateX(5px) }
        .edu-logo { width: 50px; height: 50px; flex-shrink: 0; background: #fff; border-radius: 9px; padding: 7px; display: flex; align-items: center; justify-content: center }

        .divider { display: flex; align-items: center; gap: 14px; margin: 80px 0 }
        .divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: ${theme.border} }
        .d-dot { width: 5px; height: 5px; background: rgba(124,58,237,.5); border-radius: 50% }

        .tool-card {
          background: ${theme.bgCard}; border: 1px solid ${theme.borderLight};
          border-radius: 12px; padding: 14px 15px;
          display: flex; align-items: center; gap: 12px;
          position: relative; overflow: hidden; transition: all .22s cubic-bezier(.22,1,.36,1);
          pointer-events: auto;
        }
        .tool-card::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(124,58,237,.09) 0%, transparent 55%);
          opacity: 0; transition: opacity .3s;
        }
        .tool-card:hover { border-color: rgba(124,58,237,.4); transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,.2) }
        .tool-card:hover::after { opacity: 1 }
        .tool-img { width: 38px; height: 38px; object-fit: contain; background: rgba(255,255,255,.08); border-radius: 8px; padding: 6px; flex-shrink: 0; position: relative; z-index: 1 }

        .proyek-card {
          background: ${theme.bgCard}; border: 1px solid ${theme.borderLight};
          border-radius: 18px; overflow: hidden; position: relative;
          transition: all .3s cubic-bezier(.22,1,.36,1);
          pointer-events: auto;
        }
        .proyek-card::before {
          content: ''; position: absolute; inset: 0; pointer-events: none; z-index: 1;
          background: linear-gradient(135deg, rgba(124,58,237,.08), transparent 55%);
          opacity: 0; transition: opacity .3s;
        }
        .proyek-card:hover { border-color: rgba(124,58,237,.45); transform: translateY(-6px); box-shadow: 0 24px 48px rgba(0,0,0,.3), 0 0 0 1px rgba(124,58,237,.2) }
        .proyek-card:hover::before { opacity: 1 }
        .pimg-wrap { overflow: hidden; position: relative }
        .pimg-wrap::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,.7) 0%, transparent 55%) }
        .proyek-card img { width: 100%; height: 185px; object-fit: cover; display: block; transition: transform .5s cubic-bezier(.22,1,.36,1) }
        .proyek-card:hover img { transform: scale(1.07) }
        .tag-chip { font-size: 10px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; background: rgba(124,58,237,.15); color: #a78bfa; border: 1px solid rgba(124,58,237,.25); padding: 3px 9px; border-radius: 999px }

        .contact-input {
          width: 100%; box-sizing: border-box;
          background: ${theme.inputBg}; border: 1px solid ${theme.borderLight};
          border-radius: 12px; padding: 13px 16px;
          font-size: 14px;
          outline: none; font-family: inherit;
          transition: border-color .2s, background .2s, box-shadow .2s;
        }
        .contact-input:focus { border-color: rgba(124,58,237,.6); background: rgba(124,58,237,.05); box-shadow: 0 0 0 3px rgba(124,58,237,.12) }
        .contact-input::placeholder { color: ${darkMode ? 'rgba(255,255,255,.2)' : 'rgba(0,0,0,.2)'} }
        .send-btn {
          width: 100%; padding: 14px; background: #7c3aed; color: #fff;
          border: none; border-radius: 12px; font-size: 15px; font-weight: 700;
          letter-spacing: .02em; transition: all .2s; position: relative; overflow: hidden;
          cursor: pointer;
        }
        .send-btn:hover { background: #6d28d9; transform: translateY(-2px); box-shadow: 0 12px 30px rgba(109,40,217,.45) }

        /* Container padding untuk mencegah terpotong */
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        section {
          padding: 60px 0;
          position: relative;
        }

        @media (max-width: 768px) {
          .container {
            padding: 0 16px;
          }
          section {
            padding: 40px 0;
          }
          .about-card {
            padding: 24px;
          }
        }
      `}</style>

      {/* Theme Toggle Button */}
      <button className="theme-toggle" onClick={toggleTheme}>
        {darkMode ? (
          <svg
            className="sun-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        ) : (
          <svg
            className="moon-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </button>

      {/* Cursor */}
      <div id="cur-dot" />
      <div id="cur-ring" />

      <div className="container">
        {/* ── HERO ── */}
        <section
          style={{
            paddingTop: '100px',
            paddingBottom: '40px',
            overflow: 'hidden',
          }}>
          <div className="grid-bg" />
          <div className="glow" />
          <div
            className="grid md:grid-cols-2 items-center gap-14"
            style={{ position: 'relative', zIndex: 1 }}>
            <div>
              <div className="badge reveal">
                <span className="badge-dot" />
                Tersedia untuk kolaborasi
              </div>
              <h1
                className="hero-name reveal d1"
                style={{ color: theme.textPrimary }}>
                Hai, Saya
                <br />
                <span className="accent">Sakhi Ardra</span>
                <span className="cursor-blink" />
              </h1>
              <p
                className="reveal d2"
                style={{
                  color: theme.textSecondary,
                  fontSize: '15px',
                  lineHeight: '1.85',
                  marginBottom: '32px',
                  maxWidth: '430px',
                }}>
                Mahasiswa D4 Rekayasa Perangkat Lunak — membangun pengalaman
                digital yang elegan, efisien, dan berorientasi pada pengguna.
              </p>
              <div
                style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}
                className="reveal d3">
                <a
                  href="https://drive.google.com/file/d/1F_1Iwh0pbo0IgktGh6WwyvgX64Z3htNK/view?usp=drive_link"
                  className="btn-p"
                  target="_blank"
                  rel="noopener noreferrer">
                  Lihat CV
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
                <a
                  href="#proyek"
                  className="btn-g"
                  style={{ color: theme.textSecondary }}>
                  Proyek
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2">
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
              </div>
            </div>
            <div
              style={{ display: 'flex', justifyContent: 'flex-end' }}
              className="reveal d2">
              <div className="img-wrap">
                <div className="corner tl" />
                <div className="corner br" />
                <img
                  src={DataImage.HeroImage}
                  alt="Sakhi Ardra"
                  className="hero-img"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="shimmer" />

        {/* ── TENTANG ── */}
        <section id="tentang">
          <p className="section-tag reveal">Tentang Saya</p>
          <h2
            className="reveal d1"
            style={{
              fontSize: 'clamp(26px,4vw,34px)',
              fontWeight: 800,
              color: theme.textPrimary,
              marginBottom: '24px',
              letterSpacing: '-.02em',
            }}>
            Kenalan Yuk
          </h2>

          <div className="about-card reveal d2">
            <p
              style={{
                color: theme.textSecondary,
                fontSize: '15px',
                lineHeight: '1.9',
                marginBottom: '28px',
              }}>
              Hi! Saya{' '}
              <strong style={{ color: theme.textPrimary }}>
                Sakhi Ardra Handaru
              </strong>
              , Mahasiswa aktif D4 Rekayasa Perangkat Lunak, Teknik Informatika,
              Politeknik Negeri Indramayu. Fokus di Web Development, Database
              Management, UI/UX Design, SEO, Jaringan Komputer, dan IoT. Saya
              senang membangun solusi digital yang efisien dan user-oriented —
              siap berkontribusi secara profesional di industri maupun
              pemerintahan.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                ['3 +', 'Proyek Selesai'],
                ['1 +', 'Tahun Pengalaman'],
              ].map(([n, l], i) => (
                <div
                  key={i}
                  className={`stat-card ${i === 2 ? 'col-span-2 sm:col-span-1' : ''}`}>
                  <p
                    className="stat-n"
                    style={{
                      fontSize: i === 2 ? '28px' : '38px',
                      color: theme.textPrimary,
                    }}>
                    {n.includes('+') ? (
                      <>
                        {n.split('+')[0]}
                        <span>+</span>
                      </>
                    ) : (
                      n
                    )}
                  </p>
                  <p
                    style={{
                      color: theme.textMuted,
                      fontSize: '12px',
                      marginTop: '6px',
                    }}>
                    {l}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Pendidikan */}
          <div style={{ marginTop: '52px' }}>
            <p className="section-tag reveal">Pendidikan</p>
            <div
              className="reveal d1"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px',
                width: '100%',
                maxWidth: '1000px',
              }}>
              {[
                {
                  href: 'https://polindra.ac.id/',
                  img: '/assets/polindra.png',
                  alt: 'Polindra',
                  name: 'Politeknik Negeri Indramayu',
                  sub: 'Teknik Informatika · D4 Rekayasa Perangkat Lunak',
                  year: '2024 — SEKARANG',
                },
                {
                  href: 'https://smait.sekolahbunayya.sch.id/',
                  img: '/assets/bunayya.png',
                  alt: 'SMAIT Bunayya',
                  name: 'SMAIT BUNAYYA',
                  sub: 'Ilmu Pengetahuan Alam (IPA)',
                  year: '2021 — 2024',
                },
              ].map((e) => (
                <a
                  key={e.href}
                  href={e.href}
                  className="edu-card"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ margin: 0 }}>
                  <div className="edu-logo">
                    <img
                      src={e.img}
                      alt={e.alt}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                      }}
                    />
                  </div>
                  <div>
                    <h4
                      style={{
                        color: theme.textPrimary,
                        fontWeight: 700,
                        fontSize: '14px',
                        marginBottom: '4px',
                      }}>
                      {e.name}
                    </h4>
                    <p style={{ color: theme.textSecondary, fontSize: '13px' }}>
                      {e.sub}
                    </p>
                    <p
                      style={{
                        color: theme.textMuted,
                        fontSize: '11px',
                        marginTop: '4px',
                        letterSpacing: '.05em',
                      }}>
                      {e.year}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div style={{ marginTop: '56px' }}>
            <p className="section-tag reveal">Tech Stack</p>
            <h3
              className="reveal d1"
              style={{
                fontSize: '22px',
                fontWeight: 800,
                color: theme.textPrimary,
                marginBottom: '6px',
                letterSpacing: '-.01em',
              }}>
              Tools yang Dipakai
            </h3>
            <p
              className="reveal d2"
              style={{
                color: theme.textMuted,
                fontSize: '13px',
                marginBottom: '24px',
              }}>
              Teknologi & tools untuk web development dan desain.
            </p>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
              {listTools.map((tool, i) => (
                <div
                  key={tool.id}
                  className={`tool-card reveal d${(i % 4) + 1}`}>
                  <img src={tool.gambar} alt={tool.nama} className="tool-img" />
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <p
                      style={{
                        color: theme.textPrimary,
                        fontWeight: 600,
                        fontSize: '13px',
                      }}>
                      {tool.nama}
                    </p>
                    <p
                      style={{
                        color: theme.textMuted,
                        fontSize: '11px',
                        marginTop: '2px',
                      }}>
                      {tool.ket}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider reveal">
          <div className="d-dot" />
          <div className="d-dot" />
          <div className="d-dot" />
        </div>

        {/* ── PROYEK ── */}
        <section id="proyek">
          <p className="section-tag reveal">Portofolio</p>
          <h2
            className="reveal d1"
            style={{
              fontSize: 'clamp(26px,4vw,34px)',
              fontWeight: 800,
              color: theme.textPrimary,
              marginBottom: '6px',
              letterSpacing: '-.02em',
            }}>
            Proyek Pilihan
          </h2>

          {/* Navbar Filter Proyek */}
          <div
            className="reveal d2"
            style={{
              display: 'flex',
              gap: '10px',
              marginBottom: '32px',
              flexWrap: 'wrap',
              marginTop: '20px',
            }}>
            {['Semua', 'Website', 'UI/UX', 'Mobile'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className="filter-btn"
                style={{
                  padding: '8px 20px',
                  borderRadius: '99px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all .25s',
                  border: '1px solid',
                  backgroundColor: filter === cat ? '#7c3aed' : theme.inputBg,
                  borderColor: filter === cat ? '#7c3aed' : theme.borderLight,
                  color: filter === cat ? '#fff' : theme.textSecondary,
                }}>
                {cat}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
            {listProyek
              .filter((p) => filter === 'Semua' || p.kategori === filter)
              .map((p, i) => (
                <div
                  key={p.id}
                  className={`proyek-card reveal d${(i % 3) + 1}`}>
                  <div className="pimg-wrap">
                    <img src={p.gambar} alt={p.nama} />
                  </div>
                  <div style={{ padding: '20px' }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '7px',
                      }}>
                      <h3
                        style={{
                          color: theme.textPrimary,
                          fontWeight: 700,
                          fontSize: '15px',
                          margin: 0,
                        }}>
                        {p.nama}
                      </h3>
                      <span
                        style={{
                          fontSize: '10px',
                          color: '#7c3aed',
                          fontWeight: 700,
                        }}>
                        {p.kategori}
                      </span>
                    </div>
                    <p
                      style={{
                        color: theme.textSecondary,
                        fontSize: '13px',
                        lineHeight: 1.7,
                        marginBottom: '14px',
                      }}>
                      {p.desk}
                    </p>
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '6px',
                        marginBottom: '18px',
                      }}>
                      {p.tools.map((t, idx) => (
                        <span key={idx} className="tag-chip">
                          {t}
                        </span>
                      ))}
                    </div>
                    {p.link ? (
                      <a
                        href={p.link}
                        className="btn-p"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'block',
                          textAlign: 'center',
                          width: '100%',
                        }}>
                        Lihat Hasil→
                      </a>
                    ) : (
                      <div
                        style={{
                          display: 'block',
                          textAlign: 'center',
                          padding: '10px',
                          background: theme.inputBg,
                          border: `1px solid ${theme.borderLight}`,
                          borderRadius: '10px',
                          color: theme.textMuted,
                          fontSize: '13px',
                          fontWeight: 600,
                        }}>
                        Coming Soon
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* ── KONTAK ── */}
        <section
          id="kontak"
          style={{
            paddingBottom: '100px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}>
          <div className="reveal">
            <p className="section-tag" style={{ justifyContent: 'center' }}>
              Hubungi Saya
            </p>
            <h2
              className="d1"
              style={{
                fontSize: 'clamp(26px,4vw,34px)',
                fontWeight: 800,
                color: theme.textPrimary,
                marginBottom: '6px',
                letterSpacing: '-.02em',
              }}>
              Mari Berkolaborasi
            </h2>
            <p
              className="d2"
              style={{
                color: theme.textMuted,
                fontSize: '13px',
                marginBottom: '32px',
              }}>
              Isi form — pesan langsung terkirim ke email saya.
            </p>
          </div>

          <form
            action="https://formsubmit.co/ardrasakhi390@gmail.com"
            method="POST"
            autoComplete="off"
            style={{
              width: '100%',
              maxWidth: '520px',
              textAlign: 'left',
            }}
            className="reveal d2">
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label
                  style={{
                    display: 'block',
                    color: theme.textMuted,
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '.1em',
                    textTransform: 'uppercase',
                    marginBottom: '8px',
                  }}>
                  Nama / Samaran
                </label>
                <input
                  type="text"
                  name="nama"
                  placeholder="Masukkan nama atau samaran..."
                  className="contact-input"
                  style={{ color: theme.textPrimary }}
                  required
                />
              </div>
              <div>
                <label
                  style={{
                    display: 'block',
                    color: theme.textMuted,
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '.1em',
                    textTransform: 'uppercase',
                    marginBottom: '8px',
                  }}>
                  Pesan
                </label>
                <textarea
                  name="pesan"
                  rows="6"
                  placeholder="Tulis pesanmu di sini..."
                  className="contact-input"
                  style={{ resize: 'vertical', color: theme.textPrimary }}
                  required
                />
              </div>
              <button type="submit" className="send-btn">
                Kirim Pesan →
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}
