import { formatPct } from "@/lib/format";
import type { Product } from "@/lib/types";

export default function ChangeBadge({
  change,
  size = "sm",
}: {
  change: Product["change"];
  size?: "sm" | "lg";
}) {
  const tone =
    change.dir === "up"
      ? "bg-up-soft text-up"
      : change.dir === "down"
        ? "bg-down-soft text-down"
        : "bg-flat-soft text-flat";
  const icon = change.dir === "up" ? "▲" : change.dir === "down" ? "▼" : "—";
  const label =
    change.dir === "up" ? "দাম বেড়েছে" : change.dir === "down" ? "দাম কমেছে" : "দাম অপরিবর্তিত";
  const pct = change.dir === "flat" ? "০.০%" : formatPct(change.pct);
  return (
    <span
      title={label}
      className={`inline-flex items-center gap-1 rounded-full font-semibold ${tone} ${
        size === "lg" ? "px-3 py-1 text-sm" : "px-2.5 py-1 text-xs"
      }`}
    >
      <span aria-hidden>{icon}</span>
      <span className="sr-only">{label}</span>
      {pct}
    </span>
  );
}
