import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-9xl font-extrabold text-primary">404</h1>
      <h2 className="text-3xl font-bold mt-4">পেজটি পাওয়া যায়নি!</h2>
      <p className="text-base-content/70 mt-2 mb-6">
        আপনি যে পেজটি খুঁজছেন তা বাজারে এই মুহূর্তে নেই।
      </p>
      <Link href="/" className="btn btn-primary">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}