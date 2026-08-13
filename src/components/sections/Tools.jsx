export default function Tools() {
  const skills = [
    { name: 'HTML', icon: '/assets/tools/html.png' },
    { name: 'CSS', icon: '/assets/tools/css.png' },
    { name: 'JavaScript', icon: '/assets/tools/js.png' },
    { name: 'Python', icon: '/assets/tools/python.png' },
    { name: 'Ubuntu', icon: '/assets/tools/ubuntu.jpeg' },
    { name: 'aapanel', icon: '/assets/tools/aapanel.png' },
    { name: 'Arduino', icon: '/assets/tools/arduino.png' },
    { name: 'GSC', icon: '/assets/tools/gsc.webp' },
    { name: 'Figma', icon: '/assets/tools/figma.png' },
    { name: 'Canva', icon: '/assets/tools/canva.png' },
    { name: 'GitHub', icon: '/assets/tools/github.png' },
    { name: 'Postman', icon: '/assets/tools/postman.png' },
    { name: 'Apache', icon: '/assets/tools/apache.png' },
    { name: 'Docker', icon: '/assets/tools/docker.png' },
  ];

  const techStack = [
    {
      name: 'React JS',
      icon: '/assets/tools/reactjs.png',
      desc: 'Frontend Web library for building UI',
    },
    {
      name: 'Next JS',
      icon: '/assets/tools/next.png',
      desc: 'Javascript framework for full-stack development',
    },

    {
      name: 'Laravel',
      icon: '/assets/tools/laravel.png',
      desc: 'PHP framework for backend development',
    },
    {
      name: 'Flutter',
      icon: '/assets/tools/flutter.png',
      desc: 'Mobile app development SDK',
    },
    {
      name: ' PostgreSQL',
      icon: '/assets/tools/postgre.png',
      desc: 'Open-source relational database system',
    },
    {
      name: 'MySQL',
      icon: '/assets/tools/mysql.png',
      desc: 'Open-source relational database system',
    },
  ];

  return (
    <div className="tools-section">
      <p className="section-tag">Tools & Skills</p>
      <h3 className="tools-title">Tools / Tech Stack</h3>
      <p className="tools-sub">
        Technologies & tools for web development and design.
      </p>

      {/* ===== MARQUEE KANAN ===== */}
      <div className="skills-marquee-wrapper">
        <div className="skills-marquee skills-marquee-right">
          {[...skills, ...skills].map((skill, i) => (
            <div key={i} className="skill-marquee-item">
              <div className="skill-marquee-card">
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className="skill-marquee-icon"
                />
                <span className="skill-marquee-name">{skill.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== MARQUEE KIRI ===== */}
      <div className="skills-marquee-wrapper">
        <div className="skills-marquee skills-marquee-left">
          {[...skills, ...skills].map((skill, i) => (
            <div key={i} className="skill-marquee-item">
              <div className="skill-marquee-card">
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className="skill-marquee-icon"
                />
                <span className="skill-marquee-name">{skill.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== TECH STACK ===== */}
      <div className="tech-stack-section">
        <h4 className="tech-stack-title">Tech Stack</h4>
        <div
          className="tech-stack-grid reveal"
          data-aos="fade-up"
          data-aos-delay="50">
          {techStack.map((tech, i) => (
            <div key={i} className="tech-stack-card">
              <img
                src={tech.icon}
                alt={tech.name}
                className="tech-stack-icon"
              />
              <div className="tech-stack-info">
                <span className="tech-stack-name">{tech.name}</span>
                <span className="tech-stack-desc">{tech.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
