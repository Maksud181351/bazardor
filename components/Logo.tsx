import Link from "next/link";
import TodayDate from "./TodayDate";

export function CartMark({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`grid place-items-center rounded-xl bg-primary text-primary-content ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-[58%] w-[58%]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 4h2.2l1.7 9.2a1.5 1.5 0 0 0 1.5 1.2h7.9a1.5 1.5 0 0 0 1.5-1.1L19.5 8H6.1" />
        <circle cx="9.5" cy="18.5" r="1.2" />
        <circle cx="16.5" cy="18.5" r="1.2" />
        <path d="M10 10.5h6" />
      </svg>
    </span>
  );
}

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="বাজার দর — হোম পেজ">
      <CartMark className="h-11 w-11" />
      <span className="leading-tight">
        <span className="block text-xl font-bold">বাজার দর</span>
        <TodayDate className="block text-[11px] text-muted" />
      </span>
    </Link>
  );
}
