"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signOut, useSession } from "@/lib/auth-client";
import Avatar from "./Avatar";

export default function UserMenu() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  if (isPending) {
    return (
      <div className="flex items-center gap-2" aria-label="লোড হচ্ছে…" role="status">
        <div className="skeleton h-9 w-9 rounded-full" />
        <div className="skeleton hidden h-4 w-16 sm:block" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center gap-1 sm:gap-2">
        <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md">
          সাইন ইন
        </Link>
        <Link href="/signup" className="btn btn-outline btn-primary btn-sm sm:btn-md">
          সাইন আপ
        </Link>
      </div>
    );
  }

  const { user } = session;

  async function handleSignOut() {
    (document.activeElement as HTMLElement | null)?.blur();
    const { error } = await signOut();
    if (error) {
      toast.error(error.message || "সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
      return;
    }
    toast.success("সফলভাবে সাইন আউট হয়েছে।");
    router.push("/");
    router.refresh();
  }

  return (
    <div className="dropdown dropdown-end">
      <button
        type="button"
        tabIndex={0}
        className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 hover:bg-base-200"
        aria-label="ব্যবহারকারীর মেনু"
      >
        <Avatar name={user.name} image={user.image} />
        <span className="hidden max-w-28 truncate text-sm font-medium sm:block">{user.name}</span>
        <svg viewBox="0 0 20 20" className="h-3 w-3 text-muted" fill="currentColor" aria-hidden>
          <path d="M5.5 7.5 10 12l4.5-4.5z" />
        </svg>
      </button>
      <div
        tabIndex={0}
        className="dropdown-content card-surface z-50 mt-2 w-64 p-2 shadow-lg"
      >
        <div className="border-b border-line px-3 pb-2 pt-1">
          <p className="truncate font-semibold">{user.name}</p>
          <p className="truncate text-xs text-muted">{user.email}</p>
        </div>
        <Link
          href="/profile"
          onClick={() => (document.activeElement as HTMLElement | null)?.blur()}
          className="mt-1 block rounded-lg px-3 py-2 text-sm hover:bg-base-200"
        >
          আমার প্রোফাইল
        </Link>
        <button
          type="button"
          onClick={handleSignOut}
          className="block w-full rounded-lg px-3 py-2 text-left text-sm text-up hover:bg-up-soft"
        >
          ↩ সাইন আউট
        </button>
      </div>
    </div>
  );
}
