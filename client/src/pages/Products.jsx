import { useState, useEffect } from "react";
import API from "../utils/api";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/products")
      .then((res) => setProducts(res.data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <section className="min-h-screen p-6 bg-zinc-900">
      <h2 className="text-3xl font-bold mb-8 text-white text-center">
        Our Products
      </h2>
      {products.length === 0 ? (
        <p className="text-center text-white text-lg mt-20">
          No products found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {products.map((prod) => (
            <div
              key={prod._id}
              onClick={() => navigate(`/products/${prod._id}`)}
              className="bg-zinc-800 rounded-lg shadow-md cursor-pointer transform transition duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative overflow-hidden rounded-t-lg h-64">
                <img
                  src={prod.imageUrl}
                  alt={prod.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                {prod.isBestSeller && (
                  <span className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-xs font-bold">
                    Best Seller
                  </span>
                )}
                {prod.discountPercentage && (
                  <span className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                    {prod.discountPercentage}% OFF
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-white text-lg font-semibold truncate">
                  {prod.name}
                </h3>
                <p className="text-orange-400 font-bold text-xl mt-2">
                  ₹{prod.price}
                  {prod.originalPrice && (
                    <span className="text-sm line-through text-gray-400 ml-2">
                      ₹{prod.originalPrice}
                    </span>
                  )}
                </p>
                <p className="mt-1 text-gray-400 text-sm">{prod.category}</p>
                {prod.stock != null && (
                  <p
                    className={`mt-3 text-sm font-semibold ${
                      prod.stock < 10 ? "text-red-500" : "text-green-400"
                    }`}
                  >
                    {prod.stock < 10
                      ? `Only ${prod.stock} -> ${prod.packSizes} left!`
                      : "In Stock"}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Products;
