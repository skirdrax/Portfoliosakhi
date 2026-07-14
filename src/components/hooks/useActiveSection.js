import { useEffect, useState } from 'react';

export function useActiveSection(sectionIds) {
  const [activeId, setActiveId] = useState('beranda');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 120; // offset biar pas

      let current = 'beranda';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const offsetTop = el.offsetTop;
        if (scrollY >= offsetTop) {
          current = id;
        }
      }
      setActiveId(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // panggil pertama kali

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds]);

  return activeId;
}
