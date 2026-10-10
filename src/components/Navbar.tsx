'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from '../lib/auth-client';
import { getFormattedBanglaDate } from '../lib/utils';
import toast from 'react-hot-toast';

const categories = [
  { slug: '', label: 'সব' },
  { slug: 'chal', label: 'চাল' },
  { slug: 'daal', label: 'ডাল' },
  { slug: 'tel', label: 'তেল' },
  { slug: 'shobji', label: 'সবজি' },
  { slug: 'mach', label: 'মাছ' },
  { slug: 'mangsho', label: 'মাংস' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut();
    toast.success('সফলভাবে সাইন আউট করা হয়েছে');
  };

  return (
    <header className="sticky top-0 z-50 bg-base-100 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex flex-col">
          <span className="text-2xl font-bold text-primary flex items-center gap-1">
            <img src="./assets/logo-icon.png" alt="Logo" className="w-8 h-8" /> বাজার দর
          </span>
          <span className="text-xs text-base-content/70">{getFormattedBanglaDate()}</span>
        </Link>

        <div className="flex items-center gap-3">
          {session ? (
            <div className="flex items-center gap-3">
              <Link href="/profile" className="w-10 h-10 rounded-full bg-primary text-primary-content flex items-center justify-center font-bold">
                {session.user.name?.[0] || 'U'}
              </Link>
              <button onClick={handleSignOut} className="btn btn-outline btn-sm">
                সাইন আউট
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link href="/signin" className="btn btn-outline btn-sm sm:btn-md">সাইন ইন</Link>
              <Link href="/signup" className="btn btn-primary btn-sm sm:btn-md">সাইন আপ</Link>
            </div>
          )}
        </div>
      </div>

      <div className="bg-base-200 border-t border-b border-base-300">
        <div className="max-w-6xl mx-auto px-4 overflow-x-auto flex gap-4 py-2 text-sm font-medium">
          {categories.map((cat) => {
            const href = cat.slug ? `/categories/${cat.slug}` : '/';
            const isActive = pathname === href;
            return (
              <Link
                key={cat.slug}
                href={href}
                className={`whitespace-nowrap px-3 py-1 rounded-full transition-colors ${
                  isActive ? 'bg-primary text-primary-content font-bold' : 'hover:bg-base-300'
                }`}
              >
                {cat.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}