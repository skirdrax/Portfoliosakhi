import { Analytics } from '@vercel/analytics/react';
import { useState, useEffect } from 'react';
import './styles/main.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
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
import ChatBotCohere from './components/ChatBotCohere';

const FULL_TEXT = 'Sakhi Ardra';

export default function App() {
  const [filter, setFilter] = useState('Semua');
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showChat, setShowChat] = useState(false);

  useScrollReveal(filter);
  useCursor();

  // Typing effect
  useEffect(() => {
    let timeout;

    if (!isDeleting && text === FULL_TEXT) {
      // pause at full text, then start deleting
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && text === '') {
      // finished deleting, start typing again
      setIsDeleting(false);
    } else {
      timeout = setTimeout(
        () => {
          setText((prev) =>
            isDeleting
              ? prev.slice(0, -1)
              : FULL_TEXT.slice(0, prev.length + 1),
          );
        },
        isDeleting ? 80 : 120,
      );
    }

    return () => clearTimeout(timeout);
  }, [isDeleting, text]);

  // Always light mode - NAVBAR TETAP TERANG
  useEffect(() => {
    document.body.style.background = '#f0f4ff';
    document.body.setAttribute('data-theme', 'light');
    window.dispatchEvent(new CustomEvent('themeChange', { detail: false }));
  }, []);

  return (
    <>
      {/* Vercel Analytics */}
      <Analytics />

      {/* Loading Screen */}
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}

      {/* Navbar */}
      <Navbar />

      {/* Custom Cursor */}
      <div id="cur-dot" />
      <div id="cur-ring" />

      {/* Main Content */}
      <div className="container">
        <Hero FULL_TEXT={FULL_TEXT} />
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

      {/* Footer & Modal */}
      <Footer />
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        isSuccess={isSuccess}
        message={modalMessage}
      />

      {/* ============================================
          TOMBOL CHAT & CHATBOT
          ============================================ */}

      {/* Tombol Chat */}
      <button
        className="chat-toggle"
        onClick={() => setShowChat(!showChat)}
        aria-label="Buka chat">
        💬
      </button>

      {/* Chatbot */}
      {showChat && <ChatBotCohere onClose={() => setShowChat(false)} />}
    </>
  );
}
