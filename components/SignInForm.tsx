"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";
import AuthShell from "./AuthShell";
import SocialButtons from "./SocialButtons";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function safePath(path: string | null) {
  return path && path.startsWith("/") && !path.startsWith("//") ? path : "/";
}

export default function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = safePath(params.get("callbackUrl"));
  const reason = params.get("reason");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (reason === "protected") {
      toast.error("এই পেজ দেখতে আগে সাইন ইন করুন।", { id: "protected-redirect" });
    }
  }, [reason]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");

    const problem = !EMAIL_RE.test(email)
      ? "সঠিক ইমেইল ঠিকানা দিন।"
      : !password
        ? "পাসওয়ার্ড দিন।"
        : "";
    if (problem) {
      setFormError(problem);
      toast.error(problem);
      return;
    }

    setFormError("");
    setLoading(true);
    const { error } = await signIn.email({ email, password });
    setLoading(false);

    if (error) {
      const msg =
        error.status === 401 || /invalid/i.test(error.message ?? "")
          ? "ইমেইল অথবা পাসওয়ার্ড ভুল হয়েছে।"
          : error.message || "সাইন ইন করা যায়নি। আবার চেষ্টা করুন।";
      setFormError(msg);
      toast.error(msg);
      return;
    }

    toast.success("সফলভাবে সাইন ইন হয়েছে।");
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <AuthShell
      title="সাইন ইন"
      subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।"
    >
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <label className="block">
          <span className="mb-1 block text-sm font-medium">ইমেইল</span>
          <input name="email" type="email" autoComplete="email" placeholder="you@example.com" className="input w-full" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">পাসওয়ার্ড</span>
          <input name="password" type="password" autoComplete="current-password" placeholder="••••••" className="input w-full" />
        </label>
        {formError && (
          <p role="alert" className="rounded-lg bg-up-soft px-3 py-2 text-sm text-up">{formError}</p>
        )}
        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading && <span className="loading loading-spinner loading-xs" />}
          সাইন ইন
        </button>
      </form>

      <SocialButtons callbackURL={callbackUrl} />

      <p className="mt-5 text-center text-sm text-muted">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/signup" className="font-medium text-primary hover:underline">সাইন আপ করুন</Link>
      </p>
    </AuthShell>
  );
}
