# RangkulUMKM

Prototipe web **local-first** yang mempertemukan warung ultra-mikro dengan pelajar/mahasiswa terdekat untuk menyelesaikan **satu tugas digital dalam satu jam** — dengan checklist yang jelas dan bukti yang bisa diverifikasi.

> **Status jujur:** ini prototipe kompetisi, bukan layanan produksi. Semua nama, usaha, permintaan, foto, angka dampak, dan sertifikat adalah **data demo**. Belum ada wawancara lapangan, testimoni nyata, atau skor SUS yang diklaim.

Tanggal build terakhir: **8 November 2026** · Node 24 · Vite 6 · Preact 11 (compat) · TypeScript · Tailwind CSS 4

---

## 1. Masalah yang ingin diuji

Hipotesis desain, bukan hasil riset lapangan:

- Pemilik usaha mikro sering tahu **satu hal kecil** yang perlu dibenahi (belum ada di Maps, belum punya QRIS, foto produk kurang, catatan keuangan berantakan), tetapi tidak punya waktu/jargon untuk menyelesaikannya sendiri.
- Pelatihan massal tidak selalu menjawab kebutuhan “dampingi saya satu langkah hari ini”.
- Mahasiswa ingin membantu, tetapi butuh **tugas yang pendek, jelas, aman, dan bisa dibuktikan** untuk portofolio.

RangkulUMKM menguji satu rantai kerja: **minta bantuan → klaim tugas → ikuti resep → kirim bukti → verifikasi → terbitkan bukti/paspor**.

Prinsipnya: **satu permintaan = satu tugas = satu bukti**, supaya hasilnya bisa diselesaikan dan diperiksa, bukan hanya menjadi daftar pendaftaran.

---

## 2. Alur demo 3 menit

1. Buka beranda, klik **“Minta bantuan”**.
2. Isi wizard 4 langkah: kebutuhan → lokasi → jadwal → konfirmasi. Salin kode permintaan yang muncul.
3. Klik **“Coba sebagai pendamping”**.
4. Di ruang tugas, klik **“Klaim tugas ini”**, lalu centang langkah **Resep Rangkul**.
5. Isi bukti (tautan/foto + catatan), lalu **“Kirim bukti untuk diverifikasi”**.
6. Ganti peran lewat menu **Mode demo** ke **Nia Kartika (Verifikator)**, atau buka `/verifikasi`.
7. Pilih permintaan di antrean → **“Setujui & terbitkan bukti”**.
8. Buka `/dampak`, `/paspor`, `/bukti/{kode}`, dan `/cek` untuk melihat pembaruan.
9. Untuk menguji cabang perbaikan: di halaman verifikasi klik **“Minta perbaikan”**, isi catatan, lalu kirim ulang sebagai Raka.
10. Untuk mengulang demo dari awal: **Mode demo → Reset data demo**.

Peran demo:

| Peran | Persona | Halaman awal |
| --- | --- | --- |
| UMKM | Sri Wahyuni — Warung Bu Sri | `/umkm` |
| Pendamping | Raka Pratama — Universitas Nusantara | `/jelajah` |
| Verifikator | Nia Kartika — Koordinator RW | `/verifikasi` |

Data awal berisi **10 permintaan demo** dalam berbagai status, 4 resep tugas, peta area, paspor, dan sertifikat contoh. Bu Sri sengaja dimulai tanpa permintaan aktif agar alur “buat permintaan” bisa dicoba dari nol.

---

## 3. Fitur inti

- Katalog permintaan + peta area dengan pin yang bisa dibuka.
- Wizard permintaan untuk pengguna awam: pilihan kartu, bahasa sederhana, validasi inline, ringkasan sebelum kirim.
- Ruang tugas dengan **Resep Rangkul**: langkah, estimasi waktu, tips, dan bukti yang diminta.
- Klaim tugas, checklist, unggah foto (dikompres di browser), tautan bukti, dan catatan.
- Verifikasi: setujui atau minta perbaikan dengan catatan; status kembali ke pendamping.
- **Paspor Dampak**: portofolio tugas terverifikasi, bukan sekadar sertifikat kehadiran.
- **Peta Rangkul** dan dashboard dampak yang dihitung dari data lokal.
- Halaman bukti publik `#/bukti/{kode}` + pencarian kode di `/cek`.
- **Mode teks besar** (root 18.5 px), navigasi keyboard, skip link, fokus yang terlihat, dan `prefers-reduced-motion`.
- CSS cetak untuk sertifikat; header/footer aplikasi disembunyikan saat print.
- Reset demo yang menghapus permintaan, bukti, dan foto IndexedDB.

---

## 4. Pemetaan ke pilar penilaian

| Pilar | Yang sudah ada | Batas kejujuran |
| --- | --- | --- |
| Empati & validasi masalah | Persona, 10 permintaan demo, 4 resep, alur pendampingan satu jam | Belum ada wawancara/observasi lapangan; semua data adalah demo |
| Happy path lengkap | Alur request → claim → checklist → evidence → verify → certificate/passport/impact sudah diuji otomatis | Belum ada backend, akun, notifikasi, atau pembayaran |
| UX, aksesibilitas, polish | Responsif 320/768/1366, teks besar, keyboard, print, label demo, bahasa Indonesia sederhana | Belum diuji dengan pembaca layar sungguhan atau pengguna lansia |
| Pengujian terukur | Lighthouse, sweep responsif, uji alur produksi, uji unggah foto, uji print | **SUS belum dijalankan**; rencana uji ada di `docs/RENCANA_UJI.md` |

---

## 5. Menjalankan

Prasyarat: Node.js 20+ (diuji dengan Node 24.21.0).

```bash
npm install
npm run dev
```

Buka URL yang dicetak Vite (biasanya `http://localhost:5173`).

Build produksi:

```bash
npm run typecheck
npm run build
npm run preview -- --port 4173
```

Buka `http://localhost:4173/`.

> Aplikasi memakai `HashRouter`, jadi bisa disajikan sebagai situs statis tanpa konfigurasi rewrite server. Semua aset (font, ikon, grafik) dilayani lokal; tidak ada request pihak ketiga setelah halaman dimuat.

---

## 6. Arsitektur singkat

```text
src/
  App.tsx              # route + lazy loading + mode teks besar
  pages/               # Landing, UmkmHome, RequestWizard, Explore, TaskRoom,
                       # Verify, Impact, Passport, Certificate, Check, Guide
  components/          # Header, Footer, map, kartu, bukti, dialog, dsb.
  lib/
    data.ts            # persona, seed request, resep, meta area
    store.ts           # Zustand + persist localStorage (rangkul.v1)
    photos.ts          # kompresi gambar + IndexedDB (idb-keyval)
    utils.ts           # status, statistik, format
  styles.css           # design system Tailwind + print + responsive + a11y
```

- Runtime memakai **Preact** lewat alias `preact/compat`; kode tetap memakai API React.
- State persisten di `localStorage` dengan key `rangkul.v1`.
- Foto bukti disimpan di IndexedDB `keyval-store`, key `rangkul.photo.*`. Reset demo menghapus keduanya.
- Tidak ada backend, autentikasi, analytics, atau pengiriman data ke server.

---

## 7. Hasil pengujian

### Lighthouse

Lingkungan: Windows, Chrome 156 headless, **Lighthouse 13.6.0**, build produksi di `http://localhost:4173/`, tanggal **8 November 2026**.

| Mode | Performance | Accessibility | Best practices | SEO | Metrik utama |
| --- | --- | --- | --- | --- | --- |
| Desktop (`--preset=desktop`) | **100** (97–100 antar-run) | 100 | 100 | 100 | FCP/LCP 0.5–0.8 s · TBT 30–140 ms · CLS 0 |
| Mobile (default Lighthouse) | **94** pada 3 run saat host idle (94/92/99) | 100 | 100 | 100 | FCP/LCP ±1.6 s · TBT 110–310 ms · CLS 0 |

Catatan variabilitas: host pengujian juga menjalankan Chrome/editor lain. Saat host sibuk, skor mobile turun ke 72–92 karena TBT naik (bukan karena ada request eksternal atau CLS). Angka di atas adalah hasil nyata, bukan target yang diklaim. Untuk pengukuran yang adil, tutup browser/aplikasi berat lain lalu jalankan ulang:

```bash
npx lighthouse http://localhost:4173/ \
  --chrome-flags="--headless=new --no-sandbox --disable-gpu" \
  --preset=desktop --only-categories=performance,accessibility,best-practices,seo

npx lighthouse http://localhost:4173/ \
  --chrome-flags="--headless=new --no-sandbox --disable-gpu" \
  --only-categories=performance,accessibility,best-practices,seo
```

Ringkasan beban awal (desktop, Lighthouse resource summary): **±128 KB total**, 6 request, 0 request pihak ketiga; JS utama ±51 KB gzip, CSS ±13 KB gzip, font ±63 KB.

### Uji fungsional

Diuji pada build produksi dengan Chrome DevTools Protocol:

- Golden path berhasil: request `RKM-2026-110` dibuat → diklaim → 6 langkah checklist → bukti dikirim → disetujui → sertifikat/paspor/dampak/cek kode diperbarui.
- Uji unggah foto: PNG 68 byte → dikompres menjadi JPEG → disimpan di IndexedDB → tetap tampil setelah navigasi ulang → lolos verifikasi.
- Cabang **return/resubmit**: verifikator mengembalikan dengan catatan; pendamping melihat catatan dan foto lama; kirim ulang → status `submitted`; setujui → `verified`.
- Reset demo mengembalikan 10 seed request, peran `umkm`, dan **menghapus semua foto IndexedDB**.
- Print emulation: `[data-app-chrome]` tersembunyi; header/footer sertifikat tetap tampil.
- Mode teks besar: root font 16 px → 18.5 px, `aria-label` tombol berubah.
- Peta: label pin tersembunyi sampai hover/focus; klik pin membuka detail tugas.
- Tidak ada error console pada skenario utama.

### Responsif & aksesibilitas

- Sweep rute pada 320, 768, dan 1366 px: tidak ada overflow dokumen. Satu-satunya elemen yang melebar adalah nav horizontal `/panduan` yang memang memakai `overflow-x-auto` (disengaja).
- Lighthouse accessibility 100 pada beranda; ini **bukan** jaminan kepatuhan WCAG penuh. Audit manual dengan pembaca layar dan pengguna nyata masih perlu.
- Target desain: WCAG 2.2 AA; tombol utama minimal 46 px di mobile, fokus outline 3 px, label form eksplisit, status toast `aria-live`.

---

## 8. Batasan yang harus disebut saat presentasi

- **Tidak ada data lapangan nyata.** Jangan mengklaim “hasil survei”, “SUS 85”, atau “10 UMKM terbantu” sebagai fakta. Angka di aplikasi adalah data demo.
- Tidak ada backend, autentikasi, enkripsi, moderasi, atau notifikasi.
- Data hanya tersimpan di browser perangkat yang dipakai. Membuka di perangkat lain akan memulai data demo baru.
- Foto bukti disimpan lokal; pada versi nyata perlu penyimpanan aman, izin, moderasi, dan perlindungan data pribadi.
- Bukti publik adalah simulasi; nomor telepon dan data sensitif tidak boleh dipublikasikan di versi nyata.
- Belum ada uji pengguna, uji lansia, atau uji pembaca layar. Rencana ada di `docs/RENCANA_UJI.md`; hasilnya harus diisi setelah benar-benar dilakukan.
- Fitur di luar lingkup versi ini: 3D/WebGL, chatbot AI, mini-game, dark mode, dan bilingual ID/EN. Fokus versi ini adalah satu alur inti yang selesai dan dapat diverifikasi.

---

## 9. Selanjutnya

1. Lakukan uji usability moderat dengan 5 pemilik UMKM dan 5 mahasiswa.
2. Kumpulkan SUS setelah tugas selesai; jangan mengarang skornya.
3. Uji dengan pembaca layar (NVDA/TalkBack) dan pengguna berusia 50+.
4. Jika waktu memungkinkan, tambahkan backend tipis untuk sinkronisasi dan moderasi bukti.

Rencana lengkap: [`docs/RENCANA_UJI.md`](docs/RENCANA_UJI.md).

---

## 10. Lisensi aset

Font **Plus Jakarta Sans** dan **Fraunces** disertakan di `public/fonts/` di bawah SIL Open Font License 1.1. Teks lisensi ada di [`public/fonts/OFL.txt`](public/fonts/OFL.txt).

Ikon memakai Lucide (ISC). Kode prototipe ini dibuat untuk kebutuhan kompetisi; tidak ada aset foto nyata di dalamnya — foto contoh adalah SVG/data demo.
