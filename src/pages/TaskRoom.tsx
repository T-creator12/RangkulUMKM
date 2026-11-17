import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Camera,
  Check,
  CheckCircle2,
  Clock3,
  ExternalLink,
  ImagePlus,
  Info,
  Link2,
  Loader2,
  LockKeyhole,
  MapPin,
  MessageCircle,
  Send,
  ShieldCheck,
  Sparkles,
  Trash2,
  UserRound,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Avatar } from "../components/Avatar";
import { CategoryChip } from "../components/CategoryIcon";
import { EvidencePhoto } from "../components/EvidencePhoto";
import { RequestStepper } from "../components/RequestStepper";
import { StatusBadge } from "../components/StatusBadge";
import {
  CATEGORY_META,
  PEOPLE,
  RECIPES,
  USER_FOR_ROLE,
  formatDate,
  getMatch,
  requestAge,
} from "../lib/data";
import { compressImage, savePhoto } from "../lib/photos";
import { useAppStore } from "../lib/store";
import type { HelpRequest } from "../lib/types";
import {
  STATUS_META,
  cn,
  isTaskEditable,
  maskPhone,
} from "../lib/utils";
import { usePageTitle } from "../lib/usePageTitle";

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function NotFoundTask() {
  return (
    <div className="container-page py-16">
      <div className="empty-state mx-auto max-w-lg">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage text-forest">
          <Info className="h-6 w-6" aria-hidden="true" />
        </span>
        <h1 className="display-md">Tugas tidak ditemukan</h1>
        <p className="text-sm text-muted">
          Mungkin tautannya berubah atau data demo sudah direset.
        </p>
        <Link to="/jelajah" className="btn btn-primary">
          Kembali ke peta bantuan
        </Link>
      </div>
    </div>
  );
}

function ProofReadOnly({ request }: { request: HelpRequest }) {
  const evidence = request.evidence;
  if (!evidence) return null;
  return (
    <div className="card p-4">
      <p className="text-[0.58rem] font-extrabold uppercase tracking-[0.14em] text-muted">
        Bukti yang dikirim
      </p>
      {evidence.link && (
        <a
          href={evidence.link}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex items-center gap-1.5 break-all text-[0.74rem] font-bold text-forest underline decoration-forest/30 underline-offset-2"
        >
          <Link2 className="h-3.5 w-3.5 flex-none" aria-hidden="true" />
          {evidence.link}
          <ExternalLink className="h-3 w-3 flex-none" aria-hidden="true" />
        </a>
      )}
      {evidence.photoId && (
        <EvidencePhoto
          photoId={evidence.photoId}
          alt={`Bukti foto untuk ${request.businessName}`}
          className="mt-3 max-h-64"
        />
      )}
      <p className="mt-3 rounded-xl bg-sage-2/70 p-3 text-[0.72rem] leading-relaxed text-muted">
        {evidence.note}
      </p>
      <p className="mt-2 text-[0.6rem] text-muted">
        Dikirim {formatDate(evidence.submittedAt, true)}
      </p>
    </div>
  );
}

export default function TaskRoom() {
  const { id } = useParams<{ id: string }>();
  const requests = useAppStore((state) => state.requests);
  const role = useAppStore((state) => state.role);
  const setRole = useAppStore((state) => state.setRole);
  const claimRequest = useAppStore((state) => state.claimRequest);
  const toggleStep = useAppStore((state) => state.toggleStep);
  const submitEvidence = useAppStore((state) => state.submitEvidence);
  const notify = useAppStore((state) => state.notify);
  const request = requests.find((item) => item.id === id);
  const volunteer = PEOPLE[USER_FOR_ROLE.volunteer];
  const owner = request ? PEOPLE[request.ownerId] : undefined;
  const [error, setError] = useState("");
  const [link, setLink] = useState("");
  const [note, setNote] = useState("");
  const [photoId, setPhotoId] = useState<string | undefined>();
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  usePageTitle(request ? request.businessName : "Tugas");

  // Isi formulir bukti hanya saat membuka tugas. Perubahan status tidak boleh
  // menghapus foto yang sedang disiapkan pendamping.
  useEffect(() => {
    if (!request) return;
    setLink(request.evidence?.link ?? "");
    setNote(request.evidence?.note ?? "");
    setPhotoId(request.evidence?.photoId);
    setPreview(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request?.id]);

  const recipe = request ? RECIPES[request.category] : null;
  const meta = request ? CATEGORY_META[request.category] : null;
  const editable = request ? isTaskEditable(request, volunteer.id) : false;
  const isMine = request?.volunteerId === volunteer.id;
  const match = request ? getMatch(request, volunteer) : null;
  const doneCount = request?.checklistDone.length ?? 0;
  const progress = recipe ? Math.round((doneCount / recipe.steps.length) * 100) : 0;
  const isOpen = request?.status === "open";
  const isClaimedByOther = Boolean(
    request?.volunteerId &&
      request.volunteerId !== volunteer.id &&
      ["claimed", "in_progress", "returned", "submitted"].includes(
        request.status,
      ),
  );
  const showReadOnly =
    !editable &&
    !isOpen &&
    !["submitted", "verified"].includes(request?.status ?? "open");
  const ownerPhone = owner?.phone;
  const showFullContact = Boolean(
    isMine || request?.status === "verified" || role === "verifier",
  );

  const handleUpload = async (file?: File) => {
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const dataUrl = await compressImage(file);
      const savedId = await savePhoto(dataUrl);
      setPhotoId(savedId);
      setPreview(dataUrl);
      notify("Foto bukti berhasil disiapkan.", "success");
    } catch (uploadError) {
      const message =
        uploadError instanceof Error ? uploadError.message : "Foto gagal diproses.";
      setError(message);
      notify(message, "error");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const handleSubmit = () => {
    if (!request || !recipe) return;
    if (request.checklistDone.length < recipe.steps.length) {
      setError("Selesaikan semua langkah sebelum mengirim bukti.");
      return;
    }
    if (recipe.proof === "link" && !link.trim()) {
      setError("Tautan bukti wajib diisi untuk tugas ini.");
      return;
    }
    if (recipe.proof === "photo" && !photoId) {
      setError("Unggah foto bukti terlebih dahulu.");
      return;
    }
    if (recipe.proof === "both" && !photoId && !link.trim()) {
      setError("Unggah foto atau tempel tautan sebagai bukti.");
      return;
    }
    if (link.trim() && !isValidUrl(link.trim())) {
      setError("Tautan harus diawali http:// atau https://.");
      return;
    }
    if (note.trim().length < 10) {
      setError("Tulis catatan singkat tentang hasil pekerjaan (minimal 10 karakter).");
      return;
    }
    const submitted = submitEvidence(request.id, {
      link: link.trim() || undefined,
      photoId,
      note: note.trim(),
    });
    if (!submitted) {
      setError("Bukti tidak bisa dikirim pada status tugas ini.");
      return;
    }
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const rolePrompt = useMemo(() => {
    if (!request) return null;
    if (isOpen && role !== "volunteer") {
      return {
        title: "Tugas ini masih terbuka.",
        text: "Masuk sebagai pendamping untuk melihat kontak, mengklaim tugas, dan mulai mengerjakan resep.",
        action: "Masuk sebagai pendamping",
      };
    }
    if (
      isMine &&
      role !== "volunteer" &&
      ["claimed", "in_progress", "returned"].includes(request.status)
    ) {
      return {
        title: "Tugas ini kamu dampingi.",
        text: "Beralih ke tampilan pendamping untuk melanjutkan checklist dan mengirim bukti.",
        action: "Buka tampilan pendamping",
      };
    }
    return null;
  }, [isMine, isOpen, request, role]);

  if (!request || !recipe || !meta) return <NotFoundTask />;

  return (
    <div className="container-page py-8 sm:py-10">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
        <Link
          to={isMine ? "/jelajah" : "/jelajah"}
          className="inline-flex items-center gap-1.5 text-[0.72rem] font-extrabold text-muted hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Kembali ke peta bantuan
        </Link>
        <span className="chip">
          <Clock3 className="h-3 w-3" aria-hidden="true" />
          Diajukan {requestAge(request.createdAt)}
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
        <div className="grid gap-4">
          <header className="card-strong overflow-hidden">
            <div className="h-2" style={{ background: meta.color }} aria-hidden="true" />
            <div className="p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <CategoryChip category={request.category} />
                    <span className="chip">{request.code}</span>
                    <StatusBadge status={request.status} />
                  </div>
                  <h1 className="display-md mt-3">
                    {request.businessName}
                  </h1>
                  <p className="mt-1 text-[0.76rem] text-muted">
                    {request.ownerName} · {request.area} · {request.schedule}
                  </p>
                </div>
                <div className="rounded-xl border border-line bg-paper px-3 py-2 text-right">
                  <p className="text-[0.52rem] font-extrabold uppercase tracking-[0.12em] text-muted">
                    Estimasi
                  </p>
                  <p className="font-display text-[1.3rem] font-semibold leading-tight">
                    {meta.duration} menit
                  </p>
                </div>
              </div>

              <p className="mt-4 rounded-xl bg-sage-2/70 p-3 text-[0.78rem] leading-relaxed text-muted">
                {request.notes || "Pemilik usaha membutuhkan pendampingan langkah demi langkah."}
              </p>

              {request.verification?.status === "returned" && (
                <div className="mt-3 rounded-xl border border-clay/25 bg-clay-soft p-3">
                  <p className="flex items-center gap-1.5 text-[0.72rem] font-extrabold text-[#7c2f1e]">
                    <Info className="h-4 w-4" aria-hidden="true" />
                    Perlu diperbaiki
                  </p>
                  <p className="mt-1 text-[0.72rem] leading-relaxed text-[#7c2f1e]">
                    {request.verification.note}
                  </p>
                </div>
              )}

              {rolePrompt && (
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-forest/20 bg-sage p-3">
                  <div>
                    <p className="text-[0.76rem] font-extrabold">{rolePrompt.title}</p>
                    <p className="text-[0.66rem] text-muted">{rolePrompt.text}</p>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => setRole("volunteer")}
                  >
                    <UserRound className="h-3.5 w-3.5" aria-hidden="true" />
                    {rolePrompt.action}
                  </button>
                </div>
              )}

              {isOpen && role === "volunteer" && (
                <div className="mt-4 rounded-2xl border border-forest/20 bg-paper p-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="flex items-center gap-1.5 text-[0.78rem] font-extrabold">
                        <Sparkles className="h-4 w-4 text-forest" aria-hidden="true" />
                        {match?.score}% cocok untukmu
                      </p>
                      <p className="mt-0.5 text-[0.66rem] text-muted">
                        {match?.reasons.join(" · ") || "Bisa kamu bantu"}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        const claimed = claimRequest(request.id);
                        if (!claimed) {
                          notify("Tugas ini sudah diambil pendamping lain.", "error");
                        }
                      }}
                    >
                      <HandHeartIcon />
                      Klaim tugas ini
                    </button>
                  </div>
                </div>
              )}

              {isClaimedByOther && (
                <div className="mt-4 rounded-xl border border-line bg-paper p-3">
                  <p className="text-[0.76rem] font-extrabold">
                    Tugas ini sudah diambil {request.volunteerName}.
                  </p>
                  <p className="mt-0.5 text-[0.66rem] text-muted">
                    Pilih permintaan lain di peta, atau lihat tugas yang sedang
                    kamu kerjakan.
                  </p>
                </div>
              )}
            </div>
          </header>

          <section className="card p-4 sm:p-5" aria-labelledby="resep-title">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="eyebrow">Resep Rangkul</p>
                <h2 id="resep-title" className="display-md mt-2">
                  {meta.label}
                </h2>
                <p className="mt-1 max-w-2xl text-[0.78rem] leading-relaxed text-muted">
                  {recipe.intro}
                </p>
              </div>
              <span className="chip chip-forest">
                <Clock3 className="h-3 w-3" aria-hidden="true" />
                {meta.duration} menit
              </span>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between gap-3 text-[0.62rem] font-bold text-muted">
                <span>Progres langkah</span>
                <span>
                  {doneCount}/{recipe.steps.length} selesai
                </span>
              </div>
              <div className="bar-track mt-1.5">
                <div
                  className="bar-fill transition-[width] duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <ol className="mt-3">
              {recipe.steps.map((step, index) => {
                const done = request.checklistDone.includes(index);
                return (
                  <li key={step.title}>
                    <button
                      type="button"
                      className={cn(
                        "checklist-item w-full text-left",
                        !editable && "cursor-default",
                      )}
                      disabled={!editable}
                      aria-pressed={done}
                      onClick={() => toggleStep(request.id, index)}
                    >
                      <span className="check-button" aria-hidden="true">
                        <Check className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1" data-done={done}>
                        <span className="flex flex-wrap items-baseline justify-between gap-x-2">
                          <span className="checklist-title text-[0.84rem] font-extrabold">
                            {index + 1}. {step.title}
                          </span>
                          <span className="text-[0.58rem] font-bold text-muted">
                            ± {step.minutes} menit
                          </span>
                        </span>
                        <span className="mt-0.5 block text-[0.72rem] leading-relaxed text-muted">
                          {step.detail}
                        </span>
                        {step.tip && (
                          <span className="mt-1 block rounded-lg bg-marigold-soft px-2 py-1 text-[0.64rem] font-semibold text-[#6b4408]">
                            Tips: {step.tip}
                          </span>
                        )}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            {!editable && (
              <p className="mt-2 rounded-lg bg-sage-2 px-3 py-2 text-[0.66rem] text-muted">
                {isOpen
                  ? "Klaim tugas untuk mulai mencentang langkah."
                  : isClaimedByOther
                    ? "Hanya pendamping yang mengklaim tugas ini yang dapat mengubah checklist."
                    : "Checklist ini hanya bisa diubah saat tugas sedang dikerjakan."}
              </p>
            )}
          </section>

          {showReadOnly && request.status !== "submitted" && (
            <ProofReadOnly request={request} />
          )}

          {editable && (
            <section className="card p-4 sm:p-5" aria-labelledby="bukti-title">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="eyebrow">Bukti kerja</p>
                  <h2 id="bukti-title" className="display-md mt-2">
                    {recipe.proofLabel}
                  </h2>
                  <p className="mt-1 text-[0.76rem] leading-relaxed text-muted">
                    {recipe.proofHelp}
                  </p>
                </div>
                <span className="chip chip-marigold">Wajib untuk verifikasi</span>
              </div>

              <div className="mt-4 grid gap-4">
                {(recipe.proof === "link" || recipe.proof === "both") && (
                  <div className="field">
                    <label htmlFor="evidence-link" className="field-label">
                      <span className="inline-flex items-center gap-1.5">
                        <Link2 className="h-3.5 w-3.5 text-forest" aria-hidden="true" />
                        Tautan bukti
                      </span>
                      <span className="field-hint">
                        {recipe.proof === "link" ? "Wajib" : "Opsional"}
                      </span>
                    </label>
                    <input
                      id="evidence-link"
                      className="input"
                      value={link}
                      onChange={(event) => {
                        setLink(event.target.value);
                        setError("");
                      }}
                      placeholder={recipe.proofPlaceholder}
                      inputMode="url"
                      aria-describedby="evidence-link-help"
                    />
                    <p id="evidence-link-help" className="field-hint">
                      Pastikan tautan bisa dibuka tanpa login. Jangan bagikan
                      kata sandi atau OTP.
                    </p>
                  </div>
                )}

                {(recipe.proof === "photo" || recipe.proof === "both") && (
                  <div className="field">
                    <span className="field-label">
                      <span className="inline-flex items-center gap-1.5">
                        <Camera className="h-3.5 w-3.5 text-forest" aria-hidden="true" />
                        Foto bukti
                      </span>
                      <span className="field-hint">
                        {recipe.proof === "photo" ? "Wajib" : "Opsional"}
                      </span>
                    </span>
                    {preview || photoId ? (
                      <div className="photo-preview relative">
                        {preview ? (
                          <img src={preview} alt="Pratinjau foto bukti" />
                        ) : (
                          <EvidencePhoto
                            photoId={photoId}
                            alt="Foto bukti yang sudah diunggah"
                            className="max-h-56"
                          />
                        )}
                        <button
                          type="button"
                          className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full border border-ink/20 bg-paper-2/95 text-clay shadow-sm"
                          aria-label="Hapus foto bukti"
                          onClick={() => {
                            setPhotoId(undefined);
                            setPreview(null);
                            if (fileRef.current) fileRef.current.value = "";
                          }}
                        >
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                    ) : (
                      <label className="upload-zone cursor-pointer">
                        <span className="flex items-center gap-2 text-[0.76rem] font-extrabold">
                          {uploading ? (
                            <Loader2 className="h-5 w-5 animate-spin text-forest" aria-hidden="true" />
                          ) : (
                            <ImagePlus className="h-5 w-5 text-forest" aria-hidden="true" />
                          )}
                          {uploading ? "Memproses foto..." : "Pilih atau ambil foto"}
                        </span>
                        <span className="text-[0.64rem] text-muted">
                          JPG/PNG, maksimal 8 MB. Foto akan dikompres otomatis.
                        </span>
                        <input
                          ref={fileRef}
                          type="file"
                          accept="image/*"
                          capture="environment"
                          className="sr-only"
                          onChange={(event) => void handleUpload(event.target.files?.[0])}
                        />
                      </label>
                    )}
                  </div>
                )}

                <div className="field">
                  <label htmlFor="evidence-note" className="field-label">
                    Catatan hasil
                    <span className="field-hint">Wajib</span>
                  </label>
                  <textarea
                    id="evidence-note"
                    className="input"
                    value={note}
                    onChange={(event) => {
                      setNote(event.target.value);
                      setError("");
                    }}
                    placeholder="Contoh: listing sudah terbit, nama dan jam buka sudah benar, tautan sudah dicek di jendela privat."
                    maxLength={600}
                  />
                  <p className="field-hint text-right">{note.length}/600</p>
                </div>

                {error && (
                  <p className="field-error rounded-lg border border-clay/20 bg-clay-soft px-3 py-2" role="alert">
                    {error}
                  </p>
                )}

                <button
                  type="button"
                  className="btn btn-primary w-full sm:w-auto"
                  onClick={handleSubmit}
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                  Kirim bukti untuk diverifikasi
                </button>
              </div>
            </section>
          )}

          {request.status === "submitted" && (
            <section className="card-strong p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-marigold-soft text-[#6b4408]">
                  <Clock3 className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="eyebrow">Menunggu verifikasi</p>
                  <h2 className="display-md mt-1">Bukti sudah terkirim.</h2>
                  <p className="mt-1 text-[0.78rem] leading-relaxed text-muted">
                    Koordinator akan memeriksa tautan, foto, dan catatan. Kamu
                    akan melihat hasilnya di halaman ini.
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <ProofReadOnly request={request} />
              </div>
              {role === "verifier" && (
                <Link to="/verifikasi" className="btn btn-primary btn-sm mt-3">
                  Buka antrean verifikasi
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              )}
            </section>
          )}

          {request.status === "verified" && (
            <section className="card-strong overflow-hidden">
              <div className="bg-forest p-5 text-paper-2 sm:p-6">
                <div className="flex items-start gap-3">
                  <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-sage/20 text-marigold">
                    <BadgeCheck className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[0.58rem] font-extrabold uppercase tracking-[0.16em] text-sage">
                      Tugas selesai
                    </p>
                    <h2 className="display-md mt-1 text-paper-2">
                      Bukti sudah terverifikasi.
                    </h2>
                    <p className="mt-1 text-[0.78rem] leading-relaxed text-sage">
                      Paspor dampak dan bukti publik sudah bisa dibagikan.
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-5 sm:p-6">
                <ProofReadOnly request={request} />
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link to={`/bukti/${request.code}`} className="btn btn-primary btn-sm">
                    <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                    Lihat bukti publik
                  </Link>
                  <Link to="/paspor" className="btn btn-sm">
                    Buka paspor pendamping
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </section>
          )}
        </div>

        <aside className="grid gap-3 lg:sticky lg:top-24">
          <div className="card p-4">
            <p className="text-[0.56rem] font-extrabold uppercase tracking-[0.14em] text-muted">
              Status tugas
            </p>
            <div className="mt-2">
              <RequestStepper status={request.status} />
            </div>
            <p className="mt-2 rounded-lg bg-paper px-2.5 py-2 text-[0.68rem] leading-relaxed text-muted">
              {STATUS_META[request.status].description}
            </p>
          </div>

          <div className="card p-4">
            <p className="text-[0.56rem] font-extrabold uppercase tracking-[0.14em] text-muted">
              Pemilik usaha
            </p>
            <div className="mt-2 flex items-center gap-2.5">
              <Avatar person={owner} size="lg" />
              <div className="min-w-0">
                <p className="text-[0.82rem] font-extrabold">{request.ownerName}</p>
                <p className="truncate text-[0.64rem] text-muted">{request.businessName}</p>
              </div>
            </div>
            <div className="mt-3 grid gap-2">
              <div className="flex items-start gap-2 text-[0.7rem]">
                <MapPin className="mt-0.5 h-3.5 w-3.5 flex-none text-forest" aria-hidden="true" />
                <span>
                  <strong>{request.area}</strong>
                  <span className="block text-muted">
                    {showFullContact ? request.landmark : "Patokan dibuka setelah tugas diklaim."}
                  </span>
                </span>
              </div>
              <div className="flex items-start gap-2 text-[0.7rem]">
                <CalendarDays className="mt-0.5 h-3.5 w-3.5 flex-none text-forest" aria-hidden="true" />
                <span>
                  <strong>{request.schedule}</strong>
                  <span className="block text-muted">{meta.duration} menit</span>
                </span>
              </div>
              <div className="flex items-start gap-2 text-[0.7rem]">
                <MessageCircle className="mt-0.5 h-3.5 w-3.5 flex-none text-forest" aria-hidden="true" />
                <span>
                  <strong>{showFullContact ? ownerPhone : maskPhone(ownerPhone)}</strong>
                  <span className="block text-muted">
                    {showFullContact ? "Kontak demo, jangan disalahgunakan." : "Dibuka setelah klaim."}
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="card p-4">
            <p className="flex items-center gap-1.5 text-[0.72rem] font-extrabold">
              <ShieldCheck className="h-4 w-4 text-forest" aria-hidden="true" />
              Batas aman
            </p>
            <ul className="mt-2 grid gap-1.5">
              {[
                "Jangan meminta atau memegang OTP/PIN.",
                "Jangan meminta uang kepada pemilik.",
                "Jangan mengunggah data pelanggan.",
              ].map((item) => (
                <li key={item} className="flex gap-1.5 text-[0.66rem] leading-relaxed text-muted">
                  <CheckCircle2 className="mt-0.5 h-3 w-3 flex-none text-forest" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="safe-note">
            <LockKeyhole className="mt-0.5 h-4 w-4 flex-none" aria-hidden="true" />
            <p>{recipe.safety}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function HandHeartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="M12 20s-7-4.4-7-9.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7 3.5C19 15.6 12 20 12 20Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
