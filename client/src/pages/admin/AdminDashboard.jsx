import { useEffect, useState } from "react";
import API from "../../utils/api";
import ProductForm from "./ProductForm";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  const fetchProducts = () =>
    API.get("/products")
      .then((res) => setProducts(res.data))
      .finally(() => setLoading(false));

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await API.delete(`/products/${id}`);
    fetchProducts();
  };

  if (loading) return <Loader />;
  return (
    <section className="max-w-5xl mx-auto mt-10 px-3">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <div className="flex gap-2">
          <button
            className=" text-white py-1 px-4 rounded"
            onClick={() => setEditing({})}
          >
            Add Product +
          </button>
          <Link
            className="bg-[#1a1a1a] text-white py-3 px-4 rounded-lg"
            to="/admin-inquiry"
          >
            Client Inquiries
          </Link>
        </div>
      </div>
      {editing && (
        <ProductForm
          existing={editing}
          onDone={() => {
            setEditing(null);
            fetchProducts();
          }}
        />
      )}
      <div className="grid md:grid-cols-2 gap-6">
        {products.map((prod) => (
          <div
            className="bg-white text-black shadow rounded p-5 flex gap-4"
            key={prod._id}
          >
            {prod.imageUrl && (
              <img
                src={prod.imageUrl}
                alt={prod.name}
                className="w-24 h-24 object-cover rounded"
              />
            )}
            <div className="flex-1">
              <h3 className="font-bold">{prod.name}</h3>
              <p className="text-xs text-gray-500">
                {prod.category}, ₹{prod.price}
              </p>
              <div className="mt-2 flex gap-3">
                <button
                  onClick={() => setEditing(prod)}
                  className="bg-gradient-to-r from-[#AA7454] via-[#FF8C42] to-[#FFD700] text-gray-700 px-3 py-1 rounded text-xs"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(prod._id)}
                  className="bg-red-700 text-white px-3 py-1 rounded text-xs"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default AdminDashboard;
