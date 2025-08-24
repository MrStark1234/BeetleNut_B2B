import iso from "../assets/iso.png";
const Footer = () => (
  <footer className="py-4 flex flex-col items-center ml-0 md:flex-row md:justify-around md:ml-[120px]">
    <div className="flex items-center md:gap-4 flex-col gap-0 md:flex-row">
      <img
        className="w-[40px] h-[40px] mix-blend-luminosity"
        src={iso}
        alt="iso"
      />
      <p>
        <a className="text-[8px] text-zinc-500" href="http://www.freepik.com">
          Designed by starline / Freepik
        </a>
      </p>
    </div>

    <p className="text-xs text-gray-300">
      © {new Date().getFullYear()} NutraBetel. All rights reserved.
    </p>
    <p className="text-xs text-gray-300">
      Got a question? Contact{" "}
      <span className="text-xs text-orange-500">
        <a href="/">support@nutrabetel.com</a>{" "}
      </span>
    </p>
  </footer>
);
export default Footer;
