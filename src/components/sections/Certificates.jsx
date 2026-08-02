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
        <p
          className="section-tag reveal"
          data-aos="fade-right"
          data-aos-delay="100">
          Certificates
        </p>

        <h2
          className="section-title reveal d1"
          data-aos="fade-left"
          data-aos-delay="200">
          Awards & Certifications
        </h2>

        <p
          className="certificates-sub reveal d2"
          data-aos="fade-up"
          data-aos-delay="300">
          Proof of competence and self-development through various professional
          certifications.
        </p>
      </div>

      <div data-aos="zoom-in" data-aos-delay="400">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 1500, disableOnInteraction: false }}
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
                    <span>🔍 Click to view</span>
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
                  Verify Certificate →
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

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
