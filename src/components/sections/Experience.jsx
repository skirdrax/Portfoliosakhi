import { MAGANG } from '../../data';

export default function Experience() {
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
    </div>
  );
}
