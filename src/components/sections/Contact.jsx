export default function Contact({
  setShowModal,
  setModalMessage,
  setIsSuccess,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    fetch(form.action, { method: 'POST', body: formData })
      .then((r) => r.json())
      .then((data) => {
        setIsSuccess(data.success);
        setModalMessage(
          data.success
            ? 'Pesan berhasil terkirim! Terima kasih, saya akan membalas segera.'
            : 'Gagal mengirim pesan. Silakan coba lagi.',
        );
        setShowModal(true);
        if (data.success) form.reset();
      })
      .catch(() => {
        setIsSuccess(false);
        setModalMessage('Terjadi kesalahan jaringan. Silakan coba lagi nanti.');
        setShowModal(true);
      });
  };

  return (
    <section id="kontak" className="kontak-section">
      <div className="reveal">
        <p className="section-tag center">Hubungi Saya</p>
        <h2 className="section-title-center d1">Mari Berkolaborasi</h2>
        <p className="kontak-sub d2">
          Isi form — pesan langsung terkirim ke email saya{' '}
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
          value="Pesan Baru dari Portfolio Sakhi Ardra"
        />
        <input type="hidden" name="to_email" value="ardrasakhi390@gmail.com" />
        <input type="hidden" name="from_name" value="Portfolio Website" />
        <input type="checkbox" name="botcheck" style={{ display: 'none' }} />
        <div className="form-group">
          <label>Nama Anda</label>
          <input
            type="text"
            name="name"
            placeholder="Masukkan nama anda"
            className="contact-input"
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="email@contoh.com"
            className="contact-input"
          />
        </div>
        <div className="form-group">
          <label>Pesan</label>
          <textarea
            name="message"
            rows="6"
            placeholder="Tulis pesanmu di sini..."
            className="contact-input"
            required
          />
        </div>
        <button type="submit" className="send-btn">
          Kirim Pesan →
        </button>
      </form>
    </section>
  );
}
