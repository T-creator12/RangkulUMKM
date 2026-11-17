import { ArrowDownRight, BadgeCheck, Check, Clock3, MapPin } from "lucide-react";
import { CATEGORY_META, PEOPLE } from "../lib/data";
import type { HelpRequest } from "../lib/types";
import { Avatar } from "./Avatar";
import { CategoryChip } from "./CategoryIcon";

export function HeroCollage({
  request,
  proof,
}: {
  request?: HelpRequest;
  proof?: HelpRequest;
}) {
  const owner = request ? PEOPLE[request.ownerId] : PEOPLE["u-hadi"];
  const volunteer = PEOPLE["v-raka"];
  const meta = CATEGORY_META[request?.category ?? "maps"];

  return (
    <div
      className="hero-art reveal reveal-2"
      role="img"
      aria-label="Ilustrasi alur RangkulUMKM: permintaan bantuan warung, pendamping mahasiswa, dan paspor dampak terverifikasi."
    >
      <div className="hero-orbit" aria-hidden="true" />

      <span className="hero-sticker absolute right-2 top-1 z-10 float-reverse">
        <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
        1 jam saja
      </span>

      <div className="hero-card float-slow left-0 top-12 z-[2] w-[82%] rotate-[-4deg] p-4 sm:w-[76%] sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-[0.52rem] font-extrabold uppercase tracking-[0.16em] text-muted">
            Permintaan baru
          </span>
          <span className="chip chip-marigold">Butuh bantuan</span>
        </div>
        <div className="mt-3 flex items-center gap-2.5">
          <Avatar person={owner} size="md" />
          <div className="min-w-0">
            <p className="truncate text-[0.86rem] font-extrabold">
              {request?.businessName ?? "Warung Kopi Hadi"}
            </p>
            <p className="truncate text-[0.62rem] text-muted">
              {request?.ownerName ?? "Hadi Santoso"} · {request?.area ?? "Sukamaju"}
            </p>
          </div>
        </div>
        <p className="mt-3 text-[0.78rem] font-extrabold leading-snug">
          Butuh {meta.label.toLowerCase()}
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <CategoryChip category={request?.category ?? "maps"} />
          <span className="chip">
            <MapPin className="h-3 w-3" aria-hidden="true" />
            {request?.area ?? "Sukamaju"}
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-line/80 pt-2.5 text-[0.6rem] font-semibold text-muted">
          <span>{request?.schedule ?? "Sabtu pagi"}</span>
          <span className="text-forest">60 menit</span>
        </div>
      </div>

      <div className="dotted-arrow left-[23%] top-[51%] z-[1] hidden rotate-[70deg] sm:block">
        <ArrowDownRight className="h-16 w-16" strokeWidth={1.3} aria-hidden="true" />
      </div>

      <div className="hero-card float-reverse right-0 top-[46%] z-[3] hidden w-[53%] rotate-[3deg] p-4 sm:block">
        <div className="flex items-center gap-2">
          <Avatar person={volunteer} size="md" />
          <div>
            <p className="text-[0.78rem] font-extrabold">Raka siap bantu</p>
            <p className="text-[0.58rem] text-muted">Universitas Nusantara</p>
          </div>
        </div>
        <ul className="mt-2.5 grid gap-1.5">
          {["Cek kebutuhan", "Ikuti resep 60 menit", "Kirim bukti"].map((item) => (
            <li key={item} className="flex items-center gap-1.5 text-[0.63rem] font-semibold">
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-sage text-forest">
                <Check className="h-2.5 w-2.5" aria-hidden="true" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="hero-card float-slower bottom-3 left-[7%] z-[4] w-[66%] rotate-[2deg] border-forest-dark bg-forest p-3.5 text-paper-2 sm:bottom-0 sm:w-[62%] sm:p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-[0.52rem] font-extrabold uppercase tracking-[0.16em] text-sage">
              Bukti terverifikasi
            </p>
            <p className="mt-1 text-[0.8rem] font-extrabold leading-tight">
              {proof?.businessName ?? "Warung Sayur Pak Suyatno"}
            </p>
            <p className="mt-0.5 text-[0.58rem] text-sage">
              {proof?.code ?? "RKM-2026-098"} · {proof?.area ?? "Sukamaju"}
            </p>
          </div>
          <span className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-full border border-sage/40 bg-sage/15 text-marigold">
            <BadgeCheck className="h-5 w-5" aria-hidden="true" />
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-paper-2/20 pt-2 text-[0.58rem] font-bold text-sage">
          <span>Google Maps</span>
          <span>60 menit</span>
        </div>
      </div>
    </div>
  );
}
