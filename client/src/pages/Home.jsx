import { Link } from "react-router-dom";
import btlnt from "../assets/btlnt.png";
import { TypeAnimation } from "react-type-animation";
import Testimonials from "../components/Testimonials";

const Home = () => (
  <section>
    <div className="bg-black py-12 px-2">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h4 className="text-xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#AA7454] via-[#FF8C42] to-[#FFD700] bg-clip-text text-transparent">
            Welcome to NutraBetel
          </h4>
          <h4 className="text-xl md:text-3xl font-semibold mb-4 text-gray-600">
            We Exclusively deals in
            <span>
              <TypeAnimation
                sequence={[
                  " White BetelNuts",
                  2000,
                  " Red BetelNuts",
                  2000,
                  " and other varieties of BetelNuts",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                className="text-xl md:text-3xl font-semibold mb-4 text-gray-600"
                repeat={Infinity}
              />
            </span>
          </h4>

          <p className="text-lg text-gray-700 mb-5 max-w-xl">
            Best quality Betel Nuts & agro products. Trusted wholesale partner.
            Pure, safe, always on time delivery!
          </p>
          <Link
            to="/products"
            className="bg-gradient-to-r from-[#AA7454] via-[#FF8C42] to-[#FFD700] font-semibold text-gray-700 px-5 py-2 rounded shadow hover:scale-150"
          >
            View Products
          </Link>
        </div>
        <img
          src={btlnt}
          alt="Betel Nut"
          className="rounded-lg w-[500px] shadow-lg md:block transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:rotate-1"
        />
      </div>
    </div>

    <div className="max-w-6xl mx-auto my-10">
      <h2 className="text-center text-2xl font-semibold mb-6 text-orange-500">
        Why Choose Us?
      </h2>
      <div className="  flex flex-wrap gap-4 justify-center ">
        <div className="bg-white shadow-2xl p-5 rounded w-64 transform transition-all duration-500 hover:scale-105">
          <h3 className="font-bold text-orange-500 mb-2">Premium Quality</h3>
          <p className="text-gray-700 text-sm">
            Only the best products, sorted and packed with care.
          </p>
        </div>
        <div className="bg-white p-5 rounded shadow-2xl w-64 transform transition-all duration-500 hover:scale-105">
          <h3 className="font-bold text-orange-500 mb-2">On-Time Delivery</h3>
          <p className="text-gray-700 text-sm">
            Pan India supply, always delivered on or before promised date.
          </p>
        </div>
        <div className="bg-white p-5 rounded shadow-2xl w-64 transform transition-all duration-500 hover:scale-105">
          <h3 className="font-bold text-orange-500 mb-2">Best Prices</h3>
          <p className="text-gray-700 text-sm">
            Direct from manufacturer — No hidden costs, great savings!
          </p>
        </div>
      </div>
    </div>
    <Testimonials />
  </section>
);
export default Home;
