import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";
import { useEffect } from "react";
import { useAppStore } from "../lib/store";

const icons = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
};

export function Toasts() {
  const toast = useAppStore((state) => state.toast);
  const dismissToast = useAppStore((state) => state.dismissToast);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => dismissToast(toast.id), 4600);
    return () => window.clearTimeout(timeout);
  }, [toast, dismissToast]);

  return (
    <div
      className="pointer-events-none fixed inset-x-4 bottom-4 z-[70] flex justify-center sm:inset-x-auto sm:right-5 sm:justify-end"
      aria-live="polite"
      aria-atomic="true"
    >
      {toast && (
        <div className={`toast toast-${toast.tone} pointer-events-auto`}>
          {(() => {
            const Icon = icons[toast.tone];
            return <Icon className="mt-0.5 h-5 w-5 flex-none" aria-hidden="true" />;
          })()}
          <p className="flex-1">{toast.message}</p>
          <button
            type="button"
            onClick={() => dismissToast(toast.id)}
            className="-m-1 inline-flex h-8 w-8 flex-none items-center justify-center rounded-full hover:bg-ink/5"
            aria-label="Tutup notifikasi"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
