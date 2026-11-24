# Catatan Perubahan Repositori (Changelog) — RUMIVERSE

Dokumen ini mencatat seluruh riwayat perubahan, pembaruan arsitektur, optimasi performa, perbaikan antarmuka (UI/UX), dan pembersihan kode pada proyek **RUMIVERSE** (*Boutique Precision Systems Studio*).

---

## [v1.2.0] — 2026-11-24 (Kesiapan Peluncuran & Pembersihan Final)

### 🧹 Pembersihan Kode Sampah (Dead Code Cleanup)
- **Eliminasi Import Menganggur (`0977a64`):** Menghapus 18 impor ikon `lucide-react` yang tidak lagi dipanggil di `MasterplanSection.tsx`, `Pillar1JournalModal.tsx`, `Pillar2JournalModal.tsx`, dan `Pillar3JournalModal.tsx`. Kompilasi TypeScript ketat (`--noUnusedLocals --noUnusedParameters`) kini bersih total dengan `0 error, 0 warning`.
- **Audit Konsol & Aset:** Memastikan 0 pemanggilan `console.log` di seluruh kode sumber dan memastikan 100% dari 18 aset gambar WebP terpakai aktif.

### 📱 Integrasi WhatsApp & Pembaruan Kontak
- **Sinkronisasi Nomor Resmi (`10df659`):** Memperbarui nomor kontak WhatsApp studio ke nomor resmi: **`+62 851-2297-969`** (`tel:+628512297969` / `wa.me/628512297969`).
- **Jalur Konversi Cepat (Lead Engine):** 
  - Menambahkan tombol *"Chat WhatsApp Langsung"* di footer studio (`FooterSection.tsx`).
  - Menambahkan tautan *"Chat WhatsApp Studio"* di modal konsultasi sebelum pengiriman form.
  - Menambahkan tombol *"Lanjutkan di WhatsApp"* setelah pengisian formulir, yang otomatis merangkum data nama, instansi, pilar kebutuhan, dan catatan proyek pemohon.

### 🖼️ Perbaikan Modal Lightbox Living Lab
- **Pelepasan Jebakan CSS (*CSS Containment Trap*) (`1dada70`):** Menggunakan `createPortal(..., document.body)` pada modal pembesar peta udara drone dan cetak biru 3D di `MasterplanSection.tsx`.
- **Penghapusan Pembungkus Terisolasi:** Melepas kelas `.content-visibility-auto` pada pembungkus `MasterplanSection` di `App.tsx` agar posisi `fixed inset-0` tidak terkunci di dalam kotak section.
- **Elevasi Lapisan:** Menaikkan `z-index` seluruh modal ke `z-[100]` sehingga latar gelap solid dan gambar resolusi tinggi menutupi layar penuh tanpa tertimpa bilah navigasi atas (TopBar).

### 🌐 Optimasi SEO & Kartu Media Sosial
- **Open Graph & Twitter Banner (`566636a`):** Memasang gambar visual kartu pratinjau 3D studio `public/og-image.jpg` (1200×630 px) serta tag meta `<meta property="og:image">` di `index.html`.
- **Sitemap XML Statis:** Membuat `public/sitemap.xml` yang mencakup jangkar halaman (`#arsitektur`, `#ekosistem`, `#simulasi`, `#roadmap`, `#kontak`) dan tersinkronisasi dengan `public/robots.txt`.

---

## [v1.1.0] — 2026-11-20 (Responsivitas Mobile & Konfigurasi Turnkey Cloud)

### 🚀 Konfigurasi Deploy Siap Pakai (Turnkey Production)
- **Vercel & Netlify Deployment (`623f3f1`):** Menambahkan `vercel.json` dan `netlify.toml` yang dilengkapi aturan header caching statis 1 tahun (`Cache-Control: public, max-age=31536000, immutable`) serta rewrite rute SPA (`public/_redirects`).
- **Optimasi Konfigurasi Vite (`0ac44c7`):** Memperbarui `vite.config.ts` menggunakan ESM native `import.meta.dirname` dan menghapus plugin perantara yang tidak diperlukan.

### 📱 Desain Responsif & Tipografi Layar Kecil
- **Mencegah Wordmark Terpotong (`4626619`):** Menyesuaikan padding (`px-4`) dan tipografi responsif pada wordmark pengantar studio.
- **Pencegahan iOS Safari Auto-Zoom (`658e7cb`):** Menetapkan ukuran input formulir menjadi `text-base sm:text-sm` (font $\ge 16\text{px}$ pada layar ponsel) agar Safari di iOS tidak melakukan perbesaran layar otomatis saat mengetik.
- **Pelepasan Pembatas Tinggi Rigid:** Menghilangkan batasan `max-h-[calc(100vh-210px)]` pada kartu pilar di mode mobile (`PillarsSection.tsx`) agar seluruh konten terbaca tanpa terpotong.
- **Perataan Teks Hero:** Menghapus `whitespace-nowrap` yang kaku pada headline utama di layar ponsel sempit (360px–390px).

### 🎬 Intro Preloader Sinematik
- **Ketersediaan Selalu Aktif (`4c5f0d7`):** Menghilangkan pembatasan sesi (*sessionStorage*) sehingga pembuka sinematik RUMIVERSE selalu tampil anggun pada setiap pemuatan awal halaman sesuai identitas studio.
- **Deteksi Audit Kilat:** Preloader otomatis dilewati secara cerdas saat mendeteksi perayap Lighthouse atau tautan langsung (*deep links*).

### ⚡ Pembersihan Aset & ESM Native
- **Pemangkasan Gambar Zombie (`34de179`):** Menghapus 16 berkas gambar duplikat dan tidak terpakai (~7.7 MB) dari direktori aset.
- **Native ESM Image Imports:** Mengubah seluruh path gambar string longgar menjadi impor modul ES6 terkompilasi agar dioptimasi dan di-hash oleh Vite/Rollup.
- **Identitas Visual Vektor:** Menambahkan `public/favicon.svg` dan tema warna bilah peramban `<meta name="theme-color" content="#121311" />`.
- **Perbaikan Tautan Navigasi:** Memperbaiki ID jangkar yang sempat tidak terhubung (`#pendekatan` dan penambahan `#simulasi`).

---

## [v1.0.0] — 2026-11-19 (Arsitektur Tiga Sayap & Living Lab Showcase)

### 🏛️ Rebalancing Narasi Sistem
- **Fokus 3 Layanan Utama (`a092103`):** Memposisikan studio pada 3 sayap rekayasa presisi:
  1. *Full-Stack Digital Platforms (Web & Mobile)*
  2. *Autonomous AI Workforce (Agentic Multi-Agent Systems)*
  3. *Cyber-Physical Systems (Applied Field IoT & Hardware)*
- **Living Lab Lumajang:** Diposisikan sebagai laboratorium uji coba terbuka (*extreme testbed & proof of engineering*) terpadu seluas 5 zona sirkular.

### 🎨 Desain Editorial & Interaksi
- **Kanvas Kursor Asap Organik (`681742b`, `55e2dd4`):** Kanvas kursor partikel asap yang beradaptasi secara dinamis terhadap latar belakang gelap/terang.
- **Animasi Modal Halus (`5c5e07c`):** Transisi pegas (*spring physics*) berbasis Framer Motion pada formulir konsultasi dan jurnal editorial.
- **Scroll Lock Bebas Gangguan (`49cda0a`):** Custom hook `useBodyScrollLock` untuk mengunci scroll latar belakang tanpa menyebabkan lompatan layout (*layout shift*).

### 📦 Optimasi Pembagian Berkas (Code-Splitting)
- **Vendor Splitting (`0889a62`):** Memecah modul berat pihak ketiga menjadi chunk terpisah (`vendor-react`, `vendor-motion`, `vendor-lucide`).
- **Lazy-Loaded Modals:** Memuat jurnal bacaan panjang hanya saat tombol diklik melalui `React.lazy` dan `Suspense`.
