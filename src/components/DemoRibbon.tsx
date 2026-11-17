import { FlaskConical } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  PEOPLE,
  ROLE_HOME,
  ROLE_LABEL,
  USER_FOR_ROLE,
} from "../lib/data";
import { useAppStore } from "../lib/store";
import type { Role } from "../lib/types";
import { cn } from "../lib/utils";

const roles: Role[] = ["umkm", "volunteer", "verifier"];
const shortRole: Record<Role, string> = {
  umkm: "UMKM",
  volunteer: "Relawan",
  verifier: "Verifikator",
};

export function DemoRibbon() {
  const role = useAppStore((state) => state.role);
  const setRole = useAppStore((state) => state.setRole);
  const navigate = useNavigate();
  const person = PEOPLE[USER_FOR_ROLE[role]];

  return (
    <div className="border-b border-line/80 bg-sage-2/65">
      <div className="container-page flex flex-wrap items-center gap-x-3 gap-y-1.5 py-2">
        <span className="inline-flex items-center gap-1.5 text-[0.58rem] font-extrabold uppercase tracking-[0.14em] text-forest-dark">
          <FlaskConical className="h-3.5 w-3.5" aria-hidden="true" />
          Mode demo
        </span>
        <p className="text-[0.66rem] text-muted">
          Melihat sebagai <strong className="text-ink">{person.name}</strong>
          <span className="hidden sm:inline"> · {ROLE_LABEL[role]}</span>
        </p>
        <div
          className="no-scrollbar ml-auto flex max-w-full items-center gap-1 overflow-x-auto"
          role="group"
          aria-label="Ganti peran demo"
        >
          {roles.map((item) => (
            <button
              key={item}
              type="button"
              className={cn(
                "min-h-7 flex-none rounded-full border px-2.5 py-1 text-[0.58rem] font-extrabold transition-colors",
                item === role
                  ? "border-forest bg-forest text-paper-2"
                  : "border-line bg-paper-2/80 text-muted hover:border-forest/40 hover:text-ink",
              )}
              aria-pressed={item === role}
              onClick={() => {
                setRole(item);
                navigate(ROLE_HOME[item]);
              }}
            >
              {shortRole[item]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
