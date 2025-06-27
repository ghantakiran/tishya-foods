import Link from 'next/link';
import Image from 'next/image';

export default function FAQPage() {
  return (
    <main className="bg-white min-h-screen py-16">
      <section className="container mx-auto px-4 flex flex-col items-center">
        <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl flex flex-col md:flex-row items-center gap-12 p-10">
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold mb-6 text-gray-900 text-center md:text-left">Frequently Asked Questions</h1>
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">What makes Tishya Foods different?</h2>
                <p className="text-gray-600">We focus on protein-rich, plant-based foods made from natural ingredients, with a commitment to sustainability and taste.</p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Are your products vegan and gluten-free?</h2>
                <p className="text-gray-600">Yes! All our products are 100% plant-based and most are gluten-free. Check individual product pages for details.</p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">How do I place an order?</h2>
                <p className="text-gray-600">Browse our products, add your favorites to the cart, and follow the checkout process. It&apos;s quick and easy!</p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Do you ship internationally?</h2>
                <p className="text-gray-600">Currently, we ship within the United States. Stay tuned for international shipping updates!</p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">How can I contact support?</h2>
                <p className="text-gray-600">Use our <Link href="/contact">Contact</Link> page or email us at info@tishyafoods.com.</p>
              </div>
            </div>
          </div>
          <div className="flex-1 flex justify-center md:justify-end mt-8 md:mt-0">
            <Image src="/logo.png" alt="Tishya Foods Logo" width={192} height={192} className="w-32 h-32 sm:w-48 sm:h-48 rounded-full bg-white p-4 shadow-lg" />
          </div>
        </div>
      </section>
    </main>
  );
} 