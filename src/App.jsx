import { useEffect } from 'react';
import DataImage from '../data';
import { listTools, listProyek } from '../data';

// Simple intersection observer hook for scroll animations
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' },
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function App() {
  useScrollReveal();

  return (
    <>
      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.6s cubic-bezier(.4,0,.2,1), transform 0.6s cubic-bezier(.4,0,.2,1);
        }
        .reveal.revealed { opacity: 1; transform: translateY(0); }
        .reveal-delay-1 { transition-delay: 0.1s; }
        .reveal-delay-2 { transition-delay: 0.2s; }
        .reveal-delay-3 { transition-delay: 0.3s; }
        .reveal-delay-4 { transition-delay: 0.4s; }

        .hero-badge {
          border: 1px solid rgba(139,92,246,0.3);
          background: rgba(139,92,246,0.08);
          backdrop-filter: blur(8px);
        }
        .tag-chip {
          font-size: 11px;
          letter-spacing: 0.04em;
          background: rgba(139,92,246,0.12);
          color: #a78bfa;
          border: 1px solid rgba(139,92,246,0.25);
          padding: 3px 10px;
          border-radius: 999px;
          font-weight: 600;
        }
        .btn-primary {
          background: #7c3aed;
          color: #fff;
          padding: 12px 24px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 14px;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          display: inline-block;
          letter-spacing: 0.01em;
        }
        .btn-primary:hover {
          background: #6d28d9;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(109,40,217,0.35);
        }
        .btn-secondary {
          background: transparent;
          color: #d4d4d8;
          padding: 12px 24px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 14px;
          border: 1px solid rgba(255,255,255,0.12);
          transition: background 0.2s, transform 0.15s, border-color 0.2s;
          display: inline-block;
        }
        .btn-secondary:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.22);
          transform: translateY(-2px);
        }
        .section-label {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #7c3aed;
          margin-bottom: 10px;
        }
        .card-glass {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          transition: border-color 0.25s, background 0.25s, transform 0.25s;
        }
        .card-glass:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(139,92,246,0.35);
          transform: translateY(-3px);
        }
        .tool-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          padding: 14px;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: all 0.22s cubic-bezier(.4,0,.2,1);
          cursor: default;
        }
        .tool-card:hover {
          background: rgba(139,92,246,0.08);
          border-color: rgba(139,92,246,0.3);
          transform: translateY(-2px);
        }
        .tool-img {
          width: 40px;
          height: 40px;
          object-fit: contain;
          background: rgba(255,255,255,0.05);
          border-radius: 8px;
          padding: 6px;
          flex-shrink: 0;
        }
        .proyek-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.28s cubic-bezier(.4,0,.2,1);
        }
        .proyek-card:hover {
          border-color: rgba(139,92,246,0.35);
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }
        .proyek-card img {
          width: 100%;
          height: 180px;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .proyek-card:hover img { transform: scale(1.04); }
        .proyek-img-wrap { overflow: hidden; }
        .edu-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          transition: all 0.25s;
          background: rgba(255,255,255,0.02);
          text-decoration: none;
          color: inherit;
        }
        .edu-card:hover {
          border-color: rgba(139,92,246,0.35);
          background: rgba(139,92,246,0.06);
          transform: translateY(-2px);
        }
        .edu-logo {
          width: 56px;
          height: 56px;
          background: #fff;
          border-radius: 10px;
          padding: 8px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .divider {
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin: 80px 0;
        }
        .stat-num {
          font-size: 36px;
          font-weight: 700;
          color: #fff;
          line-height: 1;
        }
        .stat-num span { color: #7c3aed; }
        .contact-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 12px 14px;
          color: #fff;
          font-size: 14px;
          transition: border-color 0.2s, background 0.2s;
          outline: none;
          font-family: inherit;
        }
        .contact-input:focus {
          border-color: rgba(139,92,246,0.6);
          background: rgba(139,92,246,0.06);
        }
        .contact-input::placeholder { color: rgba(255,255,255,0.25); }
        .hero-img {
          border-radius: 24px;
          box-shadow: 0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06);
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="hero grid md:grid-cols-2 items-center gap-12 pt-20 pb-4">
        <div>
          <div className="hero-badge flex items-center gap-3 w-fit px-4 py-2.5 rounded-2xl mb-7 reveal">
            <img
              src={DataImage.HeroImage}
              alt=""
              className="w-7 h-7 rounded-md object-cover"
            />
            <span className="text-sm text-zinc-300 italic">
              "Kode yang indah, lahir dari ketekunan 😁"
            </span>
          </div>
          <h1 className="text-5xl font-bold leading-tight mb-5 reveal reveal-delay-1">
            Hai, Saya
            <br />
            <span style={{ color: '#a78bfa' }}>Sakhi Ardra</span>
          </h1>
          <p className="text-zinc-400 text-base leading-relaxed mb-8 max-w-lg reveal reveal-delay-2">
            Mahasiswa D4 Rekayasa Perangkat Lunak dengan ketertarikan di bidang
            Web Development, UI/UX Design, dan pengembangan aplikasi digital
            yang efisien dan user-friendly.
          </p>
          <div className="flex items-center gap-4 flex-wrap reveal reveal-delay-3">
            <a
              href="https://drive.google.com/file/d/1F_1Iwh0pbo0IgktGh6WwyvgX64Z3htNK/view?usp=drive_link"
              className="btn-primary">
              Lihat CV
            </a>
            <a href="#proyek" className="btn-secondary">
              Lihat Proyek →
            </a>
          </div>
        </div>
        <div className="flex justify-center md:justify-end reveal reveal-delay-2">
          <img
            src={DataImage.HeroImage}
            alt="Sakhi Ardra"
            className="hero-img w-full max-w-sm"
          />
        </div>
      </section>

      <div className="divider" />

      {/* ── TENTANG ── */}
      <section id="tentang">
        <p className="section-label reveal">Tentang</p>
        <h2 className="text-3xl font-bold mb-8 reveal reveal-delay-1">
          Tentang Saya
        </h2>

        <div className="card-glass p-8 reveal reveal-delay-2">
          <p className="text-zinc-300 text-base leading-relaxed mb-8">
            Hi! Saya <strong className="text-white">Sakhi Ardra Handaru</strong>
            , Mahasiswa aktif D4 Rekayasa Perangkat Lunak, Teknik Informatika,
            Politeknik Negeri Indramayu. Fokus saya di Web Development, Database
            Management, UI/UX Design, SEO, Jaringan Komputer, dan Internet of
            Things (IoT). Saya terbiasa mengembangkan solusi digital yang
            efisien, user-oriented, dan berorientasi performa — siap
            berkontribusi secara profesional di industri maupun instansi
            pemerintahan.
          </p>
          <div className="flex items-center justify-between flex-wrap gap-6">
            <img
              src={DataImage.HeroImage}
              alt=""
              className="w-12 h-12 rounded-xl object-cover hidden sm:block"
            />
            <div className="flex gap-10">
              <div>
                <p className="stat-num">
                  3 <span>+</span>
                </p>
                <p className="text-zinc-400 text-sm mt-1">Proyek Selesai</p>
              </div>
              <div>
                <p className="stat-num">
                  1 <span>+</span>
                </p>
                <p className="text-zinc-400 text-sm mt-1">Tahun Pengalaman</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pendidikan */}
        <div className="mt-14">
          <p className="section-label reveal">Riwayat</p>
          <h3 className="text-2xl font-bold mb-6 reveal reveal-delay-1">
            Pendidikan
          </h3>
          <div className="flex flex-col gap-4 max-w-xl">
            <a
              href="https://polindra.ac.id/"
              className="edu-card reveal reveal-delay-2">
              <div className="edu-logo">
                <img
                  src="/assets/polindra.png"
                  alt="Polindra"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h4 className="text-white font-bold text-base mb-0.5">
                  Politeknik Negeri Indramayu
                </h4>
                <p className="text-zinc-400 text-sm">
                  Teknik Informatika · D4 Rekayasa Perangkat Lunak
                </p>
                <p className="text-zinc-500 text-xs mt-1">2024 – Sekarang</p>
              </div>
            </a>
            <a
              href="https://smait.sekolahbunayya.sch.id/"
              className="edu-card reveal reveal-delay-3">
              <div className="edu-logo">
                <img
                  src="/assets/bunayya.png"
                  alt="SMAIT Bunayya"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h4 className="text-white font-bold text-base mb-0.5">
                  SMAIT BUNAYYA
                </h4>
                <p className="text-zinc-400 text-sm">
                  Ilmu Pengetahuan Alam (IPA)
                </p>
                <p className="text-zinc-500 text-xs mt-1">2021 – 2024</p>
              </div>
            </a>
          </div>
        </div>

        {/* Tools */}
        <div className="mt-16">
          <p className="section-label reveal">Stack</p>
          <h3 className="text-2xl font-bold mb-2 reveal reveal-delay-1">
            Tools yang Dipakai
          </h3>
          <p className="text-zinc-400 text-sm mb-8 reveal reveal-delay-2">
            Teknologi dan tools yang saya gunakan dalam pengembangan web dan
            desain.
          </p>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
            {listTools.map((tool, i) => (
              <div
                key={tool.id}
                className={`tool-card reveal reveal-delay-${(i % 4) + 1}`}>
                <img src={tool.gambar} alt={tool.nama} className="tool-img" />
                <div>
                  <p className="text-white font-semibold text-sm">
                    {tool.nama}
                  </p>
                  <p className="text-zinc-500 text-xs">{tool.ket}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── PROYEK ── */}
      <section id="proyek">
        <p className="section-label reveal">Portofolio</p>
        <h2 className="text-3xl font-bold mb-2 reveal reveal-delay-1">
          Proyek
        </h2>
        <p className="text-zinc-400 text-sm mb-10 reveal reveal-delay-2">
          Beberapa proyek yang telah saya kerjakan.
        </p>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          {listProyek.map((proyek, i) => (
            <div
              key={proyek.id}
              className={`proyek-card reveal reveal-delay-${(i % 3) + 1}`}>
              <div className="proyek-img-wrap">
                <img src={proyek.gambar} alt={proyek.nama} />
              </div>
              <div className="p-5">
                <h3 className="text-white font-bold text-lg mb-2">
                  {proyek.nama}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                  {proyek.desk}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {proyek.tools.map((tool, idx) => (
                    <span className="tag-chip" key={idx}>
                      {tool}
                    </span>
                  ))}
                </div>
                <a
                  href={proyek.link || '#'}
                  onClick={(e) => !proyek.link && e.preventDefault()}
                  className={`block text-center py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    proyek.link
                      ? 'btn-primary'
                      : 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
                  }`}
                  style={
                    proyek.link ? {} : { transform: 'none', boxShadow: 'none' }
                  }>
                  {proyek.link ? 'Lihat Website / Prototipe →' : 'Coming Soon'}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* ── KONTAK ── */}
      <section id="kontak" className="pb-20">
        <p className="section-label reveal">Hubungi</p>
        <h2 className="text-3xl font-bold mb-2 reveal reveal-delay-1">
          Kontak
        </h2>
        <p className="text-zinc-400 text-sm mb-10 reveal reveal-delay-2">
          Isi form di bawah — pesan akan langsung terkirim ke email saya.
        </p>

        <form
          action="https://formsubmit.co/ardrasakhi390@gmail.com"
          method="POST"
          autoComplete="off"
          className="max-w-lg reveal reveal-delay-2">
          <div className="flex flex-col gap-5">
            <div>
              <label className="block text-zinc-300 text-sm font-semibold mb-2">
                Nama / Samaran
              </label>
              <input
                type="text"
                name="nama"
                placeholder="Masukkan nama atau samaran..."
                className="contact-input"
                required
              />
            </div>
            <div>
              <label className="block text-zinc-300 text-sm font-semibold mb-2">
                Pesan
              </label>
              <textarea
                name="pesan"
                rows="6"
                placeholder="Tulis pesanmu di sini..."
                className="contact-input"
                style={{ resize: 'vertical' }}
                required
              />
            </div>
            <button
              type="submit"
              className="btn-primary w-full text-center cursor-pointer">
              Kirim Pesan
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default App;
