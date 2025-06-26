import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
      <div className="card p-6 sm:p-12 rounded-2xl flex flex-col md:flex-row items-center gap-8 shadow-xl">
        <div className="flex-1 flex flex-col items-center md:items-start">
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 text-gray-100 text-center md:text-left">About Tishya Foods</h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-4 text-center md:text-left">
            Tishya Foods is dedicated to providing delicious, protein-rich, plant-based foods that support a healthy lifestyle and a sustainable planet.
          </p>
          <p className="text-gray-400 mb-2 text-center md:text-left">
            Our mission is to make plant-based nutrition accessible, enjoyable, and impactful for everyone. We believe in the power of natural ingredients, ethical sourcing, and eco-friendly packaging.
          </p>
          <p className="text-gray-400 text-center md:text-left">
            Whether you&apos;re an athlete, a health enthusiast, or simply looking to make better food choices, Tishya Foods is here to fuel your journey with taste and purpose.
          </p>
        </div>
        <div className="flex-1 flex justify-center md:justify-end">
          <Image src="/logo.png" alt="Tishya Foods Logo" width={224} height={224} className="w-40 h-40 sm:w-56 sm:h-56 rounded-full bg-white p-4 shadow-lg" />
        </div>
      </div>
    </div>
  );
} 