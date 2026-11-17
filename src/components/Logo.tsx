import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

export function Logo({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <Link
      to="/"
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label="RangkulUMKM — beranda"
    >
      <span className="relative inline-flex h-10 w-10 flex-none items-center justify-center overflow-hidden rounded-[13px] border-2 border-ink bg-forest shadow-[2px_2px_0_#17251f] transition-transform group-hover:-rotate-3">
        <svg viewBox="0 0 40 40" aria-hidden="true" className="h-8 w-8">
          <rect x="8" y="16" width="24" height="16" rx="3" fill="#fffaf0" />
          <path d="M6 16L10 9h20l4 7H6Z" fill="#f2a93b" />
          <path
            d="M10 9v7M16 9v7M22 9v7M28 9v7"
            stroke="#17251f"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M6 16c0 2.2 1.8 4 4 4s4-1.8 4-4c0 2.2 1.8 4 4 4s4-1.8 4-4c0 2.2 1.8 4 4 4s4-1.8 4-4c0 2.2 1.8 4 4 4s4-1.8 4-4"
            fill="none"
            stroke="#17251f"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <rect x="17" y="23" width="6" height="9" rx="1.5" fill="#174a3a" />
          <circle cx="31" cy="9" r="2.2" fill="#c65b3d" />
        </svg>
      </span>
      {!compact && (
        <span className="flex min-w-0 flex-col leading-none">
          <span className="font-display text-[1.35rem] font-semibold tracking-[-0.045em]">
            Rangkul<span className="text-forest">UMKM</span>
          </span>
          <span className="mt-0.5 hidden text-[0.55rem] font-extrabold uppercase tracking-[0.18em] text-muted sm:block">
            Satu jam · satu bukti
          </span>
        </span>
      )}
    </Link>
  );
}
