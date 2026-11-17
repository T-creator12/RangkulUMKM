import { ArrowUpRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { ResetDemoButton } from "./ResetDemoButton";

const footerLinks = [
  { to: "/umkm", label: "Untuk UMKM" },
  { to: "/jelajah", label: "Jelajah bantuan" },
  { to: "/dampak", label: "Dampak" },
  { to: "/panduan", label: "Panduan & keamanan" },
  { to: "/cek", label: "Cek keaslian bukti" },
];

export function Footer() {
  return (
    <footer
      data-app-chrome
      className="mt-auto border-t border-ink/10 bg-paper-2/50"
    >
      <div className="container-page grid gap-8 py-10 md:grid-cols-[1.2fr_0.8fr_1fr] md:py-12">
        <div>
          <Logo />
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            Menghubungkan warung ultra-mikro dengan pelajar dan mahasiswa
            terdekat untuk satu tugas digital yang selesai dan terverifikasi.
          </p>
          <p className="mt-4 inline-flex items-center gap-1.5 text-[0.68rem] font-semibold text-muted">
            <Heart className="h-3.5 w-3.5 text-clay" aria-hidden="true" />
            Dibuat untuk usaha kecil, bukan untuk metrik.
          </p>
        </div>

        <div>
          <h2 className="text-[0.6rem] font-extrabold uppercase tracking-[0.16em] text-muted">
            Jelajahi
          </h2>
          <ul className="mt-3 grid gap-2">
            {footerLinks.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="inline-flex items-center gap-1 text-[0.78rem] font-bold text-muted transition-colors hover:text-ink"
                >
                  {item.label}
                  <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-line bg-paper-2 p-4">
          <p className="text-[0.6rem] font-extrabold uppercase tracking-[0.16em] text-muted">
            Catatan prototipe
          </p>
          <p className="mt-2 text-[0.76rem] leading-relaxed text-muted">
            Ini adalah prototipe kompetisi. Semua data adalah data demo dan
            disimpan di browser perangkat ini. Tidak ada data yang dikirim ke
            server.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <ResetDemoButton />
            <span className="chip chip-forest">Local-first</span>
            <span className="chip">Target WCAG AA</span>
          </div>
        </div>
      </div>
      <div className="border-t border-line/70">
        <div className="container-page flex flex-col gap-1 py-4 text-[0.62rem] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} RangkulUMKM. Prototipe lokal.</p>
          <p>Satu jam. Satu tugas. Satu bukti.</p>
        </div>
      </div>
    </footer>
  );
}
