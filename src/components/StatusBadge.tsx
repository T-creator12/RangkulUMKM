import type { RequestStatus } from "../lib/types";
import { STATUS_META, cn } from "../lib/utils";

export function StatusBadge({
  status,
  short = false,
  className,
}: {
  status: RequestStatus;
  short?: boolean;
  className?: string;
}) {
  const meta = STATUS_META[status];
  return (
    <span className={cn("status-badge", meta.className, className)}>
      {short ? meta.short : meta.label}
    </span>
  );
}
