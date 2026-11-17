import { CATEGORY_META } from "./data";
import type { HelpRequest, RequestStatus } from "./types";

export function cn(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(" ");
}

export const STATUS_META: Record<
  RequestStatus,
  { label: string; short: string; description: string; className: string }
> = {
  open: {
    label: "Menunggu pendamping",
    short: "Terbuka",
    description: "Permintaan sudah tayang dan siap diklaim.",
    className: "status-open",
  },
  claimed: {
    label: "Pendamping ditemukan",
    short: "Diklaim",
    description: "Seorang pendamping akan menghubungi pemilik usaha.",
    className: "status-claimed",
  },
  in_progress: {
    label: "Sedang dikerjakan",
    short: "Dikerjakan",
    description: "Pendamping sedang menjalankan langkah-langkah tugas.",
    className: "status-progress",
  },
  submitted: {
    label: "Menunggu verifikasi",
    short: "Diverifikasi",
    description: "Bukti sudah dikirim dan sedang diperiksa koordinator.",
    className: "status-submitted",
  },
  verified: {
    label: "Selesai & terverifikasi",
    short: "Selesai",
    description: "Bukti sudah disetujui. Paspor dampak sudah terbit.",
    className: "status-verified",
  },
  returned: {
    label: "Perlu diperbaiki",
    short: "Dikembalikan",
    description: "Koordinator meminta bukti atau langkah tambahan.",
    className: "status-returned",
  },
};

export function maskPhone(phone?: string): string {
  if (!phone) return "Nomor disembunyikan";
  const parts = phone.split("-");
  if (parts.length < 3) return phone;
  return `${parts[0]}-••••-${parts[parts.length - 1]}`;
}

export function getVerified(requests: HelpRequest[]): HelpRequest[] {
  return requests
    .filter((request) => request.status === "verified")
    .sort(
      (a, b) =>
        new Date(b.completedAt ?? b.createdAt).getTime() -
        new Date(a.completedAt ?? a.createdAt).getTime(),
    );
}

export function getOpen(requests: HelpRequest[]): HelpRequest[] {
  return requests.filter((request) => request.status === "open");
}

export function getVolunteerRequests(
  requests: HelpRequest[],
  volunteerId: string,
): HelpRequest[] {
  return requests
    .filter((request) => request.volunteerId === volunteerId)
    .sort(
      (a, b) =>
        new Date(b.claimedAt ?? b.createdAt).getTime() -
        new Date(a.claimedAt ?? a.createdAt).getTime(),
    );
}

export function getVolunteerStats(
  requests: HelpRequest[],
  volunteerId: string,
): {
  verified: HelpRequest[];
  active: HelpRequest[];
  minutes: number;
  categories: number;
} {
  const mine = getVolunteerRequests(requests, volunteerId);
  const verified = mine.filter((request) => request.status === "verified");
  const active = mine.filter((request) =>
    ["claimed", "in_progress", "submitted", "returned"].includes(request.status),
  );
  const minutes = verified.reduce(
    (total, request) => total + CATEGORY_META[request.category].duration,
    0,
  );
  return {
    verified,
    active,
    minutes,
    categories: new Set(verified.map((request) => request.category)).size,
  };
}

export interface ImpactStats {
  verified: HelpRequest[];
  umkm: number;
  volunteers: number;
  minutes: number;
  areas: number;
  categories: Record<string, number>;
  areaCounts: Record<string, number>;
}

export function getImpactStats(requests: HelpRequest[]): ImpactStats {
  const verified = getVerified(requests);
  const categories: Record<string, number> = {};
  const areaCounts: Record<string, number> = {};
  let minutes = 0;
  for (const request of verified) {
    minutes += CATEGORY_META[request.category].duration;
    categories[request.category] = (categories[request.category] ?? 0) + 1;
    areaCounts[request.area] = (areaCounts[request.area] ?? 0) + 1;
  }
  return {
    verified,
    umkm: new Set(verified.map((request) => request.ownerId)).size,
    volunteers: new Set(verified.map((request) => request.volunteerId)).size,
    minutes,
    areas: new Set(verified.map((request) => request.area)).size,
    categories,
    areaCounts,
  };
}

export function certificateUrl(code: string): string {
  const base = `${window.location.origin}${window.location.pathname}`;
  return `${base}#/bukti/${code}`;
}

export function plural(
  count: number,
  singular: string,
  pluralWord = `${singular}-${singular}`,
): string {
  return `${count} ${count === 1 ? singular : pluralWord}`;
}

export function statusStep(status: RequestStatus): number {
  switch (status) {
    case "open":
      return 0;
    case "claimed":
      return 1;
    case "in_progress":
      return 2;
    case "submitted":
      return 3;
    case "verified":
      return 4;
    case "returned":
      return 2;
  }
}

export function isTaskEditable(
  request: HelpRequest,
  volunteerId: string,
): boolean {
  return (
    request.volunteerId === volunteerId &&
    ["claimed", "in_progress", "returned"].includes(request.status)
  );
}
