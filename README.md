# OpikLink - Platform Custom Link-in-Bio
OpikLink adalah platform etalase mikro (link-in-bio) modern, cepat, dan sangat personal yang dirancang untuk kreator konten, pengembang (developer), profesional, dan pelaku UMKM.

Halaman publik berjalan 100% statis tanpa biaya langganan bulanan (zero server cost), dapat di-hosting selamanya di GitHub Pages, dan dilengkapi dashboard visual mandiri dengan efek Aurora beranimasi.

Fitur Utama • Struktur File • Panduan Deploy ke GitHub Pages • Alur Pembaruan Data • FAQ

## 🌟 Fitur Utama

- 🎨 Latar Belakang Aurora Beranimasi & Upload Gambar:

  - 5 Preset gradien dinamis yang bergerak halus (Northern Lights, Sunset Horizon, Cyber Nebula, Matcha Breeze, Soft Daylight).

  - Dukungan upload gambar latar dari galeri perangkat lengkap dengan kontrol kegelapan overlay dan efek blur glassmorphism.

## 🔒 Arsitektur Terpisah (Pengunjung vs Editor):

Pengunjung hanya membuka halaman publik bersih tanpa panel navigasi admin.

Pemilik halaman mengelola tautan melalui dashboard editor visual mandiri (studio.html).

## 🔄 Penyimpanan Lokal & Multi-Akun Google:

Data profil dan tautan Anda disimpan aman di browser (localStorage) dan dikelompokkan berdasarkan email Google.

Memperbarui file kode tidak akan menghapus riwayat tautan atau tema yang sudah Anda atur.

## 📱 Drag & Drop Reordering:

Urutkan tautan secara dinamis langsung dari layar dengan gestur seret (drag-and-drop) atau tombol panah.

## 💬 Integrasi Kontak WhatsApp Otomatis:

Tombol aksi cepat (Call-to-Action) langsung ke nomor WhatsApp dengan pesan template otomatis.

## 📊 Analitik & Metrik Real-time (Privasi Aman):

Pemantauan metrik Page Views, Total Klik, dan Click-Through Rate (CTR) tanpa mencatat IP pribadi pengunjung.

## 📦 Ekspor & Impor Data:

Buat cadangan data profil ke format JSON (.json) dan unduh halaman publik mandiri (index.html) dalam satu kali klik.

## 📁 Struktur File Repository

Untuk memisahkan akses pengunjung umum dari halaman editor Anda, repositori ini menggunakan struktur dua file:

📦 repo-opiklink/
├── index.html       # Halaman publik yang diakses pengunjung (ringan, < 15 KB, tanpa menu editor)
├── studio.html      # Ruang kerja rahasia / Dashboard editor visual Anda
└── README.md        # Dokumentasi repositori


[!NOTE]
- index.html: Halaman yang otomatis dibuka oleh siapa saja yang mengunjungi link GitHub Pages Anda (username.github.io/repo-name/).
- studio.html: File editor yang Anda gunakan untuk mengubah isi link, foto, atau tema Aurora. File ini dapat dibuka secara lokal di laptop atau diakses melalui username.github.io/repo-name/studio.html.

## 🚀 Panduan Deploy ke GitHub Pages (100% Gratis Selamanya)

Ikuti langkah-langkah berikut untuk mempublikasikan OpikLink ke internet:

1. Buat Repositori di GitHub
Masuk ke akun GitHub Anda.
Buat repositori baru (New Repository), misalnya bernama link atau bio.
Pastikan visibilitas repositori disetel ke Public.

2. Unggah File
Buka file studio.html di komputer Anda, lakukan kustomisasi awal (nama, foto, tema, tautan).
Klik tombol Publikasi & Download di kanan atas, lalu pilih Download Halaman Publik (index.html).
Di halaman repositori GitHub Anda, klik Add file > Upload files.
Tarik dan unggah dua file:
index.html (hasil unduhan tadi)
studio.html (file studio editor lengkap)
Klik Commit changes.

3. Aktifkan Fitur GitHub Pages
Masuk ke tab Settings di repositori Anda.
Di bilah menu kiri, pilih bagian Pages.
Di bawah judul Build and deployment:
Bagian Source: pilih Deploy from a branch.
Bagian Branch: ubah dropdown None menjadi main (atau master), lalu biarkan folder tetap /(root).
Klik tombol Save.
Abaikan tawaran uji coba berbayar GitHub Enterprise 30 hari. GitHub Pages standar untuk repositori publik bersifat gratis selamanya tanpa batas waktu.

Dalam 1–2 menit, link publik Anda akan aktif di format:
https://<username-github>.github.io/<nama-repo>/


## 🔄 Alur Kerja Kustomisasi & Update
Bagaimana jika Anda ingin menambah link baru atau mengubah tema di kemudian hari?

graph LR
    A[Buka studio.html di Komputer] --> B[Kustomisasi Link / Tema di Dashboard]
    B --> C[Klik Publikasi & Download]
    C --> D[Unduh index.html baru]
    D --> E[Upload & Timpa index.html di GitHub]
    E --> F[Halaman Publik Otomatis Ter-update]


Buka file studio.html langsung di browser perangkat Anda (cukup klik dua kali pada file lokal).
Ubah tautan, ganti warna gradien Aurora, atau sesuaikan bio sesuai kebutuhan.
Klik tombol Publikasi & Download di pojok kanan atas, lalu klik Download Halaman Publik (index.html).
Buka repositori GitHub Anda, unggah file index.html yang baru tersebut untuk menimpa file lama.
Selesai! Pengunjung akan langsung melihat perubahan terbaru Anda.

## ❓ Pertanyaan Umum (FAQ)
Tidak. Data kustomisasi Anda (nama, daftar link, gambar profil, pilihan tema) disimpan terpisah di memori peramban (localStorage) perangkat Anda di bawah email yang Anda hubungkan. Memperbarui atau menimpa file kode studio.html hanya memperbarui kerangka aplikasinya tanpa menyentuh data profil Anda.

Tidak. Pengunjung hanya mengakses file index.html yang murni berisi tampilan profil statis tanpa panel editor, tombol pengaturan, maupun formulir input.

Bisa. Anda bisa menghubungkan domain pribadi (seperti link.namaanda.com atau namaanda.id) secara gratis melalui menu Settings > Pages > Custom domain di repositori GitHub Anda.

Tidak. OpikLink dilengkapi algoritma kompresi gambar berbasis HTML5 Canvas di sisi peramban. Foto profil maupun wallpaper latar belakang akan dikompresi otomatis sehingga halaman publik tetap memuat sangat cepat (< 0.5 detik).

## 🛠️ Stack Teknologi

Styling: Tailwind CSS CDN
Ikon: Lucide Icons & FontAwesome
Tipografi: Google Fonts (Plus Jakarta Sans & Instrument Serif)
Hosting Engine: GitHub Pages (Static Hosting)

## 📄 Lisensi
Proyek ini dirilis di bawah lisensi MIT. Bebas digunakan, dimodifikasi, dan didistribusikan untuk keperluan pribadi maupun komersial.
