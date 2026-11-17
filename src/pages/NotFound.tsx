import { ArrowRight, Compass, Home, MapPin, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageTitle } from "../lib/usePageTitle";

export default function NotFound() {
  usePageTitle("Halaman tidak ditemukan");
  return (
    <div className="container-page py-16 sm:py-24">
      <div className="mx-auto max-w-xl text-center">
        <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-[28px] border-2 border-ink bg-marigold shadow-[5px_5px_0_#17251f]">
          <Compass className="h-11 w-11 text-ink" aria-hidden="true" />
          <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-ink bg-paper-2 text-[0.62rem] font-extrabold">
            404
          </span>
        </div>
        <h1 className="display-lg mt-6">
          Tersesat di gang yang salah.
        </h1>
        <p className="mx-auto mt-3 max-w-md text-[0.86rem] leading-relaxed text-muted">
          Halaman ini tidak ada di prototipe RangkulUMKM. Mungkin tautannya
          berubah atau data demo sudah direset.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Link to="/" className="btn btn-primary">
            <Home className="h-4 w-4" aria-hidden="true" />
            Kembali ke beranda
          </Link>
          <Link to="/jelajah" className="btn">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            Lihat peta bantuan
          </Link>
          <Link to="/cek" className="btn btn-ghost">
            <Search className="h-4 w-4" aria-hidden="true" />
            Cek bukti
          </Link>
        </div>
        <p className="mt-8 inline-flex items-center gap-1 text-[0.64rem] font-semibold text-muted">
          Satu jam. Satu tugas. Satu bukti.
          <ArrowRight className="h-3 w-3" aria-hidden="true" />
        </p>
      </div>
    </div>
  );
}
