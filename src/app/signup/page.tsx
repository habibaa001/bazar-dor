'use client';

import { useState } from 'react';
import { signUp, signIn } from '../../lib/auth-client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signUp.email({ name, email, password });
      if (res.error) {
        toast.error(res.error.message || 'রেজিস্ট্রেশন ব্যর্থ হয়েছে');
      } else {
        toast.success('রেজিস্ট্রেশন সফল হয়েছে! দয়া করে লগইন করুন।');
        router.push('/signin');
      }
    } catch {
      toast.error('একটি ত্রুটি ঘটেছে');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignUp = async (provider: 'google' | 'github') => {
    await signIn.social({ provider, callbackURL: '/' });
  };

  return (
    <div className="max-w-md mx-auto my-12 p-6 bg-base-100 rounded-2xl border border-base-200 shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">নতুন একাউন্ট খুলুন</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
        <div>
          <label className="label text-sm font-medium">ইমেইল</label>
          <input
            type="email"
            required
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="label text-sm font-medium">পাসওয়ার্ড</label>
          <input
            type="password"
            required
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading} className="btn btn-primary w-full mt-4">
          {loading ? 'প্রসেসিং...' : 'সাইন আপ'}
        </button>
      </form>

      <div className="divider text-xs my-6">অথবা</div>

      <div className="space-y-2">
        <button onClick={() => handleSocialSignUp('google')} className="btn btn-outline w-full">Google দিয়ে সাইন আপ</button>
        <button onClick={() => handleSocialSignUp('github')} className="btn btn-outline w-full">GitHub দিয়ে সাইন আপ</button>
      </div>

      <p className="text-center text-sm mt-6">
        ইতিমধ্যে একাউন্ট আছে? <Link href="/signin" className="text-primary font-bold">সাইন ইন করুন</Link>
      </p>
    </div>
  );
}