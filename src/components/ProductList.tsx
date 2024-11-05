"use client"; // Mark as client-side component

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosHeart } from "react-icons/io";
import { useRouter } from "next/navigation"; // Use this for App Router

const PRODUCT_PER_PAGE = 8;

// Define the Product interface
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  discountPercentage?: number; // Optional property for discount percentage
}

const ProductList = ({
  limit = PRODUCT_PER_PAGE,
}: {
  limit?: number;
}) => {
  const [products, setProducts] = useState<Product[]>([]); // Use the Product interface
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    // Fetch products from Fake Store API
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        // Assign a fixed discount percentage to each product
        const updatedProducts: Product[] = data.map((product: Product) => ({
          ...product,
          discountPercentage: Math.floor(Math.random() * 50) + 10, // Assign random discount between 10% and 59%
        }));
        setProducts(updatedProducts); // Load all products
      });
  }, []);

  // Function to handle adding to wishlist
  const addToWishlist = (id: number) => {
    // Retrieve existing wishlist from local storage
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (!storedWishlist.includes(id)) {
      // If the product is not already in the wishlist, add it
      const updatedWishlist = [...storedWishlist, id];
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      alert("Product added to your wishlist!"); // Feedback to the user
    } else {
      alert("Product is already in your wishlist!"); // Feedback if already exists
    }
  };

  // Function to handle adding to cart
  const addToCart = (product: Product) => {
    // Retrieve existing cart from local storage
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const productExists = storedCart.find((item: Product) => item.id === product.id);

    if (!productExists) {
      // If the product is not already in the cart, add it
      const updatedCart = [...storedCart, product];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      alert("Product added to your cart!"); // Feedback to the user
    } else {
      alert("Product is already in your cart!"); // Feedback if already exists
    }
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-6">Flash Sales</h2>
      <div className="flex gap-x-8 gap-y-16 flex-wrap justify-between">
        {products.map((product) => (
          <div
            className="relative w-[48%] sm:w-[30%] lg:w-[18%] flex flex-col gap-4 p-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow"
            key={product.id}
          >
            <Link href={"/" + product.id}>
              <div className="relative w-full h-64">
                <Image
                  src={product.image || "/product.png"}
                  alt={product.title}
                  fill
                  sizes="100vw"
                  className="object-cover rounded-md"
                />
                <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                  -{product.discountPercentage}%
                </span>
              </div>
              <h3 className="text-sm font-medium text-gray-800">{product.title}</h3>
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-red-500">
                  ${(product.price * (1 - (product.discountPercentage! / 100))).toFixed(2)} {/* Discounted price */}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  ${(Math.floor(product.price * 1.2)).toFixed(2)} {/* Original price */}
                </span>
              </div>
              <div className="text-yellow-500 text-xs">
                ⭐ {product.rating.rate} ({product.rating.count} reviews)
              </div>
            </Link>
            <div className="flex justify-between items-center">
              <button
                onClick={() => addToCart(product)} // Call addToCart on button click
                className="w-full mt-2 py-2 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition"
              >
                Add to Cart
              </button>
              <button
                onClick={() => addToWishlist(product.id)}
                className="ml-2 p-2 rounded-full transition-colors text-gray-400 hover:text-red-500"
              >
                <IoIosHeart className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-8 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
        View All Products
      </button>
    </div>
  );
};

export default ProductList;
