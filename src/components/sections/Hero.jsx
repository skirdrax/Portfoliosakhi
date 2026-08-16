import { useState, useRef } from 'react';
import SocialLinks from '../ui/SocialLinks';
import ImageData from '../../data/image';
import { ID } from 'country-flag-icons/react/3x2';

function BrutalPhoto({ src, alt }) {
  const [punching, setPunching] = useState(false);
  const timeoutRef = useRef(null);

  const handleClick = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setPunching(false);
    requestAnimationFrame(() => {
      setPunching(true);
      timeoutRef.current = setTimeout(() => setPunching(false), 600);
    });
  };

  return (
    <div className={`brutal-photo${punching ? ' punch' : ''}`}>
      <div className="bp-block bp-block-1" />
      <div className="bp-block bp-block-2" />
      <div className="bp-dots" />

      <div className="bp-mark bp-mark-tl">+</div>
      <div className="bp-mark bp-mark-br">+</div>

      <div className="bp-tag">
        <span>PORTRAIT</span>
        <span className="bp-tag-sub">ID / 2026</span>
      </div>

      <div className="bp-tag-2">
        <span>Do not click this picture!</span>
        <span className="bp-tag-sub-2">POW!!!!</span>
      </div>

      <div className="img-wrap" onClick={handleClick}>
        <div className="corner tl" />
        <div className="corner br" />
        <span className="ghost-r" aria-hidden="true">
          <img src={src} alt="" draggable={false} />
        </span>
        <span className="ghost-b" aria-hidden="true">
          <img src={src} alt="" draggable={false} />
        </span>
        <img src={src} alt={alt} className="hero-img" draggable={false} />
        <span className="scanline" aria-hidden="true" />
      </div>

      <span className="bp-stamp" aria-hidden="true">
        POW!
      </span>
    </div>
  );
}

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

  // State for CV popup
  const [showPopup, setShowPopup] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [intervalId, setIntervalId] = useState(null);

  // Handle CV click
  const handleCvClick = (e) => {
    e.preventDefault();
    setShowPopup(true);
    setCountdown(3);

    const id = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          window.open(
            'https://drive.google.com/file/d/11lnmxdH_GMxtiGpDusohWX64mQSOOwmb/view?usp=drive_link',
            '_blank',
          );
          setShowPopup(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setIntervalId(id);
  };

  // Cancel
  const cancelPopup = () => {
    if (intervalId) clearInterval(intervalId);
    setShowPopup(false);
    setCountdown(3);
  };

  return (
    <section className="hero-section">
      <div className="grid-bg" />
      <div className="glow" />
      <div
        className="grid md:grid-cols-2 items-center gap-14"
        style={{ position: 'relative', zIndex: 1 }}>
        <div>
          {/* OPEN TO WORK BADGE */}
          <div
            className="status-badge reveal d2"
            data-aos="fade-up"
            data-aos-delay="700">
            <span className="status-label">Open to Work</span>
            <span className="status-type">• Internship • Full-time</span>
          </div>
          <div className="hero-country" data-aos="fade-up" data-aos-delay="800">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              Based In Indonesia
              <ID title="Indonesia" style={{ width: '20px' }} />
            </h3>
          </div>
          <h1
            className="hero-name reveal d1"
            data-aos="fade-up"
            data-aos-delay="750">
            Hi, I'm
            <br />
            <span className="accent">{displayText || FULL_TEXT}</span>
            <span className="cursor-blink" />
          </h1>

          {/* SKILL TAGS - LANGSUNG SEMUA */}
          <p
            className="hero-desc reveal d2"
            data-aos="fade-up"
            data-aos-delay="800">
            {skills.map((skill, i) => (
              <span key={i} className="skill-tag-glow show">
                {skill}
              </span>
            ))}
          </p>

          <div
            className="hero-buttons reveal d3"
            data-aos="fade-up"
            data-aos-delay="800">
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
            <a href="#proyek" className="btn-g">
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

        <div
          className="hero-image reveal d2"
          data-aos="fade-left"
          data-aos-delay="800">
          <BrutalPhoto src={ImageData.HeroImage} alt="Sakhi Ardra" />
        </div>
      </div>
      <SocialLinks />

      {/* ===== CV CONFIRMATION POPUP ===== */}
      {showPopup && (
        <div className="popup-overlay" onClick={cancelPopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h3>⏳ You will be redirected to Google Drive</h3>
            <p>
              Redirecting in <strong>{countdown}</strong> seconds...
            </p>
            <button className="popup-cancel" onClick={cancelPopup}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
