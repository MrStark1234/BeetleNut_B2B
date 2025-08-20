// src/components/Testimonials.jsx

const testimonials = [
  {
    name: "Rakesh Sharma",
    company: "Sharma Trading Co.",
    feedback:
      "High quality betel nuts and super fast delivery. My buying experience was very smooth!",
  },
  {
    name: "Sunita Patel",
    company: "Patel Agro",
    feedback:
      "Bahut hi reliable service aur prices market se best hain. Highly recommended!",
  },
  {
    name: "Ankit Gupta",
    company: "Gupta Enterprises",
    feedback:
      "Their customer support is exceptional, and the product packaging was neat and safe.",
  },
];

const Testimonials = () => (
  <section className="bg-black py-12">
    <div className="max-w-5xl mx-auto px-4">
      <h2 className="text-2xl font-semibold mb-8 text-center text-orange-500">
        What Our Clients Say
      </h2>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="bg-white shadow-2xl rounded-lg p-6 flex flex-col items-start border-t-4 border-[#FF8C42] transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:rotate-1"
          >
            <p className="italic mb-4 text-gray-800">"{t.feedback}"</p>
            <div>
              <span className="font-bold text-orange-500">{t.name}</span>
              <div className="text-sm text-gray-500">{t.company}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
