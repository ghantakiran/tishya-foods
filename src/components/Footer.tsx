import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white text-gray-700 py-12 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Company Info */}
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">Tishya Foods</h3>
            <p className="mb-2">
              Delicious, nutritious plant-based protein products that fuel your active lifestyle while supporting the planet.
            </p>
            <div className="flex justify-center md:justify-start gap-4 mt-4">
              <a href="#" aria-label="Facebook" className="hover:opacity-80 transition-opacity">Facebook</a>
              <a href="#" aria-label="Twitter" className="hover:opacity-80 transition-opacity">Twitter</a>
              <a href="#" aria-label="Instagram" className="hover:opacity-80 transition-opacity">Instagram</a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="font-semibold mb-2">Quick Links</h4>
            <div className="flex flex-col md:flex-row gap-1 md:gap-6 items-center justify-center">
              <Link href="/" className="px-2 py-1">Home</Link>
              <Link href="/products" className="px-2 py-1">Products</Link>
              <Link href="/blog" className="px-2 py-1">Blog</Link>
              <Link href="/cart" className="px-2 py-1">Cart</Link>
            </div>
          </div>

          {/* Support */}
          <div className="text-center">
            <h4 className="font-semibold mb-2">Support</h4>
            <div className="flex flex-col md:flex-row gap-1 md:gap-6 items-center justify-center">
              <Link href="/auth/signin" className="px-2 py-1">Sign In</Link>
              <Link href="/auth/signup" className="px-2 py-1">Sign Up</Link>
              <Link href="/contact" className="px-2 py-1">Contact Us</Link>
              <Link href="/faq" className="px-2 py-1">FAQ</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Tishya Foods. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 