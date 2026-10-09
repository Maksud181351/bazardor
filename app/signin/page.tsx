import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import SignInForm from "@/components/SignInForm";
import { getServerSession } from "@/lib/session";

export const metadata: Metadata = { title: "সাইন ইন" };

export default async function SignInPage() {
  if (await getServerSession()) redirect("/");
  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  );
}
