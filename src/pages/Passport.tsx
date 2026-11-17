import {
  ArrowRight,
  Award,
  BadgeCheck,
  BookOpen,
  Camera,
  CheckCircle2,
  Clock3,
  MapPin,
  QrCode,
  Share2,
  Sparkles,
  Store,
  Trophy,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "../components/Avatar";
import { CategoryChip } from "../components/CategoryIcon";
import { PassportCard } from "../components/PassportCard";
import {
  CATEGORY_LIST,
  CATEGORY_META,
  PEOPLE,
  USER_FOR_ROLE,
  formatDate,
} from "../lib/data";
import { useAppStore } from "../lib/store";
import type { Category } from "../lib/types";
import { cn, certificateUrl, getVolunteerStats } from "../lib/utils";
import { usePageTitle } from "../lib/usePageTitle";

const badgeIcons: Record<Category, typeof MapPin> = {
  maps: MapPin,
  qris: QrCode,
  photo: Camera,
  bookkeeping: BookOpen,
};

const badgeNames: Record<Category, string> = {
  maps: "Peta Pertama",
  qris: "Siap QRIS",
  photo: "Mata Kamera",
  bookkeeping: "Buku Rapi",
};

export default function Passport() {
  usePageTitle("Paspor Dampak");
  const role = useAppStore((state) => state.role);
  const setRole = useAppStore((state) => state.setRole);
  const requests = useAppStore((state) => state.requests);
  const notify = useAppStore((state) => state.notify);
  const [copied, setCopied] = useState(false);
  const volunteer = PEOPLE[USER_FOR_ROLE.volunteer];
  const stats = getVolunteerStats(requests, volunteer.id);
  const latest = stats.verified[0];
  const hours = (stats.minutes / 60).toLocaleString("id-ID", {
    maximumFractionDigits: 1,
  });
  const earned = new Set(stats.verified.map((request) => request.category));

  useEffect(() => {
    if (role !== "volunteer") setRole("volunteer");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const share = async () => {
    if (!latest) {
      notify("Selesaikan satu tugas dulu untuk membagikan paspor.", "info");
      return;
    }
    const url = certificateUrl(latest.code);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      notify("Tautan bukti disalin. Bagikan dengan aman.", "success");
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      notify(`Salin manual: ${url}`, "info");
    }
  };

  return (
    <div className="container-page py-8 sm:py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Paspor Dampak</p>
          <h1 className="display-lg mt-2">
            Bukan sekadar jam relawan.{" "}
            <span className="serif-italic text-forest">Bukti yang dibawa.</span>
          </h1>
          <p className="lede mt-2">
            Setiap tugas yang selesai meninggalkan bukti yang bisa dibuka
            publik. Kumpulkan paspor, tunjukkan keterampilan, dan ceritakan
            dampaknya dengan jujur.
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <span className="chip chip-forest">
            <BadgeCheck className="h-3 w-3" aria-hidden="true" />
            {stats.verified.length} bukti terverifikasi
          </span>
          <span className="chip chip-marigold">Data demo</span>
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
        <div className="grid gap-4">
          <section className="card-strong p-4 sm:p-5">
            <div className="flex flex-wrap items-center gap-3">
              <Avatar person={volunteer} size="xl" />
              <div className="min-w-0 flex-1">
                <p className="text-[0.58rem] font-extrabold uppercase tracking-[0.14em] text-muted">
                  Pendamping
                </p>
                <h2 className="display-md mt-1">{volunteer.name}</h2>
                <p className="mt-0.5 text-[0.72rem] font-semibold text-muted">
                  {volunteer.campus} · {volunteer.area}
                </p>
              </div>
              <button
                type="button"
                className="btn btn-sm"
                onClick={() => void share()}
              >
                {copied ? (
                  <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                ) : (
                  <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
                )}
                {copied ? "Tersalin" : "Bagikan bukti"}
              </button>
            </div>
            <p className="mt-3 rounded-xl bg-sage-2/70 p-3 text-[0.74rem] leading-relaxed text-muted">
              {volunteer.bio}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {[
                {
                  value: stats.verified.length,
                  label: "Tugas selesai",
                  icon: CheckCircle2,
                },
                {
                  value: `${hours}`,
                  label: "Jam dampak",
                  icon: Clock3,
                },
                {
                  value: stats.categories,
                  label: "Jenis bantuan",
                  icon: Sparkles,
                },
                {
                  value: stats.active.length,
                  label: "Sedang berjalan",
                  icon: ArrowRight,
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="rounded-xl border border-line/80 bg-paper px-2.5 py-2"
                  >
                    <Icon
                      className="h-3.5 w-3.5 text-forest"
                      aria-hidden="true"
                    />
                    <p className="mt-1 font-display text-[1.35rem] font-semibold leading-none">
                      {item.value}
                    </p>
                    <p className="mt-1 text-[0.56rem] font-extrabold uppercase tracking-[0.08em] text-muted">
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="card p-4 sm:p-5" aria-labelledby="lencana-title">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="eyebrow">Lencana keterampilan</p>
                <h2 id="lencana-title" className="display-md mt-2">
                  Empat cara membantu.
                </h2>
              </div>
              <Trophy className="h-6 w-6 text-marigold" aria-hidden="true" />
            </div>
            <p className="mt-2 text-[0.72rem] leading-relaxed text-muted">
              Lencana terbuka setelah ada bukti terverifikasi, bukan hanya
              setelah tugas diklaim. Ini menjaga agar portofolio tetap bermakna.
            </p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {CATEGORY_LIST.map((category) => {
                const Icon = badgeIcons[category];
                const unlocked = earned.has(category);
                return (
                  <div
                    key={category}
                    className={cn(
                      "flex items-center gap-3 rounded-xl border p-3",
                      unlocked
                        ? "border-forest/25 bg-sage-2"
                        : "border-line/70 bg-paper opacity-70",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-10 w-10 flex-none items-center justify-center rounded-full border",
                        unlocked
                          ? "border-forest bg-forest text-paper-2"
                          : "border-line bg-paper text-muted",
                      )}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[0.74rem] font-extrabold">
                        {badgeNames[category]}
                      </p>
                      <p className="text-[0.6rem] text-muted">
                        {unlocked
                          ? "Terbuka · bukti sudah terverifikasi"
                          : `Selesaikan tugas ${CATEGORY_META[category].shortLabel.toLowerCase()}`}
                      </p>
                    </div>
                    {unlocked ? (
                      <BadgeCheck
                        className="h-4 w-4 flex-none text-forest"
                        aria-hidden="true"
                      />
                    ) : (
                      <span className="text-[0.52rem] font-extrabold text-muted">
                        Terkunci
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          <section aria-labelledby="riwayat-title">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="eyebrow">Riwayat terverifikasi</p>
                <h2 id="riwayat-title" className="display-md mt-2">
                  Bukti yang bisa kamu tunjukkan.
                </h2>
              </div>
              <Link
                to="/jelajah"
                className="text-[0.62rem] font-extrabold text-forest hover:underline"
              >
                Cari tugas baru
              </Link>
            </div>

            {stats.verified.length > 0 ? (
              <div className="mt-3 grid gap-2">
                {stats.verified.map((request) => {
                  const owner = PEOPLE[request.ownerId];
                  return (
                    <article
                      key={request.id}
                      className="card p-3.5 sm:p-4"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="flex min-w-0 items-start gap-2.5">
                          <Avatar person={owner} size="md" />
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <CategoryChip category={request.category} />
                              <span className="chip">
                                {CATEGORY_META[request.category].duration} menit
                              </span>
                            </div>
                            <h3 className="mt-1.5 truncate text-[0.88rem] font-extrabold">
                              {request.businessName}
                            </h3>
                            <p className="text-[0.62rem] text-muted">
                              {request.area} · {request.code} ·{" "}
                              {request.completedAt
                                ? formatDate(request.completedAt)
                                : ""}
                            </p>
                          </div>
                        </div>
                        <Link
                          to={`/bukti/${request.code}`}
                          className="btn btn-sm"
                        >
                          Lihat bukti
                          <ArrowRight
                            className="h-3.5 w-3.5"
                            aria-hidden="true"
                          />
                        </Link>
                      </div>
                      <p className="mt-2 line-clamp-2 text-[0.68rem] leading-relaxed text-muted">
                        {request.evidence?.note}
                      </p>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="empty-state mt-3">
                <Award className="h-8 w-8 text-muted" aria-hidden="true" />
                <h3 className="text-[0.9rem] font-extrabold">
                  Paspor masih kosong
                </h3>
                <p className="max-w-xs text-[0.7rem] leading-relaxed text-muted">
                  Klaim satu tugas, kerjakan resepnya, lalu kirim bukti. Setelah
                  verifikator menyetujui, bukti pertama akan muncul di sini.
                </p>
                <Link to="/jelajah" className="btn btn-primary btn-sm">
                  Cari tugas pertama
                </Link>
              </div>
            )}
          </section>
        </div>

        <aside className="grid gap-3 lg:sticky lg:top-24">
          {latest ? (
            <PassportCard request={latest} volunteer={volunteer} />
          ) : (
            <div className="passport p-5">
              <div className="relative z-10">
                <p className="text-[0.58rem] font-extrabold uppercase tracking-[0.18em] text-forest">
                  Paspor Dampak
                </p>
                <p className="display-md mt-2">
                  Bukti pertama menunggu di peta.
                </p>
                <p className="mt-2 text-[0.72rem] leading-relaxed text-muted">
                  Setelah satu tugas terverifikasi, paspor akan terisi otomatis
                  dengan kode bukti, usaha, dan verifikator.
                </p>
                <Link to="/jelajah" className="btn btn-primary btn-sm mt-4">
                  Buka peta bantuan
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          )}

          <div className="card p-4">
            <p className="flex items-center gap-1.5 text-[0.62rem] font-extrabold">
              <Store className="h-3.5 w-3.5 text-forest" aria-hidden="true" />
              Cara membaca paspor
            </p>
            <ul className="mt-2 grid gap-1.5 text-[0.64rem] leading-relaxed text-muted">
              <li>· Hanya tugas terverifikasi yang dihitung.</li>
              <li>· Jam diambil dari estimasi resep, bukan pelacakan.</li>
              <li>· Kode bukti bisa dicek siapa pun lewat halaman publik.</li>
              <li>· Data demo, bukan sertifikat resmi atau klaim dampak nyata.</li>
            </ul>
          </div>

          {stats.active.length > 0 && (
            <div className="card p-4">
              <p className="text-[0.58rem] font-extrabold uppercase tracking-[0.14em] text-muted">
                Sedang berjalan
              </p>
              <div className="mt-2 grid gap-2">
                {stats.active.slice(0, 3).map((request) => (
                  <Link
                    key={request.id}
                    to={`/tugas/${request.id}`}
                    className="flex items-center gap-2 rounded-lg border border-line/70 bg-paper p-2 transition-colors hover:border-forest/40"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[0.68rem] font-extrabold">
                        {request.businessName}
                      </span>
                      <span className="block text-[0.56rem] text-muted">
                        {request.checklistDone.length} langkah selesai
                      </span>
                    </span>
                    <ArrowRight
                      className="h-3.5 w-3.5 flex-none text-forest"
                      aria-hidden="true"
                    />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      <div className="mt-8 rounded-2xl border border-dashed border-line bg-paper-2/60 p-4 text-center">
        <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.14em] text-muted">
          Catatan kejujuran
        </p>
        <p className="mx-auto mt-1 max-w-2xl text-[0.68rem] leading-relaxed text-muted">
          Paspor Dampak adalah alat portofolio prototipe, bukan sertifikat
          resmi. Semua nama, tugas, dan bukti di sini adalah data demo untuk
          menguji alur. Kami tidak menampilkan testimoni atau angka riset yang
          belum dikumpulkan.
        </p>
      </div>
    </div>
  );
}
