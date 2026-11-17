import type { Person } from "../lib/types";
import { cn } from "../lib/utils";

const sizes = {
  sm: { size: 28, font: "0.58rem" },
  md: { size: 36, font: "0.66rem" },
  lg: { size: 48, font: "0.78rem" },
  xl: { size: 72, font: "1.1rem" },
};

export function Avatar({
  person,
  size = "md",
  className,
}: {
  person?: Person;
  size?: keyof typeof sizes;
  className?: string;
}) {
  const dimension = sizes[size];
  return (
    <span
      className={cn(
        "avatar shrink-0",
        `avatar-${person?.color ?? "sage"}`,
        className,
      )}
      style={{
        width: dimension.size,
        height: dimension.size,
        fontSize: dimension.font,
      }}
      aria-hidden="true"
    >
      {person?.initials ?? "?"}
    </span>
  );
}
