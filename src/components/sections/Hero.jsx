import SocialLinks from '../ui/SocialLinks';
import ImageData from '../../data/image';

export default function Hero({ displayText, FULL_TEXT }) {
  const skills = [
    'Web Developer',
    'Mobile Developer',
    'Network Server',
    'DevOps',
    'UI/UX Design',
    'Internet OfThings',
    'SEO',
  ];

  // ✅ VIEW CV (BUKAN DOWNLOAD)
  const handleCvClick = (e) => {
    e.preventDefault();
    window.open('/assets/CV/CV_Sakhiardra_port.pdf', '_blank');
  };

  return (
    <section className="hero-section">
      <div className="grid-bg" />
      <div className="glow" />

      <div className="hero-container">
        {/* LEFT - TEXT */}
        <div className="hero-left">
          <div className="status-badge">
            <span className="status-dot"></span>
            <span className="status-label">AVAILABLE FOR WORK</span>
          </div>

          <p className="hero-location">
            Based in Indonesia
            <svg
              width="22"
              height="16"
              viewBox="0 0 22 16"
              style={{
                display: 'inline-block',
                marginLeft: '6px',
                verticalAlign: 'middle',
              }}>
              <rect width="22" height="8" fill="#ee2a3a" />
              <rect y="8" width="22" height="8" fill="#ffffff" />
            </svg>
          </p>

          <h1 className="hero-name">
            Hi, I'm
            <br />
            <span className="accent">{displayText || FULL_TEXT}</span>
          </h1>

          <div className="hero-skills">
            {skills.map((skill, i) => (
              <span key={i} className="skill-tag-glow show">
                {skill}
              </span>
            ))}
          </div>

          <div className="hero-buttons">
            <a href="#" className="btn-p" onClick={handleCvClick}>
              View My CV
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
            <a href="/projects" className="btn-g">
              Projects
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

        {/* RIGHT - IMAGE */}
        <div className="hero-right">
          <div className="img-wrap">
            <div className="corner tl" />
            <div className="corner br" />
            <img
              src={ImageData.HeroImage}
              alt="Sakhi Ardra"
              className="hero-img"
            />
          </div>
        </div>
      </div>

      <SocialLinks />
    </section>
  );
}
