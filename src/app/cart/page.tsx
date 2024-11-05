"use client"; // Mark as client-side component

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<any[]>([]); // State to manage cart items

  useEffect(() => {
    // Retrieve cart from local storage
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(storedCart);
  }, []);

  // Function to handle removing an item from the cart
  const removeFromCart = (id: number) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart); // Update state to re-render
  };

  // Function to calculate total price
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const discountedPrice = item.price * (1 - (item.discountPercentage! / 100));
      return total + discountedPrice;
    }, 0).toFixed(2); // Format to 2 decimal places
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. <Link href="/">Continue Shopping</Link></p>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex flex-col p-4 bg-white shadow-lg rounded-lg">
                <Link href={"/" + item.id}>
                  <div className="relative w-full h-64">
                    <Image
                      src={item.image || "/product.png"}
                      alt={item.title}
                      fill
                      sizes="100vw"
                      className="object-cover rounded-md"
                    />
                  </div>
                  <h3 className="text-sm font-medium text-gray-800">{item.title}</h3>
                  <span className="text-lg font-semibold text-red-500">
                    ${(item.price * (1 - (item.discountPercentage! / 100))).toFixed(2)}
                  </span>
                </Link>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="mt-2 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Total Price: ${calculateTotal()}</h3>
            <button className="mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
