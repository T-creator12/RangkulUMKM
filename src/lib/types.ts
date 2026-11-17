export type Role = "umkm" | "volunteer" | "verifier";

export type Category = "maps" | "qris" | "photo" | "bookkeeping";

export type Area = "Sukamaju" | "Cempaka" | "Melati" | "Kenanga";

export type RequestStatus =
  | "open"
  | "claimed"
  | "in_progress"
  | "submitted"
  | "verified"
  | "returned";

export type ProofType = "link" | "photo" | "both";

export interface Person {
  id: string;
  name: string;
  role: Role;
  area: Area;
  initials: string;
  color: "forest" | "clay" | "marigold" | "sage";
  business?: string;
  phone?: string;
  since?: string;
  campus?: string;
  bio?: string;
  skills?: Category[];
  availability?: string[];
}

export interface Evidence {
  link?: string;
  photoId?: string;
  note: string;
  submittedAt: string;
}

export interface Verification {
  status: "pending" | "approved" | "returned";
  note?: string;
  at?: string;
  by?: string;
}

export interface HelpRequest {
  id: string;
  code: string;
  ownerId: string;
  ownerName: string;
  businessName: string;
  category: Category;
  area: Area;
  landmark: string;
  schedule: string;
  notes: string;
  status: RequestStatus;
  volunteerId?: string;
  volunteerName?: string;
  checklistDone: number[];
  evidence?: Evidence;
  verification?: Verification;
  createdAt: string;
  claimedAt?: string;
  completedAt?: string;
}

export interface Feedback {
  id: string;
  requestId: string;
  rating: number;
  comment: string;
  name: string;
  at: string;
}

export interface ToastMessage {
  id: string;
  message: string;
  tone: "success" | "info" | "error";
}

export interface RecipeStep {
  title: string;
  detail: string;
  minutes: number;
  tip?: string;
}

export interface Recipe {
  intro: string;
  steps: RecipeStep[];
  proof: ProofType;
  proofLabel: string;
  proofPlaceholder: string;
  proofHelp: string;
  safety: string;
}

export interface CategoryMeta {
  label: string;
  shortLabel: string;
  description: string;
  duration: number;
  color: string;
  softColor: string;
  inkColor: string;
}

export interface AreaMeta {
  label: Area;
  tagline: string;
  x: number;
  y: number;
}

export interface RequestDraft {
  category: Category;
  area: Area;
  landmark: string;
  schedule: string;
  notes: string;
  businessName: string;
}
