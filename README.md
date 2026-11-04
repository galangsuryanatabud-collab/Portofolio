# Portofolio Galang Surya N.B.K

Website portofolio pribadi untuk memperkenalkan profil, perjalanan pendidikan,
pengalaman organisasi, proyek, keahlian, dan informasi kontak Galang Surya Nata
Budi Kesumah. Proyek dibuat sebagai aplikasi frontend menggunakan React, Vite,
dan CSS, serta dirancang agar dapat digunakan di desktop maupun perangkat mobile.

## Isi website

Halaman disusun menjadi beberapa bagian:

1. **Beranda** — perkenalan singkat, fokus keahlian, foto, dan tombol navigasi.
2. **Tentang Saya** — pendidikan, perjalanan akademik, pekerjaan, pengalaman di
   BEM STITEK Bontang, serta animasi kecil bertema “KEEP MOVING”.
3. **Proyek Pilihan** — tiga tampilan dari Sistem Penjualan Kharisma Jaya Kurnia:
   transaksi, dashboard penjualan, dan manajemen barang.
4. **Keahlian** — React, JavaScript, HTML & CSS, Networking, dan Laravel.
5. **Mari Terhubung** — tautan Instagram, TikTok, GitHub, LinkedIn, dan Email.

## Teknologi yang digunakan

- **React 19** untuk membangun antarmuka dari komponen dan mengelola state.
- **Vite 6** untuk menjalankan server pengembangan dan membuat build produksi.
- **CSS** untuk tata letak, tema warna, responsivitas, serta animasi.
- **SVG** untuk ikon dan ilustrasi dinosaurus serta burung pada animasi “KEEP
  MOVING”.

Proyek ini merupakan website frontend statis; tidak ada server API atau database
yang dijalankan oleh aplikasi portofolio ini.

## Cara menjalankan

Pastikan Node.js dan npm sudah terpasang, lalu jalankan perintah berikut di
terminal dari folder proyek:

```bash
npm install
npm run dev
```

Buka alamat lokal yang ditampilkan Vite di terminal. Untuk memeriksa versi
produksi secara lokal:

```bash
npm run build
npm run preview
```

Perintah `npm run build` membuat hasil produksi ke folder `dist/`.

## Dokumentasi Website

### Beranda

![Tampilan beranda portofolio](./Dokumentasi/Dokumentasi%201.png)

### Tentang Saya

![Bagian Tentang Saya dan pendidikan](./Dokumentasi/Dokumentasi%202.png)

### Proyek Pilihan

![Bagian proyek pilihan](./Dokumentasi/Dokumentasi%203.png)

### Keahlian

![Bagian keahlian](./Dokumentasi/Dokumentasi%204.png)

### Kontak

![Bagian kontak dan footer](./Dokumentasi/Dokumentasi%205.png)

## Penjelasan fitur dan cara kerjanya

### Foto profil dan pergantian tema

Daftar foto profil beserta label dan tema disimpan di array `portraits` pada
[`src/App.jsx`](./src/App.jsx#L9). State `portraitIndex` menentukan foto aktif.
Ketika tombol segitiga ditekan, fungsi `changePortrait` memperbarui indeks dan
memanggil **View Transitions API** jika browser mendukungnya. Arah tombol
disimpan pada atribut `data-portrait-direction`; CSS kemudian menggunakan
`clip-path` untuk menyapu tampilan baru dari arah yang sesuai. Jika browser
tidak mendukung View Transitions API, foto tetap berubah tanpa animasi sapuan.

- Logika pergantian foto: [`src/App.jsx`](./src/App.jsx#L218).
- Foto dan tombol di halaman: [`src/App.jsx`](./src/App.jsx#L325).
- Warna tema gelap/hijau untuk foto BEM: [`src/style.css`](./src/style.css#L45).
- Sapuan dan durasi transisi 1,8 detik: [`src/style.css`](./src/style.css#L391).

### Animasi saat halaman dibuka dan saat menggulir

Elemen yang memiliki atribut `data-reveal` muncul ketika masuk ke area layar.
JavaScript memeriksa posisi elemen saat halaman digulir atau ukuran jendela
berubah, lalu menambahkan class `is-visible`. CSS mengubah opacity dan posisi
vertikalnya sehingga elemen terlihat muncul secara bertahap.

- Pemeriksaan elemen dan event scroll: [`src/App.jsx`](./src/App.jsx#L187).
- Efek muncul dan keyframe masuk: [`src/style.css`](./src/style.css#L334).
- Animasi awal judul dan foto hero: [`src/style.css`](./src/style.css#L351).

### Animasi dinosaurus “KEEP MOVING”

Dinosaurus dan dua burung dibuat sebagai elemen SVG di bagian Tentang Saya.
CSS menganimasikan tanah agar tampak bergerak, dinosaurus agar memantul dan
menggerakkan kaki, serta burung agar terbang melintasi area dan mengepakkan
sayap. Tinggi area animasi pada mobile diatur agar ilustrasi tidak bertabrakan.

- Markup SVG dan area animasi: [`src/App.jsx`](./src/App.jsx#L439).
- Pengaturan posisi dan ukuran area, dinosaurus, serta burung:
  [`src/style.css`](./src/style.css#L180).
- Gerakan tanah, burung, lompatan, kaki, dan sayap:
  [`src/style.css`](./src/style.css#L365).
- Penyesuaian tinggi area di mobile: [`src/style.css`](./src/style.css#L423).

### Animasi tulisan “GALANG”

Tulisan “GALANG” memakai gradasi lebar yang bergerak melintasi huruf. Efek
cahaya dibuat menggunakan `background`, `background-size`, dan
`background-position`, lalu diputar oleh keyframe CSS. Satu siklus berlangsung
sekitar 10,3 detik; setelah cahaya menyapu tulisan, ada jeda sekitar 2 detik
sebelum siklus berikutnya. Saat pointer bergerak di area tulisan, posisi
cahaya juga dapat mengikuti pointer.

- Tulisan dan interaksi pointer: [`src/App.jsx`](./src/App.jsx#L522).
- Gaya dan durasi animasi: [`src/style.css`](./src/style.css#L308).
- Keyframe pergerakan cahaya: [`src/style.css`](./src/style.css#L324).

### Progress keahlian

Nama keahlian dan nilai persentasenya disimpan di array `skills`. Ketika kartu
keahlian terlihat, JavaScript menaikkan angka dan lebar bar secara bertahap
menggunakan `requestAnimationFrame`. Nilai yang ditampilkan berasal dari data
yang ditulis di kode, bukan hasil tes otomatis.

- Data keahlian: [`src/App.jsx`](./src/App.jsx#L57).
- Animasi nilai dan bar: [`src/App.jsx`](./src/App.jsx#L150).
- Tampilan kartu dan bar: [`src/App.jsx`](./src/App.jsx#L540) dan
  [`src/style.css`](./src/style.css#L283).

### Galeri proyek dan lightbox

Data proyek berisi judul, deskripsi, tag, dan gambar yang disimpan di array
`projects`. Gambar pada kartu dapat ditekan untuk ditampilkan lebih besar dalam
lightbox. Lightbox dapat ditutup dengan tombol tutup, klik area luar, atau tombol
`Escape`. Fokus keyboard dikembalikan ke gambar yang sebelumnya dibuka.

- Data proyek dan gambar: [`src/App.jsx`](./src/App.jsx#L24).
- Kartu proyek: [`src/App.jsx`](./src/App.jsx#L464).
- Pengelolaan lightbox dan tombol tutup: [`src/App.jsx`](./src/App.jsx#L107)
  dan [`src/App.jsx`](./src/App.jsx#L636).
- Tampilan lightbox: [`src/style.css`](./src/style.css#L226).

### Navigasi dan tombol kembali ke atas

Navigasi desktop berubah menjadi menu tombol pada layar kecil. Tautan navigasi
mengarah ke bagian halaman menggunakan ID seperti `about`, `projects`, `skills`,
dan `contact`. Fungsi `scrollToTarget` mengatur gulir secara manual dengan
kurva easing kubik: mulai perlahan, lebih cepat di tengah, lalu melambat saat
mendekati tujuan. Fungsi yang sama digunakan tombol **KEMBALI KE ATAS**.

- State dan tombol menu: [`src/App.jsx`](./src/App.jsx#L103) dan
  [`src/App.jsx`](./src/App.jsx#L276).
- Fungsi gulir halus: [`src/App.jsx`](./src/App.jsx#L235).
- Tombol kembali ke atas: [`src/App.jsx`](./src/App.jsx#L630).
- Aturan menu dan tata letak mobile: [`src/style.css`](./src/style.css#L402).

### Responsivitas dan aksesibilitas gerakan

CSS mengubah tata letak untuk lebar layar maksimum 760 px dan 460 px. Pengguna
yang mengaktifkan preferensi sistem **Reduce Motion** mendapat pengurangan
beberapa animasi sesuai aturan `prefers-reduced-motion`.

- Breakpoint mobile: [`src/style.css`](./src/style.css#L402) dan
  [`src/style.css`](./src/style.css#L445).
- Preferensi pengurangan gerakan: [`src/style.css`](./src/style.css#L458).

## Struktur berkas utama

```text
.
├── index.html                 # Kerangka HTML dan metadata halaman
├── package.json               # Dependensi dan perintah npm
├── src/
│   ├── main.jsx               # Titik masuk React
│   ├── App.jsx                # Konten, data, dan interaksi portofolio
│   └── style.css              # Tema, tata letak, responsivitas, animasi
├── Almet tanpa background-cutout.png
├── BEM tanpa background.png
├── Data Penjualan Kasir.png
├── Dashboard Kharisma.png
└── Barang Admin.png
```

## Mengubah isi portofolio

- Ubah daftar foto dan tema pada array `portraits` di `src/App.jsx`.
- Ubah daftar proyek pada array `projects`, termasuk nama file gambar dan
  deskripsi proyek.
- Ubah daftar teknologi dan nilai progress pada array `skills`.
- Ubah teks bagian Tentang Saya, tautan sosial, dan informasi kontak langsung
  di komponen `App`.
- Ubah warna melalui custom properties di bagian `:root` dan
  `.portfolio--bem` pada `src/style.css`.
- Simpan gambar pengganti di folder proyek, lalu sesuaikan import di bagian
  awal `src/App.jsx`.

## Catatan untuk presentasi

Contoh penjelasan singkat:

> “Portofolio ini dibuat dengan React untuk menyusun halaman dan mengelola
> interaksi, sedangkan Vite digunakan untuk menjalankan dan membangun proyek.
> Animasi dibuat dengan CSS keyframes dan JavaScript. Contohnya, perpindahan
> foto memakai View Transitions API dengan `clip-path`, progress keahlian
> dianimasikan dengan `requestAnimationFrame`, dan bagian dinosaurus dibuat
> menggunakan SVG. Desainnya juga responsif agar tetap nyaman digunakan di
> ponsel.”

Build produksi dapat diperiksa dengan menjalankan `npm run build`.
