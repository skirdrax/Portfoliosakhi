import { useEffect, useState } from 'react';
import ImageData from '../../data/image'; // ← AMBIL FOTO DARI DATA

export default function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  const phases = ['INITIALIZING', 'LOADING', 'ALMOST READY', 'READY'];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(onDone, 400);
          }, 400);
          return 100;
        }
        return prev + 2.5;
      });
    }, 8);
    return () => clearInterval(interval);
  }, [onDone]);

  useEffect(() => {
    if (progress < 30) setPhase(0);
    else if (progress < 60) setPhase(1);
    else if (progress < 85) setPhase(2);
    else setPhase(3);
  }, [progress]);

  return (
    <div className={`loading-screen-brutal ${fadeOut ? 'fade-out' : ''}`}>
      <div className="loading-content">
        {/* ✅ FOTO PROFILE */}
        <div className="loading-avatar-wrapper">
          <img
            src={ImageData.HeroImage}
            alt="Sakhi Ardra"
            className="loading-avatar"
          />
        </div>

        {/* NAMA */}
        <h1 className="loading-title">SAKHI ARDRA</h1>

        {/* PROGRESS BAR */}
        <div className="loading-bar-wrapper">
          <div className="loading-bar-track">
            <div
              className="loading-bar-fill"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="loading-bar-status">
            <span className="loading-phase">{phases[phase]}</span>
            <span className="loading-percent">
              {Math.min(Math.floor(progress), 100)}%
            </span>
          </div>
        </div>

        {/* DOTS */}
        <div className="loading-dots-brutal">
          <span className={`dot ${phase >= 0 ? 'active' : ''}`} />
          <span className={`dot ${phase >= 1 ? 'active' : ''}`} />
          <span className={`dot ${phase >= 2 ? 'active' : ''}`} />
          <span className={`dot ${phase >= 3 ? 'active' : ''}`} />
        </div>

        {/* BRUTALISM CORNERS */}
        <div className="loading-corner tl"></div>
        <div className="loading-corner tr"></div>
        <div className="loading-corner bl"></div>
        <div className="loading-corner br"></div>
      </div>
    </div>
  );
}
