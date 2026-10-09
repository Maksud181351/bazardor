"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signUp } from "@/lib/auth-client";
import AuthShell from "./AuthShell";
import SocialButtons from "./SocialButtons";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const confirm = String(form.get("confirm") ?? "");

    const problem = !name
      ? "আপনার নাম লিখুন।"
      : !EMAIL_RE.test(email)
        ? "সঠিক ইমেইল ঠিকানা দিন।"
        : password.length < 6
          ? "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।"
          : password !== confirm
            ? "দুটি পাসওয়ার্ড মেলেনি।"
            : "";
    if (problem) {
      setFormError(problem);
      toast.error(problem);
      return;
    }

    setFormError("");
    setLoading(true);
    const { error } = await signUp.email({ name, email, password });
    setLoading(false);

    if (error) {
      const msg = /exist/i.test(error.message ?? "")
        ? "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে।"
        : error.message || "অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।";
      setFormError(msg);
      toast.error(msg);
      return;
    }

    toast.success("অ্যাকাউন্ট তৈরি হয়েছে। এখন সাইন ইন করুন।");
    router.push("/signin");
  }

  return (
    <AuthShell
      title="অ্যাকাউন্ট তৈরি করুন"
      subtitle="বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।"
    >
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <label className="block">
          <span className="mb-1 block text-sm font-medium">নাম</span>
          <input name="name" type="text" autoComplete="name" placeholder="আপনার নাম" className="input w-full" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">ইমেইল</span>
          <input name="email" type="email" autoComplete="email" placeholder="you@example.com" className="input w-full" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">পাসওয়ার্ড</span>
          <input name="password" type="password" autoComplete="new-password" placeholder="কমপক্ষে ৬ অক্ষর" className="input w-full" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">পাসওয়ার্ড নিশ্চিত করুন</span>
          <input name="confirm" type="password" autoComplete="new-password" placeholder="আবার লিখুন" className="input w-full" />
        </label>
        {formError && (
          <p role="alert" className="rounded-lg bg-up-soft px-3 py-2 text-sm text-up">{formError}</p>
        )}
        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading && <span className="loading loading-spinner loading-xs" />}
          সাইন আপ
        </button>
      </form>

      <SocialButtons callbackURL="/" />

      <p className="mt-5 text-center text-sm text-muted">
        অ্যাকাউন্ট আছে?{" "}
        <Link href="/signin" className="font-medium text-primary hover:underline">সাইন ইন করুন</Link>
      </p>
    </AuthShell>
  );
}
