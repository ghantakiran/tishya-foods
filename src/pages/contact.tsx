export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <div className="card p-6 sm:p-12 rounded-2xl shadow-xl flex flex-col md:flex-row gap-10 items-center">
        <div className="flex-1 w-full">
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 text-gray-100 text-center md:text-left">Contact Us</h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-6 text-center md:text-left">
            Have a question, suggestion, or want to partner with us? Fill out the form below or email us at <a href="mailto:info@tishyafoods.com" className="text-blue-400 underline">info@tishyafoods.com</a>.
          </p>
          <form className="flex flex-col gap-4 max-w-lg mx-auto md:mx-0">
            <div className="flex flex-col sm:flex-row gap-4">
              <input type="text" placeholder="Your Name" className="border p-2 rounded flex-1" required />
              <input type="email" placeholder="Your Email" className="border p-2 rounded flex-1" required />
            </div>
            <textarea placeholder="Your Message" className="border p-2 rounded h-32" required />
            <button type="submit" className="btn text-lg mt-2 w-full sm:w-auto">Send Message</button>
          </form>
          <div className="text-gray-400 mt-8 text-center md:text-left">
            <p>Tishya Foods, 123 Plant Lane, Green City, Earth</p>
            <p>Phone: +1 (555) 123-4567</p>
          </div>
        </div>
        <div className="flex-1 flex justify-center md:justify-end">
          <img src="/logo.png" alt="Tishya Foods Logo" className="w-32 h-32 sm:w-48 sm:h-48 rounded-full bg-white p-4 shadow-lg" />
        </div>
      </div>
    </div>
  );
} 