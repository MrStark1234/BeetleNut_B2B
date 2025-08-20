import { useEffect, useState } from "react";
import API from "../utils/api";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/products")
      .then((res) => setProducts(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <section className=" max-w-7xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4 text-white">Our Products</h2>
      {products.length ? (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {products.map((prod) => (
            <ProductCard key={prod._id} product={prod} />
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </section>
  );
};
export default Products;
