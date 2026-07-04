# 🏦 BayarIn - Aplikasi Pembayaran Tagihan & Top-Up Pulsa

![BayarIn Banner](https://via.placeholder.com/800x200/0d9488/ffffff?text=BayarIn)

## 📋 Deskripsi

**BayarIn** adalah aplikasi web simulasi pembayaran tagihan dan pengisian pulsa yang dibangun dengan teknologi frontend murni (HTML, CSS, JavaScript). Aplikasi ini dirancang untuk memudahkan masyarakat Indonesia dalam membayar berbagai tagihan rutin seperti:

- ⚡ Listrik (PLN)
- 💧 PDAM
- 🌐 Internet
- 🎓 Seminar/Event
- 📚 SPP/Cicilan Kuliah
- 📱 Pulsa & Paket Data

> **Catatan:** Aplikasi ini sepenuhnya berjalan di sisi klien (client-side) dengan data simulasi dan penyimpanan menggunakan LocalStorage. **Fokus pengembangan: Tampilan Mobile (NIM Genap)**

---

## ✨ Fitur Utama

### 1. Dashboard
- Ringkasan saldo simulasi
- Quick access ke semua fitur
- Promo banner
- Statistik transaksi

### 2. Bayar Tagihan
- Pilihan kategori: Listrik, PDAM, Internet, Seminar
- Input nomor pelanggan dengan validasi
- Cek tagihan dan tampilkan detail
- 3 Metode Pembayaran:
  - 🏦 Virtual Account (dengan nomor VA)
  - 📱 QRIS (dengan QR code)
  - 🏪 Bayar di Teller (dengan kode pembayaran)

### 3. Cicilan SPP
- Input NIM (12 digit)
- Tampilan daftar cicilan per semester
- Pilih multiple cicilan untuk dibayar
- Total otomatis terhitung

### 4. Isi Pulsa & Paket
- 6 Provider: Telkomsel, XL, Indosat, Tri, Smartfren, Axis
- Input nomor HP dengan auto-detect provider
- Pilihan nominal pulsa (Rp10k - Rp200k + custom)
- Proses pembayaran dengan metode VA

### 5. Riwayat Transaksi
- Tabel histori lengkap
- Disimpan di LocalStorage
- Fitur hapus semua riwayat

### 6. Fitur Pendukung
- ✅ Toast Notification (Sukses/Error/Warning)
- ✅ Loading State dengan spinner
- ✅ Modal Konfirmasi & Bukti Pembayaran
- ✅ Cetak Struk (window.print)
- ✅ Validasi Form Real-time
- ✅ Responsive Mobile First
- ✅ Dark/Light Mode (otomatis sesuai sistem)

---

## 🛠️ Teknologi yang Digunakan

| Teknologi | Deskripsi |
|-----------|-----------|
| **HTML5** | Struktur aplikasi |
| **Tailwind CSS** | Styling cepat & responsif (via CDN) |
| **Vanilla JavaScript ES6+** | Semua logika aplikasi |
| **Font Awesome 6** | Icon library (via CDN) |
| **QRCode.js** | Generate QR Code untuk QRIS (via CDN) |
| **LocalStorage** | Penyimpanan data transaksi |

---

## 📂 Struktur File
bayarin-app/
├── index.html # File utama HTML (semua layout)
├── script.js # Semua JavaScript logic (ES6+)
├── README.md # Dokumentasi project (ini)
└── assets/ # (Opsional) Gambar/logo
└── logo.png

## 🚀 Cara Menjalankan

### Metode 1: Langsung Buka di Browser
1. Download/clone repository ini
2. Buka folder project
3. Double-click `index.html` untuk membuka di browser

### Metode 2: Menggunakan Live Server (Rekomendasi)
1. Install VS Code
2. Install ekstensi **Live Server** (Ritwick Dey)
3. Buka folder project di VS Code
4. Klik kanan `index.html` → **Open with Live Server**
5. Aplikasi akan terbuka di browser dengan auto-reload

DATA DUMMY LENGKAP UNTUK TESTING
1. Tagihan Listrik (PLN):
123456789012
987654321098
456789123456
111222333444
555666777888

2. Tagihan PDAM:
112233445566
223344556677
334455667788

3. Tagihan Internet:
998877665544
887766554433
776655443322

4. Tagihan Seminar:
SEM2026A01
SEM2026B02

5. NIM SPP:
202310001234
202310002345
202310003456

6. Nomor HP Pulsa:
08123456789
087812345678
085612345678
089512345678
081312345678
083812345678

