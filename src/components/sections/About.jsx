export default function About() {
  return (
    <section id="tentang">
      <p className="section-tag reveal" data-aos="fade-up" data-aos-delay="50">
        About Me
      </p>
      <h2
        className="section-title reveal d1"
        data-aos="fade-up"
        data-aos-delay="60">
        Short Profile
      </h2>
      <div
        className="about-card reveal d2"
        data-aos="fade-up"
        data-aos-delay="70">
        <p className="about-text">
          Hi! I'm <strong>Sakhi Ardra Handaru</strong>, an active D4 Software
          Engineering student at Politeknik Negeri Indramayu with a strong
          passion for developing innovative and impactful digital solutions. I
          have expertise in Web Development (React, Laravel, Vite), Database
          Management (MySQL), UI/UX Design (Figma), SEO, Computer Networks, and
          Internet of Things (IoT). My internship experience as a Web Developer
          & SEO Intern at PT Groperti Indonesia has sharpened my technical and
          professional skills.I am ready to learn, adapt, and bring real change
          through innovative digital solutions.
        </p>

        <div className="stats-wrapper">
          {[
            ['6+', 'Projects Completed'],
            ['1+', 'Years of Experience'],
          ].map(([n, l], i) => (
            <div
              key={i}
              className="stat-card"
              data-aos="fade-up"
              data-aos-delay={80 + i * 20}>
              <p className="stat-n">
                {n.split('+')[0]}
                <span>+</span>
              </p>
              <p className="stat-label">{l}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="education-section">
        <p
          className="section-tag reveal"
          data-aos="fade-up"
          data-aos-delay="50">
          Education
        </p>
        <div
          className="education-grid reveal d1"
          data-aos="fade-up"
          data-aos-delay="60">
          {[
            {
              href: 'https://polindra.ac.id/',
              img: '/assets/polindra.png',
              name: 'Politeknik Negeri Indramayu',
              sub: 'Informatics Engineering · D4 Software Engineering',
              year: '2024 — PRESENT',
            },
            {
              href: 'https://smait.sekolahbunayya.sch.id/',
              img: '/assets/bunayya.png',
              name: 'SMAIT BUNAYYA',
              sub: 'Sciences (IPA)',
              year: '2021 — 2024',
            },
          ].map((e, i) => (
            <a
              key={e.href}
              href={e.href}
              className="edu-card"
              target="_blank"
              rel="noopener noreferrer"
              data-aos="fade-up"
              data-aos-delay={70 + i * 20}>
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
