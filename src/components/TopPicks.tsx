import { useState, useEffect } from "react";
import Image from "next/image";

type Book = {
  id: string;
  name: string;
  price: string;
  image: string;
};

export default function TopPicks({ books }: { books: Book[] }) {
  const [currentIndices, setCurrentIndices] = useState([0, 1]); // Two images displayed at a time

  useEffect(() => {
    if (!books || books.length < 2) return; // Prevent errors if books data is insufficient

    const interval = setInterval(() => {
      setCurrentIndices(([first, second]) => {
        const nextFirst = (first + 2) % books.length;
        const nextSecond = (second + 2) % books.length;
        return [nextFirst, nextSecond];
      });
    }, 3000); // Slide every 3 seconds

    return () => clearInterval(interval); // Clean up interval
  }, [books]);

  if (!books || books.length === 0) {
    return <div className="text-gray-400 text-center">No books available</div>;
  }

  return (
    <div className="grid grid-rows-2 gap-2">
      {currentIndices.map((index) => (
        <div
          key={books[index]?.id || index} // Ensure unique keys
          className="relative w-full h-28 rounded-lg overflow-hidden bg-gray-700"
        >
          <Image
            src={books[index]?.image || "/placeholder.png"} // Add a placeholder image fallback
            alt={books[index]?.name || "Book"}
            layout="fill"
            className="object-cover"
          />
          <div className="absolute bottom-2 left-2 bg-gray-900 bg-opacity-75 p-2 rounded">
            <p className="text-sm font-semibold text-white">
              {books[index]?.name || "Untitled"}
            </p>
            <p className="text-yellow-500 text-sm">₹{books[index]?.price || "N/A"}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
