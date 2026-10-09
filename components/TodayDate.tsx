"use client";

import { useEffect, useState } from "react";
import { banglaDate } from "@/lib/format";

/** Rendered on the client so a statically cached page never shows a stale date. */
export default function TodayDate({ className = "" }: { className?: string }) {
  const [label, setLabel] = useState<string>("");
  useEffect(() => setLabel(banglaDate()), []);
  return (
    <span className={className} suppressHydrationWarning>
      {label || "\u00A0"}
    </span>
  );
}
