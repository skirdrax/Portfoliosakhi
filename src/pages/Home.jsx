import { useRef } from 'react';
import Hero from '../components/sections/Hero';
import Experience from '../components/sections/Experience';
import Tools from '../components/sections/Tools';
import GitHubStats from '../components/sections/GitHubStats';
import { listProyek } from '../data/projects';

// SWIPER
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

export default function Home({ FULL_TEXT }) {
  const swiperRef = useRef(null);

  // Penanganan klik instan & presisi
  const handleSwiperTap = (swiper, e) => {
    // Abaikan jika user menekan link 'View Details'
    if (e.target.closest('.showcase-detail-btn-3d')) return;

    // Jika mengklik kartu samping langsung (bukan slide aktif), fokuskan ke slide tersebut
    if (
      swiper.clickedIndex !== undefined &&
      swiper.clickedIndex !== swiper.activeIndex
    ) {
      if (swiper.clickedIndex > swiper.activeIndex) {
        swiper.slideNext();
      } else {
        swiper.slidePrev();
      }
      return;
    }

    // Jika mengklik area slide tengah, bagi navigasi kiri/kanan berdasarkan posisi kursor
    const container = swiper.el;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const midPoint = rect.width / 2;

    if (clickX > midPoint) {
      swiper.slideNext();
    } else {
      swiper.slidePrev();
    }
  };

  return (
    <>
      <Hero FULL_TEXT={FULL_TEXT} />
      <div className="shimmer" />
      <Experience />
      <Tools />

      <div className="divider reveal">
        <div className="d-dot" />
        <div className="d-dot" />
        <div className="d-dot" />
      </div>

      <div className="project-showcase-section">
        <div className="project-showcase-header">
          <p className="section-tag reveal">Project Showcase</p>
          <h2 className="section-title reveal d1">Featured Projects</h2>
          <p className="showcase-hint">
            ← Click left / right side to explore →
          </p>
        </div>

        <Swiper
          modules={[Pagination, Autoplay, EffectCoverflow]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          slideToClickedSlide={false} // Dikontrol lewat onTap agar tidak bentrok dengan loop
          touchEventsTarget="container"
          preventClicks={false}
          preventClicksPropagation={false}
          touchStartPreventDefault={false}
          threshold={6}
          coverflowEffect={{
            rotate: 12,
            stretch: 0,
            depth: 140,
            modifier: 1.1,
            slideShadows: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          speed={550}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onTap={handleSwiperTap}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 1.8 },
            1024: { slidesPerView: 2.6 },
          }}
          className="showcase-swiper-3d">
          {listProyek.map((project) => (
            <SwiperSlide key={project.id}>
              <div
                className="showcase-card-3d"
                style={{
                  position: 'relative',
                  width: '100%',
                  cursor: 'pointer',
                  userSelect: 'none',
                  overflow: 'hidden',
                }}>
                <div className="showcase-card-image-3d">
                  <img
                    src={project.gambar}
                    alt={project.nama}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <div className="showcase-card-overlay">
                    <span className="showcase-kategori-3d">
                      {project.kategori}
                    </span>
                    <h3>{project.nama}</h3>
                    <p>{project.desk}</p>
                    <a
                      href="/projects"
                      className="showcase-detail-btn-3d"
                      onClick={(e) => e.stopPropagation()}
                      style={{ position: 'relative', zIndex: 10 }}>
                      View Details →
                    </a>
                  </div>
                </div>

                {/* Indikator Tombol Arah Panah */}
                <div
                  className="showcase-click-left"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '12px',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                    userSelect: 'none',
                    zIndex: 5,
                  }}>
                  ‹
                </div>
                <div
                  className="showcase-click-right"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    right: '12px',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                    userSelect: 'none',
                    zIndex: 5,
                  }}>
                  ›
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="showcase-all-link">
          <a href="/projects" className="showcase-btn">
            Explore All Projects →
          </a>
        </div>
      </div>

      <GitHubStats />
    </>
  );
}
