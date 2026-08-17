import { useState } from 'react';
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

  const [showPopup, setShowPopup] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [intervalId, setIntervalId] = useState(null);

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

  const cancelPopup = () => {
    if (intervalId) clearInterval(intervalId);
    setShowPopup(false);
    setCountdown(3);
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
