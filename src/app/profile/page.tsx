"use client";

import React, { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

const Profile = () => {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("profile"); // Track the active tab
  const [books, setBooks] = useState<Book[]>([]);

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "continue", label: "Continue Reading" },
    { id: "history", label: "Reading History" },
    { id: "wishlist", label: "Wishlist" },
    { id: "settings", label: "Settings" },
  ];

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("/api/books");
        const data = await res.json();
        setBooks(data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };
    fetchBooks();
  }, []);

  const achievements = [
    { id: 1, label: "Bookworm" },
    { id: 2, label: "Timemaster" },
    { id: 3, label: "Spear Reader" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Left Sidebar */}
      <aside className="bg-gray-800 w-1/4 p-6 rounded-l-lg shadow-lg flex flex-col justify-between">
        <div className="space-y-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left p-4 rounded-lg ${
                activeTab === tab.id ? "bg-yellow-500 text-black" : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => signOut()}
          className="bg-red-500 hover:bg-red-400 text-white p-4 rounded-lg mt-6 shadow-lg"
        >
          Logout
        </button>
      </aside>

      {/* Right Content */}
      <main className="flex-1 bg-gray-800 p-8 rounded-r-lg shadow-lg">
        {activeTab === "profile" && (
          <section className="space-y-6">
            {/* Profile Section */}
            <div className="flex items-center space-x-6">
              <div className="relative w-32 h-32">
                <Image
                  src={session?.user?.image || "/placeholder.png"}
                  alt="User Avatar"
                  width={128}
                  height={128}
                  className="rounded-full border-4 border-yellow-500 shadow-lg"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-yellow-500">{session?.user?.name}</h2>
                <p className="text-gray-400">Joined: {new Date().getFullYear() - 1} 📅</p>
                <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                  <p className="text-gray-300">Books Read: <span className="text-yellow-500">12</span></p>
                  <p className="text-gray-300">Reading Time: <span className="text-yellow-500">32h</span></p>
                  <p className="text-gray-300">Current Streak: <span className="text-yellow-500">10 days</span></p>
                </div>
              </div>
            </div>
            {/* Achievements */}
            <div>
              <h3 className="text-lg font-bold text-yellow-500">Achievements</h3>
              <div className="flex space-x-4 mt-4">
                {achievements.map((ach) => (
                  <div
                    key={ach.id}
                    className="bg-gray-700 px-4 py-2 rounded-lg shadow-md text-center"
                  >
                    {ach.label}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        {activeTab === "continue" && (
          <section>
            <h3 className="text-lg font-bold text-yellow-500 mb-4">Continue Reading</h3>
            <div className="grid grid-cols-2 gap-4">
              {books.slice(0, 2).map((book) => (
                <div key={book.id} className="flex items-center space-x-4 bg-gray-700 p-4 rounded-lg">
                  <Image src={book.image} alt={book.name} width={64} height={64} className="rounded-lg" />
                  <p>{book.name}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        {activeTab === "history" && (
          <section>
            <h3 className="text-lg font-bold text-yellow-500 mb-4">Reading History</h3>
            <div className="grid grid-cols-2 gap-4">
              {books.slice(0, 2).map((book) => (
                <div key={book.id} className="flex items-center space-x-4 bg-gray-700 p-4 rounded-lg">
                  <Image src={book.image} alt={book.name} width={64} height={64} className="rounded-lg" />
                  <p>{book.name}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        {activeTab === "wishlist" && (
          <section>
            <h3 className="text-lg font-bold text-yellow-500 mb-4">Wishlist</h3>
            <div className="grid grid-cols-2 gap-4">
              {books.slice(0, 2).map((book) => (
                <div key={book.id} className="flex items-center space-x-4 bg-gray-700 p-4 rounded-lg">
                  <Image src={book.image} alt={book.name} width={64} height={64} className="rounded-lg" />
                  <p>{book.name}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        {activeTab === "settings" && (
          <section>
            <h3 className="text-lg font-bold text-yellow-500 mb-4">Settings</h3>
            <div className="bg-gray-700 p-4 rounded-lg">
              <label className="flex items-center justify-between">
                <span className="text-gray-300">Enable Dark Mode</span>
                <input type="checkbox" className="toggle-checkbox" />
              </label>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Profile;
