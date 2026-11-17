import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Clock3,
  FileQuestion,
  FileSearch,
  LockKeyhole,
  ScanLine,
  Search,
  ShieldCheck,
  Store,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CategoryChip } from "../components/CategoryIcon";
import { StatusBadge } from "../components/StatusBadge";
import {
  CATEGORY_META,
  PEOPLE,
  codeIsValid,
  formatDate,
  normalizeCode,
} from "../lib/data";
import { useAppStore } from "../lib/store";
import type { HelpRequest } from "../lib/types";
import { getVerified } from "../lib/utils";
import { usePageTitle } from "../lib/usePageTitle";

export default function Check() {
  usePageTitle("Cek bukti");
  const [params] = useSearchParams();
  const requests = useAppStore((state) => state.requests);
  const [code, setCode] = useState(params.get("kode") ?? "");
  const [searchedCode, setSearchedCode] = useState<string | null>(null);
  const [result, setResult] = useState<HelpRequest | null | undefined>();
  const [error, setError] = useState("");
  const verified = getVerified(requests);
  const samples = useMemo(() => verified.slice(0, 3), [verified]);

  const search = (value: string) => {
    const normalized = normalizeCode(value);
    setError("");
    setSearchedCode(normalized);
    if (!normalized) {
      setError("Masukkan kode bukti terlebih dahulu.");
      setResult(undefined);
      return;
    }
    if (!codeIsValid(normalized)) {
      setError("Format kode adalah RKM-YYYY-NNN, contoh RKM-2608-096.");
      setResult(undefined);
      return;
    }
    const found =
      requests.find((request) => normalizeCode(request.code) === normalized) ??
      null;
    setResult(found);
  };

  const trySample = (sample: string) => {
    setCode(sample);
    search(sample);
  };

  return (
    <div className="container-page py-8 sm:py-12">
      <div className="grid items-start gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12">
        <div>
          <p className="eyebrow">Cek keaslian</p>
          <h1 className="display-lg mt-2">
            Satu kode.{" "}
            <span className="serif-italic text-forest">Satu bukti nyata.</span>
          </h1>
          <p className="lede mt-3">
            Masukkan kode dari Paspor Dampak atau halaman bukti. Kami akan
            menunjukkan usaha, tugas, pendamping, dan status verifikasinya tanpa
            meminta login.
          </p>

          <div className="mt-6 card-strong p-4 sm:p-5">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                search(code);
              }}
            >
              <label htmlFor="check-code" className="field-label">
                <span className="inline-flex items-center gap-1.5">
                  <ScanLine className="h-4 w-4 text-forest" aria-hidden="true" />
                  Kode bukti
                </span>
                <span className="field-hint">Contoh: RKM-2608-096</span>
              </label>
              <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                <input
                  id="check-code"
                  className="input font-mono font-bold uppercase tracking-wide"
                  value={code}
                  onChange={(event) => {
                    setCode(event.target.value.toUpperCase());
                    setError("");
                  }}
                  placeholder="RKM-2608-096"
                  autoComplete="off"
                  spellCheck={false}
                  aria-describedby="check-help"
                  aria-invalid={Boolean(error)}
                />
                <button type="submit" className="btn btn-primary sm:w-auto">
                  <Search className="h-4 w-4" aria-hidden="true" />
                  Cek bukti
                </button>
              </div>
              <p id="check-help" className="field-hint mt-2">
                Hanya kode yang sudah terverifikasi yang menampilkan bukti
                lengkap.
              </p>
              {error && (
                <p
                  className="field-error mt-2 rounded-lg border border-clay/20 bg-clay-soft px-3 py-2"
                  role="alert"
                >
                  {error}
                </p>
              )}
            </form>

            {samples.length > 0 && (
              <div className="mt-4 border-t border-line/70 pt-3">
                <p className="text-[0.56rem] font-extrabold uppercase tracking-[0.14em] text-muted">
                  Coba kode demo
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {samples.map((sample) => (
                    <button
                      key={sample.id}
                      type="button"
                      className="chip hover:border-forest/40 hover:bg-sage-2"
                      onClick={() => trySample(sample.code)}
                    >
                      {sample.code}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <aside className="grid gap-3">
          <div className="safe-note">
            <ShieldCheck
              className="mt-0.5 h-4 w-4 flex-none"
              aria-hidden="true"
            />
            <p>
              Halaman ini hanya menampilkan data yang sudah disetujui. Data
              pribadi pemilik, nomor telepon, dan kredensial tidak pernah
              ditampilkan ke publik.
            </p>
          </div>
          <div className="card p-4 sm:p-5">
            <p className="eyebrow">Cara membaca</p>
            <h2 className="display-md mt-2">Bukti, bukan klaim.</h2>
            <ul className="mt-3 grid gap-2.5 text-[0.72rem] leading-relaxed text-muted">
              {[
                {
                  icon: BadgeCheck,
                  title: "Terverifikasi",
                  text: "Verifikator sudah memeriksa tautan, foto, dan catatan.",
                },
                {
                  icon: Store,
                  title: "Spesifik",
                  text: "Kode terhubung ke satu usaha dan satu tugas, bukan ke akun anonim.",
                },
                {
                  icon: LockKeyhole,
                  title: "Minim data",
                  text: "Hanya informasi yang aman dan relevan yang ditampilkan.",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.title} className="flex gap-2">
                    <span className="flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-sage text-forest">
                      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span>
                      <strong className="block text-[0.74rem] text-ink">
                        {item.title}
                      </strong>
                      {item.text}
                    </span>
                  </li>
                );
              })}
            </ul>
            <p className="mt-3 rounded-lg bg-marigold-soft px-3 py-2 text-[0.6rem] leading-relaxed text-[#6b4408]">
              Prototipe ini memakai data demo. Bukan sertifikat resmi, bukan
              pengakuan dari lembaga, dan tidak menggantikan verifikasi
              lapangan.
            </p>
          </div>
        </aside>
      </div>

      {searchedCode !== null && (
        <section className="mt-8" aria-live="polite" aria-atomic="true">
          {result ? (
            <div className="card-strong overflow-hidden">
              <div
                className="h-2"
                style={{
                  background: CATEGORY_META[result.category].color,
                }}
                aria-hidden="true"
              />
              <div className="p-5 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <StatusBadge status={result.status} />
                      <span className="chip">{result.code}</span>
                    </div>
                    <h2 className="display-md mt-3">{result.businessName}</h2>
                    <p className="mt-1 text-[0.72rem] text-muted">
                      {result.area} · {result.ownerName}
                    </p>
                  </div>
                  <CategoryChip category={result.category} />
                </div>

                {result.status === "verified" ? (
                  <>
                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                      <div className="rounded-xl border border-line bg-paper p-3">
                        <p className="text-[0.52rem] font-extrabold uppercase tracking-[0.14em] text-muted">
                          Tugas
                        </p>
                        <p className="mt-1 text-[0.8rem] font-extrabold">
                          {CATEGORY_META[result.category].label}
                        </p>
                        <p className="mt-0.5 text-[0.64rem] text-muted">
                          {PEOPLE[result.volunteerId ?? ""]?.name ??
                            result.volunteerName}{" "}
                          · {PEOPLE[result.volunteerId ?? ""]?.campus ?? "Pendamping"}
                        </p>
                      </div>
                      <div className="rounded-xl border border-line bg-paper p-3">
                        <p className="text-[0.52rem] font-extrabold uppercase tracking-[0.14em] text-muted">
                          Diverifikasi
                        </p>
                        <p className="mt-1 text-[0.8rem] font-extrabold">
                          {result.verification?.by ?? "Nia Kartika"}
                        </p>
                        <p className="mt-0.5 flex items-center gap-1 text-[0.64rem] text-muted">
                          <Clock3 className="h-3 w-3" aria-hidden="true" />
                          {result.verification?.at
                            ? formatDate(result.verification.at)
                            : "—"}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-start gap-2 rounded-xl border border-forest/15 bg-sage-2/70 p-3">
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 flex-none text-forest"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="text-[0.72rem] font-extrabold">
                          Bukti sudah terbit.
                        </p>
                        <p className="mt-0.5 text-[0.66rem] leading-relaxed text-muted">
                          {result.evidence?.note ??
                            "Verifikator sudah menyetujui hasil tugas ini."}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Link
                        to={`/bukti/${result.code}`}
                        className="btn btn-primary btn-sm"
                      >
                        <BadgeCheck
                          className="h-3.5 w-3.5"
                          aria-hidden="true"
                        />
                        Buka bukti lengkap
                      </Link>
                      <Link to="/dampak" className="btn btn-sm">
                        Lihat dampak
                        <ArrowRight
                          className="h-3.5 w-3.5"
                          aria-hidden="true"
                        />
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mt-4 flex items-start gap-2 rounded-xl border border-clay/15 bg-clay-soft p-3">
                      <LockKeyhole
                        className="mt-0.5 h-4 w-4 flex-none text-[#7c2f1e]"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="text-[0.72rem] font-extrabold text-[#7c2f1e]">
                          Bukti belum bisa ditampilkan.
                        </p>
                        <p className="mt-0.5 text-[0.66rem] leading-relaxed text-[#7c2f1e]/80">
                          Kode ini ditemukan, tetapi statusnya belum
                          terverifikasi. Bukti publik baru terbit setelah
                          verifikator menyetujui.
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Link to={`/tugas/${result.id}`} className="btn btn-sm">
                        Buka tugas
                      </Link>
                      <Link to="/cek" className="btn btn-sm">
                        Cek kode lain
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="empty-state border-solid bg-paper-2">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-marigold-soft text-[#6b4408]">
                <FileQuestion className="h-6 w-6" aria-hidden="true" />
              </span>
              <h2 className="text-[0.95rem] font-extrabold">
                Kode tidak ditemukan
              </h2>
              <p className="max-w-sm text-[0.72rem] leading-relaxed text-muted">
                Kami tidak menemukan <strong>{searchedCode}</strong> di data
                demo ini. Periksa ejaan atau coba salah satu kode contoh di atas.
              </p>
            </div>
          )}
        </section>
      )}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-paper-2/60 p-4">
        <p className="flex items-center gap-1.5 text-[0.66rem] font-semibold text-muted">
          <FileSearch className="h-3.5 w-3.5 text-forest" aria-hidden="true" />
          Ingin melihat semua bukti yang sudah terbit?
        </p>
        <div className="flex flex-wrap gap-2">
          <Link to="/dampak" className="btn btn-sm">
            Lihat dampak
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          <Link to="/panduan" className="btn btn-sm">
            Panduan & keamanan
          </Link>
        </div>
      </div>
    </div>
  );
}
