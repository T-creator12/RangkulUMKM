import type { ReactNode } from "react";
import { cn } from "../lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  lede,
  action,
  align = "left",
  dark = false,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  action?: ReactNode;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center md:text-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        <p className={cn("eyebrow", dark && "on-dark")}>{eyebrow}</p>
        <h2
          className={cn(
            "display-lg mt-3",
            dark ? "text-paper-2" : "text-ink",
          )}
        >
          {title}
        </h2>
        {lede && (
          <p className={cn("lede mt-4", dark && "text-sage")}>{lede}</p>
        )}
      </div>
      {action && <div className="flex flex-none flex-wrap gap-2">{action}</div>}
    </div>
  );
}
