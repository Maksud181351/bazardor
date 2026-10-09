import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import Avatar from "@/components/Avatar";
import SignOutButton from "@/components/SignOutButton";
import { getServerSession } from "@/lib/session";

export const metadata: Metadata = { title: "আমার প্রোফাইল" };

export default async function ProfilePage() {
  const session = await getServerSession();
  if (!session) redirect("/signin?callbackUrl=/profile&reason=protected");
  const { user } = session;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-bold">আমার প্রোফাইল</h1>
      <p className="mt-1 text-sm text-muted">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>

      <section className="card-surface mt-6 p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Avatar name={user.name} image={user.image} className="h-16 w-16 text-2xl" />
            <div className="min-w-0">
              <p className="truncate text-lg font-semibold">{user.name}</p>
              <p className="truncate text-sm text-muted">{user.email}</p>
            </div>
          </div>
          <SignOutButton />
        </div>
      </section>

      <section className="card-surface mt-5 p-5 sm:p-6">
        <h2 className="text-lg font-bold">তথ্য</h2>
        <dl className="mt-3 space-y-3 text-sm">
          <div className="flex justify-between gap-4 border-b border-line pb-3">
            <dt className="text-muted">নাম</dt>
            <dd className="font-medium">{user.name}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">ইমেইল</dt>
            <dd className="truncate font-medium">{user.email}</dd>
          </div>
        </dl>
        <Link href="/profile/update" className="btn btn-primary mt-5 w-full sm:w-auto">
          তথ্য আপডেট করুন
        </Link>
      </section>
    </div>
  );
}
