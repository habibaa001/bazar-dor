import { toBengaliNumber } from "@/lib/utils";
import type { Product } from "@/lib/api";

export default function PriceTicker({ products }: { products: Product[] }) {
  if (!products || products.length === 0) return null;

  const tickerItems = [...products, ...products];

  return (
    <div
      className="w-full overflow-hidden  text-black border-y border-gray-200 py-2"
      aria-label="বাজার দর ও পণ্যের মূল্য"
    >
      <div className="flex w-max animate-marquee hover:pause-marquee">
        {tickerItems.map((item, idx) => {
          const changeVal = Number(item.change) || 0;
          const isUp = changeVal > 0;
          const isFlat = changeVal === 0;

          return (
            <span
              key={`${item.id}-${idx}`}
              className="inline-flex shrink-0 items-center gap-2 px-5 text-xs font-medium"
            >
              <span className="text-sm">{item.emoji || "🛍️"}</span>
              <span>{item.name}</span>

              <span className="text-gray-500">
                {toBengaliNumber(item.price)} টাকা/{item.unit || "কেজি"}
              </span>

              <span
                className={`font-semibold ${
                  isFlat
                    ? "text-gray-500"
                    : isUp
                    ? "text-red-700"
                    : "text-green-600"
                }`}
              >
                {isFlat
                  ? "— ০.০%"
                  : isUp
                  ? `▲ ${toBengaliNumber(changeVal)}%`
                  : `▼ ${toBengaliNumber(Math.abs(changeVal))}%`}
              </span>

              <span className="ml-3 text-gray-300">|</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}