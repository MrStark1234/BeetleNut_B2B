import { Link } from "react-router-dom";

const ProductCard = ({ product }) => (
  <div className="bg-blue-50 shadow rounded-lg overflow-hidden hover:shadow-xl transition-all">
    {product.imageUrl && (
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-72 object-cover"
      />
    )}
    <div className="p-4">
      <h3 className="text-black text-lg font-semibold mb-2">{product.name}</h3>
      <p className="text-sm text-green-600 mb-2">{product.category}</p>
      <p className="text-xs text-zinc-900 mb-2 truncate">
        {product.description}
      </p>
      <Link
        to={`/products/${product._id}`}
        className="inline-block mt-2 text-blue-700 font-medium hover:underline"
      >
        View Details
      </Link>
    </div>
  </div>
);
export default ProductCard;
