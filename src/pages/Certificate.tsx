import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Clock3,
  Copy,
  FileWarning,
  MapPin,
  Printer,
  Search,
  ShieldCheck,
  Store,
} from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CategoryChip } from "../components/CategoryIcon";
import { StatusBadge } from "../components/StatusBadge";
import {
  CATEGORY_META,
  PEOPLE,
  RECIPES,
  formatDate,
  normalizeCode,
} from "../lib/data";
import { useAppStore } from "../lib/store";
import { certificateUrl } from "../lib/utils";
import { usePageTitle } from "../lib/usePageTitle";

export default function Certificate() {
  const { code } = useParams<{ code: string }>();
  const requests = useAppStore((state) => state.requests);
  const notify = useAppStore((state) => state.notify);
  const [copied, setCopied] = useState(false);
  const normalized = normalizeCode(code ?? "");
  const request = requests.find(
    (item) => normalizeCode(item.code) === normalized,
  );
  usePageTitle(
    request?.status === "verified"
      ? `Bukti ${request.code}`
      : "Bukti pendampingan",
  );

  const volunteer = request?.volunteerId
    ? PEOPLE[request.volunteerId]
    : undefined;
  const owner = request ? PEOPLE[request.ownerId] : undefined;
  const meta = request ? CATEGORY_META[request.category] : null;
  const recipe = request ? RECIPES[request.category] : null;

  const copy = async () => {
    if (!request) return;
    try {
      await navigator.clipboard.writeText(certificateUrl(request.code));
      setCopied(true);
      notify("Tautan bukti disalin.", "success");
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      notify("Tautan tidak bisa disalin otomatis. Salin dari bilah alamat.", "info");
    }
  };

  if (!request || !meta || !recipe) {
    return (
      <div className="certificate-page container-page py-12 sm:py-16">
        <div className="mx-auto max-w-xl">
          <div className="empty-state border-solid bg-paper-2">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-clay-soft text-[#7c2f1e]">
              <FileWarning className="h-7 w-7" aria-hidden="true" />
            </span>
            <h1 className="display-md">Bukti tidak ditemukan</h1>
            <p className="max-w-sm text-[0.8rem] leading-relaxed text-muted">
              Kode <strong className="font-mono">{normalized || "—"}</strong>{" "}
              tidak ada di data demo ini. Periksa kembali kode yang tertera pada
              paspor pendamping.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Link to="/cek" className="btn btn-primary">
                <Search className="h-4 w-4" aria-hidden="true" />
                Cek kode bukti
              </Link>
              <Link to="/dampak" className="btn">
                Lihat dampak
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (request.status !== "verified") {
    return (
      <div className="certificate-page container-page py-12 sm:py-16">
        <div className="mx-auto max-w-2xl">
          <div className="card-strong p-5 sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="eyebrow">Bukti pendampingan</p>
                <h1 className="display-md mt-2">Bukti belum terbit.</h1>
              </div>
              <StatusBadge status={request.status} />
            </div>
            <p className="mt-3 text-[0.82rem] leading-relaxed text-muted">
              Halaman bukti publik hanya terbuka setelah verifikator menyetujui
              hasil tugas. Saat ini,{" "}
              <strong className="text-ink">{request.businessName}</strong> masih
              berada pada tahap{" "}
              <strong className="text-ink">
                {request.status === "submitted"
                  ? "menunggu verifikasi"
                  : request.status === "returned"
                    ? "perbaikan bukti"
                    : "pengerjaan"}
              </strong>
              .
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <CategoryChip category={request.category} />
              <span className="chip">{request.code}</span>
              <span className="chip">
                <MapPin className="h-3 w-3" aria-hidden="true" />
                {request.area}
              </span>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link to={`/tugas/${request.id}`} className="btn btn-primary">
                Buka tugas
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link to="/cek" className="btn">
                Cek kode lain
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="certificate-page container-page py-8 sm:py-12">
      <div className="no-print mx-auto mb-5 flex max-w-[920px] flex-wrap items-center justify-between gap-2">
        <Link
          to="/dampak"
          className="inline-flex items-center gap-1.5 text-[0.72rem] font-extrabold text-muted hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Kembali ke dampak
        </Link>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn btn-sm" onClick={copy}>
            {copied ? (
              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            {copied ? "Tersalin" : "Salin tautan"}
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => window.print()}
          >
            <Printer className="h-3.5 w-3.5" aria-hidden="true" />
            Cetak bukti
          </button>
        </div>
      </div>

      <article
        className="certificate-sheet"
        aria-labelledby="certificate-title"
      >
        <span className="certificate-watermark" aria-hidden="true">
          R
        </span>

        <header className="relative z-10 flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="flex items-center gap-2 text-[0.62rem] font-extrabold uppercase tracking-[0.2em] text-forest">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-[9px] border-2 border-ink bg-forest text-paper-2">
                <Store className="h-4 w-4" aria-hidden="true" />
              </span>
              RangkulUMKM
            </p>
            <p className="mt-2 text-[0.58rem] font-bold uppercase tracking-[0.16em] text-muted">
              Satu jam · satu tugas · satu bukti
            </p>
          </div>
          <div className="rounded-full border-2 border-forest/30 bg-sage-2 px-3 py-1.5 text-right">
            <p className="text-[0.5rem] font-extrabold uppercase tracking-[0.14em] text-muted">
              Status
            </p>
            <p className="flex items-center gap-1 text-[0.7rem] font-extrabold text-forest-dark">
              <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
              Terverifikasi
            </p>
          </div>
        </header>

        <div className="relative z-10 mt-10 sm:mt-14">
          <p className="text-[0.58rem] font-extrabold uppercase tracking-[0.2em] text-clay">
            Bukti Pendampingan Digital
          </p>
          <h1 id="certificate-title" className="display-lg mt-3 max-w-3xl">
            Satu tugas kecil,{" "}
            <span className="serif-italic text-forest">bukti yang bisa dibuka.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-[0.9rem] leading-relaxed text-muted">
            Diberikan kepada{" "}
            <strong className="text-ink">
              {volunteer?.name ?? request.volunteerName}
            </strong>{" "}
            dari{" "}
            <strong className="text-ink">
              {volunteer?.campus ?? "kampus pendamping"}
            </strong>{" "}
            atas penyelesaian tugas pendampingan digital untuk usaha mikro di
            lingkungan RangkulUMKM.
          </p>
        </div>

        <div className="relative z-10 mt-8 grid gap-3 rounded-2xl border-2 border-ink/15 bg-sage-2/60 p-4 sm:grid-cols-2 sm:p-5">
          <div>
            <p className="text-[0.52rem] font-extrabold uppercase tracking-[0.14em] text-muted">
              Usaha yang didampingi
            </p>
            <p className="mt-1 text-[1rem] font-extrabold leading-tight">
              {request.businessName}
            </p>
            <p className="mt-1 flex flex-wrap items-center gap-1.5 text-[0.68rem] text-muted">
              <MapPin className="h-3 w-3" aria-hidden="true" />
              {request.area} · {request.landmark}
            </p>
            <p className="mt-1 text-[0.68rem] text-muted">
              Pemilik: {owner?.name ?? request.ownerName}
            </p>
          </div>
          <div>
            <p className="text-[0.52rem] font-extrabold uppercase tracking-[0.14em] text-muted">
              Tugas yang diselesaikan
            </p>
            <p className="mt-1 text-[1rem] font-extrabold leading-tight">
              {meta.label}
            </p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              <CategoryChip category={request.category} />
              <span className="chip">
                <Clock3 className="h-3 w-3" aria-hidden="true" />
                {meta.duration} menit
              </span>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-5 grid gap-4 sm:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-[0.52rem] font-extrabold uppercase tracking-[0.14em] text-muted">
              Langkah yang dikerjakan
            </p>
            <ul className="mt-2 grid gap-1">
              {recipe.steps.map((step, index) => (
                <li
                  key={step.title}
                  className="flex items-start gap-1.5 text-[0.66rem] leading-snug"
                >
                  <CheckCircle2
                    className="mt-0.5 h-3 w-3 flex-none text-forest"
                    aria-hidden="true"
                  />
                  <span>
                    <strong>{index + 1}.</strong> {step.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[0.52rem] font-extrabold uppercase tracking-[0.14em] text-muted">
              Catatan bukti
            </p>
            <p className="mt-2 rounded-xl border border-line/80 bg-paper p-3 text-[0.7rem] leading-relaxed text-muted">
              {request.evidence?.note ?? "Bukti sudah diperiksa dan disetujui."}
            </p>
            <p className="mt-2 flex items-start gap-1.5 text-[0.6rem] leading-relaxed text-muted">
              <ShieldCheck
                className="mt-0.5 h-3.5 w-3.5 flex-none text-forest"
                aria-hidden="true"
              />
              Bukti diperiksa oleh verifikator. Data pribadi dan kredensial
              tidak ditampilkan di halaman publik.
            </p>
          </div>
        </div>

        <div className="relative z-10 mt-8 flex flex-wrap items-end justify-between gap-6 border-t border-line pt-5">
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
            <div>
              <p className="text-[0.5rem] font-extrabold uppercase tracking-[0.12em] text-muted">
                Kode bukti
              </p>
              <p className="mt-0.5 font-mono text-[0.74rem] font-extrabold">
                {request.code}
              </p>
            </div>
            <div>
              <p className="text-[0.5rem] font-extrabold uppercase tracking-[0.12em] text-muted">
                Tanggal selesai
              </p>
              <p className="mt-0.5 text-[0.7rem] font-bold">
                {request.completedAt ? formatDate(request.completedAt) : "—"}
              </p>
            </div>
            <div>
              <p className="text-[0.5rem] font-extrabold uppercase tracking-[0.12em] text-muted">
                Verifikator
              </p>
              <p className="mt-0.5 text-[0.7rem] font-bold">
                {request.verification?.by ?? "Nia Kartika"}
              </p>
            </div>
            <div>
              <p className="text-[0.5rem] font-extrabold uppercase tracking-[0.12em] text-muted">
                Terbit
              </p>
              <p className="mt-0.5 text-[0.7rem] font-bold">
                {request.verification?.at
                  ? formatDate(request.verification.at)
                  : "—"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-[0.52rem] font-extrabold uppercase tracking-[0.12em] text-muted">
                RangkulUMKM
              </p>
              <p className="text-[0.58rem] text-muted">Koordinator wilayah</p>
            </div>
            <span className="passport-seal">
              <BadgeCheck className="h-8 w-8" aria-hidden="true" />
            </span>
          </div>
        </div>

        <footer className="relative z-10 mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-line/70 pt-3">
          <p className="text-[0.54rem] leading-relaxed text-muted">
            Verifikasi keaslian: buka halaman Cek Bukti dan masukkan kode{" "}
            <strong className="font-mono text-ink">{request.code}</strong>.
          </p>
          <p className="text-[0.52rem] font-extrabold uppercase tracking-[0.12em] text-muted">
            Prototipe · data demo
          </p>
        </footer>

        <p className="print-only mt-4 text-[0.52rem] leading-relaxed text-muted">
          Dicetak dari prototipe RangkulUMKM. Dokumen ini adalah bukti demo, bukan
          sertifikat resmi atau pengakuan dari lembaga mana pun.
        </p>
      </article>

      <div className="no-print mx-auto mt-5 flex max-w-[920px] flex-col items-center justify-between gap-3 rounded-2xl border border-dashed border-line bg-paper-2/60 p-4 text-center sm:flex-row sm:text-left">
        <div>
          <p className="text-[0.76rem] font-extrabold">
            Ingin memeriksa keaslian?
          </p>
          <p className="text-[0.64rem] text-muted">
            Kode bukti bisa dicek tanpa login. Halaman ini adalah prototipe
            lokal.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <Link to="/cek" className="btn btn-sm">
            <Search className="h-3.5 w-3.5" aria-hidden="true" />
            Cek bukti
          </Link>
          <Link to="/paspor" className="btn btn-sm">
            Buka paspor
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
