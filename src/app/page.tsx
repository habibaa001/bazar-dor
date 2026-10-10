import Hero from '../components/Hero';
import Ticker from '../components/Ticker';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../lib/api';

export default async function HomePage() {
  const products = await fetchProducts();

  const topRisers = [...products]
    .filter((p) => p.priceChangePercent > 0)
    .sort((a, b) => b.priceChangePercent - a.priceChangePercent)
    .slice(0, 6);

  const topFallers = [...products]
    .filter((p) => p.priceChangePercent < 0)
    .sort((a, b) => a.priceChangePercent - b.priceChangePercent)
    .slice(0, 6);

  return (
    <div>
      <Ticker products={products} />
      <div className="max-w-6xl mx-auto px-4">
        <Hero />

        {topRisers.length > 0 && (
          <section className="my-10">
            <h2 className="text-2xl font-bold text-error mb-4">আজ দাম বেড়েছে ▲</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {topRisers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {topFallers.length > 0 && (
          <section className="my-10">
            <h2 className="text-2xl font-bold text-success mb-4">আজ দাম কমেছে ▼</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {topFallers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        <section id="সব-পণ্য" className="my-10 scroll-mt-24">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">সব পণ্য</h2>
            <p className="text-sm text-base-content/70">সকল নিত্যপ্রয়োজনীয় পণ্যের তালিকা</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}