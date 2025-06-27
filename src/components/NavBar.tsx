"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from './AuthProvider';
import { MagnifyingGlassIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

export default function NavBar() {
  const { user, signOut } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-white text-gray-900 px-8 py-4 flex items-center justify-between shadow-md border-b border-gray-200">
      <div className="flex items-center gap-3 flex-1">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Tishya Foods Logo" width={40} height={40} className="rounded-full bg-white p-1 shadow" />
        </Link>
      </div>
      <div className="flex-1 flex justify-center">
        <div className="flex gap-20 items-center text-lg font-medium">
          <Link href="/products">Products</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/faq">FAQ</Link>
        </div>
      </div>
      <div className="flex-1 flex justify-end items-center gap-6">
        <Link href="/search" className="hover:text-green-700 transition-colors" aria-label="Search">
          <MagnifyingGlassIcon className="w-6 h-6" />
        </Link>
        <Link href="/cart" className="hover:text-green-700 transition-colors" aria-label="Cart">
          <ShoppingCartIcon className="w-6 h-6" />
        </Link>
        {user ? (
          <>
            <Link href="/admin/orders" className="hover:text-green-700 transition-colors text-sm">Admin</Link>
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
            <Link href="/auth/signin" className="hover:text-green-700 transition-colors text-sm">Sign In</Link>
            <Link href="/auth/signup" className="hover:text-green-700 transition-colors text-sm">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
} 