import type { Metadata } from "next";
import { redirect } from "next/navigation";
import UpdateProfileForm from "@/components/UpdateProfileForm";
import { getServerSession } from "@/lib/session";

export const metadata: Metadata = { title: "তথ্য আপডেট" };

export default async function UpdateProfilePage() {
  const session = await getServerSession();
  if (!session) redirect("/signin?callbackUrl=/profile/update&reason=protected");

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-3xl font-bold">তথ্য আপডেট করুন</h1>
      <p className="mt-1 text-sm text-muted">আপনার প্রোফাইলে দেখানো নাম পরিবর্তন করুন।</p>
      <div className="card-surface mt-6 p-5 sm:p-6">
        <UpdateProfileForm initialName={session.user.name} />
      </div>
    </div>
  );
}
