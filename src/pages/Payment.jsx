import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/helpers';
import './Payment.css';

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useCart();
  const { total } = location.state || { total: '0.00' };
  const [form, setForm] = useState({ card: '', name: '', expiry: '', cvv: '' });
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const formatCard = (v) => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  const formatExpiry = (v) => v.replace(/\D/g, '').slice(0, 4).replace(/(.{2})/, '$1/');

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      clearCart();
    }, 2000);
  };

  if (success) return (
    <div className="payment-page">
      <div className="payment-success">
        <div className="success-icon">✓</div>
        <h2>Order Confirmed!</h2>
        <p>Thank you for your purchase. A confirmation has been sent to your email.</p>
        <p className="success-amount">Amount paid: {formatPrice(total)}</p>
        <button onClick={() => navigate('/')} className="back-home-btn">Back to Home</button>
      </div>
    </div>
  );

  return (
    <div className="payment-page">
      <div className="payment-card">
        <h1>Payment</h1>
        <p className="payment-amount">Amount due: <strong>{formatPrice(total)}</strong></p>

        <div className="card-visual">
          <div className="card-chip">▬</div>
          <div className="card-number">{form.card || '•••• •••• •••• ••••'}</div>
          <div className="card-bottom">
            <span>{form.name || 'YOUR NAME'}</span>
            <span>{form.expiry || 'MM/YY'}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="payment-form">
          <div className="form-group">
            <label>Card Number</label>
            <input type="text" placeholder="1234 5678 9012 3456" required maxLength="19"
              value={form.card} onChange={(e) => setForm({ ...form, card: formatCard(e.target.value) })} />
          </div>
          <div className="form-group">
            <label>Cardholder Name</label>
            <input type="text" placeholder="John Doe" required
              value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="payment-row">
            <div className="form-group">
              <label>Expiry</label>
              <input type="text" placeholder="MM/YY" required maxLength="5"
                value={form.expiry} onChange={(e) => setForm({ ...form, expiry: formatExpiry(e.target.value) })} />
            </div>
            <div className="form-group">
              <label>CVV</label>
              <input type="password" placeholder="•••" required maxLength="4"
                value={form.cvv} onChange={(e) => setForm({ ...form, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })} />
            </div>
          </div>
          <button type="submit" className="pay-btn" disabled={processing}>
            {processing ? 'Processing...' : `Pay ${formatPrice(total)}`}
          </button>
        </form>
      </div>
    </div>
  );
}