import type { Metadata } from "next";
import { redirect } from "next/navigation";
import SignUpForm from "@/components/SignUpForm";
import { getServerSession } from "@/lib/session";

export const metadata: Metadata = { title: "সাইন আপ" };

export default async function SignUpPage() {
  if (await getServerSession()) redirect("/");
  return <SignUpForm />;
}
