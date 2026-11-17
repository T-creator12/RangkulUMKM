import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  PEOPLE,
  SEED_REQUESTS,
  USER_FOR_ROLE,
} from "./data";
import type {
  Evidence,
  Feedback,
  HelpRequest,
  RequestDraft,
  Role,
  ToastMessage,
} from "./types";

function cloneSeed(): HelpRequest[] {
  return SEED_REQUESTS.map((request) => ({
    ...request,
    checklistDone: [...request.checklistDone],
    evidence: request.evidence ? { ...request.evidence } : undefined,
    verification: request.verification
      ? { ...request.verification }
      : undefined,
  }));
}

interface AppStore {
  requests: HelpRequest[];
  feedback: Feedback[];
  role: Role;
  largeText: boolean;
  toast: ToastMessage | null;
  createRequest: (draft: RequestDraft) => string;
  claimRequest: (id: string) => boolean;
  toggleStep: (id: string, step: number) => void;
  submitEvidence: (
    id: string,
    evidence: Omit<Evidence, "submittedAt">,
  ) => boolean;
  approveRequest: (id: string) => void;
  returnRequest: (id: string, note: string) => void;
  addFeedback: (
    requestId: string,
    rating: number,
    comment: string,
    name: string,
  ) => void;
  setRole: (role: Role) => void;
  setLargeText: (value: boolean) => void;
  notify: (message: string, tone?: ToastMessage["tone"]) => void;
  dismissToast: (id: string) => void;
  resetDemo: () => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      requests: cloneSeed(),
      feedback: [],
      role: "umkm",
      largeText: false,
      toast: null,

      createRequest: (draft) => {
        const owner = PEOPLE[USER_FOR_ROLE.umkm];
        const existing = get().requests;
        let sequence = 110;
        while (
          existing.some(
            (request) =>
              request.code ===
              `RKM-${new Date().getFullYear()}-${String(sequence).padStart(3, "0")}`,
          )
        ) {
          sequence += 1;
        }
        const code = `RKM-${new Date().getFullYear()}-${String(sequence).padStart(3, "0")}`;
        const request: HelpRequest = {
          id: `r-${Date.now().toString(36)}`,
          code,
          ownerId: owner.id,
          ownerName: owner.name,
          businessName: draft.businessName.trim() || owner.business || "",
          category: draft.category,
          area: draft.area,
          landmark: draft.landmark.trim(),
          schedule: draft.schedule,
          notes: draft.notes.trim(),
          status: "open",
          checklistDone: [],
          createdAt: new Date().toISOString(),
        };
        set({ requests: [request, ...existing] });
        return code;
      },

      claimRequest: (id) => {
        const request = get().requests.find((item) => item.id === id);
        if (!request || request.status !== "open") return false;
        const volunteer = PEOPLE[USER_FOR_ROLE.volunteer];
        set((state) => ({
          requests: state.requests.map((item) =>
            item.id === id
              ? {
                  ...item,
                  status: "claimed",
                  volunteerId: volunteer.id,
                  volunteerName: volunteer.name,
                  claimedAt: new Date().toISOString(),
                }
              : item,
          ),
        }));
        get().notify("Tugas berhasil diklaim. Yuk mulai langkah pertama.", "success");
        return true;
      },

      toggleStep: (id, step) => {
        const volunteerId = USER_FOR_ROLE.volunteer;
        set((state) => ({
          requests: state.requests.map((request) => {
            if (request.id !== id) return request;
            if (request.volunteerId !== volunteerId) return request;
            if (!["claimed", "in_progress", "returned"].includes(request.status)) {
              return request;
            }
            const done = request.checklistDone.includes(step)
              ? request.checklistDone.filter((item) => item !== step)
              : [...request.checklistDone, step];
            return {
              ...request,
              checklistDone: done.sort((a, b) => a - b),
              status: "in_progress",
            };
          }),
        }));
      },

      submitEvidence: (id, evidence) => {
        const request = get().requests.find((item) => item.id === id);
        if (!request) return false;
        if (!["claimed", "in_progress", "returned"].includes(request.status)) {
          return false;
        }
        if (request.volunteerId !== USER_FOR_ROLE.volunteer) return false;
        set((state) => ({
          requests: state.requests.map((item) =>
            item.id === id
              ? {
                  ...item,
                  status: "submitted",
                  evidence: {
                    ...evidence,
                    submittedAt: new Date().toISOString(),
                  },
                  verification: { status: "pending" },
                }
              : item,
          ),
        }));
        get().notify("Bukti terkirim. Menunggu verifikasi koordinator.", "success");
        return true;
      },

      approveRequest: (id) => {
        const verifier = PEOPLE[USER_FOR_ROLE.verifier];
        const now = new Date().toISOString();
        set((state) => ({
          requests: state.requests.map((request) =>
            request.id === id
              ? {
                  ...request,
                  status: "verified",
                  completedAt: now,
                  verification: {
                    status: "approved",
                    note: "Bukti lengkap dan sesuai.",
                    at: now,
                    by: verifier.name,
                  },
                }
              : request,
          ),
        }));
        get().notify("Tugas disetujui. Bukti dan paspor pendamping sudah terbit.", "success");
      },

      returnRequest: (id, note) => {
        const verifier = PEOPLE[USER_FOR_ROLE.verifier];
        set((state) => ({
          requests: state.requests.map((request) =>
            request.id === id
              ? {
                  ...request,
                  status: "returned",
                  verification: {
                    status: "returned",
                    note: note.trim() || "Bukti perlu dilengkapi.",
                    at: new Date().toISOString(),
                    by: verifier.name,
                  },
                }
              : request,
          ),
        }));
        get().notify("Tugas dikembalikan ke pendamping untuk diperbaiki.", "info");
      },

      addFeedback: (requestId, rating, comment, name) => {
        const feedback: Feedback = {
          id: `f-${Date.now().toString(36)}`,
          requestId,
          rating,
          comment: comment.trim(),
          name,
          at: new Date().toISOString(),
        };
        set((state) => ({ feedback: [feedback, ...state.feedback] }));
        get().notify("Terima kasih. Masukan Anda membantu kami memperbaiki layanan.", "success");
      },

      setRole: (role) => set({ role }),

      setLargeText: (value) => set({ largeText: value }),

      notify: (message, tone = "info") => {
        set({
          toast: {
            id: `t-${Date.now().toString(36)}`,
            message,
            tone,
          },
        });
      },

      dismissToast: (id) =>
        set((state) =>
          state.toast?.id === id ? { toast: null } : state,
        ),

      resetDemo: () =>
        set({
          requests: cloneSeed(),
          feedback: [],
          role: "umkm",
          toast: {
            id: `t-${Date.now().toString(36)}`,
            message: "Data demo dikembalikan ke kondisi awal.",
            tone: "success",
          },
        }),
    }),
    {
      name: "rangkul.v1",
      version: 1,
      partialize: (state) => ({
        requests: state.requests,
        feedback: state.feedback,
        role: state.role,
        largeText: state.largeText,
      }),
    },
  ),
);
