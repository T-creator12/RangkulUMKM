import {
  BadgeCheck,
  CalendarDays,
  Clock3,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { CATEGORY_META, PEOPLE, formatDate } from "../lib/data";
import type { HelpRequest, Person } from "../lib/types";
import { cn } from "../lib/utils";

export function PassportCard({
  request,
  volunteer,
  className,
}: {
  request?: HelpRequest;
  volunteer?: Person;
  className?: string;
}) {
  const owner = request ? PEOPLE[request.ownerId] : undefined;
  const meta = request ? CATEGORY_META[request.category] : CATEGORY_META.maps;
  const date = request?.completedAt ?? request?.createdAt;

  return (
    <div className={cn("passport p-5 sm:p-7", className)}>
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[0.58rem] font-extrabold uppercase tracking-[0.18em] text-forest">
              Paspor Dampak
            </p>
            <p className="mt-1 text-[0.68rem] font-semibold text-muted">
              Bukti pendampingan yang bisa diverifikasi
            </p>
          </div>
          <span className="passport-seal" title="Terverifikasi">
            <BadgeCheck className="h-8 w-8" aria-hidden="true" />
          </span>
        </div>

        <div className="mt-6 border-y border-line/90 py-4">
          <p className="text-[0.58rem] font-extrabold uppercase tracking-[0.14em] text-muted">
            Diberikan kepada
          </p>
          <p className="display-md mt-1">{volunteer?.name ?? "Raka Pratama"}</p>
          <p className="mt-0.5 text-xs font-semibold text-muted">
            {volunteer?.campus ?? "Universitas Nusantara"}
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
          <div>
            <p className="text-[0.55rem] font-extrabold uppercase tracking-[0.12em] text-muted">
              Tugas
            </p>
            <p className="mt-0.5 text-[0.8rem] font-extrabold leading-tight">
              {meta.label}
            </p>
          </div>
          <div>
            <p className="text-[0.55rem] font-extrabold uppercase tracking-[0.12em] text-muted">
              Usaha
            </p>
            <p className="mt-0.5 text-[0.8rem] font-extrabold leading-tight">
              {request?.businessName ?? "Warung Sayur Pak Suyatno"}
            </p>
          </div>
          <div>
            <p className="text-[0.55rem] font-extrabold uppercase tracking-[0.12em] text-muted">
              Lokasi
            </p>
            <p className="mt-0.5 flex items-center gap-1 text-[0.75rem] font-bold">
              <MapPin className="h-3 w-3 text-forest" aria-hidden="true" />
              {request?.area ?? owner?.area ?? "Sukamaju"}
            </p>
          </div>
          <div>
            <p className="text-[0.55rem] font-extrabold uppercase tracking-[0.12em] text-muted">
              Durasi
            </p>
            <p className="mt-0.5 flex items-center gap-1 text-[0.75rem] font-bold">
              <Clock3 className="h-3 w-3 text-forest" aria-hidden="true" />
              {meta.duration} menit
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-forest/15 bg-sage-2/80 p-3">
          <div>
            <p className="text-[0.52rem] font-extrabold uppercase tracking-[0.14em] text-muted">
              Kode bukti
            </p>
            <p className="mt-0.5 font-mono text-[0.78rem] font-extrabold tracking-tight">
              {request?.code ?? "RKM-2026-098"}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[0.52rem] font-extrabold uppercase tracking-[0.14em] text-muted">
              Tanggal
            </p>
            <p className="mt-0.5 flex items-center gap-1 text-[0.7rem] font-bold">
              <CalendarDays className="h-3 w-3 text-forest" aria-hidden="true" />
              {date ? formatDate(date) : "8 November 2026"}
            </p>
          </div>
        </div>

        <p className="mt-3 flex items-center gap-1.5 text-[0.6rem] font-semibold text-muted">
          <ShieldCheck className="h-3.5 w-3.5 text-forest" aria-hidden="true" />
          Diverifikasi oleh {request?.verification?.by ?? "Nia Kartika"} · RangkulUMKM
        </p>
      </div>
    </div>
  );
}
