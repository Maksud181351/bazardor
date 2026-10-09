import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import ChangeBadge from "@/components/ChangeBadge";
import { getProductBySlug } from "@/lib/api";
import { formatBn, formatTaka, unitLine, unitShort } from "@/lib/format";
import { getServerSession } from "@/lib/session";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug).catch(() => null);
  return { title: product ? product.nameBn : "পণ্য পাওয়া যায়নি" };
}

function SummaryCard({
  label,
  value,
  note,
  tone,
}: {
  label: string;
  value: number;
  note: string;
  tone: string;
}) {
  return (
    <div className="rounded-xl border border-line bg-base-100 p-4">
      <p className="text-sm text-muted">{label}</p>
      <p className={`mt-1 text-2xl font-bold ${tone}`}>{formatTaka(value)}</p>
      <p className="mt-1 text-xs text-muted">{note}</p>
    </div>
  );
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  // Unknown slug -> friendly 404, whether or not the visitor is signed in.
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  // Protected route.
  const session = await getServerSession();
  if (!session) {
    redirect(`/signin?callbackUrl=${encodeURIComponent(`/product/${slug}`)}&reason=protected`);
  }

  const mins = product.markets.map((m) => m.min);
  const maxs = product.markets.map((m) => m.max);
  const min = Math.min(...mins);
  const max = Math.max(...maxs);
  const mids = product.markets.map((m) => (m.min + m.max) / 2);
  const avg = Math.round(mids.reduce((a, b) => a + b, 0) / mids.length);
  const unit = unitShort(product.unit);

  const history = [
    { label: "গতকাল", value: product.yesterday },
    { label: "গত সপ্তাহ", value: product.lastWeek },
    { label: "গত মাস", value: product.lastMonth },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 pt-6">
      <nav aria-label="breadcrumb" className="mb-4 text-sm text-muted">
        <Link href="/" className="hover:text-primary">হোম</Link>
        <span className="mx-2" aria-hidden>›</span>
        <Link href={`/category/${product.category}`} className="hover:text-primary">
          {product.categoryNameBn}
        </Link>
        <span className="mx-2" aria-hidden>›</span>
        <span className="text-base-content">{product.nameBn}</span>
      </nav>

      <section className="card-surface flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-center gap-4">
          <span aria-hidden className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-base-200 text-4xl">
            {product.image}
          </span>
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">{product.nameBn}</h1>
            <p className="mt-1 text-sm text-muted">
              সারা দেশের বাজারের তথ্য অনুযায়ী আজকের দাম {formatTaka(product.today)}, {unitLine(product.unit)}।
            </p>
            <div className="mt-2 flex flex-wrap gap-2 text-xs">
              <Link
                href={`/category/${product.category}`}
                className="rounded-full bg-base-200 px-3 py-1 font-medium hover:bg-base-300"
              >
                {product.categoryIcon} {product.categoryNameBn}
              </Link>
              <span className="rounded-full bg-base-200 px-3 py-1 font-medium">{unitLine(product.unit)}</span>
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-base-200 px-5 py-3 text-center sm:min-w-40">
          <p className="text-xs text-muted">আজকের দাম</p>
          <p className="text-3xl font-bold">{formatBn(product.today)}</p>
          <p className="text-xs text-muted">টাকা / {unit}</p>
          <div className="mt-2">
            <ChangeBadge change={product.change} />
          </div>
        </div>
      </section>

      <section className="card-surface mt-5 p-5 sm:p-6" aria-labelledby="summary">
        <h2 id="summary" className="text-lg font-bold">দামের সারসংক্ষেপ</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <SummaryCard label="সর্বনিম্ন দাম" value={min} note="সবচেয়ে কম দামের বাজারে" tone="text-down" />
          <SummaryCard label="সর্বোচ্চ দাম" value={max} note="সবচেয়ে বেশি দামের বাজারে" tone="text-up" />
          <SummaryCard label="গড় দাম" value={avg} note="সব বাজারের গড় মূল্য" tone="" />
        </div>
        <dl className="mt-3 grid grid-cols-3 gap-3 text-center text-sm">
          {history.map((h) => (
            <div key={h.label} className="rounded-xl bg-base-200 px-2 py-2">
              <dt className="text-xs text-muted">{h.label}</dt>
              <dd className="font-semibold">{formatTaka(h.value)}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="card-surface mt-5 p-5 sm:p-6" aria-labelledby="markets">
        <h2 id="markets" className="text-lg font-bold">বাজারভিত্তিক আজকের দাম</h2>
        <div className="mt-3 overflow-x-auto rounded-xl border border-line">
          <table className="table min-w-[560px] text-sm">
            <thead className="bg-base-200 text-muted">
              <tr>
                <th>বাজার</th>
                <th>বিভাগ</th>
                <th className="text-right">সর্বনিম্ন</th>
                <th className="text-right">সর্বোচ্চ</th>
                <th className="text-right">গড়</th>
              </tr>
            </thead>
            <tbody>
              {product.markets.map((m) => (
                <tr key={`${m.division}-${m.market}`} className="hover:bg-base-200/50">
                  <td className="font-medium">{m.market}</td>
                  <td>{m.division}</td>
                  <td className="text-right">{formatTaka(m.min)}</td>
                  <td className="text-right">{formatTaka(m.max)}</td>
                  <td className="text-right font-semibold">{formatTaka((m.min + m.max) / 2, 2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-base-200 font-semibold">
                <td colSpan={2}>সব বাজারের গড়</td>
                <td className="text-right">{formatTaka(min)}</td>
                <td className="text-right">{formatTaka(max)}</td>
                <td className="text-right">{formatTaka(avg)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>
    </div>
  );
}
