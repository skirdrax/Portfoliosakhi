import { useState, useRef, useEffect } from 'react';
import SocialLinks from '../ui/SocialLinks';
import ImageData from '../../data/image';
import { ID } from 'country-flag-icons/react/3x2';

function LanyardPhoto({ src, alt }) {
  const cardRef = useRef(null);
  const dragging = useRef(false);
  const start = useRef({ x: 0, rot: 0 });

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const setRot = (deg) => {
      card.style.setProperty('--rot', `${deg}deg`);
    };

    const onDown = (e) => {
      dragging.current = true;
      card.classList.add('is-dragging');
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const current = parseFloat(
        getComputedStyle(card).getPropertyValue('--rot') || 0,
      );
      start.current = { x, rot: current };
      window.addEventListener('mousemove', onMove);
      window.addEventListener('touchmove', onMove, { passive: false });
      window.addEventListener('mouseup', onUp);
      window.addEventListener('touchend', onUp);
    };

    const onMove = (e) => {
      if (!dragging.current) return;
      e.preventDefault();
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const delta = x - start.current.x;
      const rot = Math.max(-35, Math.min(35, start.current.rot + delta * 0.25));
      setRot(rot);
    };

    const onUp = () => {
      dragging.current = false;
      card.classList.remove('is-dragging');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchend', onUp);

      card.classList.add('spring-back');
      setRot(0);
      setTimeout(() => card.classList.remove('spring-back'), 550);
    };

    card.addEventListener('mousedown', onDown);
    card.addEventListener('touchstart', onDown, { passive: true });

    return () => {
      card.removeEventListener('mousedown', onDown);
      card.removeEventListener('touchstart', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchend', onUp);
    };
  }, []);

  return (
    <div className="lanyard-wrap">
      <svg
        className="lanyard-strap"
        viewBox="0 0 40 60"
        preserveAspectRatio="none">
        <line x1="20" y1="0" x2="20" y2="60" />
      </svg>
      <div className="lanyard-clip" />
      <div ref={cardRef} className="lanyard-card idle-swing">
        <div className="img-wrap">
          <div className="corner tl" />
          <div className="corner br" />
          <img src={src} alt={alt} className="hero-img" draggable={false} />
        </div>
      </div>
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
            'https://drive.google.com/file/d/1O-GQlWVCwO26ITMujxC6bZAkJq90rq5N/view?usp=sharing',
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
          <LanyardPhoto src={ImageData.HeroImage} alt="Sakhi Ardra" />
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
