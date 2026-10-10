import { fetchSingleProduct } from "../../../lib/api";
import { notFound } from 'next/navigation';
import { formatBanglaPrice } from '../../../lib/utils';
import Link from 'next/link';

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await fetchSingleProduct(params.slug);

  if (!product) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/" className="btn btn-ghost btn-sm mb-6">
        ← হোম পেজে ফিরে যান
      </Link>

      <div className="bg-base-100 border border-base-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-6xl">{product.emoji}</span>
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-sm text-base-content/70">{product.marketSummary || 'আজকের বাজার দর সম্পর্কিত সংক্ষিপ্ত বিবরণ'}</p>
            <div className="flex gap-2 mt-2">
              <span className="badge badge-primary badge-outline">{product.category}</span>
              <span className="badge badge-ghost">{product.unit}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 my-6 bg-base-200 p-4 rounded-xl text-center">
          <div>
            <span className="text-xs text-base-content/70 block">সর্বনিম্ন দাম</span>
            <span className="font-bold text-lg text-success">{formatBanglaPrice(product.minPrice || product.currentPrice)}</span>
          </div>
          <div>
            <span className="text-xs text-base-content/70 block">গড় দাম</span>
            <span className="font-bold text-lg text-primary">{formatBanglaPrice(product.avgPrice || product.currentPrice)}</span>
          </div>
          <div>
            <span className="text-xs text-base-content/70 block">সর্বোচ্চ দাম</span>
            <span className="font-bold text-lg text-error">{formatBanglaPrice(product.maxPrice || product.currentPrice)}</span>
          </div>
        </div>

        <h2 className="text-xl font-bold mt-8 mb-4">বাজারভিত্তিক আজকের দাম</h2>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>বাজারের নাম</th>
                <th className="text-right">দাম</th>
              </tr>
            </thead>
            <tbody>
              {product.bazarPrices && product.bazarPrices.length > 0 ? (
                product.bazarPrices.map((b, i) => (
                  <tr key={i}>
                    <td>{b.bazarName}</td>
                    <td className="text-right font-bold">{formatBanglaPrice(b.price)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>কারওয়ান বাজার</td>
                  <td className="text-right font-bold">{formatBanglaPrice(product.currentPrice)}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}