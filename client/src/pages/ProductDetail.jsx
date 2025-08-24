import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import API from "../utils/api";
import Loader from "../components/Loader";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [prod, setProd] = useState(null);
  const [loading, setLoading] = useState(true);

  // Zoom and selected image states
  const [selectedImg, setSelectedImg] = useState(null);
  const [zoom, setZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const imageRef = useRef();

  // Tabs state
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    API.get(`/products/${id}`)
      .then((res) => {
        setProd(res.data);
        setSelectedImg(res.data.imageUrl);
      })
      .catch(() => setProd(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (!prod)
    return (
      <div className="text-center my-20 text-white text-xl font-semibold">
        Product Not Found.
      </div>
    );

  const tabs = [
    { label: "Description", content: prod.description },

    { label: "FAQs", content: prod.faqs || "No FAQs available." },
  ];

  const handleMouseMove = (e) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    let x = ((e.clientX - rect.left) / rect.width) * 100;
    let y = ((e.clientY - rect.top) / rect.height) * 100;
    x = Math.max(0, Math.min(100, x));
    y = Math.max(0, Math.min(100, y));
    setZoomPos({ x, y });
  };

  return (
    <div className=" p-10 bg-black/95 rounded shadow-lg text-white flex flex-col md:flex-row gap-20  mx-auto  justify-center">
      {/* Left Side: Image gallery with zoom */}
      <div className="flex flex-col items-center md:items-start">
        <div className="relative">
          <img
            ref={imageRef}
            src={selectedImg}
            alt={prod.name}
            className="w-[320px] h-[320px] rounded object-cover cursor-zoom-in shadow-lg"
            onMouseEnter={() => setZoom(true)}
            onMouseLeave={() => setZoom(false)}
            onMouseMove={handleMouseMove}
            draggable={false}
          />
          {zoom && (
            <div
              className="absolute left-[330px] top-0 w-[320px] h-[320px] border-2 border-orange-400 rounded-lg shadow-lg hidden md:block bg-white"
              style={{
                backgroundImage: `url('${selectedImg}')`,
                backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                backgroundSize: "250% 250%",
                backgroundRepeat: "no-repeat",
              }}
            />
          )}
        </div>
        <div className="flex gap-3 mt-4 overflow-x-auto no-scrollbar w-full md:w-[320px]">
          {[prod.imageUrl, ...(prod.additionalImages || [])].map(
            (imgUrl, idx) => (
              <img
                key={idx}
                src={imgUrl}
                alt={`${prod.name} thumbnail ${idx + 1}`}
                onClick={() => setSelectedImg(imgUrl)}
                className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${
                  selectedImg === imgUrl
                    ? "border-orange-400"
                    : "border-transparent"
                }`}
              />
            )
          )}
        </div>
      </div>

      {/* Right Side: Product info & actions */}
      <div className="flex-1 max-w-xl flex flex-col">
        <h1 className="text-3xl font-extrabold mb-2">{prod.name}</h1>
        <p className="text-orange-400 font-semibold text-lg mb-3">
          {prod.category}
        </p>

        {/* Price */}
        <div className="flex items-baseline gap-3 mb-6">
          <span className="text-2xl font-bold text-orange-400">
            ₹{prod.price}
          </span>
          {prod.originalPrice && (
            <span className="line-through text-gray-500 text-lg">
              ₹{prod.originalPrice}
            </span>
          )}
        </div>

        {/* Product Specs */}
        <ul className="grid grid-cols-2 gap-x-8 gap-y-3 text-gray-300 mb-8 text-sm">
          <li>
            <b>Material:</b> {prod.material || "-"}
          </li>
          <li>
            <b>Cultivation:</b> {prod.cultivationType || "-"}
          </li>
          <li>
            <b>Colour:</b> {prod.colour || "-"}
          </li>
          <li>
            <b>Feature:</b> {prod.feature || "-"}
          </li>
          <li>
            <b>Type:</b> {prod.type || "-"}
          </li>
          <li>
            <b>Origin:</b> {prod.country_of_origin || "-"}
          </li>
          <li>
            <b>Packing:</b> {prod.packagingType || "-"} | Sizes:{" "}
            {(prod.packSizes || []).join(", ") || "-"}
          </li>
          <li>
            <b>Shelf Life:</b> {prod.selfLife || "-"}
          </li>
          <li>
            <b>Business Type:</b> {(prod.businessType || []).join(", ") || "-"}
          </li>
        </ul>

        {/* Tabs for Details */}
        <div>
          <div className="flex gap-2 border-b border-orange-500">
            {["Description", "FAQs"].map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`py-2 px-5 border-b-4 font-semibold text-sm ${
                  activeTab === i
                    ? "border-orange-400 text-orange-300"
                    : "border-transparent text-gray-400"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="pt-4 text-gray-300 whitespace-pre-line min-h-[6rem]">
            {tabs[activeTab].content || "Information not available."}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-auto sticky bottom-0 bg-black/90 py-4 rounded-t-lg flex items-center justify-center">
          <button
            onClick={() =>
              navigate("/inquiry", {
                state: {
                  productTypeDefault: prod?.type || "",
                  productName: prod?.name || "",
                },
              })
            }
            className="flex-1 bg-gradient-to-r from-[#AA7454] via-[#FF8C42] to-[#FFD700] text-zinc-800 rounded px-6 py-3 font-semibold shadow"
          >
            Send Inquiry
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
