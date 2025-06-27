import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-white text-gray-900 py-24 border-b border-gray-100">
        <div className="container mx-auto px-4 flex flex-col items-center text-center">
          <h1 className="text-6xl font-bold mb-6 tracking-tight">Plant-Based Protein for a Healthier You</h1>
          <p className="text-2xl mb-8 max-w-2xl mx-auto text-gray-600">
            Discover our range of delicious, nutritious plant-based protein products that fuel your active lifestyle while supporting the planet.
          </p>
          <div className="flex gap-4 justify-center flex-wrap mb-12">
            <Link href="/products">Shop Products</Link>
            <Link href="/blog">Read Our Blog</Link>
          </div>
          <div className="w-full flex justify-center">
            <img src="/logo.png" alt="Hero Product" className="w-[340px] h-[340px] object-contain rounded-3xl shadow-xl border border-gray-100 bg-white" />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Plant Protein Powder",
                description: "Complete protein blend with essential amino acids",
                price: "$29.99",
                image: "/protein-powder.jpg"
              },
              {
                name: "Protein Bars",
                description: "Delicious bars packed with plant protein",
                price: "$24.99",
                image: "/protein-bars.jpg"
              },
              {
                name: "Protein Shakes",
                description: "Ready-to-drink protein shakes",
                price: "$19.99",
                image: "/protein-shakes.jpg"
              }
            ].map((product, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Product Image</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-green-600">{product.price}</span>
                    <Link 
                      href="/products" 
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Tishya Foods?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">100% Plant-Based</h3>
              <p className="text-gray-600">
                All our products are made from natural, plant-based ingredients 
                that are good for you and the environment.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💪</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Complete Protein</h3>
              <p className="text-gray-600">
                Our protein products contain all essential amino acids your body 
                needs for muscle growth and recovery.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Eco-Friendly</h3>
              <p className="text-gray-600">
                Sustainable packaging and ethical sourcing practices that 
                minimize our environmental impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Plant-Based Journey?</h2>
          <p className="text-xl mb-8">
            Join thousands of customers who have transformed their health with our products.
          </p>
          <Link 
            href="/products" 
            className="bg-green-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-800 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
}
