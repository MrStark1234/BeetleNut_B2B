import { useState } from "react";

// --- Enter your store address Google Map Embed Link below ---
const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29314.988998816194!2d88.3970364!3d22.5747786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0277b5d61a6d77%3A0xacb4e916f977831b!2sRaju%20Traders!5e0!3m2!1sen!2sin!4v1692792224425!5m2!1sen!2sin";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [done, setDone] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Normally: API post here...
    setDone(true);
  };

  return (
    <section className="min-h-[100vh] flex flex-col md:flex-row gap-0">
      {/* Left Form */}
      <div className=" bg-zinc-900 flex-1 p-10 flex items-center justify-center">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-5">Contact Us</h2>
          {done ? (
            <div className="bg-gradient-to-r from-[#AA7454] via-[#FF8C42] to-[#FFD700] bg-clip-text text-transparent mb-6 font-semibold text-xl">
              Thank you! We’ll get in touch soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2  focus:outline-none focus:border-orange-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:border-orange-500"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                required
                value={form.message}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:border-orange-500"
                rows={4}
              />
              <button
                type="submit"
                className="w-full text-zinc-800 py-2 px-5 rounded font-bold bg-gradient-to-r from-[#AA7454] via-[#FF8C42] to-[#FFD700] "
              >
                Send
              </button>
            </form>
          )}
          {/* -- Address below form -- */}
          <div className="mt-8 text-sm text-zinc-400">
            <p className="font-bold text-orange-500 mb-1">Store Address:</p>
            <p>
              CF Block(Newtown), Action Area 1C, Rajarhat, New Town, Kolkata,
              West Bengal 700107
            </p>
          </div>
        </div>
      </div>

      {/* Right Map */}
      <div className="flex-1 bg-blue-50 flex items-center justify-center p-0">
        <iframe
          title="Store Location"
          src={MAP_EMBED_URL}
          width="100%"
          height="100%"
          className="min-h-[300px] h-full w-full border-0"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
};

export default Contact;
