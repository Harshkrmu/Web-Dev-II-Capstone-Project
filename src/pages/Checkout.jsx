import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/helpers';
import './Checkout.css';

export default function Checkout() {
  const { cart, total } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', address: '', city: '', zip: '', country: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/payment', { state: { shippingInfo: form, total: (total * 1.08).toFixed(2) } });
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <div className="checkout-layout">
        <div className="checkout-form-wrap">
          <h3>Shipping Information</h3>
          <form onSubmit={handleSubmit} className="checkout-form">
            {[
              { key: 'name', label: 'Full Name', placeholder: 'John Doe' },
              { key: 'email', label: 'Email', placeholder: 'you@example.com' },
              { key: 'address', label: 'Address', placeholder: '123 Main St' },
              { key: 'city', label: 'City', placeholder: 'New York' },
              { key: 'zip', label: 'ZIP Code', placeholder: '10001' },
              { key: 'country', label: 'Country', placeholder: 'United States' },
            ].map(({ key, label, placeholder }) => (
              <div className="form-group" key={key}>
                <label>{label}</label>
                <input type="text" placeholder={placeholder} required
                  value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
              </div>
            ))}
            <button type="submit" className="checkout-next-btn">Continue to Payment →</button>
          </form>
        </div>

        <div className="checkout-order-summary">
          <h3>Order Summary</h3>
          <div className="checkout-items">
            {cart.map((item) => (
              <div key={item.id} className="co-item">
                <img src={item.image} alt={item.name} />
                <div>
                  <p>{item.name}</p>
                  <p className="co-qty">Qty: {item.qty}</p>
                </div>
                <span>{formatPrice(item.price * item.qty)}</span>
              </div>
            ))}
          </div>
          <div className="co-total">
            <span>Total (inc. tax)</span>
            <span>{formatPrice(total * 1.08)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}