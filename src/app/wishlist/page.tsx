"use client"; // Mark as client-side component

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState<number[]>([]); // State to manage wishlist products
  const [products, setProducts] = useState<any[]>([]); // State to store product details

  useEffect(() => {
    // Retrieve wishlist from local storage
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlist(storedWishlist);

    // Fetch product details based on wishlist IDs
    if (storedWishlist.length > 0) {
      fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((data) => {
          const wishlistProducts = data.filter((product: any) =>
            storedWishlist.includes(product.id)
          );
          setProducts(wishlistProducts);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    }
  }, []);

  // Function to remove product from wishlist
  const handleRemoveFromWishlist = (productId: number) => {
    // Filter out the removed product from the wishlist
    const updatedWishlist = wishlist.filter((id) => id !== productId);
    setWishlist(updatedWishlist);
    
    // Update local storage
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));

    // Also update the products state to remove the product from the displayed list
    setProducts(products.filter((product) => product.id !== productId));
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-6">Your Wishlist</h2>
      {products.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="flex flex-col p-4 bg-white shadow-lg rounded-lg">
              <Link href={"/" + product.id}>
                <div className="relative w-full h-64">
                  <Image
                    src={product.image || "/product.png"}
                    alt={product.title}
                    fill
                    sizes="100vw"
                    className="object-cover rounded-md"
                  />
                </div>
                <h3 className="text-sm font-medium text-gray-800">{product.title}</h3>
                <span className="text-lg font-semibold text-red-500">
                  ${(product.price * (1 - (product.discountPercentage || 0) / 100)).toFixed(2)}
                </span>
              </Link>
              <button
                onClick={() => handleRemoveFromWishlist(product.id)}
                className="mt-2 py-1 px-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Remove from Wishlist
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
