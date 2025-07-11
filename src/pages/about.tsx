import Image from 'next/image';

export default function AboutPage() {
  return (
    <main className="bg-white min-h-screen py-16">
      <section className="container mx-auto px-4 flex flex-col items-center">
        <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl flex flex-col md:flex-row items-center gap-12 p-10">
          <div className="flex-1 flex flex-col items-center md:items-start">
            <h1 className="text-4xl font-extrabold mb-6 text-gray-900 text-center md:text-left">About Tishya Foods</h1>
            <p className="text-lg text-gray-600 mb-4 text-center md:text-left">
              Tishya Foods is dedicated to providing delicious, protein-rich, plant-based foods that support a healthy lifestyle and a sustainable planet.
            </p>
            <p className="text-gray-500 mb-2 text-center md:text-left">
              Our mission is to make plant-based nutrition accessible, enjoyable, and impactful for everyone. We believe in the power of natural ingredients, ethical sourcing, and eco-friendly packaging.
            </p>
            <p className="text-gray-500 text-center md:text-left">
              Whether you&apos;re an athlete, a health enthusiast, or simply looking to make better food choices, Tishya Foods is here to fuel your journey with taste and purpose.
            </p>
          </div>
          <div className="flex-1 flex justify-center md:justify-end">
            <Image src="/logo.png" alt="Tishya Foods Logo" width={224} height={224} className="w-40 h-40 sm:w-56 sm:h-56 rounded-full bg-white p-4 shadow-lg" />
          </div>
        </div>
      </section>
    </main>
  );
} 