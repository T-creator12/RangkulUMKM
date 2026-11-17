import { clear, get, set } from "idb-keyval";
import { SEED_PHOTOS } from "./data";

const PHOTO_PREFIX = "rangkul.photo.";

export function compressImage(
  file: File,
  maxDimension = 1400,
  quality = 0.84,
): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("Berkas harus berupa gambar."));
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      reject(new Error("Ukuran foto maksimal 8 MB."));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Foto tidak bisa dibaca."));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error("Format foto tidak dikenali."));
      image.onload = () => {
        const ratio = Math.min(
          1,
          maxDimension / Math.max(image.width, image.height),
        );
        const width = Math.max(1, Math.round(image.width * ratio));
        const height = Math.max(1, Math.round(image.height * ratio));
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext("2d");
        if (!context) {
          reject(new Error("Foto tidak bisa diproses."));
          return;
        }
        context.fillStyle = "#fffdf7";
        context.fillRect(0, 0, width, height);
        context.drawImage(image, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      image.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

export async function savePhoto(dataUrl: string): Promise<string> {
  const id = `p-${crypto.randomUUID()}`;
  await set(`${PHOTO_PREFIX}${id}`, dataUrl);
  return id;
}

export async function clearPhotos(): Promise<void> {
  try {
    await clear();
  } catch {
    // IndexedDB may be unavailable (private mode). Reset must still work.
  }
}

export async function loadPhoto(photoId?: string): Promise<string | null> {
  if (!photoId) return null;
  if (SEED_PHOTOS[photoId]) return SEED_PHOTOS[photoId];
  try {
    return (await get<string>(`${PHOTO_PREFIX}${photoId}`)) ?? null;
  } catch {
    return null;
  }
}
