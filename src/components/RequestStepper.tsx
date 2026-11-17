import { Check } from "lucide-react";
import type { RequestStatus } from "../lib/types";
import { STATUS_META, statusStep } from "../lib/utils";

const steps = ["Diajukan", "Diklaim", "Dikerjakan", "Verifikasi", "Selesai"];

export function RequestStepper({ status }: { status: RequestStatus }) {
  const current = statusStep(status);
  return (
    <div
      className="stepper"
      role="img"
      aria-label={`Status permintaan: ${STATUS_META[status].label}. Tahap ${current + 1} dari 5.`}
    >
      {steps.map((step, index) => {
        const done = index < current || status === "verified";
        const isCurrent = index === current && status !== "verified";
        return (
          <div
            key={step}
            className="step-dot"
            data-done={done}
            data-current={isCurrent}
          >
            <span>
              {done ? (
                <Check className="h-3 w-3" aria-hidden="true" />
              ) : (
                index + 1
              )}
            </span>
            <p>{step}</p>
          </div>
        );
      })}
    </div>
  );
}
