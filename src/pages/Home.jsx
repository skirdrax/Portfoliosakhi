import { useRef } from 'react';
import { Link } from 'react-router-dom'; // ← TAMBAHKAN
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

  const handleCardClick = (e) => {
    if (e.target.closest('.showcase-detail-btn-3d')) return;

    const swiper = swiperRef.current;
    if (!swiper) return;

    const card = e.currentTarget;
    const slide = card.closest('.swiper-slide');
    const isCenterActive = slide?.classList.contains('swiper-slide-active');

    if (!isCenterActive) return;

    const rect = card.getBoundingClientRect();
    const clickX = e.clientX - rect.left;

    if (clickX > rect.width / 2) {
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
          <p className="showcase-hint">← Click left / right side of card →</p>
        </div>

        <Swiper
          modules={[Pagination, Autoplay, EffectCoverflow]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          slideToClickedSlide={true}
          preventClicks={false}
          preventClicksPropagation={false}
          touchStartPreventDefault={false}
          threshold={8}
          coverflowEffect={{
            rotate: 20,
            stretch: 0,
            depth: 100,
            modifier: 1.2,
            slideShadows: false,
          }}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          speed={500}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 2.5 },
          }}
          className="showcase-swiper-3d">
          {listProyek.map((project) => (
            <SwiperSlide key={project.id}>
              <div
                className="showcase-card-3d"
                onClick={handleCardClick}
                style={{
                  position: 'relative',
                  width: '100%',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}>
                <div className="showcase-card-image-3d">
                  <img src={project.gambar} alt={project.nama} />
                  <div className="showcase-card-overlay">
                    <span className="showcase-kategori-3d">
                      {project.kategori}
                    </span>
                    <h3>{project.nama}</h3>
                    <p>{project.desk}</p>
                    {/* ✅ PAKE LINK BUKAN a */}
                    <Link
                      to="/projects"
                      className="showcase-detail-btn-3d"
                      onClick={(e) => e.stopPropagation()}>
                      View Details →
                    </Link>
                  </div>
                </div>

                <div
                  className="showcase-click-left"
                  style={{ pointerEvents: 'none' }}>
                  ‹
                </div>
                <div
                  className="showcase-click-right"
                  style={{ pointerEvents: 'none' }}>
                  ›
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="showcase-all-link">
          {/* ✅ PAKE LINK BUKAN a */}
          <Link to="/projects" className="showcase-btn">
            Explore All Projects →
          </Link>
        </div>
      </div>

      <GitHubStats />
    </>
  );
}
