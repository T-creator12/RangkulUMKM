import type {
  Area,
  AreaMeta,
  Category,
  CategoryMeta,
  HelpRequest,
  Person,
  Recipe,
  Role,
} from "./types";

export const CATEGORY_META: Record<Category, CategoryMeta> = {
  maps: {
    label: "Daftar di Google Maps",
    shortLabel: "Google Maps",
    description: "Buat warung muncul saat orang mencari di sekitar.",
    duration: 60,
    color: "#174a3a",
    softColor: "#dce7d8",
    inkColor: "#0f3529",
  },
  qris: {
    label: "Pasang QRIS",
    shortLabel: "QRIS",
    description: "Siapkan pembayaran nontunai untuk pelanggan.",
    duration: 90,
    color: "#c65b3d",
    softColor: "#f5ded4",
    inkColor: "#7c2f1e",
  },
  photo: {
    label: "Foto produk",
    shortLabel: "Foto produk",
    description: "Buat foto jualan yang rapi dan siap dipakai.",
    duration: 60,
    color: "#e9972d",
    softColor: "#fbeccb",
    inkColor: "#6b4408",
  },
  bookkeeping: {
    label: "Buku kas digital",
    shortLabel: "Buku kas",
    description: "Catat pemasukan dan pengeluaran dengan sederhana.",
    duration: 90,
    color: "#4b6b5d",
    softColor: "#e2e9de",
    inkColor: "#2b4539",
  },
};

export const CATEGORY_LIST: Category[] = ["maps", "qris", "photo", "bookkeeping"];

export const AREA_META: Record<Area, AreaMeta> = {
  Sukamaju: { label: "Sukamaju", tagline: "Kampung warung & jasa", x: 31, y: 63 },
  Cempaka: { label: "Cempaka", tagline: "Dekat pasar", x: 63, y: 35 },
  Melati: { label: "Melati", tagline: "Deretan usaha rumahan", x: 44, y: 25 },
  Kenanga: { label: "Kenanga", tagline: "Pinggir kota", x: 74, y: 74 },
};

export const AREA_LIST: Area[] = ["Sukamaju", "Cempaka", "Melati", "Kenanga"];

export const SCHEDULE_OPTIONS = [
  "Sabtu pagi",
  "Sabtu siang",
  "Sabtu sore",
  "Minggu pagi",
  "Minggu siang",
  "Minggu sore",
  "Fleksibel, hubungi saya",
];

export const USER_FOR_ROLE: Record<Role, string> = {
  umkm: "u-busri",
  volunteer: "v-raka",
  verifier: "k-nia",
};

export const ROLE_LABEL: Record<Role, string> = {
  umkm: "Pemilik usaha",
  volunteer: "Pendamping",
  verifier: "Verifikator",
};

export const ROLE_HOME: Record<Role, string> = {
  umkm: "/umkm",
  volunteer: "/jelajah",
  verifier: "/verifikasi",
};

export const PEOPLE: Record<string, Person> = {
  "u-busri": {
    id: "u-busri",
    name: "Sri Wahyuni",
    role: "umkm",
    area: "Sukamaju",
    business: "Warung Bu Sri",
    phone: "0812-3456-4821",
    since: "2012",
    initials: "SW",
    color: "clay",
  },
  "u-hadi": {
    id: "u-hadi",
    name: "Hadi Santoso",
    role: "umkm",
    area: "Sukamaju",
    business: "Warung Kopi Hadi",
    phone: "0857-2210-9031",
    since: "2016",
    initials: "HS",
    color: "forest",
  },
  "u-wati": {
    id: "u-wati",
    name: "Wati Lestari",
    role: "umkm",
    area: "Cempaka",
    business: "Toko Sembako Wati",
    phone: "0813-7788-1204",
    since: "2009",
    initials: "WL",
    color: "marigold",
  },
  "u-rina": {
    id: "u-rina",
    name: "Rina Marlina",
    role: "umkm",
    area: "Melati",
    business: "Laundry Bersih Rina",
    phone: "0821-4455-8712",
    since: "2019",
    initials: "RM",
    color: "sage",
  },
  "u-lestari": {
    id: "u-lestari",
    name: "Lestari Handayani",
    role: "umkm",
    area: "Melati",
    business: "Kue Lestari",
    phone: "0852-1133-6677",
    since: "2014",
    initials: "LH",
    color: "clay",
  },
  "u-joko": {
    id: "u-joko",
    name: "Joko Prasetyo",
    role: "umkm",
    area: "Cempaka",
    business: "Toko Buah Joko",
    phone: "0819-2200-4411",
    since: "2011",
    initials: "JP",
    color: "forest",
  },
  "u-budi": {
    id: "u-budi",
    name: "Budi Hartono",
    role: "umkm",
    area: "Sukamaju",
    business: "Bengkel Budi",
    phone: "0878-9911-2200",
    since: "2007",
    initials: "BH",
    color: "marigold",
  },
  "u-tuti": {
    id: "u-tuti",
    name: "Tuti Rahayu",
    role: "umkm",
    area: "Sukamaju",
    business: "Jahitan Tuti",
    phone: "0812-6677-8899",
    since: "2018",
    initials: "TR",
    color: "sage",
  },
  "u-marni": {
    id: "u-marni",
    name: "Marni Sutisna",
    role: "umkm",
    area: "Kenanga",
    business: "Sayur Segar Marni",
    phone: "0856-3300-7721",
    since: "2015",
    initials: "MS",
    color: "clay",
  },
  "u-suyatno": {
    id: "u-suyatno",
    name: "Suyatno",
    role: "umkm",
    area: "Sukamaju",
    business: "Warung Sayur Pak Suyatno",
    phone: "0813-2244-9988",
    since: "2008",
    initials: "SY",
    color: "forest",
  },
  "u-slamet": {
    id: "u-slamet",
    name: "Slamet Riyadi",
    role: "umkm",
    area: "Cempaka",
    business: "Warung Kopi Slamet",
    phone: "0822-7788-3311",
    since: "2013",
    initials: "SR",
    color: "marigold",
  },
  "v-raka": {
    id: "v-raka",
    name: "Raka Pratama",
    role: "volunteer",
    area: "Sukamaju",
    campus: "Universitas Nusantara",
    bio: "Mahasiswa sistem informasi. Suka membantu UMKM masuk ke layanan digital.",
    skills: ["maps", "photo"],
    availability: ["Sabtu", "Minggu"],
    initials: "RP",
    color: "forest",
  },
  "v-sinta": {
    id: "v-sinta",
    name: "Sinta Maharani",
    role: "volunteer",
    area: "Cempaka",
    campus: "Politeknik Cempaka",
    bio: "Mahasiswa akuntansi. Senang merapikan catatan dan pembayaran digital.",
    skills: ["qris", "bookkeeping"],
    availability: ["Sabtu", "Minggu"],
    initials: "SM",
    color: "clay",
  },
  "v-bagas": {
    id: "v-bagas",
    name: "Bagas Saputra",
    role: "volunteer",
    area: "Kenanga",
    campus: "Universitas Nusantara",
    bio: "Mahasiswa desain komunikasi visual. Fokus foto produk dan Maps.",
    skills: ["maps", "photo", "qris"],
    availability: ["Jumat", "Sabtu"],
    initials: "BS",
    color: "marigold",
  },
  "k-nia": {
    id: "k-nia",
    name: "Nia Kartika",
    role: "verifier",
    area: "Sukamaju",
    campus: "Koordinator Rangkul",
    bio: "Memeriksa bukti tugas dan menjaga kualitas pendampingan.",
    initials: "NK",
    color: "sage",
  },
};

const hoursAgo = (hours: number) =>
  new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
const daysAgo = (days: number) => hoursAgo(days * 24);

const ALL_STEPS = [0, 1, 2, 3, 4, 5];

export const SEED_REQUESTS: HelpRequest[] = [
  {
    id: "r-hadi",
    code: "RKM-2608-101",
    ownerId: "u-hadi",
    ownerName: "Hadi Santoso",
    businessName: "Warung Kopi Hadi",
    category: "maps",
    area: "Sukamaju",
    landmark: "Seberang balai RW 04",
    schedule: "Sabtu pagi",
    notes: "Belum pernah didaftarkan. Foto warung sudah ada di HP.",
    status: "open",
    checklistDone: [],
    createdAt: hoursAgo(1),
  },
  {
    id: "r-wati",
    code: "RKM-2608-102",
    ownerId: "u-wati",
    ownerName: "Wati Lestari",
    businessName: "Toko Sembako Wati",
    category: "qris",
    area: "Cempaka",
    landmark: "Dekat pasar Cempaka",
    schedule: "Minggu pagi",
    notes: "Sudah punya rekening BRI. Pelanggan sering tanya QRIS.",
    status: "open",
    checklistDone: [],
    createdAt: hoursAgo(3),
  },
  {
    id: "r-rina",
    code: "RKM-2608-103",
    ownerId: "u-rina",
    ownerName: "Rina Marlina",
    businessName: "Laundry Bersih Rina",
    category: "photo",
    area: "Melati",
    landmark: "Gang Melati 2, rumah cat kuning",
    schedule: "Jumat sore",
    notes: "Mau foto 3 paket laundry untuk status WhatsApp.",
    status: "open",
    checklistDone: [],
    createdAt: hoursAgo(5),
  },
  {
    id: "r-lestari",
    code: "RKM-2608-104",
    ownerId: "u-lestari",
    ownerName: "Lestari Handayani",
    businessName: "Kue Lestari",
    category: "bookkeeping",
    area: "Melati",
    landmark: "Samping posyandu Melati",
    schedule: "Sabtu siang",
    notes: "Catatan masih di buku tulis. Mau mulai pakai spreadsheet sederhana.",
    status: "open",
    checklistDone: [],
    createdAt: hoursAgo(7),
  },
  {
    id: "r-joko",
    code: "RKM-2608-105",
    ownerId: "u-joko",
    ownerName: "Joko Prasetyo",
    businessName: "Toko Buah Joko",
    category: "maps",
    area: "Cempaka",
    landmark: "Depan SD Cempaka",
    schedule: "Minggu, 08.00",
    notes: "Ingin muncul saat orang mencari buah segar di sekitar pasar.",
    status: "open",
    checklistDone: [],
    createdAt: hoursAgo(26),
  },
  {
    id: "r-budi",
    code: "RKM-2608-106",
    ownerId: "u-budi",
    ownerName: "Budi Hartono",
    businessName: "Bengkel Budi",
    category: "qris",
    area: "Sukamaju",
    landmark: "Jl. Kenanga ujung",
    schedule: "Sabtu sore",
    notes: "Pelanggan makin sering tanya QRIS. Pemilik punya BRI.",
    status: "open",
    checklistDone: [],
    createdAt: hoursAgo(30),
  },
  {
    id: "r-tuti",
    code: "RKM-2608-107",
    ownerId: "u-tuti",
    ownerName: "Tuti Rahayu",
    businessName: "Jahitan Tuti",
    category: "photo",
    area: "Sukamaju",
    landmark: "Gang Melati 3, depan warung Bu Sri",
    schedule: "Minggu, 10.00",
    notes: "Butuh foto seragam dan hasil jahitan untuk katalog WhatsApp.",
    status: "in_progress",
    volunteerId: "v-sinta",
    volunteerName: "Sinta Maharani",
    checklistDone: [0, 1, 2],
    createdAt: hoursAgo(30),
    claimedAt: hoursAgo(20),
  },
  {
    id: "r-marni",
    code: "RKM-2608-108",
    ownerId: "u-marni",
    ownerName: "Marni Sutisna",
    businessName: "Sayur Segar Marni",
    category: "maps",
    area: "Kenanga",
    landmark: "Pinggir jalan Kenanga, dekat gardu",
    schedule: "Sabtu pagi",
    notes: "Sudah daftar, tinggal pastikan muncul di pencarian.",
    status: "submitted",
    volunteerId: "v-bagas",
    volunteerName: "Bagas Saputra",
    checklistDone: ALL_STEPS,
    evidence: {
      link: "https://www.google.com/maps/search/?api=1&query=Warung+Sayur+Marni",
      photoId: "seed-maps",
      note: "Listing sudah dibuat. Nama, jam buka, dan 3 foto sudah terpasang. Tautan sudah dicek di jendela privat.",
      submittedAt: hoursAgo(2),
    },
    verification: { status: "pending" },
    createdAt: hoursAgo(26),
    claimedAt: hoursAgo(20),
  },
  {
    id: "r-suyatno",
    code: "RKM-2608-098",
    ownerId: "u-suyatno",
    ownerName: "Suyatno",
    businessName: "Warung Sayur Pak Suyatno",
    category: "maps",
    area: "Sukamaju",
    landmark: "Dekat masjid Al-Hikmah",
    schedule: "Sabtu pagi",
    notes: "Warung sayur sudah 15 tahun berjualan.",
    status: "verified",
    volunteerId: "v-raka",
    volunteerName: "Raka Pratama",
    checklistDone: ALL_STEPS,
    evidence: {
      link: "https://www.google.com/maps/search/?api=1&query=Warung+Sayur+Pak+Suyatno",
      note: "Listing sudah terbit dan muncul saat mencari warung sayur di Sukamaju.",
      submittedAt: daysAgo(9),
    },
    verification: {
      status: "approved",
      note: "Bukti tautan valid dan profil lengkap.",
      at: daysAgo(8),
      by: "Nia Kartika",
    },
    createdAt: daysAgo(11),
    claimedAt: daysAgo(10),
    completedAt: daysAgo(8),
  },
  {
    id: "r-slamet",
    code: "RKM-2608-096",
    ownerId: "u-slamet",
    ownerName: "Slamet Riyadi",
    businessName: "Warung Kopi Slamet",
    category: "qris",
    area: "Cempaka",
    landmark: "Dekat pasar Cempaka",
    schedule: "Minggu pagi",
    notes: "Butuh QRIS untuk pembayaran pelanggan muda.",
    status: "verified",
    volunteerId: "v-sinta",
    volunteerName: "Sinta Maharani",
    checklistDone: ALL_STEPS,
    evidence: {
      photoId: "seed-qris",
      note: "QRIS sudah terpasang di meja kasir dan sudah diuji dengan transaksi kecil.",
      submittedAt: daysAgo(13),
    },
    verification: {
      status: "approved",
      note: "Foto QRIS jelas dan nama merchant sesuai.",
      at: daysAgo(12),
      by: "Nia Kartika",
    },
    createdAt: daysAgo(15),
    claimedAt: daysAgo(14),
    completedAt: daysAgo(12),
  },
];

export const RECIPES: Record<Category, Recipe> = {
  maps: {
    intro:
      "Tujuan tugas ini sederhana: warung muncul di Google Maps dengan alamat, jam buka, dan foto yang benar.",
    steps: [
      {
        title: "Siapkan bahan",
        detail:
          "Minta nama usaha, kategori, alamat/patokan, jam buka, nomor WhatsApp, dan 3 foto asli.",
        minutes: 5,
        tip: "Gunakan nama yang sama persis dengan papan nama warung.",
      },
      {
        title: "Cek apakah sudah ada",
        detail:
          "Cari nama usaha di Google Maps. Jika sudah ada, jangan buat duplikat—bantu klaim listing yang ada.",
        minutes: 5,
      },
      {
        title: "Tambahkan tempat",
        detail:
          "Dari akun Google pemilik, pilih Contribute lalu Add a missing place. Isi nama dan kategori usaha.",
        minutes: 10,
      },
      {
        title: "Pasang pin dan alamat",
        detail:
          "Geser pin tepat ke pintu masuk. Tambahkan patokan yang mudah dikenali, bukan hanya nomor rumah.",
        minutes: 10,
        tip: "Cek posisi pin bersama pemilik sebelum menyimpan.",
      },
      {
        title: "Lengkapi profil",
        detail:
          "Tambahkan jam buka, nomor WhatsApp, dan 3 foto asli. Jangan memakai foto stok dari internet.",
        minutes: 15,
      },
      {
        title: "Simpan dan salin tautan",
        detail:
          "Pastikan listing muncul di pencarian. Salin tautan lokasi untuk dijadikan bukti.",
        minutes: 15,
        tip: "Buka tautan di jendela privat untuk memastikan tidak meminta login.",
      },
    ],
    proof: "link",
    proofLabel: "Tautan Google Maps",
    proofPlaceholder: "https://maps.app.goo.gl/...",
    proofHelp:
      "Tempel tautan listing yang sudah terbit. Pastikan tautan bisa dibuka tanpa login.",
    safety:
      "Gunakan akun Google milik pemilik usaha. Jangan membuat akun baru atau menyimpan kata sandi tanpa izin.",
  },
  qris: {
    intro:
      "QRIS membantu pelanggan membayar tanpa uang tunai. Fokus pada persetujuan pemilik, bukan kecepatan.",
    steps: [
      {
        title: "Pastikan pemilik siap",
        detail:
          "Pemilik perlu rekening bank/e-wallet atas nama sendiri, KTP, dan NPWP jika ada.",
        minutes: 10,
      },
      {
        title: "Pilih penyedia resmi",
        detail:
          "Gunakan aplikasi bank/e-wallet resmi atau penyedia QRIS berizin. Hindari tautan pendaftaran tidak dikenal.",
        minutes: 10,
        tip: "Cek nama penyedia di situs resmi bank/e-wallet.",
      },
      {
        title: "Daftar bersama pemilik",
        detail:
          "Pemilik mengisi data dan menerima OTP sendiri. Relawan hanya mendampingi dan menjelaskan.",
        minutes: 20,
      },
      {
        title: "Tunggu verifikasi",
        detail:
          "Proses bisa beberapa menit hingga hari kerja. Jangan menjanjikan QRIS langsung aktif.",
        minutes: 5,
      },
      {
        title: "Pasang QRIS",
        detail:
          "Cetak atau unduh QR, tempel di meja dekat kasir. Pastikan nama merchant sudah benar.",
        minutes: 10,
      },
      {
        title: "Uji transaksi",
        detail:
          "Lakukan transaksi kecil, cek notifikasi, lalu ajari pemilik melihat riwayat pembayaran.",
        minutes: 15,
      },
    ],
    proof: "photo",
    proofLabel: "Foto QRIS terpasang",
    proofPlaceholder: "Unggah foto QRIS yang sudah dipasang di meja.",
    proofHelp:
      "Pastikan QR dan nama merchant terlihat. Jangan mengunggah data rekening atau OTP.",
    safety:
      "Jangan pernah memegang OTP, PIN, atau aplikasi bank milik pemilik. Semua persetujuan dilakukan pemilik.",
  },
  photo: {
    intro:
      "Foto yang rapi membuat produk terlihat lebih layak dibeli. Cukup tiga foto yang jelas dan konsisten.",
    steps: [
      {
        title: "Pilih 3 produk",
        detail:
          "Pilih produk yang paling sering dicari pelanggan. Hindari menampilkan terlalu banyak barang dalam satu foto.",
        minutes: 5,
      },
      {
        title: "Siapkan latar",
        detail:
          "Gunakan meja bersih atau kain polos. Singkirkan barang yang tidak perlu dari latar belakang.",
        minutes: 10,
      },
      {
        title: "Foto dengan cahaya alami",
        detail:
          "Dekatkan produk ke jendela pada pagi atau sore. Hindari lampu kuning dan bayangan keras.",
        minutes: 10,
      },
      {
        title: "Ambil beberapa sudut",
        detail:
          "Ambil satu foto dari depan, satu dari samping, dan satu detail tekstur atau ukuran.",
        minutes: 10,
        tip: "Gunakan mode potret jika kamera mendukung.",
      },
      {
        title: "Rapikan dan crop",
        detail:
          "Gunakan editor bawaan HP untuk crop dan atur kecerahan. Jangan mengubah warna produk secara berlebihan.",
        minutes: 15,
      },
      {
        title: "Serahkan file",
        detail:
          "Simpan di folder yang mudah dibuka pemilik. Beri nama file yang jelas, misalnya kue-lestari-1.jpg.",
        minutes: 10,
      },
    ],
    proof: "both",
    proofLabel: "3 foto produk",
    proofPlaceholder: "Unggah satu foto hasil dan tempel tautan folder jika ada.",
    proofHelp:
      "Minimal unggah satu foto hasil. Pastikan wajah pelanggan tidak ikut tanpa izin.",
    safety:
      "Minta izin sebelum memotret orang, tempat tinggal, atau produk yang memiliki merek.",
  },
  bookkeeping: {
    intro:
      "Tujuan bukan membuat laporan akuntansi rumit, tetapi kebiasaan mencatat 5 menit setiap hari.",
    steps: [
      {
        title: "Pilih cara paling sederhana",
        detail:
          "Mulai dari spreadsheet atau buku kas digital. Jangan gunakan aplikasi akuntansi rumit untuk usaha mikro.",
        minutes: 10,
      },
      {
        title: "Tentukan kolom",
        detail:
          "Cukup tanggal, keterangan, pemasukan, pengeluaran, dan saldo. Tambahkan kolom hutang jika perlu.",
        minutes: 10,
      },
      {
        title: "Buat contoh 7 hari",
        detail:
          "Gunakan data contoh saat pelatihan. Minta izin sebelum memakai data transaksi asli.",
        minutes: 20,
      },
      {
        title: "Ajari 3 kebiasaan",
        detail:
          "Catat saat transaksi, rekap sebelum tutup, dan cek saldo setiap minggu.",
        minutes: 15,
      },
      {
        title: "Buat pengingat",
        detail:
          "Pasang alarm 5 menit sebelum tutup. Tempel satu langkah singkat di dekat kasir.",
        minutes: 5,
      },
      {
        title: "Serahkan salinan",
        detail:
          "Bagikan file ke pemilik, pastikan bisa dibuka di HP, dan simpan cadangan.",
        minutes: 10,
      },
    ],
    proof: "both",
    proofLabel: "Tautan/berkas buku kas",
    proofPlaceholder: "Tempel tautan spreadsheet atau unggah foto buku kas.",
    proofHelp:
      "Sensor data pelanggan dan nominal sensitif sebelum mengunggah bukti.",
    safety:
      "Gunakan data contoh saat pelatihan. Jangan menyalin data usaha tanpa izin pemilik.",
  },
};

const svgData = (svg: string) =>
  `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

const mapsPhoto = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 480">
  <rect width="720" height="480" fill="#eef1e5"/>
  <rect width="720" height="310" fill="#e8efe1"/>
  <path d="M-30 210 C120 170 180 250 300 220 S540 130 760 190" fill="none" stroke="#f8f2e6" stroke-width="44"/>
  <path d="M-30 210 C120 170 180 250 300 220 S540 130 760 190" fill="none" stroke="#d8cdb9" stroke-width="2" stroke-dasharray="8 10"/>
  <path d="M160 -20 C180 90 130 170 180 330" fill="none" stroke="#f8f2e6" stroke-width="34"/>
  <path d="M520 -20 C490 90 560 170 520 330" fill="none" stroke="#f8f2e6" stroke-width="34"/>
  <path d="M-20 70 C140 100 330 50 760 110" fill="none" stroke="#f8f2e6" stroke-width="26"/>
  <path d="M0 380 C180 340 360 410 720 360" fill="none" stroke="#cfe2e2" stroke-width="34"/>
  <rect x="35" y="120" width="80" height="52" rx="8" fill="#dfe6d3"/>
  <rect x="240" y="70" width="105" height="66" rx="8" fill="#dfe6d3"/>
  <rect x="575" y="220" width="92" height="58" rx="8" fill="#dfe6d3"/>
  <rect x="250" y="260" width="72" height="46" rx="8" fill="#dfe6d3"/>
  <circle cx="404" cy="177" r="24" fill="#c65b3d"/>
  <path d="M404 215 C404 215 378 184 378 165 A26 26 0 1 1 430 165 C430 184 404 215 404 215Z" fill="#c65b3d"/>
  <circle cx="404" cy="163" r="9" fill="#fff7ea"/>
  <rect x="0" y="310" width="720" height="170" fill="#fffdf7"/>
  <text x="36" y="360" font-family="Arial, sans-serif" font-size="30" font-weight="700" fill="#17251f">Sayur Segar Marni</text>
  <text x="36" y="395" font-family="Arial, sans-serif" font-size="18" fill="#52635b">Toko sayur · Buka · 4,8 ★ (23)</text>
  <rect x="36" y="418" width="118" height="38" rx="19" fill="#174a3a"/>
  <text x="62" y="443" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="#fff7ea">Rute</text>
  <rect x="168" y="418" width="118" height="38" rx="19" fill="#e2e9de"/>
  <text x="190" y="443" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="#174a3a">Simpan</text>
  <circle cx="666" cy="345" r="22" fill="#174a3a"/>
  <path d="M659 345 l5 5 l10 -11" fill="none" stroke="#fff7ea" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const qrisPhoto = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 760">
  <rect width="620" height="760" fill="#efe6d5"/>
  <rect x="74" y="50" width="472" height="660" rx="28" fill="#fffdf7" stroke="#17251f" stroke-width="3"/>
  <text x="310" y="112" text-anchor="middle" font-family="Arial, sans-serif" font-size="40" font-weight="800" fill="#17251f">QRIS</text>
  <text x="310" y="142" text-anchor="middle" font-family="Arial, sans-serif" font-size="15" fill="#52635b">Satu QR untuk semua</text>
  <rect x="150" y="180" width="320" height="320" rx="16" fill="#fff" stroke="#d8cdb9" stroke-width="2"/>
  <rect x="182" y="212" width="84" height="84" fill="#17251f"/>
  <rect x="204" y="234" width="40" height="40" fill="#fffdf7"/>
  <rect x="354" y="212" width="84" height="84" fill="#17251f"/>
  <rect x="376" y="234" width="40" height="40" fill="#fffdf7"/>
  <rect x="182" y="394" width="84" height="84" fill="#17251f"/>
  <rect x="204" y="416" width="40" height="40" fill="#fffdf7"/>
  <g fill="#17251f">
    <rect x="300" y="220" width="20" height="20"/><rect x="340" y="260" width="20" height="20"/>
    <rect x="300" y="300" width="20" height="20"/><rect x="360" y="300" width="20" height="20"/>
    <rect x="320" y="340" width="20" height="20"/><rect x="380" y="360" width="20" height="20"/>
    <rect x="300" y="390" width="20" height="20"/><rect x="340" y="430" width="20" height="20"/>
    <rect x="380" y="430" width="20" height="20"/><rect x="300" y="450" width="20" height="20"/>
  </g>
  <text x="310" y="552" text-anchor="middle" font-family="Arial, sans-serif" font-size="26" font-weight="700" fill="#17251f">Warung Kopi Slamet</text>
  <text x="310" y="584" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#52635b">NMID: ID1024 8833 9912</text>
  <rect x="150" y="620" width="320" height="48" rx="24" fill="#174a3a"/>
  <text x="310" y="651" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="#fffdf7">Sudah terpasang di kasir</text>
</svg>`;

export const SEED_PHOTOS: Record<string, string> = {
  "seed-maps": svgData(mapsPhoto),
  "seed-qris": svgData(qrisPhoto),
};

export function getPerson(id?: string): Person | undefined {
  return id ? PEOPLE[id] : undefined;
}

export function getMatch(
  request: HelpRequest,
  volunteer: Person,
): { score: number; reasons: string[] } {
  let score = 20;
  const reasons: string[] = [];

  if (request.area === volunteer.area) {
    score += 32;
    reasons.push("Sama area");
  } else {
    score += 8;
  }

  if (volunteer.skills?.includes(request.category)) {
    score += 25;
    reasons.push("Sesuai keahlian");
  } else {
    score += 5;
  }

  const day = request.schedule.split(",")[0]?.trim();
  if (volunteer.availability?.some((d) => day?.startsWith(d))) {
    score += 18;
    reasons.push("Jadwal cocok");
  } else if (request.schedule.toLowerCase().includes("fleksibel")) {
    score += 14;
    reasons.push("Jadwal fleksibel");
  }

  const ageHours =
    (Date.now() - new Date(request.createdAt).getTime()) / (1000 * 60 * 60);
  if (ageHours < 12) {
    score += 5;
    reasons.push("Masih baru");
  } else if (ageHours < 24) {
    score += 3;
  }

  return { score: Math.min(98, score), reasons: reasons.slice(0, 3) };
}

export function requestAge(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const minutes = Math.max(1, Math.round(diff / 60000));
  if (minutes < 60) return `${minutes} menit lalu`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} jam lalu`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days} hari lalu`;
  const months = Math.round(days / 30);
  return `${months} bulan lalu`;
}

export function formatDate(iso: string, withTime = false): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    ...(withTime ? { hour: "2-digit", minute: "2-digit" } : {}),
  }).format(new Date(iso));
}

export function codeIsValid(code: string): boolean {
  return /^RKM-\d{4}-\d{3}$/i.test(code.trim());
}

export function normalizeCode(code: string): string {
  return code.trim().toUpperCase();
}


