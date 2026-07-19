export default function About() {
  return (
    <section id="tentang">
      <p className="section-tag reveal">Tentang Saya</p>
      <h2 className="section-title reveal d1">Profil Singkat</h2>
      <div className="about-card reveal d2">
        <p className="about-text">
          Hi! Saya <strong>Sakhi Ardra Handaru</strong>, mahasiswa aktif D4
          Rekayasa Perangkat Lunak di Politeknik Negeri Indramayu dengan
          semangat tinggi dalam mengembangkan solusi digital yang inovatif dan
          berdampak. Saya memiliki keahlian di bidang Web Development (React,
          Laravel, Vite), Database Management (MySQL), UI/UX Design (Figma),
          SEO, Jaringan Komputer, dan Internet of Things (IoT). Pengalaman
          magang sebagai Web Developer & SEO Intern di PT Groperti Indonesia
          mengasah kemampuan teknis dan profesional saya.
        </p>

        <p className="about-text">
          Saya percaya bahwa teknologi yang baik adalah yang mampu memberikan
          pengalaman bermakna bagi penggunanya. Karena itu, setiap proyek yang
          saya kerjakan selalu mengedepankan aspek fungsionalitas, estetika, dan
          pengalaman pengguna. Saat ini saya terbuka untuk berkontribusi lebih
          luas — baik melalui magang, proyek kolaboratif, maupun posisi
          full-time di industri maupun pemerintahan. Saya siap belajar,
          beradaptasi, dan membawa perubahan nyata melalui solusi digital yang
          inovatif.
        </p>
        <div className="stats-wrapper">
          {[
            ['5+', 'Proyek Selesai'],
            ['1+', 'Tahun Pengalaman'],
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
    </section>
  );
}
