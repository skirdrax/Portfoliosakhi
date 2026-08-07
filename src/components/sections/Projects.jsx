import { useState, useEffect } from 'react';
import { listProyek } from '../../data';

export default function Projects({ filter, setFilter }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAll, setShowAll] = useState(false);

  // ✅ CEK LAYAR DESKTOP ATAU MOBILE - PAKE useEffect
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 641);
    };
    handleResize(); // panggil pertama kali
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredProjects = listProyek.filter(
    (p) => filter === 'Semua' || p.kategori === filter,
  );

  let displayProjects;
  if (isDesktop) {
    displayProjects = filteredProjects;
  } else {
    displayProjects = showAll ? filteredProjects : filteredProjects.slice(0, 3);
  }

  const totalProjects = filteredProjects.length;

  return (
    <section id="proyek">
      {/* HEADER */}
      <p
        className="section-tag reveal"
        data-aos="fade-right"
        data-aos-delay="50">
        Portfolio
      </p>
      <h2
        className="section-title reveal d1"
        data-aos="fade-left"
        data-aos-delay="60">
        Other Projects
      </h2>

      {/* FILTER */}
      <div
        className="filter-wrapper reveal d2"
        data-aos="fade-up"
        data-aos-delay="70">
        {['Semua', 'Website', 'UI/UX', 'Mobile'].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setFilter(cat);
              setShowAll(false);
            }}
            className={`filter-btn ${filter === cat ? 'active' : ''}`}>
            {cat}
            {filter === cat && <span className="active-dot" />}
          </button>
        ))}
      </div>

      {/* GRID PROYEK */}
      <div className="proyek-grid">
        {displayProjects.map((p, i) => (
          <div
            key={p.id}
            className={`proyek-card reveal d${(i % 3) + 1}`}
            data-aos="zoom-in"
            data-aos-delay={80 + i * 20}>
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

              {/* TOMBOL VIEW DETAILS */}
              <div
                className="btn-p btn-block"
                onClick={() => setSelectedProject(p)}
                style={{
                  cursor: 'pointer',
                  display: 'block',
                  textAlign: 'center',
                  padding: '12px 20px',
                  background: '#2563eb',
                  color: '#fff',
                  border: '2px solid #1e3a5f',
                  fontWeight: '700',
                  fontSize: '13px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                View Details →
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* TOMBOL LIHAT SEMUA - HANYA DI MOBILE & KALAU > 3 PROYEK */}
      {!isDesktop && totalProjects > 3 && (
        <div className="show-all-wrapper">
          {!showAll ? (
            <button className="show-all-btn" onClick={() => setShowAll(true)}>
              View All ({totalProjects - 3} more projects) ↓
            </button>
          ) : (
            <button className="show-all-btn" onClick={() => setShowAll(false)}>
              Close ↑
            </button>
          )}
        </div>
      )}

      {/* ===== POPUP PROYEK ===== */}
      {selectedProject && (
        <div
          className="project-popup-overlay"
          onClick={() => setSelectedProject(null)}>
          <div
            className="project-popup-content"
            onClick={(e) => e.stopPropagation()}>
            <button
              className="project-popup-close"
              onClick={() => setSelectedProject(null)}>
              ✕
            </button>

            {/* GAMBAR */}
            <div className="project-popup-image">
              <img src={selectedProject.gambar} alt={selectedProject.nama} />
            </div>

            {/* KONTEN */}
            <div className="project-popup-body">
              <h3 className="project-popup-title">{selectedProject.nama}</h3>
              <span className="project-popup-kategori">
                {selectedProject.kategori}
              </span>
              <p className="project-popup-desc">
                {selectedProject.deskFull || selectedProject.desk}
              </p>

              {/* TOOLS */}
              <div className="project-popup-tools">
                {selectedProject.tools.map((tool, idx) => (
                  <span key={idx} className="tag-chip">
                    {tool}
                  </span>
                ))}
              </div>

              {/* TOMBOL */}
              <div className="project-popup-buttons">
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="popup-btn popup-btn-github">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                    GitHub
                  </a>
                )}
                {selectedProject.figma && (
                  <a
                    href={selectedProject.figma}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="popup-btn popup-btn-figma">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor">
                      <path d="M8.5 0C6.843 0 5.5 1.343 5.5 3c0 1.657 1.343 3 3 3 1.657 0 3-1.343 3-3 0-1.657-1.343-3-3-3z M12 6h-3v3h3V6z M12 9h-3v3h3V9z M12 12h-3v3h3V12z M15 6h-3v3h3V6z M15 9h-3v3h3V9z M15 12h-3v3h3V12z" />
                    </svg>
                    Figma
                  </a>
                )}
                {selectedProject.liveDemo && (
                  <a
                    href={selectedProject.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="popup-btn popup-btn-live">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2">
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
