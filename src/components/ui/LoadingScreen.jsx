import { useEffect, useState } from 'react';

export default function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const phases = ['Initializing...', 'Loading assets...', 'Almost ready...'];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 70) {
          clearInterval(interval);
          setTimeout(onDone, 200);
          return 100;
        }
        return prev + 2.5;
      });
    }, 22);
    return () => clearInterval(interval);
  }, [onDone]);

  useEffect(() => {
    if (progress < 40) setPhase(0);
    else if (progress < 75) setPhase(1);
    else setPhase(2);
  }, [progress]);

  return (
    <div className="loading-screen">
      <img src="./assets/skhii.png" className="loading-avatar" />
      <h1 className="loading-name">Sakhi Ardra</h1>
      <p className="loading-subtitle">Portfolio</p>

      <div className="loading-progress-container">
        <div className="loading-progress-bar">
          <div
            className="loading-progress-fill"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <div className="loading-progress-status">
          <span className="loading-phase">{phases[phase]}</span>
          <span className="loading-percentage">
            {Math.min(Math.floor(progress), 100)}%
          </span>
        </div>
      </div>

      <div className="loading-dots">
        <span style={{ opacity: phase === 0 ? 1 : 0.2 }} />
        <span style={{ opacity: phase === 1 ? 1 : 0.2 }} />
        <span style={{ opacity: phase === 2 ? 1 : 0.2 }} />
      </div>
    </div>
  );
}
