import { Link } from "react-router-dom";

const ProductCard = ({ product }) => (
  <div className="bg-black border-2 border-orange-500 shadow-2xl rounded-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:rotate-1">
    {product.imageUrl && (
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-72 object-cover"
      />
    )}
    <div className="p-4">
      <h3 className="text-white text-lg font-semibold mb-2">{product.name}</h3>
      <p className="text-sm text-green-600 mb-2">{product.category}</p>
      <p className="text-xs text-zinc-400 mb-2 truncate">
        {product.description}
      </p>
      <Link
        to={`/products/${product._id}`}
        className="inline-block mt-2 text-orange-500 font-medium hover:underline"
      >
        View Details
      </Link>
    </div>
  </div>
);
export default ProductCard;
