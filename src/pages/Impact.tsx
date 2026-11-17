import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Camera,
  CheckCircle2,
  Clock3,
  FileCheck2,
  HandHeart,
  MapPin,
  QrCode,
  Search,
  Store,
  Users,
  BookOpen,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Avatar } from "../components/Avatar";
import { CategoryChip, CategoryIcon } from "../components/CategoryIcon";
import { SectionHeading } from "../components/SectionHeading";
import {
  AREA_LIST,
  CATEGORY_LIST,
  CATEGORY_META,
  PEOPLE,
  formatDate,
} from "../lib/data";
import { useAppStore } from "../lib/store";
import {
  getImpactStats,
  getOpen,
} from "../lib/utils";
import { usePageTitle } from "../lib/usePageTitle";

const categoryIcons = {
  maps: MapPin,
  qris: QrCode,
  photo: Camera,
  bookkeeping: BookOpen,
};

const beforeAfter: Record<
  keyof typeof CATEGORY_META,
  { before: string; after: string }
> = {
  maps: {
    before: "Tidak muncul saat orang mencari di sekitar.",
    after: "Punya pin, jam buka, foto, dan tautan yang bisa dibagikan.",
  },
  qris: {
    before: "Pelanggan hanya bisa membayar tunai.",
    after: "QRIS terpasang dan sudah diuji dengan transaksi kecil.",
  },
  photo: {
    before: "Foto jualan seadanya, sulit dilihat di layar kecil.",
    after: "Tiga foto rapi siap dipakai untuk katalog WhatsApp.",
  },
  bookkeeping: {
    before: "Catatan pemasukan tercecer di buku dan ingatan.",
    after: "Buku kas sederhana dengan kebiasaan rekap harian.",
  },
};

export default function Impact() {
  usePageTitle("Dampak");
  const navigate = useNavigate();
  const requests = useAppStore((state) => state.requests);
  const setRole = useAppStore((state) => state.setRole);
  const stats = getImpactStats(requests);
  const open = getOpen(requests);
  const hours = (stats.minutes / 60).toLocaleString("id-ID", {
    maximumFractionDigits: 1,
  });
  const maxCategory = Math.max(1, ...Object.values(stats.categories));
  const maxArea = Math.max(1, ...Object.values(stats.areaCounts));
  const volunteerCounts = stats.verified.reduce<Record<string, number>>(
    (accumulator, request) => {
      if (request.volunteerId) {
        accumulator[request.volunteerId] =
          (accumulator[request.volunteerId] ?? 0) + 1;
      }
      return accumulator;
    },
    {},
  );
  const topVolunteers = Object.entries(volunteerCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);
  const feedback = useAppStore((state) => state.feedback);
  const averageRating =
    feedback.length > 0
      ? feedback.reduce((sum, item) => sum + item.rating, 0) / feedback.length
      : null;

  return (
    <div className="container-page py-8 sm:py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Dampak</p>
          <h1 className="display-lg mt-2">
            Kecil, nyata,{" "}
            <span className="serif-italic text-forest">terverifikasi.</span>
          </h1>
          <p className="lede mt-2">
            Setiap angka di halaman ini berasal dari tugas yang sudah diperiksa
            buktinya. Bukan jumlah klik, bukan janji pendaftaran.
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <span className="chip chip-forest">
            <BadgeCheck className="h-3 w-3" aria-hidden="true" />
            {verifiedCountLabel(stats.verified.length)}
          </span>
          <span className="chip chip-marigold">Data demo</span>
        </div>
      </div>

      <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            value: stats.umkm,
            label: "Warung terbantu",
            note: "pemilik usaha unik",
            icon: Store,
            tone: "text-forest",
          },
          {
            value: stats.verified.length,
            label: "Tugas terverifikasi",
            note: "bukti sudah diperiksa",
            icon: FileCheck2,
            tone: "text-forest",
          },
          {
            value: `${hours} jam`,
            label: "Pendampingan",
            note: "waktu tugas yang selesai",
            icon: Clock3,
            tone: "text-clay",
          },
          {
            value: stats.volunteers,
            label: "Pendamping aktif",
            note: "mahasiswa yang berkontribusi",
            icon: Users,
            tone: "text-forest",
          },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="impact-card">
              <div className="flex items-center justify-between gap-2">
                <Icon className={`h-4 w-4 ${item.tone}`} aria-hidden="true" />
                <span className="text-[0.5rem] font-extrabold uppercase tracking-[0.12em] text-muted">
                  {item.note}
                </span>
              </div>
              <p className={`display-md mt-3 ${item.tone}`}>{item.value}</p>
              <p className="mt-0.5 text-[0.66rem] font-extrabold">
                {item.label}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-line bg-paper-2/70 px-3 py-2">
        <p className="text-[0.62rem] font-semibold text-muted">
          Data demo di perangkat ini. Angka berubah saat kamu menyelesaikan
          tugas.
        </p>
        <div className="flex gap-1.5">
          <span className="chip">{open.length} permintaan terbuka</span>
          {averageRating !== null && (
            <span className="chip chip-forest">
              ★ {averageRating.toFixed(1)}/5 masukan
            </span>
          )}
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="card p-4 sm:p-5" aria-labelledby="kategori-title">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="eyebrow">Sebaran bantuan</p>
              <h2 id="kategori-title" className="display-md mt-2">
                Kebutuhan yang paling sering muncul.
              </h2>
            </div>
            <Link
              to="/panduan"
              className="text-[0.62rem] font-extrabold text-forest hover:underline"
            >
              Lihat resep
            </Link>
          </div>
          <div className="mt-5 grid gap-4">
            {CATEGORY_LIST.map((category) => {
              const count = stats.categories[category] ?? 0;
              const meta = CATEGORY_META[category];
              const Icon = categoryIcons[category];
              return (
                <div key={category}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-1.5 text-[0.72rem] font-extrabold">
                      <span
                        className="flex h-6 w-6 items-center justify-center rounded-md"
                        style={{ background: meta.softColor, color: meta.inkColor }}
                      >
                        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                      {meta.shortLabel}
                    </span>
                    <span className="text-[0.64rem] font-bold text-muted">
                      {count} tugas
                    </span>
                  </div>
                  <div className="bar-track mt-1.5">
                    <div
                      className="bar-fill"
                      style={{
                        width: `${(count / maxCategory) * 100}%`,
                        background: meta.color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="card p-4 sm:p-5" aria-labelledby="area-title">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="eyebrow">Jangkauan</p>
              <h2 id="area-title" className="display-md mt-2">
                Dampak yang tinggal di sekitar.
              </h2>
            </div>
            <MapPin className="h-5 w-5 text-forest" aria-hidden="true" />
          </div>
          <div className="mt-4 grid gap-2">
            {AREA_LIST.map((area) => {
              const count = stats.areaCounts[area] ?? 0;
              return (
                <div
                  key={area}
                  className="rounded-xl border border-line/80 bg-paper p-2.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[0.7rem] font-extrabold">{area}</p>
                    <span className="text-[0.58rem] text-muted">{count} tugas</span>
                  </div>
                  <div className="bar-track mt-1">
                    <div
                      className="bar-fill"
                      style={{ width: `${(count / maxArea) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-[0.6rem] leading-relaxed text-muted">
            Satu area bisa punya banyak warung. Fokus pilot: kedekatan geografis,
            bukan jumlah sebanyak mungkin.
          </p>
        </section>
      </div>

      <section className="mt-8" aria-labelledby="bukti-terbaru">
        <SectionHeading
          eyebrow="Bukti terbaru"
          title={
            <>
              Setiap tugas punya{" "}
              <span className="serif-italic text-forest">halaman bukti.</span>
            </>
          }
          lede="Buka salah satu bukti untuk melihat usaha, pendamping, langkah yang dikerjakan, dan verifikatornya."
          action={
            <Link to="/cek" className="btn btn-sm">
              Cek kode bukti
              <Search className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          }
        />
        {stats.verified.length > 0 ? (
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {stats.verified.slice(0, 6).map((request) => {
              const volunteer = request.volunteerId
                ? PEOPLE[request.volunteerId]
                : undefined;
              return (
                <Link
                  key={request.id}
                  to={`/bukti/${request.code}`}
                  className="card card-hover group p-4"
                >
                  <div className="flex items-start justify-between gap-2">
                    <CategoryChip category={request.category} />
                    <span className="inline-flex items-center gap-1 text-[0.58rem] font-extrabold text-forest">
                      <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
                      Terverifikasi
                    </span>
                  </div>
                  <h3 className="mt-3 text-[0.92rem] font-extrabold group-hover:underline">
                    {request.businessName}
                  </h3>
                  <p className="mt-0.5 text-[0.64rem] text-muted">
                    {request.area} · {request.code}
                  </p>
                  <div className="mt-3 flex items-center justify-between gap-2 border-t border-line/70 pt-2.5">
                    <div className="flex items-center gap-1.5">
                      <Avatar person={volunteer} size="sm" />
                      <span className="text-[0.62rem] font-bold">
                        {volunteer?.name ?? request.volunteerName}
                      </span>
                    </div>
                    <span className="text-[0.56rem] text-muted">
                      {request.completedAt ? formatDate(request.completedAt) : ""}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="empty-state mt-4">
            <FileCheck2 className="h-8 w-8 text-muted" aria-hidden="true" />
            <h3 className="text-[0.9rem] font-extrabold">Belum ada bukti</h3>
            <p className="max-w-xs text-[0.7rem] text-muted">
              Selesaikan satu tugas dan setujui buktinya untuk melihat dampak di
              sini.
            </p>
          </div>
        )}
      </section>

      <section
        className="mt-8 surface-dark rounded-[24px] p-5 sm:p-8"
        aria-labelledby="perubahan-title"
      >
        <div className="grid items-center gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow on-dark">Yang berubah</p>
            <h2 id="perubahan-title" className="display-lg mt-3 text-paper-2">
              Bukan angka kosong.{" "}
              <span className="serif-italic text-marigold">
                Perubahan yang bisa dibuka.
              </span>
            </h2>
            <p className="mt-3 max-w-lg text-[0.9rem] leading-relaxed text-sage">
              Kami menghitung dampak dari bukti yang sudah diverifikasi, bukan
              dari formulir yang dikirim. Setiap tugas punya kode yang bisa
              dicek publik.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link to="/jelajah" className="btn btn-accent btn-sm">
                Bantu satu tugas
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              <Link
                to="/cek"
                className="btn btn-sm border-paper-2/60 bg-transparent text-paper-2 hover:bg-paper-2/10"
              >
                Cek keaslian
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            {stats.verified.slice(0, 2).map((request) => {
              const change = beforeAfter[request.category];
              return (
                <div
                  key={request.id}
                  className="rounded-2xl border border-paper-2/20 bg-paper-2 p-3.5 text-ink"
                >
                  <div className="flex items-center justify-between gap-2">
                    <CategoryChip category={request.category} />
                    <span className="text-[0.54rem] font-extrabold text-muted">
                      {request.area}
                    </span>
                  </div>
                  <p className="mt-3 text-[0.8rem] font-extrabold">
                    {request.businessName}
                  </p>
                  <div className="mt-2 grid gap-2">
                    <div className="rounded-lg bg-paper p-2">
                      <p className="text-[0.5rem] font-extrabold uppercase tracking-[0.12em] text-muted">
                        Sebelum
                      </p>
                      <p className="mt-0.5 text-[0.64rem] leading-relaxed text-muted">
                        {change.before}
                      </p>
                    </div>
                    <div className="rounded-lg bg-sage-2 p-2">
                      <p className="text-[0.5rem] font-extrabold uppercase tracking-[0.12em] text-forest">
                        Sesudah
                      </p>
                      <p className="mt-0.5 text-[0.64rem] leading-relaxed">
                        {change.after}
                      </p>
                    </div>
                  </div>
                  <Link
                    to={`/bukti/${request.code}`}
                    className="mt-3 inline-flex items-center gap-1 text-[0.62rem] font-extrabold text-forest hover:underline"
                  >
                    Buka bukti {request.code}
                    <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                  </Link>
                </div>
              );
            })}
            {stats.verified.length === 0 && (
              <div className="rounded-2xl border border-paper-2/20 bg-paper-2 p-4 text-ink">
                <CategoryIcon category="maps" size={20} />
                <p className="mt-2 text-[0.8rem] font-extrabold">
                  Belum ada bukti terverifikasi
                </p>
                <p className="mt-1 text-[0.66rem] leading-relaxed text-muted">
                  Setelah verifikator menyetujui satu tugas, perubahan akan
                  tampil di sini.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {topVolunteers.length > 0 && (
        <section className="mt-8" aria-labelledby="pendamping-title">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="eyebrow">Orang di baliknya</p>
              <h2 id="pendamping-title" className="display-md mt-2">
                Pendamping yang sudah menyelesaikan tugas.
              </h2>
            </div>
            <Link to="/paspor" className="text-[0.62rem] font-extrabold text-forest hover:underline">
              Lihat paspor
            </Link>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {topVolunteers.map(([volunteerId, count]) => {
              const person = PEOPLE[volunteerId];
              return (
                <div key={volunteerId} className="card flex items-center gap-3 p-3">
                  <Avatar person={person} size="lg" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[0.78rem] font-extrabold">
                      {person?.name ?? volunteerId}
                    </p>
                    <p className="truncate text-[0.6rem] text-muted">
                      {person?.campus ?? "Pendamping"}
                    </p>
                  </div>
                  <span className="rounded-full bg-sage px-2 py-1 text-[0.6rem] font-extrabold text-forest-dark">
                    {count} tugas
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      )}

      <section className="mt-8 flex flex-col items-center gap-2 rounded-2xl border border-dashed border-line bg-paper-2/60 p-5 text-center">
        <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.14em] text-muted">
          Cara kami menghitung
        </p>
        <p className="max-w-2xl text-[0.7rem] leading-relaxed text-muted">
          Hanya permintaan berstatus <strong>terverifikasi</strong> yang masuk
          hitungan. Jam pendampingan diambil dari estimasi resep, bukan timer
          pelacakan. Data di halaman ini adalah data demo dan disimpan di
          perangkat ini.
        </p>
        <div className="mt-1 flex flex-wrap justify-center gap-1.5">
          <span className="chip">
            <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
            Berbasis bukti
          </span>
          <span className="chip">
            <HandHeart className="h-3 w-3" aria-hidden="true" />
            Tanpa pelacakan
          </span>
          <span className="chip">
            <BadgeCheck className="h-3 w-3" aria-hidden="true" />
            Bisa dicek publik
          </span>
        </div>
      </section>

      <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            setRole("umkm");
            navigate("/ajukan");
          }}
        >
          Buat permintaan bantuan
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
        <Link to="/jelajah" className="btn">
          Jadi pendamping
          <HandHeart className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

function verifiedCountLabel(count: number): string {
  return `${count} bukti terverifikasi`;
}
