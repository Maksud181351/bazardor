"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { updateUser } from "@/lib/auth-client";

export default function UpdateProfileForm({ initialName }: { initialName: string }) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      toast.error("নাম খালি রাখা যাবে না।");
      return;
    }
    setLoading(true);
    // https://better-auth.com/docs/concepts/users-accounts#update-user
    const { error } = await updateUser({ name: trimmed });
    setLoading(false);
    if (error) {
      toast.error(error.message || "তথ্য আপডেট করা যায়নি। আবার চেষ্টা করুন।");
      return;
    }
    toast.success("তথ্য সফলভাবে আপডেট হয়েছে।");
    router.push("/profile");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <label className="block">
        <span className="mb-1 block text-sm font-medium">নাম</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          autoComplete="name"
          className="input w-full"
        />
      </label>
      <div className="flex flex-wrap gap-2">
        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading && <span className="loading loading-spinner loading-xs" />}
          তথ্য আপডেট করুন
        </button>
        <Link href="/profile" className="btn btn-ghost">বাতিল</Link>
      </div>
    </form>
  );
}
