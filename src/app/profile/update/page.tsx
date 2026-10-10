'use client';

import { useState } from 'react';
import { useSession, updateUser } from '../../../lib/auth-client';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function UpdateProfilePage() {
  const { data: session } = useSession();
  const [name, setName] = useState(session?.user.name || '');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await updateUser({ name });
      if (res.error) {
        toast.error('আপডেট ব্যর্থ হয়েছে');
      } else {
        toast.success('তথ্য সফলভাবে আপডেট করা হয়েছে!');
        router.push('/profile');
        router.refresh();
      }
    } catch {
      toast.error('একটি সমস্যা ঘটেছে');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 p-6 bg-base-100 border border-base-200 rounded-2xl shadow-sm">
      <h1 className="text-2xl font-bold text-center mb-6">প্রোফাইল আপডেট করুন</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="label text-sm font-medium">নাম</label>
          <input
            type="text"
            required
            className="input input-bordered w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading ? 'আপডেট হচ্ছে...' : 'Update Information'}
        </button>
      </form>
    </div>
  );
}