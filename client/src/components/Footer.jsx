// import iso from "../assets/iso.png";
// const Footer = () => (
//   <footer className="py-4 flex flex-col items-center ml-0 md:flex-row md:justify-around md:ml-[120px]">
//     <div className="flex items-center md:gap-4 flex-col gap-0 md:flex-row">
//       <img
//         className="w-[40px] h-[40px] mix-blend-luminosity"
//         src={iso}
//         alt="iso"
//       />
//       <p>
//         <a className="text-[8px] text-zinc-500" href="http://www.freepik.com">
//           Designed by starline / Freepik
//         </a>
//       </p>
//     </div>

//     <p className="text-xs text-gray-300">
//       © {new Date().getFullYear()} NutraBetel. All rights reserved.
//     </p>
//     <p className="text-xs text-gray-300">
//       Got a question? Contact{" "}
//       <span className="text-xs text-orange-500">
//         <a href="/">support@nutrabetel.com</a>{" "}
//       </span>
//     </p>
//   </footer>
// );
// export default Footer;

import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import iso from "../assets/iso.png";

const Footer = () => (
  <footer className="bg-zinc-900 text-gray-300 py-10 px-6 md:px-16 border-t-[0.5px]">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-zinc-700 pb-8">
      {/* Logo + Credit */}
      <div className="flex flex-col items-center md:items-start">
        <img
          className="w-[50px] h-[50px] mix-blend-luminosity mb-3"
          src={iso}
          alt="iso"
        />
        <a
          className="text-[10px] text-zinc-500"
          href="http://www.freepik.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Designed by Suraj Singhal
        </a>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col items-center md:items-start gap-2">
        <h4 className="font-semibold text-white mb-2">Quick Links</h4>
        <a href="/" className="hover:text-orange-500 text-zinc-500 text-sm">
          Home
        </a>
        <a
          href="/products"
          className="hover:text-orange-500 text-zinc-500 text-sm"
        >
          Products
        </a>
        <a
          href="/contact"
          className="hover:text-orange-500 text-zinc-500 text-sm"
        >
          Contact
        </a>
      </div>

      {/* Address Section */}
      <div className="flex flex-col items-center md:items-start gap-2">
        <h4 className="font-semibold text-white mb-2">Address</h4>
        <p className="text-zinc-500 text-sm">NutraBetel Pvt. Ltd.</p>
        <p className="text-zinc-500 text-sm">123 Business Street</p>
        <p className="text-zinc-500 text-sm">Mumbai, India</p>
      </div>

      {/* Social Media */}
      <div className="flex flex-col items-center md:items-start gap-3">
        <h4 className="font-semibold text-white mb-2">Follow Us on</h4>
        <div className="flex gap-4 text-xl">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="hover:text-orange-500" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="hover:text-orange-500" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaXTwitter className="hover:text-orange-500" />
          </a>
        </div>
      </div>
    </div>

    {/* Bottom Section */}
    <div className="mt-6 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 px-6">
      <p>© {new Date().getFullYear()} NutraBetel. All rights reserved.</p>
      <p>
        Got a question? Contact{" "}
        <a
          href="mailto:support@nutrabetel.com"
          className="text-orange-500 hover:underline"
        >
          support@nutrabetel.com
        </a>
      </p>
    </div>
  </footer>
);

export default Footer;
