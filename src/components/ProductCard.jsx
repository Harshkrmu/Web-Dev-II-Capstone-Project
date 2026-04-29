import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice, getDiscount } from '../utils/helpers';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();

  return (
    <div className="product-card">
      <div className="card-img-wrap">
        <img src={product.image} alt={product.name} loading="lazy" />
        <button className={`wishlist-btn ${isWishlisted(product.id) ? 'active' : ''}`} onClick={() => toggle(product)}>
          {isWishlisted(product.id) ? '♥' : '♡'}
        </button>
        {!product.inStock && <span className="out-badge">Out of Stock</span>}
        <span className="discount-badge">-{getDiscount(product.originalPrice, product.price)}%</span>
      </div>
      <div className="card-body">
        <span className="card-category">{product.category}</span>
        <Link to={`/products/${product.id}`}>
          <h3 className="card-title">{product.name}</h3>
        </Link>
        <div className="card-meta">
          <span className="card-rating">★ {product.rating}</span>
          <span className="card-reviews">({product.reviews})</span>
        </div>
        <div className="card-pricing">
          <span className="card-price">{formatPrice(product.price)}</span>
          <span className="card-original">{formatPrice(product.originalPrice)}</span>
        </div>
        <button
          className="add-to-cart-btn"
          disabled={!product.inStock}
          onClick={() => addToCart(product)}
        >
          {product.inStock ? 'Add to Cart' : 'Unavailable'}
        </button>
      </div>
    </div>
  );
}