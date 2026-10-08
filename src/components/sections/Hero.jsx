import { useState, useRef } from 'react';
import SocialLinks from '../ui/SocialLinks';
import ImageData from '../../data/image';
import { Link } from 'react-router-dom';

export default function Hero({ displayText, FULL_TEXT }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgWrapRef = useRef(null);

  const skills = [
    'Web Developer',
    'Mobile Developer',
    'Network Server',
    'DevOps',
    'UI/UX Design',
    'Internet OfThings',
    'SEO',
  ];

  const handleCvClick = (e) => {
    e.preventDefault();
    window.open('/assets/CV/CV_Sakhiardra_port.pdf', '_blank');
  };

  // ✅ FOTO IKUT KURSOR
  const handleMouseMove = (e) => {
    const card = imgWrapRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Hitung rotasi (max 15 derajat)
    const rotateY = ((x - centerX) / centerX) * 15;
    const rotateX = -((y - centerY) / centerY) * 15;

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  };

  const handleMouseLeave = () => {
    const card = imgWrapRef.current;
    if (!card) return;
    card.style.transform =
      'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  return (
    <section className="hero-section">
      <div className="grid-bg" />
      <div className="glow" />

      <div className="hero-container">
        {/* LEFT - TEXT */}
        <div className="hero-left">
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

            <Link to="/projects" className="btn-g">
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
            </Link>
          </div>
        </div>

        {/* RIGHT - IMAGE IKUT KURSOR */}
        <div className="hero-right">
          <div
            className="img-wrap"
            ref={imgWrapRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}>
            {!imageLoaded && (
              <div className="hero-img-loading">
                <div className="hero-img-spinner"></div>
              </div>
            )}

            <img
              src={ImageData.HeroImage}
              alt="Sakhi Ardra"
              className={`hero-img ${imageLoaded ? 'loaded' : ''}`}
              onLoad={() => setImageLoaded(true)}
            />

            <div className="corner tl" />
            <div className="corner br" />
          </div>
        </div>
      </div>

      <SocialLinks />
    </section>
  );
}
