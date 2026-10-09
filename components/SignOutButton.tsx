"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signOut } from "@/lib/auth-client";

export default function SignOutButton() {
  const router = useRouter();
  async function onClick() {
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
    <button onClick={onClick} className="btn btn-outline btn-error btn-sm sm:btn-md">
      ↩ সাইন আউট
    </button>
  );
}
