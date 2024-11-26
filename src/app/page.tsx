"use client";

import Sidebar from "../components/Sidebar";
import TopPicks from "../components/TopPicks";
import LastPurchases from "../components/LastPurchases";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Track current featured book index
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("/api/books");
        const data = await res.json();
        setBooks(data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  if (loading) {
    return <div className="text-white text-center mt-20">Loading...</div>;
  }

  const featuredBook = books[currentIndex];
  const topPicks = books.slice(0, 5);

  const handleNextImage = () => {
    // Move to the next book, wrapping around to the start if at the end
    setCurrentIndex((prevIndex) => (prevIndex + 1) % books.length);
  };

  return (
    <div className="flex bg-gray-900 text-white min-h-screen">
      {/* Main Layout */}
      <main className="flex flex-col space-y-4 p-4 w-1/4">
        {/* Search Bar */}
        <div className="bg-gray-700 flex items-center p-3 rounded-lg">
          <span className="text-yellow-500 text-2xl">🔍</span>
          <input
            type="text"
            placeholder="Search any book..."
            className="bg-transparent text-white flex-1 ml-2 outline-none"
          />
          <button className="bg-yellow-500 px-4 py-2 rounded-lg ml-2 text-sm">Filter</button>
        </div>

        {/* Top Picks */}
        <div className="bg-gray-800 p-4 rounded-lg flex-1 overflow-hidden">
          <h2 className="text-yellow-500 text-lg font-semibold">Top Picks</h2>
          <TopPicks books={topPicks} />
        </div>

        {/* Last Purchases */}
        <div className="bg-gray-800 p-4 rounded-lg flex-1 overflow-hidden">
          <h2 className="text-yellow-500 text-lg font-semibold">Last Purchases</h2>
          <LastPurchases books={books} />
        </div>
      </main>

      {/* Featured Book Section */}
      <section className="flex-1 relative mx-6 my-8 bg-gray-800 rounded-3xl overflow-hidden shadow-2xl">
        {featuredBook ? (
          <>
            {/* Featured Book Image */}
            <Image
              src={featuredBook.image || "/placeholder.png"}
              alt={featuredBook.name || "Featured Book"}
              fill
              className="object-cover w-full h-full rounded-3xl"
            />

            {/* Overlay Content */}
            <div className="absolute inset-0 bg-gray-900 bg-opacity-70 flex items-center p-8 rounded-3xl">
              {/* Centered Content */}
              <div className="flex flex-col justify-center items-start space-y-6 max-w-lg">
                <h1 className="text-5xl font-bold text-yellow-500">
                  {featuredBook.name}
                </h1>
                <p className="text-gray-300 text-base leading-relaxed">
                  {featuredBook.description}
                </p>
                <button className="bg-yellow-500 px-8 py-3 text-black rounded-lg font-semibold shadow-lg hover:bg-yellow-400 transition">
                  Read Now
                </button>
              </div>
            </div>

            {/* Right-Side Slide Button */}
            <button
              onClick={handleNextImage}
              className="absolute right-[-20px] top-1/2 transform -translate-y-1/2 w-16 h-16 rounded-full bg-yellow-500 text-black shadow-lg flex items-center justify-center hover:bg-yellow-400 transition"
              style={{
                border: "8px solid rgba(0, 0, 0, 0.7)", // "Black hole" effect
              }}
            >
              ➡️
            </button>

         
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No featured book available.
          </div>
        )}
      </section>

      {/* Sidebar */}
      <Sidebar />
    </div>
  );
}
