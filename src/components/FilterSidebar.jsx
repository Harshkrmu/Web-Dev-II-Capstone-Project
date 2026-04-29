import './FilterSidebar.css';

const categories = ['Electronics', 'Fashion', 'Home & Living', 'Sports', 'Books', 'Beauty'];
const brands = ['Luxora', 'Veltrix', 'Nordex', 'Ativa', 'Zenova', 'Krono'];

export default function FilterSidebar({ filters, setFilters }) {
  const update = (key, value) => setFilters((f) => ({ ...f, [key]: value }));
  const reset = () => setFilters({ category: '', brand: '', minPrice: 0, maxPrice: 1000, rating: 0, search: '' });

  return (
    <aside className="filter-sidebar">
      <div className="filter-header">
        <h3>Filters</h3>
        <button onClick={reset} className="reset-btn">Reset</button>
      </div>

      <div className="filter-group">
        <label>Category</label>
        <select value={filters.category} onChange={(e) => update('category', e.target.value)}>
          <option value="">All</option>
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      <div className="filter-group">
        <label>Brand</label>
        <select value={filters.brand} onChange={(e) => update('brand', e.target.value)}>
          <option value="">All</option>
          {brands.map((b) => <option key={b}>{b}</option>)}
        </select>
      </div>

      <div className="filter-group">
        <label>Max Price: ${filters.maxPrice}</label>
        <input type="range" min="0" max="1000" value={filters.maxPrice}
          onChange={(e) => update('maxPrice', +e.target.value)} />
      </div>

      <div className="filter-group">
        <label>Min Rating: {filters.rating}★</label>
        <input type="range" min="0" max="5" step="0.5" value={filters.rating}
          onChange={(e) => update('rating', +e.target.value)} />
      </div>
    </aside>
  );
}