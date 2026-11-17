import { BookOpen, Camera, MapPin, QrCode } from "lucide-react";
import { CATEGORY_META } from "../lib/data";
import type { Category } from "../lib/types";
import { cn } from "../lib/utils";

export function CategoryIcon({
  category,
  className,
  size = 18,
}: {
  category: Category;
  className?: string;
  size?: number;
}) {
  const props = { className, size, strokeWidth: 2.2, "aria-hidden": true };
  switch (category) {
    case "maps":
      return <MapPin {...props} />;
    case "qris":
      return <QrCode {...props} />;
    case "photo":
      return <Camera {...props} />;
    case "bookkeeping":
      return <BookOpen {...props} />;
  }
}

export function CategoryChip({
  category,
  className,
  short = true,
}: {
  category: Category;
  className?: string;
  short?: boolean;
}) {
  const meta = CATEGORY_META[category];
  return (
    <span
      className={cn("chip", className)}
      style={{
        backgroundColor: meta.softColor,
        borderColor: `${meta.color}33`,
        color: meta.inkColor,
      }}
    >
      <CategoryIcon category={category} size={13} />
      {short ? meta.shortLabel : meta.label}
    </span>
  );
}
