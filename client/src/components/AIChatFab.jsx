import { useState } from "react";
import ProductQAWidget from "./ProductQAWidget";
import aiChatbot from "../assets/Ai Chatbot.png";

export default function AIChatFab({ productId }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating round button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open AI chat"
        className="  fixed bottom-24 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition hover:scale-105"
        title="Ask AI"
      >
        <img
          className="w-full"
          style={{ border: "2px solid orange", borderRadius: "50px" }}
          src={aiChatbot}
          alt="aiChatbot"
        />
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-end bg-black/50"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="m-4 w-[96vw] max-w-sm max-h-[80vh] overflow-hidden rounded-xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3">
              <div className="font-semibold text-black">Mr Dululu😊</div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="rounded p-1 text-slate-600 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                ✕
              </button>
            </div>

            <div className="p-3 text-black">
              <ProductQAWidget productId={productId} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
