import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PEOPLE,
  ROLE_HOME,
  ROLE_LABEL,
  USER_FOR_ROLE,
} from "../lib/data";
import { useAppStore } from "../lib/store";
import type { Role } from "../lib/types";
import { Avatar } from "./Avatar";
import { ResetDemoButton } from "./ResetDemoButton";

const roles: Role[] = ["umkm", "volunteer", "verifier"];

const roleDescription: Record<Role, string> = {
  umkm: "Minta bantuan untuk usaha",
  volunteer: "Klaim dan kerjakan tugas",
  verifier: "Periksa bukti pendamping",
};

export function RoleSwitcher({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);
  const role = useAppStore((state) => state.role);
  const setRole = useAppStore((state) => state.setRole);
  const navigate = useNavigate();
  const person = PEOPLE[USER_FOR_ROLE[role]];

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (!wrapper.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const choose = (nextRole: Role) => {
    setRole(nextRole);
    setOpen(false);
    navigate(ROLE_HOME[nextRole]);
  };

  return (
    <div ref={wrapper} className={`relative ${className ?? ""}`}>
      <button
        type="button"
        className="inline-flex h-11 items-center gap-2 rounded-full border-[1.5px] border-line bg-paper-2/80 py-1 pl-1 pr-3 text-left transition-colors hover:border-ink/40"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={`Mode demo: ${ROLE_LABEL[role]}. Ganti peran.`}
      >
        <Avatar person={person} size="md" />
        <span className="leading-tight">
          <span className="block text-[0.52rem] font-extrabold uppercase tracking-[0.14em] text-muted">
            Mode demo
          </span>
          <span className="block text-[0.72rem] font-extrabold">
            {ROLE_LABEL[role]}
          </span>
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-muted transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-[19rem] overflow-hidden rounded-2xl border-2 border-ink bg-paper-2 p-1.5 shadow-[5px_5px_0_#17251f]">
          <p className="px-2.5 pb-1.5 pt-1 text-[0.55rem] font-extrabold uppercase tracking-[0.16em] text-muted">
            Lihat sebagai
          </p>
          {roles.map((item) => {
            const itemPerson = PEOPLE[USER_FOR_ROLE[item]];
            const active = item === role;
            return (
              <button
                key={item}
                type="button"
                className="role-option"
                aria-current={active}
                onClick={() => choose(item)}
              >
                <Avatar person={itemPerson} size="md" />
                <span className="min-w-0">
                  <span className="block text-[0.76rem] font-extrabold">
                    {itemPerson.name}
                  </span>
                  <span className="block truncate text-[0.62rem] text-muted">
                    {ROLE_LABEL[item]} · {roleDescription[item]}
                  </span>
                </span>
                {active && (
                  <Check className="h-4 w-4 text-forest" aria-hidden="true" />
                )}
              </button>
            );
          })}
          <div className="my-1 h-px bg-line/70" />
          <ResetDemoButton className="w-full justify-start rounded-xl" />
        </div>
      )}
    </div>
  );
}
