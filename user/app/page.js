'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('token')) router.push('/vault');
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="text-center space-y-6 px-4">
        <h1 className="text-5xl font-bold text-white mb-4">🔐 Password Vault</h1>
        <p className="text-xl text-slate-300 max-w-md mx-auto">
          Generate strong passwords and store them securely with client-side encryption
        </p>
        <div className="flex gap-4 justify-center mt-8">
          <Link href="/login" className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition">
            Login
          </Link>
          <Link href="/signup" className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}