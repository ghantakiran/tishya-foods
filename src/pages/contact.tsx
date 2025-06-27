import Image from 'next/image';

export default function ContactPage() {
  return (
    <main className="bg-white min-h-screen py-16">
      <section className="container mx-auto px-4 flex flex-col items-center">
        <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl flex flex-col md:flex-row items-center gap-12 p-10">
          <div className="flex-1 w-full">
            <h1 className="text-4xl font-extrabold mb-6 text-gray-900 text-center md:text-left">Contact Us</h1>
            <p className="text-lg text-gray-600 mb-8 text-center md:text-left">
              Have a question, suggestion, or want to partner with us? Fill out the form below or email us at <a href="mailto:info@tishyafoods.com">info@tishyafoods.com</a>.
            </p>
            <form className="flex flex-col gap-4 max-w-lg mx-auto md:mx-0">
              <div className="flex flex-col sm:flex-row gap-4">
                <input type="text" placeholder="Your Name" className="border p-3 rounded-xl flex-1 text-lg" required />
                <input type="email" placeholder="Your Email" className="border p-3 rounded-xl flex-1 text-lg" required />
              </div>
              <textarea placeholder="Your Message" className="border p-3 rounded-xl h-32 text-lg" required />
              <button type="submit" className="w-full py-3 rounded-xl bg-green-700 text-white font-semibold hover:bg-green-800 transition-colors duration-200 text-lg mt-2">Send Message</button>
            </form>
            <div className="text-gray-500 mt-8 text-center md:text-left">
              <p>Tishya Foods, 123 Plant Lane, Green City, Earth</p>
              <p>Phone: +1 (555) 123-4567</p>
            </div>
          </div>
          <div className="flex-1 flex justify-center md:justify-end">
            <Image src="/logo.png" alt="Tishya Foods Logo" width={192} height={192} className="w-32 h-32 sm:w-48 sm:h-48 rounded-full bg-white p-4 shadow-lg" />
          </div>
        </div>
      </section>
    </main>
  );
} 