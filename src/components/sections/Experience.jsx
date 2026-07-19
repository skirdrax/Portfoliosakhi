import { useState } from 'react';
import { MAGANG } from '../../data';

export default function Experience() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [selectedCert, setSelectedCert] = useState(null);

  const openProject = (project) => {
    setSelectedProject(project);
    setGalleryIndex(0);
  };

  const closeProject = () => {
    setSelectedProject(null);
    setGalleryIndex(0);
  };

  const nextImage = () => {
    setGalleryIndex((prev) => (prev + 1) % selectedProject.images.length);
  };

  const prevImage = () => {
    setGalleryIndex((prev) =>
      prev === 0 ? selectedProject.images.length - 1 : prev - 1,
    );
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

              <div className="magang-buttons-group">
                {/* SATU TOMBOL UNTUK PROYEK & SERTIFIKAT */}
                <button
                  className="magang-project-btn"
                  onClick={() => openProject(m.project)}>
                  Lihat Proyek & Sertifikat
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
          </div>
        ))}
      </div>

      {/* ===== MODAL POPUP PROYEK ===== */}
      {selectedProject && (
        <div className="project-modal-overlay" onClick={closeProject}>
          <div
            className="project-modal-content"
            onClick={(e) => e.stopPropagation()}>
            <button className="project-modal-close" onClick={closeProject}>
              ✕
            </button>

            {/* Galeri Gambar Proyek */}
            {selectedProject.images && selectedProject.images.length > 0 && (
              <div className="project-modal-gallery">
                <div className="gallery-main">
                  <img
                    src={selectedProject.images[galleryIndex]}
                    alt="Project"
                  />

                  {selectedProject.images.length > 1 && (
                    <>
                      <button
                        type="button"
                        className="gallery-arrow gallery-arrow-left"
                        onClick={prevImage}>
                        ‹
                      </button>
                      <button
                        type="button"
                        className="gallery-arrow gallery-arrow-right"
                        onClick={nextImage}>
                        ›
                      </button>
                      <div className="gallery-dots">
                        {selectedProject.images.map((_, idx) => (
                          <button
                            key={idx}
                            type="button"
                            className={`gallery-dot ${
                              idx === galleryIndex ? 'active' : ''
                            }`}
                            onClick={() => setGalleryIndex(idx)}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            <div className="project-modal-body">
              <h3 className="project-modal-title">{selectedProject.title}</h3>
              <p className="project-modal-desc">
                {selectedProject.description}
              </p>

              {selectedProject.results && (
                <div className="project-modal-results">
                  <h4>Hasil & Pencapaian</h4>
                  <ul>
                    {selectedProject.results.map((result, idx) => (
                      <li key={idx}>{result}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="project-modal-tech">
                <h4>Teknologi & Tools</h4>
                <div className="tech-tags">
                  {selectedProject.tech.map((t, idx) => (
                    <span key={idx} className="tag-chip">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* ===== SERTIFIKAT ===== */}
              {selectedProject.certificates &&
                selectedProject.certificates.length > 0 && (
                  <div className="project-modal-certificates">
                    <h4>Sertifikat Magang</h4>
                    <div className="certificates-grid-modal">
                      {selectedProject.certificates.map((cert) => (
                        <div
                          key={cert.id}
                          className="certificate-card-modal"
                          onClick={() => setSelectedCert(cert)}>
                          {cert.image && (
                            <div className="certificate-image-modal">
                              <img src={cert.image} alt={cert.title} />
                            </div>
                          )}
                          <div className="certificate-info-modal">
                            <h5>{cert.title}</h5>
                            <p>{cert.issuer}</p>
                            <span>{cert.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      )}

      {/* ===== MODAL POPUP SERTIFIKAT (LIGHTBOX) ===== */}
      {selectedCert && (
        <div
          className="cert-modal-overlay"
          onClick={() => setSelectedCert(null)}>
          <div
            className="cert-modal-content"
            onClick={(e) => e.stopPropagation()}>
            <button
              className="cert-modal-close"
              onClick={() => setSelectedCert(null)}>
              ✕
            </button>
            {selectedCert.image && (
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                className="cert-modal-image"
              />
            )}
            <div className="cert-modal-info">
              <h4>{selectedCert.title}</h4>
              <p>{selectedCert.issuer}</p>
              <span>{selectedCert.date}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
