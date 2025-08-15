import { Link } from "react-router-dom";

const ProductCard = ({ product }) => (
  <div className="bg-white shadow rounded-lg overflow-hidden hover:shadow-xl transition-all">
    {product.imageUrl && (
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-40 object-cover"
      />
    )}
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
      <p className="text-sm text-gray-600 mb-2">{product.category}</p>
      <p className="text-xs text-gray-500 mb-2 truncate">
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
