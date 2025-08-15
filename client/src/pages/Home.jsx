import { Link } from "react-router-dom";

const Home = () => (
  <section>
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 py-12 px-2">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-blue-900">
            Welcome to Raju Traders
          </h1>
          <p className="text-lg text-gray-700 mb-5 max-w-xl">
            Best quality Betel Nuts & agro products. Trusted wholesale partner.
            Pure, safe, always on time delivery!
          </p>
          <Link
            to="/products"
            className="bg-blue-800 font-semibold text-white px-5 py-2 rounded shadow hover:bg-blue-700"
          >
            View Products
          </Link>
        </div>
        <img
          src="/assets/betel_nut.webp"
          alt="Betel Nut"
          className="rounded-lg w-72 shadow-lg hidden md:block"
        />
      </div>
    </div>
    <div className="max-w-6xl mx-auto my-10">
      <h2 className="text-center text-2xl font-semibold mb-6">
        Why Choose Us?
      </h2>
      <div className="flex flex-wrap gap-4 justify-center">
        <div className="bg-white p-5 rounded shadow w-64">
          <h3 className="font-bold text-blue-800 mb-2">Premium Quality</h3>
          <p className="text-gray-700 text-sm">
            Only the best products, sorted and packed with care.
          </p>
        </div>
        <div className="bg-white p-5 rounded shadow w-64">
          <h3 className="font-bold text-blue-800 mb-2">On-Time Delivery</h3>
          <p className="text-gray-700 text-sm">
            Pan India supply, always delivered on or before promised date.
          </p>
        </div>
        <div className="bg-white p-5 rounded shadow w-64">
          <h3 className="font-bold text-blue-800 mb-2">Best Prices</h3>
          <p className="text-gray-700 text-sm">
            Direct from manufacturer — No hidden costs, great savings!
          </p>
        </div>
      </div>
    </div>
  </section>
);
export default Home;
