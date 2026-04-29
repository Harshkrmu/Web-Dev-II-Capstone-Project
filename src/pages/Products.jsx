import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import { filterProducts, sortProducts } from '../utils/helpers';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import './Products.css';

export default function Products() {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    brand: '', minPrice: 0, maxPrice: 1000, rating: 0, search: '',
  });
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(1);
  const PER_PAGE = 16;

  useEffect(() => { setPage(1); }, [filters, sortBy]);

  const filtered = filterProducts(products, filters);
  const sorted = sortProducts(filtered, sortBy);
  const paginated = sorted.slice(0, page * PER_PAGE);

  return (
    <div className="products-page">
      <div className="products-top">
        <h1>All Products <span className="count">({filtered.length})</span></h1>
        <div className="products-controls">
          <input
            className="search-input" placeholder="Search products..."
            value={filters.search}
            onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
          />
          <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      <div className="products-layout">
        <FilterSidebar filters={filters} setFilters={setFilters} />
        <div className="products-main">
          {paginated.length === 0 ? (
            <div className="no-results">No products match your filters.</div>
          ) : (
            <div className="products-grid-page">
              {paginated.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
          {paginated.length < sorted.length && (
            <div className="load-more-wrap">
              <button className="load-more-btn" onClick={() => setPage((p) => p + 1)}>
                Load More ({sorted.length - paginated.length} remaining)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}