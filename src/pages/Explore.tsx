import {
  ArrowRight,
  BadgeCheck,
  Filter,
  HandHeart,
  Map,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NeighborhoodMap } from "../components/NeighborhoodMap";
import { RequestCard } from "../components/RequestCard";
import { StatusBadge } from "../components/StatusBadge";
import {
  AREA_LIST,
  CATEGORY_LIST,
  CATEGORY_META,
  PEOPLE,
  USER_FOR_ROLE,
  getMatch,
} from "../lib/data";
import { useAppStore } from "../lib/store";
import type { Area, Category, HelpRequest } from "../lib/types";
import { cn, getOpen } from "../lib/utils";
import { usePageTitle } from "../lib/usePageTitle";

type SortMode = "match" | "new";

export default function Explore() {
  usePageTitle("Jelajah bantuan");
  const role = useAppStore((state) => state.role);
  const setRole = useAppStore((state) => state.setRole);
  const requests = useAppStore((state) => state.requests);
  const volunteer = PEOPLE[USER_FOR_ROLE.volunteer];
  const navigate = useNavigate();

  const [category, setCategory] = useState<Category | "all">("all");
  const [area, setArea] = useState<Area | "all">("all");
  const [sort, setSort] = useState<SortMode>("match");
  const [selectedId, setSelectedId] = useState<string>();
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (role !== "volunteer") setRole("volunteer");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const open = getOpen(requests);
  const myActive = requests.filter(
    (request) =>
      request.volunteerId === volunteer.id &&
      ["claimed", "in_progress", "submitted", "returned"].includes(request.status),
  );

  const filtered = useMemo(() => {
    const result = open.filter(
      (request) =>
        (category === "all" || request.category === category) &&
        (area === "all" || request.area === area),
    );
    return result.sort((a, b) => {
      if (sort === "new") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return getMatch(b, volunteer).score - getMatch(a, volunteer).score;
    });
  }, [open, category, area, sort, volunteer]);

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const request of open) {
      map[request.category] = (map[request.category] ?? 0) + 1;
    }
    return map;
  }, [open]);

  const selectPin = (request: HelpRequest) => {
    setSelectedId(request.id);
    window.requestAnimationFrame(() => {
      document
        .getElementById(`request-${request.id}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  };

  const resetFilters = () => {
    setCategory("all");
    setArea("all");
    setSort("match");
  };

  return (
    <div className="container-page py-8 sm:py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Peta Rangkul · untuk pendamping</p>
          <h1 className="display-lg mt-2">
            Pilih satu tugas.{" "}
            <span className="serif-italic text-forest">Bantu satu warung.</span>
          </h1>
          <p className="lede mt-2">
            Halo, {volunteer.name.split(" ")[0]}. Tugas diurutkan berdasarkan
            kedekatan area, keahlian, dan jadwalmu.
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <span className="chip chip-forest">
            <MapPin className="h-3 w-3" aria-hidden="true" />
            {volunteer.area}
          </span>
          <span className="chip">
            <HandHeart className="h-3 w-3" aria-hidden="true" />
            {open.length} terbuka
          </span>
          <Link to="/paspor" className="chip">
            <BadgeCheck className="h-3 w-3" aria-hidden="true" />
            Paspor
          </Link>
        </div>
      </div>

      {myActive.length > 0 && (
        <section aria-labelledby="tugas-saya" className="mt-6">
          <div className="flex items-center justify-between gap-2">
            <h2
              id="tugas-saya"
              className="text-[0.62rem] font-extrabold uppercase tracking-[0.14em] text-muted"
            >
              Tugas yang kamu ambil
            </h2>
            <span className="chip">{myActive.length} aktif</span>
          </div>
          <div className="mt-2 grid gap-2 md:grid-cols-2">
            {myActive.map((request) => (
              <Link
                key={request.id}
                to={`/tugas/${request.id}`}
                className="card card-hover flex items-center gap-3 p-3"
              >
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-sage text-forest">
                  <HandHeart className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[0.78rem] font-extrabold">
                    {request.businessName}
                  </span>
                  <span className="block truncate text-[0.62rem] text-muted">
                    {CATEGORY_META[request.category].shortLabel} · {request.area}
                  </span>
                </span>
                <StatusBadge status={request.status} short />
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:items-start">
        <div className="lg:sticky lg:top-24">
          <NeighborhoodMap
            requests={filtered}
            selectedId={selectedId}
            onSelect={selectPin}
            className="h-[300px] sm:h-[420px] lg:h-[580px]"
            showLegend
          />
          <div className="mt-2 flex items-center justify-between gap-2 px-1 text-[0.6rem] text-muted">
            <p className="inline-flex items-center gap-1">
              <Map className="h-3 w-3" aria-hidden="true" />
              Klik pin untuk melihat permintaan.
            </p>
            <span>{filtered.length} titik</span>
          </div>
        </div>

        <div>
          <div className="card p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="inline-flex items-center gap-1.5 text-[0.68rem] font-extrabold">
                <Filter className="h-3.5 w-3.5 text-forest" aria-hidden="true" />
                Filter tugas
              </p>
              <button
                type="button"
                className="btn btn-ghost btn-sm lg:hidden"
                aria-expanded={showFilters}
                onClick={() => setShowFilters((value) => !value)}
              >
                {showFilters ? "Tutup" : "Atur"}
              </button>
              <button
                type="button"
                className="hidden items-center gap-1 text-[0.62rem] font-bold text-muted hover:text-ink lg:inline-flex"
                onClick={resetFilters}
              >
                <X className="h-3 w-3" aria-hidden="true" />
                Reset
              </button>
            </div>

            <div
              className={cn(
                "mt-3 grid gap-3",
                !showFilters && "hidden lg:grid",
              )}
            >
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  className={cn(
                    "chip",
                    category === "all" && "border-forest bg-sage text-forest-dark",
                  )}
                  aria-pressed={category === "all"}
                  onClick={() => setCategory("all")}
                >
                  Semua ({open.length})
                </button>
                {CATEGORY_LIST.map((item) => {
                  const meta = CATEGORY_META[item];
                  return (
                    <button
                      key={item}
                      type="button"
                      className="chip"
                      style={
                        category === item
                          ? {
                              background: meta.softColor,
                              borderColor: meta.color,
                              color: meta.inkColor,
                            }
                          : undefined
                      }
                      aria-pressed={category === item}
                      onClick={() => setCategory(item)}
                    >
                      {meta.shortLabel} ({counts[item] ?? 0})
                    </button>
                  );
                })}
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                <label className="field">
                  <span className="field-label text-[0.62rem]">Area</span>
                  <select
                    className="input min-h-10 py-2 text-[0.72rem]"
                    value={area}
                    onChange={(event) =>
                      setArea(event.target.value as Area | "all")
                    }
                  >
                    <option value="all">Semua area</option>
                    {AREA_LIST.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="field">
                  <span className="field-label text-[0.62rem]">Urutkan</span>
                  <select
                    className="input min-h-10 py-2 text-[0.72rem]"
                    value={sort}
                    onChange={(event) => setSort(event.target.value as SortMode)}
                  >
                    <option value="match">Paling cocok</option>
                    <option value="new">Terbaru</option>
                  </select>
                </label>
              </div>
              <button
                type="button"
                className="btn btn-ghost btn-sm justify-start lg:hidden"
                onClick={resetFilters}
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
                Reset filter
              </button>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.12em] text-muted">
              {filtered.length} permintaan ditemukan
            </p>
            <span className="chip chip-forest">
              <Sparkles className="h-3 w-3" aria-hidden="true" />
              {sort === "match" ? "Sesuai profilmu" : "Terbaru"}
            </span>
          </div>

          <div className="mt-2 grid gap-3">
            {filtered.length > 0 ? (
              filtered.map((request) => (
                <RequestCard
                  key={request.id}
                  request={request}
                  volunteer={volunteer}
                  className={cn(
                    selectedId === request.id &&
                      "ring-2 ring-forest ring-offset-2 ring-offset-paper",
                  )}
                />
              ))
            ) : (
              <div className="empty-state">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage text-forest">
                  <Search className="h-6 w-6" aria-hidden="true" />
                </span>
                <h2 className="text-[0.95rem] font-extrabold">
                  Belum ada tugas yang cocok
                </h2>
                <p className="max-w-xs text-[0.72rem] leading-relaxed text-muted">
                  Coba area lain atau reset filter. Permintaan baru akan muncul
                  di sini secara otomatis.
                </p>
                <button type="button" className="btn btn-sm" onClick={resetFilters}>
                  Reset filter
                </button>
              </div>
            )}
          </div>

          <div className="safe-note mt-4">
            <ShieldCheck className="mt-0.5 h-4 w-4 flex-none" aria-hidden="true" />
            <p>
              Ambil satu tugas pada satu waktu. Jangan meminta OTP, PIN, atau
              uang. Bukti harus berasal dari pekerjaan yang benar-benar selesai.
            </p>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-line bg-paper-2 p-3">
            <div>
              <p className="text-[0.7rem] font-extrabold">
                Sudah menyelesaikan tugas?
              </p>
              <p className="text-[0.62rem] text-muted">
                Lihat bukti dan paspor dampakmu.
              </p>
            </div>
            <div className="flex gap-1.5">
              <Link to="/paspor" className="btn btn-sm">
                Paspor
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => navigate("/panduan")}
              >
                Panduan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
