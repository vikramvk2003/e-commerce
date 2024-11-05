"use client"; // Mark this file as a client component

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowLeft } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa';

const CategoryList = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <p>Loading categories...</p>;
  }

  return (
    <div className="relative flex items-center px-10 w-full h-80">
      {/* Left Navigation Button */}
      <button className="absolute left-0 z-10 bg-white p-2 rounded-full shadow-md">
        <FaArrowLeft />
      </button>

      {/* Category Cards */}
      <div className="flex gap-12 overflow-x-auto scrollbar-hide px-20">
        {categories.map((category, index) => (
          <Link
            href={`/list?cat=${encodeURIComponent(category)}`}
            key={category}
            className="flex-shrink-0 w-58 h-58 bg-white rounded-lg shadow-lg flex flex-col items-center justify-center text-center"
          >
            <div className="relative w-44 h-44 mb-4">
              <Image
                src={`https://picsum.photos/150/150?random=${index}`}
                alt={category}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <h1 className="text-lg font-medium">{category}</h1>
          </Link>
        ))}
      </div>

      {/* Right Navigation Button */}
      <button className="absolute right-0 z-10 bg-white p-2 rounded-full shadow-md">
        <FaArrowRight />
      </button>
    </div>
  );
};

export default CategoryList;
