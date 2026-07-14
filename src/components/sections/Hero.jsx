import SocialLinks from '../ui/SocialLinks';
import ImageData from '../../data/image';

export default function Hero({ displayText, FULL_TEXT }) {
  return (
    <section className="hero-section">
      <div className="grid-bg" />
      <div className="glow" />
      <div
        className="grid md:grid-cols-2 items-center gap-14"
        style={{ position: 'relative', zIndex: 1 }}>
        <div>
          <div className="badge reveal">
            <span className="badge-dot" />
            Portfolio Sakhi Ardra Handaru
          </div>
          {/* OPEN TO WORK BADGE */}
          <div className="status-badge reveal d2">
            <span className="status-dot active"></span>
            <span className="status-label">Open to Work</span>
            <span className="status-type">• Internship • Full-time</span>
          </div>
          <h1 className="hero-name reveal d1">
            Hai, Saya
            <br />
            <span className="accent">{displayText || FULL_TEXT}</span>
            <span className="cursor-blink" />
          </h1>
          <p className="hero-desc reveal d2">
            <span className="skill-tag-glow">Web Develosper</span>
            <span className="skill-tag-glow">Mobile Developer</span>
            <span className="skill-tag-glow">Network Server</span>
            <span className="skill-tag-glow">DevOps</span>
            <span className="skill-tag-glow">UI/UX Design</span>
            <span className="skill-tag-glow">IoT</span>
            <span className="skill-tag-glow">SEO</span>
          </p>

          <div className="hero-buttons reveal d3">
            <a
              href="https://drive.google.com/file/d/16L5Xd_xS_hw2v3dLRPqq1NhyH2r9euda/view?usp=drive_link"
              className="btn-p"
              target="_blank"
              rel="noopener noreferrer">
              Lihat CV Saya
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
            <a href="#proyek" className="btn-g">
              Proyek
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
        <div className="hero-image reveal d2">
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
