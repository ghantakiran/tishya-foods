"use client";

import Link from 'next/link';
import { useAuth } from './AuthProvider';

export default function NavBar() {
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-green-700 text-white px-4 py-3 flex flex-wrap gap-4 items-center justify-between">
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="Tishya Foods Logo" className="h-8 w-8 rounded-full bg-white" />
        <Link href="/" className="font-bold text-lg tracking-wide">Tishya Foods</Link>
      </div>
      <div className="flex gap-4 flex-wrap items-center">
        <Link href="/products" className="hover:underline">Products</Link>
        <Link href="/blog" className="hover:underline">Blog</Link>
        <Link href="/cart" className="hover:underline">Cart</Link>
        {user ? (
          <>
            <Link href="/admin/orders" className="hover:underline">Admin</Link>
            <span className="text-sm">Welcome, {user.email}</span>
            <button 
              onClick={() => signOut()} 
              className="hover:underline text-sm"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link href="/auth/signin" className="hover:underline">Sign In</Link>
            <Link href="/auth/signup" className="hover:underline">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
} 