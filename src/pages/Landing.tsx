import {
  Accessibility,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  Camera,
  Check,
  CheckCircle2,
  Clock3,
  EyeOff,
  FileCheck2,
  HandHeart,
  HeartHandshake,
  MapPin,
  QrCode,
  Search,
  ShieldCheck,
  Sparkles,
  Store,
  UserCheck,
  Users,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { HeroCollage } from "../components/HeroCollage";
import { MiniRequestRow } from "../components/RequestCard";
import { NeighborhoodMap } from "../components/NeighborhoodMap";
import { PassportCard } from "../components/PassportCard";
import { SectionHeading } from "../components/SectionHeading";
import {
  AREA_META,
  CATEGORY_LIST,
  CATEGORY_META,
  PEOPLE,
} from "../lib/data";
import { useAppStore } from "../lib/store";
import type { Role } from "../lib/types";
import { getImpactStats, getOpen, getVerified } from "../lib/utils";

const categoryIcons = {
  maps: MapPin,
  qris: QrCode,
  photo: Camera,
  bookkeeping: BookOpen,
};

export default function Landing() {
  const navigate = useNavigate();
  const requests = useAppStore((state) => state.requests);
  const setRole = useAppStore((state) => state.setRole);
  const largeText = useAppStore((state) => state.largeText);
  const setLargeText = useAppStore((state) => state.setLargeText);
  const openRequests = getOpen(requests);
  const verified = getVerified(requests);
  const stats = getImpactStats(requests);
  const proof =
    verified.find((request) => request.volunteerId === "v-raka") ?? verified[0];
  const heroRequest =
    openRequests.find((request) => request.id === "r-hadi") ?? openRequests[0];
  const featured = openRequests.slice(0, 3);
  const hours = (stats.minutes / 60).toLocaleString("id-ID", {
    maximumFractionDigits: 1,
  });

  const goAs = (role: Role, path: string) => {
    setRole(role);
    navigate(path);
  };

  return (
    <>
      <section className="relative overflow-hidden pb-10 pt-8 sm:pt-14 lg:pb-20">
        <div className="container-page grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div className="reveal">
            <div className="flex flex-wrap items-center gap-2">
              <span className="chip chip-forest">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Pendampingan digital mikro
              </span>
              <span className="text-[0.65rem] font-semibold text-muted">
                Prototipe local-first
              </span>
            </div>

            <h1 className="display-xl mt-5">
              Warungmu belum ada di Maps?{" "}
              <span className="serif-italic text-forest">Ada mahasiswa</span> di
              dekatmu.
            </h1>

            <p className="lede mt-5">
              RangkulUMKM mempertemukan pemilik usaha dengan pelajar dan
              mahasiswa terdekat untuk menyelesaikan{" "}
              <strong className="text-ink">satu tugas digital dalam satu jam</strong>.
              Gratis, langkah demi langkah, dengan bukti yang bisa diverifikasi.
            </p>

            <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => goAs("umkm", "/ajukan")}
              >
                Minta bantuan
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => goAs("volunteer", "/jelajah")}
              >
                Saya ingin membantu
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-[0.68rem] font-bold text-muted">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-forest" aria-hidden="true" />
                Gratis untuk UMKM
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="h-3.5 w-3.5 text-forest" aria-hidden="true" />
                Cukup 1 jam
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-forest" aria-hidden="true" />
                Bukti terverifikasi
              </span>
            </div>
          </div>

          <HeroCollage request={heroRequest} proof={proof} />
        </div>
      </section>

      <section
        aria-label="Dampak program"
        className="border-y border-ink/15 bg-paper-2/55"
      >
        <div className="container-page">
          <div className="stats-strip">
            {[
              {
                value: stats.verified.length,
                label: "Tugas terverifikasi",
                icon: FileCheck2,
              },
              { value: stats.umkm, label: "Warung terbantu", icon: Store },
              { value: hours, label: "Jam pendampingan", icon: Clock3 },
              { value: stats.areas, label: "Area terjangkau", icon: MapPin },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label}>
                  <div className="flex items-center gap-2 text-forest">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    <p className="font-display text-[clamp(1.7rem,3vw,2.5rem)] font-semibold leading-none tracking-tight">
                      {item.value}
                    </p>
                  </div>
                  <p className="mt-1.5 text-[0.62rem] font-bold uppercase tracking-[0.1em] text-muted">
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>
          <p className="py-2 text-center text-[0.58rem] font-semibold text-muted">
            Data demo di perangkat ini · bisa direset kapan saja
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="eyebrow">Kenapa RangkulUMKM</p>
            <h2 className="display-lg mt-3">
              Pelatihan digital sering berhenti di{" "}
              <span className="serif-italic text-forest">ruang kelas.</span>
            </h2>
            <p className="lede mt-4">
              Kemenkop UKM mencatat UMKM menyumbang lebih dari 60% PDB
              Indonesia. Namun jutaan usaha ultra-mikro masih berjalan tanpa
              kehadiran digital. Masalahnya jarang niat—yang hilang adalah
              jembatan dari pengetahuan ke tindakan.
            </p>
            <div className="mt-6 grid gap-2.5 sm:grid-cols-3">
              <div className="impact-card">
                <p className="display-md text-forest">&gt;60%</p>
                <p className="mt-1 text-[0.68rem] font-extrabold">
                  kontribusi UMKM ke PDB
                </p>
                <p className="mt-1 text-[0.56rem] text-muted">Kemenkop UKM</p>
              </div>
              <div className="impact-card">
                <p className="display-md text-clay">1 jam</p>
                <p className="mt-1 text-[0.68rem] font-extrabold">
                  untuk satu tugas nyata
                </p>
                <p className="mt-1 text-[0.56rem] text-muted">bukan kursus panjang</p>
              </div>
              <div className="impact-card">
                <p className="display-md text-forest">1 bukti</p>
                <p className="mt-1 text-[0.68rem] font-extrabold">
                  yang bisa dicek publik
                </p>
                <p className="mt-1 text-[0.56rem] text-muted">bukan sertifikat kehadiran</p>
              </div>
            </div>
          </div>

          <div className="grid gap-3">
            <div className="card-strong relative overflow-hidden p-5 sm:p-6">
              <span className="absolute -right-5 -top-5 h-20 w-20 rounded-full bg-marigold/25" />
              <p className="eyebrow">Prinsip desain kami</p>
              <p className="display-md mt-3 max-w-xl">
                “Yang dibutuhkan warung bukan slide 42 halaman. Tapi seseorang
                yang duduk di sebelahnya dan membantu{" "}
                <span className="serif-italic text-forest">satu langkah.</span>”
              </p>
            </div>
            {[
              {
                icon: Search,
                title: "Materi terlalu abstrak",
                text: "Pelatihan massal mengajarkan konsep, bukan tindakan yang bisa langsung dilakukan hari itu.",
              },
              {
                icon: HandHeart,
                title: "Tidak ada pendampingan",
                text: "Saat pendaftaran gagal atau tombolnya membingungkan, tidak ada yang bisa ditanya.",
              },
              {
                icon: HeartHandshake,
                title: "Mahasiswa butuh bukti nyata",
                text: "Banyak yang ingin membantu, tetapi tidak punya jalur untuk berkontribusi dan mendokumentasikannya.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="card flex items-start gap-3 p-4"
                >
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl border border-forest/15 bg-sage text-forest">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[0.82rem] font-extrabold">{item.title}</p>
                    <p className="mt-0.5 text-[0.72rem] leading-relaxed text-muted">
                      {item.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-sm">
        <div className="container-page">
          <SectionHeading
            eyebrow="Cara kerja"
            title={
              <>
                Tiga langkah.{" "}
                <span className="serif-italic text-forest">Satu hasil nyata.</span>
              </>
            }
            lede="Alurnya sengaja pendek. UMKM tidak perlu membuat akun panjang, dan pendamping tidak perlu menebak harus mulai dari mana."
          />
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {[
              {
                number: "01",
                icon: Store,
                title: "Pilih satu kebutuhan",
                text: "Maps, QRIS, foto produk, atau buku kas. Satu tugas saja—bukan kurikulum digital yang panjang.",
                chip: "4 jenis bantuan",
              },
              {
                number: "02",
                icon: MapPin,
                title: "Bertemu pendamping terdekat",
                text: "Peta Rangkul mencocokkan permintaan dengan mahasiswa di area yang sama dan jadwal yang cocok.",
                chip: "Peta Rangkul",
              },
              {
                number: "03",
                icon: BadgeCheck,
                title: "Selesaikan & buktikan",
                text: "Ikuti resep langkah demi langkah, unggah bukti, lalu dapatkan paspor dampak yang terverifikasi.",
                chip: "Paspor Dampak",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.number}
                  className="card card-hover relative overflow-hidden p-5"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-forest/15 bg-sage text-forest">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="font-display text-[2.4rem] font-semibold leading-none text-line">
                      {item.number}
                    </span>
                  </div>
                  <h3 className="mt-4 text-[1rem] font-extrabold">{item.title}</h3>
                  <p className="mt-1.5 text-[0.78rem] leading-relaxed text-muted">
                    {item.text}
                  </p>
                  <span className="chip chip-forest mt-4">{item.chip}</span>
                </article>
              );
            })}
          </div>
          <p className="mt-5 text-center text-[0.68rem] font-semibold text-muted">
            Tanpa langganan. Tanpa aplikasi baru. Bisa dimulai dari HP.
          </p>
        </div>
      </section>

      <section className="surface-dark section">
        <div className="container-page grid items-center gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="eyebrow on-dark">Peta Rangkul</p>
            <h2 className="display-lg mt-3 text-paper-2">
              Bantuan terdekat,{" "}
              <span className="serif-italic text-marigold">bukan kelas terjauh.</span>
            </h2>
            <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-sage">
              Permintaan terbuka tampil di peta lingkungan. Mahasiswa bisa
              memilih tugas yang benar-benar dekat, sesuai keahlian, dan cocok
              dengan jadwalnya.
            </p>

            <div className="mt-5 rounded-2xl border border-paper-2/20 bg-paper-2 p-2 text-ink">
              <div className="flex items-center justify-between px-2 pb-1.5 pt-1">
                <p className="text-[0.58rem] font-extrabold uppercase tracking-[0.14em] text-muted">
                  {openRequests.length} permintaan terbuka
                </p>
                <span className="chip chip-forest">Live demo</span>
              </div>
              {featured.length > 0 ? (
                featured.map((request) => (
                  <MiniRequestRow key={request.id} request={request} />
                ))
              ) : (
                <p className="p-3 text-xs text-muted">
                  Belum ada permintaan terbuka. Buat satu dari halaman UMKM.
                </p>
              )}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                className="btn btn-accent"
                onClick={() => goAs("volunteer", "/jelajah")}
              >
                Buka peta bantuan
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <Link
                to="/dampak"
                className="btn border-paper-2/70 bg-transparent text-paper-2 shadow-[3px_3px_0_rgba(242,169,59,0.85)] hover:bg-paper-2/10"
              >
                Lihat dampak
              </Link>
            </div>
          </div>

          <div className="relative">
            <NeighborhoodMap
              requests={openRequests}
              className="h-[340px] sm:h-[440px]"
              showLegend
            />
            <span className="absolute right-3 top-3 rounded-full border border-ink/15 bg-paper-2/95 px-3 py-1.5 text-[0.6rem] font-extrabold shadow-sm">
              {openRequests.length} titik bantuan
            </span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow="Resep Rangkul"
            title={
              <>
                Bukan kursus.{" "}
                <span className="serif-italic text-forest">Resep 60 menit.</span>
              </>
            }
            lede="Setiap bantuan punya langkah, perkiraan waktu, tips, dan bukti yang jelas. Pendamping tidak perlu menjadi ahli—cukup mengikuti resep bersama pemilik usaha."
            action={
              <Link to="/panduan" className="btn btn-sm">
                Lihat semua panduan
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            }
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORY_LIST.map((category) => {
              const meta = CATEGORY_META[category];
              const Icon = categoryIcons[category];
              return (
                <article
                  key={category}
                  className="card card-hover flex flex-col p-4"
                >
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-ink/10"
                    style={{
                      background: meta.softColor,
                      color: meta.inkColor,
                    }}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-[0.9rem] font-extrabold leading-tight">
                    {meta.label}
                  </h3>
                  <p className="mt-1.5 flex-1 text-[0.72rem] leading-relaxed text-muted">
                    {meta.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <span className="chip">
                      <Clock3 className="h-3 w-3" aria-hidden="true" />
                      {meta.duration} menit
                    </span>
                    <span className="chip chip-forest">
                      <Check className="h-3 w-3" aria-hidden="true" />
                      Bukti jelas
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-sm border-y border-ink/10 bg-sage-2/45">
        <div className="container-page grid items-center gap-9 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative mx-auto w-full max-w-md lg:rotate-[-2deg]">
            <PassportCard request={proof} volunteer={PEOPLE["v-raka"]} />
            <span className="absolute -right-2 -top-3 rotate-3 rounded-lg border-2 border-ink bg-marigold px-2.5 py-1 text-[0.58rem] font-extrabold uppercase tracking-[0.1em] shadow-[3px_3px_0_#17251f]">
              Contoh data demo
            </span>
          </div>
          <div>
            <p className="eyebrow">Untuk pendamping</p>
            <h2 className="display-lg mt-3">
              Bawa pulang{" "}
              <span className="serif-italic text-forest">bukti,</span> bukan cuma
              cerita.
            </h2>
            <p className="lede mt-4">
              Setiap tugas yang disetujui menghasilkan Paspor Dampak: kode
              verifikasi, kompetensi, usaha yang dibantu, dan tautan bukti.
              Bisa dilampirkan ke CV, portofolio, atau laporan pengabdian.
            </p>
            <ul className="mt-5 grid gap-3">
              {[
                {
                  icon: BadgeCheck,
                  title: "Bukan sertifikat kehadiran",
                  text: "Bukti menunjukkan tugas yang benar-benar selesai.",
                },
                {
                  icon: ShieldCheck,
                  title: "Bisa dicek publik",
                  text: "Setiap kode membuka halaman verifikasi yang bisa dibagikan.",
                },
                {
                  icon: FileCheck2,
                  title: "Siap dicetak",
                  text: "Halaman paspor bisa disimpan sebagai PDF lewat dialog cetak browser.",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.title} className="flex items-start gap-3">
                    <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-forest/20 bg-paper-2 text-forest">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-[0.8rem] font-extrabold">{item.title}</p>
                      <p className="text-[0.72rem] leading-relaxed text-muted">
                        {item.text}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link to="/paspor" className="btn btn-primary btn-sm">
                Lihat contoh paspor
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              <Link to="/cek" className="btn btn-ghost btn-sm">
                Cek kode bukti
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid gap-4 md:grid-cols-2">
          <div className="card-strong p-5 sm:p-7">
            <p className="eyebrow">Aman untuk kedua sisi</p>
            <h2 className="display-md mt-3">
              Kepercayaan bukan fitur tambahan.
            </h2>
            <ul className="mt-4 grid gap-3">
              {[
                {
                  icon: EyeOff,
                  text: "Alamat presisi dan nomor lengkap tidak dibuka sebelum tugas diklaim.",
                },
                {
                  icon: UserCheck,
                  text: "Bukti diperiksa manusia, bukan dicentang otomatis.",
                },
                {
                  icon: ShieldCheck,
                  text: "Pendamping tidak boleh memegang OTP, PIN, atau aplikasi bank pemilik.",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.text} className="flex items-start gap-2.5">
                    <Icon
                      className="mt-0.5 h-4 w-4 flex-none text-forest"
                      aria-hidden="true"
                    />
                    <p className="text-[0.76rem] leading-relaxed text-muted">
                      {item.text}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="card-strong p-5 sm:p-7">
            <p className="eyebrow">Untuk yang belum terbiasa</p>
            <h2 className="display-md mt-3">
              Dibaca oleh orang tua, bukan hanya anak muda.
            </h2>
            <p className="mt-2 text-[0.78rem] leading-relaxed text-muted">
              Satu pertanyaan per layar, tombol besar, bahasa sehari-hari, dan
              mode teks besar. Kalau ragu, pemilik usaha bisa minta dihubungi.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                type="button"
                className="btn btn-sm"
                aria-pressed={largeText}
                onClick={() => setLargeText(!largeText)}
              >
                <Accessibility className="h-4 w-4" aria-hidden="true" />
                {largeText ? "Teks besar aktif" : "Coba mode teks besar"}
              </button>
              <span className="chip">Kontras AA</span>
              <span className="chip">Bisa keyboard</span>
            </div>
            <div className="mt-4 flex items-center gap-3 rounded-xl border border-line bg-paper p-3">
              <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-sage text-forest">
                <Users className="h-4 w-4" aria-hidden="true" />
              </span>
              <p className="text-[0.68rem] leading-relaxed text-muted">
                <strong className="text-ink">Mode Pendamping</strong> memperbesar
                teks, tombol, dan jarak antar elemen tanpa mengubah alur.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-14">
        <div className="container-page">
          <div className="surface-dark relative overflow-hidden rounded-[28px] px-5 py-10 text-center sm:px-10 sm:py-14">
            <p className="eyebrow on-dark justify-center">Mulai dari satu warung</p>
            <h2 className="display-lg mx-auto mt-4 max-w-3xl text-paper-2">
              Satu jammu bisa mengubah cara warung sebelah{" "}
              <span className="serif-italic text-marigold">ditemukan.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[0.9rem] leading-relaxed text-sage">
              Jika seribu mahasiswa menyumbang satu jam per semester, seribu
              warung bisa punya kehadiran digital yang nyata. Mulai dari satu
              tugas hari ini.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-2.5 sm:flex-row">
              <button
                type="button"
                className="btn btn-accent"
                onClick={() => goAs("umkm", "/ajukan")}
              >
                Minta bantuan
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="btn border-paper-2/70 bg-transparent text-paper-2 shadow-[3px_3px_0_rgba(242,169,59,0.85)] hover:bg-paper-2/10"
                onClick={() => goAs("volunteer", "/jelajah")}
              >
                Jadi pendamping
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <p className="mt-5 text-[0.6rem] font-semibold text-sage/80">
              Prototipe kompetisi · data demo tersimpan di perangkat · tanpa
              pelacakan
            </p>
          </div>
        </div>
      </section>

      <section aria-label="Area yang dijangkau" className="pb-12">
        <div className="container-page flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
          <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.14em] text-muted">
            Area pilot demo
          </p>
          <div className="flex flex-wrap gap-1.5">
            {(Object.keys(AREA_META) as Array<keyof typeof AREA_META>).map(
              (area) => (
                <span key={area} className="chip">
                  <MapPin className="h-3 w-3 text-forest" aria-hidden="true" />
                  {AREA_META[area].label}
                </span>
              ),
            )}
          </div>
        </div>
      </section>
    </>
  );
}
