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
    'Internet OfThings',
    'SEO',
  ];

  const [showPopup, setShowPopup] = useState(false);
  // 🔽 UBAH: dari 3 menjadi 1
  const [countdown, setCountdown] = useState(3);
  const [intervalId, setIntervalId] = useState(null);

  const handleCvClick = (e) => {
    e.preventDefault();
    setShowPopup(true);
    // 🔽 UBAH: dari 3 menjadi 1
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

  const cancelPopup = () => {
    if (intervalId) clearInterval(intervalId);
    setShowPopup(false);
    // 🔽 UBAH: dari 3 menjadi 1
    setCountdown(1);
  };

  return (
    <section className="hero-section">
      <div className="grid-bg" />
      <div className="glow" />
      <div className="hero-container">
        <div className="hero-left">
          {/* ✅ STATUS BADGE - 300ms */}
          <div className="status-badge" data-aos="fade-up" data-aos-delay="100">
            <span className="status-dot"></span>
            <span className="status-label">AVAILABLE FOR WORK</span>
          </div>

          {/* ✅ LOCATION - 350ms */}
          <p className="hero-location" data-aos="fade-up" data-aos-delay="100">
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

          {/* ✅ HERO NAME - 400ms */}
          <h1 className="hero-name" data-aos="fade-up" data-aos-delay="100">
            Hi, I'm <br />
            <span className="accent">{displayText || FULL_TEXT}</span>
          </h1>

          {/* ✅ SKILLS - 450ms */}
          <div className="hero-skills" data-aos="fade-up" data-aos-delay="100">
            {skills.map((skill, i) => (
              <span key={i} className="skill-tag-glow show">
                {skill}
              </span>
            ))}
          </div>

          {/* ✅ BUTTONS - 500ms */}
          <div className="hero-buttons" data-aos="fade-up" data-aos-delay="100">
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
        <div className="hero-right" data-aos="fade-left" data-aos-delay="400">
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
            <h3>You will be redirected to Google Drive</h3>
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
