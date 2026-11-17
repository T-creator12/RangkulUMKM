import {
  Accessibility,
  Menu,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  PEOPLE,
  ROLE_HOME,
  ROLE_LABEL,
  USER_FOR_ROLE,
} from "../lib/data";
import { useAppStore } from "../lib/store";
import type { Role } from "../lib/types";
import { Avatar } from "./Avatar";
import { Logo } from "./Logo";
import { ResetDemoButton } from "./ResetDemoButton";
import { RoleSwitcher } from "./RoleSwitcher";

const navItems = [
  { to: "/umkm", label: "Untuk UMKM" },
  { to: "/jelajah", label: "Jelajah bantuan" },
  { to: "/dampak", label: "Dampak" },
  { to: "/panduan", label: "Panduan" },
];

const roles: Role[] = ["umkm", "volunteer", "verifier"];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const largeText = useAppStore((state) => state.largeText);
  const setLargeText = useAppStore((state) => state.setLargeText);
  const role = useAppStore((state) => state.role);
  const setRole = useAppStore((state) => state.setRole);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const chooseRole = (next: Role) => {
    setRole(next);
    setMenuOpen(false);
    navigate(ROLE_HOME[next]);
  };

  return (
    <header
      data-app-chrome
      className="sticky top-0 z-40 border-b border-ink/10 bg-paper/85 backdrop-blur-md"
    >
      <div className="container-page flex h-[68px] items-center justify-between gap-3">
        <Logo className="min-w-0" />

        <nav
          className="hidden items-center gap-6 lg:flex"
          aria-label="Navigasi utama"
        >
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className="nav-link">
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex flex-none items-center gap-1.5 sm:gap-2">
          <RoleSwitcher className="hidden md:block" />
          <button
            type="button"
            className="icon-btn"
            aria-pressed={largeText}
            aria-label={largeText ? "Kembalikan ukuran teks normal" : "Perbesar ukuran teks"}
            title={largeText ? "Ukuran teks besar aktif" : "Perbesar ukuran teks"}
            onClick={() => setLargeText(!largeText)}
          >
            <Accessibility className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="icon-btn lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="menu-mobile"
          className="absolute inset-x-0 top-full border-b-2 border-ink bg-paper-2 shadow-[0_12px_30px_rgba(23,37,31,0.14)] lg:hidden"
        >
          <nav
            className="container-page grid gap-1 py-3"
            aria-label="Navigasi mobile"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="rounded-xl px-3 py-3 text-sm font-extrabold hover:bg-sage-2"
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="container-page border-t border-line/70 py-3">
            <p className="mb-2 px-3 text-[0.55rem] font-extrabold uppercase tracking-[0.16em] text-muted">
              Mode demo · ganti peran
            </p>
            <div className="grid gap-1">
              {roles.map((item) => {
                const person = PEOPLE[USER_FOR_ROLE[item]];
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => chooseRole(item)}
                    className="role-option"
                    aria-current={item === role}
                  >
                    <Avatar person={person} size="md" />
                    <span className="min-w-0">
                      <span className="block text-[0.78rem] font-extrabold">
                        {person.name}
                      </span>
                      <span className="block text-[0.62rem] text-muted">
                        {ROLE_LABEL[item]} · lihat sebagai
                      </span>
                    </span>
                    {item === role && (
                      <span className="text-[0.58rem] font-extrabold text-forest">
                        Aktif
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="mt-3 flex items-center justify-between gap-2 border-t border-line/70 px-1 pt-3">
              <p className="text-[0.62rem] text-muted">Data tersimpan di perangkat.</p>
              <ResetDemoButton />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
