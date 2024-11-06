"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = storedCart.map((item: any) => ({
      ...item,
      quantity: item.quantity || 1,
    }));
    setCartItems(updatedCart);
  }, []);

  const removeFromCart = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const calculateSubtotal = () => {
    return cartItems
      .reduce((total, item) => {
        const discountedPrice = item.price * (1 - item.discountPercentage! / 100);
        return total + discountedPrice * item.quantity;
      }, 0)
      .toFixed(2);
  };

  return (
    <div className="container mx-auto mt-12 px-4">
      <h2 className="text-2xl font-semibold mb-6 text-center">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center">
          Your cart is empty. <Link href="/" className="text-blue-500">Continue Shopping</Link>
        </p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center p-4 bg-white shadow rounded-lg">
                <div className="relative w-24 h-24 mr-4">
                  <Image
                    src={item.image || "/product.png"}
                    alt={item.title}
                    fill
                    sizes="100vw"
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-800">{item.title}</h3>
                  <div className="flex items-center mt-2">
                    <span className="text-lg font-semibold text-gray-600">
                      ${(item.price * (1 - item.discountPercentage! / 100)).toFixed(2)}
                    </span>
                    <span className="text-sm font-medium text-gray-500 ml-2">x Quantity</span>
                    <select
                      className="ml-2 border rounded p-1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                    >
                      {[1, 2, 3, 4, 5].map((qty) => (
                        <option key={qty} value={qty}>
                          {qty}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 transition ml-4"
                >
                  &#10006;
                </button>
              </div>
            ))}

            {/* Return to Shop and Update Cart Buttons */}
            <div className="flex justify-between">
              <Link href="/" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                Return To Shop
              </Link>
              <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                Update Cart
              </button>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="p-4 bg-white shadow rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Cart Total</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${calculateSubtotal()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total:</span>
                <span>${calculateSubtotal()}</span>
              </div>
            </div>

            {/* Proceed to Checkout Button */}
            <button className="w-full mt-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
