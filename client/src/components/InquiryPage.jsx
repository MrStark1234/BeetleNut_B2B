import { useState } from "react";
import API from "../utils/api";
import { useLocation } from "react-router-dom";
import prod from "../assets/prod.svg";

const InquiryForm = () => {
  const location = useLocation();
  const productTypeDefault = location.state?.productTypeDefault || "";
  const productName = location.state?.productName || "";
  const [form, setForm] = useState({
    name: "",
    prodName: productName,
    company: "",
    email: "",
    phone: "",
    country_city: "",
    productType: productTypeDefault,
    quantity: "",
    packaging: "",
    businessFrequency: "",
    message: "",
    agreeToContact: false,
  });
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (
      !form.name ||
      !form.email ||
      !form.productType ||
      !form.agreeToContact
    ) {
      setError("Please fill required fields and agree to be contacted.");
      return;
    }
    try {
      await API.post("/inquiry", form);
      setDone(true);
    } catch (err) {
      setError("Submission failed. Try again.");
    }
  };

  if (done)
    return (
      <div className="text-green-600 p-6">
        Thank you! Your inquiry is sent. Our team will contact you soon.
      </div>
    );

  return (
    <>
      <section className="min-h-screen flex flex-col md:flex-row bg-zinc-900">
        <div className="md:flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center h-full p-8  rounded-lg shadow-lg text-center">
            <img src={prod} alt="Inquiry Image" className="w-[80%]" />
            <p className="mt-6 bg-gradient-to-r from-[#AA7454] via-[#FF8C42] to-[#FFD700] bg-clip-text text-transparent font-semibold text-lg max-w-xs mx-auto">
              Ready to grow your business?
              <br />
              Send your inquiry today and connect with us!
            </p>
          </div>
        </div>
        <div className="md:flex-1 bg-zinc-900 rounded-lg  shadow-lg">
          <form
            className="space-y-4 bg-zinc-900 text-white p-7  "
            onSubmit={handleSubmit}
          >
            <h2 className="text-xl font-bold mb-4">Send Product Inquiry</h2>
            {error && <div className="text-red-600 text-sm">{error}</div>}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
              <input
                name="name"
                type="text"
                className="border px-3 py-2 rounded focus:outline-none focus:border-orange-500"
                placeholder="Your Name *"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                name="prodName"
                type="text"
                className="border px-3 py-2 rounded focus:outline-none focus:border-orange-500"
                placeholder="Product Name *"
                value={form.prodName}
                onChange={handleChange}
                required
              />
              <input
                name="company"
                type="text"
                className="border px-3 py-2 rounded focus:outline-none focus:border-orange-500"
                placeholder="Company / Business Name"
                value={form.company}
                onChange={handleChange}
              />
              <input
                name="email"
                type="email"
                className="border px-3 py-2 rounded focus:outline-none focus:border-orange-500"
                placeholder="Email *"
                value={form.email}
                onChange={handleChange}
                required
              />
              <input
                name="phone"
                type="text"
                className="border px-3 py-2 rounded focus:outline-none focus:border-orange-500"
                placeholder="Phone No."
                value={form.phone}
                onChange={handleChange}
              />
              <input
                name="country_city"
                type="text"
                className="border px-3 py-2 rounded focus:outline-none focus:border-orange-500"
                placeholder="Country/City"
                value={form.country_city}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
              <select
                name="productType"
                className="border px-3 py-2 rounded bg-zinc-800 focus:outline-none focus:border-orange-500"
                required
                value={form.productType}
                onChange={handleChange}
              >
                <option value="">Product Type *</option>
                <option>Whole Betel Nut</option>
                <option>Sliced</option>
                <option>Powder</option>
                <option>Custom/Other</option>
              </select>
              <input
                name="quantity"
                type="text"
                className="border px-3 py-2 rounded focus:outline-none focus:border-orange-500"
                placeholder="Quantity (Kg / Ton)"
                value={form.quantity}
                onChange={handleChange}
              />
              <input
                name="packaging"
                type="text"
                className="border px-3 py-2 rounded focus:outline-none focus:border-orange-500"
                placeholder="Packaging (50kg bag, bulk, custom)"
                value={form.packaging}
                onChange={handleChange}
              />
              <select
                name="businessFrequency"
                className="border px-3 py-2 rounded bg-zinc-800 focus:outline-none focus:border-orange-500"
                value={form.businessFrequency}
                onChange={handleChange}
              >
                <option value="">Business Requirement (Frequency)</option>
                <option>One Time</option>
                <option>Regular</option>
                <option>Monthly</option>
                <option>Yearly</option>
              </select>
            </div>

            <textarea
              name="message"
              className="w-full border px-3 py-2 rounded focus:outline-none focus:border-orange-500"
              rows={3}
              placeholder="Your Message (additional info)"
              value={form.message}
              onChange={handleChange}
            />

            <div className="flex items-center">
              <input
                type="checkbox"
                name="agreeToContact"
                checked={form.agreeToContact}
                onChange={handleChange}
                className="mr-2"
                required
              />
              <label htmlFor="agreeToContact" className="text-sm">
                I agree to be contacted by your sales team. *
              </label>
            </div>

            <button className="w-full bg-gradient-to-r from-[#AA7454] via-[#FF8C42] to-[#FFD700] text-gray-700 font-bold py-2 rounded">
              Submit Inquiry
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default InquiryForm;
