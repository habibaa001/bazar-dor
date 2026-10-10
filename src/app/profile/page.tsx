'use client';

import { useSession } from '../../lib/auth-client';
import Link from 'next/link';

export default function ProfilePage() {
  const { data: session } = useSession();

  if (!session) return <div className="text-center py-20">লোড হচ্ছে...</div>;

  return (
    <div className="max-w-md mx-auto my-12 p-6 bg-base-100 border border-base-200 rounded-2xl shadow-sm text-center">
      <div className="w-20 h-20 mx-auto rounded-full bg-primary text-primary-content text-3xl font-bold flex items-center justify-center mb-4">
        {session.user.name?.[0] || 'U'}
      </div>
      <h1 className="text-2xl font-bold">{session.user.name}</h1>
      <p className="text-sm text-base-content/70 mt-1">{session.user.email}</p>

      <div className="mt-8">
        <Link href="/profile/update" className="btn btn-primary w-full">
          তথ্য আপডেট করুন
        </Link>
      </div>
    </div>
  );
}