import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './styles/main.css'; // ← TAMBAHKAN INI!
import AOS from 'aos';
import 'aos/dist/aos.css';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Modal from './components/ui/Modal';
import ChatBotCohere from './components/ChatBotCohere';

// PAGES
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

import { useScrollReveal } from './components/hooks/useScrollReveal';
import { useCursor } from './components/hooks/useCursor';

const FULL_TEXT = 'Sakhi Ardra Handaru';

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [showChat, setShowChat] = useState(false);

  useScrollReveal();
  useCursor();

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
      offset: 80,
    });
  }, []);

  useEffect(() => {
    document.body.style.background = '#f0f4ff';
    document.body.setAttribute('data-theme', 'light');
    window.dispatchEvent(new CustomEvent('themeChange', { detail: false }));
  }, []);

  return (
    <>
      <Navbar />
      <div id="cur-dot" />
      <div id="cur-ring" />

      <div className="container">
        <Routes>
          <Route path="/" element={<Home FULL_TEXT={FULL_TEXT} />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route
            path="/contact"
            element={
              <Contact
                setShowModal={setShowModal}
                setModalMessage={setModalMessage}
                setIsSuccess={setIsSuccess}
              />
            }
          />
        </Routes>
      </div>

      <Footer />

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        isSuccess={isSuccess}
        message={modalMessage}
      />

      <button
        className="chat-toggle"
        onClick={() => setShowChat(!showChat)}
        aria-label="Buka chat">
        💬
      </button>

      {showChat && <ChatBotCohere onClose={() => setShowChat(false)} />}
    </>
  );
}
