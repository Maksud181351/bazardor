import Link from "next/link";

export default function NotFoundView({
  title = "পেজটি খুঁজে পাওয়া যায়নি",
  message = "আপনি যে ঠিকানাটি খুঁজছেন সেটি সরানো হয়েছে অথবা ঠিকানায় ভুল আছে।",
}: {
  title?: string;
  message?: string;
}) {
  return (
    <div className="mx-auto max-w-md px-4 py-20 text-center">
      <p className="text-6xl font-bold text-primary">৪০৪</p>
      <h1 className="mt-4 text-2xl font-bold">{title}</h1>
      <p className="mt-2 text-muted">{message}</p>
      <Link href="/" className="btn btn-primary mt-6">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
