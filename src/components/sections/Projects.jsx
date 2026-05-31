import { listProyek } from '../../data';

export default function Projects({ filter, setFilter }) {
  return (
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
            <div key={p.id} className={`proyek-card reveal d${(i % 3) + 1}`}>
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
  );
}
