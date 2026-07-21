import { useState, useEffect } from 'react';
import SocialLinks from '../ui/SocialLinks';
import ImageData from '../../data/image';

export default function Hero({ displayText, FULL_TEXT }) {
  const skills = [
    'Web Developer',
    'Mobile Developer',
    'Network Server',
    'DevOps',
    'UI/UX Design',
    'IoT',
    'SEO',
  ];

  // State untuk index skill yang udah muncul
  const [visibleCount, setVisibleCount] = useState(0);

  // Efek muncul satu-satu setiap 0.3 detik
  useEffect(() => {
    if (visibleCount < skills.length) {
      const timer = setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [visibleCount, skills.length]);

  return (
    <section className="hero-section">
      <div className="grid-bg" />
      <div className="glow" />
      <div
        className="grid md:grid-cols-2 items-center gap-14"
        style={{ position: 'relative', zIndex: 1 }}>
        <div>
          <div className="badge reveal">Portfolio Sakhi Ardra Handaru</div>

          {/* OPEN TO WORK BADGE */}
          <div className="status-badge reveal d2">
            <span className="status-type">Open to Work</span>
            <span className="status-type">• Internship • Full-time</span>
          </div>

          <h1 className="hero-name reveal d1">
            Hai, Saya
            <br />
            <span className="accent">{displayText || FULL_TEXT}</span>
            <span className="cursor-blink" />
          </h1>

          {/* SKILL TAGS - MUNCUL SATU-SATU */}
          <p className="hero-desc reveal d2">
            {skills.map((skill, i) => (
              <span
                key={i}
                className={`skill-tag-glow ${i < visibleCount ? 'show' : ''}`}>
                {skill}
              </span>
            ))}
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
