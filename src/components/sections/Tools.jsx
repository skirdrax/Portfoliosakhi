import { listTools } from '../../data';

export default function Tools() {
  return (
    <div className="tools-section">
      <p className="section-tag reveal" data-aos="fade-up" data-aos-delay="50">
        Tech Stack
      </p>
      <h3
        className="tools-title reveal d1"
        data-aos="fade-up"
        data-aos-delay="60">
        Tools / Framework
      </h3>
      <p className="tools-sub reveal d2" data-aos="fade-up" data-aos-delay="70">
        Technologies & tools for web development and design.
      </p>

      <div className="tools-grid">
        {listTools.map((tool, i) => (
          <div
            key={tool.id}
            className={`tool-card reveal d${(i % 4) + 1}`}
            data-aos="fade-up"
            data-aos-delay={80 + i * 10}>
            <img src={tool.gambar} alt={tool.nama} className="tool-img" />
            <div>
              <p className="tool-name">{tool.nama}</p>
              <p className="tool-ket">{tool.ket}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
