import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
const Navbar = () => {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Contact", path: "/contact" },
  ];
  return (
    <nav className=" md:backdrop-blur-lg shadow sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-3">
        <Link
          to="/"
          className="font-bold text-xl bg-gradient-to-r from-[#AA7454] via-[#FF8C42] to-[#FFD700] bg-clip-text text-transparent"
        >
          NutraBetel
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="hover:text-orange-500 hover:scale-105 font-medium "
            >
              {item.name}
            </Link>
          ))}
          <Link
            to="/admin/login"
            className="text-sm px-4 py-1 bg-gradient-to-r from-[#AA7454] via-[#FF8C42] to-[#FFD700] text-gray-700 rounded hover:scale-105"
          >
            Admin
          </Link>
        </div>

        {/* Hamburger for Mobile */}
        <button
          className="md:hidden text-3xl text-orange-600 focus:outline-none"
          onClick={() => setOpen(true)}
        >
          <FiMenu />
        </button>
      </div>

      {/* Mobile Dropdown Drawer */}
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-all duration-300 ${
          open ? "block" : "hidden"
        }`}
        onClick={() => setOpen(false)}
      />
      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 w-1/2 max-w-xs bg-zinc-900 z-50  transform transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full"}
        md:hidden flex flex-col`}
      >
        <div className="flex items-center justify-end px-5 py-4 border-b">
          <button
            className="text-3xl text-orange-600"
            onClick={() => setOpen(false)}
            aria-label="Close Menu"
          >
            <FiX />
          </button>
        </div>
        <nav className="flex flex-col gap-4 p-5">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="text-lg hover:text-orange-500 font-medium"
              onClick={() => setOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </nav>
  );
};
export default Navbar;
