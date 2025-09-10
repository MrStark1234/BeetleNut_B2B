import { useState, useEffect } from "react";
import { buildWhatsAppLink } from "../utils/whatsapp";
import whatsapp from "../assets/whatsapp.svg";

export default function WhatsAppFloat() {
  const [href, setHref] = useState("");

  useEffect(() => {
    const msg = `Hello! I'm interested in your products. Can you help me?`;

    const link = buildWhatsAppLink({
      message: msg,
      preferApi: true,
    });
    setHref(link); // dynamically update the href
  }, []);

  if (!href) return null; // or render a placeholder

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp Chat"
      className="fixed bottom-5 right-5 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-2xl hover:scale-105 transition transform"
    >
      <img className="rounded-full" src={whatsapp} alt="whatsappImage" />
    </a>
  );
}
