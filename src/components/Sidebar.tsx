"use client";

import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import {
  FaHome,
  FaSearch,
  FaBell,
  FaShoppingCart,
  FaHeart,
} from "react-icons/fa";

export default function Sidebar() {
  const { data: session } = useSession(); // Access the session data
  const [user, setUser] = useState<{ name: string; email: string; image: string } | null>(null);
  const [cart, setCart] = useState<Book[]>([]);
  const [cartMessage, setCartMessage] = useState<string>("");

  useEffect(() => {
    if (session?.user) {
      setUser({
        name: session.user.name || "",
        email: session.user.email || "",
        image: session.user.image || "",
      });
    } else {
      setUser(null);
    }
  }, [session]);

  const handleAddToCart = (book: Book) => {
    setCart([...cart, book]);
    setCartMessage("Added to Cart!");
    setTimeout(() => setCartMessage(""), 3000); // Clear message after 3 seconds
  };

  return (
    <aside className="bg-gray-800 text-white w-20 h-screen flex flex-col items-center py-8 rounded-lg shadow-lg">
      {/* Logo */}
      <div className="mb-8">
        <img src="/logo.webp" alt="Logo" className="w-12 h-12" />
      </div>

      {/* Icons */}
      <div className="space-y-6 flex-1">
        {[FaHome, FaSearch, FaBell, FaShoppingCart, FaHeart].map((Icon, idx) => (
          <button
            key={idx}
            className="flex items-center justify-center p-3 bg-gray-700 hover:bg-gray-600 rounded-full shadow-md w-14 h-14"
          >
            <Icon size={24} />
          </button>
        ))}

        {/* Vertical line */}
        <div className="w-8 border-t border-gray-500 my-4"></div>

        {/* Sign In/Out and Profile */}
        {user ? (
          <>
            {/* Profile Picture */}
            <Link href="/profile">
              <img
                src={user.image}
                alt="User Avatar"
                className="w-14 h-14 rounded-full shadow-md cursor-pointer"
              />
            </Link>

            {/* Logout Button */}
            <button
              onClick={() => signOut()}
              className="flex items-center justify-center p-3 bg-gray-700 hover:bg-gray-600 rounded-full shadow-md w-14 h-14"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => signIn("google")}
            className="flex items-center justify-center p-3 bg-gray-700 hover:bg-gray-600 rounded-full shadow-md w-14 h-14"
          >
            Sign In
          </button>
        )}
      </div>

      {/* Cart Icon with Link Navigation */}
      <div className="mt-8">
        <Link href="/cart">
          <button
            className="flex items-center justify-center p-3 bg-gray-700 hover:bg-gray-600 rounded-full shadow-md w-14 h-14"
          >
            <FaShoppingCart size={24} />
          </button>
        </Link>
      </div>

      {cartMessage && (
        <div className="absolute bottom-0 mb-4 bg-gray-700 text-yellow-500 px-4 py-2 rounded-lg">
          {cartMessage}
        </div>
      )}
    </aside>
  );
}
