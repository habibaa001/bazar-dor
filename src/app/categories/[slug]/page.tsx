'use client';

import { useEffect, useState, use } from 'react';
import { fetchProducts } from '../../../lib/api';
import { Product } from '../../../lib/utils';
import ProductCard from '../../../components/ProductCard';
import Link from 'next/link';

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState<'default' | 'asc' | 'desc'>('default');

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const data = await fetchProducts(resolvedParams.slug);
        setProducts(data);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [resolvedParams.slug]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === 'asc') return a.currentPrice - b.currentPrice;
    if (sortOption === 'desc') return b.currentPrice - a.currentPrice;
    return 0;
  });

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="card bg-base-100 shadow-sm p-4 border border-base-200 animate-pulse">
              <div className="w-12 h-12 bg-base-300 rounded-full mb-3"></div>
              <div className="h-5 bg-base-300 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-base-300 rounded w-1/2 mb-4"></div>
              <div className="h-8 bg-base-300 rounded w-full mt-auto"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="max-w-md mx-auto my-20 text-center p-6 bg-base-100 rounded-2xl shadow-sm border border-base-200">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-2xl font-bold mb-2">কোনো পণ্য পাওয়া যায়নি</h2>
        <p className="text-sm text-base-content/70 mb-6">আপনার অনুসন্ধানের ক্যাটাগরিতে এই মুহূর্তে কোনো তথ্য নেই।</p>
        <Link href="/" className="btn btn-primary">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold capitalize">ক্যাটাগরি: {resolvedParams.slug}</h1>
          <p className="text-sm text-base-content/70">মোট {products.length} টি পণ্য পাওয়া গেছে</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">সাজান:</span>
          <select
            className="select select-bordered select-sm"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as 'default' | 'asc' | 'desc')}
          >
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}