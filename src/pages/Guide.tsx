import {
  Accessibility,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Camera,
  CheckCircle2,
  ChevronDown,
  Clock3,
  EyeOff,
  FileCheck2,
  HandHeart,
  KeyRound,
  MapPin,
  MessageCircle,
  QrCode,
  ShieldCheck,
  Store,
  Users,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "../components/Avatar";
import { CategoryChip } from "../components/CategoryIcon";
import {
  CATEGORY_LIST,
  CATEGORY_META,
  PEOPLE,
  RECIPES,
  ROLE_HOME,
  USER_FOR_ROLE,
} from "../lib/data";
import { useAppStore } from "../lib/store";
import type { Category, Role } from "../lib/types";
import { usePageTitle } from "../lib/usePageTitle";

const categoryIcons: Record<Category, typeof MapPin> = {
  maps: MapPin,
  qris: QrCode,
  photo: Camera,
  bookkeeping: BookOpen,
};

const roleCards: Array<{
  role: Role;
  title: string;
  text: string;
  cta: string;
  icon: typeof Store;
}> = [
  {
    role: "umkm",
    title: "Pemilik usaha",
    text: "Ajukan satu kebutuhan digital. Tidak perlu mengerti istilah teknis.",
    cta: "Buat permintaan",
    icon: Store,
  },
  {
    role: "volunteer",
    title: "Pendamping",
    text: "Pilih tugas terdekat, ikuti resep, lalu kirim bukti yang jelas.",
    cta: "Cari tugas",
    icon: HandHeart,
  },
  {
    role: "verifier",
    title: "Verifikator",
    text: "Periksa bukti dengan daftar cek singkat. Setujui atau minta perbaikan.",
    cta: "Buka antrean",
    icon: FileCheck2,
  },
];

const faqs = [
  {
    question: "Apakah RangkulUMKM gratis?",
    answer:
      "Ya. Prototipe ini dirancang tanpa biaya untuk pemilik usaha dan pendamping. Tidak ada pembayaran, iklan, atau bagi hasil di dalam alur demo.",
  },
  {
    question: "Mengapa hanya satu tugas per permintaan?",
    answer:
      "Satu tugas membuat harapan jelas dan hasil bisa diverifikasi. Pemilik bisa mengajukan tugas berikutnya setelah tugas pertama selesai. Fokus pada penyelesaian, bukan jumlah pendaftaran.",
  },
  {
    question: "Apa yang harus dilakukan jika tugas tidak selesai?",
    answer:
      "Pendamping dapat mengembalikan tugas ke pemilik melalui koordinator. Verifikator juga bisa meminta perbaikan bukti. Tugas yang tidak bisa diselesaikan akan dibuka kembali untuk pendamping lain.",
  },
  {
    question: "Apakah data saya aman?",
    answer:
      "Prototipe ini menyimpan data di browser perangkat ini dan tidak mengirimkannya ke server. Di versi nyata, nomor telepon dan bukti harus dilindungi, akses dibatasi, dan data pribadi tidak ditampilkan di halaman publik.",
  },
  {
    question: "Apakah paspor ini sertifikat resmi?",
    answer:
      "Tidak. Paspor Dampak adalah portofolio prototipe, bukan sertifikat resmi, pengakuan kampus, atau bukti dampak yang diaudit lembaga independen.",
  },
];

export default function Guide() {
  usePageTitle("Panduan & keamanan");
  const navigate = useNavigate();
  const setRole = useAppStore((state) => state.setRole);
  const largeText = useAppStore((state) => state.largeText);
  const setLargeText = useAppStore((state) => state.setLargeText);

  const goAs = (role: Role) => {
    setRole(role);
    navigate(ROLE_HOME[role]);
  };

  return (
    <div className="container-page py-8 sm:py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Panduan & keamanan</p>
          <h1 className="display-lg mt-2">
            Tahu langkahnya.{" "}
            <span className="serif-italic text-forest">Tahu batasnya.</span>
          </h1>
          <p className="lede mt-2">
            Satu tugas digital seharusnya tidak membingungkan. Halaman ini
            menjelaskan alur, resep, dan aturan keamanan yang dipakai di
            prototipe RangkulUMKM.
          </p>
        </div>
        <span className="chip chip-marigold">Data demo</span>
      </div>

      <nav
        aria-label="Bagian panduan"
        className="mt-6 flex gap-1.5 overflow-x-auto pb-1"
      >
        {[
          { href: "#peran", label: "Tiga peran" },
          { href: "#resep", label: "Resep Rangkul" },
          { href: "#keamanan", label: "Keamanan" },
          { href: "#aksesibilitas", label: "Aksesibilitas" },
          { href: "#tanya", label: "Pertanyaan" },
        ].map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="chip flex-none hover:border-forest/40 hover:bg-sage-2"
          >
            {item.label}
          </a>
        ))}
      </nav>

      <section id="peran" className="mt-8 scroll-mt-24">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="eyebrow">Alur kerja</p>
            <h2 className="display-md mt-2">
              Tiga peran, satu rantai bukti.
            </h2>
          </div>
          <Users className="h-6 w-6 text-forest" aria-hidden="true" />
        </div>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {roleCards.map((card) => {
            const person = PEOPLE[USER_FOR_ROLE[card.role]];
            const Icon = card.icon;
            return (
              <div key={card.role} className="card flex flex-col p-4">
                <div className="flex items-center gap-2.5">
                  <Avatar person={person} size="md" />
                  <div className="min-w-0">
                    <p className="text-[0.78rem] font-extrabold">
                      {card.title}
                    </p>
                    <p className="text-[0.6rem] text-muted">{person.name}</p>
                  </div>
                  <Icon
                    className="ml-auto h-4 w-4 flex-none text-forest"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-2 flex-1 text-[0.7rem] leading-relaxed text-muted">
                  {card.text}
                </p>
                <button
                  type="button"
                  className="btn btn-sm mt-3"
                  onClick={() => goAs(card.role)}
                >
                  {card.cta}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <section id="resep" className="mt-10 scroll-mt-24">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow">Resep Rangkul</p>
            <h2 className="display-md mt-2">
              Langkah kecil yang tidak bikin panik.
            </h2>
            <p className="mt-2 max-w-2xl text-[0.78rem] leading-relaxed text-muted">
              Empat resep untuk empat kebutuhan yang paling sering muncul.
              Setiap langkah punya perkiraan waktu, tips, dan bukti yang harus
              dikirim.
            </p>
          </div>
          <Link to="/jelajah" className="btn btn-sm">
            Lihat tugas terbuka
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-4 grid gap-2">
          {CATEGORY_LIST.map((category) => {
            const recipe = RECIPES[category];
            const meta = CATEGORY_META[category];
            const Icon = categoryIcons[category];
            const totalMinutes = recipe.steps.reduce(
              (total, step) => total + step.minutes,
              0,
            );
            return (
              <details
                key={category}
                className="group card overflow-hidden"
                open={category === "maps"}
              >
                <summary className="flex cursor-pointer list-none items-center gap-3 p-4 [&::-webkit-details-marker]:hidden">
                  <span
                    className="flex h-10 w-10 flex-none items-center justify-center rounded-xl"
                    style={{
                      background: meta.softColor,
                      color: meta.inkColor,
                    }}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[0.84rem] font-extrabold">
                      {meta.label}
                    </span>
                    <span className="mt-0.5 block text-[0.64rem] text-muted">
                      {recipe.steps.length} langkah · ± {totalMinutes} menit ·{" "}
                      {recipe.proofLabel}
                    </span>
                  </span>
                  <span className="chip hidden sm:inline-flex">
                    <Clock3 className="h-3 w-3" aria-hidden="true" />
                    {meta.duration} menit
                  </span>
                  <ChevronDown
                    className="h-4 w-4 flex-none text-muted transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <div className="border-t border-line/70 px-4 pb-4 pt-3">
                  <p className="text-[0.74rem] leading-relaxed text-muted">
                    {recipe.intro}
                  </p>
                  <ol className="mt-3 grid gap-2">
                    {recipe.steps.map((step, index) => (
                      <li
                        key={step.title}
                        className="flex gap-2 rounded-xl bg-paper p-2.5"
                      >
                        <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-forest text-[0.58rem] font-extrabold text-paper-2">
                          {index + 1}
                        </span>
                        <span>
                          <span className="flex flex-wrap items-baseline justify-between gap-x-2">
                            <span className="text-[0.74rem] font-extrabold">
                              {step.title}
                            </span>
                            <span className="text-[0.56rem] text-muted">
                              ± {step.minutes} menit
                            </span>
                          </span>
                          <span className="mt-0.5 block text-[0.68rem] leading-relaxed text-muted">
                            {step.detail}
                          </span>
                          {step.tip && (
                            <span className="mt-1 block rounded-lg bg-marigold-soft px-2 py-1 text-[0.62rem] font-semibold text-[#6b4408]">
                              Tips: {step.tip}
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ol>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    <div className="rounded-xl border border-forest/15 bg-sage-2/70 p-2.5">
                      <p className="flex items-center gap-1 text-[0.56rem] font-extrabold uppercase tracking-[0.12em] text-forest">
                        <BadgeCheck className="h-3 w-3" aria-hidden="true" />
                        Bukti yang diminta
                      </p>
                      <p className="mt-1 text-[0.68rem] leading-relaxed text-muted">
                        {recipe.proofLabel}. {recipe.proofHelp}
                      </p>
                    </div>
                    <div className="rounded-xl border border-marigold/30 bg-marigold-soft p-2.5">
                      <p className="flex items-center gap-1 text-[0.56rem] font-extrabold uppercase tracking-[0.12em] text-[#6b4408]">
                        <ShieldCheck
                          className="h-3 w-3"
                          aria-hidden="true"
                        />
                        Batas aman
                      </p>
                      <p className="mt-1 text-[0.68rem] leading-relaxed text-[#6b4408]">
                        {recipe.safety}
                      </p>
                    </div>
                  </div>
                </div>
              </details>
            );
          })}
        </div>
      </section>

      <section id="keamanan" className="mt-10 scroll-mt-24">
        <div className="surface-dark rounded-[24px] p-5 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="eyebrow on-dark">Keamanan</p>
              <h2 className="display-md mt-2 text-paper-2">
                Bantu, tanpa mengambil alih.
              </h2>
              <p className="mt-2 max-w-lg text-[0.82rem] leading-relaxed text-sage">
                Kepercayaan lebih penting daripada kecepatan. Pendamping tidak
                pernah memegang kendali akun atau uang pemilik usaha.
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                <span className="chip border-paper-2/20 bg-paper-2/10 text-paper-2">
                  <EyeOff className="h-3 w-3" aria-hidden="true" />
                  Tanpa OTP
                </span>
                <span className="chip border-paper-2/20 bg-paper-2/10 text-paper-2">
                  <KeyRound className="h-3 w-3" aria-hidden="true" />
                  Tanpa kata sandi
                </span>
                <span className="chip border-paper-2/20 bg-paper-2/10 text-paper-2">
                  <ShieldCheck className="h-3 w-3" aria-hidden="true" />
                  Persetujuan pemilik
                </span>
              </div>
            </div>
            <ul className="grid gap-2">
              {[
                {
                  title: "Pemilik yang menekan tombol",
                  text: "Pendamping menjelaskan, pemilik yang menyetujui. Jangan pernah meminta OTP, PIN, atau kata sandi.",
                },
                {
                  title: "Bertemu di tempat usaha",
                  text: "Utamakan pertemuan di ruang publik atau tempat usaha yang ramai. Kabari jam kunjungan.",
                },
                {
                  title: "Sensor data sensitif",
                  text: "Jangan mengunggah KTP, nomor rekening, data pelanggan, atau isi chat pribadi sebagai bukti.",
                },
                {
                  title: "Bukti bisa diperiksa",
                  text: "Verifikator memeriksa tautan dan foto. Jika ada yang tidak jelas, minta perbaikan, jangan asal setujui.",
                },
              ].map((item, index) => (
                <li
                  key={item.title}
                  className="flex gap-2.5 rounded-xl border border-paper-2/15 bg-paper-2/10 p-3"
                >
                  <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-marigold text-[0.56rem] font-extrabold text-ink">
                    {index + 1}
                  </span>
                  <span>
                    <span className="block text-[0.74rem] font-extrabold text-paper-2">
                      {item.title}
                    </span>
                    <span className="mt-0.5 block text-[0.66rem] leading-relaxed text-sage">
                      {item.text}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="aksesibilitas" className="mt-10 scroll-mt-24">
        <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
          <div className="card p-5">
            <p className="eyebrow">Aksesibilitas</p>
            <h2 className="display-md mt-2">
              Nyaman untuk mata yang lelah.
            </h2>
            <p className="mt-2 text-[0.78rem] leading-relaxed text-muted">
              Banyak pemilik usaha membaca layar sambil berdiri di warung.
              Prototipe ini memakai teks besar, tombol tinggi, kontras kuat, dan
              fokus keyboard yang jelas.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                className="btn btn-sm"
                aria-pressed={largeText}
                onClick={() => setLargeText(!largeText)}
              >
                <Accessibility className="h-3.5 w-3.5" aria-hidden="true" />
                {largeText ? "Kembalikan teks normal" : "Aktifkan mode pendamping"}
              </button>
              <Link to="/ajukan" className="btn btn-sm">
                Coba formulir UMKM
              </Link>
            </div>
            <p className="mt-3 text-[0.62rem] leading-relaxed text-muted">
              Kami menargetkan prinsip WCAG AA, tetapi audit aksesibilitas
              eksternal belum dilakukan. Hasil uji akan dicantumkan apa adanya
              setelah tersedia.
            </p>
          </div>
          <div className="card p-5">
            <p className="eyebrow">Prinsip desain</p>
            <ul className="mt-3 grid gap-2.5">
              {[
                "Satu aksi utama per layar.",
                "Teks pendamping, bukan istilah teknis.",
                "Status selalu terlihat dan dijelaskan.",
                "Bukti bisa dibuka, bukan sekadar dicentang.",
                "Kesalahan dijelaskan dengan cara memperbaikinya.",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-[0.72rem] leading-relaxed text-muted"
                >
                  <CheckCircle2
                    className="mt-0.5 h-3.5 w-3.5 flex-none text-forest"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="tanya" className="mt-10 scroll-mt-24">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="eyebrow">Pertanyaan umum</p>
            <h2 className="display-md mt-2">Hal yang sering ditanyakan.</h2>
          </div>
          <MessageCircle
            className="h-6 w-6 text-forest"
            aria-hidden="true"
          />
        </div>
        <div className="mt-3 grid gap-2">
          {faqs.map((faq, index) => (
            <details key={faq.question} className="group card">
              <summary className="flex cursor-pointer list-none items-center gap-3 p-4 [&::-webkit-details-marker]:hidden">
                <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-sage text-[0.58rem] font-extrabold text-forest">
                  {index + 1}
                </span>
                <span className="flex-1 text-[0.78rem] font-extrabold">
                  {faq.question}
                </span>
                <ChevronDown
                  className="h-4 w-4 flex-none text-muted transition-transform group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="border-t border-line/70 px-4 pb-4 pt-3 text-[0.72rem] leading-relaxed text-muted">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-10 card-strong p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="eyebrow">Siap mencoba?</p>
            <h2 className="display-md mt-2">
              Mulai dari satu tugas yang paling dekat.
            </h2>
            <p className="mt-2 max-w-xl text-[0.76rem] leading-relaxed text-muted">
              Pilih peranmu. Prototipe akan menyimpan perubahan di perangkat
              ini, jadi kamu bisa kembali dan melanjutkan alur yang sama.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => goAs("umkm")}
            >
              Saya pemilik usaha
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => goAs("volunteer")}
            >
              Saya pendamping
            </button>
          </div>
        </div>
      </section>

      <div className="mt-6 rounded-2xl border border-dashed border-line bg-paper-2/60 p-4 text-center">
        <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.14em] text-muted">
          Catatan prototipe
        </p>
        <p className="mx-auto mt-1 max-w-2xl text-[0.68rem] leading-relaxed text-muted">
          Panduan ini menjelaskan cara kerja prototipe, bukan janji layanan
          nyata. Semua data adalah data demo. Belum ada wawancara pengguna,
          pengujian SUS, atau audit Lighthouse yang diklaim di halaman ini.
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-1.5">
          <CategoryChip category="maps" />
          <CategoryChip category="qris" />
          <CategoryChip category="photo" />
          <CategoryChip category="bookkeeping" />
        </div>
      </div>
    </div>
  );
}
