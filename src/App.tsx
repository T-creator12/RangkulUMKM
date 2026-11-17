import { lazy, Suspense, useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { useAppStore } from "./lib/store";
import Landing from "./pages/Landing";

const UmkmHome = lazy(() => import("./pages/UmkmHome"));
const RequestWizard = lazy(() => import("./pages/RequestWizard"));
const Explore = lazy(() => import("./pages/Explore"));
const TaskRoom = lazy(() => import("./pages/TaskRoom"));
const Verify = lazy(() => import("./pages/Verify"));
const Impact = lazy(() => import("./pages/Impact"));
const Passport = lazy(() => import("./pages/Passport"));
const Certificate = lazy(() => import("./pages/Certificate"));
const Check = lazy(() => import("./pages/Check"));
const Guide = lazy(() => import("./pages/Guide"));
const NotFound = lazy(() => import("./pages/NotFound"));

function PageFallback() {
  return (
    <div
      className="container-page flex min-h-[60vh] flex-col items-center justify-center gap-3 py-16 text-center"
      role="status"
      aria-live="polite"
    >
      <span
        className="h-9 w-9 animate-spin rounded-full border-[3px] border-forest/25 border-t-forest"
        aria-hidden="true"
      />
      <p className="text-[0.72rem] font-extrabold text-muted">
        Memuat halaman…
      </p>
    </div>
  );
}

export default function App() {
  const largeText = useAppStore((state) => state.largeText);

  useEffect(() => {
    document.documentElement.classList.toggle("large-text", largeText);
    return () => {
      document.documentElement.classList.remove("large-text");
    };
  }, [largeText]);

  return (
    <HashRouter>
      <AppShell>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/umkm" element={<UmkmHome />} />
            <Route path="/ajukan" element={<RequestWizard />} />
            <Route path="/jelajah" element={<Explore />} />
            <Route path="/tugas/:id" element={<TaskRoom />} />
            <Route path="/verifikasi" element={<Verify />} />
            <Route path="/dampak" element={<Impact />} />
            <Route path="/paspor" element={<Passport />} />
            <Route path="/bukti/:code" element={<Certificate />} />
            <Route path="/cek" element={<Check />} />
            <Route path="/panduan" element={<Guide />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AppShell>
    </HashRouter>
  );
}
