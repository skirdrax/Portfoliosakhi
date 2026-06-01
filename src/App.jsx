import { useState, useEffect } from 'react';
import './styles/main.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ThemeToggle from './components/layout/ThemeToggle';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Tools from './components/sections/Tools';
import Projects from './components/sections/Projects';
import GitHubStats from './components/sections/GitHubStats';
import Contact from './components/sections/Contact';
import Modal from './components/ui/Modal';
import LoadingScreen from './components/ui/LoadingScreen';
import { useScrollReveal } from './components/hooks/useScrollReveal';
import { useCursor } from './components/hooks/useCursor';
import Certificates from './components/sections/Certificates';
const FULL_TEXT = 'Sakhi Ardra';

export default function App() {
  const [filter, setFilter] = useState('Semua');
  const [darkMode, setDarkMode] = useState(true);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useScrollReveal(filter);
  useCursor();

  // Typing effect
  useEffect(() => {
    let timeout;
    if (!isDeleting && displayText === FULL_TEXT) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
    } else {
      timeout = setTimeout(
        () => {
          setDisplayText((prev) =>
            isDeleting
              ? prev.slice(0, -1)
              : FULL_TEXT.slice(0, prev.length + 1),
          );
        },
        isDeleting ? 80 : 120,
      );
    }
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting]);

  // Theme effect
  useEffect(() => {
    document.body.style.background = darkMode ? '#09090b' : '#f4f4f9';
    document.body.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    window.dispatchEvent(new CustomEvent('themeChange', { detail: darkMode }));
  }, [darkMode]);

  return (
    <>
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      <Navbar />
      <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      <div id="cur-dot" />
      <div id="cur-ring" />

      <div className="container">
        <Hero displayText={displayText} FULL_TEXT={FULL_TEXT} />
        <div className="shimmer" />
        <About />
        <Experience />
        <Tools />
        <div className="divider reveal">
          <div className="d-dot" />
          <div className="d-dot" />
          <div className="d-dot" />
        </div>
        <Projects filter={filter} setFilter={setFilter} />
        <Certificates />
        <GitHubStats />
        <Contact
          setShowModal={setShowModal}
          setModalMessage={setModalMessage}
          setIsSuccess={setIsSuccess}
        />
      </div>

      <Footer />
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        isSuccess={isSuccess}
        message={modalMessage}
      />
    </>
  );
}
