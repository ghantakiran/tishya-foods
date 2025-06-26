"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from './AuthProvider';

export default function NavBar() {
  const { user, signOut } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md text-gray-900 px-8 py-4 flex flex-wrap gap-4 items-center justify-between shadow-md border-b border-gray-200">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Tishya Foods Logo" width={48} height={48} className="rounded-full bg-white p-1 shadow" />
          <span className="font-extrabold text-2xl tracking-wide text-gray-900">TISHYA</span>
        </Link>
      </div>
      <div className="flex gap-6 flex-wrap items-center text-lg font-medium">
        <Link href="/products" className="hover:text-green-700 transition-colors">Products</Link>
        <Link href="/blog" className="hover:text-green-700 transition-colors">Blog</Link>
        <Link href="/cart" className="hover:text-green-700 transition-colors">Cart</Link>
        {user ? (
          <>
            <Link href="/admin/orders" className="hover:text-green-700 transition-colors">Admin</Link>
            <span className="text-sm text-green-700">{user.email}</span>
            <button 
              onClick={() => signOut()} 
              className="hover:text-green-700 text-sm font-semibold transition-colors"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link href="/auth/signin" className="hover:text-green-700 transition-colors">Sign In</Link>
            <Link href="/auth/signup" className="hover:text-green-700 transition-colors">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
} 