import React from "react";
import {
  FaHome,
  FaSearch,
  FaBell,
  FaShoppingCart,
  FaHeart,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Sidebar() {
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

        {/* Logout Icon */}
        <button className="flex items-center justify-center p-3 bg-gray-700 hover:bg-gray-600 rounded-full shadow-md w-14 h-14">
          <FaSignOutAlt size={24} />
        </button>
      </div>

      {/* Mini Logo Icon */}
      <div className="mt-8">
        <button className="flex items-center justify-center p-3 bg-gray-700 hover:bg-gray-600 rounded-full shadow-md w-14 h-14">
          <img src="/logo.webp" alt="Mini Logo" className="w-8 h-8" />
        </button>
      </div>
    </aside>
  );
}
