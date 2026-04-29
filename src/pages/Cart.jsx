import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/helpers';
import './Cart.css';

export default function Cart() {
  const { cart, removeFromCart, updateQty, total, clearCart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      <div className="empty-state">
        <p className="empty-icon">🛒</p>
        <p>Your cart is empty.</p>
        <Link to="/products"><button className="shop-btn">Start Shopping</button></Link>
      </div>
    </div>
  );

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Your Cart <span>({cart.length} items)</span></h1>
        <button onClick={clearCart} className="clear-btn">Clear All</button>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="item-info">
                <p className="item-name">{item.name}</p>
                <p className="item-cat">{item.category}</p>
              </div>
              <div className="qty-controls">
                <button onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                <span>{item.qty}</span>
                <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
              </div>
              <p className="item-price">{formatPrice(item.price * item.qty)}</p>
              <button className="remove-btn" onClick={() => removeFromCart(item.id)}>✕</button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row"><span>Subtotal</span><span>{formatPrice(total)}</span></div>
          <div className="summary-row"><span>Shipping</span><span>Free</span></div>
          <div className="summary-row"><span>Tax (8%)</span><span>{formatPrice(total * 0.08)}</span></div>
          <div className="summary-divider" />
          <div className="summary-row total"><span>Total</span><span>{formatPrice(total * 1.08)}</span></div>
          <button className="checkout-btn" onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}