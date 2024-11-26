import React from "react";

export default function FeaturedBook({ book }: { book: Book }) {
  return (
    <section className="bg-gray-800 p-6 rounded-3xl shadow-lg mx-6 mt-8 mb-8">
      <div className="relative rounded-3xl overflow-hidden shadow-2xl">
        {/* Featured Image */}
        <img
          src={book.image}
          alt={book.name}
          className="w-full h-80 object-cover rounded-3xl"
        />
        {/* Overlay Content */}
        <div className="absolute bottom-0 left-0 bg-gray-900 bg-opacity-75 p-6 w-full rounded-b-3xl">
          <h2 className="text-yellow-500 text-3xl font-bold">{book.name}</h2>
          <p className="text-gray-300 mt-2 text-sm leading-relaxed">
            {book.description}
          </p>
          <button className="bg-yellow-500 text-gray-900 px-6 py-2 mt-4 rounded-lg shadow-lg hover:bg-yellow-400 transition">
            Read Now
          </button>
        </div>
        {/* Categories Button */}
        <div className="absolute top-4 left-4 bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg shadow-lg">
          Explore Categories
        </div>
      </div>
    </section>
  );
}
