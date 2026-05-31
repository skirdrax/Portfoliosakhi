export default function Modal({ show, onClose, isSuccess, message }) {
  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className={`modal-icon ${isSuccess ? 'success' : 'error'}`}>
          {isSuccess ? '✓' : '✗'}
        </div>
        <h3 className="modal-title">{isSuccess ? 'Berhasil!' : 'Gagal!'}</h3>
        <p className="modal-message">{message}</p>
        <button className="modal-close" onClick={onClose}>
          Tutup
        </button>
      </div>
    </div>
  );
}
