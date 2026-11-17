import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DemoRibbon } from "./DemoRibbon";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Toasts } from "./Toasts";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const showDemo =
    pathname !== "/" &&
    pathname !== "/cek" &&
    !pathname.startsWith("/bukti/");

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#konten" className="skip-link">
        Lewati ke konten utama
      </a>
      <ScrollToTop />
      <Header />
      {showDemo && <DemoRibbon />}
      <main id="konten" tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>
      <Footer />
      <Toasts />
    </div>
  );
}
