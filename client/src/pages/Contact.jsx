import { useState } from "react";
import API from "../utils/api";
const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [done, setDone] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ideally: await API.post("/enquiry", form)
      setDone(true);
    } catch {
      setDone("error");
    }
  };

  if (done === true)
    return (
      <div className="max-w-md mx-auto mt-12 text-green-600">
        Thank you! We will contact you soon.
      </div>
    );

  return (
    <section className="max-w-md mx-auto bg-white p-8 mt-10 rounded shadow-sm text-black">
      <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          required
          className="w-full border rounded px-3 py-2"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          required
          className="w-full border rounded px-3 py-2"
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          required
          className="w-full border rounded px-3 py-2"
          rows={4}
          onChange={handleChange}
        ></textarea>
        <button
          type="submit"
          className="w-full bg-blue-800 text-white py-2 rounded"
        >
          Send
        </button>
      </form>
    </section>
  );
};
export default Contact;
