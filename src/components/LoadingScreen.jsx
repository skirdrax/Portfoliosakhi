import { useEffect, useState } from 'react';

export default function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  const phases = ['Initializing...', 'Loading assets...', 'Almost ready...'];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onDone, 300);
          return 100;
        }
        return prev + 1.4;
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
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#09090b',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'inherit',
      }}>
      {/* Grid background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage: `linear-gradient(rgba(139,92,246,0.065) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(139,92,246,0.065) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '500px',
          height: '200px',
          background:
            'radial-gradient(ellipse at center, rgba(124,58,237,0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Logo / Monogram */}
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: 20,
          background: 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 28,
          fontWeight: 900,
          color: '#fff',
          marginBottom: 28,
          boxShadow: '0 0 40px rgba(124,58,237,0.45)',
          letterSpacing: '-0.03em',
          position: 'relative',
          zIndex: 1,
        }}>
        SA
      </div>

      {/* Name */}
      <h1
        style={{
          fontSize: 22,
          fontWeight: 800,
          color: '#fff',
          letterSpacing: '-0.03em',
          marginBottom: 6,
          position: 'relative',
          zIndex: 1,
        }}>
        Sakhi Ardra
      </h1>

      <p
        style={{
          fontSize: 12,
          color: '#52525b',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: 48,
          position: 'relative',
          zIndex: 1,
        }}>
        Portfolio
      </p>

      {/* Progress bar */}
      <div
        style={{
          width: 260,
          position: 'relative',
          zIndex: 1,
        }}>
        <div
          style={{
            width: '100%',
            height: 3,
            background: 'rgba(255,255,255,0.06)',
            borderRadius: 99,
            overflow: 'hidden',
            marginBottom: 14,
          }}>
          <div
            style={{
              height: '100%',
              borderRadius: 99,
              background: 'linear-gradient(90deg, #7c3aed, #a78bfa)',
              width: `${Math.min(progress, 100)}%`,
              transition: 'width 0.1s linear',
              boxShadow: '0 0 10px rgba(124,58,237,0.6)',
            }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <span
            style={{
              fontSize: 11,
              color: '#a78bfa',
              fontWeight: 600,
              letterSpacing: '0.05em',
            }}>
            {phases[phase]}
          </span>
          <span
            style={{
              fontSize: 11,
              color: '#3f3f46',
              fontWeight: 700,
              fontFamily: 'monospace',
            }}>
            {Math.min(Math.floor(progress), 100)}%
          </span>
        </div>
      </div>

      {/* Dots */}
      <div
        style={{
          display: 'flex',
          gap: 6,
          marginTop: 48,
          position: 'relative',
          zIndex: 1,
        }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: '#7c3aed',
              opacity: phase === i ? 1 : 0.2,
              transition: 'opacity 0.4s',
            }}
          />
        ))}
      </div>
    </div>
  );
}
