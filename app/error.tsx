"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto max-w-md px-4 py-20 text-center">
      <h1 className="text-2xl font-bold">দাম লোড করা যায়নি</h1>
      <p className="mt-2 text-muted">
        সার্ভারের সঙ্গে সংযোগ হয়নি। কিছুক্ষণ পর আবার চেষ্টা করুন।
      </p>
      <div className="mt-6 flex justify-center gap-2">
        <button onClick={reset} className="btn btn-primary">আবার চেষ্টা করুন</button>
        <Link href="/" className="btn btn-ghost">হোম পেজে ফিরে যান</Link>
      </div>
    </div>
  );
}
