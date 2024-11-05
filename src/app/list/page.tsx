"use client"; // Mark this as a client component

import Image from 'next/image';
import { useSearchParams } from 'next/navigation'; // Use next/navigation to access search params
import { useEffect, useState } from 'react';

interface Rating {
  rate: number;
  count: number;
}

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating; 
}

const ListPage = () => {
  const searchParams = useSearchParams();
  const cat = searchParams.get('cat'); 
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const fetchProducts = async () => {
      if (!cat) return; 
      setLoading(true);
      setError(null); 

      try {
        const response = await fetch(`https://fakestoreapi.com/products/category/${encodeURIComponent(cat)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      } finally {
        setLoading(false); 
      }
    };

    fetchProducts();
  }, [cat]);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>; 
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">{`Products in ${cat}`}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg">
            <div className="relative w-full h-64">
              <Image
                src={product.image || "/product.png"}
                alt={product.title}
                fill
                sizes="100vw"
                className="object-cover rounded-md"
              />
              <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                -{Math.floor(Math.random() * 50) + 10}%
              </span>
            </div>
            
            <h2 className="text-lg font-medium">{product.title}</h2>
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-red-500">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-sm text-gray-400 line-through">
                ${(product.price * 1.2).toFixed(2)} 
              </span>
            </div>
            <div className="text-yellow-500 text-xs">
              ⭐ {product.rating.rate} ({product.rating.count} reviews)
            </div>
            <button className="w-full mt-2 py-2 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListPage;
