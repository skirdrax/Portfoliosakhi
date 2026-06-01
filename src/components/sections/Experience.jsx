import { useState } from 'react';
import { MAGANG } from '../../data';

export default function Experience() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    if (selectedProject && selectedProject.images) {
      setCurrentImageIndex(
        (prev) => (prev + 1) % selectedProject.images.length,
      );
    }
  };

  const prevImage = () => {
    if (selectedProject && selectedProject.images) {
      setCurrentImageIndex(
        (prev) =>
          (prev - 1 + selectedProject.images.length) %
          selectedProject.images.length,
      );
    }
  };

  return (
    <div className="magang-section">
      <p className="section-tag reveal">Pengalaman</p>
      <h3 className="tools-title reveal d1">Pengalaman Magang</h3>
      <p className="tools-sub reveal d2">
        Pengalaman kerja nyata di dunia industri.
      </p>
      <div className="magang-list">
        {MAGANG.map((m, i) => (
          <div key={m.id} className={`magang-card reveal d${(i % 3) + 1}`}>
            <div className="magang-timeline">
              <div className="timeline-dot" />
              {i < MAGANG.length - 1 && <div className="timeline-line" />}
            </div>
            <div className="magang-body">
              <div className="magang-header">
                <div className="magang-logo">
                  <img src={m.logo} alt={m.perusahaan} />
                </div>
                <div className="magang-info">
                  <h4 className="magang-posisi">{m.posisi}</h4>
                  <a
                    href={m.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none' }}>
                    <p className="magang-perusahaan">{m.perusahaan} ↗</p>
                  </a>
                  <div className="magang-meta">
                    <span className="magang-periode">{m.periode}</span>
                    <span className="magang-lokasi">{m.lokasi}</span>
                  </div>
                </div>
                <span className="magang-badge">Magang</span>
              </div>
              <p className="magang-desk">{m.deskripsi}</p>
              <div className="magang-tech">
                {m.tech.map((t, idx) => (
                  <span key={idx} className="tag-chip">
                    {t}
                  </span>
                ))}
              </div>

              {/* Tombol Lihat Proyek */}
              <button
                className="magang-project-btn"
                onClick={() => {
                  setSelectedProject(m.project);
                  setCurrentImageIndex(0);
                }}>
                Lihat Proyek Selama Magang
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </button>

              <a
                href={m.href}
                target="_blank"
                rel="noopener noreferrer"
                className="magang-link">
                Kunjungi Website Perusahaan
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Popup Proyek dengan Galeri Gambar */}
      {selectedProject && (
        <div
          className="project-modal-overlay"
          onClick={() => setSelectedProject(null)}>
          <div
            className="project-modal-content"
            onClick={(e) => e.stopPropagation()}>
            <button
              className="project-modal-close"
              onClick={() => setSelectedProject(null)}>
              ✕
            </button>

            {/* Galeri Gambar - Maksimal 4 gambar */}
            {selectedProject.images && selectedProject.images.length > 0 && (
              <div className="project-modal-gallery">
                <div className="gallery-main">
                  <img
                    src={selectedProject.images[currentImageIndex]}
                    alt={`Project ${currentImageIndex + 1}`}
                  />

                  {/* Tombol prev/next */}
                  {selectedProject.images.length > 1 && (
                    <>
                      <button className="gallery-prev" onClick={prevImage}>
                        ❮
                      </button>
                      <button className="gallery-next" onClick={nextImage}>
                        ❯
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnail navigasi */}
                {selectedProject.images.length > 1 && (
                  <div className="gallery-thumbnails">
                    {selectedProject.images.slice(0, 4).map((img, idx) => (
                      <div
                        key={idx}
                        className={`thumbnail ${currentImageIndex === idx ? 'active' : ''}`}
                        onClick={() => setCurrentImageIndex(idx)}>
                        <img src={img} alt={`Thumbnail ${idx + 1}`} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="project-modal-body">
              <h3 className="project-modal-title">{selectedProject.title}</h3>
              <p className="project-modal-desc">
                {selectedProject.description}
              </p>

              {selectedProject.results && (
                <div className="project-modal-results">
                  <h4>📊 Hasil & Pencapaian</h4>
                  <ul>
                    {selectedProject.results.map((result, idx) => (
                      <li key={idx}>{result}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="project-modal-tech">
                <h4>🛠 Teknologi & Tools</h4>
                <div className="tech-tags">
                  {selectedProject.tech.map((t, idx) => (
                    <span key={idx} className="tag-chip">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
