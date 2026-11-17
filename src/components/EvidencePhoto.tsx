import { ImageIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { loadPhoto } from "../lib/photos";

export function EvidencePhoto({
  photoId,
  alt,
  className,
}: {
  photoId?: string;
  alt: string;
  className?: string;
}) {
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(Boolean(photoId));

  useEffect(() => {
    let active = true;
    setLoading(Boolean(photoId));
    if (!photoId) {
      setUrl(null);
      return;
    }
    loadPhoto(photoId)
      .then((result) => {
        if (active) setUrl(result);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [photoId]);

  if (!photoId) return null;

  if (loading) {
    return (
      <div
        className={`flex min-h-32 items-center justify-center rounded-xl border border-line bg-sage-2 ${className ?? ""}`}
        aria-label="Memuat foto bukti"
      >
        <ImageIcon className="h-6 w-6 animate-pulse text-muted" aria-hidden="true" />
      </div>
    );
  }

  if (!url) {
    return (
      <div
        className={`flex min-h-32 flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-line bg-sage-2 p-4 text-center text-xs text-muted ${className ?? ""}`}
      >
        <ImageIcon className="h-5 w-5" aria-hidden="true" />
        Foto tidak dapat dimuat.
      </div>
    );
  }

  return (
    <img
      src={url}
      alt={alt}
      className={`w-full rounded-xl border border-line object-cover ${className ?? ""}`}
      loading="lazy"
    />
  );
}
