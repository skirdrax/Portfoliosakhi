import { useState } from 'react';

export default function Contact({
  setShowModal,
  setModalMessage,
  setIsSuccess,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prevent double click
    if (isLoading) return;

    setIsLoading(true);
    const form = e.target;
    const formData = new FormData(form);

    fetch(form.action, { method: 'POST', body: formData })
      .then((r) => r.json())
      .then((data) => {
        setIsSuccess(data.success);
        setModalMessage(
          data.success
            ? '✅ Message sent successfully! Thank you, I will reply soon.'
            : '❌ Failed to send message. Please try again.. maybe wrong word or gmail.',
        );
        setShowModal(true);
        if (data.success) form.reset();
      })
      .catch(() => {
        setIsSuccess(false);
        setModalMessage('❌ Network error occurred. Please try again later.');
        setShowModal(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <section id="kontak" className="kontak-section">
      <div className="reveal">
        <p className="section-tag center">Contact Me</p>
        <h2 className="section-title-center d1">Let's Collaborate</h2>
        <p className="kontak-sub d2">
          Fill the form — messages are sent directly to my email{' '}
          <span style={{ color: '#3b82f6' }}>ardrasakhi390@gmail.com</span>
        </p>
      </div>
      <form
        action="https://api.web3forms.com/submit"
        method="POST"
        className="contact-form reveal d2"
        onSubmit={handleSubmit}>
        <input
          type="hidden"
          name="access_key"
          value="e837d397-cc77-4bde-bf95-77579f2b0d35"
        />
        <input
          type="hidden"
          name="subject"
          value="New Message from Sakhi Ardra's Portfolio"
        />
        <input type="hidden" name="to_email" value="ardrasakhi390@gmail.com" />
        <input type="hidden" name="from_name" value="Portfolio Website" />
        <input type="checkbox" name="botcheck" style={{ display: 'none' }} />

        <div className="form-group">
          <label>Your Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            className="contact-input"
            required
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="email@example.com"
            className="contact-input"
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label>Message</label>
          <textarea
            name="message"
            rows="6"
            placeholder="Write your message here..."
            className="contact-input"
            required
            disabled={isLoading}
          />
        </div>

        <button type="submit" className="send-btn" disabled={isLoading}>
          {isLoading ? (
            <>
              <span className="loading-spinner-small"></span>
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </button>
      </form>
    </section>
  );
}
