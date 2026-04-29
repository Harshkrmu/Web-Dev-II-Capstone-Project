import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { count } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">LUXORA</Link>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/products">Shop</Link>
        {user && <Link to="/wishlist">Wishlist {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}</Link>}
        {user && <Link to="/cart">Cart {count > 0 && <span className="badge">{count}</span>}</Link>}
      </div>
      <div className="navbar-actions">
        {user ? (
          <>
            <span className="navbar-user">Hi, {user.name.split(' ')[0]}</span>
            <button className="btn-ghost" onClick={() => { logout(); navigate('/login'); }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login"><button className="btn-ghost">Login</button></Link>
            <Link to="/signup"><button className="btn-accent">Sign Up</button></Link>
          </>
        )}
      </div>
    </nav>
  );
}