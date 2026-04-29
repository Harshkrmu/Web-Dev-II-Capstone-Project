export const getDiscount = (original, current) =>
  Math.round(((original - current) / original) * 100);

export const formatPrice = (p) => `$${Number(p).toFixed(2)}`;

export const sortProducts = (products, sortBy) => {
  const arr = [...products];
  switch (sortBy) {
    case 'price-asc': return arr.sort((a, b) => a.price - b.price);
    case 'price-desc': return arr.sort((a, b) => b.price - a.price);
    case 'rating': return arr.sort((a, b) => b.rating - a.rating);
    case 'newest': return arr.sort((a, b) => b.id - a.id);
    default: return arr;
  }
};

export const filterProducts = (products, filters) => {
  return products.filter((p) => {
    if (filters.category && p.category !== filters.category) return false;
    if (filters.brand && p.brand !== filters.brand) return false;
    if (p.price < filters.minPrice || p.price > filters.maxPrice) return false;
    if (filters.rating && p.rating < filters.rating) return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      if (!p.name.toLowerCase().includes(q) && !p.category.toLowerCase().includes(q)) return false;
    }
    return true;
  });
};