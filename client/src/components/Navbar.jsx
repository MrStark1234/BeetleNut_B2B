import { Link } from "react-router-dom";
const Navbar = () => (
  <nav className=" backdrop-blur-lg shadow sticky top-0 z-10">
    <div className="max-w-7xl mx-auto flex justify-between items-center p-3">
      <Link
        to="/"
        className="font-bold text-xl bg-gradient-to-r from-[#AA7454] via-[#FF8C42] to-[#FFD700] bg-clip-text text-transparent"
      >
        NutraBetel
      </Link>
      <div className="space-x-6 flex items-center">
        <Link to="/" className="hover:text-orange-500">
          Home
        </Link>
        <Link to="/products" className="hover:text-orange-500">
          Products
        </Link>
        <Link to="/contact" className="hover:text-orange-500">
          Contact
        </Link>
        <Link
          to="/admin/login"
          className="text-sm px-4 py-1 bg-gradient-to-r from-[#AA7454] via-[#FF8C42] to-[#FFD700] text-gray-700 rounded hover:scale-105"
        >
          Admin
        </Link>
      </div>
    </div>
  </nav>
);
export default Navbar;
