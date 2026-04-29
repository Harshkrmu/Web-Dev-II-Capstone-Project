import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import './Home.css';

const featured = products.filter((p) => p.rating >= 4.7).slice(0, 8);
const categories = ['Electronics', 'Fashion', 'Home & Living', 'Sports', 'Books', 'Beauty'];
const catImages = {
  'Electronics': 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=300',
  'Fashion': 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=300',
  'Home & Living': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300',
  'Sports': 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=300',
  'Books': 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=300',
  'Beauty': 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=300',
};

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <p className="hero-eyebrow">New Season Arrivals</p>
          <h1 className="hero-title">Curated for<br /><em>Those Who</em><br />Demand More</h1>
          <p className="hero-desc">Discover premium products handpicked for quality, style, and value.</p>
          <Link to="/products"><button className="hero-cta">Shop Collection →</button></Link>
        </div>
        <div className="hero-visual">
          <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600" alt="hero" />
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Shop by Category</h2>
        <div className="category-grid">
          {categories.map((cat) => (
            <Link to={`/products?category=${cat}`} key={cat} className="cat-card">
              <img src={catImages[cat]} alt={cat} />
              <span>{cat}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Top Rated Products</h2>
        <div className="products-grid">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}