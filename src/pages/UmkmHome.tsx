import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  HandHeart,
  MapPin,
  MessageSquareText,
  Plus,
  Sparkles,
  Star,
  Store,
  UserRound,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "../components/Avatar";
import { CategoryIcon } from "../components/CategoryIcon";
import { MiniRequestRow } from "../components/RequestCard";
import { RequestStepper } from "../components/RequestStepper";
import { StatusBadge } from "../components/StatusBadge";
import {
  CATEGORY_META,
  PEOPLE,
  USER_FOR_ROLE,
  formatDate,
} from "../lib/data";
import { useAppStore } from "../lib/store";
import type { HelpRequest } from "../lib/types";
import { STATUS_META, cn, getOpen } from "../lib/utils";
import { usePageTitle } from "../lib/usePageTitle";

function FeedbackForm({ request }: { request: HelpRequest }) {
  const addFeedback = useAppStore((state) => state.addFeedback);
  const feedback = useAppStore((state) =>
    state.feedback.find((item) => item.requestId === request.id),
  );
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  if (feedback) {
    return (
      <div className="rounded-xl border border-forest/20 bg-sage-2 p-3">
        <p className="flex items-center gap-1.5 text-[0.72rem] font-extrabold text-forest-dark">
          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
          Masukan sudah tersimpan
        </p>
        <p className="mt-1 text-[0.68rem] text-muted">
          {feedback.rating}/5 · {feedback.comment || "Tanpa catatan tambahan."}
        </p>
      </div>
    );
  }

  return (
    <form
      className="rounded-xl border border-line bg-paper p-3"
      onSubmit={(event) => {
        event.preventDefault();
        if (!rating) return;
        addFeedback(request.id, rating, comment, request.ownerName);
      }}
    >
      <p className="flex items-center gap-1.5 text-[0.72rem] font-extrabold">
        <MessageSquareText className="h-4 w-4 text-forest" aria-hidden="true" />
        Bagaimana pengalaman Anda?
      </p>
      <div className="mt-2 flex items-center gap-1" role="group" aria-label="Nilai pengalaman">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-full border transition-colors",
              value <= rating
                ? "border-marigold bg-marigold text-ink"
                : "border-line bg-paper-2 text-muted hover:border-marigold",
            )}
            aria-label={`Beri ${value} dari 5 bintang`}
            aria-pressed={value <= rating}
            onClick={() => setRating(value)}
          >
            <Star className="h-4 w-4" aria-hidden="true" />
          </button>
        ))}
      </div>
      <label htmlFor={`feedback-${request.id}`} className="mt-2 block text-[0.62rem] font-bold text-muted">
        Catatan singkat (opsional)
      </label>
      <textarea
        id={`feedback-${request.id}`}
        className="input mt-1 min-h-16 text-[0.72rem]"
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        placeholder="Contoh: penjelasannya mudah diikuti."
        maxLength={180}
      />
      <button type="submit" className="btn btn-sm mt-2" disabled={!rating}>
        Kirim masukan
      </button>
    </form>
  );
}

function ActiveRequestCard({ request }: { request: HelpRequest }) {
  const meta = CATEGORY_META[request.category];
  const volunteer = request.volunteerId ? PEOPLE[request.volunteerId] : undefined;
  const isVerified = request.status === "verified";
  const status = STATUS_META[request.status];

  return (
    <article className="card-strong overflow-hidden">
      <div className="h-2" style={{ background: meta.color }} aria-hidden="true" />
      <div className="p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[0.55rem] font-extrabold uppercase tracking-[0.16em] text-muted">
              {request.code} · {formatDate(request.createdAt)}
            </p>
            <h2 className="mt-1 flex items-center gap-2 text-[1.08rem] font-extrabold">
              <CategoryIcon category={request.category} size={18} />
              {meta.label}
            </h2>
            <p className="mt-0.5 text-[0.72rem] text-muted">
              {request.businessName} · {request.area} · {request.landmark}
            </p>
          </div>
          <StatusBadge status={request.status} />
        </div>

        <div className="mt-4 rounded-xl border border-line bg-paper p-3">
          <RequestStepper status={request.status} />
        </div>

        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          <div className="rounded-xl border border-line/80 bg-paper p-2.5">
            <p className="text-[0.52rem] font-extrabold uppercase tracking-[0.12em] text-muted">
              Jadwal
            </p>
            <p className="mt-0.5 flex items-center gap-1 text-[0.72rem] font-bold">
              <CalendarDays className="h-3 w-3 text-forest" aria-hidden="true" />
              {request.schedule}
            </p>
          </div>
          <div className="rounded-xl border border-line/80 bg-paper p-2.5">
            <p className="text-[0.52rem] font-extrabold uppercase tracking-[0.12em] text-muted">
              Durasi
            </p>
            <p className="mt-0.5 flex items-center gap-1 text-[0.72rem] font-bold">
              <Clock3 className="h-3 w-3 text-forest" aria-hidden="true" />
              {meta.duration} menit
            </p>
          </div>
          <div className="rounded-xl border border-line/80 bg-paper p-2.5">
            <p className="text-[0.52rem] font-extrabold uppercase tracking-[0.12em] text-muted">
              Pendamping
            </p>
            <p className="mt-0.5 flex items-center gap-1 text-[0.72rem] font-bold">
              <UserRound className="h-3 w-3 text-forest" aria-hidden="true" />
              {volunteer?.name ?? "Belum ada"}
            </p>
          </div>
        </div>

        <p className="mt-3 rounded-xl bg-sage-2/70 px-3 py-2 text-[0.7rem] leading-relaxed text-muted">
          {status.description}
          {request.verification?.status === "returned" &&
            request.verification.note && (
              <span className="mt-1 block font-semibold text-[#7c2f1e]">
                Catatan: {request.verification.note}
              </span>
            )}
        </p>

        {volunteer && !isVerified && (
          <div className="mt-3 flex items-center gap-2 rounded-xl border border-line bg-paper-2 p-2.5">
            <Avatar person={volunteer} size="md" />
            <div className="min-w-0 flex-1">
              <p className="text-[0.72rem] font-extrabold">{volunteer.name}</p>
              <p className="text-[0.62rem] text-muted">
                {volunteer.campus} · siap mendampingi
              </p>
            </div>
            <span className="chip chip-forest">Kontak dibuka</span>
          </div>
        )}

        {isVerified && request.completedAt && (
          <div className="mt-3 rounded-xl border border-forest/20 bg-sage-2 p-3">
            <p className="flex items-center gap-1.5 text-[0.72rem] font-extrabold text-forest-dark">
              <BadgeCheck className="h-4 w-4" aria-hidden="true" />
              Selesai pada {formatDate(request.completedAt)}
            </p>
            <p className="mt-0.5 text-[0.66rem] text-muted">
              Bukti sudah diverifikasi oleh {request.verification?.by ?? "koordinator"}.
            </p>
            <Link to={`/bukti/${request.code}`} className="btn btn-sm mt-2">
              Lihat bukti terverifikasi
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        )}

        {isVerified && <div className="mt-3"><FeedbackForm request={request} /></div>}

        <div className="mt-4 flex flex-wrap gap-2">
          <Link to={`/tugas/${request.id}`} className="btn btn-sm">
            Lihat detail tugas
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          {!isVerified && (
            <span className="chip chip-marigold">
              <Sparkles className="h-3 w-3" aria-hidden="true" />
              Coba alur: ganti ke Relawan
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default function UmkmHome() {
  usePageTitle("Beranda UMKM");
  const role = useAppStore((state) => state.role);
  const setRole = useAppStore((state) => state.setRole);
  const requests = useAppStore((state) => state.requests);
  const owner = PEOPLE[USER_FOR_ROLE.umkm];
  const navigate = useNavigate();
  const mine = requests
    .filter((request) => request.ownerId === owner.id)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  const active = mine.filter((request) => request.status !== "verified");
  const done = mine.filter((request) => request.status === "verified");
  const openNearby = getOpen(requests)
    .filter((request) => request.area === owner.area)
    .slice(0, 3);

  useEffect(() => {
    if (role !== "umkm") setRole("umkm");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container-page py-8 sm:py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Avatar person={owner} size="xl" />
          <div>
            <p className="eyebrow">Ruang UMKM</p>
            <h1 className="display-md mt-1">Halo, {owner.name.split(" ")[0]}.</h1>
            <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.72rem] text-muted">
              <span className="inline-flex items-center gap-1">
                <Store className="h-3.5 w-3.5" aria-hidden="true" />
                {owner.business}
              </span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                {owner.area}
              </span>
              <span className="chip">Sejak {owner.since}</span>
            </p>
          </div>
        </div>
        <Link to="/ajukan" className="btn btn-primary">
          <Plus className="h-4 w-4" aria-hidden="true" />
          Buat permintaan
        </Link>
      </div>

      <div className="mt-6 grid gap-2 sm:grid-cols-3">
        <div className="impact-card">
          <p className="text-[0.56rem] font-extrabold uppercase tracking-[0.12em] text-muted">
            Permintaan aktif
          </p>
          <p className="display-md mt-1 text-forest">{active.length}</p>
        </div>
        <div className="impact-card">
          <p className="text-[0.56rem] font-extrabold uppercase tracking-[0.12em] text-muted">
            Tugas selesai
          </p>
          <p className="display-md mt-1 text-forest">{done.length}</p>
        </div>
        <div className="impact-card">
          <p className="text-[0.56rem] font-extrabold uppercase tracking-[0.12em] text-muted">
            Area
          </p>
          <p className="display-md mt-1 text-forest">{owner.area}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <div className="grid gap-4">
          {mine.length === 0 ? (
            <div className="card-strong p-5 sm:p-7">
              <div className="empty-state border-0 bg-transparent p-0">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-ink bg-marigold-soft text-ink shadow-[3px_3px_0_#17251f]">
                  <HandHeart className="h-7 w-7" aria-hidden="true" />
                </span>
                <h2 className="display-md mt-2">Mulai dari satu kebutuhan.</h2>
                <p className="max-w-md text-sm leading-relaxed text-muted">
                  Belum ada permintaan. Pilih satu hal yang paling mengganggu
                  usaha Anda—mungkin warung belum muncul di Google Maps.
                </p>
                <Link to="/ajukan" className="btn btn-primary mt-2">
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  Buat permintaan pertama
                </Link>
              </div>
              <div className="mt-4 grid gap-2 rounded-xl border border-line bg-paper p-3 sm:grid-cols-3">
                {[
                  "Pilih kebutuhan",
                  "Tunggu pendamping",
                  "Selesaikan & buktikan",
                ].map((text, index) => (
                  <div key={text} className="flex items-center gap-2">
                    <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-sage text-[0.56rem] font-extrabold text-forest">
                      {index + 1}
                    </span>
                    <span className="text-[0.68rem] font-bold">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            active.map((request) => (
              <ActiveRequestCard key={request.id} request={request} />
            ))
          )}

          {done.length > 0 && (
            <section aria-labelledby="riwayat-title">
              <h2 id="riwayat-title" className="text-[0.62rem] font-extrabold uppercase tracking-[0.14em] text-muted">
                Riwayat selesai
              </h2>
              <div className="mt-2 grid gap-2">
                {done.map((request) => (
                  <div key={request.id} className="card flex flex-wrap items-center justify-between gap-3 p-3">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-sage text-forest">
                        <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-[0.76rem] font-extrabold">
                          {CATEGORY_META[request.category].label}
                        </p>
                        <p className="text-[0.62rem] text-muted">
                          {request.completedAt ? formatDate(request.completedAt) : ""} ·{" "}
                          {request.code}
                        </p>
                      </div>
                    </div>
                    <Link to={`/bukti/${request.code}`} className="btn btn-ghost btn-sm">
                      Lihat bukti
                      <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          )}

          {active.length > 0 && (
            <div className="rounded-xl border border-dashed border-forest/30 bg-sage-2/60 p-3">
              <p className="text-[0.68rem] font-bold text-forest-dark">
                Untuk juri / demo: ingin melihat sisi pendamping?
              </p>
              <p className="mt-0.5 text-[0.64rem] text-muted">
                Ganti peran lewat tombol Relawan di atas, lalu klaim permintaan
                ini dari Peta Rangkul.
              </p>
              <button
                type="button"
                className="btn btn-sm mt-2"
                onClick={() => {
                  setRole("volunteer");
                  navigate("/jelajah");
                }}
              >
                <HandHeart className="h-3.5 w-3.5" aria-hidden="true" />
                Lihat sebagai relawan
              </button>
            </div>
          )}
        </div>

        <aside className="grid gap-3 lg:sticky lg:top-24">
          <div className="card p-4">
            <p className="eyebrow">Di sekitar Anda</p>
            <h2 className="mt-2 text-[0.9rem] font-extrabold">
              {openNearby.length} warung lain butuh bantuan
            </h2>
            <p className="mt-1 text-[0.68rem] leading-relaxed text-muted">
              Ini data demo. Permintaan asli akan tampil di area yang sama.
            </p>
            <div className="mt-2">
              {openNearby.length > 0 ? (
                openNearby.map((request) => (
                  <MiniRequestRow key={request.id} request={request} />
                ))
              ) : (
                <p className="rounded-lg bg-paper p-2 text-[0.66rem] text-muted">
                  Belum ada permintaan lain di area ini.
                </p>
              )}
            </div>
            <Link to="/jelajah" className="btn btn-ghost btn-sm mt-2 w-full">
              Buka peta bantuan
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="safe-note">
            <ShieldNote />
            <p>
              Pendamping tidak boleh meminta kata sandi, OTP, atau uang. Laporkan
              jika ada yang mencurigakan.
            </p>
          </div>

          <div className="card p-4">
            <p className="text-[0.6rem] font-extrabold uppercase tracking-[0.14em] text-muted">
              Yang perlu disiapkan
            </p>
            <ul className="mt-2 grid gap-1.5">
              {[
                "Nama usaha dan jam buka",
                "3 foto asli tempat/produk",
                "Nomor WhatsApp yang aktif",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-[0.7rem] text-muted">
                  <CheckCircle2 className="h-3.5 w-3.5 flex-none text-forest" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

function ShieldNote() {
  return <BadgeCheck className="mt-0.5 h-4 w-4 flex-none" aria-hidden="true" />;
}
