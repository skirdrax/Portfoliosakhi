import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { certificates } from '../../data/certificates';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Certificates() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className="certificates-section">
      <div className="certificates-header">
        <p className="section-tag reveal">Sertifikat</p>
        <h2 className="section-title reveal d1">Penghargaan & Sertifikasi</h2>
        <p className="certificates-sub reveal d2">
          Bukti kompetensi dan pengembangan diri melalui berbagai sertifikasi
          profesional.
        </p>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="certificates-swiper">
        {certificates.map((cert) => (
          <SwiperSlide key={cert.id}>
            <div
              className="certificate-card"
              onClick={() => setSelectedImage(cert.image)}>
              <div className="certificate-image">
                <img src={cert.image} alt={cert.title} />
                <div className="certificate-overlay">
                  <span>
                    🔍 Klik untuk lihat ssssss sss sss ss sss sss sss ss s s s s
                    s s s
                  </span>
                </div>
              </div>
              <div className="certificate-info">
                <h3 className="certificate-title">{cert.title}</h3>
                <p className="certificate-issuer">{cert.issuer}</p>
                <span className="certificate-date">{cert.date}</span>
              </div>
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="certificate-link"
                onClick={(e) => e.stopPropagation()}>
                Verifikasi Sertifikat →
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Modal Preview */}
      {selectedImage && (
        <div
          className="cert-modal-overlay"
          onClick={() => setSelectedImage(null)}>
          <div
            className="cert-modal-content"
            onClick={(e) => e.stopPropagation()}>
            <button
              className="cert-modal-close"
              onClick={() => setSelectedImage(null)}>
              ✕
            </button>
            <img src={selectedImage} alt="Certificate Preview" />
          </div>
        </div>
      )}
    </section>
  );
}
