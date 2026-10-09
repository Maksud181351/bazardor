export default function Loading() {
  return (
    <div className="mx-auto max-w-5xl space-y-5 px-4 pt-6" role="status" aria-label="লোড হচ্ছে…">
      <div className="skeleton h-4 w-48" />
      <div className="skeleton h-32 w-full rounded-2xl" />
      <div className="skeleton h-44 w-full rounded-2xl" />
      <div className="skeleton h-80 w-full rounded-2xl" />
    </div>
  );
}
