import TodayDate from "./TodayDate";
import BasketArt from "./BasketArt";

export default function Hero() {
  return (
    <section className="card-surface overflow-hidden">
      <div className="grid items-center gap-8 p-6 sm:p-10 md:grid-cols-[1.4fr_1fr]">
        <div>
          <TodayDate className="inline-block rounded-full bg-down-soft px-3 py-1 text-sm font-medium text-down" />
          <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-[42px]">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়,
            সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a href="#সব-পণ্য" className="btn btn-primary mt-6">
            সব পণ্য দেখুন
          </a>
        </div>
        <BasketArt className="mx-auto w-full max-w-[320px] md:ml-auto" />
      </div>
    </section>
  );
}
