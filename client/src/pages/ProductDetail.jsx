import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../utils/api";
import Loader from "../components/Loader";

const ProductDetail = () => {
  const { id } = useParams();
  const [prod, setProd] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/products/${id}`)
      .then((res) => setProd(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (!prod) return <div className="text-center my-20">Product Not Found.</div>;
  return (
    <section className="max-w-3xl mx-auto p-6 bg-white shadow mt-8 rounded">
      <div className="flex flex-col md:flex-row gap-8">
        {prod.imageUrl && (
          <img
            src={prod.imageUrl}
            alt={prod.name}
            className="w-64 rounded shadow"
          />
        )}
        <div>
          <h2 className="text-2xl font-bold mb-1">{prod.name}</h2>
          <p className="mb-2 text-gray-500">{prod.category}</p>
          <p className="mb-4">{prod.description}</p>
          <ul className="text-sm mb-4">
            <li>
              <b>Material:</b> {prod.material}
            </li>
            <li>
              <b>Cultivation:</b> {prod.cultivationType}
            </li>
            <li>
              <b>Colour:</b> {prod.colour}
            </li>
            <li>
              <b>Feature:</b> {prod.feature}
            </li>
            <li>
              <b>Type:</b> {prod.type}
            </li>
            <li>
              <b>Origin:</b> {prod.country_of_origin}
            </li>
            <li>
              <b>Packing:</b> {prod.packagingType} | Sizes:{" "}
              {(prod.packSizes || []).join(", ")}
            </li>
            <li>
              <b>Shelf Life:</b> {prod.selfLife}
            </li>
            <li>
              <b>Business Type:</b> {(prod.businessType || []).join(", ")}
            </li>
            <li>
              <b>Price:</b> ₹{prod.price}
            </li>
          </ul>
          <button
            className="bg-blue-700 text-white rounded px-4 py-2 shadow font-semibold mt-2"
            onClick={() => alert("Customise Enquiry form integration here!")}
          >
            Send Inquiry
          </button>
        </div>
      </div>
    </section>
  );
};
export default ProductDetail;
