import { Link } from "react-router-dom";
const Navbar = () => (
  <nav className="backdrop-blur-lg shadow sticky top-0 z-10">
    <div className="max-w-7xl mx-auto flex justify-between items-center p-3">
      <Link to="/" className="font-bold text-xl text-blue-500">
        NutraBetel
      </Link>
      <div className="space-x-6 flex items-center">
        <Link to="/" className="hover:text-blue-600">
          Home
        </Link>
        <Link to="/products" className="hover:text-blue-600">
          Products
        </Link>
        <Link to="/contact" className="hover:text-blue-600">
          Contact
        </Link>
        <Link
          to="/admin/login"
          className="text-sm px-4 py-1 bg-blue-800 text-white rounded hover:bg-blue-700"
        >
          Admin
        </Link>
      </div>
    </div>
  </nav>
);
export default Navbar;
