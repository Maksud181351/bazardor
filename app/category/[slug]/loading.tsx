import { GridSkeleton } from "@/components/Skeletons";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-6">
      <div className="card-surface flex items-center gap-4 p-5 sm:p-6" aria-hidden>
        <div className="skeleton h-14 w-14 rounded-2xl" />
        <div className="space-y-2">
          <div className="skeleton h-7 w-28" />
          <div className="skeleton h-3 w-44" />
        </div>
      </div>
      <div className="skeleton mt-4 h-16 w-full rounded-2xl" aria-hidden />
      <div className="mt-6">
        <GridSkeleton count={6} />
      </div>
    </div>
  );
}
