'use client';

import { Product, toBanglaNumeral, formatBanglaPrice } from '../lib/utils';

export default function Ticker({ products }: { products: Product[] }) {
  return (
    <div className="bg-slate-900 text-white overflow-hidden py-2 whitespace-nowrap border-b border-slate-800">
      <div className="inline-block animate-marquee hover:[animation-play-state:paused]">
        {products.map((p) => {
          const isUp = p.priceChangePercent > 0;
          const isDown = p.priceChangePercent < 0;
          return (
            <span key={p.id} className="inline-flex items-center gap-2 mx-4 text-sm">
              <span>{p.emoji}</span>
              <span className="font-semibold">{p.name}</span>
              <span>{formatBanglaPrice(p.currentPrice)}/{p.unit}</span>
              <span
                className={`text-xs px-1.5 py-0.5 rounded font-mono ${
                  isUp ? 'bg-emerald-500/20 text-emerald-400' : isDown ? 'bg-rose-500/20 text-rose-400' : 'bg-slate-700 text-slate-300'
                }`}
              >
                {isUp ? '▲' : isDown ? '▼' : '—'} {toBanglaNumeral(Math.abs(p.priceChangePercent).toFixed(1))}%
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}