import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice, getDiscount } from '../utils/helpers';
import ProductCard from '../components/ProductCard';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === +id);
  const { addToCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();

  if (!product) return <div style={{ padding: '4rem', textAlign: 'center' }}>Product not found.</div>;

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="detail-page">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <div className="detail-layout">
        <div className="detail-img">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="detail-info">
          <span className="detail-cat">{product.category} · {product.brand}</span>
          <h1 className="detail-title">{product.name}</h1>
          <div className="detail-rating">★ {product.rating} <span>({product.reviews} reviews)</span></div>
          <div className="detail-pricing">
            <span className="detail-price">{formatPrice(product.price)}</span>
            <span className="detail-original">{formatPrice(product.originalPrice)}</span>
            <span className="detail-discount">-{getDiscount(product.originalPrice, product.price)}% OFF</span>
          </div>
          <p className="detail-desc">{product.description}</p>
          <div className="detail-actions">
            <button
              className="detail-add-btn"
              disabled={!product.inStock}
              onClick={() => addToCart(product)}
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
            <button
              className={`detail-wish-btn ${isWishlisted(product.id) ? 'active' : ''}`}
              onClick={() => toggle(product)}
            >
              {isWishlisted(product.id) ? '♥ Wishlisted' : '♡ Wishlist'}
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="related-section">
          <h2>Related Products</h2>
          <div className="related-grid">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}