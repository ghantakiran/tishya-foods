"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from './AuthProvider';

export default function NavBar() {
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-[#222] text-white px-4 py-3 flex flex-wrap gap-4 items-center justify-between shadow-md">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Tishya Foods Logo" width={48} height={48} className="rounded-full bg-white p-1" />
          <span className="font-extrabold text-2xl tracking-wide text-white">TISHYA</span>
        </Link>
      </div>
      <div className="flex gap-4 flex-wrap items-center">
        <Link href="/products" className="hover:text-blue-400 font-semibold">Products</Link>
        <Link href="/blog" className="hover:text-blue-400 font-semibold">Blog</Link>
        <Link href="/cart" className="hover:text-blue-400 font-semibold">Cart</Link>
        {user ? (
          <>
            <Link href="/admin/orders" className="hover:text-blue-400 font-semibold">Admin</Link>
            <span className="text-sm text-blue-300">{user.email}</span>
            <button 
              onClick={() => signOut()} 
              className="hover:text-blue-400 text-sm font-semibold"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link href="/auth/signin" className="hover:text-blue-400 font-semibold">Sign In</Link>
            <Link href="/auth/signup" className="hover:text-blue-400 font-semibold">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
} 