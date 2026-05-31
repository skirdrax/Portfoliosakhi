import { useEffect } from 'react';

export function useCursor() {
  useEffect(() => {
    const dot = document.getElementById('cur-dot');
    const ring = document.getElementById('cur-ring');
    if (!dot || !ring) return;
    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0,
      raf;
    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top = my + 'px';
    };
    const tick = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      raf = requestAnimationFrame(tick);
    };
    const over = (e) => {
      if (e.target.closest('a,button,[data-mag]')) {
        ring.classList.add('big');
        dot.classList.add('hide');
      }
    };
    const out = () => {
      ring.classList.remove('big');
      dot.classList.remove('hide');
    };
    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);
    raf = requestAnimationFrame(tick);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
      cancelAnimationFrame(raf);
    };
  }, []);
}
