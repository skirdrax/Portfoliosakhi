import DataImage from '../data';
import { listTools, listProyek } from '../data';
import { useEffect, useState } from 'react';

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('revealed');
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
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

  useScrollReveal();
  useCursor();

  return (
    <>
      <style>{`
        *,*::before,*::after{cursor:none!important}
        #cur-dot{
          position:fixed;width:8px;height:8px;
          background:#a78bfa;border-radius:50%;
          pointer-events:none;z-index:9999;
          transform:translate(-50%,-50%);
          transition:opacity .2s;
        }
        #cur-dot.hide{opacity:0}
        #cur-ring{
          position:fixed;width:38px;height:38px;
          border:1.5px solid rgba(167,139,250,.5);border-radius:50%;
          pointer-events:none;z-index:9998;
          transform:translate(-50%,-50%);
          transition:width .25s,height .25s,border-color .25s;
        }
        #cur-ring.big{width:58px;height:58px;border-color:rgba(167,139,250,.85)}

        @keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:none}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes shimmer{from{background-position:-500px 0}to{background-position:500px 0}}
        @keyframes gridMove{from{background-position:0 0}to{background-position:40px 40px}}
        @keyframes pulse{0%{box-shadow:0 0 0 0 rgba(124,58,237,.4)}70%{box-shadow:0 0 0 10px rgba(124,58,237,0)}100%{box-shadow:0 0 0 0 rgba(124,58,237,0)}}

        .reveal{opacity:0;transform:translateY(28px);transition:opacity .65s cubic-bezier(.22,1,.36,1),transform .65s cubic-bezier(.22,1,.36,1)}
        .reveal.revealed{opacity:1;transform:none}
        .d1{transition-delay:.07s}.d2{transition-delay:.14s}.d3{transition-delay:.21s}.d4{transition-delay:.28s}

        .grid-bg{
          position:absolute;inset:0;pointer-events:none;z-index:0;
          background-image:linear-gradient(rgba(139,92,246,.065) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,.065) 1px,transparent 1px);
          background-size:40px 40px;
          animation:gridMove 10s linear infinite;
          mask-image:radial-gradient(ellipse 90% 70% at 50% 0%,black 30%,transparent 100%);
          -webkit-mask-image:radial-gradient(ellipse 90% 70% at 50% 0%,black 30%,transparent 100%);
        }
        .glow{
          position:absolute;top:-80px;left:50%;transform:translateX(-50%);
          width:700px;height:280px;
          background:radial-gradient(ellipse at center,rgba(124,58,237,.15) 0%,transparent 65%);
          pointer-events:none;z-index:0;
        }

        .hero-name{
          font-size:clamp(44px,7vw,70px);font-weight:800;
          line-height:1.04;letter-spacing:-.035em;color:#fff;
          margin-bottom:20px;
        }
        .accent{
          background:linear-gradient(130deg,#c4b5fd 0%,#7c3aed 45%,#a78bfa 100%);
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
        }
        .cursor-blink{
          display:inline-block;width:3px;height:.88em;
          background:#7c3aed;margin-left:3px;vertical-align:-1px;
          animation:blink 1.1s step-end infinite;
        }
        .badge{
          display:inline-flex;align-items:center;gap:8px;
          background:rgba(124,58,237,.08);border:1px solid rgba(124,58,237,.22);
          padding:7px 16px;border-radius:999px;margin-bottom:28px;
          font-size:13px;color:#c4b5fd;
        }
        .badge-dot{
          width:7px;height:7px;background:#7c3aed;border-radius:50%;flex-shrink:0;
          animation:pulse 2s infinite;
        }

        .btn-p{
          display:inline-flex;align-items:center;gap:8px;
          background:#7c3aed;color:#fff;
          padding:13px 28px;border-radius:10px;
          font-weight:700;font-size:14px;letter-spacing:.02em;
          text-decoration:none;position:relative;overflow:hidden;
          transition:background .2s,transform .18s,box-shadow .2s;
        }
        .btn-p::after{
          content:'';position:absolute;top:0;left:-100%;
          width:60%;height:100%;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,.13),transparent);
          transition:left .4s;
        }
        .btn-p:hover::after{left:150%}
        .btn-p:hover{background:#6d28d9;transform:translateY(-2px);box-shadow:0 10px 28px rgba(109,40,217,.4)}

        .btn-g{
          display:inline-flex;align-items:center;gap:8px;
          background:transparent;color:#a1a1aa;
          padding:13px 24px;border-radius:10px;
          font-weight:600;font-size:14px;
          border:1px solid rgba(255,255,255,.1);
          text-decoration:none;transition:all .2s;
        }
        .btn-g:hover{color:#fff;border-color:rgba(255,255,255,.2);background:rgba(255,255,255,.04);transform:translateY(-2px)}

        .img-wrap{
          display:inline-block;position:relative;
          animation:float 7s ease-in-out infinite;
        }
        .img-wrap::before{
          content:'';position:absolute;inset:-2px;border-radius:24px;z-index:-1;
          background:linear-gradient(135deg,rgba(124,58,237,.55),rgba(167,139,250,.2) 50%,transparent);
        }
        .corner{position:absolute;width:55px;height:55px;border-color:rgba(124,58,237,.5);border-style:solid}
        .tl{top:-8px;left:-8px;border-width:2px 0 0 2px;border-radius:4px 0 0 0}
        .br{bottom:-8px;right:-8px;border-width:0 2px 2px 0;border-radius:0 0 4px 0}
        .hero-img{width:100%;max-width:370px;border-radius:22px;display:block;filter:brightness(.95) contrast(1.05)}

        .section-tag{
          display:inline-flex;align-items:center;gap:8px;
          font-size:11px;font-weight:700;letter-spacing:.13em;
          text-transform:uppercase;color:#7c3aed;margin-bottom:14px;
        }
        .section-tag::before{content:'';display:block;width:18px;height:1.5px;background:#7c3aed;border-radius:2px}

        .shimmer{
          height:1px;margin:80px 0;
          background:linear-gradient(90deg,transparent,rgba(124,58,237,.5) 40%,rgba(167,139,250,.9) 50%,rgba(124,58,237,.5) 60%,transparent);
          background-size:500px 100%;
          animation:shimmer 2.8s infinite;
        }

        .about-card{
          background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.08);
          border-radius:20px;padding:36px;position:relative;overflow:hidden;
          transition:border-color .3s;
        }
        .about-card::before{
          content:'';position:absolute;top:0;left:0;right:0;height:1px;
          background:linear-gradient(90deg,transparent,rgba(124,58,237,.6),transparent);
        }
        .about-card:hover{border-color:rgba(124,58,237,.25)}

        .stat-card{
          padding:20px;background:rgba(124,58,237,.06);
          border:1px solid rgba(124,58,237,.18);border-radius:14px;
          text-align:center;transition:all .25s;
        }
        .stat-card:hover{background:rgba(124,58,237,.1);border-color:rgba(124,58,237,.38);transform:translateY(-3px)}
        .stat-n{font-size:38px;font-weight:800;color:#fff;line-height:1}
        .stat-n span{color:#7c3aed}

        .edu-card{
          display:flex;align-items:center;gap:18px;
          padding:20px 22px;
          background:rgba(255,255,255,.02);
          border:1px solid rgba(255,255,255,.08);
          border-left:3px solid rgba(124,58,237,.4);
          border-radius:0 14px 14px 0;
          text-decoration:none;color:inherit;
          transition:all .25s;
        }
        .edu-card:hover{background:rgba(124,58,237,.07);border-left-color:#7c3aed;transform:translateX(5px)}
        .edu-logo{width:50px;height:50px;flex-shrink:0;background:#fff;border-radius:9px;padding:7px;display:flex;align-items:center;justify-content:center}

        .divider{display:flex;align-items:center;gap:14px;margin:80px 0}
        .divider::before,.divider::after{content:'';flex:1;height:1px;background:rgba(255,255,255,.06)}
        .d-dot{width:5px;height:5px;background:rgba(124,58,237,.5);border-radius:50%}

        .tool-card{
          background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.07);
          border-radius:12px;padding:14px 15px;
          display:flex;align-items:center;gap:12px;
          position:relative;overflow:hidden;transition:all .22s cubic-bezier(.22,1,.36,1);
        }
        .tool-card::after{
          content:'';position:absolute;inset:0;
          background:linear-gradient(135deg,rgba(124,58,237,.09) 0%,transparent 55%);
          opacity:0;transition:opacity .3s;
        }
        .tool-card:hover{border-color:rgba(124,58,237,.38);transform:translateY(-3px);box-shadow:0 8px 24px rgba(0,0,0,.3)}
        .tool-card:hover::after{opacity:1}
        .tool-img{width:38px;height:38px;object-fit:contain;background:rgba(255,255,255,.06);border-radius:8px;padding:6px;flex-shrink:0;position:relative;z-index:1}

        .proyek-card{
          background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.07);
          border-radius:18px;overflow:hidden;position:relative;
          transition:all .3s cubic-bezier(.22,1,.36,1);
        }
        .proyek-card::before{
          content:'';position:absolute;inset:0;pointer-events:none;z-index:1;
          background:linear-gradient(135deg,rgba(124,58,237,.08),transparent 55%);
          opacity:0;transition:opacity .3s;
        }
        .proyek-card:hover{border-color:rgba(124,58,237,.4);transform:translateY(-6px);box-shadow:0 24px 48px rgba(0,0,0,.45),0 0 0 1px rgba(124,58,237,.15)}
        .proyek-card:hover::before{opacity:1}
        .pimg-wrap{overflow:hidden;position:relative}
        .pimg-wrap::after{content:'';position:absolute;inset:0;background:linear-gradient(to top,rgba(9,9,11,.85) 0%,transparent 55%)}
        .proyek-card img{width:100%;height:185px;object-fit:cover;display:block;transition:transform .5s cubic-bezier(.22,1,.36,1)}
        .proyek-card:hover img{transform:scale(1.07)}
        .tag-chip{font-size:10px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;background:rgba(124,58,237,.1);color:#a78bfa;border:1px solid rgba(124,58,237,.22);padding:3px 9px;border-radius:999px}

        .contact-input{
          width:100%;box-sizing:border-box;
          background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.09);
          border-radius:12px;padding:13px 16px;color:#fff;font-size:14px;
          outline:none;font-family:inherit;
          transition:border-color .2s,background .2s,box-shadow .2s;
        }
        .contact-input:focus{border-color:rgba(124,58,237,.6);background:rgba(124,58,237,.05);box-shadow:0 0 0 3px rgba(124,58,237,.12)}
        .contact-input::placeholder{color:rgba(255,255,255,.2)}
        .send-btn{
          width:100%;padding:14px;background:#7c3aed;color:#fff;
          border:none;border-radius:12px;font-size:15px;font-weight:700;
          letter-spacing:.02em;transition:all .2s;position:relative;overflow:hidden;
        }
        .send-btn:hover{background:#6d28d9;transform:translateY(-2px);box-shadow:0 12px 30px rgba(109,40,217,.45)}
      `}</style>

      {/* Cursor */}
      <div id="cur-dot" />
      <div id="cur-ring" />

      {/* ── HERO ── */}
      <section
        style={{
          position: 'relative',
          paddingTop: '80px',
          paddingBottom: '16px',
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
            <h1 className="hero-name reveal d1">
              Hai, Saya
              <br />
              <span className="accent">Sakhi Ardra</span>
              <span className="cursor-blink" />
            </h1>
            <p
              className="reveal d2"
              style={{
                color: '#71717a',
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
                className="btn-p">
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
              <a href="#proyek" className="btn-g">
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
            color: '#fff',
            marginBottom: '24px',
            letterSpacing: '-.02em',
          }}>
          Kenalan Yuk
        </h2>

        <div className="about-card reveal d2">
          <p
            style={{
              color: '#a1a1aa',
              fontSize: '15px',
              lineHeight: '1.9',
              marginBottom: '28px',
            }}>
            Hi! Saya{' '}
            <strong style={{ color: '#fff' }}>Sakhi Ardra Handaru</strong>,
            Mahasiswa aktif D4 Rekayasa Perangkat Lunak, Teknik Informatika,
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
                  style={{ fontSize: i === 2 ? '28px' : '38px' }}>
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
                    color: '#52525b',
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
              display: 'grid' /* Ubah dari flex menjadi grid */,
              gridTemplateColumns:
                'repeat(auto-fit, minmax(300px, 1fr))' /* Otomatis sejajar jika layar cukup lebar */,
              gap: '20px' /* Jarak antar kartu */,
              width: '100%' /* Gunakan lebar penuh agar bisa sejajar */,
              maxWidth: '1000px' /* Tingkatkan max-width agar tidak sempit */,
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
                style={{
                  margin: 0,
                }} /* Pastikan tidak ada margin tambahan yang merusak grid */
              >
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
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: '14px',
                      marginBottom: '4px',
                    }}>
                    {e.name}
                  </h4>
                  <p style={{ color: '#71717a', fontSize: '13px' }}>{e.sub}</p>
                  <p
                    style={{
                      color: '#3f3f46',
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
              color: '#fff',
              marginBottom: '6px',
              letterSpacing: '-.01em',
            }}>
            Tools yang Dipakai
          </h3>
          <p
            className="reveal d2"
            style={{
              color: '#3f3f46',
              fontSize: '13px',
              marginBottom: '24px',
            }}>
            Teknologi & tools untuk web development dan desain.
          </p>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
            {listTools.map((tool, i) => (
              <div key={tool.id} className={`tool-card reveal d${(i % 4) + 1}`}>
                <img src={tool.gambar} alt={tool.nama} className="tool-img" />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <p
                    style={{
                      color: '#e4e4e7',
                      fontWeight: 600,
                      fontSize: '13px',
                    }}>
                    {tool.nama}
                  </p>
                  <p
                    style={{
                      color: '#52525b',
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
            color: '#fff',
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
              style={{
                padding: '8px 20px',
                borderRadius: '99px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all .25s',
                border: '1px solid',
                backgroundColor:
                  filter === cat ? '#7c3aed' : 'rgba(255,255,255,.03)',
                borderColor:
                  filter === cat ? '#7c3aed' : 'rgba(255,255,255,.08)',
                color: filter === cat ? '#fff' : '#a1a1aa',
              }}>
              {cat}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          {listProyek
            .filter((p) => filter === 'Semua' || p.kategori === filter) // Pastikan di data.js ada property kategori
            .map((p, i) => (
              <div key={p.id} className={`proyek-card reveal d${(i % 3) + 1}`}>
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
                        color: '#fff',
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
                      color: '#71717a',
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
                      style={{
                        display: 'block',
                        textAlign: 'center',
                        width: '100%',
                      }}>
                      Lihat Website / Prototipe →
                    </a>
                  ) : (
                    <div
                      style={{
                        display: 'block',
                        textAlign: 'center',
                        padding: '10px',
                        background: 'rgba(255,255,255,.03)',
                        border: '1px solid rgba(255,255,255,.06)',
                        borderRadius: '10px',
                        color: '#3f3f46',
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
          display: 'flex', // Gunakan Flexbox
          flexDirection: 'column', // Susun elemen ke bawah
          alignItems: 'center', // Mengetengahkan secara horizontal
          textAlign: 'center', // Mengetengahkan teks di dalamnya
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
              color: '#fff',
              marginBottom: '6px',
              letterSpacing: '-.02em',
            }}>
            Mari Berkolaborasi
          </h2>
          <p
            className="d2"
            style={{
              color: '#3f3f46',
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
            textAlign: 'left', // Menjaga teks input dan label tetap rata kiri agar rapi
          }}
          className="reveal d2">
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label
                style={{
                  display: 'block',
                  color: '#52525b',
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
                required
              />
            </div>
            <div>
              <label
                style={{
                  display: 'block',
                  color: '#52525b',
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
                style={{ resize: 'vertical' }}
                required
              />
            </div>
            <button type="submit" className="send-btn">
              Kirim Pesan →
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
