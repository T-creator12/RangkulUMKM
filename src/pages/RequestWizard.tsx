import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Copy,
  HandHeart,
  Info,
  LockKeyhole,
  MapPin,
  Send,
  ShieldCheck,
  Sparkles,
  Store,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CategoryIcon } from "../components/CategoryIcon";
import {
  AREA_LIST,
  CATEGORY_LIST,
  CATEGORY_META,
  PEOPLE,
  SCHEDULE_OPTIONS,
  USER_FOR_ROLE,
} from "../lib/data";
import { useAppStore } from "../lib/store";
import type { Area, Category } from "../lib/types";
import { cn, maskPhone } from "../lib/utils";
import { usePageTitle } from "../lib/usePageTitle";

const stepNames = ["Kebutuhan", "Lokasi", "Jadwal", "Konfirmasi"];

export default function RequestWizard() {
  usePageTitle("Minta bantuan");
  const navigate = useNavigate();
  const role = useAppStore((state) => state.role);
  const setRole = useAppStore((state) => state.setRole);
  const createRequest = useAppStore((state) => state.createRequest);
  const notify = useAppStore((state) => state.notify);
  const owner = PEOPLE[USER_FOR_ROLE.umkm];

  const [step, setStep] = useState(0);
  const [category, setCategory] = useState<Category | null>(null);
  const [businessName, setBusinessName] = useState(owner.business ?? "");
  const [area, setArea] = useState<Area>("Sukamaju");
  const [landmark, setLandmark] = useState("");
  const [schedule, setSchedule] = useState("");
  const [notes, setNotes] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [createdCode, setCreatedCode] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (role !== "umkm") setRole("umkm");
    // Halaman ini selalu mewakili akun UMKM demo.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    headingRef.current?.focus();
  }, [step, createdCode]);

  const validate = () => {
    if (step === 0 && !category) {
      setError("Pilih satu kebutuhan agar resepnya bisa disiapkan.");
      return false;
    }
    if (step === 1) {
      if (!businessName.trim()) {
        setError("Nama usaha perlu diisi.");
        return false;
      }
      if (!landmark.trim()) {
        setError("Tambahkan patokan lokasi agar pendamping mudah menemukan tempat.");
        return false;
      }
    }
    if (step === 2 && !schedule) {
      setError("Pilih waktu yang paling memungkinkan.");
      return false;
    }
    setError("");
    return true;
  };

  const next = () => {
    if (!validate()) return;
    setStep((value) => Math.min(3, value + 1));
  };

  const back = () => {
    setError("");
    setStep((value) => Math.max(0, value - 1));
  };

  const submit = () => {
    if (!category) return;
    if (!consent) {
      setError("Centang persetujuan sebelum mengirim permintaan.");
      return;
    }
    const code = createRequest({
      category,
      area,
      landmark,
      schedule,
      notes,
      businessName,
    });
    setCreatedCode(code);
    notify("Permintaan bantuan berhasil dibuat.", "success");
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(createdCode);
      notify("Kode permintaan disalin.", "success");
    } catch {
      notify("Kode tidak bisa disalin otomatis. Salin manual ya.", "error");
    }
  };

  if (createdCode) {
    return (
      <div className="container-page py-10 sm:py-16">
        <div className="mx-auto max-w-2xl">
          <div className="card-strong overflow-hidden p-6 text-center sm:p-10">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-forest bg-sage text-forest shadow-[4px_4px_0_#17251f]">
              <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
            </span>
            <p className="eyebrow mt-5 justify-center">Permintaan terkirim</p>
            <h1
              ref={headingRef}
              tabIndex={-1}
              className="display-lg mt-2 outline-none"
            >
              Satu langkah lagi menuju{" "}
              <span className="serif-italic text-forest">bantuan nyata.</span>
            </h1>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
              Permintaanmu sudah tayang di Peta Rangkul. Pendamping terdekat
              bisa melihatnya dan mengambil tugas ini.
            </p>

            <div className="mx-auto mt-6 max-w-sm rounded-2xl border-2 border-dashed border-forest/40 bg-sage-2 p-4">
              <p className="text-[0.58rem] font-extrabold uppercase tracking-[0.16em] text-muted">
                Kode permintaan
              </p>
              <div className="mt-1 flex items-center justify-center gap-2">
                <p className="font-mono text-xl font-extrabold tracking-tight">
                  {createdCode}
                </p>
                <button
                  type="button"
                  className="icon-btn h-8 w-8"
                  onClick={copyCode}
                  aria-label="Salin kode permintaan"
                >
                  <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setRole("volunteer");
                  navigate("/jelajah");
                }}
              >
                <HandHeart className="h-4 w-4" aria-hidden="true" />
                Coba sebagai pendamping
              </button>
              <Link to="/umkm" className="btn">
                Lihat status permintaan
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <p className="mt-4 text-[0.62rem] text-muted">
              Mode demo: tombol di atas memindahkan kamu ke tampilan pendamping
              agar seluruh alur bisa dicoba.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-8 sm:py-12">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link
          to="/umkm"
          className="inline-flex items-center gap-1.5 text-[0.72rem] font-extrabold text-muted hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Kembali ke beranda UMKM
        </Link>
        <span className="chip chip-forest">
          <Sparkles className="h-3 w-3" aria-hidden="true" />
          Data demo · {owner.name}
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_310px] lg:items-start">
        <div>
          <div className="mb-5">
            <p className="eyebrow">Minta bantuan</p>
            <h1
              ref={headingRef}
              tabIndex={-1}
              className="display-lg mt-2 outline-none"
            >
              Mulai dari{" "}
              <span className="serif-italic text-forest">satu hal</span> yang
              paling dibutuhkan.
            </h1>
            <p className="lede mt-2">
              Tidak perlu mengisi banyak hal. Empat langkah singkat, lalu
              permintaanmu tayang di peta.
            </p>
          </div>

          <ol className="mb-5 grid grid-cols-4 gap-1" aria-label="Langkah pengajuan">
            {stepNames.map((name, index) => {
              const done = index < step;
              const current = index === step;
              return (
                <li key={name} className="grid gap-1">
                  <span
                    className={cn(
                      "h-1.5 rounded-full",
                      done || current ? "bg-forest" : "bg-line",
                    )}
                  />
                  <span
                    className={cn(
                      "text-[0.54rem] font-extrabold uppercase tracking-[0.08em]",
                      current ? "text-forest" : "text-muted",
                    )}
                  >
                    {index + 1}. {name}
                  </span>
                </li>
              );
            })}
          </ol>

          <form
            className="card-strong p-4 sm:p-6"
            onSubmit={(event) => {
              event.preventDefault();
              if (step < 3) next();
              else submit();
            }}
          >
            {step === 0 && (
              <fieldset>
                <legend className="text-[1.05rem] font-extrabold">
                  Apa yang paling ingin dibantu?
                </legend>
                <p className="mt-1 text-[0.78rem] text-muted">
                  Pilih satu. Resep langkah demi langkah akan disiapkan sesuai
                  pilihanmu.
                </p>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {CATEGORY_LIST.map((item) => {
                    const meta = CATEGORY_META[item];
                    return (
                      <button
                        key={item}
                        type="button"
                        className="choice-card"
                        aria-pressed={category === item}
                        onClick={() => {
                          setCategory(item);
                          setError("");
                        }}
                      >
                        <span
                          className="choice-icon"
                          style={{
                            background: meta.softColor,
                            color: meta.inkColor,
                          }}
                        >
                          <CategoryIcon category={item} size={19} />
                        </span>
                        <span className="text-[0.86rem] font-extrabold">
                          {meta.label}
                        </span>
                        <span className="text-[0.68rem] leading-relaxed text-muted">
                          {meta.description}
                        </span>
                        <span className="mt-1 text-[0.58rem] font-extrabold uppercase tracking-[0.1em] text-forest">
                          ± {meta.duration} menit
                        </span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            )}

            {step === 1 && (
              <fieldset>
                <legend className="text-[1.05rem] font-extrabold">
                  Di mana usaha Anda?
                </legend>
                <p className="mt-1 text-[0.78rem] text-muted">
                  Kami hanya menampilkan area dan patokan, bukan alamat lengkap.
                </p>

                <div className="mt-4 field">
                  <label htmlFor="business-name" className="field-label">
                    Nama usaha
                  </label>
                  <input
                    id="business-name"
                    className="input"
                    value={businessName}
                    onChange={(event) => {
                      setBusinessName(event.target.value);
                      setError("");
                    }}
                    placeholder="Contoh: Warung Bu Sri"
                    autoComplete="organization"
                  />
                </div>

                <div className="mt-4">
                  <p className="field-label">Area</p>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {AREA_LIST.map((item) => (
                      <button
                        key={item}
                        type="button"
                        className="choice-card"
                        aria-pressed={area === item}
                        onClick={() => {
                          setArea(item);
                          setError("");
                        }}
                      >
                        <span className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-forest" aria-hidden="true" />
                          <span className="text-[0.8rem] font-extrabold">{item}</span>
                        </span>
                        <span className="text-[0.62rem] text-muted">
                          Pilih area terdekat
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-4 field">
                  <label htmlFor="landmark" className="field-label">
                    Patokan lokasi
                    <span className="field-hint">Wajib</span>
                  </label>
                  <input
                    id="landmark"
                    className="input"
                    value={landmark}
                    onChange={(event) => {
                      setLandmark(event.target.value);
                      setError("");
                    }}
                    placeholder="Contoh: seberang balai RW 04"
                    aria-describedby="landmark-help"
                  />
                  <p id="landmark-help" className="field-hint">
                    Gunakan tempat yang mudah dikenali. Jangan tulis alamat
                    lengkap atau nomor rumah.
                  </p>
                </div>
              </fieldset>
            )}

            {step === 2 && (
              <fieldset>
                <legend className="text-[1.05rem] font-extrabold">
                  Kapan Anda bisa ditemani?
                </legend>
                <p className="mt-1 text-[0.78rem] text-muted">
                  Pendamping akan menyesuaikan dengan jadwal ini.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {SCHEDULE_OPTIONS.map((item) => (
                    <button
                      key={item}
                      type="button"
                      className="choice-card min-h-10 px-3 py-2 text-[0.72rem]"
                      aria-pressed={schedule === item}
                      onClick={() => {
                        setSchedule(item);
                        setError("");
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>

                <div className="mt-5 field">
                  <label htmlFor="notes" className="field-label">
                    Catatan tambahan
                    <span className="field-hint">Opsional</span>
                  </label>
                  <textarea
                    id="notes"
                    className="input"
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    placeholder="Contoh: sudah punya rekening BRI, foto warung ada di HP."
                    maxLength={280}
                  />
                  <p className="field-hint text-right">{notes.length}/280</p>
                </div>
              </fieldset>
            )}

            {step === 3 && category && (
              <div>
                <h2 className="text-[1.05rem] font-extrabold">
                  Periksa sekali lagi
                </h2>
                <p className="mt-1 text-[0.78rem] text-muted">
                  Setelah dikirim, pendamping terdekat bisa melihat permintaan
                  ini di peta.
                </p>

                <div className="mt-4 grid gap-2.5">
                  <div className="rounded-xl border border-line bg-paper p-3">
                    <p className="text-[0.55rem] font-extrabold uppercase tracking-[0.12em] text-muted">
                      Kebutuhan
                    </p>
                    <p className="mt-1 flex items-center gap-2 text-[0.85rem] font-extrabold">
                      <CategoryIcon category={category} size={16} />
                      {CATEGORY_META[category].label}
                    </p>
                  </div>
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    <div className="rounded-xl border border-line bg-paper p-3">
                      <p className="text-[0.55rem] font-extrabold uppercase tracking-[0.12em] text-muted">
                        Usaha
                      </p>
                      <p className="mt-1 text-[0.82rem] font-extrabold">
                        {businessName || owner.business}
                      </p>
                      <p className="text-[0.66rem] text-muted">{owner.name}</p>
                    </div>
                    <div className="rounded-xl border border-line bg-paper p-3">
                      <p className="text-[0.55rem] font-extrabold uppercase tracking-[0.12em] text-muted">
                        Area
                      </p>
                      <p className="mt-1 text-[0.82rem] font-extrabold">
                        {area}
                      </p>
                      <p className="text-[0.66rem] text-muted">{landmark}</p>
                    </div>
                    <div className="rounded-xl border border-line bg-paper p-3">
                      <p className="text-[0.55rem] font-extrabold uppercase tracking-[0.12em] text-muted">
                        Jadwal
                      </p>
                      <p className="mt-1 text-[0.82rem] font-extrabold">
                        {schedule}
                      </p>
                    </div>
                    <div className="rounded-xl border border-line bg-paper p-3">
                      <p className="text-[0.55rem] font-extrabold uppercase tracking-[0.12em] text-muted">
                        Kontak
                      </p>
                      <p className="mt-1 text-[0.82rem] font-extrabold">
                        {maskPhone(owner.phone)}
                      </p>
                      <p className="text-[0.62rem] text-muted">
                        Dibuka setelah tugas diklaim
                      </p>
                    </div>
                  </div>
                  {notes && (
                    <div className="rounded-xl border border-line bg-paper p-3">
                      <p className="text-[0.55rem] font-extrabold uppercase tracking-[0.12em] text-muted">
                        Catatan
                      </p>
                      <p className="mt-1 text-[0.76rem] leading-relaxed text-muted">
                        {notes}
                      </p>
                    </div>
                  )}
                </div>

                <label className="mt-4 flex cursor-pointer items-start gap-2.5 rounded-xl border border-line bg-sage-2/60 p-3 text-[0.72rem] leading-relaxed">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(event) => {
                      setConsent(event.target.checked);
                      setError("");
                    }}
                    className="mt-0.5 h-4 w-4 flex-none accent-forest"
                  />
                  <span>
                    Saya setuju dihubungi pendamping dan memahami bahwa ini
                    adalah data demo yang tersimpan di perangkat ini.
                  </span>
                </label>
              </div>
            )}

            {error && (
              <p
                className="field-error mt-3 rounded-lg border border-clay/20 bg-clay-soft px-3 py-2"
                role="alert"
              >
                {error}
              </p>
            )}

            <div className="mt-5 flex items-center justify-between gap-2 border-t border-line/70 pt-4">
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={back}
                disabled={step === 0}
              >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                Kembali
              </button>
              <button type="submit" className="btn btn-primary">
                {step === 3 ? (
                  <>
                    Kirim permintaan
                    <Send className="h-4 w-4" aria-hidden="true" />
                  </>
                ) : (
                  <>
                    Lanjut
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <aside className="grid gap-3 lg:sticky lg:top-24">
          <div className="card p-4">
            <p className="eyebrow">Yang terjadi setelahnya</p>
            <ol className="mt-3 grid gap-3">
              {[
                "Permintaan tayang di Peta Rangkul.",
                "Pendamping terdekat mengklaim tugas.",
                "Kamu ditemani mengikuti resep 60 menit.",
                "Bukti diperiksa koordinator.",
              ].map((text, index) => (
                <li key={text} className="flex gap-2.5">
                  <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-sage text-[0.58rem] font-extrabold text-forest">
                    {index + 1}
                  </span>
                  <p className="text-[0.72rem] leading-relaxed text-muted">{text}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="safe-note">
            <LockKeyhole className="mt-0.5 h-4 w-4 flex-none" aria-hidden="true" />
            <p>
              Nomor dan patokan hanya dibagikan setelah ada pendamping yang
              mengambil tugas.
            </p>
          </div>

          <div className="card p-4">
            <p className="flex items-center gap-1.5 text-[0.72rem] font-extrabold">
              <ShieldCheck className="h-4 w-4 text-forest" aria-hidden="true" />
              Tidak dipungut biaya
            </p>
            <p className="mt-1 text-[0.68rem] leading-relaxed text-muted">
              RangkulUMKM adalah pendampingan sukarela. Jangan memberikan uang
              atau data sensitif kepada siapa pun.
            </p>
          </div>

          <div className="card p-4">
            <p className="flex items-center gap-1.5 text-[0.72rem] font-extrabold">
              <Info className="h-4 w-4 text-forest" aria-hidden="true" />
              Butuh bantuan mengisi?
            </p>
            <p className="mt-1 text-[0.68rem] leading-relaxed text-muted">
              Di versi nyata, pemilik usaha bisa meminta dihubungi lewat
              WhatsApp atau dibantu oleh petugas komunitas.
            </p>
            <span className="chip chip-forest mt-2">
              <Store className="h-3 w-3" aria-hidden="true" />
              {owner.business}
            </span>
          </div>
        </aside>
      </div>
    </div>
  );
}
