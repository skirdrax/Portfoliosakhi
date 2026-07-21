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

  // State untuk popup CV
  const [showPopup, setShowPopup] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [intervalId, setIntervalId] = useState(null);

  // Efek muncul satu-satu setiap 1 detik
  useEffect(() => {
    if (visibleCount < skills.length) {
      const timer = setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [visibleCount, skills.length]);

  // Handle klik CV
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

  // Batal
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
          <div className="status-badge reveal d2">
            <span className="status-label">Open to Work</span>
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
            <a href="#" className="btn-p" onClick={handleCvClick}>
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

      {/* ===== POPUP KONFIRMASI CV ===== */}
      {showPopup && (
        <div className="popup-overlay" onClick={cancelPopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h3> Anda akan diarahkan ke Google Drive</h3>
            <p>
              Mengalihkan dalam <strong>{countdown}</strong> detik...
            </p>
            <button className="popup-cancel" onClick={cancelPopup}>
              Batal
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
