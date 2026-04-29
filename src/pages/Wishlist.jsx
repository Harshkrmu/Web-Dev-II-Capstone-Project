import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import './Wishlist.css';

export default function Wishlist() {
  const { wishlist } = useWishlist();

  return (
    <div className="wishlist-page">
      <h1>My Wishlist <span>({wishlist.length})</span></h1>
      {wishlist.length === 0 ? (
        <div className="empty-state">
          <p className="empty-icon">♡</p>
          <p>Your wishlist is empty.</p>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}