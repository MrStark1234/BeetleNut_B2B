import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import API from "../utils/api";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const [prod, setProd] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // --- Zoom States ---
  const [zoom, setZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const imageRef = useRef();

  const handleMouseMove = (e) => {
    const rect = imageRef.current.getBoundingClientRect();
    let x = ((e.clientX - rect.left) / rect.width) * 100;
    let y = ((e.clientY - rect.top) / rect.height) * 100;
    // Clamp values to [0, 100] so BG doesn't overflow
    x = Math.max(0, Math.min(100, x));
    y = Math.max(0, Math.min(100, y));
    setZoomPos({ x, y });
  };

  useEffect(() => {
    API.get(`/products/${id}`)
      .then((res) => setProd(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (!prod) return <div className="text-center my-20">Product Not Found.</div>;

  return (
    <>
      <div className="w-full p-6 bg-black/95 shadow rounded">
        <div className="flex flex-col md:flex-row gap-8 items-start relative ">
          {/* Image and Zoom */}
          <div className="relative">
            <img
              ref={imageRef}
              src={prod.imageUrl}
              alt={prod.name}
              className="w-full  rounded cursor-zoom-in object-cover shadow"
              onMouseEnter={() => setZoom(true)}
              onMouseLeave={() => setZoom(false)}
              onMouseMove={handleMouseMove}
              draggable={false}
            />
            {/* ---- Left Floating Zoom Preview ---- */}
            {zoom && (
              <div
                className="absolute top-0 left-[950px] w-[500px] h-[500px] border-2 border-orange-400 bg-white z-20 rounded-lg shadow-lg hidden md:block"
                style={{
                  backgroundImage: `url('${prod.imageUrl}')`,
                  backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                  backgroundSize: "250% 250%", // More zoom e.g. 2.2x
                  backgroundRepeat: "no-repeat",
                }}
              />
            )}
          </div>
          {/* Product text/details */}
          <div>
            <h2 className="text-2xl font-bold mb-1 ">{prod.name}</h2>
            <p className="mb-2 text-green-400">{prod.category}</p>
            <p className="mb-4 text-zinc-400">{prod.description}</p>
            <ul className="text-sm mb-4 text-gray-200">
              <li className="mb-4">
                <b>Material:</b> {prod.material}
              </li>
              <li className="mb-4">
                <b>Cultivation:</b> {prod.cultivationType}
              </li>
              <li className="mb-4">
                <b>Colour:</b> {prod.colour}
              </li>
              <li className="mb-4">
                <b>Feature:</b> {prod.feature}
              </li>
              <li className="mb-4">
                <b>Type:</b> {prod.type}
              </li>
              <li className="mb-4">
                <b>Origin:</b> {prod.country_of_origin}
              </li>
              <li className="mb-4">
                <b>Packing:</b> {prod.packagingType} | Sizes:{" "}
                {(prod.packSizes || []).join(", ")}
              </li>
              <li className="mb-4">
                <b>Shelf Life:</b> {prod.selfLife}
              </li>
              <li className="mb-4">
                <b>Business Type:</b> {(prod.businessType || []).join(", ")}
              </li>
              <li className="mb-4">
                <b>Price:</b> ₹{prod.price}
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="bg-gradient-to-r from-[#AA7454] via-[#FF8C42] to-[#FFD700] text-zinc-800 rounded px-4 py-2 shadow font-semibold mt-7"
            onClick={() =>
              navigate("/inquiry", {
                state: {
                  productTypeDefault: prod?.type || "",
                  productName: prod?.name || "",
                },
              })
            }
          >
            Send Inquiry
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
