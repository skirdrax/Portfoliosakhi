import ContactSection from '../components/sections/Contact';

export default function Contact({
  setShowModal,
  setModalMessage,
  setIsSuccess,
}) {
  return (
    <ContactSection
      setShowModal={setShowModal}
      setModalMessage={setModalMessage}
      setIsSuccess={setIsSuccess}
    />
  );
}
