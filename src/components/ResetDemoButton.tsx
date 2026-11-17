import { RotateCcw, TriangleAlert, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearPhotos } from "../lib/photos";
import { useAppStore } from "../lib/store";
import { cn } from "../lib/utils";

export function ResetDemoButton({
  className,
  children,
  iconOnly = false,
}: {
  className?: string;
  children?: React.ReactNode;
  iconOnly?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const resetDemo = useAppStore((state) => state.resetDemo);
  const navigate = useNavigate();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const confirm = async () => {
    await clearPhotos();
    resetDemo();
    setOpen(false);
    navigate("/");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          iconOnly ? "icon-btn" : "btn btn-ghost btn-sm",
          className,
        )}
        aria-label={iconOnly ? "Reset data demo" : undefined}
        title={iconOnly ? "Reset data demo" : undefined}
      >
        <RotateCcw className="h-4 w-4" aria-hidden="true" />
        {!iconOnly && (children ?? "Reset data demo")}
      </button>

      <dialog
        ref={dialogRef}
        className="modal"
        aria-labelledby="reset-title"
        onClose={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}
      >
        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <span className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl border-2 border-ink bg-clay-soft text-[#7c2f1e] shadow-[3px_3px_0_#17251f]">
              <TriangleAlert className="h-6 w-6" aria-hidden="true" />
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="icon-btn"
              aria-label="Tutup dialog"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <h2 id="reset-title" className="display-md mt-4">
            Kembalikan data demo?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Semua permintaan, bukti, dan sertifikat yang kamu buat di perangkat
            ini akan dihapus. Data awal demo akan dimuat ulang.
          </p>
          <div className="safe-note mt-4">
            <TriangleAlert className="mt-0.5 h-4 w-4 flex-none" aria-hidden="true" />
            <p>
              Tindakan ini tidak memengaruhi data asli siapa pun. Prototipe ini
              hanya menyimpan data di browser perangkat ini.
            </p>
          </div>
          <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setOpen(false)}
              autoFocus
            >
              Batal
            </button>
            <button type="button" className="btn btn-danger" onClick={confirm}>
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Ya, reset demo
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
