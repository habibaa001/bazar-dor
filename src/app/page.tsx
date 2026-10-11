import Image from "next/image";
import { getProducts, Product } from "@/lib/api";
import PriceTicker from "@/components/PriceTicker";
import ProductCard from "@/components/ProductCard";
import AllProductsSection from "@/components/AllProductsSection";

export default async function HomePage() {
  let products: Product[] = [];

  try {
    const data = await getProducts();
    products = Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Failed to load products:", error);
  }

  
  const risers = [...products]
    .sort((a, b) => (Number(b.change) || 0) - (Number(a.change) || 0))
    .slice(0, 6);

  const fallers = [...products]
    .sort((a, b) => (Number(a.change) || 0) - (Number(b.change) || 0))
    .slice(0, 6);

  return (
    <main className="pb-16" suppressHydrationWarning>
      <PriceTicker products={products} />

      <section className="bg-gradient-to-b from-emerald-50/70 to-white py-12 md:py-16 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl text-center md:text-left">
            <span className="inline-block bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full font-semibold mb-4 tracking-wide">
              দৈনন্দিন বাজার দর পর্যবেক্ষণ
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
              আজকের বাজারের দাম এক নজরে 
            </h1>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।           
              </p>
            <a
              href="#সব-পণ্য"
              className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm md:text-base px-6 py-3 rounded-xl shadow-sm hover:shadow transition-all duration-200"
            >
              সব পণ্য দেখুন
            </a>
          </div>

          <div className="w-full max-w-sm md:max-w-md relative flex justify-center">
            <div className="w-72 h-72 sm:w-80 sm:h-80 relative rounded-2xl ">
              <img
                src="./assets/bazar-hero.png"
                alt="hero-banner"
                sizes="(max-width: 768px) 288px, 320px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 mt-12 space-y-14">
        <section>
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">আজ দাম বেড়েছে</h2>
            <span className="text-rose-600 font-bold text-lg">▲</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {risers.map((p) => (
              <ProductCard key={`riser-${p.id}`} product={p} />
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">আজ দাম কমেছে</h2>
            <span className="text-emerald-600 font-bold text-lg">▼</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {fallers.map((p) => (
              <ProductCard key={`faller-${p.id}`} product={p} />
            ))}
          </div>
        </section>

        <AllProductsSection initialProducts={products} />
      </div>
    </main>
  );
}