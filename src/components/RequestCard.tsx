import { ArrowUpRight, Clock3, MapPin, Timer } from "lucide-react";
import { Link } from "react-router-dom";
import { CATEGORY_META, PEOPLE, getMatch, requestAge } from "../lib/data";
import type { HelpRequest, Person } from "../lib/types";
import { cn } from "../lib/utils";
import { Avatar } from "./Avatar";
import { CategoryChip, CategoryIcon } from "./CategoryIcon";
import { StatusBadge } from "./StatusBadge";

export function RequestCard({
  request,
  volunteer,
  showStatus = true,
  className,
  actionLabel = "Lihat tugas",
}: {
  request: HelpRequest;
  volunteer?: Person;
  showStatus?: boolean;
  className?: string;
  actionLabel?: string;
}) {
  const owner = PEOPLE[request.ownerId];
  const match = volunteer ? getMatch(request, volunteer) : null;
  const meta = CATEGORY_META[request.category];

  return (
    <article
      id={`request-${request.id}`}
      className={cn(
        "card card-hover group relative overflow-hidden p-4 sm:p-5",
        className,
      )}
    >
      <div
        className="absolute inset-x-0 top-0 h-1.5"
        style={{ background: meta.color }}
        aria-hidden="true"
      />
      <div className="flex items-start justify-between gap-3 pt-1">
        <div className="flex min-w-0 items-start gap-3">
          <Avatar person={owner} size="md" />
          <div className="min-w-0">
            <p className="truncate text-[0.68rem] font-extrabold uppercase tracking-[0.12em] text-muted">
              {request.businessName}
            </p>
            <h3 className="mt-0.5 text-[1.05rem] font-extrabold leading-tight">
              Butuh {meta.label.toLowerCase()}
            </h3>
            <p className="mt-0.5 truncate text-xs text-muted">
              {request.ownerName} · {request.area}
            </p>
          </div>
        </div>
        {showStatus && <StatusBadge status={request.status} short />}
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        <CategoryChip category={request.category} />
        <span className="chip">
          <Timer className="h-3 w-3" aria-hidden="true" />
          {meta.duration} menit
        </span>
        <span className="chip">
          <MapPin className="h-3 w-3" aria-hidden="true" />
          {request.area}
        </span>
      </div>

      <p className="mt-3 line-clamp-2 text-[0.82rem] leading-relaxed text-muted">
        {request.notes || "Pemilik usaha membutuhkan pendampingan langkah demi langkah."}
      </p>

      <div className="mt-4 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="flex items-center gap-1 text-[0.68rem] font-semibold text-muted">
            <Clock3 className="h-3 w-3" aria-hidden="true" />
            {request.schedule}
          </p>
          <p className="mt-0.5 text-[0.62rem] text-muted">
            Diajukan {requestAge(request.createdAt)}
          </p>
        </div>
        <div className="flex flex-none items-center gap-2">
          {match && (
            <span
              className="rounded-full border border-forest/20 bg-sage px-2.5 py-1 text-[0.6rem] font-extrabold text-forest-dark"
              title={match.reasons.join(" · ")}
            >
              {match.score}% cocok
            </span>
          )}
          <Link
            to={`/tugas/${request.id}`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink bg-paper-2 text-ink shadow-[2px_2px_0_#17251f] transition-transform group-hover:-translate-y-0.5"
            aria-label={`${actionLabel}: ${request.businessName}`}
          >
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function MiniRequestRow({ request }: { request: HelpRequest }) {
  const owner = PEOPLE[request.ownerId];
  const meta = CATEGORY_META[request.category];
  return (
    <Link
      to={`/tugas/${request.id}`}
      className="group flex items-center gap-3 rounded-xl border border-transparent p-2 transition-colors hover:border-line hover:bg-paper-2"
    >
      <span
        className="flex h-9 w-9 flex-none items-center justify-center rounded-lg"
        style={{ background: meta.softColor, color: meta.inkColor }}
      >
        <CategoryIcon category={request.category} size={16} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[0.78rem] font-extrabold">
          {request.businessName}
        </span>
        <span className="block truncate text-[0.65rem] text-muted">
          {meta.shortLabel} · {request.area} · {requestAge(request.createdAt)}
        </span>
      </span>
      <Avatar person={owner} size="sm" />
    </Link>
  );
}
