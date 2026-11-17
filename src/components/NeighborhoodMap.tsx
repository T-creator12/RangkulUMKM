import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AREA_META, CATEGORY_META } from "../lib/data";
import type { HelpRequest } from "../lib/types";
import { cn } from "../lib/utils";
import { CategoryIcon } from "./CategoryIcon";

function MapArtwork() {
  return (
    <svg
      viewBox="0 0 1000 680"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <rect width="1000" height="680" fill="#dfe8d5" />
      <path
        d="M-40 520C120 470 240 580 390 520s230-75 380-35 210 15 280-15"
        fill="none"
        stroke="#bcd8d8"
        strokeWidth="48"
        strokeLinecap="round"
      />
      <path
        d="M-40 520C120 470 240 580 390 520s230-75 380-35 210 15 280-15"
        fill="none"
        stroke="#d9ecea"
        strokeWidth="28"
        strokeLinecap="round"
        opacity="0.65"
      />
      <g fill="#d4e0c8">
        <rect x="52" y="48" width="135" height="90" rx="16" />
        <rect x="760" y="72" width="150" height="108" rx="18" />
        <rect x="54" y="255" width="110" height="90" rx="14" />
        <rect x="815" y="330" width="130" height="96" rx="16" />
        <rect x="405" y="490" width="130" height="76" rx="14" />
      </g>
      <g fill="#eee6d3" opacity="0.7">
        <rect x="234" y="106" width="112" height="78" rx="10" />
        <rect x="438" y="92" width="174" height="94" rx="12" />
        <rect x="700" y="220" width="88" height="72" rx="10" />
        <rect x="236" y="292" width="136" height="98" rx="12" />
        <rect x="470" y="270" width="104" height="86" rx="10" />
        <rect x="266" y="458" width="90" height="76" rx="10" />
        <rect x="604" y="470" width="120" height="86" rx="12" />
        <rect x="88" y="405" width="96" height="60" rx="10" />
      </g>
      <g
        fill="none"
        stroke="#f8f2e6"
        strokeWidth="38"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M-20 190C110 160 220 205 330 190s190-70 350-50 240 75 340 48" />
        <path d="M380-20c-20 100 20 170 5 260s-10 180 20 460" />
        <path d="M790-20c-20 120-40 190-15 290s10 210-18 430" />
        <path d="M-30 360C120 320 210 380 340 360s230-35 360 5 220 15 330-20" />
        <path d="M150-20c10 70 0 120 18 180s10 140-5 530" />
        <path d="M580-20c-5 70 20 125 8 200s15 160 0 520" />
      </g>
      <g
        fill="none"
        stroke="#d8cdb9"
        strokeWidth="1.5"
        strokeDasharray="7 11"
        opacity="0.9"
      >
        <path d="M-20 190C110 160 220 205 330 190s190-70 350-50 240 75 340 48" />
        <path d="M-30 360C120 320 210 380 340 360s230-35 360 5 220 15 330-20" />
      </g>
      <g
        fill="#174a3a"
        opacity="0.5"
        fontFamily="Plus Jakarta Sans, sans-serif"
        fontSize="19"
        fontWeight="800"
        letterSpacing="1.5"
      >
        <text x="210" y="82">MELATI</text>
        <text x="640" y="585">KENANGA</text>
        <text x="90" y="610">SUKAMAJU</text>
        <text x="690" y="55">CEMPAKA</text>
      </g>
      <g fill="#174a3a" opacity="0.25">
        <circle cx="380" cy="240" r="3" />
        <circle cx="620" cy="310" r="3" />
        <circle cx="280" cy="430" r="3" />
        <circle cx="710" cy="430" r="3" />
      </g>
      <path
        d="M90 610C180 560 230 480 335 450s140 20 220-60 100-170 195-185"
        fill="none"
        stroke="#174a3a"
        strokeWidth="2.5"
        strokeDasharray="4 10"
        opacity="0.28"
      />
    </svg>
  );
}

export function NeighborhoodMap({
  requests,
  selectedId,
  onSelect,
  className,
  showLegend = false,
  interactive = true,
}: {
  requests: HelpRequest[];
  selectedId?: string;
  onSelect?: (request: HelpRequest) => void;
  className?: string;
  showLegend?: boolean;
  interactive?: boolean;
}) {
  const navigate = useNavigate();
  const visible = requests.slice(0, 12);
  const positions = useMemo(() => {
    const grouped = new Map<string, HelpRequest[]>();
    for (const request of visible) {
      const group = grouped.get(request.area) ?? [];
      group.push(request);
      grouped.set(request.area, group);
    }

    const layout = new Map<string, { x: number; y: number }>();
    for (const [area, items] of grouped) {
      const base = AREA_META[area as keyof typeof AREA_META];
      const sorted = [...items].sort((a, b) => a.id.localeCompare(b.id));
      const gap = 20;
      sorted.forEach((request, index) => {
        const offset = (index - (sorted.length - 1) / 2) * gap;
        const side = index % 2 === 0 ? -3 : 3;
        layout.set(request.id, {
          x: Math.min(94, Math.max(6, base.x + (sorted.length > 1 ? side : 0))),
          y: Math.min(92, Math.max(8, base.y + offset)),
        });
      });
    }
    return layout;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requests]);

  const handle = (request: HelpRequest) => {
    if (onSelect) {
      onSelect(request);
      return;
    }
    if (interactive) navigate(`/tugas/${request.id}`);
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[22px] border-2 border-ink bg-[#dfe8d5] shadow-[6px_6px_0_rgba(23,37,31,0.9)]",
        className,
      )}
    >
      <MapArtwork />
      <div className="absolute inset-0" aria-hidden="true" />
      {visible.map((request) => {
        const position = positions.get(request.id) ?? {
          x: AREA_META[request.area].x,
          y: AREA_META[request.area].y,
        };
        const meta = CATEGORY_META[request.category];
        const selected = selectedId === request.id;
        return (
          <button
            key={request.id}
            type="button"
            className={cn("pin-button", selected && "z-[5] scale-110")}
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              backgroundColor: meta.color,
              opacity:
                selectedId && !selected
                  ? 0.55
                  : request.status === "verified"
                    ? 0.7
                    : 1,
            }}
            onClick={() => handle(request)}
            aria-label={`${request.businessName}, ${meta.label}, ${request.area}`}
            title={`${request.businessName} · ${meta.shortLabel}`}
          >
            <CategoryIcon category={request.category} size={17} />
            <span className="pin-label">
              {request.businessName}
              <span className="block font-medium text-muted">
                {meta.shortLabel} · {request.area}
              </span>
            </span>
          </button>
        );
      })}
      {requests.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-paper/50 p-6">
          <div className="rounded-2xl border-2 border-ink bg-paper-2 px-4 py-3 text-center text-sm font-bold shadow-[4px_4px_0_#17251f]">
            Belum ada permintaan di area ini.
          </div>
        </div>
      )}
      {showLegend && (
        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
          {(Object.keys(CATEGORY_META) as Array<keyof typeof CATEGORY_META>).map(
            (category) => (
              <span
                key={category}
                className="inline-flex items-center gap-1 rounded-full border border-ink/10 bg-paper-2/95 px-2 py-1 text-[0.58rem] font-extrabold shadow-sm"
              >
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: CATEGORY_META[category].color }}
                />
                {CATEGORY_META[category].shortLabel}
              </span>
            ),
          )}
        </div>
      )}
    </div>
  );
}
