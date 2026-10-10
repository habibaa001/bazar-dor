'use client';

export default function Hero() {
  const scrollToProducts = () => {
    const el = document.getElementById('সব-পণ্য');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="hero bg-base-200 py-12 px-4 rounded-3xl my-6 max-w-6xl mx-auto">
      <div className="hero-content flex-col lg:flex-row-reverse justify-between w-full">
        <div className="text-7xl lg:text-9xl text-center select-none">
          <img src="./assets/hero-image.png" alt="Hero Image" />
        </div>
        <div>
          <span className="text-sm font-semibold text-primary tracking-wide uppercase">
            দৈনন্দিন বাজারের নির্ভুল আপডেট
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold mt-2 leading-tight">
            সঠিক বাজার দর জানুন, <br />সঠিক দামে কেনাকাটা করুন
          </h1>
          <p className="py-4 text-base-content/80 max-w-lg text-sm sm:text-base">
            প্রতিদিনের চাল, ডাল, তেল, মাছ এবং সবজির হালনাগাদ বাজার দর এক জায়গায়।
          </p>
          <button onClick={scrollToProducts} className="btn btn-primary btn-md sm:btn-lg">
            সব পণ্য দেখুন
          </button>
        </div>
      </div>
    </div>
  );
}