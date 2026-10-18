# Product Requirement Document (PRD): Custom Link-in-Bio Platform

---

## 1. Latar Belakang & Visi Produk
- **Latar Belakang:** Banyak kreator konten, pemilik bisnis UMKM, dan profesional kesulitan menampilkan identitas digital yang multifungsi hanya melalui tautan bio media sosial tunggal. Solusi yang ada seringkali membatasi kustomisasi desain visual atau mengenakan biaya tinggi untuk integrasi analitik dan formulir dasar.
- **Visi Produk:** Menjadi platform *link-in-bio* modular, ringan, dan sangat personal yang memudahkan kreator dan pelaku bisnis membangun etalase mikro digital (portofolio, tautan, kontak, dan katalog mini) dalam hitungan menit tanpa hambatan teknis.
- **Value Delivery:** Menyediakan fleksibilitas kustomisasi visual instan dengan performa *loading* ultra-cepat di perangkat seluler serta privasi data tautan yang aman.

---

## 2. Target Persona & Riset Masalah
- **Target Persona:**
  1. *Kreator Konten & Influencer:* Memerlukan satu halaman terpadu untuk mempromosikan media sosial, konten terbaru, dan kolaborasi brand.
  2. *Pelaku UMKM / Penjual Online:* Membutuhkan halaman katalog kilat untuk mengarahkan pembeli langsung ke WhatsApp, e-commerce, atau daftar kontak.
  3. *Profesional / Freelancer:* Memerlukan kartu nama digital interaktif untuk portofolio dan pemesanan sesi konsultasi.
- **Masalah Pengguna (Pain Points):**
  * Tampilan *link-in-bio* umum terlihat generik dan kurang mencerminkan *brand identity*.
  * Waktu muat halaman (loading speed) sering lambat pada koneksi seluler tidak stabil.
  * Opsi pelacakan klik dan analitik pengunjung sering terkunci di balik skema langganan mahal.
  * Kesulitan mengelola urutan tautan secara dinamis lewat ponsel.

---

## 3. Tujuan Strategis & Key Performance Indicators (KPI)
- **Tujuan Strategis:**
  * Membangun aplikasi web *mobile-first* yang intuitif untuk pembuatan halaman profil tautan instan.
  * Memastikan tingkat retensi dan keterlibatan pengguna tinggi melalui kemudahan kustomisasi.
- **Key Performance Indicators (KPI):**
  * *Activation Rate:* >70% pengguna baru berhasil membuat dan mempublikasikan halaman profil dalam 5 menit pertama registrasi.
  * *Page Load Time:* Rata-rata waktu muat halaman profil publik < 1.2 detik pada jaringan 4G/seluler.
  * *Engagement/CTR:* Rata-rata Click-Through Rate (CTR) tautan pengunjung mencapai minimal 25%.
  * *User Retention:* 40% pengguna aktif mingguan (WAU) kembali memperbarui atau memeriksa analitik tautan mereka.

---

## 4. Cakupan Produk Minimum (MVP Scope) & Prioritas Fitur
Metode Prioritisasi: **MoSCoW** (Must have, Should have, Could have, Won't have for now)

### A. Must Have (Wajib Ada di MVP)
1. **Autentikasi Pengguna:** Registrasi dan login akun via Email/Password serta Google OAuth.
2. **Klaim Custom Username/Slug:** Validasi URL publik unik (misal: `domain.com/@username`).
3. **Link Builder & Management:**
   * Tambah, edit, hapus tautan (Judul, URL tujuan, status aktif/non-aktif).
   * Urutkan posisi tautan secara visual (drag-and-drop / tombol naik-turun).
4. **Kustomisasi Profil Dasar:** Foto profil/avatar, nama tampilan, bio singkat, dan pilihan tema visual dasar (tema terang, gelap, atau palet warna preset).
5. **Halaman Publik Responsif:** Tampilan publik ramah seluler (*mobile-first*) untuk menampilkan daftar tautan aktif.
6. **Metrik Klik Dasar:** Penghitung total tampilan halaman (*page views*) dan total klik per tautan.

### B. Should Have (Penting, Prioritas Lanjutan)
1. Penjadwalan tautan (tautan otomatis tampil/hilang pada tanggal tertentu).
2. Tautan khusus media sosial (ikon sosial media di bagian header/footer).
3. Tombol kontak cepat (Integrasi langsung ke WhatsApp dengan teks *template*).

### C. Could Have (Fitur Tambahan)
1. Kustomisasi CSS/warna latar belakang bebas (hex code).
2. Integrasi analitik eksternal (Google Analytics tag atau Meta Pixel).

### D. Won't Have for Now (Di Luar Cakupan MVP)
1. Integrasi gateway pembayaran atau etalase toko digital in-app.
2. Fitur langganan membership/newsletter langsung di platform.

---

## 5. User Stories & Acceptance Criteria

### Story 1: Pengelolaan Tautan (Link Management)
- **Sebagai:** Kreator konten
- **Saya ingin:** Menambahkan, mengedit, dan mengubah urutan tautan portofolio saya dengan mudah
- **Agar:** Pengunjung profil saya selalu melihat proyek atau konten terbaru di posisi paling atas
- **Acceptance Criteria (Definition of Done):**
  * Pengguna dapat menekan tombol "Tambah Tautan Baru" dan mengisi kolom Judul serta URL.
  * Sistem memvalidasi bahwa input URL memiliki format protokol yang valid (`http://` atau `https://`).
  * Tautan baru langsung muncul di daftar editor dan dapat dinonaktifkan tanpa harus dihapus.
  * Pengguna dapat mengatur urutan tampilan dengan menyeret (*drag-and-drop*) kartu tautan; urutan langsung tersimpan secara otomatis.

### Story 2: Halaman Publik Cepat & Responsif
- **Sebagai:** Pengunjung / Calon klien
- **Saya ingin:** Mengakses tautan profil seorang kreator di browser smartphone tanpa lag
- **Agar:** Saya dapat segera membuka link portofolio atau kontak yang saya perlukan
- **Acceptance Criteria (Definition of Done):**
  * Halaman publik dapat diakses melalui URL `domain.com/@username`.
  * Halaman merender layout seluler secara proporsional di berbagai ukuran layar (iOS/Android browser).
  * Menekan salah satu kartu tautan akan membuka URL target di tab baru (`_blank`) dan mencatat log klik secara asinkron tanpa memperlambat navigasi.

### Story 3: Laporan Analitik Ringkas
- **Sebagai:** Pemilik tautan
- **Saya ingin:** Melihat metrik sederhana mengenai tautan mana yang paling sering diklik
- **Agar:** Saya mengetahui konten atau produk apa yang paling diminati oleh audiens saya
- **Acceptance Criteria (Definition of Done):**
  * Pada dashboard admin pengguna, terdapat kartu ringkasan "Total Kunjungan" dan "Total Klik".
  * Setiap kartu tautan di dashboard menampilkan angka klik unik akumulatif.
  * Data klik diperbarui secara near-real-time saat halaman dashboard di-refresh.

---

## 6. Kebutuhan Non-Fungsional (Non-Functional Requirements)

- **Performa & Skalabilitas:**
  * Waktu respons API untuk halaman publik di bawah 200 ms.
  * Menggunakan strategi *caching* (misalnya CDN atau server-side caching) untuk halaman publik profil agar mampu menangani lonjakan lalu lintas (*traffic spike*) viral.
- **Keamanan:**
  * Validasi dan sanitasi ketat terhadap input URL untuk mencegah serangan *Cross-Site Scripting* (XSS) dan pengalihan berbahaya (*malicious redirect*).
  * Penyimpanan kata sandi wajib menggunakan enkripsi *hashing* yang kuat (misal: bcrypt / Argon2).
  * Proteksi *rate limiting* pada endpoint login, registrasi, dan pencatatan klik untuk menghindari serangan brute force atau manipulasi metrik (bot clicking).
- **Privasi & Kepatuhan:**
  * Tidak menyimpan data pribadi pengunjung tanpa izin; data pencatatan klik hanya mengumpulkan informasi agregat (misal: tipe perangkat, negara, referrer) tanpa menyimpan IP address lengkap.
- **Aksesibilitas (A11y):**
  * Kontras warna teks tombol tautan terhadap warna latar belakang memenuhi standar WCAG 2.1 Level AA.
  * Seluruh tombol dan tautan dapat dinavigasi menggunakan papan ketik (*keyboard navigable*) dan ramah pembaca layar (*screen reader*).

