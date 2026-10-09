import Link from "next/link";

export default function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-md px-4 py-10 sm:py-14">
      <h1 className="text-center text-3xl font-bold">{title}</h1>
      <p className="mx-auto mt-2 max-w-sm text-center text-sm text-muted">{subtitle}</p>
      <div className="card-surface mt-6 p-5 sm:p-7">{children}</div>
      <p className="mt-6 text-center text-sm text-muted">
        <Link href="/" className="hover:text-primary">← হোম পেজে ফিরে যান</Link>
      </p>
    </div>
  );
}
