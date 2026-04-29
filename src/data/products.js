const categories = ['Electronics', 'Fashion', 'Home & Living', 'Sports', 'Books', 'Beauty'];
const brands = ['Luxora', 'Veltrix', 'Nordex', 'Ativa', 'Zenova', 'Krono'];

const productTemplates = [
  { name: 'Wireless Noise-Cancelling Headphones', category: 'Electronics', price: 299, rating: 4.7, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400' },
  { name: 'Mechanical Gaming Keyboard', category: 'Electronics', price: 149, rating: 4.5, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400' },
  { name: '4K Ultra HD Monitor', category: 'Electronics', price: 499, rating: 4.8, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400' },
  { name: 'Slim Leather Wallet', category: 'Fashion', price: 59, rating: 4.3, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400' },
  { name: 'Classic Aviator Sunglasses', category: 'Fashion', price: 89, rating: 4.6, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400' },
  { name: 'Premium Running Shoes', category: 'Sports', price: 179, rating: 4.7, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400' },
  { name: 'Yoga Mat Pro', category: 'Sports', price: 69, rating: 4.4, image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400' },
  { name: 'Minimalist Desk Lamp', category: 'Home & Living', price: 79, rating: 4.5, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400' },
  { name: 'Scented Soy Candle Set', category: 'Home & Living', price: 45, rating: 4.8, image: 'https://images.unsplash.com/photo-1603905609980-6cff1adc2882?w=400' },
  { name: 'The Art of Focus — Book', category: 'Books', price: 24, rating: 4.6, image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400' },
  { name: 'Vitamin C Serum', category: 'Beauty', price: 39, rating: 4.7, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400' },
  { name: 'Ceramic Pour-Over Coffee Set', category: 'Home & Living', price: 65, rating: 4.9, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400' },
  { name: 'Wireless Charging Pad', category: 'Electronics', price: 49, rating: 4.3, image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400' },
  { name: 'Linen Button-Down Shirt', category: 'Fashion', price: 75, rating: 4.4, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400' },
  { name: 'Resistance Band Set', category: 'Sports', price: 35, rating: 4.5, image: 'https://images.unsplash.com/photo-1598289431512-b97b0917afbe?w=400' },
  { name: 'Retinol Night Cream', category: 'Beauty', price: 55, rating: 4.6, image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400' },
];

let id = 1;
export const products = [];

for (let i = 0; i < 5; i++) {
  productTemplates.forEach((tpl) => {
    products.push({
      id: id++,
      name: i === 0 ? tpl.name : `${tpl.name} ${['Pro', 'Lite', 'Plus', 'Max'][i - 1]}`,
      category: tpl.category,
      brand: brands[Math.floor(Math.random() * brands.length)],
      price: +(tpl.price * (0.85 + Math.random() * 0.4)).toFixed(0),
      originalPrice: +(tpl.price * 1.25).toFixed(0),
      rating: +(tpl.rating - 0.1 + Math.random() * 0.3).toFixed(1),
      reviews: Math.floor(50 + Math.random() * 500),
      image: tpl.image,
      description: `Premium quality ${tpl.name.toLowerCase()} designed for everyday excellence. Built with top-tier materials for lasting performance and style.`,
      inStock: Math.random() > 0.1,
      tags: [tpl.category.toLowerCase(), 'popular', 'new'],
    });
  });
}