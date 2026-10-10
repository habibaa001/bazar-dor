export default function Footer() {
  return (
    <footer className="bg-base-300 text-base-content border-t border-base-300 mt-12 py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <div>
          <h2 className="font-bold text-xl text-primary">🛒 বাজার দর</h2>
          <p className="text-sm text-base-content/70">প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
        </div>
        <div className="text-xs text-base-content/60 max-w-md">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </div>
      </div>
    </footer>
  );
}