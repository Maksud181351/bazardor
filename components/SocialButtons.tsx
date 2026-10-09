"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-4 w-4" aria-hidden>
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.800 2.400 30.300 0 24 0 14.600 0 6.500 5.400 2.600 13.200l7.900 6.100C12.400 13.600 17.700 9.500 24 9.500z" />
      <path fill="#4285F4" d="M46.500 24.500c0-1.600-.1-3.100-.4-4.500H24v9h12.700c-.6 3-2.300 5.500-4.800 7.200l7.600 5.900c4.400-4.100 7-10.100 7-17.600z" />
      <path fill="#FBBC05" d="M10.500 28.700A14.500 14.500 0 0 1 9.500 24c0-1.600.3-3.200.9-4.700l-7.900-6.100A24 24 0 0 0 0 24c0 3.900.9 7.500 2.600 10.800l7.900-6.100z" />
      <path fill="#34A853" d="M24 48c6.500 0 11.900-2.100 15.900-5.800l-7.600-5.900c-2.100 1.400-4.900 2.300-8.300 2.300-6.300 0-11.600-4.100-13.500-9.800l-7.900 6.100C6.500 42.600 14.600 48 24 48z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M12 .5a11.500 11.500 0 0 0-3.640 22.410c.575.105.785-.25.785-.555 0-.275-.010-1-.015-1.960-3.200.695-3.875-1.540-3.875-1.540-.525-1.330-1.280-1.685-1.280-1.685-1.045-.715.080-.70.080-.70 1.155.080 1.765 1.185 1.765 1.185 1.025 1.760 2.690 1.250 3.350.955.105-.745.400-1.250.730-1.540-2.555-.290-5.240-1.280-5.240-5.690 0-1.255.450-2.280 1.185-3.085-.120-.290-.515-1.460.110-3.040 0 0 .965-.310 3.160 1.180a10.900 10.900 0 0 1 5.750 0c2.195-1.490 3.160-1.180 3.160-1.180.625 1.580.230 2.750.110 3.040.740.805 1.185 1.830 1.185 3.085 0 4.420-2.690 5.395-5.255 5.680.410.355.780 1.055.780 2.130 0 1.540-.015 2.780-.015 3.160 0 .310.205.665.790.550A11.500 11.500 0 0 0 12 .5z" />
    </svg>
  );
}

export default function SocialButtons({ callbackURL = "/" }: { callbackURL?: string }) {
  const [busy, setBusy] = useState<"google" | "github" | null>(null);

  async function social(provider: "google" | "github") {
    setBusy(provider);
    const { error } = await signIn.social({
      provider,
      callbackURL,
      errorCallbackURL: "/signin",
    });
    if (error) {
      setBusy(null);
      toast.error(error.message || "সোশ্যাল লগইন করা যায়নি। আবার চেষ্টা করুন।");
    }
  }

  return (
    <>
      <div className="divider my-5 text-xs text-muted">অথবা</div>
      <div className="grid gap-2 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => social("google")}
          disabled={busy !== null}
          className="btn btn-outline border-line bg-base-100 btn-sm sm:btn-md"
        >
          {busy === "google" ? <span className="loading loading-spinner loading-xs" /> : <GoogleIcon />}
          Google দিয়ে চালিয়ে যান
        </button>
        <button
          type="button"
          onClick={() => social("github")}
          disabled={busy !== null}
          className="btn btn-outline border-line bg-base-100 btn-sm sm:btn-md"
        >
          {busy === "github" ? <span className="loading loading-spinner loading-xs" /> : <GithubIcon />}
          GitHub দিয়ে চালিয়ে যান
        </button>
      </div>
    </>
  );
}
