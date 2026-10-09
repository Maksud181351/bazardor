export function CardSkeleton() {
  return (
    <div className="card-surface p-4" aria-hidden>
      <div className="flex items-center gap-3">
        <div className="skeleton h-12 w-12 rounded-xl" />
        <div className="space-y-2">
          <div className="skeleton h-4 w-28" />
          <div className="skeleton h-3 w-16" />
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between">
        <div className="space-y-2">
          <div className="skeleton h-3 w-14" />
          <div className="skeleton h-6 w-20" />
        </div>
        <div className="skeleton h-6 w-16 rounded-full" />
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-1 gap-4 min-[560px]:grid-cols-2 lg:grid-cols-3"
      role="status"
      aria-label="লোড হচ্ছে…"
    >
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function TickerSkeleton() {
  return (
    <div className="border-y border-line bg-base-100 py-2.5" aria-hidden>
      <div className="mx-auto flex max-w-6xl gap-8 overflow-hidden px-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton h-4 w-44 shrink-0" />
        ))}
      </div>
    </div>
  );
}

export function HomeSkeleton() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-8" role="status" aria-label="লোড হচ্ছে…">
      <div className="card-surface p-8">
        <div className="skeleton h-6 w-48 rounded-full" />
        <div className="skeleton mt-5 h-10 w-2/3" />
        <div className="skeleton mt-4 h-4 w-1/2" />
        <div className="skeleton mt-8 h-10 w-36" />
      </div>
      <GridSkeleton />
      <GridSkeleton />
    </div>
  );
}
