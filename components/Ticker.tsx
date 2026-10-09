import { getProducts } from "@/lib/api";
import { formatBn, formatPct, unitShort } from "@/lib/format";
import type { Product } from "@/lib/types";

function TickerItem({ p }: { p: Product }) {
  const color =
    p.change.dir === "up" ? "text-up" : p.change.dir === "down" ? "text-down" : "text-flat";
  const icon = p.change.dir === "up" ? "▲" : p.change.dir === "down" ? "▼" : "—";
  return (
    <li className="flex shrink-0 items-center gap-2 border-r border-line px-5 text-[13px]">
      <span aria-hidden className="text-base">{p.image}</span>
      <span className="font-medium">{p.nameBn}</span>
      <span className="text-muted">
        {formatBn(p.today)} টাকা/{unitShort(p.unit)}
      </span>
      <span className={`font-semibold ${color}`}>
        {icon} {p.change.dir === "flat" ? "০.০%" : formatPct(p.change.pct)}
      </span>
    </li>
  );
}

export default async function Ticker() {
  let products: Product[] = [];
  try {
    products = await getProducts();
  } catch {
    return null;
  }
  return (
    <div
      className="ticker overflow-hidden border-y border-line bg-base-100 py-2.5"
      role="marquee"
      aria-label="আজকের পণ্যের দামের তালিকা"
    >
      <ul className="ticker-track">
        {products.map((p) => (
          <TickerItem key={p.id} p={p} />
        ))}
        {/* duplicate set makes the loop seamless */}
        {products.map((p) => (
          <TickerItem key={`dup-${p.id}`} p={p} />
        ))}
      </ul>
    </div>
  );
}
