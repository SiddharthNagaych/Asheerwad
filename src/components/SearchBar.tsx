import Link from "next/link";
import Image from "next/image";

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  filteredBooks,
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredBooks: Book[];
}) {
  return (
    <div>
      {/* Search Input */}
      <div className="flex items-center bg-gray-700 rounded-full px-4 py-2">
        <input
          type="text"
          placeholder="Search any book..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 bg-transparent text-white outline-none placeholder-gray-400"
        />
        <button className="bg-orange-500 rounded-full p-2 ml-2 hover:bg-orange-400 transition">
          🔍
        </button>
      </div>

      {/* Display Filtered Books */}
      {filteredBooks.length > 0 ? (
        <div className="bg-gray-800 rounded-lg mt-4 max-h-60 overflow-auto">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="flex items-center space-x-4 bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition"
            >
              <Image
                src={book.image}
                alt={book.name}
                width={64}
                height={64}
                className="rounded-lg"
              />
              <div className="flex-1">
                <p className="text-white font-medium">{book.name}</p>
                <Link
                  href={`/cart/${book.id}`}
                  className="bg-yellow-500 px-4 py-2 text-black rounded-lg font-semibold shadow-lg hover:bg-yellow-400 transition"
                >
                  Add to Cart
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 mt-4">No books found.</p>
      )}
    </div>
  );
}
