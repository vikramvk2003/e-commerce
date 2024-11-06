import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGoogle } from "react-icons/fa";


const LoginPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        
        {/* Left Side - Image Section */}
        <div className="hidden md:flex w-1/2 bg-blue-50 items-center justify-center">
          <Image
            src="/bg.png" // replace with your image path
            alt="Shopping cart with phone"
            width={300}
            height={400}
            className="object-contain"
          />
        </div>
        
        {/* Right Side - Form Section */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Create an account</h2>
          <p className="text-gray-600 mb-4">Enter your details below</p>
          
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
            />
            <input
              type="email"
              placeholder="Email or Phone Number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
            />

            <button
              type="submit"
              className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Create Account
            </button>
          </form>

          <div className="flex items-center justify-center mt-4">
            <button className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
            <FaGoogle   className="w-5 h-5 mr-2"  />
          
              Sign up with Google
            </button>
          </div>

          <p className="text-center mt-4 text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
