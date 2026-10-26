import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import almetPortrait from "../Almet tanpa background-cutout.png";
import bemPortrait from "../BEM tanpa background.png";
import salesScreen from "../Data Penjualan Kasir.png";
import dashboardScreen from "../Dashboard Kharisma.png";
import inventoryScreen from "../Barang Admin.png";

const portraits = [
  {
    src: almetPortrait,
    alt: "Foto mengenakan almamater biru",
    label: "Almamater",
    theme: "blue",
  },
  {
    src: bemPortrait,
    alt: "Foto mengenakan seragam BEM hijau",
    label: "BEM",
    theme: "bem",
  },
];

const projects = [
  {
    number: "01",
    name: "Transaksi & Riwayat Penjualan",
    type: "Sistem Penjualan Kharisma Jaya Kurnia",
    description:
      "Mencatat dan menampilkan transaksi penjualan, termasuk petugas, metode pembayaran, status pembayaran, serta akses ke detail dan nota.",
    tags: ["Laravel", "Manajemen Transaksi"],
    image: salesScreen,
    imageAlt: "Tampilan data penjualan kasir Sistem Penjualan Kharisma Jaya Kurnia",
  },
  {
    number: "02",
    name: "Ringkasan Penjualan",
    type: "Sistem Penjualan Kharisma Jaya Kurnia",
    description:
      "Dashboard untuk memantau ringkasan barang, penjualan, transaksi, dan invoice belum lunas, dilengkapi grafik penjualan.",
    tags: ["Laravel", "Dashboard"],
    image: dashboardScreen,
    imageAlt: "Tampilan dashboard Sistem Penjualan Kharisma Jaya Kurnia",
  },
  {
    number: "03",
    name: "Manajemen Barang & Stok",
    type: "Sistem Penjualan Kharisma Jaya Kurnia",
    description:
      "Mengelola data barang, kategori, harga, satuan, dan status ketersediaan agar informasi inventaris toko lebih mudah dipantau.",
    tags: ["Laravel", "Manajemen Stok"],
    image: inventoryScreen,
    imageAlt: "Tampilan manajemen barang Sistem Penjualan Kharisma Jaya Kurnia",
  },
];

const skills = [
  {
    name: "React",
    mark: "⚛",
    level: 45,
  },
  {
    name: "JavaScript",
    mark: "JS",
    level: 49,
  },
  {
    name: "HTML & CSS",
    mark: "</>",
    level: 55,
  },
  {
    name: "Networking",
    mark: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M3.5 9.5a13 13 0 0 1 17 0M6.5 12.5a8.5 8.5 0 0 1 11 0M9.5 15.5a4 4 0 0 1 5 0" />
        <circle cx="12" cy="19" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
    level: 40,
  },
  {
    name: "Laravel",
    mark: "L",
    level: 58,
  },
];

function ArrowIcon({ diagonal = false }) {
  return (
    <svg
      aria-hidden="true"
      className={diagonal ? "arrow-icon arrow-icon--diagonal" : "arrow-icon"}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path d="M4.5 10h10.75M10 4.75 15.25 10 10 15.25" />
    </svg>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [portraitIndex, setPortraitIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const revealContainerRef = useRef(null);
  const imageOpenerRef = useRef(null);
  const scrollFrameRef = useRef(0);
  const currentPortrait = portraits[portraitIndex];

  useEffect(() => {
    if (!selectedProject) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
      imageOpenerRef.current?.focus();
    };
  }, [selectedProject]);

  useEffect(() => {
    const revealElements = revealContainerRef.current?.querySelectorAll("[data-reveal]");
    if (!revealElements?.length) return undefined;

    let frame = 0;
    const skillFrames = new Map();
    const resetSkillProgress = (element) => {
      const skillFrame = skillFrames.get(element);
      if (skillFrame) cancelAnimationFrame(skillFrame);
      skillFrames.delete(element);

      const percentage = element.querySelector(".skill-item__percentage");
      const meter = element.querySelector('[role="meter"]');
      const fill = element.querySelector(".skill-item__progress-fill");
      if (percentage) percentage.textContent = "0%";
      if (fill) fill.style.width = "0%";
      if (meter) {
        meter.setAttribute("aria-valuenow", "0");
        meter.setAttribute("aria-valuetext", "0%");
      }
    };
    const animateSkillProgress = (element) => {
      const percentage = element.querySelector(".skill-item__percentage");
      const meter = element.querySelector('[role="meter"]');
      const fill = element.querySelector(".skill-item__progress-fill");
      const target = Number(element.dataset.skillLevel);
      if (!percentage || !meter || !fill || !Number.isFinite(target)) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        percentage.textContent = `${target}%`;
        fill.style.width = `${target}%`;
        meter.setAttribute("aria-valuenow", String(target));
        meter.setAttribute("aria-valuetext", `${target}%`);
        return;
      }

      const duration = 900;
      let startedAt;
      const update = (now) => {
        if (startedAt === undefined) startedAt = now;
        const progress = Math.min((now - startedAt) / duration, 1);
        const easedProgress = 1 - (1 - progress) ** 3;
        const value = Math.round(target * easedProgress);

        percentage.textContent = `${value}%`;
        fill.style.width = `${value}%`;
        meter.setAttribute("aria-valuenow", String(value));
        meter.setAttribute("aria-valuetext", `${value}%`);

        if (progress < 1) {
          skillFrames.set(element, requestAnimationFrame(update));
        } else {
          skillFrames.delete(element);
        }
      };

      skillFrames.set(element, requestAnimationFrame(update));
    };
    const revealVisibleElements = () => {
      frame = 0;
      revealElements.forEach((element) => {
        const { top, bottom } = element.getBoundingClientRect();
        const isVisible = element.classList.contains("is-visible");

        if (isVisible && (bottom <= 0 || top >= window.innerHeight)) {
          element.classList.remove("is-visible");
          if (element.matches(".skill-item")) resetSkillProgress(element);
        } else if (!isVisible && top < window.innerHeight - 40 && bottom > 0) {
          element.classList.add("is-visible");
          if (element.matches(".skill-item")) animateSkillProgress(element);
        }
      });
    };
    const scheduleReveal = () => {
      if (!frame) frame = requestAnimationFrame(revealVisibleElements);
    };

    scheduleReveal();
    window.addEventListener("scroll", scheduleReveal, { passive: true });
    window.addEventListener("resize", scheduleReveal);
    return () => {
      window.removeEventListener("scroll", scheduleReveal);
      window.removeEventListener("resize", scheduleReveal);
      cancelAnimationFrame(frame);
      skillFrames.forEach((skillFrame) => cancelAnimationFrame(skillFrame));
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const changePortrait = (direction) => {
    const nextIndex = (portraitIndex + direction + portraits.length) % portraits.length;
    const updatePortrait = () => flushSync(() => setPortraitIndex(nextIndex));

    if (document.startViewTransition) {
      document.documentElement.dataset.portraitDirection =
        direction > 0 ? "forward" : "backward";
      const transition = document.startViewTransition(updatePortrait);
      const clearDirection = () => {
        delete document.documentElement.dataset.portraitDirection;
      };
      transition.finished.then(clearDirection, clearDirection);
      return;
    }

    updatePortrait();
  };
  const scrollToTarget = (event) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const targetId = event.currentTarget.hash.slice(1);
    const target = document.getElementById(targetId);
    if (!target) return;

    event.preventDefault();
    cancelAnimationFrame(scrollFrameRef.current);

    const startY = window.scrollY;
    const targetY = window.scrollY + target.getBoundingClientRect().top;
    if (startY === targetY) return;

    const duration = 1900;
    const startedAt = performance.now();
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";

    const animate = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = progress < 0.5
        ? 4 * progress ** 3
        : 1 - ((-2 * progress + 2) ** 3) / 2;

      window.scrollTo(0, Math.round(startY + (targetY - startY) * eased));

      if (progress < 1) {
        scrollFrameRef.current = requestAnimationFrame(animate);
      } else {
        root.style.scrollBehavior = previousScrollBehavior;
        scrollFrameRef.current = 0;
      }
    };

    scrollFrameRef.current = requestAnimationFrame(animate);
  };

  return (
    <div ref={revealContainerRef} className={`portfolio portfolio--${currentPortrait.theme}`}>
      <header className="site-header">
        <a className="wordmark" href="#home" onClick={closeMenu} aria-label="Kembali ke beranda">
          <span className="wordmark__mark">G</span>
          <span>Galang Surya N.B.K</span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>
        <nav className={menuOpen ? "nav nav--open" : "nav"} aria-label="Navigasi utama">
          <a href="#about" onClick={(event) => { closeMenu(); scrollToTarget(event); }}>Tentang</a>
          <a href="#projects" onClick={(event) => { closeMenu(); scrollToTarget(event); }}>Proyek</a>
          <a href="#skills" onClick={(event) => { closeMenu(); scrollToTarget(event); }}>Keahlian</a>
          <a className="nav__contact" href="#contact" onClick={(event) => { closeMenu(); scrollToTarget(event); }}>
            Hubungi saya <ArrowIcon diagonal />
          </a>
        </nav>
      </header>

      <main>
        <section className="hero page-width" id="home">
          <div className="hero__copy">
            <p className="eyebrow"><span className="status-dot" /> TERBUKA UNTUK KOLABORASI</p>
            <h1>
              Halo, saya
              <br />
              <span className="accent-text">Galang Surya Nata Budi Kesumah.</span>
            </h1>
            <p className="hero__intro">
              Mahasiswa Teknik Informatika di STITEK Bontang yang berfokus pada web
              development dan desain antarmuka. Terbiasa menggabungkan pengalaman
              praktis di lapangan dengan ilmu akademis untuk merancang serta membangun
              aplikasi web yang responsif, interaktif, modern, dan memberikan
              pengalaman pengguna yang optimal.
            </p>
            <div className="hero__specialties" aria-label="Fokus keahlian">
              <span>Frontend Development</span>
              <span>UI Design</span>
              <span>React</span>
            </div>
            <div className="hero__actions">
              <a className="button button--dark" href="#projects" onClick={scrollToTarget}>
                Lihat karya saya <ArrowIcon />
              </a>
              <a className="text-link" href="#about" onClick={scrollToTarget}>Kenali saya <span>↓</span></a>
            </div>
          </div>
          <div className="hero-art">
            <img
              key={currentPortrait.src}
              className="hero-art__portrait"
              src={currentPortrait.src}
              alt={currentPortrait.alt}
            />
            <button
              className="portrait-switch portrait-switch--previous"
              type="button"
              aria-label={`Foto sebelumnya: ${portraits[(portraitIndex + portraits.length - 1) % portraits.length].label}`}
              onClick={() => changePortrait(-1)}
            >
              <span className="portrait-switch__triangle portrait-switch__triangle--left" />
            </button>
            <button
              className="portrait-switch portrait-switch--next"
              type="button"
              aria-label={`Foto berikutnya: ${portraits[(portraitIndex + 1) % portraits.length].label}`}
              onClick={() => changePortrait(1)}
            >
              <span className="portrait-switch__triangle portrait-switch__triangle--right" />
            </button>
          </div>
          <a className="scroll-note" href="#about" onClick={scrollToTarget}><span /> GULIR UNTUK MENJELAJAH</a>
        </section>

        <div className="motion-band" aria-label="Mengubah ide menjadi pengalaman digital" data-reveal>
          <div className="motion-band__group">
            <span>IDE MENJADI ANTARMUKA</span><i aria-hidden="true">✳</i>
            <span>DESAIN DENGAN TUJUAN</span><i aria-hidden="true">✳</i>
            <span>TERUS BERTUMBUH</span>
          </div>
        </div>

        <section className="about section page-width" id="about">
          <div className="section-label" data-reveal>
            <span className="section-label__number">01 /</span>
            <span>TENTANG SAYA</span>
          </div>
          <div className="about__content">
            <div className="about__intro">
              <h2 data-reveal style={{ "--reveal-delay": "100ms" }}>
                Disiplin membagi waktu antara <em>dunia kerja dan akademis.</em>
              </h2>
              <section className="education-card" aria-labelledby="education-title" data-reveal style={{ "--reveal-delay": "180ms" }}>
                <div className="education-card__heading">
                  <span className="section-label__number">RIWAYAT PENDIDIKAN</span>
                  <h3 id="education-title">Perjalanan akademik</h3>
                </div>
                <ol className="education-list">
                  <li className="education-item">
                    <span className="education-item__period">2024 – Sekarang</span>
                    <div>
                      <h4>Sekolah Tinggi Teknologi Bontang</h4>
                      <p>S1 Teknik Informatika <span>· Mahasiswa aktif</span></p>
                    </div>
                  </li>
                  <li className="education-item">
                    <span className="education-item__period">2021 – 2024</span>
                    <div>
                      <h4>SMK Panca Bhakti Banjarnegara</h4>
                      <p>Banjarnegara, Jawa Tengah</p>
                    </div>
                  </li>
                  <li className="education-item">
                    <span className="education-item__period">2018 – 2021</span>
                    <div>
                      <h4>SMP Negeri 2 Wanadadi</h4>
                      <p>Banjarnegara, Jawa Tengah</p>
                    </div>
                  </li>
                  <li className="education-item">
                    <span className="education-item__period">2012 – 2018</span>
                    <div>
                      <h4>SD Negeri 2 Banjarmangu</h4>
                      <p>Banjarnegara, Jawa Tengah</p>
                    </div>
                  </li>
                </ol>
              </section>
            </div>
            <div className="about__details">
              <p data-reveal style={{ "--reveal-delay": "180ms" }}>
                Menjalani rutinitas bekerja profesional di pagi hingga sore hari,
                lalu melanjutkan studi Teknik Informatika di sore hingga malam hari
                telah membentuk etos kerja, ketahanan, dan manajemen waktu yang sangat
                teruji. Pengalaman praktis di lapangan kerja dan teori yang saya
                dapatkan di bangku kuliah saling melengkapi, memungkinkan saya
                memecahkan masalah teknis web development secara lebih efisien dan
                realistis.
              </p>
              <p data-reveal style={{ "--reveal-delay": "280ms" }}>
                Perjalanan akademik saya berakar dari Banjarnegara, Jawa Tengah—mulai
                dari menyelesaikan pendidikan dasar di SD Negeri 2 Banjarmangu,
                melanjutkannya ke SMP Negeri 2 Wanadadi, hingga menempuh keahlian
                kejuruan di SMK Panca Bhakti Banjarnegara. Saat ini, saya merantau dan
                mendedikasikan diri untuk merampungkan studi tingkat lanjut di Sekolah
                Tinggi Teknologi Bontang.
              </p>
              <a className="text-link text-link--underlined" href="#contact" onClick={scrollToTarget} data-reveal style={{ "--reveal-delay": "380ms" }}>
                Diskusi Proyek <ArrowIcon diagonal />
              </a>
              <div className="about-runner" aria-hidden="true">
                <span className="about-runner__label">KEEP MOVING</span>
                <svg className="about-runner__dino" viewBox="0 0 64 64">
                  <path d="M42 8h8v8h6v8h4v20H42v-8h-8v-8h-8v16h-8V28h8v-8h8v-8h8V8Zm-8 12v8h8v-8h-8Z" />
                  <path className="about-runner__leg about-runner__leg--one" d="M42 44h8v8h6v8H40v-8h2v-8Z" />
                  <path className="about-runner__leg about-runner__leg--two" d="M26 44h8v8h-2v8H16v-8h10v-8Z" />
                  <path d="M48 18h3v3h-3z" fill="var(--paper)" />
                </svg>
                <svg className="about-runner__bird about-runner__bird--one" viewBox="0 0 48 24">
                  <path d="M2 15c6-1 9-5 13-11 4 2 7 6 9 10 4-2 9-3 15-2l7 3-7 3c-8 1-14-1-19-5-4 4-9 6-18 5l-2-3Z" />
                </svg>
                <svg className="about-runner__bird about-runner__bird--two" viewBox="0 0 48 24">
                  <path d="M2 15c6-1 9-5 13-11 4 2 7 6 9 10 4-2 9-3 15-2l7 3-7 3c-8 1-14-1-19-5-4 4-9 6-18 5l-2-3Z" />
                </svg>
                <span className="about-runner__ground" />
              </div>
            </div>
          </div>
          <div className="about__facts">
            <div data-reveal><span>BERBASIS DI</span><strong>Bontang, Kalimantan Timur, Indonesia</strong></div>
            <div data-reveal style={{ "--reveal-delay": "100ms" }}><span>FOKUS SAAT INI</span><strong>Work &amp; Tech Education</strong></div>
            <div data-reveal style={{ "--reveal-delay": "200ms" }}><span>STATUS</span><strong><i className="status-dot" /> Selalu Siap Beradaptasi</strong></div>
          </div>
        </section>

        <section className="projects section page-width" id="projects">
          <div className="section-heading">
            <div className="section-label" data-reveal>
              <span className="section-label__number">02 /</span>
              <span>PROYEK PILIHAN</span>
            </div>
            <p data-reveal style={{ "--reveal-delay": "100ms" }}>Tiga tampilan dari proyek Sistem Penjualan Kharisma Jaya Kurnia.</p>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <article
                className="project-card"
                key={project.number}
                data-reveal
                style={{ "--reveal-delay": `${(Number(project.number) - 1) * 120}ms` }}
              >
                <div className="project-visual">
                  <button
                    className="project-visual__button"
                    type="button"
                    aria-label={`Perbesar foto: ${project.name}`}
                    onClick={(event) => {
                      imageOpenerRef.current = event.currentTarget;
                      setSelectedProject(project);
                    }}
                  >
                    <img className="project-visual__image" src={project.image} alt={project.imageAlt} />
                  </button>
                </div>
                <div className="project-card__meta">
                  <span>{project.type}</span>
                  <ArrowIcon diagonal />
                </div>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <div className="tag-list">
                  {project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
                </div>
              </article>
            ))}
          </div>
          <p className="projects__description" data-reveal style={{ "--reveal-delay": "100ms" }}>
            Sistem Penjualan Kharisma Jaya Kurnia dikembangkan untuk membantu operasional toko dalam satu aplikasi, mulai dari pengelolaan barang dan stok hingga pencatatan serta pemantauan transaksi penjualan. Sistem memiliki dua peran dengan hak akses berbeda: <strong>admin</strong> mengelola data barang, restok, pengaturan akun, dan backup database; sedangkan <strong>kasir</strong> berfokus pada proses penjualan dan hanya dapat mengakses fitur sesuai tugasnya. Pembagian akses ini membantu menjaga pengelolaan sistem tetap teratur sesuai tanggung jawab setiap pengguna.
          </p>
          <p className="projects__note" data-reveal>
            <span>✳</span> Ketiga kartu ini merupakan bagian dari satu proyek sistem penjualan.
          </p>
        </section>

        <section className="skills section page-width" id="skills">
          <div className="section-label" data-reveal>
            <span className="section-label__number">03 /</span>
            <span>HAL YANG SAYA GUNAKAN</span>
          </div>
          <div className="skills__content">
            <div className="skills__intro">
              <h2 data-reveal style={{ "--reveal-delay": "100ms" }}>Eksplorasi stack teknologi dalam perjalanan studi saya</h2>
              <div
                className="skills__name-stage"
                onPointerMove={(event) => {
                  const bounds = event.currentTarget.getBoundingClientRect();
                  const position = Math.min(
                    Math.max((event.clientX - bounds.left) / bounds.width, 0),
                    1,
                  );
                  event.currentTarget.style.setProperty(
                    "--shine-position",
                    `${75 - position * 50}%`,
                  );
                }}
              >
                <span className="skills__name">GALANG</span>
              </div>
            </div>
            <div className="skills__list">
              {skills.map((skill, index) => (
                <div
                  className="skill-item"
                  key={skill.name}
                  data-reveal
                  data-skill-level={skill.level}
                  style={{ "--reveal-delay": `${index * 80}ms` }}
                >
                  <span className="skill-item__number">0{index + 1}</span>
                  <span className={`skill-item__mark skill-item__mark--${skill.name.split(/[ .]/)[0].toLowerCase()}`} aria-hidden="true">
                    {skill.mark}
                  </span>
                  <span className="skill-item__copy">
                    <strong>{skill.name}</strong>
                    <span className="skill-item__progress-row">
                      <span className="skill-item__percentage">0%</span>
                      <span
                        className="skill-item__progress"
                        role="meter"
                        aria-label={`${skill.name} progress`}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        aria-valuenow="0"
                        aria-valuetext="0%"
                      >
                        <span
                          className="skill-item__progress-fill"
                          style={{ "--skill-level": `${skill.level}%` }}
                        />
                      </span>
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="contact section page-width" id="contact">
          <div className="section-label" data-reveal>
            <span className="section-label__number">04 /</span>
            <span>MARI TERHUBUNG</span>
          </div>
          <div className="contact__content">
            <h2 data-reveal style={{ "--reveal-delay": "100ms" }}>Mari terhubung dan berbagi ide.</h2>
            <p className="contact__intro" data-reveal style={{ "--reveal-delay": "200ms" }}>
              Tertarik berkolaborasi, ingin diskusi seputar proyek, atau sekadar
              menyapa dan melihat aktivitas saya sehari-hari? Kamu bisa menemukan
              saya di beberapa platform di bawah ini.
            </p>
            <div className="contact__platforms" aria-label="Platform sosial">
              <a className="contact__platform" href="https://www.instagram.com/galangsuryanatabudi" target="_blank" rel="noreferrer" aria-label="Instagram (buka tab baru)" data-reveal style={{ "--reveal-delay": "300ms" }}>
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle className="contact__platform-dot" cx="17.5" cy="6.5" r="1" />
                </svg>
              </a>
              <a className="contact__platform" href="https://www.tiktok.com/@basurr_55" target="_blank" rel="noreferrer" aria-label="TikTok (buka tab baru)" data-reveal style={{ "--reveal-delay": "380ms" }}>
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                  <path d="M14 4v10.2a4.3 4.3 0 1 1-3.2-4.16M14 4c.45 2.6 2.3 4.4 5 4.7" />
                </svg>
              </a>
              <a className="contact__platform" href="https://github.com/galangsuryanatabud-collab" target="_blank" rel="noreferrer" aria-label="GitHub (buka tab baru)" data-reveal style={{ "--reveal-delay": "460ms" }}>
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.5a9.5 9.5 0 0 0-3 18.51c.48.09.65-.21.65-.46v-1.67c-2.65.58-3.21-1.13-3.21-1.13-.44-1.1-1.06-1.39-1.06-1.39-.87-.6.07-.59.07-.59.96.07 1.47.99 1.47.99.86 1.47 2.25 1.05 2.8.8.09-.62.34-1.05.61-1.29-2.12-.24-4.35-1.06-4.35-4.72 0-1.04.37-1.9.98-2.57-.1-.24-.43-1.22.09-2.54 0 0 .8-.26 2.61.98a9.07 9.07 0 0 1 4.75 0c1.81-1.24 2.6-.98 2.6-.98.52 1.32.2 2.3.1 2.54.61.67.97 1.53.97 2.57 0 3.67-2.23 4.48-4.36 4.72.35.3.65.88.65 1.77v2.51c0 .25.17.55.66.46A9.5 9.5 0 0 0 12 2.5Z" />
                </svg>
              </a>
              <a className="contact__platform" href="https://linkedin.com/in/galang-surya-599056447/" target="_blank" rel="noreferrer" aria-label="LinkedIn (buka tab baru)" data-reveal style={{ "--reveal-delay": "540ms" }}>
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5.2 3.5a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6ZM3.7 8.5h3v11h-3v-11Zm5 0h2.9V10h.04c.4-.76 1.4-1.85 3.33-1.85 3.56 0 4.22 2.34 4.22 5.38v5.97h-3v-5.29c0-1.26-.02-2.88-1.76-2.88-1.76 0-2.03 1.37-2.03 2.79v5.38h-3v-11Z" />
                </svg>
              </a>
              <a className="contact__platform" href="mailto:galangsuryanatabudi@gmail.com" aria-label="Email ke Gmail: galangsuryanatabudi@gmail.com" data-reveal style={{ "--reveal-delay": "620ms" }}>
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m4 7 8 6 8-6" />
                </svg>
              </a>
            </div>
          </div>
          <span className="contact__decoration" aria-hidden="true">✳</span>
        </section>
      </main>

      <footer className="footer page-width">
        <a className="wordmark" href="#home" data-reveal>
          <span className="wordmark__mark">G</span>
          <span>Galang Surya N.B.K</span>
        </a>
        <p data-reveal style={{ "--reveal-delay": "100ms" }}>Dibuat dengan rasa ingin tahu dan React.</p>
        <a className="footer__top" href="#home" onClick={scrollToTarget} data-reveal style={{ "--reveal-delay": "200ms" }}>KEMBALI KE ATAS ↑</a>
        <span className="footer__copyright">© {new Date().getFullYear()} Nama Anda</span>
      </footer>

      {selectedProject && (
        <div
          className="project-lightbox"
          onClick={() => setSelectedProject(null)}
        >
          <section
            className="project-lightbox__dialog"
            role="dialog"
            aria-modal="true"
            aria-label={selectedProject.name}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="project-lightbox__close"
              type="button"
              aria-label="Tutup foto"
              autoFocus
              onClick={() => setSelectedProject(null)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <img src={selectedProject.image} alt={selectedProject.imageAlt} />
            <p>{selectedProject.name}</p>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
