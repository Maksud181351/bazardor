"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/lib/types";
import Logo from "./Logo";
import UserMenu from "./UserMenu";

export default function Navbar({ categories }: { categories: Category[] }) {
  const pathname = usePathname();

  return (
    <header className="bg-base-100">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Logo />
        <UserMenu />
      </div>
      <nav aria-label="পণ্যের ধরন" className="border-t border-line">
        <ul className="no-scrollbar mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2">
          {categories.map((c) => {
            const href = `/category/${c.slug}`;
            const active = pathname === href;
            return (
              <li key={c.id} className="shrink-0">
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-primary text-primary-content"
                      : "text-base-content hover:bg-base-200"
                  }`}
                >
                  <span aria-hidden>{c.icon}</span>
                  {c.nameBn}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
