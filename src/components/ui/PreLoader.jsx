import { useEffect, useState } from 'react';

export default function PreLoader({ onDone }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      if (onDone) onDone();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onDone]);

  if (!loading) return null;

  return (
    <div className="preloader">
      <div className="preloader-spinner" />
      <p>Loading...</p>
    </div>
  );
}
