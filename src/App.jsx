import DataImage from '../data';
import { listTools, listProyek } from '../data';
import { useEffect, useState } from 'react';
import './App.css';
import LoadingScreen from './components/LoadingScreen';

const FULL_TEXT = 'Sakhi Ardra';

const MAGANG = [
  {
    id: 1,
    href: 'https://www.groperti.com/', // ← TAMBAHKAN INI
    posisi: 'Web Developer - Search Engine Optimization Intern',
    perusahaan: 'PT Groperti Indonesia',
    lokasi: 'WFH Tangerang, Office Jakarta',
    periode: 'Mei 2025 — Agustus 2025',
    deskripsi:
      'MAGANG SEMESTER 2 | mengoptimasi performa SEO website perusahaann, meningkatkan peringkat di hasil pencarian Google, dan meningkatkan visibilitas online untuk menarik lebih banyak pelanggan potensial dan pembeli.',
    tech: [
      'Google Search Console',
      'Ahrefs',
      'Spreedsheet',
      'html',
      'css',
      'javascript',
      'wordpress',
    ],
    logo: '/assets/groperti.png',
  },
];

function useScrollReveal(dependency) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('revealed');
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' },
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
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
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useScrollReveal(filter);
  useCursor();

  // ✅ Fix: FULL_TEXT sebagai konstanta di luar komponen, tidak perlu di deps
  useEffect(() => {
    let timeout;
    if (!isDeleting && displayText === FULL_TEXT) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
    } else {
      timeout = setTimeout(
        () => {
          setDisplayText((prev) =>
            isDeleting
              ? prev.slice(0, -1)
              : FULL_TEXT.slice(0, prev.length + 1),
          );
        },
        isDeleting ? 80 : 120,
      );
    }
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting]);

  // ✅ Fix: CSS variables diset lewat data-theme attribute, bukan object t
  useEffect(() => {
    document.body.style.background = darkMode ? '#09090b' : '#f4f4f9';
    document.body.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    // dispatch event buat Navbar
    window.dispatchEvent(new CustomEvent('themeChange', { detail: darkMode }));
  }, [darkMode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    fetch(form.action, { method: 'POST', body: formData })
      .then((r) => r.json())
      .then((data) => {
        setIsSuccess(data.success);
        setModalMessage(
          data.success
            ? 'Pesan berhasil terkirim! Terima kasih, saya akan membalas segera.'
            : 'Gagal mengirim pesan. Silakan coba lagi.',
        );
        setShowModal(true);
        if (data.success) form.reset();
      })
      .catch(() => {
        setIsSuccess(false);
        setModalMessage('Terjadi kesalahan jaringan. Silakan coba lagi nanti.');
        setShowModal(true);
      });
  };

  return (
    <>
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      <div id="cur-dot" />
      <div id="cur-ring" />

      <button
        className="theme-toggle"
        onClick={() => setDarkMode(!darkMode)}
        aria-label="Toggle theme">
        {darkMode ? (
          <svg
            width="20"
            height="20"
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
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#7c3aed"
            strokeWidth="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </button>

      <div className="container">
        {/* ── HERO ── */}
        <section className="hero-section">
          <div className="grid-bg" />
          <div className="glow" />
          <div
            className="grid md:grid-cols-2 items-center gap-14"
            style={{ position: 'relative', zIndex: 1 }}>
            <div>
              <div className="badge reveal">
                <span className="badge-dot" />
                Portfolio Sakhi Ardra Handaru
              </div>
              <h1 className="hero-name reveal d1">
                Hai, Saya
                <br />
                <span className="accent">{displayText || FULL_TEXT}</span>
                <span className="cursor-blink" />
              </h1>
              <p className="hero-desc reveal d2">
                Mahasiswa D4 Rekayasa Perangkat Lunak — membangun pengalaman
                digital yang elegan, efisien, dan berorientasi pada pengguna.
              </p>
              <div className="hero-buttons reveal d3">
                <a
                  href="https://drive.google.com/file/d/16L5Xd_xS_hw2v3dLRPqq1NhyH2r9euda/view?usp=drive_link"
                  className="btn-p"
                  target="_blank"
                  rel="noopener noreferrer">
                  Lihat CV Saya
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
            <div className="hero-image reveal d2">
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

          {/* Sosial Media Links */}
          <div className="social-links reveal d3">
            <a
              href="https://www.linkedin.com/in/sakhiardra"
              className="social-icon"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn">
              <svg
                viewBox="0 0 24 24"
                width="22"
                height="22"
                fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C0.792 0 0 0.774 0 1.729v20.542C0 23.227 0.792 24 1.771 24h20.451c0.979 0 1.771-0.773 1.771-1.729V1.729C24 0.774 23.204 0 22.225 0z" />
              </svg>
            </a>

            <a
              href="https://github.com/skirdrax"
              className="social-icon"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub">
              <svg
                viewBox="0 0 24 24"
                width="22"
                height="22"
                fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.387.6.113.82-.26.82-.58 0-.287-.01-1.05-.015-2.06-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.082-.73.082-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.123-.3-.535-1.52.117-3.16 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.29-1.552 3.297-1.23 3.297-1.23.653 1.64.24 2.86.118 3.16.768.84 1.233 1.91 1.233 3.22 0 4.61-2.804 5.62-5.476 5.92.43.37.824 1.102.824 2.22 0 1.602-.015 2.894-.015 3.287 0 .322.216.698.83.578C20.565 21.795 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>

            <a
              href="mailto:ardrasakhi390@gmail.com"
              className="social-icon"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Email">
              <svg
                viewBox="0 0 24 24"
                width="22"
                height="22"
                fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </a>

            <a
              href="https://www.instagram.com/skhiii_adrr"
              className="social-icon"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram">
              <svg
                viewBox="0 0 24 24"
                width="22"
                height="22"
                fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        </section>

        <div className="shimmer" />

        {/* ── TENTANG ── */}
        <section id="tentang">
          <p className="section-tag reveal">Tentang Saya</p>
          <h2 className="section-title reveal d1">Profil Singkat</h2>
          <div className="about-card reveal d2">
            <p className="about-text">
              Hi! Saya <strong>Sakhi Ardra Handaru</strong>, Mahasiswa aktif D4
              Rekayasa Perangkat Lunak, Teknik Informatika, Politeknik Negeri
              Indramayu. Fokus di Web Development, Database Management, UI/UX
              Design, SEO, Jaringan Komputer, dan IoT. Siap berkontribusi secara
              profesional di industri maupun pemerintahan.
            </p>
            <div className="stats-wrapper">
              {[
                ['4+', 'Proyek Selesai'],
                ['1 +', 'Tahun Pengalaman'],
              ].map(([n, l], i) => (
                <div key={i} className="stat-card">
                  <p className="stat-n">
                    {n.split('+')[0]}
                    <span>+</span>
                  </p>
                  <p className="stat-label">{l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pendidikan */}
          <div className="education-section">
            <p className="section-tag reveal">Pendidikan</p>
            <div className="education-grid reveal d1">
              {[
                {
                  href: 'https://polindra.ac.id/',
                  img: '/assets/polindra.png',
                  name: 'Politeknik Negeri Indramayu',
                  sub: 'Teknik Informatika · D4 Rekayasa Perangkat Lunak',
                  year: '2024 — SEKARANG',
                },
                {
                  href: 'https://smait.sekolahbunayya.sch.id/',
                  img: '/assets/bunayya.png',
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
                  rel="noopener noreferrer">
                  <div className="edu-logo">
                    <img src={e.img} alt={e.name} />
                  </div>
                  <div>
                    <h4 className="edu-name">{e.name}</h4>
                    <p className="edu-sub">{e.sub}</p>
                    <p className="edu-year">{e.year}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* ── PENGALAMAN MAGANG ── */}
          <div className="magang-section">
            <p className="section-tag reveal">Pengalaman</p>
            <h3 className="tools-title reveal d1">Pengalaman Magang</h3>
            <p className="tools-sub reveal d2">
              Pengalaman kerja nyata di dunia industri.
            </p>

            <div className="magang-list">
              {MAGANG.map((m, i) => (
                <div
                  key={m.id}
                  className={`magang-card reveal d${(i % 3) + 1}`}>
                  {/* Timeline dot */}
                  <div className="magang-timeline">
                    <div className="timeline-dot" />
                    {i < MAGANG.length - 1 && <div className="timeline-line" />}
                  </div>

                  <div className="magang-body">
                    {/* Header */}
                    <div className="magang-header">
                      <div className="magang-logo">
                        <img src={m.logo} alt={m.perusahaan} />
                      </div>
                      <div className="magang-info">
                        <h4 className="magang-posisi">{m.posisi}</h4>
                        {/* PERUSAHAAN BISA DIKLIK */}
                        <a
                          href={m.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: 'none' }}>
                          <p
                            className="magang-perusahaan"
                            style={{ cursor: 'pointer' }}>
                            {m.perusahaan} ↗
                          </p>
                        </a>
                        <div className="magang-meta">
                          <span className="magang-periode">
                            <svg
                              width="11"
                              height="11"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2">
                              <rect x="3" y="4" width="18" height="18" rx="2" />
                              <line x1="16" y1="2" x2="16" y2="6" />
                              <line x1="8" y1="2" x2="8" y2="6" />
                              <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                            {m.periode}
                          </span>
                          <span className="magang-lokasi">
                            <svg
                              width="11"
                              height="11"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                              <circle cx="12" cy="10" r="3" />
                            </svg>
                            {m.lokasi}
                          </span>
                        </div>
                      </div>
                      <span className="magang-badge">Magang</span>
                    </div>

                    {/* Deskripsi */}
                    <p className="magang-desk">{m.deskripsi}</p>

                    {/* Tech */}
                    <div className="magang-tech">
                      {m.tech.map((t, idx) => (
                        <span key={idx} className="tag-chip">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* TOMBOL LINK KE WEBSITE */}
                    <a
                      href={m.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="magang-link"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        marginTop: '16px',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#2563eb',
                        textDecoration: 'none',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = '#2563eb';
                        e.target.style.gap = '10px';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = '#2563eb';
                        e.target.style.gap = '6px';
                      }}>
                      Kunjungi Website Perusahaan →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div className="tools-section">
            <p className="section-tag reveal">Tech Stack</p>
            <h3 className="tools-title reveal d1">Tools / Framework</h3>
            <p className="tools-sub reveal d2">
              Teknologi & tools untuk web development dan desain.
            </p>
            <div className="tools-grid">
              {listTools.map((tool, i) => (
                <div
                  key={tool.id}
                  className={`tool-card reveal d${(i % 4) + 1}`}>
                  <img src={tool.gambar} alt={tool.nama} className="tool-img" />
                  <div>
                    <p className="tool-name">{tool.nama}</p>
                    <p className="tool-ket">{tool.ket}</p>
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
          <h2 className="section-title reveal d1">Proyek Pilihan</h2>
          <div className="filter-wrapper reveal d2">
            {['Semua', 'Website', 'UI/UX', 'Mobile'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`filter-btn ${filter === cat ? 'active' : ''}`}>
                {cat}
                {filter === cat && <span className="active-dot" />}
              </button>
            ))}
          </div>
          <div className="proyek-grid">
            {listProyek
              .filter((p) => filter === 'Semua' || p.kategori === filter)
              .map((p, i) => (
                <div
                  key={p.id}
                  className={`proyek-card reveal d${(i % 3) + 1}`}>
                  <div className="pimg-wrap">
                    <img src={p.gambar} alt={p.nama} />
                  </div>
                  <div className="proyek-content">
                    <div className="proyek-header">
                      <h3 className="proyek-title">{p.nama}</h3>
                      {p.kategori && (
                        <span className="proyek-kategori">{p.kategori}</span>
                      )}
                    </div>
                    <p className="proyek-desk">{p.desk}</p>
                    <div className="proyek-tools">
                      {p.tools.map((tool, idx) => (
                        <span key={idx} className="tag-chip">
                          {tool}
                        </span>
                      ))}
                    </div>
                    {p.link ? (
                      <a
                        href={p.link}
                        className="btn-p btn-block"
                        target="_blank"
                        rel="noopener noreferrer">
                        Lihat Hasil →
                      </a>
                    ) : (
                      <div className="coming-soon">Coming Soon</div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </section>
        {/* ── GITHUB CONTRIBUTION GRAPH & STREAK ── */}
        <div className="github-graph-section">
          <div className="github-graph-wrapper reveal d2">
            <div className="github-graph-title">
              <h3>GitHub Contributions</h3>
            </div>

            <div className="github-graph-stats">
              <div className="github-stat">
                <span>📅</span> Last 365 days
              </div>
              <div className="github-stat">
                <span>💚</span> Total contributions
              </div>
            </div>

            <img
              src="https://ghchart.rshah.org/skirdrax"
              alt="GitHub Contribution Graph"
              className="github-graph"
            />

            <div className="github-graph-footer">
              <span>✨ Contribution graph from GitHub</span>
              <a
                href="https://github.com/skirdrax"
                target="_blank"
                rel="noopener noreferrer">
                View my GitHub →
              </a>
            </div>
          </div>

          {/* ── GITHUB STREAK STATS ── */}
          <div
            className="github-streak-wrapper reveal d2"
            style={{ marginTop: '24px' }}>
            <div className="github-streak-title">
              <h3>🔥 GitHub Streak Stats</h3>
            </div>
            <img
              src="https://github-readme-streak-stats.herokuapp.com/?user=skirdrax&theme=blueberry&hide_border=true&stroke=2563eb&ring=2563eb&fire=3b82f6&currStreakNum=3b82f6&sideNums=3b82f6&currStreakLabel=3b82f6&sideLabels=3b82f6&dates=6e7681&background=0d1117"
              alt="GitHub Streak Stats"
              className="github-streak"
              style={{
                width: '100%',
                maxWidth: '100%',
                height: 'auto',
                borderRadius: '16px',
              }}
            />
          </div>
        </div>
        {/* ── KONTAK ── */}
        <section id="kontak" className="kontak-section">
          <div className="reveal">
            <p className="section-tag center">Hubungi Saya</p>
            <h2 className="section-title-center d1">Mari Berkolaborasi</h2>
            <p className="kontak-sub d2">
              Isi form — pesan langsung terkirim ke email saya{' '}
              <span style={{ color: '#3b82f6' }}>ardrasakhi390@gmail.com</span>{' '}
              {/* ungu sangat muda */}
            </p>
          </div>
          <form
            action="https://api.web3forms.com/submit"
            method="POST"
            className="contact-form reveal d2"
            onSubmit={handleSubmit}>
            <input
              type="hidden"
              name="access_key"
              value="e837d397-cc77-4bde-bf95-77579f2b0d35"
            />
            <input
              type="hidden"
              name="subject"
              value="Pesan Baru dari Portfolio Sakhi Ardra"
            />
            <input
              type="hidden"
              name="to_email"
              value="ardrasakhi390@gmail.com"
            />
            <input type="hidden" name="from_name" value="Portfolio Website" />
            <input
              type="checkbox"
              name="botcheck"
              style={{ display: 'none' }}
            />
            <div className="form-group">
              <label>Nama Anda ssss</label>
              <input
                type="text"
                name="name"
                placeholder="Masukkan nama anda"
                className="contact-input"
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="email@contoh.com"
                className="contact-input"
              />
            </div>
            <div className="form-group">
              <label>Pesan</label>
              <textarea
                name="message"
                rows="6"
                placeholder="Tulis pesanmu di sini..."
                className="contact-input"
                required
              />
            </div>
            <button type="submit" className="send-btn">
              Kirim Pesan →
            </button>
          </form>
        </section>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className={`modal-icon ${isSuccess ? 'success' : 'error'}`}>
              {isSuccess ? '✓' : '✗'}
            </div>
            <h3 className="modal-title">
              {isSuccess ? 'Berhasil!' : 'Gagal!'}
            </h3>
            <p className="modal-message">{modalMessage}</p>
            <button className="modal-close" onClick={() => setShowModal(false)}>
              Tutup
            </button>
          </div>
        </div>
      )}
    </>
  );
}
