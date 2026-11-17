import {
  ArrowRight,
  BadgeCheck,
  Check,
  CheckCircle2,
  Clock3,
  ExternalLink,
  FileCheck2,
  Info,
  Link2,
  MessageSquareText,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "../components/Avatar";
import { CategoryChip } from "../components/CategoryIcon";
import { EvidencePhoto } from "../components/EvidencePhoto";
import { StatusBadge } from "../components/StatusBadge";
import {
  CATEGORY_META,
  PEOPLE,
  RECIPES,
  USER_FOR_ROLE,
  formatDate,
  requestAge,
} from "../lib/data";
import { useAppStore } from "../lib/store";
import type { HelpRequest } from "../lib/types";
import { cn, getVerified } from "../lib/utils";
import { usePageTitle } from "../lib/usePageTitle";

function VerificationDetail({
  request,
  onApproved,
}: {
  request: HelpRequest;
  onApproved: (request: HelpRequest) => void;
}) {
  const approveRequest = useAppStore((state) => state.approveRequest);
  const returnRequest = useAppStore((state) => state.returnRequest);
  const [returnMode, setReturnMode] = useState(false);
  const [returnNote, setReturnNote] = useState("");
  const [error, setError] = useState("");
  const recipe = RECIPES[request.category];
  const meta = CATEGORY_META[request.category];
  const owner = PEOPLE[request.ownerId];
  const volunteer = request.volunteerId
    ? PEOPLE[request.volunteerId]
    : undefined;

  useEffect(() => {
    setReturnMode(false);
    setReturnNote("");
    setError("");
  }, [request.id]);

  const approve = () => {
    approveRequest(request.id);
    onApproved(request);
  };

  const submitReturn = () => {
    if (returnNote.trim().length < 5) {
      setError("Tulis alasan yang jelas agar pendamping bisa memperbaiki bukti.");
      return;
    }
    returnRequest(request.id, returnNote);
  };

  return (
    <div className="grid gap-3">
      <div className="card-strong overflow-hidden">
        <div
          className="h-2"
          style={{ background: meta.color }}
          aria-hidden="true"
        />
        <div className="p-4 sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-1.5">
                <CategoryChip category={request.category} />
                <span className="chip">{request.code}</span>
                <StatusBadge status={request.status} />
              </div>
              <h2 className="display-md mt-3">{request.businessName}</h2>
              <p className="mt-1 text-[0.72rem] text-muted">
                {request.ownerName} · {request.area} · dikirim{" "}
                {requestAge(request.evidence?.submittedAt ?? request.createdAt)}
              </p>
            </div>
            <div className="rounded-xl border border-line bg-paper px-3 py-2 text-right">
              <p className="text-[0.52rem] font-extrabold uppercase tracking-[0.12em] text-muted">
                Langkah
              </p>
              <p className="font-display text-[1.3rem] font-semibold leading-tight">
                {request.checklistDone.length}/{recipe.steps.length}
              </p>
            </div>
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <div className="flex items-center gap-2 rounded-xl border border-line bg-paper p-2.5">
              <Avatar person={owner} size="md" />
              <div className="min-w-0">
                <p className="text-[0.7rem] font-extrabold">
                  {request.ownerName}
                </p>
                <p className="truncate text-[0.6rem] text-muted">
                  Pemilik usaha
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-line bg-paper p-2.5">
              <Avatar person={volunteer} size="md" />
              <div className="min-w-0">
                <p className="text-[0.7rem] font-extrabold">
                  {volunteer?.name ?? request.volunteerName}
                </p>
                <p className="truncate text-[0.6rem] text-muted">
                  {volunteer?.campus ?? "Pendamping"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-line bg-paper p-3">
            <p className="text-[0.55rem] font-extrabold uppercase tracking-[0.12em] text-muted">
              Checklist yang dikerjakan
            </p>
            <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
              {recipe.steps.map((step, index) => {
                const done = request.checklistDone.includes(index);
                return (
                  <div
                    key={step.title}
                    className="flex items-center gap-1.5 text-[0.66rem]"
                  >
                    <span
                      className={cn(
                        "inline-flex h-4 w-4 flex-none items-center justify-center rounded-full",
                        done ? "bg-forest text-paper-2" : "bg-line text-muted",
                      )}
                    >
                      <Check className="h-2.5 w-2.5" aria-hidden="true" />
                    </span>
                    <span className={done ? "font-semibold" : "text-muted"}>
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="card p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <p className="eyebrow">Bukti yang dikirim</p>
            <h3 className="mt-1 text-[0.92rem] font-extrabold">
              {recipe.proofLabel}
            </h3>
          </div>
          <span className="chip chip-marigold">
            <Clock3 className="h-3 w-3" aria-hidden="true" />
            {request.evidence?.submittedAt
              ? formatDate(request.evidence.submittedAt, true)
              : "Baru dikirim"}
          </span>
        </div>

        {!request.evidence ? (
          <p className="mt-3 rounded-xl bg-clay-soft p-3 text-[0.72rem] text-[#7c2f1e]">
            Bukti belum ditemukan. Kembalikan tugas agar pendamping mengirim
            ulang.
          </p>
        ) : (
          <div className="mt-3 grid gap-3">
            {request.evidence.link && (
              <div className="rounded-xl border border-line bg-paper p-3">
                <p className="flex items-center gap-1.5 text-[0.56rem] font-extrabold uppercase tracking-[0.12em] text-muted">
                  <Link2 className="h-3.5 w-3.5" aria-hidden="true" />
                  Tautan bukti
                </p>
                <a
                  href={request.evidence.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-flex items-center gap-1 break-all text-[0.72rem] font-bold text-forest underline decoration-forest/30 underline-offset-2"
                >
                  {request.evidence.link}
                  <ExternalLink
                    className="h-3 w-3 flex-none"
                    aria-hidden="true"
                  />
                </a>
                <p className="mt-1 text-[0.58rem] text-muted">
                  Tautan demo. Buka di jendela privat untuk memeriksa akses.
                </p>
              </div>
            )}
            {request.evidence.photoId && (
              <EvidencePhoto
                photoId={request.evidence.photoId}
                alt={`Foto bukti dari ${request.businessName}`}
                className="max-h-80"
              />
            )}
            <div className="rounded-xl border border-line bg-paper p-3">
              <p className="flex items-center gap-1.5 text-[0.56rem] font-extrabold uppercase tracking-[0.12em] text-muted">
                <MessageSquareText
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                />
                Catatan pendamping
              </p>
              <p className="mt-1 text-[0.74rem] leading-relaxed text-muted">
                {request.evidence.note}
              </p>
            </div>
          </div>
        )}

        <div className="safe-note mt-3">
          <ShieldCheck
            className="mt-0.5 h-4 w-4 flex-none"
            aria-hidden="true"
          />
          <p>
            Periksa kesesuaian nama, tautan, dan foto. Jangan menyetujui jika
            bukti tidak bisa dibuka atau data sensitif terlihat.
          </p>
        </div>

        {returnMode ? (
          <div className="mt-4 rounded-xl border border-clay/25 bg-clay-soft p-3">
            <label
              htmlFor="return-note"
              className="text-[0.7rem] font-extrabold text-[#7c2f1e]"
            >
              Apa yang perlu diperbaiki?
            </label>
            <textarea
              id="return-note"
              className="input mt-1 min-h-20 bg-paper-2 text-[0.74rem]"
              value={returnNote}
              onChange={(event) => {
                setReturnNote(event.target.value);
                setError("");
              }}
              placeholder="Contoh: foto QRIS belum memperlihatkan nama merchant."
              maxLength={240}
            />
            {error && (
              <p
                className="field-error mt-1 rounded-lg bg-paper-2 px-2 py-1"
                role="alert"
              >
                {error}
              </p>
            )}
            <div className="mt-2 flex flex-wrap gap-1.5">
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={submitReturn}
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                Kembalikan tugas
              </button>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => {
                  setReturnMode(false);
                  setError("");
                }}
              >
                Batal
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              className="btn btn-primary flex-1"
              onClick={approve}
            >
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              Setujui & terbitkan bukti
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setReturnMode(true)}
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Minta perbaikan
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Verify() {
  usePageTitle("Verifikasi bukti");
  const role = useAppStore((state) => state.role);
  const setRole = useAppStore((state) => state.setRole);
  const requests = useAppStore((state) => state.requests);
  const [selectedId, setSelectedId] = useState<string>();
  const [lastApproved, setLastApproved] = useState<HelpRequest | null>(null);
  const pending = useMemo(
    () =>
      requests
        .filter((request) => request.status === "submitted")
        .sort(
          (a, b) =>
            new Date(a.evidence?.submittedAt ?? a.createdAt).getTime() -
            new Date(b.evidence?.submittedAt ?? b.createdAt).getTime(),
        ),
    [requests],
  );
  const verified = getVerified(requests).slice(0, 4);
  const selected =
    pending.find((request) => request.id === selectedId) ?? pending[0];
  const verifier = PEOPLE[USER_FOR_ROLE.verifier];
  const today = new Date().toDateString();
  const approvedToday = requests.filter(
    (request) =>
      request.status === "verified" &&
      request.completedAt &&
      new Date(request.completedAt).toDateString() === today,
  ).length;

  useEffect(() => {
    if (role !== "verifier") setRole("verifier");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container-page py-8 sm:py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Ruang verifikator</p>
          <h1 className="display-lg mt-2">
            Bukti diperiksa.{" "}
            <span className="serif-italic text-forest">
              Kualitas dijaga.
            </span>
          </h1>
          <p className="lede mt-2">
            Halo, {verifier.name.split(" ")[0]}. Setujui bukti yang lengkap,
            atau minta perbaikan dengan catatan yang jelas.
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <span className="chip chip-marigold">
            <Clock3 className="h-3 w-3" aria-hidden="true" />
            {pending.length} menunggu
          </span>
          <span className="chip chip-forest">
            <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
            {approvedToday} hari ini
          </span>
        </div>
      </div>

      {lastApproved && (
        <div
          className="mt-5 rounded-2xl border border-forest/20 bg-sage-2 p-3"
          role="status"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="flex items-center gap-1.5 text-[0.76rem] font-extrabold text-forest-dark">
                <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                Bukti {lastApproved.code} disetujui
              </p>
              <p className="mt-0.5 text-[0.66rem] text-muted">
                Paspor dampak dan halaman bukti publik sudah terbit.
              </p>
            </div>
            <Link to={`/bukti/${lastApproved.code}`} className="btn btn-sm">
              Lihat bukti publik
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      )}

      <div className="mt-6 grid gap-5 lg:grid-cols-[340px_minmax(0,1fr)] lg:items-start">
        <div className="grid gap-3">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-[0.62rem] font-extrabold uppercase tracking-[0.14em] text-muted">
              Antrean verifikasi
            </h2>
            <span className="chip">{pending.length}</span>
          </div>

          {pending.length > 0 ? (
            <div className="grid max-h-[520px] gap-2 overflow-y-auto pr-1">
              {pending.map((request) => {
                const meta = CATEGORY_META[request.category];
                const active = selected?.id === request.id;
                return (
                  <button
                    key={request.id}
                    type="button"
                    className={cn(
                      "card w-full p-3 text-left transition-colors",
                      active
                        ? "border-forest bg-sage-2 ring-1 ring-forest"
                        : "hover:border-forest/40 hover:bg-paper-2",
                    )}
                    aria-current={active}
                    onClick={() => {
                      setSelectedId(request.id);
                      setLastApproved(null);
                    }}
                  >
                    <div className="flex items-start gap-2.5">
                      <span
                        className="flex h-9 w-9 flex-none items-center justify-center rounded-lg"
                        style={{
                          background: meta.softColor,
                          color: meta.inkColor,
                        }}
                      >
                        <FileCheck2 className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[0.76rem] font-extrabold">
                          {request.businessName}
                        </p>
                        <p className="truncate text-[0.6rem] text-muted">
                          {meta.shortLabel} · {request.area}
                        </p>
                        <p className="mt-1 text-[0.56rem] text-muted">
                          {request.evidence?.submittedAt
                            ? formatDate(request.evidence.submittedAt)
                            : "Baru dikirim"}
                        </p>
                      </div>
                      {active && (
                        <span className="mt-1 h-2 w-2 rounded-full bg-forest" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="empty-state">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sage text-forest">
                <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="text-[0.84rem] font-extrabold">Antrean bersih</p>
              <p className="max-w-[240px] text-[0.66rem] leading-relaxed text-muted">
                Tidak ada bukti yang menunggu. Tugas baru akan muncul setelah
                pendamping mengirim bukti.
              </p>
            </div>
          )}

          <div className="card p-3">
            <p className="flex items-center gap-1.5 text-[0.62rem] font-extrabold">
              <Info className="h-3.5 w-3.5 text-forest" aria-hidden="true" />
              Cara memeriksa
            </p>
            <ol className="mt-2 grid gap-1.5">
              {[
                "Buka tautan di jendela privat.",
                "Cocokkan nama usaha dan bukti.",
                "Pastikan tidak ada data sensitif.",
                "Setujui atau minta perbaikan.",
              ].map((text, index) => (
                <li
                  key={text}
                  className="flex gap-1.5 text-[0.62rem] text-muted"
                >
                  <span className="flex h-4 w-4 flex-none items-center justify-center rounded-full bg-sage text-[0.5rem] font-extrabold text-forest">
                    {index + 1}
                  </span>
                  {text}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div>
          {selected ? (
            <VerificationDetail
              key={selected.id}
              request={selected}
              onApproved={(request) => {
                setLastApproved(request);
                setSelectedId(undefined);
              }}
            />
          ) : (
            <div className="card-strong p-6 text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage text-forest">
                <BadgeCheck className="h-7 w-7" aria-hidden="true" />
              </span>
              <h2 className="display-md mt-3">
                Tidak ada yang perlu diperiksa.
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
                Semua bukti di antrean sudah diproses. Kamu bisa melihat dampak
                yang sudah tercipta atau kembali ke peta.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <Link to="/dampak" className="btn btn-primary">
                  Lihat dampak
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link to="/jelajah" className="btn">
                  Lihat peta
                </Link>
              </div>
            </div>
          )}

          {verified.length > 0 && (
            <div className="card mt-4 p-4">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-[0.62rem] font-extrabold uppercase tracking-[0.14em] text-muted">
                  Baru terverifikasi
                </h2>
                <Link
                  to="/dampak"
                  className="text-[0.6rem] font-extrabold text-forest hover:underline"
                >
                  Semua dampak
                </Link>
              </div>
              <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
                {verified.map((request) => (
                  <Link
                    key={request.id}
                    to={`/bukti/${request.code}`}
                    className="flex items-center gap-2 rounded-lg border border-line/70 bg-paper p-2 transition-colors hover:border-forest/40"
                  >
                    <CheckCircle2
                      className="h-3.5 w-3.5 flex-none text-forest"
                      aria-hidden="true"
                    />
                    <span className="min-w-0 flex-1 truncate text-[0.66rem] font-bold">
                      {request.businessName}
                    </span>
                    <span className="text-[0.56rem] text-muted">
                      {request.code}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
