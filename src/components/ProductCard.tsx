'use client';

import Link from 'next/link';
import { Product, toBanglaNumeral, formatBanglaPrice } from '../lib/utils';

export default function ProductCard({ product }: { product: Product }) {
  const isUp = product.priceChangePercent > 0;
  const isDown = product.priceChangePercent < 0;
  const productSlug = product.slug || product.id;

  return (
    <Link
      href={`/product/${productSlug}`}
      className="card bg-base-100 shadow-md hover:shadow-xl transition-all border border-base-200 cursor-pointer"
    >
      <div className="card-body p-4 sm:p-5">
        <div className="text-4xl mb-2">{product.emoji}</div>
        <h3 className="card-title text-lg font-bold text-base-content">{product.name}</h3>
        <p className="text-xs text-base-content/60">{product.unit}</p>

        <div className="mt-3 pt-3 border-t border-base-200 flex justify-between items-center">
          <div>
            <span className="text-xs text-base-content/60 block">আজকের দাম</span>
            <span className="font-bold text-primary text-base sm:text-lg">
              {formatBanglaPrice(product.currentPrice)}
            </span>
          </div>

          <div
            className={`badge gap-1 text-xs font-semibold p-2 ${
              isUp ? 'badge-success text-white' : isDown ? 'badge-error text-white' : 'badge-ghost'
            }`}
          >
            {isUp ? '▲' : isDown ? '▼' : '—'} {toBanglaNumeral(Math.abs(product.priceChangePercent).toFixed(1))}%
          </div>
        </div>
      </div>
    </Link>
  );
}